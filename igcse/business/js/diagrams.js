/* diagrams.js — theme-aware inline SVG for the diagrams you can be asked to draw
   or interpret. Every diagram uses CSS custom properties so it works in both
   light and dark themes. Used from note bodies as { diagram: 'plc' }.         */

var DIA = (function () {

  function wrap(vb, inner, caption) {
    return '<figure class="dia"><svg class="chart" viewBox="' + vb + '" role="img" aria-label="' +
      String(caption).replace(/"/g, '') + '">' + inner + '</svg>' +
      '<figcaption>' + caption + '</figcaption></figure>';
  }
  function txt(x, y, s, opt) {
    opt = opt || {};
    return '<text x="' + x + '" y="' + y + '"' +
      ' text-anchor="' + (opt.a || 'middle') + '"' +
      ' font-size="' + (opt.s || 11) + '"' +
      ' font-weight="' + (opt.w || 400) + '"' +
      (opt.f ? ' fill="' + opt.f + '"' : '') +
      (opt.r ? ' transform="rotate(' + opt.r + ' ' + x + ' ' + y + ')"' : '') +
      '>' + s + '</text>';
  }
  function ln(x1, y1, x2, y2, col, w, dash) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
      '" stroke="' + (col || 'var(--border)') + '" stroke-width="' + (w || 1) + '"' +
      (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  }
  function path(d, col, w, dash) {
    return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2.4) + '"' +
      (dash ? ' stroke-dasharray="' + dash + '"' : '') + ' stroke-linecap="round"/>';
  }
  function box(x, y, w, h, label, opt) {
    opt = opt || {};
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
      '" rx="7" fill="' + (opt.fill || 'var(--surface-2)') + '" stroke="' + (opt.stroke || 'var(--border)') +
      '" stroke-width="1.2"/>' +
      label.split('\n').map(function (l, i, arr) {
        return txt(x + w / 2, y + h / 2 + 4 + (i - (arr.length - 1) / 2) * 13, l, { s: opt.s || 11.5, w: opt.w || 600 });
      }).join('');
  }
  function arrow(x1, y1, x2, y2) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
      '" stroke="var(--muted)" stroke-width="1.6" marker-end="url(#ah)"/>';
  }
  var DEFS = '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">' +
    '<path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>';

  var D = {};

  /* ---------- 1.1 inputs → process → outputs ---------- */
  D.transformation = function () {
    var s = DEFS;
    s += box(14, 34, 150, 76, 'INPUTS', { fill: 'var(--accent-soft)', stroke: 'var(--accent)', w: 700 });
    s += txt(89, 74, 'land · labour', { s: 10.5 });
    s += txt(89, 88, 'capital · enterprise', { s: 10.5 });
    s += box(225, 34, 150, 76, 'PROCESS', { fill: 'var(--surface-2)', w: 700 });
    s += txt(300, 74, 'manufacturing,', { s: 10.5 });
    s += txt(300, 88, 'assembling, serving', { s: 10.5 });
    s += box(436, 34, 150, 76, 'OUTPUTS', { fill: 'var(--good-soft)', stroke: 'var(--good)', w: 700 });
    s += txt(511, 74, 'goods and', { s: 10.5 });
    s += txt(511, 88, 'services', { s: 10.5 });
    s += arrow(170, 72, 219, 72) + arrow(381, 72, 430, 72);
    s += txt(300, 132, 'Value is added at the process stage — that is what the business is paid for', { s: 10.5, f: 'var(--muted)' });
    return wrap('0 0 600 150', s, 'Every business is a transformation process: it buys inputs, changes them, and sells the output for more than the materials cost.');
  };

  /* ---------- 2.1 Maslow ---------- */
  D.maslow = function () {
    var s = '', levels = [
      ['Self-actualisation', 'challenging work, promotion, creativity', 'var(--tip)'],
      ['Esteem', 'praise, recognition, job title, status', 'var(--accent)'],
      ['Social', 'teamwork, belonging, communication', 'var(--good)'],
      ['Safety', 'job security, safe conditions, permanent contract', 'var(--warn)'],
      ['Physical', 'enough pay for food, shelter and warmth', 'var(--bad)']
    ];
    var cx = 215, top = 16, bot = 250, halfBase = 165;
    for (var i = 0; i < 5; i++) {
      var y1 = top + (bot - top) * i / 5, y2 = top + (bot - top) * (i + 1) / 5;
      var w1 = halfBase * (i / 5), w2 = halfBase * ((i + 1) / 5);
      s += '<polygon points="' + (cx - w1) + ',' + y1 + ' ' + (cx + w1) + ',' + y1 + ' ' +
        (cx + w2) + ',' + y2 + ' ' + (cx - w2) + ',' + y2 + '" fill="' + levels[i][2] +
        '" opacity="' + (0.14 + i * 0.04) + '" stroke="' + levels[i][2] + '" stroke-width="1.3"/>';
      s += txt(cx, (y1 + y2) / 2 + 1, levels[i][0], { s: 12, w: 700 });
      s += txt(400, (y1 + y2) / 2 + 4, levels[i][1], { a: 'start', s: 10.5, f: 'var(--muted)' });
      s += ln(cx + w2 + 4, (y1 + y2) / 2, 394, (y1 + y2) / 2, 'var(--border)', 1, '3 3');
    }
    s += txt(30, 30, 'satisfied last', { a: 'start', s: 10, f: 'var(--muted)' });
    s += txt(30, 244, 'satisfied first', { a: 'start', s: 10, f: 'var(--muted)' });
    return wrap('0 0 690 262', s, 'Maslow: a need only motivates until it is satisfied, then the person moves up. Match each level to something the business actually provides.');
  };

  /* ---------- 2.2 tall vs flat ---------- */
  D.structures = function () {
    var s = DEFS;
    function node(x, y, w) { return '<rect x="' + x + '" y="' + y + '" width="' + (w || 34) + '" height="17" rx="4" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.1"/>'; }
    /* tall: 1 - 2 - 4 - 8 */
    s += txt(150, 16, 'TALL — narrow span, long chain', { s: 12, w: 700 });
    var rows = [[1, 30], [2, 62], [4, 94], [8, 126]];
    rows.forEach(function (r, ri) {
      var n = r[0], y = r[1], gapw = 280 / n;
      for (var i = 0; i < n; i++) {
        var x = 12 + gapw * i + gapw / 2 - 17;
        s += node(x, y, 34);
        if (ri > 0) {
          var pn = rows[ri - 1][0], pgap = 280 / pn, pi = Math.floor(i / (n / pn));
          var pxc = 12 + pgap * pi + pgap / 2;
          s += ln(pxc, rows[ri - 1][1] + 17, x + 17, y, 'var(--border)', 1.2);
        }
      }
    });
    s += txt(150, 162, '4 levels · span of 2 · slow, distorted communication', { s: 10.5, f: 'var(--muted)' });

    /* flat: 1 - 8 */
    s += txt(460, 16, 'FLAT — wide span, short chain', { s: 12, w: 700 });
    s += node(443, 46, 34);
    for (var j = 0; j < 8; j++) {
      var fx = 322 + (280 / 8) * j + (280 / 8) / 2 - 17;
      s += node(fx, 110, 34);
      s += ln(460, 63, fx + 17, 110, 'var(--border)', 1.2);
    }
    s += txt(460, 162, '2 levels · span of 8 · fast, but managers stretched', { s: 10.5, f: 'var(--muted)' });
    s += ln(305, 8, 305, 172, 'var(--border)', 1, '4 4');
    return wrap('0 0 620 176', s, 'The same eight workers, two structures. Delayering turns the left into the right: cheaper and faster, but each manager now supervises eight people instead of two.');
  };

  /* ---------- 3.3 product life cycle ---------- */
  D.plc = function () {
    var s = DEFS, L = 58, Rr = 22, W = 660, H = 350;
    var x0 = L, x1 = W - Rr;
    var top = 26;          /* top of the plot area          */
    var zero = 236;        /* the zero line for BOTH curves */
    var lossBot = 288;     /* bottom of the loss zone       */

    /* stage bands */
    var stages = [
      ['Development', 0, 0.14], ['Introduction', 0.14, 0.30],
      ['Growth', 0.30, 0.50], ['Maturity', 0.50, 0.79], ['Decline', 0.79, 1]
    ];
    stages.forEach(function (st, i) {
      var a = x0 + (x1 - x0) * st[1], b = x0 + (x1 - x0) * st[2];
      if (i % 2 === 0) s += '<rect x="' + a + '" y="' + top + '" width="' + (b - a) + '" height="' + (lossBot - top) + '" fill="var(--surface-2)" opacity=".6"/>';
      if (i) s += ln(a, top, a, lossBot, 'var(--border)', 1, '3 3');
      s += txt((a + b) / 2, lossBot + 17, st[0], { s: 11, w: 700 });
    });

    /* loss zone below the zero line */
    s += '<rect x="' + x0 + '" y="' + zero + '" width="' + (x1 - x0) + '" height="' + (lossBot - zero) + '" fill="var(--bad)" opacity=".10"/>';
    s += txt(x0 + 26, lossBot - 8, 'LOSS', { a: 'start', s: 10, w: 800, f: 'var(--bad)' });

    var f = (x1 - x0) / 560; /* horizontal scale factor */
    function X(u) { return x0 + u * f; }

    /* sales: zero through development, slow rise, steep growth, plateau, decline */
    s += path('M' + X(0) + ',' + zero +
      ' L' + X(78) + ',' + zero +
      ' C' + X(108) + ',' + (zero - 8) + ' ' + X(138) + ',' + (zero - 30) + ' ' + X(172) + ',' + (zero - 60) +
      ' C' + X(212) + ',' + (zero - 96) + ' ' + X(252) + ',' + (zero - 158) + ' ' + X(300) + ',' + (zero - 180) +
      ' C' + X(354) + ',' + (zero - 202) + ' ' + X(412) + ',' + (zero - 200) + ' ' + X(450) + ',' + (zero - 188) +
      ' C' + X(490) + ',' + (zero - 176) + ' ' + X(524) + ',' + (zero - 118) + ' ' + X(558) + ',' + (zero - 66),
      'var(--accent)', 2.8);

    /* profit: negative through development and introduction, crosses zero in growth,
       peaks in maturity, falls back to a loss in decline */
    s += path('M' + X(0) + ',' + (zero + 16) +
      ' C' + X(34) + ',' + (zero + 34) + ' ' + X(62) + ',' + (zero + 44) + ' ' + X(96) + ',' + (zero + 42) +
      ' C' + X(128) + ',' + (zero + 40) + ' ' + X(150) + ',' + (zero + 24) + ' ' + X(178) + ',' + zero +
      ' C' + X(226) + ',' + (zero - 40) + ' ' + X(276) + ',' + (zero - 96) + ' ' + X(340) + ',' + (zero - 112) +
      ' C' + X(400) + ',' + (zero - 126) + ' ' + X(440) + ',' + (zero - 110) + ' ' + X(472) + ',' + (zero - 80) +
      ' C' + X(508) + ',' + (zero - 46) + ' ' + X(534) + ',' + (zero - 4) + ' ' + X(558) + ',' + (zero + 26),
      'var(--good)', 2.6);

    /* zero-crossing marker for the profit curve */
    s += '<circle cx="' + X(178) + '" cy="' + zero + '" r="4.5" fill="var(--good)"/>';
    s += txt(X(178) + 8, zero + 17, 'profit turns positive', { a: 'start', s: 9.5, w: 600, f: 'var(--good)' });

    /* axes */
    s += ln(x0, top, x0, lossBot, 'var(--border)', 1.4);
    s += ln(x0, zero, x1, zero, 'var(--border)', 1.6);
    s += txt(x0 - 8, zero + 4, '0', { a: 'end', s: 11, w: 700, f: 'var(--muted)' });
    s += txt((x0 + x1) / 2, H - 8, 'Time', { s: 11.5, w: 600 });
    s += txt(16, (top + lossBot) / 2, 'Sales and profit ($)', { s: 11.5, w: 600, r: -90 });

    /* curve labels */
    s += txt(X(318), zero - 194, 'SALES', { s: 12, w: 800, f: 'var(--accent)' });
    s += txt(X(346), zero - 122, 'PROFIT', { s: 12, w: 800, f: 'var(--good)' });
    return wrap('0 0 660 350', s,
      'Sales and profit are two different curves, and profit lags behind. Profit is negative right through development and introduction — the launch costs have not been recovered — crosses zero during growth, peaks at maturity, then falls back into loss as the product declines.');
  };

  /* ---------- 3.3 extension strategies ---------- */
  D.extension = function () {
    var s = DEFS, L = 46, T = 20, W = 600, H = 230, y0 = H - 44, x1 = W - 20;
    s += ln(L, T, L, y0, 'var(--border)', 1.4) + ln(L, y0, x1, y0, 'var(--border)', 1.4);
    /* base curve declining */
    s += path('M' + L + ',' + y0 + ' C' + (L + 70) + ',' + (y0 - 20) + ' ' + (L + 120) + ',' + (y0 - 120) + ' ' + (L + 200) + ',' + (y0 - 140) +
      ' C' + (L + 260) + ',' + (y0 - 152) + ' ' + (L + 300) + ',' + (y0 - 148) + ' ' + (L + 330) + ',' + (y0 - 140), 'var(--accent)', 2.6);
    /* without extension: falls away */
    s += path('M' + (L + 330) + ',' + (y0 - 140) + ' C' + (L + 380) + ',' + (y0 - 120) + ' ' + (L + 420) + ',' + (y0 - 50) + ' ' + (L + 470) + ',' + (y0 - 14),
      'var(--muted)', 2.2, '6 5');
    /* with extension: stepped revival */
    s += path('M' + (L + 330) + ',' + (y0 - 140) + ' C' + (L + 360) + ',' + (y0 - 162) + ' ' + (L + 390) + ',' + (y0 - 150) + ' ' + (L + 420) + ',' + (y0 - 158) +
      ' C' + (L + 460) + ',' + (y0 - 168) + ' ' + (L + 490) + ',' + (y0 - 140) + ' ' + (L + 530) + ',' + (y0 - 150), 'var(--good)', 2.8);
    s += '<circle cx="' + (L + 330) + '" cy="' + (y0 - 140) + '" r="4.5" fill="var(--text)"/>';
    s += txt(L + 330, y0 - 152, 'extension strategies applied here', { s: 10, f: 'var(--muted)' });
    s += txt(L + 480, y0 - 172, 'with extension', { s: 11, w: 700, f: 'var(--good)' });
    s += txt(L + 462, y0 - 4, 'without', { s: 11, w: 700, f: 'var(--muted)' });
    s += txt((L + x1) / 2, H - 8, 'Time', { s: 11.5, w: 600 });
    s += txt(14, (T + y0) / 2, 'Sales', { s: 11.5, w: 600, r: -90 });
    return wrap('0 0 600 230', s, 'Extension strategies — new versions, new packaging, new markets, a new campaign or a price cut — hold sales up instead of letting the product slide into decline.');
  };

  /* ---------- 3.3 channels of distribution ---------- */
  D.channels = function () {
    var s = DEFS, rows = [
      ['Producer', 'Consumer'],
      ['Producer', 'Retailer', 'Consumer'],
      ['Producer', 'Wholesaler', 'Retailer', 'Consumer'],
      ['Producer', 'Agent', 'Retailer', 'Consumer']
    ];
    var notes = ['Most control and all the profit — but the producer must sell and deliver itself',
      'Retailer reaches many customers, but takes a margin',
      'Wholesaler breaks bulk and holds stock — two margins taken',
      'Used to sell abroad: local knowledge and contacts, paid by commission'];
    rows.forEach(function (r, ri) {
      var y = 14 + ri * 62;
      var bw = 92, gap = 34;
      r.forEach(function (label, i) {
        var x = 12 + i * (bw + gap);
        var isEnd = (i === r.length - 1);
        s += box(x, y, bw, 30, label, {
          fill: i === 0 ? 'var(--accent-soft)' : isEnd ? 'var(--good-soft)' : 'var(--surface-2)',
          stroke: i === 0 ? 'var(--accent)' : isEnd ? 'var(--good)' : 'var(--border)', s: 11
        });
        if (i) s += arrow(x - gap + 2, y + 15, x - 4, y + 15);
      });
      s += txt(12, y + 48, notes[ri], { a: 'start', s: 10, f: 'var(--muted)' });
    });
    return wrap('0 0 520 262', s, 'The more intermediaries, the wider the reach but the less control the producer keeps and the more margin it gives away.');
  };

  /* ---------- 4.2 break-even (generic, labelled) ---------- */
  D.breakeven = function () {
    var s = DEFS, L = 62, Rr = 130, T = 20, B = 46, W = 620, H = 300;
    var x0 = L, x1 = W - Rr, y0 = H - B;
    var fcY = y0 - 52, tcEnd = y0 - 150, trEnd = y0 - 240;
    /* intersection of TR (0,y0)->(x1,trEnd) and TC (0,fcY)->(x1,tcEnd) */
    var mTR = (trEnd - y0) / (x1 - x0), mTC = (tcEnd - fcY) / (x1 - x0);
    var bx = x0 + (fcY - y0) / (mTR - mTC), by = y0 + mTR * (bx - x0);

    s += '<polygon points="' + bx + ',' + by + ' ' + x1 + ',' + trEnd + ' ' + x1 + ',' + tcEnd + '" fill="var(--good)" opacity=".17"/>';
    s += '<polygon points="' + x0 + ',' + y0 + ' ' + bx + ',' + by + ' ' + x0 + ',' + fcY + '" fill="var(--bad)" opacity=".17"/>';
    s += txt((bx + x1) / 2 + 10, (trEnd + tcEnd) / 2 + 4, 'PROFIT', { s: 11.5, w: 800, f: 'var(--good)' });
    s += txt(x0 + 44, (y0 + fcY) / 2 + 12, 'LOSS', { s: 11.5, w: 800, f: 'var(--bad)' });

    s += ln(x0, fcY, x1, fcY, 'var(--muted)', 2, '5 4');
    s += path('M' + x0 + ',' + fcY + ' L' + x1 + ',' + tcEnd, 'var(--bad)', 2.6);
    s += path('M' + x0 + ',' + y0 + ' L' + x1 + ',' + trEnd, 'var(--accent)', 2.6);

    s += ln(x0, T, x0, y0, 'var(--border)', 1.4) + ln(x0, y0, x1, y0, 'var(--border)', 1.4);
    s += ln(bx, by, bx, y0, 'var(--text)', 1.2, '3 3');
    s += '<circle cx="' + bx + '" cy="' + by + '" r="5" fill="var(--text)"/>';
    s += txt(bx, y0 + 16, 'break-even output', { s: 10.5, w: 700 });

    s += txt(x1 + 6, trEnd + 4, 'Total revenue', { a: 'start', s: 11, w: 700, f: 'var(--accent)' });
    s += txt(x1 + 6, tcEnd + 4, 'Total costs', { a: 'start', s: 11, w: 700, f: 'var(--bad)' });
    s += txt(x1 + 6, fcY + 4, 'Fixed costs', { a: 'start', s: 11, w: 700, f: 'var(--muted)' });
    s += txt(x0 - 8, y0 + 4, '0', { a: 'end', s: 10, f: 'var(--muted)' });
    s += txt((x0 + x1) / 2, H - 8, 'Output (units)', { s: 11.5, w: 600 });
    s += txt(16, (T + y0) / 2, 'Costs and revenue ($)', { s: 11.5, w: 600, r: -90 });

    /* margin of safety */
    var mx = x0 + (x1 - x0) * 0.82;
    s += ln(mx, T + 6, mx, y0, 'var(--border)', 1, '3 3');
    s += txt(mx, T + 2, 'current output', { s: 9.5, f: 'var(--muted)' });
    s += '<line x1="' + bx + '" y1="' + (y0 - 10) + '" x2="' + mx + '" y2="' + (y0 - 10) + '" stroke="var(--warn)" stroke-width="2" marker-end="url(#ah)"/>';
    s += txt((bx + mx) / 2, y0 - 15, 'margin of safety', { s: 9.5, w: 700, f: 'var(--warn)' });
    return wrap('0 0 620 300', s, 'The two starting points examiners look for: total revenue starts at the ORIGIN, total costs start at the level of FIXED COSTS.');
  };

  /* ---------- 4.2 average cost curve ---------- */
  D.avgcost = function () {
    var s = DEFS, L = 56, T = 20, W = 580, H = 260, y0 = H - 46, x1 = W - 24;
    var minX = L + (x1 - L) * 0.52, minY = y0 - 62;
    s += path('M' + (L + 14) + ',' + (y0 - 190) + ' C' + (L + 90) + ',' + (y0 - 110) + ' ' + (minX - 70) + ',' + minY + ' ' + minX + ',' + minY +
      ' C' + (minX + 80) + ',' + minY + ' ' + (x1 - 70) + ',' + (y0 - 108) + ' ' + (x1 - 8) + ',' + (y0 - 178), 'var(--accent)', 2.8);
    s += ln(L, T, L, y0, 'var(--border)', 1.4) + ln(L, y0, x1, y0, 'var(--border)', 1.4);
    s += ln(minX, minY, minX, y0, 'var(--border)', 1.2, '3 3');
    s += ln(L, minY, minX, minY, 'var(--border)', 1.2, '3 3');
    s += '<circle cx="' + minX + '" cy="' + minY + '" r="5" fill="var(--text)"/>';
    s += txt(minX, y0 + 17, 'optimum output', { s: 10.5, w: 700 });
    s += txt(L - 8, minY + 4, 'lowest', { a: 'end', s: 10, f: 'var(--muted)' });

    s += '<line x1="' + (L + 26) + '" y1="' + (y0 - 210) + '" x2="' + (minX - 20) + '" y2="' + (y0 - 210) + '" stroke="var(--good)" stroke-width="2" marker-end="url(#ah)"/>';
    s += txt((L + minX) / 2, y0 - 216, 'ECONOMIES OF SCALE — unit cost falling', { s: 10.5, w: 700, f: 'var(--good)' });
    s += '<line x1="' + (minX + 20) + '" y1="' + (y0 - 210) + '" x2="' + (x1 - 14) + '" y2="' + (y0 - 210) + '" stroke="var(--bad)" stroke-width="2" marker-end="url(#ah)"/>';
    s += txt((minX + x1) / 2, y0 - 216, 'DISECONOMIES — unit cost rising', { s: 10.5, w: 700, f: 'var(--bad)' });

    s += txt((L + x1) / 2, H - 8, 'Output (units)', { s: 11.5, w: 600 });
    s += txt(16, (T + y0) / 2, 'Average cost per unit ($)', { s: 11.5, w: 600, r: -90 });
    return wrap('0 0 580 260', s, 'Growth only cuts unit costs up to a point. Past the optimum, poor communication and coordination push average cost back up.');
  };

  /* ---------- 6.1 business cycle ---------- */
  D.cycle = function () {
    var s = DEFS, L = 56, T = 22, W = 620, H = 250, y0 = H - 44, x1 = W - 20;
    var mid = (T + y0) / 2;
    /* trend line */
    s += ln(L, mid + 34, x1, mid - 40, 'var(--muted)', 1.4, '6 5');
    s += txt(x1 - 4, mid - 46, 'long-run trend', { a: 'end', s: 10, f: 'var(--muted)' });
    /* wave */
    s += path('M' + L + ',' + (mid + 46) +
      ' C' + (L + 60) + ',' + (mid + 10) + ' ' + (L + 80) + ',' + (mid - 44) + ' ' + (L + 140) + ',' + (mid - 48) +
      ' C' + (L + 195) + ',' + (mid - 52) + ' ' + (L + 210) + ',' + (mid + 34) + ' ' + (L + 270) + ',' + (mid + 46) +
      ' C' + (L + 330) + ',' + (mid + 58) + ' ' + (L + 350) + ',' + (mid - 14) + ' ' + (L + 410) + ',' + (mid - 44) +
      ' C' + (L + 470) + ',' + (mid - 74) + ' ' + (L + 490) + ',' + (mid - 4) + ' ' + (x1 - 6) + ',' + (mid - 18),
      'var(--accent)', 2.8);
    s += ln(L, T, L, y0, 'var(--border)', 1.4) + ln(L, y0, x1, y0, 'var(--border)', 1.4);

    function tag(x, y, label, col) {
      return '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="' + col + '"/>' + txt(x, y - 10, label, { s: 10.5, w: 700, f: col });
    }
    s += tag(L + 140, mid - 48, 'BOOM', 'var(--good)');
    s += tag(L + 270, mid + 46, 'SLUMP', 'var(--bad)');
    s += tag(L + 410, mid - 44, 'BOOM', 'var(--good)');
    s += txt(L + 68, mid + 4, 'growth', { s: 10, f: 'var(--muted)', r: -52 });
    s += txt(L + 208, mid + 6, 'recession', { s: 10, f: 'var(--muted)', r: 46 });
    s += txt(L + 340, mid + 22, 'recovery', { s: 10, f: 'var(--muted)', r: -44 });

    s += txt((L + x1) / 2, H - 8, 'Time', { s: 11.5, w: 600 });
    s += txt(16, (T + y0) / 2, 'Real GDP', { s: 11.5, w: 600, r: -90 });
    return wrap('0 0 620 250', s, 'Boom, recession, slump, recovery — around a rising long-run trend. Which stage the economy is in decides whether a business expands or cuts costs.');
  };

  /* ---------- 6.3 exchange rates ---------- */
  D.spiced = function () {
    var s = DEFS;
    s += box(16, 16, 250, 118, '', { fill: 'var(--accent-soft)', stroke: 'var(--accent)' });
    s += txt(141, 40, 'APPRECIATION', { s: 13, w: 800, f: 'var(--accent)' });
    s += txt(141, 57, 'currency stronger', { s: 10.5, f: 'var(--muted)' });
    s += txt(141, 82, 'Imports  CHEAPER', { s: 12, w: 700 });
    s += txt(141, 101, 'Exports  DEARER', { s: 12, w: 700 });
    s += txt(141, 122, 'good for importers · bad for exporters', { s: 9.5, f: 'var(--muted)' });

    s += box(300, 16, 250, 118, '', { fill: 'var(--warn-soft)', stroke: 'var(--warn)' });
    s += txt(425, 40, 'DEPRECIATION', { s: 13, w: 800, f: 'var(--warn)' });
    s += txt(425, 57, 'currency weaker', { s: 10.5, f: 'var(--muted)' });
    s += txt(425, 82, 'Imports  DEARER', { s: 12, w: 700 });
    s += txt(425, 101, 'Exports  CHEAPER', { s: 12, w: 700 });
    s += txt(425, 122, 'good for exporters · bad for importers', { s: 9.5, f: 'var(--muted)' });

    s += box(150, 150, 266, 34, 'S P I C E D', { fill: 'var(--surface-2)', s: 15, w: 800 });
    s += txt(283, 200, 'Strong Pound → Imports Cheap, Exports Dear', { s: 11.5, w: 600, f: 'var(--muted)' });
    return wrap('0 0 566 214', s, 'Write SPICED at the top of the page before you answer any exchange rate question.');
  };

  return {
    render: function (name) {
      return D[name] ? D[name]() : '';
    },
    names: Object.keys(D)
  };
})();
