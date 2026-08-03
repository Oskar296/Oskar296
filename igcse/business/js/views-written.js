/* views-written.js — write a real answer, then self-mark it against the mark scheme */

var V = window.V || {};

V.written = function (params) {
  V._wParams = params || {};
  return '<div class="eyebrow">The real thing</div><h1>Written practice</h1>' +
    '<p class="lead">This subject is examined by written answers, not multiple choice. ' +
    'Write your answer in full, then mark it yourself against the scheme — the same points the examiner is looking for. ' +
    'Marking your own work is where most of the learning happens.</p>' +
    '<div id="wSetup"></div><div id="wArea"></div>';
};

V.afterWritten = function (root) {
  var s = BS.store;
  var setup = root.querySelector('#wSetup');
  var area = root.querySelector('#wArea');
  var state = { unit: 0, marks: 0, topic: V._wParams.topic || null, queue: [], i: 0, revealed: false, got: [], total: 0, max: 0 };

  function pool() {
    return BS.written.filter(function (q) {
      if (state.topic && q.tp !== state.topic) return false;
      if (state.unit && q.u !== state.unit) return false;
      if (state.marks && q.marks !== state.marks) return false;
      return true;
    });
  }

  function drawSetup() {
    var p = pool();
    var h = '';
    if (state.topic) {
      var tp = BS.topic(state.topic);
      h += '<div class="callout"><span class="clabel">Filtered</span><p>' + p.length + ' question' + (p.length === 1 ? '' : 's') +
        ' from <a href="#/notes/' + state.topic + '">' + state.topic + ' ' + R.esc(tp ? tp.title : '') + '</a>. ' +
        '<a href="#/written">Use them all instead</a>.</p></div>';
    } else {
      h += '<div class="chips" id="wUnits"><button class="chip" data-u="0" aria-pressed="' + (state.unit === 0) + '">All units</button>';
      BS.units.forEach(function (u) {
        h += '<button class="chip" data-u="' + u.n + '" aria-pressed="' + (state.unit === u.n) + '">Unit ' + u.n + '</button>';
      });
      h += '</div>';
    }
    h += '<div class="chips" id="wMarks"><button class="chip" data-m="0" aria-pressed="' + (state.marks === 0) + '">Any length</button>';
    [2, 4, 6].forEach(function (m) {
      var n = BS.written.filter(function (q) { return q.marks === m; }).length;
      h += '<button class="chip" data-m="' + m + '" aria-pressed="' + (state.marks === m) + '">' + m + '-mark (' + n + ')</button>';
    });
    h += '</div>';

    /* progress across the bank */
    var done = p.filter(function (q) { return s.written(q.id).tries; });
    var gained = 0, avail = 0;
    done.forEach(function (q) { gained += s.written(q.id).best; avail += q.marks; });
    if (done.length) {
      h += '<div class="card tight"><span class="small">Attempted <strong>' + done.length + '</strong> of ' + p.length +
        ' · best marks <strong>' + gained + '/' + avail + '</strong> (' + Math.round(gained / avail * 100) + '%)</span></div>';
    }

    h += '<div class="btnrow"><button class="btn primary" id="wStart">Start writing</button></div>';
    setup.innerHTML = h;

    var wu = setup.querySelector('#wUnits');
    if (wu) wu.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      state.unit = parseInt(b.getAttribute('data-u'), 10); drawSetup(); area.innerHTML = '';
    });
    setup.querySelector('#wMarks').addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      state.marks = parseInt(b.getAttribute('data-m'), 10); drawSetup(); area.innerHTML = '';
    });
    setup.querySelector('#wStart').addEventListener('click', start);
  }

  function start() {
    var p = pool();
    if (!p.length) { area.innerHTML = '<div class="empty">No questions match that filter.</div>'; return; }
    state.queue = R.shuffle(p);
    state.i = 0; state.revealed = false; state.total = 0; state.max = 0;
    setup.style.display = 'none';
    drawQ();
  }

  function drawQ() {
    if (state.i >= state.queue.length) return finish();
    var q = state.queue[state.i];
    var prev = s.written(q.id);
    state.revealed = false;
    state.got = q.scheme.map(function () { return false; });

    var mins = Math.max(2, Math.round(q.marks * 1.2));
    var h = '';
    h += '<div class="card tight" style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">' +
      '<span class="small">Question ' + (state.i + 1) + ' of ' + state.queue.length + '</span>' +
      '<span><span class="pill a">' + R.esc(q.cmd) + '</span> <span class="pill">' + q.marks + ' marks</span> ' +
      '<span class="pill">~' + mins + ' min</span> <a class="small" href="#/notes/' + q.tp + '">' + q.tp + '</a></span></div>';
    h += '<div class="bar" style="margin-bottom:14px"><i style="width:' + Math.round(state.i / state.queue.length * 100) + '%"></i></div>';

    h += '<div class="card">';
    if (q.stem) h += '<div class="stem">' + R.inline(q.stem) + '</div>';
    h += '<p class="qtext">' + R.inline(q.q) + '</p>';
    h += '<label class="f" for="wAns">Your answer</label>';
    h += '<textarea id="wAns" rows="' + (q.marks <= 2 ? 3 : q.marks <= 4 ? 6 : 10) + '" ' +
      'placeholder="Write it out in full, as you would in the exam."></textarea>';
    h += '<div class="btnrow"><button class="btn primary" id="wReveal">I\'ve finished — show the mark scheme</button>';
    if (prev.tries) h += '<button class="btn sm" id="wPrev">Show my last attempt (' + prev.last + '/' + prev.outOf + ')</button>';
    h += '</div>';
    h += '<div id="wMark"></div></div>';
    area.innerHTML = h;

    var ta = area.querySelector('#wAns');
    ta.focus();
    area.querySelector('#wReveal').addEventListener('click', function () { reveal(q, ta.value); });
    var pb = area.querySelector('#wPrev');
    if (pb) pb.addEventListener('click', function () { ta.value = prev.text; pb.remove(); });
  }

  function reveal(q, text) {
    state.revealed = true;
    var h = '<hr/><h3 class="mt0">Mark scheme — tick every point you actually made</h3>' +
      '<p class="small">Be honest. If you did not write it, do not tick it.</p><div class="scheme" id="wScheme">';
    q.scheme.forEach(function (pt, i) {
      h += '<label class="tick"><input type="checkbox" data-i="' + i + '"/><span>' + R.inline(pt) + '</span></label>';
    });
    h += '</div>';
    h += '<div class="card tight" id="wScore" style="margin-top:14px"></div>';
    h += '<div class="btnrow"><button class="btn sm" id="wModel">Show a model answer</button></div>';
    h += '<div id="wModelBox" hidden><div class="callout eg" style="margin-top:12px"><span class="clabel">Model answer</span>' +
      q.model.split('\n\n').map(function (p) { return '<p>' + R.inline(p) + '</p>'; }).join('') + '</div></div>';
    if (q.watch) h += '<div class="callout warn"><span class="clabel">Watch out</span><p>' + R.inline(q.watch) + '</p></div>';
    h += '<div class="btnrow"><button class="btn primary" id="wNext">' +
      (state.i + 1 >= state.queue.length ? 'Save and see results' : 'Save and next question') + '</button></div>';

    var box = area.querySelector('#wMark');
    box.innerHTML = h;
    area.querySelector('#wReveal').disabled = true;

    var schemeBox = box.querySelector('#wScheme');
    var scoreBox = box.querySelector('#wScore');

    function updateScore() {
      var ticked = state.got.filter(Boolean).length;
      var score = Math.min(q.marks, ticked);
      var pctv = Math.round(score / q.marks * 100);
      var verdict = pctv >= 80 ? ['g', 'Strong — that would score well.']
        : pctv >= 50 ? ['w', 'Half marks. Look at the points you missed and note the pattern.']
          : ['b', 'Re-read the notes for this topic, then try it again in a few days.'];
      scoreBox.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">' +
        '<span style="font-size:22px;font-weight:750">' + score + ' / ' + q.marks + '</span>' +
        '<span class="pill ' + verdict[0] + '">' + verdict[1] + '</span></div>' +
        '<div class="bar' + (pctv >= 80 ? ' good' : '') + '" style="margin-top:10px"><i style="width:' + pctv + '%"></i></div>' +
        (ticked > q.marks ? '<p class="small" style="margin:8px 0 0">You ticked ' + ticked + ' points but the question is only worth ' +
          q.marks + ' marks — the scheme lists more creditable points than you need, so any ' + q.marks + ' of them would do.</p>' : '');
      return score;
    }
    updateScore();

    schemeBox.addEventListener('change', function (e) {
      var cb = e.target.closest('input[type=checkbox]'); if (!cb) return;
      state.got[parseInt(cb.getAttribute('data-i'), 10)] = cb.checked;
      cb.closest('.tick').classList.toggle('on', cb.checked);
      updateScore();
    });

    box.querySelector('#wModel').addEventListener('click', function () {
      var m = box.querySelector('#wModelBox');
      m.hidden = !m.hidden;
      this.textContent = m.hidden ? 'Show a model answer' : 'Hide the model answer';
    });

    box.querySelector('#wNext').addEventListener('click', function () {
      var score = Math.min(q.marks, state.got.filter(Boolean).length);
      s.saveWritten(q.id, score, q.marks, text);
      s.tick(2);
      state.total += score; state.max += q.marks;
      state.i++;
      drawQ();
      window.scrollTo(0, 0);
    });
  }

  function finish() {
    s.logSession('written', state.total, state.max);
    var pctv = state.max ? Math.round(state.total / state.max * 100) : 0;
    area.innerHTML = '<div class="card center"><h2 class="mt0">Session complete</h2>' +
      '<p style="font-size:38px;font-weight:750;margin:6px 0">' + state.total + ' / ' + state.max + '</p>' +
      '<p class="small">' + pctv + '% self-marked. Come back to these in a few days — writing the same answer twice is what makes it stick.</p>' +
      '<div class="btnrow" style="justify-content:center"><button class="btn primary" id="wAgain">More questions</button>' +
      '<a class="btn" href="#/cases">Try a full case study</a></div></div>';
    area.querySelector('#wAgain').addEventListener('click', function () {
      setup.style.display = ''; drawSetup(); area.innerHTML = ''; window.scrollTo(0, 0);
    });
  }

  drawSetup();
};

window.V = V;
