/* ========== V1.5 b1path.js — Jalur A2 → B1: kurikulum bertahap ==========
   Tahap A2-1…A2-6 (konsolidasi) lalu B1-1…B1-12, plus B1+ dari pola sisa. Tiap tahap: 1–2 pola grammar (aspek & pelengkap
   sebelum penghubung), 1 skenario percakapan, ±20 kata (sehari-hari + kampus + pabrik sesuai level), tugas bicara, dan
   checkpoint campuran. Tidak ada yang dikunci: tahap berikutnya hanya "disarankan setelah" tahap sebelumnya. */
const B1_PLAN = [
  ['a2-1', 'A2', ['b1_zhengzai', 'b1_yijing']], ['a2-2', 'A2', ['b1_kuaiyao', 'b1_dongliang']], ['a2-3', 'A2', ['b1_dei', 'b1_yidian']],
  ['a2-4', 'A2', ['b1_haoxiang', 'b1_xian']], ['a2-5', 'A2', ['yinwei', 'suiran']], ['a2-6', 'A2', ['ba', 'yuelai']],
  ['b1-1', 'B1', ['b1_le12', 'b1_guole']], ['b1-2', 'B1', ['b1_dur', 'b1_gang']], ['b1-3', 'B1', ['b1_zhe', 'b1_jiucai']],
  ['b1-4', 'B1', ['b1_rc', 'b1_zaiyou']], ['b1-5', 'B1', ['b1_dc', 'b1_dcfig']], ['b1-6', 'B1', ['b1_pc', 'b1_deobj']],
  ['b1-7', 'B1', ['b1_huineng', 'b1_shide']], ['b1-8', 'B1', ['b1_yijiu', 'b1x_ruguo']], ['b1-9', 'B1', ['b1x_budan', 'b1x_chule']],
  ['b1-10', 'B1', ['b1x_zhiyao', 'b1x_zhiyou']], ['b1-11', 'B1', ['b1x_bi_degree', 'b1x_yiyang']], ['b1-12', 'B1', ['b1x_weile', 'b1x_suggest']]
];
const B1_BANDS = [['A2', 3, 'Konsolidasi A2'], ['B1', 4, 'Inti B1'], ['B1+', 5, 'B1+ · lebih luwes']];
const B1_PASS = 80;
let B1_ST = null;
function b1Stages() {
  if (B1_ST) return B1_ST;
  const has = k => !!gOf(k);
  const plan = B1_PLAN.map(([id, band, g]) => ({ id, band, gram: g.filter(has) })).filter(s => s.gram.length);
  const used = new Set(plan.flatMap(s => s.gram));
  const rest = GRAMMAR.filter(g => g.b1 && !used.has(g.k)).sort((a, b) => a.lv - b.lv);
  for (let k = 0; k < rest.length; k += 2) plan.push({ id: 'p' + (k / 2 + 1), band: 'B1+', gram: rest.slice(k, k + 2).map(g => g.k) });
  const cnt = {}; plan.forEach(s => { cnt[s.band] = (cnt[s.band] || 0) + 1; s.code = s.band + '-' + cnt[s.band]; s.lv = (B1_BANDS.find(b => b[0] === s.band) || B1_BANDS[1])[1]; });
  /* dialog: level band, ranah bergiliran sehari-hari → kampus → pabrik */
  const cu = new Set(); const doms = ['daily', 'campus', 'fab'];
  const conv = typeof CONV !== 'undefined' ? CONV : [];
  plan.forEach((s, j) => {
    const want = doms[j % 3]; const pool = conv.filter(d => !cu.has(d.id));
    const score = d => (d.lv === s.lv ? 0 : Math.abs(d.lv - s.lv) * 10) + (d.dom === want ? 0 : 3) - (d.grammar || []).filter(k => s.gram.includes(k)).length;
    const d = pool.sort((a, b) => score(a) - score(b) || conv.indexOf(a) - conv.indexOf(b))[0];
    if (d) { s.conv = d.id; cu.add(d.id); } else s.conv = null;
  });
  /* kosakata: kata yang muncul di dialog + irisan per ranah pada level tahap */
  const usedW = new Set();
  const pools = {};
  const poolOf = (dom, L) => { const key = dom + L; if (pools[key]) return pools[key];
    let ids = W.filter(w => w.m && !w.kls && !w.semi && (dom ? w.dom === dom : !w.dom) && (L <= 3 ? (w.l === 3 || (dom && w.l === 2)) : w.l === L)).map(w => w.i);
    return (pools[key] = ids); };
  const takeFrom = (ids, n, out) => { for (const i of ids) { if (out.length >= n) break; if (!usedW.has(i)) { usedW.add(i); out.push(i); } } };
  const forms = {}; W.forEach(w => { if (!w.m || w.kls || w.semi || w.l < 2 || w.l > 5) return; const f = String(w.w).replace(/[()]/g, ''); if (f.length >= 2 && isHan(f[0]) && forms[f] === undefined) forms[f] = w.i; });
  const fkeys = Object.keys(forms).sort((a, b) => b.length - a.length);
  plan.forEach(s => {
    const out = []; const d = s.conv && b1Conv(s.conv);
    if (d) { const txt = d.lines.map(x => x.zh).join('|') + '|' + (d.phrases || []).map(p => p.zh).join('|');
      const hits = fkeys.filter(f => txt.includes(f)).map(f => forms[f]).filter(i => W[i].l >= Math.min(3, s.lv - 1) && W[i].l <= s.lv).sort((a, b) => W[b].l - W[a].l);
      takeFrom(hits, 8, out); }
    const L = s.lv; const quota = [['daily', 5], ['ee', 4], ['semi', 4]];
    quota.forEach(([dom, n]) => takeFrom(poolOf(dom, L), out.length + n, out));
    if (L >= 4) takeFrom(poolOf('', L), 20, out);
    takeFrom(poolOf('daily', L).concat(poolOf('ee', L), poolOf('semi', L)), 20, out);
    s.words = out;
  });
  return (B1_ST = plan);
}
const b1Stage = id => b1Stages().find(s => s.id === id) || null;
const b1S = () => { const b = S.b1 && typeof S.b1 === 'object' ? S.b1 : (S.b1 = {}); b.cp = b.cp || {}; b.sp = b.sp || {}; return b; };
function b1StageSteps(s) {
  const b = b1S(); const gd = s.gram.filter(k => b1GramSt(k) === 2).length;
  const kn = s.words.filter(i => S.cards[i]).length;
  return [
    { k: 'gram', ic: 'grammar', l: 'Pola', done: gd === s.gram.length, part: s.gram.length ? gd / s.gram.length : 1, txt: gd + '/' + s.gram.length },
    { k: 'conv', ic: 'chat', l: 'Percakapan', done: !!(s.conv && cvDone(s.conv)), part: s.conv ? (cvDone(s.conv) ? 1 : (S.conv && S.conv[s.conv] && S.conv[s.conv].v ? 0.4 : 0)) : 1 },
    { k: 'vocab', ic: 'seed', l: 'Kosakata', done: s.words.length ? kn / s.words.length >= 0.8 : true, part: s.words.length ? Math.min(1, kn / (s.words.length * 0.8)) : 1, txt: kn + '/' + s.words.length },
    { k: 'speak', ic: 'mic', l: 'Bicara', done: !!b.sp[s.id], part: b.sp[s.id] ? 1 : 0 },
    { k: 'test', ic: 'award', l: 'Checkpoint', done: (b.cp[s.id] || 0) >= B1_PASS, part: (b.cp[s.id] || 0) >= B1_PASS ? 1 : 0, txt: b.cp[s.id] !== undefined ? b.cp[s.id] + '%' : '' }
  ];
}
const b1StageDone = s => (b1S().cp[s.id] || 0) >= B1_PASS;
const b1StagePct = s => Math.round(b1StageSteps(s).reduce((a, x) => a + x.part, 0) / 5 * 100);
function b1Rec() { return b1Stages().find(s => !b1StageDone(s)) || null; }
function b1StageTitle(s) { return s.gram.map(k => G_SHORT[k] || (gOf(k) || {}).form || k).join(' · '); }

/* ---------- tampilan ---------- */
function b1PathTabs(tab) {
  return `<div class="seg b1-seg b1-ptabs" role="tablist">${[['words', 'layers', 'Kosakata TOCFL'], ['b1', 'path', 'A2 → B1 bertahap']].map(([k, ic, l]) => `<button role="tab" aria-selected="${tab === k}" class="${tab === k ? 'on' : ''}" data-a="b1tab" data-v="${k}">${ICON(ic)} ${t(l)}</button>`).join('')}</div>`;
}
function b1StageRow(s, rec) {
  const pct = b1StagePct(s); const done = b1StageDone(s); const cur = rec && rec.id === s.id; const d = s.conv && b1Conv(s.conv);
  const st = b1StageSteps(s); const prev = b1Stages()[b1Stages().indexOf(s) - 1];
  const later = !done && !cur && rec && b1Stages().indexOf(s) > b1Stages().indexOf(rec);
  return `<button class="b1-row ${done ? 'done' : ''} ${cur ? 'cur' : ''} ${later ? 'later' : ''}" data-a="b1open" data-v="${s.id}">
    <span class="b1-code"><b>${esc(s.code)}</b>${done ? ICON('check') : cur ? ICON('play') : ''}</span>
    <span class="b1-rb"><b class="hz">${esc(b1StageTitle(s))}</b><span class="small muted">${s.gram.map(k => esc(gName(k))).join(' · ')}</span>
      ${d ? `<span class="b1-rd">${b1TagChip(d.dom)}<span class="hz">${esc(d.title.zh)}</span> <span class="muted">${esc(b1TrId(d.title))}</span></span>` : ''}
      <span class="b1-rm"><span class="b1-dots">${st.map(x => `<i class="${x.done ? 'on' : x.part > 0 ? 'half' : ''}" title="${esc(t(x.l))}"></i>`).join('')}</span><span class="small muted">${s.words.length} ${t('kata')}</span>${later && prev ? `<span class="small muted b1-after">${t('Disarankan setelah {c}', { c: prev.code })}</span>` : ''}</span></span>
    <span class="b1-pct">${pct}%</span></button>`;
}
function vB1Track() {
  const all = b1Stages(); const rec = b1Rec(); const b = b1S();
  const band = b.band && B1_BANDS.some(x => x[0] === b.band) ? b.band : (rec ? rec.band : 'A2');
  const doneN = all.filter(b1StageDone).length;
  const list = all.filter(s => s.band === band);
  const bandsH = B1_BANDS.filter(([k]) => all.some(s => s.band === k)).map(([k, lv]) => { const ss = all.filter(s => s.band === k); return `<button class="${band === k ? 'on' : ''}" data-a="b1band" data-v="${k}">${k} <small>${ss.filter(b1StageDone).length}/${ss.length}</small></button>`; }).join('');
  const recH = rec ? `<div class="b1-rec"><div class="grow" style="min-width:0"><span class="q-kind">${ICON('flag')} ${t('Tahap yang disarankan')}</span><h2 class="hz">${esc(rec.code)} · ${esc(b1StageTitle(rec))}</h2>
      <span class="small muted">${rec.gram.map(k => esc(gName(k))).join(' · ')}</span><div class="bar" style="margin-top:8px"><i style="width:${b1StagePct(rec)}%"></i></div></div>
      <button class="btn pri" data-a="b1open" data-v="${rec.id}">${ICON('play')} ${b1StagePct(rec) ? t('Lanjutkan') : t('Mulai')}</button></div>`
    : `<div class="b1-rec"><div class="grow"><h2>${t('Semua tahap lulus!')}</h2><span class="small muted">${t('Ulangi checkpoint kapan saja untuk menjaga ingatan.')}</span></div></div>`;
  const bd = B1_BANDS.find(x => x[0] === band);
  return `<section class="card glass b1-thero">
      <div class="row" style="gap:14px;align-items:center">${TILE('path', 'lg tint c2')}<div class="grow" style="min-width:0"><h2 style="margin:0">${t('Dari A2 ke B1, satu tahap demi satu tahap')}</h2>
        <p class="small muted" style="margin:4px 0 0">${t('Tiap tahap: pola grammar → percakapan → kosakata sehari-hari, kampus & pabrik → tugas bicara → checkpoint. Tidak ada yang dikunci — ikuti saja tahap yang disarankan.')}</p></div></div>
      <div class="b1-tstat"><div><b>${doneN}/${all.length}</b><span>${t('tahap lulus')}</span></div><div><b>${all.reduce((a, s) => a + s.words.filter(i => S.cards[i]).length, 0)}</b><span>${t('kata jalur dikenal')}</span></div><div><b>${GRAMMAR.filter(g => g.b1 && b1GramSt(g.k) === 2).length}</b><span>${t('pola B1 paham')}</span></div></div>
      ${recH}</section>
    <section class="card glass b1-list"><div class="row wrap" style="gap:10px;align-items:center"><div class="seg b1-seg">${bandsH}</div><span class="grow"></span>${lvBadge(bd ? bd[1] : 4, 'sm')}<span class="small muted">${t(bd ? bd[2] : '')}</span></div>
      <div class="b1-rows">${list.map(s => b1StageRow(s, rec)).join('')}</div></section>`;
}
function vB1Stage(s) {
  const all = b1Stages(); const at = all.indexOf(s); const prev = all[at - 1], next = all[at + 1];
  const st = b1StageSteps(s); const b = b1S(); const d = s.conv && b1Conv(s.conv);
  const rk = 'b1:' + s.id; const sc = b.cp[s.id];
  const step = (n, x, body) => `<section class="card glass b1-step ${x.done ? 'done' : ''}"><div class="b1-sh"><span class="b1-sn">${x.done ? ICON('check') : n}</span><h2 class="grow">${ICON(x.ic)} ${t(x.l)}</h2>${x.txt ? `<span class="chip">${esc(x.txt)}</span>` : ''}</div>${body}</section>`;
  const gramH = s.gram.map(k => { const g = gOf(k); const gs = b1GramSt(k); return `<div class="b1-gi ${gs === 2 ? 'ok' : ''}"><div class="grow" style="min-width:0"><b>${esc(gramTxt(g.name))}</b><div class="hz small muted">${esc(g.form)}</div></div>
    <div class="row" style="gap:6px;flex-wrap:wrap;justify-content:flex-end"><button class="btn sec small" data-a="gotog" data-v="${esc(k)}">${ICON('book')} ${t('Pelajari')}</button><button class="btn ${gs === 2 ? 'ghost' : 'pri'} small" data-a="gdrill" data-v="${esc(k)}">${ICON('target')} ${t('Latih')}${gQ()[k] !== undefined ? ` · ${gQ()[k]}%` : ''}</button></div></div>`; }).join('');
  const convH = d ? `<div class="b1-dc"><div class="grow" style="min-width:0">${b1TagChip(d.dom)} <b class="hz">${esc(d.title.zh)}</b> · ${esc(b1TrId(d.title))}<p class="small muted" style="margin:4px 0 0">${esc(b1TrId(d.goal))}</p></div>
      <div class="row" style="gap:6px;flex-wrap:wrap;justify-content:flex-end"><button class="btn pri small" data-a="cvopen" data-v="${d.id}">${ICON('chat')} ${t('Buka percakapan')}</button><button class="btn sec small" data-a="cvquiz" data-v="${d.id}">${ICON('target')} ${t('Kuis')}</button></div></div>` : `<p class="muted small">${t('Belum ada percakapan untuk tahap ini.')}</p>`;
  const vocH = `<div class="b1-wl">${s.words.map(i => { const w = W[i]; const c = S.cards[i]; return `<button class="b1-w ${c ? 'kn' : ''}" data-a="word" data-v="${i}"><span class="hz">${esc(w.w)}</span><small>${esc(meanP(w))}</small>${w.dom ? `<i class="b1-wd ${B1_TAG_OF_W[w.dom]}"></i>` : ''}</button>`; }).join('')}</div>
    <div class="row wrap b1-wact" style="margin-top:10px">${b1SrcBtns('st:' + s.id)}</div>`;
  const task = d && d.task && (d.task.id || d.task.en) ? b1TrId(d.task) : t('Ceritakan sesuatu tentang harimu memakai pola tahap ini.');
  const spH = `<p style="margin:0 0 6px">${esc(task)}</p><p class="small muted" style="margin:0 0 10px">${t('Pakai minimal satu kali')}: ${s.gram.map(k => `<b class="hz">${esc(G_SHORT[k] || k)}</b>`).join(' · ')}</p>
    <div class="row wrap" style="gap:8px">${mtRecOK() ? b1RecBtn(rk) : ''}<button class="btn ${b.sp[s.id] ? 'sec' : 'pri'} small" data-a="b1sp" data-v="${s.id}">${ICON('check')} ${b.sp[s.id] ? t('Sudah dilakukan') : t('Sudah kulakukan')}</button></div>`;
  const testH = `<p class="small muted" style="margin:0 0 10px">${t('Campuran: arti kata, dengar kata, isian pola, dengar kalimat dialog, susun kalimat. Lulus ≥ {p}% → tahap berikutnya disorot.', { p: B1_PASS })}${sc !== undefined ? ` · ${t('Skor terbaik')}: <b>${sc}%</b>` : ''}</p>
    <button class="btn pri" data-a="b1test" data-v="${s.id}">${ICON('award')} ${t('Mulai checkpoint')}</button>`;
  return `<section class="card glass b1-shero"><div class="row" style="gap:8px;align-items:center;flex-wrap:wrap"><button class="btn ghost small" data-a="b1home">‹ ${t('Jalur A2 → B1')}</button><span class="grow"></span>${lvBadge(s.lv, 'sm')}</div>
      <div class="b1-stt"><span class="b1-code big"><b>${esc(s.code)}</b></span><div class="grow" style="min-width:0"><h1 class="hz" style="margin:0">${esc(b1StageTitle(s))}</h1><span class="muted small">${s.gram.map(k => esc(gName(k))).join(' · ')}</span></div></div>
      <div class="b1-prog"><div class="bar"><i style="width:${b1StagePct(s)}%"></i></div><span class="small muted">${b1StagePct(s)}%</span></div>
      <div class="cv-steps">${st.map((x, k) => `<span class="cv-st ${x.done ? 'on' : ''}">${ICON(x.done ? 'check' : x.ic)} ${k + 1}. ${t(x.l)}</span>`).join('')}</div></section>
    ${step(1, st[0], gramH)}${step(2, st[1], convH)}${step(3, st[2], vocH)}${step(4, st[3], spH)}${step(5, st[4], testH)}
    <div class="row b1-gnav">${prev ? `<button class="btn sec small" data-a="b1open" data-v="${prev.id}">‹ ${esc(prev.code)}</button>` : ''}<span class="grow"></span>${next ? `<button class="btn sec small" data-a="b1open" data-v="${next.id}">${esc(next.code)} ›</button>` : ''}</div>`;
}
const b1VPathBase = vPath;
vPath = function () {
  const b = b1S(); const tab = b.tab === 'b1' ? 'b1' : 'words';
  if (tab === 'words') {
    const h = b1VPathBase(); const k = h.indexOf('</h1>'); if (k < 0) return h;
    return h.slice(0, k + 5) + b1PathTabs(tab) + h.slice(k + 5);
  }
  const s = b.open && b1Stage(b.open);
  const head = `<section class="card glass b1-phead"><h1>${t('Jalur belajar')}</h1>${b1PathTabs(tab)}</section>`;
  return (s ? '' : head) + (s ? vB1Stage(s) : vB1Track());
};

/* ---------- checkpoint ---------- */
function b1TestItems(s) {
  const items = []; const ws = shuffle(s.words.filter(i => W[i].m));
  ws.slice(0, 4).forEach(i => items.push({ type: 'mc_mean', wid: i, place: true }));
  ws.slice(4, 6).forEach(i => items.push({ type: voiceOK() ? 'listen' : 'mc_hanzi', wid: i, place: true }));
  s.gram.forEach(k => { const g = gOf(k); if (!g) return; const gi = b1GramItems(g, { build: 0 }).filter(x => x.lx); shuffle(gi).slice(0, s.gram.length > 1 ? 2 : 3).forEach(x => items.push(x)); });
  const d = s.conv && b1Conv(s.conv);
  if (d) {
    const L = d.lines.filter(x => x.id || x.en); const trOf = x => b1TrId(x);
    shuffle(L.slice()).slice(0, 2).forEach(x => { const o = shuffle([x, ...shuffle(L.filter(y => y !== x && trOf(y) !== trOf(x))).slice(0, 2)]);
      items.push(b1Mcq({ label: 'Dengar, lalu pilih artinya', ic: 'headphone', q: `<button class="speak huge" data-s="saysent" data-v="${esc(x.zh)}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button>`, b1say: x.zh, opts: o.map(y => ({ t: trOf(y) })), a: o.indexOf(x), say: x.zh, fb: `<div class="hz">${esc(x.zh)}</div>` })); });
    let nb = 0; for (const x of shuffle(L.slice())) { if (nb >= 2) break; const it = b1BuildItem(x.zh, x.py, { id: x.id, en: x.en }); if (it) { items.push(it); nb++; } }
  }
  return shuffle(items);
}
function b1StartTest(id) {
  const s = b1Stage(id); if (!s) return;
  const mk = () => b1TestItems(s);
  startSession(mk(), { title: t('Checkpoint') + ' ' + s.code, retry: false, noCover: true, rebuild: mk, xbDone: acc => {
    const b = b1S(); const was = b1StageDone(s); b.cp[s.id] = Math.max(b.cp[s.id] || 0, acc); if (acc >= B1_PASS && !was) addXP(30); save();
    const nx = b1Rec();
    return `<div class="notice b1-sumn">${acc >= B1_PASS ? `${ICON('award')} ${was ? t('Checkpoint {c} tetap lulus — skor {n}%.', { c: s.code, n: acc }) : t('Tahap {c} lulus dengan {n}%! +30 XP', { c: s.code, n: acc })}${nx && nx.id !== s.id ? ` ${t('Berikutnya')}: <b>${esc(nx.code)}</b>` : ''}`
      : `${ICON('lightbulb')} ${t('Skor {n}% — butuh {p}%. Ulangi pola & kosakata yang salah, lalu coba lagi.', { n: acc, p: B1_PASS })}`}</div>`;
  } });
}
Object.assign(ACT, {
  b1tab: b => { const x = b1S(); x.tab = b.dataset.v; if (x.tab !== 'b1') x.open = null; save(); render(); },
  b1band: b => { b1S().band = b.dataset.v; save(); render(); },
  b1open: b => { const x = b1S(); x.tab = 'b1'; x.open = b.dataset.v; x.last = b.dataset.v; const s = b1Stage(x.open); if (s) x.band = s.band; save(); closeModal(); if (ROUTE !== 'path') go('path'); else render(); window.scrollTo(0, 0); },
  b1home: () => { const x = b1S(); x.open = null; save(); render(); window.scrollTo(0, 0); },
  b1resume: () => { const x = b1S(); const r = b1Rec(); const id = x.last && b1Stage(x.last) && !b1StageDone(b1Stage(x.last)) ? x.last : r ? r.id : x.last; x.tab = 'b1'; x.open = id || null; save(); go('path'); window.scrollTo(0, 0); },
  b1sp: b => { const x = b1S(); x.sp[b.dataset.v] = x.sp[b.dataset.v] ? 0 : todayKey(); if (x.sp[b.dataset.v]) addXP(5); save(); render(); },
  b1test: b => b1StartTest(b.dataset.v)
});
/* rekaman tugas bicara tahap (kunci 'b1:<id>') memakai aksi cvrec / cvmine dari b1conv.js */
START_ACTS.add('b1test'); XM_ACT.b1test = 'b1';
if (typeof ROUTE_DESC !== 'undefined') ROUTE_DESC.path = 'Kosakata TOCFL + A2 → B1 bertahap';

/* ---------- Beranda: tombol lanjut jalur B1 di hero ---------- */
const b1HomeBase = vHome;
vHome = function () {
  const h = b1HomeBase();
  try {
    const b = S.b1; if (!b || !b.last) return h;
    const s = b1Stage(b.last); const r = b1Rec(); const tgt = s && !b1StageDone(s) ? s : r; if (!tgt) return h;
    const F = document.createElement('div'); F.innerHTML = h; const hero = F.querySelector('.u2-hero') || F.querySelector('.hero'); if (!hero) return h;
    const btn = `<button class="btn sec b1-hcta" data-a="b1resume">${ICON('path')}<span><small>${t('Jalur A2 → B1')}</small><b>${t('Tahap')} ${esc(tgt.code)} · ${b1StagePct(tgt)}%</b></span>${ICON('chevron')}</button>`;
    const pri = hero.querySelector('.u2-cta') || hero.querySelector('.btn.pri');
    if (pri) pri.insertAdjacentHTML('afterend', btn); else hero.insertAdjacentHTML('beforeend', btn);
    return F.innerHTML;
  } catch (e) { console.error('b1 home', e); return h; }
};

Object.assign(I18N, {
  'Kosakata TOCFL': ['TOCFL vocabulary', 'Bokabularyo ng TOCFL'], 'A2 → B1 bertahap': ['A2 → B1 step by step', 'A2 → B1 hakbang-hakbang'], 'Konsolidasi A2': ['A2 consolidation', 'Pagpapatibay ng A2'],
  'Inti B1': ['B1 core', 'Ubod ng B1'], 'B1+ · lebih luwes': ['B1+ · more fluent', 'B1+ · mas matatas'], 'Pola': ['Patterns', 'Pattern'], 'Kosakata': ['Vocabulary', 'Bokabularyo'], 'Bicara': ['Speaking', 'Pagsasalita'],
  'Checkpoint': ['Checkpoint', 'Checkpoint'], 'Disarankan setelah {c}': ['Recommended after {c}', 'Iminumungkahi pagkatapos ng {c}'], 'Tahap yang disarankan': ['Recommended stage', 'Iminumungkahing yugto'],
  'Mulai': ['Start', 'Simulan'], 'Semua tahap lulus!': ['All stages passed!', 'Pasado lahat ng yugto!'], 'Ulangi checkpoint kapan saja untuk menjaga ingatan.': ['Retake any checkpoint to keep it fresh.', 'Ulitin ang checkpoint anumang oras.'],
  'Dari A2 ke B1, satu tahap demi satu tahap': ['From A2 to B1, one stage at a time', 'Mula A2 hanggang B1, isang yugto bawat isa'],
  'Tiap tahap: pola grammar → percakapan → kosakata sehari-hari, kampus & pabrik → tugas bicara → checkpoint. Tidak ada yang dikunci — ikuti saja tahap yang disarankan.': ['Each stage: grammar → conversation → everyday, campus & fab vocabulary → speaking task → checkpoint. Nothing is locked — just follow the recommended stage.', 'Bawat yugto: grammar → usapan → bokabularyo → pagsasalita → checkpoint. Walang nakakandado.'],
  'tahap lulus': ['stages passed', 'yugtong pasado'], 'kata jalur dikenal': ['path words known', 'kilalang salita'], 'pola B1 paham': ['B1 patterns understood', 'naintindihang B1 pattern'],
  'Pelajari': ['Study', 'Pag-aralan'], 'Buka percakapan': ['Open conversation', 'Buksan ang usapan'], 'Belum ada percakapan untuk tahap ini.': ['No conversation for this stage yet.', 'Wala pang usapan dito.'],
  'Ceritakan sesuatu tentang harimu memakai pola tahap ini.': ['Tell something about your day using this stage’s patterns.', 'Magkuwento tungkol sa araw mo gamit ang pattern.'], 'Pakai minimal satu kali': ['Use at least once', 'Gamitin kahit isang beses'],
  'Campuran: arti kata, dengar kata, isian pola, dengar kalimat dialog, susun kalimat. Lulus ≥ {p}% → tahap berikutnya disorot.': ['Mixed: word meaning, word listening, pattern fill-ins, dialog listening, sentence building. Pass ≥ {p}% → next stage is highlighted.', 'Halo-halo: kahulugan, pakikinig, pattern, pagbuo. Pasado ≥ {p}% → susunod na yugto.'],
  'Mulai checkpoint': ['Start checkpoint', 'Simulan ang checkpoint'], 'Checkpoint {c} tetap lulus — skor {n}%.': ['Checkpoint {c} still passed — score {n}%.', 'Pasado pa rin ang {c} — iskor {n}%.'],
  'Tahap {c} lulus dengan {n}%! +30 XP': ['Stage {c} passed with {n}%! +30 XP', 'Pasado ang {c} sa {n}%! +30 XP'], 'Berikutnya': ['Next', 'Susunod'],
  'Skor {n}% — butuh {p}%. Ulangi pola & kosakata yang salah, lalu coba lagi.': ['Score {n}% — {p}% needed. Review the patterns & words you missed, then try again.', 'Iskor {n}% — kailangan {p}%. Balikan at subukan ulit.'], 'Jalur belajar': ['Learning path', 'Landas ng pag-aaral']
});
Object.assign(I18N_VI, {
  'Kosakata TOCFL': 'Từ vựng TOCFL', 'A2 → B1 bertahap': 'A2 → B1 từng bước', 'Konsolidasi A2': 'Củng cố A2', 'Inti B1': 'Cốt lõi B1', 'B1+ · lebih luwes': 'B1+ · trôi chảy hơn', 'Pola': 'Mẫu câu', 'Kosakata': 'Từ vựng', 'Bicara': 'Nói',
  'Checkpoint': 'Kiểm tra', 'Disarankan setelah {c}': 'Nên học sau {c}', 'Tahap yang disarankan': 'Chặng gợi ý', 'Mulai': 'Bắt đầu', 'Semua tahap lulus!': 'Đã qua mọi chặng!', 'Ulangi checkpoint kapan saja untuk menjaga ingatan.': 'Làm lại bài kiểm tra bất cứ lúc nào.',
  'Dari A2 ke B1, satu tahap demi satu tahap': 'Từ A2 đến B1, từng chặng một', 'Tiap tahap: pola grammar → percakapan → kosakata sehari-hari, kampus & pabrik → tugas bicara → checkpoint. Tidak ada yang dikunci — ikuti saja tahap yang disarankan.': 'Mỗi chặng: ngữ pháp → hội thoại → từ vựng → bài nói → kiểm tra. Không khóa gì — cứ theo chặng gợi ý.',
  'tahap lulus': 'chặng đã qua', 'kata jalur dikenal': 'từ đã biết', 'pola B1 paham': 'mẫu B1 đã hiểu', 'Pelajari': 'Học', 'Buka percakapan': 'Mở hội thoại', 'Belum ada percakapan untuk tahap ini.': 'Chưa có hội thoại cho chặng này.',
  'Ceritakan sesuatu tentang harimu memakai pola tahap ini.': 'Kể về một ngày của bạn bằng mẫu câu của chặng này.', 'Pakai minimal satu kali': 'Dùng ít nhất một lần',
  'Campuran: arti kata, dengar kata, isian pola, dengar kalimat dialog, susun kalimat. Lulus ≥ {p}% → tahap berikutnya disorot.': 'Tổng hợp: nghĩa từ, nghe từ, điền mẫu câu, nghe hội thoại, xếp câu. Đạt ≥ {p}% → chặng tiếp theo được đánh dấu.',
  'Mulai checkpoint': 'Bắt đầu kiểm tra', 'Checkpoint {c} tetap lulus — skor {n}%.': 'Chặng {c} vẫn đạt — điểm {n}%.', 'Tahap {c} lulus dengan {n}%! +30 XP': 'Qua chặng {c} với {n}%! +30 XP', 'Berikutnya': 'Tiếp theo',
  'Skor {n}% — butuh {p}%. Ulangi pola & kosakata yang salah, lalu coba lagi.': 'Điểm {n}% — cần {p}%. Ôn lại rồi thử lại.', 'Jalur belajar': 'Lộ trình học'
});
{ const r = ROUTES.find(x => x[0] === 'path'); if (r) r[2] = 'Jalur A2 → B1'; }

