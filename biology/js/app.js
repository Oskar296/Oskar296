/* Router, sidebar and global chrome. */
(function () {
  'use strict';
  var R = window.R, S = window.SYL, ST = window.STORE;

  var main = document.getElementById('main');
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('scrim');
  var searchInput = document.getElementById('searchInput');
  var current = 'home';

  /* ---------- theme ---------- */
  ST.setTheme(ST.theme());
  document.getElementById('themeBtn').addEventListener('click', function () { ST.cycleTheme(); });

  /* ---------- sidebar ---------- */
  function buildSidebar() {
    var box = document.getElementById('sideTopics');
    box.innerHTML = S.TOPICS.map(function (t) {
      var p = ST.topicProgress(t.id);
      return '<a class="side-link" href="#/topic/' + t.id + '" data-nav="topic-' + t.id + '">' +
        '<span class="side-topic" style="width:100%">' +
        '<span class="num">' + t.id + '</span>' +
        '<span class="tt">' + R.esc(t.title) + '</span>' +
        '<span class="pc">' + p.pct + '%</span></span></a>';
    }).join('');
    var cs = ST.cardStats();
    var pill = document.getElementById('duePill');
    if (cs.due > 0) { pill.hidden = false; pill.textContent = cs.due; } else { pill.hidden = true; }
    highlight();
  }
  function highlight() {
    document.querySelectorAll('.side-link').forEach(function (a) {
      a.classList.toggle('on', a.dataset.nav === current);
    });
  }
  function closeMenu() { sidebar.classList.remove('open'); scrim.hidden = true; document.getElementById('menuBtn').setAttribute('aria-expanded', 'false'); }
  document.getElementById('menuBtn').addEventListener('click', function () {
    var open = sidebar.classList.toggle('open');
    scrim.hidden = !open;
    this.setAttribute('aria-expanded', String(open));
  });
  scrim.addEventListener('click', closeMenu);
  sidebar.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });

  /* ---------- render ---------- */
  function render(v) {
    main.innerHTML = v.html;
    if (v.mount) v.mount(main);
  }

  /* ---------- routing ---------- */
  function parse(hash) {
    var h = (hash || '').replace(/^#/, '');
    if (h.indexOf('/') !== 0) return null;              // in-page anchors are not routes
    var qi = h.indexOf('?');
    var params = {};
    if (qi > -1) {
      h.slice(qi + 1).split('&').forEach(function (kv) {
        var p = kv.split('=');
        params[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || '').replace(/\+/g, ' '));
      });
      h = h.slice(0, qi);
    }
    return { parts: h.split('/').filter(Boolean), params: params };
  }

  function route() {
    var r = parse(location.hash);
    if (!r) { if (!location.hash) location.replace('#/home'); return; }
    var p = r.parts, page = p[0] || 'home', v;

    switch (page) {
      case 'home': current = 'home'; v = window.VIEWS.home(); break;
      case 'syllabus': current = 'syllabus'; v = window.VIEWS.syllabus(); break;
      case 'topic': current = 'topic-' + p[1]; v = window.VIEWS.topic(p[1]); break;
      case 'sub':
        var s = S.sub(p[1]);
        current = s ? 'topic-' + s.topicId : '';
        v = window.VIEWS.sub(p[1]); break;
      case 'cards': current = 'cards'; v = window.CARDS.view(r.params); break;
      case 'quiz': current = 'quiz'; v = window.QUIZ.view(r.params); break;
      case 'practicals': current = 'practicals'; v = window.VIEWS.practicals(); break;
      case 'exam': current = 'exam'; v = window.VIEWS.exam(); break;
      case 'glossary': current = 'glossary'; v = window.VIEWS.glossary(); break;
      case 'progress': current = 'progress'; v = window.VIEWS.progress(); break;
      case 'search': current = ''; v = window.VIEWS.search(r.params.q); break;
      default: current = ''; v = window.VIEWS.notFound();
    }
    render(v);
    highlight();
    document.title = titleFor(page, p[1]) + ' · Bio 4BI1';
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

  function titleFor(page, id) {
    if (page === 'sub') { var s = S.sub(id); return s ? s.id.toUpperCase() + ' ' + s.title : 'Not found'; }
    if (page === 'topic') { var t = S.topic(id); return t ? 'Topic ' + t.id : 'Not found'; }
    return { home: 'Dashboard', syllabus: 'Syllabus', cards: 'Flashcards', quiz: 'Quiz', practicals: 'Core practicals', exam: 'Exam skills', glossary: 'Glossary', progress: 'Progress', search: 'Search' }[page] || 'Not found';
  }

  /* ---------- search ---------- */
  var searchTimer;
  document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    location.hash = '#/search?q=' + encodeURIComponent(searchInput.value);
  });
  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimer);
    var q = searchInput.value;
    searchTimer = setTimeout(function () {
      if (q.trim().length >= 2) location.hash = '#/search?q=' + encodeURIComponent(q);
    }, 280);
  });

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === '/' && !typing) { e.preventDefault(); searchInput.focus(); searchInput.select(); return; }
    if (e.key === 'Escape') { if (document.activeElement === searchInput) searchInput.blur(); closeMenu(); return; }
    if (typing) return;
    if (current === 'cards') window.CARDS.keydown(e);
  });

  window.APP = {
    render: render,
    refreshSidebar: buildSidebar,
    go: function (hash, force) {
      if (force && location.hash === hash) route();
      else location.hash = hash;
    }
  };

  window.addEventListener('hashchange', route);
  buildSidebar();
  if (!location.hash) location.replace('#/home');
  route();
})();
