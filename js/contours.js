/* Draws a topographic contour pattern for the home page hero.
   A smooth height field is built from a handful of gaussian hills, then
   marching squares traces the iso-lines, exactly as a real contour map does. */
(function (G) {
  'use strict';

  function field(hills, x, y) {
    var h = 0;
    for (var i = 0; i < hills.length; i++) {
      var d = hills[i];
      var dx = x - d.x, dy = y - d.y;
      h += d.a * Math.exp(-(dx * dx + dy * dy) / (2 * d.r * d.r));
    }
    return h;
  }

  /* Linear interpolation along a cell edge, so lines are smooth rather than blocky. */
  function lerp(p1, p2, v1, v2, level) {
    var t = (level - v1) / (v2 - v1);
    return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t];
  }

  function traceLevel(ctx, grid, cols, rows, step, level) {
    for (var r = 0; r < rows - 1; r++) {
      for (var c = 0; c < cols - 1; c++) {
        var tl = grid[r * cols + c];
        var tr = grid[r * cols + c + 1];
        var br = grid[(r + 1) * cols + c + 1];
        var bl = grid[(r + 1) * cols + c];

        var idx = (tl > level ? 8 : 0) | (tr > level ? 4 : 0) | (br > level ? 2 : 0) | (bl > level ? 1 : 0);
        if (idx === 0 || idx === 15) continue;

        var x = c * step, y = r * step;
        var pTL = [x, y], pTR = [x + step, y], pBR = [x + step, y + step], pBL = [x, y + step];

        var top = lerp(pTL, pTR, tl, tr, level);
        var right = lerp(pTR, pBR, tr, br, level);
        var bottom = lerp(pBL, pBR, bl, br, level);
        var left = lerp(pTL, pBL, tl, bl, level);

        var segs = [];
        switch (idx) {
          case 1: case 14: segs = [[left, bottom]]; break;
          case 2: case 13: segs = [[bottom, right]]; break;
          case 3: case 12: segs = [[left, right]]; break;
          case 4: case 11: segs = [[top, right]]; break;
          case 6: case 9:  segs = [[top, bottom]]; break;
          case 7: case 8:  segs = [[left, top]]; break;
          case 5:          segs = [[left, top], [bottom, right]]; break;
          case 10:         segs = [[left, bottom], [top, right]]; break;
        }
        for (var s = 0; s < segs.length; s++) {
          ctx.moveTo(segs[s][0][0], segs[s][0][1]);
          ctx.lineTo(segs[s][1][0], segs[s][1][1]);
        }
      }
    }
  }

  G.drawContours = function (canvas) {
    var ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return;

    var rect = canvas.getBoundingClientRect();
    var w = Math.max(1, Math.round(rect.width));
    var h = Math.max(1, Math.round(rect.height));
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    /* Fixed hills rather than random ones, so the pattern is the same on every
       visit and does not flicker when the page re-renders. */
    var hills = [
      { x: w * 0.16, y: h * 0.30, r: Math.min(w, h) * 0.42, a: 1.00 },
      { x: w * 0.78, y: h * 0.66, r: Math.min(w, h) * 0.50, a: 0.86 },
      { x: w * 0.52, y: h * 0.12, r: Math.min(w, h) * 0.30, a: 0.55 },
      { x: w * 0.92, y: h * 0.16, r: Math.min(w, h) * 0.26, a: 0.42 },
      { x: w * 0.34, y: h * 0.92, r: Math.min(w, h) * 0.34, a: 0.48 }
    ];

    var step = 7;
    var cols = Math.ceil(w / step) + 1;
    var rows = Math.ceil(h / step) + 1;
    var grid = new Float32Array(cols * rows);
    var max = 0;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var v = field(hills, c * step, r * step);
        grid[r * cols + c] = v;
        if (v > max) max = v;
      }
    }
    if (max <= 0) return;

    var accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--contour').trim() || '#b4561f';

    var levels = 15;
    for (var i = 1; i < levels; i++) {
      var level = (i / levels) * max;
      /* Every fifth line is an index contour, drawn heavier, as on a real map. */
      var index = i % 5 === 0;
      ctx.beginPath();
      ctx.strokeStyle = accent;
      ctx.globalAlpha = index ? 0.42 : 0.2;
      ctx.lineWidth = index ? 1.4 : 0.8;
      traceLevel(ctx, grid, cols, rows, step, level);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

})(window.GEO);
