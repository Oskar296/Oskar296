"""Cross-head re-ranking.

The reasoner already produces a distribution over countries as a by-product of
reading signage and traffic conventions, and until now nothing consumed it. The
retrieval head, meanwhile, routinely gets the *look* of a place right and the
country wrong: boreal Sweden and boreal Finland are near-identical to an image
embedding, and a 30 km error and a 500 km error look the same to it.

Re-ranking retrieval's candidates by the reasoner's country prior fixes exactly
that failure. It is deliberately a nudge, not a veto:

* The reasoner's belief already enters fusion through its own spatial kernels,
  so letting it dominate here too would count the same evidence twice. `alpha`
  below 1 damps the re-rank into a tie-breaker among retrieval candidates that
  were already close in score.
* `floor` keeps a country the reasoner never mentioned from being zeroed, so a
  confidently wrong reasoner costs accuracy rather than destroying it.
"""

from __future__ import annotations

from dataclasses import dataclass

from . import places
from .types import GeoCandidate, HeadOutput


@dataclass
class RerankConfig:
    enabled: bool = True
    # Exponent on the country prior. 1.0 would apply it in full; less than that
    # damps the double-counting described above.
    alpha: float = 0.5
    # Smallest prior any country may receive, so nothing is zeroed outright.
    floor: float = 0.08
    # Candidates to keep after re-ranking.
    top_k: int = 24


def _country_prior(reasoner: HeadOutput) -> dict[str, float]:
    """iso2 -> probability, from the reasoner's own country distribution."""
    raw = (reasoner.evidence or {}).get("countries") or []
    prior: dict[str, float] = {}
    for entry in raw:
        if not isinstance(entry, dict):
            continue
        code = str(entry.get("iso2", "")).strip().upper()
        if len(code) != 2:
            continue
        try:
            p = float(entry.get("probability", 0.0))
        except (TypeError, ValueError):
            continue
        if p > 0:
            prior[code] = prior.get(code, 0.0) + p
    total = sum(prior.values())
    if total <= 0:
        return {}
    return {k: v / total for k, v in prior.items()}


def apply_country_prior(
    retrieval: HeadOutput,
    reasoner: HeadOutput,
    config: RerankConfig | None = None,
) -> tuple[HeadOutput, dict]:
    """Re-weight retrieval candidates by the reasoner's country distribution.

    Returns the adjusted head and a small report describing what changed.
    """
    config = config or RerankConfig()
    if not config.enabled or not retrieval.candidates:
        return retrieval, {"applied": False, "reason": "disabled or no candidates"}

    prior = _country_prior(reasoner)
    if not prior:
        return retrieval, {"applied": False, "reason": "reasoner gave no country distribution"}

    codes = places.reverse_many([(c.lat, c.lon) for c in retrieval.candidates])
    before = retrieval.candidates[0]

    rescored: list[GeoCandidate] = []
    for cand, place in zip(retrieval.candidates, codes):
        code = (place.country_code or "").upper()
        p = max(prior.get(code, 0.0), config.floor)
        rescored.append(
            GeoCandidate(
                lat=cand.lat,
                lon=cand.lon,
                weight=cand.weight * (p**config.alpha),
                sigma_km=cand.sigma_km,
                source=cand.source,
                label=cand.label,
            )
        )

    rescored.sort(key=lambda c: c.weight, reverse=True)
    rescored = rescored[: config.top_k]
    total = sum(c.weight for c in rescored)
    if total <= 0:
        return retrieval, {"applied": False, "reason": "re-ranking zeroed every candidate"}
    for c in rescored:
        c.weight /= total

    adjusted = HeadOutput(
        name=retrieval.name,
        candidates=rescored,
        trust=retrieval.trust,
        rationale=retrieval.rationale,
        evidence=dict(retrieval.evidence),
    )
    moved = (rescored[0].lat, rescored[0].lon) != (before.lat, before.lon)
    report = {
        "applied": True,
        "alpha": config.alpha,
        "countries": sorted(prior.items(), key=lambda kv: -kv[1])[:5],
        "top_candidate_changed": moved,
        "kept": len(rescored),
    }
    adjusted.evidence["country_rerank"] = report
    return adjusted, report
