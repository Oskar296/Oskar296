"""Retrieval head tests.

The CLIP image backbone is the one piece that has to come from Hugging Face, so
it is stubbed here. Everything else -- the GPS gallery, the location encoder and
the trained weights -- is real, which is what makes these tests worth running.
"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest

torch = pytest.importorskip("torch")
pytest.importorskip("geoclip")

from geolocator.geo import haversine_km
from geolocator.retrieval import RetrievalConfig, RetrievalHead


class _FakeImageEncoder(torch.nn.Module):
    """Same shape contract as the real encoder, no network access."""

    def __init__(self):
        super().__init__()
        self.mlp = torch.nn.Sequential(
            torch.nn.Linear(768, 768), torch.nn.ReLU(), torch.nn.Linear(768, 512)
        )

    def preprocess_image(self, images):
        n = len(images) if isinstance(images, (list, tuple)) else 1
        return torch.zeros(n, 3, 224, 224)

    def forward(self, x):
        g = torch.Generator().manual_seed(1234)
        return self.mlp(torch.randn(x.shape[0], 768, generator=g))


@pytest.fixture(scope="module")
def head():
    import importlib
    import sys

    importlib.import_module("geoclip")
    # `geoclip.model.GeoCLIP` is re-exported as the class, so reach the module
    # through sys.modules to patch the name the class body actually resolves.
    gm = sys.modules["geoclip.model.GeoCLIP"]
    original = gm.ImageEncoder
    gm.ImageEncoder = _FakeImageEncoder
    try:
        h = RetrievalHead(RetrievalConfig(top_k=8))
        h.load()
        yield h
    finally:
        gm.ImageEncoder = original


def test_gallery_and_features_line_up(head):
    assert head._gallery.shape[0] == 100_000
    assert head._gallery_feats.shape == (100_000, 512)
    norms = head._gallery_feats.norm(dim=1)
    assert torch.allclose(norms, torch.ones_like(norms), atol=1e-5)


def test_sigmas_are_bounded_and_denser_where_the_gallery_is_dense(head):
    cfg = head.config
    sigmas = head._sigmas
    assert sigmas.shape[0] == 100_000
    assert sigmas.min() >= cfg.min_sigma_km
    assert sigmas.max() <= cfg.max_sigma_km

    def sigma_near(lat, lon):
        d = ((head._gallery[:, 0] - lat) ** 2 + (head._gallery[:, 1] - lon) ** 2)
        return float(sigmas[int(d.argmin())])

    # Western Europe is far better covered than central Siberia, so its kernels
    # should be tighter.
    assert sigma_near(48.85, 2.35) < sigma_near(66.0, 100.0)


def test_retrieval_recovers_the_coordinate_it_was_asked_for(head):
    """Feed the location encoding of a known gallery point back in as the image
    embedding; the top hit must be that point."""
    target = 5000
    want_lat, want_lon = head._gallery[target].tolist()
    head.embed = lambda image: head._gallery_feats[target : target + 1]

    out = head.predict(object())
    assert out.name == "retrieval"
    assert len(out.candidates) == 8
    top = out.candidates[0]
    assert haversine_km(top.lat, top.lon, want_lat, want_lon) < 1.0
    # Weights must be a descending, usable distribution.
    weights = [c.weight for c in out.candidates]
    assert weights == sorted(weights, reverse=True)
    assert all(w > 0 for w in weights)
    assert out.evidence["top_k"] == 8


def test_temperature_flattens_the_distribution(head):
    target = 5000
    head.embed = lambda image: head._gallery_feats[target : target + 1]

    head.config.temperature = 1.0
    sharp = head.predict(object()).candidates[0].weight
    head.config.temperature = 8.0
    flat = head.predict(object()).candidates[0].weight
    head.config.temperature = 2.0
    assert flat < sharp


def test_multi_crop_averages_views(head):
    """TTA must feed every crop through the encoder, not just the original."""
    from PIL import Image

    seen = {}

    class _Counting(_FakeImageEncoder):
        def preprocess_image(self, images):
            seen["n"] = len(images) if isinstance(images, (list, tuple)) else 1
            return super().preprocess_image(images)

    real_encoder = head._model.image_encoder
    head._model.image_encoder = _Counting()
    try:
        h2 = RetrievalHead(RetrievalConfig(multi_crop=True, flip=True))
        h2._model = head._model
        h2._gallery = head._gallery
        h2._gallery_feats = head._gallery_feats
        h2._sigmas = head._sigmas
        emb = h2.embed(Image.new("RGB", (800, 600)))
        # 1 original + 5 crops, doubled by the flip.
        assert seen["n"] == 12
        assert emb.shape == (1, 512)
        assert float(emb.norm()) == pytest.approx(1.0, abs=1e-5)
    finally:
        head._model.image_encoder = real_encoder
