# 🛸 XENOBLOOM — Alien Biome Protocol

A tiny, self-contained browser game about **xenobiology**. You're a xenobiologist on a
deep-space station where an alien ecosystem is blooming across your lab deck. The
organisms arrive **unidentified** — your job is to **scan** them, tell friend from
foe, then use biology to either **nurture** the helpful life or **purge** the hostile
strains before it eats the ship.

No build step, no dependencies. Just open the file.

## ▶ Play

Open `index.html` in any modern browser (or double-click it).

To serve it locally:

```bash
cd xenobloom
python3 -m http.server 8000
# then visit http://localhost:8000
```

## The three lifeforms

| Organism | Verdict | Biology |
|---|---|---|
| 🟢 **Luxpod** | **Support** | Photo-symbiote — splits starlight into breathable O₂. Grow it to terraform the deck to 100%. Fragile: high toxin burns it. |
| 🔴 **Rustmaw** | **Destroy** | Metal-eating pathogen. Corrodes your hull, exhales toxin, spreads fast and devours Luxpod. Purge on sight — and **never feed it.** |
| 🟣 **Driftcyst** | **Decide** | Dormant spore with an unstable genome. Feed it → it mutates into Luxpod. Leave it near toxin or Rustmaw → it mutates into Rustmaw. You choose its fate. |

⭐ **Starwells** are fixed light sources; Luxpod grows faster near them.

## How to win / lose

- **Win:** raise **Terraform O₂ to 100%** by growing and sustaining Luxpod colonies.
- **Lose:** let **Hull Integrity** hit 0% — Rustmaw will get you there if left unchecked.

## Tools (cost ⚡ Lab Energy, which regenerates)

| Key | Tool | Effect |
|---|---|---|
| `1` | ◎ **Scan** | Reveal the genome of unknown `?` colonies in an area. Identify before you act. |
| `2` | ✚ **Nutrient Gel** | Feeds Luxpod and steers Driftcyst benign — but also feeds Rustmaw, so scan first! |
| `3` | ✷ **UV Purge** | Kills organisms in an area. Great on Rustmaw, but it also scorches Luxpod. |
| `4` | ⌬ **Gene-Splice** | Rewrite a single cell (e.g. turn Rustmaw → Luxpod). Powerful but expensive. |

Pick a tool, then **click or drag** across the biome. `Space` pauses.

## Difficulty

- **Intern** — forgiving hull, fast energy regen.
- **Xenobiologist** — the standard run.
- **Outbreak** — brutal Rustmaw pressure.

## Under the hood

Everything lives in one `index.html`: a `<canvas>` renderer plus a small cellular
ecosystem simulation (growth, resource-driven spreading, parasitism, and
environment-driven mutation) running on a fixed timestep. Vanilla JavaScript, no
libraries.

*All organisms and lore here are original to this project.*
