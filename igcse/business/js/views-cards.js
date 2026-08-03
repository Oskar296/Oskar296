/* views-cards.js — flashcards with Leitner spaced repetition */

var V = window.V || {};

V.cards = function (params) {
  var h = '<div class="eyebrow">Active recall</div><h1>Flashcards</h1>';
  h += '<p class="lead">Each card you get right moves up a box and comes back later; each card you get wrong drops to box 1 and comes back tomorrow. ' +
    'Try to say the definition out loud <em>before</em> you flip.</p>';
  h += '<div id="deckSetup"></div><div id="deckArea"></div>';
  V._cardParams = params || {};
  return h;
};

V.afterCards = function (root) {
  var s = BS.store;
  var setup = root.querySelector('#deckSetup');
  var area = root.querySelector('#deckArea');
  var state = { unit: 0, dueOnly: true, topic: V._cardParams.topic || null, queue: [], i: 0, flipped: false, right: 0, done: 0 };

  function pool() {
    return BS.glossary.filter(function (g) {
      if (state.topic) {
        var t = BS.topic(state.topic);
        return t && t.terms && t.terms.indexOf(g.id) !== -1;
      }
      return !state.unit || g.u === state.unit;
    });
  }

  function drawSetup() {
    var p = pool();
    var dueIds = s.dueCards(p.map(function (g) { return g.id; }));
    var h = '';

    if (state.topic) {
      var tp = BS.topic(state.topic);
      h += '<div class="callout"><span class="clabel">Filtered</span><p>Only the ' + p.length + ' key terms from <a href="#/notes/' + state.topic + '">' +
        state.topic + ' ' + R.esc(tp ? tp.title : '') + '</a>. <a href="#/cards">Use the whole deck instead</a>.</p></div>';
    } else {
      h += '<div class="chips" id="cUnits"><button class="chip" data-u="0" aria-pressed="' + (state.unit === 0) + '">All units</button>';
      BS.units.forEach(function (u) {
        h += '<button class="chip" data-u="' + u.n + '" aria-pressed="' + (state.unit === u.n) + '">Unit ' + u.n + '</button>';
      });
      h += '</div>';
    }

    h += '<div class="chips" id="cMode">' +
      '<button class="chip" data-m="due" aria-pressed="' + (state.dueOnly) + '">Due today (' + dueIds.length + ')</button>' +
      '<button class="chip" data-m="all" aria-pressed="' + (!state.dueOnly) + '">All cards (' + p.length + ')</button>' +
      '</div>';

    /* box breakdown */
    var boxes = [0, 0, 0, 0, 0, 0];
    p.forEach(function (g) { boxes[s.card(g.id).box]++; });
    h += '<div class="card tight"><span class="small">Box breakdown: </span>' +
      '<span class="pill">' + boxes[0] + ' new</span> ' +
      '<span class="pill b">' + boxes[1] + ' box 1</span> ' +
      '<span class="pill w">' + (boxes[2] + boxes[3]) + ' box 2–3</span> ' +
      '<span class="pill g">' + (boxes[4] + boxes[5]) + ' box 4–5 (mastered)</span></div>';

    h += '<div class="btnrow"><button class="btn primary" id="startDeck">Start</button></div>';
    setup.innerHTML = h;

    var cu = setup.querySelector('#cUnits');
    if (cu) cu.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      state.unit = parseInt(b.getAttribute('data-u'), 10);
      drawSetup(); area.innerHTML = '';
    });
    setup.querySelector('#cMode').addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      state.dueOnly = b.getAttribute('data-m') === 'due';
      drawSetup(); area.innerHTML = '';
    });
    setup.querySelector('#startDeck').addEventListener('click', start);
  }

  function start() {
    var p = pool();
    var items = state.dueOnly
      ? p.filter(function (g) { return s.dueCards([g.id]).length; })
      : p.slice();
    if (!items.length) {
      area.innerHTML = '<div class="card center"><h2 class="mt0">Nothing due 🎉</h2>' +
        '<p>Every card in this selection has been reviewed recently. Switch to <strong>All cards</strong> to keep practising, or come back tomorrow.</p></div>';
      return;
    }
    state.queue = R.shuffle(items);
    state.i = 0; state.flipped = false; state.right = 0; state.done = 0;
    setup.style.display = 'none';
    drawCard();
  }

  function drawCard() {
    if (state.i >= state.queue.length) return finish();
    var g = state.queue[state.i];
    var c = s.card(g.id);
    var h = '';
    h += '<div class="card tight" style="display:flex;justify-content:space-between;align-items:center;gap:12px">' +
      '<span class="small">Card ' + (state.i + 1) + ' of ' + state.queue.length + '</span>' +
      '<span class="pill a">Box ' + (c.box || 0) + '</span>' +
      '<a class="small" href="#/notes/' + g.tp + '">' + g.tp + '</a></div>';
    h += '<div class="bar" style="margin-bottom:14px"><i style="width:' + Math.round(state.i / state.queue.length * 100) + '%"></i></div>';
    h += '<div class="card deck" id="theCard">';
    if (!state.flipped) {
      h += '<div class="side">Term</div><div class="front">' + R.esc(g.t) + '</div>' +
        '<div class="hintline">Say the definition, then tap the card (or press Space) to check</div>';
    } else {
      h += '<div class="side">Definition</div><div class="front" style="font-size:19px">' + R.esc(g.t) + '</div>' +
        '<div class="back">' + R.esc(g.d) + '</div>';
    }
    h += '</div>';
    if (state.flipped) {
      h += '<div class="btnrow"><button class="btn bad" id="gWrong">Not yet (1)</button>' +
        '<button class="btn good" id="gRight">Got it (2)</button></div>';
    }
    area.innerHTML = h;

    area.querySelector('#theCard').addEventListener('click', function () {
      if (!state.flipped) { state.flipped = true; drawCard(); }
    });
    if (state.flipped) {
      area.querySelector('#gWrong').addEventListener('click', function () { grade(false); });
      area.querySelector('#gRight').addEventListener('click', function () { grade(true); });
    }
  }

  function grade(ok) {
    var g = state.queue[state.i];
    s.gradeCard(g.id, ok);
    s.tick(1);
    if (ok) state.right++;
    state.done++;
    state.i++; state.flipped = false;
    drawCard();
  }

  function finish() {
    s.logSession('cards', state.right, state.done);
    var pctv = state.done ? Math.round(state.right / state.done * 100) : 0;
    area.innerHTML = '<div class="card center"><h2 class="mt0">Session complete</h2>' +
      '<p style="font-size:34px;font-weight:750;margin:6px 0">' + state.right + ' / ' + state.done + '</p>' +
      '<p class="small">' + pctv + '% correct. Cards you missed will come back tomorrow.</p>' +
      '<div class="btnrow" style="justify-content:center"><button class="btn primary" id="again">Another round</button>' +
      '<a class="btn" href="#/quiz">Try a quiz</a></div></div>';
    area.querySelector('#again').addEventListener('click', function () {
      setup.style.display = ''; drawSetup(); area.innerHTML = '';
    });
  }

  /* keyboard */
  V._cardKey = function (e) {
    if (!state.queue.length || state.i >= state.queue.length) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!state.flipped) { state.flipped = true; drawCard(); }
    } else if (state.flipped && (e.key === '1')) grade(false);
    else if (state.flipped && (e.key === '2')) grade(true);
  };

  drawSetup();
};

window.V = V;
