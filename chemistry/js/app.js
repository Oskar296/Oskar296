/* Views, routing, the lab session engine and the mock exam. */

(function () {
  var app = document.getElementById("app");
  var toastWrap = document.getElementById("toasts");
  var modalHost = document.getElementById("modal-host");

  var route = { view: "home", arg: null };
  var session = null;      /* practice, review, boss, survival, daily */
  var exam = null;         /* the mock paper, which works differently */
  var labTab = "table";
  var flash = { deck: [], i: 0, shown: false, topic: 0 };
  var calc = { formula: "", result: null };

  var EXAM_LENGTH = 40;
  var EXAM_SECONDS = 45 * 60;

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
  function clock(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return m + ":" + (r < 10 ? "0" : "") + r;
  }

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
    if (view !== "quiz" && view !== "results") stopTimer();
    if (view !== "exam") stopExamTimer();
    window.scrollTo(0, 0);
    render();
  }

  /* ---------------- shell ---------------- */
  function renderShell(body) {
    app.innerHTML =
      '<header class="topbar">' +
        '<div class="brand"><span class="logo">⚗</span>Chem Lab</div>' +
        '<span class="spacer"></span>' +
        '<button class="chip" data-a="settings" aria-label="Settings">⚙</button>' +
      "</header>" +
      '<main class="fade">' + body + "</main>";
    renderNav();
  }

  /* Three destinations, and everything else is reached from inside them. */
  var NAV = [
    ["home", "\u{1F4DA}", "Study", ["topic", "review"]],
    ["lab", "\u{1F9EA}", "Tools", []],
    ["progress", "\u{1F4C8}", "Progress", ["badges", "stats"]]
  ];

  function renderNav() {
    var nav = document.getElementById("nav");
    nav.innerHTML = NAV.map(function (it) {
      var on = route.view === it[0] || it[3].indexOf(route.view) > -1;
      return '<button class="' + (on ? "on" : "") + '" data-a="nav" data-v="' + it[0] + '">' +
        '<span class="ic">' + it[1] + "</span>" + it[2] + "</button>";
    }).join("");
  }

  /* ---------------- home ---------------- */
  /* What the one big button on the home screen should do next. */
  function nextUp() {
    var due = Store.dueQuestions().length;
    if (due) return { kind: "review", label: "Review " + due + " question" + (due === 1 ? "" : "s"),
      hint: "Due today, and this is where the marks are" };
    var weakest = SYLLABUS.slice().sort(function (a, b) {
      return Store.topicMastery(a.n) - Store.topicMastery(b.n);
    })[0];
    return { kind: "topic", topic: weakest.n, label: "Practise " + weakest.title,
      hint: "Your weakest topic right now" };
  }

  function renderHome() {
    var s = Store.state;
    var li = Store.levelInfo();
    var next = nextUp();
    var ch = Store.challengeState();

    var start =
      '<div class="card start-card">' +
        '<div class="start-top">' +
          '<div class="ring small" style="--pct:' + pct(li.pct) + '"><span class="lv"><b>' + li.level + "</b></span></div>" +
          "<div><div class=\"rank\">" + h(li.rank) + "</div>" +
          '<div class="xpline">' + li.into + " / " + li.need + " XP to level " + (li.level + 1) + "</div></div>" +
        "</div>" +
        '<button class="big-btn" data-a="continue">' +
          '<span class="bb-label">' + h(next.label) + "</span>" +
          '<span class="bb-hint">' + h(next.hint) + "</span>" +
        "</button>" +
        '<div class="factline">' +
          "<span>\u{1F525} " + s.streak.count + " day streak</span>" +
          "<span>" + pct(Store.overallMastery()) + "% of the syllabus</span>" +
          "<span>" + Store.crownCount() + " of 12 crowns</span>" +
        "</div>" +
      "</div>";

    var modes = '<div class="tile-row">' +
      tile("daily", "\u{1F5D3}", "Daily", ch.done ? ch.score + "% today" : "10 questions") +
      tile("exam", "\u{1F4DD}", "Mock exam", s.records.exam ? "best " + s.records.exam + "%" : "45 minutes") +
      tile("survival", "\u{1F6E1}", "Survival", s.records.survival ? "best " + s.records.survival : "3 lives") +
      "</div>";

    var grid = '<h2 class="head">Topics</h2><div class="topic-grid">' +
      SYLLABUS.map(function (t) {
        var m = Store.topicMastery(t.n);
        var crowned = Store.topicRec(t.n).crown;
        return '<button class="topic-card" ' + topicVars(t) + ' data-a="topic" data-n="' + t.n + '">' +
          '<span class="ticon">' + (crowned ? "\u{1F451}" : t.icon) + "</span>" +
          '<span class="tbody"><span class="ttitle">' + t.n + ". " + h(t.title) + "</span>" +
          '<span class="tfoot">' + bar(m) + '<span class="tpct">' + pct(m) + "%</span></span></span>" +
        "</button>";
      }).join("") + "</div>";

    renderShell(start + modes + grid);
  }

  function tile(action, icon, title, sub) {
    return '<button class="tile" data-a="' + action + '">' +
      '<span class="tile-ic">' + icon + "</span>" +
      '<span class="tile-t">' + h(title) + "</span>" +
      '<span class="tile-s">' + h(sub) + "</span></button>";
  }


  /* ---------------- topic ---------------- */
  function renderTopic(n) {
    var t = TOPIC_BY_N[n];
    var m = Store.topicMastery(n);
    var rec = Store.topicRec(n);
    var unlocked = Store.bossUnlocked(n);
    var pool = Store.poolForTopic(n);

    var head = '<div class="card" ' + topicVars(t) + ">" +
      '<div class="topic-head"><span class="big">' + (rec.crown ? "\u{1F451}" : t.icon) + "</span>" +
        "<div><h1>" + h(t.title) + "</h1>" +
        '<p class="muted" style="margin:2px 0 0">' + h(t.blurb) + "</p></div></div>" +
      '<div class="mastery-line">' + bar(m) + '<span class="tpct">' + pct(m) + "%</span></div>" +
      '<button class="big-btn topic" data-a="practice" data-n="' + n + '">' +
        '<span class="bb-label">Practise 10 questions</span>' +
        '<span class="bb-hint">' + pool.length + " in this topic" +
          (Store.state.settings.supplement ? ", Core and Supplement" : ", Core only") + "</span></button>" +
      '<div class="quiet-row">' +
        '<button class="quiet" data-a="cards" data-n="' + n + '">\u{1F5C3} Flashcards</button>' +
        '<button class="quiet" data-a="boss" data-n="' + n + '"' + (unlocked ? "" : " disabled") + ">" +
          (unlocked ? "⚔ Challenge" : "\u{1F512} Challenge at 50%") +
          (rec.bossBest ? " · best " + rec.bossBest + "%" : "") + "</button>" +
      "</div></div>";

    var subs = t.subs.map(function (s) {
      var sm = Store.subMastery(s.id);
      var count = Store.poolForSub(s.id).length;
      return '<details class="sub" ' + topicVars(t) + "><summary>" +
        '<span class="stitle"><b>' + s.id + "</b> " + h(s.title) + "</span>" +
        '<span class="bar sbar"><i style="width:' + pct(sm) + '%"></i></span>' +
        '<span class="chev">›</span></summary>' +
        '<div class="sub-body">' +
          s.obj.filter(function (o) { return Store.state.settings.supplement || o[0] === "C"; })
            .map(function (o) {
              return '<div class="obj"><span class="pill ' + o[0] + '">' + o[0] + "</span><span>" + h(o[1]) + "</span></div>";
            }).join("") +
          (count ? '<div class="quiet-row" style="margin-top:12px">' +
            '<button class="quiet" data-a="sub" data-s="' + s.id + '">Practise just this (' + Math.min(count, 8) + ")</button></div>" : "") +
        "</div></details>";
    }).join("");

    renderShell(
      '<button class="backlink" data-a="nav" data-v="home">← Topics</button>' +
      head +
      '<h2 class="head">What you need to know</h2>' +
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
        '<p class="muted">Questions come back 1 day after you get them right, then 2, 4, 8 and 16 days later. ' +
        "Anything you get wrong returns straight away.</p></div></div>";
    } else {
      body = '<div class="card">' +
        '<h1>' + due.length + " question" + (due.length === 1 ? "" : "s") + " due</h1>" +
        '<button class="big-btn" data-a="startreview">' +
          '<span class="bb-label">Review ' + Math.min(20, due.length) + "</span>" +
          '<span class="bb-hint">Spaced review is where the marks come from</span></button>' +
        '<div class="breakdown" style="margin-top:14px">' +
        Object.keys(byTopic).sort(function (a, b) { return a - b; }).map(function (k) {
          var t = TOPIC_BY_N[k];
          return '<div class="brow"><span class="bname">' + t.icon + "  " + h(t.title) + "</span>" +
            '<span class="bnum">' + byTopic[k] + "</span></div>";
        }).join("") + "</div></div>";
    }
    renderShell('<button class="backlink" data-a="nav" data-v="home">← Study</button>' + body);
  }

  /* ---------------- stats ---------------- */
  function renderProgress() {
    var s = Store.state;
    var li = Store.levelInfo();
    var days = Store.historyDays(30);
    var maxXp = Math.max.apply(null, days.map(function (d) { return d.xp; }).concat([1]));
    var totalXp30 = days.reduce(function (a, d) { return a + d.xp; }, 0);
    var active = days.filter(function (d) { return d.a > 0; }).length;

    var chart = '<div class="chart" role="img" aria-label="XP earned on each of the last 30 days">' +
      days.map(function (d) {
        var hgt = Math.max(2, Math.round((d.xp / maxXp) * 100));
        var label = d.offset === 0 ? "today" : d.offset + " days ago";
        return '<span class="cbar' + (d.offset === 0 ? " now" : "") + (d.xp ? "" : " zero") +
          '" style="height:' + hgt + '%" title="' + label + ": " + d.xp + ' XP"></span>';
      }).join("") + "</div>" +
      '<div class="chart-axis"><span>30 days ago</span><span>today</span></div>';

    var typeNames = { mcq: "Multiple choice", multi: "Select all", num: "Numeric",
      text: "Short answer", balance: "Balancing", order: "Ordering", match: "Matching" };
    var byType = s.stats.byType;
    var typeRows = Object.keys(typeNames).filter(function (k) { return byType[k] && byType[k].a; })
      .map(function (k) {
        var r = byType[k];
        return '<div class="brow"><span class="bname">' + typeNames[k] + "</span>" +
          bar(r.c / r.a, "accent") +
          '<span class="bnum">' + pct(r.c / r.a) + "%</span></div>";
      }).join("");

    var topicRows = SYLLABUS.map(function (t) {
      var m = Store.topicMastery(t.n);
      return '<button class="brow rowbtn" ' + topicVars(t) + ' data-a="topic" data-n="' + t.n + '">' +
        '<span class="bname" style="text-align:left">' + t.n + ". " + h(t.title) + "</span>" +
        '<span class="bar"><i style="width:' + pct(m) + '%"></i></span>' +
        '<span class="bnum">' + pct(m) + "%</span></button>";
    }).join("");

    var examRows = s.exams.length
      ? '<div class="table-wrap"><table class="sheet"><thead><tr><th>When</th><th>Score</th><th>Grade</th><th>Paper</th></tr></thead><tbody>' +
        s.exams.slice(0, 10).map(function (e) {
          return "<tr><td>" + h(new Date(e.ts).toLocaleDateString()) + "</td>" +
            "<td>" + e.score + "% (" + e.correct + "/" + e.total + ")</td>" +
            '<td><span class="grade g' + e.grade.replace("*", "star") + '">' + e.grade + "</span></td>" +
            "<td>" + h(e.level) + "</td></tr>";
        }).join("") + "</tbody></table></div>"
      : '<p class="muted">No mock exams sat yet. There is a full paper waiting on the home screen.</p>';

    Store.rollQuests();
    var quests = '<div class="card"><h2 class="card-head">Today\'s quests</h2>' +
      s.daily.quests.map(function (q) {
        return '<div class="quest' + (q.done ? " done" : "") + '">' +
          '<span class="qtick">' + (q.done ? "✓" : "") + "</span>" +
          '<span class="qbody"><span class="qname">' + h(q.text) + "</span>" +
            '<span class="qprog">' + bar(Math.min(1, q.n / q.target), "accent") +
            '<span class="qnum">' + Math.min(q.n, q.target) + "/" + q.target + "</span></span></span>" +
          '<span class="qxp">+' + q.xp + "</span></div>";
      }).join("") + "</div>";

    /* Earned first, and locked ones stay small until you go looking. */
    var earned = [], locked = [];
    Store.BADGES.forEach(function (b) {
      (s.badges.indexOf(b.id) > -1 ? earned : locked).push(b);
    });
    function badgeTile(b, have) {
      return '<div class="badge' + (have ? "" : " locked") + '" title="' + h(b.name + ": " + b.desc) + '">' +
        '<div class="bic">' + (have ? b.icon : "\u{1F512}") + "</div>" +
        '<div class="bname">' + h(have ? b.name : b.desc) + "</div></div>";
    }
    var badges = '<div class="card"><h2 class="card-head">Awards ' +
      '<span class="muted" style="font-weight:500">' + earned.length + " of " + Store.BADGES.length +
      ", plus " + Store.crownCount() + " of 12 crowns</span></h2>" +
      (earned.length
        ? '<div class="badge-grid">' + earned.map(function (b) { return badgeTile(b, true); }).join("") + "</div>"
        : '<p class="muted">Nothing earned yet. Answer a question to get started.</p>') +
      (locked.length
        ? '<details class="sub more"><summary><span class="stitle">' + locked.length +
          ' still to earn</span><span class="chev">›</span></summary>' +
          '<div class="sub-body"><div class="badge-grid">' +
          locked.map(function (b) { return badgeTile(b, false); }).join("") + "</div></div></details>"
        : "") +
      "</div>";

    renderShell(
      '<div class="card">' +
        '<div class="start-top">' +
          '<div class="ring small" style="--pct:' + pct(li.pct) + '"><span class="lv"><b>' + li.level + "</b></span></div>" +
          "<div><div class=\"rank\">" + h(li.rank) + "</div>" +
          '<div class="xpline">' + s.xp + " XP total · " +
            (s.stats.answered ? pct(s.stats.correct / s.stats.answered) : 0) + "% accuracy · " +
            pct(Store.overallMastery()) + "% of the syllabus</div></div>" +
        "</div>" +
        chart +
        '<p class="muted" style="margin:10px 0 0">' + totalXp30 + " XP over " + active +
          " active day" + (active === 1 ? "" : "s") + " in the last month.</p>" +
      "</div>" +
      quests +
      '<div class="card"><h2 class="card-head">Topics</h2><div class="breakdown">' + topicRows + "</div></div>" +
      badges +
      '<details class="sub more"><summary><span class="stitle">More detail</span>' +
        '<span class="chev">›</span></summary><div class="sub-body">' +
        '<div class="stat-row" style="margin-top:8px">' +
          '<div class="stat"><b>' + s.stats.bestCombo + "</b><span>Best run</span></div>" +
          '<div class="stat"><b>' + s.records.survival + "</b><span>Survival</span></div>" +
          '<div class="stat"><b>' + (s.records.exam ? s.records.exam + "%" : "-") + "</b><span>Best exam</span></div>" +
          '<div class="stat"><b>' + s.streak.best + "</b><span>Best streak</span></div>" +
          '<div class="stat"><b>' + s.stats.answered + "</b><span>Answered</span></div>" +
          '<div class="stat"><b>' + s.stats.sessions + "</b><span>Sessions</span></div>" +
        "</div>" +
        (typeRows ? '<h3 style="margin:16px 0 8px">Accuracy by question type</h3>' +
          '<div class="breakdown">' + typeRows + "</div>" : "") +
        '<h3 style="margin:16px 0 8px">Exam log</h3>' + examRows +
      "</div></details>"
    );
  }

  /* ---------------- lab ---------------- */
  function renderLab() {
    var tabs = [["table", "Table"], ["sheet", "Data"],
      ["cards", "Cards"], ["tools", "Maths"]];
    var nav = '<div class="segmented">' + tabs.map(function (t) {
      return '<button class="' + (labTab === t[0] ? "on" : "") + '" data-a="labtab" data-t="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";

    var body;
    if (labTab === "table") body = periodicTable();
    else if (labTab === "sheet") body = dataSheet();
    else if (labTab === "tools") body = toolsView();
    else body = flashcardView();

    renderShell(nav + body);
  }

  function periodicTable() {
    var cells = [];
    for (var z = 1; z <= 118; z++) {
      var e = ELEMENTS[z - 1];
      var p = elementPosition(z);
      var cat = elementCategory(z);
      cells.push('<button class="el ' + cat + '" style="grid-column:' + p.c + ";grid-row:" + p.r + '" ' +
        'data-a="el" data-z="' + z + '" title="' + h(e[1]) + '">' +
        '<span class="z">' + z + '</span><span class="sym">' + e[0] + "</span></button>");
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
        '<br><span class="muted">Outer shell electrons: ' + cfg.split(",").pop() + "</span></p>" : "") +
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

  function mrOutput(r) {
    if (!r) return "";
    if (r.error) return '<div class="calc-out bad">' + h(r.error) + "</div>";
    return '<div class="calc-out">' +
      '<div class="calc-mr">Mr = <b>' + Tools.tidy(r.mr, 2) + "</b></div>" +
      '<div class="muted" style="margin:4px 0 10px">' + r.atoms + " atoms per formula unit</div>" +
      '<div class="table-wrap"><table class="sheet"><thead><tr><th>Element</th><th>Atoms</th><th>Ar</th><th>Mass</th><th>Per cent</th></tr></thead><tbody>' +
      r.parts.map(function (p) {
        return "<tr><td>" + p.sym + " " + h(p.name) + "</td><td>" + p.count + "</td><td>" +
          Tools.tidy(p.ar, 1) + "</td><td>" + Tools.tidy(p.mass, 1) + "</td><td>" +
          Tools.tidy(p.pct, 1) + "</td></tr>";
      }).join("") + "</tbody></table></div></div>";
  }

  function runMr(formula) {
    calc.formula = formula || "";
    calc.result = Tools.parseFormula(calc.formula);
    var box = document.getElementById("fx");
    if (box) box.value = calc.formula;
    var host = document.getElementById("mrout");
    if (host) host.innerHTML = mrOutput(calc.result);
    else go("lab");
  }

  function toolsView() {
    var out = '<div id="mrout">' + mrOutput(calc.result) + "</div>";
    var examples = ["H2SO4", "Ca(NO3)2", "CuSO4.5H2O", "Al2(SO4)3", "C6H12O6"];

    return '<div class="card"><h2>Mr and composition</h2>' +
      '<p class="muted">Type a formula. Brackets and hydrates written with a dot both work.</p>' +
      '<div class="calc-row"><input class="answer-input" id="fx" value="' + h(calc.formula) +
        '" placeholder="e.g. Ca(NO3)2" autocomplete="off" autocapitalize="off" spellcheck="false">' +
        '<button class="btn primary" data-a="calcmr">Work it out</button></div>' +
      '<div class="chip-row">' + examples.map(function (e) {
        return '<button class="minichip" data-a="calcex" data-f="' + h(e) + '">' + h(e) + "</button>";
      }).join("") + "</div>" +
      out + "</div>" +

      '<div class="card"><h2>Moles, mass and molar mass</h2>' +
      '<p class="muted">Fill in any two boxes and leave the third empty.</p>' +
      '<div class="calc-grid">' +
        calcField("mmass", "Mass, g") + calcField("mmr", "Molar mass, g/mol") + calcField("mmol", "Moles, mol") +
      "</div>" +
      '<div class="btn-row" style="margin-top:10px"><button class="btn" data-a="calcmol">Calculate</button></div>' +
      '<div id="molout"></div></div>' +

      '<div class="card"><h2>Concentration</h2>' +
      '<p class="muted">c = n / V, with the volume converted from cm3 to dm3 for you.</p>' +
      '<div class="calc-grid">' +
        calcField("cmol", "Moles, mol") + calcField("cvol", "Volume, cm3") + calcField("cconc", "Concentration, mol/dm3") +
      "</div>" +
      '<div class="btn-row" style="margin-top:10px"><button class="btn" data-a="calcconc">Calculate</button></div>' +
      '<div id="concout"></div></div>' +

      '<div class="card"><h2>Gas volume at rtp</h2>' +
      '<p class="muted">One mole of any gas occupies 24 dm3 at room temperature and pressure.</p>' +
      '<div class="calc-grid">' +
        calcField("gmol", "Moles, mol") + calcField("gvol", "Volume, dm3") +
      "</div>" +
      '<div class="btn-row" style="margin-top:10px"><button class="btn" data-a="calcgas">Calculate</button></div>' +
      '<div id="gasout"></div></div>';
  }

  function calcField(id, label) {
    return '<label class="calc-field"><span>' + h(label) + "</span>" +
      '<input class="answer-input" id="' + id + '" inputmode="decimal" autocomplete="off"></label>';
  }

  function numOrNull(id) {
    var el = document.getElementById(id);
    if (!el || !el.value.trim()) return null;
    var v = parseFloat(el.value);
    return isNaN(v) ? null : v;
  }

  function showCalc(hostId, res, unit) {
    var host = document.getElementById(hostId);
    if (!host) return;
    if (res.error) host.innerHTML = '<div class="calc-out bad">' + h(res.error) + "</div>";
    else host.innerHTML = '<div class="calc-out"><b>' + Tools.tidy(res.value, 4) + "</b> " + h(unit[res.field] || "") + "</div>";
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
    return '<div class="card" ' + topicVars(t) + ">" +
      '<div class="qmeta"><span class="tag" style="color:var(--topic)">Topic ' + c.t + " · " + h(t.title) + "</span>" +
        '<span class="spacer"></span><span class="muted">' + (flash.i + 1) + " / " + flash.deck.length + "</span></div>" +
      '<div class="flash" data-a="flip">' +
        (flash.shown
          ? '<div><div class="fa">' + h(c.b) + '</div><div class="hint">Tap for the question</div></div>'
          : '<div><div class="fq">' + h(c.f) + '</div><div class="hint">Tap to reveal</div></div>') +
      "</div>" +
      '<div class="btn-row"><button class="btn" data-a="prevcard">← Back</button>' +
        '<button class="btn primary" style="flex:1" data-a="nextcard">Next card →</button></div>' +
      "</div>" + picker;
  }

  /* ---------------- question rendering, shared by quiz and exam ---------------- */
  /* A right-hand answer can legitimately be used twice, so the dropdown
     lists each distinct option once. */
  function matchOptions(q) {
    var seen = {}, out = [];
    q.pairs.forEach(function (p) {
      if (!seen[p[1]]) { seen[p[1]] = 1; out.push(p[1]); }
    });
    return out;
  }

  function buildAux(q) {
    if (q.ty === "order") return { pool: Quiz.shuffle(q.a) };
    if (q.ty === "match") return { opts: Quiz.shuffle(matchOptions(q)) };
    return {};
  }
  function blankResponse(q) {
    if (q.ty === "multi") return [];
    if (q.ty === "order") return [];
    if (q.ty === "match") return q.pairs.map(function () { return ""; });
    if (q.ty === "balance") return q.eq.lhs.concat(q.eq.rhs).map(function () { return ""; });
    return null;
  }

  /* One quiet line of context rather than a row of pills. */
  function questionMeta(q, extra) {
    var sub = SUB_INDEX[q.s];
    return '<div class="qmeta"><span class="qmeta-text">' + q.s + "  " + h(sub.sub.title) +
      (q.lv === "S" ? "  ·  Supplement" : "") + "</span>" + (extra || "") + "</div>";
  }

  /* Renders the answer controls. `marked` shows the right and wrong states. */
  function questionInputs(q, resp, marked, aux) {
    if (q.ty === "mcq" || q.ty === "multi") {
      return '<div class="opts">' + q.o.map(function (o, idx) {
        var cls = "opt";
        if (marked) {
          var isRight = q.ty === "mcq" ? idx === q.a : q.a.indexOf(idx) > -1;
          var chosen = q.ty === "mcq" ? resp === idx : (resp || []).indexOf(idx) > -1;
          if (isRight) cls += " right";
          else if (chosen) cls += " wrong";
        } else {
          var sel = q.ty === "mcq" ? resp === idx : (resp || []).indexOf(idx) > -1;
          if (sel) cls += " sel";
        }
        return '<button class="' + cls + '" data-a="opt" data-i="' + idx + '"' + (marked ? " disabled" : "") + ">" +
          '<span class="key">' + "ABCD"[idx] + "</span><span>" + h(o) + "</span></button>";
      }).join("") + "</div>";
    }

    if (q.ty === "num" || q.ty === "text") {
      return '<input class="answer-input" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" ' +
        'placeholder="' + (q.ty === "num" ? "Type a number" : "Type your answer") + '"' +
        (marked ? " disabled" : "") + ' value="' + h(resp == null ? "" : resp) + '">';
    }

    if (q.ty === "balance") {
      var all = q.eq.lhs.concat(q.eq.rhs);
      var want = Quiz.eqCoefficients(q);
      var n = 0;
      function side(list, offset) {
        return list.map(function (sp, k) {
          var idx = offset + k;
          var v = (resp && resp[idx] != null) ? resp[idx] : "";
          var cls = "coef";
          if (marked) cls += parseInt(v, 10) === want[idx] ? " right" : " wrong";
          return (k ? '<span class="plus">+</span>' : "") +
            '<input class="' + cls + '" data-i="' + idx + '" inputmode="numeric" maxlength="2" value="' + h(v) + '"' +
            (marked ? " disabled" : "") + '><span class="species">' + h(sp[0]) + "</span>";
        }).join("");
      }
      n = q.eq.lhs.length;
      return '<div class="eqline">' + side(q.eq.lhs, 0) +
        '<span class="arrow">gives</span>' + side(q.eq.rhs, n) + "</div>" +
        '<p class="muted" style="margin-top:8px">Put a number in every box, including any that are 1.</p>';
    }

    if (q.ty === "order") {
      var chosen = resp || [];
      var pool = (aux.pool || q.a).filter(function (item) { return chosen.indexOf(item) === -1; });
      return '<div class="order-slots">' + (chosen.length
        ? chosen.map(function (item, i) {
            var cls = "chip-item chosen";
            if (marked) cls += q.a[i] === item ? " right" : " wrong";
            return '<button class="' + cls + '" data-a="unpick" data-i="' + i + '"' + (marked ? " disabled" : "") + ">" +
              '<span class="rank">' + (i + 1) + "</span>" + h(item) + "</button>";
          }).join("")
        : '<span class="muted">Tap the cards below in the right order.</span>') + "</div>" +
        (pool.length && !marked
          ? '<div class="order-pool">' + pool.map(function (item) {
              return '<button class="chip-item" data-a="pick" data-v="' + h(item) + '">' + h(item) + "</button>";
            }).join("") + "</div>"
          : "");
    }

    if (q.ty === "match") {
      var opts = aux.opts || matchOptions(q);
      return '<div class="match-list">' + q.pairs.map(function (p, i) {
        var v = (resp && resp[i]) || "";
        var cls = "match-row";
        if (marked) cls += v === p[1] ? " right" : " wrong";
        return '<div class="' + cls + '"><span class="mleft">' + h(p[0]) + "</span>" +
          '<select class="match-sel" data-i="' + i + '"' + (marked ? " disabled" : "") + ">" +
          '<option value=""' + (v ? "" : " selected") + ">Choose...</option>" +
          opts.map(function (o) {
            return '<option value="' + h(o) + '"' + (v === o ? " selected" : "") + ">" + h(o) + "</option>";
          }).join("") + "</select></div>";
      }).join("") + "</div>";
    }
    return "";
  }

  /* Question types that need a Submit button rather than answering on click. */
  function needsSubmit(q) {
    return q.ty !== "mcq";
  }

  /* Pull whatever is currently typed or selected out of the DOM. */
  function collectDomResponse(q, current) {
    if (q.ty === "num" || q.ty === "text") {
      var box = document.getElementById("ans");
      return box ? box.value : current;
    }
    if (q.ty === "balance") {
      var out = [];
      document.querySelectorAll(".coef").forEach(function (el) {
        out[parseInt(el.dataset.i, 10)] = el.value.trim();
      });
      return out;
    }
    return current;
  }

  function responseGiven(q, resp) {
    if (resp == null) return false;
    if (q.ty === "multi" || q.ty === "order") return resp.length > 0;
    if (q.ty === "match") return resp.some(function (v) { return v; });
    if (q.ty === "balance") return resp.some(function (v) { return String(v).trim() !== ""; });
    return String(resp).trim() !== "";
  }

  /* ---------------- session engine ---------------- */
  var timerId = null;
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

  function startSession(opts) {
    var pool, count, mode = opts.mode;
    if (mode === "review") {
      pool = Store.dueQuestions();
      count = Math.min(20, pool.length);
    } else if (mode === "boss") {
      pool = Store.poolForTopic(opts.topic);
      count = Math.min(12, pool.length);
    } else if (mode === "survival") {
      pool = window.QUESTIONS.filter(Store.allowed);
      count = pool.length;
    } else if (mode === "daily") {
      pool = window.QUESTIONS.filter(Store.allowed);
      count = 10;
    } else if (opts.sub) {
      pool = Store.poolForSub(opts.sub);
      count = Math.min(8, pool.length);
    } else {
      pool = Store.poolForTopic(opts.topic);
      count = Math.min(10, pool.length);
    }
    if (!pool.length) { toast("⚠", "No questions available here yet"); return; }

    var qs;
    if (mode === "daily") qs = Quiz.pickSeeded(pool, count, Store.today() * 7919 + 13);
    else if (mode === "survival") qs = Quiz.shuffle(pool);
    else qs = Quiz.pick(pool, count);

    session = {
      mode: mode,
      topic: opts.topic || null,
      sub: opts.sub || null,
      qs: qs,
      i: 0,
      combo: 0,
      best: 0,
      correct: 0,
      xp: 0,
      lives: (mode === "boss" || mode === "survival") ? 3 : null,
      time: mode === "boss" ? 45 : (mode === "survival" ? 30 : null),
      answered: false,
      lastRight: false,
      response: blankResponse(qs[0]),
      aux: buildAux(qs[0]),
      log: {},
      failed: false
    };
    Store.touchStreak();
    go("quiz");
  }

  function currentQ() { return session.qs[session.i]; }

  function survivalTime() {
    return Math.max(10, 30 - Math.floor(session.correct / 4));
  }

  function renderQuiz() {
    var q = currentQ();
    var t = TOPIC_BY_N[q.t];
    var progress = session.mode === "survival"
      ? (session.correct % 10) / 10
      : session.i / session.qs.length;

    var status;
    if (session.mode === "boss" || session.mode === "survival") {
      var hearts = "";
      for (var i = 0; i < 3; i++) hearts += '<span class="' + (i < session.lives ? "" : "dead") + '">❤</span>';
      status = '<span class="lives">' + hearts + "</span>" +
        '<span class="timer' + (session.time <= 10 ? " low" : "") + '">' + session.time + "s</span>";
    } else {
      status = '<span class="combo' + (session.combo >= 3 ? " hot" : "") + '">' +
        (session.combo >= 2 ? "\u{1F525}" + session.combo : "") + "</span>";
    }

    var counter = session.mode === "survival"
      ? "score " + session.correct
      : (session.i + 1) + "/" + session.qs.length;

    var head = '<div class="quiz-top">' +
      '<button class="btn ghost" style="padding:7px 11px" data-a="quit">✕</button>' +
      bar(progress, "accent") +
      '<span class="muted" style="font-variant-numeric:tabular-nums">' + counter + "</span>" +
      status + "</div>";

    var modeTag = "";
    if (session.mode === "boss") modeTag = '<span class="tag" style="color:var(--gold)">Challenge</span>';
    else if (session.mode === "review") modeTag = '<span class="tag">Review</span>';
    else if (session.mode === "survival") modeTag = '<span class="tag" style="color:var(--bad)">Survival</span>';
    else if (session.mode === "daily") modeTag = '<span class="tag" style="color:var(--accent2)">Daily</span>';

    var input = questionInputs(q, session.response, session.answered, session.aux);
    var submitBtn = (!session.answered && needsSubmit(q))
      ? '<div class="btn-row" style="margin-top:12px"><button class="btn primary wide" data-a="submit">Submit answer</button></div>'
      : "";

    var fb = "";
    if (session.answered) {
      fb = '<div class="feedback ' + (session.lastRight ? "right" : "wrong") + '">' +
        '<div class="verdict">' + (session.lastRight ? "✓ Correct" : "✕ Not quite") +
          (session.lastRight ? '<span class="xp">+' + session.lastXp + " XP</span>" : "") + "</div>" +
        (session.lastRight ? "" : '<div class="correct-was">Answer: <b>' + h(Quiz.answerText(q)) + "</b></div>") +
        '<div class="why">' + h(q.ex) + "</div></div>" +
        '<div class="btn-row" style="margin-top:12px"><button class="btn primary wide" data-a="next">' +
        (session.failed || (session.mode !== "survival" && session.i + 1 >= session.qs.length)
          ? "See results" : "Next question") + " →</button></div>";
    }

    renderShell(head + '<div class="card" ' + topicVars(t) + ">" + questionMeta(q, modeTag) +
      '<div class="qtext">' + h(q.q) + "</div>" + input + submitBtn + fb + "</div>");

    if (!session.answered && (q.ty === "num" || q.ty === "text")) {
      var box = document.getElementById("ans");
      if (box) {
        box.addEventListener("keydown", function (e) {
          if (e.key === "Enter") { e.preventDefault(); submitAnswer(); }
        });
        if (window.matchMedia("(min-width: 720px)").matches) box.focus();
      }
    }
    if ((session.mode === "boss" || session.mode === "survival") && !session.answered) startCountdown();
  }

  function startCountdown() {
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
    var q, resp;
    if (route.view === "exam") {
      q = exam.qs[exam.i];
      if (q.ty === "mcq") exam.answers[exam.i] = idx;
      else {
        resp = exam.answers[exam.i] || [];
        var at = resp.indexOf(idx);
        if (at > -1) resp.splice(at, 1); else resp.push(idx);
        exam.answers[exam.i] = resp;
      }
      Sfx.play("click");
      renderExam();
      return;
    }
    if (!session || session.answered) return;
    q = currentQ();
    if (q.ty === "multi") {
      session.response = session.response || [];
      var j = session.response.indexOf(idx);
      if (j > -1) session.response.splice(j, 1); else session.response.push(idx);
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
    session.response = collectDomResponse(q, session.response);
    if (!timeout && !responseGiven(q, session.response)) {
      toast("✍", "Give an answer first");
      return;
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
      if (session.mode === "boss" || session.mode === "survival") {
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
    var last = session.mode !== "survival" && session.i + 1 >= session.qs.length;
    if (session.failed || last) { finishSession(); return; }
    session.i++;
    if (session.mode === "survival" && session.i >= session.qs.length) {
      session.qs = session.qs.concat(Quiz.shuffle(window.QUESTIONS.filter(Store.allowed)));
    }
    var q = currentQ();
    session.answered = false;
    session.response = blankResponse(q);
    session.aux = buildAux(q);
    if (session.mode === "boss") session.time = 45;
    if (session.mode === "survival") session.time = survivalTime();
    go("quiz");
  }

  function finishSession() {
    stopTimer();
    var s = session;
    var total = s.i + (s.answered ? 1 : 0);
    var score = total ? Math.round((s.correct / total) * 100) : 0;
    var bonus = 0;
    var notes = [];
    var won = false;

    if (s.mode === "boss") {
      var rec = Store.topicRec(s.topic);
      if (rec.bossBest < score) rec.bossBest = score;
      if (!s.failed && s.correct === s.qs.length) {
        bonus += 200;
        notes.push("Flawless challenge, +200 XP");
        won = true;
      } else if (!s.failed && score >= 75) {
        bonus += 120;
        notes.push("Challenge passed, +120 XP");
        won = true;
      } else {
        Sfx.play("fail");
        notes.push("You need 75 per cent or better, with lives to spare, to take the crown.");
      }
      if (won) {
        if (!rec.crown) { rec.crown = true; notes.push("Topic crown earned"); }
        Store.state.stats.bosses++;
        Sfx.play("win");
      }
    } else if (s.mode === "survival") {
      bonus += s.correct * 6;
      notes.push("Survival bonus, +" + bonus + " XP");
      Store.state.stats.survivals++;
      if (Store.setRecord("survival", s.correct)) {
        notes.push("New survival record");
        Sfx.play("win");
      } else Sfx.play("fail");
    } else if (s.mode === "daily") {
      bonus += 60 + Math.round(score);
      notes.push("Daily challenge complete, +" + bonus + " XP");
      Store.finishChallenge(score);
      Sfx.play("win");
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

    session.summary = { score: score, total: total, bonus: bonus, notes: notes, won: won };
    go("results");
  }

  function renderResults() {
    var s = session;
    var sum = s.summary;
    var t = s.topic ? TOPIC_BY_N[s.topic] : null;
    var title, emoji, headline;

    if (s.mode === "boss") {
      title = sum.won ? "Challenge cleared" : "Challenge failed";
      emoji = sum.won ? "\u{1F451}" : "\u{1F480}";
      headline = sum.score + "%";
    } else if (s.mode === "survival") {
      title = "Out of lives";
      emoji = "\u{1F6E1}";
      headline = String(s.correct);
    } else if (s.mode === "daily") {
      title = "Daily challenge done";
      emoji = "\u{1F5D3}";
      headline = sum.score + "%";
    } else if (sum.score >= 90) { title = "Outstanding"; emoji = "\u{1F31F}"; headline = sum.score + "%"; }
    else if (sum.score >= 70) { title = "Solid work"; emoji = "\u{1F44D}"; headline = sum.score + "%"; }
    else if (sum.score >= 50) { title = "Getting there"; emoji = "\u{1F4AA}"; headline = sum.score + "%"; }
    else { title = "Worth another run"; emoji = "\u{1F4DA}"; headline = sum.score + "%"; }

    var breakdown = Object.keys(s.log).sort().map(function (k) {
      var l = s.log[k];
      return '<div class="brow"><span class="bname">' + k + "  " + h(SUB_INDEX[k].sub.title) + "</span>" +
        bar(l.c / l.t) + '<span class="bnum">' + l.c + "/" + l.t + "</span></div>";
    }).join("");

    var body = '<div class="card"' + (t ? " " + topicVars(t) : "") + ">" +
      '<div class="result-head">' +
        '<div style="font-size:44px">' + emoji + "</div>" +
        '<div class="score">' + headline + "</div>" +
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
        (s.mode === "survival" ? '<button class="btn primary" data-a="survival">Play again</button>' : "") +
        (t ? '<button class="btn primary" data-a="practice" data-n="' + t.n + '">Another session</button>' +
             '<button class="btn" data-a="topic" data-n="' + t.n + '">Back to topic</button>' : "") +
        '<button class="btn ghost" data-a="nav" data-v="home">Done</button>' +
      "</div></div>";

    renderShell(body);
  }

  /* ---------------- mock exam ---------------- */
  var examTimerId = null;
  function stopExamTimer() { if (examTimerId) { clearInterval(examTimerId); examTimerId = null; } }

  function startExam() {
    var qs = Quiz.pickMixed(EXAM_LENGTH);
    if (qs.length < 5) { toast("⚠", "Not enough questions for a paper"); return; }
    exam = {
      qs: qs,
      i: 0,
      answers: qs.map(blankResponse),
      aux: qs.map(buildAux),
      flags: qs.map(function () { return false; }),
      left: EXAM_SECONDS,
      done: false,
      reviewing: false
    };
    Store.touchStreak();
    go("exam");
  }

  function renderExam() {
    if (exam.done) { renderExamResults(); return; }
    var q = exam.qs[exam.i];
    var t = TOPIC_BY_N[q.t];
    var answeredCount = exam.answers.filter(function (a, i) { return responseGiven(exam.qs[i], a); }).length;

    var strip = '<div class="qstrip">' + exam.qs.map(function (qq, i) {
      var cls = "qdot";
      if (i === exam.i) cls += " on";
      if (responseGiven(qq, exam.answers[i])) cls += " filled";
      if (exam.flags[i]) cls += " flagged";
      return '<button class="' + cls + '" data-a="jump" data-i="' + i + '">' + (i + 1) + "</button>";
    }).join("") + "</div>";

    var head = '<div class="quiz-top">' +
      '<button class="btn ghost" style="padding:7px 11px" data-a="quitexam">✕</button>' +
      bar(answeredCount / exam.qs.length, "accent") +
      '<span class="muted" style="font-variant-numeric:tabular-nums">' + answeredCount + "/" + exam.qs.length + "</span>" +
      '<span class="timer' + (exam.left <= 300 ? " low" : "") + '">' + clock(exam.left) + "</span></div>";

    var body = '<div class="card" ' + topicVars(t) + ">" +
      questionMeta(q, '<span class="tag" style="color:var(--gold)">Q' + (exam.i + 1) + "</span>" +
        '<span class="spacer"></span><button class="flagbtn' + (exam.flags[exam.i] ? " on" : "") +
        '" data-a="flag">' + (exam.flags[exam.i] ? "\u{1F6A9} Flagged" : "\u{1F3F3} Flag") + "</button>") +
      '<div class="qtext">' + h(q.q) + "</div>" +
      questionInputs(q, exam.answers[exam.i], false, exam.aux[exam.i]) +
      '<div class="btn-row" style="margin-top:16px">' +
        '<button class="btn" data-a="exprev"' + (exam.i === 0 ? " disabled" : "") + ">← Previous</button>" +
        '<button class="btn primary" style="flex:1" data-a="exnext">' +
          (exam.i + 1 >= exam.qs.length ? "Last question" : "Next →") + "</button>" +
      "</div></div>" +
      '<div class="card"><h3>Answer sheet</h3>' + strip +
      '<div class="btn-row" style="margin-top:12px"><button class="btn danger wide" data-a="finishexam">Finish and mark the paper</button></div></div>';

    renderShell(head + body);
    startExamTimer();
  }

  function startExamTimer() {
    stopExamTimer();
    examTimerId = setInterval(function () {
      if (!exam || exam.done) { stopExamTimer(); return; }
      exam.left--;
      var el = document.querySelector(".timer");
      if (el) {
        el.textContent = clock(exam.left);
        el.classList.toggle("low", exam.left <= 300);
      }
      if (exam.left <= 0) {
        stopExamTimer();
        toast("⏰", "Time is up", "The paper has been marked as it stands");
        finishExam();
      }
    }, 1000);
  }

  function saveExamDom() {
    if (!exam || exam.done) return;
    var q = exam.qs[exam.i];
    exam.answers[exam.i] = collectDomResponse(q, exam.answers[exam.i]);
  }

  function finishExam() {
    stopExamTimer();
    saveExamDom();
    var correct = 0;
    exam.marks = exam.qs.map(function (q, i) {
      var ok = Quiz.check(q, exam.answers[i]);
      if (ok) correct++;
      /* an exam still feeds the spaced repetition schedule */
      Store.recordAnswer(q, ok, 0);
      return ok;
    });
    exam.correct = correct;
    exam.score = Math.round((correct / exam.qs.length) * 100);
    exam.grade = Store.gradeFor(exam.score);
    exam.done = true;

    var xp = correct * 12 + (exam.score >= 60 ? 100 : 0);
    withLevelWatch(function () { Store.addXp(xp); });
    exam.xp = xp;
    Store.recordExam({
      score: exam.score, correct: correct, total: exam.qs.length,
      grade: exam.grade, level: Store.state.settings.supplement ? "Extended" : "Core"
    });
    questProgress("answered", exam.qs.length);
    questProgress("correct", correct);
    Sfx.play(exam.score >= 60 ? "win" : "fail");
    awardBadges();
    go("exam");
  }

  function renderExamResults() {
    var byTopic = {};
    exam.qs.forEach(function (q, i) {
      if (!byTopic[q.t]) byTopic[q.t] = { c: 0, t: 0 };
      byTopic[q.t].t++;
      if (exam.marks[i]) byTopic[q.t].c++;
    });

    var breakdown = Object.keys(byTopic).sort(function (a, b) { return a - b; }).map(function (k) {
      var l = byTopic[k], t = TOPIC_BY_N[k];
      return '<button class="brow rowbtn" ' + topicVars(t) + ' data-a="topic" data-n="' + k + '">' +
        '<span class="bname" style="text-align:left">' + t.icon + "  " + h(t.title) + "</span>" +
        '<span class="bar"><i style="width:' + pct(l.c / l.t) + '%"></i></span>' +
        '<span class="bnum">' + l.c + "/" + l.t + "</span></button>";
    }).join("");

    var wrong = exam.qs.map(function (q, i) { return { q: q, i: i }; })
      .filter(function (r) { return !exam.marks[r.i]; });

    var reviewList = exam.reviewing
      ? '<h2 class="head">Every question</h2>' +
        exam.qs.map(function (q, i) {
          var ok = exam.marks[i];
          return '<div class="card review-item ' + (ok ? "ok" : "no") + '">' +
            '<div class="qmeta"><span class="tag">Q' + (i + 1) + "</span>" +
              '<span class="tag">' + q.s + "</span>" +
              '<span class="spacer"></span><span class="verdict-mini">' + (ok ? "✓" : "✕") + "</span></div>" +
            '<div style="font-weight:600;line-height:1.5;margin-bottom:8px">' + h(q.q) + "</div>" +
            '<div class="muted" style="font-size:13px">Your answer: ' +
              h(describeResponse(q, exam.answers[i])) + "</div>" +
            (ok ? "" : '<div style="font-size:13px;margin-top:4px">Correct: <b style="color:var(--good)">' +
              h(Quiz.answerText(q)) + "</b></div>") +
            '<div class="why" style="margin-top:8px">' + h(q.ex) + "</div></div>";
        }).join("")
      : "";

    renderShell(
      '<div class="card"><div class="result-head">' +
        '<div class="grade-big g' + exam.grade.replace("*", "star") + '">' + exam.grade + "</div>" +
        '<div class="score">' + exam.score + "%</div>" +
        '<p class="muted" style="margin:4px 0 0">' + exam.correct + " of " + exam.qs.length +
          " correct on the " + (Store.state.settings.supplement ? "Extended" : "Core") + " paper</p>" +
      "</div>" +
      '<div class="result-grid">' +
        '<div class="stat"><b>+' + exam.xp + "</b><span>XP earned</span></div>" +
        '<div class="stat"><b>' + wrong.length + "</b><span>To revisit</span></div>" +
        '<div class="stat"><b>' + Store.state.records.exam + "%</b><span>Personal best</span></div>" +
      "</div>" +
      '<p class="muted">Grade boundaries here are a rough guide: 90 for A*, 80 A, 70 B, 60 C, 50 D, 40 E, 30 F, 20 G. ' +
        "Every question you met has been added to your review schedule.</p>" +
      '<div class="btn-row" style="margin-top:12px">' +
        '<button class="btn primary" data-a="examreview">' + (exam.reviewing ? "Hide" : "Go through") + " the paper</button>" +
        '<button class="btn" data-a="exam">Sit another</button>' +
        '<button class="btn ghost" data-a="nav" data-v="home">Done</button>' +
      "</div></div>" +
      '<h2 class="head">By topic</h2>' +
      '<div class="card"><div class="breakdown">' + breakdown + "</div></div>" +
      reviewList
    );
  }

  function describeResponse(q, resp) {
    if (!responseGiven(q, resp)) return "left blank";
    if (q.ty === "mcq") return q.o[resp];
    if (q.ty === "multi") return resp.map(function (i) { return q.o[i]; }).join(", ");
    if (q.ty === "order") return resp.join("  ›  ");
    if (q.ty === "match") {
      return q.pairs.map(function (p, i) { return p[0] + " = " + (resp[i] || "?"); }).join("   |   ");
    }
    if (q.ty === "balance") {
      var all = q.eq.lhs.concat(q.eq.rhs);
      return all.map(function (sp, i) { return (resp[i] || "?") + sp[0]; }).join(" + ");
    }
    return String(resp);
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
  document.addEventListener("change", function (e) {
    var sel = e.target.closest(".match-sel");
    if (!sel) return;
    var i = parseInt(sel.dataset.i, 10);
    if (route.view === "exam") exam.answers[exam.i][i] = sel.value;
    else if (session) session.response[i] = sel.value;
  });

  /* Enter runs the formula calculator without leaving the field. */
  document.addEventListener("keydown", function (e) {
    if (e.target && e.target.id === "fx" && e.key === "Enter") {
      e.preventDefault();
      runMr(e.target.value);
    }
  });

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-a]");
    if (!el) return;
    var a = el.dataset.a;

    if (a === "nav") { closeModal(); session = null; exam = null; go(el.dataset.v); }
    else if (a === "topic") { closeModal(); go("topic", +el.dataset.n); }
    else if (a === "practice") startSession({ mode: "practice", topic: +el.dataset.n });
    else if (a === "sub") startSession({ mode: "practice", sub: el.dataset.s, topic: SUB_INDEX[el.dataset.s].topic.n });
    else if (a === "boss") startSession({ mode: "boss", topic: +el.dataset.n });
    else if (a === "startreview") startSession({ mode: "review" });
    else if (a === "survival") startSession({ mode: "survival" });
    else if (a === "daily") {
      var ch = Store.challengeState();
      if (ch.done) toast("\u{1F5D3}", "Already played today", "You scored " + ch.score + "%. A new set arrives tomorrow.");
      else startSession({ mode: "daily" });
    }
    else if (a === "exam") startExam();
    else if (a === "continue") {
      var next = nextUp();
      if (next.kind === "review") startSession({ mode: "review" });
      else startSession({ mode: "practice", topic: next.topic });
    }
    else if (a === "opt") chooseOption(+el.dataset.i);
    else if (a === "pick" || a === "unpick") {
      var target = route.view === "exam" ? exam.answers[exam.i] : session.response;
      if (a === "pick") target.push(el.dataset.v);
      else target.splice(+el.dataset.i, 1);
      Sfx.play("click");
      if (route.view === "exam") renderExam(); else renderQuiz();
    }
    else if (a === "submit") submitAnswer();
    else if (a === "next") nextQuestion();
    else if (a === "quit") {
      if (session && session.i === 0 && !session.answered) { session = null; go("home"); }
      else if (confirm("End this session and keep the XP earned so far?")) finishSession();
    }
    else if (a === "quitexam") {
      if (confirm("Leave the exam? Nothing will be marked or saved.")) { exam = null; go("home"); }
    }
    else if (a === "exprev") { saveExamDom(); exam.i = Math.max(0, exam.i - 1); go("exam"); }
    else if (a === "exnext") { saveExamDom(); exam.i = Math.min(exam.qs.length - 1, exam.i + 1); go("exam"); }
    else if (a === "jump") { saveExamDom(); exam.i = +el.dataset.i; go("exam"); }
    else if (a === "flag") { saveExamDom(); exam.flags[exam.i] = !exam.flags[exam.i]; renderExam(); }
    else if (a === "finishexam") {
      if (confirm("Mark the paper now? Any unanswered questions count as wrong.")) finishExam();
    }
    else if (a === "examreview") { exam.reviewing = !exam.reviewing; go("exam"); }
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
    else if (a === "calcmr" || a === "calcex") {
      runMr(a === "calcex" ? el.dataset.f : (document.getElementById("fx") || {}).value);
    }
    else if (a === "calcmol") {
      showCalc("molout", Tools.solveMoles(numOrNull("mmass"), numOrNull("mmr"), numOrNull("mmol")),
        { moles: "mol", mass: "g", mr: "g/mol" });
    }
    else if (a === "calcconc") {
      showCalc("concout", Tools.solveConc(numOrNull("cmol"), numOrNull("cvol"), numOrNull("cconc")),
        { conc: "mol/dm3", moles: "mol", vol: "cm3" });
    }
    else if (a === "calcgas") {
      showCalc("gasout", Tools.solveGas(numOrNull("gmol"), numOrNull("gvol")),
        { vol: "dm3", moles: "mol" });
    }
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
    var inQuiz = route.view === "quiz" && session;
    var inExam = route.view === "exam" && exam && !exam.done;
    if (!inQuiz && !inExam) return;
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" ||
        e.target.tagName === "TEXTAREA")) return;

    var q = inQuiz ? currentQ() : exam.qs[exam.i];
    var locked = inQuiz && session.answered;

    if (!locked && (q.ty === "mcq" || q.ty === "multi")) {
      var idx = "1234".indexOf(e.key);
      if (idx < 0) idx = "abcd".indexOf(e.key.toLowerCase());
      if (idx > -1 && idx < q.o.length) { e.preventDefault(); chooseOption(idx); return; }
    }
    if (inExam) {
      if (e.key === "ArrowRight") { e.preventDefault(); saveExamDom(); exam.i = Math.min(exam.qs.length - 1, exam.i + 1); go("exam"); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); saveExamDom(); exam.i = Math.max(0, exam.i - 1); go("exam"); }
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (session.answered) nextQuestion();
      else if (needsSubmit(q)) submitAnswer();
    }
  });

  /* ---------------- router ---------------- */
  function render() {
    if (route.view === "home") renderHome();
    else if (route.view === "topic") renderTopic(route.arg);
    else if (route.view === "review") renderReview();
    else if (route.view === "lab") renderLab();
    else if (route.view === "progress" || route.view === "stats" || route.view === "badges") renderProgress();
    else if (route.view === "quiz") renderQuiz();
    else if (route.view === "results") renderResults();
    else if (route.view === "exam") renderExam();
    else renderHome();
  }

  Store.rollQuests();
  render();
})();
