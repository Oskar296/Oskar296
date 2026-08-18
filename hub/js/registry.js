/* The six study apps, and how to read the progress each one saves.

   Every app keeps its state in localStorage under its own key. Because the hub
   is served from the same origin as the apps, it can read those keys directly:
   nothing is copied, nothing is synced, and the hub never writes to an app's
   key except during a restore the user asks for.

   Each adapter turns one app's private state shape into the same small summary:

     answered  questions attempted            (number, or null if not tracked)
     correct   of those, how many were right  (number, or null)
     due       scheduled reviews ready now    (number, or null if no scheduler)
     streak    consecutive days studied       (number, or null if not tracked)
     last      last time the app was used     (ms timestamp, or null)
     notes     a couple of app-specific lines for the card

   Adapters must never throw: a corrupt or half-written value should read as a
   blank subject, not a broken page.
*/

var REGISTRY = (function () {
  'use strict';

  var DAY = 86400000;

  /* ---------- small helpers shared by the adapters ---------- */

  function num(v) { return typeof v === 'number' && isFinite(v) ? v : 0; }

  function obj(v) { return v && typeof v === 'object' ? v : {}; }

  /* Sum one field over a map of records. */
  function sum(map, field) {
    var m = obj(map), t = 0;
    for (var k in m) if (Object.prototype.hasOwnProperty.call(m, k)) t += num(obj(m[k])[field]);
    return t;
  }

  function count(map) { return Object.keys(obj(map)).length; }

  /* Cards whose next review is in the past. `unit` is 'ms' or 'day'. */
  function dueCards(map, unit) {
    var m = obj(map), now = unit === 'day' ? Math.floor(Date.now() / DAY) : Date.now(), n = 0;
    for (var k in m) {
      if (!Object.prototype.hasOwnProperty.call(m, k)) continue;
      var c = obj(m[k]);
      if (num(c.box) > 0 && num(c.due) <= now) n++;
    }
    return n;
  }

  function dayKey(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') +
      '-' + String(d.getDate()).padStart(2, '0');
  }

  /* Consecutive days ending today or yesterday, from a set of 'YYYY-MM-DD'. */
  function streakFrom(days) {
    var set = {}, any = false;
    days.forEach(function (d) { if (typeof d === 'string') { set[d] = 1; any = true; } });
    if (!any) return 0;
    var d = new Date(), n = 0;
    if (!set[dayKey(d)]) d.setDate(d.getDate() - 1);   /* yesterday still counts */
    while (set[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  /* 'YYYY-MM-DD' -> ms at local midnight. Returns null on anything else. */
  function fromDayKey(s) {
    if (typeof s !== 'string') return null;
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (!m) return null;
    var t = new Date(+m[1], +m[2] - 1, +m[3]).getTime();
    return isFinite(t) ? t : null;
  }

  function maxTs(map) {
    var m = obj(map), best = 0;
    for (var k in m) {
      if (!Object.prototype.hasOwnProperty.call(m, k)) continue;
      var v = m[k];
      if (typeof v === 'number' && v > best) best = v;
    }
    return best || null;
  }

  function maxDayKey(map) {
    var best = null;
    Object.keys(obj(map)).forEach(function (k) {
      var t = fromDayKey(k);
      if (t && (!best || t > best)) best = t;
    });
    return best;
  }

  /* ---------- the apps ---------- */

  var APPS = [
    {
      id: 'biology',
      subject: 'Biology',
      name: 'Bio 4BI1',
      board: 'Pearson Edexcel International GCSE',
      code: '4BI1',
      path: 'biology/',
      hue: 158,
      glyph: '🧬',
      blurb: 'The whole specification as notes you tick off, flashcards on a Leitner schedule, and quizzes. Installs for offline use.',
      chips: ['Syllabus checklist', 'Flashcards', 'Quiz', 'Mock exam', 'Core practicals', 'Offline'],
      key: 'bio4bi1.v1',
      read: function (d) {
        var days = Array.isArray(d.days) ? d.days : [];
        var last = days.length ? fromDayKey(days[days.length - 1]) : null;
        return {
          answered: sum(d.qs, 'seen'),
          correct: sum(d.qs, 'right'),
          due: dueCards(d.cards, 'ms'),
          streak: streakFrom(days),
          last: last,
          notes: [
            { label: 'subtopics ticked', value: count(d.studied) },
            { label: 'cards in rotation', value: count(d.cards) }
          ]
        };
      }
    },
    {
      id: 'chemistry',
      subject: 'Chemistry',
      name: 'Chem Lab',
      board: 'Cambridge IGCSE',
      code: '0620',
      path: 'chemistry/',
      hue: 176,
      glyph: '⚗️',
      blurb: 'The syllabus turned into a game: XP and levels, daily quests, topic bosses, and a spaced-repetition queue that decides what you see next.',
      chips: ['XP and levels', 'Daily quests', 'Topic bosses', 'Spaced repetition', 'Data sheet', 'Exam estimate'],
      key: 'igcse-chem-lab-v1',
      read: function (d) {
        var stats = obj(d.stats);
        var streak = obj(d.streak);
        var lastDay = num(streak.last);
        var lvl = 0;
        if (num(d.xp) > 0) lvl = Math.floor((1 + Math.sqrt(1 + 0.32 * num(d.xp))) / 2);
        return {
          answered: num(stats.answered),
          correct: num(stats.correct),
          due: dueCards(d.srs, 'day'),
          streak: num(streak.count),
          last: lastDay > 0 ? lastDay * DAY : null,
          notes: [
            { label: 'XP', value: num(d.xp) },
            { label: lvl ? 'level' : 'levels earned', value: lvl }
          ]
        };
      }
    },
    {
      id: 'physics',
      subject: 'Physics',
      name: 'Physics 4PH1',
      board: 'Pearson Edexcel International GCSE',
      code: '4PH1',
      path: 'physics/',
      hue: 262,
      glyph: '⚛',
      blurb: 'Specification checklist, every equation, the core practicals and definitions, plus quizzes, exam questions and rearranging drills.',
      chips: ['Equations', 'Core practicals', 'Definitions', 'Flashcards', 'Exam questions', 'Drills'],
      key: 'igcse-phys-4ph1-v1',
      read: function (d) {
        /* stats[section] = { qa, qc: quiz, da, dc: drills, em, eo: exam marks } */
        var stats = obj(d.stats);
        var a = sum(stats, 'qa') + sum(stats, 'da');
        var c = sum(stats, 'qc') + sum(stats, 'dc');
        var em = sum(stats, 'em'), eo = sum(stats, 'eo');
        return {
          answered: a,
          correct: c,
          due: null,
          streak: null,
          last: null,
          notes: [
            { label: 'sections rated', value: count(d.progress) },
            { label: 'exam marks', value: eo ? em + '/' + eo : 0 }
          ]
        };
      }
    },
    {
      id: 'geography',
      subject: 'Geography',
      name: 'Geography 0460',
      board: 'Cambridge IGCSE',
      code: '0460',
      path: 'geography/',
      hue: 22,
      glyph: '🗺',
      blurb: 'Notes for all three themes with the case studies written out, plus the map and graph skills, a glossary, and a score estimator.',
      chips: ['Theme notes', 'Case studies', 'Exam skills', 'Contours', 'Glossary', 'Score estimate'],
      key: 'igcse-geo.progress.v1',
      read: function (d) {
        var quiz = obj(d.quiz);
        var right = sum(quiz, 'right'), wrong = sum(quiz, 'wrong');
        var last = Math.max(maxTs(d.done) || 0, maxTs(d.seen) || 0);
        return {
          answered: right + wrong,
          correct: right,
          due: null,
          streak: null,
          last: last || null,
          notes: [
            { label: 'units done', value: count(d.done) },
            { label: 'units opened', value: count(d.seen) }
          ]
        };
      }
    },
    {
      id: 'compsci',
      subject: 'Computer Science',
      name: 'BITWISE',
      board: 'Cambridge IGCSE',
      code: '0478 / 0984',
      path: 'igcse-cs/',
      hue: 44,
      glyph: '</>',
      blurb: 'Both papers as notes, flashcards and quizzes, with labs you actually run: pseudocode, SQL, logic gates and number bases.',
      chips: ['Paper 1 and 2', 'Flashcards', 'Mixed quiz', 'Labs', 'Revision sheets', 'Exam guide'],
      key: 'bitwise.igcse.v1',
      read: function (d) {
        var streak = obj(d.streak);
        return {
          answered: sum(d.quiz, 'asked'),
          correct: sum(d.quiz, 'right'),
          due: dueCards(d.cards, 'ms'),
          streak: num(streak.count),
          last: fromDayKey(streak.last),
          notes: [
            { label: 'XP', value: num(d.xp) },
            { label: 'subtopics read', value: count(d.read) }
          ]
        };
      }
    },
    {
      id: 'business',
      subject: 'Business Studies',
      name: 'Business 0450',
      board: 'Cambridge IGCSE',
      code: '0450',
      path: 'igcse/business/',
      hue: 216,
      glyph: '📈',
      blurb: 'Notes for all six units with written-answer practice marked against the mark scheme, case studies, finance calculators and Exam Rush.',
      chips: ['Unit notes', 'Written practice', 'Case studies', 'Calculators', 'Exam Rush', 'Achievements'],
      key: 'bs0450.v1',
      read: function (d) {
        var rush = obj(d.rush);
        return {
          answered: sum(d.quiz, 'tries'),
          correct: sum(d.quiz, 'right'),
          due: dueCards(d.cards, 'ms'),
          streak: streakFrom(Object.keys(obj(d.days))),
          last: maxDayKey(d.days),
          notes: [
            { label: 'written practice', value: count(d.written) },
            { label: 'Exam Rush best', value: num(rush.best) }
          ]
        };
      }
    }
  ];

  /* ---------- reading ---------- */

  var BLANK = {
    answered: 0, correct: 0, accuracy: null, due: null, streak: null,
    last: null, notes: [], blocked: false, started: false
  };

  function raw(app) {
    try {
      var s = localStorage.getItem(app.key);
      if (!s) return null;
      var v = JSON.parse(s);
      return v && typeof v === 'object' ? v : null;
    } catch (e) {
      return undefined;              /* storage blocked, or the value is corrupt */
    }
  }

  /* A summary for one app, safe against any state the app may have saved. */
  function stats(app) {
    var data = raw(app);
    if (data === undefined) return Object.assign({}, BLANK, { blocked: true });
    if (data === null) return Object.assign({}, BLANK);
    var s;
    try { s = app.read(data) || {}; } catch (e) { s = {}; }
    var out = Object.assign({}, BLANK, s);
    out.started = (out.answered > 0) || (out.last !== null) ||
      (out.notes || []).some(function (n) { return n.value && n.value !== '0'; });
    out.accuracy = out.answered > 0 ? out.correct / out.answered : null;
    return out;
  }

  function all() {
    return APPS.map(function (app) {
      return { app: app, stats: stats(app) };
    });
  }

  return { apps: APPS, stats: stats, all: all, helpers: { dayKey: dayKey, streakFrom: streakFrom } };
})();
