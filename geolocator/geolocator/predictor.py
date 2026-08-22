"""Orchestrates the heads and returns a single prediction."""

from __future__ import annotations

from dataclasses import dataclass, field

from . import exif, places, rerank
from .fusion import FusionConfig, fuse
from .rerank import RerankConfig, apply_country_prior
from .retrieval import ModelUnavailable, RetrievalConfig, RetrievalHead, load_image
from .reasoner import ReasonerConfig, ReasonerHead, ReasonerUnavailable
from .types import HeadOutput, Prediction


@dataclass
class PredictorConfig:
    use_exif: bool = True
    use_retrieval: bool = True
    # Off unless credentials exist; the caller can force it on.
    use_reasoner: bool | None = None
    retrieval: RetrievalConfig = field(default_factory=RetrievalConfig)
    rerank: RerankConfig = field(default_factory=RerankConfig)
    reasoner: ReasonerConfig = field(default_factory=ReasonerConfig)
    fusion: FusionConfig = field(default_factory=FusionConfig)


class Geolocator:
    """The end-to-end predictor.

    Heads are optional and degrade independently: with no API key you still get
    retrieval, with no model weights you still get EXIF, and any head that
    raises is recorded as a warning rather than taking the whole run down.
    """

    def __init__(self, config: PredictorConfig | None = None) -> None:
        self.config = config or PredictorConfig()
        self._retrieval: RetrievalHead | None = None
        self._reasoner: ReasonerHead | None = None
        self.warnings: list[str] = []

    @property
    def retrieval_head(self) -> RetrievalHead:
        if self._retrieval is None:
            self._retrieval = RetrievalHead(self.config.retrieval)
        return self._retrieval

    @property
    def reasoner_head(self) -> ReasonerHead:
        if self._reasoner is None:
            self._reasoner = ReasonerHead(self.config.reasoner)
        return self._reasoner

    def _reasoner_enabled(self) -> bool:
        if self.config.use_reasoner is not None:
            return self.config.use_reasoner
        return ReasonerHead.is_configured()

    def warm_up(self) -> None:
        """Load model weights ahead of the first request."""
        if self.config.use_retrieval:
            self.retrieval_head.load()

    def locate(self, image_path: str) -> Prediction:
        return self.locate_image(load_image(image_path))

    def locate_image(self, image) -> Prediction:
        self.warnings = []
        heads: list[HeadOutput] = []

        if self.config.use_exif:
            found = exif.extract(image)
            if found is not None:
                heads.append(found)

        want_reasoner = self._reasoner_enabled()

        retrieval_out: HeadOutput | None = None
        if self.config.use_retrieval:
            try:
                # Pull a deeper pool when the reasoner may re-rank it; there is
                # no point promoting a candidate that was never retrieved.
                k = self.config.retrieval.pool_k if want_reasoner else None
                retrieval_out = self.retrieval_head.predict(image, k=k)
            except ModelUnavailable as exc:
                self.warnings.append(f"retrieval head unavailable: {exc}")

        reasoner_out: HeadOutput | None = None
        if want_reasoner:
            try:
                reasoner_out = self.reasoner_head.predict(image)
            except ReasonerUnavailable as exc:
                self.warnings.append(f"reasoning head unavailable: {exc}")
        else:
            self.warnings.append(
                "reasoning head disabled: set ANTHROPIC_API_KEY to enable it "
                "(it is the single largest accuracy gain in this pipeline)"
            )

        if retrieval_out is not None:
            if reasoner_out is not None:
                retrieval_out, report = apply_country_prior(
                    retrieval_out, reasoner_out, self.config.rerank
                )
                if not report.get("applied"):
                    retrieval_out.candidates = retrieval_out.candidates[
                        : self.config.retrieval.top_k
                    ]
            else:
                retrieval_out.candidates = retrieval_out.candidates[
                    : self.config.retrieval.top_k
                ]
            heads.append(retrieval_out)

        if reasoner_out is not None:
            heads.append(reasoner_out)

        if not heads:
            raise RuntimeError(
                "no prediction head produced a result. "
                + " ".join(self.warnings)
            )

        lat, lon, radius_km, confidence, alternatives = fuse(heads, self.config.fusion)

        for alt in alternatives:
            if not alt.label:
                alt.label = places.reverse(alt.lat, alt.lon).describe()

        return Prediction(
            lat=lat,
            lon=lon,
            radius_km=radius_km,
            confidence=confidence,
            place=places.reverse(lat, lon),
            alternatives=alternatives,
            heads=heads,
            rationale=_combine_rationales(heads),
        )


def _combine_rationales(heads: list[HeadOutput]) -> str:
    parts = [f"[{h.name}] {h.rationale}" for h in heads if h.rationale]
    return "\n\n".join(parts)
