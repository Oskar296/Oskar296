import io
import json
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from PIL import Image

from geolocator.fusion import FusionConfig
from geolocator.geo import haversine_km
from geolocator.predictor import Geolocator, PredictorConfig
from geolocator.reasoner import ReasonerUnavailable
from geolocator.retrieval import ModelUnavailable
from geolocator.types import GeoCandidate, HeadOutput

STOCKHOLM = (59.3293, 18.0686)
FAST_FUSION = FusionConfig(n_samples=3000, seed=5)


class _FakeHead:
    def __init__(self, out):
        self.out = out
        self.calls = 0

    def predict(self, image, k=None):
        self.calls += 1
        self.pool_k = k
        if isinstance(self.out, Exception):
            raise self.out
        return self.out

    def load(self):
        pass


def _locator(retrieval=None, reasoner=None, **kw):
    cfg = PredictorConfig(fusion=FAST_FUSION, **kw)
    loc = Geolocator(cfg)
    if retrieval is not None:
        loc._retrieval = _FakeHead(retrieval)
    if reasoner is not None:
        loc._reasoner = _FakeHead(reasoner)
    return loc


def _head(name, lat, lon, sigma=100.0, trust=1.0):
    return HeadOutput(name, [GeoCandidate(lat, lon, 1.0, sigma, name)], trust=trust)


def test_combines_retrieval_and_reasoner():
    loc = _locator(
        retrieval=_head("retrieval", 59.30, 18.00, 120.0),
        reasoner=_head("reasoner", 59.36, 18.12, 120.0),
        use_reasoner=True,
    )
    pred = loc.locate_image(Image.new("RGB", (32, 32)))
    assert haversine_km(pred.lat, pred.lon, *STOCKHOLM) < 60
    assert {h.name for h in pred.heads} == {"retrieval", "reasoner"}
    assert pred.place.country_code == "SE"


def test_survives_a_dead_retrieval_head():
    loc = _locator(
        retrieval=ModelUnavailable("no weights"),
        reasoner=_head("reasoner", *STOCKHOLM),
        use_reasoner=True,
    )
    pred = loc.locate_image(Image.new("RGB", (32, 32)))
    assert haversine_km(pred.lat, pred.lon, *STOCKHOLM) < 60
    assert any("retrieval head unavailable" in w for w in loc.warnings)


def test_survives_a_dead_reasoner():
    loc = _locator(
        retrieval=_head("retrieval", *STOCKHOLM),
        reasoner=ReasonerUnavailable("no api key"),
        use_reasoner=True,
    )
    pred = loc.locate_image(Image.new("RGB", (32, 32)))
    assert haversine_km(pred.lat, pred.lon, *STOCKHOLM) < 60
    assert any("reasoning head unavailable" in w for w in loc.warnings)


def test_every_head_failing_raises():
    loc = _locator(
        retrieval=ModelUnavailable("x"), reasoner=ReasonerUnavailable("y"), use_reasoner=True
    )
    with pytest.raises(RuntimeError, match="no prediction head"):
        loc.locate_image(Image.new("RGB", (32, 32)))


def test_exif_overrides_a_confident_but_wrong_model():
    """The one case where metadata must win outright."""
    img = Image.new("RGB", (32, 32))
    ex = img.getexif()
    ex[0x8825] = {1: "N", 2: (59.0, 19.0, 45.0), 3: "E", 4: (18.0, 4.0, 6.0)}
    buf = io.BytesIO()
    img.save(buf, format="JPEG", exif=ex)
    buf.seek(0)

    loc = _locator(
        retrieval=_head("retrieval", 35.68, 139.69, 50.0),  # Tokyo, very wrong
        use_reasoner=False,
    )
    pred = loc.locate_image(Image.open(buf))
    assert haversine_km(pred.lat, pred.lon, *STOCKHOLM) < 5
    assert pred.radius_km < 20


def test_reasoner_skipped_when_unconfigured(monkeypatch):
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)
    monkeypatch.delenv("ANTHROPIC_AUTH_TOKEN", raising=False)
    monkeypatch.setattr(os.path, "isdir", lambda p: False)
    loc = _locator(retrieval=_head("retrieval", *STOCKHOLM))
    loc._reasoner = _FakeHead(_head("reasoner", 0.0, 0.0))
    loc.locate_image(Image.new("RGB", (32, 32)))
    assert loc._reasoner.calls == 0
    assert any("reasoning head disabled" in w for w in loc.warnings)


def test_alternatives_get_place_names():
    loc = _locator(
        retrieval=HeadOutput(
            "retrieval",
            [
                GeoCandidate(59.33, 18.06, 0.7, 60.0, "retrieval"),
                GeoCandidate(48.85, 2.35, 0.3, 60.0, "retrieval"),
            ],
        ),
        use_reasoner=False,
    )
    pred = loc.locate_image(Image.new("RGB", (32, 32)))
    assert pred.alternatives
    assert all(a.label for a in pred.alternatives)


def test_prediction_serialises_to_json():
    loc = _locator(retrieval=_head("retrieval", *STOCKHOLM), use_reasoner=False)
    payload = loc.locate_image(Image.new("RGB", (32, 32))).as_dict()
    text = json.dumps(payload)  # must not raise
    assert json.loads(text)["place"]["country_code"] == "SE"
    assert set(payload) >= {"lat", "lon", "radius_km", "confidence", "alternatives", "heads"}


def test_deep_pool_requested_only_when_the_reasoner_can_rerank():
    """Pulling 256 candidates is only worth it if something will re-rank them."""
    loc = _locator(
        retrieval=_head("retrieval", *STOCKHOLM),
        reasoner=_head("reasoner", *STOCKHOLM),
        use_reasoner=True,
    )
    loc.locate_image(Image.new("RGB", (32, 32)))
    assert loc._retrieval.pool_k == 256

    solo = _locator(retrieval=_head("retrieval", *STOCKHOLM), use_reasoner=False)
    solo.locate_image(Image.new("RGB", (32, 32)))
    assert solo._retrieval.pool_k is None


def test_country_prior_moves_the_answer_end_to_end():
    """Retrieval slightly favours Finland; the reasoner has read Swedish."""
    retrieval = HeadOutput(
        "retrieval",
        [
            GeoCandidate(60.17, 24.94, 0.55, 50.0, "retrieval"),  # Helsinki
            GeoCandidate(59.33, 18.06, 0.45, 50.0, "retrieval"),  # Stockholm
        ],
    )
    reasoner = HeadOutput(
        "reasoner",
        [GeoCandidate(59.0, 17.5, 1.0, 400.0, "reasoner")],
        evidence={"countries": [{"name": "Sweden", "iso2": "SE", "probability": 0.95}]},
    )
    loc = _locator(retrieval=retrieval, reasoner=reasoner, use_reasoner=True)
    pred = loc.locate_image(Image.new("RGB", (32, 32)))
    assert pred.place.country_code == "SE"
    head = next(h for h in pred.heads if h.name == "retrieval")
    assert head.evidence["country_rerank"]["applied"] is True


def test_untrimmed_pool_is_cut_back_when_the_reasoner_dies():
    """A 256-candidate pool must not leak into fusion if re-ranking never ran."""
    pool = HeadOutput(
        "retrieval",
        [GeoCandidate(59.0 + i * 0.01, 18.0, 1.0 / 300, 50.0, "retrieval") for i in range(300)],
    )
    loc = _locator(retrieval=pool, reasoner=ReasonerUnavailable("down"), use_reasoner=True)
    pred = loc.locate_image(Image.new("RGB", (32, 32)))
    head = next(h for h in pred.heads if h.name == "retrieval")
    assert len(head.candidates) == 24


def test_retrieval_auto_disables_without_torch(monkeypatch):
    """The heavy extra is optional: the app must not try to use what is absent."""
    import geolocator.predictor as mod

    monkeypatch.setattr(mod, "retrieval_available", lambda: False)
    loc = Geolocator(PredictorConfig(fusion=FAST_FUSION, use_reasoner=True))
    loc._retrieval = _FakeHead(_head("retrieval", *STOCKHOLM))
    loc._reasoner = _FakeHead(_head("reasoner", *STOCKHOLM))
    loc.locate_image(Image.new("RGB", (32, 32)))
    assert loc._retrieval.calls == 0

    monkeypatch.setattr(mod, "retrieval_available", lambda: True)
    loc2 = Geolocator(PredictorConfig(fusion=FAST_FUSION, use_reasoner=True))
    loc2._retrieval = _FakeHead(_head("retrieval", *STOCKHOLM))
    loc2._reasoner = _FakeHead(_head("reasoner", *STOCKHOLM))
    loc2.locate_image(Image.new("RGB", (32, 32)))
    assert loc2._retrieval.calls == 1


def test_names_the_place_from_the_model_when_no_gazetteer(monkeypatch):
    """With the offline geocoder absent, the reasoner's own label is the name."""
    import geolocator.places as places_mod
    from geolocator.types import Place

    monkeypatch.setattr(places_mod, "reverse", lambda lat, lon: Place())
    reasoner = HeadOutput(
        "reasoner",
        [GeoCandidate(59.33, 18.06, 1.0, 5.0, "reasoner", "Stockholm, Sweden")],
    )
    loc = _locator(reasoner=reasoner, use_reasoner=True, use_retrieval=False)
    pred = loc.locate_image(Image.new("RGB", (32, 32)))
    assert pred.place.describe() == "Stockholm, Sweden"
