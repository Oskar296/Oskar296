/* Views, routing and the lab session engine. */

(function () {
  var app = document.getElementById("app");
  var toastWrap = document.getElementById("toasts");
  var modalHost = document.getElementById("modal-host");

  var route = { view: "home", arg: null };
  var session = null;
  var labTab = "table";
  var flash = { deck: [], i: 0, shown: false, topic: 0 };

  /* ---------------- helpers ---------------- */
  function h(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pct(x) { return Math.round(x * 100); }
  function bar(value, cls) {
    return '<div class="bar ' + (cls || "") + '"><i style="width:' + pct(value) + '%"></i></div>';
  }
  function topicVars(t) { return 'style="--hue:' + t.hue + '"'; }

  function toast(icon, text, sub, gold) {
    var d = document.createElement("div");
    d.className = "toast" + (gold ? " gold" : "");
    d.innerHTML = '<span class="tic">' + icon + "</span><span>" + h(text) +
      (sub ? '<br><span class="tsub">' + h(sub) + "</span>" : "") + "</span>";
    toastWrap.appendChild(d);
    setTimeout(function () {
      d.style.transition = "opacity .35s, transform .35s";
      d.style.opacity = "0";
      d.style.transform = "translateY(-8px)";
      setTimeout(function () { d.remove(); }, 380);
    }, 3000);
  }

  function awardBadges() {
    Store.checkBadges().forEach(function (b) {
      Sfx.play("badge");
      toast(b.icon, "Badge unlocked: " + b.name, b.desc, true);
    });
  }

  function withLevelWatch(fn) {
    var before = Store.levelInfo().level;
    fn();
    var after = Store.levelInfo().level;
    if (after > before) {
      Sfx.play("level");
      toast("⭐", "Level " + after, Store.levelInfo().rank, true);
    }
  }

  function questProgress(track, amount) {
    Store.progressQuest(track, amount).forEach(function (q) {
      toast("\u{1F3AF}", "Quest complete", q.text + "  +" + q.xp + " XP", true);
    });
  }

  function go(view, arg) {
    route = { view: view, arg: arg === undefined ? null : arg };
    if (session && view !== "quiz" && view !== "results") stopTimer();
    window.scrollTo(0, 0);
    render();
  }

  /* ---------------- shell ---------------- */
  function renderShell(body) {
    var li = Store.levelInfo();
    var s = Store.state;
    var streakClass = Store.streakAlive() && s.streak.count > 0 ? "chip flame" : "chip";
    app.innerHTML =
      '<header class="topbar">' +
        '<div class="brand"><span class="logo">⚗</span><span>Chem Lab' +
          "<small>IGCSE Chemistry 0620</small></span></div>" +
        '<span class="spacer"></span>' +
        '<span class="' + streakClass + '">\u{1F525} <b>' + s.streak.count + "</b></span>" +
        '<span class="chip">Lv <b>' + li.level + "</b></span>" +
        '<button class="chip" data-a="settings" aria-label="Settings">⚙</button>' +
      "</header>" +
      '<main class="fade">' + body + "</main>";
    renderNav();
  }

  function renderNav() {
    var items = [
      ["home", "\u{1F3E0}", "Home"],
      ["review", "\u{1F501}", "Review"],
      ["lab", "\u{1F9EA}", "Lab"],
      ["badges", "\u{1F3C5}", "Awards"]
    ];
    var nav = document.getElementById("nav");
    nav.innerHTML = items.map(function (it) {
      var on = route.view === it[0] || (route.view === "topic" && it[0] === "home") ? " on" : "";
      return '<button class="' + on.trim() + '" data-a="nav" data-v="' + it[0] + '">' +
        '<span class="ic">' + it[1] + "</span>" + it[2] + "</button>";
    }).join("");
  }

  /* ---------------- home ---------------- */
  function renderHome() {
    var s = Store.state;
    var li = Store.levelInfo();
    Store.rollQuests();
    var due = Store.dueQuestions().length;
    var overall = Store.overallMastery();

    var hero =
      '<div class="card">' +
        '<div class="hero">' +
          '<div class="ring" style="--pct:' + pct(li.pct) + '"><span class="lv"><b>' + li.level + "</b><span>LEVEL</span></span></div>" +
          '<div class="hero-info">' +
            '<div class="rank">' + h(li.rank) + "</div>" +
            '<div class="xpline">' + li.into + " / " + li.need + " XP to level " + (li.level + 1) + "</div>" +
            '<div style="margin-top:9px">' + bar(li.pct, "accent") + "</div>" +
          "</div>" +
        "</div>" +
        '<div class="stat-row">' +
          '<div class="stat"><b>' + pct(overall) + '%</b><span>Syllabus</span></div>' +
          '<div class="stat"><b>' + s.stats.correct + "</b><span>Correct</span></div>" +
          '<div class="stat"><b>' + Store.crownCount() + '/12</b><span>Crowns</span></div>' +
          '<div class="stat"><b>' + s.streak.count + "</b><span>Day streak</span></div>" +
          '<div class="stat"><b>' + due + "</b><span>Due now</span></div>" +
        "</div>" +
        '<div class="btn-row" style="margin-top:14px">' +
          '<button class="btn primary" data-a="continue">▶ ' + (due > 0 ? "Review " + due + " due" : "Start studying") + "</button>" +
          (due > 0 ? '<button class="btn" data-a="nav" data-v="lab">Flashcards</button>' : "") +
        "</div>" +
      "</div>";

    var quests = '<div class="section-title">Daily quests<span class="rule"></span>' +
      '<span class="muted">resets each day</span></div><div class="card">' +
      s.daily.quests.map(function (q) {
        return '<div class="quest' + (q.done ? " done" : "") + '">' +
          '<span class="qtick">' + (q.done ? "✓" : "") + "</span>" +
          '<span class="qbody"><span class="qname">' + h(q.text) + "</span>" +
            '<span class="qprog">' + bar(Math.min(1, q.n / q.target), "accent") +
            '<span class="qnum">' + Math.min(q.n, q.target) + "/" + q.target + "</span></span></span>" +
          '<span class="qxp">+' + q.xp + "</span>" +
        "</div>";
      }).join("") + "</div>";

    var grid = '<div class="section-title">The syllabus<span class="rule"></span>' +
      '<span class="muted">12 topics</span></div><div class="topic-grid">' +
      SYLLABUS.map(function (t) {
        var m = Store.topicMastery(t.n);
        var crowned = Store.topicRec(t.n).crown;
        return '<button class="topic-card" ' + topicVars(t) + ' data-a="topic" data-n="' + t.n + '">' +
          '<span class="' + (crowned ? "crown" : "ticon") + '">' + (crowned ? "\u{1F451}" : t.icon) + "</span>" +
          '<div class="tnum">TOPIC ' + t.n + "</div>" +
          '<div class="ttitle">' + h(t.title) + "</div>" +
          '<div class="tblurb">' + h(t.blurb) + "</div>" +
          '<div class="tfoot">' + bar(m) + '<span class="tpct">' + pct(m) + "%</span></div>" +
        "</button>";
      }).join("") + "</div>";

    var weak = weakSpots();
    var weakHtml = "";
    if (weak.length) {
      weakHtml = '<div class="section-title">Weak spots<span class="rule"></span></div><div class="card">' +
        '<p class="muted" style="margin-bottom:12px">Subtopics you have started but not locked in yet.</p>' +
        '<div class="breakdown">' + weak.map(function (w) {
          var t = SUB_INDEX[w.id].topic;
          return '<button class="brow" style="width:100%;background:none;border:0;padding:4px 0" data-a="sub" data-s="' + w.id + '">' +
            '<span class="bname" style="text-align:left">' + h(w.id + "  " + SUB_INDEX[w.id].sub.title) + "</span>" +
            '<span class="bar" style="--hue:' + t.hue + '"><i style="width:' + pct(w.m) + '%"></i></span>' +
            '<span class="bnum">' + pct(w.m) + "%</span></button>";
        }).join("") + "</div></div>";
    }

    renderShell(hero + quests + weakHtml + grid);
  }

  function weakSpots() {
    var out = [];
    SYLLABUS.forEach(function (t) {
      t.subs.forEach(function (s) {
        var pool = Store.poolForSub(s.id);
        if (!pool.length) return;
        var touched = pool.some(function (q) { return Store.state.srs[q.id]; });
        if (!touched) return;
        var m = Store.subMastery(s.id);
        if (m < 0.85) out.push({ id: s.id, m: m });
      });
    });
    out.sort(function (a, b) { return a.m - b.m; });
    return out.slice(0, 4);
  }

  /* ---------------- topic ---------------- */
  function renderTopic(n) {
    var t = TOPIC_BY_N[n];
    var m = Store.topicMastery(n);
    var rec = Store.topicRec(n);
    var unlocked = Store.bossUnlocked(n);
    var pool = Store.poolForTopic(n);

    var head = '<div class="card" ' + topicVars(t) + '>' +
      '<div class="topic-head">' +
        '<span class="big">' + t.icon + "</span>" +
        "<div style=\"flex:1\"><div class=\"tnum\" style=\"color:var(--topic);font-size:11px;font-weight:700;letter-spacing:.1em\">TOPIC " + t.n + "</div>" +
        "<h1>" + h(t.title) + "</h1>" +
        '<p class="muted" style="margin:0">' + h(t.blurb) + "</p></div>" +
        (rec.crown ? '<span style="font-size:26px">\u{1F451}</span>' : "") +
      "</div>" +
      '<div class="tfoot" style="display:flex;gap:10px;align-items:center;margin-top:14px">' +
        bar(m) + '<span class="tpct">' + pct(m) + "% mastered</span></div>" +
      '<div class="btn-row" style="margin-top:14px">' +
        '<button class="btn topic" data-a="practice" data-n="' + n + '">▶ Lab session (10)</button>' +
        '<button class="btn" data-a="cards" data-n="' + n + '">\u{1F5C3} Flashcards</button>' +
        '<button class="btn" data-a="boss" data-n="' + n + '"' + (unlocked ? "" : " disabled") + ">" +
          (unlocked ? "⚔ Topic challenge" : "\u{1F512} Challenge at 50%") + "</button>" +
      "</div>" +
      '<p class="muted" style="margin:12px 0 0">' + pool.length + " questions in this topic" +
        (Store.state.settings.supplement ? " (Core and Supplement)" : " (Core only)") + "." +
        (rec.bossBest ? " Best challenge score: " + rec.bossBest + "%." : "") + "</p>" +
    "</div>";

    var subs = t.subs.map(function (s) {
      var sm = Store.subMastery(s.id);
      var count = Store.poolForSub(s.id).length;
      return '<details class="sub" ' + topicVars(t) + '><summary>' +
        '<span class="scode">' + s.id + "</span>" +
        '<span class="stitle">' + h(s.title) + "</span>" +
        '<span class="bar sbar"><i style="width:' + pct(sm) + '%"></i></span>' +
        '<span class="spct">' + pct(sm) + "%</span></summary>" +
        '<div class="sub-body">' +
          s.obj.filter(function (o) { return Store.state.settings.supplement || o[0] === "C"; })
            .map(function (o) {
              return '<div class="obj"><span class="pill ' + o[0] + '">' + o[0] + "</span><span>" + h(o[1]) + "</span></div>";
            }).join("") +
          (count ? '<div class="btn-row" style="margin-top:12px">' +
            '<button class="btn ghost" data-a="sub" data-s="' + s.id + '">Practise ' + s.id + " (" + Math.min(count, 8) + ")</button></div>" : "") +
        "</div></details>";
    }).join("");

    renderShell(
      '<div class="btn-row" style="margin-bottom:12px"><button class="btn ghost" data-a="nav" data-v="home">← All topics</button></div>' +
      head +
      '<div class="section-title">Learning objectives<span class="rule"></span>' +
      '<span class="muted">' + (Store.state.settings.supplement ? "Core + Supplement" : "Core only") + "</span></div>" +
      subs
    );
  }

  /* ---------------- review ---------------- */
  function renderReview() {
    var due = Store.dueQuestions();
    var byTopic = {};
    due.forEach(function (q) { byTopic[q.t] = (byTopic[q.t] || 0) + 1; });

    var body;
    if (!due.length) {
      body = '<div class="card"><div class="empty"><div class="eic">✅</div>' +
        "<h2>Nothing due right now</h2>" +
        '<p class="muted">Questions come back for review on a spacing schedule: 1 day, then 2, 4, 8 and 16 days. ' +
        "Answer some new questions in a topic and they will queue up here.</p>" +
        '<div class="btn-row" style="justify-content:center;margin-top:12px">' +
        '<button class="btn primary" data-a="nav" data-v="home">Pick a topic</button></div></div></div>';
    } else {
      body = '<div class="card">' +
        "<h1>" + due.length + " question" + (due.length === 1 ? "" : "s") + " due</h1>" +
        '<p>Spaced review is where the marks come from. Each correct answer pushes a question further into the future, ' +
        "and a wrong one brings it back sooner.</p>" +
        '<div class="btn-row"><button class="btn primary" data-a="startreview">▶ Review ' +
        Math.min(20, due.length) + "</button></div></div>" +
        '<div class="section-title">By topic<span class="rule"></span></div><div class="card"><div class="breakdown">' +
        Object.keys(byTopic).sort(function (a, b) { return a - b; }).map(function (k) {
          var t = TOPIC_BY_N[k];
          return '<div class="brow"><span class="bname">' + t.icon + "  " + h(t.title) + "</span>" +
            '<span class="bnum">' + byTopic[k] + "</span></div>";
        }).join("") + "</div></div>";
    }
    renderShell(body);
  }

  /* ---------------- lab (reference tools) ---------------- */
  function renderLab() {
    var tabs = [["table", "Periodic table"], ["sheet", "Data sheet"], ["cards", "Flashcards"]];
    var nav = '<div class="btn-row" style="margin-bottom:14px">' + tabs.map(function (t) {
      return '<button class="btn' + (labTab === t[0] ? " primary" : "") + '" data-a="labtab" data-t="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";

    var body = "";
    if (labTab === "table") body = periodicTable();
    else if (labTab === "sheet") body = dataSheet();
    else body = flashcardView();

    renderShell(nav + body);
  }

  function periodicTable() {
    var cells = [];
    for (var z = 1; z <= 118; z++) {
      var e = ELEMENTS[z - 1];
      var p = elementPosition(z);
      var cat = elementCategory(z);
      cells.push('<button class="el ' + cat + '" style="grid-column:' + p.c + ';grid-row:' + p.r + '" ' +
        'data-a="el" data-z="' + z + '" title="' + h(e[1]) + '">' +
        '<span class="z">' + z + "</span><span class=\"sym\">" + e[0] + "</span></button>");
    }
    var legend = [["alkali", "Group I"], ["alkaline", "Group II"], ["transition", "Transition"],
      ["post", "Other metals"], ["metalloid", "Metalloids"], ["nonmetal", "Non-metals"],
      ["halogen", "Group VII"], ["noble", "Group 0"], ["lanthanide", "Lanthanides"], ["actinide", "Actinides"]];

    return '<div class="card"><h2>Periodic table</h2>' +
      '<p class="muted">Tap an element for its relative atomic mass, group, period and electronic configuration.</p>' +
      '<div class="ptable-wrap"><div class="ptable">' + cells.join("") + "</div></div>" +
      '<div class="legend">' + legend.map(function (l) {
        return '<span><i class="el ' + l[0] + '" style="border:0"></i>' + l[1] + "</span>";
      }).join("") + "</div></div>";
  }

  function configFor(z) {
    if (z > 20) return null;
    var caps = [2, 8, 8, 2], left = z, out = [];
    for (var i = 0; i < caps.length && left > 0; i++) {
      var put = Math.min(caps[i], left);
      out.push(put);
      left -= put;
    }
    return out.join(",");
  }

  function elementModal(z) {
    var e = ELEMENTS[z - 1];
    var p = elementPosition(z);
    var groupNames = { 1: "I", 2: "II", 13: "III", 14: "IV", 15: "V", 16: "VI", 17: "VII", 18: "0" };
    var group = (p.r <= 7 && groupNames[p.c]) ? groupNames[p.c] : (p.r >= 8 ? "-" : "Transition");
    var period = p.r >= 8 ? (p.r === 8 ? 6 : 7) : p.r;
    var cfg = configFor(z);
    openModal(
      '<h2 style="font-size:22px">' + h(e[1]) + "</h2>" +
      '<div style="font-size:44px;font-weight:800;letter-spacing:-.03em;margin:2px 0 10px">' + e[0] + "</div>" +
      '<div class="stat-row">' +
        '<div class="stat"><b>' + z + "</b><span>Proton no.</span></div>" +
        '<div class="stat"><b>' + e[2] + "</b><span>Ar</span></div>" +
        '<div class="stat"><b>' + group + "</b><span>Group</span></div>" +
        '<div class="stat"><b>' + period + "</b><span>Period</span></div>" +
      "</div>" +
      (cfg ? '<p style="margin-top:14px">Electronic configuration: <b style="color:var(--accent)">' + cfg + "</b>" +
        "<br><span class=\"muted\">Outer shell electrons: " + cfg.split(",").pop() + "</span></p>" : "") +
      '<div class="btn-row" style="margin-top:12px"><button class="btn wide" data-a="closemodal">Close</button></div>'
    );
  }

  function dataSheet() {
    return DATASHEET.map(function (sec) {
      return '<div class="card"><h2>' + h(sec.title) + "</h2>" +
        (sec.note ? '<p class="muted" style="margin-bottom:2px">' + h(sec.note) + "</p>" : "") +
        '<div class="table-wrap"><table class="sheet"><thead><tr>' +
        sec.cols.map(function (c) { return "<th>" + h(c) + "</th>"; }).join("") +
        "</tr></thead><tbody>" +
        sec.rows.map(function (r) {
          return "<tr>" + r.map(function (c) { return "<td>" + h(c) + "</td>"; }).join("") + "</tr>";
        }).join("") +
        "</tbody></table></div></div>";
    }).join("");
  }

  function buildDeck(topicN) {
    flash.topic = topicN || 0;
    flash.deck = Quiz.shuffle(FLASHCARDS.filter(function (c) { return !topicN || c.t === topicN; }));
    flash.i = 0;
    flash.shown = false;
  }

  function flashcardView() {
    if (!flash.deck.length) buildDeck(flash.topic);
    var picker = '<div class="card"><h3>Deck</h3><div class="btn-row">' +
      '<button class="btn' + (flash.topic === 0 ? " primary" : "") + '" data-a="deck" data-n="0">All topics</button>' +
      SYLLABUS.map(function (t) {
        return '<button class="btn' + (flash.topic === t.n ? " primary" : "") + '" data-a="deck" data-n="' + t.n + '">' +
          t.icon + " " + t.n + "</button>";
      }).join("") + "</div></div>";

    if (!flash.deck.length) {
      return '<div class="card"><div class="empty"><div class="eic">\u{1F5C3}</div>' +
        "<p>No cards in this deck.</p></div></div>" + picker;
    }
    var c = flash.deck[flash.i];
    var t = TOPIC_BY_N[c.t];
    var card = '<div class="card" ' + topicVars(t) + ">" +
      '<div class="qmeta"><span class="tag" style="color:var(--topic)">Topic ' + c.t + " · " + h(t.title) + "</span>" +
        '<span class="spacer"></span><span class="muted">' + (flash.i + 1) + " / " + flash.deck.length + "</span></div>" +
      '<div class="flash" data-a="flip">' +
        (flash.shown
          ? '<div><div class="fa">' + h(c.b) + '</div><div class="hint">Tap for the question</div></div>'
          : '<div><div class="fq">' + h(c.f) + '</div><div class="hint">Tap to reveal</div></div>') +
      "</div>" +
      '<div class="btn-row"><button class="btn" data-a="prevcard">← Back</button>' +
        '<button class="btn primary" style="flex:1" data-a="nextcard">Next card →</button></div>' +
    "</div>";
    return card + picker;
  }

  /* ---------------- badges ---------------- */
  function renderBadges() {
    var s = Store.state;
    var got = Store.BADGES.filter(function (b) { return s.badges.indexOf(b.id) > -1; }).length;
    var body = '<div class="card"><h1>Awards</h1>' +
      "<p>" + got + " of " + Store.BADGES.length + " badges earned, and " + Store.crownCount() +
      " of 12 topic crowns.</p>" +
      '<div class="stat-row">' +
        '<div class="stat"><b>' + s.stats.answered + "</b><span>Answered</span></div>" +
        '<div class="stat"><b>' + (s.stats.answered ? pct(s.stats.correct / s.stats.answered) : 0) + '%</b><span>Accuracy</span></div>' +
        '<div class="stat"><b>' + s.stats.bestCombo + "</b><span>Best run</span></div>" +
        '<div class="stat"><b>' + s.stats.sessions + "</b><span>Sessions</span></div>" +
        '<div class="stat"><b>' + s.streak.best + "</b><span>Best streak</span></div>" +
        '<div class="stat"><b>' + s.xp + "</b><span>Total XP</span></div>" +
      "</div></div>" +
      '<div class="section-title">Badges<span class="rule"></span></div>' +
      '<div class="badge-grid">' + Store.BADGES.map(function (b) {
        var have = s.badges.indexOf(b.id) > -1;
        return '<div class="badge' + (have ? "" : " locked") + '">' +
          '<div class="bic">' + (have ? b.icon : "\u{1F512}") + "</div>" +
          '<div class="bname">' + h(b.name) + "</div>" +
          '<div class="bdesc">' + h(b.desc) + "</div></div>";
      }).join("") + "</div>" +
      '<div class="section-title">Topic crowns<span class="rule"></span></div>' +
      '<div class="badge-grid">' + SYLLABUS.map(function (t) {
        var c = Store.topicRec(t.n).crown;
        return '<div class="badge' + (c ? "" : " locked") + '" ' + topicVars(t) + ">" +
          '<div class="bic">' + (c ? "\u{1F451}" : t.icon) + "</div>" +
          '<div class="bname">' + h(t.title) + "</div>" +
          '<div class="bdesc">' + (c ? "Challenge cleared" : "Win the topic challenge") + "</div></div>";
      }).join("") + "</div>";
    renderShell(body);
  }

  /* ---------------- session engine ---------------- */
  var timerId = null;

  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  function startSession(opts) {
    var pool, count, mode = opts.mode;
    if (mode === "review") {
      pool = Store.dueQuestions();
      count = Math.min(20, pool.length);
    } else if (mode === "boss") {
      pool = Store.poolForTopic(opts.topic);
      count = Math.min(12, pool.length);
    } else if (opts.sub) {
      pool = Store.poolForSub(opts.sub);
      count = Math.min(8, pool.length);
    } else {
      pool = Store.poolForTopic(opts.topic);
      count = Math.min(10, pool.length);
    }
    if (!pool.length) { toast("⚠", "No questions available here yet"); return; }

    session = {
      mode: mode,
      topic: opts.topic || null,
      sub: opts.sub || null,
      qs: Quiz.pick(pool, count),
      i: 0,
      combo: 0,
      best: 0,
      correct: 0,
      xp: 0,
      lives: mode === "boss" ? 3 : null,
      time: mode === "boss" ? 45 : null,
      answered: false,
      lastRight: false,
      response: null,
      log: {},
      failed: false
    };
    Store.touchStreak();
    go("quiz");
  }

  function currentQ() { return session.qs[session.i]; }

  function renderQuiz() {
    var q = currentQ();
    var t = TOPIC_BY_N[q.t];
    var progress = session.i / session.qs.length;

    var status;
    if (session.mode === "boss") {
      var hearts = "";
      for (var i = 0; i < 3; i++) hearts += '<span class="' + (i < session.lives ? "" : "dead") + '">❤</span>';
      status = '<span class="lives">' + hearts + "</span>" +
        '<span class="timer' + (session.time <= 10 ? " low" : "") + '">' + session.time + "s</span>";
    } else {
      status = '<span class="combo' + (session.combo >= 3 ? " hot" : "") + '">' +
        (session.combo >= 2 ? "\u{1F525}" + session.combo : "") + "</span>";
    }

    var head = '<div class="quiz-top">' +
      '<button class="btn ghost" style="padding:7px 11px" data-a="quit">✕</button>' +
      bar(progress, "accent") +
      '<span class="muted" style="font-variant-numeric:tabular-nums">' + (session.i + 1) + "/" + session.qs.length + "</span>" +
      status + "</div>";

    var meta = '<div class="qmeta">' +
      '<span class="tag" style="color:var(--topic)">' + q.s + "</span>" +
      '<span class="tag' + (q.lv === "S" ? " s" : "") + '">' + (q.lv === "S" ? "Supplement" : "Core") + "</span>" +
      (session.mode === "boss" ? '<span class="tag" style="color:var(--gold)">Challenge</span>' : "") +
      (session.mode === "review" ? '<span class="tag">Review</span>' : "") +
      "</div>";

    var input;
    if (q.ty === "mcq" || q.ty === "multi") {
      input = '<div class="opts">' + q.o.map(function (o, idx) {
        var cls = "opt";
        if (session.answered) {
          var isRight = q.ty === "mcq" ? idx === q.a : q.a.indexOf(idx) > -1;
          var chosen = q.ty === "mcq" ? session.response === idx
            : (session.response || []).indexOf(idx) > -1;
          if (isRight) cls += " right";
          else if (chosen) cls += " wrong";
        } else if (q.ty === "multi" && (session.response || []).indexOf(idx) > -1) {
          cls += " sel";
        }
        return '<button class="' + cls + '" data-a="opt" data-i="' + idx + '"' +
          (session.answered ? " disabled" : "") + ">" +
          '<span class="key">' + "ABCD"[idx] + "</span><span>" + h(o) + "</span></button>";
      }).join("") + "</div>" +
      (q.ty === "multi" && !session.answered
        ? '<div class="btn-row" style="margin-top:12px"><button class="btn primary wide" data-a="submit">Submit answer</button></div>'
        : "");
    } else {
      var placeholder = q.ty === "num" ? "Type a number" : "Type your answer";
      input = '<input class="answer-input" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" ' +
        'placeholder="' + placeholder + '"' + (session.answered ? " disabled value=\"" + h(session.response || "") + "\"" : "") + ">" +
        (session.answered ? "" : '<div class="btn-row" style="margin-top:12px"><button class="btn primary wide" data-a="submit">Submit answer</button></div>');
    }

    var fb = "";
    if (session.answered) {
      fb = '<div class="feedback ' + (session.lastRight ? "right" : "wrong") + '">' +
        '<div class="verdict">' + (session.lastRight ? "✓ Correct" : "✕ Not quite") +
          (session.lastRight ? '<span class="xp">+' + session.lastXp + " XP</span>" : "") + "</div>" +
        (session.lastRight ? "" : '<div class="correct-was">Answer: <b>' + h(Quiz.answerText(q)) + "</b></div>") +
        '<div class="why">' + h(q.ex) + "</div></div>" +
        '<div class="btn-row" style="margin-top:12px"><button class="btn primary wide" data-a="next">' +
        (session.i + 1 >= session.qs.length || session.failed ? "See results" : "Next question") + " →</button></div>";
    }

    renderShell(head + '<div class="card" ' + topicVars(t) + ">" + meta +
      '<div class="qtext">' + h(q.q) + "</div>" + input + fb + "</div>");

    if (!session.answered && (q.ty === "num" || q.ty === "text")) {
      var box = document.getElementById("ans");
      if (box) {
        box.addEventListener("keydown", function (e) {
          if (e.key === "Enter") { e.preventDefault(); submitAnswer(); }
        });
        if (window.matchMedia("(min-width: 720px)").matches) box.focus();
      }
    }
    if (session.mode === "boss" && !session.answered) startBossTimer();
  }

  function startBossTimer() {
    stopTimer();
    timerId = setInterval(function () {
      if (!session || session.answered) { stopTimer(); return; }
      session.time--;
      var el = document.querySelector(".timer");
      if (el) {
        el.textContent = session.time + "s";
        el.classList.toggle("low", session.time <= 10);
      }
      if (session.time <= 0) {
        stopTimer();
        submitAnswer(true);
      }
    }, 1000);
  }

  function chooseOption(idx) {
    if (!session || session.answered) return;
    var q = currentQ();
    if (q.ty === "multi") {
      session.response = session.response || [];
      var at = session.response.indexOf(idx);
      if (at > -1) session.response.splice(at, 1); else session.response.push(idx);
      Sfx.play("click");
      renderQuiz();
    } else {
      session.response = idx;
      submitAnswer();
    }
  }

  function submitAnswer(timeout) {
    if (!session || session.answered) return;
    var q = currentQ();
    if (q.ty === "num" || q.ty === "text") {
      var box = document.getElementById("ans");
      session.response = box ? box.value : "";
      if (!timeout && !String(session.response).trim()) { toast("✍", "Type an answer first"); return; }
    }
    stopTimer();

    var right = !timeout && Quiz.check(q, session.response);
    session.answered = true;
    session.lastRight = right;

    if (right) {
      session.combo++;
      if (session.combo > session.best) session.best = session.combo;
      session.correct++;
      session.lastXp = Quiz.xpFor(q, session.combo, session.mode);
      session.xp += session.lastXp;
      Sfx.play("right");
    } else {
      session.combo = 0;
      session.lastXp = 0;
      Sfx.play("wrong");
      if (session.mode === "boss") {
        session.lives--;
        if (session.lives <= 0) session.failed = true;
      }
    }

    if (!session.log[q.s]) session.log[q.s] = { c: 0, t: 0 };
    session.log[q.s].t++;
    if (right) session.log[q.s].c++;

    withLevelWatch(function () {
      Store.recordAnswer(q, right, session.combo);
      if (session.lastXp) Store.addXp(session.lastXp);
    });

    questProgress("answered", 1);
    if (right) questProgress("correct", 1);
    if (right && q.lv === "S") questProgress("supp", 1);
    if (session.mode === "review") questProgress("reviews", 1);
    questProgress("combo", session.combo);
    awardBadges();

    renderQuiz();
  }

  function nextQuestion() {
    if (!session) return;
    if (session.failed || session.i + 1 >= session.qs.length) { finishSession(); return; }
    session.i++;
    session.answered = false;
    session.response = null;
    session.time = session.mode === "boss" ? 45 : null;
    go("quiz");
  }

  function finishSession() {
    stopTimer();
    var s = session;
    var total = s.i + (s.answered ? 1 : 0);
    var score = total ? Math.round((s.correct / total) * 100) : 0;
    var bonus = 0;
    var notes = [];

    if (s.mode === "boss") {
      var rec = Store.topicRec(s.topic);
      if (rec.bossBest < score) rec.bossBest = score;
      if (!s.failed && s.correct === s.qs.length) {
        bonus += 200;
        notes.push("Flawless challenge, +200 XP");
        if (!rec.crown) { rec.crown = true; notes.push("Topic crown earned"); }
        Store.state.stats.bosses++;
        Sfx.play("win");
      } else if (!s.failed && score >= 75) {
        bonus += 120;
        notes.push("Challenge passed, +120 XP");
        if (!rec.crown) { rec.crown = true; notes.push("Topic crown earned"); }
        Store.state.stats.bosses++;
        Sfx.play("win");
      } else {
        Sfx.play("fail");
        notes.push("You need 75 per cent or better, with lives to spare, to take the crown.");
      }
    } else {
      bonus += s.mode === "review" ? 40 : 25;
      notes.push("Session complete, +" + bonus + " XP");
      if (total && s.correct === total) {
        bonus += 50;
        notes.push("Perfect session, +50 XP");
        questProgress("perfect", 1);
      }
    }

    Store.state.stats.sessions++;
    questProgress("sessions", 1);
    withLevelWatch(function () { Store.addXp(bonus); });
    Store.save();
    awardBadges();

    session.summary = { score: score, total: total, bonus: bonus, notes: notes };
    go("results");
  }

  function renderResults() {
    var s = session;
    var sum = s.summary;
    var t = s.topic ? TOPIC_BY_N[s.topic] : null;
    var title, emoji;
    if (s.mode === "boss") {
      var won = sum.notes.some(function (n) { return n.indexOf("crown") > -1 || n.indexOf("passed") > -1 || n.indexOf("Flawless") > -1; });
      title = won ? "Challenge cleared" : "Challenge failed";
      emoji = won ? "\u{1F451}" : "\u{1F480}";
    } else if (sum.score >= 90) { title = "Outstanding"; emoji = "\u{1F31F}"; }
    else if (sum.score >= 70) { title = "Solid work"; emoji = "\u{1F44D}"; }
    else if (sum.score >= 50) { title = "Getting there"; emoji = "\u{1F4AA}"; }
    else { title = "Worth another run"; emoji = "\u{1F4DA}"; }

    var breakdown = Object.keys(s.log).sort().map(function (k) {
      var l = s.log[k];
      return '<div class="brow"><span class="bname">' + k + "  " + h(SUB_INDEX[k].sub.title) + "</span>" +
        bar(l.c / l.t) + '<span class="bnum">' + l.c + "/" + l.t + "</span></div>";
    }).join("");

    var body = '<div class="card"' + (t ? " " + topicVars(t) : "") + ">" +
      '<div class="result-head">' +
        '<div style="font-size:44px">' + emoji + "</div>" +
        '<div class="score">' + sum.score + "%</div>" +
        '<h2 style="margin:6px 0 0">' + title + "</h2>" +
        '<p class="muted" style="margin:4px 0 0">' + s.correct + " of " + sum.total + " correct</p>" +
      "</div>" +
      '<div class="result-grid">' +
        '<div class="stat"><b>+' + (s.xp + sum.bonus) + "</b><span>XP earned</span></div>" +
        '<div class="stat"><b>' + s.best + "</b><span>Best run</span></div>" +
        '<div class="stat"><b>' + (t ? pct(Store.topicMastery(t.n)) + "%" : pct(Store.overallMastery()) + "%") + "</b><span>" +
          (t ? "Topic mastery" : "Syllabus") + "</span></div>" +
      "</div>" +
      (sum.notes.length ? '<p class="muted">' + sum.notes.map(h).join("<br>") + "</p>" : "") +
      (breakdown ? '<h3 style="margin-top:14px">By subtopic</h3><div class="breakdown">' + breakdown + "</div>" : "") +
      '<div class="btn-row" style="margin-top:16px">' +
        (t ? '<button class="btn primary" data-a="practice" data-n="' + t.n + '">Another session</button>' +
             '<button class="btn" data-a="topic" data-n="' + t.n + '">Back to topic</button>'
           : '<button class="btn primary" data-a="nav" data-v="home">Home</button>') +
        '<button class="btn ghost" data-a="nav" data-v="home">Done</button>' +
      "</div></div>";

    renderShell(body);
  }

  /* ---------------- settings ---------------- */
  function openModal(html) {
    modalHost.innerHTML = '<div class="modal-bg" data-a="modalbg"><div class="card modal">' + html + "</div></div>";
  }
  function closeModal() { modalHost.innerHTML = ""; }

  function settingsModal() {
    var s = Store.state.settings;
    openModal(
      "<h2>Settings</h2>" +
      '<div class="field"><label>Include Supplement content' +
        '<button class="switch' + (s.supplement ? " on" : "") + '" data-a="toggle" data-k="supplement"></button></label>' +
        '<div class="fdesc">On for the Extended paper. Off restricts everything to Core objectives and Core questions.</div></div>' +
      '<div class="field"><label>Sound effects' +
        '<button class="switch' + (s.sound ? " on" : "") + '" data-a="toggle" data-k="sound"></button></label></div>' +
      '<div class="field"><label>Save data</label>' +
        '<div class="fdesc">Progress lives in this browser only. Copy this text to move it to another device.</div>' +
        '<textarea class="save-box" id="savebox" readonly>' + h(Store.exportSave()) + "</textarea>" +
        '<div class="btn-row" style="margin-top:8px">' +
          '<button class="btn" data-a="copysave">Copy</button>' +
          '<button class="btn" data-a="importsave">Paste a save</button>' +
        "</div></div>" +
      '<div class="field"><button class="btn danger wide" data-a="reset">Reset all progress</button></div>' +
      '<button class="btn wide primary" data-a="closemodal">Done</button>'
    );
  }

  /* ---------------- events ---------------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-a]");
    if (!el) return;
    var a = el.dataset.a;

    if (a === "nav") { closeModal(); session = null; go(el.dataset.v); }
    else if (a === "topic") { closeModal(); go("topic", +el.dataset.n); }
    else if (a === "practice") startSession({ mode: "practice", topic: +el.dataset.n });
    else if (a === "sub") startSession({ mode: "practice", sub: el.dataset.s, topic: SUB_INDEX[el.dataset.s].topic.n });
    else if (a === "boss") startSession({ mode: "boss", topic: +el.dataset.n });
    else if (a === "startreview") startSession({ mode: "review" });
    else if (a === "continue") {
      if (Store.dueQuestions().length) startSession({ mode: "review" });
      else {
        var weakest = SYLLABUS.slice().sort(function (x, y) {
          return Store.topicMastery(x.n) - Store.topicMastery(y.n);
        })[0];
        startSession({ mode: "practice", topic: weakest.n });
      }
    }
    else if (a === "opt") chooseOption(+el.dataset.i);
    else if (a === "submit") submitAnswer();
    else if (a === "next") nextQuestion();
    else if (a === "quit") {
      if (session && session.i === 0 && !session.answered) { session = null; go("home"); }
      else if (confirm("End this session and keep the XP earned so far?")) finishSession();
    }
    else if (a === "labtab") { labTab = el.dataset.t; go("lab"); }
    else if (a === "cards") { labTab = "cards"; buildDeck(+el.dataset.n); go("lab"); }
    else if (a === "deck") { buildDeck(+el.dataset.n); go("lab"); }
    else if (a === "flip") {
      flash.shown = !flash.shown;
      if (flash.shown) {
        Store.state.stats.cards++;
        Store.save();
        questProgress("cards", 1);
        awardBadges();
      }
      Sfx.play("click");
      go("lab");
    }
    else if (a === "nextcard") { flash.i = (flash.i + 1) % flash.deck.length; flash.shown = false; go("lab"); }
    else if (a === "prevcard") { flash.i = (flash.i - 1 + flash.deck.length) % flash.deck.length; flash.shown = false; go("lab"); }
    else if (a === "el") elementModal(+el.dataset.z);
    else if (a === "settings") settingsModal();
    else if (a === "closemodal") { closeModal(); render(); }
    else if (a === "modalbg" && e.target === el) { closeModal(); render(); }
    else if (a === "toggle") {
      Store.state.settings[el.dataset.k] = !Store.state.settings[el.dataset.k];
      Store.save();
      Sfx.play("click");
      settingsModal();
    }
    else if (a === "copysave") {
      var box = document.getElementById("savebox");
      box.select();
      try { document.execCommand("copy"); toast("\u{1F4CB}", "Save data copied"); }
      catch (err) { toast("⚠", "Copy it manually from the box"); }
    }
    else if (a === "importsave") {
      var text = prompt("Paste your saved data here. This replaces your current progress.");
      if (text) {
        try { Store.importSave(text); closeModal(); go("home"); toast("✅", "Save loaded"); }
        catch (err) { toast("⚠", "That save could not be read"); }
      }
    }
    else if (a === "reset") {
      if (confirm("Delete all progress, XP, badges and review history? This cannot be undone.")) {
        Store.reset();
        closeModal();
        go("home");
        toast("\u{1F9F9}", "Progress reset");
      }
    }
  });

  document.addEventListener("keydown", function (e) {
    if (route.view !== "quiz" || !session) return;
    /* the answer box handles its own Enter key */
    if (e.target && e.target.id === "ans") return;
    var q = currentQ();
    if (!session.answered && (q.ty === "mcq" || q.ty === "multi")) {
      var idx = "1234".indexOf(e.key);
      if (idx > -1 && idx < q.o.length) { e.preventDefault(); chooseOption(idx); return; }
      var alpha = "abcd".indexOf(e.key.toLowerCase());
      if (alpha > -1 && alpha < q.o.length) { e.preventDefault(); chooseOption(alpha); return; }
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (session.answered) nextQuestion();
      else if (q.ty === "multi") submitAnswer();
    }
  });

  /* ---------------- router ---------------- */
  function render() {
    if (route.view === "home") renderHome();
    else if (route.view === "topic") renderTopic(route.arg);
    else if (route.view === "review") renderReview();
    else if (route.view === "lab") renderLab();
    else if (route.view === "badges") renderBadges();
    else if (route.view === "quiz") renderQuiz();
    else if (route.view === "results") renderResults();
    else renderHome();
  }

  Store.rollQuests();
  render();
})();
