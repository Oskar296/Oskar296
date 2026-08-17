/* views-quiz.js — multiple-choice quiz and the exam technique reference */

var V = window.V || {};

V.quiz = function (params) {
  V._quizParams = params || {};
  return '<div class="eyebrow">Practice</div><h1>Quiz</h1>' +
    '<p class="lead">Every question has a worked explanation, so a wrong answer is worth as much as a right one. ' +
    'Questions you get wrong are more likely to come back.</p>' +
    '<div id="quizSetup"></div><div id="quizArea"></div>';
};

V.afterQuiz = function (root) {
  var s = BS.store;
  var setup = root.querySelector('#quizSetup');
  var area = root.querySelector('#quizArea');
  var state = { unit: 0, topic: V._quizParams.topic || null, len: 10, queue: [], i: 0, answered: false, score: 0, log: [] };

  function pool() {
    return BS.quiz.filter(function (q) {
      if (state.topic) return q.tp === state.topic;
      return !state.unit || q.u === state.unit;
    });
  }

  function drawSetup() {
    var p = pool();
    var h = '';
    if (state.topic) {
      var tp = BS.topic(state.topic);
      h += '<div class="callout"><span class="clabel">Filtered</span><p>' + p.length + ' question' + (p.length === 1 ? '' : 's') +
        ' from <a href="#/notes/' + state.topic + '">' + state.topic + ' ' + R.esc(tp ? tp.title : '') + '</a>. ' +
        '<a href="#/quiz">Use the whole bank instead</a>.</p></div>';
    } else {
      h += '<div class="chips" id="qUnits"><button class="chip" data-u="0" aria-pressed="' + (state.unit === 0) + '">All units</button>';
      BS.units.forEach(function (u) {
        h += '<button class="chip" data-u="' + u.n + '" aria-pressed="' + (state.unit === u.n) + '">Unit ' + u.n + '</button>';
      });
      h += '</div>';
    }
    h += '<div class="chips" id="qLen">';
    [5, 10, 20, 0].forEach(function (n) {
      h += '<button class="chip" data-n="' + n + '" aria-pressed="' + (state.len === n) + '">' +
        (n === 0 ? 'All (' + p.length + ')' : n + ' questions') + '</button>';
    });
    h += '</div>';

    /* weak spots */
    var wrong = p.filter(function (q) { var r = s.question(q.id); return r.tries && !r.lastOk; });
    if (wrong.length) {
      h += '<div class="card tight"><span class="small">You last answered <strong>' + wrong.length +
        '</strong> of these incorrectly. </span><button class="btn sm" id="doWrong">Retry just those</button></div>';
    }

    h += '<div class="btnrow"><button class="btn primary" id="startQuiz">Start quiz</button></div>';
    setup.innerHTML = h;

    var qu = setup.querySelector('#qUnits');
    if (qu) qu.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      state.unit = parseInt(b.getAttribute('data-u'), 10); drawSetup(); area.innerHTML = '';
    });
    setup.querySelector('#qLen').addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      state.len = parseInt(b.getAttribute('data-n'), 10); drawSetup(); area.innerHTML = '';
    });
    setup.querySelector('#startQuiz').addEventListener('click', function () { start(pool()); });
    var dw = setup.querySelector('#doWrong');
    if (dw) dw.addEventListener('click', function () { start(wrong); });
  }

  function start(items) {
    if (!items.length) { area.innerHTML = '<div class="empty">No questions in that selection yet.</div>'; return; }
    /* weight: questions never tried, or last answered wrong, come first */
    var weighted = R.shuffle(items).sort(function (a, b) { return w(a) - w(b); });
    function w(q) { var r = s.question(q.id); if (!r.tries) return 0; return r.lastOk ? 2 : 1; }
    state.queue = state.len ? weighted.slice(0, state.len) : weighted;
    state.i = 0; state.score = 0; state.answered = false; state.log = [];
    setup.style.display = 'none';
    drawQ();
  }

  function drawQ() {
    if (state.i >= state.queue.length) return finish();
    var q = state.queue[state.i];
    var h = '';
    h += '<div class="card tight" style="display:flex;justify-content:space-between;align-items:center">' +
      '<span class="small">Question ' + (state.i + 1) + ' of ' + state.queue.length + '</span>' +
      '<span class="pill a">Score ' + state.score + '</span></div>';
    h += '<div class="bar" style="margin-bottom:14px"><i style="width:' + Math.round(state.i / state.queue.length * 100) + '%"></i></div>';
    h += '<div class="card"><p class="qtext">' + R.inline(q.q) + '</p><div class="opts" id="opts">';
    q.o.forEach(function (o, idx) {
      h += '<button class="opt" data-i="' + idx + '"><span class="letter">' + 'ABCD'[idx] + '</span><span>' + R.inline(o) + '</span></button>';
    });
    h += '</div><div id="exp"></div></div>';
    area.innerHTML = h;
    state.answered = false;

    area.querySelector('#opts').addEventListener('click', function (e) {
      var b = e.target.closest('.opt'); if (!b || state.answered) return;
      answer(parseInt(b.getAttribute('data-i'), 10));
    });
  }

  function answer(idx) {
    var q = state.queue[state.i];
    state.answered = true;
    var ok = idx === q.a;
    if (ok) state.score++;
    s.gradeQuestion(q.id, ok);
    s.tick(1);
    BS.announce();
    state.log.push({ q: q, chose: idx, ok: ok });

    var btns = area.querySelectorAll('.opt');
    Array.prototype.forEach.call(btns, function (b, i) {
      b.disabled = true;
      if (i === q.a) b.classList.add('correct');
      else if (i === idx) b.classList.add('wrong');
    });

    var exp = area.querySelector('#exp');
    exp.innerHTML = '<div class="callout ' + (ok ? 'eg' : 'warn') + '"><span class="clabel">' +
      (ok ? 'Correct' : 'Not quite — the answer is ' + 'ABCD'[q.a]) + '</span><p>' + R.inline(q.e) + '</p>' +
      '<p class="small" style="margin-bottom:0">More on this in <a href="#/notes/' + q.tp + '">' + q.tp + '</a></p></div>' +
      '<div class="btnrow"><button class="btn primary" id="nextQ">' +
      (state.i + 1 >= state.queue.length ? 'See results' : 'Next question') + '</button></div>';
    exp.querySelector('#nextQ').addEventListener('click', function () { state.i++; drawQ(); });
    exp.querySelector('#nextQ').focus();
  }

  function finish() {
    s.logSession('quiz', state.score, state.queue.length);
    var pctv = state.queue.length ? Math.round(state.score / state.queue.length * 100) : 0;
    var msg = pctv >= 80 ? 'Strong. Move on to the next unit.' :
      pctv >= 60 ? 'Solid, but re-read the topics you missed.' :
        'Worth going back over the notes for these topics before trying again.';

    var h = '<div class="card center"><h2 class="mt0">Quiz complete</h2>' +
      '<p style="font-size:38px;font-weight:750;margin:6px 0">' + state.score + ' / ' + state.queue.length + '</p>' +
      '<p class="small">' + pctv + '% — ' + msg + '</p>' +
      '<div class="btnrow" style="justify-content:center"><button class="btn primary" id="again">New quiz</button>' +
      '<a class="btn" href="#/cards">Flashcards</a></div></div>';

    var missed = state.log.filter(function (l) { return !l.ok; });
    if (missed.length) {
      h += '<h2>Review what you missed</h2>';
      missed.forEach(function (l) {
        h += '<div class="card"><p class="qtext">' + R.inline(l.q.q) + '</p>' +
          '<p><span class="pill b">You chose ' + 'ABCD'[l.chose] + '</span> ' +
          '<span class="pill g">Answer: ' + 'ABCD'[l.q.a] + ' — ' + R.esc(l.q.o[l.q.a]) + '</span></p>' +
          '<p class="small">' + R.inline(l.q.e) + ' &nbsp;<a href="#/notes/' + l.q.tp + '">Read ' + l.q.tp + ' →</a></p></div>';
      });
    }
    area.innerHTML = h;
    area.querySelector('#again').addEventListener('click', function () {
      setup.style.display = ''; drawSetup(); area.innerHTML = '';
      window.scrollTo(0, 0);
    });
  }

  drawSetup();
};

/* ---------------- exam technique ---------------- */

V.exam = function () {
  var e = BS.exam;
  var h = '<div class="eyebrow">Technique</div><h1>How to answer the paper</h1>' +
    '<p class="lead">Content gets you into the exam. Technique gets you the grade. ' +
    'Most marks are lost by not developing points, not applying them to the business, and not deciding on the 12-markers.</p>' +
    '<div class="callout"><span class="clabel">This page is the general rules</span>' +
    '<p>Every topic also has its own <strong>How this topic is examined</strong> section — the question stems that ' +
    'actually come up for it, with their mark allocations, and what earns the marks on that specific topic. ' +
    'Open any topic from <a href="#/notes">Notes</a> and scroll past the content to find it.</p></div>';

  /* papers */
  h += '<h2>The two papers</h2><div class="grid g2">';
  e.papers.forEach(function (p) {
    h += '<div class="card"><h3 class="mt0">' + R.esc(p.name) + '</h3>' +
      '<p><span class="pill a">' + p.time + '</span> <span class="pill">' + p.marks + '</span> <span class="pill">' + p.weight + '</span></p>' +
      '<ul>' + p.shape.map(function (x) { return '<li>' + R.inline(x) + '</li>'; }).join('') + '</ul>' +
      '<div class="twrap"><table><thead><tr><th>Assessment objective</th><th>Weight</th></tr></thead><tbody>' +
      p.aos.map(function (a) { return '<tr><td>' + a[0] + '</td><td>' + a[1] + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<h3>Strategy</h3><ul>' + p.strategy.map(function (x) { return '<li>' + R.inline(x) + '</li>'; }).join('') + '</ul>' +
      '</div>';
  });
  h += '</div>';

  /* command words */
  h += '<h2>Command words</h2>' +
    '<p>Underline the command word before you write anything. It tells you exactly how much to write and what skill is being marked.</p>' +
    '<div class="twrap"><table><thead><tr><th>Command word</th><th>What it asks for</th><th>How to answer it</th></tr></thead><tbody>';
  e.commandWords.forEach(function (c) {
    h += '<tr><td><strong>' + R.esc(c.w) + '</strong></td><td>' + R.inline(c.m) + '</td><td>' + R.inline(c.how) + '</td></tr>';
  });
  h += '</tbody></table></div>';

  /* PEAL */
  h += '<h2>' + R.esc(e.peel.title) + '</h2><div class="twrap"><table><thead><tr><th>Stage</th><th>What to write</th><th>Marks it earns</th></tr></thead><tbody>' +
    e.peel.rows.map(function (r) { return '<tr><td>' + R.inline(r[0]) + '</td><td>' + R.inline(r[1]) + '</td><td><span class="pill a">' + r[2] + '</span></td></tr>'; }).join('') +
    '</tbody></table></div>';

  /* ladders */
  h += '<h2>What each mark allocation needs</h2>';
  e.ladders.forEach(function (l) {
    h += '<div class="card"><h3 class="mt0">' + R.inline(l.marks) + '</h3><ol>' +
      l.steps.map(function (x) { return '<li>' + R.inline(x) + '</li>'; }).join('') + '</ol>' +
      '<div class="callout eg"><span class="clabel">Model</span><p>' + R.inline(l.example) + '</p></div></div>';
  });

  /* mistakes */
  h += '<h2>The eight most expensive mistakes</h2><div class="callout warn"><span class="clabel">Avoid these</span><ol style="margin-bottom:0">' +
    e.mistakes.map(function (m) { return '<li>' + R.inline(m) + '</li>'; }).join('') + '</ol></div>';

  /* drills */
  h += '<h2>12-mark practice questions</h2>' +
    '<p>Plan each one for two minutes on paper, then open the plan and compare. The point is the <em>structure</em>, not matching the wording.</p>';
  e.drills.forEach(function (d, i) {
    h += '<div class="card"><div class="eyebrow">Unit ' + d.u + ' · <a href="#/notes/' + d.tp + '">' + d.tp + '</a> · ' + d.marks + ' marks</div>' +
      '<p class="qtext">' + R.inline(d.q) + '</p>' +
      '<button class="btn sm" data-drill="' + i + '">Show a model plan</button>' +
      '<div id="drill' + i + '" hidden><ul style="margin-top:14px">' +
      d.plan.map(function (p) { return '<li>' + R.inline(p) + '</li>'; }).join('') + '</ul></div></div>';
  });

  /* formula sheet */
  h += '<h2>Every formula you need</h2>' +
    '<p class="small">These are <strong>not</strong> given to you in the exam. Learn all of them.</p>' +
    '<div class="twrap"><table><thead><tr><th>Formula</th><th></th><th>Topic</th></tr></thead><tbody>' +
    e.formulae.map(function (f) {
      return '<tr><td><strong>' + R.esc(f[0]) + '</strong></td><td><code>' + R.esc(f[1]) + '</code></td>' +
        '<td><a href="#/notes/' + f[2].split(' / ')[0] + '">' + f[2] + '</a></td></tr>';
    }).join('') + '</tbody></table></div>';

  return h;
};

V.afterExam = function (root) {
  root.addEventListener('click', function (e) {
    var b = e.target.closest('[data-drill]'); if (!b) return;
    var box = root.querySelector('#drill' + b.getAttribute('data-drill'));
    box.hidden = !box.hidden;
    b.textContent = box.hidden ? 'Show a model plan' : 'Hide the plan';
  });
};

window.V = V;
