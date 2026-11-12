/* ========== v10.7: SPEEDRUN 50 KATA · kode progres & cadangan ========== */

/* ---------------- SPEEDRUN ----------------
   Pola per 5 kata: kenalan cepat → game pasangkan → cek kilat.
   Tiap 10 kata: CHECKPOINT (waktu split) + sprint ingat ulang 10 kata itu.
   Akhir: ujian campur 15 kata dari seluruh babak.                                */
const fmtClock = ms => { const s = Math.max(0, Math.round(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
function speedState() { S.speed = S.speed && typeof S.speed === 'object' ? S.speed : {}; const z = S.speed; z.best = z.best && typeof z.best === 'object' ? z.best : {}; z.splits = z.splits && typeof z.splits === 'object' ? z.splits : {}; z.runs = +z.runs || 0; return z; }
function speedIds(n, mode) {
  if (mode === 'rev') {
    const ids = Object.keys(S.cards).map(Number).filter(i => W[i] && W[i].m);
    return ids.sort((a, b) => recallProb(a) - recallProb(b)).slice(0, n);
  }
  return nextNew(n).filter(i => W[i].m);
}
function buildSpeed(n = 50, mode = 'new') {
  const ids = speedIds(n, mode); if (ids.length < 5) return [];
  const out = []; const chunks = []; for (let k = 0; k < ids.length; k += 5) chunks.push(ids.slice(k, k + 5));
  const nCp = Math.ceil(chunks.length / 2); let cp = 0;
  chunks.forEach((ch, c) => {
    if (mode === 'new') ch.forEach(i => out.push({ type: 'intro', wid: i, isNew: true, spd: 1 }));
    else ch.forEach(i => out.push({ type: 'recall', wid: i, dir: 'hz' }));
    if (ch.length >= 3) out.push({ type: 'match', ids: ch.slice() });
    shuffle(ch).forEach((i, j) => out.push({ type: safeType(i, j % 2 ? (voiceOK() ? 'listen' : 'mc_mean') : 'mc_hanzi'), wid: i, isNew: mode === 'new', second: true }));
    if (c % 2 === 1 || c === chunks.length - 1) {
      cp++; const ten = [].concat(...chunks.slice(c % 2 === 1 ? c - 1 : c, c + 1));
      out.push({ type: 'checkpoint', n: cp, total: nCp, words: ten, mode, size: ids.length });
      shuffle(ten).forEach(i => out.push({ type: 'mc_mean', wid: i, isNew: mode === 'new', second: true }));
    }
  });
  out.push({ type: 'checkpoint', n: 'final', total: nCp, words: [], mode, size: ids.length });
  shuffle(ids).slice(0, 15).forEach((i, j) => out.push({ type: safeType(i, ['mc_hanzi', 'listen', 'mc_mean'][j % 3]), wid: i, isNew: mode === 'new', second: true }));
  return out;
}
function startSpeed(n, mode) {
  const items = buildSpeed(n, mode);
  if (!items.length) return toast(mode === 'new' ? t('Kata baru A2 sudah habis — coba Speedrun ulangan!') : t('Belum cukup kata untuk speedrun ulangan.'));
  const size = items.find(x => x.type === 'checkpoint').size;
  startSession(items, { title: t('Speedrun'), speed: { n: size, mode, key: mode + size }, rebuild: () => buildSpeed(n, mode) });
  if (!SES) return;
  const ses = SES; ses.spd = { t0: Date.now(), last: Date.now(), splits: [] };
  const top = $('.s-top'); if (top) {
    top.insertAdjacentHTML('beforeend', `<div class="sclock" id="sclock">⏱ 0:00</div>`);
    const bar = top.querySelector('.bar'); if (bar) { bar.classList.add('flags'); ses.items.forEach((it, k) => { if (it.type === 'checkpoint') bar.insertAdjacentHTML('beforeend', `<b class="flag" style="left:${k / ses.items.length * 100}%">${it.n === 'final' ? '🏁' : '⚑'}</b>`); }); }
  }
  ses.clock = setInterval(() => {
    if (SES !== ses || ses.summarized) { clearInterval(ses.clock); return; }
    const el = $('#sclock'); if (el) el.innerHTML = `⏱ ${fmtClock(Date.now() - ses.spd.t0)} · <b>${ses.opts.speed.mode === 'new' ? ses.newN : new Set(ses.items.slice(0, ses.i).map(x => x.wid).filter(x => x !== undefined)).size}</b>/${ses.opts.speed.n}`;
  }, 500);
  FX.play('level');
}
function renderCheckpoint(it) {
  SES.answered = true; const sp = SES.spd || { t0: SES.t0, last: SES.t0, splits: [] }; const now = Date.now();
  const split = now - sp.last; sp.last = now; sp.splits.push(split);
  const z = speedState(); const pb = (z.splits[SES.opts.speed && SES.opts.speed.key] || [])[sp.splits.length - 1];
  const delta = pb ? split - pb : null; const fin = it.n === 'final';
  const n = SES.ok + SES.bad; const acc = n ? Math.round(SES.ok / n * 100) : 100;
  $('#sbody').innerHTML = `<div class="s-card glass cp"><div class="cp-flag">${fin ? '🏁' : '⚑'}</div>
    <div class="cp-t">${fin ? t('UJIAN AKHIR') : `CHECKPOINT ${it.n}/${it.total}`}</div>
    <div class="cp-time">${fmtClock(now - sp.t0)}</div>
    <div class="cp-row"><span>${t('split')} <b>${fmtClock(split)}</b></span>${delta !== null ? `<span class="${delta <= 0 ? 'good' : 'slow'}">${delta <= 0 ? '▲' : '▼'} ${fmtClock(Math.abs(delta))} ${t('vs rekor')}</span>` : ''}<span>${t('akurasi')} <b>${acc}%</b></span></div>
    ${fin ? `<p class="muted">${t('15 soal campur dari semua kata tadi. Jawab tanpa ragu — ini momen mengunci hafalan!')}</p>`
      : `<p class="muted">${t('Sprint ingat: 10 kata barusan, sekarang dari arti ke hanzi.')}</p><div class="cp-words">${it.words.map(i => `<span><b class="hz">${esc(W[i].w.replace(/[()]/g, ''))}</b><small>${esc(meanP(W[i]))}</small></span>`).join('')}</div>`}</div>`;
  $('#sfoot').innerHTML = `<div class="inner"><button class="btn pri big wide cpgo" data-s="next">${fin ? t('Gas ujian akhir!') : t('Lanjut sprint')} ▶<i class="autobar"></i></button></div>`;
  FX.play(fin ? 'level' : 'quest');
  const cur0 = it; setTimeout(() => { if (SES && cur() === cur0) { SES.lastNext = 0; nextItem(); } }, 3200);
}
function speedSummary() {
  const sp = SES.spd; if (!sp || !SES.opts.speed) return '';
  const z = speedState(); const key = SES.opts.speed.key; const total = Date.now() - sp.t0;
  const n = SES.ok + SES.bad; const acc = n ? SES.ok / n : 1; const words = SES.opts.speed.n;
  const prev = z.best[key]; const complete = SES.i >= SES.items.length - 1;
  const isPB = complete && acc >= 0.7 && (!prev || total < prev.ms);
  z.runs++; if (isPB) { z.best[key] = { ms: total, acc: Math.round(acc * 100), d: todayKey() }; z.splits[key] = sp.splits.slice(); }
  save();
  const wpm = (words / Math.max(1, total / 60000)).toFixed(1);
  return `<div class="spd-sum"><div class="ss-t">⚡ ${t('Speedrun {n} kata', { n: words })}</div>
    <div class="kpis"><div class="kpi"><b>${fmtClock(total)}</b><span>${t('waktu total')}</span></div><div class="kpi"><b>${wpm}</b><span>${t('kata / menit')}</span></div><div class="kpi"><b>${prev ? fmtClock(prev.ms) : '—'}</b><span>${t('rekor sebelumnya')}</span></div></div>
    ${isPB ? `<div class="nbspd">★ ${t('REKOR BARU!')} ★</div>` : acc < 0.7 ? `<div class="small muted">${t('Rekor dihitung kalau akurasi ≥ 70%.')}</div>` : ''}
    <div class="splits">${sp.splits.map((s, k) => `<span>⚑${k + 1} ${fmtClock(s)}</span>`).join('')}</div></div>`;
}
function speedModal() {
  const z = speedState(); const left = A2_ORDER.filter(i => !S.cards[i]).length; const learned = Object.keys(S.cards).filter(i => W[i] && W[i].m).length;
  const opt = (n, mode, ic, ti, sub, dis) => { const b = z.best[mode + n]; return `<button class="spd-opt ${dis ? 'dis' : ''}" data-a="speedgo" data-n="${n}" data-m="${mode}" ${dis ? 'disabled' : ''}><span class="so-ic">${ic}</span><span class="grow"><b>${t(ti)}</b><small>${t(sub)}</small></span><span class="so-pb">${b ? `🏆 ${fmtClock(b.ms)}` : ''}</span></button>`; };
  openModal(`<div class="spd-head"><div class="spd-bolt">⚡</div><h2 style="margin:0">${t('Speedrun')}</h2><p class="muted small" style="margin:4px 0 0">${t('Kenalan + hafalan sekaligus dalam satu babak. Waktu jalan terus — kejar rekormu sendiri!')}</p></div>
    <div class="spd-opts">${opt(50, 'new', '🚀', '50 kata baru', '±20–25 menit · kenal & hafal', left < 5)}${opt(20, 'new', '⚡', '20 kata baru', '±8–10 menit · versi kilat', left < 5)}${opt(50, 'rev', '🔁', '50 ulangan kilat', 'kata yang paling rawan lupa', learned < 10)}</div>
    <div class="spd-how">${[['1', 'Kenalan 5 kata', 'kartu kata + rincian huruf & suara'], ['2', 'Game pasangkan', 'hanzi ↔ arti, 5 pasang'], ['3', 'Cek kilat', 'pilih hanzi / dengar'], ['⚑', 'Checkpoint tiap 10 kata', 'waktu split + sprint ingat ulang'], ['🏁', 'Ujian akhir', '15 soal campur dari semua kata']].map(([a, b, c]) => `<div><span>${a}</span><b>${t(b)}</b><small>${t(c)}</small></div>`).join('')}</div>
    <p class="small muted">${t('Sisa kata baru A2')}: ${left} · ${t('Speedrun ke-')}${z.runs + 1}</p>`, 'spd-sheet');
}

/* ---------------- KODE PROGRES & CADANGAN ----------------
   Progres tersimpan di browser untuk alamat situs ini saja. Kalau alamat Netlify berganti
   (misalnya deploy sebagai situs baru), progres tidak ikut — pakai kode ini untuk memindahkannya. */
function b64(u8) { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); }
function unb64(str) { const s = atob(str); const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
async function progressCode() {
  const json = JSON.stringify(S); const bytes = new TextEncoder().encode(json);
  if (typeof CompressionStream === 'function') {
    try { const cs = new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip')); const buf = new Uint8Array(await new Response(cs).arrayBuffer()); return 'XB1:' + b64(buf); } catch (e) {}
  }
  return 'XB0:' + b64(bytes);
}
async function readCode(code) {
  code = String(code || '').trim().replace(/\s+/g, '');
  if (code.startsWith('{')) return JSON.parse(code);
  const [tag, body] = [code.slice(0, 4), code.slice(4)];
  if (tag === 'XB0:') return JSON.parse(new TextDecoder().decode(unb64(body)));
  if (tag === 'XB1:') { const ds = new Blob([unb64(body)]).stream().pipeThrough(new DecompressionStream('gzip')); return JSON.parse(await new Response(ds).text()); }
  throw new Error('bad code');
}
async function applyCode(code) {
  try {
    const d = await readCode(code); if (!d || !d.cards || !d.settings) throw 0;
    const n = Object.keys(d.cards).length;
    if (Object.keys(S.cards).length && !confirm(t('Timpa progres di perangkat ini dengan cadangan?'))) return;
    SAVE_LOCK = true; clearTimeout(saveT); localStorage.setItem(KEY, JSON.stringify(d)); toast(t('✅ Progres dipulihkan: {n} kata', { n })); setTimeout(() => location.reload(), 700);
  } catch (e) { toast(t('⚠️ Kode progres tidak valid')); }
}
async function copyCode() {
  const code = await progressCode(); S.lastBackup = Date.now(); save();
  try { await navigator.clipboard.writeText(code); toast(t('📋 Kode progres disalin — simpan di chat/catatanmu')); }
  catch (e) { openModal(`<h3>${t('Kode progres')}</h3><p class="small muted">${t('Salin semua teks di bawah ini dan simpan di tempat aman.')}</p><textarea class="codebox" readonly>${esc(code)}</textarea>`); const tb = $('.codebox'); if (tb) { tb.focus(); tb.select(); } }
}
function pasteBox(inOnb) {
  return `<div class="pastebox"><textarea id="pcode" class="codebox" placeholder="${t('Tempel kode progres di sini (diawali XB1: atau XB0:)')}"></textarea><button class="btn pri" data-a="${inOnb ? 'onbcode' : 'pastecode'}">${ICON('upload')} ${t('Pulihkan')}</button></div>`;
}
function backupCard() {
  const last = S.lastBackup ? Math.floor((Date.now() - S.lastBackup) / DAY) : null;
  return `<section class="card glass bkcard"><h2>💾 ${t('Pindahkan & amankan progres')}</h2>
    <p class="small muted" style="margin:-4px 0 10px">${t('Progres tersimpan di browser untuk alamat situs ini. Kalau alamat app berganti atau pindah HP, bawa progresmu dengan kode atau file cadangan.')}</p>
    <div class="row wrap" style="gap:8px"><button class="btn pri" data-a="copycode">${ICON('download')} ${t('Salin kode progres')}</button><button class="btn sec" data-a="export">${ICON('download')} ${t('Unduh file cadangan')}</button><button class="btn sec" data-a="showpaste">${ICON('upload')} ${t('Tempel kode')}</button></div>
    <div id="pastewrap"></div>
    <p class="small muted" style="margin:10px 0 0">${last === null ? t('Belum pernah dicadangkan.') : t('Cadangan terakhir: {n} hari lalu', { n: last })} · ${Object.keys(S.cards).length} ${t('kata')} · ${fmtN(S.xp)} XP</p></section>`;
}
function backupNag() {
  if (Object.keys(S.cards).length < 30) return '';
  const last = S.lastBackup || 0; const snooze = S.backupSnooze || 0;
  if (Date.now() - last < 7 * DAY || Date.now() < snooze) return '';
  return `<section class="card glass bknag"><span class="bk-ic">💾</span><div class="grow"><b>${t('Amankan progresmu')}</b><div class="small muted">${t('{n} kata sudah kamu pelajari. Simpan kode progres supaya tidak perlu mengulang dari nol saat ganti HP atau alamat app.', { n: Object.keys(S.cards).length })}</div></div>
    <div class="row wrap" style="gap:6px"><button class="btn pri small" data-a="copycode">${t('Salin kode')}</button><button class="btn ghost small" data-a="bksnooze">${t('Nanti')}</button></div></section>`;
}

/* ---------------- sambungan ke tampilan ---------------- */
const vMeBase = vMe; vMe = function () { return backupCard() + vMeBase(); };
const vHomeBase = vHome; vHome = function () { const h = vHomeBase(); const nag = backupNag(); if (!nag) return h; const k = h.indexOf('</section>'); return k < 0 ? nag + h : h.slice(0, k + 10) + nag + h.slice(k + 10); };
const onboardingBase = onboarding;
onboarding = function () {
  onboardingBase();
  const sh = $('#onb .sheet'); if (!sh) return;
  sh.insertAdjacentHTML('beforeend', `<div class="onb-restore"><p class="small muted">${t('Sudah pernah belajar di app ini?')}</p>
    <div class="row wrap" style="justify-content:center;gap:8px"><button class="btn sec small" data-a="onbpaste">${ICON('upload')} ${t('Tempel kode progres')}</button><label class="btn sec small" style="cursor:pointer">${ICON('upload')} ${t('Pilih file cadangan')}<input type="file" accept="application/json,.json" data-in="import" hidden></label></div><div id="onbpaste"></div></div>`);
};
const exportBase = ACT.export;
Object.assign(ACT, {
  speedrun: () => speedModal(),
  speedgo: b => { closeModal(); startSpeed(+b.dataset.n, b.dataset.m); },
  copycode: () => copyCode(),
  export: b => { S.lastBackup = Date.now(); save(); exportBase(b); },
  showpaste: () => { const w = $('#pastewrap'); if (w) w.innerHTML = pasteBox(false); const p = $('#pcode'); if (p) p.focus(); },
  pastecode: () => { const p = $('#pcode'); if (p && p.value.trim()) applyCode(p.value); },
  onbpaste: () => { const w = $('#onbpaste'); if (w) w.innerHTML = pasteBox(true); const p = $('#pcode'); if (p) p.focus(); },
  onbcode: () => { const p = $('#pcode'); if (p && p.value.trim()) applyCode(p.value); },
  bksnooze: () => { S.backupSnooze = Date.now() + 3 * DAY; save(); render(); }
});
START_ACTS.add('speedgo');