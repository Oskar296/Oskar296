/* Progress, saved in localStorage. Everything stays on the device. */
(function () {
  'use strict';

  var KEY = 'bio4bi1.v1';
  var blank = {
    v: 1,
    studied: {},     // subId -> true
    cards: {},       // cardKey -> {box, due, seen, right}
    qs: {},          // questionKey -> {seen, right}
    sessions: [],    // {d: 'YYYY-MM-DD', scope, score, total}
    days: [],        // 'YYYY-MM-DD' study days, newest last
    theme: 'auto'
  };
  var state;

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      state = raw ? Object.assign({}, blank, JSON.parse(raw)) : Object.assign({}, blank);
    } catch (e) { state = Object.assign({}, blank); }
    ['studied', 'cards', 'qs'].forEach(function (k) { if (!state[k]) state[k] = {}; });
    ['sessions', 'days'].forEach(function (k) { if (!Array.isArray(state[k])) state[k] = []; });
    return state;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function touchDay() {
    var t = today();
    if (state.days[state.days.length - 1] !== t) { state.days.push(t); if (state.days.length > 400) state.days.shift(); save(); }
  }

  /* ---- streak: consecutive days ending today or yesterday ---- */
  function streak() {
    if (!state.days.length) return 0;
    var set = {}; state.days.forEach(function (d) { set[d] = 1; });
    var n = 0, d = new Date();
    if (!set[today()]) d.setDate(d.getDate() - 1);        // yesterday still counts
    for (;;) {
      var k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      if (!set[k]) break;
      n++; d.setDate(d.getDate() - 1);
    }
    return n;
  }

  /* ---- subtopics ---- */
  function isStudied(id) { return !!state.studied[id]; }
  function setStudied(id, on) {
    if (on) { state.studied[id] = true; touchDay(); } else { delete state.studied[id]; }
    save();
  }
  function topicProgress(topicId) {
    var t = window.SYL.topic(topicId);
    if (!t) return { done: 0, total: 0, pct: 0 };
    var done = t.subs.filter(function (s) { return isStudied(s.id); }).length;
    return { done: done, total: t.subs.length, pct: Math.round(done / t.subs.length * 100) };
  }
  function overallProgress() {
    var all = window.SYL.ALL_SUBS;
    var done = all.filter(function (s) { return isStudied(s.id); }).length;
    return { done: done, total: all.length, pct: Math.round(done / all.length * 100) };
  }

  /* ---- flashcards: Leitner boxes 1..5 ---- */
  var INTERVAL = [0, 0, 1, 3, 7, 21];   // days until due, by box
  function card(key) {
    return state.cards[key] || { box: 1, due: 0, seen: 0, right: 0 };
  }
  function gradeCard(key, good) {
    var c = card(key);
    c.seen++;
    if (good) { c.right++; c.box = Math.min(5, c.box + 1); }
    else { c.box = 1; }
    c.due = Date.now() + INTERVAL[c.box] * 864e5;
    state.cards[key] = c;
    touchDay(); save();
    return c;
  }
  function isDue(key) {
    var c = state.cards[key];
    return !c || c.due <= Date.now();
  }
  function cardStats() {
    var all = window.SYL.allTerms();
    var due = 0, learning = 0, known = 0, unseen = 0;
    all.forEach(function (t) {
      var k = t.sub + '|' + t.t, c = state.cards[k];
      if (!c) { unseen++; due++; return; }
      if (c.box >= 4) known++; else learning++;
      if (c.due <= Date.now()) due++;
    });
    return { total: all.length, due: due, learning: learning, known: known, unseen: unseen };
  }

  /* ---- questions ---- */
  function gradeQ(key, right) {
    var q = state.qs[key] || { seen: 0, right: 0 };
    q.seen++; if (right) q.right++;
    state.qs[key] = q; touchDay(); save();
  }
  function qStat(key) { return state.qs[key] || { seen: 0, right: 0 }; }
  function logSession(scope, score, total) {
    state.sessions.push({ d: today(), scope: scope, score: score, total: total, t: Date.now() });
    if (state.sessions.length > 60) state.sessions.shift();
    touchDay(); save();
  }
  /* accuracy per topic, from answered questions only */
  function topicAccuracy() {
    var acc = {};
    window.SYL.ALL_SUBS.forEach(function (s) {
      s.qs.forEach(function (q, i) {
        var st = state.qs[s.id + ':' + i];
        if (!st || !st.seen) return;
        var a = acc[s.topicId] || (acc[s.topicId] = { seen: 0, right: 0 });
        a.seen += st.seen; a.right += st.right;
      });
    });
    return acc;
  }
  function weakSubs(limit) {
    var rows = [];
    window.SYL.ALL_SUBS.forEach(function (s) {
      var seen = 0, right = 0;
      s.qs.forEach(function (q, i) {
        var st = state.qs[s.id + ':' + i];
        if (st) { seen += st.seen; right += st.right; }
      });
      if (seen >= 2) rows.push({ sub: s, seen: seen, right: right, pct: Math.round(right / seen * 100) });
    });
    rows.sort(function (a, b) { return a.pct - b.pct; });
    return rows.slice(0, limit || 5);
  }

  /* ---- theme ---- */
  function theme() { return state.theme || 'auto'; }
  function setTheme(t) {
    state.theme = t; save();
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  }
  function cycleTheme() {
    var order = ['auto', 'light', 'dark'];
    setTheme(order[(order.indexOf(theme()) + 1) % 3]);
    return theme();
  }

  function reset(what) {
    if (what === 'all') { state = Object.assign({}, blank, { theme: state.theme }); }
    else if (what === 'cards') state.cards = {};
    else if (what === 'qs') { state.qs = {}; state.sessions = []; }
    else if (what === 'studied') state.studied = {};
    save();
  }
  function exportJSON() { return JSON.stringify(state, null, 2); }
  function importJSON(txt) {
    var o = JSON.parse(txt);
    if (!o || typeof o !== 'object') throw new Error('not valid progress data');
    state = Object.assign({}, blank, o); save();
  }

  load();

  window.STORE = {
    load: load, save: save, state: function () { return state; },
    isStudied: isStudied, setStudied: setStudied,
    topicProgress: topicProgress, overallProgress: overallProgress,
    card: card, gradeCard: gradeCard, isDue: isDue, cardStats: cardStats,
    gradeQ: gradeQ, qStat: qStat, logSession: logSession,
    topicAccuracy: topicAccuracy, weakSubs: weakSubs,
    streak: streak, today: today,
    theme: theme, setTheme: setTheme, cycleTheme: cycleTheme,
    reset: reset, exportJSON: exportJSON, importJSON: importJSON
  };
})();
