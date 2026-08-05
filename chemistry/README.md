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

**333 questions** across five formats: multiple choice, select-all, numeric with
a tolerance, and short text answers that accept the obvious variations. Every
one has a worked explanation, not just a right answer, and every subtopic has
questions of its own.

**Reference tools.** An interactive periodic table of all 118 elements that
gives you Ar, group, period and electronic configuration on tap, plus a data
sheet with every cation, anion, gas and flame test, the solubility rules, the
reactivity series, the industrial processes and the formula list.

**69 flashcards** covering the definitions that come up again and again, filterable by topic.

## The game part

| Mechanic | How it works |
| --- | --- |
| XP and levels | 10 XP a question, 14 for Supplement, multiplied by up to 2x by your correct-answer run. 12 ranks from Lab Assistant to Laureate. |
| Mastery | Every question sits in a Leitner box from 0 to 5. Subtopic and topic mastery are the average box level, so the percentage is real syllabus coverage, not a session score. |
| Spaced repetition | Correct answers push a question out 1, 2, 4, 8 then 16 days. A wrong answer drops it a box and puts it back in the queue immediately. |
| Daily quests | Three each day, worth 50 to 90 XP. |
| Streaks | Counted per day, with badges at 3, 7 and 30. |
| Topic challenges | Unlock at 50 per cent mastery. 12 questions, 3 lives, 45 seconds each. Score 75 per cent with lives left and you take the topic crown. |
| Badges | 19 of them, plus a crown for each of the 12 topics. |
| Weak spots | The home screen surfaces the subtopics you have started but not locked in. |

## Files

```
index.html            shell, loads everything in order
css/styles.css        all styling
js/syllabus.js        the 0620 topic and objective tree
js/questions-1..4.js  the question bank
js/data-refs.js       elements, data sheet, flashcards
js/store.js           save state, XP, mastery, spaced repetition, badges, quests
js/quiz.js            question selection, marking, XP rules, sound
js/app.js             views, routing, session engine
```

## Progress and saves

Everything is kept in `localStorage` under `igcse-chem-lab-v1`, so it stays on
the device and never leaves the browser. Settings has a copy and paste export if
you want to move it somewhere else, and a reset if you want to start over.

## Adding questions

Append to any `questions-*.js` array. The shape is:

```js
{ id: "q7-99", t: 7, s: "7.1", lv: "C", ty: "mcq",
  q: "The question",
  o: ["A", "B", "C", "D"], a: 1,
  ex: "Why that is the answer." }
```

`t` is the topic number, `s` is the subtopic id from `syllabus.js`, `lv` is `C`
or `S`, and `ty` is one of `mcq` (`a` is the index), `multi` (`a` is an array of
indices), `num` (`a` is the value, with `tol`) or `text` (`a` is an array of
accepted lowercase answers, with an optional `disp` for how the answer is shown
back). Mastery and the review schedule pick new questions up automatically.

## Accuracy note

The syllabus objectives are condensed from the published 0620 syllabus and the
questions are written to match it, but this is a study aid rather than an
official Cambridge resource. Check anything that matters against the current
syllabus document for your exam series.
