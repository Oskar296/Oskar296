"""Generate Geolocator.html from the package sources.

The single-file build used to carry its own hand-copied prompt, which drifted:
the package learned that a "pine" beside warm water is usually a Casuarina,
and the standalone file did not, so it kept making the mistake the package had
already been taught to avoid. Generating it removes the chance of that.

    python tools/build_standalone.py
"""

from __future__ import annotations

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from geolocator.reasoner import DEFAULT_MODEL, RESPONSE_SCHEMA, SYSTEM_PROMPT  # noqa: E402

TEMPLATE = ROOT / "geolocator" / "web" / "standalone.template.html"
EXIF = ROOT / "geolocator" / "web" / "exif.js"
OUTPUT = ROOT / "Geolocator.html"


def render() -> str:
    exif = EXIF.read_text(encoding="utf-8").replace("export function extractGps", "function extractGps")
    html = TEMPLATE.read_text(encoding="utf-8")
    # json.dumps gives a correctly escaped JS string literal, so a backtick or
    # a ${ in the prompt cannot break out of the template.
    return (
        html.replace("__SYSTEM_PROMPT__", json.dumps(SYSTEM_PROMPT))
        .replace("__SCHEMA__", json.dumps(RESPONSE_SCHEMA, indent=2))
        .replace("__MODEL__", json.dumps(DEFAULT_MODEL))
        .replace("__EXIF_JS__", exif)
    )


def main() -> int:
    out = render()
    OUTPUT.write_text(out, encoding="utf-8")
    print(f"wrote {OUTPUT} ({len(out.encode()) / 1024:.1f} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
