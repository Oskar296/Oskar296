/* main.js — router, navigation, theme, search */

(function () {
  var main = document.getElementById('main');
  var sidebar = document.getElementById('sidebar');
  var unitNav = document.getElementById('unitNav');

  /* ---------------- theme ---------------- */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    document.querySelector('meta[name=theme-color]').setAttribute('content', t === 'dark' ? '#0e1220' : '#f6f7fb');
  }
  var saved = BS.store.theme();
  applyTheme(saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  document.getElementById('themeBtn').addEventListener('click', function () {
    var t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    BS.store.theme(t); applyTheme(t);
  });

  /* ---------------- sidebar ---------------- */
  (function buildNav() {
    var h = '';
    BS.units.forEach(function (u) {
      h += '<div class="nav-unit"><span>' + u.n + '</span><span>' + R.esc(u.title) + '</span></div>';
      BS.unitTopics(u.n).forEach(function (t) {
        h += '<a href="#/notes/' + t.id + '" data-nav="notes/' + t.id + '">' +
          '<span class="num">' + t.id + '</span><span>' + R.esc(t.title) + '</span></a>';
      });
    });
    unitNav.innerHTML = h;
  })();

  var navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  document.getElementById('scrim').addEventListener('click', closeNav);
  sidebar.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });
  function closeNav() {
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  document.getElementById('resetBtn').addEventListener('click', function () {
    if (confirm('Erase all saved progress — confidence ratings, flashcard boxes, quiz history and your streak?\n\nThis cannot be undone.')) {
      BS.store.reset();
      location.hash = '#/';
      route();
    }
  });

  /* ---------------- routing ---------------- */
  function parse() {
    var raw = location.hash.replace(/^#\/?/, '');
    var qi = raw.indexOf('?');
    var params = {};
    if (qi !== -1) {
      raw.slice(qi + 1).split('&').forEach(function (kv) {
        var p = kv.split('=');
        params[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
      });
      raw = raw.slice(0, qi);
    }
    var hi = raw.indexOf('#');
    var anchor = '';
    if (hi !== -1) { anchor = raw.slice(hi + 1); raw = raw.slice(0, hi); }
    return { parts: raw.split('/').filter(Boolean), params: params, anchor: anchor };
  }

  function linkTopics(html) {
    return html.replace(/\[\[([\d.]+)\]\]/g, function (m, id) {
      var t = BS.topic(id);
      return '<a href="#/notes/' + id + '">' + id + (t ? ' ' + R.esc(t.title) : '') + '</a>';
    });
  }

  function route() {
    var r = parse();
    var p = r.parts;
    var html = '', after = null, navKey = 'home';

    if (!p.length) { html = V.home(); navKey = 'home'; }
    else if (p[0] === 'notes' && p[1]) { html = V.topic(p[1]); after = V.afterTopic; navKey = 'notes/' + p[1]; }
    else if (p[0] === 'notes') { html = V.notes(); navKey = 'notes'; }
    else if (p[0] === 'cards') { html = V.cards(r.params); after = V.afterCards; navKey = 'cards'; }
    else if (p[0] === 'quiz') { html = V.quiz(r.params); after = V.afterQuiz; navKey = 'quiz'; }
    else if (p[0] === 'exam') { html = V.exam(); after = V.afterExam; navKey = 'exam'; }
    else if (p[0] === 'tools') { html = V.tools(); after = V.afterTools; navKey = 'tools'; }
    else if (p[0] === 'glossary') { html = V.glossary(); after = V.afterGlossary; navKey = 'glossary'; }
    else { html = '<h1>Page not found</h1><p><a href="#/">Back to the dashboard</a></p>'; }

    V._cardKey = null;
    main.innerHTML = linkTopics(html);
    if (after) after(main);

    Array.prototype.forEach.call(sidebar.querySelectorAll('a'), function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === navKey);
    });
    /* keep the parent "Notes" link lit while inside a topic */
    if (navKey.indexOf('notes/') === 0) {
      var parent = sidebar.querySelector('[data-nav="notes"]');
      if (parent) parent.classList.add('active');
    }

    if (r.anchor) {
      var el = document.getElementById(r.anchor);
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);

  /* ---------------- search ---------------- */
  var modal = document.getElementById('searchModal');
  var sInput = document.getElementById('searchInput');
  var sResults = document.getElementById('searchResults');
  var index = null, sel = 0;

  function buildIndex() {
    if (index) return index;
    index = [];
    BS.notes.forEach(function (t) {
      var text = t.syllabus.join(' ') + ' ' + t.sections.map(function (s) { return s.h; }).join(' ');
      index.push({ title: t.id + ' ' + t.title, sub: 'Unit ' + t.unit + ' · topic', href: '#/notes/' + t.id, hay: (t.id + ' ' + t.title + ' ' + text).toLowerCase() });
      t.sections.forEach(function (s) {
        index.push({ title: s.h, sub: t.id + ' ' + t.title, href: '#/notes/' + t.id, hay: (s.h + ' ' + JSON.stringify(s.body)).toLowerCase() });
      });
    });
    BS.glossary.forEach(function (g) {
      index.push({ title: g.t, sub: 'Term · ' + g.tp, href: '#/glossary', hay: (g.t + ' ' + g.d).toLowerCase() });
    });
    index.push({ title: 'Command words', sub: 'Exam technique', href: '#/exam', hay: 'command words define state explain analyse evaluate justify recommend calculate outline discuss suggest' });
    index.push({ title: 'Formula sheet', sub: 'Exam technique', href: '#/exam', hay: 'formula formulae break-even contribution ratio roce margin cash flow added value elasticity' });
    index.push({ title: 'Break-even calculator', sub: 'Calculators', href: '#/tools', hay: 'break even calculator chart contribution margin of safety fixed variable costs' });
    index.push({ title: 'Ratio calculator', sub: 'Calculators', href: '#/tools', hay: 'ratio calculator gross profit margin roce current acid test liquidity' });
    return index;
  }

  function search(q) {
    q = q.toLowerCase().trim();
    if (!q) return [];
    var terms = q.split(/\s+/);
    return buildIndex().filter(function (it) {
      return terms.every(function (t) { return it.hay.indexOf(t) !== -1; });
    }).slice(0, 12);
  }

  function drawResults() {
    var res = search(sInput.value);
    if (!sInput.value.trim()) { sResults.innerHTML = '<div class="empty">Type to search topics, sections and key terms.</div>'; return; }
    if (!res.length) { sResults.innerHTML = '<div class="empty">Nothing found.</div>'; return; }
    sResults.innerHTML = res.map(function (r, i) {
      return '<a href="' + r.href + '" class="' + (i === sel ? 'sel' : '') + '"><div class="r-t">' + R.esc(r.title) +
        '</div><div class="r-s">' + R.esc(r.sub) + '</div></a>';
    }).join('');
  }

  function openSearch() {
    modal.hidden = false; sInput.value = ''; sel = 0; drawResults(); sInput.focus();
  }
  function closeSearch() { modal.hidden = true; }

  document.getElementById('searchBtn').addEventListener('click', openSearch);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeSearch(); });
  sInput.addEventListener('input', function () { sel = 0; drawResults(); });
  sResults.addEventListener('click', function () { setTimeout(closeSearch, 0); });
  sInput.addEventListener('keydown', function (e) {
    var res = search(sInput.value);
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, res.length - 1); drawResults(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); drawResults(); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (res[sel]) { location.hash = res[sel].href; closeSearch(); }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) { closeSearch(); return; }
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (!typing && (e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey)))) {
      e.preventDefault(); openSearch(); return;
    }
    if (typing || !modal.hidden) return;
    if (V._cardKey) V._cardKey(e);
  });

  /* ---------------- go ---------------- */
  if (!location.hash) location.replace('#/');
  route();
})();
