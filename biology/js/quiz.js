/* Quiz engine: auto-marked multiple choice plus self-marked written answers. */
(function () {
  'use strict';
  var R = window.R, S = window.SYL, ST = window.STORE;

  var qs = [], pos = 0, answers = [], session = null, revealed = false, picked = -1;
  var opts = { scope: 'all', size: 10, type: 'mix', order: 'random' };

  function build() {
    var pool = S.questions(opts.scope);
    if (opts.type === 'mcq') pool = pool.filter(function (q) { return q.t === 'mcq'; });
    if (opts.type === 'saq') pool = pool.filter(function (q) { return q.t === 'saq'; });

    if (opts.order === 'weak') {
      pool.sort(function (a, b) { return score(a) - score(b); });
    } else {
      for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = pool[i]; pool[i] = pool[j]; pool[j] = t; }
    }
    qs = opts.size ? pool.slice(0, opts.size) : pool;
    pos = 0; answers = []; revealed = false; picked = -1;
    session = { right: 0, total: qs.length };
  }
  function score(q) {
    var st = ST.qStat(q.key);
    if (!st.seen) return 0.5;              // unseen questions sit in the middle
    return st.right / st.seen;
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
  function field(label, control) {
    return '<label style="display:block"><span class="dim" style="display:block;margin-bottom:5px">' + label + '</span>' + control + '</label>';
  }
  function opt(v, label, sel) { return '<option value="' + v + '"' + (v === sel ? ' selected' : '') + '>' + label + '</option>'; }

  function setup() {
    var c = S.counts();
    var h = window.VIEWS.head('Test yourself', 'Quiz',
      c.questions + ' questions across the whole specification. Multiple choice marks itself; written answers come with a mark scheme so you can mark your own.');

    h += '<div class="card"><h2>Set up a quiz</h2><div class="grid g2" style="margin-bottom:14px">' +
      field('Questions from', '<select id="qScope">' + scopeOptions(opts.scope) + '</select>') +
      field('How many', '<select id="qSize">' + opt('5', '5 questions', String(opts.size)) +
        opt('10', '10 questions', String(opts.size)) + opt('20', '20 questions', String(opts.size)) +
        opt('0', 'Everything in range', String(opts.size)) + '</select>') +
      field('Question type', '<select id="qType">' + opt('mix', 'Mixed', opts.type) +
        opt('mcq', 'Multiple choice only', opts.type) + opt('saq', 'Written answers only', opts.type) + '</select>') +
      field('Order', '<select id="qOrder">' + opt('random', 'Random', opts.order) +
        opt('weak', 'My weakest first', opts.order) + '</select>') +
      '</div><button class="btn primary" id="startQuiz">Start</button></div>';

    var weak = ST.weakSubs(5);
    if (weak.length) {
      h += '<div class="card mt"><h2>Straight to a weak spot</h2><div class="sublist">' +
        weak.map(function (w) {
          return '<a class="subrow" href="#/quiz?scope=' + w.sub.id + '"><span class="sid">' + w.sub.id.toUpperCase() + '</span>' +
            '<span class="st">' + R.esc(w.sub.title) + '</span><span class="chip ' + (w.pct < 50 ? 'rose' : 'amber') + '">' + w.pct + '%</span></a>';
        }).join('') + '</div></div>';
    }

    return {
      html: h,
      mount: function (root) {
        root.querySelector('#startQuiz').addEventListener('click', function () {
          opts.scope = root.querySelector('#qScope').value;
          opts.size = parseInt(root.querySelector('#qSize').value, 10) || 0;
          opts.type = root.querySelector('#qType').value;
          opts.order = root.querySelector('#qOrder').value;
          build();
          if (!qs.length) { alert('No questions match that combination.'); session = null; return; }
          window.APP.render(view({ started: true }));
        });
      }
    };
  }

  function strip() {
    return '<div class="progress-strip">' + qs.map(function (_, i) {
      var a = answers[i];
      return '<i class="' + (a ? (a.right ? 'ok' : 'no') : i === pos ? 'now' : '') + '"></i>';
    }).join('') + '</div>';
  }

  function running() {
    if (pos >= qs.length) return results();
    var q = qs[pos];
    var h = '<div class="qwrap">';
    h += '<div class="qmeta"><span>Question ' + (pos + 1) + ' of ' + qs.length + '</span>' +
      '<span>' + R.esc(q.sub.toUpperCase() + ' ' + q.subTitle) + '</span></div>';
    h += strip();
    h += '<div class="qtext">' + R.inline(q.q) + (q.t === 'saq' ? ' <span class="chip">' + q.m + ' mark' + (q.m === 1 ? '' : 's') + '</span>' : '') + '</div>';

    if (q.t === 'mcq') {
      h += '<div class="opts">' + q.o.map(function (o, i) {
        var cls = '';
        if (revealed) {
          if (i === q.a) cls = ' right';
          else if (i === picked) cls = ' wrong';
        }
        return '<button class="opt' + cls + '" data-pick="' + i + '"' + (revealed ? ' disabled' : '') + '>' +
          '<span class="lt">' + 'ABCDEF'[i] + '</span><span>' + R.inline(o) + '</span></button>';
      }).join('') + '</div>';
      if (revealed) {
        h += '<div class="ms"><h4>' + (picked === q.a ? 'Correct' : 'Not this time') + '</h4><p style="margin:0">' + R.inline(q.e || q.o[q.a]) + '</p></div>';
        h += nextBtn(q);
      }
    } else {
      h += '<textarea id="myAnswer" rows="5" placeholder="Write your answer here first — then check it against the mark scheme." style="width:100%;padding:11px;border-radius:9px;border:1px solid var(--line);background:var(--surface);color:var(--text);font:inherit;font-size:.95rem;margin-bottom:14px"></textarea>';
      if (!revealed) {
        h += '<button class="btn primary" data-reveal="1">Show the mark scheme</button>';
      } else {
        h += '<div class="ms"><h4>Mark scheme — ' + q.m + ' mark' + (q.m === 1 ? '' : 's') + '</h4><ul>' +
          q.ms.map(function (m) { return '<li>' + R.inline(m) + '</li>'; }).join('') + '</ul></div>';
        h += '<p class="dim">Mark yourself honestly. Did you make the points above?</p>' +
          '<div class="selfmark"><button class="btn" data-self="0">Not quite</button>' +
          '<button class="btn primary" data-self="1">I made those points</button></div>';
      }
    }

    h += '<p class="dim mt" style="text-align:center"><a href="#/sub/' + q.sub + '">Read the notes for ' + R.esc(q.subTitle) + '</a></p>';
    h += '</div>';
    return { html: h, mount: mountRunning };
  }

  function nextBtn(q) {
    return '<div class="row"><button class="btn primary" data-next="1">' +
      (pos === qs.length - 1 ? 'See my score' : 'Next question') + '</button></div>';
  }

  function mountRunning(root) {
    root.addEventListener('click', function (ev) {
      var p = ev.target.closest('[data-pick]');
      if (p && !revealed) {
        picked = parseInt(p.dataset.pick, 10);
        var q = qs[pos], right = picked === q.a;
        revealed = true;
        answers[pos] = { right: right, picked: picked, q: q };
        ST.gradeQ(q.key, right);
        if (right) session.right++;
        window.APP.render(view({ started: true }));
        return;
      }
      if (ev.target.closest('[data-reveal]')) { revealed = true; window.APP.render(view({ started: true })); return; }
      var sm = ev.target.closest('[data-self]');
      if (sm) {
        var ok = sm.dataset.self === '1', qq = qs[pos];
        answers[pos] = { right: ok, q: qq };
        ST.gradeQ(qq.key, ok);
        if (ok) session.right++;
        pos++; revealed = false; picked = -1;
        window.APP.render(view({ started: true }));
        return;
      }
      if (ev.target.closest('[data-next]')) {
        pos++; revealed = false; picked = -1;
        window.APP.render(view({ started: true }));
      }
    });
  }

  function results() {
    var pct = Math.round(session.right / session.total * 100);
    if (!session.logged) { ST.logSession(opts.scope, session.right, session.total); session.logged = true; window.APP.refreshSidebar(); }
    var msg = pct >= 85 ? 'Strong. Move on to the next topic.'
      : pct >= 65 ? 'Solid, but reread the ones you missed.'
        : pct >= 40 ? 'Worth going back over the notes for this.'
          : 'Read the notes again before retrying — this one needs time, not another quiz.';

    var h = '<div class="qwrap">' +
      '<div class="center"><h1>' + session.right + ' / ' + session.total + '</h1>' +
      '<p class="lede" style="margin:0 auto 8px">' + pct + '% — ' + msg + '</p></div>' +
      strip() +
      '<div class="row mt" style="justify-content:center">' +
      '<button class="btn primary" id="retry">Another quiz</button>' +
      '<button class="btn" id="redoWrong"' + (session.right === session.total ? ' disabled' : '') + '>Redo the ones I missed</button>' +
      '<a class="btn ghost" href="#/home">Dashboard</a></div>';

    h += '<h2 class="mt">Your answers</h2><div class="sublist">' +
      answers.map(function (a, i) {
        if (!a) return '';
        return '<a class="subrow" href="#/sub/' + a.q.sub + '">' +
          '<span class="chip ' + (a.right ? 'accent' : 'rose') + '">' + (a.right ? '✓' : '✗') + '</span>' +
          '<span class="st" style="font-weight:500">' + R.inline(a.q.q) + '</span>' +
          '<span class="sm">' + a.q.sub.toUpperCase() + '</span></a>';
      }).join('') + '</div></div>';

    return {
      html: h,
      mount: function (root) {
        root.querySelector('#retry').addEventListener('click', function () { session = null; window.APP.render(view({})); });
        var rw = root.querySelector('#redoWrong');
        if (rw) rw.addEventListener('click', function () {
          var wrong = answers.filter(function (a) { return a && !a.right; }).map(function (a) { return a.q; });
          if (!wrong.length) return;
          qs = wrong; pos = 0; answers = []; revealed = false; picked = -1;
          session = { right: 0, total: qs.length };
          window.APP.render(view({ started: true }));
        });
      }
    };
  }

  function view(params) {
    if (params && params.scope && !params.started) { opts.scope = params.scope; session = null; }
    if (!session) return setup();
    return running();
  }

  window.QUIZ = { view: view, reset: function () { session = null; } };
})();
