"""A small local web interface.

Built on the standard library so running the UI adds no dependencies. It binds
to localhost by default: this uploads photographs to a model, so it should not
be exposed to a network without thinking about that first.
"""

from __future__ import annotations

import io
import json
import os
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

_HERE = os.path.dirname(os.path.abspath(__file__))
# Shipped inside the package: a pip install has no repo root to look up into.
_INDEX = os.path.join(_HERE, "web", "index.html")

# 25 MB: comfortably above any phone photo, low enough to bound memory.
MAX_UPLOAD_BYTES = 25 * 1024 * 1024


def _handler_factory(locator):
    lock = threading.Lock()

    class Handler(BaseHTTPRequestHandler):
        server_version = "geolocator"

        def log_message(self, fmt, *args):  # quieter than the default
            print(f"  {self.address_string()} {fmt % args}")

        def _send(self, code, body: bytes, content_type: str):
            self.send_response(code)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(body)))
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            self.wfile.write(body)

        def _send_json(self, code, payload: dict):
            self._send(code, json.dumps(payload).encode("utf-8"), "application/json")

        def do_GET(self):
            if self.path in ("/", "/index.html"):
                try:
                    with open(_INDEX, "rb") as fh:
                        body = fh.read()
                except OSError:
                    self._send(500, b"web/index.html is missing", "text/plain")
                    return
                self._send(200, body, "text/html; charset=utf-8")
                return
            if self.path == "/api/health":
                self._send_json(200, {"ok": True})
                return
            self._send(404, b"not found", "text/plain")

        def do_POST(self):
            if self.path != "/api/locate":
                self._send(404, b"not found", "text/plain")
                return
            try:
                length = int(self.headers.get("Content-Length") or 0)
            except ValueError:
                self._send_json(400, {"error": "bad Content-Length"})
                return
            if length <= 0:
                self._send_json(400, {"error": "empty upload"})
                return
            if length > MAX_UPLOAD_BYTES:
                self._send_json(413, {"error": "image too large (limit 25 MB)"})
                return

            raw = self.rfile.read(length)
            try:
                from PIL import Image, ImageOps

                image = ImageOps.exif_transpose(Image.open(io.BytesIO(raw)))
            except Exception as exc:  # noqa: BLE001
                self._send_json(400, {"error": f"could not read that image: {exc}"})
                return

            # One prediction at a time: the models are not thread-safe and a
            # local UI has no reason to run them concurrently.
            with lock:
                try:
                    pred = locator.locate_image(image.convert("RGB"))
                    payload = pred.as_dict()
                    payload["warnings"] = locator.warnings
                except Exception as exc:  # noqa: BLE001
                    self._send_json(500, {"error": str(exc)})
                    return
            self._send_json(200, payload)

    return Handler


def serve(locator, host: str = "127.0.0.1", port: int = 8000) -> None:
    print("loading models...")
    try:
        locator.warm_up()
    except Exception as exc:  # noqa: BLE001
        print(f"  warning: {exc}")
    httpd = ThreadingHTTPServer((host, port), _handler_factory(locator))
    print(f"\n  geolocator running at http://{host}:{port}\n  ctrl-c to stop\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nstopping")
    finally:
        httpd.server_close()
