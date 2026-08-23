"""Build a labelled benchmark from Google Street View.

Guessing at one photo at a time tells you almost nothing. This samples random
points on the globe, snaps each to the nearest Street View panorama, and writes
the images out with the panorama's *own* coordinates as ground truth -- so the
labels are exact rather than approximate, and the sample is drawn from Street
View coverage rather than from whatever photos happened to be to hand.

Feed the result to `geolocate eval` for accuracy at the standard thresholds.

Needs a Google Maps API key (GOOGLE_MAPS_API_KEY). The metadata endpoint used
to find panoramas is free; only the image requests are billed.
"""

from __future__ import annotations

import csv
import json
import math
import os
import random
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path

META_URL = "https://maps.googleapis.com/maps/api/streetview/metadata"
IMAGE_URL = "https://maps.googleapis.com/maps/api/streetview"


class BenchmarkError(RuntimeError):
    pass


@dataclass
class BenchmarkConfig:
    n: int = 50
    seed: int = 0
    size: str = "640x640"
    fov: int = 90
    # How far a sampled point may snap to find a panorama.
    radius_m: int = 50_000
    # Street View is effectively absent outside this band.
    min_lat: float = -55.0
    max_lat: float = 70.0
    # Give up after this many samples per accepted panorama.
    max_attempts_per_hit: int = 40
    api_key: str = ""
    timeout_s: float = 30.0


def resolve_key(config: BenchmarkConfig) -> str:
    key = config.api_key or os.environ.get("GOOGLE_MAPS_API_KEY", "")
    if not key:
        raise BenchmarkError(
            "a Google Maps API key is required. Put GOOGLE_MAPS_API_KEY in your "
            ".env, or pass --google-key. Enable 'Street View Static API' for it at "
            "https://console.cloud.google.com/apis/library/street-view-image-backend.googleapis.com"
        )
    return key


def sample_point(rng: random.Random, config: BenchmarkConfig) -> tuple[float, float]:
    """Uniform over the sphere's surface within the latitude band.

    Sampling latitude uniformly in degrees would crowd the poles; inverting the
    sine gives equal area per sample.
    """
    lo, hi = math.sin(math.radians(config.min_lat)), math.sin(math.radians(config.max_lat))
    lat = math.degrees(math.asin(rng.uniform(lo, hi)))
    lon = rng.uniform(-180.0, 180.0)
    return lat, lon


def _get(url: str, params: dict, timeout: float) -> bytes:
    query = urllib.parse.urlencode(params)
    with urllib.request.urlopen(f"{url}?{query}", timeout=timeout) as resp:
        return resp.read()


def find_panorama(lat: float, lon: float, config: BenchmarkConfig, key: str) -> dict | None:
    """Nearest panorama to a point, or None. Free endpoint."""
    raw = _get(
        META_URL,
        {"location": f"{lat},{lon}", "radius": config.radius_m, "key": key},
        config.timeout_s,
    )
    data = json.loads(raw.decode("utf-8"))
    status = data.get("status")
    if status == "OK":
        loc = data.get("location") or {}
        if "lat" in loc and "lng" in loc:
            return {"lat": float(loc["lat"]), "lon": float(loc["lng"]),
                    "pano_id": data.get("pano_id", "")}
        return None
    if status in ("ZERO_RESULTS", "NOT_FOUND"):
        return None
    raise BenchmarkError(f"Street View metadata returned {status}: {data.get('error_message', '')}")


def fetch_image(pano: dict, heading: int, config: BenchmarkConfig, key: str) -> bytes:
    return _get(
        IMAGE_URL,
        {
            "size": config.size,
            "location": f"{pano['lat']},{pano['lon']}",
            "heading": heading,
            "fov": config.fov,
            "pitch": 0,
            "return_error_code": "true",
            "key": key,
        },
        config.timeout_s,
    )


def build(out_dir: str | os.PathLike[str], config: BenchmarkConfig | None = None,
          progress=None) -> Path:
    """Download a benchmark set. Returns the path to the dataset CSV."""
    config = config or BenchmarkConfig()
    key = resolve_key(config)

    out = Path(out_dir)
    images = out / "images"
    images.mkdir(parents=True, exist_ok=True)

    rng = random.Random(config.seed)
    rows: list[dict] = []
    attempts = 0
    budget = config.n * config.max_attempts_per_hit

    while len(rows) < config.n and attempts < budget:
        attempts += 1
        lat, lon = sample_point(rng, config)
        try:
            pano = find_panorama(lat, lon, config, key)
        except BenchmarkError:
            raise
        except Exception:
            continue  # transient network trouble: just try another point
        if not pano:
            continue

        heading = rng.randrange(0, 360)
        try:
            blob = fetch_image(pano, heading, config, key)
        except Exception:
            continue
        # A billing or quota failure returns a tiny error body, not a JPEG.
        if len(blob) < 5000 or not blob.startswith(b"\xff\xd8"):
            continue

        name = f"{len(rows):04d}.jpg"
        (images / name).write_bytes(blob)
        rows.append({
            "image": f"images/{name}",
            "lat": round(pano["lat"], 6),
            "lon": round(pano["lon"], 6),
            "heading": heading,
            "pano_id": pano["pano_id"],
        })
        if progress:
            progress(len(rows), config.n, pano)

    if not rows:
        raise BenchmarkError(
            f"no panoramas found in {attempts} attempts. Check that the Street View "
            "Static API is enabled for your key and that billing is active."
        )

    csv_path = out / "benchmark.csv"
    with open(csv_path, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=["image", "lat", "lon", "heading", "pano_id"])
        writer.writeheader()
        writer.writerows(rows)
    return csv_path
