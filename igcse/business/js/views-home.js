/* views-home.js — dashboard */

var V = window.V || {};

V.home = function () {
  var s = BS.store, g = BS.game;
  var total = BS.notes.length;
  var read = BS.notes.filter(function (t) { return s.isRead(t.id); }).length;

  var cardIds = BS.glossary.map(function (x) { return x.id; });
  var mastered = cardIds.filter(function (id) { return s.card(id).box >= 4; }).length;
  var due = s.dueCards(cardIds).length;

  var tries = 0, right = 0;
  BS.quiz.forEach(function (q) { var r = s.question(q.id); tries += r.tries; right += r.right; });
  var acc = tries ? Math.round(right / tries * 100) : null;

  var wDone = 0, wGot = 0, wAvail = 0;
  BS.written.forEach(function (q) {
    var w = s.written(q.id);
    if (w.tries) { wDone++; wGot += w.best; wAvail += q.marks; }
  });

  var streak = s.streak();
  var lv = g.level();
  var day = g.today();
  var got = g.earned();

  var h = '';
  h += '<div class="eyebrow">Cambridge IGCSE 0450</div>';
  h += '<h1>Business Studies revision</h1>';

  /* ---- level ---- */
  h += '<div class="levelcard"><div class="lv-row">' +
    '<span class="lv-badge">' + lv.n + '</span>' +
    '<span><span class="lv-name">' + R.esc(lv.name) + '</span>' +
    '<span class="lv-sub">' + (lv.next
      ? lv.toNext.toLocaleString() + ' XP to ' + R.esc(lv.next.name)
      : 'Top of the ladder — the whole syllabus is behind you') + '</span></span>' +
    '<span class="lv-xp"><span class="n">' + lv.xp.toLocaleString() + '</span>' +
    '<span class="l">XP</span></span></div>' +
    '<div class="bar' + (!lv.next ? ' good' : '') + '" style="margin-top:14px"><i style="width:' + lv.pct + '%"></i></div>' +
    '</div>';

  /* ---- today ---- */
  h += '<div class="card goalcard">' + ring(day.pct, day.met) +
    '<span class="g-txt"><h3 class="mt0" style="margin-bottom:3px">Today\'s goal</h3>' +
    '<p class="small" style="margin:0">' +
    (day.met
      ? '<strong>Done.</strong> ' + day.done + ' study actions today. Anything more is a bonus.'
      : day.done + ' of ' + day.goal + ' study actions. A flashcard graded, a question answered or a mark ticked all count.') +
    '</p>' +
    '<p class="small" style="margin:6px 0 0">🔥 ' + (streak
      ? '<strong>' + streak + ' day' + (streak === 1 ? '' : 's') + '</strong> in a row'
      : 'No streak yet — study today to start one') + '</p></span></div>';

  /* ---- stats ---- */
  h += '<div class="grid g4" style="margin:16px 0">';
  h += stat('Topics read', read + ' / ' + total, Math.round(read / total * 100) + '% of the syllabus');
  h += stat('Cards mastered', mastered, due + ' due for review');
  h += stat('Quiz accuracy', acc === null ? '—' : acc + '%', tries + ' answered');
  h += stat('Written marks', wAvail ? wGot + '/' + wAvail : '—', wDone + ' of ' + BS.written.length + ' attempted');
  h += '</div>';

  /* ---- next actions ---- */
  h += '<div class="card"><h2 class="mt0">Pick up where you left off</h2><div class="btnrow">';
  if (due > 0) h += '<a class="btn primary" href="#/cards">Review ' + due + ' due flashcard' + (due === 1 ? '' : 's') + '</a>';
  else h += '<a class="btn primary" href="#/cards">Practise flashcards</a>';
  var nextTopic = BS.notes.filter(function (t) { return !s.isRead(t.id); })[0];
  if (nextTopic) h += '<a class="btn" href="#/notes/' + nextTopic.id + '">Next topic: ' + nextTopic.id + ' ' + R.esc(nextTopic.title) + '</a>';
  h += '<a class="btn" href="#/written">Write an exam answer</a>';
  h += '<a class="btn" href="#/rush">⚡ Exam Rush</a>';
  h += '<a class="btn" href="#/cases">Do a case study</a>';
  h += '</div>';
  h += '<p class="small" style="margin:14px 0 0">Multiple choice is useful for checking recall, but the exam is written. ' +
    'If you only do one thing today, do a <a href="#/written">written answer</a> and mark it yourself.</p></div>';

  /* ---- mastery ---- */
  h += '<div class="card"><h2 class="mt0">Mastery by unit</h2>' +
    '<p class="small" style="margin-top:-4px">Blends topics read, flashcards known, quiz questions currently right and written marks scored. ' +
    'Reading alone cannot get you far up the bar.</p>';
  BS.units.forEach(function (u) {
    var m = BS.game.mastery(u.n);
    h += '<div class="mastery-row">' +
      '<a class="m-n" href="#/notes#u' + u.n + '" style="text-decoration:none">' + u.n + '. ' + R.esc(u.title) + '</a>' +
      '<span style="flex:0 0 42%;max-width:230px"><span class="bar' + (m >= 70 ? ' good' : '') +
      '"><i style="width:' + m + '%"></i></span></span>' +
      '<span class="m-v">' + m + '%</span></div>';
  });
  h += '<p class="small" style="margin-bottom:0">Overall: <strong>' + BS.game.overallMastery() + '%</strong></p></div>';

  /* ---- weak topics ---- */
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

  /* ---- achievements ---- */
  h += '<div class="card"><h2 class="mt0">Achievements <span class="pill' +
    (got.length === BS.game.ACHIEVEMENTS.length ? ' g' : '') + '">' + got.length + '/' +
    BS.game.ACHIEVEMENTS.length + '</span></h2>';
  var recent = got.slice(-4).map(function (id) { return BS.game.achievement(id); }).filter(Boolean);
  var nextUp = BS.game.ACHIEVEMENTS.filter(function (a) { return got.indexOf(a.id) === -1; }).slice(0, 3);
  if (recent.length) {
    h += '<h3>Unlocked</h3><div class="ach-grid">';
    recent.forEach(function (a) {
      h += '<div class="ach got"><span class="a-ico">' + a.icon + '</span><span>' +
        '<span class="a-n">' + R.esc(a.name) + '</span><span class="a-d">' + R.esc(a.d) + '</span></span></div>';
    });
    h += '</div>';
  }
  if (nextUp.length) {
    h += '<h3>Next up</h3><div class="ach-grid">';
    nextUp.forEach(function (a) {
      h += '<div class="ach locked"><span class="a-ico">' + a.icon + '</span><span>' +
        '<span class="a-n">' + R.esc(a.name) + '</span><span class="a-d">' + R.esc(a.d) + '</span></span></div>';
    });
    h += '</div>';
  }
  h += '<div class="btnrow"><a class="btn sm" href="#/achievements">See all achievements</a></div></div>';

  h += '<p class="small">Built for the Cambridge IGCSE Business Studies 0450 syllabus. Always check the current syllabus ' +
    'on the Cambridge website for the exact content of your exam series.</p>';

  return h;

  function stat(k, v, sub) {
    return '<div class="stat"><div class="k">' + k + '</div><div class="v">' + v + '</div><div class="s">' + sub + '</div></div>';
  }

  function ring(pct, done) {
    var r = 26, c = 2 * Math.PI * r;
    var off = c * (1 - pct / 100);
    return '<svg class="ring' + (done ? ' done' : '') + '" width="66" height="66" viewBox="0 0 66 66" aria-hidden="true">' +
      '<circle class="track" cx="33" cy="33" r="' + r + '" fill="none" stroke-width="7"/>' +
      '<circle class="fill" cx="33" cy="33" r="' + r + '" fill="none" stroke-width="7" ' +
      'stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" ' +
      'transform="rotate(-90 33 33)"/>' +
      '<text x="33" y="37" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">' +
      (done ? '✓' : pct + '%') + '</text></svg>';
  }
};
window.V = V;
