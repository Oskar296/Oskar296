# 🔬 XENOSCOPE — Specimen Protocol

A sleek, single-organism xenobiology game. **One** alien cell drifts under your
bio-scope. Command gives you an order — **cultivate** it or **neutralize** it —
but it arrives *unidentified*. First you read its biology; then you use the
medium and its own internal **virus/symbiont** to decide its fate.

No grids, no build step, no dependencies. One `index.html`, one living cell.

## ▶ Play

Open `index.html` in any modern browser, or serve it:

```bash
cd xenoscope
python3 -m http.server 8000   # then open http://localhost:8000
```

## The loop: probe → read → decide

1. **Probe.** Click the specimen's structures and the fluid around it. Each click
   scans a layer and fills your dossier:
   - **Nucleus / Genome** → identifies the species & its metabolic class
   - **Cytoplasm** → detects a dormant **virus or symbiont** inside (and unlocks it)
   - **Organelles** → reveals which nutrient it eats (and which one poisons it)
   - **Membrane** → reveals its structural weakness (osmotic / thermal / toxin / none)
   - **Culture Medium** → reveals its optimum pH & temperature (marks the green bands)
2. **Read.** The more you know, the fewer fatal mistakes — feeding a pathogen or
   shocking the wrong membrane just wastes time while the specimen drifts.
3. **Decide.** Tune the medium and, if present, its internal **vector**:

| Goal | How |
|---|---|
| 🟢 **Cultivate** | Park pH & temperature in the green bands, feed the correct nutrient, clear toxin. If it carries a **symbiont**, *nurture* it to revive a failing host. |
| 🔴 **Neutralize** | Drive the medium far off-optimum, starve or poison it, exploit the membrane weakness (osmotic shock / heat / cytotoxin) — or **induce its dormant lytic phage** to burst it from the inside. |

## The vector mechanic

Most specimens carry a passenger, discovered by scanning the cytoplasm:

- **Lytic phage** — a latent virus. **Induce** it (or overheat the host) and it
  replicates, eating the membrane until the cell bursts. Your fastest kill — but
  if your job was to *save* the host, you must keep it **suppressed**.
- **Endosymbiont** — a mutualist bacterium. **Nurture** it and it revives a dying
  host; starve it and the host weakens.

Same toggle, opposite uses — the biology decides which way it cuts.

## Win / lose

- **Cultivate:** raise **Vitality to 100%**. Lose if it falls to 0 (or its
  membrane ruptures on your watch).
- **Neutralize:** drive **Vitality to 0** or rupture the membrane. Lose if it
  reaches 100% and escapes containment.

The **Homeostasis** bar is your live tell: green = the current medium suits it,
red = it's under stress.

## Under the hood

Everything is one `index.html`: a `<canvas>` renderer (an organic, wobbling
membrane drawn from summed sine perturbations, a pulsing nucleus, drifting
organelles, phage/symbiont particles, environment-tinted fluid) over a small
continuous biology sim — comfort from pH/temperature/nutrient/toxin drives a
vitality curve, with independent membrane-integrity and vector dynamics. Vanilla
JavaScript, no libraries.

*Every specimen — species, optimum, weakness, and passenger — is generated fresh
and is original to this project.*
