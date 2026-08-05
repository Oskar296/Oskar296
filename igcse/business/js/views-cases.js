/* views-cases.js — Paper 2 case studies: read the stimulus, answer under time,
   then self-mark each part against the scheme.                               */

var V = window.V || {};

V.cases = function () {
  var s = BS.store;
  var h = '<div class="eyebrow">Paper 2</div><h1>Case studies</h1>' +
    '<p class="lead">Paper 2 is half your grade and it is one case study with four 20-mark questions. ' +
    'Read the case and the appendices first, then answer. Every point must come from the case — ' +
    'a general textbook answer cannot reach the top band here.</p>';

  BS.cases.forEach(function (c) {
    var totalMarks = 0, best = 0, attempted = 0;
    c.questions.forEach(function (q, qi) {
      q.parts.forEach(function (p, pi) {
        totalMarks += p.marks;
        var a = s.caseAns(c.id + '.' + qi + '.' + pi);
        if (a.outOf) { best += a.best; attempted++; }
      });
    });
    var parts = c.questions.reduce(function (n, q) { return n + q.parts.length; }, 0);

    h += '<a class="topic-row" style="align-items:flex-start;padding:16px 18px" href="#/cases/' + c.id + '">' +
      '<span style="flex:1">' +
      '<span style="font-size:17px;font-weight:650;display:block">' + R.esc(c.title) + '</span>' +
      '<span class="small" style="display:block;margin:3px 0 7px">' + R.esc(c.tag) + ' · ' +
      c.questions.length + ' questions · ' + totalMarks + ' marks</span>' +
      '<span class="small">' + R.esc(c.blurb) + '</span>' +
      (attempted ? '<span class="small" style="display:block;margin-top:8px"><strong>' + best + '/' + totalMarks +
        '</strong> self-marked so far (' + attempted + '/' + parts + ' parts attempted)</span>' : '') +
      '</span>' +
      (attempted ? '<span class="pill g">In progress</span>' : '<span class="pill a">Start</span>') +
      '</a>';
  });

  h += '<div class="callout tip"><span class="clabel">How to use these</span>' +
    '<p>Give yourself the real conditions at least once: <strong>1 hour 30 minutes</strong> for the whole case, ' +
    'with the first 8–10 minutes spent reading before you write anything. Use the timer at the top of the case. ' +
    'Then mark yourself honestly — the marks you did not get are the ones worth studying.</p></div>';
  return h;
};

V.case = function (id) {
  var c = BS.cases.filter(function (x) { return x.id === id; })[0];
  V._case = c || null;
  if (!c) return '<h1>Case study not found</h1><p><a href="#/cases">Back to case studies</a></p>';

  var totalMarks = 0;
  c.questions.forEach(function (q) { q.parts.forEach(function (p) { totalMarks += p.marks; }); });

  var h = '<div class="crumb"><a href="#/cases">Case studies</a> › ' + R.esc(c.title) + '</div>';

  h += '<div class="casebar">' +
    '<span><span class="timer" id="caseTimer">1:30:00</span> ' +
    '<span class="small" id="timerNote">not started</span></span>' +
    '<span><button class="btn sm" id="timerBtn">Start timer</button> ' +
    '<button class="btn sm" id="timerReset">Reset</button></span>' +
    '<span class="pill">' + totalMarks + ' marks</span></div>';

  h += '<div class="eyebrow">Case study</div><h1>' + R.esc(c.title) + '</h1>';
  h += '<div class="card case-text">' + c.text.map(function (p) {
    return '<p>' + R.inline(p).replace(/\n/g, '<br/>') + '</p>';
  }).join('') + '</div>';

  h += '<h2>Appendices</h2>';
  c.appendices.forEach(function (a) {
    h += '<div class="appendix"><h4>Appendix ' + a.n + ' — ' + R.esc(a.title) + '</h4>';
    if (a.table) h += R.table(a.table);
    if (a.quotes) {
      h += '<div class="twrap"><table><tbody>' + a.quotes.map(function (q) {
        return '<tr><th style="width:30%">' + R.inline(q[0]) + '</th><td>' + R.inline(q[1]) + '</td></tr>';
      }).join('') + '</tbody></table></div>';
    }
    h += '</div>';
  });

  h += '<h2>Questions</h2>';
  c.questions.forEach(function (q, qi) {
    h += '<div class="card qcard"><div class="eyebrow">Question ' + q.n + ' · ' + q.total + ' marks</div>';
    q.parts.forEach(function (p, pi) {
      var key = c.id + '.' + qi + '.' + pi;
      var prev = BS.store.caseAns(key);
      h += '<div style="margin-top:16px" data-part="' + key + '">';
      h += '<p class="qtext" style="margin-bottom:8px">' +
        '<span class="pill a">' + R.esc(p.cmd) + '</span> ' +
        '<span class="pill">' + p.marks + ' marks</span><br/>' +
        '<span style="display:inline-block;margin-top:8px">(' + String.fromCharCode(97 + pi) + ') ' + R.inline(p.q) + '</span></p>';
      h += '<textarea rows="' + (p.marks <= 2 ? 2 : p.marks <= 6 ? 6 : 12) + '" data-ans="' + key + '" ' +
        'placeholder="Your answer…">' + R.esc(prev.text || '') + '</textarea>';
      h += '<div class="btnrow"><button class="btn sm" data-reveal="' + key + '">Show mark scheme</button>' +
        (prev.outOf ? ' <span class="pill g" style="align-self:center">Best so far: ' + prev.best + '/' + prev.outOf + '</span>' : '') +
        '</div>';
      h += '<div id="m-' + key.replace(/\./g, '-') + '"></div>';
      h += '</div>';
      if (pi < q.parts.length - 1) h += '<hr style="margin:18px 0"/>';
    });
    h += '</div>';
  });

  h += '<div class="card" id="caseTotal"></div>';
  h += '<div class="pagenav"><a href="#/cases"><div class="lbl">← Back</div><div class="ttl">All case studies</div></a>' +
    '<a class="r" href="#/exam"><div class="lbl">Next →</div><div class="ttl">Exam technique</div></a></div>';
  return h;
};

V.afterCase = function (root) {
  var c = V._case;
  var tEl = root.querySelector('#caseTimer');
  var note = root.querySelector('#timerNote');
  var btn = root.querySelector('#timerBtn');
  if (!c || !tEl || !note || !btn) return;
  var s = BS.store;

  /* ---------- timer ---------- */
  var LEN = 90 * 60;
  var left = LEN, running = false, iv = null;

  function fmt(n) {
    var hrs = Math.floor(n / 3600), m = Math.floor((n % 3600) / 60), sec = n % 60;
    return hrs + ':' + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
  }
  function tick() {
    left--;
    if (left <= 0) {
      left = 0; stop();
      note.textContent = 'time up — pens down';
    } else if (left <= 600) {
      tEl.classList.add('low');
      note.textContent = 'under 10 minutes left';
    } else if (left > LEN - 600) {
      note.textContent = 'reading time — do not write yet';
    } else {
      note.textContent = 'writing';
    }
    tEl.textContent = fmt(left);
  }
  function stop() {
    running = false; clearInterval(iv); iv = null; btn.textContent = 'Resume';
  }
  btn.addEventListener('click', function () {
    if (running) { stop(); note.textContent = 'paused'; return; }
    running = true; btn.textContent = 'Pause'; iv = setInterval(tick, 1000); tick();
  });
  root.querySelector('#timerReset').addEventListener('click', function () {
    stop(); left = LEN; tEl.textContent = fmt(left); tEl.classList.remove('low');
    note.textContent = 'not started'; btn.textContent = 'Start timer';
  });
  V._caseCleanup = function () { if (iv) clearInterval(iv); };

  /* ---------- mark schemes ---------- */
  root.addEventListener('click', function (e) {
    var b = e.target.closest('[data-reveal]');
    if (!b) return;
    var key = b.getAttribute('data-reveal');
    var bits = key.split('.');
    var q = c.questions[+bits[1]], part = q.parts[+bits[2]];
    var boxId = 'm-' + key.replace(/\./g, '-');
    var box = root.querySelector('#' + boxId);
    if (box.innerHTML) { box.innerHTML = ''; b.textContent = 'Show mark scheme'; return; }
    b.textContent = 'Hide mark scheme';

    var got = part.scheme.map(function () { return false; });
    var h = '<hr/><h3 class="mt0">Mark scheme — tick what you actually wrote</h3>' +
      '<p class="small">The scheme usually lists more creditable points than the marks available, so you do not need all of them.</p>' +
      '<div class="scheme">';
    part.scheme.forEach(function (pt, i) {
      h += '<label class="tick"><input type="checkbox" data-i="' + i + '"/><span>' + R.inline(pt) + '</span></label>';
    });
    h += '</div><div class="card tight" style="margin-top:14px" data-score></div>';
    if (part.model) {
      h += '<div class="btnrow"><button class="btn sm" data-model>Show a model answer</button></div>' +
        '<div data-modelbox hidden><div class="callout eg" style="margin-top:12px"><span class="clabel">Model answer</span>' +
        part.model.split('\n\n').map(function (p) { return '<p>' + R.inline(p) + '</p>'; }).join('') + '</div></div>';
    }
    box.innerHTML = h;

    var scoreBox = box.querySelector('[data-score]');
    var ta = root.querySelector('[data-ans="' + key + '"]');

    function update() {
      var score = Math.min(part.marks, got.filter(Boolean).length);
      var pctv = Math.round(score / part.marks * 100);
      scoreBox.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">' +
        '<span style="font-size:20px;font-weight:750">' + score + ' / ' + part.marks + '</span>' +
        '<span class="pill ' + (pctv >= 80 ? 'g' : pctv >= 50 ? 'w' : 'b') + '">' + pctv + '%</span></div>' +
        '<div class="bar' + (pctv >= 80 ? ' good' : '') + '" style="margin-top:10px"><i style="width:' + pctv + '%"></i></div>';
      s.saveCase(key, score, part.marks, ta ? ta.value : '');
      s.tick(1);
      BS.announce();
      total();
    }
    update();

    box.querySelector('.scheme').addEventListener('change', function (ev) {
      var cb = ev.target.closest('input[type=checkbox]'); if (!cb) return;
      got[+cb.getAttribute('data-i')] = cb.checked;
      cb.closest('.tick').classList.toggle('on', cb.checked);
      update();
    });
    var mb = box.querySelector('[data-model]');
    if (mb) mb.addEventListener('click', function () {
      var m = box.querySelector('[data-modelbox]');
      m.hidden = !m.hidden;
      this.textContent = m.hidden ? 'Show a model answer' : 'Hide the model answer';
    });
  });

  /* ---------- running total ---------- */
  function total() {
    var got = 0, avail = 0, attempted = 0, parts = 0;
    c.questions.forEach(function (q, qi) {
      q.parts.forEach(function (p, pi) {
        parts++; avail += p.marks;
        var a = s.caseAns(c.id + '.' + qi + '.' + pi);
        if (a.outOf) { got += a.best; attempted++; }
      });
    });
    var el = root.querySelector('#caseTotal');
    if (!el) return;
    if (!attempted) {
      el.innerHTML = '<p class="small mt0" style="margin-bottom:0">Reveal a mark scheme and tick your points to build a total for this case.</p>';
      return;
    }
    var pctv = Math.round(got / avail * 100);
    el.innerHTML = '<h3 class="mt0">Your total for this case</h3>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">' +
      '<span style="font-size:30px;font-weight:750">' + got + ' / ' + avail + '</span>' +
      '<span class="pill ' + (pctv >= 70 ? 'g' : pctv >= 45 ? 'w' : 'b') + '">' + pctv + '%</span></div>' +
      '<div class="bar' + (pctv >= 70 ? ' good' : '') + '" style="margin:12px 0"><i style="width:' + pctv + '%"></i></div>' +
      '<p class="small" style="margin-bottom:0">' + attempted + ' of ' + parts + ' parts marked. ' +
      'Only parts you have marked count towards this total.</p>';
  }
  total();

  /* save answers as they type */
  root.addEventListener('input', function (e) {
    var ta = e.target.closest('[data-ans]'); if (!ta) return;
    var key = ta.getAttribute('data-ans');
    var a = s.caseAns(key);
    s.saveCase(key, a.best, a.outOf, ta.value);
  });
};

window.V = V;
