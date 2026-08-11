# IGCSE Physics — Edexcel 4PH1 study app

A single-page revision app covering the whole Pearson Edexcel International GCSE
Physics specification (4PH1). No build step, no dependencies, no network calls —
open `index.html` and it runs.

Live at `/physics/` once the repo is served.

## What's in it

| Tab | Contents |
|---|---|
| **Overview** | All 8 sections as cards with per-section progress, plus a summary of the exam structure. |
| **Sections** | 195 spec points across 29 topics. Each point expands to show a plain-English explanation of what the objective actually means, the equation where there is one, and a three-way progress toggle. |
| **Equations** | All 36 equations named in the spec, grouped by section, in symbols and in words, with units. |
| **Practicals** | The 12 core practicals: aim, numbered method, variables, and sources of error with improvements. |
| **Definitions** | 90 definitions worth learning close to word for word. |
| **Flashcards** | The definitions as a shuffled deck, filterable by section. Cards you miss come round again. |
| **Quiz** | 173 multiple-choice questions with worked explanations. Ten at a time, filterable by section — or by **Weak spots**, which draws from the three sections with the fewest points marked confident. |
| **Exam Qs** | 25 structured exam-style questions, 91 parts, 232 marks. Each part reveals its mark scheme and an examiner's note on its own, so you can attempt before you look. |
| **Drills** | 31 randomised calculation drills. Fresh numbers every time, answers marked within 1% so rounding is not punished, full working shown afterwards, with a running streak. |
| **Technique** | Command words, how to lay out a calculation, graph skills, a unit-conversion table, six-mark question strategy, and the traps that cost the most marks. |

Search (top right) covers spec points, equations, definitions, practicals, exam
questions and technique notes at once.

## Tags

- <kbd>Physics only</kbd> — content shown in **bold** in the specification. Assessed on
  Paper 2 and not part of Double Award Science. 21 points carry this tag.
- <kbd>Core practical</kbd> — the point names a practical investigation.
- <kbd>Equation</kbd> — the point comes with an equation you need to recall.

## Progress tracking

Every spec point can be marked *Not started*, *Learning* or *Confident*. Progress
and the light/dark preference are stored in `localStorage` under the key
`igcse-phys-4ph1-v1`, so they persist per browser and never leave the device.
"Reset all progress" in the footer clears it.

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
```

To add an MCQ, append to `js/data/questions-2.js`: `s` is the section number,
`o` the four options, `a` the index of the correct one, `e` the explanation.

To add an exam question, push onto `EXAMQS` with a `context` and a `parts` array;
each part needs `q`, `marks`, an `ms` array of mark-scheme points, and a `tip`.

To add a drill, push onto `DRILLS` with a `gen()` that returns fresh random values
each call: `given` (rows of label/value/unit), `ask` (label and unit), `ans` (the
numeric answer) and `work` (the worked solution shown afterwards). Keep working
lines at 3 significant figures — the `sf()` helper in that file does it.

## A caveat worth reading

The content follows the Edexcel International GCSE Physics specification (4PH1,
first teaching 2017) and covers every learning objective in it. Spec point
numbering follows the specification's ordering, but a reference here may differ by
one from the official PDF in places. Use the official specification and recent past
papers as the final authority on exact wording, and check the front of your own
past paper as to whether a formula sheet is provided — this app assumes you need
to recall every equation.
