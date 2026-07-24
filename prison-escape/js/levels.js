/* ============================================================================
 * BLACKGATE — Level data
 * ---------------------------------------------------------------------------
 * Tile legend used in the ASCII maps below:
 *   #  wall            .  floor            (space) void / outer wall
 *   S  player start    X  exit gate        L  locker (hiding spot)
 *   r  red door        g  green door       b  blue door
 *   R  red keycard     G  green keycard    B  blue keycard
 *
 * Enemies are placed separately (they move), each with a patrol route given
 * in TILE coordinates.  Enemy kinds: guard, spark(VOLT), brute(BRUTE),
 * wraith(WRAITH), warden(WARDEN).
 * ==========================================================================*/
window.PE = window.PE || {};
PE.TILE = 40;

PE.LEVELS = [
  {
    name: 'CELL BLOCK D',
    subtitle: 'Lights out. Time to move.',
    objective: 'Grab the red keycard, open the door, reach the exit.',
    map: [
      '#####################',
      '#......#.....#......#',
      '#S.....#.....#......#',
      '#............#......#',
      '#......#.....#......#',
      '#......#.....#......#',
      '#......#.....#......#',
      '#......#..R..r.....X#',
      '#......#.....#......#',
      '#......#.....#......#',
      '#......#.....#......#',
      '#............#......#',
      '#.L....#.....#......#',
      '#......#.....#......#',
      '#####################',
    ],
    enemies: [
      { kind: 'guard', patrol: [[10, 3], [10, 11]] },
      { kind: 'brute', patrol: [[17, 2], [17, 12]] },
    ],
  },

  {
    name: 'MAXIMUM SECURITY',
    subtitle: 'Two keycards. Two very bad roommates.',
    objective: 'Collect both keycards. Avoid VOLT and WRAITH. Reach the exit.',
    map: [
      '###########################',
      '#.....#.....#.....#.......#',
      '#.....#.....#.....#.......#',
      '#.L.........#...L.#.......#',
      '#.....#.....#.....#.......#',
      '#.....#.....#.....#...#...#',
      '#.....#.....#.....#...#...#',
      '#.....#.....#.....#.......#',
      '#S....#..R..r..B..b.....X.#',
      '#.....#.....#.....#.......#',
      '#.....#.....#.....#...#...#',
      '#.....#.....#.....#...#...#',
      '#.L...#.....#.....#.......#',
      '#...........#.....#.......#',
      '#.....#.....#.....#.......#',
      '#.....#.....#.....#.......#',
      '###########################',
    ],
    enemies: [
      { kind: 'guard', patrol: [[9, 2], [9, 14]] },
      { kind: 'spark', patrol: [[8, 5], [10, 11]] },
      { kind: 'guard', patrol: [[15, 3], [15, 13]] },
      { kind: 'wraith', patrol: [[14, 4], [16, 12]] },
      { kind: 'brute', patrol: [[21, 2], [21, 14]] },
    ],
  },

  {
    name: 'THE GATE',
    subtitle: 'One wall between you and the sky. And the WARDEN.',
    objective: 'Three keycards to open the way. Slip past the WARDEN. Get out.',
    map: [
      '###############################',
      '#.....#.....#.....#.....#.....#',
      '#.L...#.....#.....#.....#...L.#',
      '#...........#.....#.....#.....#',
      '#.....#.....#.....#.....#.L...#',
      '#.....#.....#.....#.L...#.....#',
      '#.....#.....#.....#.....#.....#',
      '#.....#.....#.....#.....#.....#',
      '#S....#..R..r..G..g..B..b...X.#',
      '#.....#.....#.....#.....#.....#',
      '#.....#.....#.....#.....#.....#',
      '#.....#.....#.....#.L...#.....#',
      '#.L...#.....#..L..#.....#...L.#',
      '#...........#.....#.....#.....#',
      '#.....#.....#.....#.....#.....#',
      '#.....#.....#.....#.....#.....#',
      '###############################',
    ],
    enemies: [
      { kind: 'guard',  patrol: [[9, 2], [9, 14]] },
      { kind: 'spark',  patrol: [[8, 6], [10, 10]] },
      { kind: 'guard',  patrol: [[15, 3], [15, 13]] },
      { kind: 'wraith', patrol: [[14, 5], [16, 11]] },
      { kind: 'brute',  patrol: [[21, 2], [21, 14]] },
      { kind: 'warden', patrol: [[27, 3], [27, 13]] },
      { kind: 'guard',  patrol: [[26, 6], [28, 6]] },
    ],
  },
];

/* --------------------------------------------------------------------------
 * Level model: parses an ASCII map into a queryable grid + entity lists.
 * ------------------------------------------------------------------------*/
PE.Level = class Level {
  constructor(def) {
    this.def = def;
    this.name = def.name;
    this.rows = def.map.slice();
    this.H = this.rows.length;
    this.W = Math.max(...this.rows.map((r) => r.length));
    this.t = [];          // tile type grid: 'wall'|'floor'|'door'|'exit'|'locker'
    this.doorColor = [];   // color per door tile
    this.keys = [];        // {tx,ty,color,x,y,bob}
    this.lockers = [];     // {tx,ty,x,y}
    this.start = { tx: 1, ty: 1 };
    this.exit = { tx: 1, ty: 1 };

    for (let y = 0; y < this.H; y++) {
      const trow = [];
      const drow = [];
      for (let x = 0; x < this.W; x++) {
        const ch = this.rows[y][x] || '#';
        let type = 'wall';
        let color = null;
        switch (ch) {
          case '.': type = 'floor'; break;
          case ' ': type = 'wall'; break;
          case '#': type = 'wall'; break;
          case 'S': type = 'floor'; this.start = { tx: x, ty: y }; break;
          case 'X': type = 'exit'; this.exit = { tx: x, ty: y }; break;
          case 'L':
            type = 'locker';
            this.lockers.push({ tx: x, ty: y, x: x * PE.TILE + PE.TILE / 2, y: y * PE.TILE + PE.TILE / 2 });
            break;
          case 'r': case 'g': case 'b':
            type = 'door';
            color = ch === 'r' ? 'red' : ch === 'g' ? 'green' : 'blue';
            break;
          case 'R': case 'G': case 'B': {
            type = 'floor';
            const kc = ch === 'R' ? 'red' : ch === 'G' ? 'green' : 'blue';
            this.keys.push({ tx: x, ty: y, color: kc, x: x * PE.TILE + PE.TILE / 2, y: y * PE.TILE + PE.TILE / 2, bob: Math.random() * 6.28 });
            break;
          }
          default: type = 'floor';
        }
        trow.push(type);
        drow.push(color);
      }
      this.t.push(trow);
      this.doorColor.push(drow);
    }

    this.keysTotal = this.keys.length;
    this.pxW = this.W * PE.TILE;
    this.pxH = this.H * PE.TILE;
  }

  inBounds(tx, ty) { return tx >= 0 && ty >= 0 && tx < this.W && ty < this.H; }
  type(tx, ty) { return this.inBounds(tx, ty) ? this.t[ty][tx] : 'wall'; }

  blocksPlayer(tx, ty, player) {
    if (!this.inBounds(tx, ty)) return true;
    const t = this.t[ty][tx];
    if (t === 'wall' || t === 'locker') return true;
    if (t === 'door') return !(player && player.hasKey(this.doorColor[ty][tx]));
    return false;
  }
  blocksEnemy(tx, ty) {
    if (!this.inBounds(tx, ty)) return true;
    const t = this.t[ty][tx];
    return t === 'wall' || t === 'door' || t === 'locker';
  }
  blocksSight(tx, ty) {
    if (!this.inBounds(tx, ty)) return true;
    const t = this.t[ty][tx];
    return t === 'wall' || t === 'door' || t === 'locker';
  }

  /* Grid raycast: true if nothing opaque sits between the two points. */
  lineOfSight(x0, y0, x1, y1) {
    const dx = x1 - x0, dy = y1 - y0;
    const dist = Math.hypot(dx, dy);
    const step = PE.TILE * 0.28;
    const n = Math.ceil(dist / step);
    for (let i = 1; i < n; i++) {
      const t = i / n;
      const px = x0 + dx * t, py = y0 + dy * t;
      if (this.blocksSight(Math.floor(px / PE.TILE), Math.floor(py / PE.TILE))) return false;
    }
    return true;
  }

  /* Multi-key flood check that keys/doors actually let you reach the exit. */
  isSolvable() {
    const have = new Set();
    for (let pass = 0; pass < 8; pass++) {
      const seen = Array.from({ length: this.H }, () => new Array(this.W).fill(false));
      const q = [[this.start.tx, this.start.ty]];
      seen[this.start.ty][this.start.tx] = true;
      let reachedExit = false;
      let gotNew = false;
      while (q.length) {
        const [x, y] = q.pop();
        const t = this.t[y][x];
        if (t === 'exit') reachedExit = true;
        const k = this.keys.find((kk) => kk.tx === x && kk.ty === y);
        if (k && !have.has(k.color)) { have.add(k.color); gotNew = true; }
        for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
          if (!this.inBounds(nx, ny) || seen[ny][nx]) continue;
          const nt = this.t[ny][nx];
          if (nt === 'wall' || nt === 'locker') continue;
          if (nt === 'door' && !have.has(this.doorColor[ny][nx])) continue;
          seen[ny][nx] = true;
          q.push([nx, ny]);
        }
      }
      if (reachedExit && have.size >= this.keysTotal) return true;
      if (!gotNew) return reachedExit && have.size >= this.keysTotal;
    }
    return false;
  }
};

/* Dev-time sanity check (rectangular maps + solvability). Safe in browser+node. */
PE.validateLevels = function validateLevels(log) {
  log = log || (typeof console !== 'undefined' ? console.log : function () {});
  let ok = true;
  PE.LEVELS.forEach((def, i) => {
    const widths = def.map.map((r) => r.length);
    const uniform = widths.every((w) => w === widths[0]);
    const lvl = new PE.Level(def);
    const solvable = lvl.isSolvable();
    if (!uniform) { ok = false; log(`Level ${i} "${def.name}": rows not uniform width -> ${widths.join(',')}`); }
    if (!solvable) { ok = false; log(`Level ${i} "${def.name}": NOT solvable (keys/doors/exit unreachable)`); }
    // door/key colour balance
    const doorColors = new Set();
    lvl.t.forEach((row, y) => row.forEach((t, x) => { if (t === 'door') doorColors.add(lvl.doorColor[y][x]); }));
    doorColors.forEach((c) => {
      if (!lvl.keys.some((k) => k.color === c)) { ok = false; log(`Level ${i}: door colour "${c}" has no matching key`); }
    });
    log(`Level ${i} "${def.name}": ${uniform ? 'uniform' : 'RAGGED'}, ${solvable ? 'solvable' : 'UNSOLVABLE'}, keys=${lvl.keysTotal}, lockers=${lvl.lockers.length}`);
  });
  return ok;
};
