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


def write_key(key: str, path: str | os.PathLike[str] | None = None) -> Path:
    """Save an API key into a .env, replacing any existing line for it.

    The file is created 0600: it holds a credential, and a world-readable one
    on a shared machine is a leak waiting to happen.
    """
    target = Path(path).expanduser() if path else preferred_path()
    target.parent.mkdir(parents=True, exist_ok=True)

    lines: list[str] = []
    if target.is_file():
        lines = target.read_text(encoding="utf-8").splitlines()

    replaced = False
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("ANTHROPIC_API_KEY=") or stripped.startswith(
            "export ANTHROPIC_API_KEY="
        ):
            lines[i] = f"ANTHROPIC_API_KEY={key}"
            replaced = True
            break
    if not replaced:
        lines.append(f"ANTHROPIC_API_KEY={key}")

    target.write_text("\n".join(lines).rstrip("\n") + "\n", encoding="utf-8")
    try:
        target.chmod(0o600)
    except OSError:
        pass  # Windows and some mounts do not support it; not worth failing over.
    return target


def mask(key: str) -> str:
    """A key fragment safe to print."""
    if len(key) <= 12:
        return "set"
    return f"{key[:11]}...{key[-4:]}"
