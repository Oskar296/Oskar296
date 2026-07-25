/* ============================================================================
 * BLACKGATE — Game core: loop, state, rendering, lighting, HUD.
 * ==========================================================================*/
window.PE = window.PE || {};
(function () {
  const TAU = Math.PI * 2;
  const T = () => PE.TILE;
  const { tcx, tcy, clamp } = PE.Entities;

  const COL = {
    bg: '#05070c',
    floorA: '#242b38', floorB: '#20262f', grid: 'rgba(130,150,180,0.05)',
    wall: '#0f141d', wallHi: '#39434f', wallLo: '#05070b',
    player: '#ff9d3c', playerDark: '#b85f14', playerHi: '#ffd39a',
    exitLock: '#e5484d', exitOpen: '#3ad98a',
    door: { red: '#e5484d', green: '#46c26a', blue: '#4a8cf0' },
  };
  const KEYCOL = { red: '#ff5a5f', green: '#4fd07a', blue: '#5aa0ff' };

  const game = {
    /* ---- lifecycle ---------------------------------------------------- */
    init() {
      this.canvas = document.getElementById('game');
      this.ctx = this.canvas.getContext('2d');
      this.light = document.createElement('canvas');
      this.lightCtx = this.light.getContext('2d');
      this.input = PE.Input;
      this.input.initTouch();

      this.state = 'title';
      this.levelIndex = 0;
      this.darkAlpha = 0.52;
      this.time = 0;
      this.particles = [];
      this.camX = 0; this.camY = 0; this.shake = 0;

      this._resize = this.resize.bind(this);
      window.addEventListener('resize', this._resize);
      this.resize();
      this.bindUI();

      let last = performance.now();
      const loop = (ts) => {
        let dt = (ts - last) / 1000; last = ts;
        if (dt > 0.05) dt = 0.05;         // clamp big frame gaps
        this.frame(dt, ts);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    },

    bindUI() {
      const on = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('click', () => { PE.Audio.resume(); PE.Audio.play('ui'); fn(); }); };
      on('btnStart', () => this.startGame());
      on('btnHow', () => this.toggleHelp(true));
      on('btnHelpClose', () => this.toggleHelp(false));
      on('btnRetry', () => this.startLevel(this.levelIndex));
      on('btnMenu', () => this.showTitle());
      on('btnNext', () => this.nextLevel());
      on('btnResume', () => this.setPaused(false));
      on('btnRestart', () => this.startLevel(this.levelIndex));
      on('btnMenu2', () => this.showTitle());
      on('btnPlayAgain', () => { this.levelIndex = 0; this.startGame(); });
      const mute = document.getElementById('btnMute');
      if (mute) mute.addEventListener('click', () => {
        const en = !PE.Audio.isEnabled(); PE.Audio.setEnabled(en);
        mute.textContent = en ? '🔊' : '🔇'; mute.classList.toggle('off', !en);
      });
    },

    resize() {
      this.dpr = Math.min(2, window.devicePixelRatio || 1);
      this.viewW = window.innerWidth;
      this.viewH = window.innerHeight;
      for (const c of [this.canvas, this.light]) {
        c.width = Math.floor(this.viewW * this.dpr);
        c.height = Math.floor(this.viewH * this.dpr);
      }
      this.canvas.style.width = this.viewW + 'px';
      this.canvas.style.height = this.viewH + 'px';
    },

    /* ---- state transitions ------------------------------------------- */
    showTitle() {
      this.state = 'title';
      PE.Audio.stopMusic();
      this.showScreen('titleScreen');
      document.body.classList.remove('playing');
    },
    startGame() { this.levelIndex = 0; this.startLevel(0); },

    startLevel(i) {
      this.levelIndex = i;
      const def = PE.LEVELS[i];
      this.level = new PE.Level(def);
      this.player = new PE.Entities.Player(this.level);
      this.enemies = def.enemies.map((s) => new PE.Entities.Enemy(s, this.level));
      this.keyColors = this.level.keys.map((k) => k.color);
      this.openedDoors = new Set();
      this.suspicion = 0;
      this.particles.length = 0;
      this.shake = 0;
      this.caughtBy = null;
      // snap camera
      this.updateCamera(1);
      this.camX = clamp(this.player.x - this.viewW / 2, 0, Math.max(0, this.level.pxW - this.viewW));
      this.camY = clamp(this.player.y - this.viewH / 2, 0, Math.max(0, this.level.pxH - this.viewH));

      this.state = 'playing';
      this.showScreen(null);
      document.body.classList.add('playing');
      this.setLevelHud(def);
      this.updateKeyHud();
      PE.Audio.resume();
      PE.Audio.startMusic();
      this.showToast(def.name, def.objective);
    },

    nextLevel() {
      if (this.levelIndex + 1 >= PE.LEVELS.length) { this.win(); return; }
      this.startLevel(this.levelIndex + 1);
    },

    levelClear() {
      if (this.state !== 'playing') return;
      if (this.levelIndex + 1 >= PE.LEVELS.length) { this.win(); return; }
      this.state = 'clear';
      PE.Audio.play('win');
      const left = PE.LEVELS.length - this.levelIndex - 1;
      document.getElementById('clearTitle').textContent = 'BLOCK CLEAR';
      document.getElementById('clearBody').textContent =
        `You slipped out of ${PE.LEVELS[this.levelIndex].name}. ${left} block${left === 1 ? '' : 's'} to go.`;
      document.getElementById('btnNext').textContent = 'NEXT BLOCK →';
      this.showScreen('clearScreen');
    },

    win() {
      this.state = 'win';
      PE.Audio.stopMusic();
      PE.Audio.play('win');
      this.showScreen('winScreen');
    },

    onCaught(by) {
      if (this.state !== 'playing') return;
      this.state = 'caught';
      this.suspicion = 100;
      this.caughtBy = by;
      this.shakeAdd(14);
      PE.Audio.play('caught');
      PE.Audio.setTension(0);
      document.getElementById('caughtBody').textContent = by
        ? `${by.name} dragged you back to your cell.`
        : 'The alarm caught up with you.';
      setTimeout(() => { if (this.state === 'caught') this.showScreen('caughtScreen'); }, 550);
    },

    setPaused(v) {
      if (v && this.state === 'playing') { this.state = 'paused'; this.showScreen('pauseScreen'); }
      else if (!v && this.state === 'paused') { this.state = 'playing'; this.showScreen(null); }
    },

    /* ---- per-frame ---------------------------------------------------- */
    frame(dt, ts) {
      if (this.state === 'playing') {
        if (this.input.justPressed('Escape')) { this.setPaused(true); }
        else if (this.input.justPressed('KeyR')) { this.startLevel(this.levelIndex); }
        else this.update(dt);
      } else if (this.state === 'paused') {
        if (this.input.justPressed('Escape')) this.setPaused(false);
      } else if (this.state === 'title') {
        if (this.input.startPressed()) { PE.Audio.resume(); this.startGame(); }
      }
      this.render(ts);
    },

    update(dt) {
      this.time += dt;
      const p = this.player, lvl = this.level;
      p.update(dt, this);

      // pickups
      for (let i = lvl.keys.length - 1; i >= 0; i--) {
        const k = lvl.keys[i];
        if (Math.hypot(k.x - p.x, k.y - p.y) < T() * 0.62) {
          p.keys.add(k.color);
          lvl.keys.splice(i, 1);
          PE.Audio.play('pickup');
          this.spawnPickupBurst(k.x, k.y, KEYCOL[k.color]);
          this.updateKeyHud();
          this.showToast(k.color.toUpperCase() + ' KEYCARD', p.keys.size >= lvl.keysTotal ? 'The exit is unlocked!' : 'Find the rest and reach the exit.');
        }
      }

      // doors opening feedback
      const ptx = Math.floor(p.x / T()), pty = Math.floor(p.y / T());
      for (let ty = pty - 1; ty <= pty + 1; ty++) for (let tx = ptx - 1; tx <= ptx + 1; tx++) {
        if (lvl.type(tx, ty) === 'door' && p.hasKey(lvl.doorColor[ty][tx])) {
          const id = tx + ',' + ty;
          if (!this.openedDoors.has(id)) { this.openedDoors.add(id); PE.Audio.play('door'); this.spawnPickupBurst(tcx(tx), tcy(ty), COL.door[lvl.doorColor[ty][tx]]); }
        }
      }

      // locker hide
      if (this.input.interactPressed() && !p.hidden) {
        let best = null, bd = 1e9;
        for (const l of lvl.lockers) { const d = Math.hypot(l.x - p.x, l.y - p.y); if (d < T() * 0.95 && d < bd) { bd = d; best = l; } }
        if (best) { p.hidden = true; p.x = best.x; p.y = best.y; p.vx = p.vy = 0; PE.Audio.play('hide'); }
      }

      // enemies + detection
      this._sight = { any: false, min: Infinity, susp: 1 };
      for (const e of this.enemies) e.update(dt, this);
      if (this.state !== 'playing') return; // caught inside enemy update
      if (this._sight.any) {
        const prox = 1 - clamp(this._sight.min / 260, 0, 1);
        this.suspicion = clamp(this.suspicion + (46 + 74 * prox) * this._sight.susp * dt, 0, 100);
      } else {
        this.suspicion = clamp(this.suspicion - (p.hidden ? 92 : 46) * dt, 0, 100);
      }
      if (this.suspicion >= 100) { this.onCaught(this._nearestSeer()); return; }
      PE.Audio.setTension(this.suspicion / 100);

      // exit
      if (p.keys.size >= lvl.keysTotal && Math.hypot(tcx(lvl.exit.tx) - p.x, tcy(lvl.exit.ty) - p.y) < T() * 0.7) { this.levelClear(); return; }

      this.updateParticles(dt);
      this.updateCamera(dt);
      if (this.shake > 0) this.shake = Math.max(0, this.shake - dt * 34);
      this.updateBars();
    },

    _nearestSeer() {
      let best = null, bd = 1e9;
      for (const e of this.enemies) { if (e.alert > 0.4) { const d = Math.hypot(e.x - this.player.x, e.y - this.player.y); if (d < bd) { bd = d; best = e; } } }
      return best;
    },

    reportSighting(dist, susp) { this._sight.any = true; this._sight.min = Math.min(this._sight.min, dist); this._sight.susp = Math.max(this._sight.susp, susp); },
    shakeAdd(v) { this.shake = Math.min(20, this.shake + v); },

    randomFloorNear(x, y, tiles) {
      const lvl = this.level;
      for (let i = 0; i < 14; i++) {
        const tx = Math.floor(x / T()) + (Math.random() * 2 - 1) * tiles | 0;
        const ty = Math.floor(y / T()) + (Math.random() * 2 - 1) * tiles | 0;
        if (!lvl.blocksEnemy(tx, ty)) return { x: tcx(tx), y: tcy(ty) };
      }
      return null;
    },

    updateCamera(dt) {
      const tx = clamp(this.player.x - this.viewW / 2, 0, Math.max(0, this.level.pxW - this.viewW));
      const ty = clamp(this.player.y - this.viewH / 2, 0, Math.max(0, this.level.pxH - this.viewH));
      const s = 1 - Math.exp(-dt * 6);
      this.camX += (tx - this.camX) * s;
      this.camY += (ty - this.camY) * s;
      if (this.level.pxW < this.viewW) this.camX = (this.level.pxW - this.viewW) / 2;
      if (this.level.pxH < this.viewH) this.camY = (this.level.pxH - this.viewH) / 2;
    },

    /* ---- particles ---------------------------------------------------- */
    spawnDust(x, y) { this.push({ type: 'dust', x: x + (Math.random() * 6 - 3), y, vx: (Math.random() * 30 - 15), vy: -(10 + Math.random() * 20), life: 0.4, max: 0.4, size: 2 + Math.random() * 2, color: 'rgba(160,170,185,0.5)' }); },
    spawnSpark(x, y) { this.push({ type: 'spark', x, y, vx: Math.random() * 90 - 45, vy: Math.random() * 90 - 45, life: 0.24, max: 0.24, size: 2, color: '#8af2ff' }); },
    spawnPhase(x, y) { this.push({ type: 'ring', x, y, life: 0.5, max: 0.5, size: 6, color: '#9a54ec' }); },
    spawnBubble(x, y, text, color) { this.push({ type: 'bubble', x, y, vy: -20, life: 1.1, max: 1.1, text, color }); },
    spawnPickupBurst(x, y, color) { for (let i = 0; i < 12; i++) { const a = Math.random() * TAU, s = 40 + Math.random() * 90; this.push({ type: 'spark', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.5, max: 0.5, size: 2 + Math.random() * 2, color }); } },
    push(pt) { this.particles.push(pt); if (this.particles.length > 420) this.particles.splice(0, 60); },
    updateParticles(dt) {
      const a = this.particles;
      for (let i = a.length - 1; i >= 0; i--) {
        const p = a[i]; p.life -= dt;
        if (p.life <= 0) { a.splice(i, 1); continue; }
        if (p.vx) p.x += p.vx * dt;
        if (p.vy) p.y += p.vy * dt;
        if (p.type === 'ring') p.size += dt * 90;
      }
    },

    /* ---- rendering ---------------------------------------------------- */
    render(ts) {
      const ctx = this.ctx, dpr = this.dpr;
      const sx = this.shake ? (Math.random() * 2 - 1) * this.shake : 0;
      const sy = this.shake ? (Math.random() * 2 - 1) * this.shake : 0;
      const ox = -this.camX + sx, oy = -this.camY + sy;
      this.ox = ox; this.oy = oy;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = COL.bg;
      ctx.fillRect(0, 0, this.viewW, this.viewH);

      if (!this.level) { return; }

      ctx.save();
      ctx.translate(ox, oy);
      this.drawFloor(ctx);
      this.drawDoors(ctx);
      this.drawWalls(ctx);
      this.drawItems(ctx);
      this.drawParticles(ctx, 'under');
      this.drawEntities(ctx);
      ctx.restore();

      // darkness with light holes
      this.buildLight();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(this.light, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // colored cone tints + bubbles + prompts on top of darkness
      ctx.save();
      ctx.translate(ox, oy);
      this.drawConeTints(ctx);
      this.drawParticles(ctx, 'over');
      this.drawPrompts(ctx);
      ctx.restore();

      this.drawVignette(ctx);
      this.drawFlash(ctx);
      this.drawMinimap(ctx);
    },

    visTiles() {
      const t = T();
      return {
        x0: Math.max(0, Math.floor(this.camX / t) - 1),
        x1: Math.min(this.level.W - 1, Math.ceil((this.camX + this.viewW) / t) + 1),
        y0: Math.max(0, Math.floor(this.camY / t) - 1),
        y1: Math.min(this.level.H - 1, Math.ceil((this.camY + this.viewH) / t) + 1),
      };
    },

    drawFloor(ctx) {
      const t = T(), v = this.visTiles(), lvl = this.level;
      for (let ty = v.y0; ty <= v.y1; ty++) for (let tx = v.x0; tx <= v.x1; tx++) {
        const type = lvl.t[ty][tx];
        if (type === 'wall') continue;
        ctx.fillStyle = ((tx + ty) & 1) ? COL.floorA : COL.floorB;
        ctx.fillRect(tx * t, ty * t, t, t);
        ctx.strokeStyle = COL.grid;
        ctx.lineWidth = 1;
        ctx.strokeRect(tx * t + 0.5, ty * t + 0.5, t, t);
      }
    },

    drawWalls(ctx) {
      const t = T(), v = this.visTiles(), lvl = this.level;
      for (let ty = v.y0; ty <= v.y1; ty++) for (let tx = v.x0; tx <= v.x1; tx++) {
        if (lvl.t[ty][tx] !== 'wall') continue;
        const x = tx * t, y = ty * t;
        ctx.fillStyle = COL.wall; ctx.fillRect(x, y, t, t);
        ctx.fillStyle = COL.wallHi; ctx.fillRect(x, y, t, 3); ctx.fillRect(x, y, 3, t);
        ctx.fillStyle = COL.wallLo; ctx.fillRect(x, y + t - 3, t, 3); ctx.fillRect(x + t - 3, y, 3, t);
      }
    },

    drawDoors(ctx) {
      const t = T(), v = this.visTiles(), lvl = this.level, p = this.player;
      for (let ty = v.y0; ty <= v.y1; ty++) for (let tx = v.x0; tx <= v.x1; tx++) {
        if (lvl.t[ty][tx] !== 'door') continue;
        const color = lvl.doorColor[ty][tx];
        const open = p.hasKey(color);
        const x = tx * t, y = ty * t, c = COL.door[color];
        ctx.fillStyle = COL.floorB; ctx.fillRect(x, y, t, t);
        if (open) {
          ctx.strokeStyle = c; ctx.globalAlpha = 0.4; ctx.lineWidth = 3;
          ctx.strokeRect(x + 4, y + 4, t - 8, t - 8); ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = c;
          this.roundRect(ctx, x + 5, y + 3, t - 10, t - 6, 4); ctx.fill();
          ctx.fillStyle = 'rgba(0,0,0,0.35)';
          this.roundRect(ctx, x + t / 2 - 4, y + t / 2 - 6, 8, 12, 2); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.85)';
          ctx.beginPath(); ctx.arc(x + t / 2, y + t / 2 - 2, 3, 0, TAU); ctx.fill();
        }
      }
    },

    drawItems(ctx) {
      const t = T(), lvl = this.level, now = performance.now() / 1000;
      // lockers
      for (const l of lvl.lockers) {
        const x = l.x - t / 2, y = l.y - t / 2;
        ctx.fillStyle = '#4a525e'; this.roundRect(ctx, x + 6, y + 4, t - 12, t - 8, 3); ctx.fill();
        ctx.fillStyle = '#2c333c'; ctx.fillRect(x + t / 2 - 1, y + 8, 2, t - 16);
        ctx.strokeStyle = '#5f6a78'; ctx.lineWidth = 1; ctx.strokeRect(x + 6.5, y + 4.5, t - 13, t - 9);
        ctx.fillStyle = '#20262e'; ctx.fillRect(x + t / 2 + 3, y + t / 2 - 3, 3, 6); ctx.fillRect(x + t / 2 - 6, y + t / 2 - 3, 3, 6);
        if (!this.player.hidden && Math.hypot(l.x - this.player.x, l.y - this.player.y) < t * 0.95) {
          ctx.strokeStyle = '#ffd24d'; ctx.lineWidth = 2; ctx.globalAlpha = 0.5 + 0.5 * Math.sin(now * 6);
          this.roundRect(ctx, x + 4, y + 2, t - 8, t - 4, 4); ctx.stroke(); ctx.globalAlpha = 1;
        }
      }
      // exit gate
      const ex = tcx(lvl.exit.tx), ey = tcy(lvl.exit.ty), open = this.player.keys.size >= lvl.keysTotal;
      const gx = ex - t / 2, gy = ey - t / 2;
      if (open) {
        const pulse = 0.5 + 0.5 * Math.sin(now * 4);
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createRadialGradient(ex, ey, 2, ex, ey, t * 1.1);
        g.addColorStop(0, `rgba(58,217,138,${0.4 + pulse * 0.3})`); g.addColorStop(1, 'rgba(58,217,138,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ex, ey, t * 1.1, 0, TAU); ctx.fill(); ctx.restore();
        ctx.strokeStyle = COL.exitOpen; ctx.lineWidth = 3; this.roundRect(ctx, gx + 4, gy + 4, t - 8, t - 8, 5); ctx.stroke();
        ctx.fillStyle = COL.exitOpen; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('EXIT', ex, ey);
      } else {
        ctx.fillStyle = 'rgba(30,14,16,0.7)'; ctx.fillRect(gx + 3, gy + 3, t - 6, t - 6);
        ctx.strokeStyle = COL.exitLock; ctx.lineWidth = 3;
        for (let i = 0; i < 4; i++) { const lx = gx + 8 + i * (t - 16) / 3; ctx.beginPath(); ctx.moveTo(lx, gy + 5); ctx.lineTo(lx, gy + t - 5); ctx.stroke(); }
        ctx.fillStyle = COL.exitLock; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(this.player.keys.size + '/' + lvl.keysTotal, ex, ey + t / 2 - 6);
      }
      // keycards
      for (const k of lvl.keys) {
        const bob = Math.sin(now * 3 + k.bob) * 3;
        const x = k.x, y = k.y + bob, col = KEYCOL[k.color];
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createRadialGradient(x, y, 1, x, y, 20); g.addColorStop(0, col + 'cc'); g.addColorStop(1, col + '00');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 20, 0, TAU); ctx.fill(); ctx.restore();
        ctx.fillStyle = col; this.roundRect(ctx, x - 9, y - 6, 18, 12, 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillRect(x - 6, y - 3, 8, 2);
        ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(x + 3, y - 3, 4, 6);
      }
    },

    drawEntities(ctx) {
      for (const e of this.enemies) this.drawEnemy(ctx, e);
      if (!this.player.hidden) this.drawPlayer(ctx);
    },

    drawPlayer(ctx) {
      const p = this.player, x = p.x, y = p.y, r = p.r;
      ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.ellipse(x, y + r * 0.7, r * 0.9, r * 0.5, 0, 0, TAU); ctx.fill();
      // legs
      if (p.moving) {
        const s = Math.sin(p.animTime * 12) * 4, px = Math.cos(p.facing + Math.PI / 2), py = Math.sin(p.facing + Math.PI / 2);
        ctx.fillStyle = COL.playerDark;
        for (const o of [s, -s]) { ctx.beginPath(); ctx.ellipse(x + px * o * 0.4 + Math.cos(p.facing) * 2, y + py * o * 0.4, 4, 3, 0, 0, TAU); ctx.fill(); }
      }
      ctx.fillStyle = COL.player; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      ctx.strokeStyle = COL.playerDark; ctx.lineWidth = 2; ctx.stroke();
      // facing wedge
      ctx.fillStyle = COL.playerHi; ctx.beginPath();
      ctx.moveTo(x + Math.cos(p.facing) * r, y + Math.sin(p.facing) * r);
      ctx.arc(x, y, r * 0.62, p.facing - 0.5, p.facing + 0.5); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#1a1207'; ctx.beginPath(); ctx.arc(x + Math.cos(p.facing) * r * 0.45, y + Math.sin(p.facing) * r * 0.45, 2.2, 0, TAU); ctx.fill();
    },

    drawEnemy(ctx, e) {
      const x = e.x, y = e.y, r = e.r;
      const alpha = e.kind === 'wraith' ? (e.phaseVisible ? 0.9 : 0.16) : 1;
      ctx.save(); ctx.globalAlpha = alpha;
      // shadow
      ctx.globalAlpha = alpha * 0.3; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(x, y + r * 0.7, r * 0.9, r * 0.5, 0, 0, TAU); ctx.fill(); ctx.globalAlpha = alpha;

      if (e.kind === 'wraith') { ctx.globalAlpha = alpha * 0.4; for (let i = 1; i <= 3; i++) { ctx.fillStyle = '#9a54ec'; ctx.beginPath(); ctx.arc(x - Math.cos(e.facing) * i * 5, y - Math.sin(e.facing) * i * 5, r - i * 2, 0, TAU); ctx.fill(); } ctx.globalAlpha = alpha; }

      // body
      ctx.fillStyle = e.color; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 2; ctx.stroke();

      // kind flourishes
      if (e.kind === 'brute') {
        ctx.fillStyle = '#8f2519';
        for (const a of [-0.6, 0, 0.6]) { const ba = e.facing + Math.PI + a; ctx.beginPath(); ctx.moveTo(x + Math.cos(ba) * r, y + Math.sin(ba) * r); ctx.lineTo(x + Math.cos(ba) * (r + 7), y + Math.sin(ba) * (r + 7)); ctx.lineTo(x + Math.cos(ba + 0.25) * r, y + Math.sin(ba + 0.25) * r); ctx.fill(); }
      } else if (e.kind === 'spark') {
        ctx.strokeStyle = '#d6fbff'; ctx.lineWidth = 1.5;
        const f = Math.random();
        for (let i = 0; i < 3; i++) { const a = Math.random() * TAU; ctx.globalAlpha = alpha * (0.4 + f * 0.5); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.lineTo(x + Math.cos(a) * (r + 6), y + Math.sin(a) * (r + 6)); ctx.stroke(); }
        ctx.globalAlpha = alpha;
      } else if (e.kind === 'warden') {
        ctx.fillStyle = '#8a6410'; ctx.beginPath(); ctx.arc(x - Math.cos(e.facing) * 3, y - Math.sin(e.facing) * 3, r + 3, e.facing + 1.9, e.facing - 1.9); ctx.fill();
        ctx.fillStyle = e.color; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
        ctx.fillStyle = '#fff3c4'; this.star(ctx, x, y - r - 4, 5, 4, 2);
      } else if (e.kind === 'guard') {
        ctx.fillStyle = '#26324a'; ctx.beginPath(); ctx.arc(x, y, r * 0.66, e.facing - 1.4, e.facing + 1.4); ctx.fill();
        ctx.fillStyle = '#ffd24d'; ctx.beginPath(); ctx.arc(x - Math.cos(e.facing) * 3, y - Math.sin(e.facing) * 3, 2.4, 0, TAU); ctx.fill();
      }

      // eyes toward facing
      const ex = x + Math.cos(e.facing) * r * 0.5, ey = y + Math.sin(e.facing) * r * 0.5;
      const px = Math.cos(e.facing + Math.PI / 2), py = Math.sin(e.facing + Math.PI / 2);
      ctx.fillStyle = e.state === 'chase' ? '#fff' : 'rgba(255,255,255,0.85)';
      for (const o of [-3, 3]) { ctx.beginPath(); ctx.arc(ex + px * o, ey + py * o, 1.8, 0, TAU); ctx.fill(); }
      ctx.restore();

      // villain label
      if (e.villain && (alpha > 0.3)) {
        ctx.save(); ctx.globalAlpha = clamp(alpha, 0, 1);
        ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillText(e.name, x + 1, y - r - 6 + 1);
        ctx.fillStyle = e.color; ctx.fillText(e.name, x, y - r - 6);
        ctx.restore();
      }
    },

    drawConeTints(ctx) {
      for (const e of this.enemies) {
        if (!e.visible() || !e.canDetect()) continue;
        const col = e.state === 'chase' ? [255, 60, 60] : e.state === 'search' ? [255, 190, 70] : [150, 180, 230];
        const a = 0.05 + e.alert * 0.16 + (e.state === 'search' ? 0.05 : 0);
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createRadialGradient(e.x, e.y, 4, e.x, e.y, e.range);
        g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${a})`); g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(e.x, e.y); ctx.arc(e.x, e.y, e.range, e.facing - e.fov, e.facing + e.fov); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    },

    drawParticles(ctx, layer) {
      for (const p of this.particles) {
        const a = clamp(p.life / p.max, 0, 1);
        if (p.type === 'dust' && layer === 'under') { ctx.globalAlpha = a * 0.6; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, TAU); ctx.fill(); }
        else if (p.type === 'spark' && layer === 'over') { ctx.globalAlpha = a; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, TAU); ctx.fill(); }
        else if (p.type === 'ring' && layer === 'over') { ctx.globalAlpha = a * 0.7; ctx.strokeStyle = p.color; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, TAU); ctx.stroke(); }
        else if (p.type === 'bubble' && layer === 'over') {
          ctx.globalAlpha = a; ctx.font = 'bold 16px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, TAU); ctx.fill();
          ctx.fillStyle = p.color; ctx.fillText(p.text, p.x, p.y + 1);
        }
      }
      ctx.globalAlpha = 1;
    },

    drawPrompts(ctx) {
      const p = this.player, t = T();
      if (p.hidden) {
        ctx.font = '10px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#ffd24d';
        ctx.fillText('HIDDEN — move to leave', p.x, p.y - t * 0.7);
      }
    },

    buildLight() {
      const lc = this.lightCtx, dpr = this.dpr;
      lc.setTransform(dpr, 0, 0, dpr, 0, 0);
      lc.clearRect(0, 0, this.viewW, this.viewH);
      lc.fillStyle = `rgba(3,5,12,${this.darkAlpha})`;
      lc.fillRect(0, 0, this.viewW, this.viewH);
      lc.globalCompositeOperation = 'destination-out';
      const ox = this.ox, oy = this.oy, lvl = this.level;
      this.punch(lc, this.player.x + ox, this.player.y + oy, T() * 3.4, 0.95);
      for (const k of lvl.keys) this.punch(lc, k.x + ox, k.y + oy, T() * 1.7, 0.75);
      this.punch(lc, tcx(lvl.exit.tx) + ox, tcy(lvl.exit.ty) + oy, T() * 2.2, 0.85);
      for (const e of this.enemies) {
        if (!e.visible()) continue;
        this.punch(lc, e.x + ox, e.y + oy, T() * 1.25, 0.8);
        if (e.canDetect()) this.punchCone(lc, e.x + ox, e.y + oy, e.range, e.facing, e.fov);
      }
      lc.globalCompositeOperation = 'source-over';
    },
    punch(lc, x, y, r, a) {
      const g = lc.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(255,255,255,${a})`); g.addColorStop(0.72, `rgba(255,255,255,${a * 0.4})`); g.addColorStop(1, 'rgba(255,255,255,0)');
      lc.fillStyle = g; lc.beginPath(); lc.arc(x, y, r, 0, TAU); lc.fill();
    },
    punchCone(lc, x, y, r, facing, fov) {
      lc.save(); lc.beginPath(); lc.moveTo(x, y); lc.arc(x, y, r, facing - fov, facing + fov); lc.closePath(); lc.clip();
      const g = lc.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      lc.fillStyle = g; lc.fillRect(x - r, y - r, r * 2, r * 2); lc.restore();
    },

    drawVignette(ctx) {
      const g = ctx.createRadialGradient(this.viewW / 2, this.viewH / 2, this.viewH * 0.35, this.viewW / 2, this.viewH / 2, this.viewH * 0.8);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, this.viewW, this.viewH);
    },
    drawFlash(ctx) {
      if (this.suspicion < 40) return;
      const a = ((this.suspicion - 40) / 60) * 0.28 * (0.6 + 0.4 * Math.sin(performance.now() / 120));
      ctx.fillStyle = `rgba(220,40,40,${Math.max(0, a)})`; ctx.fillRect(0, 0, this.viewW, this.viewH);
    },

    drawMinimap(ctx) {
      const lvl = this.level, mmW = 148, s = mmW / lvl.pxW, mmH = lvl.pxH * s;
      const mx = this.viewW - mmW - 14, my = 62;
      ctx.save();
      ctx.globalAlpha = 0.88;
      ctx.fillStyle = 'rgba(8,11,18,0.82)'; this.roundRect(ctx, mx - 5, my - 5, mmW + 10, mmH + 10, 6); ctx.fill();
      ctx.strokeStyle = 'rgba(120,140,170,0.35)'; ctx.lineWidth = 1; ctx.stroke();
      const t = T();
      for (let ty = 0; ty < lvl.H; ty++) for (let tx = 0; tx < lvl.W; tx++) {
        const type = lvl.t[ty][tx];
        if (type === 'wall') { ctx.fillStyle = 'rgba(80,92,110,0.7)'; ctx.fillRect(mx + tx * t * s, my + ty * t * s, t * s + 0.6, t * s + 0.6); }
        else if (type === 'door') { ctx.fillStyle = COL.door[lvl.doorColor[ty][tx]]; ctx.fillRect(mx + tx * t * s, my + ty * t * s, t * s + 0.6, t * s + 0.6); }
      }
      const dot = (wx, wy, col, rad) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(mx + wx * s, my + wy * s, rad, 0, TAU); ctx.fill(); };
      dot(tcx(lvl.exit.tx), tcy(lvl.exit.ty), this.player.keys.size >= lvl.keysTotal ? COL.exitOpen : COL.exitLock, 3);
      for (const k of lvl.keys) dot(k.x, k.y, KEYCOL[k.color], 2.5);
      for (const e of this.enemies) { if (!e.visible()) continue; dot(e.x, e.y, e.state === 'chase' ? '#ff4d4d' : e.villain ? e.color : '#7d93ff', e.villain ? 3 : 2.5); }
      dot(this.player.x, this.player.y, COL.player, 3);
      ctx.restore();
    },

    /* ---- HUD (DOM) ---------------------------------------------------- */
    setLevelHud(def) {
      document.getElementById('hudLevel').textContent = `BLOCK ${this.levelIndex + 1}/${PE.LEVELS.length} — ${def.name}`;
      document.getElementById('hudObjective').textContent = def.objective;
    },
    updateKeyHud() {
      const el = document.getElementById('hudKeys'); if (!el) return;
      el.innerHTML = '';
      for (const c of this.keyColors) {
        const d = document.createElement('span');
        d.className = 'keydot' + (this.player.hasKey(c) ? ' has' : '');
        d.style.setProperty('--kc', KEYCOL[c]);
        el.appendChild(d);
      }
    },
    updateBars() {
      const sf = document.getElementById('suspFill');
      if (sf) {
        sf.style.width = this.suspicion + '%';
        sf.style.background = this.suspicion > 75 ? '#ff3b3b' : this.suspicion > 45 ? '#ffb03b' : '#3ad98a';
      }
      const stf = document.getElementById('stamFill');
      if (stf) { stf.style.width = (this.player.stamina * 100) + '%'; }
      const banner = document.getElementById('alertBanner');
      if (banner) {
        const chasing = this.enemies.some((e) => e.state === 'chase');
        const on = chasing || this.suspicion > 55;
        banner.classList.toggle('show', on);
        banner.textContent = chasing ? '⚠ SPOTTED — RUN OR HIDE' : '⚠ THEY HEARD SOMETHING';
      }
    },

    /* ---- screens / overlays ------------------------------------------ */
    showScreen(id) {
      for (const s of document.querySelectorAll('.screen')) s.classList.add('hidden');
      if (id) document.getElementById(id).classList.remove('hidden');
    },
    toggleHelp(v) { document.getElementById('helpScreen').classList.toggle('hidden', !v); },
    showToast(title, body) {
      const t = document.getElementById('toast'); if (!t) return;
      t.innerHTML = `<b>${title}</b><span>${body || ''}</span>`;
      t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
      clearTimeout(this._toastT); this._toastT = setTimeout(() => t.classList.remove('show'), 2800);
    },

    /* ---- draw helpers ------------------------------------------------- */
    roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    },
    star(ctx, cx, cy, spikes, outer, inner) {
      let rot = -Math.PI / 2; const step = Math.PI / spikes; ctx.beginPath();
      for (let i = 0; i < spikes; i++) { ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer); rot += step; ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner); rot += step; }
      ctx.closePath(); ctx.fill();
    },
  };

  PE.game = game;
  if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', () => game.init());
  else game.init();
})();
