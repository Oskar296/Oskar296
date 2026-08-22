"""Offline reverse geocoding.

Uses a bundled GeoNames extract so a prediction can be named without a network
round trip, which keeps the whole pipeline runnable offline once the model
weights are cached.
"""

from __future__ import annotations

from .types import Place

_COUNTRIES: dict[str, str] = {}
_SEARCH = None


def _load_country_names() -> dict[str, str]:
    global _COUNTRIES
    if _COUNTRIES:
        return _COUNTRIES
    try:
        import csv
        import io
        import reverse_geocoder  # noqa: F401  (only needed for its data dir)
        import pycountry  # type: ignore

        _COUNTRIES = {c.alpha_2: c.name for c in pycountry.countries}
    except Exception:  # noqa: BLE001 - pycountry is optional
        _COUNTRIES = {}
    return _COUNTRIES


def reverse_many(coords: list[tuple[float, float]]) -> list[Place]:
    """Reverse geocode many points in one query.

    reverse_geocoder builds a KD-tree over the whole gazetteer, so one batched
    call costs barely more than a single lookup and far less than N of them.
    """
    global _SEARCH
    if not coords:
        return []
    try:
        import reverse_geocoder as rg

        if _SEARCH is None:
            _SEARCH = rg.RGeocoder(mode=1, verbose=False)
        hits = _SEARCH.query(list(coords))
    except Exception:  # noqa: BLE001
        return [Place() for _ in coords]

    names = _load_country_names()
    out: list[Place] = []
    for hit in hits:
        cc = hit.get("cc", "")
        out.append(
            Place(
                name=hit.get("name", ""),
                admin1=hit.get("admin1", ""),
                admin2=hit.get("admin2", ""),
                country_code=cc,
                country=names.get(cc, cc),
            )
        )
    return out


def reverse(lat: float, lon: float) -> Place:
    """Nearest populated place to a coordinate. Returns an empty Place on failure."""
    global _SEARCH
    try:
        import reverse_geocoder as rg

        if _SEARCH is None:
            # mode=1 is the single-threaded path; it avoids spawning processes
            # inside servers and short-lived CLI runs.
            _SEARCH = rg.RGeocoder(mode=1, verbose=False)
        hit = _SEARCH.query([(lat, lon)])[0]
    except Exception:  # noqa: BLE001 - never let naming break a prediction
        return Place()

    cc = hit.get("cc", "")
    return Place(
        name=hit.get("name", ""),
        admin1=hit.get("admin1", ""),
        admin2=hit.get("admin2", ""),
        country_code=cc,
        country=_load_country_names().get(cc, cc),
    )
