/* ========== AUDIO: SFX (pentatonic, soft) ========== */
const FX = {
  ctx: null,
  ensure() { if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (this.ctx && this.ctx.state !== 'running') { try { const p = this.ctx.resume(); if (p && p.catch) p.catch(() => {}); } catch (e) {} } return this.ctx; },
  note(f, t, d, type = 'sine', v = .16) {
    const c = this.ctx; const o = c.createOscillator(); const g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, c.currentTime + t);
    g.gain.setValueAtTime(0, c.currentTime + t); g.gain.linearRampToValueAtTime(v, c.currentTime + t + .012); g.gain.exponentialRampToValueAtTime(.0008, c.currentTime + t + d);
    o.connect(g); g.connect(c.destination); o.start(c.currentTime + t); o.stop(c.currentTime + t + d + .05);
  },
  play(name, n = 0) {
    try { this._play(name, n); } catch (e) {}
  },
  _play(name, n) {
    if (!S.settings.sound || !this.ensure() || this.ctx.state !== 'running') return;
    const P = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5, 1568];
    switch (name) {
      case 'tap': this.note(1400, 0, .04, 'triangle', .05); break;
      case 'ok': { const b = Math.min(n, 5); this.note(P[b + 2], 0, .18, 'sine', .15); this.note(P[b + 4], .07, .32, 'sine', .13); this.note(P[b + 4] * 2, .07, .2, 'triangle', .03); break; }
      case 'bad': this.note(330, 0, .16, 'triangle', .1); this.note(262, .09, .26, 'triangle', .09); break;
      case 'flip': this.note(880, 0, .06, 'sine', .05); this.note(1175, .04, .08, 'sine', .04); break;
      case 'quest': [0, 1, 2, 3, 4, 5].forEach((k, i) => this.note(P[k], i * .07, .35, 'sine', .11)); break;
      case 'level': [0, 2, 4, 5, 7, 8].forEach((k, i) => this.note(P[k], i * .09, .5, 'triangle', .1)); this.note(P[5] / 2, 0, 1.2, 'sine', .08); break;
      case 'combo': this.note(P[Math.min(8, 3 + n / 3 | 0)], 0, .12, 'square', .03); break;
    }
  }
};
