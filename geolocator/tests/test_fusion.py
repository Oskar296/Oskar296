import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest

from geolocator.fusion import FusionConfig, fuse
from geolocator.geo import haversine_km
from geolocator.types import GeoCandidate, HeadOutput

CFG = FusionConfig(n_samples=6000, seed=11)
STOCKHOLM = (59.3293, 18.0686)
SYDNEY = (-33.8688, 151.2093)


def head(name, points, trust=1.0):
    return HeadOutput(
        name=name,
        candidates=[GeoCandidate(lat, lon, w, s, name) for lat, lon, w, s in points],
        trust=trust,
    )


def test_single_head_recovers_its_own_point():
    lat, lon, radius, conf, _ = fuse([head("a", [(*STOCKHOLM, 1.0, 100.0)])], CFG)
    assert haversine_km(lat, lon, *STOCKHOLM) < 15
    assert 100 < radius < 250
    assert conf > 0.5


def test_agreement_sharpens_the_posterior():
    """Two independent heads agreeing must beat either alone.

    This is the whole reason fusion is a product of experts rather than a
    mixture; a mixture of two identical Gaussians is just the same Gaussian.
    """
    one = fuse([head("a", [(*STOCKHOLM, 1.0, 150.0)])], CFG)
    two = fuse(
        [head("a", [(*STOCKHOLM, 1.0, 150.0)]), head("b", [(*STOCKHOLM, 1.0, 150.0)])],
        CFG,
    )
    assert two[2] < one[2] * 0.8
    assert two[3] > one[3]
    # Product of two equal Gaussians narrows by 1/sqrt(2).
    assert two[2] == pytest.approx(one[2] / 2**0.5, rel=0.12)


def test_nearby_heads_land_between_them():
    a, b = (59.30, 18.00), (59.60, 18.40)
    lat, lon, _, _, _ = fuse(
        [head("a", [(*a, 1.0, 120.0)]), head("b", [(*b, 1.0, 120.0)])], CFG
    )
    assert min(a[0], b[0]) < lat < max(a[0], b[0])
    assert min(a[1], b[1]) < lon < max(a[1], b[1])


def test_disagreement_never_answers_the_midpoint():
    """A bimodal posterior must resolve to one mode, not the empty space between.

    Averaging Stockholm and Sydney puts the answer in central Russia, which is
    the one place the photograph certainly was not taken.
    """
    lat, lon, radius, conf, alts = fuse(
        [
            head("clip", [(*STOCKHOLM, 1.0, 60.0)]),
            head("vlm", [(*SYDNEY, 1.0, 900.0)]),
        ],
        CFG,
    )
    to_sthlm = haversine_km(lat, lon, *STOCKHOLM)
    to_sydney = haversine_km(lat, lon, *SYDNEY)
    assert min(to_sthlm, to_sydney) < 500
    # Uncertainty must stay honest about the mode we did not pick.
    assert radius > 3000
    assert conf < 0.75
    # ...and that mode should still be offered as an alternative.
    assert any(
        haversine_km(a.lat, a.lon, *SYDNEY) < 500 or haversine_km(a.lat, a.lon, *STOCKHOLM) < 500
        for a in alts
    )


def test_exif_style_head_dominates():
    """A tight, high-trust head must not be dragged off by a vague one."""
    lat, lon, radius, _, _ = fuse(
        [
            HeadOutput("exif", [GeoCandidate(*STOCKHOLM, 1.0, 0.05, "exif")], trust=4.0),
            head("vlm", [(59.9, 10.7, 1.0, 300.0)]),  # Oslo, ~420 km away
        ],
        CFG,
    )
    assert haversine_km(lat, lon, *STOCKHOLM) < 5
    assert radius < 50


def test_trust_breaks_a_tie():
    a, b = (59.30, 18.00), (48.85, 2.35)
    lat, lon, _, _, _ = fuse(
        [head("a", [(*a, 1.0, 200.0)], trust=3.0), head("b", [(*b, 1.0, 200.0)], trust=0.4)],
        CFG,
    )
    assert haversine_km(lat, lon, *a) < haversine_km(lat, lon, *b)


def test_multi_candidate_head_prefers_its_heaviest_cluster():
    h = head(
        "clip",
        [(59.33, 18.06, 0.6, 60.0), (59.40, 18.10, 0.3, 60.0), (-33.86, 151.20, 0.1, 60.0)],
    )
    lat, lon, _, _, _ = fuse([h], CFG)
    assert haversine_km(lat, lon, *STOCKHOLM) < 100


def test_empty_input_is_rejected():
    with pytest.raises(ValueError):
        fuse([], CFG)
    with pytest.raises(ValueError):
        fuse([HeadOutput("a", [])], CFG)


def test_results_are_deterministic():
    heads = [head("a", [(*STOCKHOLM, 1.0, 100.0)]), head("b", [(59.5, 18.2, 1.0, 200.0)])]
    assert fuse(heads, CFG)[:4] == fuse(heads, CFG)[:4]
