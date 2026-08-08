# Chem Lab

The whole Cambridge IGCSE Chemistry (0620) syllabus turned into a game you can
actually finish. No build step, no dependencies, no account. Open `index.html`
and it runs.

Live at `/chemistry/` once the site is deployed.

## What is in it

**The complete syllabus.** All 12 topics and all 41 subtopics, with the learning
objectives written out and tagged Core or Supplement. Switch Supplement off in
settings and the whole app, questions included, drops back to Core only for the
Core paper.

**460 questions** in seven formats, every one with a worked explanation rather
than just a right answer, and every subtopic covered:

| Format | What you do |
| --- | --- |
| Multiple choice | Pick one of four |
| Select all | Pick every option that applies |
| Numeric | Type a value, marked with a tolerance |
| Short answer | Type a word or formula, spacing and punctuation forgiven |
| Balancing | Put a coefficient in every gap of a real equation |
| Ordering | Drag cards into sequence: reactivity series, fractions, method steps |
| Matching | Pair ions with test results, processes with catalysts, and so on |

**Reference tools.** An interactive periodic table of all 118 elements that
gives you Ar, group, period and electronic configuration on tap; a data sheet
with every cation, anion, gas and flame test, the solubility rules, the
reactivity series, the industrial processes and the formula list; and a bench of
calculators.

**69 flashcards** covering the definitions that come up again and again,
filterable by topic.

## The game part

| Mechanic | How it works |
| --- | --- |
| XP and levels | 10 XP a question, 14 for Supplement, up to 4 more for the harder formats, multiplied by up to 2x by your correct-answer run. 12 ranks from Lab Assistant to Laureate. |
| Mastery | Every question sits in a Leitner box from 0 to 5. Subtopic and topic mastery are the average box level, so the percentage is real syllabus coverage, not a session score. |
| Spaced repetition | Correct answers push a question out 1, 2, 4, 8 then 16 days. A wrong answer drops it a box and puts it back in the queue immediately. |
| Daily quests | Three each day, worth 50 to 90 XP. |
| Streaks | Counted per day, with badges at 3, 7 and 30. |
| Topic challenges | Unlock at 50 per cent mastery. 12 questions, 3 lives, 45 seconds each. Score 75 per cent with lives left and you take the topic crown. |
| Badges | 25 of them, plus a crown for each of the 12 topics. |
| Weak spots | The home screen surfaces the subtopics you have started but not locked in. |

### Game modes

**Daily challenge.** Ten questions drawn by a seed made from the date, so
everyone gets the same set on the same day and reloading cannot reroll it. One
attempt, then it is locked until tomorrow.

**Mock exam.** Forty questions spread across all twelve topics with a
45 minute clock. Flag questions, jump around with the answer sheet, and change
answers until you submit. Marked with rough grade boundaries from A* down to U,
logged in your exam history, and every question you met joins your review
schedule. Afterwards you can walk the whole paper question by question with your
answer next to the right one.

**Survival.** Three lives, no end. The clock starts at 30 seconds a question and
tightens as your score climbs. Your best run is recorded.

### Progress tracking

The Progress page keeps a 30 day XP chart, today's quests, mastery for all 12
topics and your awards, with records, accuracy by question format and the exam
log tucked behind a More detail expander.

## Getting around

Three places, and everything else is reached from inside them.

- **Study** is the home screen: your level, one big button that always knows what
  to do next (review what is due, or practise your weakest topic), the three game
  modes, and the 12 topics.
- **Tools** holds the periodic table, data sheet, flashcards and calculators.
- **Progress** holds your chart, quests, topic mastery and awards.

Each screen has a single obvious action. Secondary things are quiet outline
buttons, detail hides behind expanders, and tap targets are at least 40px.

## Calculators

- **Mr and composition.** Type any formula and get its relative formula mass, the
  atom count, and the percentage by mass of each element. Handles brackets and
  hydrates, so `Al2(SO4)3` and `CuSO4.5H2O` both work, and it explains what is
  wrong when a formula will not parse.
- **Moles, mass and molar mass.** Fill in any two, get the third.
- **Concentration.** c = n / V, with the cm3 to dm3 conversion done for you.
- **Gas volume at rtp**, using 24 dm3 per mole.

## Files

```
index.html            shell, loads everything in order
css/styles.css        all styling
js/syllabus.js        the 0620 topic and objective tree
js/questions-1..6.js  the question bank
js/data-refs.js       elements, data sheet, flashcards
js/store.js           save state, XP, mastery, spaced repetition, badges, quests, history
js/quiz.js            question selection, marking, XP rules, sound
js/tools.js           formula parser and the quantity calculators
js/app.js             views, routing, session engine, mock exam
```

## Progress and saves

Everything is kept in `localStorage` under `igcse-chem-lab-v1`, so it stays on
the device and never leaves the browser. Settings has a copy and paste export if
you want to move it somewhere else, and a reset if you want to start over. Old
saves are topped up with any new fields automatically, so an update never wipes
your progress.

## Adding questions

Append to any `questions-*.js` array. Mastery and the review schedule pick new
questions up automatically. `t` is the topic number, `s` is the subtopic id from
`syllabus.js`, and `lv` is `C` or `S`.

```js
{ id: "q7-99", t: 7, s: "7.1", lv: "C", ty: "mcq",
  q: "The question", o: ["A", "B", "C", "D"], a: 1, ex: "Why." }

{ ty: "multi",   a: [0, 2] }                       // indices of every correct option
{ ty: "num",     a: 24.5, tol: 0.1 }               // accepted range
{ ty: "text",    a: ["ethanol"], disp: "Ethanol" } // lowercase accepted forms, plus how to show it
{ ty: "balance", eq: { lhs: [["CH4", 1], ["O2", 2]], rhs: [["CO2", 1], ["H2O", 2]] } }
{ ty: "order",   a: ["First", "Second", "Third"] } // correct order, shuffled for the player
{ ty: "match",   pairs: [["Left", "Right"], ...] } // a right-hand option may repeat
```

## Accuracy note

The syllabus objectives are condensed from the published 0620 syllabus and the
questions are written to match it, but this is a study aid rather than an
official Cambridge resource. Exam grades here use round-number boundaries as a
rough guide, not real ones. Check anything that matters against the current
syllabus document for your exam series.
