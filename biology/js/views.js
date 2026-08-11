/* Page views. Each returns { html, mount? }. */
(function () {
  'use strict';
  var R = window.R, S = window.SYL, ST = window.STORE;

  function head(eyebrow, title, lede) {
    return '<div class="page-head">' +
      (eyebrow ? '<div class="eyebrow">' + R.esc(eyebrow) + '</div>' : '') +
      '<h1>' + R.esc(title) + '</h1>' +
      (lede ? '<p class="lede">' + R.inline(lede) + '</p>' : '') + '</div>';
  }

  /* ------------------------------------------------ dashboard */
  function home() {
    var p = ST.overallProgress(), cs = ST.cardStats(), c = S.counts();
    var sessions = ST.state().sessions;
    var last = sessions.slice(-8).reverse();
    var weak = ST.weakSubs(4);
    var streak = ST.streak();

    var next = S.ALL_SUBS.find(function (s) { return !ST.isStudied(s.id); });

    var h = head(S.SPEC.board + ' · ' + S.SPEC.code, 'Everything for IGCSE Biology, in one place',
      'The whole ' + S.SPEC.name + ' specification: **' + c.subs + ' sub-topics**, **' + c.terms +
      ' key terms** on flashcards and **' + c.questions + ' practice questions**. Your progress is saved in this browser.');

    h += '<div class="grid g4">' +
      stat('Syllabus covered', p.pct + '%', p.done + ' of ' + p.total + ' sub-topics') +
      stat('Cards due', cs.due, cs.known + ' known · ' + cs.learning + ' learning') +
      stat('Questions answered', answered(), c.questions + ' in the bank') +
      stat('Study streak', streak + (streak === 1 ? ' day' : ' days'), streak ? 'Keep it going' : 'Study today to start') +
      '</div>';

    h += '<div class="grid g2 mt">';
    h += '<div class="card"><h2>Pick up where you left off</h2>' +
      (next
        ? '<p class="muted">Next unstudied section:</p>' +
        '<a class="subrow" href="#/sub/' + next.id + '"><span class="sid">' + next.id.toUpperCase() + '</span>' +
        '<span class="st">' + R.esc(next.title) + '</span><span class="sm">Topic ' + next.topicId + '</span></a>'
        : '<p class="muted">Every section is marked as studied. Time to test yourself.</p>') +
      '<div class="row mt-s"><a class="btn primary" href="#/cards">Review ' + cs.due + ' cards</a>' +
      '<a class="btn" href="#/quiz">Start a quiz</a>' +
      '<a class="btn" href="#/mock">Sit a timed paper</a></div></div>';

    h += '<div class="card"><h2>Topic progress</h2><div style="display:flex;flex-direction:column;gap:11px">';
    S.TOPICS.forEach(function (t) {
      var tp = ST.topicProgress(t.id);
      h += '<div><div class="spread" style="margin-bottom:4px"><a href="#/topic/' + t.id + '" style="font-size:.88rem;font-weight:600">' +
        t.id + '. ' + R.esc(t.title) + '</a><span class="dim">' + tp.done + '/' + tp.total + '</span></div>' +
        R.bar(tp.pct) + '</div>';
    });
    h += '</div></div></div>';

    if (weak.length) {
      h += '<div class="card mt"><h2>Worth another look</h2>' +
        '<p class="muted">Where your quiz answers have been weakest.</p><div class="sublist">' +
        weak.map(function (w) {
          return '<a class="subrow" href="#/sub/' + w.sub.id + '"><span class="sid">' + w.sub.id.toUpperCase() + '</span>' +
            '<span class="st">' + R.esc(w.sub.title) + '</span><span class="chip ' + (w.pct < 50 ? 'rose' : 'amber') + '">' + w.pct + '%</span></a>';
        }).join('') + '</div></div>';
    }

    if (last.length) {
      h += '<div class="card mt"><h2>Recent quizzes</h2><div class="tablewrap"><table style="width:100%;border-collapse:collapse;font-size:.88rem">' +
        '<thead><tr><th>When</th><th>Scope</th><th>Score</th></tr></thead><tbody>' +
        last.map(function (s) {
          var pct = Math.round(s.score / s.total * 100);
          return '<tr><td>' + R.esc(s.d) + '</td><td>' + R.esc(scopeName(s.scope)) + '</td><td>' + s.score + '/' + s.total + ' (' + pct + '%)</td></tr>';
        }).join('') + '</tbody></table></div></div>';
    }

    h += '<div class="card mt"><h2>How to use this</h2><ol>' +
      '<li><b>Read a sub-topic</b>, then tick <i>Mark as studied</i> at the bottom.</li>' +
      '<li><b>Review the flashcards</b> daily. Cards you get right come back less often; ones you miss come straight back.</li>' +
      '<li><b>Quiz yourself</b> by topic. Multiple choice marks itself; longer answers show a mark scheme so you can mark honestly.</li>' +
      '<li><b>Sit a timed paper</b> once you have covered a few topics. Timing is what most people lose marks to, not knowledge.</li>' +
      '<li>Check <b>Core practicals</b> and <b>Exam skills</b> before the paper — a lot of marks live there.</li>' +
      '</ol></div>';

    return { html: h };
  }

  function answered() {
    var qs = ST.state().qs, n = 0;
    for (var k in qs) if (qs[k].seen) n++;
    return n;
  }
  function scopeName(sc) {
    if (!sc || sc === 'all') return 'Whole syllabus';
    if (sc.indexOf('mock:') === 0) return 'Mock paper — ' + scopeName(sc.slice(5));
    var s = S.sub(sc); if (s) return s.id.toUpperCase() + ' ' + s.title;
    var t = S.topic(sc); if (t) return 'Topic ' + t.id;
    return sc;
  }
  function stat(k, v, s) {
    return '<div class="stat"><div class="k">' + R.esc(k) + '</div><div class="v">' + R.esc(v) + '</div><div class="s">' + R.esc(s) + '</div></div>';
  }

  /* ------------------------------------------------ syllabus index */
  function syllabus() {
    var h = head('Specification ' + S.SPEC.code, 'The full syllabus',
      'Five topics, ' + S.ALL_SUBS.length + ' sub-topics. Both papers can draw on any of it.');
    h += '<div class="grid g2">';
    S.TOPICS.forEach(function (t) {
      var tp = ST.topicProgress(t.id);
      h += '<a class="tcard" href="#/topic/' + t.id + '">' +
        '<div class="th"><span class="tn">' + t.id + '</span><h3>' + R.esc(t.title) + '</h3></div>' +
        '<p>' + R.esc(t.blurb) + '</p>' +
        '<div class="spread" style="margin-bottom:5px"><span class="dim">' + t.subs.length + ' sub-topics</span>' +
        '<span class="dim">' + tp.pct + '%</span></div>' + R.bar(tp.pct) + '</a>';
    });
    h += '</div>';
    return { html: h };
  }

  /* ------------------------------------------------ one topic */
  function topic(id) {
    var t = S.topic(id);
    if (!t) return notFound();
    var tp = ST.topicProgress(id);
    var nq = t.subs.reduce(function (a, s) { return a + s.qs.length; }, 0);
    var nt = t.subs.reduce(function (a, s) { return a + s.terms.length; }, 0);

    var h = '<div class="crumb"><a href="#/syllabus">Syllabus</a> › Topic ' + t.id + '</div>';
    h += head('Topic ' + t.id, t.title, t.blurb);
    h += '<div class="row" style="margin-bottom:18px">' +
      '<span class="chip accent">' + tp.done + '/' + tp.total + ' studied</span>' +
      '<span class="chip">' + nt + ' key terms</span>' +
      '<span class="chip">' + nq + ' questions</span>' +
      '<a class="btn sm" href="#/quiz?scope=' + t.id + '">Quiz this topic</a>' +
      '<a class="btn sm" href="#/cards?scope=' + t.id + '">Cards for this topic</a></div>';

    h += '<div class="sublist">' + t.subs.map(subRow).join('') + '</div>';
    return { html: h };
  }

  function subRow(s) {
    var done = ST.isStudied(s.id);
    return '<a class="subrow' + (done ? ' done' : '') + '" href="#/sub/' + s.id + '">' +
      '<span class="sid">' + s.id.toUpperCase() + '</span>' +
      '<span class="st">' + R.esc(s.title) + '</span>' +
      '<span class="sm">' + s.terms.length + ' terms · ' + s.qs.length + ' Qs</span>' +
      '<span class="tick">✓</span></a>';
  }

  /* ------------------------------------------------ one sub-topic */
  function sub(id) {
    var s = S.sub(id);
    if (!s) return notFound();
    var done = ST.isStudied(id);
    var prev = S.prevSub(id), next = S.nextSub(id);

    var h = '<div class="crumb"><a href="#/syllabus">Syllabus</a> › <a href="#/topic/' + s.topicId + '">Topic ' + s.topicId + '</a> › ' + R.esc(s.title) + '</div>';
    h += head(s.id.toUpperCase(), s.title, '');
    if (s.objectives.length) {
      h += '<div class="card" style="margin-bottom:22px"><h3 style="margin-bottom:9px">You need to be able to</h3>' + R.objectives(s.objectives) + '</div>';
    }
    h += '<div class="notes">' + R.blocks(s.notes) + '</div>';

    if (s.terms.length) {
      h += '<h2 class="mt">Key terms</h2>' + R.terms(s.terms);
    }

    h += '<div class="card mt"><div class="spread">' +
      '<label class="check"><input type="checkbox" id="studiedBox"' + (done ? ' checked' : '') + '/> <span>Mark this sub-topic as studied</span></label>' +
      '<div class="row">' +
      (s.qs.length ? '<a class="btn sm" href="#/quiz?scope=' + s.id + '">Quiz these ' + s.qs.length + ' questions</a>' : '') +
      (s.terms.length ? '<a class="btn sm" href="#/cards?scope=' + s.id + '">Revise ' + s.terms.length + ' cards</a>' : '') +
      '</div></div></div>';

    h += '<div class="pager">' +
      (prev ? '<a class="btn" href="#/sub/' + prev.id + '">← ' + R.esc(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="btn" href="#/sub/' + next.id + '">' + R.esc(next.title) + ' →</a>' : '<span></span>') +
      '</div>';

    return {
      html: h,
      mount: function (root) {
        var box = root.querySelector('#studiedBox');
        if (box) box.addEventListener('change', function () {
          ST.setStudied(id, box.checked);
          window.APP.refreshSidebar();
        });
      }
    };
  }

  /* ------------------------------------------------ core practicals */
  function practicals() {
    var list = window.BIO_PRACTICALS || [];
    var h = head('Required practical work', 'Core practicals',
      'The experiments named in the specification. Examiners ask for the method, the control variables and the reason behind each step.');
    h += list.map(function (p) {
      return '<details class="acc"><summary><span>' + R.esc(p.title) + '</span>' +
        '<span class="chip">' + R.esc(p.topic) + '</span></summary>' +
        '<div class="acc-body notes">' + R.blocks(p.body) + '</div></details>';
    }).join('');
    return { html: h };
  }

  /* ------------------------------------------------ exam skills */
  function exam() {
    var e = window.BIO_EXAM || {};
    var h = head('Papers, command words and technique', 'Exam skills',
      'How ' + S.SPEC.code + ' is assessed, and the habits that pick up marks in every paper.');

    h += '<div class="grid g2">';
    h += '<div class="card"><h2>The papers</h2><div class="tablewrap"><table style="width:100%;border-collapse:collapse;font-size:.9rem">' +
      '<thead><tr><th>Paper</th><th>Length</th><th>Marks</th><th>Weighting</th></tr></thead><tbody>' +
      S.SPEC.papers.map(function (p) {
        return '<tr><td>Paper ' + p.n + '</td><td>' + p.time + '</td><td>' + p.marks + '</td><td>' + p.weight + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<p class="dim">Both papers are assessed by written exam, graded 9–1, with a calculator allowed. Paper 2 also draws on the extra higher-demand content flagged in the official specification, so check the spec document for which points those are.</p></div>';

    h += '<div class="card"><h2>Marks to bank</h2>' + R.blocks(e.quickWins || []) + '</div>';
    h += '</div>';

    h += '<h2 class="mt">Command words</h2><p class="muted">Answer the verb that is actually written on the paper.</p>' +
      R.blocks([{ t: 'table', head: ['Command word', 'What the examiner wants'], rows: e.commands || [] }]);

    h += '<h2 class="mt">Maths and practical skills</h2>' + R.blocks(e.maths || []);
    h += '<h2 class="mt">Six-mark answers</h2>' + R.blocks(e.longAnswers || []);
    h += '<h2 class="mt">Things students lose marks on every year</h2>' + R.blocks(e.pitfalls || []);
    return { html: h };
  }

  /* ------------------------------------------------ glossary */
  function glossary() {
    var terms = S.allTerms().slice().sort(function (a, b) { return a.t.toLowerCase() < b.t.toLowerCase() ? -1 : 1; });
    var letters = {};
    terms.forEach(function (t) {
      var L = t.t[0].toUpperCase();
      (letters[L] || (letters[L] = [])).push(t);
    });
    var keys = Object.keys(letters).sort();

    var h = head('Every definition in one list', 'Glossary', terms.length + ' key terms from across the whole specification.');
    h += '<div class="row" style="margin-bottom:18px">' + keys.map(function (k) {
      return '<a class="chip" href="#g-' + k + '">' + k + '</a>';
    }).join('') + '</div>';
    keys.forEach(function (k) {
      h += '<h2 id="g-' + k + '">' + k + '</h2><div class="terms">' + letters[k].map(function (t) {
        return '<div class="term"><b>' + R.inline(t.t) + '</b><span>' + R.inline(t.d) + '</span>' +
          '<a class="dim" href="#/sub/' + t.sub + '" style="display:block;margin-top:5px">' + t.sub.toUpperCase() + ' ' + R.esc(t.subTitle) + '</a></div>';
      }).join('') + '</div>';
    });
    return { html: h };
  }

  /* ------------------------------------------------ progress page */
  function progress() {
    var p = ST.overallProgress(), cs = ST.cardStats(), acc = ST.topicAccuracy();
    var h = head('Your data', 'Progress', 'Stored only in this browser, under the key `bio4bi1.v1`. Clearing site data wipes it, so export a copy if it matters.');

    h += '<div class="grid g4">' +
      stat('Sub-topics studied', p.done + '/' + p.total, p.pct + '% of the syllabus') +
      stat('Cards known', cs.known, 'box 4 or 5 of 5') +
      stat('Cards due now', cs.due, cs.unseen + ' never seen') +
      stat('Study days', ST.state().days.length, 'streak: ' + ST.streak()) + '</div>';

    h += '<div class="card mt"><h2>Quiz accuracy by topic</h2>';
    var any = false;
    S.TOPICS.forEach(function (t) {
      var a = acc[t.id]; if (!a) return; any = true;
      var pct = Math.round(a.right / a.seen * 100);
      h += '<div style="margin-bottom:11px"><div class="spread" style="margin-bottom:4px">' +
        '<span style="font-size:.88rem;font-weight:600">' + t.id + '. ' + R.esc(t.title) + '</span>' +
        '<span class="dim">' + a.right + '/' + a.seen + ' · ' + pct + '%</span></div>' + R.bar(pct) + '</div>';
    });
    if (!any) h += '<p class="muted">Answer some quiz questions and your accuracy will show up here.</p>';
    h += '</div>';

    h += '<div class="card mt"><h2>Back up or move your progress</h2>' +
      '<p class="muted">Copy the text below to save it, or paste a saved copy in and load it.</p>' +
      '<textarea id="ioBox" rows="6" style="width:100%;font-family:var(--mono);font-size:.78rem;padding:10px;border-radius:9px;border:1px solid var(--line);background:var(--surface-2);color:var(--text)"></textarea>' +
      '<div class="row mt-s"><button class="btn sm" data-act="export">Fill with my progress</button>' +
      '<button class="btn sm" data-act="import">Load from the box</button>' +
      '<span id="ioMsg" class="dim"></span></div></div>';

    h += '<div class="card mt"><h2>Reset</h2><p class="muted">There is no undo.</p><div class="row">' +
      '<button class="btn sm" data-act="reset-studied">Clear studied ticks</button>' +
      '<button class="btn sm" data-act="reset-cards">Reset flashcards</button>' +
      '<button class="btn sm" data-act="reset-qs">Reset quiz history</button>' +
      '<button class="btn sm" data-act="reset-all">Erase everything</button></div></div>';

    return {
      html: h,
      mount: function (root) {
        var box = root.querySelector('#ioBox'), msg = root.querySelector('#ioMsg');
        root.addEventListener('click', function (ev) {
          var b = ev.target.closest('[data-act]'); if (!b) return;
          var a = b.dataset.act;
          if (a === 'export') { box.value = ST.exportJSON(); box.select(); msg.textContent = 'Copied into the box — now copy it somewhere safe.'; return; }
          if (a === 'import') {
            try { ST.importJSON(box.value); msg.textContent = 'Loaded.'; window.APP.go(location.hash, true); }
            catch (e) { msg.textContent = 'That did not look like saved progress.'; }
            return;
          }
          if (a.indexOf('reset-') === 0) {
            var what = a.slice(6);
            var label = { studied: 'the studied ticks', cards: 'all flashcard progress', qs: 'all quiz history', all: 'everything' }[what];
            if (confirm('Erase ' + label + '? This cannot be undone.')) {
              ST.reset(what); window.APP.refreshSidebar(); window.APP.go(location.hash, true);
            }
          }
        });
      }
    };
  }

  /* ------------------------------------------------ search */
  function search(q) {
    var query = (q || '').trim();
    var h = head('Search', query ? '“' + query + '”' : 'Search the syllabus', '');
    if (query.length < 2) {
      h += '<p class="muted">Type at least two letters.</p>';
      return { html: h };
    }
    var needle = query.toLowerCase();
    var hits = [];

    S.ALL_SUBS.forEach(function (s) {
      var text = S.subText(s);
      var i = text.toLowerCase().indexOf(needle);
      if (i > -1) {
        hits.push({
          score: s.title.toLowerCase().indexOf(needle) > -1 ? 0 : 1,
          href: '#/sub/' + s.id,
          title: s.id.toUpperCase() + ' · ' + s.title,
          sub: 'Topic ' + s.topicId + ' — ' + s.topicTitle,
          snip: snippet(text, i, needle.length)
        });
      }
    });
    S.allTerms().forEach(function (t) {
      if (t.t.toLowerCase().indexOf(needle) > -1) {
        hits.push({ score: -1, href: '#/sub/' + t.sub, title: t.t, sub: 'Key term · ' + t.sub.toUpperCase() + ' ' + t.subTitle, snip: t.d });
      }
    });
    (window.BIO_PRACTICALS || []).forEach(function (p, i) {
      if (p.title.toLowerCase().indexOf(needle) > -1) {
        hits.push({ score: 0, href: '#/practicals', title: p.title, sub: 'Core practical · ' + p.topic, snip: '' });
      }
    });

    hits.sort(function (a, b) { return a.score - b.score; });
    if (!hits.length) {
      h += '<div class="empty">Nothing matched “' + R.esc(query) + '”.</div>';
    } else {
      h += '<p class="muted">' + hits.length + ' result' + (hits.length === 1 ? '' : 's') + '.</p><div class="result-list">' +
        hits.slice(0, 60).map(function (x) {
          return '<a class="hit" href="' + x.href + '"><b>' + R.esc(x.title) + '</b><small>' + R.esc(x.sub) + '</small>' +
            (x.snip ? '<span class="dim">' + x.snip + '</span>' : '') + '</a>';
        }).join('') + '</div>';
    }
    return { html: h };
  }

  function snippet(text, i, len) {
    var from = Math.max(0, i - 70), to = Math.min(text.length, i + len + 90);
    return (from ? '…' : '') + R.esc(text.slice(from, i)) + '<mark>' + R.esc(text.slice(i, i + len)) + '</mark>' +
      R.esc(text.slice(i + len, to)) + (to < text.length ? '…' : '');
  }

  function notFound() {
    return { html: '<div class="empty"><h1>Not found</h1><p>That page does not exist. <a href="#/home">Back to the dashboard</a>.</p></div>' };
  }

  window.VIEWS = {
    home: home, syllabus: syllabus, topic: topic, sub: sub,
    practicals: practicals, exam: exam, glossary: glossary,
    progress: progress, search: search, notFound: notFound, head: head, stat: stat
  };
})();
