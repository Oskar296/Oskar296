/* ============================================================================
 * BLACKGATE — Input (keyboard + optional touch joystick)
 * ==========================================================================*/
window.PE = window.PE || {};
(function () {
  const down = {};
  const pressed = {};
  const PREVENT = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];

  function onKey(e, isDown) {
    const c = e.code;
    if (PREVENT.indexOf(c) !== -1) e.preventDefault();
    if (isDown) { if (!down[c]) pressed[c] = true; down[c] = true; }
    else down[c] = false;
  }
  window.addEventListener('keydown', (e) => onKey(e, true));
  window.addEventListener('keyup', (e) => onKey(e, false));
  window.addEventListener('blur', () => { for (const k in down) down[k] = false; });

  // touch joystick state (set up by initTouch)
  const touch = { active: false, x: 0, y: 0, sprint: false, interact: false };

  const Input = {
    isDown(c) { return !!down[c]; },
    justPressed(c) { if (pressed[c]) { pressed[c] = false; return true; } return false; },
    consumePressed(codes) { for (const c of codes) if (this.justPressed(c)) return true; return false; },
    moveX() {
      let v = (this.isDown('KeyD') || this.isDown('ArrowRight') ? 1 : 0) - (this.isDown('KeyA') || this.isDown('ArrowLeft') ? 1 : 0);
      if (touch.active && Math.abs(touch.x) > 0.15) v = touch.x;
      return v;
    },
    moveY() {
      let v = (this.isDown('KeyS') || this.isDown('ArrowDown') ? 1 : 0) - (this.isDown('KeyW') || this.isDown('ArrowUp') ? 1 : 0);
      if (touch.active && Math.abs(touch.y) > 0.15) v = touch.y;
      return v;
    },
    sprint() { return this.isDown('ShiftLeft') || this.isDown('ShiftRight') || touch.sprint; },
    interactPressed() {
      let t = touch.interact; touch.interact = false;
      return this.justPressed('KeyE') || this.justPressed('Space') || t;
    },
    startPressed() { return this.justPressed('Enter') || this.justPressed('Space') || this.justPressed('KeyE'); },

    initTouch() {
      const base = document.getElementById('joy');
      const knob = document.getElementById('joyKnob');
      const sprintBtn = document.getElementById('btnSprint');
      const actBtn = document.getElementById('btnAct');
      if (!base || !knob) return;
      let id = null, cx = 0, cy = 0;
      const R = 55;
      function set(px, py) {
        let dx = px - cx, dy = py - cy;
        const d = Math.hypot(dx, dy) || 1;
        const cl = Math.min(d, R);
        dx = (dx / d) * cl; dy = (dy / d) * cl;
        knob.style.transform = `translate(${dx}px,${dy}px)`;
        touch.x = dx / R; touch.y = dy / R; touch.active = true;
      }
      base.addEventListener('pointerdown', (e) => {
        id = e.pointerId; const r = base.getBoundingClientRect();
        cx = r.left + r.width / 2; cy = r.top + r.height / 2;
        set(e.clientX, e.clientY); base.setPointerCapture(id); e.preventDefault();
      });
      base.addEventListener('pointermove', (e) => { if (e.pointerId === id) { set(e.clientX, e.clientY); e.preventDefault(); } });
      const end = (e) => { if (e.pointerId === id) { id = null; touch.active = false; touch.x = touch.y = 0; knob.style.transform = 'translate(0,0)'; } };
      base.addEventListener('pointerup', end);
      base.addEventListener('pointercancel', end);
      if (sprintBtn) {
        sprintBtn.addEventListener('pointerdown', (e) => { touch.sprint = true; e.preventDefault(); });
        sprintBtn.addEventListener('pointerup', () => { touch.sprint = false; });
        sprintBtn.addEventListener('pointercancel', () => { touch.sprint = false; });
      }
      if (actBtn) actBtn.addEventListener('pointerdown', (e) => { touch.interact = true; e.preventDefault(); });
    },
  };

  PE.Input = Input;
})();
