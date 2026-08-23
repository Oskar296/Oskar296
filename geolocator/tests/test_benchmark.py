"""Street View benchmark builder, with the network mocked."""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest

from geolocator import benchmark as bm

JPEG = b"\xff\xd8" + b"x" * 9000


def test_requires_a_key(monkeypatch):
    monkeypatch.delenv("GOOGLE_MAPS_API_KEY", raising=False)
    with pytest.raises(bm.BenchmarkError, match="Google Maps API key"):
        bm.resolve_key(bm.BenchmarkConfig())


def test_key_comes_from_config_or_environment(monkeypatch):
    monkeypatch.setenv("GOOGLE_MAPS_API_KEY", "from-env")
    assert bm.resolve_key(bm.BenchmarkConfig()) == "from-env"
    assert bm.resolve_key(bm.BenchmarkConfig(api_key="explicit")) == "explicit"


def test_sampling_stays_in_band_and_is_equal_area():
    import math
    import random

    cfg = bm.BenchmarkConfig(min_lat=-55, max_lat=70)
    rng = random.Random(7)
    pts = [bm.sample_point(rng, cfg) for _ in range(20000)]
    assert all(cfg.min_lat <= la <= cfg.max_lat for la, _ in pts)
    assert all(-180 <= lo <= 180 for _, lo in pts)

    # Equal-area sampling: the share above 45N must match the spherical cap.
    lo_s, hi_s = math.sin(math.radians(-55)), math.sin(math.radians(70))
    expected = (hi_s - math.sin(math.radians(45))) / (hi_s - lo_s)
    got = sum(1 for la, _ in pts if la > 45) / len(pts)
    assert got == pytest.approx(expected, abs=0.01)


def test_find_panorama_reads_the_snapped_location(monkeypatch):
    payload = json.dumps({
        "status": "OK", "pano_id": "abc",
        "location": {"lat": 48.8584, "lng": 2.2945},
    }).encode()
    monkeypatch.setattr(bm, "_get", lambda url, params, timeout: payload)
    got = bm.find_panorama(48.0, 2.0, bm.BenchmarkConfig(), "k")
    # Ground truth is the panorama's own position, not the sampled point.
    assert got == {"lat": 48.8584, "lon": 2.2945, "pano_id": "abc"}


def test_find_panorama_returns_none_for_empty_water(monkeypatch):
    monkeypatch.setattr(bm, "_get",
                        lambda url, params, timeout: b'{"status":"ZERO_RESULTS"}')
    assert bm.find_panorama(0, 0, bm.BenchmarkConfig(), "k") is None


def test_find_panorama_raises_on_a_real_api_error(monkeypatch):
    monkeypatch.setattr(bm, "_get", lambda url, params, timeout:
                        b'{"status":"REQUEST_DENIED","error_message":"bad key"}')
    with pytest.raises(bm.BenchmarkError, match="REQUEST_DENIED"):
        bm.find_panorama(0, 0, bm.BenchmarkConfig(), "k")


def test_build_writes_images_and_exact_ground_truth(tmp_path, monkeypatch):
    monkeypatch.setenv("GOOGLE_MAPS_API_KEY", "k")
    seen = []

    def fake_find(lat, lon, config, key):
        seen.append((lat, lon))
        # Every other sample is water, to exercise the retry path.
        if len(seen) % 2 == 0:
            return None
        return {"lat": 10.5 + len(seen), "lon": 20.25, "pano_id": f"p{len(seen)}"}

    monkeypatch.setattr(bm, "find_panorama", fake_find)
    monkeypatch.setattr(bm, "fetch_image", lambda *a, **k: JPEG)

    csv_path = bm.build(tmp_path, bm.BenchmarkConfig(n=3))
    assert csv_path.name == "benchmark.csv"

    import csv as _csv
    rows = list(_csv.DictReader(open(csv_path, encoding="utf-8")))
    assert len(rows) == 3
    assert {"image", "lat", "lon", "heading", "pano_id"} <= set(rows[0])
    for r in rows:
        assert (tmp_path / r["image"]).read_bytes() == JPEG
        assert 0 <= int(r["heading"]) < 360

    # The dataset must load straight into the evaluator.
    from geolocator.evaluate import load_dataset
    items = load_dataset(str(csv_path))
    assert len(items) == 3
    assert os.path.isabs(items[0].path)


def test_build_rejects_error_bodies_masquerading_as_images(tmp_path, monkeypatch):
    """A quota or billing failure returns a short non-JPEG body, not a picture."""
    monkeypatch.setenv("GOOGLE_MAPS_API_KEY", "k")
    monkeypatch.setattr(bm, "find_panorama",
                        lambda *a, **k: {"lat": 1.0, "lon": 2.0, "pano_id": "p"})
    monkeypatch.setattr(bm, "fetch_image", lambda *a, **k: b"over quota")
    with pytest.raises(bm.BenchmarkError, match="no panoramas"):
        bm.build(tmp_path, bm.BenchmarkConfig(n=2, max_attempts_per_hit=3))


def test_build_gives_up_rather_than_looping_forever(tmp_path, monkeypatch):
    monkeypatch.setenv("GOOGLE_MAPS_API_KEY", "k")
    calls = []
    monkeypatch.setattr(bm, "find_panorama", lambda *a, **k: calls.append(1) or None)
    with pytest.raises(bm.BenchmarkError):
        bm.build(tmp_path, bm.BenchmarkConfig(n=2, max_attempts_per_hit=5))
    assert len(calls) == 10  # n * max_attempts_per_hit, then it stops
