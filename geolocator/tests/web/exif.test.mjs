import { extractGps } from "../../geolocator/web/exif.js";
import fs from "fs";

const DIR = process.env.FIXTURES || "/tmp/exif-fixtures";
process.chdir(DIR);
const truth = JSON.parse(fs.readFileSync("truth.json", "utf8"));
let pass = 0, fail = 0;
const check = (name, cond, detail = "") => {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name} ${detail}`); }
};

const load = (f) => {
  const b = fs.readFileSync(f);
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
};

for (const [name, want] of Object.entries(truth)) {
  const got = extractGps(load(`${name}.jpg`));
  if (name === "nullisland") {
    check("nullisland rejected", got === null, JSON.stringify(got));
    continue;
  }
  if (!got) { check(`${name} parsed`, false, "returned null"); continue; }
  const dLat = Math.abs(got.lat - want.lat), dLon = Math.abs(got.lon - want.lon);
  check(`${name} ${got.lat.toFixed(5)},${got.lon.toFixed(5)}`,
        dLat < 1e-5 && dLon < 1e-5,
        `want ${want.lat.toFixed(5)},${want.lon.toFixed(5)}`);
}

const err = extractGps(load("witherror.jpg"));
check("positioning error -> 2.5 km sigma", Math.abs(err.sigmaKm - 2.5) < 1e-6, String(err.sigmaKm));
const dflt = extractGps(load("paris.jpg"));
check("default sigma 50 m", Math.abs(dflt.sigmaKm - 0.05) < 1e-9, String(dflt.sigmaKm));

const alt = extractGps(load("withalt.jpg"));
check("altitude read", Math.abs(alt.altitude - 8848) < 1, String(alt.altitude));
check("date read", alt.date === "2024-05-01", String(alt.date));

check("no gps jpeg -> null", extractGps(load("nogps.jpg")) === null);
check("png without gps -> null", extractGps(load("nogps.png")) === null);
check("random bytes -> null", extractGps(load("garbage.bin")) === null);
check("truncated jpeg -> null", extractGps(load("truncated.jpg")) === null);
check("empty buffer -> null", extractGps(new ArrayBuffer(0)) === null);
check("tiny buffer -> null", extractGps(new ArrayBuffer(3)) === null);

// HEIC, TIFF and WebP store the same EXIF payload outside a JPEG APP1 segment.
const heic = extractGps(load("fake.heic"));
check("non-JPEG container fallback",
      heic && Math.abs(heic.lat - 48.85822) < 1e-4 && Math.abs(heic.lon - 2.2945) < 1e-4,
      JSON.stringify(heic));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
