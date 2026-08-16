# BITWISE - IGCSE Computer Science

A study site covering the whole Cambridge IGCSE Computer Science syllabus (0478 / 0984), built as
plain HTML, CSS and JavaScript. No build step, no dependencies, no accounts, no network calls.
Open `index.html` and it works.

There is also a single-file build. `python3 build-single.py` inlines the CSS and all the JavaScript
into `bitwise-single.html`, one self-contained file with no external references at all, so it runs from a
USB stick, an email attachment or `file://` with no server and no internet connection.

## What is in it

- **All 10 topics, 27 subtopics.** Exam-focused notes with the tables, worked examples and mark
  scheme wordings that actually score, plus the traps that lose marks.
- **210 flashcards.** Every key term in the syllabus, scheduled with Leitner boxes so cards you
  know come back later and cards you miss come straight back.
- **212 exam-style questions**, at least five per subtopic. Multiple choice is marked automatically;
  written questions show a full mark scheme and model answer for you to mark yourself against.
  There are also 30 minute timed mocks for each paper.
- **Fourteen interactive labs**, for the parts of the syllabus that only click when you can poke them:

  | Lab | Covers |
  |---|---|
  | **Pseudocode runner** | 8.1 write Cambridge pseudocode and run it, with line-numbered errors |
  | **Scenario workshop** | 7.4 practice for the 15 mark question, marked against what your code does |
  | **Parity block check** | 2.2 find the corrupted bit from the row and column parity |
  | **Journey of a web page** | 5.1 step through DNS lookup to rendered page |
  | **Threat and defence drill** | 5.3 name the threat, then match the defence |
  | Number converter | 1.1 denary, binary and hex with live place value working |
  | Binary maths lab | 1.1 addition with carries and overflow, logical shifts, two's complement |
  | File size calculator | 1.2 image and sound sizes, every division shown |
  | Character codes | 1.2 text to ASCII, binary and hex |
  | Fetch decode execute | 3.1 step through the cycle, register by register |
  | Logic lab | 10.1 truth tables from any expression, with intermediate gate columns |
  | SQL lab | 9.1 real queries against two sample tables, with tasks |
  | Trace table trainer | 7.3 fill in a trace table and get it checked cell by cell |
  | Speed drill | 1.1 sixty seconds of timed conversions |

- **Progress tracking.** Each subtopic scores out of 100: reading the notes is worth 20, your own
  confidence rating up to 30, and quiz accuracy up to 50. Reading alone never gets you past a fifth,
  which is the point.
- **Search** over notes, terms and labs (press `/`), a full A to Z glossary, an exam guide with
  command words, light and dark themes, and a study streak.
- **Built for keyboard use**: `/` to search, `?` for the shortcut list, `g` then a letter to jump
  between sections, `j` and `k` to step through subtopics, `t` to switch theme. Long note pages get
  a contents rail, a reading progress bar and a copy button on every code block.

## Layout

```
igcse-cs/
  index.html          app shell
  css/styles.css      design tokens and components
  js/
    data/syllabus-p1.js   topics 1 to 6 (Paper 1)
    data/syllabus-p2.js   topics 7 to 10 (Paper 2)
    data/questions.js     the question bank
    store.js          progress, streak and card scheduling in localStorage
    pseudocode.js     tokeniser, parser, interpreter and static analysis for pseudocode
    tools.js          the fourteen labs
    quiz.js           quiz engine
    cards.js          flashcards
    app.js            router, chrome and pages
```

## Adding content

Notes live as HTML strings inside the two syllabus files. A subtopic looks like this:

```js
{
  id: "1.1", title: "Number systems",
  goals: ["Convert between denary, binary and hexadecimal", ...],
  notes: `<h3>Why binary?</h3><p>...</p>`,
  terms: [["Binary", "A base-2 number system..."], ...],   // these become flashcards automatically
  tips:  ["Always write the place value headings above your bits..."],
  tools: [["Number converter", "#/tool/convert"]]
}
```

Questions go in `js/data/questions.js`, tagged with the subtopic id:

```js
{ t:"1.1", ty:"mcq", m:1, q:"...", o:["a","b","c","d"], a:0, e:"why" }
{ t:"1.1", ty:"txt", m:3, q:"...", a:"model answer", pts:["mark scheme point", ...] }
```

Progress is keyed on subtopic ids, so adding terms or questions to an existing subtopic works
without migrating anything.

## Notes on accuracy

Content follows the **0478 / 0984 syllabus for examination in 2026, 2027 and 2028** (the current
version at the time of writing). That means binary prefixes (KiB, MiB), two's complement rather
than sign and magnitude, and the Paper 2 rule that coded answers must be written in pseudocode
except in the 15 mark scenario question, where Python, Visual Basic or Java are also accepted.

The topic structure is unchanged from the 2023-2025 version, so notes remain usable either way.
Always check the current syllabus for your own exam series before relying on any revision
resource, including this one.
