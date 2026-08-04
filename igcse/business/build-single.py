#!/usr/bin/env python3
"""Inline the stylesheet and every script into one standalone HTML file.

The result is a single file you can email, drop on a USB stick, open offline,
or upload anywhere that hosts one .html. Progress still saves, because
localStorage works from a single file in most browsers.

    python3 build-single.py                    # -> business-studies-0450.html
    python3 build-single.py out.html           # or name it yourself
    python3 build-single.py out.html --fragment

--fragment drops the outer <!doctype>/<html>/<head>/<body> wrapper and emits
just the page content, for hosts that supply their own document shell.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_OUT = 'business-studies-0450.html'


def read(rel):
    with open(os.path.join(HERE, rel), encoding='utf-8') as fh:
        return fh.read()


# Matches a whole tag, allowing '>' to appear inside quoted attribute values —
# the favicon is a data: URI containing SVG markup, so a naive [^>]* stops early
# and leaves half the tag behind as visible text.
def _tag(pattern):
    return r'(?is)<' + pattern + r'(?:[^>"\']|"[^"]*"|\'[^\']*\')*>'


def unwrap(html):
    """Return the document's content without its outer shell tags."""
    html = re.sub(_tag(r'!doctype'), '', html)
    # (?=[\s/>]) so "head" does not also eat <header>.
    html = re.sub(r'(?is)</?(?:html|head|body)(?=[\s/>])[^>]*>', '', html)
    # The host supplies charset, viewport and favicon.
    html = re.sub(_tag(r'meta\s+charset'), '', html)
    html = re.sub(_tag(r'meta\s+name="viewport"'), '', html)
    html = re.sub(_tag(r'link\s+rel="icon"'), '', html)
    return re.sub(r'\n{3,}', '\n\n', html).strip() + '\n'


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    fragment = '--fragment' in sys.argv
    out_name = args[0] if args else DEFAULT_OUT
    html = read('index.html')

    # --- stylesheet -------------------------------------------------------
    link = re.search(r'<link rel="stylesheet" href="\./([^"]+)"/?>', html)
    if not link:
        sys.exit('index.html no longer links a stylesheet the way this script expects')
    css = read(link.group(1)).strip()
    html = html.replace(link.group(0), '<style>\n%s\n</style>' % css)

    # --- scripts, in the order index.html loads them ----------------------
    tags = re.findall(r'<script src="\./([^"]+)"></script>', html)
    if not tags:
        sys.exit('index.html loads no local scripts')
    for rel in tags:
        js = read(rel).strip()
        # A literal closing tag inside a string would end the inlined block early.
        if '</script' in js.lower():
            sys.exit('%s contains a closing script tag and cannot be inlined as-is' % rel)
        tag = '<script src="./%s"></script>' % rel
        html = html.replace(tag, '<script>\n/* ===== %s ===== */\n%s\n</script>' % (rel, js))

    if 'src="./' in html or 'href="./css' in html:
        sys.exit('something is still loaded from a separate file')

    if fragment:
        html = unwrap(html)

    with open(os.path.join(HERE, out_name), 'w', encoding='utf-8') as fh:
        fh.write(html)

    size = os.path.getsize(os.path.join(HERE, out_name))
    print('wrote %s  (%d scripts inlined, %.0f KB%s)'
          % (out_name, len(tags), size / 1024, ', fragment' if fragment else ''))


if __name__ == '__main__':
    main()
