/* Self-testing. Questions are drawn from GEO.questions and shuffled. */
(function (G) {
  'use strict';

  var esc = G.esc, inline = G.inline;
  var Q = G.quiz = { state: null };

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function labelFor(unitId) {
    var u = G.unit(unitId);
    if (u) return u.id + ' ' + u.title;
    var s = G.skill(unitId);
    return s ? s.title : unitId;
  }

  function pool(scope) {
    if (!scope || scope === 'all') return G.questions;
    if (scope.indexOf('theme:') === 0) {
      var t = G.theme(scope.slice(6));
      if (!t) return [];
      var ids = t.units.map(function (u) { return u.id; });
      return G.questions.filter(function (q) { return ids.indexOf(q.u) >= 0; });
    }
    if (scope === 'skills') {
      var sIds = G.skills.map(function (s) { return s.id; });
      return G.questions.filter(function (q) { return sIds.indexOf(q.u) >= 0; });
    }
    return G.questions.filter(function (q) { return q.u === scope; });
  }

  /* ---------------- setup screen ---------------- */

  Q.setup = function (query) {
    var preset = query.unit || 'all';
    var opts = [{ v: 'all', label: 'Everything', n: G.questions.length }];

    G.themes.forEach(function (t) {
      opts.push({ v: 'theme:' + t.id, label: 'Theme ' + t.id + ': ' + t.title, n: pool('theme:' + t.id).length });
    });
    opts.push({ v: 'skills', label: 'Exam skills', n: pool('skills').length });

    if (preset !== 'all' && preset.indexOf('theme:') !== 0 && preset !== 'skills') {
      opts.unshift({ v: preset, label: labelFor(preset), n: pool(preset).length });
    }

    var chips = opts.map(function (o) {
      return '<button class="chip' + (o.v === preset ? ' on' : '') + '" data-scope="' + esc(o.v) + '"' +
        (o.n ? '' : ' disabled') + '>' + esc(o.label) + ' (' + o.n + ')</button>';
    }).join('');

    var lengths = [10, 20, 40].map(function (n) {
      return '<button class="chip' + (n === 10 ? ' on' : '') + '" data-len="' + n + '">' + n + ' questions</button>';
    }).join('') + '<button class="chip" data-len="0">All of them</button>';

    return '<div class="wrap">' +
      '<nav class="crumbs"><a href="#/">Home</a><span aria-hidden="true">/</span><span>Test yourself</span></nav>' +
      '<div class="page-head"><span class="eyebrow">Self-test</span><h1>Test yourself</h1>' +
        '<p class="lede">Multiple choice with an explanation on every answer. Scores are kept per unit, so the home page can point you at your weakest topics.</p></div>' +
      '<div class="card"><h3>What do you want to be asked about?</h3>' +
        '<div class="chips" style="margin-top:.6rem" id="scopeChips">' + chips + '</div>' +
        '<h3 style="margin-top:1.2rem">How many?</h3>' +
        '<div class="chips" style="margin-top:.6rem" id="lenChips">' + lengths + '</div>' +
        '<div class="btn-row" style="margin-top:1.3rem">' +
          '<button class="btn btn-primary" id="quizStart">Start</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  };

  /* ---------------- running ---------------- */

  /* Questions are authored with the correct option written first, so the
     options must be shuffled too, and the answer index moved with them. */
  function shuffleOptions(q) {
    var order = shuffle(q.o.map(function (_, i) { return i; }));
    return {
      u: q.u,
      q: q.q,
      e: q.e,
      o: order.map(function (i) { return q.o[i]; }),
      a: order.indexOf(q.a)
    };
  }

  Q.start = function (scope, len) {
    var qs = shuffle(pool(scope));
    if (len > 0) qs = qs.slice(0, len);
    qs = qs.map(shuffleOptions);
    Q.state = { qs: qs, i: 0, right: 0, wrong: [], answered: false, scope: scope };
    return Q.state.qs.length > 0;
  };

  Q.render = function () {
    var s = Q.state;
    if (!s) return Q.setup({});
    if (s.i >= s.qs.length) return Q.results();

    var q = s.qs[s.i];
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    var opts = q.o.map(function (o, i) {
      return '<button class="opt" data-opt="' + i + '">' +
        '<span class="k">' + letters[i] + '</span><span>' + inline(o) + '</span></button>';
    }).join('');

    return '<div class="wrap"><div class="q-shell">' +
      '<div class="q-meta">' +
        '<span>Question ' + (s.i + 1) + ' of ' + s.qs.length + '</span>' +
        '<span>' + esc(labelFor(q.u)) + '</span>' +
      '</div>' +
      '<div class="progress-bar"><i style="width:' + Math.round(s.i / s.qs.length * 100) + '%"></i></div>' +
      '<p class="q-stem">' + inline(q.q) + '</p>' +
      '<div class="opts" id="qOpts">' + opts + '</div>' +
      '<div id="qFeedback"></div>' +
    '</div></div>';
  };

  Q.answer = function (chosen) {
    var s = Q.state;
    if (!s || s.answered) return;
    var q = s.qs[s.i];
    s.answered = true;

    var correct = chosen === q.a;
    if (correct) s.right++; else s.wrong.push({ q: q, chose: chosen });
    G.recordAnswer(q.u, correct);

    var buttons = document.querySelectorAll('#qOpts .opt');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      if (i === q.a) buttons[i].classList.add('correct');
      else if (i === chosen) buttons[i].classList.add('wrong');
    }

    var fb = document.getElementById('qFeedback');
    if (fb) {
      fb.innerHTML =
        '<div class="explain"><b>' + (correct ? 'Correct.' : 'Not quite.') + '</b> ' + inline(q.e) + '</div>' +
        '<div class="btn-row" style="margin-top:1rem">' +
          '<button class="btn btn-primary" id="qNext">' +
            (s.i + 1 >= s.qs.length ? 'See results' : 'Next question') + '</button>' +
          '<a class="btn" href="#/' + (G.unit(q.u) ? 'unit/' + q.u : 'skills/' + q.u) + '">Read the notes</a>' +
        '</div>';
    }
  };

  Q.next = function () {
    var s = Q.state;
    if (!s) return;
    s.i++;
    s.answered = false;
  };

  Q.results = function () {
    var s = Q.state;
    var total = s.qs.length;
    var pct = total ? Math.round(s.right / total * 100) : 0;

    var verdict = pct >= 85 ? 'Strong. Move on to a topic you have not tested yet.'
      : pct >= 65 ? 'Solid, but the misses below are worth rereading.'
      : pct >= 40 ? 'Patchy. Read the notes for the units listed, then retake this.'
      : 'Start with the notes rather than more questions.';

    var review = s.wrong.map(function (w) {
      return '<div class="card">' +
        '<span class="eyebrow">' + esc(labelFor(w.q.u)) + '</span>' +
        '<p style="margin:.4rem 0 .6rem"><b>' + inline(w.q.q) + '</b></p>' +
        '<p style="color:var(--wrong)">You chose: ' + inline(w.q.o[w.chose]) + '</p>' +
        '<p style="color:var(--veg)">Correct: ' + inline(w.q.o[w.q.a]) + '</p>' +
        '<div class="explain" style="margin-top:.7rem">' + inline(w.q.e) + '</div>' +
        '<div class="btn-row" style="margin-top:.9rem">' +
          '<a class="btn" href="#/' + (G.unit(w.q.u) ? 'unit/' + w.q.u : 'skills/' + w.q.u) + '">Read the notes</a>' +
        '</div></div>';
    }).join('');

    return '<div class="wrap">' +
      '<nav class="crumbs"><a href="#/">Home</a><span aria-hidden="true">/</span><span>Results</span></nav>' +
      '<div class="page-head"><span class="eyebrow">Result</span>' +
        '<div class="score-ring">' + pct + '%</div>' +
        '<h1>' + s.right + ' out of ' + total + '</h1>' +
        '<p class="lede">' + esc(verdict) + '</p></div>' +
      '<div class="btn-row">' +
        '<button class="btn btn-primary" id="quizAgain">Take another</button>' +
        '<a class="btn" href="#/">Back to the start</a>' +
      '</div>' +
      (review ? '<h2 style="margin-top:1rem">What you missed</h2>' + review
              : '<p class="empty-state">Nothing missed.</p>') +
    '</div>';
  };

})(window.GEO);
