/* ========== TONE CONTOUR SYNTH ==========
   Menyuarakan kontur nada Mandarin (skala Chao 5 tingkat) supaya beda naik-turunnya
   benar-benar kedengaran, bukan cuma terlihat di grafik. */
const TONE = {
  hz: [0, 175, 205, 240, 280, 325], // tingkat 1..5
  shape: { 1: [5, 5], 2: [3, 3.2, 5], 3: [2.1, 1.2, 1.2, 2.2], 4: [5, 3, 1], 5: [3, 2.6] },
  nodes: [],
  stop() { this.nodes.forEach(n => { try { n.stop(); } catch (e) {} }); this.nodes = []; },
  play(tones, opts = {}) {
    if (!S.settings.sound && !opts.force) return;
    const ctx = FX.ensure(); if (!ctx || ctx.state !== 'running') return;
    this.stop();
    const dur = opts.dur || 0.5, gap = opts.gap || 0.12;
    let t0 = ctx.currentTime + 0.04;
    (Array.isArray(tones) ? tones : [tones]).forEach(tn => {
      const sh = this.shape[tn] || this.shape[5]; const d = tn === 5 ? dur * .45 : dur;
      const osc = ctx.createOscillator(); const o2 = ctx.createOscillator(); const g = ctx.createGain(); const g2 = ctx.createGain(); const lp = ctx.createBiquadFilter();
      osc.type = 'triangle'; o2.type = 'sine'; lp.type = 'lowpass'; lp.frequency.value = 1800;
      const f = sh.map(v => this.hz[Math.round(v)] * (1 + (v - Math.round(v)) * .18));
      osc.frequency.setValueAtTime(f[0], t0); o2.frequency.setValueAtTime(f[0] * 2, t0);
      f.forEach((v, k) => { if (!k) return; const at = t0 + d * (k / (f.length - 1)); osc.frequency.exponentialRampToValueAtTime(v, at); o2.frequency.exponentialRampToValueAtTime(v * 2, at); });
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.16, t0 + 0.05);
      g.gain.setValueAtTime(0.16, t0 + d - 0.09); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
      g2.gain.value = 0.05;
      osc.connect(lp); o2.connect(g2); g2.connect(lp); lp.connect(g); g.connect(ctx.destination);
      osc.start(t0); o2.start(t0); osc.stop(t0 + d + .02); o2.stop(t0 + d + .02);
      this.nodes.push(osc, o2);
      t0 += d + gap;
    });
  },
  demo(t) { this.play([t], { dur: .62, force: true }); },
  compare() { this.play([1, 2, 3, 4], { dur: .55, gap: .2, force: true }); }
};
