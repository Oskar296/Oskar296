// Pooling of multiple reasoning passes in the standalone build.
// Run: node tests/web/merge.test.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const src = fs.readFileSync(path.join(ROOT, "Geolocator.html"), "utf8");
const start = src.indexOf("function haversineKm");
const end = src.indexOf("// ---------------------------------------------------------------- app ----");
if (start < 0 || end < 0) { console.error("could not locate merge helpers"); process.exit(1); }
const { mergePasses, haversineKm } = new Function(
  src.slice(start, end) + "; return { mergePasses, haversineKm };")();

let pass = 0, fail = 0;
const ck = (name, cond, detail = "") => {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}  ${JSON.stringify(detail)}`); }
};

const p = (label, lat, lon, probability, radius_km = 10) => ({ label, lat, lon, probability, radius_km });
const reply = (candidates) => ({ candidates, reasoning: "r" });

ck("haversine sanity", Math.abs(haversineKm(40.7128, -74.006, 51.5074, -0.1278) - 5570) < 30);

// Agreement must raise confidence, not dilute it across near-duplicate entries.
const agree = mergePasses([
  reply([p("Singapore", 1.29, 103.85, 0.7), p("Bangkok", 13.75, 100.5, 0.3)]),
  reply([p("Bangkok", 13.75, 100.5, 0.25), p("Singapore", 1.30, 103.86, 0.75)]),
  reply([p("Singapore", 1.28, 103.84, 0.8), p("Bangkok", 13.75, 100.5, 0.2)]),
]);
ck("agreeing passes keep high confidence", agree.candidates[0].probability > 0.6,
   agree.candidates[0].probability);
ck("winner is the agreed place", agree.candidates[0].label === "Singapore");
ck("spread measured from each pass's best guess, not its first line",
   agree.__spreadKm < 10, agree.__spreadKm);
ck("rival survives, summed across passes",
   agree.candidates[1]?.label === "Bangkok" && agree.candidates[1].probability > 0.2,
   agree.candidates[1]);
ck("probabilities sum to about 1",
   Math.abs(agree.candidates.reduce((s, c) => s + c.probability, 0) - 1) < 0.01);

// Disagreement must cap confidence and keep every mode visible.
const split = mergePasses([
  reply([p("Singapore", 1.29, 103.85, 1)]),
  reply([p("Madrid", 40.4, -3.7, 1)]),
  reply([p("Rio", -22.9, -43.2, 1)]),
]);
ck("scattered passes capped", split.candidates[0].probability <= 0.25, split.candidates[0].probability);
ck("scattered spread is continental", split.__spreadKm > 5000, split.__spreadKm);
ck("every mode survives", split.candidates.length === 3, split.candidates.length);

ck("single pass is returned untouched", mergePasses([reply([p("A", 1, 2, 1)])]).__passes === undefined);
ck("empty input yields null", mergePasses([]) === null);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
