"""Generate JPEG fixtures with known GPS EXIF for the browser parser tests.

Usage: python tests/web/make_fixtures.py [outdir]
Then:  node tests/web/exif.test.mjs      (FIXTURES=<outdir> if not the default)
"""

import json
import os
import sys

from PIL import Image

CASES = {
    "paris": ((48.0, 51.0, 29.6), "N", (2.0, 17.0, 40.2), "E", {}),
    "sydney": ((33.0, 52.0, 7.0), "S", (151.0, 12.0, 33.0), "E", {}),
    "rio": ((22.0, 54.0, 30.0), "S", (43.0, 10.0, 47.0), "W", {}),
    "anchorage": ((61.0, 13.0, 6.0), "N", (149.0, 54.0, 1.0), "W", {}),
    "witherror": ((59.0, 19.0, 45.0), "N", (18.0, 4.0, 6.0), "E", {31: 2500.0}),
    "withalt": ((27.0, 59.0, 17.0), "N", (86.0, 55.0, 31.0), "E",
                {5: 0, 6: 8848.0, 29: "2024:05:01"}),
    "nullisland": ((0.0, 0.0, 0.0), "N", (0.0, 0.0, 0.0), "E", {}),
}


def main(outdir: str) -> None:
    os.makedirs(outdir, exist_ok=True)
    truth = {}
    for name, (lat, lat_ref, lon, lon_ref, extra) in CASES.items():
        img = Image.new("RGB", (80, 60), (100, 110, 120))
        exif = img.getexif()
        gps = {1: lat_ref, 2: lat, 3: lon_ref, 4: lon}
        gps.update(extra)
        exif[0x8825] = gps
        exif[0x010E] = "a description to pad ifd0"
        img.save(os.path.join(outdir, f"{name}.jpg"), exif=exif)

        d = lat[0] + lat[1] / 60 + lat[2] / 3600
        o = lon[0] + lon[1] / 60 + lon[2] / 3600
        truth[name] = {"lat": -d if lat_ref == "S" else d,
                       "lon": -o if lon_ref == "W" else o}

    Image.new("RGB", (40, 40)).save(os.path.join(outdir, "nogps.jpg"))
    Image.new("RGB", (40, 40)).save(os.path.join(outdir, "nogps.png"))
    with open(os.path.join(outdir, "garbage.bin"), "wb") as fh:
        fh.write(os.urandom(5000))
    with open(os.path.join(outdir, "paris.jpg"), "rb") as fh:
        head = fh.read()[:60]
    with open(os.path.join(outdir, "truncated.jpg"), "wb") as fh:
        fh.write(head)

    # A non-JPEG container carrying the same EXIF payload, as HEIC and TIFF do.
    with open(os.path.join(outdir, "paris.jpg"), "rb") as fh:
        data = fh.read()
    payload = data[data.index(b"Exif\x00\x00"):][:400]
    with open(os.path.join(outdir, "fake.heic"), "wb") as fh:
        fh.write(b"\x00\x00\x00\x18ftypheic\x00\x00\x00\x00heicmif1" + b"\x11" * 64 + payload)

    with open(os.path.join(outdir, "truth.json"), "w") as fh:
        json.dump(truth, fh)
    print(f"fixtures written to {outdir}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "/tmp/exif-fixtures")
