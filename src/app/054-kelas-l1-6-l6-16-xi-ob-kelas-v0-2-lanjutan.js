/* =====================================================================
   SOAL KHUSUS KELAS (lmcq = pilihan ganda umum · lread = kartu baca)
   ===================================================================== */
function mk(o) { return Object.assign({ lx: 1, type: 'lmcq' }, o); }
function optsWith(correct, pool, n = 3, key = x => x) {
  const out = [correct]; for (const x of shuffle(pool)) { if (out.length > n) break; if (!out.some(o => key(o) === key(x))) out.push(x); }
  const sh = shuffle(out); return { opts: sh, a: sh.indexOf(correct) };
}
/* isian grammar dari PDF */
function mcqFill(q, opt) {
  const nb = (q.match(/_{2,}|＿+/g) || []).length; const parts = String(opt).split(/[\/／]|…+|\.{3,}/).map(x => x.trim()).filter(Boolean);
  if (nb > 1 && parts.length === nb) { let j = 0; return q.replace(/_{2,}|＿+/g, () => parts[j++]); }
  return q.replace(/_{2,}|＿+/, opt).replace(/_{2,}|＿+/g, '');
}
function mcqItem(n, m) {
  const full = mcqFill(m.q, m.opts[m.a]); const nb = (m.q.match(/_{2,}|＿+/g) || []).length;
  const o = m.opts.map((x, k) => ({ t: nb > 1 ? String(x).replace(/…+|\.{3,}/g, ' … ').replace(/\s+/g, ' ').trim() : x, hz: 1, ok: k === m.a })); const sh = shuffle(o);
  return mk({ kind: 'gram', n, label: nb > 1 ? 'Isi kedua bagian yang kosong' : 'Isi yang kosong', ic: 'puzzle', q: esc(m.q).replace(/_{2,}|＿+/g, '<span class="blank">▢</span>'), qhz: 1, tr: m.tr, opts: sh, a: sh.findIndex(x => x.ok), say: full, fb: `<span class="hz kl-fbz">${esc(full)}</span><small>${esc(kx(m.tr))}</small>${m.why ? `<small>💡 ${esc(kx(m.why))}</small>` : ''}` });
}
/* tanya → jawab */
function klCtx(n) {
  const L = KL(n); if (typeof kbCtx === 'function' && L.book) return kbCtx(n);
  return [{ h: t('Dialog') }].concat(L.dialog);
}
function pairItem(n, p, all) {
  const others = [...new Set(all.filter(x => x.a !== p.a && x.q !== p.q).map(x => x.a))];
  const { opts, a } = optsWith(p.a, others);
  return mk({ kind: 'dlg', n, label: 'Pilih jawaban yang cocok', ic: 'chat', ctx: klCtx(n), q: esc(p.q), qhz: 1, qpy: p.qpy, opts: opts.map(x => ({ t: x, hz: 1 })), a, one: 1, say: p.q, fb: `<span class="hz kl-fbz">${esc(p.q)} — ${esc(p.a)}</span><small>${esc(kx(p.tr))}</small>` });
}
/* benar / salah dari bacaan */
function tfItem(n, pas, it) {
  const T = [{ t: t('Benar') + ' · 對', ok: it.a }, { t: t('Salah') + ' · 錯', ok: !it.a }];
  const ctx = !pas && KL(n).book ? klCtx(n) : null;
  return mk({ kind: 'tf', n, label: 'Benar atau salah?', ic: 'book', pas, ctx, q: esc(it.zh), qhz: 1, opts: T, a: T.findIndex(x => x.ok), say: it.zh, fb: `<span class="hz kl-fbz">${esc(it.zh)}</span><small>${esc(kx(it))} → <b>${it.a ? t('Benar') : t('Salah')}</b></small>` });
}
/* baris dialog berikutnya */
function dlgNextItem(n, i) {
  const d = KL(n).dialog; const cur0 = d[i]; const nx = d[i + 1]; if (!nx) return null;
  const pool = KLS.flatMap(L => L.dialog).filter(x => x.zh !== nx.zh && x.sp !== cur0.sp).map(x => x.zh);
  const { opts, a } = optsWith(nx.zh, pool);
  return mk({ kind: 'dlg', n, label: 'Lanjutkan percakapannya', ic: 'chat', q: `<span class="kl-sp">${esc(cur0.sp)}</span> ${esc(cur0.zh)}`, qhz: 1, qpy: cur0.py, sub: `${esc(nx.sp)}: …?`, opts: opts.map(x => ({ t: x, hz: 1 })), a, one: 1, say: nx.zh, fb: `<span class="hz kl-fbz">${esc(nx.sp)}: ${esc(nx.zh)}</span><small>${esc(kx(nx))}</small>` });
}
/* susun kalimat → pakai mesin 'build' yang sudah ada */
function reorderItem(n, r) {
  const ch = r.chunks.map(x => ({ hz: x, py: '' })); if (r.end) ch[ch.length - 1] = { hz: ch[ch.length - 1].hz + r.end, py: '' };
  return { type: 'build', sent: { chunks: ch, zh: ch.map(c => c.hz).join(''), py: r.py, tr: kT(r) }, kn: n };
}
/* kata: pakai tipe soal bawaan (arti, hanzi, dengar, nada, ketik, tulis, kartu ingat) */
function wItem(i, type) { const w = W[i]; if (!w) return null; let tp = type; if (tp === 'tone' && !toneQuizOK(w)) tp = 'mc_hanzi'; if (tp === 'listen' && !voiceOK()) tp = 'mc_hanzi'; if (tp === 'type' && !aligned(w)) tp = 'mc_mean'; return { type: tp, wid: i }; }

/* ---------- latihan tambahan hasil analisis materi ---------- */
const ZD = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const PYD = ['líng', 'yī', 'èr', 'sān', 'sì', 'wǔ', 'liù', 'qī', 'bā', 'jiǔ'];
function numZh(n) {
  if (n < 10) return ZD[n];
  if (n < 20) return '十' + (n % 10 ? ZD[n % 10] : '');
  if (n < 100) return ZD[Math.floor(n / 10)] + '十' + (n % 10 ? ZD[n % 10] : '');
  const u = [[10000, '萬'], [1000, '千'], [100, '百']]; let s = ''; let rest = n; let zero = false;
  for (const [v, c] of u) { const d = Math.floor(rest / v); if (d) { if (zero) s += '零'; s += (d === 2 && v >= 100 ? '兩' : numZh(d)) + c; zero = false; } else if (s) zero = true; rest %= v; }
  if (rest) { if (zero || rest < 10) s += '零'; s += rest < 20 && rest >= 10 ? '一' + numZh(rest) : numZh(rest); }
  return s;
}
const hourZh = h => (h === 2 ? '兩' : numZh(h));
function periodOf(h) { return h < 5 ? ['凌晨', 'líng chén'] : h < 11 ? ['早上', 'zǎo shang'] : h < 13 ? ['中午', 'zhōng wǔ'] : h < 18 ? ['下午', 'xià wǔ'] : ['晚上', 'wǎn shàng']; }
function timeZh(h, m) { const h12 = h % 12 || 12; return periodOf(h)[0] + hourZh(h12) + '點' + (m === 0 ? '' : m === 30 ? '半' : numZh(m) + '分'); }
function clockSVG(h, m) {
  const a1 = ((h % 12) + m / 60) * 30 - 90; const a2 = m * 6 - 90; const r = d => d * Math.PI / 180;
  const ticks = Array.from({ length: 12 }, (_, k) => { const a = r(k * 30); return `<line x1="${50 + Math.cos(a) * 38}" y1="${50 + Math.sin(a) * 38}" x2="${50 + Math.cos(a) * 43}" y2="${50 + Math.sin(a) * 43}"/>`; }).join('');
  return `<svg class="kl-clock" viewBox="0 0 100 100" width="120" height="120"><circle cx="50" cy="50" r="46" class="ck-f"/><g class="ck-t">${ticks}</g>
    <line x1="50" y1="50" x2="${50 + Math.cos(r(a1)) * 24}" y2="${50 + Math.sin(r(a1)) * 24}" class="ck-h"/><line x1="50" y1="50" x2="${50 + Math.cos(r(a2)) * 35}" y2="${50 + Math.sin(r(a2)) * 35}" class="ck-m"/><circle cx="50" cy="50" r="3" class="ck-c"/></svg>`;
}
function timeItem() {
  const h = Math.floor(Math.random() * 24); const m = pick([0, 0, 30, 30, 15, 45, 10, 20, 5, 25, 50, 18, 27]);
  const right = timeZh(h, m); const wrong = new Set();
  const cand = () => { const k = Math.random(); if (k < .34) return timeZh((h + pick([1, 2, 11, 12])) % 24, m); if (k < .67) return timeZh(h, pick([0, 30, 15, 45, 10, 20].filter(x => x !== m))); return timeZh((h + 12) % 24, m); };
  for (let g = 0; g < 30 && wrong.size < 3; g++) { const c = cand(); if (c !== right) wrong.add(c); }
  const hh = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  const { opts, a } = optsWith(right, [...wrong]);
  return mk({ kind: 'drill', label: 'Jam berapa? · 現在幾點？', ic: 'clock', vis: `<div class="kl-vis">${clockSVG(h, m)}<b class="kl-dig">${hh}</b></div>`, q: '', opts: opts.map(x => ({ t: x, hz: 1 })), a, one: 1, say: '現在' + right, fb: `<span class="hz kl-fbz">${hh} = ${esc(right)}</span><small>${t('凌晨 dini hari · 早上 pagi · 中午 siang · 下午 sore · 晚上 malam — ucapkan periode dulu, lalu jam.')}</small>` });
}
function dateItem() {
  const mo = 1 + Math.floor(Math.random() * 12); const d = 1 + Math.floor(Math.random() * 28); const wd = Math.floor(Math.random() * 7);
  const WD = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const right = numZh(mo) + '月' + numZh(d) + '號' + WD[wd]; const wrong = new Set();
  for (let g = 0; g < 30 && wrong.size < 3; g++) { const m2 = Math.random() < .5 ? mo : 1 + Math.floor(Math.random() * 12); const d2 = Math.random() < .5 ? d : 1 + Math.floor(Math.random() * 28); const w2 = Math.random() < .5 ? wd : Math.floor(Math.random() * 7); const c = numZh(m2) + '月' + numZh(d2) + '號' + WD[w2]; if (c !== right) wrong.add(c); }
  const loc = new Date(2025, mo - 1, d).toLocaleDateString(LOCALE[S.settings.ui] || 'id-ID', { day: 'numeric', month: 'long' });
  const dn = new Date(2023, 0, 1 + wd).toLocaleDateString(LOCALE[S.settings.ui] || 'id-ID', { weekday: 'long' });
  const { opts, a } = optsWith(right, [...wrong]);
  return mk({ kind: 'drill', label: 'Tanggal & hari', ic: 'calendar', vis: `<div class="kl-vis"><div class="kl-cal"><small>${esc(dn)}</small><b>${d}</b><span>${esc(loc)}</span></div></div>`, q: '', opts: opts.map(x => ({ t: x, hz: 1 })), a, one: 1, say: right, fb: `<span class="hz kl-fbz">${esc(right)}</span><small>${t('Urutan Mandarin: bulan → tanggal → hari (月 → 號/日 → 星期).')}</small>` });
}
const MWS = [['本', ['書']], ['張', ['紙', '桌子', '床', '椅子']], ['枝', ['筆']], ['支', ['手機']], ['隻', ['狗', '雞']], ['個', ['人', '學生', '孩子', '蛋糕', '房間', '同學']], ['杯', ['水', '果汁', '咖啡', '奶茶']], ['碗', ['飯', '拉麵']], ['盤', ['炒飯', '炒麵']], ['塊', ['餅乾', '巧克力']], ['間', ['房間', '教室']]];
function mwItem() {
  const [m, ns] = pick(MWS); const nn = pick(ns.filter(x => !(m === '個' && x === '房間'))); const num = pick([1, 2, 3, 5]);
  const numS = num === 2 ? '兩' : numZh(num); const others = MWS.map(x => x[0]).filter(x => x !== m && !(MWS.find(y => y[0] === x)[1].includes(nn)));
  const { opts, a } = optsWith(m, others);
  return mk({ kind: 'drill', label: 'Kata ukur yang tepat', ic: 'blocks', q: `${numS}<span class="blank">▢</span>${esc(nn)}`, qhz: 1, opts: opts.map(x => ({ t: x, hz: 1 })), a, say: numS + m + nn, fb: `<span class="hz kl-fbz">${numS}${m}${esc(nn)}</span><small>${t('本 buku · 張 benda pipih (kertas, meja, ranjang) · 枝 pena · 支 ponsel · 隻 hewan · 杯 gelas · 碗 mangkuk · 盤 piring · 個 umum')}</small>` });
}
const POSW = { 上面: 'shàng miàn', 下面: 'xià miàn', 旁邊: 'páng biān', 前面: 'qián miàn', 後面: 'hòu miàn', 裡面: 'lǐ miàn', 外面: 'wài miàn' };
function posSVG(p) {
  const room = p === '裡面' || p === '外面';
  if (room) {
    const ball = p === '裡面' ? '<circle cx="50" cy="60" r="8" class="ps-b"/>' : '<circle cx="88" cy="70" r="8" class="ps-b"/>';
    return `<svg viewBox="0 0 110 90" width="190" height="156" class="kl-pos"><path d="M14 40 50 14l36 26v42H14z" class="ps-r"/><rect x="40" y="56" width="18" height="26" class="ps-d"/>${ball}</svg>`;
  }
  const B = { 上面: '<circle cx="55" cy="33" r="8" class="ps-b"/>', 下面: '<circle cx="55" cy="72" r="8" class="ps-b"/>', 旁邊: '<circle cx="97" cy="72" r="8" class="ps-b"/>', 前面: '<circle cx="55" cy="58" r="10" class="ps-b front"/>', 後面: '<circle cx="62" cy="30" r="7" class="ps-b back"/>' }[p];
  const back = p === '後面'; const front = p === '前面';
  return `<svg viewBox="0 0 110 90" width="190" height="156" class="kl-pos">${back ? B : ''}<rect x="18" y="41" width="74" height="8" rx="2" class="ps-t"/><rect x="24" y="49" width="6" height="32" class="ps-l"/><rect x="80" y="49" width="6" height="32" class="ps-l"/>${back || front ? '' : B}${front ? B : ''}</svg>`;
}
function posItem() {
  const p = pick(Object.keys(POSW)); const room = p === '裡面' || p === '外面'; const obj = room ? '房間' : '桌子';
  const { opts, a } = optsWith(p, Object.keys(POSW));
  const sent = `球在${obj}${p}。`;
  return mk({ kind: 'drill', label: 'Bolanya di mana? · 球在哪裡？', ic: 'target', vis: `<div class="kl-vis">${posSVG(p)}</div>`, q: `球在${obj}<span class="blank">▢</span>。`, qhz: 1, opts: opts.map(x => ({ t: x, hz: 1, sub: POSW[x] })), a, say: sent, fb: `<span class="hz kl-fbz">${sent}</span><small>${t('Pola: benda + 在 + tempat + 上面/下面/旁邊/前面/後面/裡面/外面.')}</small>` });
}
function priceItem() {
  const v = pick([15, 35, 50, 85, 120, 150, 250, 380, 1500, 2300, 5000, 12000, 50000, 105]);
  const right = numZh(v) + '元'; const wrong = new Set();
  for (let g = 0; g < 40 && wrong.size < 3; g++) { const c = numZh(pick([v * 10, Math.round(v / 10) || 1, v + pick([1, 10, 100]), v * 2, v + 1000])) + '元'; if (c !== right) wrong.add(c); }
  const { opts, a } = optsWith(right, [...wrong]);
  return mk({ kind: 'drill', label: 'Berapa harganya? · 多少錢？', ic: 'grid', vis: `<div class="kl-vis"><div class="kl-price">NT$ ${v.toLocaleString('en-US')}</div></div>`, q: '', opts: opts.map(x => ({ t: x, hz: 1 })), a, one: 1, say: '這個' + right, fb: `<span class="hz kl-fbz">NT$${v} = ${esc(right)}</span><small>${t('百 ratus · 千 ribu · 萬 sepuluh ribu. Angka 0 di tengah dibaca 零.')}</small>` });
}
const DRILLS = { time: timeItem, date: dateItem, mw: mwItem, pos: posItem, price: priceItem };

/* ---------- kartu baca (grammar / dialog) di dalam sesi ---------- */
function gramCard(n, g, inSes) {
  return `<div class="kl-gram"><div class="kl-gform hz">${esc(g.form)}</div><h3>${esc(kx(g.t))}</h3><p>${esc(kx(g.note))}</p>
    <div class="kl-exs">${g.ex.map(e => `<div class="kl-ex"><div class="grow" style="min-width:0">${klLine(e.zh, e.py)}<div class="small">${esc(kx(e))}</div></div><button class="speak mini" ${inSes ? 'data-s="saysent"' : 'data-cx="say"'} data-v="${esc(e.zh)}">${ICON('speaker')}</button></div>`).join('')}</div></div>`;
}
const SP_COL = {};
function spCls(sp) { if (SP_COL[sp] === undefined) SP_COL[sp] = Object.keys(SP_COL).length % 4; return 'sp' + SP_COL[sp]; }
function dlgHTML(n, o = {}) {
  const d = KL(n).dialog;
  return `<div class="kl-dlg">${d.map((x, k) => `<div class="dl ${spCls(x.sp)} ${o.role && o.role === x.sp ? 'me' : ''}" data-k="${k}"><span class="dl-sp">${esc(x.sp)}</span>
    <div class="dl-b"><div class="dl-l">${klLine(x.zh, x.py, { mode: o.mode })}</div><div class="dl-tr">${esc(kx(x))}</div>${o.role === x.sp ? `<button class="dl-rev" data-cx="reveal">${t('Giliranmu! Ucapkan, lalu ketuk')}</button>` : ''}</div>
    <button class="speak mini" ${o.inSes ? 'data-s="saysent"' : 'data-cx="say"'} data-v="${esc(x.zh)}">${ICON('speaker')}</button></div>`).join('')}</div>`;
}
function renderLRead(it) {
  progressBar(); SES.answered = true; SES.shown = Date.now(); SES.m = null;
  const L = KL(it.n); let body = '';
  if (it.kind === 'gram') body = `<div class="q-kind">${ICON('grammar')} ${t('Pola kalimat')} · ${lnShort(it.n)}</div>${gramCard(it.n, L.grammar[it.gi], true)}`;
  else if (it.kind === 'dlg') body = `<div class="q-kind">${ICON('chat')} ${t('Dialog')} · ${lnShort(it.n)}</div><h3 class="hz" style="margin:6px 0">${esc(L.title.zh)}</h3>${dlgHTML(it.n, { inSes: 1 })}`;
  else if (it.kind === 'pas') body = `<div class="q-kind">${ICON('book')} ${t('Bacaan')} · ${lnShort(it.n)}</div><div class="kl-pas">${klLine(it.pas.zh, it.pas.py)}<div class="small" style="margin-top:6px">${esc(kx(it.pas))}</div></div><button class="btn sec small" data-s="saysent" data-v="${esc(it.pas.zh)}">${ICON('speaker')} ${t('Dengar bacaan')}</button>`;
  $('#sbody').innerHTML = `<div class="s-card glass kl-read">${body}</div>`;
  $('#sfoot').innerHTML = `<div class="inner"><button class="btn pri big wide" data-s="next">${t('Paham, lanjut')}</button></div>`;
  $('#sbody').scrollTop = 0; FX.play('flip');
}
function renderLMcq(it) {
  progressBar(); SES.answered = false; SES.shown = Date.now(); SES.m = null; SES.correct = it.a;
  const ctxH = it.ctx && it.ctx.length ? `<details class="kl-pasq kl-ctx" open><summary>${ICON('chat')} ${t('Konteks: dialog & bacaan buku')}</summary><div class="kl-ctxb">${it.ctx.map(x => x.h ? `<div class="kl-ctxh hz">${esc(x.h)}</div>` : `<div class="kl-ctxl"><span class="hz">${x.sp ? `<b>${esc(x.sp)}：</b>` : ''}${esc(x.zh)}</span><small>${esc(kx(x))}</small></div>`).join('')}</div></details>` : '';
  const pas = it.pas ? `<details class="kl-pasq" ${it.pasOpen === false ? '' : 'open'}><summary>${ICON('book')} ${t('Bacaan')}</summary>${klLine(it.pas.zh, it.pas.py)}<div class="small">${esc(kx(it.pas))}</div><button class="btn ghost small" data-s="saysent" data-v="${esc(it.pas.zh)}">${ICON('speaker')}</button></details>` : '';
  $('#sbody').innerHTML = `<div class="s-card glass kl-q"><div class="q-kind">${ICON(it.ic || 'target')} ${t(it.label)}${it.n ? ` <span class="kl-ln">${lnShort(it.n)}</span>` : ''}</div>
    ${ctxH}${pas}${it.vis || ''}
    ${it.q ? `<div class="kl-qz ${it.qhz ? 'hz' : ''}">${it.q}</div>` : ''}${it.qpy ? `<div class="kl-qpy">${esc(it.qpy)}</div>` : ''}${it.sub ? `<div class="small muted" style="text-align:center">${it.sub}</div>` : ''}
    ${it.tr ? (it.kind === 'gram' ? `<button class="q-mean kl-trq" type="button" onclick="this.classList.add('show')"><span class="kl-trh">${ICON('eye')} ${t('Lihat arti kalimat')}</span><span class="kl-trt">${esc(kx(it.tr))}</span></button>` : `<div class="q-mean">${esc(kx(it.tr))}</div>`) : ''}
    <div class="opts ${it.one ? 'one' : ''}">${it.opts.map((o, k) => `<button class="opt" data-s="opt" data-v="${k}"><kbd>${k + 1}</kbd><span class="${o.hz ? 'hz' : ''}" style="font-size:${o.hz ? (o.t.length > 8 ? 18 : 22) : 15}px">${esc(o.t)}</span>${o.sub ? `<span class="small muted" style="margin-left:10px">${esc(o.sub)}</span>` : ''}</button>`).join('')}</div></div>`;
  $('#sbody').scrollTop = 0;
}
const _renderItemK = _renderItem;
_renderItem = function () { const it = cur(); if (it && it.lx) { if (it.type === 'lread') return renderLRead(it); return renderLMcq(it); } return _renderItemK(); };
function lxAnswer(ok) {
  if (!SES || SES.answered) return; SES.answered = true;
  const it = cur(); const day = dayRec(); const ms = Date.now() - SES.shown;
  if (ok) { SES.ok++; day.ok++; SES.combo++; SES.maxCombo = Math.max(SES.maxCombo, SES.combo); day.combo = Math.max(day.combo || 0, SES.combo); }
  else { SES.bad++; day.bad++; SES.combo = 0; if (!it.again && SES.opts.retry !== false) SES.items.splice(Math.min(SES.i + 3, SES.items.length), 0, Object.assign({}, it, { again: 1 })); }
  if (it.kind === 'gram' || it.kind === 'dlg' || it.kind === 'tf') day.sent = (day.sent || 0) + 1;
  if (it.kind === 'drill') day.hz = (day.hz || 0) + (ok ? 1 : 0);
  const gain = ok ? 10 + (SES.combo >= 5 ? 5 : 0) : 2; SES.xp += gain; addXP(gain); if (ok) xpPop('+' + gain + ' XP' + (SES.combo >= 3 ? '  x' + SES.combo : ''));
  FX.play(ok ? 'ok' : 'bad', SES.combo); progressBar();
  const b = document.querySelectorAll('#sbody [data-s="opt"]'); b.forEach(o => { if (+o.dataset.v === it.a) o.classList.add('ok'); else o.classList.add('dim'); });
  const bl = $('#sbody .blank'); if (bl && it.opts[it.a]) { bl.textContent = it.opts[it.a].t; bl.classList.add(ok ? 'fill-ok' : 'fill-bad'); }
  $('#sfoot').innerHTML = `<div class="inner cxin"><div class="fb ${ok ? 'ok' : 'bad'}">${mascot(ok ? (SES.combo >= 5 ? 'wow' : 'joy') : 'oops', 46, 'fbm')}<div style="flex:1;min-width:0"><b>${ok ? t(pick(['Benar!', 'Tepat!', 'Pintar!'])) : t('Belum tepat — ini jawabannya:')}</b>${it.fb || ''}</div>${it.say ? `<button class="btn ghost small" data-s="saysent" data-v="${esc(it.say)}">${ICON('speaker')}</button>` : ''}</div><button class="btn pri big" data-s="next">${t('Lanjut')}</button></div>`;
  if (it.say && voiceOK()) speakFor(it, it.say, 320);
  checkQuests(); save();
}
const answerK = answer;
answer = function (ok, note) { const it = SES && !SES.answered ? cur() : null; if (it && it.lx) return lxAnswer(ok); return answerK(ok, note); };
