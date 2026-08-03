/* store.js — namespace, localStorage progress, spaced-repetition scheduling */

var BS = {
  units: [
    { n: 1, title: 'Understanding business activity' },
    { n: 2, title: 'People in business' },
    { n: 3, title: 'Marketing' },
    { n: 4, title: 'Operations management' },
    { n: 5, title: 'Financial information and decisions' },
    { n: 6, title: 'External influences on business activity' }
  ],
  notes: [],   // filled by js/notes/u*.js
  glossary: [], // filled by js/glossary.js
  quiz: [],    // filled by js/quizbank.js
  exam: {}     // filled by js/exam.js
};

BS.addTopic = function (t) { BS.notes.push(t); };
BS.topic = function (id) { return BS.notes.filter(function (t) { return t.id === id; })[0]; };
BS.unitTopics = function (n) { return BS.notes.filter(function (t) { return t.unit === n; }); };

/* ------------------------------------------------------------------ */
/* Persistence                                                         */
/* ------------------------------------------------------------------ */

BS.store = (function () {
  var KEY = 'bs0450.v1';
  var blank = {
    conf: {},        // topicId -> 1|2|3
    read: {},        // topicId -> timestamp
    cards: {},       // termId  -> { box:1..5, due:ts, seen:n, right:n }
    quiz: {},        // questionId -> { tries:n, right:n, lastOk:bool }
    written: {},     // writtenId  -> { tries:n, best:n, last:n, outOf:n, text:'' }
    cases: {},       // caseId.qIndex -> { best:n, outOf:n, text:'' }
    sessions: [],    // { t:ts, kind:'quiz'|'cards', score:n, total:n }
    days: {},        // 'YYYY-MM-DD' -> count of studied items
    theme: null
  };
  var data;

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      data = raw ? JSON.parse(raw) : null;
    } catch (e) { data = null; }
    if (!data || typeof data !== 'object') data = JSON.parse(JSON.stringify(blank));
    for (var k in blank) if (!(k in data)) data[k] = JSON.parse(JSON.stringify(blank[k]));
    return data;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* private mode */ }
  }

  load();

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function tick(n) {
    var d = today();
    data.days[d] = (data.days[d] || 0) + (n || 1);
    save();
  }

  return {
    all: function () { return data; },
    save: save,
    today: today,
    tick: tick,

    conf: function (id, v) {
      if (v === undefined) return data.conf[id] || 0;
      if (v === 0) delete data.conf[id]; else data.conf[id] = v;
      save();
      return v;
    },
    markRead: function (id) {
      if (!data.read[id]) { data.read[id] = Date.now(); save(); }
    },
    isRead: function (id) { return !!data.read[id]; },

    card: function (id) {
      return data.cards[id] || { box: 0, due: 0, seen: 0, right: 0 };
    },
    gradeCard: function (id, ok) {
      var c = data.cards[id] || { box: 0, due: 0, seen: 0, right: 0 };
      c.seen++;
      if (ok) { c.right++; c.box = Math.min(5, (c.box || 0) + 1); }
      else { c.box = 1; }
      // Leitner intervals in days for boxes 1..5
      var days = [0, 1, 2, 4, 8, 16][c.box] || 1;
      c.due = Date.now() + days * 864e5;
      data.cards[id] = c;
      save();
      return c;
    },
    dueCards: function (ids) {
      var now = Date.now();
      return ids.filter(function (id) {
        var c = data.cards[id];
        return !c || c.due <= now;
      });
    },

    gradeQuestion: function (id, ok) {
      var q = data.quiz[id] || { tries: 0, right: 0, lastOk: false };
      q.tries++; if (ok) q.right++;
      q.lastOk = !!ok;
      data.quiz[id] = q;
      save();
    },
    question: function (id) { return data.quiz[id] || { tries: 0, right: 0, lastOk: false }; },

    written: function (id) { return data.written[id] || { tries: 0, best: 0, last: 0, outOf: 0, text: '' }; },
    saveWritten: function (id, score, outOf, text) {
      var w = data.written[id] || { tries: 0, best: 0, last: 0, outOf: 0, text: '' };
      w.tries++;
      w.last = score;
      w.best = Math.max(w.best, score);
      w.outOf = outOf;
      w.text = (text || '').slice(0, 4000);
      data.written[id] = w;
      save();
      return w;
    },
    caseAns: function (key) { return data.cases[key] || { best: 0, outOf: 0, text: '' }; },
    saveCase: function (key, score, outOf, text) {
      var c = data.cases[key] || { best: 0, outOf: 0, text: '' };
      c.best = Math.max(c.best, score);
      c.outOf = outOf;
      c.text = (text || '').slice(0, 8000);
      data.cases[key] = c;
      save();
      return c;
    },

    logSession: function (kind, score, total) {
      data.sessions.push({ t: Date.now(), kind: kind, score: score, total: total });
      if (data.sessions.length > 200) data.sessions = data.sessions.slice(-200);
      save();
    },

    streak: function () {
      var n = 0, d = new Date();
      for (;;) {
        var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        if (data.days[key]) { n++; d.setDate(d.getDate() - 1); }
        else if (n === 0) { // allow today to be empty and count back from yesterday
          d.setDate(d.getDate() - 1);
          var k2 = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
          if (!data.days[k2]) return 0;
        } else return n;
        if (n > 400) return n;
      }
    },

    theme: function (v) {
      if (v === undefined) return data.theme;
      data.theme = v; save(); return v;
    },

    reset: function () {
      data = JSON.parse(JSON.stringify(blank));
      save();
    }
  };
})();
