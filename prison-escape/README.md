# 🚨 BLACKGATE — 2D Prison Escape

A top-down **stealth escape** game. You're the only ordinary inmate in a maximum-security
wing packed with super-villains. The lights are out, the guards are patrolling, and
**BRUTE**, **VOLT**, **WRAITH** and the **WARDEN** stand between you and the sky.
Stay in the shadows, collect the keycards, and slip out through the gate.

**▶ Play:** open `index.html` (or the deployed GitHub Pages URL).
No build step, no dependencies — plain HTML5 canvas + JavaScript.

## Controls

| Action | Keys |
| --- | --- |
| Move | `W A S D` or arrow keys (or the on-screen stick on touch) |
| Sprint | `Shift` — faster, but loud enough for nearby guards to hear |
| Hide in a locker | `E` / `Space` while standing next to one |
| Pause | `Esc` |
| Restart block | `R` |

## How it plays

- **Vision cones** are the light in front of each guard/villain. Step into one and the
  **ALARM** meter climbs; fill it and you're recaptured. Break line of sight (duck around
  a wall or into a locker) and it cools back down.
- **Keycards** open the colour-matched doors. Collect every card in a block to unlock the
  **EXIT** gate.
- **Lockers** make you invisible — a clutch way to wait out a patrol or a chase.
- A **minimap** (top-right) shows walls, doors, keys, the exit, and every enemy.

## The roster

| | Who | Behaviour |
| --- | --- | --- |
| 🔵 | **GUARD** | Steady patrols, tight vision cone, hears you sprint. |
| 🔴 | **BRUTE** | Slow — but *charges* in a straight line the instant he locks on. |
| 🩵 | **VOLT** | Fast and erratic, wanders freely, quick to react. |
| 🟣 | **WRAITH** | Blinks in and out of reality, teleporting to new spots. Blind while phased. |
| 🟡 | **WARDEN** | Wide, far-reaching sight. Guards the final gate. |

## Blocks

1. **CELL BLOCK D** — the warm-up. One keycard, a guard, and a BRUTE by the door.
2. **MAXIMUM SECURITY** — two keycards, VOLT and WRAITH join the party.
3. **THE GATE** — three keycards and the WARDEN between you and freedom.

## Project layout

```
prison-escape/
├─ index.html          # markup: canvas, HUD, overlays, touch controls
├─ css/styles.css      # styling / UI
└─ js/
   ├─ audio.js         # Web Audio synthesised SFX + adaptive ambient drone
   ├─ input.js         # keyboard + touch joystick
   ├─ levels.js        # level maps, parser, solvability validation
   ├─ entities.js      # player + guard/villain AI (patrol, LOS, chase)
   └─ game.js          # loop, state, rendering, lighting, minimap, HUD
```

Everything is synthesised at runtime (art is drawn on the canvas, sound via the Web Audio
API) so there are **no external assets** to load.
