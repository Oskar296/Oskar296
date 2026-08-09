/* Router, sidebar, search and global event handling. */
(function (G) {
  'use strict';

  var esc = G.esc;
  var main = document.getElementById('main');
  var sidebar = document.getElementById('sidebar');
  var sideInner = document.getElementById('sideInner');
  var scrim = document.getElementById('scrim');
  var navToggle = document.getElementById('navToggle');
  var themeBtn = document.getElementById('themeBtn');
  var searchInput = document.getElementById('globalSearch');
  var searchResults = document.getElementById('searchResults');

  /* ---------------- theme ---------------- */

  var THEME_KEY = 'igcse-geo.theme';

  function currentTheme() {
    var stored;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) { stored = null; }
    if (stored === 'light' || stored === 'dark') return stored;
    return null; /* follow the system */
  }

  function effectiveTheme() {
    var t = currentTheme();
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme() {
    var t = currentTheme();
    if (t) document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');

    var eff = effectiveTheme();
    themeBtn.textContent = eff === 'dark' ? '☀' : '☾';
    themeBtn.setAttribute('aria-label', eff === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  themeBtn.addEventListener('click', function () {
    var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    applyTheme();
    var c = document.getElementById('heroCanvas');
    if (c) G.drawContours(c);
  });

  applyTheme();

  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onSchemeChange = function () { if (!currentTheme()) applyTheme(); };
    if (mq.addEventListener) mq.addEventListener('change', onSchemeChange);
    else if (mq.addListener) mq.addListener(onSchemeChange);
  }

  /* ---------------- sidebar ---------------- */

  function buildSidebar() {
    var html = '<div class="side-head">Syllabus 2027–2029</div>';
    var n = 0;

    G.papers.forEach(function (p) {
      html += '<div class="side-theme"><span class="t-num">' + esc(p.paper.replace('Paper ', 'P')) + '</span>' +
              '<a href="#/paper/' + p.id + '" style="color:inherit;text-decoration:none">' + esc(p.title) + '</a></div>';
      p.topics.forEach(function (t) {
        n++;
        html += '<a class="side-link" href="#/topic/' + t.id + '" data-topic="' + esc(t.id) + '">' +
          '<span class="num">' + n + '</span><span>' + esc(t.title) + '</span>' +
          '<span class="tick" data-tick="' + esc(t.id) + '">' + (G.isDone(t.id) ? '✓' : '') + '</span></a>';
      });
    });

    html += '<div class="side-head">Exam skills</div>';
    G.skills.forEach(function (s) {
      html += '<a class="side-link" href="#/skills/' + s.id + '" data-skill="' + esc(s.id) + '">' +
        '<span class="num"></span><span>' + esc(s.title) + '</span></a>';
    });

    html += '<div class="side-head">Reference</div>' +
      '<a class="side-link" href="#/cases"><span class="num"></span><span>Case studies</span></a>' +
      '<a class="side-link" href="#/glossary"><span class="num"></span><span>Glossary</span></a>' +
      '<a class="side-link" href="#/quiz"><span class="num"></span><span>Test yourself</span></a>';

    sideInner.innerHTML = html;
  }

  function markActive(hash) {
    var links = sideInner.querySelectorAll('.side-link');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      links[i].classList.toggle('on', href === hash.split('?')[0]);
    }
  }

  function refreshTicks() {
    var ticks = sideInner.querySelectorAll('[data-tick]');
    for (var i = 0; i < ticks.length; i++) {
      ticks[i].textContent = G.isDone(ticks[i].getAttribute('data-tick')) ? '✓' : '';
    }
  }

  function closeNav() {
    sidebar.classList.remove('open');
    scrim.hidden = true;
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    var open = sidebar.classList.toggle('open');
    scrim.hidden = !open;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  scrim.addEventListener('click', closeNav);

  /* ---------------- search ---------------- */

  function buildIndex() {
    var idx = [];

    G.allTopics().forEach(function (t) {
      idx.push({
        kind: t.paperTitle, title: t.title, href: '#/topic/' + t.id,
        sub: t.sections.map(function (s) { return s.h; }).join(' · '),
        hay: (t.title + ' ' + t.blurb + ' ' + t.sections.map(function (s) { return s.h; }).join(' ')).toLowerCase()
      });

      /* Topics are long, so index their sections separately and deep-link. */
      t.sections.forEach(function (s) {
        idx.push({
          kind: t.title, title: s.h, href: '#/topic/' + t.id + '?s=' + encodeURIComponent(G.slug(s.h)),
          sub: 'Section of ' + t.title,
          hay: s.h.toLowerCase()
        });
      });
    });

    G.cases.forEach(function (c) {
      idx.push({
        kind: 'Case study', title: c.name, href: '#/case/' + c.id, sub: c.place + ' · ' + c.type,
        hay: (c.name + ' ' + c.place + ' ' + c.type + ' ' + c.summary).toLowerCase()
      });
    });

    G.glossary.forEach(function (t) {
      idx.push({
        kind: 'Term', title: t.term, href: '#/glossary?t=' + encodeURIComponent(t.id), sub: t.def,
        hay: (t.term + ' ' + t.def).toLowerCase()
      });
    });

    G.skills.forEach(function (s) {
      idx.push({
        kind: 'Skills', title: s.title, href: '#/skills/' + s.id, sub: s.blurb,
        hay: (s.title + ' ' + s.blurb + ' ' + s.sections.map(function (x) { return x.h; }).join(' ')).toLowerCase()
      });
    });

    return idx;
  }

  var index = null;
  var activeResult = -1;

  function runSearch(term) {
    if (!index) index = buildIndex();
    term = term.trim().toLowerCase();
    if (term.length < 2) { hideResults(); return; }

    var hits = index.filter(function (r) { return r.hay.indexOf(term) >= 0; });

    /* Prefer matches in the title over matches buried in the body. */
    hits.sort(function (a, b) {
      var at = a.title.toLowerCase().indexOf(term) >= 0 ? 0 : 1;
      var bt = b.title.toLowerCase().indexOf(term) >= 0 ? 0 : 1;
      return at - bt;
    });
    hits = hits.slice(0, 12);

    if (!hits.length) {
      searchResults.innerHTML = '<div class="empty">Nothing matches “' + esc(term) + '”.</div>';
    } else {
      searchResults.innerHTML = hits.map(function (r) {
        return '<a href="' + r.href + '" role="option"><span class="r-kind">' + esc(r.kind) + '</span>' +
          esc(r.title) + '<span class="r-sub">' + esc(r.sub) + '</span></a>';
      }).join('');
    }
    searchResults.hidden = false;
    activeResult = -1;
  }

  function hideResults() {
    searchResults.hidden = true;
    searchResults.innerHTML = '';
    activeResult = -1;
  }

  searchInput.addEventListener('input', function () { runSearch(searchInput.value); });
  searchInput.addEventListener('focus', function () {
    if (searchInput.value.trim().length >= 2) runSearch(searchInput.value);
  });

  searchInput.addEventListener('keydown', function (e) {
    var items = searchResults.querySelectorAll('a');
    if (e.key === 'Escape') { hideResults(); searchInput.blur(); return; }
    if (!items.length) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      activeResult += (e.key === 'ArrowDown' ? 1 : -1);
      if (activeResult < 0) activeResult = items.length - 1;
      if (activeResult >= items.length) activeResult = 0;
      for (var i = 0; i < items.length; i++) items[i].classList.toggle('on', i === activeResult);
      items[activeResult].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && activeResult >= 0) {
      e.preventDefault();
      window.location.hash = items[activeResult].getAttribute('href').slice(1);
      searchInput.value = '';
      hideResults();
      searchInput.blur();
    }
  });

  document.addEventListener('click', function (e) {
    if (!searchResults.hidden && !e.target.closest('.topbar-search')) hideResults();
  });

  /* Slash focuses the search box, as in most documentation sites. */
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== searchInput &&
        !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  /* ---------------- glossary filtering ---------------- */

  function wireGlossary(query) {
    var input = document.getElementById('glFilter');
    var list = document.getElementById('glList');
    var empty = document.getElementById('glEmpty');
    if (!input || !list) return;

    input.addEventListener('input', function () {
      var term = input.value.trim().toLowerCase();
      var shown = 0;
      var groups = list.querySelectorAll('.gl-group');

      for (var g = 0; g < groups.length; g++) {
        var defs = groups[g].querySelectorAll('.defn');
        var groupShown = 0;
        for (var d = 0; d < defs.length; d++) {
          var text = defs[d].textContent.toLowerCase();
          var match = !term || text.indexOf(term) >= 0;
          defs[d].hidden = !match;
          if (match) { groupShown++; shown++; }
        }
        groups[g].hidden = groupShown === 0;
      }
      empty.hidden = shown > 0;
    });

    if (query.t) {
      var target = document.getElementById('term-' + query.t);
      if (target) {
        target.scrollIntoView({ block: 'center' });
        target.style.background = 'var(--contour-soft)';
        target.style.borderRadius = '8px';
      }
    }
  }

  /* ---------------- routing ---------------- */

  function render() {
    var hash = window.location.hash.replace(/^#/, '') || '/';
    var path = hash.split('?')[0];
    var query = G.qs(hash);
    var parts = path.replace(/^\/|\/$/g, '').split('/');
    var html;

    if (path === '/' || parts[0] === '') {
      html = G.views.home();
    } else if (parts[0] === 'paper' && parts[1]) {
      html = G.views.paper(parts[1]);
    } else if (parts[0] === 'topic' && parts[1]) {
      html = G.views.topic(parts[1]);
      G.markSeen(parts[1]);
    } else if (parts[0] === 'cases') {
      html = G.views.cases(query);
    } else if (parts[0] === 'case' && parts[1]) {
      html = G.views.caseStudy(parts[1]);
    } else if (parts[0] === 'glossary') {
      html = G.views.glossary();
    } else if (parts[0] === 'skills' && parts[1]) {
      html = G.views.skill(parts[1]);
    } else if (parts[0] === 'skills') {
      html = G.views.skills();
    } else if (parts[0] === 'quiz' && parts[1] === 'run') {
      html = G.quiz.render();
    } else if (parts[0] === 'quiz') {
      G.quiz.state = null;
      html = G.quiz.setup(query);
    } else {
      html = G.views.notFound();
    }

    main.innerHTML = html;
    markActive('#' + path);
    closeNav();
    hideResults();

    if (parts[0] === 'glossary') wireGlossary(query);

    var canvas = document.getElementById('heroCanvas');
    if (canvas) G.drawContours(canvas);

    /* Keep the position when stepping through quiz questions, otherwise start
       at the top of the new page — unless a section was deep-linked. */
    var section = query.s ? document.getElementById('s-' + query.s) : null;
    if (section) section.scrollIntoView({ block: 'start' });
    else if (!(parts[0] === 'quiz' && parts[1] === 'run')) window.scrollTo(0, 0);
    main.focus({ preventScroll: true });

    var title = main.querySelector('h1');
    document.title = (title ? title.textContent + ' · ' : '') + 'IGCSE Geography 0460';
  }

  window.addEventListener('hashchange', render);

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var canvas = document.getElementById('heroCanvas');
      if (canvas) G.drawContours(canvas);
    }, 180);
  });

  /* ---------------- delegated clicks ---------------- */

  main.addEventListener('click', function (e) {
    var t = e.target;

    var doneBtn = t.closest('[data-done]');
    if (doneBtn) {
      var id = doneBtn.getAttribute('data-done');
      var now = G.toggleDone(id);
      doneBtn.textContent = now ? 'Revised ✓' : 'Mark as revised';
      doneBtn.classList.toggle('btn-primary', now);
      refreshTicks();
      return;
    }

    var jump = t.closest('[data-jump]');
    if (jump) {
      e.preventDefault();
      var target = document.getElementById(jump.getAttribute('data-jump'));
      if (target) target.scrollIntoView({ block: 'start', behavior: 'smooth' });
      return;
    }

    var caseChip = t.closest('[data-casefilter]');
    if (caseChip) {
      var type = caseChip.getAttribute('data-casefilter');
      window.location.hash = '/cases' + (type === 'all' ? '' : '?type=' + encodeURIComponent(type));
      return;
    }

    var scopeChip = t.closest('[data-scope]');
    if (scopeChip) {
      var sc = scopeChip.parentNode.querySelectorAll('[data-scope]');
      for (var i = 0; i < sc.length; i++) sc[i].classList.remove('on');
      scopeChip.classList.add('on');
      return;
    }

    var lenChip = t.closest('[data-len]');
    if (lenChip) {
      var lc = lenChip.parentNode.querySelectorAll('[data-len]');
      for (var j = 0; j < lc.length; j++) lc[j].classList.remove('on');
      lenChip.classList.add('on');
      return;
    }

    if (t.closest('#quizStart')) {
      var scopeEl = document.querySelector('#scopeChips .chip.on');
      var lenEl = document.querySelector('#lenChips .chip.on');
      var scope = scopeEl ? scopeEl.getAttribute('data-scope') : 'all';
      var len = lenEl ? parseInt(lenEl.getAttribute('data-len'), 10) : 10;
      if (G.quiz.start(scope, len)) window.location.hash = '/quiz/run';
      return;
    }

    var opt = t.closest('[data-opt]');
    if (opt && !opt.disabled) {
      G.quiz.answer(parseInt(opt.getAttribute('data-opt'), 10));
      return;
    }

    if (t.closest('#qNext')) {
      G.quiz.next();
      main.innerHTML = G.quiz.render();
      window.scrollTo(0, 0);
      return;
    }

    if (t.closest('#quizAgain')) {
      window.location.hash = '/quiz';
      return;
    }
  });

  /* ---------------- go ---------------- */

  buildSidebar();
  render();

})(window.GEO);
