"""The .env loader."""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest

from geolocator import env


def test_parses_the_ordinary_cases():
    got = env.parse("\n".join([
        "# a comment",
        "",
        "ANTHROPIC_API_KEY=sk-ant-abc",
        "export EXPORTED=yes",
        'DOUBLE="hello world"',
        "SINGLE='x y'",
        "EMPTY=",
    ]))
    assert got == {
        "ANTHROPIC_API_KEY": "sk-ant-abc",
        "EXPORTED": "yes",
        "DOUBLE": "hello world",
        "SINGLE": "x y",
        "EMPTY": "",
    }


def test_strips_a_trailing_comment_only_when_unquoted():
    assert env.parse("A=value # note")["A"] == "value"
    assert env.parse('B="value # kept"')["B"] == "value # kept"


def test_key_containing_equals_is_kept_whole():
    """Base64-ish secrets contain '='; only the first one separates."""
    assert env.parse("K=abc==def")["K"] == "abc==def"


def test_ignores_junk_without_raising():
    assert env.parse("no equals sign here\n=novalue\n   \n") == {}


def test_load_sets_missing_and_never_clobbers(tmp_path, monkeypatch):
    f = tmp_path / ".env"
    f.write_text("ANTHROPIC_API_KEY=from-file\nOTHER=also-from-file\n")
    monkeypatch.setenv("ANTHROPIC_API_KEY", "already-exported")
    monkeypatch.delenv("OTHER", raising=False)

    used = env.load(f)
    assert used == f
    # An explicit export must win over the file.
    assert os.environ["ANTHROPIC_API_KEY"] == "already-exported"
    assert os.environ["OTHER"] == "also-from-file"


def test_load_prefers_the_working_directory(tmp_path, monkeypatch):
    (tmp_path / ".env").write_text("PICKED=cwd\n")
    monkeypatch.delenv("GEOLOCATOR_ENV", raising=False)
    monkeypatch.delenv("PICKED", raising=False)
    monkeypatch.chdir(tmp_path)
    assert env.load() == tmp_path / ".env"
    assert os.environ["PICKED"] == "cwd"


def test_geolocator_env_overrides_the_search(tmp_path, monkeypatch):
    elsewhere = tmp_path / "keys.env"
    elsewhere.write_text("PICKED=explicit\n")
    monkeypatch.setenv("GEOLOCATOR_ENV", str(elsewhere))
    monkeypatch.delenv("PICKED", raising=False)
    assert env.load() == elsewhere
    assert os.environ["PICKED"] == "explicit"
    assert env.preferred_path() == elsewhere


def test_load_returns_none_when_nothing_is_there(tmp_path, monkeypatch):
    monkeypatch.delenv("GEOLOCATOR_ENV", raising=False)
    monkeypatch.chdir(tmp_path)
    monkeypatch.setattr(env.Path, "home", staticmethod(lambda: tmp_path / "nohome"))
    assert env.load() is None


def test_unreadable_file_is_skipped(tmp_path, monkeypatch):
    monkeypatch.delenv("GEOLOCATOR_ENV", raising=False)
    d = tmp_path / ".env"
    d.mkdir()  # a directory where a file was expected
    monkeypatch.chdir(tmp_path)
    monkeypatch.setattr(env.Path, "home", staticmethod(lambda: tmp_path / "nohome"))
    assert env.load() is None


def test_write_key_creates_the_file(tmp_path):
    target = tmp_path / ".env"
    got = env.write_key("sk-ant-abc123", target)
    assert got == target
    assert target.read_text() == "ANTHROPIC_API_KEY=sk-ant-abc123\n"


def test_write_key_replaces_an_existing_line_and_keeps_the_rest(tmp_path):
    target = tmp_path / ".env"
    target.write_text("# my keys\nOTHER=keep-me\nANTHROPIC_API_KEY=old\nTRAILING=also-keep\n")
    env.write_key("sk-ant-new", target)
    text = target.read_text()
    assert "ANTHROPIC_API_KEY=sk-ant-new" in text
    assert "old" not in text
    assert "OTHER=keep-me" in text
    assert "TRAILING=also-keep" in text
    assert "# my keys" in text
    # exactly one key line, never a duplicate
    assert sum(1 for l in text.splitlines() if l.startswith("ANTHROPIC_API_KEY=")) == 1


def test_write_key_replaces_an_exported_line(tmp_path):
    target = tmp_path / ".env"
    target.write_text("export ANTHROPIC_API_KEY=old\n")
    env.write_key("sk-ant-new", target)
    assert target.read_text() == "ANTHROPIC_API_KEY=sk-ant-new\n"


def test_write_key_appends_when_absent(tmp_path):
    target = tmp_path / ".env"
    target.write_text("OTHER=value\n")
    env.write_key("sk-ant-new", target)
    assert target.read_text() == "OTHER=value\nANTHROPIC_API_KEY=sk-ant-new\n"


def test_written_file_is_not_world_readable(tmp_path):
    """It holds a credential; 0600 or the mode is a bug."""
    target = env.write_key("sk-ant-abc", tmp_path / ".env")
    assert (target.stat().st_mode & 0o077) == 0


def test_write_key_round_trips_through_the_loader(tmp_path, monkeypatch):
    target = env.write_key("sk-ant-roundtrip", tmp_path / ".env")
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)
    env.load(target)
    assert os.environ["ANTHROPIC_API_KEY"] == "sk-ant-roundtrip"


def test_mask_never_shows_the_whole_key():
    masked = env.mask("sk-ant-api03-SECRETSECRETSECRET-tail")
    assert "SECRETSECRET" not in masked
    assert masked.startswith("sk-ant-api")
    assert env.mask("short") == "set"
