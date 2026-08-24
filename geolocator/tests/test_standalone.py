"""The single-file build must not drift from the package it was cut from."""

import json
import os
import pathlib
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest

from geolocator.reasoner import DEFAULT_MODEL, RESPONSE_SCHEMA, SYSTEM_PROMPT

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = ROOT / "Geolocator.html"


@pytest.fixture(scope="module")
def html():
    assert HTML.is_file(), "run: python tools/build_standalone.py"
    return HTML.read_text(encoding="utf-8")


def test_committed_file_matches_a_fresh_build():
    """The shipped file is generated; a stale one silently ships an old prompt."""
    sys.path.insert(0, str(ROOT))
    from tools.build_standalone import render

    assert HTML.read_text(encoding="utf-8") == render(), (
        "Geolocator.html is out of date -- run python tools/build_standalone.py"
    )


def test_carries_the_real_system_prompt(html):
    match = re.search(r"const SYSTEM = (\".*?\");\n", html, re.S)
    assert match, "SYSTEM literal not found"
    assert json.loads(match.group(1)) == SYSTEM_PROMPT


def test_carries_the_real_schema_and_model(html):
    match = re.search(r"const SCHEMA = (\{.*?\n\});", html, re.S)
    assert match, "SCHEMA literal not found"
    assert json.loads(match.group(1)) == RESPONSE_SCHEMA
    assert json.dumps(DEFAULT_MODEL) in html


def test_the_traps_that_cost_us_accuracy_are_present(html):
    """Each of these is in the prompt because a real photo was got wrong."""
    for phrase in ("Casuarina", "multi-layered", "climate zone", "through glass"):
        assert phrase in html, f"{phrase!r} missing from the shipped prompt"


def test_no_key_is_baked_into_the_file(html):
    assert not re.search(r"sk-ant-[A-Za-z0-9_-]{20,}", html)


def test_is_self_contained(html):
    # Fonts and the map are the only permitted external references.
    hosts = set(re.findall(r"https://([a-z0-9.-]+)", html))
    assert hosts <= {
        "fonts.googleapis.com", "fonts.gstatic.com",
        "www.openstreetmap.org", "api.anthropic.com",
        "console.anthropic.com",
    }, hosts
