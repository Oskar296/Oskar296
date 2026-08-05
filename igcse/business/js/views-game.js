/* views-game.js — Exam Rush (timed, lives, combo) and the achievements gallery */

var V = window.V || {};

/* ================= Exam Rush ================= */

V.rush = function () {
  var r = BS.store.rush();
  var h = '<div class="eyebrow">Timed challenge</div><h1>Exam Rush</h1>';
  h += '<p class="lead">Ninety seconds. Three lives. Every correct answer in a row builds your multiplier — ' +
    'break the streak and it resets. It is deliberately faster than you can comfortably think, ' +
    'because recall you have to hunt for is recall that will desert you in the exam.</p>';

  h += '<div class="grid g3" style="margin-bottom:16px">' +
    stat('Best score', r.best || 0) +
    stat('Longest streak', r.bestCombo || 0) +
    stat('Rounds played', r.plays || 0) +
    '</div>';

  h += '<div class="card"><h3 class="mt0">How the scoring works</h3><ul>' +
    '<li>A correct answer scores <strong>10 × your current multiplier</strong>.</li>' +
    '<li>The multiplier goes up one step every <strong>3 correct in a row</strong>, to a maximum of <strong>5×</strong>.</li>' +
    '<li>A wrong answer costs a life and resets the multiplier to 1×.</li>' +
    '<li>Answers still count towards your normal quiz progress, so this is real revision, not a side game.</li>' +
    '</ul>' +
    '<div class="btnrow"><button class="btn primary" id="rushStart">Start the clock</button>' +
    '<a class="btn" href="#/quiz">Untimed quiz instead</a></div></div>';
  h += '<div id="rushArea"></div>';
  return h;

  function stat(k, v) {
    return '<div class="stat"><div class="k">' + k + '</div><div class="v">' + v + '</div></div>';
  }
};

V.afterRush = function (root) {
  var s = BS.store;
  var area = root.querySelector('#rushArea');
  var startBtn = root.querySelector('#rushStart');
  var LEN = 90;
  var st = null, iv = null;

  V._rushCleanup = function () { if (iv) clearInterval(iv); iv = null; };

  startBtn.addEventListener('click', start);

  function start() {
    st = {
      left: LEN, score: 0, lives: 3, combo: 0, bestCombo: 0, mult: 1,
      queue: R.shuffle(BS.quiz.slice()), i: 0, answered: false, right: 0, asked: 0
    };
    startBtn.disabled = true;
    startBtn.textContent = 'Running…';
    draw();
    iv = setInterval(tick, 1000);
  }

  function tick() {
    st.left--;
    var t = area.querySelector('#rTime');
    if (t) {
      t.textContent = st.left;
      t.classList.toggle('low', st.left <= 15);
    }
    if (st.left <= 0) end('Time');
  }

  function multFor(combo) { return Math.min(5, 1 + Math.floor(combo / 3)); }

  function draw() {
    if (st.i >= st.queue.length) st.i = 0;
    var q = st.queue[st.i];
    st.answered = false;

    var h = '<div class="rush-hud">' +
      '<span><span class="r-lab">Time</span><br/><span class="r-time" id="rTime">' + st.left + '</span></span>' +
      '<span><span class="r-lab">Score</span><br/><span class="r-score" id="rScore">' + st.score + '</span></span>' +
      '<span><span class="r-lab">Streak</span><br/><span class="combo' + (st.combo >= 3 ? ' on' : '') +
      (st.combo >= 9 ? ' big' : '') + '" id="rCombo">' + st.combo + ' · ' + multFor(st.combo) + '×</span></span>' +
      '<span><span class="r-lab">Lives</span><br/><span class="lives" id="rLives">' +
      '❤️'.repeat(st.lives) + '🖤'.repeat(3 - st.lives) + '</span></span>' +
      '</div>';

    h += '<div class="card" id="rCard"><p class="qtext">' + R.inline(q.q) + '</p><div class="opts" id="rOpts">';
    q.o.forEach(function (o, idx) {
      h += '<button class="opt" data-i="' + idx + '"><span class="letter">' + 'ABCD'[idx] + '</span><span>' +
        R.inline(o) + '</span></button>';
    });
    h += '</div></div>';
    area.innerHTML = h;

    area.querySelector('#rOpts').addEventListener('click', function (e) {
      var b = e.target.closest('.opt');
      if (!b || st.answered) return;
      answer(parseInt(b.getAttribute('data-i'), 10));
    });
  }

  function answer(idx) {
    var q = st.queue[st.i];
    st.answered = true;
    st.asked++;
    var ok = idx === q.a;

    s.gradeQuestion(q.id, ok);
    s.tick(1);

    var card = area.querySelector('#rCard');
    var btns = area.querySelectorAll('.opt');
    Array.prototype.forEach.call(btns, function (b, i) {
      b.disabled = true;
      if (i === q.a) b.classList.add('correct');
      else if (i === idx) b.classList.add('wrong');
    });

    if (ok) {
      st.right++;
      st.combo++;
      st.bestCombo = Math.max(st.bestCombo, st.combo);
      st.score += 10 * multFor(st.combo);
      if (card) { card.classList.remove('flash', 'bad'); void card.offsetWidth; card.classList.add('flash'); }
    } else {
      st.combo = 0;
      st.lives--;
      if (card) { card.classList.remove('flash'); void card.offsetWidth; card.classList.add('flash', 'bad'); }
    }

    /* update the HUD in place so the clock keeps reading naturally */
    var sc = area.querySelector('#rScore'); if (sc) sc.textContent = st.score;
    var cb = area.querySelector('#rCombo');
    if (cb) {
      cb.textContent = st.combo + ' · ' + multFor(st.combo) + '×';
      cb.classList.toggle('on', st.combo >= 3);
      cb.classList.toggle('big', st.combo >= 9);
    }
    var lv = area.querySelector('#rLives');
    if (lv) lv.textContent = '❤️'.repeat(Math.max(0, st.lives)) + '🖤'.repeat(3 - Math.max(0, st.lives));

    if (st.lives <= 0) { setTimeout(function () { end('Out of lives'); }, 550); return; }
    if (st.left <= 0) return;
    setTimeout(function () { if (st && st.left > 0 && st.lives > 0) { st.i++; draw(); } }, 550);
  }

  function end(reason) {
    if (!st) return;
    clearInterval(iv); iv = null;
    var final = st.score, bc = st.bestCombo, asked = st.asked, right = st.right;
    var prevBest = s.rush().best;
    s.logRush(final, bc);
    s.logSession('rush', right, asked);
    var beat = final > prevBest && prevBest > 0;
    st = null;

    startBtn.disabled = false;
    startBtn.textContent = 'Play again';

    area.innerHTML = '<div class="card center"><div class="eyebrow">' + R.esc(reason) + '</div>' +
      '<h2 class="mt0">' + (beat ? 'New best score' : 'Round over') + '</h2>' +
      '<p style="font-size:44px;font-weight:800;margin:6px 0;letter-spacing:-.02em">' + final + '</p>' +
      '<p class="small">' + right + ' correct out of ' + asked + ' · longest streak ' + bc +
      (beat ? ' · you beat your previous best of ' + prevBest : '') + '</p>' +
      '<div class="btnrow" style="justify-content:center">' +
      '<button class="btn primary" id="rAgain">Go again</button>' +
      '<a class="btn" href="#/quiz">Review these properly</a></div>' +
      '<p class="small" style="margin:14px 0 0">Speed is a symptom, not the goal. Anything you fumbled here ' +
      'is worth re-reading in the notes.</p></div>';

    area.querySelector('#rAgain').addEventListener('click', start);
    BS.announce();
  }
};

/* ================= Achievements ================= */

V.achievements = function () {
  var got = BS.game.earned();
  var all = BS.game.ACHIEVEMENTS;
  var lv = BS.game.level();

  var h = '<div class="eyebrow">Progress</div><h1>Achievements</h1>';
  h += '<p class="lead">' + got.length + ' of ' + all.length + ' unlocked. ' +
    'Every one of these is earned by studying — none of them unlock content, because nothing in this app is locked.</p>';

  h += '<div class="bar' + (got.length === all.length ? ' good' : '') + '" style="margin-bottom:22px">' +
    '<i style="width:' + Math.round(got.length / all.length * 100) + '%"></i></div>';

  var groups = [];
  all.forEach(function (a) { if (groups.indexOf(a.group) === -1) groups.push(a.group); });

  groups.forEach(function (g) {
    var items = all.filter(function (a) { return a.group === g; });
    var n = items.filter(function (a) { return got.indexOf(a.id) !== -1; }).length;
    h += '<h2>' + R.esc(g) + ' <span class="pill' + (n === items.length ? ' g' : '') + '">' +
      n + '/' + items.length + '</span></h2><div class="ach-grid">';
    items.forEach(function (a) {
      var has = got.indexOf(a.id) !== -1;
      h += '<div class="ach ' + (has ? 'got' : 'locked') + '">' +
        '<span class="a-ico">' + a.icon + '</span><span>' +
        '<span class="a-n">' + R.esc(a.name) + '</span>' +
        '<span class="a-d">' + R.esc(a.d) + '</span></span></div>';
    });
    h += '</div>';
  });

  h += '<h2>The career ladder</h2><div class="twrap"><table><thead><tr><th>Level</th><th>Title</th><th>XP</th></tr></thead><tbody>';
  BS.game.LEVELS.forEach(function (l) {
    var here = l.n === lv.n;
    h += '<tr' + (here ? ' style="background:var(--accent-soft)"' : '') + '>' +
      '<td><strong>' + l.n + '</strong></td>' +
      '<td>' + R.esc(l.name) + (here ? ' <span class="pill a">you are here</span>' : '') + '</td>' +
      '<td>' + l.xp.toLocaleString() + '</td></tr>';
  });
  h += '</tbody></table></div>';

  h += '<div class="callout"><span class="clabel">How XP works</span>' +
    '<p>XP is calculated from your actual progress, not banked as you go. Reading a topic, ' +
    'pushing a flashcard up a box, getting a quiz question right, and marks you score on written ' +
    'answers and case studies all count. Re-answering something you already know does not add XP — ' +
    'the only way the number rises is by learning something new.</p></div>';

  return h;
};

window.V = V;
