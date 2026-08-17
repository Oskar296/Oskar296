/* game.js — the progression layer.

   Two rules this file sticks to:

   1. XP is DERIVED from real progress, never accumulated as a separate score.
      Re-answering a question you already know does not print XP. The only way
      the number goes up is by learning something you had not learned before.
   2. Nothing in the app is ever locked behind a level. Levels and badges are
      feedback on studying, not a gate in front of it.                        */

BS.game = (function () {

  /* ---------------- levels ---------------- */

  var LEVELS = [
    { n: 1,  xp: 0,    name: 'Work experience' },
    { n: 2,  xp: 120,  name: 'Intern' },
    { n: 3,  xp: 300,  name: 'Trainee' },
    { n: 4,  xp: 600,  name: 'Junior analyst' },
    { n: 5,  xp: 1000, name: 'Analyst' },
    { n: 6,  xp: 1500, name: 'Team leader' },
    { n: 7,  xp: 2100, name: 'Department manager' },
    { n: 8,  xp: 2900, name: 'Operations director' },
    { n: 9,  xp: 3900, name: 'Finance director' },
    { n: 10, xp: 5000, name: 'Managing director' },
    { n: 11, xp: 6200, name: 'Chief executive' },
    { n: 12, xp: 7500, name: 'Chair of the board' }
  ];

  /* XP a flashcard is worth at each Leitner box — mastery pays, seeing does not */
  var CARD_XP = [0, 2, 5, 9, 14, 20];

  function xp() {
    var s = BS.store, total = 0;

    BS.notes.forEach(function (t) { if (s.isRead(t.id)) total += 20; });

    BS.glossary.forEach(function (g) {
      total += CARD_XP[s.card(g.id).box] || 0;
    });

    BS.quiz.forEach(function (q) {
      var r = s.question(q.id);
      if (!r.tries) return;
      total += 1;                 /* for having a go */
      if (r.lastOk) total += 5;   /* for currently knowing it */
    });

    BS.written.forEach(function (w) {
      total += s.written(w.id).best * 4;
    });

    BS.cases.forEach(function (c) {
      c.questions.forEach(function (q, qi) {
        q.parts.forEach(function (p, pi) {
          total += s.caseAns(c.id + '.' + qi + '.' + pi).best * 3;
        });
      });
    });

    total += (s.rush().best || 0) * 2;
    return total;
  }

  function level(x) {
    if (x === undefined) x = xp();
    var cur = LEVELS[0];
    for (var i = 0; i < LEVELS.length; i++) if (x >= LEVELS[i].xp) cur = LEVELS[i];
    var next = LEVELS[cur.n] || null;   /* LEVELS is 0-indexed, so [cur.n] is the next one */
    return {
      n: cur.n,
      name: cur.name,
      xp: x,
      into: x - cur.xp,
      need: next ? next.xp - cur.xp : 0,
      toNext: next ? next.xp - x : 0,
      next: next,
      pct: next ? Math.min(100, Math.round((x - cur.xp) / (next.xp - cur.xp) * 100)) : 100
    };
  }

  /* ---------------- mastery ---------------- */

  /* A blended 0-100 score per unit. Reading alone caps you low on purpose —
     you cannot "master" a unit without answering questions on it.            */
  function mastery(unit) {
    var s = BS.store;
    var topics = BS.unitTopics(unit);
    if (!topics.length) return 0;

    var read = topics.filter(function (t) { return s.isRead(t.id); }).length / topics.length;

    var cards = BS.glossary.filter(function (g) { return g.u === unit; });
    var known = cards.length
      ? cards.filter(function (g) { return s.card(g.id).box >= 4; }).length / cards.length : 0;

    var qs = BS.quiz.filter(function (q) { return q.u === unit; });
    var right = qs.length
      ? qs.filter(function (q) { return s.question(q.id).lastOk; }).length / qs.length : 0;

    var ws = BS.written.filter(function (w) { return w.u === unit; });
    var wGot = 0, wMax = 0;
    ws.forEach(function (w) { wGot += s.written(w.id).best; wMax += w.marks; });
    var written = wMax ? wGot / wMax : 0;

    return Math.round((read * 0.20 + known * 0.30 + right * 0.25 + written * 0.25) * 100);
  }

  function overallMastery() {
    var t = 0;
    BS.units.forEach(function (u) { t += mastery(u.n); });
    return Math.round(t / BS.units.length);
  }

  /* ---------------- achievements ---------------- */

  var s = function () { return BS.store; };

  function readCount() {
    return BS.notes.filter(function (t) { return s().isRead(t.id); }).length;
  }
  function cardsAtBox(b) {
    return BS.glossary.filter(function (g) { return s().card(g.id).box >= b; }).length;
  }
  function quizAnswered() {
    return BS.quiz.filter(function (q) { return s().question(q.id).tries; }).length;
  }
  function quizRight() {
    return BS.quiz.filter(function (q) { return s().question(q.id).lastOk; }).length;
  }
  function writtenDone() {
    return BS.written.filter(function (w) { return s().written(w.id).tries; }).length;
  }
  function writtenFull() {
    return BS.written.filter(function (w) {
      var r = s().written(w.id); return r.tries && r.best >= w.marks;
    }).length;
  }
  function topicQuizPerfect(tp) {
    var qs = BS.quiz.filter(function (q) { return q.tp === tp; });
    return qs.length > 0 && qs.every(function (q) { return s().question(q.id).lastOk; });
  }
  function unitAllRead(u) {
    var ts = BS.unitTopics(u);
    return ts.length > 0 && ts.every(function (t) { return s().isRead(t.id); });
  }
  function caseParts(cid) {
    var c = BS.cases.filter(function (x) { return x.id === cid; })[0];
    if (!c) return { got: 0, max: 0, done: 0, parts: 0 };
    var got = 0, max = 0, done = 0, parts = 0;
    c.questions.forEach(function (q, qi) {
      q.parts.forEach(function (p, pi) {
        parts++; max += p.marks;
        var a = s().caseAns(cid + '.' + qi + '.' + pi);
        if (a.outOf) { done++; got += a.best; }
      });
    });
    return { got: got, max: max, done: done, parts: parts };
  }

  var ACHIEVEMENTS = [
    /* getting going */
    { id: 'first-topic', icon: '📖', name: 'Opening the file', d: 'Read your first topic.', group: 'Getting going',
      test: function () { return readCount() >= 1; } },
    { id: 'first-card', icon: '🗂', name: 'Card carrying', d: 'Grade your first flashcard.', group: 'Getting going',
      test: function () { return cardsAtBox(1) >= 1; } },
    { id: 'first-written', icon: '✍️', name: 'Pen to paper', d: 'Write and self-mark your first exam answer.', group: 'Getting going',
      test: function () { return writtenDone() >= 1; } },
    { id: 'first-case', icon: '📋', name: 'Case opened', d: 'Mark your first case study part.', group: 'Getting going',
      test: function () { return caseParts('c1').done + caseParts('c2').done >= 1; } },

    /* coverage */
    { id: 'unit1', icon: '1️⃣', name: 'Understanding business activity', d: 'Read every topic in Unit 1.', group: 'Coverage',
      test: function () { return unitAllRead(1); } },
    { id: 'unit2', icon: '2️⃣', name: 'People in business', d: 'Read every topic in Unit 2.', group: 'Coverage',
      test: function () { return unitAllRead(2); } },
    { id: 'unit3', icon: '3️⃣', name: 'Marketing', d: 'Read every topic in Unit 3.', group: 'Coverage',
      test: function () { return unitAllRead(3); } },
    { id: 'unit4', icon: '4️⃣', name: 'Operations management', d: 'Read every topic in Unit 4.', group: 'Coverage',
      test: function () { return unitAllRead(4); } },
    { id: 'unit5', icon: '5️⃣', name: 'Financial information', d: 'Read every topic in Unit 5.', group: 'Coverage',
      test: function () { return unitAllRead(5); } },
    { id: 'unit6', icon: '6️⃣', name: 'External influences', d: 'Read every topic in Unit 6.', group: 'Coverage',
      test: function () { return unitAllRead(6); } },
    { id: 'all-topics', icon: '🗺', name: 'Whole syllabus', d: 'Read all 25 sub-topics.', group: 'Coverage',
      test: function () { return readCount() >= BS.notes.length; } },

    /* recall */
    { id: 'cards-25', icon: '🌱', name: 'Taking root', d: 'Get 25 flashcards to box 4 or above.', group: 'Recall',
      test: function () { return cardsAtBox(4) >= 25; } },
    { id: 'cards-100', icon: '🌳', name: 'Hundred strong', d: 'Get 100 flashcards to box 4 or above.', group: 'Recall',
      test: function () { return cardsAtBox(4) >= 100; } },
    { id: 'cards-all', icon: '🧠', name: 'Total recall', d: 'Get every one of the 242 key terms to box 4 or above.', group: 'Recall',
      test: function () { return cardsAtBox(4) >= BS.glossary.length; } },
    { id: 'box5-50', icon: '💎', name: 'Locked in', d: 'Push 50 flashcards all the way to box 5.', group: 'Recall',
      test: function () { return cardsAtBox(5) >= 50; } },

    /* quiz */
    { id: 'quiz-50', icon: '✅', name: 'Half a century', d: 'Answer 50 different quiz questions.', group: 'Quiz',
      test: function () { return quizAnswered() >= 50; } },
    { id: 'quiz-all', icon: '🎯', name: 'Every question asked', d: 'Attempt all 120 quiz questions.', group: 'Quiz',
      test: function () { return quizAnswered() >= BS.quiz.length; } },
    { id: 'quiz-100-right', icon: '🏹', name: 'Sharpshooter', d: 'Have 100 quiz questions currently correct.', group: 'Quiz',
      test: function () { return quizRight() >= 100; } },
    { id: 'breakeven-boss', icon: '📈', name: 'Break-even boss', d: 'Get every 4.2 question right — the topic that catches most people.', group: 'Quiz',
      test: function () { return topicQuizPerfect('4.2'); } },
    { id: 'spiced', icon: '💱', name: 'SPICED', d: 'Get every 6.3 exchange rate question right.', group: 'Quiz',
      test: function () { return topicQuizPerfect('6.3'); } },

    /* written and cases — the ones that actually move a grade */
    { id: 'written-10', icon: '📝', name: 'Ten in the bank', d: 'Self-mark 10 written answers.', group: 'Written work',
      test: function () { return writtenDone() >= 10; } },
    { id: 'written-all', icon: '🖋', name: 'Every question written', d: 'Attempt all 27 written questions.', group: 'Written work',
      test: function () { return writtenDone() >= BS.written.length; } },
    { id: 'written-full-5', icon: '⭐', name: 'Full marks, five times', d: 'Score full marks on five written questions.', group: 'Written work',
      test: function () { return writtenFull() >= 5; } },
    { id: 'case-complete', icon: '📊', name: 'Paper finished', d: 'Mark every part of a whole case study.', group: 'Written work',
      test: function () {
        var a = caseParts('c1'), b = caseParts('c2');
        return (a.parts && a.done === a.parts) || (b.parts && b.done === b.parts);
      } },
    { id: 'case-70', icon: '🥇', name: 'Grade A paper', d: 'Score 70% or more across a full case study.', group: 'Written work',
      test: function () {
        return [caseParts('c1'), caseParts('c2')].some(function (c) {
          return c.parts && c.done === c.parts && c.max && c.got / c.max >= 0.7;
        });
      } },
    { id: 'both-cases', icon: '🏆', name: 'Both papers sat', d: 'Complete every part of both case studies.', group: 'Written work',
      test: function () {
        var a = caseParts('c1'), b = caseParts('c2');
        return a.parts && b.parts && a.done === a.parts && b.done === b.parts;
      } },

    /* exam rush */
    { id: 'rush-first', icon: '⏱', name: 'Under pressure', d: 'Play your first Exam Rush.', group: 'Exam Rush',
      test: function () { return s().rush().plays >= 1; } },
    { id: 'rush-300', icon: '🔥', name: 'On a roll', d: 'Score 300 or more in Exam Rush.', group: 'Exam Rush',
      test: function () { return s().rush().best >= 300; } },
    { id: 'rush-combo', icon: '⚡', name: 'Ten in a row', d: 'Hit a 10-answer streak in Exam Rush.', group: 'Exam Rush',
      test: function () { return (s().rush().bestCombo || 0) >= 10; } },

    /* consistency */
    { id: 'streak-3', icon: '📅', name: 'Three days', d: 'Study three days in a row.', group: 'Consistency',
      test: function () { return s().streak() >= 3; } },
    { id: 'streak-7', icon: '🗓', name: 'A full week', d: 'Study seven days in a row.', group: 'Consistency',
      test: function () { return s().streak() >= 7; } },
    { id: 'streak-30', icon: '🧗', name: 'A month of it', d: 'Study thirty days in a row.', group: 'Consistency',
      test: function () { return s().streak() >= 30; } },

    /* mastery */
    { id: 'unit-80', icon: '🎓', name: 'Unit mastered', d: 'Reach 80% mastery in any unit.', group: 'Mastery',
      test: function () { return BS.units.some(function (u) { return mastery(u.n) >= 80; }); } },
    { id: 'all-70', icon: '👑', name: 'Exam ready', d: 'Reach 70% mastery in all six units.', group: 'Mastery',
      test: function () { return BS.units.every(function (u) { return mastery(u.n) >= 70; }); } }
  ];

  function earned() {
    return ACHIEVEMENTS.filter(function (a) {
      try { return a.test(); } catch (e) { return false; }
    }).map(function (a) { return a.id; });
  }

  function byId(id) {
    return ACHIEVEMENTS.filter(function (a) { return a.id === id; })[0];
  }

  /* ---------------- daily goal ---------------- */

  var DAILY_GOAL = 25;   /* study actions — a card graded, a question answered … */

  function today() {
    var d = BS.store.all().days[BS.store.today()] || 0;
    return { done: d, goal: DAILY_GOAL, pct: Math.min(100, Math.round(d / DAILY_GOAL * 100)), met: d >= DAILY_GOAL };
  }

  /* ---------------- change detection for toasts ---------------- */

  var snapshot = null;

  function snap() {
    snapshot = { xp: xp(), ach: earned(), level: level().n };
  }

  /* Returns what changed since the last snap(), for the UI to announce. */
  function settle() {
    if (!snapshot) { snap(); return { xp: 0, unlocked: [], levelUp: null }; }
    var now = { xp: xp(), ach: earned(), level: level().n };
    var before = snapshot;
    snapshot = now;
    var fresh = now.ach.filter(function (id) { return before.ach.indexOf(id) === -1; });
    return {
      xp: now.xp - before.xp,
      unlocked: fresh.map(byId).filter(Boolean),
      levelUp: now.level > before.level ? level() : null
    };
  }

  return {
    LEVELS: LEVELS,
    ACHIEVEMENTS: ACHIEVEMENTS,
    xp: xp,
    level: level,
    mastery: mastery,
    overallMastery: overallMastery,
    earned: earned,
    achievement: byId,
    today: today,
    snap: snap,
    settle: settle
  };
})();
