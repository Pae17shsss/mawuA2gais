/* ========== V0.8: (1) Dengar 50 kata  (2) pengenalan kosakata mencakup semua kata di percakapan ========== */

/* ---------------------------------------------------------------------------------
   (2) VOCAB COVER — sebelum soal kalimat/dialog, semua kata yang muncul di kalimat itu
   dan belum pernah dikenalkan, dimunculkan dulu sebagai kartu "Kata baru".
   --------------------------------------------------------------------------------- */
let VC_IDX = null;
function vcIndex() {
  if (VC_IDX) return VC_IDX;
  const m = new Map();
  W.forEach((w, i) => { if (!w || !w.m && !w.km) return; (typeof wForms === 'function' ? [...wForms(w)] : [w.w, w.s]).forEach(f => { if (f && f.length <= 6 && /^[㐀-鿿]+$/.test(f) && !m.has(f)) m.set(f, i); }); });
  VC_IDX = m; return m;
}
function vcSegment(text) {
  const m = vcIndex(); const out = []; const s = String(text || '');
  for (let i = 0; i < s.length;) {
    if (!/[㐀-鿿]/.test(s[i])) { i++; continue; }
    let hit = 0;
    for (let L = Math.min(6, s.length - i); L >= 1; L--) { const f = s.substr(i, L); if (m.has(f)) { out.push(m.get(f)); hit = L; break; } }
    i += hit || 1;
  }
  return out;
}
const VC_SKIP = new Set(['的', '了', '嗎', '呢', '吧', '啊', '喔', '呀', '著', '過', '得', '地']);
function vcTexts(items, opts) {
  const tx = [];
  const lessonText = n => { const L = typeof KL === 'function' && KL(n); if (!L) return; L.dialog.forEach(x => tx.push(x.zh)); if (L.book) { L.book.dialogs.forEach(D => D.lines.forEach(x => tx.push(x.zh))); if (L.book.reading) tx.push(L.book.reading.zh); } (L.tf || []).forEach(f => f.passage && tx.push(f.passage.zh)); };
  if (opts && (opts.round === 1 || opts.round === 'fast' || opts.kb === 'voc') && opts.n) lessonText(opts.n);
  items.forEach(it => {
    if (!it) return;
    if (it.sent && it.sent.zh) tx.push(it.sent.zh);
    if (it.cx && it.cx.zh) tx.push(it.cx.zh);
    if (it.lx && typeof it.say === 'string') tx.push(it.say);
    if (it.pas && it.pas.zh) tx.push(it.pas.zh);
    if ((it.kind === 'dlg' && it.type === 'lread') || it.type === 'kbd') lessonText(it.n);
  });
  return tx;
}
function vcCover(items, opts) {
  if (!Array.isArray(items) || !items.length || (opts && (opts.noCover || opts.round === 6 || opts.kb === 'test' || opts.kb === 'voc' || opts.kbu !== undefined))) return items;
  const texts = vcTexts(items, opts); if (!texts.length) return items;
  const have = new Set(items.filter(x => x && x.type === 'intro').map(x => x.wid));
  const need = []; const seen = new Set();
  texts.forEach(s => vcSegment(s).forEach(i => { const w = W[i]; if (seen.has(i) || have.has(i) || S.cards[i] || !w || VC_SKIP.has(w.w)) return; seen.add(i); need.push(i); }));
  if (!need.length) return items;
  const full = opts && (opts.round === 1 || opts.round === 'fast' || opts.kb === 'voc');
  const list = need.slice(0, full ? 20 : 8);
  const pre = [];
  for (let j = 0; j < list.length; j += 5) {
    const ch = list.slice(j, j + 5); ch.forEach(i => pre.push({ type: 'intro', wid: i, cover: 1 }));
    if (full) shuffle(ch).forEach(i => pre.push({ type: 'mc_mean', wid: i }));
  }
  if (full) { const k = items.findIndex(x => x && x.type !== 'intro' && x.type !== 'recall' && x.type !== 'mc_mean'); const at = k < 0 ? items.length : k; return items.slice(0, at).concat(pre, items.slice(at)); }
  return pre.concat(items);
}
const startSessionVC = startSession;
startSession = function (items, opts = {}) { try { items = vcCover(items, opts); } catch (e) { console.warn('vcCover', e); } return startSessionVC(items, opts); };

/* ---------------------------------------------------------------------------------
   (1) DENGAR 50 KATA — app mengucapkan kata Mandarin (jelas, nada terdengar), lalu artinya.
   --------------------------------------------------------------------------------- */
const L50_SRC = {
  a2: { ti: 'Kosakata A2 (umum)', ids: () => A2_ORDER },
  kls: { ti: 'Kelas (L1–6 & B1)', ids: () => klWords(KLS.filter(L => !isOwnL(L)).map(L => L.n)) },
  sd: { ti: '時代華語 1', ids: () => klWords(KLS.filter(L => L.course === 'sd').map(L => L.n)) }
};
const L50_LANG = { id: 'id-ID', en: 'en-US', tl: 'fil-PH', vi: 'vi-VN' };
function l50S() {
  if (!S.l50 || typeof S.l50 !== 'object') S.l50 = {};
  const s = S.l50; if (!L50_SRC[s.src]) s.src = 'a2'; if (!s.b || typeof s.b !== 'object') s.b = {};
  if (!(s.rep >= 1 && s.rep <= 3)) s.rep = 2; if (s.mean === undefined) s.mean = true; if (!s.sp) s.sp = 'n'; if (s.py === undefined) s.py = true;
  return s;
}
const L50 = { ids: [], i: 0, play: false, run: 0, done: false };
function l50Ids(src) { const all = (L50_SRC[src] || L50_SRC.a2).ids().filter(i => W[i] && (W[i].m || W[i].km)); return [...new Set(all)]; }
function l50Batch() { const s = l50S(); const all = l50Ids(s.src); const nb = Math.max(1, Math.ceil(all.length / 50)); const b = clamp(s.b[s.src] || 0, 0, nb - 1); return { all, b, nb, ids: all.slice(b * 50, b * 50 + 50) }; }
/* suara: pilih suara terbaik (Natural/Neural/Online/Google/Premium) untuk Mandarin Taiwan & bahasa arti */
function l50Voice(lang) {
  let vs = []; try { vs = speechSynthesis.getVoices(); } catch (e) {}
  if (lang === 'zh') return TTS.voice || null;
  const code = L50_LANG[lang] || 'en-US'; const pre = code.slice(0, 2).toLowerCase();
  const cand = vs.filter(v => v.lang && (v.lang.toLowerCase().replace('_', '-').startsWith(pre) || (pre === 'fi' && /fil|tl/i.test(v.lang))));
  const sc = v => (/Natural|Neural|Online/i.test(v.name) ? 60 : 0) + (/Google/i.test(v.name) ? 40 : 0) + (/Premium|Enhanced|Siri/i.test(v.name) ? 35 : 0) + (v.localService ? 0 : 10) + (v.lang.replace('_', '-').toLowerCase() === code.toLowerCase() ? 15 : 0) - (/Compact|eSpeak/i.test(v.name) ? 50 : 0);
  return cand.sort((a, b) => sc(b) - sc(a))[0] || null;
}
function l50Say(text, lang, rate, done) {
  const run = L50.run; let fin = false;
  const end = () => { if (fin) return; fin = true; clearTimeout(dog); if (run === L50.run && done) done(); };
  if (!TTS.ok || !text) { setTimeout(end, 600); return; }
  try {
    const u = new SpeechSynthesisUtterance(String(text).replace(/[()（）]/g, ''));
    const v = l50Voice(lang);
    u.lang = lang === 'zh' ? (v ? v.lang : 'zh-TW') : (v ? v.lang : (L50_LANG[lang] || 'en-US'));
    try { if (v) u.voice = v; } catch (e) {}
    u.rate = rate; u.pitch = 1; u.volume = 1; u.onend = end; u.onerror = end; L50.u = u;
    var dog = setTimeout(end, 2600 + String(text).length * 380);
    if (speechSynthesis.paused) speechSynthesis.resume();
    speechSynthesis.speak(u);
  } catch (e) { setTimeout(end, 500); }
}
function l50Step() {
  if (!L50.play) return;
  if (L50.i >= L50.ids.length) { L50.play = false; L50.done = true; l50Wake(false); l50Render(); return; }
  const s = l50S(); const w = W[L50.ids[L50.i]]; const run = L50.run;
  const zh = w.s || w.w; const base = s.sp === 's' ? 0.62 : 0.78;
  const meanLg = meanLang(); const mean = shortMean(meanP(w));
  const seq = [];
  for (let r = 0; r < s.rep; r++) seq.push(['zh', zh, r === 0 ? base : base + 0.1, r === 0 ? 650 : 500]);
  if (s.mean && mean) seq.push([meanLg, mean, s.sp === 's' ? 0.88 : 1, 1100]);
  else seq[seq.length - 1][3] = 1100;
  l50Render(); let k = 0;
  const next = () => {
    if (run !== L50.run || !L50.play) return;
    if (k >= seq.length) { L50.i++; return l50Step(); }
    const [lg, tx, rate, gap] = seq[k++];
    const el = $('#l50card'); if (el) el.dataset.ph = lg === 'zh' ? 'zh' : 'mean';
    l50Say(tx, lg, rate, () => { L50.tm = setTimeout(next, gap); });
  };
  L50.tm = setTimeout(next, 250);
}
function l50Stop() { L50.run++; L50.play = false; clearTimeout(L50.tm); try { speechSynthesis.cancel(); } catch (e) {} l50Wake(false); }
async function l50Wake(on) { try { if (on && navigator.wakeLock && !L50.lock) L50.lock = await navigator.wakeLock.request('screen'); else if (!on && L50.lock) { L50.lock.release(); L50.lock = null; } } catch (e) {} }
function l50Open() {
  hushAll(); closeModal(); const B = l50Batch(); L50.ids = B.ids; L50.i = 0; L50.done = false; L50.play = false;
  let el = $('#l50'); if (!el) { el = document.createElement('div'); el.id = 'l50'; el.className = 'l50'; document.body.appendChild(el); el.addEventListener('click', l50Click); document.body.classList.add('in-session'); }
  l50Render();
}
function l50Close() { l50Stop(); const el = $('#l50'); if (el) el.remove(); document.body.classList.remove('in-session'); render(); }
function l50PyHTML(w) {
  const ys = w.y && w.y.length ? w.y : String(w.p || '').split(/\s+/); const ts = w.t || [];
  return ys.map((y, k) => `<span class="l50-sy t${ts[k] || 5}">${esc(y)}</span>`).join('');
}
function l50Render() {
  const el = $('#l50'); if (!el) return; const s = l50S(); const B = l50Batch(); const ids = L50.ids;
  const w = W[ids[Math.min(L50.i, ids.length - 1)]];
  const head = `<div class="l50-top"><button class="l50-ib" data-l="close" aria-label="${t('Tutup')}">${ICON('close')}</button><div class="grow"><b>${t('Dengar 50 kata')}</b><small>${esc(t(L50_SRC[s.src].ti))} · ${t('Kumpulan {a} dari {b}', { a: B.b + 1, b: B.nb })} · ${t('kata {a}–{b}', { a: B.b * 50 + 1, b: B.b * 50 + ids.length })}</small></div></div>
    <div class="l50-bar"><i style="width:${(Math.min(L50.i + (L50.play ? 0 : 0), ids.length) / ids.length) * 100}%"></i></div>`;
  if (L50.done) {
    el.innerHTML = `${head}<div class="l50-end"><div class="l50-endm">${mascot('joy', 120)}</div><h2>${t('50 kata selesai didengar!')}</h2><p class="muted">${t('Dengar sekali lagi supaya nadanya menempel, atau lanjut ke 50 kata berikutnya.')}</p>
      <div class="l50-acts"><button class="btn sec big" data-l="again">${ICON('refresh')} ${t('Ulangi 50 kata ini')}</button><button class="btn pri big" data-l="nextb" ${B.b + 1 >= B.nb ? 'disabled' : ''}>${ICON('play')} ${t('50 kata berikutnya')}</button><button class="btn ghost" data-l="quiz">${ICON('target')} ${t('Kuis 50 kata ini')}</button></div></div>`;
    return;
  }
  const tmap = ['', t('nada 1 · datar tinggi'), t('nada 2 · naik'), t('nada 3 · turun-naik'), t('nada 4 · turun tajam'), t('nada netral')];
  const tones = (w.t || []).filter(x => x).map(x => tmap[x] || '').filter((x, i, a) => a.indexOf(x) === i).join(' · ');
  el.innerHTML = `${head}
    <div class="l50-main">
      <div class="l50-card ${L50.play ? 'on' : ''}" id="l50card" data-ph="zh">
        <div class="l50-n">${L50.i + 1} / ${ids.length}</div>${lvBadgeW(w.i, { size: 'sm', cls: 'corner' })}
        <div class="l50-hz hz">${esc(w.s || w.w)}</div>
        ${s.py ? `<div class="l50-py">${l50PyHTML(w)}</div>` : ''}
        ${aligned(w) ? `<div class="l50-ct">${contourSVG(w.t, 34)}<small>${esc(tones)}</small></div>` : ''}
        <div class="l50-mean">${esc(shortMean(meanP(w)))}</div>
        <div class="l50-wave"><i></i><i></i><i></i><i></i><i></i></div>
      </div>
      <div class="l50-ctl"><button class="l50-ib big" data-l="prev" aria-label="${t('Sebelumnya')}">${ICON('chevron', 'flip')}</button>
        <button class="l50-play" data-l="play" aria-label="${L50.play ? t('Jeda') : t('Putar')}">${L50.play ? ICON('pause') : ICON('play')}</button>
        <button class="l50-ib big" data-l="next" aria-label="${t('Berikutnya')}">${ICON('chevron')}</button></div>
      <div class="l50-opts">
        <span class="small muted">${t('Ulang Mandarin')}</span><div class="seg">${[[1, '1×'], [2, '2×'], [3, '3×']].map(([v, l]) => `<button class="${s.rep === v ? 'on' : ''}" data-l="rep" data-v="${v}">${l}</button>`).join('')}</div>
        <div class="seg">${[['n', 'Normal'], ['s', 'Pelan']].map(([v, l]) => `<button class="${s.sp === v ? 'on' : ''}" data-l="sp" data-v="${v}">${t(l)}</button>`).join('')}</div>
        <button class="chip ${s.mean ? 'on' : ''}" data-l="mean">${ICON('speaker')} ${t('Ucapkan arti')}</button><button class="chip ${s.py ? 'on' : ''}" data-l="py">拼音</button>
      </div>
      <div class="l50-src"><span class="small muted">${t('Sumber kata')}:</span>${Object.entries(L50_SRC).map(([k, v]) => `<button class="chip ${s.src === k ? 'on' : ''}" data-l="src" data-v="${k}">${esc(t(v.ti))}</button>`).join('')}
        <span class="small muted">${t('Kumpulan')}:</span><select class="l50-sel" data-l="batch">${Array.from({ length: B.nb }, (_, j) => `<option value="${j}" ${j === B.b ? 'selected' : ''}>${j + 1} · ${t('kata {a}–{b}', { a: j * 50 + 1, b: Math.min(B.all.length, j * 50 + 50) })}</option>`).join('')}</select></div>
      <div class="l50-list">${ids.map((i, j) => `<button class="l50-it ${j === L50.i ? 'cur' : ''} ${j < L50.i ? 'past' : ''}" data-l="jump" data-v="${j}"><span class="hz">${esc(W[i].s || W[i].w)}${lvBadgeW(i)}</span><small>${esc(shortMean(meanP(W[i])))}</small></button>`).join('')}</div>
      ${voiceOK() ? '' : `<div class="notice">${t('Suara Mandarin belum tersedia di perangkat ini. Pasang suara "Chinese (Taiwan)" di pengaturan teks-ke-ucapan HP agar bisa didengar.')}</div>`}
    </div>`;
  const cur0 = el.querySelector('.l50-it.cur'); if (cur0) cur0.scrollIntoView({ block: 'nearest', inline: 'center' });
}
function l50Click(e) {
  const b = e.target.closest('[data-l]'); if (!b || b.tagName === 'SELECT') return; const a = b.dataset.l; const s = l50S();
  FX.ensure(); if (TTS.unlock) TTS.unlock();
  if (a === 'close') return l50Close();
  if (a === 'play') { if (L50.play) { l50Stop(); l50Render(); } else { L50.run++; L50.play = true; l50Wake(true); l50Step(); } return; }
  if (a === 'prev' || a === 'next' || a === 'jump') { const was = L50.play; l50Stop(); L50.i = a === 'jump' ? +b.dataset.v : clamp(L50.i + (a === 'next' ? 1 : -1), 0, L50.ids.length - 1); if (was) { L50.play = true; L50.run++; l50Step(); } else { l50Render(); l50Say(W[L50.ids[L50.i]].s || W[L50.ids[L50.i]].w, 'zh', s.sp === 's' ? 0.62 : 0.78); } return; }
  if (a === 'rep') { s.rep = +b.dataset.v; save(); return l50Render(); }
  if (a === 'sp') { s.sp = b.dataset.v; save(); return l50Render(); }
  if (a === 'mean') { s.mean = !s.mean; save(); return l50Render(); }
  if (a === 'py') { s.py = !s.py; save(); return l50Render(); }
  if (a === 'src') { l50Stop(); s.src = b.dataset.v; save(); return l50Open(); }
  if (a === 'again') { l50Stop(); L50.i = 0; L50.done = false; L50.run++; L50.play = true; l50Wake(true); return l50Step(); }
  if (a === 'nextb') { l50Stop(); s.b[s.src] = (s.b[s.src] || 0) + 1; save(); l50Open(); L50.run++; L50.play = true; l50Wake(true); return l50Step(); }
  if (a === 'quiz') { const ids = L50.ids.slice(); l50Close(); const mk2 = () => shuffle(ids).slice(0, 20).map((i, j) => ({ type: ['listen', 'mc_mean', 'mc_hanzi', 'tone'][j % 4], wid: i })); startSession(mk2(), { title: t('Kuis 50 kata'), rebuild: mk2, noCover: 1 }); return; }
}
document.addEventListener('change', e => { if (e.target.matches && e.target.matches('.l50-sel')) { l50Stop(); const s = l50S(); s.b[s.src] = +e.target.value; save(); l50Open(); } });
window.addEventListener('hashchange', () => { if ($('#l50')) l50Close(); });
/* pintu masuk: halaman Simak + menu Kelas */
function l50Banner() {
  const s = l50S(); const B = l50Batch();
  return `<section class="l50-banner" data-a="l50" role="button"><span class="l50-bi">${ICON('headphone')}</span><div class="grow" style="min-width:0"><b>${t('Dengar 50 kata')}</b><span>${t('Kata Mandarin diucapkan jelas, lalu artinya — seperti guru membacakan. Kumpulan {a}/{b}.', { a: B.b + 1, b: B.nb })}</span></div><span class="btn pri small">${ICON('play')} ${t('Putar')}</span></section>`;
}
const vListenL50 = vListen;
vListen = function () { const h = vListenL50(); return l50Banner() + h; };
const XVIEWS_L50 = XVIEWS.kelas;
XVIEWS.kelas = function () {
  let h = XVIEWS_L50(); if (VK.view !== 'map' && VK.view) return h;
  return h.replace('<section class="kl-tools">', `<section class="kl-tools"><button class="kl-tool" data-a="l50">${TILE('headphone', 'tint c6')}<b>${t('Dengar 50 kata')}</b><span>${t('Mandarin diucapkan jelas + artinya')}</span></button>`);
};
Object.assign(ACT, { l50: () => l50Open() });
START_ACTS.add('l50');