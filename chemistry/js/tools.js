/* Calculators for the lab bench: formula parsing, Mr, percentage
   composition and the mole relationships. */

(function () {

  /* symbol -> Ar, skipping the elements with no listed value */
  var AR = (function () {
    var map = {};
    window.ELEMENTS.forEach(function (e, i) {
      map[e[0]] = { ar: e[2] === "-" ? null : parseFloat(e[2]), name: e[1], z: i + 1 };
    });
    return map;
  })();

  function add(target, sym, n) {
    target[sym] = (target[sym] || 0) + n;
  }
  function merge(target, source, mult) {
    Object.keys(source).forEach(function (k) { add(target, k, source[k] * mult); });
  }

  /* Walks a formula such as Ca(NO3)2 or Al2(SO4)3, bracket depth included. */
  function parseGroup(s) {
    var stack = [{}], i = 0;

    function readNumber() {
      var start = i;
      while (i < s.length && s[i] >= "0" && s[i] <= "9") i++;
      return i > start ? parseInt(s.slice(start, i), 10) : 1;
    }

    while (i < s.length) {
      var c = s[i];
      if (c === "(" || c === "[") { stack.push({}); i++; }
      else if (c === ")" || c === "]") {
        if (stack.length < 2) throw new Error("There is a closing bracket with nothing to close.");
        var grp = stack.pop();
        i++;
        merge(stack[stack.length - 1], grp, readNumber());
      }
      else if (c >= "A" && c <= "Z") {
        var sym = c;
        i++;
        while (i < s.length && s[i] >= "a" && s[i] <= "z") { sym += s[i]; i++; }
        if (!AR[sym]) throw new Error("There is no element with the symbol " + sym + ".");
        if (AR[sym].ar === null) throw new Error(AR[sym].name + " has no relative atomic mass in the data sheet.");
        add(stack[stack.length - 1], sym, readNumber());
      }
      else if (c === " ") i++;
      else throw new Error("The character " + c + " does not belong in a formula.");
    }
    if (stack.length !== 1) throw new Error("A bracket has been left open.");
    return stack[0];
  }

  /* Handles hydrates written with a dot, such as CuSO4.5H2O */
  function parseFormula(text) {
    var input = String(text || "").trim();
    if (!input) return { error: "Type a formula first." };
    try {
      var totals = {};
      input.split(/[.·]/).forEach(function (part) {
        part = part.trim();
        if (!part) throw new Error("There is an empty section around a dot.");
        var mult = 1;
        var lead = part.match(/^(\d+)/);
        if (lead) { mult = parseInt(lead[1], 10); part = part.slice(lead[1].length); }
        merge(totals, parseGroup(part), mult);
      });

      var mr = 0;
      Object.keys(totals).forEach(function (sym) { mr += AR[sym].ar * totals[sym]; });
      if (!mr) return { error: "That formula contains no atoms." };

      var parts = Object.keys(totals).map(function (sym) {
        var mass = AR[sym].ar * totals[sym];
        return {
          sym: sym, name: AR[sym].name, count: totals[sym],
          ar: AR[sym].ar, mass: mass, pct: (mass / mr) * 100
        };
      }).sort(function (a, b) { return b.mass - a.mass; });

      var atoms = Object.keys(totals).reduce(function (t, k) { return t + totals[k]; }, 0);
      return { formula: input, mr: mr, atoms: atoms, parts: parts };
    } catch (e) {
      return { error: e.message };
    }
  }

  /* Round for display without printing a trailing .00 on whole numbers. */
  function tidy(n, dp) {
    if (n === null || n === undefined || isNaN(n)) return "";
    var r = Number(n.toFixed(dp === undefined ? 3 : dp));
    return String(r);
  }

  /* Fill in whichever field was left blank. Returns { field, value } or an error. */
  function solveMoles(mass, mr, moles) {
    var have = [mass, mr, moles].filter(function (v) { return v !== null; }).length;
    if (have < 2) return { error: "Fill in any two boxes and the third is calculated." };
    if (moles === null) {
      if (!mr) return { error: "The molar mass cannot be zero." };
      return { field: "moles", value: mass / mr };
    }
    if (mass === null) return { field: "mass", value: moles * mr };
    if (!moles) return { error: "The amount in moles cannot be zero here." };
    return { field: "mr", value: mass / moles };
  }

  function solveConc(moles, volumeCm3, conc) {
    var have = [moles, volumeCm3, conc].filter(function (v) { return v !== null; }).length;
    if (have < 2) return { error: "Fill in any two boxes and the third is calculated." };
    var dm3 = volumeCm3 === null ? null : volumeCm3 / 1000;
    if (conc === null) {
      if (!dm3) return { error: "The volume cannot be zero." };
      return { field: "conc", value: moles / dm3 };
    }
    if (moles === null) return { field: "moles", value: conc * dm3 };
    if (!conc) return { error: "The concentration cannot be zero here." };
    return { field: "vol", value: (moles / conc) * 1000 };
  }

  function solveGas(moles, volumeDm3) {
    if (moles === null && volumeDm3 === null) return { error: "Enter either an amount or a volume." };
    if (volumeDm3 === null) return { field: "vol", value: moles * 24 };
    return { field: "moles", value: volumeDm3 / 24 };
  }

  window.Tools = {
    parseFormula: parseFormula,
    solveMoles: solveMoles,
    solveConc: solveConc,
    solveGas: solveGas,
    tidy: tidy,
    ar: function (sym) { return AR[sym] ? AR[sym].ar : null; }
  };
})();
