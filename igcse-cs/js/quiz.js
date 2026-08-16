/* Quiz engine: auto-marked multiple choice plus self-marked written answers. */

const Quiz = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function pick(filter, limit) {
    let pool = QUESTIONS.filter(filter);
    pool = shuffle(pool);
    return limit ? pool.slice(0, limit) : pool;
  }

  /* opts: { title, subtitle, filter, limit, back } */
  function start(el, opts) {
    const qs = pick(opts.filter, opts.limit);
    if (!qs.length) {
      el.innerHTML = '<div class="card"><p>There are no questions for this selection yet.</p></div>';
      return;
    }

    let i = 0, right = 0, marksGot = 0, marksTotal = 0;
    const log = [];

    el.innerHTML = (opts.minutes ? '<div class="exam-timer" id="qTimer"></div>' : "") +
                   '<div class="q-shell" id="qShell"></div>';
    const shell = el.querySelector("#qShell");

    /* timed mock: one clock for the whole set, and it does not stop for you */
    let timer = null, left = (opts.minutes || 0) * 60;
    if (opts.minutes) {
      const tick = () => {
        const t = el.querySelector("#qTimer");
        if (!t) { clearInterval(timer); return; }
        const m = Math.floor(left / 60), s = left % 60;
        t.innerHTML = '<span class="lbl">Time left</span><b>' + m + ":" + String(s).padStart(2, "0") + "</b>";
        t.classList.toggle("low", left <= 120);
        if (left <= 0) { clearInterval(timer); finish(true); }
        left--;
      };
      tick();
      timer = setInterval(tick, 1000);
      el._cleanup = () => clearInterval(timer);
    }

    draw();

    function draw() {
      const q = qs[i];
      const pct = Math.round(i / qs.length * 100);
      shell.innerHTML = `
        <div class="q-progress">
          <span>${i + 1} / ${qs.length}</span>
          <div class="bar"><i style="width:${pct}%"></i></div>
          <span class="chip">${q.t}</span>
          <span class="chip">${q.m} mark${q.m > 1 ? "s" : ""}</span>
        </div>
        <p class="q-stem">${esc(q.q)}</p>
        <div id="qBody"></div>`;
      const body = shell.querySelector("#qBody");
      if (q.ty === "mcq") drawMcq(q, body); else drawTxt(q, body);
      shell.classList.add("fade-in");
    }

    function drawMcq(q, body) {
      const order = shuffle(q.o.map((text, idx) => ({ text, idx })));
      body.innerHTML = order.map((o, n) =>
        '<button class="opt" data-i="' + o.idx + '"><span class="key">' + "ABCD"[n] + "</span><span>" + esc(o.text) + "</span></button>"
      ).join("") + '<div id="qAfter"></div>';

      body.querySelectorAll(".opt").forEach(btn => btn.onclick = () => {
        const chosen = +btn.dataset.i, ok = chosen === q.a;
        body.querySelectorAll(".opt").forEach(b => {
          b.disabled = true;
          if (+b.dataset.i === q.a) b.classList.add("right");
          else if (b === btn) b.classList.add("wrong");
        });
        record(q, ok, ok ? q.m : 0);
        body.querySelector("#qAfter").innerHTML =
          '<div class="verdict ' + (ok ? "ok" : "no") + '"><h4>' + (ok ? "✓ Correct" : "✗ Not quite") + "</h4><p>" +
          esc(q.e) + "</p></div>" +
          '<div class="btn-row"><button class="btn" id="qNext">' + (i === qs.length - 1 ? "See results" : "Next question") + "</button></div>";
        body.querySelector("#qNext").onclick = advance;
        body.querySelector("#qNext").focus();
      });
    }

    function drawTxt(q, body) {
      body.innerHTML = `
        <p style="font-size:13px;color:var(--ink-3)">Write your answer, then mark it against the mark scheme. Be honest with yourself, that is the only way this is useful.</p>
        <textarea class="answer-box" id="qTa" placeholder="Your answer..."></textarea>
        <div class="btn-row"><button class="btn" id="qShow">Show the mark scheme</button></div>
        <div id="qAfter"></div>`;
      body.querySelector("#qTa").focus();
      body.querySelector("#qShow").onclick = () => {
        body.querySelector("#qShow").disabled = true;
        body.querySelector("#qAfter").innerHTML = `
          <div class="verdict">
            <h4>Mark scheme, ${q.m} mark${q.m > 1 ? "s" : ""} available${q.pts.length > q.m ? " (any " + q.m + " of these)" : ""}</h4>
            <ul>${q.pts.map(p => "<li>" + esc(p) + "</li>").join("")}</ul>
            <h4 style="margin-top:12px">A full answer</h4>
            <p>${esc(q.a)}</p>
          </div>
          <h4>How did you do?</h4>
          <div class="btn-row">
            <button class="btn sec" data-g="0">Missed it</button>
            <button class="btn sec" data-g="1">Got some points</button>
            <button class="btn" data-g="2">Got it all</button>
          </div>`;
        body.querySelectorAll("[data-g]").forEach(b => b.onclick = () => {
          const g = +b.dataset.g;
          record(q, g === 2, g === 2 ? q.m : g === 1 ? Math.max(1, Math.floor(q.m / 2)) : 0);
          advance();
        });
      };
    }

    function record(q, ok, marks) {
      if (ok) right++;
      marksGot += marks; marksTotal += q.m;
      Store.recordQuiz(q.t, ok);
      log.push({ q, ok, marks });
    }

    function advance() {
      i++;
      if (i < qs.length) draw(); else finish();
    }

    function finish(ranOut) {
      if (timer) clearInterval(timer);
      const clock = el.querySelector("#qTimer");
      if (clock) clock.remove();
      Store.touchStreak();
      Store.addXp(marksGot * 2);
      if (ranOut) {                       // unanswered questions still count against the total
        for (let k = i; k < qs.length; k++) marksTotal += qs[k].m;
      }
      const pct = Math.round(marksGot / Math.max(1, marksTotal) * 100);
      const byTopic = {};
      log.forEach(l => {
        const b = byTopic[l.q.t] || (byTopic[l.q.t] = { got: 0, tot: 0 });
        b.got += l.marks; b.tot += l.q.m;
      });
      const weak = Object.keys(byTopic).filter(k => byTopic[k].got / byTopic[k].tot < 0.6);

      shell.innerHTML = `
        <div class="card" style="text-align:center">
          <div class="score-ring" style="--p:${pct}"><b>${pct}%</b></div>
          <h2 style="margin:0 0 4px">${marksGot} out of ${marksTotal} marks</h2>
          ${ranOut ? '<p class="chip bad">Time ran out with ' + (qs.length - i) + ' question' + (qs.length - i === 1 ? '' : 's') + ' unanswered, so those marks are lost. That is the exam too.</p>' : ""}
          <p>${pct >= 80 ? "Strong. Move on to the next subtopic." : pct >= 55 ? "Solid start. The notes for the weak areas below are worth another read." : "Worth going back over the notes before you try again."}</p>
        </div>
        <h3>Marks by subtopic</h3>
        <div class="table-wrap"><table>
          <tr><th>Subtopic</th><th>Marks</th><th></th></tr>
          ${Object.keys(byTopic).sort().map(k => {
            const b = byTopic[k], p = Math.round(b.got / b.tot * 100);
            const sub = App.findSub(k);
            return "<tr><td>" + k + " " + esc(sub ? sub.title : "") + "</td><td>" + b.got + " / " + b.tot +
              '</td><td><span class="chip ' + (p >= 80 ? "good" : p >= 50 ? "warn" : "bad") + '">' + p + "%</span></td></tr>";
          }).join("")}
        </table></div>
        ${weak.length ? '<div class="callout trap"><div class="ttl">Go back to</div><p>' +
            weak.map(k => '<a href="#/sub/' + k + '">' + k + " " + esc((App.findSub(k) || {}).title || "") + "</a>").join(" &middot; ") + "</p></div>" : ""}
        <div class="btn-row">
          <button class="btn" id="qAgain">Try another set</button>
          <a class="btn sec" href="${opts.back || "#/home"}">Back</a>
          <a class="btn sec" href="#/progress">See my progress</a>
        </div>`;
      shell.querySelector("#qAgain").onclick = () => start(el, opts);
      if (pct >= 80) App.confetti();
      App.refreshChrome();
    }
  }

  return { start, count: f => QUESTIONS.filter(f).length };
})();
