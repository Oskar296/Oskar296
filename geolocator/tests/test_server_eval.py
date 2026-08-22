import io
import json
import os
import sys
import threading
import urllib.error
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from PIL import Image

from geolocator.evaluate import Item, evaluate, format_summary, load_dataset
from geolocator.server import _handler_factory
from geolocator.types import Place, Prediction


class _FakeLocator:
    def __init__(self, pred=None, error=None):
        self.pred = pred
        self.error = error
        self.warnings = ["heads up"]

    def warm_up(self):
        pass

    def locate_image(self, image):
        if self.error:
            raise self.error
        return self.pred

    def locate(self, path):
        if self.error:
            raise self.error
        return self.pred


def _prediction(lat=59.33, lon=18.06):
    return Prediction(
        lat=lat, lon=lon, radius_km=42.0, confidence=0.8,
        place=Place("Stockholm", "Stockholm", "", "SE", "Sweden"),
    )


@pytest.fixture
def server():
    from http.server import ThreadingHTTPServer

    def start(locator):
        httpd = ThreadingHTTPServer(("127.0.0.1", 0), _handler_factory(locator))
        threading.Thread(target=httpd.serve_forever, daemon=True).start()
        return httpd, f"http://127.0.0.1:{httpd.server_address[1]}"

    made = []
    yield lambda loc: made.append(start(loc)) or made[-1]
    for httpd, _ in made:
        httpd.shutdown()
        httpd.server_close()


def _jpeg_bytes(size=(64, 64)):
    buf = io.BytesIO()
    Image.new("RGB", size, (100, 120, 90)).save(buf, format="JPEG")
    return buf.getvalue()


def _post(url, data, content_type="image/jpeg"):
    req = urllib.request.Request(
        url + "/api/locate", data=data, headers={"Content-Type": content_type}, method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status, json.loads(resp.read())
    except urllib.error.HTTPError as exc:
        return exc.code, json.loads(exc.read())


def test_serves_the_page(server):
    _, url = server(_FakeLocator(_prediction()))
    with urllib.request.urlopen(url + "/", timeout=10) as resp:
        body = resp.read().decode()
    assert resp.status == 200
    assert "<title>Geolocator</title>" in body


def test_locate_returns_a_prediction(server):
    _, url = server(_FakeLocator(_prediction()))
    status, payload = _post(url, _jpeg_bytes())
    assert status == 200
    assert payload["lat"] == 59.33
    assert payload["description"].startswith("Stockholm")
    assert payload["warnings"] == ["heads up"]


def test_rejects_a_non_image_body(server):
    _, url = server(_FakeLocator(_prediction()))
    status, payload = _post(url, b"this is not a picture")
    assert status == 400
    assert "could not read" in payload["error"]


def test_rejects_an_empty_upload(server):
    _, url = server(_FakeLocator(_prediction()))
    status, payload = _post(url, b"")
    assert status == 400


def test_reports_prediction_failure_as_500(server):
    _, url = server(_FakeLocator(error=RuntimeError("model exploded")))
    status, payload = _post(url, _jpeg_bytes())
    assert status == 500
    assert "model exploded" in payload["error"]


def test_unknown_route_is_404(server):
    _, url = server(_FakeLocator(_prediction()))
    with pytest.raises(urllib.error.HTTPError) as exc:
        urllib.request.urlopen(url + "/nope", timeout=10)
    assert exc.value.code == 404


# --- evaluation -------------------------------------------------------------

def test_load_dataset_csv_resolves_relative_paths(tmp_path):
    (tmp_path / "a.jpg").write_bytes(_jpeg_bytes())
    ds = tmp_path / "d.csv"
    ds.write_text("image,lat,lon\na.jpg,59.33,18.06\n")
    items = load_dataset(str(ds))
    assert len(items) == 1
    assert items[0].path == str(tmp_path / "a.jpg")
    assert items[0].lat == 59.33


def test_load_dataset_jsonl(tmp_path):
    ds = tmp_path / "d.jsonl"
    ds.write_text(json.dumps({"image": "/x.jpg", "lat": 1.0, "lon": 2.0}) + "\n\n")
    items = load_dataset(str(ds))
    assert len(items) == 1 and items[0].path == "/x.jpg"


def test_load_dataset_rejects_bad_columns(tmp_path):
    ds = tmp_path / "d.csv"
    ds.write_text("file,latitude\nx,1\n")
    with pytest.raises(ValueError, match="image, lat and lon"):
        load_dataset(str(ds))


def test_evaluate_scores_and_survives_failures():
    good = _FakeLocator(_prediction())
    items = [Item("a.jpg", 59.33, 18.06), Item("b.jpg", 59.33, 18.06)]
    report = evaluate(good, items)
    assert len(report.results) == 2
    s = report.summary()
    assert s["median_error_km"] < 1
    assert s["accuracy"]["<=1km"] == 1.0
    assert s["mean_geoguessr_score"] > 4900
    assert "calibration" in s

    bad = _FakeLocator(error=RuntimeError("nope"))
    r2 = evaluate(bad, items)
    assert not r2.results and len(r2.failures) == 2
    assert "No successful predictions" in format_summary(r2)


def test_calibration_measures_radius_honesty():
    """A radius claiming 68% coverage should be checked against reality."""
    loc = _FakeLocator(_prediction())
    # True location 1000 km away, far outside the claimed 42 km radius.
    report = evaluate(loc, [Item("a.jpg", 50.0, 18.06)])
    assert report.summary()["calibration"]["observed_within_radius"] == 0.0


def test_report_json_round_trips():
    report = evaluate(_FakeLocator(_prediction()), [Item("a.jpg", 59.33, 18.06)])
    data = json.loads(report.to_json())
    assert data["summary"]["n"] == 1
    assert data["results"][0]["place"].startswith("Stockholm")


def test_load_dataset_skips_comments_and_blank_lines(tmp_path):
    ds = tmp_path / "d.csv"
    ds.write_text("# a note\n\nimage,lat,lon\n# another\nx.jpg,1.0,2.0\n\n")
    items = load_dataset(str(ds))
    assert len(items) == 1 and items[0].lat == 1.0
