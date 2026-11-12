/* ========== v10: ARCADE — 漢字 MONSTER ==========
   Monster punya "perisai kata": arti kata yang harus kamu jawab dengan hanzi yang tepat.
   Tiap pilihan ada batas waktu. Benar = serangan, salah/telat = monster menyerang balik.
   Semua grafis SVG buatan sendiri & suara disintesis WebAudio → tanpa aset luar, jalan di semua perangkat. */

/* ---------------- AUDIO (chiptune + SFX) ---------------- */
const GA = {
  ctx: null, master: null, mus: null, sfx: null, noiseBuf: null, timer: 0, step: 0, next: 0, song: null, on: false,
  init() {
    if (!FX.ensure()) return false; const c = FX.ctx; if (this.ctx === c && this.master) return true;
    this.ctx = c; this.master = c.createGain(); this.master.gain.value = 0.9; this.master.connect(c.destination);
    this.mus = c.createGain(); this.mus.gain.value = 0.16; this.mus.connect(this.master);
    this.sfx = c.createGain(); this.sfx.gain.value = 0.55; this.sfx.connect(this.master);
    const len = c.sampleRate * 0.5; const b = c.createBuffer(1, len, c.sampleRate); const d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; this.noiseBuf = b; return true;
  },
  ok() { return S.settings.sound && this.init() && this.ctx.state === 'running'; },
  tone(f, t, d, type = 'square', v = 0.2, dest, slide) {
    const c = this.ctx; const o = c.createOscillator(); const g = c.createGain(); const T = c.currentTime + t;
    o.type = type; o.frequency.setValueAtTime(f, T); if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, slide), T + d);
    g.gain.setValueAtTime(0.0001, T); g.gain.linearRampToValueAtTime(v, T + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, T + d);
    o.connect(g); g.connect(dest || this.sfx); o.start(T); o.stop(T + d + 0.03);
  },
  noise(t, d, v = 0.3, freq = 1800, dest, q = 0.8) {
    const c = this.ctx; const s = c.createBufferSource(); s.buffer = this.noiseBuf; const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
    const g = c.createGain(); const T = c.currentTime + t; g.gain.setValueAtTime(v, T); g.gain.exponentialRampToValueAtTime(0.0001, T + d);
    s.connect(f); f.connect(g); g.connect(dest || this.sfx); s.start(T); s.stop(T + d + 0.02);
  },
  play(n, x = 0) {
    try {
      if (!this.ok()) return;
      const N = f => 440 * Math.pow(2, (f - 69) / 12);
      switch (n) {
        case 'coin': this.tone(N(83), 0, 0.07, 'square', 0.12); this.tone(N(88), 0.07, 0.22, 'square', 0.12); break;
        case 'start': [72, 76, 79, 84].forEach((m, i) => this.tone(N(m), i * 0.07, 0.16, 'square', 0.12)); break;
        case 'pick': this.tone(N(84 + (x % 5)), 0, 0.05, 'triangle', 0.14); break;
        case 'hit': this.noise(0, 0.12, 0.35, 2600); this.tone(N(64), 0, 0.14, 'square', 0.16, null, N(40)); this.tone(N(76 + Math.min(x, 8)), 0.02, 0.12, 'triangle', 0.12); break;
        case 'crit': this.noise(0, 0.18, 0.4, 3200); [79, 83, 86, 91].forEach((m, i) => this.tone(N(m), i * 0.045, 0.14, 'square', 0.1)); break;
        case 'wrong': this.tone(N(46), 0, 0.22, 'sawtooth', 0.12); this.tone(N(45), 0.05, 0.22, 'square', 0.08); break;
        case 'hurt': this.tone(110, 0, 0.3, 'sine', 0.4, null, 45); this.noise(0, 0.25, 0.25, 500, null, 0.5); break;
        case 'tick': this.tone(N(96), 0, 0.03, 'square', 0.06); break;
        case 'kill': this.noise(0, 0.5, 0.45, 900, null, 0.4); [60, 64, 67, 72, 76, 79, 84].forEach((m, i) => this.tone(N(m), 0.08 + i * 0.05, 0.18, 'square', 0.09)); break;
        case 'clear': [72, 76, 79, 84, 79, 84, 88].forEach((m, i) => this.tone(N(m), i * 0.09, 0.2, i === 6 ? 'triangle' : 'square', 0.1)); break;
        case 'boss': this.tone(90, 0, 0.9, 'sawtooth', 0.22, null, 40); this.noise(0.1, 0.8, 0.2, 300, null, 0.4); [45, 44, 43].forEach((m, i) => this.tone(N(m), 0.2 + i * 0.25, 0.3, 'square', 0.12)); break;
        case 'item': [76, 83, 88].forEach((m, i) => this.tone(N(m), i * 0.06, 0.2, 'triangle', 0.14)); break;
        case 'over': [67, 63, 60, 55, 48].forEach((m, i) => this.tone(N(m), i * 0.18, 0.3, 'square', 0.12)); break;
        case 'spawn': this.tone(N(50), 0, 0.35, 'triangle', 0.18, null, N(62)); break;
      }
    } catch (e) {}
  },
  /* musik: sequencer 16-langkah dengan lookahead */
  SONGS: {
    battle: { bpm: 138, bass: [45, 0, 45, 57, 0, 45, 52, 0, 43, 0, 43, 55, 0, 43, 50, 0, 41, 0, 41, 53, 0, 41, 48, 0, 40, 0, 40, 52, 0, 44, 47, 0],
      lead: [69, 0, 72, 0, 76, 0, 74, 72, 67, 0, 71, 0, 74, 0, 72, 71, 65, 0, 69, 0, 72, 0, 74, 76, 64, 0, 68, 0, 71, 72, 71, 68] },
    boss: { bpm: 158, bass: [40, 40, 52, 40, 40, 51, 40, 50, 38, 38, 50, 38, 38, 49, 38, 48, 36, 36, 48, 36, 36, 47, 36, 46, 35, 35, 47, 35, 39, 42, 45, 47],
      lead: [76, 0, 75, 76, 0, 79, 0, 76, 74, 0, 72, 74, 0, 77, 0, 74, 72, 0, 71, 72, 0, 76, 0, 72, 71, 0, 72, 74, 75, 74, 72, 71] }
  },
  music(name) {
    this.stopMusic(); if (!name || !(S.game && S.game.music !== false) || !this.ok()) return;
    this.song = this.SONGS[name]; this.step = 0; this.next = this.ctx.currentTime + 0.08; this.on = true;
    this.timer = setInterval(() => this.sched(), 25);
  },
  sched() {
    if (!this.on || !this.ctx) return; const c = this.ctx; const sp = 60 / this.song.bpm / 2;   // langkah = 1/8
    const N = f => 440 * Math.pow(2, (f - 69) / 12);
    while (this.next < c.currentTime + 0.12) {
      const k = this.step % 32; const t = this.next - c.currentTime; const b = this.song.bass[k]; const l = this.song.lead[k];
      if (b) this.tone(N(b), t, sp * 0.9, 'triangle', 0.5, this.mus);
      if (l) this.tone(N(l), t, sp * 0.8, 'square', 0.16, this.mus);
      if (k % 4 === 0) this.tone(150, t, 0.12, 'sine', 0.7, this.mus, 40);         // kick
      if (k % 4 === 2) this.noise(t, 0.06, 0.18, 6000, this.mus, 1.2);             // hat
      if (k % 8 === 4) this.noise(t, 0.12, 0.35, 1800, this.mus, 0.7);             // snare
      this.next += sp; this.step++;
    }
  },
  stopMusic() { this.on = false; clearInterval(this.timer); this.timer = 0; }
};

/* ---------------- GRAFIS: monster anime (SVG buatan sendiri) ---------------- */
const MON_TYPES = ['slime', 'bat', 'ghost', 'shroom', 'neko', 'oni'];
const MON_PAL = [['#7ee0c3', '#3fb895', '#1f7a62'], ['#ff9ec4', '#ff6fa5', '#b83b6f'], ['#a9b8ff', '#7b8cff', '#4353c2'], ['#ffd27a', '#ffb13d', '#b86f10'], ['#c7a2ff', '#a06bff', '#6532c2'], ['#ff8f7a', '#ff5f4a', '#b3301f']];
function monEyes(x1, x2, y, mood) {
  if (mood === 'hurt') return `<path d="M${x1 - 9} ${y - 5} L${x1 + 7} ${y + 3} M${x1 - 9} ${y + 5} L${x1 + 7} ${y - 3}" stroke="#2a2440" stroke-width="4" stroke-linecap="round"/><path d="M${x2 + 9} ${y - 5} L${x2 - 7} ${y + 3} M${x2 + 9} ${y + 5} L${x2 - 7} ${y - 3}" stroke="#2a2440" stroke-width="4" stroke-linecap="round"/>`;
  const e = (x, flip) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="12" fill="#2a2440"/><ellipse cx="${x}" cy="${y + 3}" rx="7" ry="7.5" fill="${mood === 'angry' ? '#ff4d6d' : '#5b6cff'}"/><circle cx="${x + (flip ? 3 : -3)}" cy="${y - 5}" r="3.6" fill="#fff"/><circle cx="${x + (flip ? -3 : 3)}" cy="${y + 5}" r="1.6" fill="#fff"/>`;
  const brow = mood === 'angry' ? `<path d="M${x1 - 12} ${y - 17} L${x1 + 8} ${y - 11}" stroke="#2a2440" stroke-width="4" stroke-linecap="round"/><path d="M${x2 + 12} ${y - 17} L${x2 - 8} ${y - 11}" stroke="#2a2440" stroke-width="4" stroke-linecap="round"/>` : '';
  return e(x1, false) + e(x2, true) + brow;
}
function monSVG(type, pal, mood = 'idle', boss) {
  const [a, b, d] = pal; const blush = `<ellipse cx="62" cy="112" rx="9" ry="5" fill="#ff7aa2" opacity=".45"/><ellipse cx="138" cy="112" rx="9" ry="5" fill="#ff7aa2" opacity=".45"/>`;
  const mouth = mood === 'hurt' ? `<ellipse cx="100" cy="122" rx="8" ry="9" fill="#2a2440"/>` : mood === 'angry'
    ? `<path d="M84 118 Q100 112 116 118 L112 126 Q100 121 88 126Z" fill="#2a2440"/><path d="M89 119 l4 7 4 -6 M103 119 l4 7 4 -6" fill="#fff"/>`
    : `<path d="M86 116 Q100 128 114 116" fill="none" stroke="#2a2440" stroke-width="4" stroke-linecap="round"/><path d="M93 118 l3 6 3 -5" fill="#fff"/>`;
  const crown = boss ? `<path d="M70 38 L78 14 L90 32 L100 8 L110 32 L122 14 L130 38Z" fill="#ffd54a" stroke="#b8860b" stroke-width="3"/><circle cx="100" cy="24" r="5" fill="#ff4d6d"/>` : '';
  let body = '';
  switch (type) {
    case 'slime': body = `<path d="M30 150 Q22 92 60 64 Q100 34 140 64 Q178 92 170 150 Q150 162 100 162 Q50 162 30 150Z" fill="${a}" stroke="${d}" stroke-width="4"/><path d="M52 80 Q66 62 86 60" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7" fill="none"/><circle cx="148" cy="96" r="6" fill="#fff" opacity=".6"/>${monEyes(78, 122, 98, mood)}`; break;
    case 'bat': body = `<path d="M100 70 L20 40 Q34 80 18 110 Q46 100 62 118Z" fill="${b}" stroke="${d}" stroke-width="4"/><path d="M100 70 L180 40 Q166 80 182 110 Q154 100 138 118Z" fill="${b}" stroke="${d}" stroke-width="4"/><circle cx="100" cy="108" r="46" fill="${a}" stroke="${d}" stroke-width="4"/><path d="M68 72 L60 44 L84 64Z M132 72 L140 44 L116 64Z" fill="${a}" stroke="${d}" stroke-width="4" stroke-linejoin="round"/>${monEyes(82, 118, 102, mood)}`; break;
    case 'ghost': body = `<path d="M42 162 L42 96 Q42 46 100 46 Q158 46 158 96 L158 162 L140 148 L122 162 L104 148 L86 162 L68 148 Z" fill="${a}" stroke="${d}" stroke-width="4" stroke-linejoin="round"/><path d="M24 110 Q34 96 44 104 M176 110 Q166 96 156 104" stroke="${d}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="64" cy="70" r="7" fill="#fff" opacity=".6"/>${monEyes(80, 120, 98, mood)}`; break;
    case 'shroom': body = `<path d="M26 92 Q30 30 100 28 Q170 30 174 92 Q140 104 100 104 Q60 104 26 92Z" fill="${b}" stroke="${d}" stroke-width="4"/><circle cx="64" cy="62" r="11" fill="#fff" opacity=".85"/><circle cx="118" cy="50" r="8" fill="#fff" opacity=".85"/><circle cx="148" cy="76" r="9" fill="#fff" opacity=".85"/><path d="M58 100 Q54 160 100 162 Q146 160 142 100" fill="#fff4e0" stroke="${d}" stroke-width="4"/>${monEyes(82, 118, 124, mood)}`; break;
    case 'neko': body = `<path d="M50 70 L44 22 L84 52Z M150 70 L156 22 L116 52Z" fill="${a}" stroke="${d}" stroke-width="4" stroke-linejoin="round"/><path d="M56 60 L54 38 L72 52Z M144 60 L146 38 L128 52Z" fill="#ffb6cf"/><ellipse cx="100" cy="108" rx="66" ry="56" fill="${a}" stroke="${d}" stroke-width="4"/><path d="M44 118 L18 112 M44 126 L20 130 M156 118 L182 112 M156 126 L180 130" stroke="${d}" stroke-width="3" stroke-linecap="round"/><path d="M160 150 Q196 150 186 110" stroke="${b}" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="100" cy="68" r="5" fill="#ffd54a"/>${monEyes(78, 122, 100, mood)}`; break;
    case 'oni': body = `<path d="M62 60 L54 22 L80 48Z M138 60 L146 22 L120 48Z" fill="#fff4e0" stroke="${d}" stroke-width="4" stroke-linejoin="round"/><rect x="36" y="46" width="128" height="116" rx="52" fill="${a}" stroke="${d}" stroke-width="4"/><path d="M50 62 Q100 36 150 62 L150 76 Q100 60 50 76Z" fill="${d}" opacity=".85"/>${monEyes(80, 120, 100, mood)}`; break;
    case 'dragon': body = `<path d="M40 70 Q10 40 20 10 Q44 34 64 52Z M160 70 Q190 40 180 10 Q156 34 136 52Z" fill="${b}" stroke="${d}" stroke-width="4"/><path d="M30 150 Q20 70 100 56 Q180 70 170 150 Q140 170 100 168 Q60 170 30 150Z" fill="${a}" stroke="${d}" stroke-width="4"/><path d="M64 150 Q100 132 136 150" stroke="${d}" stroke-width="3" fill="none"/><path d="M60 76 L50 58 M140 76 L150 58" stroke="#fff4e0" stroke-width="7" stroke-linecap="round"/><path d="M86 134 L90 144 L94 134 M106 134 L110 144 L114 134" fill="#fff"/>${monEyes(78, 122, 102, mood === 'idle' ? 'angry' : mood)}`; break;
  }
  const face = type === 'dragon' ? '' : blush + mouth;
  return `<svg viewBox="0 0 200 180" class="mon-svg" aria-hidden="true"><ellipse cx="100" cy="170" rx="62" ry="8" fill="#000" opacity=".22"/>${body}${face}${crown}</svg>`;
}
/* latar panggung per tema */
const ARC_THEMES = [
  { k: 'city', n: 'Taipei Malam', sky: ['#1a1446', '#4b2a7a', '#ff7fa8'] },
  { k: 'bamboo', n: 'Hutan Bambu', sky: ['#0f2e2a', '#1f5a47', '#9be8c1'] },
  { k: 'market', n: 'Pasar Malam', sky: ['#2a1030', '#6a1f45', '#ffb36b'] },
  { k: 'temple', n: 'Kuil Lentera', sky: ['#1b1030', '#58204a', '#ff6b6b'] },
  { k: 'volcano', n: 'Gunung Api', sky: ['#1a0a0a', '#5a1414', '#ff8a3d'] }
];
function arcBG(th) {
  const [s1, s2, s3] = th.sky;
  const layers = {
    city: `<g fill="#2b1f5c"><rect x="10" y="120" width="40" height="90"/><rect x="60" y="96" width="30" height="114"/><path d="M110 210 V70 l8 -30 l8 30 V210Z"/><rect x="140" y="110" width="44" height="100"/><rect x="200" y="86" width="36" height="124"/><rect x="250" y="126" width="60" height="84"/><rect x="320" y="100" width="34" height="110"/><rect x="364" y="130" width="40" height="80"/></g><g fill="#ffd56b" opacity=".75">${Array.from({ length: 26 }, (_, i) => `<rect x="${14 + (i * 37) % 380}" y="${130 + (i * 23) % 70}" width="4" height="5"/>`).join('')}</g>`,
    bamboo: `<g stroke="#2d7a5f" stroke-width="9" opacity=".8">${Array.from({ length: 9 }, (_, i) => `<line x1="${20 + i * 46}" y1="210" x2="${26 + i * 46}" y2="0"/>`).join('')}</g><g fill="#4fbf8f" opacity=".7">${Array.from({ length: 14 }, (_, i) => `<path d="M${30 + (i * 53) % 390} ${40 + (i * 31) % 120} q16 -8 30 0 q-16 6 -30 0Z"/>`).join('')}</g>`,
    market: `<path d="M0 60 Q100 90 200 60 Q300 30 410 60" stroke="#ffcf6b" stroke-width="2" fill="none"/>${Array.from({ length: 9 }, (_, i) => `<g transform="translate(${20 + i * 46} ${60 + (i % 2 ? 10 : 0)})"><rect x="-9" y="0" width="18" height="24" rx="8" fill="#ff5a5a"/><rect x="-9" y="10" width="18" height="3" fill="#ffd56b"/></g>`).join('')}<g fill="#3a1638"><rect x="0" y="150" width="120" height="60"/><rect x="130" y="140" width="140" height="70"/><rect x="280" y="155" width="130" height="55"/></g><g fill="#ff9f5a" opacity=".85"><rect x="10" y="140" width="100" height="12"/><rect x="140" y="130" width="120" height="12"/><rect x="290" y="145" width="110" height="12"/></g>`,
    temple: `<path d="M120 120 L205 80 L290 120Z" fill="#7a1f2e"/><rect x="140" y="120" width="130" height="90" fill="#5a1422"/><path d="M110 122 Q205 96 300 122" stroke="#ffcf6b" stroke-width="4" fill="none"/>${[40, 90, 320, 370].map(x => `<g transform="translate(${x} 70)"><ellipse rx="12" ry="15" fill="#ff5a5a"/><rect x="-3" y="-20" width="6" height="5" fill="#ffd56b"/></g>`).join('')}`,
    volcano: `<path d="M40 210 L170 70 L240 70 L370 210Z" fill="#3a0e0e"/><path d="M170 70 L205 110 L240 70Z" fill="#ff6a2a"/><g fill="#ff9a4a" opacity=".6">${Array.from({ length: 10 }, (_, i) => `<circle cx="${180 + (i * 17) % 60}" cy="${50 - (i * 11) % 40}" r="${2 + i % 3}"/>`).join('')}</g>`
  }[th.k];
  return `<svg class="arc-bg" viewBox="0 0 410 210" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><linearGradient id="sky-${th.k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s1}"/><stop offset=".6" stop-color="${s2}"/><stop offset="1" stop-color="${s3}"/></linearGradient></defs><rect width="410" height="210" fill="url(#sky-${th.k})"/>${Array.from({ length: 18 }, (_, i) => `<circle cx="${(i * 71) % 410}" cy="${(i * 29) % 90}" r="${i % 3 ? 1 : 1.6}" fill="#fff" opacity=".7"/>`).join('')}<circle cx="340" cy="40" r="18" fill="#fff6d6" opacity=".9"/>${layers}<rect y="188" width="410" height="22" fill="#000" opacity=".28"/></svg>`;
}

/* ---------------- DATA KATA ---------------- */
function arcPool() {
  let ids = Object.keys(S.cards).map(Number).filter(i => W[i] && W[i].m && W[i].l < 7);
  if (ids.length < 24) ids = [...new Set(ids.concat(A2_ORDER.slice(0, 80)))];
  // satu arti = satu kata supaya jawaban tidak ambigu
  const seen = new Set(); return ids.filter(i => { const m = meanP(W[i]); const h = W[i].w; if (seen.has(m) || seen.has(h)) return false; seen.add(m); seen.add(h); return true; });
}
const MON_NAME = { slime: 'Slime', bat: 'Kelelawar', ghost: 'Hantu', shroom: 'Jamur', neko: 'Neko', oni: 'Oni', dragon: 'Naga' };
const MON_ZH = { slime: '史萊姆', bat: '蝙蝠', ghost: '幽靈', shroom: '蘑菇怪', neko: '貓妖', oni: '鬼', dragon: '魔龍' };

/* ---------------- MESIN GAME ---------------- */
let G = null;
const ARC_DIFF = { easy: { t: 12, py: true, mean: true }, normal: { t: 9, py: false, mean: true }, hard: { t: 11, py: false, mean: false } };
const ARC_KEYS = ['q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 'z', 'x', 'c', 'v'];
const ARC_PRICE = { hint: 30, freeze: 25, heal: 45 };
function arcState() {
  S.game = S.game && typeof S.game === 'object' ? S.game : {};
  const g = S.game; g.coins = +g.coins || 0; g.best = g.best && typeof g.best === 'object' ? g.best : { stage: 0, score: 0 };
  g.inv = g.inv && typeof g.inv === 'object' ? g.inv : { hint: 2, freeze: 1, heal: 1 }; g.plays = +g.plays || 0; if (g.music === undefined) g.music = true;
  ['hint', 'freeze', 'heal'].forEach(k => { g.inv[k] = Math.max(0, +g.inv[k] || 0); });
  return g;
}
function openArcade(diff) {
  arcState(); hushAll(); closeModal();
  G = { diff: diff || S.game.diff || 'normal', stage: 0, hp: 5, maxHp: 5, coins: 0, combo: 0, maxCombo: 0, hits: 0, miss: 0, score: 0, missed: {}, phase: 'title', raf: 0, paused: false, pool: arcPool() };
  let el = $('#arcade'); if (el) el.remove();
  el = document.createElement('div'); el.id = 'arcade'; el.className = 'arc'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Arcade');
  el.innerHTML = arcShell(); document.body.appendChild(el); document.body.classList.add('in-arcade');
  el.addEventListener('click', arcClick);
  arcTitle();
}
function arcShell() {
  return `<div class="cab">
    <div class="marquee"><span class="mq-l hz">漢字</span><b>MONSTER</b><span class="mq-r">ARCADE</span></div>
    <div class="screen" id="ascreen">
      <div class="scene" id="ascene"></div>
      <div class="hud"><div class="hearts" id="ahp"></div><div class="stage" id="astage"></div><div class="coins" id="acoin"></div>
        <div class="hud-btns"><button data-g="music" aria-label="${t('Musik')}" id="amus">${S.game.music !== false ? '🎵' : '🔇'}</button><button data-g="pause" aria-label="${t('Jeda')}">❚❚</button><button data-g="quit" aria-label="${t('Keluar')}">✕</button></div></div>
      <div class="demand" id="adem"></div>
      <div class="crt" aria-hidden="true"></div>
      <div class="ovl" id="aovl"></div>
    </div>
    <div class="panel"><div class="tiles" id="atiles"></div><div class="items" id="aitems"></div></div>
  </div>`;
}
function arcClose() {
  if (!G) return; arcStopLoop(); GA.stopMusic();
  if (['play', 'pause', 'clear', 'loot'].includes(G.phase)) arcFinish(true);
  const el = $('#arcade'); if (el) el.remove(); document.body.classList.remove('in-arcade'); G = null; render();
}
/* ---- layar judul ---- */
function arcTitle() {
  G.phase = 'title'; arcHud();
  $('#ascene').innerHTML = `${arcBG(ARC_THEMES[0])}<div class="ahero">${mascot('wave', 96)}</div><div class="mon mon-idle">${monSVG('slime', MON_PAL[0])}</div>`;
  $('#adem').innerHTML = ''; $('#atiles').innerHTML = ''; arcItems();
  const g = S.game; const d = G.diff;
  $('#aovl').innerHTML = `<div class="ov-card title">
    <div class="ttl hz">漢字<span>MONSTER</span></div>
    <p>${t('Monster hanya kalah oleh kata yang tepat. Baca artinya, lalu pilih hanzinya sebelum waktunya habis!')}</p>
    <div class="seg dif">${['easy', 'normal', 'hard'].map(k => `<button class="${d === k ? 'on' : ''}" data-g="diff" data-v="${k}">${t({ easy: 'Mudah', normal: 'Normal', hard: 'Sulit 🎧' }[k])}</button>`).join('')}</div>
    <div class="small dif-note">${t({ easy: 'Arti + pinyin, waktu 12 detik', normal: 'Arti saja, waktu 9 detik', hard: 'Hanya suara — dengarkan, lalu pilih' }[d])}</div>
    <button class="btn-arc" data-g="start">▶ ${t('MULAI')}</button>
    <div class="row wrap" style="justify-content:center;gap:8px"><button class="btn-arc sec" data-g="shop">🛒 ${t('Toko')} · ${g.coins}🪙</button><button class="btn-arc sec" data-g="how">? ${t('Cara main')}</button></div>
    <div class="small best">${t('Rekor')}: ${t('Stage')} ${g.best.stage} · ${fmtN(g.best.score)} ${t('poin')} · ${G.pool.length} ${t('kata siap')}</div>
    <div class="insert">INSERT COIN</div></div>`;
}
function arcHow() {
  $('#aovl').innerHTML = `<div class="ov-card how"><h3>${t('Cara main')}</h3><ol>
    <li>${t('Setiap monster punya perisai berisi beberapa arti kata.')}</li>
    <li>${t('Ketuk hanzi yang artinya cocok dengan salah satu perisai — urutan bebas.')}</li>
    <li>${t('Jawab cepat (kurang dari 3 detik) = serangan KRITIS, koin dobel.')}</li>
    <li>${t('Salah atau waktu habis = monster menyerang, nyawamu berkurang.')}</li>
    <li>${t('Setiap 5 stage muncul BOS dengan perisai lebih banyak.')}</li>
    <li>${t('Pakai item: 💡 petunjuk, ⏱ bekukan waktu, ❤ ramuan nyawa. Beli di Toko dengan koin.')}</li>
    <li>${t('Kata yang salah kembali sebagai 👿 monster balas dendam. Kata jatuh tempo yang benar dihitung sebagai ⚔ ulangan.')}</li>
    <li>${t('🎵 Bonus nada: tebak nada suku kata yang menyala untuk koin ekstra. 8 benar beruntun = 🔥 FEVER ×2.')}</li></ol>
    <p class="small">${t('Keyboard: Q W E R / A S D F / Z X C V untuk memilih petak, Esc untuk jeda.')}</p>
    <button class="btn-arc" data-g="title">${t('Mengerti!')}</button></div>`;
}
function arcShop() {
  const g = arcState();
  const it = (k, ic, nm, ds) => `<div class="shop-it"><span class="si-ic">${ic}</span><div class="grow"><b>${t(nm)}</b><small>${t(ds)}</small></div><span class="si-n">×${g.inv[k]}</span><button class="btn-arc sm ${g.coins < ARC_PRICE[k] ? 'dis' : ''}" data-g="buy" data-v="${k}">${ARC_PRICE[k]}🪙</button></div>`;
  $('#aovl').innerHTML = `<div class="ov-card shop"><h3>🛒 ${t('Toko')} <span class="coinbal">${g.coins}🪙</span></h3>
    ${it('hint', '💡', 'Petunjuk', 'Satu petak jawaban menyala')}${it('freeze', '⏱', 'Bekukan waktu', '+6 detik untuk pilihan ini')}${it('heal', '❤', 'Ramuan', 'Pulihkan 1 nyawa')}
    <p class="small">${t('Koin didapat dari setiap monster yang kalah.')}</p>
    <button class="btn-arc" data-g="${G.phase === 'over' ? 'overback' : 'title'}">${t('Kembali')}</button></div>`;
}
/* ---- mulai & stage ---- */
function arcStart() {
  GA.init(); GA.play('start'); arcState().plays++; S.game.diff = G.diff; save();
  Object.assign(G, { stage: 0, hp: 5, coins: 0, combo: 0, maxCombo: 0, hits: 0, miss: 0, score: 0, missed: {}, pool: arcPool(), revenge: [], revd: {}, reviews: 0, toneOk: 0, fever: false, fevers: 0, bonus: null }); const scr = $('#ascreen'); if (scr) scr.classList.remove('fever');
  $('#aovl').innerHTML = ''; arcNextStage();
}
function arcPickWords(n, boss) {
  const pool = G.pool;
  // kata yang tadi salah kembali sebagai "monster balas dendam" (pengulangan berjarak di dalam permainan)
  const rev = []; while ((G.revenge || []).length && rev.length < (boss ? 2 : 1)) { const r = G.revenge.shift(); if (!rev.includes(r)) rev.push(r); }
  const used = new Set([...(G.used || []), ...rev]);
  // utamakan kata yang peluang ingatnya rendah → game sekaligus mengulang
  const cand = shuffle(pool.filter(i => !used.has(i))).map(i => [i, (S.cards[i] ? recallProb(i) : 0.5) + Math.random() * 0.6]).sort((a, b) => a[1] - b[1]).slice(0, n).map(x => x[0]);
  const all = [...rev, ...cand].slice(0, n); G.lastRevenge = rev;
  G.used = [...(G.used || []), ...all].slice(-60);
  return all.length >= n ? all : shuffle(pool).slice(0, n);
}
function arcNextStage() {
  G.stage++; const boss = G.stage % 5 === 0;
  const need = boss ? 5 : G.stage >= 8 ? 4 : 3;
  const th = ARC_THEMES[Math.floor((G.stage - 1) / 5) % ARC_THEMES.length];
  const type = boss ? 'dragon' : MON_TYPES[(G.stage - 1) % MON_TYPES.length];
  const pal = MON_PAL[(G.stage * 7) % MON_PAL.length];
  const needIds = arcPickWords(need, boss); const isRev = (G.lastRevenge || []).length > 0;
  G.mon = { type, pal, boss, need: needIds, got: [], rev: isRev, name: `${isRev ? '👿 ' : ''}${t(MON_NAME[type])}${boss ? ' ' + t('BOS') : ''}`, zh: MON_ZH[type] };
  G.phase = 'play'; G.th = th;
  $('#ascene').innerHTML = `${arcBG(th)}<div class="ahero" id="ahero">${mascot('happy', 96)}</div>
    <div class="mon spawn ${boss ? 'boss' : ''}" id="amon">${monSVG(type, pal, 'idle', boss)}</div>
    <div class="mon-name"><b>${esc(G.mon.name)}</b> <span class="hz">${G.mon.zh}</span><div class="mhp" id="amhp"></div></div><div class="fx" id="afx"></div>`;
  arcBanner(boss ? `⚠ ${t('BOS')} · ${t('Stage')} ${G.stage}` : `${t('Stage')} ${G.stage} · ${t(th.n)}`, boss);
  GA.play(boss ? 'boss' : 'spawn'); GA.music(boss ? 'boss' : 'battle');
  arcBuildTiles(); arcDemand(); arcHud(); arcItems();
  setTimeout(() => { const m = $('#amon'); if (m) m.classList.remove('spawn'); }, 700);
  arcResetTimer(700);
  if (G.diff === 'hard') setTimeout(() => arcSayNext(), 900);
}
function arcBanner(txt, boss) {
  const fx = $('#ascreen'); if (!fx) return; const b = document.createElement('div'); b.className = 'banner' + (boss ? ' boss' : ''); b.textContent = txt; fx.appendChild(b); setTimeout(() => b.remove(), 1600);
}
function arcRemaining() { return G.mon.need.filter(i => !G.mon.got.includes(i)); }
function arcBuildTiles() {
  const rem = arcRemaining(); const want = 12;
  const remHz = new Set(rem.map(i => W[i].w));
  // pengecoh: sebagian sengaja berbagi huruf dengan jawaban (lebih menantang & melatih mata)
  const others = G.pool.filter(i => !G.mon.need.includes(i) && !remHz.has(W[i].w));
  const shareChar = others.filter(i => rem.some(r => [...W[r].s].some(c => isHan(c) && W[i].s.includes(c))));
  const dist = [...shuffle(shareChar).slice(0, 4)]; for (const i of shuffle(others)) { if (dist.length >= want - rem.length) break; if (!dist.includes(i)) dist.push(i); }
  G.tiles = shuffle([...rem, ...dist]).slice(0, want);
  arcRenderTiles();
}
function arcRenderTiles() {
  const box = $('#atiles'); if (!box) return;
  box.innerHTML = G.tiles.map((i, k) => { const w = W[i]; const hz = w.w.replace(/[()]/g, ''); return `<button class="tile t${k % 6}" data-g="tile" data-v="${i}" id="at${k}"><span class="hz ${hz.length > 3 ? 'l4' : hz.length > 2 ? 'l3' : ''}">${esc(hz)}</span><kbd>${ARC_KEYS[k].toUpperCase()}</kbd></button>`; }).join('');
}
function arcDemand() {
  const d = ARC_DIFF[G.diff];
  $('#adem').innerHTML = `<div class="slots">${G.mon.need.map((i, k) => { const w = W[i]; const got = G.mon.got.includes(i);
    return `<button class="slot ${got ? 'got' : ''}" data-g="say" data-v="${i}">${got ? `<span class="hz">${esc(w.w.replace(/[()]/g, ''))}</span><small>${esc(aligned(w) ? w.y.join(' ') : w.p)}</small>`
      : d.mean ? `<span class="sm">${esc(meanP(w))}</span>${d.py ? `<small>${esc(aligned(w) ? w.y.join(' ') : w.p)}</small>` : ''}` : `<span class="sm">🎧 ${k + 1}</span>`}</button>`; }).join('')}</div>
    <div class="tbar"><i id="atbar"></i></div>`;
}
function arcHud() {
  if (!G) return; const h = $('#ahp'); if (h) h.innerHTML = Array.from({ length: G.maxHp }, (_, k) => `<i class="${k < G.hp ? 'on' : ''}">❤</i>`).join('');
  const s = $('#astage'); if (s) s.innerHTML = G.stage ? `${t('Stage')} <b>${G.stage}</b>${G.combo >= 3 ? ` · <span class="cmb">${G.combo}× COMBO</span>` : ''}${G.fever ? ' <span class="fvr">FEVER×2</span>' : ''}` : '';
  const c = $('#acoin'); if (c) c.textContent = `${G.coins}🪙`;
  const m = $('#amhp'); if (m && G.mon) m.innerHTML = G.mon.need.map((i, k) => `<i class="${k < G.mon.need.length - G.mon.got.length ? 'on' : ''}"></i>`).join('');
}
function arcItems() {
  const g = arcState(); const box = $('#aitems'); if (!box) return;
  const on = G && G.phase === 'play';
  box.innerHTML = [['hint', '💡'], ['freeze', '⏱'], ['heal', '❤']].map(([k, ic]) => `<button class="item ${!on || !g.inv[k] ? 'dis' : ''}" data-g="use" data-v="${k}" aria-label="${k}">${ic}<b>${g.inv[k]}</b></button>`).join('') +
    `<button class="item say ${on && G.diff === 'hard' ? '' : 'dis'}" data-g="sayn" aria-label="${t('Dengar lagi')}">🎧</button>`;
}
/* ---- timer (rAF) ---- */
function arcDur() { const base = ARC_DIFF[G.diff].t + (G.mon && G.mon.boss ? 2 : 0); return Math.max(5, base - (G.stage - 1) * 0.25) * 1000; }
function arcResetTimer(delay = 0) { G.tDur = arcDur(); G.tStart = performance.now() + delay; G.tFreeze = 0; G.lastTick = 0; arcStartLoop(); }
function arcStartLoop() { if (!G.raf) G.raf = requestAnimationFrame(arcLoop); }
function arcStopLoop() { if (G && G.raf) { cancelAnimationFrame(G.raf); G.raf = 0; } }
function arcLoop(now) {
  if (!G) return; G.raf = 0;
  if (G.phase !== 'play' || G.paused) return;
  if (G.tFreeze && now < G.tFreeze) { G.tStart += 16.7; }
  const left = Math.max(0, G.tDur - Math.max(0, now - G.tStart)); const f = left / G.tDur;
  const bar = $('#atbar'); if (bar) { bar.style.transform = `scaleX(${f})`; bar.classList.toggle('low', f < 0.3); bar.classList.toggle('frz', !!(G.tFreeze && now < G.tFreeze)); }
  if (left < 3000 && left > 0) { const s = Math.ceil(left / 1000); if (s !== G.lastTick) { G.lastTick = s; GA.play('tick'); } }
  if (left <= 0) { arcTimeout(); return; }
  G.raf = requestAnimationFrame(arcLoop);
}
/* ---- aksi ---- */
function arcTile(btn) {
  if (!G || G.phase !== 'play' || G.paused || G.busy) return;
  const i = +btn.dataset.v; const rem = arcRemaining(); const ms = performance.now() - G.tStart;
  GA.play('pick', G.combo);
  if (rem.includes(i)) arcHit(i, btn, ms);
  else arcWrong(i, btn);
}
function arcHit(i, btn, ms) {
  const w = W[i]; const crit = ms < 3000; G.mon.got.push(i); G.hits++; G.combo++; G.maxCombo = Math.max(G.maxCombo, G.combo);
  if (G.combo >= 8 && !G.fever) arcFever(true);
  const gain = ((crit ? 4 : 2) + (G.combo >= 5 ? 1 : 0)) * (G.fever ? 2 : 1); G.coins += gain; G.score += ((crit ? 180 : 100) + G.combo * 10) * (G.fever ? 2 : 1);
  const day = dayRec(); day.ok++; day.game = (day.game || 0) + 1; arcReview(i, true, ms);
  if (voiceOK()) TTS.speak(w.s);
  // proyektil hanzi terbang dari petak ke monster
  const sc = $('#ascreen').getBoundingClientRect(); const b = btn.getBoundingClientRect(); const m = $('#amon').getBoundingClientRect();
  const p = document.createElement('div'); p.className = 'proj hz' + (crit ? ' crit' : ''); p.textContent = w.w.replace(/[()]/g, '');
  p.style.left = (b.left + b.width / 2 - sc.left) + 'px'; p.style.top = (Math.min(b.top, sc.bottom - 20) - sc.top) + 'px';
  p.style.setProperty('--dx', (m.left + m.width / 2 - (b.left + b.width / 2)) + 'px'); p.style.setProperty('--dy', (m.top + m.height / 2 - Math.min(b.top, sc.bottom - 20)) + 'px');
  $('#ascreen').appendChild(p); setTimeout(() => p.remove(), 520);
  btn.classList.add('used'); G.busy = true;
  const hero = $('#ahero'); if (hero) { hero.innerHTML = mascot(crit ? 'wow' : 'joy', 96); hero.classList.remove('atk'); void hero.offsetWidth; hero.classList.add('atk'); }
  setTimeout(() => {
    if (!G || !$('#amon')) return; G.busy = false;
    GA.play(crit ? 'crit' : 'hit', G.combo);
    const mon = $('#amon'); const done = arcRemaining().length === 0;
    mon.innerHTML = monSVG(G.mon.type, G.mon.pal, 'hurt', G.mon.boss); mon.classList.remove('hurt'); void mon.offsetWidth; mon.classList.add('hurt');
    arcFx(crit ? 'CRIT!' : '-1', crit, w); arcShake(crit ? 'm' : 's');
    setTimeout(() => { const mm = $('#amon'); if (mm && G && !done) mm.innerHTML = monSVG(G.mon.type, G.mon.pal, 'idle', G.mon.boss); }, 420);
    arcDemand(); arcHud();
    if (done) return arcKill();
    // ganti petak yang terpakai dengan pengecoh baru
    const k = G.tiles.indexOf(i); const nx = G.pool.find(x => !G.tiles.includes(x) && !G.mon.need.includes(x) && Math.random() < 0.3) || G.pool.find(x => !G.tiles.includes(x) && !G.mon.need.includes(x));
    if (k >= 0 && nx !== undefined) { G.tiles[k] = nx; const el = $('#at' + k); if (el) { el.classList.remove('used'); el.dataset.v = nx; el.querySelector('.hz').textContent = W[nx].w.replace(/[()]/g, ''); el.classList.add('pop'); setTimeout(() => el.classList.remove('pop'), 300); } }
    if (!G.mon.boss && Math.random() < 0.34 && toneQuizOK(w)) return arcToneBonus(i);
    arcResetTimer(150); if (G.diff === 'hard') setTimeout(() => arcSayNext(), 400);
  }, 380);
}
function arcWrong(i, btn) {
  G.miss++; G.combo = 0; arcFever(false); btn.classList.remove('bad'); void btn.offsetWidth; btn.classList.add('bad');
  const day = dayRec(); day.bad++;
  const r0 = arcRemaining()[0]; G.missed[r0] = 1; arcRevenge(r0);
  GA.play('wrong'); arcMonAttack(t('Salah!'));
}
function arcTimeout() {
  G.miss++; G.combo = 0; arcFever(false); const r = arcRemaining(); if (r.length) { G.missed[r[0]] = 1; arcRevenge(r[0]); arcReview(r[0], false, 0); }
  const day = dayRec(); day.bad++;
  // tunjukkan satu jawaban supaya tetap belajar
  const k = G.tiles.indexOf(r[0]); const el = k >= 0 && $('#at' + k); if (el) { el.classList.add('reveal'); setTimeout(() => el.classList.remove('reveal'), 1200); }
  arcMonAttack(t('Waktu habis!'));
}
function arcMonAttack(label) {
  const mon = $('#amon'); if (mon) { mon.innerHTML = monSVG(G.mon.type, G.mon.pal, 'angry', G.mon.boss); mon.classList.remove('lunge'); void mon.offsetWidth; mon.classList.add('lunge'); }
  G.busy = true;
  setTimeout(() => {
    if (!G) return; G.busy = false; G.hp--; GA.play('hurt'); arcShake('l');
    const sc = $('#ascreen'); if (sc) { sc.classList.remove('dmg'); void sc.offsetWidth; sc.classList.add('dmg'); }
    const hero = $('#ahero'); if (hero) { hero.innerHTML = mascot('oops', 96); hero.classList.remove('hit'); void hero.offsetWidth; hero.classList.add('hit'); }
    arcFx(label, false, null, true); arcHud();
    setTimeout(() => { const m = $('#amon'); if (m && G && G.mon) m.innerHTML = monSVG(G.mon.type, G.mon.pal, 'idle', G.mon.boss); const h = $('#ahero'); if (h && G) h.innerHTML = mascot('happy', 96); }, 600);
    if (G.hp <= 0) return arcGameOver();
    arcResetTimer(400);
  }, 320);
}
function arcKill() {
  arcStopLoop(); G.phase = 'clear';
  const gain = 6 + G.stage * 2 + (G.mon.boss ? 25 : 0); G.coins += gain; G.score += 300 + G.stage * 50 + (G.mon.boss ? 1000 : 0);
  GA.play('kill'); const mon = $('#amon'); if (mon) { mon.classList.add('die'); }
  arcBurst(); arcHud();
  setTimeout(() => {
    if (!G) return; GA.play('clear'); GA.play('coin');
    arcBanner(`${t('STAGE CLEAR')} +${gain}🪙`, false);
    const hero = $('#ahero'); if (hero) hero.innerHTML = mascot('joy', 96);
    setTimeout(() => { if (G && G.phase === 'clear') arcLoot(); }, 900);
  }, 650);
}
function arcFx(txt, crit, w, bad) {
  const fx = $('#afx'); if (!fx) return;
  const d = document.createElement('div'); d.className = 'dmg-n' + (crit ? ' crit' : '') + (bad ? ' bad' : ''); d.innerHTML = `${esc(txt)}${w ? `<small>${esc(aligned(w) ? w.y.join(' ') : w.p)} · ${esc(meanP(w))}</small>` : ''}`;
  fx.appendChild(d); setTimeout(() => d.remove(), 1100);
  if (!bad) { const s = document.createElement('div'); s.className = 'slash' + (crit ? ' crit' : ''); fx.appendChild(s); setTimeout(() => s.remove(), 400); }
}
function arcBurst() {
  const fx = $('#afx'); if (!fx || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let k = 0; k < 16; k++) { const p = document.createElement('i'); p.className = 'pt'; p.style.setProperty('--a', (k * 22.5) + 'deg'); p.style.setProperty('--r', (60 + Math.random() * 70) + 'px'); p.style.background = ['#ffd54a', '#ff7aa2', '#7ee0c3', '#a9b8ff'][k % 4]; fx.appendChild(p); setTimeout(() => p.remove(), 800); }
  for (let k = 0; k < 6; k++) { const c = document.createElement('i'); c.className = 'cn'; c.textContent = '🪙'; c.style.setProperty('--x', (k * 30 - 75) + 'px'); c.style.animationDelay = (k * 50) + 'ms'; fx.appendChild(c); setTimeout(() => c.remove(), 1200); }
}
function arcShake(s) { const sc = $('#ascreen'); if (!sc || matchMedia('(prefers-reduced-motion: reduce)').matches) return; sc.classList.remove('sh-s', 'sh-m', 'sh-l'); void sc.offsetWidth; sc.classList.add('sh-' + s); }
function arcSayNext() { if (!G || !G.mon) return; const r = arcRemaining(); if (r.length && voiceOK()) TTS.speak(W[r[0]].s); }
function arcUse(k) {
  const g = arcState(); if (!G || G.phase !== 'play' || G.paused || !g.inv[k]) return;
  if (k === 'heal' && G.hp >= G.maxHp) return toast(t('Nyawamu masih penuh'), 1500, 'arc');
  g.inv[k]--; save(); GA.play('item');
  if (k === 'hint') { const r = arcRemaining(); const idx = G.tiles.indexOf(r[Math.floor(Math.random() * r.length)]); const el = $('#at' + idx); if (el) { el.classList.add('hint'); setTimeout(() => el.classList.remove('hint'), 2500); } }
  if (k === 'freeze') { G.tFreeze = performance.now() + 6000; }
  if (k === 'heal') { G.hp = Math.min(G.maxHp, G.hp + 1); arcHud(); }
  arcItems();
}
function arcPause(on) {
  if (!G || (G.phase !== 'play' && G.phase !== 'pause') || G.bonus) return;
  if (on) { G.paused = true; G.pauseAt = performance.now(); G.phase = 'pause'; GA.stopMusic(); arcStopLoop();
    $('#aovl').innerHTML = `<div class="ov-card"><h3>❚❚ ${t('Jeda')}</h3><button class="btn-arc" data-g="resume">▶ ${t('Lanjut')}</button><button class="btn-arc sec" data-g="quit">${t('Selesai & lihat hasil')}</button></div>`; }
  else { G.paused = false; G.phase = 'play'; G.tStart += performance.now() - (G.pauseAt || performance.now()); $('#aovl').innerHTML = ''; GA.music(G.mon && G.mon.boss ? 'boss' : 'battle'); arcStartLoop(); }
}
function arcFinish(silent) {
  if (!G || G.finished) return; G.finished = true;
  const g = arcState(); g.coins += G.coins;
  const newBest = G.stage > g.best.stage || G.score > g.best.score;
  if (G.score > g.best.score) g.best.score = G.score; if (G.stage > g.best.stage) g.best.stage = G.stage;
  const xp = G.hits * 4 + Math.max(0, G.stage - 1) * 6; if (xp) addXP(xp, true);
  checkQuests(); save(true);
  G.newBest = newBest; G.xp = xp;
  if (!silent && xp) toast(`🕹 +${xp} XP · +${G.coins}🪙`, 2200, 'arcxp');
}
function arcGameOver() {
  arcStopLoop(); GA.stopMusic(); G.phase = 'over'; GA.play('over'); arcFinish(true); arcItems();
  const acc = G.hits + G.miss ? Math.round(G.hits / (G.hits + G.miss) * 100) : 0;
  const miss = Object.keys(G.missed).map(Number).slice(0, 8);
  $('#aovl').innerHTML = `<div class="ov-card over"><div class="go">GAME OVER</div>
    ${G.newBest ? `<div class="nb">★ ${t('REKOR BARU!')} ★</div>` : ''}
    <div class="res"><div><b>${G.stage}</b><span>${t('stage')}</span></div><div><b>${fmtN(G.score)}</b><span>${t('poin')}</span></div><div><b>${acc}%</b><span>${t('akurasi')}</span></div><div><b>${G.maxCombo}</b><span>combo</span></div></div>
    <div class="small">+${G.coins}🪙 · +${G.xp} XP${G.reviews ? ` · ⚔ ${G.reviews} ${t('ulangan terhitung')}` : ''}${G.toneOk ? ` · 🎵 ${G.toneOk} ${t('nada pas')}` : ''}</div>
    ${miss.length ? `<div class="miss"><b>${t('Kata yang perlu diulang')}</b>${miss.map(i => `<button class="mw" data-g="say" data-v="${i}"><span class="hz">${esc(W[i].w)}</span><small>${esc(aligned(W[i]) ? W[i].y.join(' ') : W[i].p)} · ${esc(meanP(W[i]))}</small></button>`).join('')}</div>` : ''}
    <div class="row wrap" style="justify-content:center;gap:8px"><button class="btn-arc" data-g="start">↻ ${t('Main lagi')}</button><button class="btn-arc sec" data-g="shop">🛒 ${t('Toko')}</button>${miss.length ? `<button class="btn-arc sec" data-g="drill">📚 ${t('Latih kata ini')}</button>` : ''}<button class="btn-arc sec" data-g="quit">${t('Keluar')}</button></div></div>`;
}
/* ---- input ---- */
function arcClick(e) {
  const b = e.target.closest('[data-g]'); if (!b || !G) return; const a = b.dataset.g;
  try {
    if (a === 'tile') return arcTile(b);
    if (a === 'start') { if (G.phase === 'over') G.finished = false; return arcStart(); }
    if (a === 'diff') { G.diff = b.dataset.v; S.game.diff = G.diff; save(); GA.init(); GA.play('pick'); return arcTitle(); }
    if (a === 'shop') { GA.init(); GA.play('pick'); return arcShop(); }
    if (a === 'how') return arcHow();
    if (a === 'title') return arcTitle();
    if (a === 'overback') return arcGameOver();
    if (a === 'buy') { const k = b.dataset.v; const g = arcState(); if (g.coins < ARC_PRICE[k]) { GA.play('wrong'); return toast(t('Koinmu belum cukup'), 1500, 'arc'); } g.coins -= ARC_PRICE[k]; g.inv[k]++; save(); GA.play('coin'); arcItems(); return arcShop(); }
    if (a === 'use') return arcUse(b.dataset.v);
    if (a === 'tone') return arcToneAnswer(+b.dataset.v);
    if (a === 'next') return arcLootNext();
    if (a === 'say') { const i = +b.dataset.v; if (voiceOK()) TTS.speak(W[i].s); return; }
    if (a === 'sayn') return arcSayNext();
    if (a === 'pause') return arcPause(true);
    if (a === 'resume') return arcPause(false);
    if (a === 'music') { S.game.music = !(S.game.music !== false); save(); b.textContent = S.game.music ? '🎵' : '🔇'; if (S.game.music && G.phase === 'play') GA.music(G.mon && G.mon.boss ? 'boss' : 'battle'); else GA.stopMusic(); return; }
    if (a === 'drill') { const ids = Object.keys(G.missed).map(Number); arcClose(); setTimeout(() => startSession(ids.map(i => ({ type: 'recall', wid: i, dir: 'hz' })).concat(ids.map(i => ({ type: safeType(i, 'mc_hanzi'), wid: i }))), { title: t('Latih kata ini') }), 80); return; }
    if (a === 'quit') { if (['pause', 'play', 'clear', 'loot'].includes(G.phase)) { clearTimeout(G.lootT); clearTimeout(G.lootN); clearTimeout(G.bonusT); G.bonus = null; arcFinish(false); G.phase = 'done'; arcStopLoop(); GA.stopMusic(); return arcGameOverOrClose(); } return arcClose(); }
  } catch (err) { console.error('arcade', err); }
}
function arcGameOverOrClose() { if (G.hits + G.miss > 0) { G.phase = 'over'; const f = G.finished; arcGameOver(); G.finished = f; } else arcClose(); }
document.addEventListener('keydown', e => {
  if (!G || !$('#arcade')) return;
  if (e.key === 'Escape') { e.preventDefault(); if (G.bonus || G.phase === 'clear') return; if (G.phase === 'loot') return arcLootNext(); if (G.phase === 'play') arcPause(true); else if (G.phase === 'pause') arcPause(false); else arcClose(); return; }
  if (G.phase === 'title' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); return arcStart(); }
  if (G.phase === 'loot' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); return arcLootNext(); }
  if (G.bonus && /^[1-4]$/.test(e.key)) { e.preventDefault(); return arcToneAnswer(+e.key); }
  if (G.phase !== 'play') return;
  const k = ARC_KEYS.indexOf(e.key.toLowerCase()); if (k >= 0) { const b = $('#at' + k); if (b) { e.preventDefault(); arcTile(b); } }
});
document.addEventListener('visibilitychange', () => { if (document.hidden && G && G.phase === 'play') arcPause(true); });
/* tombol kembali (riwayat) menutup arcade dengan rapi */
window.addEventListener('hashchange', () => { if (G && $('#arcade')) { arcStopLoop(); GA.stopMusic(); if (['play', 'pause', 'clear', 'loot'].includes(G.phase)) arcFinish(true); const el = $('#arcade'); if (el) el.remove(); document.body.classList.remove('in-arcade'); G = null; } });
