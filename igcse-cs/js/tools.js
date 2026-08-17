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

  /* ---------------------------------------------------------------- */
  /* draw a logic circuit from a parsed expression                     */
  /* Paper 2 asks you to draw the circuit, so the lab should show one. */
  /* ---------------------------------------------------------------- */
  function gateShape(x, y, kind) {
    const w = 42, h = 30, cy = y, bub = 4;
    const body = {
      AND: '<path d="M' + x + ' ' + (cy - h / 2) + 'h' + (w * .45) + 'a' + (h / 2) + ' ' + (h / 2) + ' 0 0 1 0 ' + h + 'h-' + (w * .45) + 'z"/>',
      OR: '<path d="M' + x + ' ' + (cy - h / 2) + 'q' + (w * .55) + ' ' + (h * .12) + ' ' + w + ' ' + (h / 2) +
          'q-' + (w * .45) + ' ' + (h * .38) + ' -' + w + ' ' + (h / 2) + 'q' + (w * .3) + ' -' + (h / 2) + ' 0 -' + h + 'z"/>',
      NOT: '<path d="M' + x + ' ' + (cy - h / 2) + 'l' + w + ' ' + (h / 2) + 'l-' + w + ' ' + (h / 2) + 'z"/>'
    };
    const base = kind === "NAND" ? "AND" : kind === "NOR" ? "OR" : kind === "XOR" ? "OR" : kind;
    let svg = body[base] || body.AND;
    if (kind === "XOR") {
      svg = '<path d="M' + (x - 6) + ' ' + (cy - h / 2) + 'q' + (w * .3) + ' ' + (h / 2) + ' 0 ' + h + '"/>' + svg;
    }
    if (kind === "NAND" || kind === "NOR" || kind === "NOT") {
      svg += '<circle cx="' + (x + w + bub) + '" cy="' + cy + '" r="' + bub + '"/>';
    }
    return svg;
  }

  function drawCircuit(ast, vars) {
    const gates = [];
    (function collect(n) {
      if (!n || n.op === "VAR") return;
      if (n.l) collect(n.l);
      if (n.r) collect(n.r);
      gates.push(n);
    })(ast);
    if (gates.length > 7) return '<p style="font-size:13px;color:var(--ink-3)">That expression needs more than seven gates, which is more than the exam will ask you to draw.</p>';

    const ROW = 46, COL = 108, PADL = 62, PADT = 34, GW = 42;
    const depth = n => n.op === "VAR" ? 0 : 1 + Math.max(depth(n.l), n.r ? depth(n.r) : 0);
    const maxD = depth(ast);

    const varY = {};
    vars.forEach((v, i) => { varY[v] = PADT + i * ROW; });

    const pos = new Map();
    (function place(n) {
      if (n.op === "VAR") return { x: PADL - 14, y: varY[n.name] };
      const l = place(n.l), r = n.r ? place(n.r) : null;
      const x = PADL + (depth(n) - 1) * COL;
      const y = r ? (l.y + r.y) / 2 : l.y;
      const p = { x, y, l, r };
      pos.set(n, p);
      return { x: x + GW + 9, y };
    })(ast);

    const height = Math.max(PADT + vars.length * ROW, PADT + 2 * ROW) + 24;
    const width = PADL + maxD * COL + 58;

    let svg = "";
    // input rails and labels
    vars.forEach(v => {
      svg += '<text x="14" y="' + (varY[v] + 4) + '" class="cl-lbl">' + v + "</text>" +
             '<circle cx="' + (PADL - 30) + '" cy="' + varY[v] + '" r="2.6" class="cl-dot"/>';
    });

    const wire = (x1, y1, x2, y2) => {
      const mid = x1 + Math.max(12, (x2 - x1) / 2);
      return '<polyline class="cl-wire" points="' + x1 + "," + y1 + " " + mid + "," + y1 + " " + mid + "," + y2 + " " + x2 + "," + y2 + '"/>';
    };

    pos.forEach((p, n) => {
      const inTop = p.y - 8, inBot = p.y + 8;
      const src = c => c.op === "VAR"
        ? { x: PADL - 30, y: varY[c.name] }
        : { x: pos.get(c).x + GW + (["NAND", "NOR", "NOT"].includes(c.op) ? 8 : 0) + 2, y: pos.get(c).y };

      if (n.r) {
        const a = src(n.l), b = src(n.r);
        svg += wire(a.x, a.y, p.x, inTop) + wire(b.x, b.y, p.x, inBot);
      } else {
        const a = src(n.l);
        svg += wire(a.x, a.y, p.x, p.y);
      }
      svg += '<g class="cl-gate">' + gateShape(p.x, p.y, n.op) + "</g>";
      svg += '<text x="' + (p.x + GW / 2) + '" y="' + (p.y + 26) + '" class="cl-name">' + n.op + "</text>";
    });

    const root = pos.get(ast);
    if (root) {
      const outX = root.x + GW + (["NAND", "NOR", "NOT"].includes(ast.op) ? 8 : 0) + 2;
      svg += '<polyline class="cl-wire" points="' + outX + "," + root.y + " " + (width - 30) + "," + root.y + '"/>' +
             '<text x="' + (width - 22) + '" y="' + (root.y + 4) + '" class="cl-lbl">X</text>';
    }

    return '<div class="table-wrap"><svg class="circuit" viewBox="0 0 ' + width + " " + height +
           '" width="' + width + '" height="' + height + '" role="img" aria-label="Logic circuit diagram">' + svg + "</svg></div>";
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
        out.innerHTML =
          "<h3>Circuit diagram</h3>" + drawCircuit(ast, vars) +
          "<h3>Truth table</h3>" +
          '<div class="table-wrap"><table class="mono">' + html + "</table></div>" +
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
      // AND binds tighter than OR, so split on OR first and AND within each part
      const groups = whereRaw.split(/\s+OR\s+/i).map(g => g.split(/\s+AND\s+/i));
      rows = rows.filter(r => groups.some(g => g.every(cond => test(cond, r))));
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
        { t: "In the Students table, show the Name and Mark of Year 11 students who scored more than 60, highest mark first.", check: r => r.rows.length === 3 && r.rows[0][1] === 91 },
        { t: "Show the Title of every item whose Title begins with the letter W. There are two.", check: r => r.rows.length === 2 && r.rows.every(x => /^W/i.test(x[0])) },
        { t: "Find the highest Price in the Stock table.", check: r => r.rows[0] && r.rows[0][0] === 189.99 },
        { t: "Show the Name of every student taking Computer Science, in alphabetical order.", check: r => r.rows.length === 4 && r.rows[0][0] === "Amira" && r.rows[3][0] === "Farah" },
        { t: "Find the average Mark of all Year 10 students.", check: r => r.rows[0] && Math.abs(r.rows[0][0] - 64) < 0.01 },
        { t: "Show all details of Accessories costing more than 100, or any item with a Quantity above 100.", check: r => r.rows.length === 2 }
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
    },
    {
      name: "REPEAT with a rogue value",
      code: ["Total &#8592; 0", "REPEAT", "  INPUT Num", "  IF Num &lt;&gt; -1", "    THEN Total &#8592; Total + Num", "  ENDIF", "UNTIL Num = -1", "OUTPUT Total"],
      note: "Input values, in order: 8, 12, 5, -1",
      cols: ["Num", "Total", "OUTPUT"],
      rows: [["", "0", ""], ["8", "8", ""], ["12", "20", ""], ["5", "25", ""], ["-1", "", "25"]],
      why: "On the last pass Num is -1, so the IF is false and Total does not change, which is why that cell is blank. The loop then ends because the UNTIL condition is true."
    },
    {
      name: "Nested loops",
      code: ["FOR i &#8592; 1 TO 3", "  FOR j &#8592; 1 TO 2", "    OUTPUT i * j", "  NEXT j", "NEXT i"],
      cols: ["i", "j", "OUTPUT"],
      rows: [["1", "1", "1"], ["", "2", "2"], ["2", "1", "2"], ["", "2", "4"], ["3", "1", "3"], ["", "2", "6"]],
      why: "The inner loop runs fully for each pass of the outer loop. i only changes on the rows where the outer loop moves on, so the other i cells stay blank."
    },
    {
      name: "String handling",
      code: ["Word &#8592; \"BINARY\"", "New &#8592; \"\"", "FOR i &#8592; LENGTH(Word) TO 1 STEP -1", "  New &#8592; New &amp; SUBSTRING(Word, i, 1)", "NEXT i", "OUTPUT New"],
      cols: ["i", "New", "OUTPUT"],
      rows: [["", "", ""], ["6", "Y", ""], ["5", "YR", ""], ["4", "YRA", ""], ["3", "YRAN", ""], ["2", "YRANI", ""], ["1", "YRANIB", "YRANIB"]],
      why: "The loop counts down from 6 to 1, taking one character at a time from the end of the word, so the string is built up backwards."
    },
    {
      name: "MOD and DIV",
      code: ["Num &#8592; 47", "WHILE Num &gt; 0 DO", "  OUTPUT Num MOD 10", "  Num &#8592; Num DIV 10", "ENDWHILE"],
      cols: ["Num", "OUTPUT"],
      rows: [["47", ""], ["4", "7"], ["0", "4"]],
      why: "MOD 10 takes the last digit and DIV 10 removes it. The loop ends when Num reaches 0, and the digits come out in reverse order."
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

  /* ================================================================== */
  /* 10. PSEUDOCODE RUNNER                                               */
  /* ================================================================== */
  const SAMPLES = [
    {
      name: "Totalling and averaging",
      note: "The pattern behind most Paper 2 algorithm questions. Enter -1 to stop.",
      inputs: "12\n18\n30\n-1",
      code: `// Add up numbers until the rogue value -1 is entered
DECLARE Total : INTEGER
DECLARE Count : INTEGER
DECLARE Value : INTEGER

Total ← 0
Count ← 0

REPEAT
  INPUT Value
  IF Value <> -1
    THEN
      Total ← Total + Value
      Count ← Count + 1
  ENDIF
UNTIL Value = -1

OUTPUT "You entered ", Count, " numbers"
OUTPUT "Total is ", Total
IF Count > 0
  THEN
    OUTPUT "Average is ", Total / Count
  ELSE
    OUTPUT "Nothing to average"
ENDIF`
    },
    {
      name: "Validation with a range check",
      note: "Keeps asking until the mark entered is sensible.",
      inputs: "150\n-4\n72",
      code: `// Range check: only accept a mark from 0 to 100
DECLARE Mark : INTEGER

REPEAT
  INPUT Mark
  IF Mark < 0 OR Mark > 100
    THEN
      OUTPUT "Mark must be between 0 and 100. Try again."
  ENDIF
UNTIL Mark >= 0 AND Mark <= 100

OUTPUT "Accepted mark: ", Mark

IF Mark >= 50
  THEN
    OUTPUT "Pass"
  ELSE
    OUTPUT "Fail"
ENDIF`
    },
    {
      name: "Arrays: highest, lowest, average",
      note: "Reads 6 marks into an array, then reports on them.",
      inputs: "45\n78\n23\n91\n60\n38",
      code: `DECLARE Marks : ARRAY[1:6] OF INTEGER
DECLARE Highest : INTEGER
DECLARE Lowest : INTEGER
DECLARE Total : INTEGER

Total ← 0

FOR i ← 1 TO 6
  INPUT Marks[i]
  Total ← Total + Marks[i]
NEXT i

Highest ← Marks[1]
Lowest ← Marks[1]

FOR i ← 2 TO 6
  IF Marks[i] > Highest
    THEN
      Highest ← Marks[i]
  ENDIF
  IF Marks[i] < Lowest
    THEN
      Lowest ← Marks[i]
  ENDIF
NEXT i

OUTPUT "Highest: ", Highest
OUTPUT "Lowest:  ", Lowest
OUTPUT "Average: ", Total / 6`
    },
    {
      name: "Linear search",
      note: "Searches an array and reports whether the item was found.",
      inputs: "9",
      code: `DECLARE List : ARRAY[1:8] OF INTEGER
DECLARE Search : INTEGER
DECLARE Found : BOOLEAN
DECLARE Position : INTEGER

List[1] ← 4
List[2] ← 17
List[3] ← 9
List[4] ← 22
List[5] ← 3
List[6] ← 15
List[7] ← 8
List[8] ← 11

OUTPUT "Which number are you looking for?"
INPUT Search

Found ← FALSE
Position ← 0
i ← 1

WHILE i <= 8 AND Found = FALSE DO
  IF List[i] = Search
    THEN
      Found ← TRUE
      Position ← i
  ENDIF
  i ← i + 1
ENDWHILE

IF Found = TRUE
  THEN
    OUTPUT Search, " found at position ", Position
  ELSE
    OUTPUT Search, " is not in the list"
ENDIF`
    },
    {
      name: "Procedures and functions",
      note: "A function returns a value, a procedure does not.",
      inputs: "",
      code: `FUNCTION Area(Width : INTEGER, Height : INTEGER) RETURNS INTEGER
  RETURN Width * Height
ENDFUNCTION

PROCEDURE ShowBanner(Title : STRING)
  OUTPUT "=== ", UCASE(Title), " ==="
ENDPROCEDURE

CALL ShowBanner("room sizes")

FOR Room ← 1 TO 3
  OUTPUT "Room ", Room, " area is ", Area(Room * 2, 3)
NEXT Room`
    },
    {
      name: "2D array with nested loops",
      note: "Three students, four marks each. The outer loop is rows, the inner is columns.",
      inputs: "",
      code: `DECLARE Marks : ARRAY[1:3, 1:4] OF INTEGER
DECLARE Total : INTEGER

// fill the table
FOR Student ← 1 TO 3
  FOR Test ← 1 TO 4
    Marks[Student, Test] ← Student * Test * 5
  NEXT Test
NEXT Student

// total each student's row
FOR Student ← 1 TO 3
  Total ← 0
  FOR Test ← 1 TO 4
    Total ← Total + Marks[Student, Test]
  NEXT Test
  OUTPUT "Student ", Student, " total: ", Total
NEXT Student`
    },
    {
      name: "String handling",
      note: "LENGTH, SUBSTRING, UCASE and LCASE, all named in the syllabus.",
      inputs: "Computer Science",
      code: `DECLARE Text : STRING

OUTPUT "Type a word or phrase"
INPUT Text

OUTPUT "Length is ", LENGTH(Text)
OUTPUT "Upper case: ", UCASE(Text)
OUTPUT "Lower case: ", LCASE(Text)
OUTPUT "First three characters: ", SUBSTRING(Text, 1, 3)

// count the spaces
Spaces ← 0
FOR i ← 1 TO LENGTH(Text)
  IF SUBSTRING(Text, i, 1) = " "
    THEN
      Spaces ← Spaces + 1
  ENDIF
NEXT i
OUTPUT "Spaces: ", Spaces`
    }
  ];

  const runner = {
    title: "Pseudocode runner", em: "\u{25B6}", topic: "8.1",
    blurb: "Write Cambridge pseudocode and actually run it. Paper 2 wants pseudocode, so practise in the real thing.",
    render(el) {
      let si = 0;

      el.innerHTML = `
        <div class="callout tip"><div class="ttl">Why this matters</div>
        <p>On Paper 2, coded answers have to be in pseudocode, and a solution written in a programming language is not awarded marks. This runs the same notation the exam uses, so you can check your logic works before you rely on it.</p></div>

        <div class="field">
          <label for="psSample">Load an example</label>
          <select id="psSample">${SAMPLES.map((s, i) => '<option value="' + i + '">' + esc(s.name) + "</option>").join("")}</select>
        </div>
        <p id="psNote" style="font-size:13px;margin-top:-6px"></p>

        <div class="runner">
          <div class="runner-main">
            <label for="psCode">Your pseudocode</label>
            <div class="editor-wrap">
              <div class="gutter" id="psGutter" aria-hidden="true"></div>
              <textarea class="input code-area" id="psCode" spellcheck="false" rows="20" aria-label="Pseudocode editor"></textarea>
            </div>
            <div class="btn-row">
              <button class="btn" id="psRun">Run</button>
              <button class="btn sec" id="psArrow">Insert &#8592;</button>
              <button class="btn sec" id="psClear">Clear</button>
            </div>
          </div>
          <div class="runner-side">
            <label for="psIn">Input, one value per line</label>
            <textarea class="input code-area" id="psIn" rows="5" spellcheck="false" placeholder="Each INPUT takes the next line"></textarea>
            <label style="margin-top:14px">Output</label>
            <pre id="psOut" class="run-out">Press Run to see what your program does.</pre>
            <div id="psVars"></div>
          </div>
        </div>

        <h3>What this runner understands</h3>
        <div class="table-wrap"><table>
          <tr><th>Feature</th><th>How to write it</th></tr>
          <tr><td>Declare</td><td><code>DECLARE Count : INTEGER</code> &nbsp; <code>CONSTANT VAT = 0.2</code></td></tr>
          <tr><td>Assign</td><td><code>Total &#8592; 0</code> &nbsp; or type <code>&lt;-</code> if the arrow is awkward</td></tr>
          <tr><td>Input and output</td><td><code>INPUT Name</code> &nbsp; <code>OUTPUT "Hi ", Name</code></td></tr>
          <tr><td>Selection</td><td><code>IF ... THEN ... ELSE ... ENDIF</code> &nbsp; <code>CASE OF ... ENDCASE</code></td></tr>
          <tr><td>Iteration</td><td><code>FOR ... NEXT</code> &nbsp; <code>WHILE ... ENDWHILE</code> &nbsp; <code>REPEAT ... UNTIL</code></td></tr>
          <tr><td>Arrays</td><td><code>DECLARE A : ARRAY[1:10] OF INTEGER</code> and <code>ARRAY[1:3,1:4]</code></td></tr>
          <tr><td>Subroutines</td><td><code>PROCEDURE</code> with <code>CALL</code>, and <code>FUNCTION ... RETURNS ... RETURN</code></td></tr>
          <tr><td>Operators</td><td><code>+ - * / ^</code> &nbsp; <code>MOD</code> <code>DIV</code> &nbsp; <code>= &lt;&gt; &lt; &lt;= &gt; &gt;=</code> &nbsp; <code>AND OR NOT</code></td></tr>
          <tr><td>Library routines</td><td><code>LENGTH</code> <code>SUBSTRING</code> <code>UCASE</code> <code>LCASE</code> <code>ROUND</code> <code>RANDOM</code> <code>INT</code></td></tr>
        </table></div>`;

      const code = q(el, "#psCode"), inputs = q(el, "#psIn"), out = q(el, "#psOut"), gutter = q(el, "#psGutter");

      function paintGutter() {
        const n = code.value.split("\n").length;
        let s = "";
        for (let i = 1; i <= n; i++) s += i + "\n";
        gutter.textContent = s;
        gutter.scrollTop = code.scrollTop;
      }
      function load(i) {
        si = i;
        code.value = SAMPLES[i].code;
        inputs.value = SAMPLES[i].inputs;
        q(el, "#psNote").textContent = SAMPLES[i].note;
        out.textContent = "Press Run to see what your program does.";
        out.className = "run-out";
        q(el, "#psVars").innerHTML = "";
        paintGutter();
      }

      function run() {
        const lines = inputs.value.split("\n").filter((l, i, a) => !(l === "" && i === a.length - 1));
        let res;
        try {
          res = Pseudo.run(code.value, lines);
        } catch (e) {
          out.className = "run-out bad";
          out.textContent = (e.line ? "Line " + e.line + ": " : "") + e.message;
          const ln = e.line;
          q(el, "#psVars").innerHTML = ln
            ? '<div class="callout trap" style="margin-top:12px"><div class="ttl">The line it stopped on</div><pre style="margin:0">' +
              esc((code.value.split("\n")[ln - 1] || "").trim() || "(blank line)") + "</pre></div>"
            : "";
          return;
        }
        out.className = "run-out";
        out.textContent = res.output.length ? res.output.join("\n") : "(the program produced no output)";
        const shown = res.vars.filter(v => v.name !== "i");
        q(el, "#psVars").innerHTML =
          (res.inputsLeft
            ? '<div class="chip warn" style="margin-top:10px">' + res.inputsLeft + " input line" + (res.inputsLeft > 1 ? "s were" : " was") + " not used</div>"
            : '<div class="chip good" style="margin-top:10px">Ran without errors</div>') +
          (shown.length
            ? '<label style="margin-top:14px">Variables at the end</label><div class="table-wrap"><table class="mono">' +
              shown.map(v => "<tr><td style='text-align:left'>" + esc(v.name) + "</td><td style='text-align:left'>" + esc(v.value) + "</td></tr>").join("") +
              "</table></div>"
            : "");
        Store.addXp(2);
      }

      q(el, "#psSample").onchange = e => load(+e.target.value);
      q(el, "#psRun").onclick = run;
      q(el, "#psClear").onclick = () => { code.value = ""; inputs.value = ""; paintGutter(); out.textContent = ""; q(el, "#psVars").innerHTML = ""; };
      q(el, "#psArrow").onclick = () => {
        const s = code.selectionStart;
        code.value = code.value.slice(0, s) + "←" + code.value.slice(code.selectionEnd);
        code.focus();
        code.selectionStart = code.selectionEnd = s + 1;
      };
      code.addEventListener("input", paintGutter);
      code.addEventListener("scroll", () => { gutter.scrollTop = code.scrollTop; });
      code.addEventListener("keydown", e => {
        if (e.key === "Tab") {                       // indentation matters for readability here
          e.preventDefault();
          const s = code.selectionStart;
          code.value = code.value.slice(0, s) + "  " + code.value.slice(code.selectionEnd);
          code.selectionStart = code.selectionEnd = s + 2;
        }
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
      });

      load(0);
    }
  };

  /* ================================================================== */
  /* 11. SCENARIO WORKSHOP (the 15 mark question)                        */
  /* ================================================================== */
  const SCENARIOS = [
    {
      name: "Sports club lap times",
      brief: "A running club records the lap times of its members. The program must let the coach enter the times for 10 laps, then report on them.",
      needs: [
        "Input 10 lap times, in seconds",
        "Reject any time that is not between 30 and 600 seconds, and ask again",
        "Output the fastest lap, the slowest lap and the average lap time",
        "Output how many laps were under 60 seconds"
      ],
      scheme: [
        { t: "All variables and constants are declared with sensible data types", need: "declare" },
        { t: "A count-controlled loop repeating 10 times", need: "countLoop" },
        { t: "Each lap time is input inside the loop", need: "input" },
        { t: "Validation rejects times outside 30 to 600 and asks again", need: "validation" },
        { t: "A running total is kept for the average", need: "totalling" },
        { t: "Selection is used to find the fastest and slowest", need: "selection" },
        { t: "A counter for laps under 60 seconds", need: null },
        { t: "The average is calculated after the loop, not inside it", need: null },
        { t: "Every output has a suitable message, not just a bare number", need: "outputMessage" },
        { t: "The code is commented", need: "comment" }
      ],
      stub: `// Sports club lap times
DECLARE Time : REAL
DECLARE Total : REAL

Total ← 0

// your solution here
`
    },
    {
      name: "Car park charges",
      brief: "A car park charges by the hour. The program must work out what each of 20 drivers owes, and report the day's takings.",
      needs: [
        "For each of 20 drivers, input the number of hours parked",
        "Only accept a whole number of hours from 1 to 24",
        "Charge 2.50 for the first hour and 1.50 for every hour after that",
        "Output each driver's charge, then the total taken and the average charge"
      ],
      scheme: [
        { t: "Variables declared, and the rates stored as constants", need: "declare" },
        { t: "Constants used for the two hourly rates rather than bare numbers", need: "constant" },
        { t: "A count-controlled loop repeating 20 times", need: "countLoop" },
        { t: "Validation rejects hours outside 1 to 24", need: "validation" },
        { t: "The charge is calculated correctly for one hour and for more than one hour", need: "selection" },
        { t: "A running total of the takings", need: "totalling" },
        { t: "Each driver's charge is output with a message", need: "outputMessage" },
        { t: "The total and the average are output after the loop", need: null },
        { t: "The code is commented", need: "comment" }
      ],
      stub: `// Car park charges
CONSTANT FirstHour = 2.50
CONSTANT ExtraHour = 1.50

// your solution here
`
    },
    {
      name: "Quiz score tracker",
      brief: "A teacher records quiz scores for a class of 8 students across 3 quizzes, then reports on the results.",
      needs: [
        "Store the scores in a suitable data structure",
        "Input a name and 3 scores for each of the 8 students",
        "Reject any score that is not between 0 and 20",
        "Output each student's total and average",
        "Output the name of the student with the highest total"
      ],
      scheme: [
        { t: "A 2D array (or two arrays) is declared to hold the scores", need: "array" },
        { t: "An array is used for the names as well", need: null },
        { t: "Nested loops are used to fill the scores", need: "nested" },
        { t: "Validation rejects scores outside 0 to 20", need: "validation" },
        { t: "A running total per student", need: "totalling" },
        { t: "Selection finds the highest total, storing the name too", need: "selection" },
        { t: "Totals and averages are output with messages", need: "outputMessage" },
        { t: "The winning student's name is output", need: null },
        { t: "The code is commented", need: "comment" }
      ],
      stub: `// Quiz score tracker
DECLARE Scores : ARRAY[1:8, 1:3] OF INTEGER
DECLARE Names : ARRAY[1:8] OF STRING

// your solution here
`
    },
    {
      name: "Library book loans",
      brief: "A library tracks up to 15 books on loan. The program must record loans and report on overdue books.",
      needs: [
        "Input a title and the number of days on loan for each of 15 books",
        "Only accept a number of days from 0 to 60",
        "A book is overdue if it has been out for more than 14 days",
        "Output the title of every overdue book, and how many are overdue",
        "Use a subroutine to work out whether a book is overdue"
      ],
      scheme: [
        { t: "Arrays declared for the titles and the days", need: "array" },
        { t: "A count-controlled loop repeating 15 times", need: "countLoop" },
        { t: "Validation rejects days outside 0 to 60", need: "validation" },
        { t: "A FUNCTION that returns whether a book is overdue", need: "functionReturns" },
        { t: "The function is called from the main program", need: "subroutine" },
        { t: "A counter for the number of overdue books", need: null },
        { t: "Overdue titles are output with a message", need: "outputMessage" },
        { t: "The count of overdue books is output at the end", need: null },
        { t: "The code is commented", need: "comment" }
      ],
      stub: `// Library book loans
DECLARE Titles : ARRAY[1:15] OF STRING
DECLARE Days : ARRAY[1:15] OF INTEGER

FUNCTION IsOverdue(d : INTEGER) RETURNS BOOLEAN
  // your code here
ENDFUNCTION

// your solution here
`
    }
  ];

  SCENARIOS.push(
    {
      name: "Cinema ticket sales",
      brief: "A cinema sells tickets for one screening. The program must take bookings until the screen is full or the box office closes.",
      needs: [
        "The screen holds 60 seats, stored as a constant",
        "Repeatedly input the number of seats wanted, until 0 is entered or the screen is full",
        "Reject a request for fewer than 1 or more than 8 seats",
        "Reject a request for more seats than are still free",
        "Output the number of seats sold, the number left, and the takings at 9.50 a seat"
      ],
      scheme: [
        { t: "Variables declared, and the seat total and price stored as constants", need: "constant" },
        { t: "A condition-controlled loop, because the number of bookings is not known", need: "condLoop" },
        { t: "Validation rejects requests outside 1 to 8", need: "validation" },
        { t: "A check that enough seats remain before accepting the booking", need: "selection" },
        { t: "A running total of seats sold", need: "totalling" },
        { t: "The loop ends on 0 or when the screen is full", need: null },
        { t: "Seats sold, seats left and takings are all output with messages", need: "outputMessage" },
        { t: "The code is commented", need: "comment" }
      ],
      stub: "// Cinema ticket sales\nCONSTANT Seats = 60\nCONSTANT Price = 9.50\n\n// your solution here\n"
    },
    {
      name: "Weather station readings",
      brief: "A weather station records the temperature every hour for a week. The program must summarise the readings.",
      needs: [
        "Store 7 days of 24 hourly readings",
        "Reject any reading outside -50 to 60 degrees",
        "Output the average temperature for each day",
        "Output the highest temperature recorded in the week and which day it was on",
        "Use a subroutine to calculate the average of one day"
      ],
      scheme: [
        { t: "A 2D array is declared for the readings", need: "array2d" },
        { t: "Nested loops fill the array, days outside and hours inside", need: "nested" },
        { t: "Validation rejects readings outside -50 to 60", need: "validation" },
        { t: "A FUNCTION that returns the average for one day", need: "functionReturns" },
        { t: "The function is called once per day", need: "subroutine" },
        { t: "Selection tracks the highest temperature and the day it fell on", need: "selection" },
        { t: "All results output with messages", need: "outputMessage" },
        { t: "The code is commented", need: "comment" }
      ],
      stub: "// Weather station readings\nDECLARE Temps : ARRAY[1:7, 1:24] OF REAL\n\nFUNCTION DayAverage(Day : INTEGER) RETURNS REAL\n  // your code here\nENDFUNCTION\n\n// your solution here\n"
    }
  );

  const scenario = {
    title: "Scenario workshop", em: "\u{1F4DD}", topic: "7.4",
    blurb: "Practice for the 15 mark question at the end of Paper 2, with a mark scheme that checks what your code actually does.",
    render(el) {
      let si = 0;

      el.innerHTML = `
        <div class="callout"><div class="ttl">Worth a fifth of Paper 2</div>
        <p>The last question gives you an unseen scenario and asks for a whole program. Write it here, run it, then check it against the mark scheme. The checks marked <b>auto</b> are worked out from your code, the rest are for you to judge honestly.</p></div>

        <div class="field"><label for="scPick">Scenario</label>
          <select id="scPick">${SCENARIOS.map((s, i) => '<option value="' + i + '">' + esc(s.name) + "</option>").join("")}</select>
        </div>

        <div class="card" id="scBrief"></div>

        <div class="runner">
          <div class="runner-main">
            <label for="scCode">Your solution</label>
            <div class="editor-wrap">
              <div class="gutter" id="scGutter" aria-hidden="true"></div>
              <textarea class="input code-area" id="scCode" spellcheck="false" rows="22" aria-label="Solution editor"></textarea>
            </div>
            <div class="btn-row">
              <button class="btn" id="scRun">Run</button>
              <button class="btn sec" id="scCheck">Check against the mark scheme</button>
              <button class="btn sec" id="scReset">Start again</button>
            </div>
            <pre id="scOut" class="run-out">Run your solution to see what it does.</pre>
          </div>
          <div class="runner-side">
            <label>Input, one value per line</label>
            <textarea class="input code-area" id="scIn" rows="6" spellcheck="false" placeholder="Values for each INPUT"></textarea>
            <div id="scMarks"></div>
          </div>
        </div>`;

      const code = q(el, "#scCode"), gutter = q(el, "#scGutter"), out = q(el, "#scOut");

      function paintGutter() {
        gutter.textContent = code.value.split("\n").map((_, i) => i + 1).join("\n") + "\n";
        gutter.scrollTop = code.scrollTop;
      }

      function load(i) {
        si = i;
        const s = SCENARIOS[i];
        q(el, "#scBrief").innerHTML =
          "<h3 style='margin-top:0'>" + esc(s.name) + "</h3><p>" + esc(s.brief) + "</p>" +
          "<h4>The program must</h4><ol>" + s.needs.map(n => "<li>" + esc(n) + "</li>").join("") + "</ol>";
        code.value = s.stub;
        q(el, "#scIn").value = "";
        out.textContent = "Run your solution to see what it does.";
        out.className = "run-out";
        q(el, "#scMarks").innerHTML = "";
        paintGutter();
      }

      q(el, "#scRun").onclick = () => {
        const lines = q(el, "#scIn").value.split("\n").filter((l, i, a) => !(l === "" && i === a.length - 1));
        try {
          const r = Pseudo.run(code.value, lines);
          out.className = "run-out";
          out.textContent = r.output.length ? r.output.join("\n") : "(no output yet)";
        } catch (e) {
          out.className = "run-out bad";
          out.textContent = (e.line ? "Line " + e.line + ": " : "") + e.message;
        }
      };

      q(el, "#scCheck").onclick = () => {
        const s = SCENARIOS[si];
        const a = Pseudo.analyse(code.value);
        const box = q(el, "#scMarks");

        const rows = s.scheme.map((item, i) => {
          const auto = item.need !== null;
          const hit = auto && a.seen[item.need];
          return '<label class="mark-row' + (hit ? " hit" : "") + '">' +
            '<input type="checkbox" data-i="' + i + '"' + (hit ? " checked" : "") + '>' +
            "<span>" + esc(item.t) + "</span>" +
            (auto ? '<span class="chip ' + (hit ? "good" : "") + '">auto</span>' : "") +
            "</label>";
        }).join("");

        box.innerHTML =
          (a.parseError
            ? '<div class="callout trap"><div class="ttl">The code does not parse yet</div><p>Line ' +
              a.parseError.line + ": " + esc(a.parseError.message) +
              ". The automatic checks below cannot see past this.</p></div>"
            : "") +
          '<label style="margin-top:14px">Mark scheme</label><div class="marks">' + rows + "</div>" +
          '<div class="score-line" id="scScore"></div>';

        const tally = () => {
          const boxes = qa(el, ".marks input");
          const got = boxes.filter(b => b.checked).length;
          const pct = Math.round(got / boxes.length * 100);
          q(el, "#scScore").innerHTML =
            "<b>" + got + " of " + boxes.length + "</b> points covered" +
            '<div class="bar" style="margin-top:6px"><i style="width:' + pct + '%"></i></div>' +
            (pct === 100 ? '<div class="chip good" style="margin-top:8px">Every point covered</div>' : "");
          boxes.forEach(b => b.closest(".mark-row").classList.toggle("hit", b.checked));
        };
        qa(el, ".marks input").forEach(b => b.onchange = tally);
        tally();
        Store.addXp(3);
      };

      q(el, "#scReset").onclick = () => load(si);
      q(el, "#scPick").onchange = e => load(+e.target.value);
      code.addEventListener("input", paintGutter);
      code.addEventListener("scroll", () => { gutter.scrollTop = code.scrollTop; });
      code.addEventListener("keydown", e => {
        if (e.key === "Tab") {
          e.preventDefault();
          const p = code.selectionStart;
          code.value = code.value.slice(0, p) + "  " + code.value.slice(code.selectionEnd);
          code.selectionStart = code.selectionEnd = p + 2;
        }
      });

      load(0);
    }
  };

  /* ================================================================== */
  /* 12. PARITY BLOCK CHECK                                              */
  /* ================================================================== */
  const parity = {
    title: "Parity block check", em: "\u{1F9EE}", topic: "2.2",
    blurb: "One bit has been corrupted in transmission. Use the row and column parity to find exactly which one.",
    render(el) {
      const N = 7;                       // 7 data bytes, plus a parity byte
      let grid = [], badR = 0, badC = 0, found = false, mode = "even";

      el.innerHTML = `
        <div class="seg" id="paMode" style="margin-bottom:14px">
          <button class="on" data-m="even">Even parity</button><button data-m="odd">Odd parity</button>
        </div>
        <p>Each of the first ${N} rows is a byte of data, with its <b>last bit</b> as the row's parity bit. The <b>bottom row</b> is the parity byte, which makes each column's parity correct. One bit has been flipped in transmission. Click the bit you think is wrong.</p>
        <div id="paGrid"></div>
        <div id="paMsg"></div>
        <div class="btn-row">
          <button class="btn" id="paNew">New corrupted block</button>
          <button class="btn sec" id="paShow">Show me the answer</button>
        </div>
        <div class="callout tip"><div class="ttl">The method</div>
        <p>Check the parity of every <b>row</b>, then of every <b>column</b>. Exactly one row and one column will be wrong. The corrupted bit sits where that row crosses that column, which is why a parity block check can locate the error while a single parity bit cannot.</p></div>`;

      const parityOf = bits => bits.reduce((a, b) => a + b, 0) % 2;

      function build() {
        found = false;
        grid = [];
        for (let r = 0; r < N; r++) {
          const row = [];
          for (let c = 0; c < N; c++) row.push(Math.random() < 0.5 ? 0 : 1);
          // row parity bit
          row.push(mode === "even" ? parityOf(row) : 1 - parityOf(row));
          grid.push(row);
        }
        // parity byte along the bottom
        const last = [];
        for (let c = 0; c <= N; c++) {
          const col = grid.map(r => r[c]);
          last.push(mode === "even" ? parityOf(col) : 1 - parityOf(col));
        }
        grid.push(last);

        badR = Math.floor(Math.random() * (N + 1));
        badC = Math.floor(Math.random() * (N + 1));
        grid[badR][badC] = 1 - grid[badR][badC];
        paint();
        q(el, "#paMsg").innerHTML = "";
      }

      function paint() {
        const want = mode === "even" ? 0 : 1;
        let html = '<div class="table-wrap"><table class="mono parity-grid"><tr><th></th>' +
          Array.from({ length: N + 1 }, (_, c) => "<th>" + (c === N ? "P" : "c" + (c + 1)) + "</th>").join("") +
          "<th>row</th></tr>";

        grid.forEach((row, r) => {
          const rp = parityOf(row) === want;
          html += "<tr><th>" + (r === N ? "P" : "b" + (r + 1)) + "</th>" +
            row.map((b, c) =>
              '<td><button class="pbit' + (found && r === badR && c === badC ? " culprit" : "") +
              '" data-r="' + r + '" data-c="' + c + '">' + b + "</button></td>").join("") +
            '<td><span class="chip ' + (rp ? "good" : "bad") + '">' + (rp ? "ok" : "wrong") + "</span></td></tr>";
        });

        html += "<tr><th>col</th>";
        for (let c = 0; c <= N; c++) {
          const cp = parityOf(grid.map(r => r[c])) === want;
          html += '<td><span class="chip ' + (cp ? "good" : "bad") + '">' + (cp ? "ok" : "wrong") + "</span></td>";
        }
        html += "<td></td></tr></table></div>";
        q(el, "#paGrid").innerHTML = html;

        qa(el, ".pbit").forEach(b => b.onclick = () => {
          const r = +b.dataset.r, c = +b.dataset.c;
          if (r === badR && c === badC) {
            found = true;
            paint();
            q(el, "#paMsg").innerHTML = '<div class="callout tip"><div class="ttl">Correct</div><p>Row ' +
              (badR === N ? "P (the parity byte)" : "b" + (badR + 1)) + " and column " +
              (badC === N ? "P (the parity bits)" : "c" + (badC + 1)) +
              " both failed their parity check, so the bit where they cross is the corrupted one.</p></div>";
            Store.addXp(4);
            App.confetti();
          } else {
            q(el, "#paMsg").innerHTML = '<div class="callout trap"><div class="ttl">Not that one</div><p>Find the row marked wrong and the column marked wrong. The corrupted bit is where those two meet.</p></div>';
          }
        });
      }

      q(el, "#paNew").onclick = build;
      q(el, "#paShow").onclick = () => { found = true; paint(); };
      qa(el, "#paMode button").forEach(b => b.onclick = () => {
        qa(el, "#paMode button").forEach(x => x.classList.toggle("on", x === b));
        mode = b.dataset.m;
        build();
      });
      build();
    }
  };

  /* ================================================================== */
  /* 13. WHAT HAPPENS WHEN YOU TYPE A URL                                */
  /* ================================================================== */
  const journey = {
    title: "The journey of a web page", em: "\u{1F310}", topic: "5.1",
    blurb: "Step through what actually happens between typing a URL and seeing the page. This is a six mark question.",
    render(el) {
      const STEPS = [
        { at: "browser", t: "You type the URL", d: "You type https://www.example.com into the address bar. The browser separates out the protocol (https), the domain name (www.example.com) and the path." },
        { at: "browser", t: "The browser needs an IP address", d: "The browser cannot send anything to a name. It needs the IP address of the web server, so it asks a DNS server to translate the domain name." },
        { at: "dns", t: "The DNS server is asked", d: "The request goes to the nearest DNS server. If it holds the matching IP address in its records, it sends it straight back." },
        { at: "dns", t: "Or it asks further up", d: "If that DNS server does not know the domain, it passes the request on to another DNS server higher up, and so on until the address is found. If no server can find it, an error is returned to the browser." },
        { at: "browser", t: "The IP address comes back", d: "The DNS server returns the IP address of the web server to the browser." },
        { at: "server", t: "The browser requests the page", d: "The browser sends an HTTP request straight to the web server at that IP address, asking for the page at the path in the URL." },
        { at: "server", t: "The server responds", d: "The web server sends the page back as HTML, along with the CSS and any images, split into packets." },
        { at: "browser", t: "The browser renders the page", d: "The packets are reassembled in order using their packet numbers, and the browser renders the HTML so you see the page. Because this is https, the data was encrypted using SSL/TLS the whole way." }
      ];

      let i = -1, timer = null;

      el.innerHTML = `
        <div class="journey">
          <div class="jbox" id="jbrowser"><div class="jem">\u{1F5A5}</div><b>Your browser</b><small>renders the page</small></div>
          <div class="jbox" id="jdns"><div class="jem">\u{1F4C7}</div><b>DNS server</b><small>name to IP address</small></div>
          <div class="jbox" id="jserver"><div class="jem">\u{1F5C4}</div><b>Web server</b><small>holds the website</small></div>
        </div>
        <div class="callout" id="jMsg" style="min-height:96px">
          <div class="ttl" id="jTtl">Ready</div><p id="jD">Press step to follow a page request from start to finish.</p>
        </div>
        <div class="btn-row">
          <button class="btn" id="jStep">Step</button>
          <button class="btn sec" id="jAuto">Play</button>
          <button class="btn sec" id="jReset">Reset</button>
          <span class="chip" id="jCount">step 0 of ${STEPS.length}</span>
        </div>
        <ol class="jlist" id="jList">${STEPS.map((s, n) => '<li data-n="' + n + '">' + esc(s.t) + "</li>").join("")}</ol>`;

      function paint() {
        const s = STEPS[i];
        ["browser", "dns", "server"].forEach(k =>
          q(el, "#j" + k).classList.toggle("lit", !!s && s.at === k));
        q(el, "#jTtl").textContent = s ? "Step " + (i + 1) : "Ready";
        q(el, "#jD").textContent = s ? s.d : "Press step to follow a page request from start to finish.";
        q(el, "#jCount").textContent = "step " + (i + 1) + " of " + STEPS.length;
        qa(el, "#jList li").forEach(li => li.classList.toggle("on", +li.dataset.n <= i));
      }
      function step() { if (i >= STEPS.length - 1) return false; i++; paint(); return true; }

      q(el, "#jStep").onclick = () => { clearInterval(timer); step(); };
      q(el, "#jAuto").onclick = () => {
        clearInterval(timer);
        timer = setInterval(() => { if (!step()) clearInterval(timer); }, 2600);
      };
      q(el, "#jReset").onclick = () => { clearInterval(timer); i = -1; paint(); };
      qa(el, "#jList li").forEach(li => li.onclick = () => { clearInterval(timer); i = +li.dataset.n; paint(); });
      paint();
      el._cleanup = () => clearInterval(timer);
    }
  };

  /* ================================================================== */
  /* 14. THREAT AND DEFENCE DRILL                                        */
  /* ================================================================== */
  const THREATS = [
    { s: "An employee receives an email that looks like it is from the company bank, with a link to a site asking them to confirm their password.", threat: "Phishing", fix: "Do not click links in unexpected messages, and check the spelling and tone of the message" },
    { s: "Malicious code on a user's computer changes their DNS settings, so typing the correct bank address takes them to a fake copy of the site.", threat: "Pharming", fix: "Anti-malware software, and checking the URL and its https certificate" },
    { s: "Software repeatedly tries every possible combination of characters until it works out the password.", threat: "Brute force attack", fix: "Long complex passwords and a limit on log-in attempts" },
    { s: "A server is flooded with so many requests from thousands of machines that genuine users cannot reach the website.", threat: "DDoS attack", fix: "A firewall and a proxy server to filter and absorb the traffic" },
    { s: "Someone uses a packet sniffer to examine the packets travelling across a wireless network and reads the data inside them.", threat: "Data interception", fix: "Encryption, so intercepted data is meaningless" },
    { s: "A program that looked like a free photo editor installs other malware as soon as it is run.", threat: "Trojan horse", fix: "Anti-malware software, and only installing software from trusted sources" },
    { s: "Malware spreads by itself across the whole school network without anyone opening a file, using up bandwidth.", threat: "Worm", fix: "Anti-malware software and automatic security updates" },
    { s: "All the files on a computer are encrypted, and a message demands payment for the key to unlock them.", threat: "Ransomware", fix: "Regular backups kept on separate storage" },
    { s: "Software secretly records every key a user presses and sends it to an attacker.", threat: "Spyware", fix: "Anti-malware software and two-step verification" },
    { s: "Someone phones the help desk pretending to be a senior manager, saying it is urgent that their password is reset immediately.", threat: "Social engineering", fix: "Staff training and a verification procedure before acting on requests" },
    { s: "Someone gains unauthorised access to the school system and changes the stored grades.", threat: "Hacking", fix: "Access levels so users only reach the data they need, plus strong authentication" },
    { s: "A file attaches itself to a program, and each time that program is opened it copies itself and corrupts more data.", threat: "Virus", fix: "Anti-malware software kept up to date" }
  ];

  const threats = {
    title: "Threat and defence drill", em: "\u{1F6E1}", topic: "5.3",
    blurb: "Topic 5.3 has the longest list in the syllabus. Name the threat from the scenario, then pick the defence that matches it.",
    render(el) {
      let order = [], k = 0, score = 0, phase = 0, current = null;

      el.innerHTML = `
        <div class="q-progress">
          <span id="thN"></span><div class="bar"><i id="thBar" style="width:0%"></i></div>
          <span class="chip" id="thScore">0 correct</span>
        </div>
        <div class="card"><p class="q-stem" id="thStem"></p><div id="thOpts"></div></div>
        <div id="thAfter"></div>`;

      const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

      function begin() { order = shuffle(THREATS).slice(0, 8); k = 0; score = 0; ask(); }

      function ask() {
        current = order[k];
        phase = 0;
        q(el, "#thN").textContent = (k + 1) + " / " + order.length;
        q(el, "#thBar").style.width = Math.round(k / order.length * 100) + "%";
        q(el, "#thScore").textContent = score + " correct";
        q(el, "#thStem").textContent = current.s;
        q(el, "#thAfter").innerHTML = "";
        options("Which threat is this?", "threat");
      }

      function options(prompt, key) {
        const right = current[key];
        const pool = shuffle(THREATS.filter(t => t[key] !== right).map(t => t[key])).slice(0, 3);
        const opts = shuffle(pool.concat([right]));
        q(el, "#thOpts").innerHTML =
          '<h4 style="margin-top:0">' + prompt + "</h4>" +
          opts.map((o, n) => '<button class="opt" data-v="' + esc(o) + '"><span class="key">' + "ABCD"[n] +
            "</span><span>" + esc(o) + "</span></button>").join("");

        qa(el, "#thOpts .opt").forEach(btn => btn.onclick = () => {
          const ok = btn.dataset.v === right;
          qa(el, "#thOpts .opt").forEach(b => {
            b.disabled = true;
            if (b.dataset.v === right) b.classList.add("right");
            else if (b === btn) b.classList.add("wrong");
          });
          if (ok) score++;
          q(el, "#thScore").textContent = score + " correct";

          if (phase === 0) {
            phase = 1;
            q(el, "#thAfter").innerHTML = '<div class="btn-row"><button class="btn" id="thNext">Now pick the defence</button></div>';
            q(el, "#thNext").onclick = () => { q(el, "#thAfter").innerHTML = ""; options("Which measure best protects against it?", "fix"); };
          } else {
            q(el, "#thAfter").innerHTML =
              '<div class="verdict ' + (ok ? "ok" : "no") + '"><h4>' + esc(current.threat) + "</h4><p>" +
              esc(current.fix) + ".</p></div><div class=\"btn-row\"><button class=\"btn\" id=\"thNext\">" +
              (k === order.length - 1 ? "See results" : "Next scenario") + "</button></div>";
            q(el, "#thNext").onclick = () => {
              if (k === order.length - 1) done(); else { k++; ask(); }
            };
          }
        });
      }

      function done() {
        const total = order.length * 2;
        const pct = Math.round(score / total * 100);
        Store.recordQuiz("5.3", pct >= 60);
        Store.addXp(score * 2);
        Store.touchStreak();
        el.innerHTML = `<div class="card" style="text-align:center">
            <div class="score-ring" style="--p:${pct}"><b>${pct}%</b></div>
            <h2 style="margin:0 0 4px">${score} of ${total}</h2>
            <p>Each scenario was worth two: naming the threat and matching the defence.</p>
            <div class="btn-row" style="justify-content:center">
              <button class="btn" id="thAgain">Go again</button>
              <a class="btn sec" href="#/sub/5.3">Back to the notes</a>
            </div></div>`;
        q(el, "#thAgain").onclick = () => { threats.render(el); };
        if (pct >= 85) App.confetti();
      }

      begin();
    }
  };

  /* ================================================================== */
  /* 15. FLOWCHART TRACER                                                */
  /* Paper 2 shows flowcharts and asks what they output. The site had    */
  /* a table of symbols but no actual flowchart, so here is one you can  */
  /* walk through a step at a time.                                      */
  /* ================================================================== */
  const FLOWCHARTS = [
    {
      name: "Pass or fail",
      about: "A single decision. Notice both branches are labelled, which the mark scheme insists on.",
      vars: ["Mark"],
      inputs: [72, 41, 50],
      nodes: [
        { id: "s", type: "term", x: 190, y: 26, t: "BEGIN", next: "in" },
        { id: "in", type: "io", x: 190, y: 100, t: "INPUT Mark", next: "d", act: (st, io) => { st.Mark = io.next(); } },
        { id: "d", type: "dec", x: 190, y: 186, t: "Mark >= 50?", yes: "p", no: "f" },
        { id: "p", type: "io", x: 90, y: 286, t: 'OUTPUT "Pass"', next: "e", act: (st, io) => io.out("Pass") },
        { id: "f", type: "io", x: 300, y: 286, t: 'OUTPUT "Fail"', next: "e", act: (st, io) => io.out("Fail") },
        { id: "e", type: "term", x: 190, y: 366, t: "END" }
      ],
      edges: [["s", "in"], ["in", "d"], ["d", "p", "Yes", "left"], ["d", "f", "No", "right"], ["p", "e", "", "join"], ["f", "e", "", "join"]],
      cond: { d: st => st.Mark >= 50 }
    },
    {
      name: "Total five numbers",
      about: "A count-controlled loop drawn as a decision with a back edge. Follow the arrow that goes back up.",
      vars: ["Count", "Total", "Num"],
      inputs: [4, 8, 15, 16, 23],
      nodes: [
        { id: "s", type: "term", x: 210, y: 26, t: "BEGIN", next: "init" },
        { id: "init", type: "proc", x: 210, y: 96, t: "Total = 0, Count = 0", next: "in", act: st => { st.Total = 0; st.Count = 0; } },
        { id: "in", type: "io", x: 210, y: 170, t: "INPUT Num", next: "add", act: (st, io) => { st.Num = io.next(); } },
        { id: "add", type: "proc", x: 210, y: 244, t: "Total = Total + Num", next: "inc", act: st => { st.Total += st.Num; } },
        { id: "inc", type: "proc", x: 210, y: 318, t: "Count = Count + 1", next: "d", act: st => { st.Count += 1; } },
        { id: "d", type: "dec", x: 210, y: 404, t: "Count = 5?", yes: "out", no: "in" },
        { id: "out", type: "io", x: 210, y: 500, t: "OUTPUT Total", next: "e", act: (st, io) => io.out(st.Total) },
        { id: "e", type: "term", x: 210, y: 574, t: "END" }
      ],
      edges: [["s", "init"], ["init", "in"], ["in", "add"], ["add", "inc"], ["inc", "d"],
              ["d", "out", "Yes"], ["d", "in", "No", "back"]],
      cond: { d: st => st.Count === 5 }
    },
    {
      name: "Largest of three",
      about: "Two decisions in sequence. Trace it carefully when two of the numbers are equal.",
      vars: ["A", "B", "C", "Big"],
      inputs: [12, 40, 7],
      nodes: [
        { id: "s", type: "term", x: 210, y: 26, t: "BEGIN", next: "in" },
        { id: "in", type: "io", x: 210, y: 96, t: "INPUT A, B, C", next: "set", act: (st, io) => { st.A = io.next(); st.B = io.next(); st.C = io.next(); } },
        { id: "set", type: "proc", x: 210, y: 170, t: "Big = A", next: "d1", act: st => { st.Big = st.A; } },
        { id: "d1", type: "dec", x: 210, y: 256, t: "B > Big?", yes: "sb", no: "d2" },
        { id: "sb", type: "proc", x: 60, y: 256, t: "Big = B", next: "d2", act: st => { st.Big = st.B; } },
        { id: "d2", type: "dec", x: 210, y: 360, t: "C > Big?", yes: "sc", no: "out" },
        { id: "sc", type: "proc", x: 60, y: 360, t: "Big = C", next: "out", act: st => { st.Big = st.C; } },
        { id: "out", type: "io", x: 210, y: 456, t: "OUTPUT Big", next: "e", act: (st, io) => io.out(st.Big) },
        { id: "e", type: "term", x: 210, y: 530, t: "END" }
      ],
      edges: [["s", "in"], ["in", "set"], ["set", "d1"], ["d1", "sb", "Yes", "side"], ["d1", "d2", "No"],
              ["sb", "d2", "", "rejoin"], ["d2", "sc", "Yes", "side"], ["d2", "out", "No"], ["sc", "out", "", "rejoin"]],
      cond: { d1: st => st.B > st.Big, d2: st => st.C > st.Big }
    },
    {
      name: "Validate with a rogue value",
      about: "A loop that stops on a rogue value, and rejects anything out of range on the way. Enter -1 to finish.",
      vars: ["Num", "Count"],
      inputs: [15, 250, 40, -1],
      nodes: [
        { id: "s", type: "term", x: 210, y: 26, t: "BEGIN", next: "init" },
        { id: "init", type: "proc", x: 210, y: 96, t: "Count = 0", next: "in", act: st => { st.Count = 0; } },
        { id: "in", type: "io", x: 210, y: 170, t: "INPUT Num", next: "d1", act: (st, io) => { st.Num = io.next(); } },
        { id: "d1", type: "dec", x: 210, y: 256, t: "Num = -1?", yes: "out", no: "d2" },
        { id: "d2", type: "dec", x: 210, y: 366, t: "Num > 100?", yes: "err", no: "inc" },
        { id: "err", type: "io", x: 60, y: 366, t: 'OUTPUT "Too big"', next: "in", act: (st, io) => io.out("Too big") },
        { id: "inc", type: "proc", x: 210, y: 462, t: "Count = Count + 1", next: "in", act: st => { st.Count += 1; } },
        { id: "out", type: "io", x: 210, y: 546, t: "OUTPUT Count", next: "e", act: (st, io) => io.out(st.Count) },
        { id: "e", type: "term", x: 210, y: 620, t: "END" }
      ],
      edges: [["s", "init"], ["init", "in"], ["in", "d1"], ["d1", "d2", "No"], ["d1", "out", "Yes", "far"],
              ["d2", "err", "Yes", "side"], ["d2", "inc", "No"], ["err", "in", "", "up"], ["inc", "in", "", "back"]],
      cond: { d1: st => st.Num === -1, d2: st => st.Num > 100 }
    },
    {
      name: "Odd or even counter",
      about: "Uses MOD inside a count-controlled loop. Watch how the two counters only change on alternate passes.",
      vars: ["i", "Num", "Odd", "Even"],
      inputs: [4, 7, 10, 3],
      nodes: [
        { id: "s", type: "term", x: 210, y: 26, t: "BEGIN", next: "init" },
        { id: "init", type: "proc", x: 210, y: 96, t: "Odd = 0, Even = 0, i = 0", next: "in", act: st => { st.Odd = 0; st.Even = 0; st.i = 0; } },
        { id: "in", type: "io", x: 210, y: 170, t: "INPUT Num", next: "d1", act: (st, io) => { st.Num = io.next(); } },
        { id: "d1", type: "dec", x: 210, y: 256, t: "Num MOD 2 = 0?", yes: "ev", no: "od" },
        { id: "ev", type: "proc", x: 60, y: 340, t: "Even = Even + 1", next: "inc", act: st => { st.Even += 1; } },
        { id: "od", type: "proc", x: 350, y: 340, t: "Odd = Odd + 1", next: "inc", act: st => { st.Odd += 1; } },
        { id: "inc", type: "proc", x: 210, y: 416, t: "i = i + 1", next: "d2", act: st => { st.i += 1; } },
        { id: "d2", type: "dec", x: 210, y: 500, t: "i = 4?", yes: "out", no: "in" },
        { id: "out", type: "io", x: 210, y: 590, t: "OUTPUT Odd, Even", next: "e", act: (st, io) => io.out(st.Odd + " odd, " + st.Even + " even") },
        { id: "e", type: "term", x: 210, y: 664, t: "END" }
      ],
      edges: [["s", "init"], ["init", "in"], ["in", "d1"], ["d1", "ev", "Yes", "left"], ["d1", "od", "No", "right"],
              ["ev", "inc", "", "join"], ["od", "inc", "", "join"], ["inc", "d2"], ["d2", "out", "Yes"], ["d2", "in", "No", "back"]],
      cond: { d1: st => st.Num % 2 === 0, d2: st => st.i === 4 }
    },
    {
      name: "Password attempts",
      about: "A loop that gives up after three tries. Enter 0 for a wrong password and 1 for the right one.",
      vars: ["Tries", "Ok"],
      inputs: [0, 0, 1],
      nodes: [
        { id: "s", type: "term", x: 210, y: 26, t: "BEGIN", next: "init" },
        { id: "init", type: "proc", x: 210, y: 96, t: "Tries = 0", next: "in", act: st => { st.Tries = 0; } },
        { id: "in", type: "io", x: 210, y: 170, t: "INPUT Ok", next: "inc", act: (st, io) => { st.Ok = io.next(); } },
        { id: "inc", type: "proc", x: 210, y: 244, t: "Tries = Tries + 1", next: "d1", act: st => { st.Tries += 1; } },
        { id: "d1", type: "dec", x: 210, y: 330, t: "Ok = 1?", yes: "yes", no: "d2" },
        { id: "yes", type: "io", x: 60, y: 330, t: 'OUTPUT "Welcome"', next: "e", act: (st, io) => io.out("Welcome") },
        { id: "d2", type: "dec", x: 210, y: 440, t: "Tries = 3?", yes: "lock", no: "in" },
        { id: "lock", type: "io", x: 210, y: 530, t: 'OUTPUT "Locked out"', next: "e", act: (st, io) => io.out("Locked out") },
        { id: "e", type: "term", x: 210, y: 604, t: "END" }
      ],
      edges: [["s", "init"], ["init", "in"], ["in", "inc"], ["inc", "d1"], ["d1", "yes", "Yes", "side"],
              ["d1", "d2", "No"], ["d2", "lock", "Yes"], ["d2", "in", "No", "back"], ["yes", "e", "", "rejoin"]],
      cond: { d1: st => st.Ok === 1, d2: st => st.Tries === 3 }
    }
  ];

  function flowSvg(fc, activeId, visited) {
    const W = 440, H = Math.max.apply(null, fc.nodes.map(n => n.y)) + 80;
    const shape = n => {
      const w = n.type === "dec" ? 168 : 156, h = n.type === "dec" ? 66 : 42;
      const x = n.x - w / 2, y = n.y - h / 2;
      if (n.type === "term") return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h / 2) + '"/>';
      if (n.type === "proc") return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3"/>';
      if (n.type === "io") return '<path d="M' + (x + 16) + ' ' + y + 'h' + w + 'l-16 ' + h + 'h-' + w + 'z"/>';
      return '<path d="M' + n.x + ' ' + y + 'l' + (w / 2) + ' ' + (h / 2) + 'l-' + (w / 2) + ' ' + (h / 2) + 'l-' + (w / 2) + ' -' + (h / 2) + 'z"/>';
    };
    const byId = id => fc.nodes.find(n => n.id === id);
    const half = n => (n.type === "dec" ? 33 : 21);

    let svg = '<defs><marker id="fcArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
              '<path d="M0 0 L10 5 L0 10 z" class="fc-head"/></marker></defs>';

    fc.edges.forEach(([from, to, label, kind]) => {
      const a = byId(from), b = byId(to);
      let pts;
      if (kind === "back") {
        // return along the right, entering the target from its side so the
        // arrow does not sit on top of the forward edge coming down into it
        const x = a.x + 138;
        pts = [[a.x + 84, a.y], [x, a.y], [x, b.y], [b.x + 80, b.y]];
      } else if (kind === "left" || kind === "right") {
        pts = [[a.x + (kind === "left" ? -84 : 84), a.y], [b.x, a.y], [b.x, b.y - half(b)]];
      } else if (kind === "far") {
        const x = a.x - 138;
        pts = [[a.x - 84, a.y], [x, a.y], [x, b.y], [b.x - 80, b.y]];
      } else if (kind === "up") {
        pts = [[a.x, a.y - half(a)], [a.x, b.y - 34], [b.x - 80, b.y - 34], [b.x - 80, b.y]];
      } else if (kind === "side") {
        pts = [[a.x - 84, a.y], [b.x + 78, b.y]];
      } else if (kind === "rejoin") {
        pts = [[a.x, a.y + half(a)], [a.x, b.y], [b.x - 84, b.y]];
      } else if (kind === "join") {
        pts = [[a.x, a.y + half(a)], [a.x, b.y - 30], [b.x, b.y - 30], [b.x, b.y - half(b)]];
      } else {
        pts = [[a.x, a.y + half(a)], [b.x, b.y - half(b)]];
      }
      svg += '<polyline class="fc-wire" marker-end="url(#fcArrow)" points="' +
             pts.map(p => p[0] + "," + p[1]).join(" ") + '"/>';
      if (label) {
        // a vertical first segment needs the label beside the line, not on it
        const [x1, y1] = pts[0], [x2, y2] = pts[1];
        const vertical = Math.abs(x2 - x1) < 4;
        const lx = vertical ? x1 + 15 : x1 + (x2 - x1) / 2;
        const ly = vertical ? y1 + (y2 - y1) / 2 + 4 : y1 - 7;
        svg += '<text class="fc-yn" x="' + lx + '" y="' + ly + '">' + label + "</text>";
      }
    });

    fc.nodes.forEach(n => {
      const cls = "fc-node fc-" + n.type + (n.id === activeId ? " on" : "") + (visited.includes(n.id) ? " seen" : "");
      svg += '<g class="' + cls + '">' + shape(n) +
             '<text x="' + n.x + '" y="' + (n.y + 4) + '">' + esc(n.t) + "</text></g>";
    });

    return '<svg class="flowchart" viewBox="0 0 ' + W + " " + H + '" width="' + W + '" height="' + H +
           '" role="img" aria-label="Flowchart for ' + esc(fc.name) + '">' + svg + "</svg>";
  }

  const flowchart = {
    title: "Flowchart tracer", em: "\u{1F500}", topic: "7.2",
    blurb: "Walk through a real flowchart one box at a time, watching the variables change. Predict the output before you start.",
    render(el) {
      let fi = 0, cur = null, state = {}, visited = [], out = [], queue = [], done = false, steps = 0;

      el.innerHTML = `
        <div class="field"><label for="fcPick">Flowchart</label><select id="fcPick">
          ${FLOWCHARTS.map((f, i) => '<option value="' + i + '">' + esc(f.name) + "</option>").join("")}
        </select></div>
        <p id="fcAbout" style="font-size:13.5px;margin-top:-4px"></p>
        <div class="flow-wrap">
          <div class="flow-canvas" id="fcCanvas"></div>
          <div class="flow-side">
            <label>Input values</label>
            <input class="input" id="fcIn" spellcheck="false">
            <div class="btn-row">
              <button class="btn" id="fcStep">Step</button>
              <button class="btn sec" id="fcRun">Run to end</button>
              <button class="btn sec" id="fcReset">Reset</button>
            </div>
            <label style="margin-top:10px">Variables</label>
            <div class="table-wrap"><table class="mono" id="fcVars"></table></div>
            <label style="margin-top:14px">Output</label>
            <pre class="run-out" id="fcOut" style="min-height:70px"></pre>
            <div id="fcNote"></div>
          </div>
        </div>`;

      const byId = id => FLOWCHARTS[fi].nodes.find(n => n.id === id);

      function reset() {
        const fc = FLOWCHARTS[fi];
        queue = q(el, "#fcIn").value.split(",").map(v => v.trim()).filter(Boolean).map(Number);
        state = {}; fc.vars.forEach(v => { state[v] = "-"; });
        visited = []; out = []; done = false; steps = 0;
        cur = fc.nodes[0].id;
        paint();
        q(el, "#fcNote").innerHTML = "";
      }

      function paint() {
        const fc = FLOWCHARTS[fi];
        q(el, "#fcCanvas").innerHTML = flowSvg(fc, cur, visited);
        q(el, "#fcVars").innerHTML = fc.vars.map(v =>
          "<tr><td style='text-align:left'>" + v + "</td><td style='text-align:left'>" + esc(state[v]) + "</td></tr>").join("");
        q(el, "#fcOut").textContent = out.length ? out.join("\n") : "(nothing output yet)";
      }

      function step() {
        if (done) return false;
        const fc = FLOWCHARTS[fi];
        const n = byId(cur);
        if (!n) { done = true; return false; }
        visited.push(n.id);

        const io = {
          next: () => (queue.length ? queue.shift() : 0),
          out: v => out.push(String(v))
        };
        if (n.act) n.act(state, io);

        if (n.type === "dec") {
          const yes = fc.cond[n.id](state);
          cur = yes ? n.yes : n.no;
          q(el, "#fcNote").innerHTML = '<div class="callout" style="margin-top:12px"><div class="ttl">Decision</div><p>' +
            esc(n.t) + " is <b>" + (yes ? "true" : "false") + "</b>, so follow the <b>" + (yes ? "Yes" : "No") + "</b> branch.</p></div>";
        } else if (n.type === "term" && !n.next) {
          done = true;
          cur = null;
          q(el, "#fcNote").innerHTML = '<div class="callout tip" style="margin-top:12px"><div class="ttl">Finished</div><p>The flowchart reached END after ' +
            steps + " steps. Output: " + (out.length ? esc(out.join(", ")) : "nothing") + "</p></div>";
          Store.addXp(3);
        } else {
          cur = n.next;
          q(el, "#fcNote").innerHTML = "";
        }
        steps++;
        if (steps > 400) { done = true; }
        paint();
        return !done;
      }

      q(el, "#fcPick").onchange = e => { fi = +e.target.value; load(); };
      q(el, "#fcStep").onclick = () => step();
      q(el, "#fcRun").onclick = () => { let guard = 0; while (step() && guard++ < 400) {} };
      q(el, "#fcReset").onclick = reset;
      q(el, "#fcIn").onchange = reset;

      function load() {
        const fc = FLOWCHARTS[fi];
        q(el, "#fcAbout").textContent = fc.about;
        q(el, "#fcIn").value = fc.inputs.join(", ");
        reset();
      }
      load();
    }
  };

  return { convert, binlab, runner, scenario, filesize, charcodes, parity, fde, journey, logic, flowchart, sql, trace, threats, drill };
})();
