/* Interactive labs. Each tool exposes { title, em, blurb, topic, render(el) }. */

const Tools = (function () {

  /* ------------------------------------------------------------------ */
  /* helpers                                                             */
  /* ------------------------------------------------------------------ */
  const pad = (s, n) => s.padStart(n, "0");
  const toBin = (n, bits) => pad((n >>> 0).toString(2).slice(-bits), bits);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const q = (el, sel) => el.querySelector(sel);
  const qa = (el, sel) => Array.from(el.querySelectorAll(sel));

  /* ================================================================== */
  /* 1. NUMBER CONVERTER                                                 */
  /* ================================================================== */
  const convert = {
    title: "Number converter", em: "\u{1F501}", topic: "1.1",
    blurb: "Type in any base and watch the other two update, with the place value working shown underneath.",
    render(el) {
      el.innerHTML = `
        <div class="grid g3">
          <div class="field"><label>Denary</label><input class="input big" id="cDen" value="154" inputmode="numeric"></div>
          <div class="field"><label>Binary</label><input class="input big" id="cBin" value="10011010" inputmode="numeric"></div>
          <div class="field"><label>Hexadecimal</label><input class="input big" id="cHex" value="9A"></div>
        </div>
        <div id="cErr"></div>
        <h3>Place value working</h3>
        <div class="table-wrap"><table class="mono" id="cTable"></table></div>
        <div id="cSteps"></div>
        <div class="callout tip"><div class="ttl">Try it</div><p>Click any bit in the table to flip it. Watch which place value it adds or removes.</p></div>`;

      const den = q(el, "#cDen"), bin = q(el, "#cBin"), hex = q(el, "#cHex");

      function paint(v) {
        const bits = Math.max(8, Math.ceil((v.toString(2).length) / 4) * 4);
        const b = toBin(v, bits);
        let head = "<tr>", row = "<tr>", sum = [];
        for (let i = 0; i < bits; i++) {
          const pv = Math.pow(2, bits - 1 - i);
          head += "<th>" + pv + "</th>";
          row += '<td><button class="bitflip" data-i="' + i + '" style="all:unset;cursor:pointer;font-size:17px;color:' +
                 (b[i] === "1" ? "var(--accent)" : "var(--ink-3)") + '">' + b[i] + "</button></td>";
          if (b[i] === "1") sum.push(pv);
        }
        q(el, "#cTable").innerHTML = head + "</tr>" + row + "</tr>";
        q(el, "#cSteps").innerHTML = sum.length
          ? '<pre>' + sum.join(" + ") + " = <b>" + v + "</b>\n\nhex nibbles: " +
            b.match(/.{1,4}/g).map(n => n + " = " + parseInt(n, 2).toString(16).toUpperCase()).join("  ,  ") + "</pre>"
          : "<pre>0</pre>";

        qa(el, ".bitflip").forEach(btn => btn.onclick = () => {
          const i = +btn.dataset.i;
          const arr = b.split(""); arr[i] = arr[i] === "1" ? "0" : "1";
          set(parseInt(arr.join(""), 2));
        });
      }

      function set(v, from) {
        v = Math.max(0, Math.min(4294967295, v));
        if (from !== "den") den.value = v;
        if (from !== "bin") bin.value = toBin(v, Math.max(8, Math.ceil(v.toString(2).length / 4) * 4));
        if (from !== "hex") hex.value = v.toString(16).toUpperCase();
        paint(v);
      }

      const bad = (input, on) => input.classList.toggle("err", on);

      den.oninput = () => { const v = parseInt(den.value, 10); bad(den, isNaN(v)); if (!isNaN(v)) set(v, "den"); };
      bin.oninput = () => { const ok = /^[01]+$/.test(bin.value.replace(/\s/g, "")); bad(bin, !ok); if (ok) set(parseInt(bin.value.replace(/\s/g, ""), 2), "bin"); };
      hex.oninput = () => { const ok = /^[0-9a-fA-F]+$/.test(hex.value.trim()); bad(hex, !ok); if (ok) set(parseInt(hex.value, 16), "hex"); };

      set(154);
    }
  };

  /* ================================================================== */
  /* 2. BINARY MATHS LAB                                                 */
  /* ================================================================== */
  const binlab = {
    title: "Binary maths lab", em: "\u{2795}", topic: "1.1",
    blurb: "Addition with carries and overflow, logical shifts, and two's complement built step by step.",
    render(el) {
      el.innerHTML = `
        <div class="seg" id="blTabs" style="margin-bottom:18px">
          <button class="on" data-p="add">Addition</button>
          <button data-p="shift">Logical shift</button>
          <button data-p="twos">Two's complement</button>
        </div>
        <div id="blBody"></div>`;

      const body = q(el, "#blBody");

      const panels = {
        add() {
          body.innerHTML = `
            <div class="grid g2">
              <div class="field"><label>First number (0 to 255)</label><input class="input" id="a1" value="124"></div>
              <div class="field"><label>Second number (0 to 255)</label><input class="input" id="a2" value="22"></div>
            </div>
            <div id="aOut"></div>`;
          const run = () => {
            const x = Math.max(0, Math.min(255, parseInt(q(el, "#a1").value) || 0));
            const y = Math.max(0, Math.min(255, parseInt(q(el, "#a2").value) || 0));
            const bx = toBin(x, 8), by = toBin(y, 8);
            let carry = 0, res = "", carries = "";
            for (let i = 7; i >= 0; i--) {
              const s = (+bx[i]) + (+by[i]) + carry;
              res = (s % 2) + res;
              carries = (s > 1 ? "1" : " ") + carries;
              carry = s > 1 ? 1 : 0;
            }
            const over = carry === 1;
            q(el, "#aOut").innerHTML =
              "<pre>  " + carries + "   <span class='cm'>carries</span>\n  " + bx + "   (" + x + ")\n+ " + by +
              "   (" + y + ")\n  --------\n  " + res + "   (" + parseInt(res, 2) + ")</pre>" +
              (over
                ? '<div class="callout trap"><div class="ttl">Overflow</div><p>' + x + " + " + y + " = " + (x + y) +
                  ", which needs 9 bits. The carry out of the most significant bit has nowhere to go, so it is lost and the stored answer (" +
                  parseInt(res, 2) + ") is wrong. An 8-bit register can only hold 0 to 255.</p></div>"
                : '<div class="callout"><div class="ttl">No overflow</div><p>The result ' + (x + y) + " fits inside 8 bits, so nothing is lost.</p></div>");
          };
          q(el, "#a1").oninput = run; q(el, "#a2").oninput = run; run();
        },

        shift() {
          body.innerHTML = `
            <div class="grid g3">
              <div class="field"><label>Start value (0 to 255)</label><input class="input" id="sVal" value="13"></div>
              <div class="field"><label>Direction</label><select id="sDir"><option value="l">Left</option><option value="r">Right</option></select></div>
              <div class="field"><label>Places</label><select id="sN">${[1,2,3,4].map(n=>"<option>"+n+"</option>").join("")}</select></div>
            </div>
            <div id="sOut"></div>`;
          const run = () => {
            const v = Math.max(0, Math.min(255, parseInt(q(el, "#sVal").value) || 0));
            const dir = q(el, "#sDir").value, n = +q(el, "#sN").value;
            const before = toBin(v, 8);
            let after, lost;
            if (dir === "l") { after = pad((v << n).toString(2), 8).slice(-8); lost = before.slice(0, n); }
            else { after = toBin(v >> n, 8); lost = before.slice(8 - n); }
            const val = parseInt(after, 2);
            const exact = dir === "l" ? v * Math.pow(2, n) : Math.floor(v / Math.pow(2, n));
            const lostBits = /1/.test(lost);
            q(el, "#sOut").innerHTML =
              "<pre>before  " + before + "   (" + v + ")\nshift " + (dir === "l" ? "left " : "right") + " " + n +
              "\nafter   " + after + "   (" + val + ")\n\nbits shifted out: " + lost + "   zeros shifted in: " + "0".repeat(n) + "</pre>" +
              '<div class="callout' + (lostBits ? " trap" : "") + '"><div class="ttl">' +
              (dir === "l" ? "Multiply" : "Divide") + " by " + Math.pow(2, n) + "</div><p>" +
              (lostBits
                ? "A 1 was shifted out, so value has been lost. " + v + (dir === "l" ? " x " : " / ") + Math.pow(2, n) +
                  " should be " + exact + ", but the register now holds " + val + "."
                : "A shift of " + n + " place" + (n > 1 ? "s" : "") + " " + (dir === "l" ? "left multiplies" : "right divides") +
                  " by 2^" + n + " = " + Math.pow(2, n) + ". Here " + v + (dir === "l" ? " x " : " / ") + Math.pow(2, n) + " = " + val + ".") +
              "</p></div>";
          };
          qa(el, "#sVal,#sDir,#sN").forEach(i => { i.oninput = run; i.onchange = run; }); run();
        },

        twos() {
          body.innerHTML = `
            <div class="field"><label>Denary value (-128 to 127)</label><input class="input big" id="tVal" value="-40"></div>
            <div id="tOut"></div>
            <h3>The 8-bit two's complement number line</h3>
            <div class="bitgrid" id="tBits"></div>
            <p style="font-size:13px">Click bits to build a number yourself. The leftmost column counts as <b>-128</b>.</p>
            <div class="readout" id="tLive"></div>`;

          const bitsEl = q(el, "#tBits"), live = q(el, "#tLive");
          let bits = "11011000".split("");

          function weights() { return [-128, 64, 32, 16, 8, 4, 2, 1]; }
          function value() { return bits.reduce((a, b, i) => a + (b === "1" ? weights()[i] : 0), 0); }
          function paintBits() {
            bitsEl.innerHTML = bits.map((b, i) =>
              '<div class="bitcell' + (b === "1" ? " on" : "") + (i === 0 ? " neg" : "") + '" data-i="' + i +
              '"><div class="v">' + b + '</div><span class="w">' + weights()[i] + "</span></div>").join("");
            qa(el, ".bitcell").forEach(c => c.onclick = () => {
              const i = +c.dataset.i; bits[i] = bits[i] === "1" ? "0" : "1"; paintBits();
            });
            const sum = bits.map((b, i) => b === "1" ? weights()[i] : null).filter(x => x !== null);
            live.innerHTML = '<span class="lbl">value</span>' + (sum.length ? sum.join(" + ").replace(/\+ -/g, "- ") : "0") +
              " = <b>" + value() + "</b>";
          }

          const run = () => {
            let v = parseInt(q(el, "#tVal").value);
            if (isNaN(v)) return;
            v = Math.max(-128, Math.min(127, v));
            let out;
            if (v >= 0) {
              out = "<pre>" + v + " is positive, so write it in binary directly:\n\n  " + toBin(v, 8) +
                "\n\nThe most significant bit is 0, which confirms it is positive.</pre>";
              bits = toBin(v, 8).split("");
            } else {
              const p = toBin(-v, 8);
              const flipped = p.split("").map(b => b === "1" ? "0" : "1").join("");
              const final = toBin(((parseInt(flipped, 2) + 1) & 255), 8);
              out = "<pre>step 1  write " + (-v) + " in binary        " + p +
                "\nstep 2  flip every bit               " + flipped +
                "\nstep 3  add 1                        " + final +
                "\n\ncheck: -128" + final.split("").slice(1).map((b, i) => b === "1" ? " + " + Math.pow(2, 6 - i) : "").join("") +
                " = <b>" + v + "</b></pre>";
              bits = final.split("");
            }
            q(el, "#tOut").innerHTML = out;
            paintBits();
          };
          q(el, "#tVal").oninput = run; run();
        }
      };

      qa(el, "#blTabs button").forEach(b => b.onclick = () => {
        qa(el, "#blTabs button").forEach(x => x.classList.toggle("on", x === b));
        panels[b.dataset.p]();
      });
      panels.add();
    }
  };

  /* ================================================================== */
  /* 3. FILE SIZE CALCULATOR                                             */
  /* ================================================================== */
  const filesize = {
    title: "File size calculator", em: "\u{1F4C0}", topic: "1.2",
    blurb: "Image and sound file sizes with every line of the working written out, the way the mark scheme wants it.",
    render(el) {
      el.innerHTML = `
        <div class="seg" id="fsTabs" style="margin-bottom:18px">
          <button class="on" data-p="img">Image</button><button data-p="snd">Sound</button>
        </div>
        <div id="fsBody"></div>`;
      const body = q(el, "#fsBody");

      const units = bits => {
        const B = bits / 8, K = B / 1024, M = K / 1024;
        return { B, K, M };
      };
      /* keep the decimals: 937.5 KiB is the answer the mark scheme wants, not 938 */
      const fmt = n => {
        const r = Math.round(n * 100) / 100;
        const [i, d] = String(r).split(".");
        return (+i).toLocaleString() + (d ? "." + d : "");
      };

      const panels = {
        img() {
          body.innerHTML = `
            <div class="grid g3">
              <div class="field"><label>Width (pixels)</label><input class="input" id="iW" value="800"></div>
              <div class="field"><label>Height (pixels)</label><input class="input" id="iH" value="600"></div>
              <div class="field"><label>Colour depth (bits)</label><input class="input" id="iD" value="16"></div>
            </div>
            <div id="iOut"></div>`;
          const run = () => {
            const w = +q(el, "#iW").value || 0, h = +q(el, "#iH").value || 0, d = +q(el, "#iD").value || 0;
            const bits = w * h * d, u = units(bits);
            q(el, "#iOut").innerHTML =
              "<pre>pixels        " + w + " x " + h + " = " + (w * h).toLocaleString() +
              "\nbits          " + (w * h).toLocaleString() + " x " + d + " = " + bits.toLocaleString() + " bits" +
              "\nbytes         " + bits.toLocaleString() + " / 8 = " + u.B.toLocaleString() + " bytes" +
              "\nkibibytes     " + u.B.toLocaleString() + " / 1024 = " + fmt(u.K) + " KiB" +
              "\nmebibytes     " + fmt(u.K) + " / 1024 = " + fmt(u.M) + " MiB</pre>" +
              '<div class="callout"><div class="ttl">Colours available</div><p>A colour depth of ' + d +
              " bits gives 2^" + d + " = " + (d <= 32 ? Math.pow(2, d).toLocaleString() : "a very large number of") +
              " different colours per pixel.</p></div>";
          };
          qa(el, "#iW,#iH,#iD").forEach(i => i.oninput = run); run();
        },
        snd() {
          body.innerHTML = `
            <div class="grid g4">
              <div class="field"><label>Sample rate (Hz)</label><input class="input" id="sR" value="44100"></div>
              <div class="field"><label>Resolution (bits)</label><input class="input" id="sB" value="16"></div>
              <div class="field"><label>Length (seconds)</label><input class="input" id="sS" value="180"></div>
              <div class="field"><label>Channels</label><select id="sC"><option value="1">Mono (1)</option><option value="2" selected>Stereo (2)</option></select></div>
            </div>
            <div id="sOut"></div>`;
          const run = () => {
            const r = +q(el, "#sR").value || 0, b = +q(el, "#sB").value || 0,
                  s = +q(el, "#sS").value || 0, c = +q(el, "#sC").value;
            const bits = r * b * s * c, u = units(bits);
            q(el, "#sOut").innerHTML =
              "<pre>bits          " + r.toLocaleString() + " x " + b + " x " + s + (c === 2 ? " x 2 (stereo)" : "") +
              " = " + bits.toLocaleString() + " bits" +
              "\nbytes         / 8   = " + Math.round(u.B).toLocaleString() + " bytes" +
              "\nkibibytes     / 1024 = " + fmt(u.K) + " KiB" +
              "\nmebibytes     / 1024 = " + fmt(u.M) + " MiB</pre>" +
              '<div class="callout tip"><div class="ttl">In the exam</div><p>Show every division on its own line. Marks are given for the method even when the final number is wrong.</p></div>';
          };
          qa(el, "#sR,#sB,#sS").forEach(i => i.oninput = run); q(el, "#sC").onchange = run; run();
        }
      };
      qa(el, "#fsTabs button").forEach(b => b.onclick = () => {
        qa(el, "#fsTabs button").forEach(x => x.classList.toggle("on", x === b));
        panels[b.dataset.p]();
      });
      panels.img();
    }
  };

  /* ================================================================== */
  /* 4. CHARACTER CODES                                                  */
  /* ================================================================== */
  const charcodes = {
    title: "Character codes", em: "\u{1F524}", topic: "1.2",
    blurb: "Type anything and see how it is actually stored: ASCII denary, 8-bit binary and hex.",
    render(el) {
      el.innerHTML = `
        <div class="field"><label>Type some text</label><input class="input big" id="ccIn" value="Hello!" maxlength="40"></div>
        <div class="table-wrap"><table class="mono" id="ccTable"></table></div>
        <div id="ccNote"></div>`;
      const run = () => {
        const t = q(el, "#ccIn").value;
        let rows = "<tr><th>Char</th><th>ASCII denary</th><th>8-bit binary</th><th>Hex</th></tr>";
        let over = false;
        for (const ch of t) {
          const c = ch.codePointAt(0);
          if (c > 127) over = true;
          rows += "<tr><td>" + esc(ch === " " ? "space" : ch) + "</td><td>" + c + "</td><td>" +
                  (c < 256 ? toBin(c, 8) : toBin(c, 16)) + "</td><td>" + c.toString(16).toUpperCase() + "</td></tr>";
        }
        q(el, "#ccTable").innerHTML = rows;
        const bytes = Array.from(t).length;
        q(el, "#ccNote").innerHTML =
          '<div class="callout"><div class="ttl">File size</div><p>' + bytes + " characters stored in ASCII would use " +
          bytes + " bytes (" + bytes * 8 + " bits). The same text in 16-bit Unicode would use " + bytes * 2 +
          " bytes, which is why Unicode files are larger.</p></div>" +
          (over ? '<div class="callout trap"><div class="ttl">Beyond ASCII</div><p>At least one character has a code above 127, so it cannot be stored in 7-bit ASCII at all. This is exactly why Unicode exists.</p></div>' : "");
      };
      q(el, "#ccIn").oninput = run; run();
    }
  };

  /* ================================================================== */
  /* 5. FETCH DECODE EXECUTE ANIMATOR                                    */
  /* ================================================================== */
  const fde = {
    title: "Fetch decode execute", em: "\u{1F504}", topic: "3.1",
    blurb: "Step through the cycle one register transfer at a time and watch the PC, MAR, MDR, CIR and ACC change.",
    render(el) {
      const prog = [
        { addr: 100, text: "LDA 200", note: "load the value at address 200 into the accumulator" },
        { addr: 101, text: "ADD 201", note: "add the value at address 201 to the accumulator" },
        { addr: 102, text: "STO 202", note: "store the accumulator into address 202" }
      ];
      const mem = { 200: 12, 201: 30, 202: 0 };

      const steps = [];
      prog.forEach((ins, k) => {
        steps.push({ ph: "Fetch", d: "The address in the PC is copied into the MAR.", set: r => { r.MAR = ins.addr; }, lit: "cpu" });
        steps.push({ ph: "Fetch", d: "The PC is incremented by 1 so it points at the next instruction.", set: r => { r.PC = ins.addr + 1; }, lit: "cpu" });
        steps.push({ ph: "Fetch", d: "The instruction at that address travels along the data bus into the MDR.", set: r => { r.MDR = ins.text; }, lit: "mem" });
        steps.push({ ph: "Fetch", d: "The instruction is copied from the MDR into the CIR.", set: r => { r.CIR = ins.text; }, lit: "cpu" });
        steps.push({ ph: "Decode", d: "The control unit decodes " + ins.text + ": " + ins.note + ".", set: () => {}, lit: "cpu" });
        steps.push({
          ph: "Execute", d: "The instruction is carried out" + (k < 2 ? " by the ALU, and the result is placed in the accumulator." : "."),
          set: r => {
            if (ins.text.startsWith("LDA")) r.ACC = mem[200];
            if (ins.text.startsWith("ADD")) r.ACC = r.ACC + mem[201];
            if (ins.text.startsWith("STO")) { mem[202] = r.ACC; r.MEM = mem[202]; }
          }, lit: "mem"
        });
      });

      let i = -1;
      const regs = { PC: 100, MAR: "-", MDR: "-", CIR: "-", ACC: 0, MEM: 0 };

      el.innerHTML = `
        <div class="fde-stage">
          <div class="fde-box" id="boxCpu">
            <h4>CPU registers</h4>
            <div id="regs"></div>
          </div>
          <div class="fde-bus">&#8592;&nbsp;address&nbsp;&#8594;<br>&#8592;&nbsp;data&nbsp;&#8594;</div>
          <div class="fde-box" id="boxMem">
            <h4>Main memory</h4>
            <div id="mem"></div>
          </div>
        </div>
        <div class="callout" id="fdeMsg" style="min-height:78px"><div class="ttl" id="fdePh">Ready</div><p id="fdeD">Press step to begin. The program adds the values at addresses 200 and 201, then stores the answer at 202.</p></div>
        <div class="btn-row">
          <button class="btn" id="fdeStep">Step</button>
          <button class="btn sec" id="fdeAuto">Run</button>
          <button class="btn sec" id="fdeReset">Reset</button>
          <span class="chip" id="fdeCount">step 0 of ${steps.length}</span>
        </div>`;

      function paint() {
        q(el, "#regs").innerHTML = ["PC", "MAR", "MDR", "CIR", "ACC"]
          .map(k => '<div class="fde-reg"><span>' + k + "</span><b>" + regs[k] + "</b></div>").join("");
        q(el, "#mem").innerHTML = prog.map(p =>
          '<div class="fde-reg"><span>' + p.addr + "</span><b>" + p.text + "</b></div>").join("") +
          Object.keys(mem).map(a => '<div class="fde-reg"><span>' + a + "</span><b>" + mem[a] + "</b></div>").join("");
        q(el, "#fdeCount").textContent = "step " + (i + 1) + " of " + steps.length;
      }
      function step() {
        if (i >= steps.length - 1) return false;
        i++;
        const s = steps[i];
        s.set(regs);
        q(el, "#fdePh").textContent = s.ph;
        q(el, "#fdeD").textContent = s.d;
        q(el, "#boxCpu").classList.toggle("lit", s.lit === "cpu");
        q(el, "#boxMem").classList.toggle("lit", s.lit === "mem");
        paint();
        return true;
      }
      let timer = null;
      q(el, "#fdeStep").onclick = () => { clearInterval(timer); step(); };
      q(el, "#fdeAuto").onclick = () => {
        clearInterval(timer);
        timer = setInterval(() => { if (!step()) clearInterval(timer); }, 1100);
      };
      q(el, "#fdeReset").onclick = () => {
        clearInterval(timer); i = -1;
        Object.assign(regs, { PC: 100, MAR: "-", MDR: "-", CIR: "-", ACC: 0 });
        mem[202] = 0;
        q(el, "#fdePh").textContent = "Ready";
        q(el, "#fdeD").textContent = "Press step to begin.";
        qa(el, ".fde-box").forEach(b => b.classList.remove("lit"));
        paint();
      };
      paint();
      el._cleanup = () => clearInterval(timer);
    }
  };

  /* ================================================================== */
  /* 6. LOGIC LAB                                                        */
  /* ================================================================== */
  function parseLogic(src) {
    const tokens = src.toUpperCase().replace(/\s+/g, " ")
      .replace(/\(/g, " ( ").replace(/\)/g, " ) ").trim().split(/\s+/).filter(Boolean);
    let p = 0;
    const peek = () => tokens[p];
    const eat = t => { if (tokens[p] === t) { p++; return true; } return false; };

    function expr() {                      // OR / NOR, lowest precedence
      let left = xor();
      while (peek() === "OR" || peek() === "NOR") {
        const op = tokens[p++]; left = { op, l: left, r: xor() };
      }
      return left;
    }
    function xor() {
      let left = and();
      while (peek() === "XOR") { p++; left = { op: "XOR", l: left, r: and() }; }
      return left;
    }
    function and() {
      let left = unary();
      while (peek() === "AND" || peek() === "NAND") {
        const op = tokens[p++]; left = { op, l: left, r: unary() };
      }
      return left;
    }
    function unary() {
      if (eat("NOT")) return { op: "NOT", l: unary() };
      if (eat("(")) { const e = expr(); if (!eat(")")) throw new Error("Missing a closing bracket"); return e; }
      const t = tokens[p++];
      if (!t) throw new Error("The expression ends too early");
      if (!/^[A-Z]$/.test(t)) throw new Error('"' + t + '" is not a single letter input or a gate name');
      return { op: "VAR", name: t };
    }
    const ast = expr();
    if (p < tokens.length) throw new Error('Unexpected "' + tokens[p] + '"');
    return ast;
  }

  function logicVars(n, set) {
    set = set || new Set();
    if (n.op === "VAR") set.add(n.name);
    else { if (n.l) logicVars(n.l, set); if (n.r) logicVars(n.r, set); }
    return set;
  }
  function logicText(n) {
    if (n.op === "VAR") return n.name;
    if (n.op === "NOT") return "NOT " + (n.l.op === "VAR" ? n.l.name : "(" + logicText(n.l) + ")");
    return "(" + logicText(n.l) + " " + n.op + " " + logicText(n.r) + ")";
  }
  function logicEval(n, env) {
    switch (n.op) {
      case "VAR": return env[n.name];
      case "NOT": return logicEval(n.l, env) ? 0 : 1;
      case "AND": return (logicEval(n.l, env) && logicEval(n.r, env)) ? 1 : 0;
      case "OR": return (logicEval(n.l, env) || logicEval(n.r, env)) ? 1 : 0;
      case "NAND": return (logicEval(n.l, env) && logicEval(n.r, env)) ? 0 : 1;
      case "NOR": return (logicEval(n.l, env) || logicEval(n.r, env)) ? 0 : 1;
      case "XOR": return (logicEval(n.l, env) !== logicEval(n.r, env)) ? 1 : 0;
    }
  }
  function logicSubs(n, out) {
    out = out || [];
    if (n.op === "VAR") return out;
    if (n.l) logicSubs(n.l, out);
    if (n.r) logicSubs(n.r, out);
    const label = logicText(n).replace(/^\(|\)$/g, "");
    if (!out.some(o => o.label === label)) out.push({ label, node: n });
    return out;
  }

  const GATE_SVG = {
    AND: '<path d="M12 8h18a16 16 0 010 32H12z"/><path d="M2 16h10M2 32h10M40 24h10"/>',
    OR: '<path d="M10 8c12 4 12 28 0 32 18 0 26-6 34-16-8-10-16-16-34-16z"/><path d="M2 16h9M2 32h9M44 24h8"/>',
    NOT: '<path d="M14 8l24 16-24 16z"/><circle cx="42" cy="24" r="3.5"/><path d="M2 24h12M46 24h6"/>',
    NAND: '<path d="M12 8h16a16 16 0 010 32H12z"/><circle cx="47" cy="24" r="3.5"/><path d="M2 16h10M2 32h10M51 24h4"/>',
    NOR: '<path d="M10 8c12 4 12 28 0 32 17 0 25-6 32-16-7-10-15-16-32-16z"/><circle cx="47" cy="24" r="3.5"/><path d="M2 16h9M2 32h9M51 24h4"/>',
    XOR: '<path d="M14 8c12 4 12 28 0 32 18 0 26-6 34-16-8-10-16-16-34-16z"/><path d="M6 8c12 4 12 28 0 32"/><path d="M2 16h4M2 32h4M50 24h4"/>'
  };

  const logic = {
    title: "Logic lab", em: "\u{26A1}", topic: "10.1",
    blurb: "Type any logic expression and get the full truth table, with a column for every intermediate gate.",
    render(el) {
      el.innerHTML = `
        <div class="field"><label>Logic expression</label>
          <input class="input big" id="lgIn" value="(A AND B) OR NOT C"></div>
        <div class="btn-row" id="lgPresets"></div>
        <div id="lgOut"></div>
        <h3>Gate reference</h3>
        <div class="grid g3" id="lgGates"></div>`;

      q(el, "#lgPresets").innerHTML = [
        "A AND B", "A NAND B", "A XOR B",
        "(A AND B) OR C", "NOT (A OR B)", "(A OR B) AND NOT (A AND B)", "(A XOR B) AND C"
      ].map(p => '<button class="btn sec sm" data-p="' + esc(p) + '">' + esc(p) + "</button>").join("");

      q(el, "#lgGates").innerHTML = Object.keys(GATE_SVG).map(g => {
        const tt = { AND: ["0", "0", "0", "1"], OR: ["0", "1", "1", "1"], NOT: ["1", "0", "-", "-"],
                     NAND: ["1", "1", "1", "0"], NOR: ["1", "0", "0", "0"], XOR: ["0", "1", "1", "0"] }[g];
        return '<div class="card tight gate-card"><svg class="gate-svg" viewBox="0 0 56 48">' + GATE_SVG[g] +
          '</svg><b>' + g + '</b><div style="font-family:var(--mono);font-size:11.5px;color:var(--ink-3);margin-top:4px">' +
          (g === "NOT" ? "0&#8594;1 &nbsp; 1&#8594;0" : "00&#8594;" + tt[0] + " 01&#8594;" + tt[1] + " 10&#8594;" + tt[2] + " 11&#8594;" + tt[3]) +
          "</div></div>";
      }).join("");

      function run() {
        const src = q(el, "#lgIn").value.trim();
        const out = q(el, "#lgOut");
        if (!src) { out.innerHTML = ""; return; }
        let ast;
        try { ast = parseLogic(src); }
        catch (e) {
          out.innerHTML = '<div class="callout trap"><div class="ttl">Cannot read that expression</div><p>' +
            esc(e.message) + '. Use single letters for inputs and the words NOT, AND, OR, NAND, NOR and XOR, with brackets to group.</p></div>';
          return;
        }
        const vars = Array.from(logicVars(ast)).sort();
        if (vars.length > 4) { out.innerHTML = '<div class="callout trap"><p>Keep it to four inputs or fewer.</p></div>'; return; }
        const subs = logicSubs(ast);
        const inner = subs.slice(0, -1);
        const rows = Math.pow(2, vars.length);
        let html = "<tr>" + vars.map(v => "<th>" + v + "</th>").join("") +
          inner.map(s => "<th>" + esc(s.label) + "</th>").join("") + "<th>X</th></tr>";
        for (let r = 0; r < rows; r++) {
          const env = {};
          vars.forEach((v, k) => env[v] = (r >> (vars.length - 1 - k)) & 1);
          html += "<tr>" + vars.map(v => "<td>" + env[v] + "</td>").join("") +
            inner.map(s => "<td>" + logicEval(s.node, env) + "</td>").join("") +
            "<td><b>" + logicEval(ast, env) + "</b></td></tr>";
        }
        out.innerHTML = '<div class="table-wrap"><table class="mono">' + html + "</table></div>" +
          '<div class="callout"><div class="ttl">Read as</div><p>X = ' + esc(logicText(ast).replace(/^\(|\)$/g, "")) +
          "</p><p style='margin:0'>" + vars.length + " inputs means 2^" + vars.length + " = " + rows +
          " rows. The middle columns are the output of each gate along the way, which is exactly how you should lay it out on paper.</p></div>";
      }

      q(el, "#lgIn").oninput = run;
      qa(el, "#lgPresets button").forEach(b => b.onclick = () => { q(el, "#lgIn").value = b.dataset.p; run(); });
      run();
    }
  };

  /* ================================================================== */
  /* 7. SQL LAB                                                          */
  /* ================================================================== */
  const DB = {
    STOCK: {
      fields: ["ItemID", "Title", "Category", "Price", "Quantity", "InStock"],
      rows: [
        ["S001", "Wireless mouse", "Peripherals", 12.5, 40, true],
        ["S002", "Mechanical keyboard", "Peripherals", 68.0, 12, true],
        ["S003", "27 inch monitor", "Displays", 189.99, 5, true],
        ["S004", "USB-C cable", "Cables", 7.25, 150, true],
        ["S005", "HDMI cable", "Cables", 5.5, 0, false],
        ["S006", "Webcam", "Peripherals", 34.0, 22, true],
        ["S007", "Laptop stand", "Accessories", 22.75, 8, true],
        ["S008", "Docking station", "Accessories", 129.0, 0, false]
      ]
    },
    STUDENTS: {
      fields: ["StudentID", "Name", "Year", "Mark", "Subject"],
      rows: [
        [101, "Amira", 11, 82, "Computer Science"],
        [102, "Ben", 10, 55, "Computer Science"],
        [103, "Chen", 11, 91, "Physics"],
        [104, "Daniela", 11, 47, "Computer Science"],
        [105, "Eli", 10, 73, "Physics"],
        [106, "Farah", 11, 68, "Computer Science"]
      ]
    }
  };

  function runSQL(sql) {
    const s = sql.trim().replace(/;+\s*$/, "");
    const m = /^SELECT\s+(.+?)\s+FROM\s+([A-Z_]+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+?))?$/i.exec(s);
    if (!m) throw new Error("Expected the form SELECT ... FROM ... [WHERE ...] [ORDER BY ...]");
    const [, selRaw, tableRaw, whereRaw, orderRaw] = m;
    const table = DB[tableRaw.toUpperCase()];
    if (!table) throw new Error('There is no table called "' + tableRaw + '". Try Stock or Students.');

    const colIndex = name => {
      const i = table.fields.findIndex(f => f.toLowerCase() === name.trim().toLowerCase());
      if (i < 0) throw new Error('There is no field called "' + name.trim() + '" in ' + tableRaw);
      return i;
    };

    let rows = table.rows.slice();

    if (whereRaw) {
      const parts = whereRaw.split(/\s+(AND|OR)\s+/i);
      rows = rows.filter(r => {
        let acc = test(parts[0], r);
        for (let i = 1; i < parts.length; i += 2) {
          const op = parts[i].toUpperCase(), next = test(parts[i + 1], r);
          acc = op === "AND" ? (acc && next) : (acc || next);
        }
        return acc;
      });
    }
    function test(cond, row) {
      const c = /^\s*([A-Za-z_]+)\s*(>=|<=|<>|!=|=|>|<|LIKE)\s*(.+?)\s*$/i.exec(cond);
      if (!c) throw new Error('Cannot read the condition "' + cond.trim() + '"');
      const v = row[colIndex(c[1])];
      let lit = c[3].trim();
      const quoted = /^'(.*)'$/.test(lit) || /^"(.*)"$/.test(lit);
      lit = lit.replace(/^['"]|['"]$/g, "");
      let cmp = quoted ? lit : (/^(TRUE|FALSE)$/i.test(lit) ? /^TRUE$/i.test(lit) : (isNaN(+lit) ? lit : +lit));
      switch (c[2].toUpperCase()) {
        case "=": return v === cmp || String(v).toLowerCase() === String(cmp).toLowerCase();
        case "<>": case "!=": return !(v === cmp || String(v).toLowerCase() === String(cmp).toLowerCase());
        case ">": return v > cmp; case "<": return v < cmp;
        case ">=": return v >= cmp; case "<=": return v <= cmp;
        case "LIKE": {
          const re = new RegExp("^" + String(cmp).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".") + "$", "i");
          return re.test(String(v));
        }
      }
    }

    if (orderRaw) {
      const o = /^([A-Za-z_]+)\s*(ASC|DESC)?$/i.exec(orderRaw.trim());
      if (!o) throw new Error("ORDER BY needs a single field name, optionally with ASC or DESC");
      const i = colIndex(o[1]), dir = (o[2] || "ASC").toUpperCase() === "DESC" ? -1 : 1;
      rows.sort((a, b) => (a[i] > b[i] ? 1 : a[i] < b[i] ? -1 : 0) * dir);
    }

    const sel = selRaw.trim();
    const agg = /^(COUNT|SUM|AVG|MAX|MIN)\s*\(\s*(\*|[A-Za-z_]+)\s*\)$/i.exec(sel);
    if (agg) {
      const fn = agg[1].toUpperCase(), arg = agg[2];
      let val;
      if (fn === "COUNT") val = rows.length;
      else {
        const i = colIndex(arg);
        const nums = rows.map(r => +r[i]).filter(n => !isNaN(n));
        if (fn === "SUM") val = nums.reduce((a, b) => a + b, 0);
        if (fn === "AVG") val = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
        if (fn === "MAX") val = Math.max.apply(null, nums);
        if (fn === "MIN") val = Math.min.apply(null, nums);
        val = Math.round(val * 100) / 100;
      }
      return { fields: [fn + "(" + arg + ")"], rows: [[val]] };
    }

    const cols = sel === "*" ? table.fields.slice() : sel.split(",").map(c => table.fields[colIndex(c)]);
    const idx = cols.map(c => colIndex(c));
    return { fields: cols, rows: rows.map(r => idx.map(i => r[i])) };
  }

  const sql = {
    title: "SQL lab", em: "\u{1F5C3}", topic: "9.1",
    blurb: "Run real queries against two sample tables, with tasks to work through and instant feedback.",
    render(el) {
      const TASKS = [
        { t: "Show the Title and Price of every item in the Stock table.", check: r => r.fields.length === 2 && r.rows.length === 8 },
        { t: "Show all details of items costing less than 20.", check: r => r.rows.length === 3 && r.fields.length === 6 },
        { t: "Show the Title of items in the Peripherals category, sorted by Price with the cheapest first.", check: r => r.rows.length === 3 && r.rows[0][0] === "Wireless mouse" },
        { t: "Count how many items are out of stock (InStock = FALSE).", check: r => r.rows[0] && r.rows[0][0] === 2 },
        { t: "Find the total Quantity of all items in the Cables category.", check: r => r.rows[0] && r.rows[0][0] === 150 },
        { t: "In the Students table, show the Name and Mark of Year 11 students who scored more than 60, highest mark first.", check: r => r.rows.length === 3 && r.rows[0][1] === 91 }
      ];
      let ti = 0;

      el.innerHTML = `
        <div class="callout"><div class="ttl">Task <span id="sqN">1</span> of ${TASKS.length}</div><p id="sqT"></p></div>
        <div class="field"><label>Your query</label>
          <textarea class="input" id="sqIn" rows="4" spellcheck="false">SELECT * FROM Stock;</textarea></div>
        <div class="btn-row">
          <button class="btn" id="sqRun">Run query</button>
          <button class="btn sec" id="sqNext">Next task</button>
          <button class="btn sec" id="sqShow">Show the tables</button>
        </div>
        <div id="sqOut"></div>
        <div id="sqTables" hidden></div>`;

      const tableHtml = (fields, rows) =>
        '<div class="table-wrap"><table><tr>' + fields.map(f => "<th>" + esc(f) + "</th>").join("") + "</tr>" +
        rows.map(r => "<tr>" + r.map(c => "<td>" + esc(c) + "</td>").join("") + "</tr>").join("") + "</table></div>";

      q(el, "#sqTables").innerHTML = Object.keys(DB).map(k =>
        "<h3>" + k.charAt(0) + k.slice(1).toLowerCase() + "</h3>" + tableHtml(DB[k].fields, DB[k].rows)).join("");

      const showTask = () => { q(el, "#sqN").textContent = ti + 1; q(el, "#sqT").textContent = TASKS[ti].t; };

      q(el, "#sqRun").onclick = () => {
        const out = q(el, "#sqOut");
        let res;
        try { res = runSQL(q(el, "#sqIn").value); }
        catch (e) {
          out.innerHTML = '<div class="callout trap"><div class="ttl">Query error</div><p>' + esc(e.message) + "</p></div>";
          return;
        }
        let ok = false;
        try { ok = TASKS[ti].check(res); } catch (e) {}
        out.innerHTML =
          (res.rows.length ? tableHtml(res.fields, res.rows) : '<div class="callout"><p>The query ran but returned no records.</p></div>') +
          '<div class="chip ' + (ok ? "good" : "warn") + '" style="margin-top:6px">' +
          (ok ? "\u2713 That answers the task" : "Runs fine, but it does not match the task yet") + "</div>";
        if (ok) { Store.addXp(4); App.toast("Task " + (ti + 1) + " solved"); }
      };
      q(el, "#sqNext").onclick = () => { ti = (ti + 1) % TASKS.length; showTask(); q(el, "#sqOut").innerHTML = ""; };
      q(el, "#sqShow").onclick = () => { const t = q(el, "#sqTables"); t.hidden = !t.hidden; };
      showTask();
    }
  };

  /* ================================================================== */
  /* 8. TRACE TABLE TRAINER                                              */
  /* ================================================================== */
  const TRACE = [
    {
      name: "Totalling with a FOR loop",
      code: ["Total &#8592; 0", "FOR i &#8592; 1 TO 5", "  Total &#8592; Total + i", "NEXT i", "OUTPUT Total"],
      cols: ["i", "Total", "OUTPUT"],
      rows: [["", "0", ""], ["1", "1", ""], ["2", "3", ""], ["3", "6", ""], ["4", "10", ""], ["5", "15", "15"]],
      why: "The total is initialised before the loop, then each value of i is added on. The output happens once, after the loop."
    },
    {
      name: "WHILE loop with a countdown",
      code: ["X &#8592; 20", "WHILE X &gt; 5 DO", "  X &#8592; X - 6", "  OUTPUT X", "ENDWHILE"],
      cols: ["X", "OUTPUT"],
      rows: [["20", ""], ["14", "14"], ["8", "8"], ["2", "2"]],
      why: "The condition is checked before each pass. After X becomes 2, the test 2 > 5 is false, so the loop ends and 2 is the final value."
    },
    {
      name: "Counting even numbers",
      code: ["Count &#8592; 0", "FOR n &#8592; 1 TO 6", "  IF n MOD 2 = 0", "    THEN Count &#8592; Count + 1", "  ENDIF", "NEXT n", "OUTPUT Count"],
      cols: ["n", "Count", "OUTPUT"],
      rows: [["", "0", ""], ["1", "", ""], ["2", "1", ""], ["3", "", ""], ["4", "2", ""], ["5", "", ""], ["6", "3", "3"]],
      why: "Count only changes on the even passes, so those rows are left blank for Count. Leaving a cell blank when nothing changes is exactly what the mark scheme expects."
    },
    {
      name: "Finding the largest value",
      code: ["Highest &#8592; 0", "FOR i &#8592; 1 TO 4", "  INPUT Num", "  IF Num &gt; Highest", "    THEN Highest &#8592; Num", "  ENDIF", "NEXT i", "OUTPUT Highest"],
      note: "Input values, in order: 12, 45, 30, 45",
      cols: ["i", "Num", "Highest", "OUTPUT"],
      rows: [["", "", "0", ""], ["1", "12", "12", ""], ["2", "45", "45", ""], ["3", "30", "", ""], ["4", "45", "", "45"]],
      why: "On pass 3, 30 is not greater than 45, so Highest does not change and the cell stays blank. On pass 4, 45 is not greater than 45 either, because the test uses > and not >=."
    }
  ];

  const trace = {
    title: "Trace table trainer", em: "\u{1F50E}", topic: "7.3",
    blurb: "Fill in the trace table yourself, then check it cell by cell. Blank means the variable did not change.",
    render(el) {
      let pi = 0;

      function build() {
        const p = TRACE[pi];
        el.innerHTML = `
          <div class="grid g2" style="align-items:start">
            <div>
              <h3 style="margin-top:0">${esc(p.name)}</h3>
              <pre>${p.code.join("\n")}</pre>
              ${p.note ? '<div class="chip">' + esc(p.note) + "</div>" : ""}
            </div>
            <div>
              <h3 style="margin-top:0">Your trace table</h3>
              <div class="table-wrap trace-grid"><table id="trT"></table></div>
              <div class="btn-row">
                <button class="btn" id="trCheck">Check</button>
                <button class="btn sec" id="trReveal">Show answer</button>
                <button class="btn sec" id="trNext">Next program</button>
              </div>
              <div id="trMsg"></div>
            </div>
          </div>`;

        let html = "<tr>" + p.cols.map(c => "<th>" + c + "</th>").join("") + "</tr>";
        p.rows.forEach((r, ri) => {
          html += "<tr>" + r.map((c, ci) =>
            '<td><input data-r="' + ri + '" data-c="' + ci + '" aria-label="row ' + (ri + 1) + " " + p.cols[ci] + '"></td>').join("") + "</tr>";
        });
        q(el, "#trT").innerHTML = html;

        q(el, "#trCheck").onclick = () => {
          let right = 0, total = 0;
          qa(el, "#trT input").forEach(inp => {
            const want = p.rows[+inp.dataset.r][+inp.dataset.c].trim();
            const got = inp.value.trim();
            total++;
            const ok = got.toLowerCase() === want.toLowerCase();
            inp.classList.toggle("ok", ok);
            inp.classList.toggle("no", !ok);
            if (ok) right++;
          });
          const pct = Math.round(right / total * 100);
          q(el, "#trMsg").innerHTML = '<div class="callout ' + (pct === 100 ? "tip" : "trap") + '"><div class="ttl">' +
            right + " of " + total + " cells correct</div><p>" +
            (pct === 100 ? "Full marks. " + p.why : "Green cells are right, red ones are not. Remember: leave a cell blank on any row where that variable does not change.") + "</p></div>";
          if (pct === 100) { Store.addXp(6); App.toast("Trace table complete"); }
        };
        q(el, "#trReveal").onclick = () => {
          qa(el, "#trT input").forEach(inp => {
            inp.value = p.rows[+inp.dataset.r][+inp.dataset.c];
            inp.classList.remove("no"); inp.classList.add("ok");
          });
          q(el, "#trMsg").innerHTML = '<div class="callout"><div class="ttl">Why</div><p>' + p.why + "</p></div>";
        };
        q(el, "#trNext").onclick = () => { pi = (pi + 1) % TRACE.length; build(); };
      }
      build();
    }
  };

  /* ================================================================== */
  /* 9. SPEED DRILL                                                      */
  /* ================================================================== */
  const drill = {
    title: "Conversion speed drill", em: "\u{23F1}", topic: "1.1",
    blurb: "Sixty seconds of denary, binary and hex conversions. Beat your own best score.",
    render(el) {
      let score = 0, streak = 0, timeLeft = 60, timer = null, cur = null, running = false;

      el.innerHTML = `
        <div class="card" style="text-align:center">
          <div class="drill-timer"><i id="dBar" style="width:100%"></i></div>
          <div style="display:flex;justify-content:space-between;margin-top:10px;font-size:13px;color:var(--ink-3)">
            <span>Score <b id="dScore" style="color:var(--ink)">0</b></span>
            <span id="dTime">60s</span>
            <span>Best <b id="dBest" style="color:var(--ink)">${Store.state.drill.best}</b></span>
          </div>
          <div id="dPrompt" style="margin-top:18px;font-size:14px;color:var(--ink-3)">Press start</div>
          <div class="drill-num" id="dQ">--</div>
          <input class="input big" id="dA" style="max-width:260px;margin:0 auto;text-align:center" placeholder="answer" autocomplete="off" disabled>
          <div class="btn-row" style="justify-content:center">
            <button class="btn" id="dGo">Start</button>
          </div>
          <div id="dFb" style="min-height:26px;font-size:13.5px"></div>
        </div>`;

      const kinds = [
        () => { const n = 1 + Math.floor(Math.random() * 254); return { p: "Convert to 8-bit binary", q: n, a: toBin(n, 8) }; },
        () => { const n = 1 + Math.floor(Math.random() * 254); return { p: "Convert to denary", q: toBin(n, 8), a: String(n) }; },
        () => { const n = 1 + Math.floor(Math.random() * 254); return { p: "Convert to hexadecimal", q: n, a: n.toString(16).toUpperCase() }; },
        () => { const n = 1 + Math.floor(Math.random() * 254); return { p: "Convert to denary", q: n.toString(16).toUpperCase(), a: String(n) }; },
        () => { const n = 1 + Math.floor(Math.random() * 254); return { p: "Convert to hexadecimal", q: toBin(n, 8), a: n.toString(16).toUpperCase() }; }
      ];

      function next() {
        cur = kinds[Math.floor(Math.random() * kinds.length)]();
        q(el, "#dPrompt").textContent = cur.p;
        q(el, "#dQ").textContent = cur.q;
        q(el, "#dA").value = "";
        q(el, "#dA").focus();
      }
      function stop() {
        running = false; clearInterval(timer);
        q(el, "#dA").disabled = true;
        q(el, "#dGo").textContent = "Play again";
        q(el, "#dQ").textContent = score;
        q(el, "#dPrompt").textContent = "Final score";
        if (score > Store.state.drill.best) {
          Store.state.drill.best = score; Store.save();
          q(el, "#dBest").textContent = score;
          q(el, "#dFb").innerHTML = '<span class="chip good">New personal best</span>';
          App.confetti();
        }
        Store.addXp(score);
        Store.touchStreak();
      }
      function start() {
        score = 0; streak = 0; timeLeft = 60; running = true;
        q(el, "#dScore").textContent = "0";
        q(el, "#dA").disabled = false;
        q(el, "#dGo").textContent = "Give up";
        q(el, "#dFb").innerHTML = "";
        next();
        clearInterval(timer);
        timer = setInterval(() => {
          timeLeft -= 0.1;
          q(el, "#dBar").style.width = Math.max(0, timeLeft / 60 * 100) + "%";
          q(el, "#dTime").textContent = Math.ceil(Math.max(0, timeLeft)) + "s";
          if (timeLeft <= 0) stop();
        }, 100);
      }

      q(el, "#dGo").onclick = () => { if (running) stop(); else start(); };
      q(el, "#dA").addEventListener("keydown", e => {
        if (e.key !== "Enter" || !running) return;
        const got = q(el, "#dA").value.trim().replace(/\s/g, "").toUpperCase();
        if (got === cur.a) {
          streak++; score += 1 + Math.floor(streak / 5);
          q(el, "#dScore").textContent = score;
          q(el, "#dFb").innerHTML = '<span class="chip good">Correct' + (streak > 2 ? " &middot; streak " + streak : "") + "</span>";
          next();
        } else {
          streak = 0;
          q(el, "#dFb").innerHTML = '<span class="chip bad">' + esc(cur.q) + " is " + cur.a + "</span>";
          next();
        }
      });
      el._cleanup = () => clearInterval(timer);
    }
  };

  return { convert, binlab, filesize, charcodes, fde, logic, sql, trace, drill };
})();
