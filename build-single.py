#!/usr/bin/env python3
"""Inline the CSS and every script into one standalone HTML file.

Useful for putting the whole site on a phone or a memory stick, or opening it
with no server and no internet connection. Output goes to
igcse-geography-single.html.

    python3 build-single.py
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = 'igcse-geography-single.html'


def read(*parts):
    with open(os.path.join(HERE, *parts), encoding='utf-8') as fh:
        return fh.read()


def build():
    html = read('index.html')

    css = read('css', 'styles.css').strip()
    link = '<link rel="stylesheet" href="./css/styles.css"/>'
    if link not in html:
        sys.exit('index.html no longer links the stylesheet the way this script expects')
    html = html.replace(link, '<style>\n%s\n</style>' % css)

    # Keep the order index.html loads them in; the content files must run
    # before the views that read them.
    scripts = re.findall(r'<script src="\./js/([a-z0-9-]+)\.js"></script>', html)
    if not scripts:
        sys.exit('found no script tags to inline; has index.html changed?')

    for name in scripts:
        js = read('js', '%s.js' % name).strip()
        # A literal closing tag inside a string would end the inlined block early.
        if '</script' in js.lower():
            sys.exit('%s.js contains a closing script tag and cannot be inlined as-is' % name)
        tag = '<script src="./js/%s.js"></script>' % name
        html = html.replace(tag, '<script>\n/* %s.js */\n%s\n</script>' % (name, js))

    if 'src="./js' in html or 'href="./css' in html:
        sys.exit('something is still loaded from disk; the bundle would be broken')

    return html


def main():
    html = build()
    path = os.path.join(HERE, OUT)
    with open(path, 'w', encoding='utf-8') as fh:
        fh.write(html)
    print('%s  (%.0f KB)' % (OUT, os.path.getsize(path) / 1024))


if __name__ == '__main__':
    main()
