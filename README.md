# IGCSE Geography 0460

A revision site for **Cambridge IGCSE Geography (0460)**, built for the syllabus for
**examination in 2027, 2028 and 2029**: notes on all ten topics, case studies, a
glossary and a self-test question bank. It is a static site with no build step, no
dependencies and no tracking. Open `index.html` and it works.

## What's in it

| | |
|---|---|
| **10 topics** | Five physical (Paper 1) and five human (Paper 2) |
| **20 case studies** | Named examples with the statistics that lift an answer out of the middle band |
| **213 glossary terms** | Definitions written the way a mark scheme wants them, grouped by topic |
| **160 questions** | Multiple choice with an explanation on every answer |
| **5 skills sections** | Command words, the papers, map skills, graphs and data, and fieldwork |

Progress is stored in your browser with `localStorage`: topics you mark as revised,
and your score per topic, which the home page uses to point you at your weakest areas.
Nothing leaves the machine.

## Which syllabus this follows

Cambridge rewrote 0460 for first examination in 2027. The changes are substantial:

- The three themes (Population and settlement, The natural environment, Economic
  development) are gone, replaced by **ten topics**
- Papers 1 and 2 are now split **physical / human**, each 1 h 45 and 75 marks
- The separate **Geographical Skills paper has been removed**
- **Climate change is new content**, and sustainability runs through the whole syllabus

Older textbooks and past papers are organised the other way round, so expect them not
to line up with this site.

> **Verify the detail.** This was assembled without access to the official syllabus
> PDF, which the build environment could not reach. The ten topic names and the paper
> structure are corroborated across several sources; the **sub-topic breakdown within
> each topic is not official** and is organised the way the notes read best. Check
> against the [syllabus document](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-geography-0460/)
> for your own exam year before relying on it.

## Running it

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>. For one portable file to put on a phone:

```sh
python3 build-single.py
```

## Layout

```
index.html              app shell
css/styles.css          design tokens and all styling
js/
  util.js               namespace, inline markup parser, progress storage
  content-theme1.js     prose: population, settlement, urbanisation
  content-theme2.js     prose: tectonics, rivers, coasts, weather, ecosystems
  content-theme3.js     prose: development, food, industry, tourism, energy, water
  content-climate.js    prose: climate change (new in this syllabus)
  content-skills.js     exam technique, map/graph skills, fieldwork
  syllabus.js           the ten topics, composed from the prose above
  casestudies.js        the case study bank
  glossary.js           definitions
  questions.js          the question bank
  contours.js           the contour-map canvas on the home page
  views.js              block renderer and page views
  quiz.js               self-test logic
  app.js                router, sidebar, search, theme switching
```

### How the structure works

The prose lives in the `content-*.js` files as sections. `syllabus.js` decides which
sections make up each topic:

```js
{ id: 'resources', title: 'Resource provision',
  from: [{ u: '3.5' }, { u: '3.6' }, { u: '3.7', except: ['Air pollution'] }] }
```

This means the notes are written once and re-filed by editing one small file. If
Cambridge moves things again, only `syllabus.js` changes.

Sections deliberately dropped because a rewritten version lives elsewhere are recorded
in `GEO.superseded`, so the content check can tell a replacement from an accidental
loss.

### Adding content

A section is a heading plus blocks:

```js
{ h: 'A heading', blocks: [
  { p: 'A paragraph. **Bold**, *italic* and `code` all work.' },
  { ul: ['A bullet'] },
  { defs: [['Term', 'Definition']] },
  { table: { head: ['A', 'B'], rows: [['1', '2']] } },
  { tip: 'An exam tip box.' },
  { stats: [['61 km', 'a figure worth memorising']] }
] }
```

A question is `Q(tag, stem, options, answerIndex, explanation)`, where `tag` is either
a topic id or one of the older unit ids. **Write the correct option first** — the quiz
shuffles options at runtime, so position in the source file does not matter.

A case study names the topics it belongs to with `topics: ['climate-change']`, or
inherits them from `units:` tags.

Glossary `id`s are generated from the term, so `[[longshore drift]]` in any note links
to that definition automatically.

## Notes on accuracy

Figures are the widely quoted ones and are rounded. Where sources genuinely disagree —
the Haiti death toll, Dharavi's population — a range is given rather than false
precision, and the disagreement is stated.

This is an independent revision aid. It is not affiliated with or endorsed by Cambridge
Assessment International Education.
