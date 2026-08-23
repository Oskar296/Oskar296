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
