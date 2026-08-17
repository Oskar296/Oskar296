/* Flashcards. Every key term in the syllabus becomes a card, scheduled with Leitner boxes. */

const Cards = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function all() {
    const out = [];
    SYLLABUS.forEach(t => t.subs.forEach(s => s.terms.forEach(([term, def]) => {
      out.push({ id: s.id + "::" + term, term, def, sub: s.id, subTitle: s.title, topic: t.n, hue: t.hue });
    })));
    return out;
  }

  function deckFor(filter) {
    const cards = all().filter(filter || (() => true));
    const now = Date.now();
    const due = cards.filter(c => Store.cardState(c.id).due <= now);
    const pool = due.length ? due : cards;
    return pool.sort((a, b) => Store.cardState(a.id).box - Store.cardState(b.id).box ||
                               Store.cardState(a.id).due - Store.cardState(b.id).due);
  }

  /* opts: { title, filter, back } */
  function start(el, opts) {
    const deck = deckFor(opts.filter);
    if (!deck.length) {
      el.innerHTML = '<div class="card"><p>No cards match that selection.</p></div>';
      return;
    }
    let i = 0, done = 0, kept = 0, flipped = false;

    el.innerHTML = `
      <div class="q-progress">
        <span id="cdN"></span>
        <div class="bar"><i id="cdBar" style="width:0%"></i></div>
        <span class="chip" id="cdBox"></span>
      </div>
      <div class="deck"><div class="flip" id="cdFlip">
        <div class="face front">
          <span class="tag" id="cdTagF"></span>
          <div class="q" id="cdQ"></div>
          <span class="hint">click the card, or press space, to flip</span>
        </div>
        <div class="face back">
          <span class="tag" id="cdTagB"></span>
          <div class="a" id="cdA"></div>
          <span class="hint">how well did you know it?</span>
        </div>
      </div></div>
      <div class="btn-row" style="justify-content:center" id="cdBtns">
        <button class="btn sec" id="cdAgain" disabled>Didn't know it</button>
        <button class="btn" id="cdGood" disabled>Knew it</button>
      </div>
      <p style="text-align:center;font-size:12.5px;color:var(--ink-3)">
        Cards you know come back less often. Cards you miss come straight back. Keys: space to flip, 1 and 2 to grade.</p>`;

    const flip = el.querySelector("#cdFlip");

    function draw() {
      const c = deck[i];
      flipped = false;
      flip.classList.remove("on");
      el.querySelector("#cdQ").textContent = c.term;
      el.querySelector("#cdA").textContent = c.def;
      el.querySelector("#cdTagF").textContent = c.sub;
      el.querySelector("#cdTagB").textContent = c.sub + "  " + c.subTitle;
      el.querySelector("#cdN").textContent = (i + 1) + " / " + deck.length;
      el.querySelector("#cdBar").style.width = Math.round(done / deck.length * 100) + "%";
      el.querySelector("#cdBox").textContent = "box " + Store.cardState(c.id).box + " of 5";
      el.style.setProperty("--hue", c.hue);
      setGrade(false);
    }
    function setGrade(on) {
      el.querySelector("#cdAgain").disabled = !on;
      el.querySelector("#cdGood").disabled = !on;
    }
    function doFlip() {
      flipped = !flipped;
      flip.classList.toggle("on", flipped);
      if (flipped) setGrade(true);
    }
    function grade(good) {
      if (!flipped) return;
      Store.gradeCard(deck[i].id, good);
      if (good) kept++;
      done++;
      if (i < deck.length - 1) { i++; draw(); } else finish();
    }
    function finish() {
      Store.touchStreak();
      const pct = Math.round(kept / deck.length * 100);
      el.innerHTML = `
        <div class="card" style="text-align:center">
          <div class="score-ring" style="--p:${pct}"><b>${pct}%</b></div>
          <h2 style="margin:0 0 4px">${kept} of ${deck.length} known</h2>
          <p>The ones you missed are back in box 1 and will come round again straight away.</p>
          <div class="btn-row" style="justify-content:center">
            <button class="btn" id="cdMore">Go again</button>
            <a class="btn sec" href="${opts.back || "#/cards"}">Back</a>
          </div>
        </div>`;
      el.querySelector("#cdMore").onclick = () => start(el, opts);
      App.refreshChrome();
      if (pct >= 90) App.confetti();
    }

    flip.onclick = doFlip;
    el.querySelector("#cdAgain").onclick = () => grade(false);
    el.querySelector("#cdGood").onclick = () => grade(true);

    el._keys = e => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); doFlip(); }
      if (e.key === "1") grade(false);
      if (e.key === "2") grade(true);
    };
    document.addEventListener("keydown", el._keys);
    el._cleanup = () => document.removeEventListener("keydown", el._keys);

    draw();
  }

  function hub(el) {
    const cards = all();
    const now = Date.now();
    const boxes = [0, 0, 0, 0, 0, 0];
    cards.forEach(c => boxes[Store.cardState(c.id).box]++);
    const due = cards.filter(c => Store.cardState(c.id).due <= now).length;
    const learned = boxes[3] + boxes[4] + boxes[5];

    el.innerHTML = `
      <div class="page-head">
        <span class="eyebrow">Flashcards</span>
        <h1>${cards.length} key terms, spaced out over time</h1>
        <p class="lede">Every definition in the syllabus is a card. Cards you get right come back after a longer gap, cards you miss come straight back. Ten minutes a day beats an hour the night before.</p>
      </div>

      <div class="stat-row">
        <div class="stat"><b>${due}</b><span>due right now</span></div>
        <div class="stat"><b>${learned}</b><span>in the long boxes</span></div>
        <div class="stat"><b>${boxes[1]}</b><span>still box 1</span></div>
        <div class="stat"><b>${cards.length}</b><span>cards total</span></div>
      </div>

      <div class="btn-row">
        <a class="btn" href="#/cards/due">Review ${due || cards.length} cards</a>
        <a class="btn sec" href="#/cards/all">Shuffle everything</a>
      </div>

      <h2>By topic</h2>
      <div class="grid g2">
        ${SYLLABUS.map(t => {
          const n = cards.filter(c => c.topic === t.n).length;
          const d = cards.filter(c => c.topic === t.n && Store.cardState(c.id).due <= now).length;
          return `<a class="topic-card" href="#/cards/topic/${t.n}" style="--hue:${t.hue}">
            <div class="tc-top"><span class="em">${t.em}</span><span class="tc-num">${t.n}</span><h3>${esc(t.title)}</h3></div>
            <div class="tc-meta"><span>${n} cards</span><span>${d} due</span></div>
          </a>`;
        }).join("")}
      </div>`;
  }

  return { start, hub, all, deckFor };
})();
