/* views-home.js — dashboard */

var V = window.V || {};

V.home = function () {
  var s = BS.store, d = s.all();
  var total = BS.notes.length;
  var read = BS.notes.filter(function (t) { return s.isRead(t.id); }).length;

  var confCount = { 1: 0, 2: 0, 3: 0 };
  BS.notes.forEach(function (t) { var c = s.conf(t.id); if (c) confCount[c]++; });

  var cardIds = BS.glossary.map(function (g) { return g.id; });
  var mastered = cardIds.filter(function (id) { return s.card(id).box >= 4; }).length;
  var due = s.dueCards(cardIds).length;

  var tries = 0, right = 0;
  BS.quiz.forEach(function (q) { var r = s.question(q.id); tries += r.tries; right += r.right; });
  var acc = tries ? Math.round(right / tries * 100) : null;

  var streak = s.streak();
  var pct = total ? Math.round(read / total * 100) : 0;

  var h = '';
  h += '<div class="eyebrow">Cambridge IGCSE 0450</div>';
  h += '<h1>Business Studies revision</h1>';
  h += '<p class="lead">Six units, ' + total + ' syllabus topics, ' + BS.glossary.length +
       ' key terms and ' + BS.quiz.length + ' practice questions. Everything is saved in this browser.</p>';

  /* stats */
  h += '<div class="grid g4" style="margin-bottom:18px">';
  h += stat('Topics read', read + ' / ' + total, pct + '% of the syllabus');
  h += stat('Cards mastered', mastered, due + ' due for review');
  h += stat('Quiz accuracy', acc === null ? '—' : acc + '%', tries + ' answered');
  h += stat('Study streak', streak + (streak === 1 ? ' day' : ' days'), streak ? 'Keep it going' : 'Study today to start');
  h += '</div>';

  /* next actions */
  h += '<div class="card"><h2 class="mt0">Pick up where you left off</h2>';
  h += '<div class="btnrow">';
  if (due > 0) h += '<a class="btn primary" href="#/cards">Review ' + due + ' due flashcard' + (due === 1 ? '' : 's') + '</a>';
  else h += '<a class="btn primary" href="#/cards">Practise flashcards</a>';
  var nextTopic = BS.notes.filter(function (t) { return !s.isRead(t.id); })[0];
  if (nextTopic) h += '<a class="btn" href="#/notes/' + nextTopic.id + '">Next topic: ' + nextTopic.id + ' ' + R.esc(nextTopic.title) + '</a>';
  h += '<a class="btn" href="#/quiz">Take a mixed quiz</a>';
  h += '<a class="btn" href="#/exam">Exam technique</a>';
  h += '</div></div>';

  /* weak topics */
  var weak = BS.notes.filter(function (t) { return s.conf(t.id) === 1; });
  if (weak.length) {
    h += '<div class="card"><h2 class="mt0">Topics you marked as shaky</h2>';
    weak.forEach(function (t) {
      h += '<a class="topic-row" href="#/notes/' + t.id + '"><span class="dot c1"></span>' +
           '<span class="n">' + t.id + '</span><span class="t">' + R.esc(t.title) + '</span>' +
           '<span class="pill b">Revise</span></a>';
    });
    h += '</div>';
  }

  /* unit progress */
  h += '<div class="card"><h2 class="mt0">Progress by unit</h2>';
  BS.units.forEach(function (u) {
    var ts = BS.unitTopics(u.n);
    var r = ts.filter(function (t) { return s.isRead(t.id); }).length;
    var p = ts.length ? Math.round(r / ts.length * 100) : 0;
    h += '<div style="margin-bottom:14px">';
    h += '<div style="display:flex;justify-content:space-between;font-size:14.5px;margin-bottom:5px">' +
         '<a href="#/notes#u' + u.n + '" style="text-decoration:none;font-weight:600">' + u.n + '. ' + R.esc(u.title) + '</a>' +
         '<span class="small">' + r + '/' + ts.length + '</span></div>';
    h += '<div class="bar' + (p === 100 ? ' good' : '') + '"><i style="width:' + p + '%"></i></div>';
    h += '</div>';
  });
  h += '</div>';

  /* confidence key */
  if (confCount[1] + confCount[2] + confCount[3] > 0) {
    h += '<div class="card tight"><span class="small">Self-rated confidence: </span>' +
         '<span class="pill b">' + confCount[1] + ' shaky</span> ' +
         '<span class="pill w">' + confCount[2] + ' getting there</span> ' +
         '<span class="pill g">' + confCount[3] + ' confident</span></div>';
  }

  h += '<p class="small">Built for the Cambridge IGCSE Business Studies 0450 syllabus. Always check the current syllabus on the Cambridge website for the exact content of your exam series.</p>';

  return h;

  function stat(k, v, sub) {
    return '<div class="stat"><div class="k">' + k + '</div><div class="v">' + v + '</div><div class="s">' + sub + '</div></div>';
  }
};
window.V = V;
