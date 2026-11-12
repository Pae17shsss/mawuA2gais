/* ========== v8: Lensa hanzi · Huruf kembar · Rute harian ========== */

/* ---------- MODAL HURUF (versi lensa) ---------- */
function openChar(c) {
  const d = CH[c] || ['', '']; const own = S.stories[c] || '';
  const ws = (CHAR_WORDS[c] || []).slice(0, 8); const py = charPy(c); const tn = charTone(c);
  openModal(`<div class="q-kind">🀄 ${t('Hanzi')}${CHAR_LV[c] !== undefined ? ' · ' + t('muncul pertama di {lv}', { lv: LEVELS[CHAR_LV[c]].en }) : ''}</div>
    <div class="row" style="gap:18px;align-items:center;margin:10px 0 6px;flex-wrap:wrap;justify-content:center">
      ${glowBox(c, 170, 'hw')}
      <div class="grow" style="min-width:190px">
        <div class="row" style="gap:10px;align-items:baseline;flex-wrap:wrap"><b class="t${tn}" style="font-size:26px">${esc(py)}</b>${py ? contourSVG([tn], 24) : ''}</div>
        <b style="font-size:20px;display:block;margin-top:2px">${esc(charMean(c) || '—')}</b>
        <div class="row wrap" style="margin-top:10px;gap:8px"><button class="btn sec small" data-a="sayc" data-v="${c}">${ICON('speaker')} ${t('dengar')}</button><button class="btn pri small" data-a="writechar" data-v="${c}">${ICON('write')} ${t('Latih menulis')}</button></div>
        <div class="small muted" style="margin-top:8px">${t('Goresan diputar berulang. Bagian yang menyala oranye = kunci makna.')}</div></div></div>
    ${lensBlock(c)}
    ${charStory(c, null, true) ? `<div class="gtip">${ICON('lightbulb')}<span><b>${t('Cerita bentuk')}:</b> ${esc(charStory(c, null, true))}</span></div>` : ''}
    <h3 style="margin-top:16px">${t('Ceritamu sendiri')}</h3>
    <textarea id="story" rows="3" style="width:100%;border-radius:16px;border:1px solid var(--gline);background:rgba(255,255,255,.4);padding:12px;resize:vertical" placeholder="${t('Bentuk ini mengingatkanmu pada apa?')}">${esc(own)}</textarea>
    <div class="row" style="margin-top:8px"><button class="btn pri small" data-a="savestory" data-v="${c}">${t('Simpan cerita')}</button>${own ? `<button class="btn ghost small" data-a="delstory" data-v="${c}">${t('Hapus')}</button>` : ''}</div>
    ${ws.length ? `<h3 style="margin-top:18px">${t('Muncul di kata')}</h3><div class="wlist">${ws.map(wordRow).join('')}</div>` : ''}`);
  HW = null;
  mountLoop(c, 'hw', 170);
}
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* kartu lensa di Hanzi Lab: satu huruf hari ini, berulang terus */
function lensToday() {
  const c = VS8.lens || todayChar(); if (!c || !CH[c]) return '';
  return `<section class="card glass lens-card"><div class="row wrap" style="gap:16px;align-items:center">
      ${glowBox(c, 132, 'hwl')}
      <div class="grow" style="min-width:220px"><div class="gpill">${ICON('sparkle')} ${t('Lensa bagian')}</div>
        <h2 style="margin:8px 0 2px"><span class="hz">${c}</span> <span class="t${charTone(c)}">${esc(charPy(c))}</span> · ${esc(charMean(c))}</h2>
        <p class="small muted" style="margin:0">${t('Setiap huruf = beberapa potongan. Satu potongan (kunci makna) memberi tahu kategorinya, potongan lain sering memberi bunyinya.')}</p></div></div>
    ${partLens(c)}
    ${(lensHow(c)[0] || '') ? `<div class="gtip">${ICON('lightbulb')}<span>${lensHow(c)[0]}</span></div>` : ''}
    <div class="row wrap" style="margin-top:10px;gap:8px"><button class="btn pri small" data-a="char" data-v="${c}">${ICON('search')} ${t('Buka lensa')}</button><button class="btn sec small" data-a="lensnext">${ICON('refresh')} ${t('Huruf lain')}</button><button class="btn sec small" data-a="partquiz">${ICON('target')} ${t('Tebak dari bagian')}</button></div></section>`;
}

/* ---------- HURUF KEMBAR ---------- */
const VS8 = { tab: 'tone', q: '', lim: 16, lens: null };
function twQuery() { return VS8.q.trim().toLowerCase().replace(/[1-5]/g, ''); }
function twMatch(cs, key) {
  const q = twQuery(); if (!q) return true;
  if (HAN_RE.test(q)) return cs.some(c => q.includes(c));
  const b = stripTone(q).replace(/v/g, 'ü'); return (key || '').startsWith(b);
}
const seenScore = cs => cs.filter(charSeen).length * 10 + cs.length;
function rungs(cs) {
  const by = {}; cs.forEach(c => { const tn = charTone(c); (by[tn] = by[tn] || []).push(c); });
  Object.values(by).forEach(a => a.sort((x, y) => charSeen(y) - charSeen(x)));
  return [1, 2, 3, 4, 5].filter(tn => by[tn]).map(tn => `<div class="rung t${tn}"><button class="rung-h" data-a="sayc" data-v="${by[tn][0]}" aria-label="${t('dengar')}">${contourSVG([tn], 20)}<b>${esc(charPy(by[tn][0]))}</b>${ICON('speaker')}</button>
    ${by[tn].slice(0, 4).map(c => `<button class="rung-c ${charSeen(c) ? '' : 'dim'}" data-a="char" data-v="${c}"><span class="hz">${c}</span><small>${esc(charMean(c))}</small></button>`).join('')}</div>`).join('');
}
function exWord(c) { const i = (CHAR_WORDS[c] || []).find(i => W[i].w.length >= 2 && W[i].m) ?? (CHAR_WORDS[c] || [])[0]; return i === undefined ? '' : `<button class="exw" data-a="word" data-v="${i}"><span class="hz">${esc(W[i].w)}</span> ${esc(meanP(W[i]))}</button>`; }
function vTwins() {
  const f = fam8(); const tab = VS8.tab;
  let list = []; let body = '';
  if (tab === 'tone') {
    list = f.toneGroups.filter(g => twMatch(g.cs, g.b)).sort((a, b) => seenScore(b.cs) - seenScore(a.cs));
    body = list.slice(0, VS8.lim).map(g => `<div class="tw-card"><div class="tw-h"><b class="tw-syl">${esc(g.b)}</b><span class="small muted">${t('{n} huruf', { n: g.cs.length })}</span></div><div class="ladder">${rungs(g.cs)}</div></div>`).join('');
  } else if (tab === 'homo') {
    list = f.homoGroups.filter(g => twMatch(g.cs, g.b)).sort((a, b) => seenScore(b.cs) - seenScore(a.cs));
    body = list.slice(0, VS8.lim).map(g => `<div class="tw-card"><div class="tw-h"><button class="tw-syl t${toneOfSyl(g.py)}" data-a="sayc" data-v="${g.cs[0]}">${esc(g.py)} ${ICON('speaker')}</button><span class="small muted">${t('bunyi sama persis')}</span></div>
      <div class="homo">${g.cs.slice(0, 8).map(c => `<div class="homo-r ${charSeen(c) ? '' : 'dim'}"><button class="hz homo-c" data-a="char" data-v="${c}">${c}</button><div class="grow" style="min-width:0"><b>${esc(charMean(c))}</b>${exWord(c)}</div></div>`).join('')}</div></div>`).join('');
  } else {
    const keyF = Object.entries(f.key).filter(([, cs]) => cs.length >= 3).map(([p, cs]) => ({ p, cs, k: 'key' }));
    const sndF = Object.entries(f.snd).filter(([, cs]) => cs.length >= 2).map(([p, cs]) => ({ p, cs, k: 'snd' }));
    list = sndF.concat(keyF).filter(g => twMatch(g.cs.concat(g.p), charBase(g.p) || stripTone((COMP[g.p] || [''])[0]))).sort((a, b) => (a.k === b.k ? seenScore(b.cs) - seenScore(a.cs) : a.k === 'snd' ? -1 : 1));
    body = list.slice(0, VS8.lim).map(g => {
      const pm = COMP[g.p] ? (meanLang() === 'id' ? COMP[g.p][1] : isVI() ? vx(COMP[g.p][2]) : COMP[g.p][2]) : charMean(g.p); const ppy = COMP[g.p] ? COMP[g.p][0] : charPy(g.p);
      const pb = stripTone(ppy || '');
      return `<div class="tw-card fam ${g.k}"><div class="tw-h"><span class="hz fam-g ${g.k === 'key' ? 'glowk' : 'glows'}">${g.p}</span><div class="grow"><b>${esc(pm)}</b> <span class="small muted">${esc(ppy || '')}</span><div class="small muted">${g.k === 'key' ? t('kunci makna — semua huruf ini maknanya berhubungan') : t('petunjuk bunyi — huruf-huruf ini dibaca mirip')}</div></div></div>
        <div class="famrow">${g.cs.slice(0, 10).map(c => `<button class="fam-c ${charSeen(c) ? '' : 'dim'}" data-a="char" data-v="${c}"><span class="hz">${c}</span><b class="t${charTone(c)} ${g.k === 'snd' && charBase(c) === pb ? 'same' : ''}">${esc(charPy(c))}</b><small>${esc(charMean(c))}</small></button>`).join('')}</div></div>`;
    }).join('');
  }
  const tabs = [['tone', 'Beda nada'], ['homo', 'Bunyi sama'], ['part', 'Sama bagian']];
  const intro = { tone: 'Satu suku kata, empat nada, empat arti. Dengarkan tangganya dari nada 1 sampai 4.', homo: 'Bunyinya sama persis — yang membedakan hanya bentuk huruf dan kata pasangannya.', part: 'Huruf dengan potongan yang sama: kunci makna yang sama = arti sekelompok; petunjuk bunyi yang sama = bacaan mirip.' }[tab];
  return `<section class="card glass"><div class="row" style="gap:14px;align-items:center">${TILE('twins', 'lg tint c5')}<div class="grow"><h1 style="margin:0">${t('Huruf kembar')}</h1><p class="muted small" style="margin:4px 0 0">${t('Huruf yang bunyinya mirip tapi artinya beda karena nada, dan huruf yang “satu tipe” karena berbagi potongan.')}</p></div></div>
    <div class="row wrap" style="margin-top:12px;gap:8px"><button class="btn pri" data-a="tonepair">${ICON('tone')} ${t('Latihan beda nada (10)')}</button><button class="btn sec" data-a="partquiz">${ICON('search')} ${t('Tebak dari bagian (10)')}</button></div>
    <div class="row wrap" style="margin-top:14px;gap:10px"><div class="seg">${tabs.map(([k, l]) => `<button class="${tab === k ? 'on' : ''}" data-a="twtab" data-v="${k}">${t(l)}</button>`).join('')}</div>
      <input class="search grow" id="tq" data-in="tq" value="${esc(VS8.q)}" placeholder="${t('cari: ma, shi, 青 …')}" autocomplete="off" autocapitalize="off" spellcheck="false" style="min-width:160px"></div>
    <p class="small muted" style="margin:10px 2px 0">${t(intro)}</p></section>
  <section class="twgrid">${body || `<div class="card glass muted">${t('Tidak ada yang cocok.')}</div>`}</section>
  ${list.length > VS8.lim ? `<div class="row" style="justify-content:center"><button class="btn sec" data-a="twmore">${t('Tampilkan lebih banyak')} (${list.length - VS8.lim})</button></div>` : ''}`;
}

/* ---------- RUTE HARIAN (urutan belajar yang jelas setiap hari) ---------- */
function routeSteps() {
  const day = dayRec(); const plan = planToday(); const nCards = Object.keys(S.cards).length; const rd = day.rd || {}; const T = routeTargets();
  // langkah 1 = ulangan kata dari hari-hari sebelumnya (kata yang baru dipelajari hari ini masih tahap belajar)
  const tk = todayKey(); const dueN = dueIds().filter(i => S.cards[i].add !== tk).length; const hasOld = Object.keys(S.cards).some(i => S.cards[i].add !== tk);
  const revDone = Math.max(day.recall || 0, day.rev || 0);
  const hzN = (day.cmb || 0) + (day.hz || 0); const earN = Math.min(day.tp || 0, Math.ceil(T.ear / 2)) + Math.min(Math.max(0, (day.tp || 0) - Math.ceil(T.ear / 2)) + (day.listen || 0), Math.floor(T.ear / 2)); const sentN = day.sent || 0;
  return [
    { k: 'rev', cat: 'hafal', ic: 'refresh', ti: 'Ulang yang hampir lupa', why: 'Ingatan lama diselamatkan dulu, sebelum menambah yang baru.',
      done: dueN === 0 || revDone >= T.rev, prog: rd.rev || dueN === 0 ? (hasOld ? t('bersih ✓') : t('belum ada ulangan')) : `${Math.min(revDone, T.rev)}/${Math.min(T.rev, revDone + dueN)}`, a: 'recall', min: T.m.rev },
    { k: 'new', cat: 'kenal', ic: 'seed', ti: 'Kata baru hari ini', why: 'Kata baru + rincian per huruf: bunyi dan arti tiap huruf.',
      done: plan.new === 0 || day.new >= plan.new, prog: plan.new === 0 ? '✓' : `${Math.min(day.new, plan.new)}/${plan.new}`, a: 'q-new', min: T.m.new },
    { k: 'hz', cat: 'latih', ic: 'hanzi', ti: 'Bedah huruf', why: 'Pecah kata hari ini jadi huruf dan bagian — gabungkan lagi jadi kata.',
      done: hzN >= T.hz, prog: `${Math.min(hzN, T.hz)}/${T.hz}`, a: 'route-hz', min: T.m.hz },
    { k: 'ear', cat: 'latih', ic: 'headphone', ti: 'Telinga & nada', why: 'Bedakan huruf yang bunyinya sama tapi nadanya beda.',
      done: earN >= T.ear, prog: `${Math.min(earN, T.ear)}/${T.ear}`, a: 'route-ear', min: T.m.ear },
    { k: 'sent', cat: 'paham', ic: 'blocks', ti: 'Pakai dalam kalimat', why: 'Kata hari ini dipakai di kalimat nyata dengan pola grammar berbeda — dibaca, didengar, disusun.',
      done: sentN >= T.sent, prog: `${Math.min(sentN, T.sent)}/${T.sent}`, a: 'ctxday', min: T.m.sent }
  ].map((s, k) => Object.assign(s, { n: k + 1, done: s.done || !!rd[s.k] }));
}
/* langkah yang sudah selesai dikunci untuk hari itu, dan diberi tahu sekali saja */
function routeSync(live) {
  const day = dayRec(); const first = !day.rd; day.rd = day.rd || {};
  const st = routeSteps(); const fresh = st.filter(s => s.done && !day.rd[s.k]);
  const revDone = Math.max(day.recall || 0, day.rev || 0);
  const lock = fresh.filter(s => !(s.k === 'rev' && !revDone));   // 'bersih' karena belum ada yang jatuh tempo: tidak dikunci & tidak diumumkan
  lock.forEach(s => { day.rd[s.k] = 1; });
  if (!lock.length || first || !live) return;
  const nx = st.find(s => !s.done);
  const last = lock[lock.length - 1];
  toast(`${ICON('check')} ${t('Langkah {n} selesai', { n: last.n })}${nx ? ' · ' + t('berikutnya: {s}', { s: t(nx.ti) }) : ' · ' + t('Rute hari ini beres! 🎉')}`, 3000, 'route');
}
function routeNudge() {
  const st = routeSteps(); const nx = st.find(s => !s.done);
  return `<div class="rnudge" aria-label="${t('Rute hari ini')}">${st.map(s => `<i class="${s.done ? 'on' : ''} ${nx && s.k === nx.k ? 'now' : ''}"></i>`).join('')}<span>${nx ? t('berikutnya: {s}', { s: t(nx.ti) }) : t('Rute hari ini beres! 🎉')}</span></div>`;
}
document.addEventListener('visibilitychange', () => document.documentElement.classList.toggle('bg', document.hidden));
function routeNext() { routeSync(false); return routeSteps().find(s => !s.done) || null; }
/* misi harian bisa dilipat supaya Beranda tetap ringkas */
function questCard(day, done) {
  const open = !!(S.ui && typeof S.ui === 'object' && S.ui.qOpen);
  const pills = day.q.map(q => { const d = questDone(q, day); return `<span class="qpill ${d ? 'ok' : ''}" title="${esc(QMETA[q.id] ? QMETA[q.id][1](q.t) : '')}">${ICON(d ? 'check' : (QUEST_ICON[q.id] || 'target'))}</span>`; }).join('');
  return `<section class="card glass qcard ${open ? 'open' : ''}">
    <button class="qhead" data-a="qtoggle" aria-expanded="${open}">${ringSVG(done / 5, done + '/5', t('MISI'))}<span class="grow" style="min-width:0;text-align:left"><span class="qh">${t('Misi harian')}</span><span class="small muted" style="display:block">${t('3 misi = api menyala · 5 misi = +100 XP')}</span>${open ? '' : `<span class="qpills">${pills}</span>`}</span><span class="qchev">${ICON('chevron')}</span></button>
    ${open ? `<div class="quests" style="margin-top:10px">${day.q.map(q => questRow(q, day)).join('')}</div>` : ''}</section>`;
}
function routeCard() {
  routeSync(false);
  const st = routeSteps(); const nx = st.findIndex(s => !s.done); const nDone = st.filter(s => s.done).length;
  const left = st.filter(s => !s.done).reduce((a, s) => a + s.min, 0);
  if (nx < 0) return `<section class="card glass route done-all"><div class="row" style="gap:12px;align-items:center">${ringSVG(1, '5/5', t('RUTE'))}<div class="grow" style="min-width:0"><h2 style="margin:0">${t('Rute hari ini beres! 🎉')}</h2><div class="small muted">${t('Latihan tambahan sekarang = bonus XP. Pilih yang kamu suka di bawah.')}</div></div></div></section>`;
  return `<section class="card glass route"><div class="row" style="gap:12px;align-items:center;margin-bottom:12px">${ringSVG(nDone / st.length, nDone + '/' + st.length, t('RUTE'))}
      <div class="grow" style="min-width:0"><h2 style="margin:0">${t('Rute hari ini')}</h2><div class="small muted">${nx < 0 ? t('Semua langkah selesai — sisanya bonus!') : t('Ikuti urutannya, satu per satu · ±{n} menit lagi', { n: left })}</div></div></div>
    <ol class="steps">${st.map((s, k) => `<li class="step ${s.done ? 'done' : k === nx ? 'now' : 'later'}">
      <button class="step-b" data-a="${s.a}"><span class="step-n">${s.done ? ICON('check') : k + 1}</span>
        <span class="grow" style="min-width:0"><b>${t(s.ti)} <small class="step-p">${s.prog}</small></b><span class="step-why">${t(s.why)}</span></span>${k === nx ? `<span class="step-go">${t('Mulai')} ${ICON('chevron')}</span>` : ''}</button></li>`).join('')}</ol></section>`;
}

/* ---------- AKSI ---------- */
Object.assign(ACT, {
  'route-hz': () => startSession(buildParts(12), { title: t('Bedah huruf'), rebuild: () => buildParts(12) }),
  'route-ear': () => startSession(buildEar(10), { title: t('Telinga & nada'), rebuild: () => buildEar(10) }),
  'route-next': () => { const s = routeNext(); if (!s) return ACT.smart(); ACT[s.a](); },
  tonepair: () => startSession(buildTonePair(10), { title: t('Beda nada'), rebuild: () => buildTonePair(10) }),
  partquiz: () => startSession(buildPartQuiz(10), { title: t('Tebak dari bagian'), rebuild: () => buildPartQuiz(10) }),
  'drill-combine': () => startSession(buildPractice(12, 'combine'), { rebuild: () => buildPractice(12, 'combine') }),
  'drill-tonepair': () => ACT.tonepair(), 'drill-part': () => ACT.partquiz(),
  twtab: b => { VS8.tab = b.dataset.v; VS8.lim = 16; render(); },
  twmore: () => { VS8.lim += 16; render(); },
  qtoggle: () => { if (!S.ui || typeof S.ui !== 'object') S.ui = {}; S.ui.qOpen = !S.ui.qOpen; save(); render(); },
  'twins-of': b => { closeModal(); VS8.tab = 'tone'; VS8.q = b.dataset.v || ''; VS8.lim = 16; go('twins'); },
  lensnext: () => { const pool = CHAR_ORDER.filter(c => charSeen(c) && charParts(c).length); const p = pool.length >= 5 ? pool : CHAR_ORDER.filter(c => charParts(c).length).slice(0, 80); VS8.lens = pick(p); render(); }
});
['route-hz', 'route-ear', 'route-next', 'tonepair', 'partquiz', 'drill-combine', 'drill-tonepair', 'drill-part'].forEach(a => START_ACTS.add(a));
let tqT = 0;
document.addEventListener('input', e => {
  if (!e.target.dataset || e.target.dataset.in !== 'tq' || e.isComposing) return;
  VS8.q = e.target.value; clearTimeout(tqT);
  tqT = setTimeout(() => { VS8.lim = 16; render(); const i = $('#tq'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 240);
});

/* afterRender: animasi masuk halaman + lensa berulang di Hanzi Lab */
function afterRender() {
  if (ROUTE === 'words') { const i = $('#wq'); if (i && VS.focus) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); VS.focus = false; } }
  if (ROUTE !== LAST_ROUTE) { const m = $('#main'); if (m) { m.classList.remove('enter'); void m.offsetWidth; m.classList.add('enter'); } LAST_ROUTE = ROUTE; }
  stopLoops(); LIVE_SIG = dueIds().length;
  if (ROUTE === 'hanzi' && $('#hwl')) { const c = VS8.lens || todayChar(); if (c) mountLoop(c, 'hwl', 132); }
}

/* angka jatuh tempo bergerak sendiri seiring waktu — Beranda & Ingatan diperbarui diam-diam bila berubah */
let LIVE_SIG = null;
setInterval(() => {
  if (typeof S === 'undefined' || !S || SES || document.hidden || $('.overlay') || !['home', 'memory'].includes(ROUTE)) return;
  const ae = document.activeElement; if (ae && /INPUT|TEXTAREA/.test(ae.tagName)) return;
  if (LIVE_SIG !== null && dueIds().length !== LIVE_SIG) render();
}, 30000);