"""Spherical geometry, scoring and sampling helpers.

Everything here works in degrees for input/output and radians internally.
Distances are great-circle kilometres on a sphere of radius EARTH_RADIUS_KM.
"""

from __future__ import annotations

import math
import random
from typing import Iterable, Sequence

EARTH_RADIUS_KM = 6371.0088

# Standard IM2GPS evaluation thresholds, in kilometres.
IM2GPS_THRESHOLDS_KM = (1.0, 25.0, 200.0, 750.0, 2500.0)


def normalize_lon(lon: float) -> float:
    """Wrap a longitude into [-180, 180)."""
    return (lon + 180.0) % 360.0 - 180.0


def clamp_lat(lat: float) -> float:
    return max(-90.0, min(90.0, lat))


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Great-circle distance in km between two lat/lon points in degrees."""
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = p2 - p1
    dl = math.radians(normalize_lon(lon2 - lon1))
    a = math.sin(dp / 2.0) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2.0) ** 2
    # asin form is numerically better than acos for small distances.
    return 2.0 * EARTH_RADIUS_KM * math.asin(min(1.0, math.sqrt(a)))


def to_unit_vector(lat: float, lon: float) -> tuple[float, float, float]:
    p, l = math.radians(lat), math.radians(lon)
    cp = math.cos(p)
    return (cp * math.cos(l), cp * math.sin(l), math.sin(p))


def from_unit_vector(x: float, y: float, z: float) -> tuple[float, float]:
    norm = math.sqrt(x * x + y * y + z * z)
    if norm == 0.0:
        return (0.0, 0.0)
    x, y, z = x / norm, y / norm, z / norm
    return (math.degrees(math.asin(max(-1.0, min(1.0, z)))), math.degrees(math.atan2(y, x)))


def spherical_mean(points: Sequence[tuple[float, float]], weights: Sequence[float] | None = None) -> tuple[float, float]:
    """Weighted mean direction of lat/lon points.

    Averaging in 3-D and re-projecting avoids the antimeridian bug you get from
    averaging longitudes directly.
    """
    if not points:
        raise ValueError("spherical_mean needs at least one point")
    if weights is None:
        weights = [1.0] * len(points)
    if len(weights) != len(points):
        raise ValueError("points and weights must be the same length")
    sx = sy = sz = 0.0
    for (lat, lon), w in zip(points, weights):
        vx, vy, vz = to_unit_vector(lat, lon)
        sx += w * vx
        sy += w * vy
        sz += w * vz
    if sx == 0.0 and sy == 0.0 and sz == 0.0:
        # Perfectly antipodal / cancelling set: fall back to the heaviest point.
        return max(zip(points, weights), key=lambda pw: pw[1])[0]
    return from_unit_vector(sx, sy, sz)


def destination_point(lat: float, lon: float, bearing_deg: float, distance_km: float) -> tuple[float, float]:
    """Point reached by travelling `distance_km` from (lat, lon) along `bearing_deg`."""
    ang = distance_km / EARTH_RADIUS_KM
    p1 = math.radians(lat)
    l1 = math.radians(lon)
    br = math.radians(bearing_deg)
    sin_p2 = math.sin(p1) * math.cos(ang) + math.cos(p1) * math.sin(ang) * math.cos(br)
    sin_p2 = max(-1.0, min(1.0, sin_p2))
    p2 = math.asin(sin_p2)
    l2 = l1 + math.atan2(
        math.sin(br) * math.sin(ang) * math.cos(p1),
        math.cos(ang) - math.sin(p1) * sin_p2,
    )
    return (math.degrees(p2), normalize_lon(math.degrees(l2)))


def sample_around(lat: float, lon: float, sigma_km: float, rng: random.Random) -> tuple[float, float]:
    """Draw a point around (lat, lon) with a 2-D Gaussian radial profile.

    The Rayleigh radius reproduces an isotropic 2-D Gaussian on the tangent
    plane, which is what the fusion kernels assume.
    """
    if sigma_km <= 0.0:
        return (lat, lon)
    radius = sigma_km * math.sqrt(-2.0 * math.log(max(1e-12, 1.0 - rng.random())))
    bearing = rng.uniform(0.0, 360.0)
    return destination_point(lat, lon, bearing, radius)


def geoguessr_score(distance_km: float, map_size_km: float = 14916.862) -> int:
    """GeoGuessr's 5000-point scoring curve for a world map.

    score = 5000 * exp(-10 * d / map_size)
    """
    if distance_km <= 0.0:
        return 5000
    return int(round(5000.0 * math.exp(-10.0 * distance_km / map_size_km)))


def threshold_accuracy(distances_km: Iterable[float], thresholds: Sequence[float] = IM2GPS_THRESHOLDS_KM) -> dict[float, float]:
    """Fraction of predictions within each threshold (the IM2GPS protocol)."""
    dists = list(distances_km)
    if not dists:
        return {t: 0.0 for t in thresholds}
    return {t: sum(1 for d in dists if d <= t) / len(dists) for t in thresholds}
