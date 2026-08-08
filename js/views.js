/* Block renderer and page views. Every view returns an HTML string. */
(function (G) {
  'use strict';

  var esc = G.esc, inline = G.inline;
  var V = G.views = {};

  /* ---------------- block renderer ---------------- */

  function blocks(list) {
    return (list || []).map(function (b) {
      if (b.p) return '<p>' + inline(b.p) + '</p>';
      if (b.h3) return '<h3>' + inline(b.h3) + '</h3>';
      if (b.ul) return '<ul>' + b.ul.map(function (i) { return '<li>' + inline(i) + '</li>'; }).join('') + '</ul>';
      if (b.ol) return '<ol>' + b.ol.map(function (i) { return '<li>' + inline(i) + '</li>'; }).join('') + '</ol>';
      if (b.tip) return '<div class="tip"><span class="eyebrow">Exam tip</span><p>' + inline(b.tip) + '</p></div>';
      if (b.defs) {
        return '<dl>' + b.defs.map(function (d) {
          return '<div class="defn"><dt>' + inline(d[0]) + '</dt><dd>' + inline(d[1]) + '</dd></div>';
        }).join('') + '</dl>';
      }
      if (b.stats) {
        return '<div class="stat-row">' + b.stats.map(function (s) {
          return '<div class="stat"><span class="s-val">' + esc(s[0]) + '</span>' +
                 '<span class="s-lab">' + inline(s[1]) + '</span></div>';
        }).join('') + '</div>';
      }
      if (b.table) {
        var t = b.table;
        var head = t.head && t.head.length
          ? '<thead><tr>' + t.head.map(function (h) { return '<th>' + inline(h) + '</th>'; }).join('') + '</tr></thead>'
          : '';
        var body = '<tbody>' + t.rows.map(function (row) {
          return '<tr>' + row.map(function (cell) { return '<td>' + inline(cell) + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody>';
        return '<div class="table-scroll"><table>' + head + body + '</table></div>';
      }
      return '';
    }).join('');
  }

  V.blocks = blocks;

  function sections(list) {
    return '<div class="note">' + (list || []).map(function (s) {
      return '<section><h2>' + inline(s.h) + '</h2>' + blocks(s.blocks) + '</section>';
    }).join('') + '</div>';
  }

  function crumbs(parts) {
    return '<nav class="crumbs">' + parts.map(function (p, i) {
      var sep = i ? '<span aria-hidden="true">/</span>' : '';
      return sep + (p.href ? '<a href="' + p.href + '">' + esc(p.label) + '</a>' : '<span>' + esc(p.label) + '</span>');
    }).join('') + '</nav>';
  }

  /* ---------------- home ---------------- */

  V.home = function () {
    var units = G.allUnits();
    var done = G.doneCount();
    var pct = Math.round(done / units.length * 100);

    var themeTiles = G.themes.map(function (t) {
      var td = t.units.filter(function (u) { return G.isDone(u.id); }).length;
      return '<a class="tile" href="#/theme/' + t.id + '">' +
        '<span class="eyebrow">Theme ' + esc(t.id) + '</span>' +
        '<span class="t-title">' + esc(t.title) + '</span>' +
        '<span class="t-sub">' + esc(t.blurb) + '</span>' +
        '<span class="t-sub"><b>' + td + ' of ' + t.units.length + '</b> units marked revised</span>' +
        '</a>';
    }).join('');

    var weak = G.weakUnits(3).map(function (w) {
      var u = G.unit(w.id) || G.skill(w.id);
      var label = u ? (u.id + ' ' + u.title) : w.id;
      var href = G.unit(w.id) ? '#/unit/' + w.id : '#/skills/' + w.id;
      return '<li><a href="' + href + '">' + esc(label) + '</a> — ' +
             Math.round(w.pct * 100) + '% correct over ' + w.total + ' questions</li>';
    }).join('');

    return '<div class="wrap-wide">' +

      '<div class="hero"><canvas id="heroCanvas" aria-hidden="true"></canvas><div class="hero-in">' +
        '<span class="eyebrow">Cambridge IGCSE · 0460</span>' +
        '<h1>Geography revision, organised the way the syllabus is.</h1>' +
        '<p class="lede">Notes for all ' + units.length + ' units, ' + G.cases.length + ' case studies with the figures examiners want, ' +
        G.glossary.length + ' definitions and ' + G.questions.length + ' practice questions.</p>' +
        '<div class="btn-row" style="margin-top:.5rem">' +
          '<a class="btn btn-primary" href="#/quiz">Test yourself</a>' +
          '<a class="btn" href="#/unit/1.1">Start at 1.1</a>' +
        '</div>' +
      '</div></div>' +

      '<div class="card">' +
        '<h3>Your progress</h3>' +
        '<p class="t-sub" style="color:var(--dim)">' + done + ' of ' + units.length + ' units marked as revised (' + pct + '%)</p>' +
        '<div class="progress-bar" style="margin-top:.7rem"><i style="width:' + pct + '%"></i></div>' +
        (weak ? '<h3 style="margin-top:1.2rem">Worth another look</h3><ul>' + weak + '</ul>' : '') +
      '</div>' +

      '<div class="grid grid-2">' + themeTiles + '</div>' +

      '<div class="grid grid-3">' +
        '<a class="tile" href="#/cases"><span class="t-title">Case studies</span>' +
          '<span class="t-sub">' + G.cases.length + ' worked examples with statistics</span></a>' +
        '<a class="tile" href="#/glossary"><span class="t-title">Glossary</span>' +
          '<span class="t-sub">' + G.glossary.length + ' definitions, searchable</span></a>' +
        '<a class="tile" href="#/skills"><span class="t-title">Exam skills</span>' +
          '<span class="t-sub">Command words, maps, graphs, fieldwork</span></a>' +
      '</div>' +

    '</div>';
  };

  /* ---------------- theme ---------------- */

  V.theme = function (id) {
    var t = G.theme(id);
    if (!t) return V.notFound();

    var list = t.units.map(function (u) {
      return '<a class="tile" href="#/unit/' + u.id + '">' +
        '<span class="eyebrow">' + esc(u.id) + (G.isDone(u.id) ? ' · revised' : '') + '</span>' +
        '<span class="t-title">' + esc(u.title) + '</span>' +
        '<span class="t-sub">' + u.sections.length + ' sections' +
          (u.cases && u.cases.length ? ' · ' + u.cases.length + ' case ' + (u.cases.length === 1 ? 'study' : 'studies') : '') +
        '</span></a>';
    }).join('');

    return '<div class="wrap-wide">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: 'Theme ' + t.id }]) +
      '<div class="page-head"><span class="eyebrow">Theme ' + esc(t.id) + '</span>' +
        '<h1>' + esc(t.title) + '</h1><p class="lede">' + esc(t.blurb) + '</p></div>' +
      '<div class="grid grid-2">' + list + '</div>' +
    '</div>';
  };

  /* ---------------- unit ---------------- */

  V.unit = function (id) {
    var u = G.unit(id);
    if (!u) return V.notFound();

    var objectives = u.objectives && u.objectives.length
      ? '<div class="objectives"><span class="eyebrow">What the syllabus asks</span><ul>' +
        u.objectives.map(function (o) { return '<li>' + inline(o) + '</li>'; }).join('') + '</ul></div>'
      : '';

    var linkedCases = (u.cases || []).map(function (cid) {
      var c = G.caseById(cid);
      if (!c) return '';
      return '<a class="tile" href="#/case/' + c.id + '">' +
        '<span class="eyebrow">' + esc(c.type) + '</span>' +
        '<span class="t-title">' + esc(c.name) + '</span>' +
        '<span class="t-sub">' + esc(c.place) + '</span></a>';
    }).join('');

    var terms = G.glossary.filter(function (t) { return t.unit === id; });
    var termList = terms.length
      ? '<div class="card"><h3>Key terms in this unit</h3><dl>' + terms.map(function (t) {
          return '<div class="defn"><dt>' + esc(t.term) + '</dt><dd>' + esc(t.def) + '</dd></div>';
        }).join('') + '</dl></div>'
      : '';

    var nQ = G.questions.filter(function (q) { return q.u === id; }).length;

    var all = G.allUnits();
    var i = all.map(function (x) { return x.id; }).indexOf(id);
    var prev = i > 0 ? all[i - 1] : null;
    var next = i < all.length - 1 ? all[i + 1] : null;

    return '<div class="wrap">' +
      crumbs([
        { label: 'Home', href: '#/' },
        { label: 'Theme ' + u.theme.id, href: '#/theme/' + u.theme.id },
        { label: u.id }
      ]) +
      '<div class="page-head"><span class="eyebrow">Unit ' + esc(u.id) + '</span><h1>' + esc(u.title) + '</h1></div>' +
      objectives +
      sections(u.sections) +
      (linkedCases ? '<h2 style="margin-top:.5rem">Case studies for this unit</h2><div class="grid grid-2">' + linkedCases + '</div>' : '') +
      termList +
      '<div class="btn-row">' +
        '<button class="btn' + (G.isDone(id) ? ' btn-primary' : '') + '" data-done="' + esc(id) + '">' +
          (G.isDone(id) ? 'Revised ✓' : 'Mark as revised') + '</button>' +
        (nQ ? '<a class="btn" href="#/quiz?unit=' + encodeURIComponent(id) + '">Test this unit (' + nQ + ')</a>' : '') +
      '</div>' +
      '<hr class="hr"/>' +
      '<div class="btn-row">' +
        (prev ? '<a class="btn" href="#/unit/' + prev.id + '">← ' + esc(prev.id + ' ' + prev.title) + '</a>' : '') +
        (next ? '<a class="btn" href="#/unit/' + next.id + '">' + esc(next.id + ' ' + next.title) + ' →</a>' : '') +
      '</div>' +
    '</div>';
  };

  /* ---------------- case studies ---------------- */

  V.cases = function (query) {
    var filter = query.type || 'all';
    var types = ['all'].concat(G.cases.map(function (c) { return c.type; })
      .filter(function (t, i, arr) { return arr.indexOf(t) === i; }));

    var chips = types.map(function (t) {
      return '<button class="chip' + (t === filter ? ' on' : '') + '" data-casefilter="' + esc(t) + '">' +
        esc(t === 'all' ? 'All ' + G.cases.length : t) + '</button>';
    }).join('');

    var shown = G.cases.filter(function (c) { return filter === 'all' || c.type === filter; });

    var grid = shown.map(function (c) {
      return '<a class="tile" href="#/case/' + c.id + '">' +
        '<span class="eyebrow">' + esc(c.type) + '</span>' +
        '<span class="t-title">' + esc(c.name) + '</span>' +
        '<span class="t-sub">' + esc(c.place) + '</span>' +
        '<span class="t-sub" style="margin-top:.3rem">' + esc(c.summary) + '</span>' +
        '<span class="chips" style="margin-top:.55rem">' +
          c.units.map(function (u) { return '<span class="chip static">' + esc(u) + '</span>'; }).join('') +
        '</span></a>';
    }).join('');

    return '<div class="wrap-wide">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: 'Case studies' }]) +
      '<div class="page-head"><span class="eyebrow">Named examples</span><h1>Case studies</h1>' +
        '<p class="lede">Answers that name a place and quote a figure sit a whole level above answers that do not.</p></div>' +
      '<div class="chips">' + chips + '</div>' +
      '<div class="case-grid">' + grid + '</div>' +
    '</div>';
  };

  V.caseStudy = function (id) {
    var c = G.caseById(id);
    if (!c) return V.notFound();

    var statRow = c.stats && c.stats.length
      ? '<div class="stat-row">' + c.stats.map(function (s) {
          return '<div class="stat"><span class="s-val">' + esc(s[0]) + '</span>' +
                 '<span class="s-lab">' + inline(s[1]) + '</span></div>';
        }).join('') + '</div>'
      : '';

    var links = c.units.map(function (u) {
      var unit = G.unit(u);
      return unit ? '<a class="btn" href="#/unit/' + u + '">' + esc(u + ' ' + unit.title) + '</a>' : '';
    }).join('');

    return '<div class="wrap">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: 'Case studies', href: '#/cases' }, { label: c.name }]) +
      '<div class="page-head"><span class="eyebrow">' + esc(c.type) + '</span>' +
        '<h1>' + esc(c.name) + '</h1>' +
        '<p class="lede">' + esc(c.place) + '. ' + esc(c.summary) + '</p></div>' +
      statRow +
      sections(c.sections) +
      (links ? '<hr class="hr"/><h3>Use this in</h3><div class="btn-row">' + links + '</div>' : '') +
    '</div>';
  };

  /* ---------------- glossary ---------------- */

  V.glossary = function () {
    var groups = {};
    G.glossary.forEach(function (t) {
      var key = t.unit;
      (groups[key] = groups[key] || []).push(t);
    });

    var order = Object.keys(groups).sort();
    var body = order.map(function (key) {
      var unit = G.unit(key);
      var skill = G.skill(key);
      var label = unit ? key + ' ' + unit.title : (skill ? skill.title : key);
      var href = unit ? '#/unit/' + key : (skill ? '#/skills/' + key : null);
      return '<section class="gl-group" data-group="' + esc(key) + '">' +
        '<h2>' + (href ? '<a href="' + href + '" style="text-decoration:none;color:inherit">' + esc(label) + '</a>' : esc(label)) + '</h2>' +
        '<dl>' + groups[key].map(function (t) {
          return '<div class="defn" id="term-' + esc(t.id) + '" data-term="' + esc(t.term.toLowerCase()) + '">' +
            '<dt>' + esc(t.term) + '</dt><dd>' + esc(t.def) + '</dd></div>';
        }).join('') + '</dl></section>';
    }).join('');

    return '<div class="wrap">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: 'Glossary' }]) +
      '<div class="page-head"><span class="eyebrow">Definitions</span><h1>Glossary</h1>' +
        '<p class="lede">' + G.glossary.length + ' terms. Definitions carry marks on their own, so learn the wording, including the units.</p></div>' +
      '<input type="search" id="glFilter" class="gl-filter" placeholder="Filter terms" aria-label="Filter glossary terms" ' +
        'style="width:100%;height:42px;padding:0 .9rem;border:1px solid var(--line);border-radius:10px;' +
        'background:var(--surface);color:var(--ink);font:inherit"/>' +
      '<div id="glList">' + body + '</div>' +
      '<p class="empty-state" id="glEmpty" hidden>No terms match that.</p>' +
    '</div>';
  };

  /* ---------------- skills ---------------- */

  V.skills = function () {
    var tiles = G.skills.map(function (s) {
      return '<a class="tile" href="#/skills/' + s.id + '">' +
        '<span class="t-title">' + esc(s.title) + '</span>' +
        '<span class="t-sub">' + esc(s.blurb) + '</span></a>';
    }).join('');

    return '<div class="wrap-wide">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: 'Exam skills' }]) +
      '<div class="page-head"><span class="eyebrow">Papers 2 and 4</span><h1>Exam skills</h1>' +
        '<p class="lede">Most lost marks are technique, not knowledge: answering a different command word, or ignoring the resource.</p></div>' +
      '<div class="grid grid-2">' + tiles + '</div>' +
    '</div>';
  };

  V.skill = function (id) {
    var s = G.skill(id);
    if (!s) return V.notFound();
    var nQ = G.questions.filter(function (q) { return q.u === id; }).length;

    return '<div class="wrap">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: 'Exam skills', href: '#/skills' }, { label: s.title }]) +
      '<div class="page-head"><span class="eyebrow">Exam skills</span><h1>' + esc(s.title) + '</h1>' +
        '<p class="lede">' + esc(s.blurb) + '</p></div>' +
      sections(s.sections) +
      (nQ ? '<div class="btn-row"><a class="btn" href="#/quiz?unit=' + encodeURIComponent(id) + '">Test this (' + nQ + ')</a></div>' : '') +
    '</div>';
  };

  V.notFound = function () {
    return '<div class="wrap"><div class="page-head"><h1>Page not found</h1>' +
      '<p class="lede">That link does not match anything on the site.</p></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/">Back to the start</a></div></div>';
  };

})(window.GEO);
