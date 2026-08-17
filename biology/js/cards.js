/* Flashcards with Leitner-box spacing. */
(function () {
  'use strict';
  var R = window.R, S = window.SYL, ST = window.STORE;

  var deck = [], pos = 0, flipped = false, session = null, opts = { scope: 'all', mode: 'due', dir: 'term', size: 20 };

  function key(c) { return c.sub + '|' + c.t; }

  function build() {
    var all = S.allTerms().filter(function (t) {
      return opts.scope === 'all' || t.sub === opts.scope || t.topicId === opts.scope;
    });
    if (opts.mode === 'due') all = all.filter(function (t) { return ST.isDue(key(t)); });
    if (opts.mode === 'weak') all = all.filter(function (t) { return ST.card(key(t)).box <= 2; });
    // shuffle
    for (var i = all.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = all[i]; all[i] = all[j]; all[j] = tmp; }
    deck = opts.size ? all.slice(0, opts.size) : all;
    pos = 0; flipped = false;
    session = { right: 0, wrong: 0, total: deck.length };
  }

  function scopeOptions(sel) {
    var o = '<option value="all"' + (sel === 'all' ? ' selected' : '') + '>Whole syllabus</option>';
    S.TOPICS.forEach(function (t) {
      o += '<option value="' + t.id + '"' + (sel === t.id ? ' selected' : '') + '>Topic ' + t.id + ' — ' + R.esc(t.title) + '</option>';
      t.subs.forEach(function (s) {
        o += '<option value="' + s.id + '"' + (sel === s.id ? ' selected' : '') + '>&nbsp;&nbsp;&nbsp;' + s.id.toUpperCase() + ' ' + R.esc(s.title) + '</option>';
      });
    });
    return o;
  }

  function setup() {
    var cs = ST.cardStats();
    var h = window.VIEWS.head('Spaced repetition', 'Flashcards',
      'Cards you get right come back after longer and longer gaps. Cards you miss come straight back to the front.');
    h += '<div class="grid g4" style="margin-bottom:20px">' +
      window.VIEWS.stat('Due now', cs.due, 'ready to review') +
      window.VIEWS.stat('Known', cs.known, 'box 4–5') +
      window.VIEWS.stat('Learning', cs.learning, 'box 1–3') +
      window.VIEWS.stat('Never seen', cs.unseen, 'of ' + cs.total + ' cards') + '</div>';

    h += '<div class="card"><h2>Start a review</h2>' +
      '<div class="grid g2" style="margin-bottom:14px">' +
      field('Cards from', '<select id="fScope">' + scopeOptions(opts.scope) + '</select>') +
      field('Which cards', '<select id="fMode">' +
        opt('due', 'Only cards due today', opts.mode) +
        opt('weak', 'Cards I keep missing (box 1–2)', opts.mode) +
        opt('all', 'Everything in range', opts.mode) + '</select>') +
      field('Direction', '<select id="fDir">' +
        opt('term', 'Show the term, recall the meaning', opts.dir) +
        opt('def', 'Show the meaning, recall the term', opts.dir) +
        opt('mix', 'Mix both ways', opts.dir) + '</select>') +
      field('Session length', '<select id="fSize">' +
        opt('10', '10 cards', String(opts.size)) + opt('20', '20 cards', String(opts.size)) +
        opt('40', '40 cards', String(opts.size)) + opt('0', 'No limit', String(opts.size)) + '</select>') +
      '</div><button class="btn primary" id="startCards">Start reviewing</button>' +
      '<p class="dim mt-s">Keyboard: <b>space</b> flips, <b>1</b> missed it, <b>2</b> got it.</p></div>';

    return {
      html: h,
      mount: function (root) {
        root.querySelector('#startCards').addEventListener('click', function () {
          opts.scope = root.querySelector('#fScope').value;
          opts.mode = root.querySelector('#fMode').value;
          opts.dir = root.querySelector('#fDir').value;
          opts.size = parseInt(root.querySelector('#fSize').value, 10) || 0;
          build();
          window.APP.render(view({ started: true }));
        });
      }
    };
  }

  function field(label, control) {
    return '<label style="display:block"><span class="dim" style="display:block;margin-bottom:5px">' + label + '</span>' + control + '</label>';
  }
  function opt(v, label, sel) {
    return '<option value="' + v + '"' + (v === sel ? ' selected' : '') + '>' + label + '</option>';
  }

  function running() {
    if (pos >= deck.length) return done();
    var c = deck[pos];
    var k = key(c), card = ST.card(k);
    var showTerm = opts.dir === 'term' || (opts.dir === 'mix' && (pos % 2 === 0));
    var front = showTerm ? c.t : c.d;
    var back = showTerm ? c.d : c.t;

    var h = '<div class="qwrap">';
    h += '<div class="qmeta"><span>Card ' + (pos + 1) + ' of ' + deck.length + '</span>' +
      '<span>' + R.esc(c.sub.toUpperCase() + ' ' + c.subTitle) + '</span></div>';
    h += '<div class="progress-strip">' + deck.map(function (_, i) {
      return '<i class="' + (i < pos ? 'ok' : i === pos ? 'now' : '') + '"></i>';
    }).join('') + '</div>';

    h += '<div class="fc-stage"><div class="fc' + (flipped ? ' flip' : '') + '" id="fcard">' +
      '<div class="fc-face"><span class="tag">' + (showTerm ? 'TERM' : 'DEFINITION') + '</span>' +
      '<span class="' + (showTerm ? 'q' : 'a') + '">' + R.inline(front) + '</span>' +
      '<span class="hint">click, or press space, to flip</span></div>' +
      '<div class="fc-face fc-back"><span class="tag">' + (showTerm ? 'MEANING' : 'TERM') + '</span>' +
      '<span class="' + (showTerm ? 'a' : 'q') + '">' + R.inline(back) + '</span>' +
      '<span class="hint">' + (card.seen ? 'seen ' + card.seen + '× · box ' + card.box + ' of 5' : 'new card') + '</span></div>' +
      '</div></div>';

    h += '<div class="box-dots">' + [1, 2, 3, 4, 5].map(function (b) {
      return '<i class="' + (b <= card.box ? 'on' : '') + '"></i>';
    }).join('') + '</div>';

    h += '<div class="row mt" style="justify-content:center">' +
      '<button class="btn" data-grade="0"' + (flipped ? '' : ' disabled') + '>Missed it</button>' +
      '<button class="btn primary" data-grade="1"' + (flipped ? '' : ' disabled') + '>Got it</button>' +
      '<button class="btn ghost" data-skip="1">Skip</button>' +
      '<a class="btn ghost" href="#/sub/' + c.sub + '">Read the notes</a>' +
      '</div>';
    h += '<p class="center dim mt-s">' + session.right + ' right · ' + session.wrong + ' to redo</p>';
    h += '</div>';

    return { html: h, mount: mountRunning };
  }

  function mountRunning(root) {
    var fc = root.querySelector('#fcard');
    if (fc) fc.addEventListener('click', function () { flip(); });
    root.addEventListener('click', function (ev) {
      var g = ev.target.closest('[data-grade]');
      if (g && !g.disabled) { grade(g.dataset.grade === '1'); return; }
      if (ev.target.closest('[data-skip]')) { pos++; flipped = false; window.APP.render(view({ started: true })); }
    });
  }

  function flip() {
    flipped = !flipped;
    var fc = document.querySelector('#fcard');
    if (fc) fc.classList.toggle('flip', flipped);
    document.querySelectorAll('[data-grade]').forEach(function (b) { b.disabled = !flipped; });
  }

  function grade(good) {
    var c = deck[pos];
    ST.gradeCard(key(c), good);
    if (good) session.right++; else { session.wrong++; deck.push(c); }
    pos++; flipped = false;
    window.APP.refreshSidebar();
    window.APP.render(view({ started: true }));
  }

  function done() {
    var pct = session.total ? Math.round(session.right / (session.right + session.wrong) * 100) : 0;
    var cs = ST.cardStats();
    var h = '<div class="qwrap center">' +
      '<h1>Review finished</h1>' +
      '<p class="lede" style="margin:0 auto 20px">You cleared ' + session.total + ' card' + (session.total === 1 ? '' : 's') +
      ' with ' + pct + '% first-time recall.</p>' +
      '<div class="grid g3" style="margin-bottom:22px">' +
      window.VIEWS.stat('Right first time', session.right, '') +
      window.VIEWS.stat('Needed a redo', session.wrong, '') +
      window.VIEWS.stat('Still due', cs.due, 'across the syllabus') + '</div>' +
      '<div class="row" style="justify-content:center">' +
      '<button class="btn primary" id="again">Review more</button>' +
      '<a class="btn" href="#/quiz">Try a quiz</a>' +
      '<a class="btn ghost" href="#/home">Dashboard</a></div></div>';
    return {
      html: h,
      mount: function (root) {
        root.querySelector('#again').addEventListener('click', function () { session = null; window.APP.render(view({})); });
      }
    };
  }

  function view(params) {
    if (params && params.scope && !params.started) {
      opts.scope = params.scope; session = null;
    }
    if (!session) return setup();
    return running();
  }

  function keydown(e) {
    if (!session || pos >= deck.length) return;
    if (e.key === ' ') { e.preventDefault(); flip(); }
    else if (e.key === '1' && flipped) grade(false);
    else if (e.key === '2' && flipped) grade(true);
  }

  window.CARDS = { view: view, keydown: keydown, reset: function () { session = null; } };
})();
