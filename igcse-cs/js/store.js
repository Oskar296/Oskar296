/* Local progress store. Everything lives in localStorage, nothing leaves the browser. */

const Store = (function () {
  const KEY = "bitwise.igcse.v1";

  const fresh = () => ({
    theme: null,          // "dark" | "light" | null (follow system)
    conf: {},             // subtopic id -> 1 shaky, 2 ok, 3 solid
    read: {},             // subtopic id -> true once notes opened
    quiz: {},             // subtopic id -> {right, asked, best}
    cards: {},            // card id -> {box:1..5, due: epoch ms}
    xp: 0,
    streak: { count: 0, last: null },
    drill: { best: 0 }
  });

  let s = fresh();

  try {
    const raw = localStorage.getItem(KEY);
    if (raw) s = Object.assign(fresh(), JSON.parse(raw));
  } catch (e) { /* corrupted or blocked storage: fall back to defaults */ }

  let saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    }, 120);
  }

  const todayKey = () => new Date().toISOString().slice(0, 10);

  function touchStreak() {
    const t = todayKey();
    if (s.streak.last === t) return false;
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    s.streak.count = s.streak.last === y ? s.streak.count + 1 : 1;
    s.streak.last = t;
    save();
    return true;
  }

  function addXp(n) { s.xp += n; save(); }

  /* ---- progress model -------------------------------------------------
     A subtopic is scored out of 100 from three signals:
       read the notes          -> 20
       self-rated confidence   -> up to 30
       quiz accuracy           -> up to 50
  --------------------------------------------------------------------- */
  function mastery(id) {
    let v = 0;
    if (s.read[id]) v += 20;
    const c = s.conf[id];
    if (c) v += c * 10;
    const q = s.quiz[id];
    if (q && q.asked >= 3) v += Math.round((q.right / q.asked) * 50);
    else if (q && q.asked > 0) v += Math.round((q.right / q.asked) * 25);
    return Math.min(100, v);
  }

  function topicMastery(topic) {
    const vals = topic.subs.map(sub => mastery(sub.id));
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }

  function overall() {
    const ids = SYLLABUS.flatMap(t => t.subs.map(x => x.id));
    return Math.round(ids.reduce((a, id) => a + mastery(id), 0) / ids.length);
  }

  function recordQuiz(id, right) {
    const q = s.quiz[id] || (s.quiz[id] = { right: 0, asked: 0 });
    q.asked++;
    if (right) q.right++;
    save();
  }

  function setConf(id, v) {
    if (s.conf[id] === v) delete s.conf[id]; else s.conf[id] = v;
    save();
  }

  function markRead(id) {
    if (!s.read[id]) { s.read[id] = true; addXp(5); }
    touchStreak();
  }

  /* ---- flashcard scheduling: Leitner boxes ---------------------------- */
  const BOX_DAYS = [0, 0, 1, 3, 7, 16];   // index = box number

  function cardState(id) {
    return s.cards[id] || { box: 1, due: 0 };
  }
  function gradeCard(id, good) {
    const c = cardState(id);
    c.box = good ? Math.min(5, c.box + 1) : 1;
    c.due = Date.now() + BOX_DAYS[c.box] * 864e5;
    s.cards[id] = c;
    if (good) addXp(2);
    save();
  }
  function dueCount(cards) {
    const now = Date.now();
    return cards.filter(c => cardState(c.id).due <= now).length;
  }

  function reset() {
    s = fresh();
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  return {
    get state() { return s; },
    save, mastery, topicMastery, overall, recordQuiz, setConf, markRead,
    cardState, gradeCard, dueCount, addXp, touchStreak, reset, todayKey
  };
})();
