/* ============================================================================
 * BLACKGATE — Audio
 * Fully synthesised with the Web Audio API (no external files). A low ambient
 * drone runs while playing and tightens as the alarm rises.
 * ==========================================================================*/
window.PE = window.PE || {};
(function () {
  let ctx = null, master = null, enabled = true;
  let drone = null, droneGain = null, tensionGain = null, tensionOsc = null;

  function ensure() {
    if (ctx) return ctx;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = enabled ? 0.55 : 0.0;
      master.connect(ctx.destination);
    } catch (e) { ctx = null; }
    return ctx;
  }

  function tone(o) {
    if (!ctx || !enabled) return;
    const t = ctx.currentTime + (o.when || 0);
    const osc = ctx.createOscillator();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(o.freq, t);
    if (o.slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, o.slideTo), t + o.dur);
    const g = ctx.createGain();
    const peak = o.gain != null ? o.gain : 0.2;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + (o.attack || 0.006));
    g.gain.exponentialRampToValueAtTime(0.0001, t + o.dur);
    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + o.dur + 0.03);
  }

  function noise(o) {
    if (!ctx || !enabled) return;
    const t = ctx.currentTime + (o.when || 0);
    const dur = o.dur || 0.2;
    const n = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = o.filter || 'lowpass'; f.frequency.value = o.freq || 800;
    const g = ctx.createGain();
    g.gain.setValueAtTime(o.gain != null ? o.gain : 0.15, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(master);
    src.start(t); src.stop(t + dur);
  }

  const SFX = {
    footstep() { noise({ dur: 0.05, gain: 0.05, filter: 'lowpass', freq: 420 }); },
    step2() { noise({ dur: 0.05, gain: 0.045, filter: 'lowpass', freq: 380 }); },
    pickup() { tone({ freq: 620, type: 'triangle', dur: 0.09, gain: 0.2 }); tone({ freq: 940, type: 'triangle', dur: 0.14, gain: 0.18, when: 0.08 }); },
    door() { tone({ freq: 200, type: 'sawtooth', dur: 0.22, gain: 0.14, slideTo: 90 }); noise({ dur: 0.24, gain: 0.05, filter: 'lowpass', freq: 500 }); },
    locked() { tone({ freq: 150, type: 'square', dur: 0.1, gain: 0.12 }); tone({ freq: 120, type: 'square', dur: 0.12, gain: 0.12, when: 0.09 }); },
    hide() { noise({ dur: 0.14, gain: 0.06, filter: 'lowpass', freq: 300 }); },
    alert() { tone({ freq: 880, type: 'square', dur: 0.11, gain: 0.2 }); tone({ freq: 1200, type: 'square', dur: 0.16, gain: 0.2, when: 0.11 }); },
    search() { tone({ freq: 520, type: 'triangle', dur: 0.12, gain: 0.12 }); },
    caught() { tone({ freq: 320, type: 'sawtooth', dur: 0.6, gain: 0.26, slideTo: 70 }); noise({ dur: 0.6, gain: 0.12, filter: 'lowpass', freq: 300, when: 0.02 }); },
    win() { [523, 659, 784, 1047, 1318].forEach((f, i) => tone({ freq: f, type: 'triangle', dur: 0.24, gain: 0.2, when: i * 0.13 })); },
    charge() { tone({ freq: 110, type: 'sawtooth', dur: 0.35, gain: 0.2, slideTo: 240 }); },
    spark() { noise({ dur: 0.045, gain: 0.07, filter: 'highpass', freq: 3200 }); },
    phase() { tone({ freq: 700, type: 'sine', dur: 0.3, gain: 0.1, slideTo: 200 }); },
    ui() { tone({ freq: 480, type: 'square', dur: 0.05, gain: 0.12 }); },
  };

  function startDrone() {
    if (!ctx || drone) return;
    try {
      drone = ctx.createOscillator(); drone.type = 'sine'; drone.frequency.value = 55;
      const d2 = ctx.createOscillator(); d2.type = 'sine'; d2.frequency.value = 55.4;
      droneGain = ctx.createGain(); droneGain.gain.value = 0.06;
      drone.connect(droneGain); d2.connect(droneGain); droneGain.connect(master);
      tensionOsc = ctx.createOscillator(); tensionOsc.type = 'sawtooth'; tensionOsc.frequency.value = 82;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 400;
      tensionGain = ctx.createGain(); tensionGain.gain.value = 0.0001;
      tensionOsc.connect(lp).connect(tensionGain).connect(master);
      drone.start(); d2.start(); tensionOsc.start();
    } catch (e) { /* ignore */ }
  }
  function stopDrone() {
    try { if (drone) drone.stop(); } catch (e) {}
    try { if (tensionOsc) tensionOsc.stop(); } catch (e) {}
    drone = null; tensionOsc = null;
  }

  PE.Audio = {
    resume() { ensure(); if (ctx && ctx.state === 'suspended') ctx.resume(); },
    play(name) { if (SFX[name]) { ensure(); SFX[name](); } },
    startMusic() { ensure(); startDrone(); },
    stopMusic() { stopDrone(); },
    setTension(x) {
      if (!ctx) return;
      x = Math.max(0, Math.min(1, x));
      if (tensionGain) tensionGain.gain.setTargetAtTime(0.0001 + x * 0.05, ctx.currentTime, 0.2);
      if (tensionOsc) tensionOsc.frequency.setTargetAtTime(82 + x * 40, ctx.currentTime, 0.2);
    },
    setEnabled(v) { enabled = v; if (master) master.gain.setTargetAtTime(v ? 0.55 : 0.0, ctx.currentTime, 0.05); },
    isEnabled() { return enabled; },
  };
})();
