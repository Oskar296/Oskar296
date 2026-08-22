"""EXIF GPS head.

Plenty of real photographs already carry the answer in their metadata. When
they do, nothing the vision models produce should be allowed to override it, so
this head reports a very small sigma and a high trust. It stays silent when the
tags are missing, malformed, or a null-island (0, 0) placeholder.
"""

from __future__ import annotations

from .types import GeoCandidate, HeadOutput

_GPS_IFD = 0x8825
_TAG_LAT_REF, _TAG_LAT = 1, 2
_TAG_LON_REF, _TAG_LON = 3, 4
_TAG_HPOS_ERROR = 31


def _to_degrees(value) -> float | None:
    """Convert EXIF (degrees, minutes, seconds) rationals to signed degrees."""
    try:
        d, m, s = (float(x) for x in value)
    except (TypeError, ValueError):
        return None
    return d + m / 60.0 + s / 3600.0


def extract(image) -> HeadOutput | None:
    try:
        exif = image.getexif()
        gps = exif.get_ifd(_GPS_IFD) if exif else None
    except Exception:  # noqa: BLE001 - malformed EXIF must never be fatal
        return None
    if not gps:
        return None

    lat = _to_degrees(gps.get(_TAG_LAT))
    lon = _to_degrees(gps.get(_TAG_LON))
    if lat is None or lon is None:
        return None

    if str(gps.get(_TAG_LAT_REF, "N")).upper().startswith("S"):
        lat = -lat
    if str(gps.get(_TAG_LON_REF, "E")).upper().startswith("W"):
        lon = -lon

    # (0, 0) is in the Gulf of Guinea and is almost always a stripped tag.
    if abs(lat) < 1e-7 and abs(lon) < 1e-7:
        return None
    if not (-90.0 <= lat <= 90.0) or not (-180.0 <= lon <= 180.0):
        return None

    sigma_km = 0.05
    try:
        reported = gps.get(_TAG_HPOS_ERROR)
        if reported is not None:
            sigma_km = max(0.01, float(reported) / 1000.0)
    except (TypeError, ValueError):
        pass

    return HeadOutput(
        name="exif",
        candidates=[GeoCandidate(lat, lon, 1.0, sigma_km, "exif", "EXIF GPS tag")],
        trust=4.0,
        rationale="The image carries a GPS position in its EXIF metadata.",
        evidence={"sigma_km": sigma_km},
    )
