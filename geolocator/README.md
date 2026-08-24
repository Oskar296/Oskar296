# Geolocator

Estimates where a photograph was taken, anywhere on Earth, from the image alone.

It runs three independent heads over an image and fuses them into one calibrated
answer with an honest uncertainty radius:

| Head | What it uses | Strong at | Blind to |
|---|---|---|---|
| **EXIF** | GPS tags in the file | exact answers, when present | any photo stripped of metadata |
| **Retrieval** (GeoCLIP) | whole-image similarity against a 100k-point GPS gallery | landscape, biome, architectural gestalt | text, and anything the training set under-covers |
| **Reasoning** (Claude vision) | reading signs, plates, road markings, bollards, sun angle | scripts, languages, traffic conventions, small giveaways | places with no cultural signal in frame |

The retrieval and reasoning heads fail in opposite ways, which is the whole
argument for running both. Retrieval sees a snowy conifer road and says "boreal,
somewhere"; the reasoner reads `Apotek` on a shopfront and says "Sweden".

---

## No terminal? Open one file

Download **[Geolocator.html](Geolocator.html)** and double-click it. It runs in
your browser with nothing installed: paste an API key once, drop a photo in.

The key is kept in that browser's local storage on your own machine and is sent
only to Anthropic, which permits direct browser calls. Photos with a GPS tag are
read locally and never leave the machine at all.

A single file has limits: no GeoCLIP retrieval, and each photo is one API call
straight from the page. The server below is the better setup if you have a
terminal.

## Run it (server)

Two commands, in a terminal on your own machine. This runs a small web server
there — nothing is hosted for you.

```bash
pip install "git+https://github.com/Oskar296/Oskar296.git@claude/location-guessing-ai-w2wzzx#subdirectory=geolocator"
geolocate serve
```

The first run asks for an Anthropic API key, saves it to `.env` for you, and
opens `localhost:8000` in your browser. Get a key from
[console.anthropic.com](https://console.anthropic.com/settings/keys).

Then drop a photo in. About 20 seconds to install; no GPU and no model weights,
because the reasoning head is an API call.

- `geolocate key` changes the saved key later; `geolocate key --show` reports whether one is set.
- `.env` is gitignored and written 0600. An exported `ANTHROPIC_API_KEY` beats it;
  `GEOLOCATOR_ENV=/path/to/file` points somewhere else.
- **Never commit a key or paste one into a chat.** If one leaks, revoke it in the console.
- `geolocate serve --no-open` skips the browser; `--no-reasoner` runs without a key
  (GPS metadata only).

Optional extras, neither needed to get an answer:

```bash
pip install "geolocator[naming]"      # offline reverse geocoding
pip install "geolocator[retrieval]"   # GeoCLIP second opinion (large: torch + weights)
```

There is also a page that reads a photo's GPS tag entirely in the browser, for
photos that still have one:
<https://claude.ai/code/artifact/c0d24141-796a-4272-aa0b-23fed54f8d14>

## Use

```bash
geolocate photo.jpg                  # locate one image
geolocate photo.jpg --explain        # show the cues and the reasoning
geolocate photo.jpg --json           # machine-readable
geolocate serve                      # drag-and-drop web UI on localhost:8000
geolocate eval dataset.csv           # score against ground truth
```

```
  Trastevere, Lazio, Italy
  41.88934, 12.46921
  within ~34 km  (confidence 71% inside 200 km)
  https://www.openstreetmap.org/?mlat=41.88934&mlon=12.46921#map=12/41.88934/12.46921

  other possibilities
    18.4%  Florence, Tuscany, Italy  [retrieval]
     6.1%  Valencia, Spain           [reasoner]
```

As a library:

```python
from geolocator import Geolocator

pred = Geolocator().locate("photo.jpg")
print(pred.lat, pred.lon, pred.radius_km, pred.confidence)
print(pred.place.describe())
```

---

## How the fusion works

Each head returns a mixture of Gaussian kernels on the sphere, and — this is the
part that matters — its own honest 1-sigma radius for each guess. A head that
read a street name reports a few km; a head going on vegetation alone reports a
thousand.

Those are combined as a **product of experts**, not a mixture:

```
p(x) ∝ Π_h [ (1-ε)·mixture_h(x) + ε·uniform ]^{trust_h}
```

- A **product** means two heads that agree produce a *tighter* posterior than
  either alone — two equal Gaussians narrow by 1/√2, which is the correct
  behaviour for independent evidence. A mixture could never beat its own
  sharpest component.
- The **uniform escape term** `ε` keeps the product finite everywhere, so a head
  that is confident and wrong can be outvoted instead of vetoing every location
  the other head proposes.
- **Trust** is set per head and per image: the reasoner reports whether its
  evidence was strong (readable text) or weak (a general impression), and is
  weighted accordingly. EXIF outranks everything.

The posterior is then sampled by importance sampling to get the reported radius
and confidence. The point estimate is taken from the **dominant mode**, never the
global mean — averaging a bimodal posterior would answer halfway between
Stockholm and Sydney, which is the one place the photo certainly was not taken.
Runner-up modes are reported as alternatives instead.

---

## Measuring it

Guessing at one photo tells you nothing. Build a real labelled set from Street
View and score against it:

```bash
# in .env, alongside your Anthropic key
GOOGLE_MAPS_API_KEY=...

geolocate benchmark -n 100 --score
```

That samples random points over the globe with equal area, snaps each to the
nearest panorama, and writes the images out with **the panorama's own
coordinates** as ground truth, so the labels are exact. Then it reports
accuracy at the IM2GPS thresholds and checks whether the uncertainty radius is
honest.

The metadata lookups used to find panoramas are free; only the image requests
are billed. Enable *Street View Static API* on the key.

To re-score an existing set, or to score your own photos, put them in a CSV
with `image,lat,lon` columns and run `geolocate eval mydata.csv`.

## Accuracy — what to actually expect

Planet-scale geolocation is not solved, and no system reaches street level
everywhere. Realistic behaviour, from best to worst case:

- **Distinctive, text-rich urban scenes** — often correct to the city, sometimes
  the street.
- **Ordinary streets in well-covered countries** — usually the right country,
  frequently the right region.
- **Generic nature: open ocean, desert, boreal forest, plain grassland** — often
  the right continent and little more. There is genuinely not enough information
  in the pixels, and the reported radius will say so.

For the retrieval head alone, the GeoCLIP authors report roughly the following
on the IM2GPS3k benchmark:

| | 1 km | 25 km | 200 km | 750 km | 2500 km |
|---|---|---|---|---|---|
| GeoCLIP (published) | ~14% | ~34% | ~51% | ~70% | ~84% |

**Those are the backbone's published figures, not measurements of this system.**
This project has not been benchmarked end-to-end — that needs the CLIP weights,
an API key, and a labelled dataset, none of which were available where it was
built. Adding the reasoning head should help most in the 1–200 km bands, where
reading a sign is decisive and visual similarity is not, but **measure it rather
than believe it**:

```bash
geolocate eval mydata.csv --out report.json
```

```
images evaluated     3000  (failures: 0)
median error         184.2 km
mean GeoGuessr score 4,102 / 5000

accuracy within threshold (IM2GPS protocol)
  street  1 km          16.4%
  city   25 km          39.1%
  ...

calibration: 66.2% of true locations fell inside the reported radius (target 68%)
```

That last line is the one to watch. A prediction you can act on needs its
uncertainty to mean something, so the harness checks whether the radius that
claims 68% coverage actually delivers it. A good median error with broken
calibration is worse than the reverse.

Dataset format — CSV with `image,lat,lon` (paths relative to the file), or JSONL
with the same keys.

---

## Tests

```bash
pytest
```

57 tests. The geometry, fusion, EXIF, orchestration, server and evaluation
layers are covered directly. The retrieval tests run against the **real** GPS
gallery, location encoder and trained weights, stubbing only the CLIP image
backbone — so the retrieval maths, the density-derived sigmas and the
test-time-augmentation path are all exercised for real.

The reasoning head is tested against a stubbed API client: request shape,
schema, parsing, coordinate validation, refusal handling and trust weighting.
It has not been run against the live API.

---

## Responsible use

This locates *places*, not people, and it is built from published research
(IM2GPS, GeoCLIP) with ordinary uses: sorting your own photo library, verifying
where press imagery came from, checking what a photo you are about to post
reveals about you.

Photographs of other people can carry location information they did not intend
to share. Do not use this to determine where someone lives, works, or is right
now. The web UI binds to localhost by default because it uploads images to a
model; think before exposing it to a network.

---

## Layout

```
geolocator/
  geo.py         spherical geometry, scoring, sampling
  types.py       candidates, head outputs, predictions
  fusion.py      product-of-experts fusion and uncertainty
  retrieval.py   GeoCLIP head (TTA, temperature, density sigmas)
  reasoner.py    Claude vision head (cue extraction, structured output)
  exif.py        GPS metadata head
  places.py      offline reverse geocoding
  rerank.py      country-prior re-ranking of retrieval candidates
  predictor.py   orchestration and graceful degradation
  evaluate.py    IM2GPS metrics, GeoGuessr scoring, calibration
  server.py      stdlib web server
  env.py         .env loading
  benchmark.py   builds a labelled set from Street View
  cli.py         command line
  web/index.html drag-and-drop UI
  web/exif.js    browser-side EXIF GPS parser
```

Copyright © 2026 Oskar Lindström. All rights reserved — matching the licence
the rest of this repository uses. Change it if you intend to publish this.
