"""Cross-head country re-ranking."""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest

from geolocator.rerank import RerankConfig, apply_country_prior, _country_prior
from geolocator.types import GeoCandidate, HeadOutput

# Two visually near-identical boreal candidates, one either side of a border.
SWEDEN = (59.33, 18.06)
FINLAND = (60.17, 24.94)


def _retrieval(*points):
    return HeadOutput(
        "retrieval",
        [GeoCandidate(lat, lon, w, 50.0, "retrieval") for lat, lon, w in points],
    )


def _reasoner(countries):
    return HeadOutput(
        "reasoner",
        [GeoCandidate(59.0, 18.0, 1.0, 200.0, "reasoner")],
        evidence={"countries": countries},
    )


def test_promotes_the_country_the_reasoner_identified():
    """The failure this exists to fix: retrieval right about the biome, wrong
    about the country, while the reasoner has read the language off a sign."""
    retrieval = _retrieval((*FINLAND, 0.55), (*SWEDEN, 0.45))
    assert retrieval.candidates[0].lat == FINLAND[0]

    out, report = apply_country_prior(
        retrieval, _reasoner([{"name": "Sweden", "iso2": "SE", "probability": 0.95}])
    )
    assert report["applied"] is True
    assert report["top_candidate_changed"] is True
    assert out.candidates[0].lat == pytest.approx(SWEDEN[0])


def test_leaves_a_confident_retrieval_alone_when_countries_agree():
    retrieval = _retrieval((*SWEDEN, 0.8), (*FINLAND, 0.2))
    out, report = apply_country_prior(
        retrieval, _reasoner([{"name": "Sweden", "iso2": "SE", "probability": 0.9}])
    )
    assert report["top_candidate_changed"] is False
    assert out.candidates[0].lat == pytest.approx(SWEDEN[0])


def test_floor_stops_a_wrong_reasoner_from_erasing_a_country():
    """A reasoner certain of the wrong country must cost accuracy, not destroy it."""
    retrieval = _retrieval((*SWEDEN, 0.97), (*FINLAND, 0.03))
    out, _ = apply_country_prior(
        retrieval,
        _reasoner([{"name": "Brazil", "iso2": "BR", "probability": 1.0}]),
        RerankConfig(floor=0.08),
    )
    # Sweden was never mentioned, but its huge retrieval lead must survive.
    assert out.candidates[0].lat == pytest.approx(SWEDEN[0])
    assert out.candidates[0].weight > 0


def test_alpha_controls_how_hard_the_prior_bites():
    retrieval = _retrieval((*FINLAND, 0.55), (*SWEDEN, 0.45))
    prior = _reasoner([{"name": "Sweden", "iso2": "SE", "probability": 0.95}])

    gentle, _ = apply_country_prior(retrieval, prior, RerankConfig(alpha=0.05))
    firm, _ = apply_country_prior(retrieval, prior, RerankConfig(alpha=1.0))

    def sweden_weight(head):
        return next(c.weight for c in head.candidates if c.lat == pytest.approx(SWEDEN[0]))

    assert sweden_weight(firm) > sweden_weight(gentle)


def test_weights_are_renormalised():
    retrieval = _retrieval((*SWEDEN, 0.5), (*FINLAND, 0.3), (48.85, 2.35, 0.2))
    out, _ = apply_country_prior(
        retrieval, _reasoner([{"name": "Sweden", "iso2": "SE", "probability": 0.8}])
    )
    assert sum(c.weight for c in out.candidates) == pytest.approx(1.0)


def test_trims_to_top_k():
    pts = [(59.0 + i * 0.1, 18.0, 1.0 / 40) for i in range(40)]
    out, _ = apply_country_prior(
        _retrieval(*pts),
        _reasoner([{"name": "Sweden", "iso2": "SE", "probability": 1.0}]),
        RerankConfig(top_k=5),
    )
    assert len(out.candidates) == 5


def test_no_country_distribution_is_a_no_op():
    retrieval = _retrieval((*SWEDEN, 1.0))
    out, report = apply_country_prior(retrieval, _reasoner([]))
    assert report["applied"] is False
    assert out is retrieval


def test_malformed_country_entries_are_ignored():
    assert _country_prior(_reasoner([{"iso2": "TOOLONG", "probability": 1.0}])) == {}
    assert _country_prior(_reasoner([{"iso2": "SE", "probability": "nonsense"}])) == {}
    assert _country_prior(_reasoner(["not a dict"])) == {}
    prior = _country_prior(
        _reasoner([{"iso2": "se", "probability": 2.0}, {"iso2": "NO", "probability": 2.0}])
    )
    assert prior == {"SE": pytest.approx(0.5), "NO": pytest.approx(0.5)}


def test_disabled_config_is_a_no_op():
    retrieval = _retrieval((*SWEDEN, 1.0))
    out, report = apply_country_prior(
        retrieval,
        _reasoner([{"name": "Sweden", "iso2": "SE", "probability": 1.0}]),
        RerankConfig(enabled=False),
    )
    assert report["applied"] is False
    assert out is retrieval
