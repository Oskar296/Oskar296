"""Fuse several prediction heads into a single calibrated answer.

Each head hands us a mixture of Gaussian kernels on the sphere. We combine the
heads as a *product of experts* rather than a mixture, because that is what
gives the behaviour we want: two independent heads that agree should produce a
tighter posterior than either alone, while a mixture would only ever be as
sharp as its sharpest component.

The product is taken over densities that each carry a small uniform "escape"
component. Without it a single confident-but-wrong head could veto every
location the other head proposes, and the product would collapse to noise.
"""

from __future__ import annotations

import math
import random
from dataclasses import dataclass

from .geo import (
    EARTH_RADIUS_KM,
    haversine_km,
    sample_around,
    spherical_mean,
)
from .types import GeoCandidate, HeadOutput

# Area of the Earth in km^2; a uniform density over the globe is 1/this.
_EARTH_AREA_KM2 = 4.0 * math.pi * EARTH_RADIUS_KM**2
_LOG_UNIFORM_DENSITY = -math.log(_EARTH_AREA_KM2)

# Probability that a head is simply wrong about the whole region. Keeps the
# product finite everywhere so heads can outvote rather than annihilate.
DEFAULT_ESCAPE = 0.02


@dataclass
class FusionConfig:
    escape: float = DEFAULT_ESCAPE
    # Samples used to estimate the posterior radius and confidence.
    n_samples: int = 20000
    # Mass captured by the reported radius.
    radius_mass: float = 0.68
    # Confidence is reported as the posterior mass within this radius.
    confidence_radius_km: float = 200.0
    # Alternatives must be at least this far from every better one.
    alternative_separation_km: float = 250.0
    max_alternatives: int = 5
    seed: int = 0


def _log_kernel(distance_km: float, sigma_km: float) -> float:
    """Log of a normalised 2-D Gaussian on the tangent plane, per km^2."""
    return -math.log(2.0 * math.pi * sigma_km * sigma_km) - (distance_km * distance_km) / (
        2.0 * sigma_km * sigma_km
    )


def _logsumexp(values: list[float]) -> float:
    if not values:
        return -math.inf
    hi = max(values)
    if hi == -math.inf:
        return -math.inf
    return hi + math.log(sum(math.exp(v - hi) for v in values))


class _HeadDensity:
    """Log-density of one head: a Gaussian mixture plus a uniform floor."""

    def __init__(self, head: HeadOutput, escape: float) -> None:
        self.name = head.name
        self.trust = max(0.0, float(head.trust))
        self.components = head.normalized()
        self.escape = min(0.5, max(0.0, escape))
        self._log_keep = math.log(1.0 - self.escape) if self.escape < 1.0 else -math.inf
        self._log_escape = (
            math.log(self.escape) + _LOG_UNIFORM_DENSITY if self.escape > 0.0 else -math.inf
        )

    def log_density(self, lat: float, lon: float) -> float:
        if not self.components:
            return _LOG_UNIFORM_DENSITY
        terms = [
            math.log(c.weight) + _log_kernel(haversine_km(lat, lon, c.lat, c.lon), c.sigma_km)
            for c in self.components
            if c.weight > 0.0
        ]
        mixture = _logsumexp(terms)
        return _logsumexp([self._log_keep + mixture, self._log_escape])


class FusedPosterior:
    """The product-of-experts posterior over the globe."""

    def __init__(self, heads: list[HeadOutput], config: FusionConfig) -> None:
        self.config = config
        self.densities = [_HeadDensity(h, config.escape) for h in heads if h.candidates]
        self.total_trust = sum(d.trust for d in self.densities)

    @property
    def is_empty(self) -> bool:
        return not self.densities

    def log_density(self, lat: float, lon: float) -> float:
        """Unnormalised log posterior. Weights are *not* renormalised to sum to
        one: that is deliberate, and it is what makes agreement sharpen the
        result the way independent evidence should."""
        return sum(d.trust * d.log_density(lat, lon) for d in self.densities)

    # -- proposal distribution, used for importance sampling ---------------

    def _proposal_components(self) -> list[tuple[GeoCandidate, float]]:
        out: list[tuple[GeoCandidate, float]] = []
        if self.total_trust <= 0.0:
            return out
        for d in self.densities:
            share = d.trust / self.total_trust
            for c in d.components:
                if c.weight > 0.0:
                    out.append((c, share * c.weight))
        return out

    def _log_proposal(self, lat: float, lon: float, components: list[tuple[GeoCandidate, float]]) -> float:
        terms = [
            math.log(w) + _log_kernel(haversine_km(lat, lon, c.lat, c.lon), c.sigma_km)
            for c, w in components
            if w > 0.0
        ]
        return _logsumexp(terms)

    def sample_posterior(self) -> tuple[list[tuple[float, float]], list[float]]:
        """Importance samples from the posterior, with normalised weights.

        Proposal is the trust-weighted mixture of every head's components, so
        it covers every region the posterior can put mass on (bar the diffuse
        escape floor, which by construction carries almost none).
        """
        components = self._proposal_components()
        if not components:
            return [], []
        rng = random.Random(self.config.seed)
        cum: list[float] = []
        running = 0.0
        for _, w in components:
            running += w
            cum.append(running)
        if running <= 0.0:
            return [], []

        points: list[tuple[float, float]] = []
        log_weights: list[float] = []
        for _ in range(self.config.n_samples):
            u = rng.random() * running
            idx = min(len(cum) - 1, _bisect(cum, u))
            comp = components[idx][0]
            lat, lon = sample_around(comp.lat, comp.lon, comp.sigma_km, rng)
            lq = self._log_proposal(lat, lon, components)
            lp = self.log_density(lat, lon)
            points.append((lat, lon))
            log_weights.append(lp - lq)

        hi = max(log_weights)
        weights = [math.exp(lw - hi) for lw in log_weights]
        total = sum(weights)
        if total <= 0.0:
            return points, [1.0 / len(points)] * len(points)
        return points, [w / total for w in weights]


def _bisect(cum: list[float], target: float) -> int:
    lo, hi = 0, len(cum) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if cum[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo


def _seed_points(heads: list[HeadOutput]) -> list[GeoCandidate]:
    seeds: list[GeoCandidate] = []
    for h in heads:
        seeds.extend(h.normalized())
    return seeds


def _refine(posterior: FusedPosterior, lat: float, lon: float, start_km: float) -> tuple[float, float]:
    """Local hill-climb.

    The product's peak often sits *between* two nearby components, so the best
    seed is rarely the best point. A shrinking random search finds that peak
    without needing gradients on the sphere.
    """
    rng = random.Random(posterior.config.seed + 977)
    best = (lat, lon)
    best_lp = posterior.log_density(lat, lon)
    radius = max(1.0, start_km)
    while radius > 0.5:
        improved = False
        for _ in range(24):
            cand = sample_around(best[0], best[1], radius, rng)
            lp = posterior.log_density(cand[0], cand[1])
            if lp > best_lp:
                best, best_lp, improved = cand, lp, True
        if not improved:
            radius *= 0.5
    return best


def _weighted_quantile(values: list[float], weights: list[float], q: float) -> float:
    if not values:
        return 0.0
    order = sorted(range(len(values)), key=lambda i: values[i])
    running = 0.0
    for i in order:
        running += weights[i]
        if running >= q:
            return values[i]
    return values[order[-1]]


def _mode_anchors(posterior: "FusedPosterior", scored, separation_km: float) -> list[GeoCandidate]:
    """Distinct mode anchors, best-scoring first, spaced at least `separation_km` apart."""
    anchors: list[GeoCandidate] = []
    for _lp, cand in scored:
        if all(
            haversine_km(a.lat, a.lon, cand.lat, cand.lon) >= separation_km for a in anchors
        ):
            anchors.append(cand)
    return anchors or [scored[0][1]]


def fuse(heads: list[HeadOutput], config: FusionConfig | None = None):
    """Combine heads into a point estimate, a radius and alternatives.

    Returns (lat, lon, radius_km, confidence, alternatives).
    """
    from .types import GeoCandidate as _GC

    config = config or FusionConfig()
    live = [h for h in heads if h.candidates and h.trust > 0.0]
    if not live:
        raise ValueError("fuse() needs at least one head with candidates")

    posterior = FusedPosterior(live, config)
    seeds = _seed_points(live)

    scored = sorted(
        ((posterior.log_density(c.lat, c.lon), c) for c in seeds),
        key=lambda t: t[0],
        reverse=True,
    )
    best_seed = scored[0][1]
    lat, lon = _refine(posterior, best_seed.lat, best_seed.lon, best_seed.sigma_km)

    points, weights = posterior.sample_posterior()
    if points:
        # Anchor the point estimate in the dominant mode. Averaging across a
        # multi-modal posterior would put the answer in the empty space between
        # modes -- halfway between Stockholm and Sydney is central Russia, which
        # is the one place the photo certainly was not taken.
        anchors = _mode_anchors(posterior, scored, config.alternative_separation_km)
        mass = [0.0] * len(anchors)
        assign = []
        for (plat, plon), w in zip(points, weights):
            k = min(
                range(len(anchors)),
                key=lambda a: haversine_km(plat, plon, anchors[a].lat, anchors[a].lon),
            )
            mass[k] += w
            assign.append(k)
        dominant = max(range(len(anchors)), key=lambda a: mass[a])
        cluster = [(p, w) for p, w, a in zip(points, weights, assign) if a == dominant]
        if cluster:
            clat, clon = spherical_mean([p for p, _ in cluster], [w for _, w in cluster])
            lat, lon = _refine(posterior, clat, clon, anchors[dominant].sigma_km)

        # Radius and confidence stay global: they must account for the mass
        # sitting in the modes we did not pick.
        dists = [haversine_km(lat, lon, p[0], p[1]) for p in points]
        radius_km = _weighted_quantile(dists, weights, config.radius_mass)
        confidence = sum(
            w for d, w in zip(dists, weights) if d <= config.confidence_radius_km
        )
    else:
        radius_km = best_seed.sigma_km
        confidence = 0.0

    alternatives: list[_GC] = []
    for lp, cand in scored:
        if len(alternatives) >= config.max_alternatives:
            break
        if haversine_km(lat, lon, cand.lat, cand.lon) < config.alternative_separation_km:
            continue
        if any(
            haversine_km(a.lat, a.lon, cand.lat, cand.lon) < config.alternative_separation_km
            for a in alternatives
        ):
            continue
        alternatives.append(
            _GC(cand.lat, cand.lon, math.exp(min(0.0, lp - scored[0][0])), cand.sigma_km, cand.source, cand.label)
        )

    return lat, lon, radius_km, confidence, alternatives
