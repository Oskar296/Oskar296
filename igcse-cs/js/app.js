/* Router, chrome and pages. */

const SYLLABUS = window.SYLLABUS_P1.concat(window.SYLLABUS_P2);

const App = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const $ = sel => document.querySelector(sel);
  const main = $("#main");

  const ALL_SUBS = SYLLABUS.flatMap(t => t.subs.map(s => Object.assign({ topic: t }, s)));
  const findSub = id => ALL_SUBS.find(s => s.id === id);
  const findTopic = n => SYLLABUS.find(t => t.n === n);

  /* ================================================================== */
  /* chrome                                                              */
  /* ================================================================== */
  function setHue(h) { document.documentElement.style.setProperty("--hue", h); }

  function buildSidebar() {
    const nav = $("#sidebarNav");
    const link = (href, label, em, extra) =>
      `<a class="nav-item" href="${href}" data-r="${href}"><span class="em">${em}</span><span class="lbl">${label}</span>${extra || ""}</a>`;

    let html = `<div class="nav-group">
      ${link("#/home", "Home", "\u{1F3E0}")}
      ${link("#/cards", "Flashcards", "\u{1F5C2}")}
      ${link("#/quiz/mixed", "Mixed quiz", "\u{1F3AF}")}
      ${link("#/tools", "Labs", "\u{1F9EA}")}
      ${link("#/progress", "My progress", "\u{1F4C8}")}
      ${link("#/exam", "Exam guide", "\u{1F393}")}
    </div>`;

    [1, 2].forEach(p => {
      html += '<div class="nav-group"><div class="nav-head">Paper ' + p + (p === 1 ? " &middot; Computer systems" : " &middot; Algorithms and logic") + "</div>";
      SYLLABUS.filter(t => t.paper === p).forEach(t => {
        const m = Store.topicMastery(t);
        html += `<a class="nav-item" href="#/topic/${t.n}" data-r="#/topic/${t.n}" style="--hue:${t.hue}">
            <span class="nav-num">${t.n}</span><span class="lbl">${esc(t.title)}</span>
            <span class="dot ${m >= 80 ? "p3" : m >= 40 ? "p2" : m > 0 ? "p1" : ""}"></span></a>
          <div class="nav-sub" id="ns${t.n}">
            ${t.subs.map(s => `<a class="nav-item" href="#/sub/${s.id}" data-r="#/sub/${s.id}">
              <span class="nav-num">${s.id}</span><span class="lbl">${esc(s.title)}</span></a>`).join("")}
          </div>`;
      });
      html += "</div>";
    });
    nav.innerHTML = html;
  }

  function refreshChrome() {
    const pct = Store.overall();
    $("#overallBar").style.width = pct + "%";
    $("#overallPct").textContent = pct + "%";
    const st = Store.state.streak;
    $("#streakNum").textContent = st.count;
    $("#streakChip").classList.toggle("hot", st.count > 0 && st.last === Store.todayKey());
    highlightNav();
  }

  function highlightNav() {
    const h = location.hash || "#/home";
    document.querySelectorAll(".nav-item").forEach(a => a.classList.toggle("active", a.dataset.r === h));
    document.querySelectorAll(".nav-sub").forEach(d => d.classList.remove("open"));
    const m = /^#\/(?:sub|topic)\/(\d+)/.exec(h);
    if (m) { const d = $("#ns" + m[1]); if (d) d.classList.add("open"); }
  }

  /* ================================================================== */
  /* pages                                                               */
  /* ================================================================== */
  function pageHome() {
    setHue(168);
    const pct = Store.overall();
    const dueCards = Cards.all().filter(c => Store.cardState(c.id).due <= Date.now()).length;
    const weakest = ALL_SUBS.slice().sort((a, b) => Store.mastery(a.id) - Store.mastery(b.id)).slice(0, 3);
    const started = ALL_SUBS.some(s => Store.mastery(s.id) > 0);

    main.innerHTML = `
      <section class="hero">
        <span class="eyebrow">Cambridge IGCSE 0478 &middot; 0984 &middot; exams 2026 to 2028</span>
        <h1>The whole syllabus, in a form you will actually use.</h1>
        <p class="lede">Ten topics, ${ALL_SUBS.length} subtopics, ${Cards.all().length} flashcards, ${QUESTIONS.length} exam-style questions and ${Object.keys(Tools).length} interactive labs. Everything saves in your browser, nothing needs an account.</p>
        <div class="btn-row">
          <a class="btn" href="${started ? "#/sub/" + weakest[0].id : "#/sub/1.1"}">${started ? "Pick up where you left off" : "Start with topic 1.1"}</a>
          <a class="btn sec" href="#/quiz/mixed">Mixed quiz</a>
          <a class="btn sec" href="#/cards/due">Review ${dueCards} cards</a>
        </div>
        <div class="stat-row">
          <div class="stat"><b>${pct}%</b><span>syllabus covered</span></div>
          <div class="stat"><b>${Store.state.streak.count}</b><span>day streak</span></div>
          <div class="stat"><b>${Store.state.xp}</b><span>XP earned</span></div>
          <div class="stat"><b>${dueCards}</b><span>cards due</span></div>
        </div>
      </section>

      ${started ? `<h2>Your three weakest subtopics</h2>
      <div class="grid g3">
        ${weakest.map(s => topicCardSub(s)).join("")}
      </div>` : ""}

      <h2>Paper 1 &middot; Computer systems</h2>
      <div class="grid g2">${SYLLABUS.filter(t => t.paper === 1).map(topicCard).join("")}</div>

      <h2>Paper 2 &middot; Algorithms, programming and logic</h2>
      <div class="grid g2">${SYLLABUS.filter(t => t.paper === 2).map(topicCard).join("")}</div>

      <h2>Labs worth opening</h2>
      <div class="grid g2">
        ${["runner", "scenario", "flowchart", "logic"].map(k => {
          const t = Tools[k];
          return `<a class="card tool-card" href="#/tool/${k}"><span class="em">${t.em}</span><div>
            <h3 style="margin:0 0 4px">${esc(t.title)}</h3><p style="margin:0;font-size:13px">${esc(t.blurb)}</p></div></a>`;
        }).join("")}
      </div>

      <div class="callout tip" style="margin-top:28px">
        <div class="ttl">How to use this properly</div>
        <p>Read a subtopic, rate your confidence honestly, then take its quiz straight away. Come back the next day and do the flashcards before you read anything new. Recall beats rereading every time, which is why the quizzes and cards drive your progress bar and reading alone only moves it a fifth of the way.</p>
      </div>`;
  }

  function topicCard(t) {
    const m = Store.topicMastery(t);
    const nq = QUESTIONS.filter(q => t.subs.some(s => s.id === q.t)).length;
    return `<a class="topic-card" href="#/topic/${t.n}" style="--hue:${t.hue}">
      <div class="tc-top"><span class="em">${t.em}</span><span class="tc-num">Topic ${t.n}</span></div>
      <h3>${esc(t.title)}</h3>
      <p>${esc(t.blurb)}</p>
      <div class="bar"><i style="width:${m}%"></i></div>
      <div class="tc-meta"><span>${t.subs.length} subtopics &middot; ${nq} questions</span><span>${m}%</span></div>
    </a>`;
  }
  function topicCardSub(s) {
    const m = Store.mastery(s.id);
    return `<a class="topic-card" href="#/sub/${s.id}" style="--hue:${s.topic.hue}">
      <div class="tc-top"><span class="tc-num">${s.id}</span></div>
      <h3>${esc(s.title)}</h3>
      <div class="bar"><i style="width:${m}%"></i></div>
      <div class="tc-meta"><span>${esc(s.topic.title)}</span><span>${m}%</span></div>
    </a>`;
  }

  function pageTopic(n) {
    const t = findTopic(n);
    if (!t) return pageHome();
    setHue(t.hue);
    const nq = QUESTIONS.filter(q => t.subs.some(s => s.id === q.t)).length;
    const nc = Cards.all().filter(c => c.topic === t.n).length;

    main.innerHTML = `
      <div class="crumbs"><a href="#/home">Home</a> / Paper ${t.paper} / Topic ${t.n}</div>
      <div class="page-head">
        <span class="eyebrow">${t.em} Topic ${t.n}</span>
        <h1>${esc(t.title)}</h1>
        <p class="lede">${esc(t.blurb)}</p>
      </div>
      <div class="btn-row">
        <a class="btn" href="#/quiz/topic/${t.n}">Quiz this topic (${nq} questions)</a>
        <a class="btn sec" href="#/cards/topic/${t.n}">Flashcards (${nc})</a>
      </div>
      <div class="grid g2">${t.subs.map(s => {
        const m = Store.mastery(s.id);
        return `<a class="topic-card" href="#/sub/${s.id}">
          <div class="tc-top"><span class="tc-num">${s.id}</span></div>
          <h3>${esc(s.title)}</h3>
          <p>${s.goals.length} objectives &middot; ${s.terms.length} key terms</p>
          <div class="bar"><i style="width:${m}%"></i></div>
          <div class="tc-meta"><span>${QUESTIONS.filter(q => q.t === s.id).length} questions</span><span>${m}%</span></div>
        </a>`;
      }).join("")}</div>`;
  }

  function pageSub(id) {
    const s = findSub(id);
    if (!s) return pageHome();
    setHue(s.topic.hue);
    Store.markRead(id);

    const idx = ALL_SUBS.findIndex(x => x.id === id);
    const prev = ALL_SUBS[idx - 1], next = ALL_SUBS[idx + 1];
    const nq = QUESTIONS.filter(q => q.t === id).length;
    const conf = Store.state.conf[id];

    main.innerHTML = `
      <div class="crumbs"><a href="#/home">Home</a> / <a href="#/topic/${s.topic.n}">${esc(s.topic.title)}</a> / ${s.id}</div>
      <div class="page-head">
        <span class="eyebrow">${s.topic.em} ${s.id}</span>
        <h1>${esc(s.title)}</h1>
      </div>

      <div class="sub-tabs" id="subTabs">
        <button class="sub-tab on" data-p="notes">Notes</button>
        <button class="sub-tab" data-p="terms">Key terms (${s.terms.length})</button>
        <button class="sub-tab" data-p="tips">Exam tips</button>
      </div>

      <div id="subPanel"></div>

      <div class="card" style="margin-top:26px">
        <h4 style="margin-top:0">How confident are you with ${s.id}?</h4>
        <div class="confidence" id="confRow">
          <button class="conf-btn ${conf === 1 ? "on" : ""}" data-v="1">Shaky</button>
          <button class="conf-btn ${conf === 2 ? "on" : ""}" data-v="2">Getting there</button>
          <button class="conf-btn ${conf === 3 ? "on" : ""}" data-v="3">Solid</button>
          <span style="font-size:12.5px;color:var(--ink-3);margin-left:6px">This feeds your progress bar. Be honest.</span>
        </div>
      </div>

      <div class="btn-row">
        ${nq ? `<a class="btn" href="#/quiz/${s.id}">Test yourself (${nq} questions)</a>` : ""}
        <a class="btn sec" href="#/cards/sub/${s.id}">Flashcards</a>
        ${(s.tools || []).map(([label, href]) => `<a class="btn sec" href="${href}">${esc(label)}</a>`).join("")}
        <button class="btn sec no-print" onclick="window.print()">Print these notes</button>
      </div>

      <div class="pager">
        ${prev ? `<a href="#/sub/${prev.id}"><small>Previous</small>${prev.id} ${esc(prev.title)}</a>` : "<span></span>"}
        ${next ? `<a href="#/sub/${next.id}" style="text-align:right"><small>Next</small>${next.id} ${esc(next.title)}</a>` : "<span></span>"}
      </div>`;

    const panel = $("#subPanel");
    const panels = {
      notes: () => `<div class="with-toc">
          <div class="notes-body">
            <ul class="goals">${s.goals.map(g => "<li>" + esc(g) + "</li>").join("")}</ul><hr>${s.notes}
          </div>
          <nav class="toc" id="toc" aria-label="On this page"></nav>
        </div>`,
      terms: () => '<div class="terms">' + s.terms.map(([t, d]) =>
        '<dl class="term"><dt>' + esc(t) + "</dt><dd>" + esc(d) + "</dd></dl>").join("") +
        '</div><div class="btn-row"><a class="btn sec" href="#/cards/sub/' + s.id + '">Drill these as flashcards</a></div>',
      tips: () => (s.tips || []).map(t => '<div class="callout tip"><div class="ttl">Tip</div><p>' + esc(t) + "</p></div>").join("") +
        '<div class="callout"><div class="ttl">Objectives for ' + s.id + '</div><ul>' +
        s.goals.map(g => "<li>" + esc(g) + "</li>").join("") + "</ul></div>"
    };
    const show = p => {
      panel.innerHTML = panels[p]();
      panel.classList.remove("fade-in"); void panel.offsetWidth; panel.classList.add("fade-in");
      enhanceCode(panel);
      if (p === "notes") buildToc(panel);
      trackReading();
    };
    document.querySelectorAll("#subTabs .sub-tab").forEach(b => b.onclick = () => {
      document.querySelectorAll("#subTabs .sub-tab").forEach(x => x.classList.toggle("on", x === b));
      show(b.dataset.p);
    });
    show("notes");

    document.querySelectorAll("#confRow .conf-btn").forEach(b => b.onclick = () => {
      Store.setConf(id, +b.dataset.v);
      document.querySelectorAll("#confRow .conf-btn").forEach(x =>
        x.classList.toggle("on", x === b && Store.state.conf[id] === +b.dataset.v));
      refreshChrome();
    });
  }

  function pageTools() {
    setHue(168);
    main.innerHTML = `
      <div class="page-head">
        <span class="eyebrow">Labs</span>
        <h1>${Object.keys(Tools).length} things you can poke at</h1>
        <p class="lede">Reading about a logical shift is not the same as watching the bits fall off the end. These are the parts of the syllabus that make more sense when you can break them.</p>
      </div>
      <div class="grid g2">
        ${Object.keys(Tools).map(k => {
          const t = Tools[k], sub = findSub(t.topic);
          return `<a class="card tool-card" href="#/tool/${k}">
            <span class="em">${t.em}</span>
            <div><h3 style="margin:0 0 4px">${esc(t.title)}</h3>
            <p style="margin:0 0 8px;font-size:13px">${esc(t.blurb)}</p>
            <span class="chip">${t.topic} ${esc(sub ? sub.title : "")}</span></div></a>`;
        }).join("")}
      </div>`;
  }

  function pageTool(key) {
    const t = Tools[key];
    if (!t) return pageTools();
    const sub = findSub(t.topic);
    if (sub) setHue(sub.topic.hue);
    main.innerHTML = `
      <div class="crumbs"><a href="#/home">Home</a> / <a href="#/tools">Labs</a> / ${esc(t.title)}</div>
      <div class="page-head">
        <span class="eyebrow">${t.em} Lab</span>
        <h1>${esc(t.title)}</h1>
        <p class="lede">${esc(t.blurb)}</p>
        ${sub ? `<a class="chip" href="#/sub/${sub.id}">Notes for ${sub.id} ${esc(sub.title)}</a>` : ""}
      </div>
      <div id="toolMount"></div>`;
    const mount = $("#toolMount");
    t.render(mount);
    main._cleanup = mount._cleanup;   // labs with timers or key handlers tidy up on navigation
  }

  function pageProgress() {
    setHue(168);
    const pct = Store.overall();
    const rows = ALL_SUBS.map(s => {
      const m = Store.mastery(s.id);
      const q = Store.state.quiz[s.id];
      return { s, m, q };
    });
    const strong = rows.filter(r => r.m >= 80).length;
    const untouched = rows.filter(r => r.m === 0).length;
    const cards = Cards.all();
    const learned = cards.filter(c => Store.cardState(c.id).box >= 3).length;

    main.innerHTML = `
      <div class="page-head">
        <span class="eyebrow">Progress</span>
        <h1>Where you actually are</h1>
        <p class="lede">Each subtopic scores out of 100: reading the notes is worth 20, your own confidence rating up to 30, and quiz accuracy up to 50. Reading alone will never get you past a fifth.</p>
      </div>

      <div class="stat-row">
        <div class="stat"><b>${pct}%</b><span>overall</span></div>
        <div class="stat"><b>${strong}</b><span>subtopics at 80%+</span></div>
        <div class="stat"><b>${untouched}</b><span>not started</span></div>
        <div class="stat"><b>${learned}/${cards.length}</b><span>cards in long boxes</span></div>
        <div class="stat"><b>${Store.state.streak.count}</b><span>day streak</span></div>
      </div>

      <h2>Every subtopic</h2>
      <div class="table-wrap"><table>
        <tr><th>Subtopic</th><th>Quiz accuracy</th><th>Confidence</th><th style="width:26%">Mastery</th></tr>
        ${rows.map(r => {
          const acc = r.q && r.q.asked ? Math.round(r.q.right / r.q.asked * 100) + "%" : "&ndash;";
          const c = Store.state.conf[r.s.id];
          return `<tr>
            <td><a href="#/sub/${r.s.id}">${r.s.id} ${esc(r.s.title)}</a></td>
            <td>${acc}${r.q ? ' <span style="color:var(--ink-3)">(' + r.q.asked + ")</span>" : ""}</td>
            <td>${c ? ["", "Shaky", "Getting there", "Solid"][c] : "&ndash;"}</td>
            <td><div class="bar"><i style="width:${r.m}%"></i></div></td>
          </tr>`;
        }).join("")}
      </table></div>

      <h2>What to do next</h2>
      <div class="grid g3">
        ${rows.slice().sort((a, b) => a.m - b.m).slice(0, 3).map(r => topicCardSub(r.s)).join("")}
      </div>

      <h2>Move your progress to another device</h2>
      <p class="lede">Progress is stored in this browser only, so it does not follow you to a
        different device, and clearing site data wipes it. Copy the backup code somewhere safe,
        then paste it in on the other machine.</p>
      <div class="card">
        <div class="btn-row" style="margin-top:0">
          <button class="btn" id="bkMake">Show my backup code</button>
          <button class="btn sec" id="bkRestore">Restore from a code</button>
        </div>
        <div id="bkArea"></div>
      </div>`;
  }

  /* Backups are copy and paste rather than a file download: the artifact
     viewer's sandbox makes any page-initiated download inert. */
  function wireBackup() {
    const area = $("#bkArea");
    if (!area) return;
    $("#bkMake").onclick = () => {
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(Store.state))));
      area.innerHTML = '<label style="display:block;font-size:11.5px;text-transform:uppercase;' +
        'letter-spacing:.09em;color:var(--ink-3);margin:14px 0 5px;font-weight:700">Your backup code</label>' +
        '<textarea class="input code-area" id="bkText" rows="4" readonly></textarea>' +
        '<div class="btn-row"><button class="btn sec sm" id="bkCopy">Copy to clipboard</button></div>';
      $("#bkText").value = code;
      $("#bkCopy").onclick = () => {
        const ta = $("#bkText");
        ta.select();
        const done = () => { $("#bkCopy").textContent = "Copied"; setTimeout(() => { $("#bkCopy").textContent = "Copy to clipboard"; }, 1500); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(done, done);
        else { try { document.execCommand("copy"); done(); } catch (e) {} }
      };
    };
    $("#bkRestore").onclick = () => {
      area.innerHTML = '<label style="display:block;font-size:11.5px;text-transform:uppercase;' +
        'letter-spacing:.09em;color:var(--ink-3);margin:14px 0 5px;font-weight:700">Paste a backup code</label>' +
        '<textarea class="input code-area" id="bkIn" rows="4" placeholder="Paste here"></textarea>' +
        '<div class="btn-row"><button class="btn sm" id="bkGo">Restore it</button></div><div id="bkMsg"></div>';
      $("#bkGo").onclick = () => {
        let data = null;
        try { data = JSON.parse(decodeURIComponent(escape(atob($("#bkIn").value.trim())))); }
        catch (e) { data = null; }          // never surface a raw decoding error
        try {
          if (!data || typeof data !== "object" || !("conf" in data) || !("cards" in data)) {
            throw new Error("that does not look like a BITWISE backup code");
          }
          Object.assign(Store.state, data);
          Store.save();
          toast("Progress restored");
          buildSidebar();
          route();
        } catch (e) {
          $("#bkMsg").innerHTML = '<div class="callout trap"><div class="ttl">Could not restore</div><p>' +
            esc(e.message || "that does not look like a BITWISE backup code") +
            ". Check you copied the whole code, with nothing missing from either end.</p></div>";
        }
      };
    };
  }

  const COMMAND_WORDS = [
    ["State / Give / Name", "Recall one fact. No explanation needed, and no marks for adding one. Keep it to a line."],
    ["Identify", "Pick out and name the relevant item from information you have been given."],
    ["Describe", "Say what something is or what happens, in enough detail to cover the marks. One mark usually needs one clear statement, so a 4 mark describe needs four separate points."],
    ["Explain", "Give reasons. Every point needs a because or a so, linking cause to effect. This is where most marks are lost by describing instead."],
    ["Compare", "Give the similarities and differences. Write about both things in the same sentence, for example 'RAM is volatile whereas ROM is not', not two separate paragraphs."],
    ["Suggest", "Apply what you know to a new situation where there is no single fixed answer. Your answer must fit the scenario in the question."],
    ["Complete", "Fill in the gaps in the table, diagram or code that has been given."],
    ["Calculate", "Work out a number. Show every stage of the working, because method marks are given even if the final answer is wrong."],
    ["Draw", "Produce a diagram, such as a flowchart or logic circuit, using the correct standard symbols."],
    ["Show (that)", "Prove a given statement by writing out the steps that lead to it."],
    ["Write", "Produce an algorithm, program code or SQL. Follow the language or pseudocode style the question uses."],
    ["Tick", "Mark the correct boxes only. Ticking extra boxes normally cancels a mark."]
  ];

  function pageExam() {
    setHue(210);
    main.innerHTML = `
      <div class="page-head">
        <span class="eyebrow">Exam guide</span>
        <h1>What the papers ask, and how to answer them</h1>
        <p class="lede">Syllabus 0478 / 0984 for examination in <b>2026, 2027 and 2028</b>. Two papers, 75 marks each, 1 hour 45 minutes each, worth 50% apiece. There is no coursework, so your grade comes entirely from the two written papers.</p>
      </div>

      <div class="grid g2">
        <div class="card">
          <h3 style="margin-top:0">Paper 1 &middot; Computer systems</h3>
          <p>1 hour 45 minutes &middot; 75 marks &middot; 50%</p>
          <p>Short answer and structured questions covering topics 1 to 6. Expect conversions, calculations where the working carries the marks, and several longer describe and explain questions.</p>
          <div class="btn-row" style="margin-bottom:0">
            <a class="btn sec sm" href="#/quiz/paper/1">Paper 1 mixed quiz</a>
            <a class="btn sec sm" href="#/quiz/mock/1">30 minute timed mock</a>
          </div>
        </div>
        <div class="card">
          <h3 style="margin-top:0">Paper 2 &middot; Algorithms, programming and logic</h3>
          <p>1 hour 45 minutes &middot; 75 marks &middot; 50%</p>
          <p>Topics 7 to 10. Expect a trace table, SQL, a logic circuit or truth table, and a 15 mark scenario question at the end.</p>
          <div class="btn-row" style="margin-bottom:0">
            <a class="btn sec sm" href="#/quiz/paper/2">Paper 2 mixed quiz</a>
            <a class="btn sec sm" href="#/quiz/mock/2">30 minute timed mock</a>
          </div>
        </div>
      </div>

      <div class="callout trap">
        <div class="ttl">The rule that costs whole answers</div>
        <p>On Paper 2, wherever a solution involves code you must write it in <b>pseudocode</b>. Answers written in a programming language <b>are not awarded marks</b>. The single exception is the 15 mark scenario question, where you may use pseudocode <b>or</b> Python, Visual Basic or Java.</p>
        <p style="margin-bottom:0">So unless you are on that last question, write pseudocode, even if you find Python easier.</p>
      </div>

      <h2>The 15 mark scenario question</h2>
      <p class="lede">The last question on Paper 2 gives you an unseen real world scenario and asks for a whole program. It is worth a fifth of the paper, so it is worth a checklist.</p>
      <div class="grid g2">
        <div class="card tight"><h4 style="margin-top:0">Declare everything</h4><p style="margin:0">Every variable and constant used must be declared, with a sensible data type. Free marks, routinely dropped.</p></div>
        <div class="card tight"><h4 style="margin-top:0">Message every input and output</h4><p style="margin:0">Prompts and results need suitable text, not a bare INPUT X. The mark scheme asks for it explicitly.</p></div>
        <div class="card tight"><h4 style="margin-top:0">Comment your code</h4><p style="margin:0">Add comments explaining how the solution works. This is part of the requirement, not decoration.</p></div>
        <div class="card tight"><h4 style="margin-top:0">Show a range of techniques</h4><p style="margin:0">Selection, iteration, totalling and counting, arrays and a subroutine where one fits. Breadth is rewarded.</p></div>
        <div class="card tight"><h4 style="margin-top:0">Logic beats syntax</h4><p style="margin:0">A small syntax slip is not what loses the marks. A solution that does not address the scenario is.</p></div>
        <div class="card tight"><h4 style="margin-top:0">Re-read the scenario</h4><p style="margin:0">Tick off each stated requirement against your code before you move on. Each one carries marks.</p></div>
      </div>

      <h2>Command words, and what they actually want</h2>
      <div class="table-wrap"><table>
        <tr><th style="width:22%">Command word</th><th>What the mark scheme is looking for</th></tr>
        ${COMMAND_WORDS.map(([w, d]) => "<tr><td><b>" + w + "</b></td><td>" + d + "</td></tr>").join("")}
      </table></div>

      <h2>Six habits that pick up marks</h2>
      <div class="grid g2">
        <div class="card tight"><h4 style="margin-top:0">Count the marks first</h4><p style="margin:0">Four marks means four separate points. If you have written three things, you are not finished.</p></div>
        <div class="card tight"><h4 style="margin-top:0">Use the scenario</h4><p style="margin:0">If the question is about a hospital, name a heart rate sensor, not "a sensor". Generic answers lose application marks.</p></div>
        <div class="card tight"><h4 style="margin-top:0">Never just name a thing</h4><p style="margin:0">"A firewall" is not an answer. Say what it does: it monitors traffic and blocks anything failing its criteria.</p></div>
        <div class="card tight"><h4 style="margin-top:0">Show every line of working</h4><p style="margin:0">In file size and conversion questions the method carries most of the marks, even if you slip on the arithmetic.</p></div>
        <div class="card tight"><h4 style="margin-top:0">Use the technical word</h4><p style="margin:0">Volatile, packet, actuator, iteration, validation. The exact term is often the mark.</p></div>
        <div class="card tight"><h4 style="margin-top:0">Do not contradict yourself</h4><p style="margin:0">A correct point followed by a wrong one can cancel out. Write the answer, then stop.</p></div>
      </div>

      <h2>Glossary</h2>
      <p class="lede">Every key term in the syllabus, in one list. <a href="#/glossary">Open the full glossary</a>.</p>`;
  }

  function pageGlossary() {
    setHue(168);
    const terms = [];
    SYLLABUS.forEach(t => t.subs.forEach(s => s.terms.forEach(([term, def]) =>
      terms.push({ term, def, sub: s.id, hue: t.hue }))));
    terms.sort((a, b) => a.term.localeCompare(b.term));
    main.innerHTML = `
      <div class="page-head">
        <span class="eyebrow">Glossary</span>
        <h1>${terms.length} definitions, A to Z</h1>
        <p class="lede">These are the wordings that score. Search with the box at the top, or press the / key.</p>
      </div>
      <div class="terms">
        ${terms.map(t => `<dl class="term" style="--hue:${t.hue}">
          <dt>${esc(t.term)} <a class="chip" href="#/sub/${t.sub}" style="float:right">${t.sub}</a></dt>
          <dd>${esc(t.def)}</dd></dl>`).join("")}
      </div>`;
  }

  /* ================================================================== */
  /* note page enhancements                                              */
  /* ================================================================== */

  /* Give every code block a copy button. Students retype pseudocode into the
     runner constantly, and retyping is where transcription errors come from. */
  function enhanceCode(root) {
    root.querySelectorAll("pre").forEach(pre => {
      if (pre.parentElement.classList.contains("pre-wrap")) return;
      const wrap = document.createElement("div");
      wrap.className = "pre-wrap";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      const btn = document.createElement("button");
      btn.className = "copy";
      btn.type = "button";
      btn.textContent = "Copy";
      btn.onclick = () => {
        const text = pre.innerText;
        const done = () => { btn.textContent = "Copied"; setTimeout(() => { btn.textContent = "Copy"; }, 1400); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, fallback);
        } else fallback();
        function fallback() {                       // file:// and older browsers
          const ta = document.createElement("textarea");
          ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
          document.body.appendChild(ta); ta.select();
          try { document.execCommand("copy"); done(); } catch (e) { btn.textContent = "Select it"; }
          ta.remove();
        }
      };
      wrap.appendChild(btn);
    });
  }

  /* A contents rail for the long note pages, built from the h3 headings. */
  let tocSpy = null;
  function buildToc(root) {
    const toc = root.querySelector("#toc");
    const body = root.querySelector(".notes-body");
    if (!toc || !body) return;
    const heads = Array.from(body.querySelectorAll("h3"));
    if (heads.length < 3) { toc.remove(); return; }

    heads.forEach((h, i) => { h.id = "h" + i + "-" + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30); });
    toc.innerHTML = '<div class="toc-head">On this page</div>' +
      heads.map(h => '<a href="#' + h.id + '" data-id="' + h.id + '">' + esc(h.textContent) + "</a>").join("");

    toc.querySelectorAll("a").forEach(a => a.onclick = e => {
      e.preventDefault();                            // keep the hash route intact
      const target = document.getElementById(a.dataset.id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    if (tocSpy) tocSpy.disconnect();
    tocSpy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        toc.querySelectorAll("a").forEach(a => a.classList.toggle("on", a.dataset.id === en.target.id));
      });
    }, { rootMargin: "-70px 0px -70% 0px" });
    heads.forEach(h => tocSpy.observe(h));
  }

  /* Reading progress across the top, so a long subtopic shows how much is left. */
  let readHandler = null;
  function trackReading() {
    const bar = $("#readBar");
    if (readHandler) removeEventListener("scroll", readHandler);
    readHandler = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 120 ? Math.min(100, Math.max(0, scrollY / h * 100)) : 0) + "%";
    };
    addEventListener("scroll", readHandler, { passive: true });
    readHandler();
  }

  /* ================================================================== */
  /* search                                                              */
  /* ================================================================== */
  let searchIndex = null;
  function buildIndex() {
    const ix = [];
    SYLLABUS.forEach(t => {
      ix.push({ kind: "topic", title: "Topic " + t.n + " " + t.title, sub: t.blurb, href: "#/topic/" + t.n, hay: (t.title + " " + t.blurb).toLowerCase() });
      t.subs.forEach(s => {
        const plain = s.notes.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
        ix.push({
          kind: "notes", title: s.id + " " + s.title, sub: t.title, href: "#/sub/" + s.id,
          hay: (s.id + " " + s.title + " " + s.goals.join(" ") + " " + plain).toLowerCase()
        });
        s.terms.forEach(([term, def]) => ix.push({
          kind: "term", title: term, sub: def, href: "#/sub/" + s.id, hay: (term + " " + def).toLowerCase()
        }));
      });
    });
    Object.keys(Tools).forEach(k => ix.push({
      kind: "lab", title: Tools[k].title, sub: Tools[k].blurb, href: "#/tool/" + k,
      hay: (Tools[k].title + " " + Tools[k].blurb).toLowerCase()
    }));
    ["Exam guide|#/exam|command words, paper structure and marking habits",
     "Glossary|#/glossary|every key term in one list",
     "Flashcards|#/cards|spaced repetition over every definition",
     "My progress|#/progress|mastery per subtopic"].forEach(r => {
      const [title, href, sub] = r.split("|");
      ix.push({ kind: "page", title, sub, href, hay: (title + " " + sub).toLowerCase() });
    });
    return ix;
  }

  function runSearch(term) {
    const res = $("#searchResults");
    term = term.trim().toLowerCase();
    if (!term) {
      res.innerHTML = ['#/quiz/mixed|Mixed quiz|questions pulled from the whole syllabus',
                       '#/cards/due|Flashcards due today|spaced repetition',
                       '#/tool/logic|Logic lab|truth tables from any expression',
                       '#/exam|Exam guide|command words and paper structure']
        .map(r => { const [href, t, s] = r.split("|");
          return '<a class="sr" href="' + href + '"><span class="kind">jump to</span><b>' + t + "</b><small>" + s + "</small></a>"; }).join("");
      return;
    }
    searchIndex = searchIndex || buildIndex();
    const words = term.split(/\s+/);
    const hits = searchIndex
      .map(e => {
        let score = 0;
        words.forEach(w => {
          if (!e.hay.includes(w)) { score = -999; return; }
          score += 1;
          if (e.title.toLowerCase().includes(w)) score += 4;
          if (e.title.toLowerCase().startsWith(w)) score += 3;
        });
        if (e.kind === "term") score += 1;
        return { e, score };
      })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 14);

    res.innerHTML = hits.length
      ? hits.map(h => '<a class="sr" href="' + h.e.href + '"><span class="kind">' + h.e.kind + "</span><b>" +
          esc(h.e.title) + "</b><small>" + esc(h.e.sub.slice(0, 110)) + "</small></a>").join("")
      : '<div style="padding:18px;color:var(--ink-3);font-size:14px">Nothing found for that. Try a syllabus word such as "parity", "interrupt" or "validation".</div>';
  }

  function openSearch() {
    $("#searchBox").hidden = false;
    $("#searchInput").value = "";
    runSearch("");
    setTimeout(() => $("#searchInput").focus(), 20);
  }
  function closeSearch() { $("#searchBox").hidden = true; }

  /* ================================================================== */
  /* extras                                                              */
  /* ================================================================== */
  const SHORTCUTS = [
    ["/ &nbsp;or&nbsp; Ctrl K", "Search the syllabus"],
    ["?", "Show this list"],
    ["g then h", "Go home"],
    ["g then c", "Flashcards"],
    ["g then q", "Mixed quiz"],
    ["g then l", "Labs"],
    ["g then p", "My progress"],
    ["g then e", "Exam guide"],
    ["j &nbsp;/&nbsp; k", "Next or previous subtopic"],
    ["t", "Switch theme"],
    ["space", "Flip a flashcard"],
    ["1 &nbsp;/&nbsp; 2", "Grade a flashcard"],
    ["Esc", "Close anything open"]
  ];

  function toggleSheet(force) {
    let sheet = $("#sheet");
    const open = force !== undefined ? force : !sheet;
    if (!open) { if (sheet) sheet.remove(); return; }
    if (sheet) return;
    sheet = document.createElement("div");
    sheet.className = "sheet";
    sheet.id = "sheet";
    sheet.innerHTML = `<div class="sheet-panel" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts">
        <h3>Keyboard shortcuts</h3>
        <div class="keys">${SHORTCUTS.map(([k, d]) => "<div><span>" + d + "</span><kbd>" + k + "</kbd></div>").join("")}</div>
        <div class="btn-row" style="margin-bottom:0"><button class="btn sec sm" id="sheetClose">Close</button></div>
      </div>`;
    document.body.appendChild(sheet);
    sheet.onclick = e => { if (e.target === sheet || e.target.id === "sheetClose") toggleSheet(false); };
  }

  function buildTabbar() {
    const bar = document.createElement("nav");
    bar.className = "tabbar";
    bar.id = "tabbar";
    bar.setAttribute("aria-label", "Main sections");
    bar.innerHTML = [
      ["#/home", "\u{1F3E0}", "Home"],
      ["#/cards/due", "\u{1F5C2}", "Cards"],
      ["#/quiz/mixed", "\u{1F3AF}", "Quiz"],
      ["#/tools", "\u{1F9EA}", "Labs"],
      ["#/progress", "\u{1F4C8}", "Progress"]
    ].map(([href, em, label]) =>
      '<a href="' + href + '" data-tab="' + href + '"><span class="em">' + em + "</span>" + label + "</a>").join("");
    document.body.appendChild(bar);
  }

  function highlightTabs() {
    const h = location.hash || "#/home";
    document.querySelectorAll("#tabbar a").forEach(a => {
      const root = a.dataset.tab.split("/")[1];
      a.classList.toggle("on", h.split("/")[1] === root);
    });
  }

  function toast(msg) {
    const d = document.createElement("div");
    d.className = "toast"; d.textContent = msg;
    $("#toasts").appendChild(d);
    setTimeout(() => d.remove(), 2600);
  }

  function confetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = $("#fx"), ctx = cv.getContext("2d");
    cv.width = innerWidth; cv.height = innerHeight;
    const hue = getComputedStyle(document.documentElement).getPropertyValue("--hue") || 168;
    const bits = Array.from({ length: 90 }, () => ({
      x: innerWidth / 2 + (Math.random() - .5) * 260,
      y: innerHeight / 3,
      vx: (Math.random() - .5) * 9,
      vy: Math.random() * -11 - 3,
      r: 3 + Math.random() * 5,
      a: 1,
      c: "hsl(" + (+hue + Math.random() * 90 - 20) + " 85% 62%)"
    }));
    let frames = 0;
    (function tick() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      bits.forEach(b => {
        b.vy += .38; b.x += b.vx; b.y += b.vy; b.a -= .011;
        ctx.globalAlpha = Math.max(0, b.a);
        ctx.fillStyle = b.c;
        ctx.fillRect(b.x, b.y, b.r, b.r * 1.6);
      });
      if (++frames < 110) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, cv.width, cv.height);
    })();
  }

  function applyTheme() {
    /* the reader's own choice wins; otherwise take a theme already stamped on the
       document by the host page, and fall back to the system preference */
    const stamped = document.documentElement.dataset.theme;
    const t = Store.state.theme || stamped ||
      (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = t;
  }

  /* ================================================================== */
  /* router                                                              */
  /* ================================================================== */
  function route() {
    if (main._cleanup) { main._cleanup(); main._cleanup = null; }
    closeSearch();
    const h = (location.hash || "#/home").replace(/^#\//, "");
    const p = h.split("/");

    switch (p[0]) {
      case "home": pageHome(); break;
      case "topic": pageTopic(p[1]); break;
      case "sub": pageSub(p[1]); break;
      case "tools": pageTools(); break;
      case "tool": pageTool(p[1]); break;
      case "progress": pageProgress(); wireBackup(); break;
      case "exam": pageExam(); break;
      case "glossary": pageGlossary(); break;

      case "quiz": {
        let opts;
        if (p[1] === "mixed") opts = { filter: () => true, limit: 15, back: "#/home" };
        else if (p[1] === "mock") {
          const ids = SYLLABUS.filter(t => t.paper === +p[2]).flatMap(t => t.subs.map(s => s.id));
          opts = { filter: q => ids.includes(q.t), limit: 20, minutes: 30, back: "#/exam" };
        }
        else if (p[1] === "paper") {
          const ids = SYLLABUS.filter(t => t.paper === +p[2]).flatMap(t => t.subs.map(s => s.id));
          opts = { filter: q => ids.includes(q.t), limit: 15, back: "#/exam" };
        } else if (p[1] === "topic") {
          const t = findTopic(p[2]);
          const ids = t ? t.subs.map(s => s.id) : [];
          opts = { filter: q => ids.includes(q.t), back: "#/topic/" + p[2] };
          if (t) setHue(t.hue);
        } else {
          const s = findSub(p[1]);
          if (s) setHue(s.topic.hue);
          opts = { filter: q => q.t === p[1], back: "#/sub/" + p[1] };
        }
        const heading = p[1] === "mixed" ? "Mixed quiz" : p[1] === "mock" ? "Paper " + p[2] + " timed mock" :
          p[1] === "paper" ? "Paper " + p[2] + " quiz" :
          p[1] === "topic" ? "Topic " + p[2] + " quiz" : (findSub(p[1]) ? p[1] + " " + findSub(p[1]).title : "Quiz");
        main.innerHTML = `<div class="page-head"><span class="eyebrow">Quiz</span><h1>${esc(heading)}</h1></div><div id="quizMount"></div>`;
        const qm = $("#quizMount");
        Quiz.start(qm, opts);
        main._cleanup = qm._cleanup;      // stop the mock clock when navigating away
        break;
      }

      case "cards": {
        const mount = () => { main.innerHTML = '<div class="page-head"><span class="eyebrow">Flashcards</span><h1 id="cdTitle"></h1></div><div id="cardMount"></div>'; return $("#cardMount"); };
        if (!p[1]) { pageCardsHub(); break; }
        if (p[1] === "due") { const el = mount(); $("#cdTitle").textContent = "Cards due now"; Cards.start(el, { back: "#/cards" }); main._cleanup = el._cleanup; }
        else if (p[1] === "all") { const el = mount(); $("#cdTitle").textContent = "Every card, shuffled"; Cards.start(el, { filter: () => true, back: "#/cards" }); main._cleanup = el._cleanup; }
        else if (p[1] === "topic") {
          const t = findTopic(p[2]); if (t) setHue(t.hue);
          const el = mount(); $("#cdTitle").textContent = t ? "Topic " + t.n + " " + t.title : "Cards";
          Cards.start(el, { filter: c => c.topic === p[2], back: "#/cards" }); main._cleanup = el._cleanup;
        } else if (p[1] === "sub") {
          const s = findSub(p[2]); if (s) setHue(s.topic.hue);
          const el = mount(); $("#cdTitle").textContent = s ? s.id + " " + s.title : "Cards";
          Cards.start(el, { filter: c => c.sub === p[2], back: "#/sub/" + p[2] }); main._cleanup = el._cleanup;
        } else pageCardsHub();
        break;
      }

      default: pageHome();
    }

    function pageCardsHub() { setHue(168); Cards.hub(main); }

    enhanceCode(main);
    window.scrollTo(0, 0);
    main.classList.remove("fade-in"); void main.offsetWidth; main.classList.add("fade-in");
    refreshChrome();
    highlightTabs();
    toggleSheet(false);
    if (!/^#\/sub\//.test(location.hash)) {
      const bar = $("#readBar");
      if (bar) bar.style.width = "0";
    }
    document.getElementById("sidebar").classList.remove("open");
    $("#scrim").hidden = true;
  }

  /* ================================================================== */
  /* boot                                                                */
  /* ================================================================== */
  function init() {
    applyTheme();
    buildSidebar();
    buildTabbar();
    const rb = document.createElement("div");
    rb.className = "read-bar"; rb.id = "readBar";
    document.body.appendChild(rb);
    Store.touchStreak();

    addEventListener("hashchange", route);

    $("#themeToggle").onclick = () => {
      Store.state.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      Store.save(); applyTheme();
    };

    const sidebar = $("#sidebar"), scrim = $("#scrim");
    $("#navToggle").onclick = () => {
      const open = sidebar.classList.toggle("open");
      scrim.hidden = !open;
      $("#navToggle").setAttribute("aria-expanded", open);
    };
    scrim.onclick = () => { sidebar.classList.remove("open"); scrim.hidden = true; };

    $("#searchTrigger").onclick = openSearch;
    $("#searchInput").addEventListener("input", e => runSearch(e.target.value));
    $("#searchBox").addEventListener("click", e => { if (e.target === $("#searchBox")) closeSearch(); });
    $("#searchInput").addEventListener("keydown", e => {
      const items = Array.from(document.querySelectorAll("#searchResults .sr"));
      const cur = items.findIndex(i => i.classList.contains("sel"));
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!items.length) return;
        const nxt = e.key === "ArrowDown" ? Math.min(items.length - 1, cur + 1) : Math.max(0, cur - 1);
        items.forEach(i => i.classList.remove("sel"));
        items[nxt].classList.add("sel");
        items[nxt].scrollIntoView({ block: "nearest" });
      }
      if (e.key === "Enter") {
        const t = items[cur < 0 ? 0 : cur];
        if (t) { location.hash = t.getAttribute("href"); closeSearch(); }
      }
    });

    let goPending = false, goTimer = null;
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") { closeSearch(); toggleSheet(false); }
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if (typing || e.metaKey || e.ctrlKey || e.altKey) {
        if (!typing && e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); openSearch(); }
        return;
      }

      if (goPending) {                                  // second key of a "g then x" pair
        const dest = { h: "#/home", c: "#/cards", q: "#/quiz/mixed", l: "#/tools", p: "#/progress", e: "#/exam" }[e.key];
        goPending = false; clearTimeout(goTimer);
        if (dest) { e.preventDefault(); location.hash = dest; return; }
      }

      switch (e.key) {
        case "/": e.preventDefault(); openSearch(); break;
        case "?": e.preventDefault(); toggleSheet(); break;
        case "t": $("#themeToggle").click(); break;
        case "g":
          goPending = true;
          clearTimeout(goTimer);
          goTimer = setTimeout(() => { goPending = false; }, 900);
          break;
        case "j": case "k": {                           // step through subtopics in order
          const m = /^#\/sub\/([\d.]+)/.exec(location.hash);
          if (!m) break;
          const i = ALL_SUBS.findIndex(s => s.id === m[1]);
          const to = ALL_SUBS[e.key === "j" ? i + 1 : i - 1];
          if (to) location.hash = "#/sub/" + to.id;
          break;
        }
      }
    });

    $("#resetBtn").onclick = () => {
      if (!confirm("This clears your confidence ratings, quiz results, flashcard schedule and streak on this device. There is no undo. Continue?")) return;
      Store.reset(); applyTheme(); buildSidebar(); route(); toast("Progress cleared");
    };

    route();
  }

  return { init, toast, confetti, findSub, findTopic, refreshChrome, route };
})();

document.addEventListener("DOMContentLoaded", App.init);
