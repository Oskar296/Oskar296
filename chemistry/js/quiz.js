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

  /* Deterministic generator, so the daily challenge is the same set for
     everyone on a given day and cannot be rerolled by reloading. */
  function seeded(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleWith(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pickSeeded(pool, n, seed) {
    return shuffleWith(pool, seeded(seed)).slice(0, Math.min(n, pool.length));
  }

  /* A spread across the whole syllabus, weighted by how many questions each
     topic has but with a floor so no topic is missed out. */
  function pickMixed(n) {
    var byTopic = {}, total = 0;
    window.SYLLABUS.forEach(function (t) {
      byTopic[t.n] = window.Store.poolForTopic(t.n);
      total += byTopic[t.n].length;
    });
    var floor = Math.max(1, Math.floor(n / (window.SYLLABUS.length * 2)));
    var out = [], spare = n;
    window.SYLLABUS.forEach(function (t) {
      var want = Math.max(floor, Math.round(n * byTopic[t.n].length / total));
      want = Math.min(want, byTopic[t.n].length, spare);
      out = out.concat(shuffle(byTopic[t.n]).slice(0, want));
      spare -= want;
    });
    /* top up from anything left over if rounding came up short */
    if (out.length < n) {
      var used = {};
      out.forEach(function (q) { used[q.id] = 1; });
      var rest = shuffle(window.QUESTIONS.filter(function (q) {
        return window.Store.allowed(q) && !used[q.id];
      }));
      out = out.concat(rest.slice(0, n - out.length));
    }
    return shuffle(out).slice(0, n);
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
    if (q.ty === "balance") {
      var want = eqCoefficients(q);
      if (!Array.isArray(resp) || resp.length !== want.length) return false;
      return want.every(function (c, i) { return parseInt(resp[i], 10) === c; });
    }
    if (q.ty === "order") {
      if (!Array.isArray(resp) || resp.length !== q.a.length) return false;
      return q.a.every(function (v, i) { return resp[i] === v; });
    }
    if (q.ty === "match") {
      if (!Array.isArray(resp) || resp.length !== q.pairs.length) return false;
      return q.pairs.every(function (p, i) { return resp[i] === p[1]; });
    }
    return false;
  }

  function eqCoefficients(q) {
    return q.eq.lhs.concat(q.eq.rhs).map(function (s) { return s[1]; });
  }

  /* "2H2 + O2 gives 2H2O", with a coefficient of 1 left off as normal. */
  function equationText(q) {
    function side(list) {
      return list.map(function (s) {
        return (s[1] === 1 ? "" : s[1]) + s[0];
      }).join(" + ");
    }
    return side(q.eq.lhs) + " gives " + side(q.eq.rhs);
  }

  function answerText(q) {
    if (q.ty === "mcq") return q.o[q.a];
    if (q.ty === "multi") return q.a.map(function (i) { return q.o[i]; }).join("  |  ");
    if (q.ty === "num") return String(q.a);
    if (q.ty === "text") return q.disp || q.a[0];
    if (q.ty === "balance") return equationText(q);
    if (q.ty === "order") return q.a.join("  ›  ");
    if (q.ty === "match") {
      return q.pairs.map(function (p) { return p[0] + " = " + p[1]; }).join("   |   ");
    }
    return "";
  }

  /* Base value, doubled at best by a long run of correct answers.
     The harder question formats are worth more. */
  var TYPE_BONUS = { mcq: 0, multi: 2, num: 2, text: 2, order: 4, match: 4, balance: 4 };

  function xpFor(q, combo, mode) {
    var base = (q.lv === "S" ? 14 : 10) + (TYPE_BONUS[q.ty] || 0);
    var mult = 1 + Math.min(combo, 10) * 0.1;
    if (mode === "boss") mult *= 1.5;
    else if (mode === "survival") mult *= 1.4;
    else if (mode === "review") mult *= 1.2;
    else if (mode === "daily") mult *= 1.3;
    return Math.round(base * mult);
  }

  window.Quiz = {
    pick: pick,
    pickSeeded: pickSeeded,
    pickMixed: pickMixed,
    seeded: seeded,
    shuffleWith: shuffleWith,
    shuffle: shuffle,
    check: check,
    answerText: answerText,
    equationText: equationText,
    eqCoefficients: eqCoefficients,
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
