/* Save state, progression, spaced repetition, badges and daily quests. */

(function () {
  var KEY = "igcse-chem-lab-v1";
  var DAY_MS = 86400000;

  function today() { return Math.floor(Date.now() / DAY_MS); }

  var defaults = {
    v: 1,
    xp: 0,
    created: Date.now(),
    streak: { count: 0, best: 0, last: -1 },
    srs: {},                 /* questionId -> { box, due, seen, right } */
    topics: {},              /* topic number -> { boss, crown, bossBest } */
    badges: [],
    daily: { day: -1, quests: [] },
    settings: { supplement: true, sound: true },
    stats: { answered: 0, correct: 0, sessions: 0, bestCombo: 0, cards: 0, bosses: 0 }
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  var state = null;

  /* Top up a loaded object with any fields a previous version did not have. */
  function hydrate(obj) {
    Object.keys(defaults).forEach(function (k) {
      if (obj[k] === undefined) obj[k] = clone(defaults[k]);
    });
    Object.keys(defaults.settings).forEach(function (k) {
      if (obj.settings[k] === undefined) obj.settings[k] = defaults.settings[k];
    });
    Object.keys(defaults.stats).forEach(function (k) {
      if (obj.stats[k] === undefined) obj.stats[k] = defaults.stats[k];
    });
    return obj;
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      state = raw ? JSON.parse(raw) : clone(defaults);
    } catch (e) {
      state = clone(defaults);
    }
    return hydrate(state);
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage full or blocked */ }
  }

  /* ---------------- Levels ---------------- */
  var RANKS = [
    "Lab Assistant", "Bench Technician", "Junior Analyst", "Analyst", "Chemist",
    "Senior Chemist", "Reaction Specialist", "Research Chemist", "Lead Researcher",
    "Principal Chemist", "Professor", "Laureate"
  ];

  /* Cumulative XP needed to reach level L is 25 * L * (L - 1). */
  function levelFromXp(xp) {
    return Math.floor((1 + Math.sqrt(1 + 0.32 * xp)) / 2);
  }
  function xpForLevel(l) { return 25 * l * (l - 1); }
  function rankFor(level) { return RANKS[Math.min(RANKS.length - 1, Math.floor((level - 1) / 2))]; }

  function levelInfo() {
    var lvl = levelFromXp(state.xp);
    var base = xpForLevel(lvl);
    var next = xpForLevel(lvl + 1);
    return {
      level: lvl,
      rank: rankFor(lvl),
      xp: state.xp,
      into: state.xp - base,
      need: next - base,
      pct: Math.max(0, Math.min(1, (state.xp - base) / (next - base)))
    };
  }

  /* ---------------- Question pools ---------------- */
  function allowed(q) {
    return state.settings.supplement || q.lv === "C";
  }
  function poolForTopic(n) {
    return window.QUESTIONS.filter(function (q) { return q.t === n && allowed(q); });
  }
  function poolForSub(id) {
    return window.QUESTIONS.filter(function (q) { return q.s === id && allowed(q); });
  }

  /* ---------------- Spaced repetition ---------------- */
  var INTERVALS = [0, 1, 2, 4, 8, 16];

  function rec(id) {
    if (!state.srs[id]) state.srs[id] = { box: 0, due: today(), seen: 0, right: 0 };
    return state.srs[id];
  }

  function grade(id, correct) {
    var r = rec(id);
    r.seen++;
    if (correct) {
      r.right++;
      r.box = Math.min(5, r.box + 1);
      r.due = today() + INTERVALS[r.box];
    } else {
      /* a missed question comes straight back into the review queue */
      r.box = Math.max(1, r.box - 1);
      r.due = today();
    }
  }

  function dueQuestions() {
    var t = today();
    return window.QUESTIONS.filter(function (q) {
      var r = state.srs[q.id];
      return allowed(q) && r && r.box > 0 && r.due <= t;
    });
  }

  /* ---------------- Mastery ---------------- */
  function masteryOf(list) {
    if (!list.length) return 0;
    var sum = 0;
    list.forEach(function (q) {
      var r = state.srs[q.id];
      if (r) sum += Math.min(5, r.box) / 5;
    });
    return sum / list.length;
  }
  function topicMastery(n) { return masteryOf(poolForTopic(n)); }
  function subMastery(id) { return masteryOf(poolForSub(id)); }
  function overallMastery() {
    return masteryOf(window.QUESTIONS.filter(allowed));
  }

  function topicRec(n) {
    if (!state.topics[n]) state.topics[n] = { crown: false, bossBest: 0 };
    return state.topics[n];
  }
  function bossUnlocked(n) { return topicMastery(n) >= 0.5; }

  /* ---------------- Streak ---------------- */
  function touchStreak() {
    var t = today();
    if (state.streak.last === t) return false;
    if (state.streak.last === t - 1) state.streak.count++;
    else state.streak.count = 1;
    state.streak.last = t;
    if (state.streak.count > state.streak.best) state.streak.best = state.streak.count;
    save();
    return true;
  }
  function streakAlive() {
    var t = today();
    return state.streak.last === t || state.streak.last === t - 1;
  }

  /* ---------------- Daily quests ---------------- */
  var QUEST_POOL = [
    { id: "answer20", text: "Answer 20 questions", target: 20, xp: 60, track: "answered" },
    { id: "correct15", text: "Get 15 answers correct", target: 15, xp: 70, track: "correct" },
    { id: "combo6", text: "Reach a streak of 6 correct in a row", target: 6, xp: 60, track: "combo" },
    { id: "session2", text: "Finish 2 lab sessions", target: 2, xp: 70, track: "sessions" },
    { id: "review10", text: "Review 10 due questions", target: 10, xp: 80, track: "reviews" },
    { id: "cards12", text: "Study 12 flashcards", target: 12, xp: 50, track: "cards" },
    { id: "supp8", text: "Answer 8 Supplement questions correctly", target: 8, xp: 80, track: "supp" },
    { id: "perfect", text: "Finish a session with no mistakes", target: 1, xp: 90, track: "perfect" }
  ];

  function rollQuests() {
    var t = today();
    if (state.daily.day === t && state.daily.quests.length) return;
    /* Deterministic pick so the same three quests appear all day. */
    var picked = [];
    var start = t % QUEST_POOL.length;
    for (var i = 0; i < 3; i++) {
      var q = QUEST_POOL[(start + i * 3) % QUEST_POOL.length];
      if (picked.indexOf(q) === -1) picked.push(q);
    }
    var j = 0;
    while (picked.length < 3) {
      if (picked.indexOf(QUEST_POOL[j]) === -1) picked.push(QUEST_POOL[j]);
      j++;
    }
    state.daily = {
      day: t,
      quests: picked.map(function (q) {
        return { id: q.id, text: q.text, target: q.target, xp: q.xp, track: q.track, n: 0, done: false };
      })
    };
    save();
  }

  /* Advance any quest watching this tracker. Returns quests completed now. */
  function progressQuest(track, amount) {
    rollQuests();
    var finished = [];
    state.daily.quests.forEach(function (q) {
      if (q.done || q.track !== track) return;
      if (track === "combo" || track === "perfect") q.n = Math.max(q.n, amount);
      else q.n += amount;
      if (q.n >= q.target) {
        q.n = q.target;
        q.done = true;
        state.xp += q.xp;
        finished.push(q);
      }
    });
    if (finished.length) save();
    return finished;
  }

  /* ---------------- Badges ---------------- */
  var BADGES = [
    { id: "first", icon: "\u{1F9EA}", name: "First Drop", desc: "Answer your first question",
      test: function (s) { return s.stats.answered >= 1; } },
    { id: "c25", icon: "✅", name: "Getting Reactive", desc: "Answer 25 questions correctly",
      test: function (s) { return s.stats.correct >= 25; } },
    { id: "c100", icon: "\u{1F396}", name: "Century", desc: "Answer 100 questions correctly",
      test: function (s) { return s.stats.correct >= 100; } },
    { id: "c300", icon: "\u{1F3C5}", name: "Triple Century", desc: "Answer 300 questions correctly",
      test: function (s) { return s.stats.correct >= 300; } },
    { id: "combo10", icon: "\u{1F525}", name: "Chain Reaction", desc: "Get 10 correct in a row",
      test: function (s) { return s.stats.bestCombo >= 10; } },
    { id: "combo20", icon: "⚡", name: "Runaway Reaction", desc: "Get 20 correct in a row",
      test: function (s) { return s.stats.bestCombo >= 20; } },
    { id: "streak3", icon: "\u{1F4C5}", name: "Habit Forming", desc: "Study 3 days in a row",
      test: function (s) { return s.streak.best >= 3; } },
    { id: "streak7", icon: "\u{1F5D3}", name: "Full Week", desc: "Study 7 days in a row",
      test: function (s) { return s.streak.best >= 7; } },
    { id: "streak30", icon: "\u{1F31F}", name: "Iron Discipline", desc: "Study 30 days in a row",
      test: function (s) { return s.streak.best >= 30; } },
    { id: "lvl5", icon: "\u{1F4D8}", name: "Qualified", desc: "Reach level 5",
      test: function (s) { return levelFromXp(s.xp) >= 5; } },
    { id: "lvl10", icon: "\u{1F393}", name: "Graduate", desc: "Reach level 10",
      test: function (s) { return levelFromXp(s.xp) >= 10; } },
    { id: "lvl20", icon: "\u{1F451}", name: "Professor", desc: "Reach level 20",
      test: function (s) { return levelFromXp(s.xp) >= 20; } },
    { id: "boss1", icon: "⚔", name: "Boss Down", desc: "Win your first topic challenge",
      test: function (s) { return s.stats.bosses >= 1; } },
    { id: "crown6", icon: "\u{1F947}", name: "Half the Syllabus", desc: "Earn 6 topic crowns",
      test: function (s) { return crownCount() >= 6; } },
    { id: "crown12", icon: "\u{1F3C6}", name: "Complete Set", desc: "Earn all 12 topic crowns",
      test: function (s) { return crownCount() >= 12; } },
    { id: "cards50", icon: "\u{1F5C3}", name: "Card Shark", desc: "Study 50 flashcards",
      test: function (s) { return s.stats.cards >= 50; } },
    { id: "mastery50", icon: "\u{1F9EE}", name: "Halfway Compound", desc: "Reach 50 per cent overall mastery",
      test: function () { return overallMastery() >= 0.5; } },
    { id: "mastery100", icon: "\u{1F48E}", name: "Crystallised", desc: "Reach 100 per cent overall mastery",
      test: function () { return overallMastery() >= 0.999; } },
    { id: "sessions25", icon: "\u{1F52C}", name: "Lab Regular", desc: "Complete 25 lab sessions",
      test: function (s) { return s.stats.sessions >= 25; } }
  ];

  function crownCount() {
    var n = 0;
    Object.keys(state.topics).forEach(function (k) { if (state.topics[k].crown) n++; });
    return n;
  }

  /* Returns badges unlocked by this check. */
  function checkBadges() {
    var gained = [];
    BADGES.forEach(function (b) {
      if (state.badges.indexOf(b.id) === -1 && b.test(state)) {
        state.badges.push(b.id);
        gained.push(b);
      }
    });
    if (gained.length) save();
    return gained;
  }

  /* ---------------- Answer recording ---------------- */
  function addXp(n) {
    state.xp += n;
    save();
  }

  function recordAnswer(q, correct, combo) {
    state.stats.answered++;
    if (correct) state.stats.correct++;
    if (combo > state.stats.bestCombo) state.stats.bestCombo = combo;
    grade(q.id, correct);
    save();
  }

  function reset() {
    state = clone(defaults);
    save();
  }

  function exportSave() { return JSON.stringify(state); }

  function importSave(text) {
    var parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || typeof parsed.xp !== "number") {
      throw new Error("That does not look like a Chem Lab save file.");
    }
    state = hydrate(parsed);
    save();
  }

  load();

  window.Store = {
    get state() { return state; },
    save: save,
    reset: reset,
    today: today,
    levelInfo: levelInfo,
    levelFromXp: levelFromXp,
    addXp: addXp,
    recordAnswer: recordAnswer,
    grade: grade,
    dueQuestions: dueQuestions,
    poolForTopic: poolForTopic,
    poolForSub: poolForSub,
    allowed: allowed,
    topicMastery: topicMastery,
    subMastery: subMastery,
    overallMastery: overallMastery,
    topicRec: topicRec,
    bossUnlocked: bossUnlocked,
    crownCount: crownCount,
    touchStreak: touchStreak,
    streakAlive: streakAlive,
    rollQuests: rollQuests,
    progressQuest: progressQuest,
    checkBadges: checkBadges,
    BADGES: BADGES,
    exportSave: exportSave,
    importSave: importSave
  };
})();
