"""Shared data types passed between the prediction heads and the fusion stage."""

from __future__ import annotations

from dataclasses import dataclass, field, asdict
from typing import Any

from .geo import clamp_lat, normalize_lon


@dataclass
class GeoCandidate:
    """One hypothesis about where a photo was taken.

    `sigma_km` is the 1-sigma radius the producing head attaches to the guess:
    a head that read a street sign should report a small sigma, one going on
    vegetation alone should report a large one. Fusion relies on these being
    honest, so each head calibrates its own.
    """

    lat: float
    lon: float
    weight: float = 1.0
    sigma_km: float = 100.0
    source: str = "unknown"
    label: str = ""

    def __post_init__(self) -> None:
        self.lat = clamp_lat(float(self.lat))
        self.lon = normalize_lon(float(self.lon))
        self.weight = max(0.0, float(self.weight))
        # Floor at one metre: only to keep the Gaussian kernels non-degenerate.
        # It must stay below GPS precision or it would blunt the EXIF head.
        self.sigma_km = max(1e-3, float(self.sigma_km))

    def as_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class HeadOutput:
    """A full distribution from one prediction head."""

    name: str
    candidates: list[GeoCandidate] = field(default_factory=list)
    # How much this head should count in fusion, relative to other heads.
    trust: float = 1.0
    # Free-form notes surfaced to the user (the reasoner fills this in).
    rationale: str = ""
    evidence: dict[str, Any] = field(default_factory=dict)

    def normalized(self) -> list[GeoCandidate]:
        """Candidates with weights summing to 1."""
        total = sum(c.weight for c in self.candidates)
        if total <= 0.0:
            n = len(self.candidates)
            return [
                GeoCandidate(c.lat, c.lon, 1.0 / n, c.sigma_km, c.source, c.label)
                for c in self.candidates
            ] if n else []
        return [
            GeoCandidate(c.lat, c.lon, c.weight / total, c.sigma_km, c.source, c.label)
            for c in self.candidates
        ]


@dataclass
class Place:
    """Offline reverse-geocoding result."""

    name: str = ""
    admin1: str = ""
    admin2: str = ""
    country_code: str = ""
    country: str = ""

    def describe(self) -> str:
        parts = [p for p in (self.name, self.admin1, self.country) if p]
        # Drop an admin1 that just repeats the city name (common for city-states).
        seen: list[str] = []
        for p in parts:
            if p not in seen:
                seen.append(p)
        return ", ".join(seen)


@dataclass
class Prediction:
    """The final answer handed back to the caller."""

    lat: float
    lon: float
    # Radius containing `confidence_mass` of the fused probability.
    radius_km: float
    confidence: float
    place: Place = field(default_factory=Place)
    alternatives: list[GeoCandidate] = field(default_factory=list)
    heads: list[HeadOutput] = field(default_factory=list)
    rationale: str = ""

    def as_dict(self) -> dict[str, Any]:
        return {
            "lat": round(self.lat, 6),
            "lon": round(self.lon, 6),
            # Keep real precision for sub-kilometre radii (EXIF hits land here).
            "radius_km": round(self.radius_km, 3 if self.radius_km < 1.0 else 1),
            "confidence": round(self.confidence, 4),
            "place": asdict(self.place),
            "description": self.place.describe(),
            "rationale": self.rationale,
            "alternatives": [
                {**c.as_dict(), "lat": round(c.lat, 6), "lon": round(c.lon, 6)}
                for c in self.alternatives
            ],
            "heads": [
                {
                    "name": h.name,
                    "trust": h.trust,
                    "rationale": h.rationale,
                    "evidence": h.evidence,
                    "top": [c.as_dict() for c in h.candidates[:5]],
                }
                for h in self.heads
            ],
        }
