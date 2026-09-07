"""Vision-language reasoning head.

The retrieval head matches an image against places that *look* similar. This
head does what a human geolocation player does instead: read the signs, note
which side of the road the traffic is on, identify the bollards and the licence
plates and the vegetation, and reason from those to a region.

The two fail in different ways, which is exactly why fusing them beats either.
Retrieval is strong on landscape and architectural gestalt and weak whenever the
giveaway is a few pixels of text; this head is the opposite.
"""

from __future__ import annotations

import base64
import io
import json
import os
from dataclasses import dataclass, field

from .types import GeoCandidate, HeadOutput

DEFAULT_MODEL = "claude-opus-5"

# Claude resizes anything larger; sending it pre-scaled saves tokens and time.
MAX_EDGE_PX = 1568

SYSTEM_PROMPT = """\
You are a world-class image geolocation analyst, of the calibre of a top-ranked \
competitive GeoGuessr player. You determine where a photograph was taken.

Work in two passes. Do not skip the first, and do not begin the second until the
first is written down.

PASS ONE - the envelope.

Fix the climate zone and hemisphere before any country enters your head. Judge
it from the structure of the vegetation and the quality of the air, not from
identifying individual species:

- Dense multi-layered glossy evergreen canopy, no dormancy, no bare soil,
  saturated green, heavy humid haze softening the middle distance: humid
  tropics or humid subtropics.
- Sparser grey-green drought-adapted foliage, visible dry ground, browned
  grass, hard clear light: Mediterranean or semi-arid.
- Deciduous structure, bare branches or autumn colour: temperate.

State the zone, and state the single observation that rules out its neighbours.
Then state the hemisphere from the sun and shadows if they are visible.

PASS TWO - narrowing inside that envelope, in order of reliability:

1. Text. Read every legible string: shop names, road signs, adverts, number \
plates, graffiti, phone numbers, web domains. Note the script and language, \
including diacritics that separate neighbouring languages. A country-code TLD \
or phone prefix is close to decisive.
2. Traffic conventions. Driving side, road-marking colour and pattern, sign \
shapes and fonts, bollard and guardrail design, traffic-light mounting, \
utility-pole construction.
3. Vehicles. Number-plate proportions and colour, common makes and models, \
taxi and bus liveries.
4. Built environment. Architectural style, roofing material, window and balcony \
form, road surface, street furniture, power-line style.
5. Camera signature. If it looks like street-level survey imagery, note the \
generation and any rig artefacts.

Nothing in pass two may move you outside the pass-one envelope unless it is
legible text. Architecture, planting style and a general sense of familiarity
are not sufficient to cross a climate boundary; they are the exact cues that
produce a confident answer on the wrong continent.

If there is no legible text anywhere, say so explicitly. Then stay inside the
envelope, name the most probable regions within it, and widen the radius. A
wide radius in the right climate is a far better answer than a narrow one in
the wrong hemisphere.

Traps that flip a whole hemisphere, so check them before committing:

- Casuarina (she-oak) reads as a pine at a glance and is a tropical and
  subtropical coastal tree. A "pine" by warm water is more often this.
- Bougainvillea, oleander, hibiscus and frangipani all give the same pink or
  magenta blur at distance and belong to different climates.
- Fan palms grow from Marseille to Manila. A palm narrows almost nothing on
  its own.
- Curving white balconied blocks, sinuous concrete and crazy paving read as
  1970s Mediterranean resort, but the same vocabulary is used in tropical
  Asian, Gulf and Brazilian developments built at any time since. Do not let
  the architectural era imply a region on its own.
- Heavy atmospheric haze that softens middle distance, combined with saturated
  year-round green and immaculate irrigated planting, is humid-tropical urban
  far more often than it is Mediterranean, where air is typically clearer and
  the dry season leaves grass browned.
- A view looking down from height through glass usually means a residential
  tower, which concentrates the answer in dense, affluent, high-rise cities
  rather than in low-rise resort coastline.

PASS THREE - try to break your own answer.

Before you commit, take your leading candidate and name three things you would
expect to see in this frame if it were true. Then say, for each, whether it is
actually present, absent, or not checkable here. If two of the three are absent
or uncheckable, your candidate is a guess dressed as a deduction: widen the
radius, or promote a rival that survives the same test better.

Do this against the strongest rival too, not only the favourite. The point is
to find out which one fails, not to confirm the one you already like.

Rules:
- Reason from what is actually visible. Never invent text you cannot read.
- Give several candidates when genuinely torn, with honest probabilities.
- radius_km is your real 1-sigma uncertainty for that candidate. Use a few km \
only when you have identified a specific street or landmark; use hundreds or \
thousands of km when you only have a biome.
- Probabilities across candidates should sum to about 1.
"""

RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "climate_zone": {
            "type": "string",
            "description": (
                "The Koppen-style zone committed to before naming a country, "
                "with the observation that rules out the neighbouring zones."
            ),
        },
        "verification": {
            "type": "array",
            "description": (
                "For the leading candidate and its strongest rival: what you "
                "would expect to see, and whether it is actually there."
            ),
            "items": {
                "type": "object",
                "properties": {
                    "candidate": {"type": "string"},
                    "expected": {"type": "string"},
                    "status": {
                        "type": "string",
                        "enum": ["present", "absent", "not checkable"],
                    },
                },
                "required": ["candidate", "expected", "status"],
                "additionalProperties": False,
            },
        },
        "cues": {
            "type": "object",
            "properties": {
                "visible_text": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Strings actually legible in the image, verbatim.",
                },
                "script": {"type": "string"},
                "languages": {"type": "array", "items": {"type": "string"}},
                "driving_side": {"type": "string", "enum": ["left", "right", "unknown"]},
                "license_plates": {"type": "string"},
                "road_markings": {"type": "string"},
                "infrastructure": {"type": "string"},
                "vegetation_biome": {"type": "string"},
                "terrain": {"type": "string"},
                "architecture": {"type": "string"},
                "vehicles": {"type": "string"},
                "sun_and_shadow": {"type": "string"},
                "camera_signature": {"type": "string"},
            },
            "required": [
                "visible_text",
                "script",
                "languages",
                "driving_side",
                "license_plates",
                "road_markings",
                "infrastructure",
                "vegetation_biome",
                "terrain",
                "architecture",
                "vehicles",
                "sun_and_shadow",
                "camera_signature",
            ],
            "additionalProperties": False,
        },
        "countries": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "iso2": {"type": "string"},
                    "probability": {"type": "number"},
                },
                "required": ["name", "iso2", "probability"],
                "additionalProperties": False,
            },
        },
        "candidates": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "label": {"type": "string"},
                    "lat": {"type": "number"},
                    "lon": {"type": "number"},
                    "radius_km": {"type": "number"},
                    "probability": {"type": "number"},
                },
                "required": ["label", "lat", "lon", "radius_km", "probability"],
                "additionalProperties": False,
            },
        },
        "reasoning": {"type": "string"},
        "evidence_strength": {"type": "string", "enum": ["strong", "moderate", "weak"]},
    },
    "required": ["climate_zone", "verification", "cues", "countries", "candidates",
                 "reasoning", "evidence_strength"],
    "additionalProperties": False,
}

# How far to trust this head, by its own assessment of the evidence. Text you can
# read is worth far more than a general impression of the vegetation.
_TRUST_BY_STRENGTH = {"strong": 1.8, "moderate": 1.0, "weak": 0.5}


class ReasonerUnavailable(RuntimeError):
    """Raised when the Claude API cannot be reached or is not configured."""


@dataclass
class ReasonerConfig:
    model: str = DEFAULT_MODEL
    max_tokens: int = 16000
    effort: str = "high"
    # Ask for a refusal fallback so a declined request still returns something.
    use_fallbacks: bool = True
    timeout_s: float = 240.0
    extra_hint: str = ""
    max_candidates: int = 6
    # Independent passes over the same image. Sampling more than once costs
    # proportionally more, but disagreement between passes is the most honest
    # uncertainty signal available: a model that answers Singapore three times
    # knows something a model that answers Spain, Brazil and Thailand does not.
    samples: int = 1
    trust_scale: float = 1.0
    trust_by_strength: dict = field(default_factory=lambda: dict(_TRUST_BY_STRENGTH))


def encode_image(image, max_edge: int = MAX_EDGE_PX) -> tuple[str, str]:
    """Downscale and JPEG-encode a PIL image; returns (media_type, base64)."""
    from PIL import Image

    img = image.convert("RGB")
    w, h = img.size
    if max(w, h) > max_edge:
        scale = max_edge / float(max(w, h))
        img = img.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=90)
    return "image/jpeg", base64.standard_b64encode(buf.getvalue()).decode("ascii")


class ReasonerHead:
    """Claude vision head. `client` is injectable so it can be tested offline."""

    name = "reasoner"

    def __init__(self, config: ReasonerConfig | None = None, client=None) -> None:
        self.config = config or ReasonerConfig()
        self._client = client

    @staticmethod
    def is_configured() -> bool:
        return bool(
            os.environ.get("ANTHROPIC_API_KEY")
            or os.environ.get("ANTHROPIC_AUTH_TOKEN")
            or os.path.isdir(os.path.expanduser("~/.config/anthropic"))
        )

    def _get_client(self):
        if self._client is not None:
            return self._client
        try:
            import anthropic
        except ImportError as exc:  # pragma: no cover
            raise ReasonerUnavailable("the anthropic package is required: pip install anthropic") from exc
        try:
            self._client = anthropic.Anthropic(timeout=self.config.timeout_s)
        except Exception as exc:  # noqa: BLE001
            raise ReasonerUnavailable(f"could not construct the Anthropic client: {exc}") from exc
        return self._client

    def _request(self, media_type: str, data: str):
        client = self._get_client()
        prompt = (
            "Where was this photograph taken? Work through the visual evidence, "
            "then give your best coordinates."
        )
        if self.config.extra_hint:
            prompt += f"\n\nAdditional context from the user: {self.config.extra_hint}"

        kwargs = {
            "model": self.config.model,
            "max_tokens": self.config.max_tokens,
            "system": SYSTEM_PROMPT,
            "thinking": {"type": "adaptive"},
            "output_config": {
                "effort": self.config.effort,
                "format": {"type": "json_schema", "schema": RESPONSE_SCHEMA},
            },
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": media_type,
                                "data": data,
                            },
                        },
                        {"type": "text", "text": prompt},
                    ],
                }
            ],
        }

        if self.config.use_fallbacks:
            try:
                return client.beta.messages.create(
                    betas=["server-side-fallback-2026-07-01"],
                    fallbacks="default",
                    **kwargs,
                )
            except TypeError:
                # An SDK too old for the fallback parameters; the plain call still works.
                pass
        return client.messages.create(**kwargs)

    def predict(self, image) -> HeadOutput:
        n = max(1, int(self.config.samples))
        if n == 1:
            return self._predict_once(image)

        outputs: list[HeadOutput] = []
        errors: list[str] = []
        for _ in range(n):
            try:
                outputs.append(self._predict_once(image))
            except ReasonerUnavailable as exc:
                errors.append(str(exc))
        if not outputs:
            raise ReasonerUnavailable("; ".join(errors) or "no samples succeeded")
        return merge_samples(outputs, self.config)

    def _predict_once(self, image) -> HeadOutput:
        media_type, data = encode_image(image)
        try:
            response = self._request(media_type, data)
        except ReasonerUnavailable:
            raise
        except Exception as exc:  # noqa: BLE001 - surface API errors uniformly
            raise ReasonerUnavailable(f"the Claude API call failed: {exc}") from exc

        if getattr(response, "stop_reason", None) == "refusal":
            detail = getattr(response, "stop_details", None)
            reason = getattr(detail, "explanation", "") or "no explanation given"
            raise ReasonerUnavailable(f"the model declined to analyse this image: {reason}")

        text = next(
            (b.text for b in response.content if getattr(b, "type", None) == "text"), ""
        )
        if not text.strip():
            raise ReasonerUnavailable("the model returned no structured output")
        try:
            payload = json.loads(text)
        except json.JSONDecodeError as exc:
            raise ReasonerUnavailable(f"could not parse the model's JSON output: {exc}") from exc

        return self._to_head(payload)

    def _to_head(self, payload: dict) -> HeadOutput:
        cfg = self.config
        raw = payload.get("candidates") or []
        candidates: list[GeoCandidate] = []
        for item in raw[: cfg.max_candidates]:
            try:
                lat = float(item["lat"])
                lon = float(item["lon"])
            except (KeyError, TypeError, ValueError):
                continue
            if not (-90.0 <= lat <= 90.0) or not (-180.0 <= lon <= 180.0):
                continue
            try:
                radius = float(item.get("radius_km", 200.0))
            except (TypeError, ValueError):
                radius = 200.0
            try:
                prob = float(item.get("probability", 0.0))
            except (TypeError, ValueError):
                prob = 0.0
            candidates.append(
                GeoCandidate(
                    lat=lat,
                    lon=lon,
                    weight=max(prob, 1e-6),
                    sigma_km=max(1.0, radius),
                    source=self.name,
                    label=str(item.get("label", ""))[:120],
                )
            )

        if not candidates:
            raise ReasonerUnavailable("the model proposed no usable coordinates")

        # Nothing obliges the model to list its best guess first, and several
        # things downstream take the first candidate as the answer.
        candidates.sort(key=lambda c: c.weight, reverse=True)

        strength = str(payload.get("evidence_strength", "moderate")).lower()
        trust = cfg.trust_by_strength.get(strength, 1.0) * cfg.trust_scale

        cues = payload.get("cues", {}) or {}
        return HeadOutput(
            name=self.name,
            candidates=candidates,
            trust=trust,
            rationale=str(payload.get("reasoning", "")).strip(),
            evidence={
                "evidence_strength": strength,
                "countries": payload.get("countries", []),
                "cues": cues,
            },
        )


# Spread between independent passes, in km, mapped onto a multiplier for how
# much the merged head is trusted. Agreement inside a city keeps full trust;
# answers scattered across continents should not be believed at face value.
AGREEMENT_TIGHT_KM = 50.0
AGREEMENT_LOOSE_KM = 3000.0
AGREEMENT_FLOOR = 0.25


def _agreement(points: list[tuple[float, float]]) -> float:
    """1.0 when the passes land together, falling to a floor when they scatter."""
    import math
    import statistics

    from .geo import haversine_km

    if len(points) < 2:
        return 1.0
    spreads = [
        haversine_km(*points[i], *points[j])
        for i in range(len(points))
        for j in range(i + 1, len(points))
    ]
    spread = statistics.median(spreads)
    if spread <= AGREEMENT_TIGHT_KM:
        return 1.0
    if spread >= AGREEMENT_LOOSE_KM:
        return AGREEMENT_FLOOR
    # Interpolate on a log scale; the difference between 50 km and 200 km
    # matters far more than between 2000 km and 2500 km.
    t = math.log(spread / AGREEMENT_TIGHT_KM) / math.log(
        AGREEMENT_LOOSE_KM / AGREEMENT_TIGHT_KM
    )
    return 1.0 - t * (1.0 - AGREEMENT_FLOOR)


def merge_samples(outputs: list[HeadOutput], config: "ReasonerConfig") -> HeadOutput:
    """Combine independent passes into one head.

    The passes are a mixture, not a product: they are the same model looking
    twice, so they are not independent evidence and must not be allowed to
    sharpen each other. What they legitimately provide is a spread, which sets
    how far the merged head is trusted.
    """
    if len(outputs) == 1:
        return outputs[0]

    tops = [
        max(o.candidates, key=lambda c: c.weight) for o in outputs if o.candidates
    ]
    agreement = _agreement([(c.lat, c.lon) for c in tops])

    pooled: list[GeoCandidate] = []
    for out in outputs:
        for cand in out.normalized():
            pooled.append(
                GeoCandidate(
                    lat=cand.lat,
                    lon=cand.lon,
                    weight=cand.weight / len(outputs),
                    sigma_km=cand.sigma_km,
                    source=cand.source,
                    label=cand.label,
                )
            )
    pooled.sort(key=lambda c: c.weight, reverse=True)
    pooled = pooled[: config.max_candidates]
    total = sum(c.weight for c in pooled) or 1.0
    for c in pooled:
        c.weight /= total

    base_trust = sum(o.trust for o in outputs) / len(outputs)
    rationale = "\n\n".join(
        f"Pass {i + 1}: {o.rationale}" for i, o in enumerate(outputs) if o.rationale
    )
    return HeadOutput(
        name=outputs[0].name,
        candidates=pooled,
        trust=base_trust * agreement,
        rationale=rationale,
        evidence={
            "samples": len(outputs),
            "agreement": round(agreement, 3),
            "per_sample_top": [
                {"lat": round(c.lat, 4), "lon": round(c.lon, 4), "label": c.label}
                for c in tops
            ],
            **(outputs[0].evidence or {}),
        },
    )
