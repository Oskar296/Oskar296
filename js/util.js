/* Shared namespace and small helpers. */
window.GEO = {
  themes: [],
  skills: [],
  cases: [],
  glossary: [],
  questions: []
};

(function (G) {
  'use strict';

  G.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  /* Notes are authored with a light inline syntax so the content files stay
     readable: **bold**, *italic*, `code`, and [[term]] for a glossary link. */
  G.inline = function (s) {
    return G.esc(s)
      .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, function (_, id, label) {
        return '<a href="#/glossary?t=' + encodeURIComponent(id) + '">' + label + '</a>';
      })
      .replace(/\[\[([^\]]+)\]\]/g, function (_, term) {
        return '<a href="#/glossary?t=' + encodeURIComponent(G.slug(term)) + '">' + term + '</a>';
      })
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/(^|[\s(])\*([^*]+)\*/g, '$1<i>$2</i>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  };

  G.slug = function (s) {
    return String(s).toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  G.qs = function (hash) {
    var i = hash.indexOf('?');
    var out = {};
    if (i < 0) return out;
    hash.slice(i + 1).split('&').forEach(function (pair) {
      if (!pair) return;
      var kv = pair.split('=');
      out[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
    });
    return out;
  };

  G.allUnits = function () {
    var out = [];
    G.themes.forEach(function (t) {
      t.units.forEach(function (u) { out.push(Object.assign({ theme: t }, u)); });
    });
    return out;
  };

  G.unit = function (id) {
    return G.allUnits().filter(function (u) { return u.id === id; })[0] || null;
  };

  G.theme = function (id) {
    return G.themes.filter(function (t) { return t.id === id; })[0] || null;
  };

  G.caseById = function (id) {
    return G.cases.filter(function (c) { return c.id === id; })[0] || null;
  };

  G.termById = function (id) {
    return G.glossary.filter(function (t) { return t.id === id; })[0] || null;
  };

  G.skill = function (id) {
    return G.skills.filter(function (s) { return s.id === id; })[0] || null;
  };

  /* ---- progress, stored locally so it survives a refresh ---- */

  var KEY = 'igcse-geo.progress.v1';
  var blank = { done: {}, quiz: {}, seen: {} };

  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY));
      if (raw && typeof raw === 'object') {
        return Object.assign({}, blank, raw, {
          done: raw.done || {}, quiz: raw.quiz || {}, seen: raw.seen || {}
        });
      }
    } catch (e) { /* private mode, corrupt value: fall through to a fresh object */ }
    return JSON.parse(JSON.stringify(blank));
  }

  G.progress = load();

  G.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(G.progress)); } catch (e) { /* nothing we can do */ }
  };

  G.isDone = function (unitId) { return !!G.progress.done[unitId]; };

  G.toggleDone = function (unitId) {
    if (G.progress.done[unitId]) delete G.progress.done[unitId];
    else G.progress.done[unitId] = Date.now();
    G.save();
    return G.isDone(unitId);
  };

  G.markSeen = function (unitId) {
    G.progress.seen[unitId] = Date.now();
    G.save();
  };

  G.doneCount = function () { return Object.keys(G.progress.done).length; };

  G.resetProgress = function () {
    G.progress = JSON.parse(JSON.stringify(blank));
    G.save();
  };

  /* Questions carry the old unit tag, which is stable as prose is re-filed.
     Scores are stored against the topic that tag now belongs to, so the home
     page can point at weak topics using the same ids as the navigation. */
  G.recordAnswer = function (unitId, correct) {
    if (!unitId) return;
    var key = (G.topicForUnit && G.topicForUnit(unitId)) || unitId;
    var q = G.progress.quiz[key] || { right: 0, wrong: 0 };
    if (correct) q.right++; else q.wrong++;
    G.progress.quiz[key] = q;
    G.save();
  };

  G.weakTopics = function (n) {
    var rows = [];
    Object.keys(G.progress.quiz).forEach(function (id) {
      var q = G.progress.quiz[id];
      var total = q.right + q.wrong;
      if (total < 2) return;
      rows.push({ id: id, pct: q.right / total, total: total });
    });
    rows.sort(function (a, b) { return a.pct - b.pct; });
    return rows.slice(0, n || 3);
  };

  /* The topics a case study can be used in: from its old unit tags, plus any
     topic it names directly. */
  G.topicsForCase = function (c) {
    var out = [];
    (c.units || []).forEach(function (u) {
      var t = G.topicForUnit && G.topicForUnit(u);
      if (t && out.indexOf(t) < 0) out.push(t);
    });
    (c.topics || []).forEach(function (t) {
      if (out.indexOf(t) < 0) out.push(t);
    });
    return out.map(function (id) { return G.topic(id); }).filter(Boolean);
  };

})(window.GEO);
