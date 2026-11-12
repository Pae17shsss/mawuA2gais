/* ========== V1.0: HURUF KEMBAR BERGERAK — UI (menu di dalam Kelas) ==========
   VK.view: 'tw' galeri set · 'twp' pemutar (reel) · 'twq' kuis. Progres: S.twin {seen:{id:1}, q:{id:{b,n,c}}, mix, speed, tts, last}. */
Object.assign(ICON_PATHS, {
  twmorph: '<path d="M4.5 6.5h6v11h-6z" opacity=".55"/><path d="M14 6.5h5.5M16.75 6.5v11M14 17.5h5.5"/><path d="M10.8 10.2c1.2-1.4 2.2-1.4 3.2 0M13.2 9.4l.9.9-.9.8"/>',
  twprev: '<path d="M15 5.5 8.5 12l6.5 6.5"/>',
  twnext: '<path d="M9 5.5 15.5 12 9 18.5"/>',
  twtap: '<path d="M9.5 11V5.8a1.6 1.6 0 0 1 3.2 0V11l3.9.8a2.2 2.2 0 0 1 1.7 2.5l-.6 3.8a3 3 0 0 1-3 2.6h-3.4a3 3 0 0 1-2.5-1.3L6 15.6a1.5 1.5 0 0 1 2.3-1.9l1.2 1.2"/>',
  twspeed: '<path d="M4.6 16.5a8 8 0 1 1 14.8 0"/><path d="m12 13 3.6-4.2"/><circle cx="12" cy="13.2" r="1.2"/>',
  twquiz: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9.6 9.6a2.4 2.4 0 1 1 3.4 2.2c-.7.3-1 .8-1 1.5v.4M12 16.6v.1"/>',
  twshuffle: '<path d="M4 7h3.2c3.4 0 4.2 10 8.6 10H20M4 17h3.2c1.4 0 2.4-1.6 3.2-3.6M13.2 10.4C14 8.6 14.8 7 16.2 7H20"/><path d="m17.6 4.6 2.4 2.4-2.4 2.4M17.6 14.6l2.4 2.4-2.4 2.4"/>'
});
Object.assign(I18N, {
  'Huruf Kembar Bergerak': ['Morphing Look-alike Hanzi', 'Gumagalaw na Kambal na Hanzi'],
  'Satu goresan bergeser, hurufnya berubah — tonton, dengar, lalu uji dirimu.': ['One stroke moves and the character changes — watch, listen, then test yourself.', 'Isang guhit ang gumagalaw at nagbabago ang hanzi — manood, makinig, at subukan ang sarili.'],
  '{n} set · satu goresan, beda arti': ['{n} sets · one stroke, new meaning', '{n} set · isang guhit, ibang kahulugan'],
  'Goresan berubah, arti berubah': ['A stroke moves, the meaning changes', 'Gumalaw ang guhit, nagbago ang kahulugan'],
  'Tonton': ['Watch', 'Panoorin'], 'Kuis campuran': ['Mixed quiz', 'Halo-halong kuis'], 'Kuis set ini': ['Quiz this set', 'Kuis sa set na ito'],
  'set dilihat': ['sets watched', 'set na napanood'], 'kuis lulus': ['quizzes passed', 'kuis na pumasa'], 'Kembali': ['Back', 'Bumalik'],
  'jarang': ['rare', 'bihira'], 'Jeda': ['Pause', 'I-pause'], 'Putar': ['Play', 'I-play'], 'Set sebelumnya': ['Previous set', 'Nakaraang set'], 'Set berikutnya': ['Next set', 'Susunod na set'],
  'Kecepatan': ['Speed', 'Bilis'], 'Suara huruf': ['Read aloud', 'Basahin nang malakas'], 'Bedanya': ['The difference', 'Ang pagkakaiba'], 'Contoh kata': ['Example words', 'Halimbawang salita'],
  'Ketuk huruf untuk melompat · ← → ganti set · Spasi jeda': ['Tap a character to jump · ← → change set · Space pause', 'I-tap ang hanzi para lumipat · ← → palit set · Space pause'],
  'Huruf apa yang muncul?': ['Which character appears?', 'Anong hanzi ang lumabas?'], 'Apa pinyin huruf ini?': ['What is the pinyin of this character?', 'Ano ang pinyin ng hanzi na ito?'],
  'Apa arti huruf ini?': ['What does this character mean?', 'Ano ang kahulugan ng hanzi na ito?'], 'Huruf mana yang cocok?': ['Which character matches?', 'Aling hanzi ang tugma?'],
  'Goresan mana yang berubah? Ketuk goresannya.': ['Which stroke changed? Tap it.', 'Aling guhit ang nagbago? I-tap ito.'],
  'Benar!': ['Correct!', 'Tama!'], 'Belum tepat': ['Not quite', 'Hindi pa tama'], 'Lanjut': ['Next', 'Susunod'], 'Lihat hasil': ['See results', 'Tingnan ang resulta'],
  'Hasil kuis': ['Quiz results', 'Resulta ng kuis'], 'Rekor': ['Best', 'Rekord'], 'Ulangi': ['Retry', 'Ulitin'], 'Ke galeri': ['To gallery', 'Sa gallery'],
  'Rekor baru!': ['New best!', 'Bagong rekord!'], 'benar': ['correct', 'tama'], 'Soal': ['Question', 'Tanong'], 'Putar ulang': ['Replay', 'I-replay'],
  'Lihat lagi gerakannya': ['Watch the move again', 'Panoorin ulit ang galaw'], 'Semua': ['All', 'Lahat'], 'Belum ditonton': ['Not watched yet', 'Hindi pa napapanood'], 'Belum lulus kuis': ['Quiz not passed', 'Hindi pa pumasa'],
  'Mulai dari yang belum': ['Start with an unwatched one', 'Simulan sa hindi pa napapanood'], 'Garis tengah huruf ini berubah': ['A stroke of this character changed', 'May guhit na nagbago']
});
Object.assign(I18N_VI, {
  'Huruf Kembar Bergerak': 'Chữ Hán sinh đôi biến hình', 'Satu goresan bergeser, hurufnya berubah — tonton, dengar, lalu uji dirimu.': 'Một nét di chuyển, chữ liền thay đổi — xem, nghe rồi tự kiểm tra.',
  '{n} set · satu goresan, beda arti': '{n} bộ · một nét, nghĩa khác', 'Goresan berubah, arti berubah': 'Nét thay đổi, nghĩa thay đổi',
  'Tonton': 'Xem', 'Kuis campuran': 'Đố tổng hợp', 'Kuis set ini': 'Đố bộ này', 'set dilihat': 'bộ đã xem', 'kuis lulus': 'bài đố đạt', 'Kembali': 'Quay lại',
  'jarang': 'hiếm', 'Jeda': 'Tạm dừng', 'Putar': 'Phát', 'Set sebelumnya': 'Bộ trước', 'Set berikutnya': 'Bộ sau', 'Kecepatan': 'Tốc độ', 'Suara huruf': 'Đọc to',
  'Bedanya': 'Điểm khác', 'Contoh kata': 'Từ ví dụ', 'Ketuk huruf untuk melompat · ← → ganti set · Spasi jeda': 'Chạm chữ để chuyển · ← → đổi bộ · Space tạm dừng',
  'Huruf apa yang muncul?': 'Chữ nào xuất hiện?', 'Apa pinyin huruf ini?': 'Pinyin của chữ này là gì?', 'Apa arti huruf ini?': 'Chữ này nghĩa là gì?', 'Huruf mana yang cocok?': 'Chữ nào phù hợp?',
  'Goresan mana yang berubah? Ketuk goresannya.': 'Nét nào đã thay đổi? Chạm vào nét đó.', 'Benar!': 'Đúng rồi!', 'Belum tepat': 'Chưa đúng', 'Lanjut': 'Tiếp', 'Lihat hasil': 'Xem kết quả',
  'Hasil kuis': 'Kết quả', 'Rekor': 'Kỷ lục', 'Ulangi': 'Làm lại', 'Ke galeri': 'Về thư viện', 'Rekor baru!': 'Kỷ lục mới!', 'benar': 'đúng', 'Soal': 'Câu', 'Putar ulang': 'Phát lại',
  'Lihat lagi gerakannya': 'Xem lại chuyển động', 'Semua': 'Tất cả', 'Belum ditonton': 'Chưa xem', 'Belum lulus kuis': 'Chưa đạt', 'Mulai dari yang belum': 'Bắt đầu bộ chưa xem', 'Garis tengah huruf ini berubah': 'Một nét đã thay đổi'
});

const TWV = { id: '', ix: 0, filt: 'all', q: null, back: 'tw' };
function twS() {
  S.twin = S.twin && typeof S.twin === 'object' ? S.twin : {};
  const s = S.twin; if (!s.seen || typeof s.seen !== 'object') s.seen = {}; if (!s.q || typeof s.q !== 'object') s.q = {};
  if (!s.mix) s.mix = { b: 0, n: 0 }; if (![0.6, 1, 1.5].includes(s.speed)) s.speed = 1; if (s.tts === undefined) s.tts = true; return s;
}
const twSet = id => TWD.sets.find(x => x.id === id) || TWD.sets[0];
const twIdx = id => Math.max(0, TWD.sets.findIndex(x => x.id === id));
function twSeq(set) { const n = set.c.length; const a = []; for (let i = 0; i < n; i++) a.push(i); for (let i = n - 2; i > 0; i--) a.push(i); return a; }
function twLI() { const l = (S.settings && (S.settings.primary || S.settings.ui)) || 'id'; return { id: 1, en: 2, tl: 3, vi: 4 }[l] || 1; }
function twInfo(ch) { return TWD.info[ch] || [ch, '', '', '', '', 0, []]; }
function twMean(ch) { const I = twInfo(ch); return I[twLI()] || I[2] || ''; }
function twNote(set, ch) { const n = set.n && set.n[ch]; if (!n) return ''; return (S.settings.ui || 'id') === 'id' ? n[0] : n[1]; }
let TW_WM = null;
function twExMean(e) {
  const li = twLI(); if (li === 1) return e[2]; if (li === 2) return e[3];
  try { if (!TW_WM && typeof W !== 'undefined') { TW_WM = new Map(); W.forEach(w => { if (w && w.w && !TW_WM.has(w.w)) TW_WM.set(w.w, w); }); } const w = TW_WM && TW_WM.get(e[0]); if (w && li === 3 && w.m && w.m[2]) return w.m[2]; } catch (x) {}
  return e[3];
}
const TW_TONE = { 'ā': 1, 'ē': 1, 'ī': 1, 'ō': 1, 'ū': 1, 'ǖ': 1, 'á': 2, 'é': 2, 'í': 2, 'ó': 2, 'ú': 2, 'ǘ': 2, 'ǎ': 3, 'ě': 3, 'ǐ': 3, 'ǒ': 3, 'ǔ': 3, 'ǚ': 3, 'à': 4, 'è': 4, 'ì': 4, 'ò': 4, 'ù': 4, 'ǜ': 4 };
function twTone(py) { for (const c of String(py)) if (TW_TONE[c]) return TW_TONE[c]; return 5; }
const twPyH = py => `<span class="t${twTone(py)}">${esc(py)}</span>`;

/* ---------- suara: whoosh (noise tersaring) + pop/chime bernada per huruf ---------- */
const TWA = { buf: null };
function twCtx() { try { if (!S.settings.sound) return null; const c = FX.ensure(); return c && c.state === 'running' ? c : null; } catch (e) { return null; } }
function twHash(ch) { let h = 0; for (const c of String(ch)) h = (h * 31 + c.codePointAt(0)) >>> 0; return h; }
function twWhoosh(ms) {
  const c = twCtx(); if (!c) return;
  try {
    if (!TWA.buf) { const n = c.sampleRate * 1.2; TWA.buf = c.createBuffer(1, n, c.sampleRate); const d = TWA.buf.getChannelData(0); let b = 0; for (let i = 0; i < n; i++) { b = b * .6 + (Math.random() * 2 - 1) * .4; d[i] = b; } }
    const now = c.currentTime, dur = Math.min(1.1, ms / 1000 * .85); const src = c.createBufferSource(); src.buffer = TWA.buf;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.4; bp.frequency.setValueAtTime(380, now); bp.frequency.exponentialRampToValueAtTime(2600, now + dur * .8);
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.16, now + dur * .45); g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    src.connect(bp); bp.connect(g); g.connect(c.destination); src.start(now); src.stop(now + dur + .05);
  } catch (e) {}
}
function twPop(ch, soft) {
  const c = twCtx(); if (!c) return;
  try {
    const P = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5]; const f = P[twHash(ch) % P.length]; const now = c.currentTime; const v = soft ? .5 : 1;
    const o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(f * 1.9, now); o.frequency.exponentialRampToValueAtTime(f, now + .06);
    g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(.2 * v, now + .012); g.gain.exponentialRampToValueAtTime(0.0001, now + .32); o.connect(g); g.connect(c.destination); o.start(now); o.stop(now + .36);
    [[2, .05, .07, .7], [3, .1, .035, .9]].forEach(([m, dl, vol, d]) => { const o2 = c.createOscillator(), g2 = c.createGain(); o2.type = 'triangle'; o2.frequency.value = f * m; g2.gain.setValueAtTime(0.0001, now + dl); g2.gain.exponentialRampToValueAtTime(vol * v, now + dl + .01); g2.gain.exponentialRampToValueAtTime(0.0001, now + dl + d); o2.connect(g2); g2.connect(c.destination); o2.start(now + dl); o2.stop(now + dl + d + .05); });
  } catch (e) {}
}
function twSay(ch) {
  try { if (!twS().tts || !S.settings.sound) return; if (typeof voiceOK === 'function' && !voiceOK()) return; if (typeof lgSay === 'function') lgSay(ch); else TTS.speak(ch); } catch (e) {}
}

/* ---------- panggung animasi (dipakai pemutar, mini-galeri, kuis) ---------- */
const TW_LOOP = { list: new Set(), raf: 0, last: 0 };
function twLoop(now) {
  TW_LOOP.raf = 0; const dt = Math.min(64, Math.max(0, now - (TW_LOOP.last || now))); TW_LOOP.last = now;
  for (const s of TW_LOOP.list) { if (!s.svg.isConnected) { s.kill(); continue; } if (!document.hidden && s.vis) s.step(dt); }
  if (TW_LOOP.list.size) TW_LOOP.raf = requestAnimationFrame(twLoop);
}
function twKick() { if (!TW_LOOP.raf && TW_LOOP.list.size) { TW_LOOP.last = performance.now(); TW_LOOP.raf = requestAnimationFrame(twLoop); } }
const TW_NS = 'http://www.w3.org/2000/svg';
const TW_STAR = 'M0 -34 C6 -8 8 -6 34 0 C8 6 6 8 0 34 C-6 8 -8 6 -34 0 C-8 -6 -6 -8 0 -34Z';
class TwStage {
  constructor(svg, set, o = {}) {
    this.svg = svg; this.ink = svg.querySelector('.tw-ink'); this.fx = svg.querySelector('.tw-fx'); this.set = set; this.o = o;
    this.mini = !!o.mini; this.seq = twSeq(set); this.pos = o.pos || 0; this.cur = set.c[this.seq[this.pos]]; this.playing = o.play !== false; this.vis = true;
    this.phase = 'rest'; this.t = o.delay ? -o.delay : 0; this.parts = []; this.speed = o.speed || 1; this.plan = null; this.mid = false; this.noHot = !!o.noHot;
    this.rest(this.cur, this.keyHot(this.cur)); TW_LOOP.list.add(this); twKick();
  }
  keyHot(ch) { /* sorotan awal: goresan hasil transisi dari tetangga sebelumnya di rantai */
    const c = this.set.c, i = c.indexOf(ch); const from = i > 0 ? c[i - 1] : c[1]; if (!from) return new Set();
    try { const P = TWM.plan(from, ch, this.set.k); return new Set(P.list.filter(o => o.hot && o.ib >= 0).map(o => o.ib)); } catch (e) { return new Set(); }
  }
  get restMs() { return (this.mini ? 1150 : 1750) / this.speed; }
  get morphMs() { return (this.mini ? 820 : 980) / this.speed; }
  rest(ch, hot) {
    const X = TWM.prep(ch); this.hotNow = hot;
    this.ink.innerHTML = X.s.map((s, i) => `<path d="${s.d}" data-i="${i}" class="${hot && hot.has(i) && !this.noHot ? 'hot' : ''}"/>`).join('');
  }
  go(ch, opt = {}) {
    if (ch === this.cur && this.phase === 'rest') return;
    if (this.phase === 'morph') this.land(true);
    this.to = ch; this.plan = TWM.plan(this.cur, ch, this.set.k); this.mid = false;
    this.ink.innerHTML = this.plan.list.map(o => `<path class="${o.hot && !this.noHot ? 'hot' : ''}"/>`).join('');
    this.els = [...this.ink.children]; this.phase = 'morph'; this.t = 0; this.dur = opt.dur || this.morphMs;
    if (!this.mini && !opt.silent) twWhoosh(this.dur);
    if (this.o.onStart) this.o.onStart(ch, this); this.vis = true; twKick();
  }
  next() { this.pos = (this.pos + 1) % this.seq.length; this.go(this.set.c[this.seq[this.pos]]); }
  jump(ch) { const i = this.set.c.indexOf(ch); const k = this.seq.indexOf(i); if (k >= 0) this.pos = k; this.go(ch); }
  land(skip) {
    const hot = new Set(this.plan.list.filter(o => o.hot && o.ib >= 0).map(o => o.ib));
    this.cur = this.to; this.phase = 'rest'; this.t = 0; this.rest(this.cur, hot);
    if (!skip) {
      if (!this.mini) { this.svg.classList.remove('land'); void this.svg.getBoundingClientRect(); this.svg.classList.add('land'); twPop(this.cur); this.burst(); }
      if (this.o.onLand) this.o.onLand(this.cur, this);
    }
  }
  spark(x, y, n, big) {
    if (this.mini || !this.fx) return;
    for (let k = 0; k < n && this.parts.length < 40; k++) {
      const el = document.createElementNS(TW_NS, 'path'); el.setAttribute('d', TW_STAR); el.setAttribute('class', Math.random() < .35 ? 'sp2' : 'sp');
      const a = Math.random() * Math.PI * 2, v = (big ? .25 : .08) + Math.random() * (big ? .35 : .16);
      this.fx.appendChild(el); this.parts.push({ el, x: x + (Math.random() - .5) * 40, y: y + (Math.random() - .5) * 40, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0, max: 420 + Math.random() * 380, s: (big ? .5 : .3) + Math.random() * .5, r: Math.random() * 90 });
    }
  }
  burst() { const hs = this.ink.querySelectorAll('path.hot'); const X = TWM.prep(this.cur); hs.forEach(p => { const s = X.s[+p.dataset.i]; if (s) this.spark(s.c[0], s.c[1], 5, true); }); }
  step(dt) {
    if (this.parts.length) {
      this.parts = this.parts.filter(p => { p.life += dt; if (p.life >= p.max) { p.el.remove(); return false; } p.x += p.vx * dt; p.y += p.vy * dt; p.vy -= .00012 * dt * 60; const k = 1 - p.life / p.max; p.el.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(p.r + p.life * .2).toFixed(0)}) scale(${(p.s * (0.4 + k * .8)).toFixed(3)})`); p.el.style.opacity = Math.min(1, k * 1.6).toFixed(2); return true; });
    }
    if (this.phase === 'rest') { if (!this.playing) return; this.t += dt; if (this.t >= this.restMs) this.next(); return; }
    this.t += dt; const p = Math.min(1, this.t / this.dur);
    this.plan.list.forEach((o, i) => {
      const f = TWM.frame(o, p); const el = this.els[i]; if (!el) return;
      el.setAttribute('d', f.d || 'M0 0'); el.style.opacity = f.op;
      if (f.pt && o.hot && !this.mini && !this.noHot && p < .92 && Math.random() < dt / 70) this.spark(f.pt[0], f.pt[1], 1);
    });
    if (!this.mid && p >= .5) { this.mid = true; if (this.o.onMid) this.o.onMid(this.to, this); }
    if (p >= 1) this.land();
  }
  kill() { TW_LOOP.list.delete(this); this.parts.forEach(p => p.el.remove()); this.parts = []; }
}
function twSvg(cls, id, set) {
  return `<svg class="tw-svg ${cls || ''}"${id ? ` id="${id}"` : ''}${set ? ` data-set="${set}"` : ''} viewBox="0 0 1024 1024" aria-hidden="true">
    ${cls && cls.includes('mini') ? '' : `<g class="tw-grid"><rect x="12" y="12" width="1000" height="1000" rx="56"/><path d="M512 40V984M40 512H984M70 70 954 954M954 70 70 954"/></g>`}
    <g transform="matrix(1 0 0 -1 0 900)"><g class="tw-ink"></g><g class="tw-fx"></g></g></svg>`;
}
/* mini-loop di galeri: hanya kartu yang terlihat yang dianimasikan */
let TW_IO = null;
function twMountMinis() {
  const els = document.querySelectorAll('.tw-mini[data-set]'); if (!els.length) return;
  if (TW_IO) TW_IO.disconnect();
  TW_IO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { const st = e.target._tw; if (st) { st.vis = e.isIntersecting; if (st.vis) twKick(); } }), { rootMargin: '60px' }) : null;
  els.forEach((svg, k) => { const st = new TwStage(svg, twSet(svg.dataset.set), { mini: true, delay: 300 + (k % 6) * 260 }); svg._tw = st; if (TW_IO) { st.vis = false; TW_IO.observe(svg); } });
}

/* ---------- galeri ---------- */
function vTwGallery() {
  const s = twS(); const sets = TWD.sets; const seen = sets.filter(x => s.seen[x.id]).length; const pass = sets.filter(x => (s.q[x.id] || {}).b >= 80).length;
  const f = TWV.filt; const list = sets.filter(x => f === 'all' || (f === 'new' && !s.seen[x.id]) || (f === 'quiz' && !((s.q[x.id] || {}).b >= 80)));
  const fchip = (k, lab) => `<button class="chip ${f === k ? 'on' : ''}" data-a="twfilt" data-v="${k}">${t(lab)}</button>`;
  const card = x => {
    const q = s.q[x.id] || {}; const rare = x.c.some(c => twInfo(c)[5]);
    return `<button class="tw-card ${s.seen[x.id] ? 'seen' : ''}" data-a="twopen" data-v="${x.id}" aria-label="${esc(x.c.join(' '))}">
      <span class="tw-mwrap">${twSvg('tw-mini', '', x.id)}</span>
      <span class="tw-cc hz">${x.c.map(esc).join('<i>·</i>')}</span>
      <span class="tw-cp">${x.c.map(c => twPyH(twInfo(c)[0])).join('<i>·</i>')}</span>
      <span class="tw-cb">${s.seen[x.id] ? `<em class="ok">${ICON('eye')}</em>` : ''}${q.b ? `<em class="${q.b >= 80 ? 'ok' : ''}">${ICON('target')} ${q.b}%</em>` : ''}${rare ? `<em class="rare">${t('jarang')}</em>` : ''}</span></button>`;
  };
  return `<main class="main tw-page">
    <section class="card glass tw-hero">
      <button class="tw-back" data-a="twback" aria-label="${t('Kembali')}">${ICON('twprev')}</button>
      <div class="tw-hero-t"><span class="kl-badge">${ICON('twmorph')} 形近字 · Kelas</span>
        <h1>${t('Huruf Kembar Bergerak')}</h1><p class="muted">${t('Satu goresan bergeser, hurufnya berubah — tonton, dengar, lalu uji dirimu.')}</p>
        <div class="tw-stats"><span><b>${seen}</b>/${sets.length} ${t('set dilihat')}</span><span><b>${pass}</b> ${t('kuis lulus')}</span>${s.mix.b ? `<span>${t('Kuis campuran')} <b>${s.mix.b}%</b></span>` : ''}</div>
        <div class="row wrap tw-hero-b"><button class="btn pri" data-a="twstart">${ICON('play')} ${t(seen ? 'Mulai dari yang belum' : 'Tonton')}</button><button class="btn sec" data-a="twmix">${ICON('twshuffle')} ${t('Kuis campuran')}</button></div></div>
      <div class="tw-hero-art" aria-hidden="true">${twSvg('tw-mini tw-heroanim', '', 'zi')}</div>
    </section>
    <div class="row wrap tw-filt">${fchip('all', 'Semua')}${fchip('new', 'Belum ditonton')}${fchip('quiz', 'Belum lulus kuis')}</div>
    <div class="tw-grid">${list.map(card).join('')}</div></main>`;
}

/* ---------- pemutar ---------- */
function vTwPlayer() {
  const s = twS(); const set = twSet(TWV.id); const k = twIdx(set.id); const ch = set.c[0];
  const chips = set.c.map((c, i) => `<button class="tw-chip ${i === 0 ? 'on' : ''}" data-a="twjump" data-v="${i}"><b class="hz">${esc(c)}</b><span>${twPyH(twInfo(c)[0])}</span>${twInfo(c)[5] ? `<i>${t('jarang')}</i>` : ''}</button>`).join('');
  const sp = v => `<button class="${s.speed === v ? 'on' : ''}" data-a="twspd" data-v="${v}">${v}×</button>`;
  return `<main class="main tw-page tw-pl">
    <div class="tw-top"><button class="tw-back" data-a="twgal" aria-label="${t('Kembali')}">${ICON('twprev')}</button>
      <div class="grow" style="min-width:0"><b>${t('Huruf Kembar Bergerak')}</b><span>${k + 1}/${TWD.sets.length} · <span class="hz">${set.c.map(esc).join(' ')}</span></span></div>
      <button class="btn sec small" data-a="twquiz">${ICON('twquiz')} <span class="tw-hide-s">${t('Kuis set ini')}</span></button></div>
    <div class="tw-plgrid">
    <section class="card glass tw-player">
      <div class="tw-sw tw-pyl" id="twPy"><span>${twPyH(twInfo(ch)[0])}</span></div>
      <div class="tw-stage" id="twStage">${twSvg('', 'twSvg')}</div>
      <div class="tw-sw tw-mean" id="twMean"><span>${esc(twMean(ch))}</span></div>
      <div class="tw-chips" id="twChips">${chips}</div>
      <div class="tw-ctrl">
        <button class="tw-cb2" data-a="twset" data-v="-1" aria-label="${t('Set sebelumnya')}">${ICON('twprev')}</button>
        <button class="tw-play" id="twPlay" data-a="twtoggle" aria-label="${t('Jeda')}">${ICON('pause')}</button>
        <button class="tw-cb2" data-a="twset" data-v="1" aria-label="${t('Set berikutnya')}">${ICON('twnext')}</button>
      </div>
      <div class="tw-opts"><span class="tw-ol">${ICON('twspeed')}</span><div class="seg">${sp(0.6)}${sp(1)}${sp(1.5)}</div>
        <button class="chip ${s.tts ? 'on' : ''}" id="twTts" data-a="twtts">${ICON('speaker')} ${t('Suara huruf')}</button></div>
      <p class="tw-hint small muted">${t('Ketuk huruf untuk melompat · ← → ganti set · Spasi jeda')}</p>
    </section>
    <section class="card glass tw-info" id="twInfo">${twInfoHTML(set, ch)}</section></div></main>`;
}
function twInfoHTML(set, ch) {
  const I = twInfo(ch);
  const ex = (I[6] || []).map(e => `<li><button class="tw-say" data-a="twsay" data-v="${esc(e[0])}" aria-label="${esc(e[0])}">${ICON('speaker')}</button><b class="hz">${esc(e[0])}${lvBadgeW(e[0])}</b><span class="t-py">${esc(e[1])}</span><span class="t-m">${esc(twExMean(e))}</span></li>`).join('');
  const all = set.c.map(c => `<button class="tw-mini2 ${c === ch ? 'on' : ''}" data-a="twjump" data-v="${set.c.indexOf(c)}"><b class="hz">${esc(c)}</b><span>${esc(twInfo(c)[0])}</span><span class="m">${esc(twMean(c))}</span></button>`).join('');
  return `<div class="tw-ih"><b class="hz tw-big">${esc(ch)}${lvBadgeW(ch, { size: 'sm', cls: 'tw-lvb' })}</b><div class="grow" style="min-width:0"><div class="tw-ipy">${twPyH(I[0])} ${I[5] ? `<em class="tw-rare">${t('jarang')}</em>` : ''}</div><div class="tw-im">${esc(twMean(ch))}</div></div>
      <button class="tw-say lg" data-a="twsay" data-v="${esc(ch)}" aria-label="${esc(ch)}">${ICON('speaker')}</button></div>
    <div class="tw-note">${TILE('lightbulb', 'tint c3')}<div><b>${t('Bedanya')}</b><p>${esc(twNote(set, ch))}</p></div></div>
    ${ex ? `<h4>${t('Contoh kata')}</h4><ul class="tw-ex">${ex}</ul>` : ''}
    <div class="tw-all">${all}</div>`;
}
/* sinkronisasi teks (pinyin/arti) dengan morph */
function twSwap(el, html) {
  if (!el) return; const old = el.querySelector('span:not(.out)');
  if (old) { old.classList.remove('in'); old.classList.add('out'); setTimeout(() => old.remove(), 420); }
  const n = document.createElement('span'); n.className = 'in'; n.innerHTML = html; el.appendChild(n);
}
let TWP = null;
function twMountPlayer() {
  const svg = $('#twSvg'); if (!svg) return; const set = twSet(TWV.id); const s = twS();
  if (TWP) TWP.kill();
  TWP = new TwStage(svg, set, {
    speed: s.speed, delay: 700,
    onStart: ch => { const i = set.c.indexOf(ch); document.querySelectorAll('#twChips .tw-chip').forEach((b, k) => b.classList.toggle('on', k === i)); twSwap($('#twPy'), twPyH(twInfo(ch)[0])); },
    onMid: ch => { twSwap($('#twMean'), esc(twMean(ch))); const inf = $('#twInfo'); if (inf) { inf.innerHTML = twInfoHTML(set, ch); inf.classList.remove('flash'); void inf.offsetWidth; inf.classList.add('flash'); } },
    onLand: (ch, st) => { setTimeout(() => twSay(ch), 120); st.loops = (st.loops || 0) + 1; if (st.loops >= set.c.length && !s.seen[set.id]) { s.seen[set.id] = 1; save(); } }
  });
  s.last = set.id; save();
  /* geser kiri/kanan di panggung = ganti set */
  const stg = $('#twStage'); let x0 = null, y0 = 0;
  stg.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; });
  stg.addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) twGoSet(dx < 0 ? 1 : -1); else if (Math.abs(dx) < 8 && Math.abs(dy) < 8) twToggle(); });
}
function twToggle() {
  if (!TWP) return; TWP.playing = !TWP.playing; const b = $('#twPlay');
  if (b) { b.innerHTML = ICON(TWP.playing ? 'pause' : 'play'); b.setAttribute('aria-label', t(TWP.playing ? 'Jeda' : 'Putar')); b.classList.toggle('paused', !TWP.playing); }
  if (TWP.playing && TWP.phase === 'rest') TWP.t = TWP.restMs * .6;
}
function twGoSet(d) { const n = TWD.sets.length; const k = (twIdx(TWV.id) + d + n) % n; TWV.id = TWD.sets[k].id; render(); }
function twOpenView(v) { VK.view = v; if (ROUTE !== 'kelas') { go('kelas'); } else render(); window.scrollTo(0, 0); }

/* ---------- kuis ---------- */
function twShuf(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const TW_ALL = () => { const seen = new Set(); const out = []; TWD.sets.forEach(s => s.c.forEach(c => { if (!seen.has(c)) { seen.add(c); out.push(c); } })); return out; };
function twMakeQ(set, want, avoid) {
  const n = set.c.length; const kinds = ['py', 'mean', 'hz', 'stroke'];
  for (let tries = 0; tries < 30; tries++) {
    const kind = want && tries < 12 ? want : kinds[Math.floor(Math.random() * kinds.length)]; const yi = Math.floor(Math.random() * n); const y = set.c[yi];
    let xi = Math.floor(Math.random() * (n - 1)); if (xi >= yi) xi++; const x = set.c[xi];
    const I = twInfo(y); if (avoid && avoid.has(kind + y) && tries < 25) continue;
    if (kind === 'stroke') { const P = TWM.plan(x, y, set.k); const hot = P.list.filter(o => o.hot && o.ib >= 0).map(o => o.ib); if (!hot.length || hot.length > 4) continue; return { kind, set, x, y, hot }; }
    const key = kind === 'py' ? (c => twInfo(c)[0]) : kind === 'mean' ? (c => twMean(c)) : (c => c);
    if (kind === 'py' && set.c.some(c => c !== y && twInfo(c)[0] === I[0])) continue;
    const pool = [...set.c.filter(c => c !== y), ...twShuf(TW_ALL().filter(c => !set.c.includes(c)))];
    const opts = [y]; const used = new Set([key(y)]);
    for (const c of pool) { if (opts.length >= 4) break; const v = key(c); if (!v || used.has(v)) continue; used.add(v); opts.push(c); }
    return { kind, set, x, y, opts: twShuf(opts), key };
  }
  return { kind: 'mean', set, x: set.c[1], y: set.c[0], opts: twShuf(set.c.slice(0, 4).concat(TW_ALL().filter(c => !set.c.includes(c)).slice(0, Math.max(0, 4 - set.c.length)))), key: c => twMean(c) };
}
function twQuizStart(id) {
  const mix = !id; const N = mix ? 12 : 8; const qs = [];
  const order = twShuf(['py', 'mean', 'hz', 'stroke', 'stroke', 'py', 'mean', 'stroke', 'hz', 'mean', 'stroke', 'py']); const avoid = new Set();
  const pick = mix ? twShuf(TWD.sets).slice(0, N) : null;
  for (let i = 0; i < N; i++) { const set = mix ? pick[i % pick.length] : twSet(id); const q = twMakeQ(set, order[i % order.length], avoid); avoid.add(q.kind + q.y); qs.push(q); }
  TWV.q = { id: id || '', mix, qs, i: 0, ok: 0, ans: null, done: false, pb: false }; twOpenView('twq');
}
function vTwQuiz() {
  const Q = TWV.q; if (!Q) { VK.view = 'tw'; return vTwGallery(); }
  if (Q.done) return vTwQuizEnd();
  const q = Q.qs[Q.i]; const N = Q.qs.length; const pct = Math.round(Q.i / N * 100);
  const prompt = { py: 'Apa pinyin huruf ini?', mean: 'Apa arti huruf ini?', hz: 'Huruf mana yang cocok?', stroke: 'Goresan mana yang berubah? Ketuk goresannya.' }[q.kind];
  const lab = c => q.kind === 'py' ? twPyH(twInfo(c)[0]) : q.kind === 'mean' ? esc(twMean(c)) : `<b class="hz">${esc(c)}</b>`;
  const opts = q.opts ? `<div class="tw-opts4 ${q.kind === 'hz' ? 'hzk' : ''}">${q.opts.map((c, k) => `<button class="tw-opt" data-a="twans" data-v="${k}"><kbd>${'ABCD'[k]}</kbd><span>${lab(c)}</span></button>`).join('')}</div>` : '';
  const stage = q.kind === 'hz' ? `<div class="tw-qcard"><div class="tw-qpy">${twPyH(twInfo(q.y)[0])}</div><div class="tw-qm">${esc(twMean(q.y))}</div><button class="tw-say lg" data-a="twsay" data-v="${esc(q.y)}" aria-label="audio">${ICON('speaker')}</button></div>`
    : `<div class="tw-stage tw-qstage ${q.kind === 'stroke' ? 'tap' : ''}" id="twQStage">${twSvg('', 'twQSvg')}</div>`;
  return `<main class="main tw-page"><section class="card glass tw-quiz">
    <div class="tw-qtop"><button class="tw-back" data-a="twqexit" aria-label="${t('Kembali')}">${ICON('close')}</button>
      <div class="grow tw-qbar"><i style="width:${pct}%"></i></div><span class="tw-qn">${Q.i + 1}/${N}</span><span class="tw-qs">${ICON('check')} ${Q.ok}</span></div>
    <p class="tw-qp">${t(prompt)}</p>
    ${stage}
    ${opts}
    <div class="tw-fb" id="twFb"></div></section></main>`;
}
let TWQ = null;
function twMountQuiz() {
  const Q = TWV.q; if (!Q || Q.done) return; const q = Q.qs[Q.i]; const svg = $('#twQSvg'); if (TWQ) { TWQ.kill(); TWQ = null; }
  if (!svg) return;
  TWQ = new TwStage(svg, q.set, { play: false, noHot: true, pos: Math.max(0, twSeq(q.set).indexOf(q.set.c.indexOf(q.x))) });
  TWQ.ready = false; TWQ.o.onLand = () => { TWQ.ready = true; const st = $('#twQStage'); if (st) st.classList.add('ready'); };
  setTimeout(() => { if (TWQ && TWQ.svg.isConnected) TWQ.go(q.y, { dur: 1100 }); }, 650);
  if (q.kind === 'stroke') svg.addEventListener('click', e => {
    if (!TWQ || !TWQ.ready || Q.ans) return; const p = e.target.closest('path[data-i]'); if (!p) return; twAnswer(+p.dataset.i, p);
  });
}
function twAnswer(v, el) {
  const Q = TWV.q; if (!Q || Q.ans) return; const q = Q.qs[Q.i]; let ok;
  if (q.kind === 'stroke') ok = q.hot.includes(v); else ok = q.opts[v] === q.y;
  Q.ans = { v, ok }; if (ok) Q.ok++;
  try { FX.play(ok ? 'ok' : 'bad', Q.ok); } catch (e) {}
  if (q.kind === 'stroke') {
    const ps = document.querySelectorAll('#twQSvg .tw-ink path'); ps.forEach(p => { const i = +p.dataset.i; if (q.hot.includes(i)) p.classList.add('hot'); });
    if (!ok && el) el.classList.add('bad');
    if (TWQ) { const X = TWM.prep(q.y); q.hot.forEach(i => TWQ.spark(X.s[i].c[0], X.s[i].c[1], 6, true)); }
  } else {
    document.querySelectorAll('.tw-opt').forEach((b, k) => { b.disabled = true; if (q.opts[k] === q.y) b.classList.add('ok'); else if (k === v) b.classList.add('bad'); });
  }
  const I = twInfo(q.y); const fb = $('#twFb');
  if (fb) fb.innerHTML = `<div class="tw-fbin ${ok ? 'ok' : 'bad'}"><b class="tw-fbh">${t(ok ? 'Benar!' : 'Belum tepat')}</b>
    <div class="tw-fbc"><b class="hz">${esc(q.y)}${lvBadgeW(q.y)}</b>${twPyH(I[0])}<span>${esc(twMean(q.y))}</span></div><p>${esc(twNote(q.set, q.y))}</p>
    <div class="row wrap" style="gap:8px">${q.kind !== 'hz' ? `<button class="btn sec small" data-a="twqre">${ICON('refresh')} ${t('Putar ulang')}</button>` : ''}<button class="btn pri small" data-a="twqnext" id="twNext">${t(Q.i + 1 >= Q.qs.length ? 'Lihat hasil' : 'Lanjut')} ${ICON('twnext')}</button></div></div>`;
  setTimeout(() => twSay(q.y), 260);
  const nb = $('#twNext'); if (nb) nb.focus({ preventScroll: true });
}
function twQNext() {
  const Q = TWV.q; if (!Q || !Q.ans) return; Q.i++; Q.ans = null;
  if (Q.i >= Q.qs.length) {
    Q.done = true; const pct = Math.round(Q.ok / Q.qs.length * 100); const s = twS();
    if (Q.mix) { Q.pb = pct > (s.mix.b || 0); s.mix.b = Math.max(s.mix.b || 0, pct); s.mix.n = (s.mix.n || 0) + 1; }
    else { const r = s.q[Q.id] || (s.q[Q.id] = { b: 0, n: 0 }); Q.pb = pct > (r.b || 0); r.b = Math.max(r.b || 0, pct); r.n = (r.n || 0) + 1; r.d = todayKey(); }
    try { if (typeof addXP === 'function' && Q.ok) addXP(Q.ok * 2); } catch (e) {}
    try { FX.play(pct >= 80 ? 'level' : 'quest'); } catch (e) {}
    save();
  }
  render(); window.scrollTo(0, 0);
}
function vTwQuizEnd() {
  const Q = TWV.q; const N = Q.qs.length; const pct = Math.round(Q.ok / N * 100); const s = twS(); const best = Q.mix ? s.mix.b : (s.q[Q.id] || {}).b || 0;
  const miss = []; /* huruf yang muncul di kuis, untuk ditinjau */
  Q.qs.forEach(q => { if (!miss.includes(q.y)) miss.push(q.y); });
  const rank = pct >= 95 ? 'S' : pct >= 80 ? 'A' : pct >= 60 ? 'B' : 'C';
  return `<main class="main tw-page"><section class="card glass tw-end">
    <div class="tw-rank r${rank}"><span>${rank}</span></div>
    <h2>${t('Hasil kuis')}</h2><p class="tw-endp"><b>${Q.ok}</b>/${N} ${t('benar')} · ${pct}%</p>
    <p class="muted">${Q.pb ? `<b class="tw-pb">${ICON('sparkle')} ${t('Rekor baru!')}</b> · ` : ''}${t('Rekor')} ${best}%</p>
    <div class="tw-endc">${miss.map(c => `<button class="tw-mini2" data-a="twsay" data-v="${esc(c)}"><b class="hz">${esc(c)}${lvBadgeW(c)}</b><span>${esc(twInfo(c)[0])}</span><span class="m">${esc(twMean(c))}</span></button>`).join('')}</div>
    <div class="row wrap" style="justify-content:center;gap:10px"><button class="btn pri" data-a="twqagain">${ICON('refresh')} ${t('Ulangi')}</button>
      ${Q.mix ? '' : `<button class="btn sec" data-a="twopen" data-v="${Q.id}">${ICON('play')} ${t('Lihat lagi gerakannya')}</button>`}
      <button class="btn sec" data-a="twgal">${ICON('grid')} ${t('Ke galeri')}</button></div></section></main>`;
}

/* ---------- aksi, keyboard, pintu masuk ---------- */
Object.assign(ACT, {
  twhome: () => { twOpenView('tw'); },
  twback: () => { VK.view = 'map'; render(); window.scrollTo(0, 0); },
  twgal: () => { twOpenView('tw'); },
  twfilt: b => { TWV.filt = b.dataset.v; render(); },
  twopen: b => { TWV.id = b.dataset.v; twOpenView('twp'); },
  twstart: () => { const s = twS(); const n = TWD.sets.find(x => !s.seen[x.id]) || TWD.sets[0]; TWV.id = n.id; twOpenView('twp'); },
  twmix: () => twQuizStart(''),
  twquiz: () => twQuizStart(TWV.id),
  twset: b => twGoSet(+b.dataset.v),
  twtoggle: () => twToggle(),
  twjump: b => { if (!TWP) return; const set = twSet(TWV.id); const ch = set.c[+b.dataset.v]; if (!ch) return; TWP.jump(ch); },
  twspd: b => { const s = twS(); s.speed = +b.dataset.v; save(); if (TWP) TWP.speed = s.speed; b.parentNode.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); },
  twtts: b => { const s = twS(); s.tts = !s.tts; save(); b.classList.toggle('on', s.tts); if (s.tts && TWP) twSay(TWP.cur); },
  twsay: b => { try { FX.ensure(); if (typeof lgSay === 'function') lgSay(b.dataset.v); else TTS.speak(b.dataset.v); } catch (e) {} },
  twans: b => twAnswer(+b.dataset.v),
  twqnext: () => twQNext(),
  twqre: () => { const Q = TWV.q; if (!Q || !TWQ) return; const q = Q.qs[Q.i]; const ans = Q.ans; TWQ.cur = q.x; TWQ.rest(q.x, new Set()); setTimeout(() => { if (!TWQ) return; TWQ.go(q.y, { dur: 1300 }); if (ans) TWQ.o.onLand = () => { TWQ.ready = true; if (q.kind === 'stroke') document.querySelectorAll('#twQSvg .tw-ink path').forEach(p => { if (q.hot.includes(+p.dataset.i)) p.classList.add('hot'); }); }; }, 350); },
  twqagain: () => { const Q = TWV.q; twQuizStart(Q && !Q.mix ? Q.id : ''); },
  twqexit: () => { const Q = TWV.q; if (Q && Q.id) { TWV.id = Q.id; twOpenView('twp'); } else twOpenView('tw'); }
});
document.addEventListener('keydown', e => {
  if (typeof ROUTE === 'undefined' || ROUTE !== 'kelas' || typeof VK === 'undefined') return;
  if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return; if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (VK.view === 'twp') {
    if (e.key === 'ArrowRight') { e.preventDefault(); twGoSet(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); twGoSet(-1); }
    else if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); twToggle(); }
    else if (/^[1-5]$/.test(e.key) && TWP) { const ch = twSet(TWV.id).c[+e.key - 1]; if (ch) TWP.jump(ch); }
  } else if (VK.view === 'twq' && TWV.q && !TWV.q.done) {
    const Q = TWV.q; const k = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 }[e.key.toLowerCase()];
    if (Q.ans && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) { e.preventDefault(); twQNext(); }
    else if (!Q.ans && k !== undefined && Q.qs[Q.i].opts && k < Q.qs[Q.i].opts.length) { e.preventDefault(); twAnswer(k); }
  }
});
document.addEventListener('visibilitychange', () => { if (!document.hidden) twKick(); });
function twBanner() {
  const s = twS(); const seen = TWD.sets.filter(x => s.seen[x.id]).length;
  return `<section class="tw-banner" data-a="twhome" role="button" tabindex="0"><span class="tw-bart" aria-hidden="true">${twSvg('tw-mini', '', 'wei')}</span>
    <div class="grow" style="min-width:0"><b>${t('Huruf Kembar Bergerak')}</b><span>${t('{n} set · satu goresan, beda arti', { n: TWD.sets.length })}${seen ? ` · ${seen}/${TWD.sets.length}` : ''}</span></div><span class="tw-bgo">${ICON('play')}</span></section>`;
}
const XVK_TW = XVIEWS.kelas;
XVIEWS.kelas = function () {
  const v = VK.view;
  if (v === 'tw' || v === 'twp' || v === 'twq') {
    let h; try { h = v === 'twp' ? vTwPlayer() : v === 'twq' ? vTwQuiz() : vTwGallery(); } catch (e) { console.error('twin', e); VK.view = 'map'; return XVK_TW(); }
    const mv = VK.view; setTimeout(() => { if (ROUTE !== 'kelas' || VK.view !== mv) return; if (mv === 'twp') twMountPlayer(); else if (mv === 'twq') twMountQuiz(); twMountMinis(); }, 0);
    return h;
  }
  if (TWP) { TWP.kill(); TWP = null; }
  let h = XVK_TW(); if (VK.view !== 'map' && VK.view) return h;
  try {
    h = h.replace('<section class="kl-tools">', `<section class="kl-tools"><button class="kl-tool" data-a="twhome">${TILE('twmorph', 'tint c4')}<b>${t('Huruf Kembar Bergerak')}</b><span>${t('Goresan berubah, arti berubah')}</span></button>`);
    const k = h.indexOf('</section>'); if (k >= 0) h = h.slice(0, k + 10) + twBanner() + h.slice(k + 10);
    setTimeout(() => { if (ROUTE === 'kelas') twMountMinis(); }, 0);
  } catch (e) {}
  return h;
};
START_ACTS.add('twhome'); START_ACTS.add('twmix'); START_ACTS.add('twquiz');
/* lvbadge.js — lencana level kecil (N1…C1) untuk tiap kata & kalimat
   API global: lvOfWord(i|form), lvOfSentence(zh), lvBadge(lv, opts), lvBadgeW(i|form, opts), lvBadgeS(zh, opts),
               lvBadgeCanvas(ctx, x, y, lv, scale, align), lvLegend(), LV_CODE */
const LV_CODE = ['N1', 'N2', 'A1', 'A2', 'B1', 'B2', 'C1', 'ASE'];
const LV_VAR = ['--c2', '--c5', '--c6', '--c4', '--c3', '--c8', '--c1', '--c0'];
/* level kursus kelas untuk kata yang hanya ada di lesson (W[i].kls) */
const LV_COURSE = { prep: 0, b1: 2, sd: 2 };
Object.assign(I18N, { 'Level kata': ['Word level', 'Antas ng salita'], 'Level kalimat': ['Sentence level', 'Antas ng pangungusap'], 'Arti lencana level': ['What the level badges mean', 'Kahulugan ng badge ng antas'], 'Lencana = level TOCFL kata (kalimat: kata tersulit di dalamnya).': ['Badge = TOCFL level of the word (sentences: their hardest word).', 'Badge = antas TOCFL ng salita (pangungusap: pinakamahirap na salita).'] });
if (typeof I18N_VI !== 'undefined') Object.assign(I18N_VI, { 'Level kata': 'Cấp độ từ', 'Level kalimat': 'Cấp độ câu', 'Arti lencana level': 'Ý nghĩa nhãn cấp độ', 'Lencana = level TOCFL kata (kalimat: kata tersulit di dalamnya).': 'Nhãn = cấp TOCFL của từ (câu: từ khó nhất trong câu).' });

let LVX = null;   // indeks bentuk → level terendah
function lvIdx() {
  if (LVX) return LVX;
  const m = new Map(); const put = (f, l) => { if (!f) return; const o = m.get(f); if (o === undefined || l < o) m.set(f, l); };
  W.forEach((w, i) => { if (!w || !w.w) return; const l = lvRaw(w); if (l == null) return;
    [w.w, w.w.replace(/[()]/g, ''), w.w.replace(/\(.*?\)/g, ''), w.s].concat(w.v || []).forEach(f => put(f, l)); });
  return (LVX = m);
}
function lvRaw(w) {
  if (!w) return null;
  if (w.semi) return 7;
  if (w.kls && typeof KL === 'function') { try { const L = KL(w.kls); const c = L && LV_COURSE[L.course]; if (c != null) return c; } catch (e) {} return 2; }
  return typeof w.l === 'number' && w.l >= 0 && w.l <= 7 ? w.l : null;
}
function lvOfWord(x) {
  if (x == null || x === '') return null;
  if (typeof x === 'number' || /^\d+$/.test(String(x))) return lvRaw(W[+x]);
  if (typeof x === 'object') return x.i != null && W[x.i] === x ? lvRaw(x) : (x.w ? lvOfWord(x.w) : null);
  const f = String(x).trim(); const v = lvIdx().get(f) ?? lvIdx().get(f.replace(/[()（）]/g, ''));
  return v === undefined ? null : v;
}
const LV_SKIP = new Set(['的', '了', '嗎', '呢', '吧', '啊', '喔', '呀', '們', '是', '在', '不', '也', '都', '很', '和', '跟', '就', '還', '個', '我', '你', '他', '她', '它', '這', '那']);
const LV_SC = new Map();
function lvOfSentence(zh) {
  if (!zh) return null; zh = String(zh);
  if (LV_SC.has(zh)) return LV_SC.get(zh);
  const X = lvIdx(); const levs = [];
  zh.split(/[^㐀-鿿豈-﫿]+/).forEach(h => {
    for (let i = 0; i < h.length;) {
      let L = Math.min(4, h.length - i); for (; L > 1; L--) if (X.has(h.substr(i, L))) break;
      const f = h.substr(i, L); i += L;
      if (LV_SKIP.has(f)) continue; const l = X.get(f);
      if (l === undefined || l === 7) continue;            // nama / huruf asing / istilah ASE: abaikan
      if (L === 1 && l >= 4) continue;                     // huruf tunggal level tinggi = biasanya potongan nama (宜文, 友美)
      levs.push(l);
    }
  });
  let r = null;
  if (levs.length) {
    levs.sort((a, b) => b - a); r = levs[0];
    // satu kata langka di kalimat yang lain-lainnya mudah: turunkan satu tingkat
    if (levs.length >= 3 && levs[1] < r - 1) r = Math.max(levs[1], r - 1);
  } else if (/[㐀-鿿]/.test(zh)) {
    const X2 = [...zh].map(c => X.get(c)).filter(l => l !== undefined && l !== 7); if (X2.length) r = Math.max(...X2);
  }
  if (LV_SC.size > 3000) LV_SC.clear(); LV_SC.set(zh, r); return r;
}
function lvName(lv) { const L = LEVELS[lv]; return L ? L.name + ' · ' + L.en : ''; }
function lvBadge(lv, opts) {
  if (lv == null || !LV_CODE[lv]) return '';
  const o = typeof opts === 'string' ? { size: opts } : (opts || {});
  const nm = lvName(lv); const lab = (o.sent ? t('Level kalimat') : t('Level kata')) + ': ' + nm;
  return `<span class="lvb lv${lv} ${o.size || 'xs'}${o.cls ? ' ' + o.cls : ''}" title="${esc(nm)}" aria-label="${esc(lab)}" role="img">${LV_CODE[lv]}</span>`;
}
const lvBadgeW = (x, o) => lvBadge(lvOfWord(x), o);
const lvBadgeS = (zh, o) => lvBadge(lvOfSentence(zh), Object.assign({ sent: 1 }, typeof o === 'string' ? { size: o } : o || {}));
function lvLegend(cls) {
  return `<div class="lv-legend ${cls || ''}" aria-label="${esc(t('Arti lencana level'))}"><span class="lv-lgt">${esc(t('Lencana = level TOCFL kata (kalimat: kata tersulit di dalamnya).'))}</span><span class="lv-lgl">${[0, 1, 2, 3, 4, 5, 6].map(l => `<span class="lv-lgi">${lvBadge(l)}<small class="hz">${esc(LEVELS[l].name)}</small></span>`).join('')}</span></div>`;
}
/* ---- kanvas (arena) ---- */
const LV_COLC = {};
function lvColor(lv) {
  const key = lv + (document.documentElement.dataset.theme || '');
  if (LV_COLC[key] && LV_COLC[key].t > Date.now() - 4000) return LV_COLC[key].c;
  let c = ''; try { c = getComputedStyle(document.documentElement).getPropertyValue(LV_VAR[lv]).trim(); } catch (e) {}
  LV_COLC[key] = { c: c || 'gray', t: Date.now() }; return LV_COLC[key].c;
}
/* menggambar pil di (x,y) = sudut kiri-atas (align 'r' → x = tepi kanan, 'c' → tengah); mengembalikan lebar */
function lvBadgeCanvas(ctx, x, y, lv, scale = 1, align) {
  if (!ctx || lv == null || !LV_CODE[lv]) return 0;
  const s = scale || 1; const txt = LV_CODE[lv]; const h = 15 * s, px = 5 * s, r = h / 2;
  ctx.save(); ctx.font = `800 ${Math.round(9.5 * s)}px system-ui,-apple-system,"Segoe UI",sans-serif`;
  const w = Math.ceil(ctx.measureText(txt).width + px * 2);
  if (align === 'r') x -= w; else if (align === 'c') x -= w / 2;
  const col = lvColor(lv);
  ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
  ctx.globalAlpha = 0.95; ctx.fillStyle = col; ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.34)'; ctx.fill();
  ctx.globalAlpha = 1; ctx.lineWidth = Math.max(1, s); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 2 * s;
  ctx.fillText(txt, x + w / 2, y + h / 2 + 0.5 * s); ctx.restore();
  return w;
}

/* ---- sesi: satu lencana per soal (kata → level kata, soal kalimat → level kalimat) ---- */
const LV_NOITEM = new Set(['lread', 'kbd', 'kbg', 'mtg', 'mtwhy', 'tmgram', 'tmrecap', 'match', 'mtsp', 'checkpoint', 'part', 'story', 'slang', 'slangintro', 'ctxread']);
function lvTxt(h) { return String(h || '').replace(/<[^>]*>/g, ''); }
function lvOfItem(it) {
  if (!it || LV_NOITEM.has(it.type)) return null;
  if (it.wid != null && W[it.wid]) return { lv: lvOfWord(+it.wid) };
  if (it.ch && [...it.ch].length === 1) { const l = lvOfWord(it.ch); return l == null ? null : { lv: l }; }
  const s = it.sent && (it.sent.zh || (it.sent.chunks || []).map(c => c.hz).join(''));
  const zh = it.say || s || (it.ex && it.ex.zh) || (it.qhz && lvTxt(it.q)) || (it.x && it.x.hz) || '';
  if (!zh) return null;
  const w = lvOfWord(zh.replace(/[。？！，、?!.,\s]/g, ''));
  if (w != null) return { lv: w };
  const l = lvOfSentence(zh); return l == null ? null : { lv: l, sent: 1 };
}
function lvMarkItem() {
  try {
    if (typeof SES === 'undefined' || !SES || !SES.items) return;
    const it = SES.items[SES.i]; const body = document.getElementById('sbody'); if (!body) return;
    const cardEl = body.querySelector('.s-card'); if (!cardEl || cardEl.classList.contains('summary') || cardEl.querySelector('.lvb.lvi')) return;
    const r = lvOfItem(it); if (!r || r.lv == null) return;
    const qk = it.type !== 'intro' && cardEl.querySelector('.q-kind');
    const b = lvBadge(r.lv, { size: 'sm', sent: r.sent, cls: 'lvi ' + (qk ? 'pre' : 'corner') });
    if (qk) qk.insertAdjacentHTML('afterbegin', b);
    else { cardEl.classList.add('lvb-rel'); cardEl.insertAdjacentHTML('afterbegin', b); }
  } catch (e) { console.warn('lvbadge', e); }
}
if (typeof renderItem === 'function') {
  const lvRenderItemBase = renderItem;
  renderItem = function () { const r = lvRenderItemBase.apply(this, arguments); lvMarkItem(); setTimeout(lvMarkItem, 60); setTimeout(lvMarkItem, 450); return r; };
}

/* ---- Game Dengar: chip kecil sebelum petunjuk soal ---- */
function lvMarkLG() {
  try {
    if (typeof LG === 'undefined' || !LG || !LG.q || !LG.q.item) return;
    const it = LG.q.item; const st = document.getElementById('lgst'); if (!st) return;
    const lv = it.i !== undefined && W[it.i] ? lvOfWord(it.i) : lvOfSentence(it.zh);
    const old = st.querySelector('.lvb.lgq'); if (old) old.remove();
    if (lv == null) return;
    const b = lvBadge(lv, { size: 'sm', sent: it.i === undefined, cls: 'lgq pre' });
    const ph = st.querySelector('.lg-ph');
    if (ph) ph.insertAdjacentHTML('afterbegin', b);
    else { const f = st.querySelector('#lgf') || st; f.insertAdjacentHTML('beforeend', b.replace('lgq pre', 'lgq lg-lvf')); }
  } catch (e) { console.warn('lvbadge lg', e); }
}
if (typeof lgNext === 'function') {
  const lvLgNextBase = lgNext;
  lgNext = function () { const r = lvLgNextBase.apply(this, arguments); lvMarkLG(); return r; };
}
if (typeof lgUcapRender === 'function') { const b0 = lgUcapRender; lgUcapRender = function () { const r = b0.apply(this, arguments); lvMarkLG(); return r; }; }
if (typeof lgSusunRender === 'function') { const b1 = lgSusunRender; lgSusunRender = function () { const r = b1.apply(this, arguments); lvMarkLG(); return r; }; }
if (typeof lgTilesRender === 'function') { const b2 = lgTilesRender; lgTilesRender = function () { const r = b2.apply(this, arguments); lvMarkLG(); return r; }; }

/* ---- arena: item {i?, zh} → lencana HTML / level ---- */
function lvOfGameItem(it) {
  if (!it) return null;
  if (it.i !== undefined && it.i !== null && W[it.i]) return lvOfWord(+it.i);
  const zh = it.zh || it.w || ''; const w = lvOfWord(zh); return w != null ? w : lvOfSentence(zh);
}
function lvItemBadge(it, cls, size) {
  const lv = lvOfGameItem(it); if (lv == null) return '';
  const sent = !(it && it.i != null && W[it.i]) && lvOfWord((it && it.zh) || '') == null;
  return lvBadge(lv, { size: size || 'sm', sent, cls: 'solid ' + (cls || '') });
}