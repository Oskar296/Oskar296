# IGCSE Physics — Edexcel 4PH1 study app

A single-page revision app covering the whole Pearson Edexcel International GCSE
Physics specification (4PH1). No build step, no dependencies, no network calls —
open `index.html` and it runs.

Live at `/physics/` once the repo is served.

## What's in it

| Tab | Contents |
|---|---|
| **Overview** | All 8 sections as cards with per-section progress, plus a summary of the exam structure. |
| **Sections** | 195 spec points across 29 topics. Each point expands to show a plain-English explanation of what the objective actually means, the equation where there is one, any diagrams that apply, and a three-way progress toggle. |
| **Equations** | All 36 equations named in the spec, grouped by section, in symbols and in words, with units. |
| **Practicals** | The 12 core practicals: aim, numbered method, variables, and sources of error with improvements. |
| **Definitions** | 90 definitions worth learning close to word for word. |
| **Flashcards** | The definitions as a shuffled deck, filterable by section. Cards you miss come round again. |
| **Quiz** | 173 multiple-choice questions with worked explanations. Ten at a time, filterable by section — or by **Weak spots**, which draws from the three sections needing the most work. |
| **Exam Qs** | 25 structured exam-style questions, 91 parts, 232 marks. Each part reveals its mark scheme and an examiner's note on its own, so you can attempt before you look, then self-mark it and have the score counted. |
| **Drills** | 31 randomised calculation drills. Fresh numbers every time, answers marked within 1% so rounding is not punished, full working shown afterwards, with a running streak. |
| **Technique** | Command words, how to lay out a calculation, graph skills, a unit-conversion table, six-mark question strategy, and the traps that cost the most marks. |

17 inline SVG diagrams are attached to the spec points they explain — motion
graphs, I–V characteristics, ray diagrams, field patterns, the EM spectrum,
decay curves and more. They are drawn from CSS variables, so they follow the
light/dark theme rather than being fixed images.

Search (top right) covers spec points, equations, definitions, practicals, exam
questions and technique notes at once.

## Keyboard

| Key | Does |
|---|---|
| <kbd>/</kbd> | focus search |
| <kbd>1</kbd>–<kbd>4</kbd> | answer the current quiz question |
| <kbd>Enter</kbd> | next question · check a drill answer |
| <kbd>Space</kbd> | flip the current flashcard |
| <kbd>←</kbd> / <kbd>→</kbd> | flashcard: not yet / knew it |
| <kbd>?</kbd> | show the shortcut list |

## How "Weak spots" decides

Every quiz answer, drill attempt and self-marked exam part is recorded against
its section. `sectionNeed()` in `js/app.js` combines two signals: the self-ticked
checklist, and measured accuracy weighted twice as heavily, since what you score
is a better guide than what you have ticked. Sections with fewer than four
recorded attempts count as untested rather than as perfect, so they still
surface. The **Start here** panel on the Overview shows the top three and says
why each one is there.

## Routing

Views are addressed by URL hash — `#quiz`, `#drills`, `#home/7` for section 7 —
so the browser back button works and any view can be linked to directly. An
unrecognised hash falls back to the Overview.

## Tags

- <kbd>Physics only</kbd> — content shown in **bold** in the specification. Assessed on
  Paper 2 and not part of Double Award Science. 21 points carry this tag.
- <kbd>Core practical</kbd> — the point names a practical investigation.
- <kbd>Equation</kbd> — the point comes with an equation you need to recall.

## Progress tracking

Every spec point can be marked *Not started*, *Learning* or *Confident*. Alongside
that, the app records how you actually score: quiz answers, drill attempts and
self-marked exam parts, all per section. Both, plus the light/dark preference, are
stored in `localStorage` under the key `igcse-phys-4ph1-v1`, so they persist per
browser and never leave the device. "Reset all progress" in the footer clears
the checklist and the recorded scores together.

## Files

```
index.html          markup and script order
css/styles.css      dark and light themes
js/app.js           routing, rendering, progress, quiz and flashcard logic
js/data/spec-core.js    SPEC container + the shape of a spec point
js/data/spec-1..8.js    one file per section, each pushing onto SPEC.sections
js/data/equations.js    equation list
js/data/practicals.js   core practical write-ups
js/data/glossary.js     definitions / flashcard deck
js/data/questions.js    multiple-choice bank
js/data/questions-2.js  second MCQ bank, appended to the first
js/data/exam-1-4.js     structured exam questions, sections 1-4
js/data/exam-5-8.js     structured exam questions, sections 5-8
js/data/technique.js    command words, graph skills, unit table, traps
js/data/drills.js       randomised calculation drill generators
js/data/diagrams.js     inline SVG diagrams, keyed to spec points
```

To add an MCQ, append to `js/data/questions-2.js`: `s` is the section number,
`o` the four options, `a` the index of the correct one, `e` the explanation.

To add an exam question, push onto `EXAMQS` with a `context` and a `parts` array;
each part needs `q`, `marks`, an `ms` array of mark-scheme points, and a `tip`.

To add a drill, push onto `DRILLS` with a `gen()` that returns fresh random values
each call: `given` (rows of label/value/unit), `ask` (label and unit), `ans` (the
numeric answer) and `work` (the worked solution shown afterwards). Keep working
lines at 3 significant figures — the `sf()` helper in that file does it.

To add a diagram, push onto `DIAGRAMS` with a `points` array of the spec
references it belongs to. Style the SVG with the existing `svg.dg` classes rather
than hard-coded colours, so it works in both themes, and keep all drawing inside
the declared `viewBox` or it will be clipped.

## A caveat worth reading

The content follows the Edexcel International GCSE Physics specification (4PH1,
first teaching 2017) and covers every learning objective in it. Spec point
numbering follows the specification's ordering, but a reference here may differ by
one from the official PDF in places. Use the official specification and recent past
papers as the final authority on exact wording, and check the front of your own
past paper as to whether a formula sheet is provided — this app assumes you need
to recall every equation.
