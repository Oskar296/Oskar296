# Bio 4BI1 — Edexcel IGCSE Biology study app

A self-contained revision app covering the whole **Pearson Edexcel International GCSE Biology (4BI1)** specification: notes, diagrams, flashcards, quizzes, core practicals and exam technique.

Open `biology/index.html` in a browser. No build step, no server, no dependencies — it works from a file:// path or from GitHub Pages.

## What is in it

| | |
|---|---|
| Topics | 5, split into 29 sub-topics |
| Key terms / flashcards | 289 |
| Practice questions | 245 (138 multiple choice, 107 written) |
| Core practicals | 11 |
| Mock paper formats | 3 (110 / 70 / 30 marks) |
| Diagrams | 9 hand-drawn SVGs, theme-aware |

**Topic 1** The nature and variety of living organisms
**Topic 2** Structures and functions in living organisms (14 sub-topics: cells, molecules and enzymes, transport across membranes, nutrition, respiration, gas exchange, transport, excretion, coordination, homeostasis)
**Topic 3** Reproduction and inheritance
**Topic 4** Ecology and the environment
**Topic 5** Use of biological resources

## Features

- **Syllabus browser** — each sub-topic has learning objectives, notes, tables, equations, exam-tip callouts, labelled diagrams and key terms.
- **Flashcards** with Leitner spaced repetition — five boxes, intervals of 0/1/3/7/21 days. Cards you get right come back less often; missed cards return immediately. Filter by topic or sub-topic, and reverse the direction.
- **Quiz engine** — multiple choice marks itself and explains the answer; written questions show a mark scheme for honest self-marking. Choose scope, length and type, or run "my weakest first". At the end you can redo just the ones you missed.
- **Mock exam** — a timed paper built from the bank in Paper 1 (110 marks / 2 h), Paper 2 (70 marks / 1 h 15) or short-test (30 marks / 35 min) format. All questions on one page like a real paper, a countdown that auto-submits at zero, then per-question self-marking against the mark scheme with a live running total and a breakdown of where the marks went missing.
- **Core practicals** — method, variables, expected results and the errors examiners ask about.
- **Exam skills** — paper structure, command words, maths and graph skills, six-mark answer structure, and a "do not write / write instead" table of the classic mark-losing phrases.
- **Glossary** — every definition in one A–Z list, each linked back to its sub-topic.
- **Progress tracking** — studied ticks, per-topic percentages, quiz accuracy by topic, weakest sub-topics, study streak. Export and import your progress as JSON.
- **Works offline** — a service worker caches the whole app on first visit, and there is a web manifest, so it can be installed to a phone home screen and used with no connection.
- Full-text search (press `/`), light/dark/auto themes, keyboard shortcuts, responsive down to phone width.

## Keyboard

| Key | Action |
|---|---|
| `/` | Focus search |
| `space` | Flip the current flashcard |
| `1` / `2` | Grade a flipped flashcard: missed it / got it |
| `Esc` | Close the search box or mobile menu |

## Data storage

Everything is saved in `localStorage` under the key `bio4bi1.v1` — on the device only, nothing is sent anywhere. Clearing site data erases it, so use **Progress → Back up** if it matters.

## Structure

```
biology/
  index.html          shell, loads everything with plain <script> tags
  manifest.webmanifest, icon.svg, icon-maskable.svg, sw.js   install + offline
  css/styles.css      theme tokens, layout, components
  js/
    diagrams.js       inline SVG diagrams + numbered legends
    syllabus.js       assembles topic files, lookup helpers
    store.js          localStorage progress, Leitner scheduling
    render.js         note blocks → HTML
    views.js          dashboard, syllabus, sub-topic, practicals, exam, glossary, progress, search
    cards.js          flashcard session
    quiz.js           quiz session
    mock.js           timed mock paper and self-marking
    app.js            hash router, sidebar, theme, shortcuts
    data/
      topic1.js  topic2a.js  topic2b.js  topic3.js  topic4.js  topic5.js
      practicals.js  exam.js
```

Content is data, not markup. A sub-topic is an object with `objectives`, `notes` (typed blocks: `p`, `h`, `ul`, `ol`, `table`, `eq`, `note`, `def`, `fig`), `terms` and `qs`. Adding material means editing a data file — nothing else needs to change.

## Offline and installing

Served over http(s), the service worker caches every file on the first load, so afterwards the app opens with no connection. On a phone, use the browser's *Add to home screen* and it launches full-screen like an app. Opening `index.html` straight off the disk works too — the service worker is simply skipped on `file://`.

Editing a file? Bump `CACHE` in `sw.js` so returning visitors get the new version rather than the cached one.

## A note on the specification

The notes follow the structure and content of the 4BI1 specification, with objectives written in plain English rather than quoted spec-point numbers. Paper 1 and Paper 2 both draw on the whole specification; Paper 2 additionally assesses the higher-demand content flagged in the official spec document, so check that document for which points those are. Always confirm against the current spec on the Pearson website before relying on any revision resource, including this one.
