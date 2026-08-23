"""Load configuration from a .env file.

A key belongs in a file you edit once, not in a shell command you have to
remember. This reads the first .env it finds and puts the values into the
environment, without ever overwriting something already set there -- an
explicit `export` should still win over a stale file.

Deliberately hand-rolled rather than pulling in python-dotenv: the whole point
of this package is that `pip install` stays small.
"""

from __future__ import annotations

import os
from pathlib import Path

FILENAME = ".env"

# Checked in order; the first that exists wins.
def candidate_paths() -> list[Path]:
    explicit = os.environ.get("GEOLOCATOR_ENV")
    paths: list[Path] = []
    if explicit:
        paths.append(Path(explicit).expanduser())
    paths.append(Path.cwd() / FILENAME)
    paths.append(Path.home() / ".config" / "geolocator" / FILENAME)
    return paths


def parse(text: str) -> dict[str, str]:
    """Parse KEY=VALUE lines. Ignores blanks, comments and malformed lines."""
    out: dict[str, str] = {}
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("export "):
            line = line[len("export "):].lstrip()
        key, sep, value = line.partition("=")
        if not sep:
            continue
        key = key.strip()
        if not key:
            continue
        value = value.strip()
        # Strip one matching pair of surrounding quotes.
        if len(value) >= 2 and value[0] == value[-1] and value[0] in ("'", '"'):
            value = value[1:-1]
        else:
            # An unquoted trailing comment is not part of the value.
            hash_at = value.find(" #")
            if hash_at != -1:
                value = value[:hash_at].rstrip()
        out[key] = value
    return out


def preferred_path() -> Path:
    """Where a user should put their .env: the directory they run from."""
    explicit = os.environ.get("GEOLOCATOR_ENV")
    return Path(explicit).expanduser() if explicit else Path.cwd() / FILENAME


def load(path: str | os.PathLike[str] | None = None) -> Path | None:
    """Load a .env into os.environ. Returns the file used, or None."""
    paths = [Path(path).expanduser()] if path else candidate_paths()
    for candidate in paths:
        try:
            if not candidate.is_file():
                continue
            text = candidate.read_text(encoding="utf-8")
        except OSError:
            continue
        for key, value in parse(text).items():
            # Never clobber a value the user set explicitly for this process.
            os.environ.setdefault(key, value)
        return candidate
    return None
