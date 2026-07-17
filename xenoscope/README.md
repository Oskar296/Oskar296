# 🔬 XENOSCOPE — Specimen Protocol

A sleek, single-organism xenobiology game. **One** alien cell drifts under your
bio-scope — it can belong to any of the **five kingdoms**, and each arrives
*unidentified*. Command hands you one of **eight** assignments. You read the
organism's biology, then use the medium and its own internal **virus / symbiont**
to carry the order out.

No grids, no build step, no dependencies. One `index.html`, one living cell.

## ▶ Play

Open `index.html` in any modern browser, or serve it:

```bash
cd xenoscope
python3 -m http.server 8000   # then open http://localhost:8000
```

## The five kingdoms

Every specimen is generated fresh, with anatomy that also tells you how it lives:

| Kingdom | Tell-tale anatomy |
|---|---|
| **Monera** (prokaryote) | No true nucleus — a bare **nucleoid**, plus **plasmid** rings, a **flagellum**, capsule wall. |
| **Protista** | Nucleus, a pulsing **contractile vacuole**, **cilia**, food vacuoles, amoeboid membrane. |
| **Fungi** | Nucleus, thick **chitin wall**, a large vacuole, **spore bodies**, mitochondria. |
| **Plantae** | Rigid **cellulose wall**, a dominant **central vacuole**, stacked-granum **chloroplasts**. |
| **Animalia** | No wall (flexible membrane), many **mitochondria** with cristae, **lysosomes**, **centrioles**. |

Seeing **chloroplasts** means the organism is an **autotroph** — feed it Nutrient α
(photonic/mineral). No plastids means **heterotroph** — feed it Nutrient β (organic).
The wrong nutrient is a poison, so read the organelles before you feed.

## The eight assignments

| # | Task | Win condition |
|---|------|---------------|
| 1 | **Cultivate** | Raise Vitality to 100% |
| 2 | **Neutralize** | Reduce Vitality to 0% (any method) |
| 3 | **Induce Lysis** | Rupture the membrane (Integrity → 0) — you must *burst* it, not starve it |
| 4 | **Stabilize** | Hold Vitality 40–70% for 6s (a balancing act) |
| 5 | **Force Bloom** | Reach & hold Vitality ≥90% for 5s |
| 6 | **Cure Infection** | Suppress an active lytic phage while keeping the host alive |
| 7 | **Quarantine** | Hold it subdued (<35%) for 7s without killing it |
| 8 | **Establish Symbiosis** | Nurture an endosymbiont to full integration while the host thrives |

Tasks are only assigned when the specimen's biology makes them possible — e.g.
*Cure* and *Symbiosis* require the right kind of passenger, *Induce Lysis*
requires an exploitable weakness or a lytic phage.

## The loop: probe → read → decide

1. **Probe.** Click the specimen's layers and the fluid around it. Each scan fills
   the dossier: **nucleus** (kingdom & species), **cytoplasm** (viral/symbiotic
   passenger), **organelles** (nutrient it needs), **envelope** (structural
   weakness), **medium** (optimum pH & temperature — marks the green bands).
2. **Read.** Acting blind backfires — feeding a pathogen, shocking the wrong
   membrane, or heating a phage-carrier all cost you while the specimen drifts.
3. **Decide.** Tune pH & temperature, feed or poison, exploit the weakness
   (osmotic shock / heat / cytotoxin), and use the **vector**:
   - **Lytic phage** — *induce* it to burst the host from inside (your fastest
     kill), or keep it *suppressed* when the host must live.
   - **Endosymbiont** — *nurture* it to revive a failing host.

The **Homeostasis** bar is your live tell: green = the medium suits it, red =
stress.

## Under the hood

Everything is one `index.html`: a `<canvas>` renderer — an organic, wobbling
envelope (summed-sine perturbation, styled per kingdom's wall), a pulsing nucleus,
and per-kingdom organelles each drawn as its own shape (cristae, granum stacks,
DNA loops, plasmid rings, flagella, cilia, spores, lysosomes, centrioles) —
layered over a continuous biology sim: comfort from pH/temperature/nutrient/toxin
drives a vitality curve, with independent membrane-integrity and vector dynamics.
Vanilla JavaScript, no libraries.

*Every specimen — kingdom, species, optimum, weakness, and passenger — is
generated fresh and is original to this project.*
