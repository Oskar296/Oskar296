/* Timed mock paper: all questions on one page, a countdown, then self-marking. */
(function () {
  'use strict';
  var R = window.R, S = window.SYL, ST = window.STORE;

  var PAPERS = [
    { id: 'p1', name: 'Paper 1 style', marks: 110, mins: 120, note: '2 hours · 110 marks · 61.1% of the qualification' },
    { id: 'p2', name: 'Paper 2 style', marks: 70, mins: 75, note: '1 hour 15 minutes · 70 marks · 38.9% of the qualification' },
    { id: 'sh', name: 'Short test', marks: 30, mins: 35, note: 'A quick 35-minute check on one topic or the whole syllabus' }
  ];

  var paper = null;     // {qs:[], marks, mins, scope, name}
  var answers = {};     // index -> picked option (mcq) or awarded marks (saq, after submit)
  var written = {};     // index -> the student's typed answer
  var submitted = false;
  var deadline = 0, timeUp = false, tick = null;
  var opts = { paper: 'p1', scope: 'all' };

  /* ---------------- building the paper ---------------- */
  function build() {
    var def = PAPERS.filter(function (p) { return p.id === opts.paper; })[0];
    var pool = S.questions(opts.scope);
    var mcq = shuffle(pool.filter(function (q) { return q.t === 'mcq'; }));
    var saq = shuffle(pool.filter(function (q) { return q.t === 'saq'; }));

    var target = def.marks, mcqTarget = Math.round(target * 0.25);
    var picked = [], total = 0;

    while (mcq.length && total < mcqTarget) { picked.push(mcq.pop()); total += 1; }
    while (saq.length && total < target) {
      var q = saq.pop();
      if (total + q.m > target + 2) continue;      // do not overshoot the paper badly
      picked.push(q); total += q.m;
      if (target - total < 2) break;
    }
    while (mcq.length && total < target) { picked.push(mcq.pop()); total += 1; }

    // read like a paper: topic order, and within a topic the short questions first
    picked.sort(function (a, b) {
      if (a.sub !== b.sub) return a.sub < b.sub ? -1 : 1;
      return marksOf(a) - marksOf(b);
    });

    paper = { qs: picked, marks: total, mins: def.mins, scope: opts.scope, name: def.name };
    answers = {}; written = {}; submitted = false; timeUp = false;
    deadline = Date.now() + def.mins * 60000;
  }
  function marksOf(q) { return q.t === 'mcq' ? 1 : q.m; }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* ---------------- setup screen ---------------- */
  function setup() {
    var h = window.VIEWS.head('Sit a full paper', 'Mock exam',
      'A timed paper built from the question bank. Write your answers, keep an eye on the clock, then mark yourself against the mark scheme.');

    h += '<div class="grid g3" style="margin-bottom:18px">' + PAPERS.map(function (p) {
      return '<button class="tcard papercard' + (opts.paper === p.id ? ' on' : '') + '" data-paper="' + p.id + '" style="text-align:left">' +
        '<div class="th"><span class="tn">' + p.marks + '</span><h3>' + p.name + '</h3></div>' +
        '<p>' + R.esc(p.note) + '</p></button>';
    }).join('') + '</div>';

    h += '<div class="card"><div class="grid g2" style="margin-bottom:14px">' +
      '<label style="display:block"><span class="dim" style="display:block;margin-bottom:5px">Questions from</span>' +
      '<select id="mScope">' + scopeOptions(opts.scope) + '</select></label>' +
      '<div></div></div>' +
      '<button class="btn primary" id="startMock">Start the paper</button>' +
      '<p class="dim mt-s">The clock starts as soon as you press start. You can submit early, and the paper is submitted automatically when the time runs out.</p></div>';

    h += '<div class="card mt"><h2>How the real thing is marked</h2>' +
      '<p class="muted">Grade boundaries move every series, so treat a percentage here as a rough guide, not a predicted grade. What it is genuinely useful for is timing: whether you can write a six-mark answer in about seven minutes, and whether you run out of paper before you run out of clock.</p>' +
      '<p class="muted">Roughly a mark a minute is the pace to aim for on both papers.</p></div>';

    return {
      html: h,
      mount: function (root) {
        root.addEventListener('click', function (e) {
          var b = e.target.closest('[data-paper]');
          if (b) {
            opts.paper = b.dataset.paper;
            root.querySelectorAll('.papercard').forEach(function (c) { c.classList.toggle('on', c.dataset.paper === opts.paper); });
          }
        });
        root.querySelector('#startMock').addEventListener('click', function () {
          opts.scope = root.querySelector('#mScope').value;
          build();
          if (!paper.qs.length) { alert('There are not enough questions in that topic for a paper this long.'); paper = null; return; }
          window.APP.render(view({ started: true }));
          window.scrollTo(0, 0);
        });
      }
    };
  }

  function scopeOptions(sel) {
    var o = '<option value="all"' + (sel === 'all' ? ' selected' : '') + '>Whole syllabus</option>';
    S.TOPICS.forEach(function (t) {
      o += '<option value="' + t.id + '"' + (sel === t.id ? ' selected' : '') + '>Topic ' + t.id + ' — ' + R.esc(t.title) + '</option>';
    });
    return o;
  }

  /* ---------------- the paper ---------------- */
  function running() {
    var h = '<div class="exam-bar" id="examBar">' +
      '<div><b>' + R.esc(paper.name) + '</b> <span class="dim">· ' + paper.qs.length + ' questions · ' + paper.marks + ' marks</span></div>' +
      '<div class="row">' +
      '<span class="clock" id="clock">--:--</span>' +
      '<button class="btn primary sm" id="submitPaper">Submit paper</button></div></div>';

    h += '<div class="qwrap" style="max-width:820px">';
    h += '<p class="dim">Answer every question. Written answers are marked by you against the mark scheme once you submit, so write them as if an examiner will read them.</p>';

    paper.qs.forEach(function (q, i) {
      h += questionHTML(q, i);
    });

    h += '<div class="row mt" style="justify-content:center"><button class="btn primary" data-submit="1">Submit paper</button></div></div>';
    return { html: h, mount: mountPaper };
  }

  function questionHTML(q, i) {
    var m = marksOf(q);
    var h = '<div class="exam-q" id="q' + i + '">' +
      '<div class="exam-qhead"><span class="qn">' + (i + 1) + '</span>' +
      '<span class="qbody">' + R.inline(q.q) + '</span>' +
      '<span class="qm">(' + m + ')</span></div>';

    if (q.t === 'mcq') {
      h += '<div class="opts">' + q.o.map(function (o, j) {
        return '<button class="opt' + (answers[i] === j ? ' picked' : '') + '" data-q="' + i + '" data-pick="' + j + '">' +
          '<span class="lt">' + 'ABCDEF'[j] + '</span><span>' + R.inline(o) + '</span></button>';
      }).join('') + '</div>';
    } else {
      h += '<textarea class="exam-ans" data-q="' + i + '" rows="' + Math.min(9, 2 + m) + '" ' +
        'placeholder="' + m + ' mark' + (m === 1 ? '' : 's') + '">' + R.esc(written[i] || '') + '</textarea>';
    }
    h += '<div class="dim" style="font-size:.75rem">' + q.sub.toUpperCase() + ' · ' + R.esc(q.subTitle) + '</div></div>';
    return h;
  }

  function mountPaper(root) {
    startClock();
    root.addEventListener('click', function (e) {
      var p = e.target.closest('[data-pick]');
      if (p) {
        var i = +p.dataset.q;
        answers[i] = +p.dataset.pick;
        p.parentNode.querySelectorAll('.opt').forEach(function (o) { o.classList.toggle('picked', o === p); });
        return;
      }
      if (e.target.closest('#submitPaper') || e.target.closest('[data-submit]')) submit();
    });
    root.addEventListener('input', function (e) {
      if (e.target.classList.contains('exam-ans')) written[+e.target.dataset.q] = e.target.value;
    });
  }

  function startClock() {
    stopClock();
    var el = document.getElementById('clock');
    var paint = function () {
      var left = Math.max(0, deadline - Date.now());
      var mm = Math.floor(left / 60000), ss = Math.floor(left % 60000 / 1000);
      if (el) {
        el.textContent = mm + ':' + String(ss).padStart(2, '0');
        el.classList.toggle('low', left < 5 * 60000);
      }
      if (left <= 0) { timeUp = true; stopClock(); submit(); }
    };
    paint();
    tick = setInterval(paint, 1000);
    window.APP.onCleanup(stopClock);
  }
  function stopClock() { if (tick) { clearInterval(tick); tick = null; } }

  function submit() {
    if (submitted) return;
    submitted = true;
    stopClock();
    // auto-mark the multiple choice now
    paper.qs.forEach(function (q, i) {
      if (q.t === 'mcq') {
        var right = answers[i] === q.a;
        ST.gradeQ(q.key, right);
      }
    });
    window.APP.render(view({ started: true }));
    window.scrollTo(0, 0);
  }

  /* ---------------- marking ---------------- */
  function awardedFor(i) {
    var q = paper.qs[i];
    if (q.t === 'mcq') return answers[i] === q.a ? 1 : 0;
    return typeof answers[i] === 'number' ? answers[i] : 0;
  }
  function totals() {
    var got = 0, marked = 0;
    paper.qs.forEach(function (q, i) {
      got += awardedFor(i);
      if (q.t === 'mcq' || typeof answers[i] === 'number') marked += marksOf(q);
    });
    return { got: got, marked: marked, total: paper.marks };
  }

  function marking() {
    var t = totals();
    var pct = Math.round(t.got / t.total * 100);
    var unmarked = paper.qs.filter(function (q, i) { return q.t === 'saq' && typeof answers[i] !== 'number'; }).length;

    var h = '<div class="exam-bar">' +
      '<div><b>Marking</b> <span class="dim">· ' + paper.name + '</span></div>' +
      '<div class="row"><span class="score" id="scoreBox">' + t.got + ' / ' + t.total + ' · ' + pct + '%</span>' +
      '<button class="btn sm" id="finishMock">Finish and save</button></div></div>';

    h += '<div class="qwrap" style="max-width:820px">';
    if (timeUp) h += '<div class="callout warn"><div class="ct">Time up</div><p>The paper was submitted automatically. Anything left blank scores nothing — worth noticing where you ran out of time.</p></div>';
    h += '<p class="muted" id="unmarkedNote">' + (unmarked
      ? 'Award yourself marks for each written answer below. <b>' + unmarked + '</b> still to mark.'
      : 'Every question is marked. Press <b>Finish and save</b> to record the result.') + '</p>';

    paper.qs.forEach(function (q, i) {
      var m = marksOf(q);
      h += '<div class="exam-q marked" id="m' + i + '">' +
        '<div class="exam-qhead"><span class="qn">' + (i + 1) + '</span>' +
        '<span class="qbody">' + R.inline(q.q) + '</span>' +
        '<span class="qm">(' + m + ')</span></div>';

      if (q.t === 'mcq') {
        h += '<div class="opts">' + q.o.map(function (o, j) {
          var cls = j === q.a ? ' right' : (answers[i] === j ? ' wrong' : '');
          return '<div class="opt' + cls + '"><span class="lt">' + 'ABCDEF'[j] + '</span><span>' + R.inline(o) + '</span></div>';
        }).join('') + '</div>' +
          '<div class="ms"><h4>' + (answers[i] === q.a ? 'Correct — 1 mark' : answers[i] == null ? 'Not answered — 0 marks' : 'Incorrect — 0 marks') + '</h4>' +
          '<p style="margin:0">' + R.inline(q.e) + '</p></div>';
      } else {
        h += '<div class="your-answer"><b>Your answer</b><p>' + (written[i] ? R.esc(written[i]) : '<i class="dim">left blank</i>') + '</p></div>';
        h += '<div class="ms"><h4>Mark scheme — ' + m + ' mark' + (m === 1 ? '' : 's') + '</h4><ul>' +
          q.ms.map(function (x) { return '<li>' + R.inline(x) + '</li>'; }).join('') + '</ul></div>';
        h += '<div class="award" data-award-row="' + i + '"><span class="dim">Award:</span>' +
          range(m + 1).map(function (n) {
            return '<button class="btn sm award-btn' + (answers[i] === n ? ' on' : '') + '" data-award="' + n + '" data-q="' + i + '">' + n + '</button>';
          }).join('') + '</div>';
      }
      h += '</div>';
    });

    h += '<div class="row mt" style="justify-content:center">' +
      '<button class="btn primary" id="finishMock2">Finish and save</button>' +
      '<a class="btn ghost" href="#/mock">New paper</a></div></div>';

    return {
      html: h,
      mount: function (root) {
        root.addEventListener('click', function (e) {
          var a = e.target.closest('[data-award]');
          if (a) {
            var i = +a.dataset.q, n = +a.dataset.award, q = paper.qs[i];
            answers[i] = n;
            root.querySelectorAll('[data-award-row="' + i + '"] .award-btn').forEach(function (b) {
              b.classList.toggle('on', +b.dataset.award === n);
            });
            ST.gradeQ(q.key, n >= Math.ceil(q.m / 2));
            repaintScore(root);
            return;
          }
          if (e.target.closest('#finishMock') || e.target.closest('#finishMock2')) finish();
        });
      }
    };
  }

  function repaintScore(root) {
    var t = totals(), box = root.querySelector('#scoreBox');
    if (box) box.textContent = t.got + ' / ' + t.total + ' · ' + Math.round(t.got / t.total * 100) + '%';
    var left = paper.qs.filter(function (q, i) { return q.t === 'saq' && typeof answers[i] !== 'number'; }).length;
    var note = root.querySelector('#unmarkedNote');
    if (note) note.innerHTML = left
      ? 'Award yourself marks for each written answer below. <b>' + left + '</b> still to mark.'
      : 'Every question is marked. Press <b>Finish and save</b> to record the result.';
  }

  function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }

  function finish() {
    var t = totals();
    ST.logSession('mock:' + paper.scope, t.got, t.total);
    window.APP.refreshSidebar();
    var pct = Math.round(t.got / t.total * 100);
    var weakest = weakTopics();

    var h = '<div class="qwrap center">' +
      '<h1>' + t.got + ' / ' + t.total + '</h1>' +
      '<p class="lede" style="margin:0 auto 20px">' + pct + '% on the ' + R.esc(paper.name) + '. ' +
      'Grade boundaries move every series, so use this to find gaps rather than to predict a grade.</p>';

    if (weakest.length) {
      h += '<h2 class="mt">Where the marks went missing</h2><div class="sublist" style="text-align:left">' +
        weakest.map(function (w) {
          return '<a class="subrow" href="#/sub/' + w.id + '"><span class="sid">' + w.id.toUpperCase() + '</span>' +
            '<span class="st">' + R.esc(w.title) + '</span>' +
            '<span class="chip ' + (w.pct < 50 ? 'rose' : 'amber') + '">' + w.got + '/' + w.total + '</span></a>';
        }).join('') + '</div>';
    }

    h += '<div class="row mt" style="justify-content:center">' +
      '<a class="btn primary" href="#/mock">Another paper</a>' +
      '<a class="btn" href="#/cards">Review flashcards</a>' +
      '<a class="btn ghost" href="#/home">Dashboard</a></div></div>';

    paper = null;
    window.APP.render({ html: h });
    window.scrollTo(0, 0);
  }

  function weakTopics() {
    var by = {};
    paper.qs.forEach(function (q, i) {
      var r = by[q.sub] || (by[q.sub] = { id: q.sub, title: q.subTitle, got: 0, total: 0 });
      r.got += awardedFor(i); r.total += marksOf(q);
    });
    return Object.keys(by).map(function (k) {
      var r = by[k]; r.pct = Math.round(r.got / r.total * 100); return r;
    }).filter(function (r) { return r.pct < 80; })
      .sort(function (a, b) { return a.pct - b.pct; }).slice(0, 6);
  }

  /* ---------------- entry ---------------- */
  function view(params) {
    if (params && params.scope && !params.started) { opts.scope = params.scope; paper = null; }
    if (!paper) return setup();
    return submitted ? marking() : running();
  }

  window.MOCK = { view: view, reset: function () { stopClock(); paper = null; } };
})();
