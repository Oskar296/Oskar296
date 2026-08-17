#!/usr/bin/env python3
"""Inline the CSS and JS into one HTML file.

    python3 build-single.py                 -> bitwise-single.html, a standalone page
    python3 build-single.py --fragment OUT  -> body content only, for hosts that
                                               supply their own document skeleton

The single file has no external references at all, so it runs from a USB stick,
an email attachment or file:// with no server.
"""

import re
import sys
from pathlib import Path

HERE = Path(__file__).parent


def read(rel):
    return (HERE / rel).read_text(encoding="utf-8")


def guard(text):
    """Stop a literal </script> inside JS or CSS from closing the tag early."""
    return text.replace("</script>", "<\\/script>")


def build():
    html = read("index.html")

    # stylesheet -> inline <style>
    def css_sub(m):
        return "<style>\n" + guard(read(m.group(1))) + "\n</style>"

    html = re.sub(r'<link rel="stylesheet" href="\./([^"]+)"\s*/?>', css_sub, html)

    # scripts -> inline <script>
    def js_sub(m):
        src = m.group(1)
        return "<script>\n/* ---- " + src + " ---- */\n" + guard(read(src)) + "\n</script>"

    html = re.sub(r'<script src="\./([^"]+)"></script>', js_sub, html)

    left = re.findall(r'(?:src|href)="\./', html)
    if left:
        raise SystemExit("still has %d external reference(s), refusing to write" % len(left))
    return html


def fragment(html):
    """Strip the document skeleton, keeping <title> plus everything in <body>."""
    title = re.search(r"<title>.*?</title>", html, re.S).group(0)
    style = re.search(r"<style>.*?</style>", html, re.S).group(0)
    boot = re.search(r"<script>\s*/\* stamp the theme.*?</script>", html, re.S).group(0)
    body = re.search(r"<body>(.*)</body>", html, re.S).group(1)
    return "\n".join([title, boot, style, body.strip()])


if __name__ == "__main__":
    page = build()
    if "--title" in sys.argv:                       # hosts that show the title as a name
        name = sys.argv[sys.argv.index("--title") + 1]
        page = re.sub(r"<title>.*?</title>", "<title>" + name + "</title>", page, flags=re.S)
    if "--fragment" in sys.argv:
        out = Path(sys.argv[sys.argv.index("--fragment") + 1])
        out.write_text(fragment(page), encoding="utf-8")
    else:
        out = HERE / "bitwise-single.html"
        out.write_text(page, encoding="utf-8")
    print("wrote %s (%.0f KB)" % (out, out.stat().st_size / 1024))
