/* ============================================================================
 * BLACKGATE — Entities (player, guards, super-villains)
 * ==========================================================================*/
window.PE = window.PE || {};
(function () {
  const TAU = Math.PI * 2;
  function tcx(tx) { return tx * PE.TILE + PE.TILE / 2; }
  function tcy(ty) { return ty * PE.TILE + PE.TILE / 2; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function angDiff(a, b) { let d = a - b; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU; return d; }
  function lerpAngle(a, b, t) { return a + angDiff(b, a) * t; }

  /* Axis-separated circle-vs-tile collision. Returns true if it hit a wall. */
  function moveAndCollide(e, dx, dy, solid) {
    const T = PE.TILE, r = e.r;
    let blocked = false;
    e.x += dx;
    if (dx !== 0) {
      const y0 = Math.floor((e.y - r) / T), y1 = Math.floor((e.y + r) / T);
      if (dx > 0) { const tx = Math.floor((e.x + r) / T); for (let ty = y0; ty <= y1; ty++) if (solid(tx, ty)) { e.x = tx * T - r - 0.01; blocked = true; break; } }
      else { const tx = Math.floor((e.x - r) / T); for (let ty = y0; ty <= y1; ty++) if (solid(tx, ty)) { e.x = (tx + 1) * T + r + 0.01; blocked = true; break; } }
    }
    e.y += dy;
    if (dy !== 0) {
      const x0 = Math.floor((e.x - r) / T), x1 = Math.floor((e.x + r) / T);
      if (dy > 0) { const ty = Math.floor((e.y + r) / T); for (let tx = x0; tx <= x1; tx++) if (solid(tx, ty)) { e.y = ty * T - r - 0.01; blocked = true; break; } }
      else { const ty = Math.floor((e.y - r) / T); for (let tx = x0; tx <= x1; tx++) if (solid(tx, ty)) { e.y = (ty + 1) * T + r + 0.01; blocked = true; break; } }
    }
    return blocked;
  }

  /* ---- Player ---------------------------------------------------------- */
  class Player {
    constructor(level) {
      this.x = tcx(level.start.tx); this.y = tcy(level.start.ty);
      this.r = 13; this.vx = 0; this.vy = 0;
      this.facing = 0; this.keys = new Set();
      this.stamina = 1; this.moving = false; this.sprinting = false;
      this.noise = 0; this.animTime = 0; this.footTimer = 0; this._footFlip = false;
      this.hidden = false;
    }
    hasKey(c) { return this.keys.has(c); }

    update(dt, game) {
      const level = game.level;
      if (this.hidden) {
        this.vx = this.vy = 0; this.noise = 0; this.moving = false;
        if (game.input.interactPressed() || Math.abs(game.input.moveX()) > 0.4 || Math.abs(game.input.moveY()) > 0.4) {
          this.hidden = false; PE.Audio.play('hide');
        }
        return;
      }
      let ix = game.input.moveX(), iy = game.input.moveY();
      const mag = Math.hypot(ix, iy);
      if (mag > 1) { ix /= mag; iy /= mag; }
      const moving = mag > 0.12;
      const wantSprint = game.input.sprint() && moving && this.stamina > 0.06;
      this.sprinting = wantSprint;
      const maxSpeed = wantSprint ? 252 : 150;
      const tvx = ix * maxSpeed, tvy = iy * maxSpeed;
      const s = 1 - Math.exp(-dt * 13);
      this.vx += (tvx - this.vx) * s;
      this.vy += (tvy - this.vy) * s;
      moveAndCollide(this, this.vx * dt, this.vy * dt, (tx, ty) => level.blocksPlayer(tx, ty, this));

      const spd = Math.hypot(this.vx, this.vy);
      this.moving = spd > 14;
      if (this.moving) this.facing = lerpAngle(this.facing, Math.atan2(this.vy, this.vx), Math.min(1, dt * 12));
      this.stamina = wantSprint ? Math.max(0, this.stamina - dt * 0.5) : Math.min(1, this.stamina + dt * 0.34);
      this.noise = wantSprint && this.moving ? 1 : (this.moving ? 0.3 : 0);

      this.animTime += dt * (spd / 150 + 0.001);
      if (this.moving) {
        this.footTimer -= dt;
        if (this.footTimer <= 0) {
          this.footTimer = wantSprint ? 0.23 : 0.36;
          PE.Audio.play(this._footFlip ? 'footstep' : 'step2'); this._footFlip = !this._footFlip;
          game.spawnDust(this.x, this.y + this.r * 0.4);
        }
      }
    }
  }

  /* ---- Enemies --------------------------------------------------------- */
  const KINDS = {
    guard:  { name: 'GUARD',  color: '#4a78d6', size: 14, speed: 72,  chase: 138, range: 205, fov: 0.55, hear: 150, susp: 1.0 },
    spark:  { name: 'VOLT',   color: '#2fd3e6', size: 13, speed: 118, chase: 182, range: 178, fov: 0.5,  hear: 175, susp: 1.15, villain: true },
    brute:  { name: 'BRUTE',  color: '#d1402f', size: 19, speed: 56,  chase: 112, range: 172, fov: 0.62, hear: 120, susp: 1.25, villain: true },
    wraith: { name: 'WRAITH', color: '#9a54ec', size: 14, speed: 96,  chase: 152, range: 198, fov: 0.5,  hear: 130, susp: 1.1,  villain: true },
    warden: { name: 'WARDEN', color: '#e6a52a', size: 16, speed: 92,  chase: 162, range: 262, fov: 0.75, hear: 185, susp: 1.5,  villain: true },
  };

  class Enemy {
    constructor(spec, level) {
      const k = KINDS[spec.kind] || KINDS.guard;
      this.kind = spec.kind; this.k = k; this.name = k.name; this.color = k.color;
      this.villain = !!k.villain; this.r = k.size;
      this.patrol = (spec.patrol && spec.patrol.length ? spec.patrol : [[1, 1]]).map(([tx, ty]) => ({ x: tcx(tx), y: tcy(ty) }));
      this.x = this.patrol[0].x; this.y = this.patrol[0].y;
      this.wp = 0;
      this.state = 'patrol'; this.lastSeen = null; this.searchTimer = 0;
      this.alert = 0; this.sweep = Math.random() * TAU;
      const face = this.patrol.length > 1 ? Math.atan2(this.patrol[1].y - this.y, this.patrol[1].x - this.x) : 0;
      this.facing = face; this.desiredFacing = face;
      // brute
      this.charging = false; this.chargeT = 0; this.chargeCd = 1.5; this.chargeDir = 0; this.stun = 0;
      // spark
      this.wanderTarget = null; this.wanderCd = 0; this.sparkT = 0;
      // wraith
      this.phaseVisible = true; this.phaseT = 2.6 + Math.random() * 1.5;
    }
    get range() { return this.k.range; }
    get fov() { return this.k.fov; }
    visible() { return this.kind !== 'wraith' || this.phaseVisible; }
    canDetect() { return this.kind !== 'wraith' || this.phaseVisible; }

    update(dt, game) {
      const level = game.level, player = game.player;
      if (this.kind === 'wraith') this._phase(dt, game);
      if (this.stun > 0) { this.stun -= dt; this.alert = Math.max(0, this.alert - dt); this._face(dt); return; }

      const dx = player.x - this.x, dy = player.y - this.y;
      const dist = Math.hypot(dx, dy);
      const angTo = Math.atan2(dy, dx);
      let sees = false, hears = false;
      if (!player.hidden && this.canDetect()) {
        if (dist <= this.range && Math.abs(angDiff(angTo, this.facing)) <= this.fov && level.lineOfSight(this.x, this.y, player.x, player.y)) sees = true;
        if (!sees && player.noise > 0 && dist <= this.k.hear * player.noise && level.lineOfSight(this.x, this.y, player.x, player.y)) hears = true;
      }

      if (sees) {
        if (this.state !== 'chase') { game.spawnBubble(this.x, this.y - this.r - 14, '!', '#ff4d4d'); PE.Audio.play('alert'); }
        this.state = 'chase'; this.lastSeen = { x: player.x, y: player.y }; this.searchTimer = 4.5;
        this.alert = Math.min(1, this.alert + dt * 4);
        game.reportSighting(dist, this.k.susp);
        if (dist <= this.r + player.r + 3) { game.onCaught(this); return; }
      } else {
        this.alert = Math.max(0, this.alert - dt * 1.3);
        if (hears && this.state === 'patrol') {
          this.state = 'search'; this.lastSeen = { x: player.x, y: player.y }; this.searchTimer = 3.5;
          game.spawnBubble(this.x, this.y - this.r - 14, '?', '#ffd24d'); PE.Audio.play('search');
        }
        if (this.state === 'chase') { this.state = 'search'; this.searchTimer = 3.5; }
      }

      if (this.state === 'chase') this._chase(dt, game, dist, angTo);
      else if (this.state === 'search') this._search(dt, game);
      else this._patrol(dt, game);

      if (this.kind === 'spark') { this.sparkT -= dt; if (this.sparkT <= 0) { this.sparkT = 0.08; game.spawnSpark(this.x, this.y); } }
      this._face(dt);
    }

    _face(dt) { this.facing = lerpAngle(this.facing, this.desiredFacing, Math.min(1, dt * 7)); }

    _moveToward(dt, game, tx, ty, speed) {
      const dx = tx - this.x, dy = ty - this.y, d = Math.hypot(dx, dy) || 1;
      this.desiredFacing = Math.atan2(dy, dx);
      return moveAndCollide(this, (dx / d) * speed * dt, (dy / d) * speed * dt, (a, b) => game.level.blocksEnemy(a, b));
    }

    _patrol(dt, game) {
      if (this.kind === 'spark') { this._wander(dt, game); return; }
      if (this.patrol.length <= 1) { this.sweep += dt * 0.7; this.desiredFacing = Math.sin(this.sweep) * 1.2; return; }
      const wp = this.patrol[this.wp];
      if (Math.hypot(wp.x - this.x, wp.y - this.y) < 6) this.wp = (this.wp + 1) % this.patrol.length;
      const t = this.patrol[this.wp];
      this._moveToward(dt, game, t.x, t.y, this.k.speed);
    }

    _wander(dt, game) {
      this.wanderCd -= dt;
      if (!this.wanderTarget || this.wanderCd <= 0 || Math.hypot(this.wanderTarget.x - this.x, this.wanderTarget.y - this.y) < 10) {
        this.wanderTarget = game.randomFloorNear(this.x, this.y, 5);
        this.wanderCd = 2.4 + Math.random() * 2;
      }
      if (this.wanderTarget && this._moveToward(dt, game, this.wanderTarget.x, this.wanderTarget.y, this.k.speed * 0.8)) this.wanderCd = 0;
    }

    _search(dt, game) {
      this.searchTimer -= dt;
      if (this.searchTimer <= 0) { this.state = 'patrol'; this.lastSeen = null; return; }
      if (this.lastSeen) {
        if (Math.hypot(this.lastSeen.x - this.x, this.lastSeen.y - this.y) > 10) this._moveToward(dt, game, this.lastSeen.x, this.lastSeen.y, this.k.speed * 1.1);
        else { this.sweep += dt * 3.2; this.desiredFacing = this.facing + Math.sin(this.sweep) * 0.07; }
      }
    }

    _chase(dt, game, dist, angTo) {
      if (this.kind === 'brute') { this._brute(dt, game, dist, angTo); return; }
      this._moveToward(dt, game, game.player.x, game.player.y, this.k.chase);
      this.desiredFacing = angTo;
    }

    _brute(dt, game, dist, angTo) {
      this.chargeCd -= dt;
      if (this.charging) {
        this.chargeT -= dt;
        const blocked = moveAndCollide(this, Math.cos(this.chargeDir) * this.k.chase * 2.3 * dt, Math.sin(this.chargeDir) * this.k.chase * 2.3 * dt, (a, b) => game.level.blocksEnemy(a, b));
        game.spawnDust(this.x, this.y);
        const pd = Math.hypot(game.player.x - this.x, game.player.y - this.y);
        if (pd <= this.r + game.player.r + 3 && !game.player.hidden) { game.onCaught(this); return; }
        if (blocked || this.chargeT <= 0) { this.charging = false; this.stun = 0.6; game.shakeAdd(6); }
        return;
      }
      this.desiredFacing = angTo;
      if (this.chargeCd <= 0 && dist < this.range * 0.95 && Math.abs(angDiff(angTo, this.facing)) < 0.3) {
        this.charging = true; this.chargeT = 0.85; this.chargeDir = angTo; this.chargeCd = 3.2;
        PE.Audio.play('charge'); game.shakeAdd(3); return;
      }
      this._moveToward(dt, game, game.player.x, game.player.y, this.k.chase);
    }

    _phase(dt, game) {
      this.phaseT -= dt;
      if (this.phaseT <= 0) {
        this.phaseVisible = !this.phaseVisible;
        game.spawnPhase(this.x, this.y);
        PE.Audio.play('phase');
        if (this.phaseVisible) {
          const p = this.patrol[Math.floor(Math.random() * this.patrol.length)];
          this.x = p.x; this.y = p.y;
          this.phaseT = 2.6 + Math.random() * 1.4;
        } else { this.phaseT = 1.4 + Math.random() * 0.7; }
      }
    }
  }

  PE.Entities = { Player, Enemy, KINDS, moveAndCollide, tcx, tcy, clamp, angDiff, lerpAngle };
})();
