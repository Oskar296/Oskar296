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

## Try it without installing anything

**[Read a photo's location in the browser](https://claude.ai/code/artifact/c0d24141-796a-4272-aa0b-23fed54f8d14)** —
drop in a photo and it pulls the GPS tag straight out of the file, names the
coordinates against an embedded gazetteer and plots them. Entirely client-side:
nothing is uploaded. Only works on photos that still carry their metadata.

For everything else the models have to look at the picture itself, which needs a
GPU and a couple of gigabytes of weights:

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Oskar296/Oskar296/blob/claude%2Flocation-guessing-ai-w2wzzx/geolocator/notebooks/Geolocator.ipynb)

Opens a notebook that installs itself, loads the models on a free GPU and lets
you drop in a photo. Nothing touches your machine. Add an `ANTHROPIC_API_KEY`
in Colab's Secrets panel to switch the reasoning head on.

---

## Install

```bash
pip install -e .            # core: EXIF + retrieval
pip install -e '.[reasoning]'   # adds the Claude vision head
```

First run downloads the CLIP ViT-L/14 backbone (~1.7 GB) from Hugging Face.
Pre-fetch it on a machine with access if your environment blocks that host:

```bash
huggingface-cli download openai/clip-vit-large-patch14
```

The reasoning head is enabled automatically when credentials are present:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

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
  cli.py         command line
  web/index.html drag-and-drop UI
  web/exif.js    browser-side EXIF GPS parser
notebooks/       run it in Colab, no install
```

Copyright © 2026 Oskar Lindström. All rights reserved — matching the licence
the rest of this repository uses. Change it if you intend to publish this.
