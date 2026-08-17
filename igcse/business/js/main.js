/* main.js — router, navigation, theme, search */

(function () {
  var main = document.getElementById('main');
  var sidebar = document.getElementById('sidebar');
  var unitNav = document.getElementById('unitNav');

  /* ---------------- toasts ---------------- */
  var toastBox = document.createElement('div');
  toastBox.id = 'toasts';
  document.body.appendChild(toastBox);

  function toast(kind, icon, title, sub, ms) {
    var el = document.createElement('div');
    el.className = 'toast ' + kind;
    el.setAttribute('role', 'status');
    el.innerHTML = '<span class="t-ico">' + icon + '</span><span><span class="t-t">' +
      R.esc(title) + '</span>' + (sub ? '<span class="t-s">' + R.esc(sub) + '</span>' : '') + '</span>';
    toastBox.appendChild(el);
    setTimeout(function () {
      el.classList.add('t-out');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 240);
    }, ms || 2600);
  }
  BS.toast = toast;

  /* Announce whatever changed since the last BS.game.snap(). Views call this
     after any action that could have moved progress forward. */
  BS.announce = function () {
    var d = BS.game.settle();
    if (d.xp > 0) toast('t-xp', '✦', '+' + d.xp + ' XP', null, 1900);
    d.unlocked.forEach(function (a, i) {
      setTimeout(function () { toast('t-ach', a.icon, a.name, a.d, 4200); }, 300 + i * 450);
    });
    if (d.levelUp) {
      setTimeout(function () {
        toast('t-lvl', '🎉', 'Level ' + d.levelUp.n + ' — ' + d.levelUp.name, 'Keep going.', 4600);
      }, 150);
    }
    return d;
  };
  BS.game.snap();

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
    else if (p[0] === 'written') { html = V.written(r.params); after = V.afterWritten; navKey = 'written'; }
    else if (p[0] === 'cases' && p[1]) { html = V.case(p[1]); after = V.afterCase; navKey = 'cases'; }
    else if (p[0] === 'cases') { html = V.cases(); navKey = 'cases'; }
    else if (p[0] === 'rush') { html = V.rush(); after = V.afterRush; navKey = 'rush'; }
    else if (p[0] === 'achievements') { html = V.achievements(); navKey = 'achievements'; }
    else if (p[0] === 'exam') { html = V.exam(); after = V.afterExam; navKey = 'exam'; }
    else if (p[0] === 'tools') { html = V.tools(); after = V.afterTools; navKey = 'tools'; }
    else if (p[0] === 'glossary') { html = V.glossary(); after = V.afterGlossary; navKey = 'glossary'; }
    else { html = '<h1>Page not found</h1><p><a href="#/">Back to the dashboard</a></p>'; }

    V._cardKey = null;
    if (V._caseCleanup) { V._caseCleanup(); V._caseCleanup = null; }
    if (V._rushCleanup) { V._rushCleanup(); V._rushCleanup = null; }
    BS.game.snap();
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
      var sp = BS.specFor(t.id);
      var text = t.syllabus.join(' ') + ' ' + t.sections.map(function (s) { return s.h; }).join(' ');
      if (sp) {
        text += ' ' + JSON.stringify(sp.outcomes) + ' ' + JSON.stringify(sp.technique);
        sp.outcomes.forEach(function (o) {
          index.push({
            title: o.n + ' ' + o.t, sub: 'Syllabus outcome · ' + t.id + ' ' + t.title,
            href: '#/notes/' + t.id, hay: (o.n + ' ' + o.t + ' ' + o.pts.join(' ')).toLowerCase()
          });
        });
      }
      index.push({ title: t.id + ' ' + t.title, sub: 'Unit ' + t.unit + ' · topic', href: '#/notes/' + t.id, hay: (t.id + ' ' + t.title + ' ' + text).toLowerCase() });
      t.sections.forEach(function (s) {
        index.push({ title: s.h, sub: t.id + ' ' + t.title, href: '#/notes/' + t.id, hay: (s.h + ' ' + JSON.stringify(s.body)).toLowerCase() });
      });
    });
    BS.glossary.forEach(function (g) {
      index.push({ title: g.t, sub: 'Term · ' + g.tp, href: '#/glossary', hay: (g.t + ' ' + g.d).toLowerCase() });
    });
    BS.written.forEach(function (w) {
      index.push({
        title: w.cmd + ' — ' + String(w.q).replace(/\*\*/g, '').slice(0, 70),
        sub: 'Written practice · ' + w.marks + ' marks · ' + w.tp,
        href: '#/written?topic=' + w.tp,
        hay: ((w.stem || '') + ' ' + w.q + ' ' + w.cmd).toLowerCase()
      });
    });
    BS.cases.forEach(function (c) {
      index.push({
        title: c.title, sub: 'Case study · ' + c.tag, href: '#/cases/' + c.id,
        hay: (c.title + ' ' + c.tag + ' ' + c.blurb + ' ' + c.text.join(' ')).toLowerCase()
      });
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
