/* views-tools.js — calculators: break-even, ratios, cash flow, quick formulas */

var V = window.V || {};

V.tools = function () {
  var h = '<div class="eyebrow">Numbers</div><h1>Calculators</h1>' +
    '<p class="lead">Check your practice answers, and see how a change in price or costs moves the result. ' +
    'In the exam you must show the formula and your working — these tools show both.</p>';

  h += '<div class="chips" id="toolTabs">' +
    '<button class="chip" data-t="be" aria-pressed="true">Break-even</button>' +
    '<button class="chip" data-t="ratio" aria-pressed="false">Ratios</button>' +
    '<button class="chip" data-t="cash" aria-pressed="false">Cash flow</button>' +
    '<button class="chip" data-t="quick" aria-pressed="false">Quick formulas</button>' +
    '</div><div id="toolBody"></div>';
  return h;
};

V.afterTools = function (root) {
  var tabs = root.querySelector('#toolTabs');
  var body = root.querySelector('#toolBody');
  var builders = { be: breakEven, ratio: ratios, cash: cashflow, quick: quick };

  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    Array.prototype.forEach.call(tabs.querySelectorAll('.chip'), function (x) {
      x.setAttribute('aria-pressed', String(x === b));
    });
    builders[b.getAttribute('data-t')]();
  });
  breakEven();

  function num(id) {
    var el = body.querySelector('#' + id);
    var v = parseFloat(el.value);
    return isNaN(v) ? 0 : v;
  }
  function field(id, label, val, step) {
    return '<div class="field"><label class="f" for="' + id + '">' + label + '</label>' +
      '<input type="number" id="' + id + '" value="' + val + '" step="' + (step || 'any') + '"/></div>';
  }

  /* ---------------- break-even ---------------- */
  function breakEven() {
    body.innerHTML =
      '<div class="card"><h2 class="mt0">Break-even analysis</h2>' +
      '<div class="grid g3">' +
      field('beFC', 'Fixed costs ($ per period)', 12000) +
      field('bePrice', 'Selling price per unit ($)', 20) +
      field('beVC', 'Variable cost per unit ($)', 8) +
      field('beOut', 'Current output (units)', 1500) +
      '</div><div id="beOutBox"></div><div class="chartwrap" id="beChart"></div></div>' +
      '<div class="callout tip"><span class="clabel">In the exam</span>' +
      '<p>Write it out in three lines: <code>Contribution = price − variable cost</code>, then ' +
      '<code>Break-even = fixed costs ÷ contribution</code>, then the answer with the unit. ' +
      'Method marks are awarded even if the arithmetic slips.</p></div>' +
      '<div class="callout warn"><span class="clabel">Remember the assumptions</span>' +
      '<p>Break-even assumes every unit produced is sold, and that costs and revenue rise in straight lines. ' +
      'In reality bulk discounts, economies of scale and unsold stock all break those assumptions — say so if a question asks for limitations. See [[4.2]].</p></div>';

    ['beFC', 'bePrice', 'beVC', 'beOut'].forEach(function (id) {
      body.querySelector('#' + id).addEventListener('input', calcBE);
    });
    calcBE();

    function calcBE() {
      var fc = num('beFC'), p = num('bePrice'), vc = num('beVC'), out = num('beOut');
      var box = body.querySelector('#beOutBox');
      var contrib = p - vc;
      if (contrib <= 0) {
        box.innerHTML = '<div class="callout warn"><span class="clabel">No break-even point</span>' +
          '<p>The variable cost per unit is not below the selling price, so every unit sold makes a loss. ' +
          'The business can never break even at this price — it must raise the price or cut variable costs.</p></div>';
        body.querySelector('#beChart').innerHTML = '';
        return;
      }
      var be = fc / contrib;
      var mos = out - be;
      var profit = contrib * out - fc;
      var rev = p * out, tc = fc + vc * out;

      box.innerHTML = '<div class="out">' +
        'Contribution per unit = $' + p + ' − $' + vc + ' = <b>' + R.money(contrib) + '</b>\n' +
        'Break-even output     = ' + R.money(fc) + ' ÷ ' + R.money(contrib) + ' = <b>' + Math.ceil(be).toLocaleString() + ' units</b>' +
        (be % 1 ? '  (' + (Math.round(be * 100) / 100) + ' exactly — always round UP to the next whole unit)' : '') + '\n' +
        'Break-even revenue    = ' + Math.ceil(be).toLocaleString() + ' × ' + R.money(p) + ' = <b>' + R.money(Math.ceil(be) * p) + '</b>\n' +
        '\nAt an output of ' + out.toLocaleString() + ' units:\n' +
        '  Total revenue  = <b>' + R.money(rev) + '</b>\n' +
        '  Total costs    = ' + R.money(fc) + ' + (' + R.money(vc) + ' × ' + out.toLocaleString() + ') = <b>' + R.money(tc) + '</b>\n' +
        '  Profit         = <b>' + R.money(profit) + '</b>' + (profit < 0 ? '  (a LOSS)' : '') + '\n' +
        '  Margin of safety = ' + out.toLocaleString() + ' − ' + Math.ceil(be).toLocaleString() + ' = <b>' + Math.round(mos).toLocaleString() + ' units</b>' +
        (mos < 0 ? '  (below break-even)' : '') +
        '</div>';

      drawChart(fc, p, vc, be, out);
    }

    function drawChart(fc, p, vc, be, out) {
      var W = 620, H = 340, L = 62, Rr = 26, T = 22, B = 44;
      var maxX = Math.max(be * 1.9, out * 1.25, 10);
      var maxY = Math.max(p * maxX, fc + vc * maxX) * 1.05;
      if (maxY <= 0) return;
      var px = function (x) { return L + (x / maxX) * (W - L - Rr); };
      var py = function (y) { return H - B - (y / maxY) * (H - T - B); };

      var s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Break-even chart">';
      /* grid */
      for (var i = 1; i <= 4; i++) {
        var gy = py(maxY * i / 5);
        s += '<line class="grid" x1="' + L + '" y1="' + gy + '" x2="' + (W - Rr) + '" y2="' + gy + '"/>';
        s += '<text x="' + (L - 7) + '" y="' + (gy + 4) + '" text-anchor="end">' + short(maxY * i / 5) + '</text>';
      }
      /* profit / loss shading */
      s += '<polygon points="' + px(be) + ',' + py(p * be) + ' ' + px(maxX) + ',' + py(p * maxX) + ' ' + px(maxX) + ',' + py(fc + vc * maxX) +
        '" fill="var(--good)" opacity=".16"/>';
      s += '<polygon points="' + px(0) + ',' + py(0) + ' ' + px(be) + ',' + py(p * be) + ' ' + px(0) + ',' + py(fc) +
        '" fill="var(--bad)" opacity=".16"/>';
      /* axes */
      s += '<line class="axis" x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + (H - B) + '"/>';
      s += '<line class="axis" x1="' + L + '" y1="' + (H - B) + '" x2="' + (W - Rr) + '" y2="' + (H - B) + '"/>';
      /* fixed costs */
      s += line(px(0), py(fc), px(maxX), py(fc), 'var(--muted)', '4 4');
      /* total costs */
      s += line(px(0), py(fc), px(maxX), py(fc + vc * maxX), 'var(--bad)');
      /* revenue */
      s += line(px(0), py(0), px(maxX), py(p * maxX), 'var(--accent)');
      /* break-even marker */
      s += '<line class="grid" x1="' + px(be) + '" y1="' + py(p * be) + '" x2="' + px(be) + '" y2="' + (H - B) + '" stroke="var(--text)"/>';
      s += '<circle cx="' + px(be) + '" cy="' + py(p * be) + '" r="5" fill="var(--text)"/>';
      s += '<text x="' + px(be) + '" y="' + (H - B + 16) + '" text-anchor="middle" font-weight="700" fill="var(--text)">' + Math.ceil(be).toLocaleString() + '</text>';
      /* current output marker */
      if (out > 0 && out < maxX) {
        s += '<line class="grid" x1="' + px(out) + '" y1="' + T + '" x2="' + px(out) + '" y2="' + (H - B) + '"/>';
        s += '<text x="' + px(out) + '" y="' + (H - B + 32) + '" text-anchor="middle">output ' + out.toLocaleString() + '</text>';
      }
      /* labels */
      s += '<text x="' + (W - Rr) + '" y="' + (py(p * maxX) + 12) + '" text-anchor="end" fill="var(--accent)">Total revenue</text>';
      s += '<text x="' + (W - Rr) + '" y="' + (py(fc + vc * maxX) - 6) + '" text-anchor="end" fill="var(--bad)">Total costs</text>';
      s += '<text x="' + (L + 6) + '" y="' + (py(fc) - 5) + '">Fixed costs</text>';
      s += '<text x="' + (L - 7) + '" y="' + (H - B + 4) + '" text-anchor="end">0</text>';
      s += '<text x="' + (W / 2) + '" y="' + (H - 6) + '" text-anchor="middle">Output (units)</text>';
      s += '<text transform="translate(14,' + (H / 2) + ') rotate(-90)" text-anchor="middle">Costs and revenue ($)</text>';
      s += '</svg>';
      body.querySelector('#beChart').innerHTML = s;

      function line(x1, y1, x2, y2, col, dash) {
        return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + col +
          '" stroke-width="2.2"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
      }
      function short(n) {
        if (n >= 1e6) return (Math.round(n / 1e5) / 10) + 'm';
        if (n >= 1e3) return Math.round(n / 1e3) + 'k';
        return Math.round(n);
      }
    }
  }

  /* ---------------- ratios ---------------- */
  function ratios() {
    body.innerHTML =
      '<div class="card"><h2 class="mt0">Profitability ratios</h2><div class="grid g3">' +
      field('rRev', 'Revenue ($)', 500000) +
      field('rCos', 'Cost of sales ($)', 300000) +
      field('rExp', 'Expenses / overheads ($)', 120000) +
      field('rCap', 'Capital employed ($)', 450000) +
      '</div><div id="rOut1"></div></div>' +

      '<div class="card"><h2 class="mt0">Liquidity ratios</h2><div class="grid g3">' +
      field('lCA', 'Current assets ($)', 130000) +
      field('lInv', 'Inventory, included above ($)', 60000) +
      field('lCL', 'Current liabilities ($)', 80000) +
      '</div><div id="rOut2"></div></div>' +

      '<div class="callout tip"><span class="clabel">In the exam</span><p>A number on its own scores only the calculation mark. ' +
      'Always follow it with a comparison — better or worse than last year, or than the competitor — and a judgement about what the business should do. See [[5.5]].</p></div>';

    ['rRev', 'rCos', 'rExp', 'rCap', 'lCA', 'lInv', 'lCL'].forEach(function (id) {
      body.querySelector('#' + id).addEventListener('input', calcR);
    });
    calcR();

    function calcR() {
      var rev = num('rRev'), cos = num('rCos'), exp = num('rExp'), cap = num('rCap');
      var gp = rev - cos, np = gp - exp;
      var gpm = rev ? gp / rev * 100 : 0, pm = rev ? np / rev * 100 : 0, roce = cap ? np / cap * 100 : 0;

      body.querySelector('#rOut1').innerHTML = '<div class="out">' +
        'Gross profit = ' + R.money(rev) + ' − ' + R.money(cos) + ' = <b>' + R.money(gp) + '</b>\n' +
        'Profit       = ' + R.money(gp) + ' − ' + R.money(exp) + ' = <b>' + R.money(np) + '</b>\n\n' +
        'Gross profit margin = (' + R.money(gp) + ' ÷ ' + R.money(rev) + ') × 100 = <b>' + R.pct(gpm) + '</b>\n' +
        'Profit margin       = (' + R.money(np) + ' ÷ ' + R.money(rev) + ') × 100 = <b>' + R.pct(pm) + '</b>\n' +
        'ROCE                = (' + R.money(np) + ' ÷ ' + R.money(cap) + ') × 100 = <b>' + R.pct(roce) + '</b>' +
        '</div>' + comment(gpm, pm);

      var ca = num('lCA'), inv = num('lInv'), cl = num('lCL');
      var cr = cl ? ca / cl : 0, at = cl ? (ca - inv) / cl : 0;
      body.querySelector('#rOut2').innerHTML = '<div class="out">' +
        'Current ratio   = ' + R.money(ca) + ' ÷ ' + R.money(cl) + ' = <b>' + rd(cr) + ' : 1</b>\n' +
        'Acid test ratio = (' + R.money(ca) + ' − ' + R.money(inv) + ') ÷ ' + R.money(cl) + ' = <b>' + rd(at) + ' : 1</b>\n' +
        'Working capital = ' + R.money(ca) + ' − ' + R.money(cl) + ' = <b>' + R.money(ca - cl) + '</b>' +
        '</div>' + liqComment(cr, at);

      function rd(n) { return Math.round(n * 100) / 100; }
    }

    function comment(gpm, pm) {
      var gap = gpm - pm;
      var t = '';
      if (gpm > 0 && gap > gpm * 0.55) t = 'The gross margin is healthy but a large share of it is eaten by expenses. The problem is <strong>overheads</strong>, not pricing or the cost of sales.';
      else if (gpm > 0 && gpm < 20) t = 'A low gross margin means the selling price is close to the cost of sales. Look at raising the price or finding cheaper suppliers.';
      else t = 'Direct costs and overheads are both reasonably controlled. Compare with last year and with a competitor before judging.';
      return '<div class="callout"><span class="clabel">What this suggests</span><p>' + t + '</p></div>';
    }
    function liqComment(cr, at) {
      var t;
      if (cr < 1) t = 'A current ratio below 1 : 1 means current liabilities exceed current assets — the business may not be able to pay its short-term debts. This is a serious liquidity warning.';
      else if (cr > 2.5) t = 'A current ratio well above 2 : 1 suggests too much cash sitting idle or too much money tied up in inventory and receivables. That capital could be earning a return elsewhere.';
      else t = 'The current ratio is in the usual safe range of about 1.5 : 1 to 2 : 1.';
      if (at < 0.5) t += ' The acid test is below 0.5 : 1, so without selling inventory the business would struggle badly to pay its creditors.';
      else if (at < 1) t += ' The acid test is below the 1 : 1 guide, so the business depends on selling inventory to meet its short-term debts.';
      return '<div class="callout"><span class="clabel">What this suggests</span><p>' + t + '</p></div>';
    }
  }

  /* ---------------- cash flow ---------------- */
  function cashflow() {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    var h = '<div class="card"><h2 class="mt0">Cash-flow forecast</h2>' +
      '<p class="small">Enter the inflows and outflows for each month. The opening balance carries forward automatically.</p>' +
      '<div class="field" style="max-width:240px"><label class="f" for="cfOpen">Opening balance, month 1 ($)</label>' +
      '<input type="number" id="cfOpen" value="2000"/></div>' +
      '<div class="twrap"><table><thead><tr><th>$</th>' +
      months.map(function (m) { return '<th>' + m + '</th>'; }).join('') + '</tr></thead><tbody>' +
      '<tr><th>Cash inflows</th>' + months.map(function (m, i) {
        return '<td><input type="number" id="in' + i + '" value="' + [14000, 17000, 15000, 16000, 19000, 21000][i] + '"/></td>';
      }).join('') + '</tr>' +
      '<tr><th>Cash outflows</th>' + months.map(function (m, i) {
        return '<td><input type="number" id="out' + i + '" value="' + [13000, 22000, 12500, 15000, 17000, 18000][i] + '"/></td>';
      }).join('') + '</tr>' +
      '</tbody></table></div><div id="cfResult"></div></div>' +
      '<div class="callout tip"><span class="clabel">In the exam</span><p>Work down the columns: total inflows, total outflows, net cash flow, then ' +
      '<code>opening + net = closing</code>. The closing balance of one month is always the opening balance of the next — use that to fill in any missing figure. See [[5.2]].</p></div>';
    body.innerHTML = h;

    var ids = ['cfOpen'];
    months.forEach(function (m, i) { ids.push('in' + i, 'out' + i); });
    ids.forEach(function (id) { body.querySelector('#' + id).addEventListener('input', calcCF); });
    calcCF();

    function calcCF() {
      var open = num('cfOpen'), rows = [], bal = open, worst = null;
      months.forEach(function (m, i) {
        var inn = num('in' + i), o = num('out' + i), net = inn - o;
        var start = bal; bal = start + net;
        rows.push({ m: m, in: inn, out: o, net: net, open: start, close: bal });
        if (worst === null || bal < rows[worst].close) worst = i;
      });

      var h = '<div class="twrap"><table><thead><tr><th>$</th>' +
        rows.map(function (r) { return '<th>' + r.m + '</th>'; }).join('') + '</tr></thead><tbody>' +
        row('Total inflows', function (r) { return R.money(r.in); }) +
        row('Total outflows', function (r) { return R.money(r.out); }) +
        row('<strong>Net cash flow</strong>', function (r) { return neg(r.net); }) +
        row('Opening balance', function (r) { return neg(r.open); }) +
        row('<strong>Closing balance</strong>', function (r) { return neg(r.close); }) +
        '</tbody></table></div>';

      var negs = rows.filter(function (r) { return r.close < 0; });
      if (negs.length) {
        h += '<div class="callout warn"><span class="clabel">Cash shortage</span><p>The closing balance is negative in <strong>' +
          negs.map(function (r) { return r.m; }).join(', ') + '</strong>, with the worst point at ' +
          R.money(rows[worst].close) + ' in ' + rows[worst].m + '. The business needs to arrange an overdraft <em>before</em> then, ' +
          'delay a large outflow into a stronger month, negotiate longer credit from suppliers, or speed up payments from customers.</p></div>';
      } else {
        h += '<div class="callout eg"><span class="clabel">Healthy</span><p>The closing balance stays positive all six months, ending at ' +
          R.money(rows[rows.length - 1].close) + '. The lowest point is ' + R.money(rows[worst].close) + ' in ' + rows[worst].m +
          ' — that is the month with the least margin for error if a customer pays late.</p></div>';
      }
      body.querySelector('#cfResult').innerHTML = h;

      function row(label, f) {
        return '<tr><th>' + label + '</th>' + rows.map(function (r) { return '<td>' + f(r) + '</td>'; }).join('') + '</tr>';
      }
      function neg(n) {
        return n < 0 ? '<span style="color:var(--bad);font-weight:600">(' + R.money(Math.abs(n)) + ')</span>' : R.money(n);
      }
    }
  }

  /* ---------------- quick formulas ---------------- */
  function quick() {
    body.innerHTML =
      card('Added value', [f('avPrice', 'Selling price ($)', 4.5), f('avMat', 'Bought-in materials ($)', 1.2)], 'avOut') +
      card('Market share', [f('msSales', 'Business sales ($)', 4000000), f('msMarket', 'Total market sales ($)', 50000000)], 'msOut') +
      card('Labour turnover', [f('ltLeft', 'Employees who left', 30), f('ltTotal', 'Average number employed', 200)], 'ltOut') +
      card('Labour productivity', [f('lpOut', 'Total output (units)', 4800), f('lpEmp', 'Number of employees', 40)], 'lpOutBox') +
      card('Price elasticity of demand', [
        f('pedP1', 'Old price ($)', 20), f('pedP2', 'New price ($)', 18),
        f('pedQ1', 'Old quantity', 500), f('pedQ2', 'New quantity', 650)
      ], 'pedOut') +
      '<div class="callout tip"><span class="clabel">Reminder</span><p>Show the formula, the substitution and the answer with its unit. ' +
      'Percentages need a <code>%</code>, money needs a <code>$</code>, and liquidity ratios are written as <code>1.6 : 1</code>, never as a percentage.</p></div>';

    var all = ['avPrice', 'avMat', 'msSales', 'msMarket', 'ltLeft', 'ltTotal', 'lpOut', 'lpEmp', 'pedP1', 'pedP2', 'pedQ1', 'pedQ2'];
    all.forEach(function (id) { body.querySelector('#' + id).addEventListener('input', calcQ); });
    calcQ();

    function f(id, label, val) { return field(id, label, val); }
    function card(title, fields, outId) {
      return '<div class="card"><h3 class="mt0">' + title + '</h3><div class="grid g3">' + fields.join('') +
        '</div><div id="' + outId + '"></div></div>';
    }

    function calcQ() {
      var p = num('avPrice'), m = num('avMat');
      set('avOut', 'Added value = ' + R.money(p) + ' − ' + R.money(m) + ' = <b>' + R.money(p - m) + ' per unit</b>\n' +
        'Remember: this is not profit — wages, rent and other costs still come out of it.');

      var ss = num('msSales'), mk = num('msMarket');
      set('msOut', 'Market share = (' + R.money(ss) + ' ÷ ' + R.money(mk) + ') × 100 = <b>' + (mk ? R.pct(ss / mk * 100) : '—') + '</b>');

      var l = num('ltLeft'), t = num('ltTotal');
      set('ltOut', 'Labour turnover = (' + l + ' ÷ ' + t + ') × 100 = <b>' + (t ? R.pct(l / t * 100) : '—') + '</b>\n' +
        (t && l / t > 0.2 ? 'Above about 20% is high — expect heavy recruitment and training costs, and look at motivation.' : 'A moderate rate. Compare with the industry average before judging.'));

      var o = num('lpOut'), e2 = num('lpEmp');
      set('lpOutBox', 'Labour productivity = ' + o.toLocaleString() + ' ÷ ' + e2 + ' = <b>' +
        (e2 ? (Math.round(o / e2 * 100) / 100).toLocaleString() + ' units per employee' : '—') + '</b>');

      var p1 = num('pedP1'), p2 = num('pedP2'), q1 = num('pedQ1'), q2 = num('pedQ2');
      if (p1 && q1 && p1 !== p2) {
        var dp = (p2 - p1) / p1 * 100, dq = (q2 - q1) / q1 * 100;
        var ped = dq / dp;
        var abs = Math.abs(ped);
        var verdict = abs > 1 ? 'ELASTIC — demand responds strongly to price. To raise revenue, LOWER the price.'
          : abs < 1 ? 'INELASTIC — demand barely responds to price. To raise revenue, RAISE the price.'
            : 'UNIT ELASTIC — revenue is unchanged by a price change.';
        set('pedOut', '% change in price    = (' + p2 + ' − ' + p1 + ') ÷ ' + p1 + ' × 100 = ' + (Math.round(dp * 10) / 10) + '%\n' +
          '% change in quantity = (' + q2 + ' − ' + q1 + ') ÷ ' + q1 + ' × 100 = ' + (Math.round(dq * 10) / 10) + '%\n' +
          'PED = ' + (Math.round(dq * 10) / 10) + ' ÷ ' + (Math.round(dp * 10) / 10) + ' = <b>' + (Math.round(ped * 100) / 100) + '</b>\n\n' +
          '<b>' + verdict + '</b>\n' +
          'Old revenue ' + R.money(p1 * q1) + '  →  new revenue ' + R.money(p2 * q2) +
          '  (' + (p2 * q2 >= p1 * q1 ? 'up' : 'down') + ' ' + R.money(Math.abs(p2 * q2 - p1 * q1)) + ')');
      } else {
        set('pedOut', 'Enter an old and new price that differ, plus the quantities.');
      }

      function set(id, txt) { body.querySelector('#' + id).innerHTML = '<div class="out">' + txt + '</div>'; }
    }
  }
};

window.V = V;
