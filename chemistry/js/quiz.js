/* Question selection, answer marking and XP rules. */

(function () {

  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  /* Prefer questions that are due for review, then ones never seen,
     then the weakest of the rest. */
  function pick(pool, n) {
    var srs = window.Store.state.srs;
    var t = window.Store.today();
    var due = [], fresh = [], rest = [];
    pool.forEach(function (q) {
      var r = srs[q.id];
      if (!r || r.box === 0) fresh.push(q);
      else if (r.due <= t) due.push(q);
      else rest.push(q);
    });
    rest.sort(function (a, b) { return (srs[a.id].box || 0) - (srs[b.id].box || 0); });
    var out = shuffle(due).concat(shuffle(fresh), rest);
    return out.slice(0, Math.min(n, out.length));
  }

  function norm(s) {
    return String(s).toLowerCase().replace(/\s+/g, " ").trim();
  }
  function tight(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  function check(q, resp) {
    if (resp === null || resp === undefined || resp === "") return false;
    if (q.ty === "mcq") return resp === q.a;
    if (q.ty === "multi") {
      if (!Array.isArray(resp) || resp.length !== q.a.length) return false;
      var sorted = resp.slice().sort();
      var want = q.a.slice().sort();
      return sorted.every(function (v, i) { return v === want[i]; });
    }
    if (q.ty === "num") {
      var v = parseFloat(String(resp).replace(/[^0-9eE+.\-]/g, ""));
      if (isNaN(v)) return false;
      return Math.abs(v - q.a) <= (q.tol || 0) + 1e-9;
    }
    if (q.ty === "text") {
      var n = norm(resp), tg = tight(resp);
      return q.a.some(function (acc) { return norm(acc) === n || tight(acc) === tg; });
    }
    return false;
  }

  function answerText(q) {
    if (q.ty === "mcq") return q.o[q.a];
    if (q.ty === "multi") return q.a.map(function (i) { return q.o[i]; }).join("  |  ");
    if (q.ty === "num") return String(q.a);
    if (q.ty === "text") return q.disp || q.a[0];
    return "";
  }

  /* Base value, doubled at best by a long run of correct answers. */
  function xpFor(q, combo, mode) {
    var base = q.lv === "S" ? 14 : 10;
    var mult = 1 + Math.min(combo, 10) * 0.1;
    if (mode === "boss") mult *= 1.5;
    else if (mode === "review") mult *= 1.2;
    return Math.round(base * mult);
  }

  window.Quiz = {
    pick: pick,
    shuffle: shuffle,
    check: check,
    answerText: answerText,
    xpFor: xpFor
  };
})();

/* Small WebAudio beeps. Silent if the browser blocks audio. */
(function () {
  var ctx = null;

  function ac() {
    if (!ctx) {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ctx = new C();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, dur, type, vol, delay) {
    var c = ac();
    if (!c) return;
    var o = c.createOscillator(), g = c.createGain();
    var t0 = c.currentTime + (delay || 0);
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.12, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }

  var sounds = {
    right: function () { tone(660, 0.1, "triangle", 0.1); tone(990, 0.16, "triangle", 0.09, 0.07); },
    wrong: function () { tone(200, 0.22, "sawtooth", 0.07); },
    level: function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.18, "triangle", 0.1, i * 0.08); }); },
    badge: function () { [784, 1047, 1319].forEach(function (f, i) { tone(f, 0.2, "sine", 0.1, i * 0.09); }); },
    click: function () { tone(420, 0.05, "square", 0.04); },
    fail: function () { [330, 262, 196].forEach(function (f, i) { tone(f, 0.22, "sawtooth", 0.07, i * 0.11); }); },
    win: function () { [523, 659, 784, 1047, 1319].forEach(function (f, i) { tone(f, 0.24, "triangle", 0.1, i * 0.1); }); }
  };

  window.Sfx = {
    play: function (name) {
      if (!window.Store.state.settings.sound) return;
      try { if (sounds[name]) sounds[name](); } catch (e) { /* audio unavailable */ }
    }
  };
})();
