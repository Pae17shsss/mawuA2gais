/* ===== 6. HUJAN KATA ===== */
function lgQHujan() {
  const f = $('#lgf');
  if (!f) {
    $('#lgst').innerHTML = `<div class="lg-rtop"><button class="speak lg-play" data-lg="play" aria-label="${t('Putar')}">${ICON('speaker')}</button><button class="speak lg-pill lg-slowb" data-lg="slow" aria-label="${t('Putar pelan')}">${ICON('slow')}<span>0.6×</span></button><span class="lg-rnote" id="lgrn">${t('Ketuk hanzi yang kamu dengar')}</span></div>
      <div class="lg-rain" id="lgf"><div class="lg-cloud c1"></div><div class="lg-cloud c2"></div><div class="lg-ground"></div>${lgMasHTML(56)}</div>`;
  }
  const lv = LG.lv; const n = lv >= 2 ? 4 : 3; const i = lgPickW(1, [2, 2, 3, 3, 4][lv]); const it = lgWItem(i);
  const opts = shuffle([i, ...lgDistract(i, n - 1, lv)]); const fld = $('#lgf'); const Wd = fld.clientWidth || 360; const H = fld.clientHeight || 500;
  fld.querySelectorAll('.lg-drop').forEach(d => d.remove());
  const lane = Wd / n; const dur = clamp(7.4 - lv * 0.8 - LG.n * 0.08, 3.2, 8);
  LG.q = { item: it, done: false, H, drops: opts.map((k, j) => {
    const el = document.createElement('button'); el.className = 'lg-drop'; el.dataset.lg = 'drop'; el.dataset.v = j;
    el.innerHTML = `<span class="hz">${esc(lgTxt(W[k]))}</span>${lv <= 1 ? `<small>${lgPyHTML(lgIdx().syl[k])}</small>` : ''}`;
    el.style.width = Math.min(lane - 10, 132) + 'px'; fld.appendChild(el);
    return { k, el, x: lane * (j + 0.5), y: -76 - Math.random() * 110, v: (H + 60) / dur * (0.88 + Math.random() * 0.24), dead: false };
  }) };
  LG.q.drops.forEach(d => { d.el.style.left = (d.x - d.el.offsetWidth / 2) + 'px'; d.el.style.transform = `translate3d(0,${d.y}px,0)`; });
  const rn = $('#lgrn'); if (rn) rn.innerHTML = voiceOK() ? (LG.n ? '' : esc(t('Ketuk hanzi yang kamu dengar'))) : lgPyHTML(it.sy);
  lgSay(it.zh);
}
function lgRainStep(dt) {
  const q = LG.q; if (!q || !q.drops || q.done) return; const ground = q.H - 64;
  for (const d of q.drops) {
    if (d.dead) continue; d.y += d.v * dt; d.el.style.transform = `translate3d(0,${d.y}px,0)`;
    if (d.y >= ground) { if (d.k === q.item.i) { lgRainMiss(d); return; } d.dead = true; d.el.classList.add('fade'); }
  }
}
function lgRainMiss(d) {
  const q = LG.q; q.done = true; d.el.classList.add('landed');
  q.drops.forEach(x => { if (x !== d) x.el.classList.add('fade'); });
  lgAnswer(false, 0, q.item, d.el); LG.n++;
  const rn = $('#lgrn'); if (rn) rn.innerHTML = `<span class="hz">${esc(q.item.zh)}</span> ${lgPyHTML(q.item.sy)}`;
  LG.nx = setTimeout(() => { const r = $('#lgrn'); if (r) r.innerHTML = ''; lgNext(); }, 1300);
}
function lgDrop(j) {
  const q = LG.q; if (!q || q.done || LG.phase !== 'play') return; const d = q.drops[j]; if (!d || d.dead) return;
  if (d.k === q.item.i) {
    q.done = true; d.el.classList.add('pop'); q.drops.forEach(x => { if (x !== d) x.el.classList.add('fade'); });
    lgAnswer(true, 0, q.item, d.el); LG.n++; LG.nx = setTimeout(lgNext, 520);
  } else {
    d.dead = true; d.el.classList.add('burst'); lgAnswer(false, 0, null, d.el);
    if (!LG.missed.some(x => x.zh === q.item.zh)) { LG.missed.push({ i: q.item.i, zh: q.item.zh, py: q.item.sy.map(s => s.y).join(' '), tr: q.item.tr }); lgMissRec(q.item.i); }
    if (LG.lives <= 0) { q.done = true; LG.nx = setTimeout(lgEnd, 700); }
  }
}

/* ---------- akhir ronde ---------- */
function lgFinish(silent) {
  if (!LG || LG.finished) return; LG.finished = true;
  const s = lgS(); const k = LG.k; const sc = Math.round(LG.score);
  LG.newBest = sc > (s.best[k] || 0) && sc > 0; if (LG.newBest) s.best[k] = sc;
  s.lv[k] = LG.lv; s.last[k] = { sc, acc: LG.ans ? Math.round(LG.hits / LG.ans * 100) : 0, t: Date.now() };
  const xp = Math.min(150, Math.round(LG.hits * 3 + LG.maxC + (LG.newBest ? 10 : 0))); LG.xp = xp; if (xp) addXP(xp, true);
  const d = dayRec(); d.ms = (d.ms || 0) + Math.min(15 * 60000, Date.now() - LG.t0);
  try { checkQuests(); } catch (e) {} save(true);
  if (silent && xp) toast(`+${xp} XP`, 1800, 'lgxp');
}
function lgEnd() {
  if (!LG || LG.phase === 'end') return; lgKill(); LG.run++; hushAll(); LG.phase = 'end'; LG.hold = 0; lgFinish();
  const s = lgS(); const acc = LG.ans ? Math.round(LG.hits / LG.ans * 100) : 0; const mood = acc >= 85 ? 'joy' : acc >= 60 ? 'happy' : acc >= 35 ? 'think' : 'oops';
  const title = LG.newBest ? t('Rekor baru!') : acc >= 85 ? t('Luar biasa!') : acc >= 60 ? t('Kerja bagus!') : t('Ronde selesai');
  if (LG.newBest || acc >= 85) { setTimeout(() => { confetti(); FX.play('level'); }, 250); } else FX.play('quest');
  const miss = LG.missed.slice(0, 12);
  $('#lgov').innerHTML = `<div class="lg-end"><div class="lg-endc">
    <div class="lg-endm">${mascot(mood, 112)}${LG.newBest ? `<span class="lg-nb">${ICON('award')} ${t('REKOR BARU')}</span>` : ''}</div>
    <h2>${title}</h2><p class="muted small">${t(LG.g.ti)} · ${esc(lgSrcName(LG.src))}</p>
    <div class="lg-kpis"><div><b>${fmtN(Math.round(LG.score))}</b><span>${t('skor')}</span></div><div><b>${acc}%</b><span>${t('akurasi')}</span></div><div><b>${LG.maxC}</b><span>${t('combo maks')}</span></div><div><b>+${LG.xp || 0}</b><span>XP</span></div></div>
    <div class="lg-bestl">${ICON('award')} ${t('Skor terbaik')}: <b>${fmtN(s.best[LG.k] || 0)}</b> · ${LG.hits}/${LG.ans} ${t('benar')} · ${t('Level')} ${LG.lv + 1}</div>
    ${miss.length ? `<div class="lg-miss"><b>${t('Perlu didengar lagi')}</b>${miss.map(m => `<div class="lg-mr"><button class="speak mini" data-lg="say" data-v="${esc(m.zh)}" aria-label="${t('Putar')}">${ICON('speaker')}</button><div class="grow" style="min-width:0"><span class="hz">${esc(m.zh)}</span>${m.i !== undefined ? lvBadgeW(m.i) : lvBadgeS(m.zh)} <span class="lg-mpy">${esc(m.py)}</span><small>${esc(m.tr)}</small></div><button class="lg-ib sm" data-lg="saysl" data-v="${esc(m.zh)}" aria-label="${t('Putar pelan')}">${ICON('slow')}</button></div>`).join('')}</div>` : `<div class="lg-perfect">${ICON('sparkle')} ${t('Tidak ada yang salah dengar. Telingamu tajam!')}</div>`}
    <div class="lg-acts"><button class="btn pri big" data-lg="again">${ICON('refresh')} ${t('Main lagi')}</button>${miss.some(m => m.i !== undefined) ? `<button class="btn sec" data-lg="redo">${ICON('target')} ${t('Latih yang salah dengar')}</button>` : ''}<button class="btn ghost" data-lg="hub">${ICON('grid')} ${t('Ganti game')}</button></div>
  </div></div>`;
  $('#lgov').classList.add('on'); const st = $('#lgst'); if (st) st.innerHTML = '';
}

/* ---------- klik di dalam game ---------- */
function lgClick(e) {
  const b = e.target.closest('[data-lg]'); if (!b || !LG) return; const a = b.dataset.lg; const v = b.dataset.v;
  FX.ensure(); if (TTS.unlock) TTS.unlock();
  const q = LG.q; const playing = LG.phase === 'play';
  switch (a) {
    case 'close': return lgClose();
    case 'hub': return lgClose(true);
    case 'pause': return lgPause(LG.phase === 'play');
    case 'resume': return lgPause(false);
    case 'quit': LG.phase = 'play'; LG.paused = false; return lgEnd();
    case 'again': { const g = LG.k, src = LG.src; lgClose(); return lgOpen(g, { src }); }
    case 'redo': { const g = LG.k, src = LG.src; const ids = LG.missed.map(m => m.i).filter(i => i !== undefined); lgClose(); if (LG_G(g).sent) return lgOpen('tangkap', { src, focus: ids }); return lgOpen(g, { src, focus: ids }); }
    case 'play': if (q && q.item) lgSay(q.item.zh); return;
    case 'slow': if (q && q.item) lgSay(q.item.zh, true); return;
    case 'say': return lgSay(v);
    case 'saysl': return lgSay(v, true);
    case 'hum': try { TONE.play(String(v).split(',').map(Number), { force: true }); } catch (x) {} return;
    case 'next': if (playing && q && q.done) { FX.play('tap'); lgNext(); } return;
    case 'pick': if (!playing) return; FX.play('tap'); return LG.k === 'nada' ? lgPickNada(+v, b) : lgPickTangkap(+v, b);
    case 'dkmode': { const s = lgS(); if (s.dk === v || !q || q.done) return; s.dk = v; save(); lgQDikte(q.item); return; }
    case 'tkey': { const inp = $('#lgin'); if (inp) { inp.value += v; inp.focus(); } return; }
    case 'tsel': if (!q || q.done) return; FX.play('flip'); q.sel.push(+v); if (LG.k === 'dikte') { lgTilesRender(); if (q.sel.length >= [...lgHanOnly(q.item.zh)].length) setTimeout(() => lgDikteCheck(), 260); } else lgSusunRender(); return;
    case 'unsel': if (!q || q.done) return; FX.play('tap'); q.sel.splice(+v, 1); return LG.k === 'dikte' ? lgTilesRender() : lgSusunRender();
    case 'clear': if (!q || q.done) return; q.sel = []; return lgSusunRender();
    case 'check': return lgSusunCheck();
    case 'skip': if (!playing || !q || q.done) return; if (LG.k === 'susun') return lgSusunCheck(true); if (LG.k === 'dikte') return lgDikteCheck(true); if (LG.k === 'ucap') { q.done = true; lgStopStream(q); LG.ans++; LG.combo = 0; LG.n++; lgHud(); if (!LG.missed.some(x => x.zh === q.item.zh)) LG.missed.push({ i: q.item.i, zh: q.item.zh, py: q.item.sy.map(s => s.y).join(' '), tr: q.item.tr }); return LG.n >= LG.g.n ? lgEnd() : lgNext(); } return;
    case 'mic': return lgMic();
    case 'rec': return lgRecToggle();
    case 'mine': if (q && q.url) { try { TTS.stop(); const au = new Audio(q.url); au.play().catch(() => {}); } catch (x) {} } return;
    case 'rate': return lgUcapDone(+v);
    case 'unext': if (q && q.best) return lgUcapDone(q.best.pct); return;
    case 'pytog': { const s = lgS(); s.hidePy = !s.hidePy; save(); return lgUcapRender(); }
    case 'drop': return lgDrop(+v);
  }
}
document.addEventListener('keydown', e => {
  if (!LG || !document.getElementById('lgx')) return; const tag = (e.target && e.target.tagName) || ''; const typing = tag === 'INPUT' || tag === 'TEXTAREA';
  if (e.key === 'Escape') { e.preventDefault(); if (LG.phase === 'play') lgPause(true); else if (LG.phase === 'pause') lgPause(false); return; }
  if (LG.phase !== 'play') return; const q = LG.q;
  if (e.key === 'Enter' && q && q.done && !typing) { e.preventDefault(); return lgNext(); }
  if (typing) return;
  if (/^[1-6]$/.test(e.key) && q && !q.done && (LG.k === 'tangkap' || LG.k === 'nada')) { const j = +e.key - 1; if (q.opts && j < q.opts.length) { e.preventDefault(); const b = document.querySelectorAll('#lgst .lg-opt')[j]; FX.play('tap'); LG.k === 'nada' ? lgPickNada(j, b) : lgPickTangkap(j, b); } return; }
  if ((e.key === ' ' || e.key === 'r') && q && q.item) { e.preventDefault(); lgSay(q.item.zh, e.shiftKey); }
});
document.addEventListener('visibilitychange', () => { if (document.hidden && LG && LG.phase === 'play') lgPause(true); });
window.addEventListener('hashchange', () => { if (document.getElementById('lgx')) lgClose(); });

/* ---------- HUB (rute lgame) ---------- */
function lgSrcOK(src) { if (src === 'learned' || src === 'a2' || src === 'miss') return true; const m = /^k:(\d+)$/.exec(src); return !!(m && lgLessons().some(L => L.n === +m[1])); }
function vLGame() {
  const s = lgS(); if (!lgSrcOK(s.src)) s.src = 'learned';
  const nL = lgWordsOf('learned').length, nA = lgWordsOf('a2').length, nM = lgMissIds().length;
  const words = lgWordsOf(s.src).length; const kl = /^k:/.test(s.src); const sents = kl ? lgSentsOf(s.src).length : 0;
  const Ls = lgLessons(); const kOpt = Ls.filter(L => !lgIsSD(L)), sdOpt = Ls.filter(lgIsSD);
  const sel = (arr, ph) => `<select class="lg-sel ${arr.some(L => s.src === 'k:' + L.n) ? 'on' : ''}" data-lgin="src" aria-label="${esc(ph)}"><option value="">${esc(ph)}</option>${arr.map(L => `<option value="k:${L.n}" ${s.src === 'k:' + L.n ? 'selected' : ''}>${esc(lgLessonName(L.n))}</option>`).join('')}</select>`;
  const chip = (k, ic, lab, n) => `<button class="chip lg-src ${s.src === k ? 'on' : ''}" data-a="lgsrc" data-v="${k}" ${n === 0 && k === 'miss' ? 'disabled' : ''}>${ICON(ic)} ${esc(lab)} <b>${fmtN(n)}</b></button>`;
  const weak = Object.entries(s.miss).filter(([, r]) => r && r.m > 0).sort((a, b) => b[1].m - a[1].m).slice(0, 10).map(([f]) => lgIdx().form.get(f)).filter(i => i !== undefined && W[i]);
  const total = Object.values(s.best).reduce((a, x) => a + (+x || 0), 0);
  return `<section class="card glass lg-hero">
      <div class="lg-hrow"><span class="poke" data-a="poke" role="button" tabindex="0" aria-label="Hacimi">${mascot('wave', 92)}</span>
      <div class="grow" style="min-width:0"><span class="gpill">${ICON('lgame')} ${t('Telinga & lidah')}</span><h1>${t('Game Dengar')}</h1>
        <p class="muted">${t('Latih telinga membedakan bunyi & nada, lalu latih lidah mengucapkannya. Ronde singkat 1–2 menit, combo, rekor, dan XP.')}</p></div></div>
      <div class="lg-hstat"><div><b>${fmtN(total)}</b><span>${t('total rekor')}</span></div><div><b>${fmtN(Object.values(s.plays).reduce((a, x) => a + (+x || 0), 0))}</b><span>${t('ronde dimainkan')}</span></div><div><b>${nM}</b><span>${t('kata salah dengar')}</span></div></div>
      ${voiceOK() ? '' : `<div class="notice" style="margin-top:12px">${t('Suara Mandarin belum tersedia di perangkat ini. Pasang suara "Chinese (Taiwan)" di pengaturan teks-ke-ucapan agar game bisa didengar.')}</div>`}</section>
    <section class="card glass lg-srcs"><h2>${t('Sumber latihan')}</h2>
      <div class="lg-srow">${chip('learned', 'seed', t('Kata yang sudah dipelajari'), nL)}${chip('a2', 'path', t('Kosakata A2'), nA)}${chip('miss', 'target', t('Salah dengar'), nM)}</div>
      <div class="lg-srow lg-sels"><label><span class="small muted">${t('Lesson Kelas')}</span>${sel(kOpt, t('Pilih lesson Kelas…'))}</label><label><span class="small muted">時代華語 1</span>${sel(sdOpt, t('Pilih lesson 時代華語…'))}</label></div>
      <p class="small muted lg-snote">${ICON('info')} <span><b>${esc(lgSrcName(s.src))}</b> · ${fmtN(words)} ${t('kata')}${kl ? ` · ${fmtN(sents)} ${t('kalimat dari dialog & contoh')}` : ` · ${t('kalimat dibuat dari pola sesuai levelmu')}`}${words < 8 ? ` · ${t('ditambah kata A2 dasar')}` : ''}</span></p></section>
    <section class="lg-grid">${LG_GAMES.map(G0 => { const b = s.best[G0.k] || 0; const lv = clamp(s.lv[G0.k] || 0, 0, 4); const last = s.last[G0.k];
      return `<button class="lg-card ${G0.c}" data-a="lgplay" data-v="${G0.k}"><span class="lg-art">${ICON(G0.ic)}<i></i><i></i><i></i></span>
        <span class="lg-cb"><b>${t(G0.ti)}</b><span class="lg-cs">${t(G0.sub)}</span>
        <span class="lg-cm"><span class="lg-cbest">${ICON('award')} ${b ? fmtN(b) : '—'}</span><span class="lg-lvd sm">${[0, 1, 2, 3, 4].map(k => `<i class="${k <= lv ? 'on' : ''}"></i>`).join('')}</span><span class="lg-cdur">${G0.n ? G0.n + ' ' + t('soal') : G0.dur + 's'}${last ? ' · ' + last.acc + '%' : ''}</span></span></span>
        <span class="lg-go">${ICON('play')}</span></button>`; }).join('')}</section>
    ${weak.length ? `<section class="card glass lg-weak"><div class="row" style="gap:10px;align-items:center"><h2 class="grow" style="margin:0">${t('Sering salah dengar')}</h2><button class="btn pri small" data-a="lgweak">${ICON('target')} ${t('Latih yang salah dengar')}</button></div>
      <div class="lg-wl">${weak.map(i => `<button class="lg-ww" data-a="lgsay" data-v="${esc(lgTxt(W[i]))}"><span class="hz">${esc(lgTxt(W[i]))}${lvBadgeW(i)}</span><small>${esc(pyPlainLG(W[i]))}</small><em>${(s.miss[W[i].w] || {}).m || 0}×</em></button>`).join('')}</div></section>` : ''}
    <section class="card glass lg-tips"><h2>${t('Tips')}</h2><div class="steps-mini">
      ${[['speaker', 'Tombol pelan', 'Tiap soal punya tombol 0.6× — dengar per suku kata dengan tenang.'], ['flame', 'Combo', 'Jawaban benar beruntun melipatgandakan poin. Level naik otomatis kalau kamu lancar.'], ['mic', 'Ucapkan!', 'Butuh izin mikrofon. Kalau browser tidak bisa mengenali suara, kamu bisa rekam & bandingkan sendiri.']].map(([i, a, b]) => `<div class="sm-step"><span>${ICON(i)}</span><div><b>${t(a)}</b><p>${t(b)}</p></div></div>`).join('')}</div></section>`;
}
const pyPlainLG = w => (w.y && w.y.length ? w.y.join(' ') : w.p || '');
XVIEWS.lgame = vLGame;
Object.assign(ACT, {
  lgame: () => go('lgame'),
  lgplay: b => lgOpen(b.dataset.v),
  lgsrc: b => { const s = lgS(); s.src = b.dataset.v; save(); render(); },
  lgweak: () => { const ids = lgMissIds(); if (!ids.length) return; lgOpen('tangkap', { src: 'miss' }); },
  lgsay: b => lgSay(b.dataset.v)
});
['lgplay', 'lgweak'].forEach(a => START_ACTS.add(a));
document.addEventListener('change', e => { if (e.target && e.target.dataset && e.target.dataset.lgin === 'src') { const v = e.target.value; if (!v) return; lgS().src = v; save(); render(); } });

/* ---------- navigasi + pintu masuk ---------- */
(function () {
  if (!ROUTES.some(r => r[0] === 'lgame')) { const k = ROUTES.findIndex(r => r[0] === 'listen'); ROUTES.splice(k >= 0 ? k + 1 : 2, 0, ['lgame', 'lgame', 'Game Dengar']); }
  TAB_SHORT.lgame = 'Game Dengar'; ROUTE_DESC.lgame = 'Main telinga: nada, dikte, ucapkan'; ROUTE_COLOR.lgame = 'c5';
})();
function lgEntry(kind) {
  const s = lgS(); const best = Object.values(s.best).reduce((a, x) => Math.max(a, +x || 0), 0); const nM = Object.values(s.miss).filter(r => r && r.m > 0).length;
  const sub = kind === 'home' ? t('6 mini-game telinga & pelafalan · 1–2 menit') : t('Tangkap Bunyi, Pemburu Nada, Dikte Kilat, Susun Kalimat, Ucapkan!, Hujan Kata');
  return `<section class="lg-entry ${kind}" data-a="lgame" role="button" tabindex="0"><span class="lg-ei">${ICON('lgame')}</span><div class="grow" style="min-width:0"><b>${t('Game Dengar')}</b><span>${esc(sub)}${nM ? ` · ${t('{n} kata perlu didengar lagi', { n: nM })}` : best ? ` · ${t('rekor')} ${fmtN(best)}` : ''}</span></div><span class="lg-eg">${ICON('play')}</span></section>`;
}
function lgInsertAfter(h, nth, card) { let k = -1; for (let j = 0; j < nth; j++) { const x = h.indexOf('</section>', k + 1); if (x < 0) break; k = x; } return k < 0 ? h + card : h.slice(0, k + 10) + card + h.slice(k + 10); }
const vListenLG = vListen;
vListen = function () { const h = vListenLG(); try { return lgInsertAfter(h, 2, lgEntry('listen')); } catch (e) { return h; } };
const vArcadeLG = vArcade;
vArcade = function () { const h = vArcadeLG(); try { return lgInsertAfter(h, 1, lgEntry('arcade')); } catch (e) { return h; } };
const vHomeLG = vHome;
vHome = function () { const h = vHomeLG(); try { const n = (h.match(/<\/section>/g) || []).length; return lgInsertAfter(h, Math.min(3, Math.max(1, n - 1)), lgEntry('home')); } catch (e) { return h; } };
document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.classList && e.target.classList.contains('lg-entry')) { e.preventDefault(); go('lgame'); } });
/* terjemahan Game Dengar (hanya mengisi yang belum ada) */
(function () { const T = {"Game Dengar": ["Listening Games", "Mga Laro sa Pakikinig", "Trò chơi nghe"], "Main telinga: nada, dikte, ucapkan": ["Ear games: tones, dictation, speaking", "Laro sa tainga: tono, dikta, pagbigkas", "Luyện tai: thanh điệu, chính tả, phát âm"], "6 mini-game telinga & pelafalan · 1–2 menit": ["6 ear & pronunciation mini-games · 1–2 min", "6 mini-game sa pakikinig at pagbigkas · 1–2 min", "6 trò chơi nghe & phát âm · 1–2 phút"], "Tangkap Bunyi, Pemburu Nada, Dikte Kilat, Susun Kalimat, Ucapkan!, Hujan Kata": ["Sound Catcher, Tone Hunter, Flash Dictation, Sentence Builder, Say It!, Word Rain", "Sound Catcher, Tone Hunter, Flash Dictation, Sentence Builder, Say It!, Word Rain", "Bắt âm, Săn thanh điệu, Chính tả nhanh, Xếp câu, Nói đi!, Mưa chữ"], "{n} kata perlu didengar lagi": ["{n} words to hear again", "{n} salitang dapat pakinggan muli", "{n} từ cần nghe lại"], "rekor": ["best", "rekord", "kỷ lục"], "Tangkap Bunyi": ["Sound Catcher", "Sound Catcher", "Bắt âm"], "Pemburu Nada": ["Tone Hunter", "Tone Hunter", "Săn thanh điệu"], "Dikte Kilat": ["Flash Dictation", "Flash Dictation", "Chính tả nhanh"], "Susun Kalimat Dengar": ["Listen & Build", "Makinig at Buuin", "Nghe & xếp câu"], "Ucapkan!": ["Say It!", "Sabihin!", "Nói đi!"], "Hujan Kata": ["Word Rain", "Ulan ng Salita", "Mưa chữ"], "Dengar kata, pilih hanzi + pinyin yang tepat di antara bunyi yang mirip": ["Hear a word, pick the right hanzi + pinyin among similar sounds", "Pakinggan ang salita, piliin ang tamang hanzi + pinyin sa magkakatunog", "Nghe từ, chọn đúng hán tự + pinyin giữa các âm gần giống"], "Dengar kata, ketuk pola nadanya — termasuk jebakan sandhi": ["Hear a word, tap its tone pattern — sandhi traps included", "Pakinggan, pindutin ang pattern ng tono — may bitag na sandhi", "Nghe từ, chọn mẫu thanh điệu — có bẫy biến điệu"], "Dengar, lalu ketik pinyinnya atau susun hanzinya": ["Listen, then type the pinyin or build the hanzi", "Makinig, saka i-type ang pinyin o buuin ang hanzi", "Nghe rồi gõ pinyin hoặc xếp hán tự"], "Dengar kalimat dari dialog & contoh, susun potongannya": ["Hear sentences from dialogs & examples, put the pieces in order", "Pakinggan ang pangungusap mula sa dialogo at halimbawa, ayusin ang mga piraso", "Nghe câu từ hội thoại & ví dụ, xếp các mảnh theo thứ tự"], "Tiru suara model — app menilai pelafalan & nadamu": ["Copy the model voice — the app rates your pronunciation & tones", "Gayahin ang modelo — sinusuri ng app ang bigkas at tono mo", "Bắt chước giọng mẫu — app chấm phát âm & thanh điệu"], "Kata berjatuhan — ketuk yang kamu dengar sebelum menyentuh tanah": ["Words fall — tap the one you hear before it lands", "Bumabagsak ang mga salita — pindutin ang narinig mo bago lumapag", "Chữ rơi xuống — chạm vào từ bạn nghe trước khi chạm đất"], "Dengarkan, lalu pilih kata yang tepat. Pengecohnya berbunyi mirip!": ["Listen, then pick the right word. The decoys sound alike!", "Makinig, saka piliin ang tamang salita. Magkakatunog ang mga panlinlang!", "Nghe rồi chọn từ đúng. Các đáp án nhiễu nghe rất giống!"], "Dengarkan, lalu ketuk pola nada kamus (nada tulisan).": ["Listen, then tap the dictionary tone pattern (written tones).", "Makinig, saka pindutin ang tono ayon sa diksiyonaryo (nakasulat).", "Nghe rồi chọn mẫu thanh điệu theo từ điển (thanh viết)."], "Dengarkan, lalu ketik pinyinnya (ni3hao3 atau nǐ hǎo) — atau susun hanzinya.": ["Listen, then type the pinyin (ni3hao3 or nǐ hǎo) — or build the hanzi.", "Makinig, saka i-type ang pinyin (ni3hao3 o nǐ hǎo) — o buuin ang hanzi.", "Nghe rồi gõ pinyin (ni3hao3 hoặc nǐ hǎo) — hoặc xếp hán tự."], "Dengarkan kalimatnya, lalu ketuk potongan kata sesuai urutan.": ["Listen to the sentence, then tap the pieces in order.", "Pakinggan ang pangungusap, saka pindutin ang mga piraso nang sunod-sunod.", "Nghe câu rồi chạm các mảnh theo đúng thứ tự."], "Dengar model, tekan mikrofon, lalu ucapkan. 8 kata/kalimat.": ["Hear the model, press the mic, then speak. 8 words/sentences.", "Pakinggan ang modelo, pindutin ang mic, saka magsalita. 8 salita/pangungusap.", "Nghe mẫu, bấm micro rồi nói. 8 từ/câu."], "Dengarkan katanya, ketuk hanzi yang jatuh sebelum menyentuh tanah. 3 nyawa.": ["Hear the word, tap the falling hanzi before it lands. 3 lives.", "Pakinggan ang salita, pindutin ang bumabagsak na hanzi bago lumapag. 3 buhay.", "Nghe từ, chạm hán tự đang rơi trước khi chạm đất. 3 mạng."], "Akhiri ronde": ["End round", "Tapusin ang round", "Kết thúc vòng"], "Ambil napas. Game menunggu kamu.": ["Take a breath. The game will wait.", "Huminga muna. Maghihintay ang laro.", "Hít thở. Trò chơi sẽ chờ bạn."], "Bandingkan kedua bunyi: dengar bedanya di nada atau konsonannya.": ["Compare both sounds: listen for the difference in tone or consonant.", "Ihambing ang dalawang tunog: pakinggan ang pagkakaiba sa tono o katinig.", "So sánh hai âm: nghe khác biệt ở thanh điệu hoặc phụ âm."], "Belum": ["Not yet", "Hindi pa", "Chưa"], "Belum pas. Dengar model lalu coba lagi.": ["Not quite. Hear the model and try again.", "Hindi pa tama. Pakinggan ang modelo at subukan muli.", "Chưa đúng. Nghe mẫu rồi thử lại."], "Belum tepat": ["Not quite", "Hindi tama", "Chưa đúng"], "Belum terdengar. Tekan mikrofon lalu ucapkan dengan jelas.": ["Didn't catch that. Press the mic and speak clearly.", "Walang narinig. Pindutin ang mic at magsalita nang malinaw.", "Chưa nghe thấy. Bấm micro rồi nói rõ ràng."], "Benar!": ["Correct!", "Tama!", "Đúng!"], "Cek": ["Check", "Suriin", "Kiểm tra"], "Dengar kata": ["Hear word", "Pakinggan ang salita", "Nghe từ"], "Dengar kontur nada": ["Hear tone contour", "Pakinggan ang kurba ng tono", "Nghe đường thanh điệu"], "Dengar lagi": ["Hear again", "Pakinggan muli", "Nghe lại"], "Dengarkan baik-baik": ["Listen closely", "Makinig nang mabuti", "Lắng nghe kỹ"], "Ganti game": ["Change game", "Palitan ang laro", "Đổi trò chơi"], "Hampir!": ["Almost!", "Muntik na!", "Gần đúng!"], "Jawaban": ["Answer", "Sagot", "Đáp án"], "Kamu": ["You", "Ikaw", "Bạn"], "Kata belum cukup untuk game ini. Pelajari beberapa kata dulu, atau pilih sumber A2.": ["Not enough words for this game. Learn a few words first, or pick the A2 source.", "Kulang ang salita para sa larong ito. Mag-aral muna ng ilang salita, o piliin ang A2.", "Chưa đủ từ cho trò chơi này. Hãy học vài từ trước hoặc chọn nguồn A2."], "Kata di sumber ini belum cukup — ditambah kata A2 dasar.": ["Not enough words in this source — basic A2 words added.", "Kulang ang salita sa pinagkunang ito — dinagdagan ng batayang A2.", "Nguồn này chưa đủ từ — đã thêm từ A2 cơ bản."], "Kata yang sudah dipelajari": ["Words I have learned", "Mga salitang napag-aralan", "Từ đã học"], "Kerja bagus!": ["Nice work!", "Magaling!", "Làm tốt lắm!"], "Ketik pinyin": ["Type pinyin", "I-type ang pinyin", "Gõ pinyin"], "Pilih hanzi": ["Pick hanzi", "Piliin ang hanzi", "Chọn hán tự"], "Ketuk hanzi yang kamu dengar": ["Tap the hanzi you hear", "Pindutin ang hanzing narinig mo", "Chạm vào hán tự bạn nghe"], "Ketuk potongan kata sesuai urutan yang kamu dengar": ["Tap the pieces in the order you hear them", "Pindutin ang mga piraso ayon sa narinig mo", "Chạm các mảnh theo thứ tự bạn nghe"], "Kosakata A2": ["A2 vocabulary", "Bokabularyong A2", "Từ vựng A2"], "Kuning = bunyinya benar, nadanya kemungkinan meleset.": ["Yellow = right sound, tone probably off.", "Dilaw = tama ang tunog, malamang mali ang tono.", "Vàng = âm đúng, thanh điệu có thể lệch."], "Lanjut": ["Continue", "Magpatuloy", "Tiếp tục"], "Latih telinga membedakan bunyi & nada, lalu latih lidah mengucapkannya. Ronde singkat 1–2 menit, combo, rekor, dan XP.": ["Train your ear to tell sounds & tones apart, then train your tongue to say them. Short 1–2 min rounds, combos, records and XP.", "Sanayin ang tainga sa pagkilala ng tunog at tono, saka ang dila sa pagbigkas. Maiikling round na 1–2 min, combo, rekord at XP.", "Luyện tai phân biệt âm & thanh điệu, rồi luyện lưỡi phát âm. Vòng ngắn 1–2 phút, combo, kỷ lục và XP."], "Latih yang salah dengar": ["Practice misheard words", "Sanayin ang mga maling narinig", "Luyện từ nghe sai"], "Lesson Kelas": ["Class lesson", "Aralin sa klase", "Bài học lớp"], "Level": ["Level", "Level", "Cấp"], "Lewati": ["Skip", "Laktawan", "Bỏ qua"], "Luar biasa!": ["Amazing!", "Kahanga-hanga!", "Tuyệt vời!"], "Main lagi": ["Play again", "Maglaro muli", "Chơi lại"], "Mendengarkan…": ["Listening…", "Nakikinig…", "Đang nghe…"], "Merekam… ketuk lagi untuk berhenti": ["Recording… tap again to stop", "Nagre-record… pindutin muli para huminto", "Đang ghi… chạm lần nữa để dừng"], "Mikrofon tidak bisa dipakai (izin ditolak atau tidak ada). Ucapkan keras-keras, lalu nilai sendiri — atau lewati.": ["The microphone can't be used (permission denied or missing). Say it out loud and rate yourself — or skip.", "Hindi magamit ang mikropono (tinanggihan o wala). Sabihin nang malakas at i-rate ang sarili — o laktawan.", "Không dùng được micro (bị từ chối hoặc không có). Hãy nói to rồi tự chấm — hoặc bỏ qua."], "Mirip": ["Close", "Malapit", "Gần giống"], "Mirip! Perhatikan suku kata berwarna.": ["Close! Check the colored syllables.", "Malapit! Tingnan ang mga pantig na may kulay.", "Gần đúng! Chú ý các âm tiết có màu."], "Model": ["Model", "Modelo", "Mẫu"], "Mulai!": ["Go!", "Simula!", "Bắt đầu!"], "Pas": ["Spot on", "Tama", "Chuẩn"], "Pas! Pelafalanmu jelas.": ["Spot on! Clear pronunciation.", "Tama! Malinaw ang bigkas mo.", "Chuẩn! Phát âm rõ ràng."], "Pengenal suara butuh internet. Pakai mode rekam & bandingkan.": ["Speech recognition needs internet. Using record & compare mode.", "Kailangan ng internet ang speech recognition. Gamitin ang record at ihambing.", "Nhận dạng giọng nói cần internet. Dùng chế độ ghi âm & so sánh."], "Perangkat ini tidak bisa merekam. Ucapkan keras-keras, lalu nilai sendiri.": ["This device can't record. Say it out loud, then rate yourself.", "Hindi makapag-record ang device na ito. Sabihin nang malakas, saka i-rate ang sarili.", "Thiết bị này không ghi âm được. Hãy nói to rồi tự chấm."], "Perlu didengar lagi": ["Hear these again", "Pakinggan muli", "Cần nghe lại"], "Pilih lesson Kelas…": ["Pick a class lesson…", "Pumili ng aralin…", "Chọn bài học lớp…"], "Pilih lesson 時代華語…": ["Pick a 時代華語 lesson…", "Pumili ng aralin sa 時代華語…", "Chọn bài 時代華語…"], "Pilihanmu": ["Your pick", "Pinili mo", "Bạn chọn"], "Putar": ["Play", "I-play", "Phát"], "Putar pelan": ["Play slowly", "I-play nang mabagal", "Phát chậm"], "REKOR BARU": ["NEW RECORD", "BAGONG REKORD", "KỶ LỤC MỚI"], "Rekam suaraku": ["Record my voice", "I-record ang boses ko", "Ghi giọng tôi"], "Rekam suaramu, lalu bandingkan dengan model": ["Record yourself, then compare with the model", "I-record ang sarili, saka ihambing sa modelo", "Ghi giọng bạn rồi so với mẫu"], "Rekor baru!": ["New record!", "Bagong rekord!", "Kỷ lục mới!"], "Ronde selesai": ["Round over", "Tapos ang round", "Hết vòng"], "Salah dengar": ["Misheard", "Maling narinig", "Nghe sai"], "Sandhi 3-3: ditulis {a}, tapi diucapkan {b}. Pilih nada tulisannya.": ["3-3 sandhi: written {a} but spoken {b}. Pick the written tones.", "Sandhi 3-3: nakasulat {a} pero binibigkas {b}. Piliin ang nakasulat na tono.", "Biến điệu 3-3: viết {a} nhưng đọc {b}. Hãy chọn thanh viết."], "Seberapa mirip?": ["How close was it?", "Gaano kalapit?", "Giống đến mức nào?"], "Selesai": ["Finish", "Tapos", "Xong"], "Sembunyikan pinyin": ["Hide pinyin", "Itago ang pinyin", "Ẩn pinyin"], "Tampilkan pinyin": ["Show pinyin", "Ipakita ang pinyin", "Hiện pinyin"], "Sering salah dengar": ["Often misheard", "Madalas maling marinig", "Hay nghe sai"], "Skor terbaik": ["Best score", "Pinakamataas na iskor", "Điểm cao nhất"], "Suara Mandarin belum tersedia di perangkat ini. Pasang suara \"Chinese (Taiwan)\" di pengaturan teks-ke-ucapan agar game bisa didengar.": ["No Mandarin voice on this device yet. Install a \"Chinese (Taiwan)\" voice in text-to-speech settings to hear the games.", "Wala pang boses na Mandarin sa device na ito. Mag-install ng \"Chinese (Taiwan)\" sa text-to-speech settings.", "Thiết bị chưa có giọng tiếng Trung. Cài giọng \"Chinese (Taiwan)\" trong cài đặt chuyển văn bản thành giọng nói."], "Suara belum tersedia — baca pinyin di bawah": ["No voice available — read the pinyin below", "Walang boses — basahin ang pinyin sa ibaba", "Chưa có giọng — đọc pinyin bên dưới"], "Suaraku": ["My voice", "Boses ko", "Giọng tôi"], "Sumber latihan": ["Practice source", "Pinagkunan ng pagsasanay", "Nguồn luyện tập"], "Tekan lalu ucapkan": ["Press, then speak", "Pindutin, saka magsalita", "Bấm rồi nói"], "Coba lagi?": ["Try again?", "Subukan muli?", "Thử lại?"], "Telinga & lidah": ["Ear & tongue", "Tainga at dila", "Tai & lưỡi"], "Terdengar": ["Heard", "Narinig", "Nghe được"], "Tidak ada yang salah dengar. Telingamu tajam!": ["Nothing misheard. Sharp ears!", "Walang maling narinig. Matalas ang tainga mo!", "Không nghe sai từ nào. Tai thính quá!"], "Tips": ["Tips", "Mga tip", "Mẹo"], "Tutup": ["Close", "Isara", "Đóng"], "Ucapkan keras-keras sambil mendengar model, lalu nilai sendiri.": ["Say it out loud along with the model, then rate yourself.", "Sabihin nang malakas kasabay ng modelo, saka i-rate ang sarili.", "Nói to theo mẫu rồi tự chấm."], "Ulang": ["Reset", "Ulitin", "Làm lại"], "Yang diucapkan": ["What was said", "Ang binigkas", "Từ được đọc"], "akurasi": ["accuracy", "katumpakan", "độ chính xác"], "benar": ["correct", "tama", "đúng"], "bunyi beda": ["wrong sound", "ibang tunog", "sai âm"], "combo maks": ["max combo", "max combo", "combo cao nhất"], "ditambah kata A2 dasar": ["plus basic A2 words", "dagdag na batayang A2", "thêm từ A2 cơ bản"], "frasa": ["phrase", "parirala", "cụm từ"], "kalimat": ["sentences", "pangungusap", "câu"], "kalimat dari dialog & contoh": ["sentences from dialogs & examples", "pangungusap mula sa dialogo at halimbawa", "câu từ hội thoại & ví dụ"], "kalimat dibuat dari pola sesuai levelmu": ["sentences built from patterns at your level", "pangungusap mula sa pattern ayon sa level mo", "câu tạo từ mẫu theo cấp của bạn"], "kata": ["words", "salita", "từ"], "kata salah dengar": ["misheard words", "maling narinig", "từ nghe sai"], "mis. ni3hao3 / nǐ hǎo": ["e.g. ni3hao3 / nǐ hǎo", "hal. ni3hao3 / nǐ hǎo", "vd. ni3hao3 / nǐ hǎo"], "nada beda": ["wrong tone", "ibang tono", "sai thanh"], "poin": ["pts", "puntos", "điểm"], "potongan": ["pieces", "piraso", "mảnh"], "ronde dimainkan": ["rounds played", "round na nalaro", "vòng đã chơi"], "skor": ["score", "iskor", "điểm"], "soal": ["items", "tanong", "câu"], "spasi": ["space", "space", "dấu cách"], "suku kata": ["syllables", "pantig", "âm tiết"], "tepat": ["exact", "eksakto", "chính xác"], "total rekor": ["total records", "kabuuang rekord", "tổng kỷ lục"], "{w} sering salah dengar — statusnya kembali ke Belajar supaya lebih sering diulang.": ["{w} is often misheard — set back to Learning so it comes up more.", "Madalas maling marinig ang {w} — ibinalik sa Pag-aaral para mas madalas ulitin.", "{w} hay bị nghe sai — chuyển về Đang học để ôn thường hơn."], "一 berubah: yí sebelum nada 4, yì sebelum nada 1/2/3. Pilih nada kamusnya.": ["一 changes: yí before tone 4, yì before tones 1/2/3. Pick the dictionary tone.", "Nagbabago ang 一: yí bago tono 4, yì bago tono 1/2/3. Piliin ang tono sa diksiyonaryo.", "一 biến điệu: yí trước thanh 4, yì trước thanh 1/2/3. Chọn thanh theo từ điển."], "不 berubah jadi bú sebelum nada 4. Pilih nada kamusnya.": ["不 becomes bú before tone 4. Pick the dictionary tone.", "Nagiging bú ang 不 bago tono 4. Piliin ang tono sa diksiyonaryo.", "不 thành bú trước thanh 4. Chọn thanh theo từ điển."], "Tombol pelan": ["Slow button", "Mabagal na button", "Nút chậm"], "Tiap soal punya tombol 0.6× — dengar per suku kata dengan tenang.": ["Every item has a 0.6× button — hear each syllable calmly.", "May 0.6× button ang bawat tanong — pakinggan nang mahinahon.", "Mỗi câu có nút 0.6× — nghe từng âm tiết thong thả."], "Combo": ["Combo", "Combo", "Combo"], "Jawaban benar beruntun melipatgandakan poin. Level naik otomatis kalau kamu lancar.": ["Correct streaks multiply points. The level rises automatically when you are fluent.", "Dumadami ang puntos sa sunod-sunod na tama. Kusang tataas ang level kapag mahusay ka.", "Trả lời đúng liên tiếp nhân điểm. Cấp tự tăng khi bạn trôi chảy."], "Butuh izin mikrofon. Kalau browser tidak bisa mengenali suara, kamu bisa rekam & bandingkan sendiri.": ["Needs mic permission. If the browser can't recognize speech, record & compare yourself.", "Kailangan ng pahintulot sa mic. Kung hindi makilala ng browser ang boses, mag-record at ihambing.", "Cần quyền micro. Nếu trình duyệt không nhận dạng được giọng, hãy tự ghi âm & so sánh."], "Telingamu tajam!": ["Sharp ears!", "Matalas ang tainga mo!", "Tai thính quá!"], "Pas sekali!": ["Spot on!", "Tamang-tama!", "Chuẩn luôn!"], "好棒！ Mantap!": ["好棒！ Awesome!", "好棒！ Galing!", "好棒！ Tuyệt!"], "對了！ Benar!": ["對了！ Right!", "對了！ Tama!", "對了！ Đúng!"], "沒關係～ Dengar lagi ya": ["沒關係～ Listen again", "沒關係～ Pakinggan muli", "沒關係～ Nghe lại nhé"], "Hampir! Coba bandingkan bunyinya": ["Almost! Compare the sounds", "Muntik na! Ihambing ang tunog", "Gần đúng! So sánh âm nhé"], "Pelan-pelan saja, pasti bisa": ["Take it slow, you can do it", "Dahan-dahan lang, kaya mo", "Từ từ thôi, bạn làm được"]};
  for (const k in T) { if (!I18N[k]) I18N[k] = [T[k][0], T[k][1]]; if (typeof I18N_VI !== 'undefined' && !I18N_VI[k]) I18N_VI[k] = T[k][2]; } })();
/* generated by /tmp/claude-0/tema/build.py — do not edit */