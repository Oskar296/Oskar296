#!/usr/bin/env python3
"""Bundle the app into one self-contained HTML file.

  python3 build-single.py                 -> bio4bi1-single.html (a whole document)
  python3 build-single.py --body OUT.html -> page content only, no doctype/html/head/body,
                                             for hosts that supply their own wrapper

Everything is inlined, so the result needs no server, no network and no other files.
"""
import re
import sys
import pathlib

HERE = pathlib.Path(__file__).parent
SRC = (HERE / 'index.html').read_text(encoding='utf-8')


def read(rel):
    return (HERE / rel).read_text(encoding='utf-8')


def inline_css(html):
    def sub(m):
        css = read(m.group(1))
        return '<style>\n' + css.strip() + '\n</style>'
    return re.sub(r'<link rel="stylesheet" href="([^"]+)"\s*/?>', sub, html)


def inline_js(html):
    def sub(m):
        js = read(m.group(1))
        # </script> inside a string literal would close the tag early
        js = js.replace('</script>', '<\\/script>')
        return '<script>\n' + js.strip() + '\n</script>'
    return re.sub(r'<script src="([^"]+)"></script>', sub, html)


def strip_offline(html):
    """The service worker and manifest need separate files, so drop them."""
    html = re.sub(r'\s*<link rel="manifest"[^>]*>', '', html)
    html = re.sub(r'\s*<link rel="apple-touch-icon"[^>]*>', '', html)
    html = re.sub(r"\s*<script>\s*\nif \('serviceWorker'.*?</script>", '', html, flags=re.S)
    return html


def build():
    html = inline_js(inline_css(strip_offline(SRC)))
    if '<link' in html.split('<body')[0].replace('<link rel="icon"', ''):
        raise SystemExit('a stylesheet or manifest link was left un-inlined')
    if 'src="js/' in html:
        raise SystemExit('a script was left un-inlined')
    return html


def to_body_only(html):
    """Keep <title>, the inlined <style>, the page markup and the scripts."""
    title = re.search(r'<title>(.*?)</title>', html, re.S).group(1)
    style = re.search(r'<style>.*?</style>', html, re.S).group(0)
    body = re.search(r'<body>(.*?)</body>', html, re.S).group(1)
    return '<title>%s</title>\n%s\n%s\n' % (title, style, body.strip())


if __name__ == '__main__':
    page = build()
    if '--body' in sys.argv:
        out = pathlib.Path(sys.argv[sys.argv.index('--body') + 1])
        out.write_text(to_body_only(page), encoding='utf-8')
    else:
        out = HERE / 'bio4bi1-single.html'
        out.write_text(page, encoding='utf-8')
    print('%s  %.0f KB' % (out, out.stat().st_size / 1024))
