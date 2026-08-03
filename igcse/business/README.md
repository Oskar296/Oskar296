# 📊 IGCSE Business Studies 0450 — revision app

A browser revision app for **Cambridge IGCSE Business Studies (0450)**. No build step, no
dependencies, no account. Everything runs from static files and your progress is saved in
your browser's local storage.

## ▶ Open it

```bash
cd igcse/business
python3 -m http.server 8000   # then open http://localhost:8000
```

Or open `index.html` directly (some browsers block local storage on `file://`, so progress
may not save).

## What's in it

| Section | What it does |
|---|---|
| **Dashboard** | Progress per unit, cards due for review, quiz accuracy, study streak, and the topics you flagged as shaky |
| **Notes** | All **6 units / 25 sub-topics** of the syllabus. Each topic opens with what the syllabus says you must know, then the content, key terms, exam tips, and the mistakes that lose the most marks |
| **Flashcards** | **242 key terms** in a Leitner spaced-repetition system — get a card right and it moves up a box and comes back later; get it wrong and it returns tomorrow |
| **Quiz** | **120 multiple-choice questions** with a worked explanation on every one, filterable by unit or topic, plus a "retry what I got wrong" mode |
| **Exam technique** | Paper 1 and Paper 2 structure and AO weightings, every command word and how to answer it, what a 2/4/6/12-mark answer needs, six 12-mark practice questions with model plans, and the full formula sheet |
| **Calculators** | Break-even (with a live chart), profitability and liquidity ratios, a six-month cash-flow forecast, plus added value, market share, labour turnover, productivity and price elasticity |
| **Glossary** | Every key term, searchable and filterable by unit |

## Syllabus coverage

1. **Understanding business activity** — 1.1 Business activity · 1.2 Classification of businesses · 1.3 Enterprise, business growth and size · 1.4 Types of business organisation · 1.5 Business objectives and stakeholder objectives
2. **People in business** — 2.1 Motivating employees · 2.2 Organisation and management · 2.3 Recruitment, selection and training · 2.4 Internal and external communication
3. **Marketing** — 3.1 Marketing, competition and the customer · 3.2 Market research · 3.3 The marketing mix · 3.4 Marketing strategy
4. **Operations management** — 4.1 Production of goods and services · 4.2 Costs, scale of production and break-even · 4.3 Achieving quality production · 4.4 Location decisions
5. **Financial information and decisions** — 5.1 Business finance · 5.2 Cash flow and working capital · 5.3 Income statements · 5.4 Statement of financial position · 5.5 Analysis of accounts
6. **External influences** — 6.1 Government economic objectives and policies · 6.2 Environmental and ethical issues · 6.3 Business and the international economy

## Keyboard shortcuts

| Key | Action |
|---|---|
| `/` or `Ctrl`/`Cmd` + `K` | Search topics, sections and terms |
| `Space` / `Enter` | Flip the current flashcard |
| `1` / `2` | Grade a flipped flashcard: not yet / got it |
| `Esc` | Close search |

## How it's put together

No framework. Plain HTML, CSS and ES5 JavaScript.

```
index.html            markup shell and script tags
css/styles.css        light and dark themes
js/store.js           namespace + localStorage: confidence, Leitner boxes, quiz history, streak
js/render.js          turns note data structures into HTML
js/notes/u1..u6.js    the syllabus content, one file per unit
js/glossary.js        242 key terms — also the flashcard deck
js/quizbank.js        120 questions with explanations
js/exam.js            papers, command words, mark ladders, drills, formula sheet
js/views-*.js         one file per section of the app
js/main.js            hash router, sidebar, theme toggle, search
```

Adding content means editing a data file — the views pick it up automatically. A topic looks
like this:

```js
BS.addTopic({
  id: '1.1', unit: 1, title: 'Business activity',
  syllabus: ['...'],                       // what the syllabus requires
  sections: [{ h: 'Heading', body: [...] }],
  terms: ['added-value', 'scarcity'],      // ids from glossary.js
  tips: ['...'], traps: ['...']
});
```

Body blocks can be a plain string (paragraph), `{h3}`, `{list}`, `{num}`, `{table}`,
`{defs}`, `{formula}` or `{callout}`. Inside any text you can use `**bold**`, `*italic*`,
`` `code` `` and `[[4.2]]` to link to another topic.

## A note on accuracy

Written to match the published Cambridge IGCSE Business Studies 0450 syllabus, but this is
not an official Cambridge resource. Always check the current syllabus for your exam series
at [cambridgeinternational.org](https://www.cambridgeinternational.org/).
