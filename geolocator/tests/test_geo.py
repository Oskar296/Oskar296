import math
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest

from geolocator.geo import (
    destination_point,
    geoguessr_score,
    haversine_km,
    normalize_lon,
    sample_around,
    spherical_mean,
    threshold_accuracy,
)


def test_haversine_known_pairs():
    # Reference great-circle distances, tolerance 0.5%.
    assert haversine_km(40.7128, -74.0060, 51.5074, -0.1278) == pytest.approx(5570, rel=0.005)
    assert haversine_km(-33.8688, 151.2093, 35.6762, 139.6503) == pytest.approx(7823, rel=0.005)
    assert haversine_km(0, 0, 0, 180) == pytest.approx(20015, rel=0.005)


def test_haversine_identity_and_symmetry():
    assert haversine_km(12.5, -3.2, 12.5, -3.2) == 0.0
    assert haversine_km(1, 2, 3, 4) == pytest.approx(haversine_km(3, 4, 1, 2))


def test_haversine_across_antimeridian_is_short():
    # Two points 2 degrees apart either side of the date line.
    assert haversine_km(0, 179, 0, -179) == pytest.approx(222.4, rel=0.01)


def test_normalize_lon_wraps():
    assert normalize_lon(190) == -170
    assert normalize_lon(-190) == 170
    assert normalize_lon(180) == -180


def test_spherical_mean_avoids_antimeridian_bug():
    lat, lon = spherical_mean([(0.0, 179.0), (0.0, -179.0)])
    assert lat == pytest.approx(0.0, abs=1e-6)
    # Naive averaging would give 0; the correct answer is the date line.
    assert abs(abs(lon) - 180.0) < 1e-6


def test_spherical_mean_respects_weights():
    lat, _ = spherical_mean([(0.0, 0.0), (10.0, 0.0)], [3.0, 1.0])
    assert 2.0 < lat < 3.0


def test_destination_point_round_trips():
    start = (48.8566, 2.3522)
    for bearing in (0, 45, 90, 180, 270):
        dest = destination_point(*start, bearing, 250.0)
        assert haversine_km(*start, *dest) == pytest.approx(250.0, rel=1e-6)


def test_sample_around_has_expected_spread():
    import random

    rng = random.Random(7)
    sigma = 100.0
    dists = [
        haversine_km(20.0, 30.0, *sample_around(20.0, 30.0, sigma, rng)) for _ in range(4000)
    ]
    # For an isotropic 2-D Gaussian the mean radius is sigma*sqrt(pi/2).
    assert sum(dists) / len(dists) == pytest.approx(sigma * math.sqrt(math.pi / 2), rel=0.06)


def test_geoguessr_score_curve():
    assert geoguessr_score(0) == 5000
    assert geoguessr_score(1) == 4997  # the curve decays immediately away from zero
    assert 4600 < geoguessr_score(100) < 4700
    assert geoguessr_score(20000) < 10


def test_threshold_accuracy():
    acc = threshold_accuracy([0.5, 10.0, 100.0, 5000.0], (1.0, 25.0, 200.0))
    assert acc[1.0] == 0.25
    assert acc[25.0] == 0.5
    assert acc[200.0] == 0.75
