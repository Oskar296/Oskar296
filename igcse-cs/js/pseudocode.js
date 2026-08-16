/* A small interpreter for Cambridge IGCSE pseudocode.

   Paper 2 requires solutions in pseudocode, so students need somewhere to run it.
   Supports: DECLARE / CONSTANT, assignment, INPUT / OUTPUT, IF / CASE,
   FOR / WHILE / REPEAT, 1D and 2D arrays, PROCEDURE / FUNCTION, and the
   library routines named in the syllabus.

   Errors carry a line number and say what to do about it, because a runner that
   only says "syntax error" teaches nothing.
*/

const Pseudo = (function () {

  const KEYWORDS = new Set([
    "DECLARE", "CONSTANT", "INPUT", "OUTPUT", "PRINT", "IF", "THEN", "ELSE", "ENDIF",
    "CASE", "OF", "OTHERWISE", "ENDCASE", "FOR", "TO", "STEP", "NEXT", "WHILE", "DO",
    "ENDWHILE", "REPEAT", "UNTIL", "PROCEDURE", "ENDPROCEDURE", "CALL", "FUNCTION",
    "RETURNS", "RETURN", "ENDFUNCTION", "ARRAY", "AND", "OR", "NOT", "MOD", "DIV",
    "TRUE", "FALSE", "INTEGER", "REAL", "CHAR", "STRING", "BOOLEAN"
  ]);

  const TYPES = new Set(["INTEGER", "REAL", "CHAR", "STRING", "BOOLEAN"]);

  class PseudoError extends Error {
    constructor(msg, line) { super(msg); this.line = line; }
  }
  const err = (msg, line) => { throw new PseudoError(msg, line); };

  /* ---------------------------------------------------------------- */
  /* tokenizer                                                         */
  /* ---------------------------------------------------------------- */
  function tokenize(src) {
    const out = [];
    let i = 0, line = 1;
    const push = (type, value) => out.push({ type, value, line });

    while (i < src.length) {
      const c = src[i];

      if (c === "\n") { push("nl"); line++; i++; continue; }
      if (c === " " || c === "\t" || c === "\r") { i++; continue; }

      // comments
      if (c === "/" && src[i + 1] === "/") { while (i < src.length && src[i] !== "\n") i++; continue; }

      // assignment arrow, written either way
      if (c === "←") { push("op", "<-"); i++; continue; }
      if (c === "<" && src[i + 1] === "-") { push("op", "<-"); i += 2; continue; }

      // strings and chars
      if (c === '"' || c === "'") {
        const quote = c; let s = ""; i++;
        while (i < src.length && src[i] !== quote) {
          if (src[i] === "\n") err("A text value is missing its closing " + quote, line);
          s += src[i++];
        }
        if (i >= src.length) err("A text value is missing its closing " + quote, line);
        i++;
        push("str", s);
        continue;
      }

      // numbers
      if (/[0-9]/.test(c)) {
        let s = "";
        while (i < src.length && /[0-9.]/.test(src[i])) s += src[i++];
        if ((s.match(/\./g) || []).length > 1) err('"' + s + '" is not a valid number', line);
        push("num", parseFloat(s));
        continue;
      }

      // identifiers and keywords
      if (/[A-Za-z_]/.test(c)) {
        let s = "";
        while (i < src.length && /[A-Za-z0-9_]/.test(src[i])) s += src[i++];
        const up = s.toUpperCase();
        if (KEYWORDS.has(up)) push("kw", up); else push("id", s);
        continue;
      }

      // multi-character operators
      const two = src.substr(i, 2);
      if (two === "<=" || two === ">=" || two === "<>") { push("op", two); i += 2; continue; }

      if ("+-*/^=<>(),[]:&".includes(c)) { push("op", c); i++; continue; }

      err('The character "' + c + '" does not mean anything in pseudocode', line);
    }
    push("eof");
    return out;
  }

  /* ---------------------------------------------------------------- */
  /* parser                                                            */
  /* ---------------------------------------------------------------- */
  function parse(tokens) {
    let p = 0;
    const peek = () => tokens[p];
    const at = (type, value) => tokens[p].type === type && (value === undefined || tokens[p].value === value);
    const atKw = k => at("kw", k);
    const next = () => tokens[p++];
    const line = () => tokens[p].line;

    function expect(type, value, what) {
      if (!at(type, value)) {
        err("Expected " + (what || value) + " but found " + describe(tokens[p]), tokens[p].line);
      }
      return next();
    }
    function describe(t) {
      if (t.type === "eof") return "the end of the program";
      if (t.type === "nl") return "the end of the line";
      return '"' + t.value + '"';
    }
    const skipNl = () => { while (at("nl")) next(); };
    function endOfStatement() {
      if (at("nl") || at("eof")) { skipNl(); return; }
      err("Unexpected " + describe(tokens[p]) + " at the end of the statement", tokens[p].line);
    }

    /* ---- expressions ---- */
    function expression() { return orExpr(); }

    function orExpr() {
      let l = andExpr();
      while (atKw("OR")) { const ln = line(); next(); l = { k: "bin", op: "OR", l, r: andExpr(), line: ln }; }
      return l;
    }
    function andExpr() {
      let l = notExpr();
      while (atKw("AND")) { const ln = line(); next(); l = { k: "bin", op: "AND", l, r: notExpr(), line: ln }; }
      return l;
    }
    function notExpr() {
      if (atKw("NOT")) { const ln = line(); next(); return { k: "not", e: notExpr(), line: ln }; }
      return compare();
    }
    function compare() {
      let l = addSub();
      while (at("op", "=") || at("op", "<>") || at("op", "<") || at("op", "<=") || at("op", ">") || at("op", ">=")) {
        const ln = line(), op = next().value;
        l = { k: "bin", op, l, r: addSub(), line: ln };
      }
      return l;
    }
    function addSub() {
      let l = mulDiv();
      while (at("op", "+") || at("op", "-") || at("op", "&")) {
        const ln = line(), op = next().value;
        l = { k: "bin", op, l, r: mulDiv(), line: ln };
      }
      return l;
    }
    function mulDiv() {
      let l = power();
      while (at("op", "*") || at("op", "/") || atKw("MOD") || atKw("DIV")) {
        const ln = line(), op = next().value;
        l = { k: "bin", op, l, r: power(), line: ln };
      }
      return l;
    }
    function power() {
      const l = unary();
      if (at("op", "^")) { const ln = line(); next(); return { k: "bin", op: "^", l, r: power(), line: ln }; }
      return l;
    }
    function unary() {
      if (at("op", "-")) { const ln = line(); next(); return { k: "neg", e: unary(), line: ln }; }
      return primary();
    }
    function primary() {
      const t = peek(), ln = t.line;
      if (t.type === "num") { next(); return { k: "num", v: t.value, line: ln }; }
      if (t.type === "str") { next(); return { k: "str", v: t.value, line: ln }; }
      if (atKw("TRUE")) { next(); return { k: "bool", v: true, line: ln }; }
      if (atKw("FALSE")) { next(); return { k: "bool", v: false, line: ln }; }
      if (at("op", "(")) { next(); const e = expression(); expect("op", ")", "a closing bracket )"); return e; }
      if (t.type === "id") {
        next();
        if (at("op", "(")) {                                  // function call
          next();
          const args = [];
          if (!at("op", ")")) { do { args.push(expression()); } while (at("op", ",") && next()); }
          expect("op", ")", "a closing bracket )");
          return { k: "call", name: t.value, args, line: ln };
        }
        if (at("op", "[")) {                                  // array element
          next();
          const idx = [expression()];
          while (at("op", ",")) { next(); idx.push(expression()); }
          expect("op", "]", "a closing bracket ]");
          return { k: "index", name: t.value, idx, line: ln };
        }
        return { k: "var", name: t.value, line: ln };
      }
      err("Expected a value but found " + describe(t), ln);
    }

    /* ---- statements ---- */
    function block(stops) {
      const list = [];
      for (;;) {
        skipNl();
        if (at("eof")) break;
        if (peek().type === "kw" && stops.includes(peek().value)) break;
        list.push(statement());
      }
      return list;
    }

    function statement() {
      const t = peek(), ln = t.line;

      if (atKw("DECLARE")) {
        next();
        const name = expect("id", undefined, "a variable name").value;
        expect("op", ":", "a colon");
        if (atKw("ARRAY")) {
          next();
          expect("op", "[", "a square bracket [");
          const bounds = [];
          do {
            const lo = expression();
            expect("op", ":", "a colon between the bounds, as in [1:10]");
            bounds.push({ lo, hi: expression() });
          } while (at("op", ",") && next());
          expect("op", "]", "a closing bracket ]");
          expect("kw", "OF", "the word OF");
          const type = next().value;
          endOfStatement();
          return { k: "declareArray", name, bounds, type, line: ln };
        }
        const type = next().value;
        if (!TYPES.has(String(type))) err('"' + type + '" is not a data type. Use INTEGER, REAL, CHAR, STRING or BOOLEAN', ln);
        endOfStatement();
        return { k: "declare", name, type, line: ln };
      }

      if (atKw("CONSTANT")) {
        next();
        const name = expect("id", undefined, "a name").value;
        if (at("op", "=")) next(); else if (at("op", "<-")) next(); else err("Expected = after the constant name", ln);
        const value = expression();
        endOfStatement();
        return { k: "constant", name, value, line: ln };
      }

      if (atKw("INPUT")) {
        next();
        const target = lvalue();
        endOfStatement();
        return { k: "input", target, line: ln };
      }

      if (atKw("OUTPUT") || atKw("PRINT")) {
        next();
        const parts = [expression()];
        while (at("op", ",")) { next(); parts.push(expression()); }
        endOfStatement();
        return { k: "output", parts, line: ln };
      }

      if (atKw("IF")) {
        next();
        const cond = expression();
        skipNl();
        expect("kw", "THEN", "the word THEN");
        const then = block(["ELSE", "ENDIF"]);
        let other = null;
        if (atKw("ELSE")) { next(); other = block(["ENDIF"]); }
        expect("kw", "ENDIF", "the word ENDIF");
        endOfStatement();
        return { k: "if", cond, then, other, line: ln };
      }

      if (atKw("CASE")) {
        next();
        expect("kw", "OF", "the word OF");
        const subject = expression();
        skipNl();
        const arms = [];
        let otherwise = null;
        for (;;) {
          skipNl();
          if (atKw("ENDCASE") || at("eof")) break;
          if (atKw("OTHERWISE")) {
            next();
            if (at("op", ":")) next();
            otherwise = [statement()];
            continue;
          }
          const match = expression();
          expect("op", ":", "a colon after the case value");
          arms.push({ match, body: [statement()] });
        }
        expect("kw", "ENDCASE", "the word ENDCASE");
        endOfStatement();
        return { k: "case", subject, arms, otherwise, line: ln };
      }

      if (atKw("FOR")) {
        next();
        const name = expect("id", undefined, "the counter name").value;
        if (at("op", "<-")) next(); else if (at("op", "=")) next(); else err("Expected an assignment arrow after the counter", ln);
        const from = expression();
        expect("kw", "TO", "the word TO");
        const to = expression();
        let step = null;
        if (atKw("STEP")) { next(); step = expression(); }
        const body = block(["NEXT"]);
        expect("kw", "NEXT", "the word NEXT");
        if (peek().type === "id") next();                      // NEXT i, counter name optional
        endOfStatement();
        return { k: "for", name, from, to, step, body, line: ln };
      }

      if (atKw("WHILE")) {
        next();
        const cond = expression();
        if (atKw("DO")) next();
        const body = block(["ENDWHILE"]);
        expect("kw", "ENDWHILE", "the word ENDWHILE");
        endOfStatement();
        return { k: "while", cond, body, line: ln };
      }

      if (atKw("REPEAT")) {
        next();
        const body = block(["UNTIL"]);
        expect("kw", "UNTIL", "the word UNTIL");
        const cond = expression();
        endOfStatement();
        return { k: "repeat", cond, body, line: ln };
      }

      if (atKw("PROCEDURE") || atKw("FUNCTION")) {
        const isFn = peek().value === "FUNCTION";
        next();
        const name = expect("id", undefined, "a name").value;
        const params = [];
        if (at("op", "(")) {
          next();
          if (!at("op", ")")) {
            do {
              const pn = expect("id", undefined, "a parameter name").value;
              if (at("op", ":")) { next(); next(); }           // type is optional here
              params.push(pn);
            } while (at("op", ",") && next());
          }
          expect("op", ")", "a closing bracket )");
        }
        if (atKw("RETURNS")) { next(); next(); }
        const body = block([isFn ? "ENDFUNCTION" : "ENDPROCEDURE"]);
        expect("kw", isFn ? "ENDFUNCTION" : "ENDPROCEDURE", "the word END" + (isFn ? "FUNCTION" : "PROCEDURE"));
        endOfStatement();
        return { k: "subroutine", isFn, name, params, body, line: ln };
      }

      if (atKw("RETURN")) {
        next();
        const value = (at("nl") || at("eof")) ? null : expression();
        endOfStatement();
        return { k: "return", value, line: ln };
      }

      if (atKw("CALL")) {
        next();
        const name = expect("id", undefined, "a procedure name").value;
        const args = [];
        if (at("op", "(")) {
          next();
          if (!at("op", ")")) { do { args.push(expression()); } while (at("op", ",") && next()); }
          expect("op", ")", "a closing bracket )");
        }
        endOfStatement();
        return { k: "call", name, args, line: ln };
      }

      if (t.type === "id") {
        const target = lvalue();
        if (at("op", "<-") || at("op", "=")) {
          next();
          const value = expression();
          endOfStatement();
          return { k: "assign", target, value, line: ln };
        }
        if (at("op", "(")) {                                   // bare procedure call
          next();
          const args = [];
          if (!at("op", ")")) { do { args.push(expression()); } while (at("op", ",") && next()); }
          expect("op", ")", "a closing bracket )");
          endOfStatement();
          return { k: "call", name: target.name, args, line: ln };
        }
        err("Expected an assignment arrow after " + target.name + ". Write " + target.name + " ← value", ln);
      }

      err("A statement cannot start with " + describe(t), ln);
    }

    function lvalue() {
      const t = expect("id", undefined, "a variable name");
      if (at("op", "[")) {
        next();
        const idx = [expression()];
        while (at("op", ",")) { next(); idx.push(expression()); }
        expect("op", "]", "a closing bracket ]");
        return { k: "index", name: t.value, idx, line: t.line };
      }
      return { k: "var", name: t.value, line: t.line };
    }

    const program = block([]);
    return program;
  }

  /* ---------------------------------------------------------------- */
  /* interpreter                                                       */
  /* ---------------------------------------------------------------- */
  const RETURN = Symbol("return");

  function run(src, inputLines, opts) {
    opts = opts || {};
    const output = [];
    const inputs = (inputLines || []).slice();
    const subs = Object.create(null);
    const globals = new Map();
    const consts = new Set();
    let steps = 0;
    const LIMIT = opts.stepLimit || 2000000;
    const LOOP_LIMIT = 50000;   // a teaching program never legitimately spins this long

    const ast = parse(tokenize(src));
    ast.forEach(s => { if (s.k === "subroutine") subs[s.name.toLowerCase()] = s; });

    const fmt = v => {
      if (v === null || v === undefined) return "";
      if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
      if (typeof v === "number") return Number.isInteger(v) ? String(v) : String(Math.round(v * 1e10) / 1e10);
      return String(v);
    };

    function scopeGet(scope, name, line) {
      const key = name.toLowerCase();
      if (scope.has(key)) return scope.get(key);
      if (globals.has(key)) return globals.get(key);
      err('The variable "' + name + '" has not been given a value yet. Declare it or assign to it first.', line);
    }
    function scopeSet(scope, name, value, line) {
      const key = name.toLowerCase();
      if (consts.has(key)) err('"' + name + '" is a constant, so its value cannot be changed', line);
      if (scope.has(key) || scope === globals) scope.set(key, value);
      else if (globals.has(key)) globals.set(key, value);
      else scope.set(key, value);
    }

    function makeArray(node, scope) {
      const dims = node.bounds.map(b => ({ lo: Math.trunc(evalExpr(b.lo, scope)), hi: Math.trunc(evalExpr(b.hi, scope)) }));
      dims.forEach(d => { if (d.hi < d.lo) err("An array cannot have an upper bound below its lower bound", node.line); });
      return { array: true, dims, data: new Map(), type: node.type };
    }
    function arrayKey(arr, idx, line, name) {
      if (idx.length !== arr.dims.length) {
        err('"' + name + '" is a ' + arr.dims.length + "-dimensional array, so it needs " + arr.dims.length + " index value" + (arr.dims.length > 1 ? "s" : ""), line);
      }
      return idx.map((v, i) => {
        const n = Math.trunc(v);
        const d = arr.dims[i];
        if (n < d.lo || n > d.hi) {
          err("Index " + n + " is outside the array " + name + ", which runs from " + d.lo + " to " + d.hi, line);
        }
        return n;
      }).join(",");
    }

    const BUILTINS = {
      length: (a, line) => String(a[0] === undefined ? err("LENGTH needs a value", line) : a[0]).length,
      substring: (a, line) => {
        const s = String(a[0]), start = Math.trunc(a[1]), len = Math.trunc(a[2]);
        if (start < 1 || start > s.length) err("SUBSTRING was asked to start at position " + start + ", but the text is " + s.length + " characters long", line);
        return s.substr(start - 1, len);
      },
      ucase: a => String(a[0]).toUpperCase(),
      lcase: a => String(a[0]).toLowerCase(),
      round: a => { const p = Math.pow(10, Math.trunc(a[1] || 0)); return Math.round(a[0] * p) / p; },
      random: a => a.length ? Math.random() * a[0] : Math.random(),
      int: a => Math.trunc(a[0]),
      div: a => Math.trunc(a[0] / a[1]),
      mod: a => a[0] % a[1],
      num_to_string: a => String(a[0]),
      string_to_num: a => parseFloat(a[0])
    };

    function evalExpr(n, scope) {
      if (++steps > LIMIT) err("The program ran for too long. Check that every loop can actually finish.", n.line);
      switch (n.k) {
        case "num": case "str": case "bool": return n.v;
        case "var": {
          const v = scopeGet(scope, n.name, n.line);
          if (v && v.array) return v;
          return v;
        }
        case "neg": return -toNum(evalExpr(n.e, scope), n.line);
        case "not": return !truthy(evalExpr(n.e, scope), n.line);
        case "index": {
          const arr = scopeGet(scope, n.name, n.line);
          if (!arr || !arr.array) err('"' + n.name + '" is not an array', n.line);
          const key = arrayKey(arr, n.idx.map(e => evalExpr(e, scope)), n.line, n.name);
          if (!arr.data.has(key)) err("Nothing has been stored in " + n.name + "[" + key + "] yet", n.line);
          return arr.data.get(key);
        }
        case "call": {
          const key = n.name.toLowerCase();
          const args = n.args.map(a => evalExpr(a, scope));
          if (BUILTINS[key]) return BUILTINS[key](args, n.line);
          const sub = subs[key];
          if (!sub) err('There is no function called "' + n.name + '"', n.line);
          return callSub(sub, args, n.line);
        }
        case "bin": {
          const op = n.op;
          if (op === "AND") return truthy(evalExpr(n.l, scope), n.line) && truthy(evalExpr(n.r, scope), n.line);
          if (op === "OR") return truthy(evalExpr(n.l, scope), n.line) || truthy(evalExpr(n.r, scope), n.line);
          const a = evalExpr(n.l, scope), b = evalExpr(n.r, scope);
          switch (op) {
            case "+":
              if (typeof a === "string" || typeof b === "string") return String(fmt(a)) + String(fmt(b));
              return toNum(a, n.line) + toNum(b, n.line);
            case "&": return String(fmt(a)) + String(fmt(b));
            case "-": return toNum(a, n.line) - toNum(b, n.line);
            case "*": return toNum(a, n.line) * toNum(b, n.line);
            case "/":
              if (toNum(b, n.line) === 0) err("This divides by zero, which a computer cannot do", n.line);
              return toNum(a, n.line) / toNum(b, n.line);
            case "^": return Math.pow(toNum(a, n.line), toNum(b, n.line));
            case "MOD":
              if (toNum(b, n.line) === 0) err("MOD cannot be used with zero", n.line);
              return toNum(a, n.line) % toNum(b, n.line);
            case "DIV":
              if (toNum(b, n.line) === 0) err("DIV cannot be used with zero", n.line);
              return Math.trunc(toNum(a, n.line) / toNum(b, n.line));
            case "=": return eq(a, b);
            case "<>": return !eq(a, b);
            case "<": return cmp(a, b, n.line) < 0;
            case "<=": return cmp(a, b, n.line) <= 0;
            case ">": return cmp(a, b, n.line) > 0;
            case ">=": return cmp(a, b, n.line) >= 0;
          }
        }
      }
      err("Cannot work out that expression", n.line);
    }

    const eq = (a, b) => (typeof a === "string" || typeof b === "string") ? String(a) === String(b) : a === b;
    const cmp = (a, b, line) => {
      if (typeof a === "string" || typeof b === "string") return String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0;
      return toNum(a, line) - toNum(b, line);
    };
    function toNum(v, line) {
      if (typeof v === "number") return v;
      if (typeof v === "boolean") return v ? 1 : 0;
      const n = parseFloat(v);
      if (isNaN(n)) err('"' + v + '" is text, so it cannot be used in a calculation', line);
      return n;
    }
    function truthy(v, line) {
      if (typeof v === "boolean") return v;
      err("A condition has to be TRUE or FALSE, but this one gave " + fmt(v), line);
    }

    function callSub(sub, args, line) {
      if (args.length !== sub.params.length) {
        err(sub.name + " expects " + sub.params.length + " value" + (sub.params.length === 1 ? "" : "s") +
            " but was given " + args.length, line);
      }
      const local = new Map();
      sub.params.forEach((p, i) => local.set(p.toLowerCase(), args[i]));
      const r = execBlock(sub.body, local);
      if (r && r.type === RETURN) return r.value;
      if (sub.isFn) err(sub.name + " is a function, so it must RETURN a value", line);
      return null;
    }

    function execBlock(list, scope) {
      for (const st of list) {
        const r = exec(st, scope);
        if (r && r.type === RETURN) return r;
      }
      return null;
    }

    function exec(n, scope) {
      if (++steps > LIMIT) err("The program ran for too long. Check that every loop can actually finish.", n.line);
      switch (n.k) {
        case "subroutine": return null;                        // collected before the run

        case "declare":
          scope.set(n.name.toLowerCase(), n.type === "STRING" ? "" : n.type === "BOOLEAN" ? false : 0);
          return null;

        case "declareArray":
          scope.set(n.name.toLowerCase(), makeArray(n, scope));
          return null;

        case "constant": {
          const v = evalExpr(n.value, scope);
          globals.set(n.name.toLowerCase(), v);
          consts.add(n.name.toLowerCase());
          return null;
        }

        case "assign": {
          const v = evalExpr(n.value, scope);
          assignTo(n.target, v, scope);
          return null;
        }

        case "input": {
          if (!inputs.length) {
            err("The program asked for input but the input box is empty. Add a line for every INPUT the program reaches.", n.line);
          }
          const raw = inputs.shift();
          const asNum = raw.trim() === "" ? NaN : Number(raw);
          assignTo(n.target, isNaN(asNum) ? raw : asNum, scope);
          return null;
        }

        case "output":
          output.push(n.parts.map(e => fmt(evalExpr(e, scope))).join(""));
          if (output.length > 5000) err("The program produced far too much output. Check your loops.", n.line);
          return null;

        case "if":
          if (truthy(evalExpr(n.cond, scope), n.line)) return execBlock(n.then, scope);
          if (n.other) return execBlock(n.other, scope);
          return null;

        case "case": {
          const v = evalExpr(n.subject, scope);
          for (const arm of n.arms) {
            if (eq(v, evalExpr(arm.match, scope))) return execBlock(arm.body, scope);
          }
          if (n.otherwise) return execBlock(n.otherwise, scope);
          return null;
        }

        case "for": {
          const from = toNum(evalExpr(n.from, scope), n.line);
          const to = toNum(evalExpr(n.to, scope), n.line);
          const step = n.step ? toNum(evalExpr(n.step, scope), n.line) : 1;
          if (step === 0) err("A FOR loop with a STEP of 0 would never finish", n.line);
          let spins = 0;
          for (let i = from; step > 0 ? i <= to : i >= to; i += step) {
            scopeSet(scope, n.name, i, n.line);
            const r = execBlock(n.body, scope);
            if (r && r.type === RETURN) return r;
            if (++spins > LOOP_LIMIT) err("This FOR loop is running far more times than expected. Check its start and end values.", n.line);
          }
          return null;
        }

        case "while": {
          let spins = 0;
          while (truthy(evalExpr(n.cond, scope), n.line)) {
            const r = execBlock(n.body, scope);
            if (r && r.type === RETURN) return r;
            if (++spins > LOOP_LIMIT) err("This WHILE loop never becomes false, so it would run forever. Check that something inside the loop changes the condition.", n.line);
          }
          return null;
        }

        case "repeat": {
          let spins = 0;
          for (;;) {
            const r = execBlock(n.body, scope);
            if (r && r.type === RETURN) return r;
            if (truthy(evalExpr(n.cond, scope), n.line)) break;
            if (++spins > LOOP_LIMIT) err("This REPEAT loop never becomes true, so it would run forever. Check that something inside the loop changes the condition.", n.line);
          }
          return null;
        }

        case "return":
          return { type: RETURN, value: n.value ? evalExpr(n.value, scope) : null };

        case "call": {
          const key = n.name.toLowerCase();
          const args = n.args.map(a => evalExpr(a, scope));
          if (BUILTINS[key]) { BUILTINS[key](args, n.line); return null; }
          const sub = subs[key];
          if (!sub) err('There is no procedure called "' + n.name + '"', n.line);
          callSub(sub, args, n.line);
          return null;
        }
      }
      err("Cannot carry out that statement", n.line);
    }

    function assignTo(target, value, scope) {
      if (target.k === "var") { scopeSet(scope, target.name, value, target.line); return; }
      const arr = scopeGet(scope, target.name, target.line);
      if (!arr || !arr.array) err('"' + target.name + '" is not an array, so it cannot be given an index', target.line);
      const key = arrayKey(arr, target.idx.map(e => evalExpr(e, scope)), target.line, target.name);
      arr.data.set(key, value);
    }

    execBlock(ast.filter(s => s.k !== "subroutine"), globals);

    // final variable values, for the watch panel
    const vars = [];
    globals.forEach((v, k) => {
      if (v && v.array) {
        const items = [];
        v.data.forEach((val, key) => items.push("[" + key + "] = " + fmt(val)));
        vars.push({ name: k, value: items.length ? items.join(", ") : "(empty)", array: true });
      } else {
        vars.push({ name: k, value: fmt(v), array: false });
      }
    });

    return { output, vars, inputsLeft: inputs.length };
  }

  return { run, PseudoError };
})();
