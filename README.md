# IGCSE Geography 0460

A revision site for **Cambridge IGCSE Geography (0460)**: syllabus notes, case studies,
a glossary and a self-test question bank. It is a static site with no build step,
no dependencies and no tracking. Open `index.html` and it works.

## What's in it

| | |
|---|---|
| **19 units** | Every unit of the three syllabus themes, with the syllabus objectives listed at the top of each |
| **18 case studies** | Named examples with the statistics that lift an answer out of the middle band |
| **213 glossary terms** | Definitions written the way a mark scheme wants them, grouped by unit |
| **148 questions** | Multiple choice with an explanation on every answer, right or wrong |
| **5 skills sections** | Command words, the papers, map skills, graphs and data, and Paper 4 fieldwork |

Progress is stored in your browser with `localStorage`: units you mark as revised,
and your score per unit, which the home page uses to point you at your weakest topics.
Nothing leaves the machine.

## Running it

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Layout

```
index.html              app shell
css/styles.css          design tokens and all styling
js/
  util.js               namespace, inline markup parser, progress storage
  content-theme1.js     Theme 1 — Population and settlement (7 units)
  content-theme2.js     Theme 2 — The natural environment (5 units)
  content-theme3.js     Theme 3 — Economic development (7 units)
  content-skills.js     exam technique, map/graph skills, fieldwork
  casestudies.js        the case study bank
  glossary.js           definitions
  questions.js          the question bank
  contours.js           the contour-map canvas on the home page
  views.js              block renderer and page views
  quiz.js               self-test logic
  app.js                router, sidebar, search, theme switching
```

### Adding content

Notes are plain data. A unit is an object in one of the `content-theme*.js` files:

```js
{
  id: '2.6',
  title: 'A new unit',
  objectives: ['What the syllabus asks for'],
  cases: ['case-id'],
  sections: [
    { h: 'A heading', blocks: [
      { p: 'A paragraph. **Bold**, *italic* and `code` all work.' },
      { ul: ['A bullet'] },
      { defs: [['Term', 'Definition']] },
      { table: { head: ['A', 'B'], rows: [['1', '2']] } },
      { tip: 'An exam tip box.' },
      { stats: [['61 km', 'a figure worth memorising']] }
    ] }
  ]
}
```

A question is `Q(unitId, stem, options, answerIndex, explanation)`. **Write the correct
option first** — the quiz shuffles options at runtime, so the position in the source
file does not matter.

Glossary `id`s are generated from the term, so `[[longshore drift]]` in any note links
to that definition automatically.

## Notes on accuracy

Figures are the widely quoted ones and are rounded. Where sources genuinely disagree —
the Haiti death toll, Dharavi's population — a range is given rather than false
precision, and the disagreement is stated. Syllabus structure, paper timings and
weightings are revised from time to time by Cambridge; check them against the syllabus
document for your own exam year.

This is an independent revision aid. It is not affiliated with or endorsed by Cambridge
Assessment International Education.
