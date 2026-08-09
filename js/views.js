/* Block renderer and page views. Every view returns an HTML string. */
(function (G) {
  'use strict';

  var esc = G.esc, inline = G.inline;
  var V = G.views = {};

  /* ---------------- block renderer ---------------- */

  function blocks(list) {
    return (list || []).map(function (b) {
      if (b.p) return '<p>' + inline(b.p) + '</p>';
      if (b.h3) return '<h3>' + inline(b.h3) + '</h3>';
      if (b.ul) return '<ul>' + b.ul.map(function (i) { return '<li>' + inline(i) + '</li>'; }).join('') + '</ul>';
      if (b.ol) return '<ol>' + b.ol.map(function (i) { return '<li>' + inline(i) + '</li>'; }).join('') + '</ol>';
      if (b.tip) return '<div class="tip"><span class="eyebrow">Exam tip</span><p>' + inline(b.tip) + '</p></div>';
      if (b.defs) {
        return '<dl>' + b.defs.map(function (d) {
          return '<div class="defn"><dt>' + inline(d[0]) + '</dt><dd>' + inline(d[1]) + '</dd></div>';
        }).join('') + '</dl>';
      }
      if (b.stats) {
        return '<div class="stat-row">' + b.stats.map(function (s) {
          return '<div class="stat"><span class="s-val">' + esc(s[0]) + '</span>' +
                 '<span class="s-lab">' + inline(s[1]) + '</span></div>';
        }).join('') + '</div>';
      }
      if (b.table) {
        var t = b.table;
        var head = t.head && t.head.length
          ? '<thead><tr>' + t.head.map(function (h) { return '<th>' + inline(h) + '</th>'; }).join('') + '</tr></thead>'
          : '';
        var body = '<tbody>' + t.rows.map(function (row) {
          return '<tr>' + row.map(function (cell) { return '<td>' + inline(cell) + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody>';
        return '<div class="table-scroll"><table>' + head + body + '</table></div>';
      }
      return '';
    }).join('');
  }

  V.blocks = blocks;

  function sections(list) {
    return '<div class="note">' + (list || []).map(function (s) {
      return '<section id="s-' + G.slug(s.h) + '"><h2>' + inline(s.h) + '</h2>' + blocks(s.blocks) + '</section>';
    }).join('') + '</div>';
  }

  function crumbs(parts) {
    return '<nav class="crumbs">' + parts.map(function (p, i) {
      var sep = i ? '<span aria-hidden="true">/</span>' : '';
      return sep + (p.href ? '<a href="' + p.href + '">' + esc(p.label) + '</a>' : '<span>' + esc(p.label) + '</span>');
    }).join('') + '</nav>';
  }

  /* ---------------- home ---------------- */

  V.home = function () {
    var topics = G.allTopics();
    var done = topics.filter(function (t) { return G.topicDone(t.id); }).length;
    var pct = Math.round(done / topics.length * 100);

    var paperTiles = G.papers.map(function (p) {
      var pd = p.topics.filter(function (t) { return G.topicDone(t.id); }).length;
      return '<a class="tile" href="#/paper/' + p.id + '">' +
        '<span class="eyebrow">' + esc(p.paper) + '</span>' +
        '<span class="t-title">' + esc(p.title) + '</span>' +
        '<span class="t-sub">' + esc(p.blurb) + '</span>' +
        '<span class="t-sub"><b>' + pd + ' of ' + p.topics.length + '</b> topics marked revised</span>' +
        '</a>';
    }).join('');

    var weak = G.weakTopics(3).map(function (w) {
      var t = G.topic(w.id) || G.skill(w.id);
      var href = G.topic(w.id) ? '#/topic/' + w.id : '#/skills/' + w.id;
      return '<li><a href="' + href + '">' + esc(t ? t.title : w.id) + '</a> — ' +
             Math.round(w.pct * 100) + '% correct over ' + w.total + ' questions</li>';
    }).join('');

    return '<div class="wrap-wide">' +

      '<div class="hero"><canvas id="heroCanvas" aria-hidden="true"></canvas><div class="hero-in">' +
        '<span class="eyebrow">Cambridge IGCSE · 0460 · 2027–2029</span>' +
        '<h1>Geography revision, organised the way the syllabus is.</h1>' +
        '<p class="lede">Notes for all ' + topics.length + ' topics, ' + G.cases.length + ' case studies with the figures examiners want, ' +
        G.glossary.length + ' definitions and ' + G.questions.length + ' practice questions.</p>' +
        '<div class="btn-row" style="margin-top:.5rem">' +
          '<a class="btn btn-primary" href="#/quiz">Test yourself</a>' +
          '<a class="btn" href="#/topic/rivers">Start with rivers</a>' +
        '</div>' +
      '</div></div>' +

      '<div class="grid grid-2">' +
        '<div class="card">' +
          '<h3>Your progress</h3>' +
          '<p class="t-sub" style="color:var(--dim)">' + done + ' of ' + topics.length + ' topics marked as revised (' + pct + '%)</p>' +
          '<div class="progress-bar" style="margin-top:.7rem"><i style="width:' + pct + '%"></i></div>' +
          (weak ? '<h3 style="margin-top:1.2rem">Worth another look</h3><ul>' + weak + '</ul>' : '') +
        '</div>' +
        V.estimateCard() +
      '</div>' +

      '<div class="grid grid-2">' + paperTiles + '</div>' +

      '<div class="grid grid-3">' +
        '<a class="tile" href="#/cases"><span class="t-title">Case studies</span>' +
          '<span class="t-sub">' + G.cases.length + ' worked examples with statistics</span></a>' +
        '<a class="tile" href="#/glossary"><span class="t-title">Glossary</span>' +
          '<span class="t-sub">' + G.glossary.length + ' definitions, searchable</span></a>' +
        '<a class="tile" href="#/skills"><span class="t-title">Exam skills</span>' +
          '<span class="t-sub">Command words, maps, graphs, fieldwork</span></a>' +
      '</div>' +

    '</div>';
  };

  /* ---------------- estimated exam score ---------------- */

  function scaleBar(e) {
    return '<div class="est-scale">' +
      '<div class="est-track"></div>' +
      '<div class="est-band" style="left:' + e.low + '%;width:' + (e.high - e.low) + '%"></div>' +
      '<div class="est-mark" style="left:calc(' + e.pct + '% - 1.25px)"></div>' +
    '</div>' +
    '<div class="est-ticks"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div>';
  }

  V.estimateCard = function () {
    var e = G.estimate();

    if (!e.ready) {
      var need = [];
      if (e.needQuestions) need.push(e.needQuestions + ' more question' + (e.needQuestions === 1 ? '' : 's'));
      if (e.needTopics) need.push(e.needTopics + ' more topic' + (e.needTopics === 1 ? '' : 's'));
      return '<div class="card"><h3>Estimated exam score</h3>' +
        '<p style="color:var(--dim)">Not enough data yet. Answer ' + esc(need.join(' across ')) +
        ' and an estimate will appear here.</p>' +
        '<div class="btn-row" style="margin-top:.9rem"><a class="btn" href="#/quiz">Test yourself</a></div></div>';
    }

    return '<div class="card"><h3>Estimated exam score</h3>' +
      '<div class="est">' +
        '<div class="est-head">' +
          '<span class="est-num">' + e.pct + '%</span>' +
          '<span class="est-side">likely range <b>' + e.low + '–' + e.high + '%</b><br/>' +
            'indicative grade <b>' + esc(G.gradeFor(e.pct)) + '</b><br/>' +
            '<span class="muted">' + esc(e.confidence) + ' confidence · ' + e.answered + ' questions</span></span>' +
        '</div>' +
        scaleBar(e) +
      '</div>' +
      '<div class="btn-row" style="margin-top:1rem">' +
        '<a class="btn" href="#/estimate">How this is worked out</a>' +
        '<a class="btn" href="#/quiz">Answer more</a>' +
      '</div></div>';
  };

  V.estimate = function () {
    var e = G.estimate();

    var head = crumbs([{ label: 'Home', href: '#/' }, { label: 'Estimated score' }]) +
      '<div class="page-head"><span class="eyebrow">Estimate</span><h1>Estimated exam score</h1>' +
      '<p class="lede">Worked out from your self-test answers. It estimates how much you <b>recall</b>, which is only part of what the exam measures.</p></div>';

    if (!e.ready) {
      return '<div class="wrap">' + head +
        '<div class="card"><p style="color:var(--dim)">There is not enough data yet. Answer at least 20 questions across at least 3 topics.</p>' +
        '<div class="btn-row" style="margin-top:.9rem"><a class="btn btn-primary" href="#/quiz">Test yourself</a></div></div></div>';
    }

    var paperRows = e.papers.map(function (p) {
      return [
        p.paper + ': ' + p.title,
        p.score === null ? 'not tested' : Math.round(p.score * 100) + '%',
        p.covered + ' of ' + p.total,
        String(p.answered)
      ];
    });

    var topicRows = [];
    e.papers.forEach(function (p) {
      p.topics.forEach(function (t) {
        topicRows.push([
          t.title,
          t.n ? Math.round(t.raw * 100) + '%' : '—',
          t.n ? Math.round(t.adj * 100) + '%' : '—',
          t.n ? String(t.n) : 'not tested'
        ]);
      });
    });

    return '<div class="wrap">' + head +

      '<div class="card"><div class="est">' +
        '<div class="est-head">' +
          '<span class="est-num">' + e.pct + '%</span>' +
          '<span class="est-side">likely range <b>' + e.low + '–' + e.high + '%</b><br/>' +
            'indicative grade <b>' + esc(G.gradeFor(e.pct)) + '</b><br/>' +
            '<span class="muted">' + esc(e.confidence) + ' confidence</span></span>' +
        '</div>' +
        scaleBar(e) +
      '</div></div>' +

      '<div class="note">' +

      '<section><h2>How the number is worked out</h2>' +
        blocks([
          { ol: [
            'Your score in each topic is taken from the questions you have answered in it.',
            'That score is **corrected for guessing**. With four options, guessing alone scores about ' +
              Math.round(e.guessRate * 100) + '%, so a raw ' + Math.round(e.guessRate * 100) +
              '% is rescaled to 0 and 100% stays 100%. This is why the estimate is lower than your raw quiz score.',
            'Topics are averaged **within each paper**, so one heavily tested topic cannot dominate.',
            'The two papers are averaged **equally**, because they carry the same marks.',
            'The range widens when you have answered few questions, and when topics are untested.'
          ] }
        ]) +
      '</section>' +

      '<section><h2>By paper</h2>' +
        blocks([{ table: { head: ['Paper', 'Adjusted score', 'Topics tested', 'Questions'], rows: paperRows } }]) +
      '</section>' +

      '<section><h2>By topic</h2>' +
        blocks([{ table: { head: ['Topic', 'Raw', 'Adjusted', 'Questions'], rows: topicRows } }]) +
        '<p class="muted" style="font-size:.88rem">Untested topics are left out of the score rather than counted as zero, ' +
        'which is why testing more of them narrows the range.</p>' +
      '</section>' +

      '<section><h2>What this cannot see</h2>' +
        blocks([
          { p: 'Treat the number as a floor on your knowledge, not a prediction of your grade. Recognising the right answer from four options is easier than producing it on paper, and a large share of the real marks go to things no multiple-choice question can test:' },
          { ul: [
            '**Extended answers**, where marks come from developed points, not single facts',
            '**Case study detail**: naming a place and quoting figures',
            '**Command words**: describing when asked to describe, and judging when asked to evaluate',
            '**Resource questions**: reading maps, graphs and photographs under time pressure',
            '**The fieldwork paper**, which is a whole component this site cannot assess',
            '**Writing quickly enough** to finish the paper'
          ] },
          { tip: 'If the estimate looks good but your written answers do not, the gap is almost always technique. Work through the command words page and practise full past-paper questions rather than more multiple choice.' }
        ]) +
      '</section>' +

      '<section><h2>About the grade</h2>' +
        blocks([
          { p: 'The indicative grade uses rough thresholds: A* at 80%, A at 70%, B at 60%, C at 50%, D at 40%, E at 30%. Cambridge sets the real boundaries **after** each series, based on how hard the paper turned out, so they move by several marks every year. Use it as a rough band, never as a target.' }
        ]) +
      '</section>' +

      '</div>' +

      '<div class="btn-row">' +
        '<a class="btn btn-primary" href="#/quiz">Answer more questions</a>' +
        '<button class="btn" id="resetScores">Clear my scores</button>' +
      '</div>' +
    '</div>';
  };

  /* ---------------- paper ---------------- */

  V.paper = function (id) {
    var p = G.paper(id);
    if (!p) return V.notFound();

    var list = p.topics.map(function (t) {
      var nCase = t.cases.length;
      return '<a class="tile" href="#/topic/' + t.id + '">' +
        '<span class="eyebrow">' + (G.topicDone(t.id) ? 'Revised ✓' : 'Topic') + '</span>' +
        '<span class="t-title">' + esc(t.title) + '</span>' +
        '<span class="t-sub">' + esc(t.blurb) + '</span>' +
        '<span class="t-sub" style="margin-top:.3rem">' + t.sections.length + ' sections' +
          (nCase ? ' · ' + nCase + ' case ' + (nCase === 1 ? 'study' : 'studies') : '') + '</span></a>';
    }).join('');

    return '<div class="wrap-wide">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: p.paper }]) +
      '<div class="page-head"><span class="eyebrow">' + esc(p.paper) + ' · 1 h 45 · 75 marks</span>' +
        '<h1>' + esc(p.title) + '</h1><p class="lede">' + esc(p.blurb) + '</p></div>' +
      '<div class="grid grid-2">' + list + '</div>' +
    '</div>';
  };

  /* ---------------- topic ---------------- */

  V.topic = function (id) {
    var t = G.topic(id);
    if (!t) return V.notFound();

    var covers = t.covers && t.covers.length
      ? '<div class="objectives"><span class="eyebrow">What this covers</span><ul>' +
        t.covers.map(function (o) { return '<li>' + inline(o) + '</li>'; }).join('') + '</ul></div>'
      : '';

    /* Merged topics run long, so give them a jump list. */
    var contents = t.sections.length > 6
      ? '<div class="card"><h3>On this page</h3><ul>' + t.sections.map(function (s) {
          return '<li><a href="#" data-jump="s-' + G.slug(s.h) + '">' + esc(s.h) + '</a></li>';
        }).join('') + '</ul></div>'
      : '';

    var linkedCases = t.cases.map(function (cid) {
      var c = G.caseById(cid);
      if (!c) return '';
      return '<a class="tile" href="#/case/' + c.id + '">' +
        '<span class="eyebrow">' + esc(c.type) + '</span>' +
        '<span class="t-title">' + esc(c.name) + '</span>' +
        '<span class="t-sub">' + esc(c.place) + '</span></a>';
    }).join('');

    var terms = G.topicItems(t.id, G.glossary, 'unit');
    var termList = terms.length
      ? '<div class="card"><h3>Key terms in this topic</h3><dl>' + terms.map(function (x) {
          return '<div class="defn"><dt>' + esc(x.term) + '</dt><dd>' + esc(x.def) + '</dd></div>';
        }).join('') + '</dl></div>'
      : '';

    var nQ = G.topicItems(t.id, G.questions, 'u').length;

    var all = G.allTopics();
    var i = all.map(function (x) { return x.id; }).indexOf(id);
    var prev = i > 0 ? all[i - 1] : null;
    var next = i < all.length - 1 ? all[i + 1] : null;

    return '<div class="wrap">' +
      crumbs([
        { label: 'Home', href: '#/' },
        { label: t.paperTitle, href: '#/paper/' + t.paperId },
        { label: t.title }
      ]) +
      '<div class="page-head"><span class="eyebrow">' + esc(t.paperTitle) + '</span><h1>' + esc(t.title) + '</h1>' +
        '<p class="lede">' + esc(t.blurb) + '</p></div>' +
      covers +
      contents +
      sections(t.sections) +
      (linkedCases ? '<h2 style="margin-top:.5rem">Case studies for this topic</h2><div class="grid grid-2">' + linkedCases + '</div>' : '') +
      termList +
      '<div class="btn-row">' +
        '<button class="btn' + (G.topicDone(id) ? ' btn-primary' : '') + '" data-done="' + esc(id) + '">' +
          (G.topicDone(id) ? 'Revised ✓' : 'Mark as revised') + '</button>' +
        (nQ ? '<a class="btn" href="#/quiz?scope=' + encodeURIComponent(id) + '">Test this topic (' + nQ + ')</a>' : '') +
      '</div>' +
      '<hr class="hr"/>' +
      '<div class="btn-row">' +
        (prev ? '<a class="btn" href="#/topic/' + prev.id + '">← ' + esc(prev.title) + '</a>' : '') +
        (next ? '<a class="btn" href="#/topic/' + next.id + '">' + esc(next.title) + ' →</a>' : '') +
      '</div>' +
    '</div>';
  };

  /* ---------------- case studies ---------------- */

  V.cases = function (query) {
    var filter = query.type || 'all';
    var types = ['all'].concat(G.cases.map(function (c) { return c.type; })
      .filter(function (t, i, arr) { return arr.indexOf(t) === i; }));

    var chips = types.map(function (t) {
      return '<button class="chip' + (t === filter ? ' on' : '') + '" data-casefilter="' + esc(t) + '">' +
        esc(t === 'all' ? 'All ' + G.cases.length : t) + '</button>';
    }).join('');

    var shown = G.cases.filter(function (c) { return filter === 'all' || c.type === filter; });

    var grid = shown.map(function (c) {
      return '<a class="tile" href="#/case/' + c.id + '">' +
        '<span class="eyebrow">' + esc(c.type) + '</span>' +
        '<span class="t-title">' + esc(c.name) + '</span>' +
        '<span class="t-sub">' + esc(c.place) + '</span>' +
        '<span class="t-sub" style="margin-top:.3rem">' + esc(c.summary) + '</span>' +
        '<span class="chips" style="margin-top:.55rem">' +
          G.topicsForCase(c).map(function (tp) {
            return '<span class="chip static">' + esc(tp.title) + '</span>';
          }).join('') +
        '</span></a>';
    }).join('');

    return '<div class="wrap-wide">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: 'Case studies' }]) +
      '<div class="page-head"><span class="eyebrow">Named examples</span><h1>Case studies</h1>' +
        '<p class="lede">Answers that name a place and quote a figure sit a whole level above answers that do not.</p></div>' +
      '<div class="chips">' + chips + '</div>' +
      '<div class="case-grid">' + grid + '</div>' +
    '</div>';
  };

  V.caseStudy = function (id) {
    var c = G.caseById(id);
    if (!c) return V.notFound();

    var statRow = c.stats && c.stats.length
      ? '<div class="stat-row">' + c.stats.map(function (s) {
          return '<div class="stat"><span class="s-val">' + esc(s[0]) + '</span>' +
                 '<span class="s-lab">' + inline(s[1]) + '</span></div>';
        }).join('') + '</div>'
      : '';

    var links = G.topicsForCase(c).map(function (tp) {
      return '<a class="btn" href="#/topic/' + tp.id + '">' + esc(tp.title) + '</a>';
    }).join('');

    return '<div class="wrap">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: 'Case studies', href: '#/cases' }, { label: c.name }]) +
      '<div class="page-head"><span class="eyebrow">' + esc(c.type) + '</span>' +
        '<h1>' + esc(c.name) + '</h1>' +
        '<p class="lede">' + esc(c.place) + '. ' + esc(c.summary) + '</p></div>' +
      statRow +
      sections(c.sections) +
      (links ? '<hr class="hr"/><h3>Use this in</h3><div class="btn-row">' + links + '</div>' : '') +
    '</div>';
  };

  /* ---------------- glossary ---------------- */

  V.glossary = function () {
    var groups = {};
    var order = [];

    function push(key, label, href, term) {
      if (!groups[key]) { groups[key] = { label: label, href: href, items: [] }; order.push(key); }
      groups[key].items.push(term);
    }

    /* Walk the topics in syllabus order so the glossary reads in the same
       order as the sidebar, rather than alphabetically by tag. */
    G.allTopics().forEach(function (t) {
      G.topicItems(t.id, G.glossary, 'unit').forEach(function (term) {
        push(t.id, t.title, '#/topic/' + t.id, term);
      });
    });
    G.skills.forEach(function (s) {
      G.glossary.filter(function (term) { return term.unit === s.id; }).forEach(function (term) {
        push(s.id, s.title, '#/skills/' + s.id, term);
      });
    });

    var body = order.map(function (key) {
      var g = groups[key];
      return '<section class="gl-group" data-group="' + esc(key) + '">' +
        '<h2><a href="' + g.href + '" style="text-decoration:none;color:inherit">' + esc(g.label) + '</a></h2>' +
        '<dl>' + g.items.map(function (t) {
          return '<div class="defn" id="term-' + esc(t.id) + '" data-term="' + esc(t.term.toLowerCase()) + '">' +
            '<dt>' + esc(t.term) + '</dt><dd>' + esc(t.def) + '</dd></div>';
        }).join('') + '</dl></section>';
    }).join('');

    return '<div class="wrap">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: 'Glossary' }]) +
      '<div class="page-head"><span class="eyebrow">Definitions</span><h1>Glossary</h1>' +
        '<p class="lede">' + G.glossary.length + ' terms. Definitions carry marks on their own, so learn the wording, including the units.</p></div>' +
      '<input type="search" id="glFilter" placeholder="Filter terms" aria-label="Filter glossary terms" ' +
        'style="width:100%;height:42px;padding:0 .9rem;border:1px solid var(--line);border-radius:10px;' +
        'background:var(--surface);color:var(--ink);font:inherit"/>' +
      '<div id="glList">' + body + '</div>' +
      '<p class="empty-state" id="glEmpty" hidden>No terms match that.</p>' +
    '</div>';
  };

  /* ---------------- skills ---------------- */

  V.skills = function () {
    var tiles = G.skills.map(function (s) {
      return '<a class="tile" href="#/skills/' + s.id + '">' +
        '<span class="t-title">' + esc(s.title) + '</span>' +
        '<span class="t-sub">' + esc(s.blurb) + '</span></a>';
    }).join('');

    return '<div class="wrap-wide">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: 'Exam skills' }]) +
      '<div class="page-head"><span class="eyebrow">Technique</span><h1>Exam skills</h1>' +
        '<p class="lede">The separate skills paper has gone, but map, graph and data questions are still set inside Papers 1 and 2, and fieldwork is still assessed. Most lost marks are technique, not knowledge.</p></div>' +
      '<div class="grid grid-2">' + tiles + '</div>' +
    '</div>';
  };

  V.skill = function (id) {
    var s = G.skill(id);
    if (!s) return V.notFound();
    var nQ = G.questions.filter(function (q) { return q.u === id; }).length;

    return '<div class="wrap">' +
      crumbs([{ label: 'Home', href: '#/' }, { label: 'Exam skills', href: '#/skills' }, { label: s.title }]) +
      '<div class="page-head"><span class="eyebrow">Exam skills</span><h1>' + esc(s.title) + '</h1>' +
        '<p class="lede">' + esc(s.blurb) + '</p></div>' +
      sections(s.sections) +
      (nQ ? '<div class="btn-row"><a class="btn" href="#/quiz?scope=' + encodeURIComponent(id) + '">Test this (' + nQ + ')</a></div>' : '') +
    '</div>';
  };

  V.notFound = function () {
    return '<div class="wrap"><div class="page-head"><h1>Page not found</h1>' +
      '<p class="lede">That link does not match anything on the site.</p></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/">Back to the start</a></div></div>';
  };

})(window.GEO);
