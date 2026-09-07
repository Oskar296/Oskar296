import io
import json
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from PIL import Image

from geolocator import exif
from geolocator.reasoner import ReasonerConfig, ReasonerHead, ReasonerUnavailable, encode_image


# --- EXIF -------------------------------------------------------------------

def _image_with_gps(lat_dms, lat_ref, lon_dms, lon_ref, extra=None):
    """Build a real JPEG carrying GPS EXIF, so we exercise Pillow's parser."""
    img = Image.new("RGB", (32, 32), (128, 128, 128))
    ex = img.getexif()
    gps = {1: lat_ref, 2: lat_dms, 3: lon_ref, 4: lon_dms}
    if extra:
        gps.update(extra)
    ex[0x8825] = gps
    buf = io.BytesIO()
    img.save(buf, format="JPEG", exif=ex)
    buf.seek(0)
    return Image.open(buf)


def test_exif_reads_north_east():
    img = _image_with_gps((59.0, 19.0, 45.0), "N", (18.0, 4.0, 6.0), "E")
    head = exif.extract(img)
    assert head is not None
    c = head.candidates[0]
    assert c.lat == pytest.approx(59.32916, abs=1e-4)
    assert c.lon == pytest.approx(18.06833, abs=1e-4)
    assert c.sigma_km < 1.0
    assert head.trust > 1.0


def test_exif_applies_south_west_signs():
    img = _image_with_gps((33.0, 52.0, 7.0), "S", (151.0, 12.0, 33.0), "W")
    c = exif.extract(img).candidates[0]
    assert c.lat < 0 and c.lon < 0


def test_exif_absent_returns_none():
    assert exif.extract(Image.new("RGB", (8, 8))) is None


def test_exif_null_island_is_rejected():
    img = _image_with_gps((0.0, 0.0, 0.0), "N", (0.0, 0.0, 0.0), "E")
    assert exif.extract(img) is None


def test_exif_malformed_does_not_raise():
    """Corrupt EXIF must degrade to "no answer", never take the run down."""

    class _Broken:
        def getexif(self):
            raise ValueError("corrupt IFD")

    assert exif.extract(_Broken()) is None

    class _Garbage:
        def getexif(self):
            return type("E", (), {"get_ifd": lambda self, _k: {1: "N", 2: "garbage", 3: "E", 4: None}})()

    assert exif.extract(_Garbage()) is None


def test_exif_uses_reported_positioning_error():
    img = _image_with_gps((59.0, 0.0, 0.0), "N", (18.0, 0.0, 0.0), "E", extra={31: 2500.0})
    assert exif.extract(img).candidates[0].sigma_km == pytest.approx(2.5)


# --- Reasoner ---------------------------------------------------------------

class _Block:
    type = "text"

    def __init__(self, text):
        self.text = text


class _Response:
    def __init__(self, payload, stop_reason="end_turn"):
        self.content = [_Block(json.dumps(payload))]
        self.stop_reason = stop_reason
        self.stop_details = None


class _StubMessages:
    def __init__(self, response):
        self._response = response
        self.calls = []

    def create(self, **kwargs):
        self.calls.append(kwargs)
        if isinstance(self._response, Exception):
            raise self._response
        return self._response


class _StubClient:
    """Mimics the SDK surface the head touches, including the beta path."""

    def __init__(self, response):
        self.messages = _StubMessages(response)
        self.beta = type("B", (), {"messages": self.messages})()


PAYLOAD = {
    "cues": {
        "scene_text": ["Kungsgatan", "Apotek"],
        "overlay_text": [],
        "script": "Latin",
        "languages": ["Swedish"],
        "driving_side": "right",
        "license_plates": "white, tall EU strip",
        "road_markings": "white dashed",
        "infrastructure": "steel poles",
        "vegetation_biome": "boreal",
        "terrain": "flat",
        "architecture": "19th century stone",
        "vehicles": "Volvo",
        "sun_and_shadow": "low northern sun",
        "camera_signature": "gen 4 rig",
    },
    "countries": [{"name": "Sweden", "iso2": "SE", "probability": 0.9}],
    "candidates": [
        {"label": "Stockholm", "lat": 59.33, "lon": 18.06, "radius_km": 5, "probability": 0.8},
        {"label": "Uppsala", "lat": 59.86, "lon": 17.64, "radius_km": 20, "probability": 0.2},
    ],
    "reasoning": "Swedish signage and EU plates.",
    "evidence_strength": "strong",
}


def test_reasoner_parses_candidates():
    head = ReasonerHead(client=_StubClient(_Response(PAYLOAD)))
    out = head.predict(Image.new("RGB", (64, 64)))
    assert [c.label for c in out.candidates] == ["Stockholm", "Uppsala"]
    assert out.candidates[0].sigma_km == 5
    assert out.candidates[0].weight == 0.8
    assert out.trust > 1.0  # strong evidence earns more trust
    assert out.evidence["cues"]["languages"] == ["Swedish"]


def test_reasoner_trust_tracks_evidence_strength():
    strong = ReasonerHead(client=_StubClient(_Response(PAYLOAD))).predict(Image.new("RGB", (8, 8)))
    weak_payload = dict(PAYLOAD, evidence_strength="weak")
    weak = ReasonerHead(client=_StubClient(_Response(weak_payload))).predict(Image.new("RGB", (8, 8)))
    assert weak.trust < strong.trust


def test_reasoner_sends_image_and_schema():
    stub = _StubClient(_Response(PAYLOAD))
    ReasonerHead(client=stub).predict(Image.new("RGB", (64, 64)))
    sent = stub.messages.calls[0]
    blocks = sent["messages"][0]["content"]
    assert blocks[0]["type"] == "image"
    assert blocks[0]["source"]["media_type"] == "image/jpeg"
    assert sent["output_config"]["format"]["type"] == "json_schema"
    assert sent["thinking"] == {"type": "adaptive"}
    assert sent["model"] == "claude-opus-5"


def test_reasoner_rejects_out_of_range_coordinates():
    bad = dict(PAYLOAD, candidates=[{"label": "x", "lat": 991.0, "lon": 0.0, "radius_km": 5, "probability": 1.0}])
    with pytest.raises(ReasonerUnavailable):
        ReasonerHead(client=_StubClient(_Response(bad))).predict(Image.new("RGB", (8, 8)))


def test_reasoner_surfaces_refusals():
    head = ReasonerHead(client=_StubClient(_Response(PAYLOAD, stop_reason="refusal")))
    with pytest.raises(ReasonerUnavailable, match="declined"):
        head.predict(Image.new("RGB", (8, 8)))


def test_reasoner_wraps_api_errors():
    head = ReasonerHead(client=_StubClient(RuntimeError("boom")))
    with pytest.raises(ReasonerUnavailable, match="failed"):
        head.predict(Image.new("RGB", (8, 8)))


def test_encode_image_downscales_and_is_jpeg():
    media, data = encode_image(Image.new("RGB", (4000, 2000)))
    assert media == "image/jpeg"
    import base64
    decoded = Image.open(io.BytesIO(base64.b64decode(data)))
    assert max(decoded.size) == 1568


# --- self-consistency across passes -----------------------------------------

def _out(points, trust=1.0, rationale="r"):
    from geolocator.types import GeoCandidate, HeadOutput
    return HeadOutput(
        "reasoner",
        [GeoCandidate(lat, lon, w, 20.0, "reasoner", label) for lat, lon, w, label in points],
        trust=trust,
        rationale=rationale,
        evidence={"evidence_strength": "moderate"},
    )


def test_agreement_scores_spread_not_count():
    from geolocator.reasoner import _agreement
    assert _agreement([(1.25, 103.83)]) == 1.0
    assert _agreement([(1.25, 103.83), (1.26, 103.84)]) == 1.0
    scattered = _agreement([(1.25, 103.83), (40.4, -3.7), (-22.9, -43.2)])
    partial = _agreement([(1.25, 103.83), (1.30, 103.90), (13.75, 100.50)])
    assert scattered < partial < 1.0


def test_merging_agreeing_passes_keeps_trust():
    from geolocator.reasoner import ReasonerConfig, merge_samples
    outs = [_out([(1.25, 103.83, 1.0, "Singapore")], trust=1.4) for _ in range(3)]
    merged = merge_samples(outs, ReasonerConfig())
    assert merged.trust == pytest.approx(1.4, rel=1e-6)
    assert merged.evidence["agreement"] == 1.0
    assert merged.evidence["samples"] == 3


def test_merging_disagreeing_passes_cuts_trust():
    """Three answers on three continents must not be believed at face value."""
    from geolocator.reasoner import ReasonerConfig, merge_samples
    outs = [
        _out([(1.25, 103.83, 1.0, "Singapore")], trust=1.4),
        _out([(40.4, -3.7, 1.0, "Madrid")], trust=1.4),
        _out([(-22.9, -43.2, 1.0, "Rio")], trust=1.4),
    ]
    merged = merge_samples(outs, ReasonerConfig())
    assert merged.trust < 0.5
    assert merged.evidence["agreement"] < 0.3
    # Every pass survives as a candidate, so fusion sees the real spread.
    assert len(merged.candidates) == 3
    assert sum(c.weight for c in merged.candidates) == pytest.approx(1.0)


def test_merging_is_a_mixture_not_a_product():
    """The same model looking twice is not independent evidence."""
    from geolocator.reasoner import ReasonerConfig, merge_samples
    one = _out([(1.25, 103.83, 1.0, "Singapore")], trust=1.0)
    merged = merge_samples([one, _out([(1.25, 103.83, 1.0, "Singapore")], trust=1.0)],
                           ReasonerConfig())
    # Agreement must not push trust above what a single pass claimed.
    assert merged.trust <= 1.0


def test_multi_sample_predict_calls_the_api_repeatedly():
    stub = _StubClient(_Response(PAYLOAD))
    head = ReasonerHead(ReasonerConfig(samples=3), client=stub)
    out = head.predict(Image.new("RGB", (32, 32)))
    assert len(stub.messages.calls) == 3
    assert out.evidence["samples"] == 3
    assert len(out.evidence["per_sample_top"]) == 3


def test_multi_sample_survives_a_failed_pass(monkeypatch):
    head = ReasonerHead(ReasonerConfig(samples=3), client=_StubClient(_Response(PAYLOAD)))
    calls = {"n": 0}
    real = head._predict_once

    def flaky(image):
        calls["n"] += 1
        if calls["n"] == 2:
            raise ReasonerUnavailable("transient")
        return real(image)

    head._predict_once = flaky
    out = head.predict(Image.new("RGB", (32, 32)))
    assert out.evidence["samples"] == 2


def test_all_passes_failing_raises():
    head = ReasonerHead(ReasonerConfig(samples=2), client=_StubClient(RuntimeError("boom")))
    with pytest.raises(ReasonerUnavailable):
        head.predict(Image.new("RGB", (8, 8)))


def test_candidates_come_back_ordered_by_probability():
    """Nothing requires the model to list its best guess first, and several
    things downstream assume the first one is the best."""
    shuffled = dict(PAYLOAD, candidates=[
        {"label": "Bangkok", "lat": 13.75, "lon": 100.50, "radius_km": 30, "probability": 0.2},
        {"label": "Singapore", "lat": 1.29, "lon": 103.85, "radius_km": 8, "probability": 0.7},
        {"label": "Jakarta", "lat": -6.21, "lon": 106.85, "radius_km": 40, "probability": 0.1},
    ])
    out = ReasonerHead(client=_StubClient(_Response(shuffled))).predict(Image.new("RGB", (8, 8)))
    assert [c.label for c in out.candidates] == ["Singapore", "Bangkok", "Jakarta"]


def test_agreement_uses_each_pass_best_guess_not_its_first_line():
    """Three passes that all favour Singapore agree, even when one of them
    happens to list a rival first."""
    from geolocator.reasoner import ReasonerConfig, merge_samples
    from geolocator.types import GeoCandidate, HeadOutput

    def pass_with(order):
        return HeadOutput(
            "reasoner",
            [GeoCandidate(lat, lon, w, 20.0, "reasoner", label) for lat, lon, w, label in order],
            trust=1.4,
            evidence={},
        )

    outs = [
        pass_with([(1.29, 103.85, 0.7, "Singapore"), (13.75, 100.5, 0.3, "Bangkok")]),
        # This pass agrees, but wrote the rival down first.
        pass_with([(13.75, 100.5, 0.25, "Bangkok"), (1.30, 103.86, 0.75, "Singapore")]),
        pass_with([(1.28, 103.84, 0.8, "Singapore"), (13.75, 100.5, 0.2, "Bangkok")]),
    ]
    merged = merge_samples(outs, ReasonerConfig())
    assert merged.evidence["agreement"] == 1.0
    assert merged.trust == pytest.approx(1.4, rel=1e-6)
    assert all("Singapore" in t["label"] for t in merged.evidence["per_sample_top"])


def test_cues_separate_scene_text_from_overlays():
    """A watermark names the publisher, not the place. It cost us a country."""
    from geolocator.reasoner import RESPONSE_SCHEMA, SYSTEM_PROMPT

    cues = RESPONSE_SCHEMA["properties"]["cues"]
    assert "scene_text" in cues["required"]
    assert "overlay_text" in cues["required"]
    assert "visible_text" not in cues["properties"], "the ambiguous field must be gone"
    assert "watermark" in SYSTEM_PROMPT.lower()
    # Overlay text must be explicitly disqualified, not merely mentioned.
    assert "must never move the answer" in SYSTEM_PROMPT


def test_overlay_text_is_carried_through_as_evidence():
    payload = dict(PAYLOAD)
    payload["cues"] = dict(PAYLOAD["cues"],
                           scene_text=["RIPTIDE ROCKET"],
                           overlay_text=["GOtravel Malaysian Flavours"])
    out = ReasonerHead(client=_StubClient(_Response(payload))).predict(Image.new("RGB", (8, 8)))
    assert out.evidence["cues"]["overlay_text"] == ["GOtravel Malaysian Flavours"]
    assert out.evidence["cues"]["scene_text"] == ["RIPTIDE ROCKET"]
