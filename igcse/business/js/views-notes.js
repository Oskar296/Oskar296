/* views-notes.js — syllabus index, topic pages, glossary */

var V = window.V || {};

V.notes = function () {
  var s = BS.store;
  var outcomes = 0;
  BS.notes.forEach(function (t) {
    var sp = BS.specFor(t.id);
    if (sp && sp.outcomes) outcomes += sp.outcomes.length;
  });
  var h = '<div class="eyebrow">Syllabus</div><h1>Revision notes</h1>' +
    '<p class="lead">All six units of the Cambridge IGCSE Business Studies 0450 syllabus, mapped to its ' +
    outcomes + ' numbered learning outcomes. Every topic opens with exactly what the syllabus requires and ends with ' +
    'how that topic is examined. Rate your confidence at the bottom of each one and it shows up here and on the dashboard.</p>';

  BS.units.forEach(function (u) {
    h += '<h2 id="u' + u.n + '">' + u.n + '. ' + R.esc(u.title) + '</h2>';
    BS.unitTopics(u.n).forEach(function (t) {
      var c = s.conf(t.id);
      h += '<a class="topic-row" href="#/notes/' + t.id + '">' +
        '<span class="dot' + (c ? ' c' + c : '') + '" title="Confidence"></span>' +
        '<span class="n">' + t.id + '</span>' +
        '<span class="t">' + R.esc(t.title) + '</span>' +
        (s.isRead(t.id) ? '<span class="pill g">Read</span>' : '') +
        '</a>';
    });
  });
  return h;
};

V.topic = function (id) {
  var t = BS.topic(id);
  if (!t) return '<h1>Topic not found</h1><p><a href="#/notes">Back to the syllabus</a></p>';

  var s = BS.store;
  var wasRead = s.isRead(t.id);
  s.markRead(t.id);
  s.tick(1);
  if (!wasRead) setTimeout(function () { BS.announce(); }, 60);

  var unit = BS.units.filter(function (u) { return u.n === t.unit; })[0];
  var all = BS.notes;
  var i = all.indexOf(t);
  var prev = all[i - 1], next = all[i + 1];

  var h = '';
  h += '<div class="crumb"><a href="#/notes">Notes</a> › Unit ' + t.unit + ' · ' + R.esc(unit.title) + '</div>';
  h += '<div class="eyebrow">' + t.id + '</div>';
  h += '<h1>' + R.esc(t.title) + '</h1>';

  var spec = BS.specFor(t.id);
  h += '<div class="card spec"><div class="spec-head">What the syllabus requires</div>';
  if (spec && spec.outcomes) {
    spec.outcomes.forEach(function (o) {
      h += '<div class="outcome"><div class="o-n">' + o.n + '</div><div class="o-b">' +
        '<div class="o-t">' + R.inline(o.t) + '</div>' +
        '<ul>' + o.pts.map(function (p) { return '<li>' + R.inline(p) + '</li>'; }).join('') + '</ul>' +
        '</div></div>';
    });
    h += '<p class="small spec-note">Numbered against the published 0450 subject content. ' +
      'Check the syllabus for your own exam series — Cambridge is the authority on the exact wording.</p>';
  } else {
    h += '<ul style="margin-bottom:0">' + t.syllabus.map(function (p) { return '<li>' + R.inline(p) + '</li>'; }).join('') + '</ul>';
  }
  h += '</div>';

  t.sections.forEach(function (sec) {
    h += '<h2>' + R.inline(sec.h) + '</h2>';
    h += R.body(sec.body);
  });

  /* key terms for this topic */
  if (t.terms && t.terms.length) {
    var terms = t.terms.map(function (id2) { return BS.term(id2); }).filter(Boolean);
    if (terms.length) {
      h += '<h2>Key terms in this topic</h2><div class="twrap"><table><tbody>';
      terms.forEach(function (g) {
        var cell = '<div class="g-def">' + R.esc(g.d) + '</div>';
        if (g.keys && g.keys.length) {
          cell += '<div class="g-keys"><span class="k-lab">Must contain</span> ' +
            g.keys.map(function (k) { return '<span class="k-chip">' + R.esc(k) + '</span>'; }).join(' ') + '</div>';
        }
        if (g.note) cell += '<div class="k-note">\u26a0 ' + R.esc(g.note) + '</div>';
        h += '<tr><th style="width:26%">' + R.esc(g.t) + '</th><td>' + cell + '</td></tr>';
      });
      h += '</tbody></table></div>';
      h += '<div class="btnrow"><a class="btn sm" href="#/cards?topic=' + t.id + '">Drill these as flashcards</a>' +
           '<a class="btn sm" href="#/quiz?topic=' + t.id + '">Quiz me on ' + t.id + '</a>';
      var nw = BS.written.filter(function (w) { return w.tp === t.id; }).length;
      if (nw) h += '<a class="btn sm primary" href="#/written?topic=' + t.id + '">Write ' + nw +
        ' exam answer' + (nw === 1 ? '' : 's') + '</a>';
      h += '</div>';
    }
  }

  /* how this topic is examined */
  if (spec && spec.technique) {
    var tq = spec.technique;
    h += '<h2>How this topic is examined</h2>';
    h += '<div class="card"><p>' + R.inline(tq.asked) + '</p>';
    if (tq.stems && tq.stems.length) {
      h += '<h3>Question stems you should expect</h3><div class="stems">';
      tq.stems.forEach(function (s2) {
        h += '<div class="stem-row"><span class="marks">' + s2[1] + '</span>' +
          '<span>' + R.inline(s2[0]) + '</span></div>';
      });
      h += '</div>';
    }
    if (tq.earn && tq.earn.length) {
      h += '<h3>What actually earns the marks</h3><ul class="earn">' +
        tq.earn.map(function (x) { return '<li>' + R.inline(x) + '</li>'; }).join('') + '</ul>';
    }
    h += '</div>';
  }

  if (t.tips && t.tips.length) {
    h += '<h2>Exam tips</h2><ul>' + t.tips.map(function (x) { return '<li>' + R.inline(x) + '</li>'; }).join('') + '</ul>';
  }
  if (t.traps && t.traps.length) {
    h += '<div class="callout warn"><span class="clabel">Marks most often lost here</span><ul style="margin-bottom:0">' +
      t.traps.map(function (x) { return '<li>' + R.inline(x) + '</li>'; }).join('') + '</ul></div>';
  }

  /* confidence */
  var c = s.conf(t.id);
  h += '<hr/><div class="card tight"><label class="f">How confident are you with ' + t.id + '?</label>' +
    '<div class="conf" data-conf="' + t.id + '">' +
    '<button data-c="1" aria-pressed="' + (c === 1) + '">Shaky</button>' +
    '<button data-c="2" aria-pressed="' + (c === 2) + '">Getting there</button>' +
    '<button data-c="3" aria-pressed="' + (c === 3) + '">Confident</button>' +
    '</div></div>';

  h += '<div class="pagenav">';
  h += prev ? '<a href="#/notes/' + prev.id + '"><div class="lbl">← Previous</div><div class="ttl">' + prev.id + ' ' + R.esc(prev.title) + '</div></a>' : '<span></span>';
  h += next ? '<a class="r" href="#/notes/' + next.id + '"><div class="lbl">Next →</div><div class="ttl">' + next.id + ' ' + R.esc(next.title) + '</div></a>' : '<span></span>';
  h += '</div>';

  return h;
};

V.afterTopic = function (root) {
  var box = root.querySelector('[data-conf]');
  if (!box) return;
  var id = box.getAttribute('data-conf');
  box.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-c]');
    if (!b) return;
    var v = parseInt(b.getAttribute('data-c'), 10);
    var cur = BS.store.conf(id);
    BS.store.conf(id, cur === v ? 0 : v);
    Array.prototype.forEach.call(box.querySelectorAll('button'), function (x) {
      x.setAttribute('aria-pressed', String(parseInt(x.getAttribute('data-c'), 10) === BS.store.conf(id)));
    });
  });
};

/* ---------------- glossary ---------------- */

V.glossary = function () {
  var h = '<div class="eyebrow">Reference</div><h1>Glossary</h1>' +
    '<p class="lead">' + BS.glossary.length + ' key terms, written the way an examiner wants to read them: one precise sentence, ' +
    'no padding. Under each is the list of elements a mark scheme credits — include all of them and the definition cannot be marked down.</p>';

  h += '<div class="field"><input id="glosSearch" type="search" placeholder="Search terms and definitions…" autocomplete="off"/></div>';
  h += '<div class="chips" id="glosChips"><button class="chip" data-u="0" aria-pressed="true">All units</button>';
  BS.units.forEach(function (u) {
    h += '<button class="chip" data-u="' + u.n + '" aria-pressed="false">Unit ' + u.n + '</button>';
  });
  h += '</div>';
  h += '<div id="glosList"></div>';
  return h;
};

V.afterGlossary = function (root) {
  var input = root.querySelector('#glosSearch');
  var chips = root.querySelector('#glosChips');
  var list = root.querySelector('#glosList');
  var unit = 0;

  function draw() {
    var q = (input.value || '').toLowerCase().trim();
    var items = BS.glossary.filter(function (g) {
      if (unit && g.u !== unit) return false;
      if (!q) return true;
      return (g.t + ' ' + g.d).toLowerCase().indexOf(q) !== -1;
    });
    if (!items.length) { list.innerHTML = '<div class="empty">No terms match that search.</div>'; return; }

    var byUnit = {};
    items.forEach(function (g) { (byUnit[g.u] = byUnit[g.u] || []).push(g); });

    var h = '';
    BS.units.forEach(function (u) {
      if (!byUnit[u.n]) return;
      h += '<h2>' + u.n + '. ' + R.esc(u.title) + '</h2><div class="twrap"><table><tbody>';
      byUnit[u.n].forEach(function (g) {
        var cell = '<div class="g-def">' + R.esc(g.d) + '</div>';
        if (g.keys && g.keys.length) {
          cell += '<div class="g-keys"><span class="k-lab">Must contain</span> ' +
            g.keys.map(function (k) { return '<span class="k-chip">' + R.esc(k) + '</span>'; }).join(' ') + '</div>';
        }
        if (g.note) cell += '<div class="k-note">\u26a0 ' + R.esc(g.note) + '</div>';
        h += '<tr><th style="width:26%">' + R.esc(g.t) +
          '<div style="font-weight:400"><a class="small" href="#/notes/' + g.tp + '">' + g.tp + '</a></div></th>' +
          '<td>' + cell + '</td></tr>';
      });
      h += '</tbody></table></div>';
    });
    list.innerHTML = h;
  }

  input.addEventListener('input', draw);
  chips.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    unit = parseInt(b.getAttribute('data-u'), 10);
    Array.prototype.forEach.call(chips.querySelectorAll('.chip'), function (x) {
      x.setAttribute('aria-pressed', String(x === b));
    });
    draw();
  });
  draw();
};

window.V = V;
