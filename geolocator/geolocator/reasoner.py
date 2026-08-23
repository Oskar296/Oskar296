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

Work from evidence, in roughly this order of reliability:

1. Text. Read every legible string: shop names, road signs, adverts, number \
plates, graffiti, phone numbers, web domains. Note the script and language, \
including diacritics that separate neighbouring languages. A country-code TLD \
or phone prefix is close to decisive.
2. Traffic conventions. Driving side, road-marking colour and pattern, sign \
shapes and fonts, bollard and guardrail design, traffic-light mounting, \
utility-pole construction. These vary sharply between countries and are hard to fake.
3. Vehicles. Number-plate proportions and colour, common makes and models, \
taxi and bus liveries.
4. Physical geography. Vegetation and biome, soil colour, terrain, snow, the \
sun's elevation and the direction of shadows, which constrain hemisphere and latitude.
5. Built environment. Architectural style, roofing material, window and balcony \
form, road surface, street furniture, power-line style.
6. Camera signature. If it looks like street-level survey imagery, note the \
generation and any rig artefacts, which narrow the country and the year.

Traps that flip a whole hemisphere, so check them before committing:

- Casuarina (she-oak) reads as a pine at a glance and is a tropical and
  subtropical coastal tree. A "pine" by warm water is more often this.
- Bougainvillea, oleander, hibiscus and frangipani all give the same pink or
  magenta blur at distance and belong to different climates.
- Fan palms grow from Marseille to Manila. A palm narrows almost nothing on
  its own.
- Weight the *structure* of the planting over any single species: dense,
  multi-layered, glossy evergreen canopy with no dormancy is humid tropics or
  subtropics; sparser, greyer, drought-adapted foliage with visible bare
  ground is Mediterranean. This distinction is far more reliable than
  identifying individual plants, and it separates candidates thousands of
  kilometres apart.
- Curving white balconied blocks, sinuous concrete and crazy paving read as
  1970s Mediterranean resort, but the same vocabulary is used in tropical
  Asian, Gulf and Brazilian developments built at any time since. Do not let
  the architectural era imply a region on its own.
- Heavy atmospheric haze in an otherwise sunny frame suggests high humidity,
  which argues against a Mediterranean summer.

Rules:
- Reason from what is actually visible. Never invent text you cannot read.
- When you have no text, no vehicles and no road furniture, say so plainly and
  widen the radius. Landscape and architecture alone rarely justify better
  than a continental guess.
- Where evidence is thin, say so and widen your radius rather than guessing precisely.
- Give several candidates when genuinely torn, with honest probabilities.
- radius_km is your real 1-sigma uncertainty for that candidate. Use a few km \
only when you have identified a specific street or landmark; use hundreds or \
thousands of km when you only have a biome.
- Probabilities across candidates should sum to about 1.
"""

RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
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
    "required": ["cues", "countries", "candidates", "reasoning", "evidence_strength"],
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
