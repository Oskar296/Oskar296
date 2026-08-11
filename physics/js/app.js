/* IGCSE Physics (Edexcel 4PH1) study app - view logic and progress tracking. */
(function () {
'use strict';

var KEY = 'igcse-phys-4ph1-v1';
var view = document.getElementById('view');
var tabsEl = document.getElementById('tabs');
var searchEl = document.getElementById('search');

var TABS = [
  { id:'home',      label:'Overview' },
  { id:'equations', label:'Equations' },
  { id:'practicals',label:'Practicals' },
  { id:'glossary',  label:'Definitions' },
  { id:'cards',     label:'Flashcards' },
  { id:'quiz',      label:'Quiz' },
  { id:'exam',      label:'Exam Qs' },
  { id:'drills',    label:'Drills' },
  { id:'technique', label:'Technique' }
];

var state = load();
var route = { tab:'home', section:null };

function load() {
  var d = { progress:{}, theme:'dark' };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var p = JSON.parse(raw);
      if (p && typeof p === 'object') {
        d.progress = p.progress || {};
        d.theme = p.theme === 'light' ? 'light' : 'dark';
      }
    }
  } catch (e) { /* storage blocked or corrupt - carry on with defaults */ }
  return d;
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
}

/* ---------- helpers ---------- */
function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
  });
}
function el(html) {
  var t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function allPoints() {
  var out = [];
  SPEC.sections.forEach(function (sec) {
    sec.topics.forEach(function (top) {
      top.points.forEach(function (p) { out.push({ sec:sec, top:top, p:p }); });
    });
  });
  return out;
}
function sectionPoints(sec) {
  var out = [];
  sec.topics.forEach(function (t) { t.points.forEach(function (p) { out.push(p); }); });
  return out;
}
function statusOf(ref) { return state.progress[ref] || 0; }
function countBy(points, v) {
  var n = 0;
  points.forEach(function (p) { if (statusOf(p.n) === v) n++; });
  return n;
}
function toast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(function () { t.classList.remove('show'); }, 1800);
}
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}
/* Section accents are tuned for the dark theme; darken them for the light theme
   so coloured headings keep enough contrast on white. */
function secColour(sec) {
  if (state.theme !== 'light') return sec.colour;
  var m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(sec.colour);
  if (!m) return sec.colour;
  var c = [1, 2, 3].map(function (i) {
    return Math.round(parseInt(m[i], 16) * 0.58);
  });
  return 'rgb(' + c.join(',') + ')';
}
function track(pct, colour) {
  return '<div class="track"><i style="width:' + pct + '%' +
    (colour ? ';background:' + colour : '') + '"></i></div>';
}

/* ---------- chrome ---------- */
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}
function renderTabs() {
  tabsEl.innerHTML = '';
  TABS.forEach(function (t) {
    var b = el('<button' + (route.tab === t.id ? ' class="on"' : '') + '>' + t.label + '</button>');
    b.onclick = function () { go(t.id); };
    tabsEl.appendChild(b);
  });
}
function renderHeaderProgress() {
  var pts = allPoints().map(function (x) { return x.p; });
  var done = countBy(pts, 2);
  var pct = Math.round(done / pts.length * 100);
  document.getElementById('hdrProg').innerHTML =
    track(pct) + '<span class="mono">' + done + '/' + pts.length + ' confident</span>';
}
function go(tab, section) {
  route.tab = tab;
  route.section = section === undefined ? null : section;
  searchEl.value = '';
  renderTabs();
  render();
  window.scrollTo(0, 0);
}

/* ---------- views ---------- */
function render() {
  renderHeaderProgress();
  if (route.section !== null) return viewSection(route.section);
  ({
    home: viewHome,
    equations: viewEquations,
    practicals: viewPracticals,
    glossary: viewGlossary,
    cards: viewCards,
    quiz: viewQuiz,
    exam: viewExam,
    drills: viewDrills,
    technique: viewTechnique
  }[route.tab] || viewHome)();
}

function viewHome() {
  var pts = allPoints().map(function (x) { return x.p; });
  var conf = countBy(pts, 2), learn = countBy(pts, 1);
  var p2 = pts.filter(function (p) { return p.p2; }).length;
  var examMarks = EXAMQS.reduce(function (n, q) {
    return n + q.parts.reduce(function (m, p) { return m + p.marks; }, 0);
  }, 0);

  var h = '<h1>The whole Edexcel IGCSE Physics course</h1>' +
    '<p class="lede">All eight sections of the Pearson Edexcel International GCSE Physics specification (4PH1), ' +
    'with every learning objective, an explanation of what it actually means, the equations, the core practicals ' +
    'and the definitions. Tick points off as you learn them and your progress is saved in this browser.</p>' +
    '<div class="stats">' +
      '<div class="stat"><div class="v">' + pts.length + '</div><div class="k">Spec points</div></div>' +
      '<div class="stat"><div class="v" style="color:var(--good)">' + conf + '</div><div class="k">Confident</div></div>' +
      '<div class="stat"><div class="v" style="color:var(--warn)">' + learn + '</div><div class="k">Still learning</div></div>' +
      '<div class="stat"><div class="v">' + EQUATIONS.length + '</div><div class="k">Equations</div></div>' +
      '<div class="stat"><div class="v">' + PRACTICALS.length + '</div><div class="k">Core practicals</div></div>' +
      '<div class="stat"><div class="v" style="color:var(--p2)">' + p2 + '</div><div class="k">Physics only</div></div>' +
      '<div class="stat"><div class="v">' + QUESTIONS.length + '</div><div class="k">Quiz questions</div></div>' +
      '<div class="stat"><div class="v">' + examMarks + '</div><div class="k">Exam marks</div></div>' +
      '<div class="stat"><div class="v">' + GLOSSARY.length + '</div><div class="k">Definitions</div></div>' +
    '</div>' +
    '<h2>Sections</h2><div class="grid" id="secGrid"></div>' +
    '<h2>How the exam works</h2>' +
    '<div class="row"><div class="rt">Paper 1 · 2 hours · 110 marks · 61.1%</div>' +
      '<div class="rw">Covers all the non-bold content from sections 1 to 8. Short answers, calculations and ' +
      'extended writing.</div></div>' +
    '<div class="row"><div class="rt">Paper 2 · 1 hour 15 minutes · 70 marks · 38.9%</div>' +
      '<div class="rw">Targets the <span class="pill p2">Physics only</span> content shown in bold in the ' +
      'specification, and can also draw on anything from Paper 1. Points carrying that tag in this app are the ' +
      'ones to prioritise for Paper 2.</div></div>' +
    '<div class="row"><div class="rt">No formula sheet</div>' +
      '<div class="rw">Plan to recall every equation in the Equations tab from memory, including the rearrangements. ' +
      'Check the front page of your most recent past paper to confirm what your series provides.</div></div>';

  view.innerHTML = h;
  var grid = document.getElementById('secGrid');
  SPEC.sections.forEach(function (sec) {
    var sp = sectionPoints(sec);
    var d = countBy(sp, 2);
    var pct = Math.round(d / sp.length * 100);
    var card = el(
      '<button class="sec-card" style="border-top:3px solid ' + secColour(sec) + '">' +
        '<span class="num" style="color:' + secColour(sec) + '">SECTION ' + sec.id + '</span>' +
        '<span class="ttl">' + esc(sec.title) + '</span>' +
        '<span class="sub">' + sp.length + ' spec points · ' + sec.topics.length + ' topics</span>' +
        track(pct, secColour(sec)) +
        '<span class="foot"><span>' + pct + '% confident</span><span>' + d + '/' + sp.length + '</span></span>' +
      '</button>');
    card.onclick = function () { route.tab = 'home'; go('home', sec.id); };
    grid.appendChild(card);
  });
}

function viewSection(id) {
  var sec = SPEC.sections.filter(function (s) { return s.id === id; })[0];
  if (!sec) return go('home');
  var sp = sectionPoints(sec);
  var pct = Math.round(countBy(sp, 2) / sp.length * 100);

  view.innerHTML =
    '<button class="backlink" id="back">← All sections</button>' +
    '<h1 style="color:' + secColour(sec) + '">' + sec.id + '. ' + esc(sec.title) + '</h1>' +
    '<p class="lede">' + esc(sec.blurb) + '</p>' +
    track(pct, secColour(sec)) +
    '<p style="font-size:12px;color:var(--dim);margin:7px 0 24px">' + countBy(sp, 2) + ' of ' + sp.length +
    ' points marked confident · ' + countBy(sp, 1) + ' still learning</p>' +
    '<div id="topics"></div>';

  document.getElementById('back').onclick = function () { go('home'); };
  var wrap = document.getElementById('topics');

  sec.topics.forEach(function (top) {
    var box = el('<div class="topic"><div class="topic-h"><span class="tid">' + top.id +
      '</span><span class="tname">' + esc(top.title) + '</span></div></div>');
    top.points.forEach(function (p) { box.appendChild(pointNode(p, sec)); });
    wrap.appendChild(box);
  });
}

function pointNode(p, sec) {
  var st = statusOf(p.n);
  var tags = '';
  if (p.p2) tags += '<span class="pill p2">Physics only</span> ';
  if (p.cp) tags += '<span class="pill cp">Core practical</span> ';
  if (p.eq) tags += '<span class="pill eq">Equation</span> ';

  var node = el(
    '<div class="pt' + (st ? ' s' + st : '') + '">' +
      '<div class="pt-h">' +
        '<span class="ref">' + p.n + '</span>' +
        '<span class="obj">' + esc(p.t) + (tags ? '<span class="tags">' + tags + '</span>' : '') + '</span>' +
        '<span class="caret">▶</span>' +
      '</div>' +
      '<div class="pt-b">' +
        (p.eq ? '<code class="eqbox">' + esc(p.eq) + '</code>' : '') +
        (p.note ? '<div>' + esc(p.note) + '</div>' : '') +
        '<div class="status">' +
          '<button data-v="0">Not started</button>' +
          '<button data-v="1">Learning</button>' +
          '<button data-v="2">Confident</button>' +
        '</div>' +
      '</div>' +
    '</div>');

  node.querySelector('.pt-h').onclick = function () { node.classList.toggle('open'); };

  var btns = node.querySelectorAll('.status button');
  function paint() {
    var cur = statusOf(p.n);
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('on', Number(btns[i].dataset.v) === cur);
    }
    node.className = 'pt' + (cur ? ' s' + cur : '') + (node.classList.contains('open') ? ' open' : '');
  }
  for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function (ev) {
      ev.stopPropagation();
      var v = Number(this.dataset.v);
      if (v === 0) delete state.progress[p.n]; else state.progress[p.n] = v;
      save(); paint(); renderHeaderProgress();
    };
  }
  paint();
  return node;
}

function viewEquations() {
  var h = '<h1>Equations</h1>' +
    '<p class="lede">Every equation named in the specification. Learn each one in words as well as in symbols, ' +
    'and practise rearranging it before you meet it under time pressure. Convert to SI units before substituting.</p>';
  SPEC.sections.forEach(function (sec) {
    var eqs = EQUATIONS.filter(function (e) { return e.s === sec.id; });
    if (!eqs.length) return;
    h += '<h2 style="color:' + secColour(sec) + '">' + sec.id + '. ' + esc(sec.title) + '</h2>';
    eqs.forEach(function (e) {
      h += '<div class="row"><div class="eqrow">' +
        '<code class="eqf">' + esc(e.eq) + '</code>' +
        '<div><div class="rt">' + esc(e.name) +
          (e.p2 ? ' <span class="pill p2">Physics only</span>' : '') + '</div>' +
          '<div class="rw">' + esc(e.words) + '</div>' +
          '<div class="rq">' + esc(e.units) + '</div></div>' +
        '</div></div>';
    });
  });
  view.innerHTML = h;
}

function viewPracticals() {
  var h = '<h1>Core practicals</h1>' +
    '<p class="lede">Examiners ask about method, variables and sources of error far more often than about results. ' +
    'For each one, be ready to state what you changed, what you measured, what you kept the same, and one ' +
    'improvement you would make.</p>';
  PRACTICALS.forEach(function (pr) {
    var sec = SPEC.sections.filter(function (s) { return s.id === pr.s; })[0];
    h += '<div class="row prac">' +
      '<div class="rt"><span class="mono" style="color:' + secColour(sec) + '">' + pr.ref + '</span> ' + esc(pr.title) + '</div>' +
      '<div class="rw">' + esc(pr.aim) + '</div><ol>' +
      pr.method.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') +
      '</ol><div class="meta"><b>Variables:</b> ' + esc(pr.vars) + '<br/><b>Errors and improvements:</b> ' +
      esc(pr.errors) + '</div></div>';
  });
  view.innerHTML = h;
}

function viewGlossary() {
  var h = '<h1>Definitions</h1>' +
    '<p class="lede">Definition marks are the cheapest marks on the paper and the easiest to lose by paraphrasing. ' +
    'Learn these close to word for word, then test yourself on the Flashcards tab.</p>';
  SPEC.sections.forEach(function (sec) {
    var g = GLOSSARY.filter(function (x) { return x.s === sec.id; });
    if (!g.length) return;
    h += '<h2 style="color:' + secColour(sec) + '">' + sec.id + '. ' + esc(sec.title) + '</h2>';
    g.forEach(function (x) {
      h += '<div class="row"><div class="rt">' + esc(x.term) + '</div><div class="rw">' + esc(x.def) + '</div></div>';
    });
  });
  view.innerHTML = h;
}

/* ---------- flashcards ---------- */
var fc = { deck:[], i:0, flipped:false, filter:'all', right:0 };

function viewCards() {
  view.innerHTML = '<h1>Flashcards</h1>' +
    '<p class="lede">Term on the front, definition on the back. Click the card to flip it, then say honestly ' +
    'whether you knew it. Cards you get wrong come round again at the end of the deck.</p>' +
    '<div class="chips" id="fcChips"></div><div id="fcBody"></div>';
  chipRow('fcChips', fc.filter, function (v) { fc.filter = v; buildDeck(); viewCards(); });
  if (!fc.deck.length) buildDeck();
  drawCard();
}
function buildDeck() {
  var src = fc.filter === 'all' ? GLOSSARY : GLOSSARY.filter(function (g) { return g.s === fc.filter; });
  fc.deck = shuffle(src);
  fc.i = 0; fc.flipped = false; fc.right = 0;
}
function drawCard() {
  var body = document.getElementById('fcBody');
  if (!body) return;
  if (fc.i >= fc.deck.length) {
    body.innerHTML = '<div class="row" style="max-width:640px;text-align:center;padding:30px">' +
      '<div class="score">' + fc.right + '/' + fc.deck.length + '</div>' +
      '<div class="rw">Deck finished.</div>' +
      '<div class="btnrow" style="justify-content:center"><button class="btn" id="again">Shuffle and go again</button></div></div>';
    document.getElementById('again').onclick = function () { buildDeck(); drawCard(); };
    return;
  }
  var c = fc.deck[fc.i];
  var sec = SPEC.sections.filter(function (s) { return s.id === c.s; })[0];
  body.innerHTML =
    '<div class="qbar" style="max-width:640px"><span>Card ' + (fc.i + 1) + ' of ' + fc.deck.length + '</span>' +
    '<span style="color:' + secColour(sec) + '">Section ' + sec.id + ' · ' + esc(sec.title) + '</span></div>' +
    '<div class="fc" id="card">' +
      (fc.flipped
        ? '<div class="side">Definition</div><div class="def">' + esc(c.def) + '</div>'
        : '<div class="side">Term</div><div class="term">' + esc(c.term) + '</div>') +
      '<div class="hint">' + (fc.flipped ? 'Did you get it?' : 'Click to reveal') + '</div>' +
    '</div>' +
    (fc.flipped
      ? '<div class="btnrow"><button class="btn ghost" id="no">Not yet</button><button class="btn" id="yes">Knew it</button></div>'
      : '');

  document.getElementById('card').onclick = function () { fc.flipped = !fc.flipped; drawCard(); };
  if (fc.flipped) {
    document.getElementById('yes').onclick = function () { fc.right++; next(); };
    document.getElementById('no').onclick = function () { fc.deck.push(fc.deck[fc.i]); next(); };
  }
  function next() { fc.i++; fc.flipped = false; drawCard(); }
}

/* ---------- quiz ---------- */
var qz = { filter:'all', deck:[], i:0, score:0, answered:false, running:false };

function viewQuiz() {
  view.innerHTML = '<h1>Quiz</h1>' +
    '<p class="lede">Ten multiple-choice questions, drawn at random from the section you pick. Every answer comes ' +
    'with a worked explanation, so read them even when you get it right.</p>' +
    '<div class="chips" id="qzChips"></div><div id="qzBody" class="qwrap"></div>';
  chipRow('qzChips', qz.filter, function (v) { qz.filter = v; dealQuiz(); viewQuiz(); },
    [{ v:'weak', label:'Weak spots' }]);
  if (qz.running) drawQ(); else qzIntro();
}
function qzIntro() {
  var pool = poolFor(qz.filter);
  var note = qz.filter === 'weak'
    ? 'Drawn from sections ' + weakSections(3).join(', ') + ' — the three where you have marked the fewest points confident.'
    : 'You will get ' + Math.min(10, pool.length) + ' of them, shuffled.';
  document.getElementById('qzBody').innerHTML =
    '<div class="row"><div class="rt">' + pool.length + ' questions available</div>' +
    '<div class="rw">' + note + '</div>' +
    '<div class="btnrow"><button class="btn" id="start">Start quiz</button></div></div>';
  document.getElementById('start').onclick = startQuiz;
}
function poolFor(f) {
  if (f === 'all') return QUESTIONS;
  if (f === 'weak') {
    var w = weakSections(3);
    return QUESTIONS.filter(function (q) { return w.indexOf(q.s) > -1; });
  }
  return QUESTIONS.filter(function (q) { return q.s === f; });
}
function dealQuiz() {
  qz.deck = shuffle(poolFor(qz.filter)).slice(0, 10);
  qz.i = 0; qz.score = 0; qz.answered = false; qz.running = true;
}
function startQuiz() {
  dealQuiz();
  if (document.getElementById('qzBody')) drawQ(); else viewQuiz();
}
function drawQ() {
  var body = document.getElementById('qzBody');
  if (!body) return;
  if (qz.i >= qz.deck.length) {
    var pct = Math.round(qz.score / qz.deck.length * 100);
    var msg = pct >= 80 ? 'Strong. Move on to the next section.'
            : pct >= 50 ? 'Getting there. Re-read the points you missed.'
            : 'Go back over this section before trying again.';
    body.innerHTML = '<div class="row" style="text-align:center;padding:30px">' +
      '<div class="score" style="color:' + (pct >= 80 ? 'var(--good)' : pct >= 50 ? 'var(--warn)' : 'var(--bad)') + '">' +
      qz.score + '/' + qz.deck.length + '</div><div class="rw">' + msg + '</div>' +
      '<div class="btnrow" style="justify-content:center"><button class="btn" id="retry">New quiz</button></div></div>';
    document.getElementById('retry').onclick = startQuiz;
    qz.running = false;
    return;
  }
  var q = qz.deck[qz.i];
  var sec = SPEC.sections.filter(function (s) { return s.id === q.s; })[0];
  body.innerHTML =
    '<div class="qbar"><span>Question ' + (qz.i + 1) + ' of ' + qz.deck.length + '</span>' +
    '<span style="color:' + secColour(sec) + '">Section ' + sec.id + ' · Score ' + qz.score + '</span></div>' +
    '<div class="qtext">' + esc(q.q) + '</div>' +
    '<div id="opts">' + q.o.map(function (o, k) {
      return '<button class="opt" data-k="' + k + '">' + esc(o) + '</button>';
    }).join('') + '</div><div id="fb"></div>';

  var opts = body.querySelectorAll('.opt');
  for (var i = 0; i < opts.length; i++) {
    opts[i].onclick = function () {
      if (qz.answered) return;
      qz.answered = true;
      var k = Number(this.dataset.k);
      if (k === q.a) qz.score++;
      for (var j = 0; j < opts.length; j++) {
        opts[j].disabled = true;
        if (j === q.a) opts[j].classList.add('right');
        else if (j === k) opts[j].classList.add('wrong');
      }
      document.getElementById('fb').innerHTML =
        '<div class="expl"><b>' + (k === q.a ? 'Correct. ' : 'Not quite. ') + '</b>' + esc(q.e) + '</div>' +
        '<div class="btnrow"><button class="btn" id="nx">' +
        (qz.i + 1 >= qz.deck.length ? 'See score' : 'Next question') + '</button></div>';
      document.getElementById('nx').onclick = function () { qz.i++; qz.answered = false; drawQ(); };
    };
  }
}

/* ---------- exam-style questions ---------- */
var ex = { filter:'all' };

function viewExam() {
  var qs = ex.filter === 'all' ? EXAMQS : EXAMQS.filter(function (q) { return q.s === ex.filter; });
  var marks = qs.reduce(function (n, q) {
    return n + q.parts.reduce(function (m, p) { return m + p.marks; }, 0);
  }, 0);

  view.innerHTML = '<h1>Exam-style questions</h1>' +
    '<p class="lede">Structured questions in the style of the real papers, with the mark scheme and a note on ' +
    'what the examiner is looking for. Write your answer out in full before you reveal anything — reading a mark ' +
    'scheme you have not attempted teaches you almost nothing.</p>' +
    '<div class="chips" id="exChips"></div>' +
    '<p style="font-size:12px;color:var(--dim2);margin:0 0 16px">' + qs.length + ' questions · ' +
    marks + ' marks available</p><div id="exBody"></div>';

  chipRow('exChips', ex.filter, function (v) { ex.filter = v; viewExam(); });

  var body = document.getElementById('exBody');
  qs.forEach(function (q) {
    var sec = SPEC.sections.filter(function (s) { return s.id === q.s; })[0];
    var total = q.parts.reduce(function (m, p) { return m + p.marks; }, 0);
    var card = el('<div class="row exq">' +
      '<div class="rt"><span class="mono" style="color:' + secColour(sec) + '">S' + q.s + '</span> ' +
        esc(q.title) + ' <span class="pill eq">' + total + ' marks</span></div>' +
      '<div class="ctx">' + esc(q.context) + '</div>' +
      '<div class="parts"></div></div>');
    var parts = card.querySelector('.parts');

    q.parts.forEach(function (p, i) {
      var pn = el('<div class="part">' +
        '<div class="pq"><span class="pl">(' + String.fromCharCode(97 + i) + ')</span>' +
          '<span>' + esc(p.q) + (p.p2 ? ' <span class="pill p2">Physics only</span>' : '') +
          '<span class="mk">[' + p.marks + ']</span></span></div>' +
        '<button class="reveal">Show mark scheme</button>' +
        '<div class="ans">' +
          '<ul>' + p.ms.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>' +
          '<div class="tip"><b>Examiner’s note:</b> ' + esc(p.tip) + '</div>' +
        '</div></div>');
      var btn = pn.querySelector('.reveal');
      btn.onclick = function () {
        var open = pn.classList.toggle('open');
        btn.textContent = open ? 'Hide mark scheme' : 'Show mark scheme';
      };
      parts.appendChild(pn);
    });
    body.appendChild(card);
  });
}

/* ---------- calculation drills ---------- */
var dr = { filter:'all', drill:null, cur:null, done:0, right:0, streak:0, best:0, checked:false };

function viewDrills() {
  view.innerHTML = '<h1>Calculation drills</h1>' +
    '<p class="lede">Fresh numbers every time, so you cannot memorise the answer. Work it out on paper the way ' +
    'you would in the exam — equation, substitution, answer — then type the number. Anything within 1% is ' +
    'marked correct, so rounding will not catch you out.</p>' +
    '<div class="chips" id="drChips"></div><div id="drBody"></div>';
  chipRow('drChips', dr.filter, function (v) { dr.filter = v; dr.drill = null; nextDrill(); viewDrills(); });
  if (!dr.cur) nextDrill();
  drawDrill();
}
function drillPool() {
  return dr.filter === 'all' ? DRILLS : DRILLS.filter(function (d) { return d.s === dr.filter; });
}
function nextDrill() {
  var pool = drillPool();
  if (!pool.length) { dr.cur = null; return; }
  dr.drill = pool[Math.floor(Math.random() * pool.length)];
  dr.cur = dr.drill.gen();
  dr.checked = false;
}
function drawDrill() {
  var body = document.getElementById('drBody');
  if (!body || !dr.cur) return;
  var d = dr.drill, g = dr.cur;
  var sec = SPEC.sections.filter(function (s) { return s.id === d.s; })[0];

  body.innerHTML =
    '<div class="qbar" style="max-width:640px"><span>Answered ' + dr.done + ' · correct ' + dr.right +
      '</span><span>Streak ' + dr.streak + ' · best ' + dr.best + '</span></div>' +
    '<div class="row" style="max-width:640px">' +
      '<div class="rt"><span class="mono" style="color:' + secColour(sec) + '">S' + d.s + '</span> ' +
        esc(d.name) + (d.p2 ? ' <span class="pill p2">Physics only</span>' : '') + '</div>' +
      '<code class="eqf" style="display:inline-block;margin:6px 0 12px">' + esc(d.eq) + '</code>' +
      '<table class="given">' + g.given.map(function (row) {
        return '<tr><td>' + esc(row[0]) + '</td><td class="mono">' + esc(String(row[1])) + ' ' + esc(row[2]) + '</td></tr>';
      }).join('') + '</table>' +
      '<div class="askrow"><label for="drIn">Calculate the ' + esc(g.ask[0]) +
        ' <span class="mono">(' + esc(g.ask[1]) + ')</span></label>' +
        '<input id="drIn" type="text" inputmode="decimal" autocomplete="off" placeholder="your answer"/></div>' +
      '<div class="btnrow"><button class="btn" id="drCheck">Check</button>' +
        '<button class="btn ghost" id="drSkip">Skip</button></div>' +
      '<div id="drFb"></div>' +
    '</div>';

  var input = document.getElementById('drIn');
  input.focus();
  input.onkeydown = function (e) { if (e.key === 'Enter') check(); };
  document.getElementById('drCheck').onclick = check;
  document.getElementById('drSkip').onclick = function () { nextDrill(); drawDrill(); };

  function check() {
    if (dr.checked) return;
    var raw = input.value.trim().replace(/,/g, '');
    var val = Number(raw);
    if (raw === '' || !isFinite(val)) { toast('Type a number first'); return; }
    dr.checked = true;
    dr.done++;
    var tol = Math.max(Math.abs(g.ans) * 0.01, 1e-9);
    var ok = Math.abs(val - g.ans) <= tol;
    if (ok) { dr.right++; dr.streak++; if (dr.streak > dr.best) dr.best = dr.streak; }
    else dr.streak = 0;

    input.disabled = true;
    input.className = ok ? 'ok' : 'no';
    document.getElementById('drFb').innerHTML =
      '<div class="expl" style="border-left-color:' + (ok ? 'var(--good)' : 'var(--bad)') + '">' +
        '<b>' + (ok ? 'Correct. ' : 'Not quite — the answer is ' + fmt(g.ans) + ' ' + esc(g.ask[1]) + '. ') + '</b>' +
        '<pre class="work">' + esc(g.work) + '</pre></div>';
    var btn = document.getElementById('drCheck');
    btn.textContent = 'Next question';
    btn.onclick = function () { nextDrill(); drawDrill(); };
  }
}
function fmt(x) {
  var a = Math.abs(x);
  if (a !== 0 && (a < 0.001 || a >= 1e6)) return x.toExponential(2);
  return String(Number(x.toPrecision(3)));
}

/* ---------- exam technique ---------- */
function viewTechnique() {
  var T = TECHNIQUE;
  var h = '<h1>Exam technique</h1>' +
    '<p class="lede">Knowing the physics is only half of it. Most dropped marks come from misreading a command ' +
    'word, skipping a unit conversion, or answering a question that was not asked.</p>';

  h += '<h2>Command words</h2><p class="lede">The command word tells you exactly how much to write. ' +
    'Answering a "state" with a paragraph wastes time; answering an "explain" with one word loses marks.</p>';
  T.commands.forEach(function (c) {
    h += '<div class="row"><div class="rt">' + esc(c.w) + '</div><div class="rw">' + esc(c.m) + '</div>' +
      '<div class="rq">' + esc(c.e) + '</div></div>';
  });

  h += '<h2>How to lay out a calculation</h2>';
  T.calcSteps.forEach(function (s, i) {
    h += '<div class="row"><div class="rt"><span class="mono" style="color:var(--acc)">' + (i + 1) +
      '</span> ' + esc(s.t) + '</div><div class="rw">' + esc(s.d) + '</div></div>';
  });

  h += '<h2>Graph skills</h2>';
  T.graphs.forEach(function (g) {
    h += '<div class="row"><div class="rt">' + esc(g.t) + '</div><div class="rw">' + esc(g.d) + '</div></div>';
  });

  h += '<h2>Unit conversions</h2>' +
    '<p class="lede">Do these before you substitute, every time.</p>' +
    '<div class="row"><table class="conv"><tr><th>From</th><th>To</th><th>Do this</th></tr>' +
    T.units.map(function (u) {
      return '<tr><td>' + esc(u.f) + '</td><td>' + esc(u.t) + '</td><td class="mono">' + esc(u.h) + '</td></tr>';
    }).join('') + '</table></div>';

  h += '<h2>Six-mark questions</h2><div class="row"><ol class="tech">' +
    T.sixMark.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol></div>';

  h += '<h2>Traps that cost the most marks</h2>';
  T.traps.forEach(function (t) {
    h += '<div class="row" style="border-left:3px solid var(--bad)"><div class="rt">' + esc(t.t) +
      '</div><div class="rw">' + esc(t.d) + '</div></div>';
  });

  view.innerHTML = h;
}

/* Sections where the fewest points are marked confident — used by the quiz's
   "Weak spots" filter to target revision where it is needed. */
function weakSections(n) {
  return SPEC.sections.map(function (s) {
    var sp = sectionPoints(s);
    return { id:s.id, pct:countBy(sp, 2) / sp.length };
  }).sort(function (a, b) { return a.pct - b.pct; })
    .slice(0, n || 3).map(function (x) { return x.id; });
}

function chipRow(id, current, onPick, extra) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  var items = [{ v:'all', label:'All sections' }].concat(extra || []).concat(SPEC.sections.map(function (s) {
    return { v:s.id, label:s.id + '. ' + s.title };
  }));
  items.forEach(function (it) {
    var b = el('<button' + (it.v === current ? ' class="on"' : '') + '>' + esc(it.label) + '</button>');
    b.onclick = function () { onPick(it.v); };
    wrap.appendChild(b);
  });
}

/* ---------- search ---------- */
function viewSearch(term) {
  var q = term.trim().toLowerCase();
  var hits = [];

  allPoints().forEach(function (x) {
    var hay = (x.p.n + ' ' + x.p.t + ' ' + (x.p.note || '') + ' ' + (x.p.eq || '')).toLowerCase();
    if (hay.indexOf(q) > -1) {
      hits.push({ kind:'Spec point ' + x.p.n + ' · Section ' + x.sec.id, body:x.p.t, sec:x.sec.id, colour:secColour(x.sec) });
    }
  });
  EQUATIONS.forEach(function (e) {
    if ((e.name + ' ' + e.eq + ' ' + e.words).toLowerCase().indexOf(q) > -1) {
      hits.push({ kind:'Equation · Section ' + e.s, body:e.name + ' — ' + e.eq, tab:'equations' });
    }
  });
  GLOSSARY.forEach(function (g) {
    if ((g.term + ' ' + g.def).toLowerCase().indexOf(q) > -1) {
      hits.push({ kind:'Definition · Section ' + g.s, body:g.term + ' — ' + g.def, tab:'glossary' });
    }
  });
  PRACTICALS.forEach(function (p) {
    if ((p.title + ' ' + p.aim + ' ' + p.method.join(' ') + ' ' + p.errors).toLowerCase().indexOf(q) > -1) {
      hits.push({ kind:'Core practical ' + p.ref, body:p.title, tab:'practicals' });
    }
  });
  EXAMQS.forEach(function (x) {
    x.parts.forEach(function (part) {
      if ((part.q + ' ' + part.ms.join(' ') + ' ' + part.tip).toLowerCase().indexOf(q) > -1) {
        hits.push({ kind:'Exam question · Section ' + x.s + ' · ' + x.title,
                    body:part.q + '  [' + part.marks + ']', tab:'exam' });
      }
    });
  });
  TECHNIQUE.commands.forEach(function (c) {
    if ((c.w + ' ' + c.m + ' ' + c.e).toLowerCase().indexOf(q) > -1) {
      hits.push({ kind:'Command word', body:c.w + ' — ' + c.m, tab:'technique' });
    }
  });
  TECHNIQUE.traps.concat(TECHNIQUE.graphs, TECHNIQUE.calcSteps).forEach(function (t) {
    if ((t.t + ' ' + t.d).toLowerCase().indexOf(q) > -1) {
      hits.push({ kind:'Exam technique', body:t.t + ' — ' + t.d, tab:'technique' });
    }
  });

  var h = '<h1>Search</h1><p class="lede">' + hits.length + ' result' + (hits.length === 1 ? '' : 's') +
    ' for “' + esc(term) + '”.</p>';
  if (!hits.length) h += '<div class="empty">Nothing matched. Try a shorter word, such as “momentum” or “half-life”.</div>';
  view.innerHTML = h;

  hits.slice(0, 80).forEach(function (hit) {
    var node = el('<div class="hit"><div class="hk"' + (hit.colour ? ' style="color:' + hit.colour + '"' : '') +
      '>' + esc(hit.kind) + '</div><div class="hb">' + mark(hit.body, q) + '</div></div>');
    node.onclick = function () {
      if (hit.sec) go('home', hit.sec); else go(hit.tab);
    };
    view.appendChild(node);
  });
}
function mark(text, q) {
  var s = esc(text);
  var i = s.toLowerCase().indexOf(q);
  if (i < 0) return s;
  return s.slice(0, i) + '<mark>' + s.slice(i, i + q.length) + '</mark>' + s.slice(i + q.length);
}

/* ---------- wiring ---------- */
searchEl.addEventListener('input', function () {
  var v = searchEl.value;
  if (v.trim().length < 2) {
    renderTabs();
    render();
  } else {
    tabsEl.querySelectorAll('button').forEach(function (b) { b.classList.remove('on'); });
    viewSearch(v);
  }
});
document.getElementById('themeBtn').onclick = function () {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  save(); applyTheme(); render();
};
document.getElementById('resetBtn').onclick = function () {
  if (!confirm('Clear every tick on the syllabus checklist? This cannot be undone.')) return;
  state.progress = {};
  save(); render();
  toast('Progress cleared');
};

applyTheme();
renderTabs();
render();

})();
