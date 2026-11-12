/* ========== VIEWS / RENDER (v3) ========== */
const ROUTES = [
  ['home', 'home', 'Beranda'], ['memory', 'brain', 'Ingatan'], ['listen', 'headphone', 'Simak'], ['path', 'path', 'Jalur A2'], ['words', 'book', 'Kata'], ['kalimat', 'ctx', 'Kalimat nyata'], ['hanzi', 'hanzi', 'Hanzi Lab'],
  ['write', 'write', 'Menulis'], ['grammar', 'grammar', 'Tata bahasa'], ['fab', 'chip', 'Mandarin Pabrik'],
  ['arcade', 'game', 'Arcade'], ['slang', 'chat', 'Slang Taiwan'], ['twins', 'twins', 'Huruf kembar'], ['tones', 'tone', 'Nada'], ['stats', 'stats', 'Statistik'], ['me', 'user', 'Saya']
];
const TABS = ['home', 'memory', 'listen', 'words'];
const TAB_SHORT = { memory: 'Ingat', listen: 'Simak', home: 'Beranda', path: 'Jalur', words: 'Kata', kalimat: 'Kalimat', fab: 'Pabrik', hanzi: 'Hanzi', write: 'Menulis', grammar: 'Grammar', twins: 'Kembar', arcade: 'Arcade', slang: 'Slang', tones: 'Nada', stats: 'Statistik', me: 'Saya' };
const ROUTE_DESC = { memory: 'Kartu ingat & kurva lupa', listen: 'Cerita & soal menyimak', home: 'Misi harian & sesi pintar', path: '7 level TOCFL per unit', words: 'Cari & telusuri kosakata', kalimat: 'Tiap kata dalam 3 kalimat nyata', hanzi: 'Cerita bentuk 876 hanzi', write: 'Goresan dengan jari', grammar: '21 pola kalimat', fab: 'Istilah semikonduktor ASE', twins: 'Beda nada · sama bunyi · sama bagian', arcade: 'Game lawan monster pakai hanzi', slang: 'Bahasa gaul anak muda Taiwan', tones: 'Empat nada & sandhi', stats: 'Kalender, akurasi, lencana', me: 'Bahasa, suara, cadangan' };
const ROUTE_COLOR = { memory: 'c7', listen: 'c2', home: 'c1', path: 'c2', words: 'c3', kalimat: 'c6', hanzi: 'c4', write: 'c5', grammar: 'c6', fab: 'c7', twins: 'c5', arcade: 'c7', slang: 'c6', tones: 'c8', stats: 'c3', me: 'c0' };
const lvTile = lv => `<span class="ic-tile" style="font-weight:800;font-size:15px">${lv + 1}</span>`;
let ROUTE = 'home';
const VS = { q: '', lv: -1, st: 'all', lim: 120, hzLv: 0, openLv: null };
const ctxName = c => (CTX[c] ? L3(CTX[c]) : (/^SEMI_/.test(c || '') ? semiCatName(c) : c || ''));
const unitTitle = u => (u.ctx ? ctxName(u.ctx) + (u.part ? ' ' + u.part : '') : t('Paket') + ' ' + u.part);
const fmtN = n => n.toLocaleString(S.settings.ui === 'id' ? 'id-ID' : 'en-US');
const lvTotal = lv => UNITS[lv].reduce((a, u) => a + u.ids.length, 0);
const LOCALE = { id: 'id-ID', en: 'en-US', tl: 'fil-PH', vi: 'vi-VN' };

function applyPerf() {
  const p = S.settings.perf || 'auto';
  const low = (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || matchMedia('(prefers-reduced-transparency: reduce)').matches;
  document.documentElement.classList.toggle('lite', p === 'lite' || (p === 'auto' && !!low));
}
function applyTheme() {
  applyPerf();
  document.documentElement.lang = S.settings.ui === 'tl' ? 'fil' : S.settings.ui;
  const th = S.settings.theme; const r = document.documentElement;
  if (th === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', th);
  const dark = th === 'dark' || (th === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = dark ? '#1d1933' : '#f6f1ff';
}
function go(r) { if (location.hash !== '#' + r) location.hash = r; else render(); }
window.addEventListener('hashchange', () => { closeModal(); render(); window.scrollTo(0, 0); });

function render() {
  const prevR = ROUTE, y = window.scrollY;
  try { _render(); if (ROUTE === prevR && y) window.scrollTo(0, y); } catch (e) {
    console.error('render', e);
    $('#app').innerHTML = `<main class="main" style="grid-column:1/-1"><section class="card glass" style="text-align:center"><div style="font-size:48px">🩹</div><h2>${t('Halaman gagal dimuat')}</h2><p class="muted small">${esc(e && e.message)}</p><div class="row wrap" style="justify-content:center"><a class="btn pri" href="#home" onclick="setTimeout(()=>location.reload(),50)">${t('Muat ulang')}</a><button class="btn sec" data-a="export">${ICON('download')} ${t('Ekspor cadangan')}</button></div></section></main>`;
  }
}
function _render() {
  ROUTE = (location.hash.slice(1) || 'home'); if (!ROUTES.some(r => r[0] === ROUTE)) ROUTE = 'home';
  planToday();
  const app = $('#app'); const st = streakNow(); const rk = rankOf();
  const views = { home: vHome, memory: vMemory, listen: vListen, path: vPath, words: vWords, kalimat: vKalimat, hanzi: vHanzi, write: vWrite, grammar: vGrammar, fab: vFab, twins: vTwins, arcade: vArcade, slang: vSlang, tones: vTones, stats: vStats, me: vMe };
  const showRail = ['home', 'path', 'hanzi', 'memory', 'listen'].includes(ROUTE);
  app.innerHTML = `
  <aside class="side glass" aria-label="${t('Navigasi')}">
    <div class="brand"><span class="mark hz">小</span><div><b>Xiǎobù</b><small>小步 · ${t('langkah kecil')}</small></div></div>
    <nav class="navs">${ROUTES.map(([r, ic, lbl]) => `<a class="nav ${ROUTE === r ? 'on' : ''}" href="#${r}" data-a="tap" title="${esc(t(lbl))}" ${ROUTE === r ? 'aria-current="page"' : ''}><span class="ic">${ICON(ic)}</span><span class="lbl">${t(lbl)}</span></a>`).join('')}</nav>
    <div class="foot">${t('Peringkat')} ${rk.n} · ${esc(t(rk.name))}<br>${fmtN(S.xp)} XP · ${st} ${t('hari')} · ${t('Target A2')}: ${fmtDate(targetDate())}<button class="btn sec small sfbtn" data-a="gobackup">${ICON('download')} ${t('Simpan progres')}</button></div>
  </aside>
  <main class="main" id="main">
    <header class="topbar"><div class="brand"><span class="mark hz">小</span><div><b>Xiǎobù</b></div></div>
      <a class="chip stat-lv" href="#stats">${ICON('award')} ${rk.n}</a><a class="chip stat-fire" href="#stats">${ICON('flame')} ${st}</a><a class="chip stat-xp" href="#stats">${fmtN(S.xp)} XP</a></header>
    ${(views[ROUTE] || (typeof XVIEWS !== 'undefined' && XVIEWS[ROUTE]) || vHome)()}
  </main>
  <aside class="rail" aria-label="${t('Ringkasan')}">${showRail ? railHTML() : railMini()}</aside>
  <nav class="tabbar glass" aria-label="${t('Menu')}">${TABS.map(r => { const R = ROUTES.find(x => x[0] === r); return `<a class="tab ${ROUTE === r ? 'on' : ''}" href="#${r}" data-a="tap"><span class="ic">${ICON(R[1])}</span><span class="tl">${t(TAB_SHORT[r] || R[2])}</span></a>`; }).join('')}
    <button class="tab ${TABS.includes(ROUTE) ? '' : 'on'}" data-a="more"><span class="ic">${ICON('grid')}</span><span class="tl">${t('Lainnya')}</span></button></nav>`;
  afterRender();
}
function afterRender() {
  if (ROUTE === 'words') { const i = $('#wq'); if (i && VS.focus) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); VS.focus = false; } }
}
function fmtDate(k) { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString(LOCALE[S.settings.ui] || 'id-ID', { day: 'numeric', month: 'short' }); }

/* ---------- shared blocks ---------- */
function blossomSVG(done) {
  const cols = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)', 'var(--c8)'];
  const petals = [0, 1, 2, 3, 4].map(k => `<g transform="rotate(${k * 72} 100 100)"><path class="petal" d="M100 96 C72 70 74 26 100 18 C126 26 128 70 100 96Z" fill="${k < done ? cols[k] : 'rgba(160,150,200,.13)'}" stroke="${k < done ? 'rgba(255,255,255,.9)' : 'rgba(150,140,190,.35)'}" stroke-width="2" ${k < done ? '' : 'stroke-dasharray="4 5"'}/>${k < done ? `<circle cx="100" cy="40" r="3" fill="rgba(255,255,255,.8)"/>` : ''}</g>`).join('');
  return `<div class="blossom" aria-label="${done}/5"><svg viewBox="0 0 200 200">${petals}
    <circle cx="100" cy="100" r="27" fill="var(--glass2)" stroke="var(--gline)"/>
    <text x="100" y="98" text-anchor="middle" class="core" font-size="24" fill="var(--ink)">${done === 5 ? '花' : '學'}</text>
    <text x="100" y="116" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink2)">${done}/5</text></svg></div>`;
}
function ringSVG(pct, label, sub) {
  const R = 26, C = 2 * Math.PI * R;
  return `<svg class="ring" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
    <circle cx="32" cy="32" r="${R}" fill="none" stroke="var(--acc-soft)" stroke-width="7"/>
    <circle cx="32" cy="32" r="${R}" fill="none" stroke="var(--ring)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - clamp(pct, 0, 1))}" transform="rotate(-90 32 32)"/>
    <text x="32" y="31" text-anchor="middle" font-size="${String(label).length > 3 ? 12.5 : String(label).length > 2 ? 14.5 : 17}" font-weight="800" fill="var(--ink)">${label}</text>
    ${sub ? `<text x="32" y="44" text-anchor="middle" font-size="9" font-weight="700" fill="var(--ink3)">${sub}</text>` : ''}</svg>`;
}
function rankCard() {
  const r = rankOf();
  return `<div class="card glass"><div class="rank"><span class="badge-xp ring-wrap">${ringSVG(r.pct, r.n, 'LV')}</span><div class="grow" style="min-width:0">
      <div class="row" style="gap:8px"><b style="font-size:17px">${t('Peringkat')} ${r.n}</b><span class="chip"><span class="hz zh">${r.zh}</span> ${t(r.name)}</span></div>
      <div class="bar" style="margin-top:8px"><i style="width:${Math.round(r.pct * 100)}%"></i></div>
      <div class="small muted" style="margin-top:6px">${r.max ? t('Peringkat tertinggi tercapai! ✨ {x} XP', { x: fmtN(S.xp) }) : t('{a} / {b} XP menuju {e} Peringkat {n}', { a: fmtN(r.into), b: fmtN(r.need), e: r.next[3], n: r.n + 1 })}</div>
    </div></div>
    <div class="small muted" style="margin-top:10px">${t('XP datang dari setiap jawaban, misi harian, game, dan cerita hanzi yang kamu tulis.')}</div></div>`;
}
function dayHit(k) {
  const d = S.days[k]; if (!d || !d.q) return false;
  if (k !== todayKey() && d.qd) return Object.keys(d.qd).length >= 3;   // hari lampau: pakai catatan saat itu
  return d.q.filter(q => questDone(q, d)).length >= 3;
}
function streakCard() {
  const st = streakNow(); const tk = todayKey();
  const days = []; for (let k = -6; k <= 0; k++) days.push(keyAdd(tk, k));
  const todayOk = dayHit(tk);
  return `<div class="card glass"><div class="streak"><span class="flame ${todayOk ? '' : 'cold'}">${ICON('flame')}</span><div class="grow"><b style="font-size:22px">${t('{n} hari', { n: st })}</b><div class="small muted">${todayOk ? t('Hari ini aman! Api menyala.') : t('Selesaikan 3 misi untuk menyalakan api hari ini')}</div></div>${S.streak.freeze ? `<span class="chip">🧊 ${S.streak.freeze}</span>` : ''}</div>
  <div class="week">${days.map(k => { const [y, m, d] = k.split('-').map(Number); return `<span><i class="${dayHit(k) ? 'on' : ''} ${k === tk ? 'today' : ''}"></i>${new Date(y, m - 1, d).toLocaleDateString(LOCALE[S.settings.ui] || 'id-ID', { weekday: 'short' }).slice(0, 3)}</span>`; }).join('')}</div></div>`;
}
function todayChar() {
  const seen = CHAR_ORDER.filter(c => CHAR_WORDS[c].some(i => S.cards[i]));
  const pool = seen.filter(c => !S.hzKnown[c]);
  const src = pool.length ? pool : seen.length ? seen : CHAR_ORDER.slice(0, 30);
  return src[keyDiff('2026-01-01', todayKey()) % src.length];
}
function todayHzCard() {
  const c = todayChar();
  return `<div class="card glass"><h3 class="muted small" style="font-weight:700">${t('Hanzi hari ini')}</h3><div class="today-hz"><button class="big hz" data-a="char" data-v="${c}" aria-label="${c}">${c}</button><div><b style="font-size:17px">${esc(charMean(c))}</b><p class="small muted" style="margin:4px 0 8px">${esc(charStory(c))}</p><button class="qbtn" data-a="char" data-v="${c}">${t('Buka cerita & goresan')}</button></div></div></div>`;
}
const INSIGHT_ICON = { 'drill-tone': 'tone', leech: 'brain', 'drill-listen': 'headphone', 'drill-type': 'keyboard', 'drill-mc_mean': 'book', 'drill-hz': 'hanzi' };
function insightCard(max = 2) {
  const ins = insights().slice(0, max);
  return `<div class="card glass"><h3>${t('Otak adaptif')}</h3>${ins.map(x => `<div class="row" style="align-items:flex-start;margin-top:10px"><span class="ic-tile tint c6">${ICON(INSIGHT_ICON[x.a] || 'lightbulb')}</span><div class="grow small">${esc(x.t)}${x.a ? `<div style="margin-top:6px"><button class="qbtn" data-a="${x.a}">${esc(x.b)}</button></div>` : ''}</div></div>`).join('')}</div>`;
}
function railHTML() { return rankCard() + streakCard() + todayHzCard() + insightCard(); }
function railMini() { return rankCard() + streakCard(); }

/* ---------- HOME ---------- */
function vHome() {
  const day = dayRec(); const plan = planToday(); const done = questsDoneCount(day); const c = counts();
  const dayN = keyDiff(S.start, todayKey()) + 1; const left = Math.max(0, keyDiff(todayKey(), targetDate()));
  const h = new Date().getHours();
  const greet = h < 11 ? t('Selamat pagi') : h < 15 ? t('Selamat siang') : h < 19 ? t('Selamat sore') : t('Selamat malam');
  const zh = h < 11 ? '早安' : h < 18 ? '午安' : '晚安';
  const newLeft = Math.max(0, plan.new - day.new); const dueN = dueIds().length;
  const pct = Math.round(c.intro / A2N * 100);
  return `
  <section class="hero glass">${blossomSVG(done)}
    <div><div class="greet"><span class="hz">${zh}</span> · ${greet}${S.name ? ', ' + esc(S.name) : ''}!</div>
      <h1>${done === 5 ? t('Bunga hari ini mekar penuh 🌸') : t('Hari ke-{n} menuju A2', { n: dayN })}</h1>
      <p class="sub">${newLeft ? t('Hari ini: {n} kata baru', { n: `<b>${newLeft}</b>` }) : t('Target kata baru sudah beres ✅')}${dueN ? ' · ' + t('{n} kata menunggu diulang', { n: `<b>${dueN}</b>` }) : ''}. ${left ? t('Sisa {n} hari ke target ({d}).', { n: left, d: fmtDate(targetDate()) }) : ''} <span class="small">${t('Tempo')}: ${t(plan.why)}.</span></p>
      <div class="row wrap"><button class="btn pri big" data-a="smart">${ICON('play')} ${newLeft || dueN ? t('Mulai sesi pintar') : t('Latihan bebas')}</button><button class="btn sec" data-a="sent">${ICON('blocks')} ${t('Latihan kalimat')}</button></div>
      <div class="row wrap" style="gap:22px;margin-top:18px"><div class="stat hi"><b>${c.intro}<small class="muted" style="font-size:13px">/${A2N}</small></b><span>${t('kata A2 dikenal')}</span></div><div class="stat hi2"><b>${pct}%</b><span>${t('jalan ke A2')}</span></div><div class="stat hi3"><b>${c.master}</b><span>${t('dikuasai')}</span></div></div>
    </div>
  </section>
  <div class="rail-inline">${rankCard()}${streakCard()}</div>
  <section class="card glass"><div class="row" style="margin-bottom:12px;gap:12px">${ringSVG(done / 5, done + '/5', 'MISI')}<h2 class="grow" style="margin:0">${t('Misi harian')}</h2><span class="chip">+40 XP</span></div>
    <div class="quests">${day.q.map(q => questRow(q, day)).join('')}</div>
    <p class="small muted" style="margin:12px 2px 0">${t('3 misi = api streak menyala · 5 misi = bunga mekar penuh +100 XP. Misi ke-5 berubah tiap hari dan menyesuaikan kelemahanmu.')}</p></section>
  <section class="card glass"><h2>${t('Mode cepat')}</h2><div class="grid3 modes">
    ${modeTile('write', 'Latihan menulis', 'Goresan hanzi dengan jari', 'writedrill')}
    ${modeTile('puzzle', 'Lengkapi kalimat', 'Pilih kata yang hilang', 'cloze')}
    ${modeTile('blocks', 'Susun kalimat', 'Urutkan hanzi jadi kalimat', 'build')}
    ${modeTile('tone', 'Dril nada', 'Tebak kontur nada', 'tones-drill')}
    ${modeTile('grid', 'Pasangkan', 'Game cepat 2 ronde', 'match')}
    ${modeTile('headphone', 'Telinga', 'Dengar lalu pilih', 'drill-listen')}
    ${modeTile('keyboard', 'Ketik pinyin', 'Latih ejaan + nada', 'drill-type')}
    ${modeTile('hanzi', 'Hanzi kilat', '10 hanzi lewat cerita', 'hzquiz')}
    ${modeTile('brain', 'Kata bandel', 'Yang sering lupa', 'leech')}
    ${modeTile('chip', 'Mandarin Pabrik', 'Istilah semikonduktor ASE', 'gotofab')}
  </div></section>
  <div class="rail-inline">${todayHzCard()}${insightCard(2)}</div>
  ${a2Card(c)}`;
}
const MODE_TINT = { write: 'c5', puzzle: 'c6', blocks: 'c6', tone: 'c8', grid: 'c3', headphone: 'c2', keyboard: 'c1', hanzi: 'c4', brain: 'c7', chip: 'c7' };
function modeTile(ic, ti, s, a) { return `<button class="unit" data-a="${a}" style="min-height:0;align-items:flex-start">${TILE(ic, 'tint ' + (MODE_TINT[ic] || 'c0'))}<b style="font-size:14px">${t(ti)}</b><span class="u-t">${t(s)}</span></button>`; }
const QUEST_TINT = { new: 'c2', rev: 'c1', prac: 'c3', prac2: 'c3', tone: 'c8', hz: 'c4', combo: 'c7', match: 'c3', story: 'c6', listen: 'c2', type: 'c1', sent: 'c6', write: 'c5' };
function questRow(q, day) {
  const m = QMETA[q.id]; if (!m) return '';
  const v = questProg(q, day); const d = questDone(q, day);
  const later = !d && q.id === 'rev' && !dueIds().some(i => S.cards[i].iv >= 1);
  const nextDue = later ? Math.min(...Object.values(S.cards).filter(c => c.iv >= 1).map(c => c.due)) : 0;
  const nxt = later && isFinite(nextDue) ? new Date(nextDue).toLocaleTimeString(LOCALE[S.settings.ui] || 'id-ID', { hour: '2-digit', minute: '2-digit' }) : '';
  return `<div class="quest ${d ? 'done' : ''} ${later ? 'later' : ''}"><span class="qi ${d ? 'ok' : 'tint ' + (QUEST_TINT[q.id] || 'c0')}">${d ? ICON('check') : ICON(QUEST_ICON[q.id] || 'target')}</span><div><div class="qt">${m[1](q.t)}</div><div class="bar"><i style="width:${q.t ? v / q.t * 100 : 100}%"></i></div></div>${d ? `<span class="qp">${ICON('check')} ${v}/${q.t}</span>` : later ? `<span class="qp" title="${t('Ulangan berikutnya jatuh tempo nanti')}">${ICON('clock')} ${nxt || t('nanti')}</span>` : `<button class="qbtn" data-a="q-${q.id}">${v}/${q.t} · ${t('Go')}</button>`}</div>`;
}
function pace7() { const from = keyAdd(todayKey(), -6); let n = 0; for (const k in S.cards) { const c = S.cards[k]; if (W[k].l < 4 && !c.skip && c.add && c.add >= from) n++; } return n / clamp(keyDiff(S.start, todayKey()) + 1, 1, 7); }
function a2Card(c) {
  const rem = A2N - c.a2; const p = pace7(); const eta = p > 0 ? keyAdd(todayKey(), Math.ceil(rem / p)) : null;
  return `<section class="card glass"><h2>${t('Peta menuju A2')}</h2>
    ${[0, 1, 2, 3].map(lv => { const tt = lvTotal(lv); const n = c.lv[lv]; return `<div class="acc"><span><b>${LEVELS[lv].en}</b></span><div class="bar"><i style="width:${n / tt * 100}%"></i></div><span class="small">${n}/${tt}</span></div>`; }).join('')}
    <p class="small muted" style="margin:6px 0 0">${rem === 0 ? t('🍑 Semua kosakata A2 sudah kamu kenal! Lanjut kuatkan sampai "dikuasai", lalu buka Level 3.') : eta ? t('Dengan tempo 7 hari terakhir ({p} kata/hari), semua kata A2 terkenalkan sekitar {d}. Target: {t}.', { p: p.toFixed(1), d: `<b>${fmtDate(eta)}</b>`, t: fmtDate(targetDate()) }) : t('Mulai sesi pertama untuk melihat perkiraan tanggal A2-mu.')}</p></section>`;
}

/* ---------- PATH ---------- */
function curUnit() { for (let lv = 0; lv < 7; lv++) for (const u of UNITS[lv]) if (u.ids.some(i => !S.cards[i])) return u; return null; }
function vPath() {
  const c = counts(); const cu = curUnit();
  return `<section class="card glass"><h1>${t('Jalur belajar')}</h1><p class="muted" style="margin:8px 0 0">${t('7 level resmi TOCFL Taiwan. Empat level pertama ({n} kata) adalah jalur A2, dikelompokkan per tema kehidupan sehari-hari — tiap unit maksimal 8 kata supaya ringan. Sudah paham satu level? Pakai tes lompat.', { n: A2N })}</p>
  ${cu ? `<div class="row wrap" style="margin-top:14px"><button class="btn pri" data-a="unit" data-v="${cu.id}">${ICON('play')} ${t('Lanjut')}: ${esc(unitTitle(cu))} · ${LEVELS[cu.lv].en}</button></div>` : ''}</section>
  <div class="levels">${LEVELS.filter((x, lv) => lv < 7).map((L, lv) => {
    const tt = lvTotal(lv); const n = c.lv[lv]; const open = VS.openLv === null ? lv === (cu ? cu.lv : 3) : VS.openLv === lv;
    const beyond = lv >= 4;
    return `<section class="lvl glass">
      <div class="lvl-head">${lvTile(lv)}<div class="grow"><b style="font-size:17px">${L.en} · <span class="hz">${L.name}</span></b><div class="small muted">${L.cefr} · “${t(L.nick)}” · ${t('{a} dikenal · {b} dikuasai', { a: n + '/' + tt, b: c.lvM[lv] })}</div><div class="bar" style="margin-top:8px;height:7px"><i style="width:${n / tt * 100}%"></i></div></div>
      <button class="btn ghost small" data-a="lvtoggle" data-v="${lv}" aria-expanded="${open}">${open ? '▲' : '▼'}</button></div>
      ${open ? `${beyond ? `<div class="notice" style="margin-bottom:12px">${t('Level lanjutan setelah A2 ({n} kata, paket 40). Pinyin & suara sudah siap; arti 3 bahasa masih fokus di jalur A2.', { n: fmtN(tt) })}</div>` : ''}
      ${lv <= 3 && n < tt ? `<div class="row wrap" style="margin-bottom:12px"><button class="btn sec small" data-a="place" data-v="${lv}">${t('Tes lompat {lv} (12 soal)', { lv: L.en })}</button></div>` : ''}
      <div class="units">${UNITS[lv].map(u => unitTile(u, cu)).join('')}</div>` : ''}
    </section>`;
  }).join('')}</div>`;
}
function unitTile(u, cu) {
  const n = u.ids.filter(i => S.cards[i]).length; const m = u.ids.filter(i => mastery(card(i)) >= 4).length; const done = n === u.ids.length;
  const cx = u.ctx ? ctxIcon(u.ctx) : ICON('layers');
  return `<button class="unit ${done ? 'done' : ''} ${cu && cu.id === u.id ? 'cur' : ''}" data-a="unit" data-v="${u.id}"><span class="u-t row" style="gap:6px">${cx} ${esc(unitTitle(u))}</span><span class="u-hz hz">${u.ids.slice(0, 3).map(i => esc(W[i].s)).join(' ')}</span><span class="u-t">${n}/${u.ids.length}${m ? ` · 💪${m}` : ''}</span><div class="bar"><i style="width:${n / u.ids.length * 100}%"></i></div></button>`;
}
function openUnit(id) {
  const [lv, k] = id.split('-').map(Number); const u = UNITS[lv][k]; const n = u.ids.filter(i => S.cards[i]).length;
  openModal(`<div class="q-kind">${LEVELS[lv].en}${u.ctx ? ' · ' + esc(ctxName(u.ctx)) : ''}</div>
    <h2 style="margin:6px 0 14px">${esc(unitTitle(u))}</h2>
    <div class="row wrap" style="margin-bottom:14px">${n < u.ids.length ? `<button class="btn pri" data-a="ulearn" data-v="${id}">${ICON('seed')} ${t('Pelajari {n} kata', { n: u.ids.length - n })}</button>` : ''}${n >= 2 ? `<button class="btn ${n < u.ids.length ? 'sec' : 'pri'}" data-a="uprac" data-v="${id}">${ICON('target')} ${t('Latih unit')}</button>` : ''}</div>
    <div class="wlist">${u.ids.map(wordRow).join('')}</div>`);
}

/* ---------- WORDS ---------- */
function wordRow(i) {
  const w = W[i]; const m = mastery(card(i));
  return `<button class="wrow" data-a="word" data-v="${i}"><span class="w hz">${hzHTML(w, true)}${lvBadgeW(i)}</span><span style="min-width:0"><div class="py">${pinyinHTML(w, S.settings.pinyin === 'none' ? 'mark' : S.settings.pinyin)}</div><div class="mn">${esc(w.m ? meanP(w) : posLabel(w.o))}</div></span><span class="dot m${m}" title="${t(MASTERY_NAME[m])}"></span></button>`;
}
function wordMatches() {
  const q = VS.q.trim().toLowerCase(); const qn = stripTone(q).replace(/[\s\d]/g, '');
  let ids = VS.lv === -1 ? A2_ORDER : VS.lv === 4 ? W.filter(w => w.l >= 4).map(w => w.i) : UNITS[VS.lv].flatMap(u => u.ids);
  if (VS.st === 'known') ids = ids.filter(i => S.cards[i]);
  else if (VS.st === 'new') ids = ids.filter(i => !S.cards[i]);
  else if (VS.st === 'leech') ids = ids.filter(i => isLeech(card(i)));
  else if (VS.st === 'master') ids = ids.filter(i => mastery(card(i)) >= 3);
  if (q) ids = ids.filter(i => { const w = W[i]; return w.w.includes(q) || (qn && stripTone(w.p).replace(/\s/g, '').includes(qn)) || (w.m && w.m.some(x => x.toLowerCase().includes(q))); });
  return ids;
}
function vWords() {
  const ids = wordMatches();
  const lvOpts = [[-1, t('Semua A2')], [0, 'N1'], [1, 'N2'], [2, 'A1'], [3, 'A2'], [4, 'B1+']];
  const stOpts = [['all', t('Semua')], ['new', t('Belum')], ['known', t('Dikenal')], ['master', t('Kuat')], ['leech', t('Bandel')]];
  return `<section class="card glass"><h1>${t('Kamus kata')}</h1><p class="muted" style="margin:8px 0 14px">${t('Cari dengan hanzi, pinyin (tanpa nada juga bisa), atau arti dalam Indonesia / English / Filipino.')}</p>
    <div class="search glass"><span>🔎</span><input id="wq" value="${esc(VS.q)}" placeholder="${t('mis. makan, chī, 吃…')}" aria-label="${t('Cari')}" data-in="wq">${VS.q ? `<button class="btn ghost" data-a="wqclear">✕</button>` : ''}</div>
    <div class="row wrap" style="margin-top:12px"><div class="seg">${lvOpts.map(([v, l]) => `<button class="${VS.lv === v ? 'on' : ''}" data-a="wlv" data-v="${v}">${l}</button>`).join('')}</div><div class="seg">${stOpts.map(([v, l]) => `<button class="${VS.st === v ? 'on' : ''}" data-a="wst" data-v="${v}">${l}</button>`).join('')}</div></div>
    <div class="row small muted" style="margin-top:12px;gap:14px;flex-wrap:wrap"><span>${t('{n} kata', { n: fmtN(ids.length) })}</span>${[1, 2, 3, 4].map(m => `<span class="row" style="gap:5px"><i class="dot m${m}"></i>${t(MASTERY_NAME[m])}</span>`).join('')}</div>${lvLegend()}</section>
  <section class="card glass" style="padding:14px"><div class="wlist">${ids.slice(0, VS.lim).map(wordRow).join('') || `<div class="empty">${t('Tidak ketemu. Coba kata lain 🌿')}</div>`}</div>
  ${ids.length > VS.lim ? `<div class="row" style="justify-content:center;margin-top:12px"><button class="btn sec" data-a="wmore">${t('Tampilkan lebih banyak')}</button></div>` : ''}</section>`;
}
function sylButtons(w) {
  if (!aligned(w)) return '';
  return `<div class="tonebar">${w.y.map((sy, k) => `<button data-a="syl" data-v="${esc(w.s[k] || '')}" data-t="${w.t[k]}"><span class="hz t${w.t[k]}" style="font-size:20px">${esc(w.s[k] || '')}</span> <b class="t${w.t[k]}">${esc(sy)}</b> <span class="small muted">${t('nada')} ${w.t[k] === 5 ? '·' : w.t[k]}</span></button>`).join('')}</div>`;
}
function openWord(i) {
  const w = W[i]; const c = card(i); const m = mastery(c); const u = UNIT_OF[i];
  const due = c ? Math.round((c.due - Date.now()) / DAY) : null;
  openModal(`<div class="q-kind">${lvBadgeW(i, 'sm')} ${(LEVELS[lvOfWord(i)] || LEVELS[w.l]).en}${u && u.ctx ? ' · ' + esc(ctxName(u.ctx)) : ''}</div>
    <div class="q-hz hz ${w.w.length > 3 ? 'sm' : ''}" style="margin-top:6px">${hzHTML(w)}</div>
    <div class="row" style="justify-content:center;gap:14px;margin:6px 0"><div class="q-py">${pinyinHTML(w, 'mark')}</div>${aligned(w) ? contourSVG(w.t, 26) : ''}</div>
    <div class="row wrap" style="justify-content:center;gap:8px"><button class="speak mini" data-a="say" data-v="${i}">${ICON('speaker')}</button><button class="btn sec small" data-a="say" data-v="${i}" data-slow="1">${ICON('slow')} ${t('per suku kata')}</button>${aligned(w) ? `<button class="btn sec small" data-a="hum" data-v="${w.t.join('')}">${ICON('wave')} ${t('kontur nada')}</button>` : ''}<button class="btn sec small" data-a="writeword" data-v="${i}">${ICON('write')} ${t('Latih menulis')}</button></div>
    ${aligned(w) ? `<div class="small muted" style="text-align:center;margin-top:8px">${t('Ketuk tiap suku kata untuk mendengarnya sendiri-sendiri — nadanya paling jelas begitu.')}</div>${sylButtons(w)}` : ''}
    ${subsHTML(w, true)}
    <div class="pill-row" style="justify-content:center;margin:14px 0"><span class="chip">${esc(posLabel(w.o))}</span>${w.v ? `<span class="chip">${t('juga')}: <span class="hz">${esc(w.v.join(' · '))}</span></span>` : ''}<span class="chip"><i class="dot m${m}"></i>${t(MASTERY_NAME[m])}</span>${c ? `<span class="chip">${due <= 0 ? t('ulang hari ini') : t('ulang {n} hari lagi', { n: due })}</span>` : ''}${c && c.lrated ? `<span class="chip">${ICON('brain')} ${t('peluang ingat')} ${Math.round(recallProb(i) * 100)}%</span>` : ''}</div>
    ${mnemonicBlock(w)}
    <h3>${t('Penalaran bentuk tiap huruf')}</h3>${charsBlockA(w)}
    ${!c ? `<div class="row" style="margin-top:14px"><button class="btn pri wide" data-a="learnone" data-v="${i}">${ICON('seed')} ${t('Masukkan ke hafalanku')}</button></div>` : ''}`);
  if (S.settings.autoplay) sayWithTone(w);
}
function charsBlockA(w) {
  const cs = [...new Set([...w.s].filter(isHan))];
  return `<div class="chars">${cs.map(c => { return `<button class="chr" data-a="char" data-v="${c}"><div class="c hz">${c}</div><div><b>${esc(charMean(c) || 'hanzi')}</b> <span class="small t${charTone(c)}">${esc(charPy(c))}</span><p>${esc(charStory(c) || t('Belum ada cerita — tap untuk menulis versimu.'))}</p></div></button>`; }).join('')}</div>`;
}

/* ---------- HANZI LAB ---------- */
function vHanzi() {
  const lv = VS.hzLv; const list = CHAR_ORDER.filter(c => CHAR_LV[c] === lv);
  const seen = CHAR_ORDER.filter(c => CHAR_WORDS[c].some(i => S.cards[i])).length; const known = Object.keys(S.hzKnown).filter(c => CHAR_WORDS[c] && CHAR_WORDS[c].some(i => S.cards[i])).length;
  return `<section class="card glass"><h1>${t('Hanzi Lab')}</h1><p class="muted" style="margin:8px 0 12px">${t('{n} hanzi unik di jalur A2, masing-masing punya cerita bentuk dari benda sehari-hari. Cerita buatanmu sendiri paling nempel — tap hanzi mana pun lalu tulis versimu (✎).', { n: CHAR_ORDER.length })}</p>
    <div class="row wrap"><button class="btn sec" data-a="goto" data-v="twins">${ICON('twins')} ${t('Huruf kembar')}</button><button class="btn pri" data-a="hzquiz">${ICON('hanzi')} ${t('Hanzi kilat (10)')}</button><button class="btn sec" data-a="writedrill">${ICON('write')} ${t('Latihan menulis')}</button><span class="chip">${ICON('check')} ${known}/${seen}</span><span class="chip">${ICON('write')} ${Object.keys(S.hzWrite || {}).length}</span><span class="chip">${ICON('lightbulb')} ${Object.keys(S.stories).length}</span></div></section>
  <section class="card glass"><div class="row wrap" style="margin-bottom:14px"><h2 class="grow" style="margin:0">${t('Hanzi per level')}</h2><div class="seg">${[0, 1, 2, 3].map(l => `<button class="${lv === l ? 'on' : ''}" data-a="hzlv" data-v="${l}">${LEVELS[l].e} ${LEVELS[l].en}</button>`).join('')}</div></div>
    <div class="hzgrid">${list.map(c => `<button class="hzcell ${S.hzKnown[c] ? 'known' : ''} ${S.stories[c] ? 'own' : ''}" data-a="char" data-v="${c}" style="${CHAR_WORDS[c].some(i => S.cards[i]) ? '' : 'opacity:.55'}"><span class="c hz">${c}</span><span class="m">${esc(charMean(c))}</span></button>`).join('')}</div>
    <p class="small muted" style="margin:10px 2px 0">${t('Titik hijau = sudah benar di kuis hanzi. Yang pudar = katanya belum kamu pelajari.')}</p></section>${lensToday()}
  <section class="card glass"><h2>${t('Komponen penting (radikal)')}</h2><p class="small muted" style="margin:-4px 0 12px">${t('Kenali "potongan lego" ini, dan hanzi baru terasa seperti gabungan benda yang sudah kamu kenal.')}</p>
    <div class="radicals">${RADICALS.map(r => `<div class="rad"><span class="c hz">${r[0]}</span><div><b>${esc(meanLang() === 'id' ? r[1] : isVI() ? vx(COMP[r[0]][2]) : COMP[r[0]][2])}</b> <span class="small muted">${COMP[r[0]][0]}</span><p>${meanLang() === 'id' ? esc(r[2]) : ((fam8().key[r[0]] || []).slice(0, 6).map(x => `<span class="hz">${x}</span>`).join(' '))}</p></div></div>`).join('')}</div></section>`;
}
let HW = null;
function loadHanziWriter(cb) {
  if (window.HanziWriter) return cb();
  if (!navigator.onLine) return;
  if (loadHanziWriter.p) { loadHanziWriter.p.push(cb); return; }
  loadHanziWriter.p = [cb];
  const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.2/dist/hanzi-writer.min.js';
  s.onload = () => loadHanziWriter.p.forEach(f => f()); s.onerror = () => { loadHanziWriter.p = null; loadHanziWriter.failed = true; };
  document.head.appendChild(s);
}
function openChar(c) {
  const d = CH[c] || ['', '']; const own = S.stories[c] || '';
  const ws = (CHAR_WORDS[c] || []).slice(0, 8);
  const rads = RADICALS.filter(r => c !== r[0] && d[1] && d[1].includes(r[0])).slice(0, 2);
  openModal(`<div class="q-kind">🀄 ${t('Hanzi')}${CHAR_LV[c] !== undefined ? ' · ' + t('muncul pertama di {lv}', { lv: LEVELS[CHAR_LV[c]].en }) : ''}</div>
    <div class="row" style="gap:18px;align-items:center;margin:10px 0 14px;flex-wrap:wrap;justify-content:center">
      <div class="writer" id="hw" style="width:170px;height:170px;display:grid;place-items:center"><svg class="grid" viewBox="0 0 170 170" width="170" height="170"><path d="M0 85H170M85 0V170M0 0L170 170M170 0L0 170" stroke="rgba(150,140,190,.22)" stroke-dasharray="4 5"/></svg><span class="hz" id="hwfb" style="font-size:120px;line-height:1;position:relative">${c}</span></div>
      <div class="grow" style="min-width:200px"><b style="font-size:22px">${esc(d[0] || '—')}</b><div class="row wrap" style="margin-top:10px;gap:8px"><button class="btn sec small" data-a="sayc" data-v="${c}">${ICON('speaker')} ${t('dengar')}</button><button class="btn sec small" data-a="hwanim" id="hwa" hidden>${ICON('play')} ${t('urutan goresan')}</button><button class="btn pri small" data-a="writechar" data-v="${c}">${ICON('write')} ${t('Latih menulis')}</button></div></div></div>
    ${d[1] ? `<div class="gtip">${ICON('lightbulb')}<span><b>${t('Cerita bentuk')}:</b> ${esc(d[1])}</span></div>` : ''}
    ${charPatternBlock(c)}
    ${rads.length ? `<div class="pill-row" style="margin-top:10px">${rads.map(r => `<span class="chip"><span class="hz">${r[0]}</span> = ${esc(r[1])}</span>`).join('')}</div>` : ''}
    <h3 style="margin-top:16px">${t('Ceritamu sendiri')}</h3>
    <textarea id="story" rows="3" style="width:100%;border-radius:16px;border:1px solid var(--gline);background:rgba(255,255,255,.4);padding:12px;resize:vertical" placeholder="${t('Bentuk ini mengingatkanmu pada apa?')}">${esc(own)}</textarea>
    <div class="row" style="margin-top:8px"><button class="btn pri small" data-a="savestory" data-v="${c}">${t('Simpan cerita')}</button>${own ? `<button class="btn ghost small" data-a="delstory" data-v="${c}">${t('Hapus')}</button>` : ''}</div>
    ${ws.length ? `<h3 style="margin-top:18px">${t('Muncul di kata')}</h3><div class="wlist">${ws.map(wordRow).join('')}</div>` : ''}`);
  HW = null;
  loadHanziWriter(() => {
    const box = $('#hw'); if (!box || !window.HanziWriter) return;
    try {
      const dark = getComputedStyle(document.documentElement).getPropertyValue('--bg1').trim().startsWith('#1');
      HW = HanziWriter.create('hw', c, { width: 170, height: 170, padding: 10, strokeColor: dark ? '#e6ddff' : '#3a3159', radicalColor: '#e19a1f', outlineColor: dark ? 'rgba(255,255,255,.12)' : 'rgba(58,49,89,.1)', drawingColor: '#5b9cf5', showCharacter: true, strokeAnimationSpeed: 1.1, delayBetweenStrokes: 180,
        onLoadCharDataSuccess: () => { const f = $('#hwfb'); if (f) f.remove(); ['#hwa', '#hwq'].forEach(s => { const b = $(s); if (b) b.hidden = false; }); },
        onLoadCharDataError: () => { HW = null; } });
    } catch (e) { HW = null; }
  });
}

/* ---------- TONES ---------- */
const TONE_INFO = [
  [1, '媽', 'mā', 'ibu', 'Datar & tinggi', 'Seperti suara dengung "nggg…" yang ditahan, atau nada tunggu telepon. Jangan turun di akhir.'],
  [2, '麻', 'má', 'rami / kesemutan', 'Naik', 'Seperti orang kaget bertanya "Hah?" atau "Serius?" — dari tengah naik ke atas.'],
  [3, '馬', 'mǎ', 'kuda', 'Rendah', 'Di Taiwan biasanya diucapkan rendah & sedikit serak, seperti menggumam kecewa "hmm…". Naik penuh hanya di akhir kalimat atau saat diucapkan sendiri.'],
  [4, '罵', 'mà', 'memarahi', 'Turun tajam', 'Seperti membentak "Stop!" atau menjawab tegas "Nggak!" — dari atas jatuh cepat.']
];
function vTones() {
  const tc = S.adapt.tc; const conf = toneConfusion(); const tacc = S.adapt.type.tone;
  return `<section class="card glass"><h1>${t('Nada Mandarin Taiwan')}</h1><p class="muted" style="margin:8px 0 0">${t('Nada mengubah arti: 媽 麻 馬 罵 = ibu, rami, kuda, memarahi. Warna nada dipakai konsisten di seluruh app.')}</p>
    <div class="row wrap" style="margin-top:14px"><button class="btn pri" data-a="tones-drill">${ICON('tone')} ${t('Dril nada (12 soal)')}</button><button class="btn sec" data-a="hum4">${ICON('wave')} ${t('Dengar 4 nada berurutan')}</button>${tacc ? `<span class="chip">${t('Akurasi nada')}: ${Math.round((typeAcc('tone') ?? tacc.acc) * 100)}%</span>` : ''}</div>
    <p class="small muted" style="margin-top:10px">${t('Tombol 🎼 memutar kontur nada murni (tanpa kata), jadi naik-turunnya terdengar jelas. Tombol 🔊 memutar kata aslinya.')}</p></section>
  <section class="card glass"><h2>${t('4 nada + netral')}</h2><div class="tones">${TONE_INFO.map(([tn, h, p, m, n, d]) => `<div class="tone"><svg viewBox="0 0 30 30" preserveAspectRatio="none"><path d="${TONE_PATH[tn]}" fill="none" stroke="${TONE_COL[tn]}" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg><span class="ex hz t${tn}">${h}</span><b class="t${tn}">${p} · ${t('nada')} ${tn}</b><span class="small"><b>${t(n)}</b> — ${t(m)}</span><span class="small muted">${t(d)}</span>
    <div class="row" style="gap:6px;margin-top:8px;justify-content:center"><button class="btn sec small" data-a="humone" data-v="${tn}">${ICON('wave')} ${t('kontur')}</button><button class="btn sec small" data-a="sayc" data-v="${h}">${ICON('speaker')} ${h}</button></div></div>`).join('')}</div>
    <div class="rule" style="margin-top:12px"><b class="t5">${t('Nada netral')}</b> — ${t('pendek & ringan, seperti "ya" yang cepat di akhir kalimat')}: <span class="hz ex">嗎</span> ma, <span class="hz ex">的</span> de. <span class="small muted">${t('Catatan Taiwan: penutur Taiwan lebih jarang memakai nada netral dibanding Beijing, dan hampir tidak memakai akhiran -r (兒化).')}</span></div></section>
  <section class="card glass"><h2>${t('Aturan perubahan nada (sandhi)')}</h2>
    ${ruleHTML('3 + 3 → 2 + 3', t('Dua nada 3 berurutan: yang pertama berubah jadi nada 2.'), '你好', 'nǐ hǎo → <b class="t2">ní</b> hǎo')}
    ${ruleHTML('不 bù + ' + t('nada') + ' 4 → bú', t('不 jadi nada 2 kalau diikuti nada 4.'), '不是', '<b class="t2">bú</b> shì · 不要 <b class="t2">bú</b> yào')}
    ${ruleHTML('一 yī', t('Sebelum nada 4 → yí; sebelum nada 1/2/3 → yì; saat menghitung tetap yī.'), '一個', '<b class="t2">yí</b> ge · 一天 <b class="t4">yì</b> tiān')}
    ${ruleHTML(t('Nada 3 setengah'), t('Nada 3 sebelum nada lain cukup rendah saja, tidak perlu naik lagi.'), '很好吃', 'hěn hǎochī → hén hǎo chī')}
    <p class="small muted" style="margin:6px 2px 0">${t('App menulis nada kamus (seperti di TOCFL). Suara TTS otomatis menerapkan perubahan nada ini — jadi dengarkan, lalu tiru.')}</p></section>
  <section class="card glass"><h2>${t('Pasangan yang sering tertukar')}</h2>
    ${conf ? `<div class="notice">${t('Kamu paling sering mengira nada {a} sebagai nada {b} ({n}×). Soal dril nada otomatis memakai jebakan ini.', { a: conf.a, b: conf.b, n: conf.n })}</div>` : `<p class="muted small">${t('Setelah beberapa dril nada, app akan memetakan nada mana yang sering tertukar di telingamu.')}</p>`}
    <div style="overflow-x:auto;margin-top:12px"><table style="border-collapse:separate;border-spacing:4px;font-size:13px"><tr><td class="small muted">${t('benar ↓ / dijawab →')}</td>${[1, 2, 3, 4].map(b => `<td class="t${b}" style="text-align:center;font-weight:800">${b}</td>`).join('')}</tr>
    ${[0, 1, 2, 3].map(a => `<tr><td class="t${a + 1}" style="font-weight:800">${t('nada')} ${a + 1}</td>${[0, 1, 2, 3].map(b => `<td style="width:44px;height:34px;text-align:center;border-radius:10px;background:${a === b ? 'transparent' : `rgba(236,107,128,${Math.min(.75, tc[a][b] / 10)})`}">${a === b ? '·' : tc[a][b]}</td>`).join('')}</tr>`).join('')}</table></div></section>`;
}
function ruleHTML(ti, d, hz, ex) { return `<button class="rule" data-a="sayc" data-v="${hz}" style="display:block;width:100%;text-align:left"><b>${ti}</b> <span class="small muted">${ICON('speaker')}</span><div class="small muted">${d}</div><div style="margin-top:4px"><span class="hz ex">${hz}</span> ${ex}</div></button>`; }

/* ---------- STATS ---------- */
function vStats() {
  const c = counts(); const days = Object.values(S.days); const mins = Math.round(days.reduce((a, d) => a + (d.ms || 0), 0) / 60000);
  const tot = days.reduce((a, d) => a + d.ok + d.bad, 0); const okAll = days.reduce((a, d) => a + d.ok, 0);
  const tk = todayKey(); const day = dayRec(); const start = keyAdd(tk, -(7 * 17 + new Date().getDay()));
  // akurasi 7 hari terakhir (termasuk hari ini) — lebih jujur menggambarkan kondisi sekarang daripada total sejak awal
  let ok7 = 0, n7 = 0; for (let k = 0; k < 7; k++) { const d = S.days[keyAdd(tk, -k)]; if (d) { ok7 += d.ok || 0; n7 += (d.ok || 0) + (d.bad || 0); } }
  const nT = (day.ok || 0) + (day.bad || 0); const minT = day.ms ? (day.ms < 60000 ? '<1' : Math.round(day.ms / 60000)) : 0;
  const cells = []; for (let k = 0; keyDiff(keyAdd(start, k), tk) >= 0; k++) { const key = keyAdd(start, k); const x = (S.days[key] || {}).xp || 0; cells.push(`<i class="${x ? x < 60 ? 'h1' : x < 180 ? 'h2' : x < 350 ? 'h3' : 'h4' : ''} ${key === tk ? 'today' : ''}" title="${key}: ${x} XP"></i>`); }
  const last = []; for (let k = -13; k <= 0; k++) last.push(keyAdd(tk, k));
  const act = k => { const d = S.days[k] || {}; return { n: d.new || 0, a: (d.ok || 0) + (d.bad || 0) }; };
  const mx = Math.max(10, ...last.map(k => { const v = act(k); return v.n + v.a; }));
  const r = rankOf(); const st = streakNow(); const qd = questsDoneCount(day);
  const rs = typeof routeSteps === 'function' ? routeSteps().filter(x => x.done).length : 0;
  return `<section class="card glass"><h1>${t('Statistik')}</h1>
    <div class="today-strip"><div class="ts-h"><b>${t('Hari ini')}</b><span class="small muted">${fmtDate(tk)}</span></div>
      <div class="kpis kpi-today"><div class="kpi"><b>${fmtN(day.xp || 0)}</b><span>XP</span></div><div class="kpi"><b>${(day.new || 0) + (day.newx || 0)}</b><span>${t('kata baru')}</span></div>
      <div class="kpi"><b>${nT}</b><span>${t('jawaban')}${nT ? ` · ${Math.round((day.ok || 0) / nT * 100)}%` : ''}</span></div><div class="kpi"><b>${minT}</b><span>${t('menit')}</span></div>
      <div class="kpi"><b>${qd}/5</b><span>${t('misi')}</span></div><div class="kpi"><b>${rs}/5</b><span>${t('rute')}</span></div></div></div>
    <div class="kpis" style="margin-top:12px;grid-template-columns:repeat(auto-fit,minmax(110px,1fr))">
    <div class="kpi"><b>${r.n}</b><span>${t('Peringkat')} · ${t(r.name)}</span></div>
    <div class="kpi"><b>${c.intro}</b><span>${t('kata dikenal')}</span></div><div class="kpi"><b>${c.strong}</b><span>${t('kuat')}</span></div><div class="kpi"><b>${c.master}</b><span>${t('dikuasai')}</span></div>
    <div class="kpi"><b>${n7 ? Math.round(ok7 / n7 * 100) + '%' : '—'}</b><span>${t('akurasi 7 hari')}${tot ? ` · ${t('total')} ${Math.round(okAll / tot * 100)}%` : ''}</span></div>
    <div class="kpi"><b>${mins}</b><span>${t('menit belajar')}</span></div><div class="kpi"><b>${st}</b><span>${t('streak sekarang')} · ${t('terbaik')} ${Math.max(S.streak.best, st)}</span></div></div></section>
  ${rankCard()}
  ${insightCard(5)}
  <section class="card glass"><h2>${t('Kalender belajar')}</h2><div class="heat">${cells.join('')}</div><div class="small muted" style="margin-top:8px">${t('Makin ungu = makin banyak XP hari itu.')}</div></section>
  <div class="grid2">
  <section class="card glass"><h2>${t('14 hari terakhir')}</h2><div class="bars stack">${last.map(k => { const v = act(k); const [, , dd] = k.split('-'); return `<div title="${k}: ${v.n} · ${v.a}" class="${k === tk ? 'today' : ''}"><i class="b-a" style="height:${v.a / mx * 100}%"></i><i class="b-n" style="height:${v.n / mx * 100}%"></i><span>${+dd}</span></div>`; }).join('')}</div>
    <div class="legend small muted"><span><i class="b-n"></i>${t('kata baru')}</span><span><i class="b-a"></i>${t('jawaban latihan')}</span></div></section>
  <section class="card glass"><h2>${t('Akurasi per jenis soal')}</h2>${Object.keys(TYPE_NAME).map(k => { const a = typeAcc(k); const x = S.adapt.type[k]; const n = x ? (x.c2 || 0) : 0; if (!n) return ''; return `<div class="acc"><span>${t(TYPE_NAME[k])}</span><div class="bar"><i style="width:${a === null ? 0 : a * 100}%;${a !== null && a < .75 ? 'background:var(--t4)' : ''}"></i></div><span class="small" title="${n}">${a === null ? '—' : Math.round(a * 100) + '%'} <span class="muted">(${n})</span></span></div>`; }).join('') || `<p class="small muted">${t('Belum ada jawaban — mulai sesi dulu ya.')}</p>`}<div class="small muted">${t('Jenis soal terlemah otomatis lebih sering muncul.')}</div></section>
  </div>
  <section class="card glass"><h2>${t('Tingkat penguasaan per level')}</h2>${[0, 1, 2, 3].map(lv => { const t2 = lvTotal(lv); const ids = UNITS[lv].flatMap(u => u.ids); let kn = 0, sg = 0, ms = 0; ids.forEach(i => { const cd = S.cards[i]; if (!cd) return; kn++; if (cd.iv >= 7) sg++; if (cd.iv >= 21) ms++; }); return `<div class="acc lvacc"><span>${LEVELS[lv].e} ${LEVELS[lv].en}</span><div class="bar tri"><i class="k" style="width:${kn / t2 * 100}%"></i><i class="s" style="width:${sg / t2 * 100}%"></i><i class="m" style="width:${ms / t2 * 100}%"></i></div><span class="small">${kn}/${t2}</span></div>`; }).join('')}
    <div class="legend small muted"><span><i class="k"></i>${t('dikenal')}</span><span><i class="s"></i>${t('kuat')}</span><span><i class="m"></i>${t('dikuasai')}</span></div></section>
  <section class="card glass"><h2>${t('Lencana')}</h2><div class="badges">${BADGES.map(([id, e, n]) => `<div class="badge ${S.badges[id] ? 'got' : ''}"><span class="e ${S.badges[id] ? 'tint c3' : ''}">${ICON(BADGE_ICON[id] || 'award')}</span>${t(n)}</div>`).join('')}</div></section>`;
}

/* ---------- ME / SETTINGS ---------- */
let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; });
function vMe() {
  const s = S.settings; const tw = TTS.isTW(); const r = rankOf();
  const tgl = (k, on) => `<button class="toggle ${on ? 'on' : ''}" data-a="tgl" data-v="${k}" role="switch" aria-checked="${on}"></button>`;
  const seg = (k, opts, v) => `<div class="seg">${opts.map(([val, l]) => `<button class="${String(v) === String(val) ? 'on' : ''}" data-a="set" data-k="${k}" data-v="${val}">${l}</button>`).join('')}</div>`;
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const ua = navigator.userAgent;
  const ios = /iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const iosChrome = ios && /CriOS/.test(ua);
  const iosOther = ios && /FxiOS|EdgiOS|OPiOS/.test(ua);
  return `<section class="card glass"><h1>${S.name ? esc(S.name) : t('Profil')}</h1><p class="muted" style="margin:8px 0 12px">${t('Peringkat')} ${r.n} · ${t(r.name)} · ✨ ${fmtN(S.xp)} XP · ${t('Target A2')} ${fmtDate(targetDate())}</p>
    <div class="grid2"><button class="unit" data-a="goto" data-v="stats" style="min-height:0;align-items:flex-start">${TILE('stats', 'tint c3')}<b>${t('Statistik & lencana')}</b><span class="u-t">${t('Kalender, akurasi, insight')}</span></button><button class="unit" data-a="goto" data-v="tones" style="min-height:0;align-items:flex-start">${TILE('tone', 'tint c8')}<b>${t('Panduan nada')}</b><span class="u-t">${t('4 nada, sandhi, nada Taiwan')}</span></button></div></section>
  ${standalone ? '' : `<section class="card glass"><h2>${t('Pasang di HP')}</h2><p class="small muted" style="margin:0 0 10px">${iosChrome ? t('Di Chrome iPhone: ketuk tombol Bagikan (kotak dengan panah ke atas) di kanan bawah → gulir → Tambah ke Layar Utama → Tambah. App akan terbuka layar penuh, tanpa bilah browser.') : iosOther ? t('Di iPhone: ketuk tombol Bagikan di browsermu → Tambah ke Layar Utama.') : ios ? t('Di Safari iPhone: ketuk tombol Bagikan (kotak dengan panah ke atas) → Tambah ke Layar Utama → Tambah.') : t('Di Chrome: menu ⋮ → Instal aplikasi / Tambahkan ke layar utama.')}</p>
    ${ios ? `<div class="gtip">${ICON('info')}<span>${t('Di iPhone, semua browser memakai mesin Safari, jadi cara memasangnya sama lewat tombol Bagikan. Setelah terpasang, app berjalan offline dan progres tersimpan di HP. Jangan pakai mode Penjelajahan Pribadi, karena progres tidak bisa disimpan di sana.')}</span></div>
    <div class="gtip">${ICON('speaker')}<span>${t('Suara Mandarin di iPhone: Pengaturan → Aksesibilitas → Konten Lisan → Suara → Tionghoa → Chinese (Taiwan) Mei-Jia, lalu unduh. Ketuk sekali layar app sebelum memutar suara pertama kali.')}</span></div>` : ''}${deferredInstall ? `<button class="btn pri" data-a="install">${t('Pasang sekarang')}</button>` : ''}</section>`}
  <section class="card glass"><h2>${t('Bahasa')}</h2>
    <div class="set"><div class="l"><b>${t('Bahasa aplikasi')}</b><span>${t('Semua menu, tombol, dan penjelasan')}</span></div>${seg('ui', UI_LANGS.map(l => [l, LANG_NAME[l]]), s.ui)}</div>
    <div class="set"><div class="l"><b>${t('Bahasa arti utama')}</b><span>${t('Dipakai untuk pilihan jawaban & terjemahan kalimat')}</span></div>${seg('primary', MEAN_LANGS.map(l => [l, LANG_NAME[l]]), s.primary)}</div>
    ${MEAN_LANGS.map(l => `<div class="set"><div class="l"><b>${LANG_LABEL[l]} · ${LANG_NAME[l]}</b><span>${t('Tampilkan sebagai subtitel')}</span></div>${tgl('lang-' + l, s.langs[l] || l === s.primary)}</div>`).join('')}
    </section>
  <section class="card glass"><h2>${t('Belajar')}</h2>
    <div class="set"><div class="l"><b>${t('Nama panggilan')}</b><span>${t('Untuk sapaan di beranda')}</span></div><input class="sel" data-in="name" value="${esc(S.name)}" style="padding:9px 12px;border-radius:12px;border:1px solid var(--gline);background:var(--glass2);width:150px"></div>
    <div class="set"><div class="l"><b>${t('Target A2')}</b><span>${t('Kata baru per hari dihitung ulang otomatis')}</span></div>${seg('targetDays', [[60, '60'], [70, '70'], [84, '84'], [100, '100']], S.targetDays)}</div>
    <div class="set"><div class="l"><b>${t('Papan tik pinyin')}</b><span>${t('Keyboard app punya tombol nada 1–4; keyboard HP memakai angka (ni3hao3).')}</span></div>${seg('kbd', [['app', t('Keyboard app')], ['system', t('Keyboard HP')]], s.kbd || 'app')}</div>
    <div class="set"><div class="l"><b>${t('Mode pinyin')}</b><span>${t('Tanda nada, angka, atau sembunyikan')}</span></div>${seg('pinyin', [['mark', 'nǐ'], ['num', 'ni3'], ['none', 'off']], s.pinyin)}</div></section>
  <section class="card glass"><h2>${t('Suara & nada')}</h2>
    <div class="set"><div class="l"><b>${t('Efek suara')}</b></div>${tgl('sound', s.sound)}</div>
    <div class="set"><div class="l"><b>${t('Putar pelafalan otomatis')}</b></div>${tgl('autoplay', s.autoplay)}</div>
    <div class="set"><div class="l"><b>${t('Isyarat kontur nada')}</b><span>${t('Bunyi nada murni diputar sebelum kata, supaya naik-turunnya jelas')}</span></div>${tgl('toneCue', s.toneCue !== false)}</div>
    <div class="set"><div class="l"><b>${t('Suara pelafalan')}</b><span>${TTS.ok ? (TTS.voice ? (tw ? t('✅ Suara Mandarin Taiwan aktif') : t('⚠️ Belum ada suara Taiwan — memakai {v}', { v: esc(TTS.voice.lang) })) : t('Mencari suara…')) : t('Browser ini tidak mendukung suara')}</span></div>
      ${TTS.voices.length ? `<select class="sel" data-in="voice">${(TTS.ranked || TTS.voices).map(v => `<option value="${esc(v.name)}" ${TTS.voice && v.name === TTS.voice.name ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select>` : ''}</div>
    <div class="set"><div class="l"><b>${t('Kecepatan bicara')}</b><span>${t('Tombol 🐢 memutar kata per suku kata')}</span></div>${seg('rate', [[0.6, t('Pelan')], [0.75, t('Sedang')], [0.85, t('Normal')], [1, t('Cepat')]], s.rate)}</div>
    <div class="row wrap" style="margin-top:10px"><button class="btn sec small" data-a="sayc" data-v="你好，我是台灣人。">${ICON('speaker')} 你好，我是台灣人。</button><button class="btn sec small" data-a="hum4">${ICON('wave')} ${t('Dengar 4 nada berurutan')}</button></div>
    ${TTS.ok && !tw ? `<div class="notice" style="margin-top:12px">${t('Supaya logat Taiwan asli: iPhone → Pengaturan → Aksesibilitas → Konten Lisan → Suara → Chinese (Taiwan) Mei-Jia. Android → Setelan → Text-to-speech → Google → Instal data suara → Chinese (Taiwan). Lalu buka ulang app.')}</div>` : ''}</section>
  <section class="card glass"><h2>${t('Tampilan')}</h2><div class="set"><div class="l"><b>${t('Tema')}</b></div>${seg('theme', [['auto', 'Auto'], ['light', t('Terang')], ['dark', t('Redup')], ['night', t('Malam')]], s.theme)}</div>
    <div class="set"><div class="l"><b>${t('Mode ringan')}</b><span>${t('Matikan efek blur kaca supaya lebih lancar di HP.')}${document.documentElement.classList.contains('lite') ? ' ' + t('(sedang aktif)') : ''}</span></div>${seg('perf', [['auto', 'Auto'], ['lite', t('Ringan')], ['full', t('Penuh')]], s.perf || 'auto')}</div></section>
  <section class="card glass"><h2>${t('Data & progres')}</h2><p class="small muted" style="margin:0 0 10px">${t('Progres tersimpan otomatis di perangkat ini. Ekspor cadangan sesekali.')}</p>
    <div class="row wrap"><button class="btn sec" data-a="export">${ICON('download')} ${t('Ekspor cadangan')}</button><label class="btn sec" style="cursor:pointer">${ICON('upload')} ${t('Impor')}<input type="file" accept=".json,application/json" data-in="import" hidden></label><button class="btn ghost" data-a="reset" style="color:var(--t4)">${t('Reset semua')}</button></div></section>`;
}
function onVoices() { const ae = document.activeElement; if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA')) return; if (typeof S !== 'undefined' && S && !SES && ROUTE === 'me' && !$('.overlay') && $('#app').children.length) { const y = scrollY; render(); scrollTo(0, y); } }

/* ---------- SHEET "LAINNYA" ---------- */
function moreSheet() {
  const rest = ROUTES.filter(r => !TABS.includes(r[0]));
  openModal(`<div class="q-kind">${t('Semua menu')}</div><h2 style="margin:6px 0 14px">Xiǎobù</h2>
    <div class="menugrid">${ROUTES.map(([r, ic, lbl]) => `<button class="menutile ${ROUTE === r ? 'on' : ''}" data-a="goto" data-v="${r}">${TILE(ic, 'tint ' + (ROUTE_COLOR[r] || 'c0'))}<b>${t(TAB_SHORT[r] || lbl)}</b><span>${t(ROUTE_DESC[r] || '')}</span></button>`).join('')}</div>`);
}

/* ---------- MODAL ---------- */
function openModal(html, cls = '') {
  closeModal();
  const o = document.createElement('div'); o.className = 'overlay'; o.innerHTML = `<div class="sheet ${cls}" role="dialog" aria-modal="true"><button class="x" data-a="close" aria-label="✕">✕</button>${html}</div>`;
  o.addEventListener('click', e => { if (e.target === o) closeModal(); });
  document.body.appendChild(o); FX.play('flip');
}
function closeModal() { if (typeof sayT !== 'undefined') clearTimeout(sayT); document.querySelectorAll('.overlay').forEach(o => o.remove()); if (typeof stopLoops === 'function') stopLoops(); HW = null; }

/* ---------- ONBOARDING ---------- */
function onboarding() {
  const o = document.createElement('div'); o.className = 'overlay'; o.id = 'onb';
  o.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" style="text-align:center">
    <div style="display:flex;justify-content:center">${mascot('wave', 120)}</div><h1 style="margin:6px 0">Xiǎobù</h1><p class="muted small" style="margin:0 0 6px">你好！我是哈吉咪 Hacimi</p>
    <p class="muted">Bahasa aplikasi · App language · Wika ng app</p>
    <div class="row wrap" style="justify-content:center;margin:18px 0 6px" id="onLang">
      <button class="btn pri big" data-v="id">Bahasa Indonesia</button>
      <button class="btn pri big" data-v="en">English</button>
      <button class="btn pri big" data-v="tl">Filipino</button>
      <button class="btn pri big" data-v="vi">Tiếng Việt</button>
    </div>
    <p class="small muted">${t('Bisa diganti kapan saja di menu Saya.')}</p></div>`;
  document.body.appendChild(o);
  $('#onLang').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    FX.ensure(); FX.play('ok'); S.settings.ui = b.dataset.v; S.settings.primary = b.dataset.v; S.settings.primarySet = false; S.settings.langs = { [b.dataset.v]: true, en: true }; S.settings.langsSet = true;
    applyTheme(); save(true); o.remove(); onboarding2();
  });
}
function onboarding2() {
  const o = document.createElement('div'); o.className = 'overlay'; o.id = 'onb';
  o.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" style="text-align:center">
    <div style="display:flex;justify-content:center">${mascot('joy', 110)}</div><h1 style="margin:6px 0">${t('Selamat datang di Xiǎobù!')}</h1>
    <p class="muted">${t('Langkah kecil tiap hari → Mandarin Taiwan level A2. {w} kata TOCFL, {c} hanzi dengan cerita bentuk, misi harian, dan suara bernada asli.', { w: A2N, c: CHAR_ORDER.length })}</p>
    <div style="text-align:left;margin-top:18px">
      <div class="set"><div class="l"><b>${t('Nama panggilan')}</b></div><input id="onName" placeholder="${t('namamu')}" style="padding:10px 14px;border-radius:14px;border:1px solid var(--gline);background:var(--glass2);width:160px"></div>
      <div class="set"><div class="l"><b>${t('Target A2 dalam')}</b><span id="onRate">${Math.ceil(A2N / 70)} ${t('kata baru/hari')}</span></div><div class="seg" id="onT">${[[60, '60'], [70, '70'], [84, '84']].map(([v, l]) => `<button class="${v === 70 ? 'on' : ''}" data-v="${v}">${l} ${t('hr')}</button>`).join('')}</div></div>
    </div>
    <div class="row wrap" style="justify-content:center;margin-top:18px"><button class="btn pri big" id="onGo">${t('Mulai dari nol')}</button><button class="btn sec" id="onTest">${t('Sudah tahu dasar? Tes lompat')}</button></div>
    <p class="small muted" style="margin-top:12px">${t('Progres disimpan di perangkat ini. Tidak perlu akun.')}</p></div>`;
  document.body.appendChild(o);
  let T = 70;
  $('#onT').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; FX.play('tap'); $('#onT').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); T = +b.dataset.v; $('#onRate').textContent = Math.ceil(A2N / T) + ' ' + t('kata baru/hari'); });
  const finish = test => {
    FX.ensure(); S.name = $('#onName').value.trim().slice(0, 24); S.targetDays = T; S.start = todayKey(); S.onboarded = true;
    const d = dayRec(); delete d.plan; delete d.q; d.qd = {}; save(true); o.remove(); render(); FX.play('level');
    if (test) startSession(buildPlacement(0), { title: t('Tes lompat'), placeLv: 0 });
  };
  $('#onGo').onclick = () => finish(false); $('#onTest').onclick = () => finish(true);
}


/* ---------- POLA INGATAN HANZI ---------- */
function radicalOf(c) {
  const st = (CH[c] || ['', ''])[1] || '';
  return RADICALS.find(r => r[0] !== c && st.includes(r[0])) || null;
}
function charFamily(c, rad, n = 8) {
  if (!rad) return [];
  return CHAR_ORDER.filter(x => x !== c && CH[x] && (CH[x][1] || '').includes(rad[0])).slice(0, n);
}
function charPatternBlock(c) {
  const rad = radicalOf(c); const fam = charFamily(c, rad);
  const words = (CHAR_WORDS[c] || []).slice(0, 3);
  if (!rad && !words.length) return '';
  return `<div class="mnem">
    <div class="gpill">${ICON('grid')} ${t('Pola pengingat')}</div>
    ${rad ? `<div class="eq" style="margin-top:10px"><span class="pc"><span class="hz">${rad[0]}</span><small>${esc(radMean(rad))}</small></span><span class="op">→</span><span class="small">${t('setiap hanzi dengan bagian ini hampir selalu berkaitan dengan "{m}"', { m: esc(radMean(rad)) })}</span></div>
    ${fam.length ? `<div class="small muted" style="margin-top:8px">${t('Keluarga bentuk yang sama')}: ${fam.map(x => `<button class="chip" data-a="char" data-v="${x}"><span class="hz">${x}</span> ${esc(charMean(x))}</button>`).join(' ')}</div>` : ''}` : ''}
    ${words.length ? `<div class="small muted" style="margin-top:10px">${t('Dipakai di')}: ${words.map(i => `<button class="chip" data-a="word" data-v="${i}"><span class="hz">${esc(W[i].w)}</span> ${esc(meanP(W[i]))}</button>`).join(' ')}</div>` : ''}
    <div class="gtip" style="margin-top:10px">${ICON('lightbulb')}<span>${t('Cara pakai: ucapkan cerita bentuknya sambil menulis goresannya. Gerakan + cerita + bunyi bersamaan membuat ingatan jauh lebih lengket.')}</span></div>
  </div>`;
}
function mnemonicBlock(w) {
  const cs = [...w.s].filter(isHan);
  if (!cs.length) return '';
  const parts = cs.map(c => ({ c, g: charMean(c) }));
  const known = parts.filter(p => p.g);
  const rhythm = aligned(w) ? w.t.map(x => (x === 5 ? '·' : x)).join('–') : '';
  const rad = radicalOf(cs[0]);
  return `<div class="mnem">
    <div class="gpill">${ICON('lightbulb')} ${t('Pola ingatan kata ini')}</div>
    ${charBreak(w)}
    ${known.length >= 2 ? `<div class="gtip">${ICON('quote')}<span>${t('Bayangkan satu gambar konyol yang menyambung keduanya — makin aneh, makin mudah diingat.')}</span></div>` : ''}
    ${rhythm ? `<div class="gtip">${ICON('wave')}<span>${t('Irama nada')}: <b>${rhythm}</b> · ${t('ketuk meja mengikuti irama ini sambil mengucapkannya.')}</span></div>` : ''}
    ${rad ? `<div class="gtip">${ICON('grid')}<span>${t('Petunjuk bagian')}: <span class="hz">${rad[0]}</span> = ${esc(radMean(rad))}.</span></div>` : ''}
    <div class="row wrap" style="margin-top:10px;gap:8px"><button class="btn sec small" data-a="writeword" data-v="${w.i}">${ICON('write')} ${t('Tulis sambil mengingat')}</button></div>
  </div>`;
}

/* ---------- HALAMAN MENULIS ---------- */
const STROKE_RULES = [
  ['atas ke bawah', '三', 'Goresan atas ditulis lebih dulu.'],
  ['kiri ke kanan', '什', 'Bagian kiri selesai dulu, baru kanan.'],
  ['mendatar sebelum menurun', '十', 'Garis mendatar dulu, lalu garis tegak memotongnya.'],
  ['luar sebelum dalam', '同', 'Bingkai luar dulu, isinya kemudian.'],
  ['kotak ditutup terakhir', '國', 'Isi dulu, baru tutup pintu bawahnya.'],
  ['tengah sebelum sisi', '小', 'Batang tengah dulu, lalu sayap kiri dan kanan.']
];
function vWrite() {
  const seen = CHAR_ORDER.filter(c => CHAR_WORDS[c].some(i => S.cards[i]));
  const done = Object.keys(S.hzWrite || {}).length;
  const today = dayRec().write || 0;
  const list = (seen.length ? seen : CHAR_ORDER.slice(0, 40)).slice(0, 120);
  return `<section class="card glass"><h1>${t('Latihan menulis hanzi')}</h1>
    <p class="muted" style="margin:8px 0 12px">${t('Tulis hanzi dengan jarimu di papan kotak. App mengecek tiap goresan: urutan salah akan ditolak, dan setelah dua kali meleset akan muncul petunjuk arah. Menulis membuat bentuk hanzi jauh lebih lengket daripada sekadar membaca.')}</p>
    <div class="row wrap"><button class="btn pri" data-a="writedrill">${ICON('write')} ${t('Mulai latihan (4 kata)')}</button><button class="btn sec" data-a="writetoday">${ICON('seed')} ${t('Tulis hanzi hari ini')}</button></div>
    <div class="row wrap" style="margin-top:12px"><span class="chip">${ICON('check')} ${t('{n} hanzi pernah ditulis', { n: done })}</span><span class="chip">${ICON('clock')} ${t('{n} hari ini', { n: today })}</span></div>
    ${navigator.onLine ? '' : `<div class="notice" style="margin-top:12px">${t('Papan tulis butuh internet sekali saja untuk mengunduh data goresan.')}</div>`}</section>
  <section class="card glass"><h2>${t('6 aturan urutan goresan')}</h2><p class="small muted" style="margin:-4px 0 12px">${t('Hampir semua hanzi patuh pada enam pola ini. Hafal polanya, bukan tiap karakternya.')}</p>
    <div class="grid2">${STROKE_RULES.map(([n, c, d], k) => `<button class="unit" data-a="writechar" data-v="${c}" style="align-items:flex-start;min-height:0"><span class="u-t">${k + 1}. ${t(n)}</span><span class="hz" style="font-size:34px">${c}</span><span class="u-t">${t(d)}</span></button>`).join('')}</div></section>
  <section class="card glass"><h2>${t('Pilih hanzi untuk ditulis')}</h2>
    <div class="hzgrid">${list.map(c => { const n = (S.hzWrite || {})[c] || 0; return `<button class="hzcell ${n ? 'known' : ''}" data-a="writechar" data-v="${c}"><span class="c hz">${c}</span><span class="m">${n ? n + '×' : esc(charMean(c))}</span></button>`; }).join('')}</div></section>`;
}

/* ---------- HALAMAN MANDARIN PABRIK (ASE / semikonduktor) ---------- */
const semiIds = () => UNITS[SEMI_LV].flatMap(u => u.ids);
function vFab() {
  const ids = semiIds(); const known = ids.filter(i => S.cards[i]).length;
  const master = ids.filter(i => mastery(card(i)) >= 3).length;
  const byCat = {}; UNITS[SEMI_LV].forEach(u => { (byCat[u.ctx] = byCat[u.ctx] || []).push(u); });
  const gname = g => { const r = SEMI_PHRASE_GROUPS.find(x => x[0] === g); return r ? (isVI() ? r[1][3] : L3(r[1])) : g; };
  return `<section class="card glass"><h1>${t('Mandarin Pabrik')}</h1>
    <p class="muted" style="margin:8px 0 12px">${t('Kosakata Mandarin untuk kerja di industri semikonduktor Taiwan — khususnya equipment engineering di pabrik perakitan & uji seperti ASE (日月光). Isinya istilah yang benar-benar dipakai di lantai produksi: nama proses, bagian mesin, perawatan, kualitas, shift, dan keselamatan.')}</p>
    <div class="gtip">${ICON('lightbulb')}<span>${t('Cara pakai yang disarankan: tetap jalankan sesi A2 harianmu, lalu tambahkan 5–8 istilah pabrik per hari. Semua istilah di sini masuk ke sistem pengulangan yang sama, jadi tidak perlu aplikasi terpisah.')}</span></div>
    <div class="row wrap" style="margin-top:14px"><button class="btn pri" data-a="semilearn">${ICON('seed')} ${t('Pelajari 8 istilah baru')}</button><button class="btn sec" data-a="semiprac">${ICON('target')} ${t('Latih istilah yang sudah dikenal')}</button></div>
    <div class="row wrap" style="margin-top:12px"><span class="chip">${ICON('check')} ${known}/${ids.length}</span><span class="chip">${ICON('award')} ${master} ${t('dikuasai')}</span></div></section>
  <section class="card glass"><h2>${t('Istilah per bidang')}</h2>
    ${SEMI_CATS.map((cat, ci) => { const us = byCat[cat.k] || []; const all = us.flatMap(u => u.ids); const kn = all.filter(i => S.cards[i]).length;
      return `<div style="margin-top:14px"><div class="row" style="gap:10px;margin-bottom:8px">${TILE(cat.ic, 'tint c' + (ci % 8))}<b class="grow">${esc(semiCatName(cat.k))}</b><span class="small muted">${kn}/${all.length}</span></div>
        <div class="units">${us.map(u => unitTile(u, null)).join('')}</div></div>`; }).join('')}</section>
  <section class="card glass"><h2>${t('Kalimat siap pakai di lantai produksi')}</h2>
    <p class="small muted" style="margin:-4px 0 12px">${t('Ketuk kalimat untuk mendengarnya. Kalimat-kalimat ini memakai pola tata bahasa yang sama dengan yang kamu pelajari di menu Tata bahasa.')}</p>
    ${SEMI_PHRASE_GROUPS.map(([g]) => `<div style="margin-top:12px"><div class="gpill">${esc(gname(g))}</div>
      ${SEMI_PHRASES.filter(p2 => p2.g === g).map(p2 => `<button class="gex" style="width:100%;text-align:left" data-a="gsay" data-v="${esc(p2.zh)}">${ICON('speaker')}<span><span class="zh hz">${esc(p2.zh)}</span><div class="py">${esc(p2.py)}</div><div class="tr">${esc(L3(p2.m))}</div></span></button>`).join('')}</div>`).join('')}</section>
  <section class="card glass"><h2>${t('Contoh laporan singkat saat serah terima shift')}</h2>
    <div class="gtip">${ICON('quote')}<span class="hz" style="font-size:17px">機台三號，早上八點異常停機，原因是吸嘴堵塞。我已經更換吸嘴、做完點檢，現在復機正常。良率九十八，這班沒有其他異常。</span></div>
    <p class="small muted" style="margin-top:10px">${t('Pola laporannya selalu sama: mesin mana → apa yang terjadi → penyebab → tindakan → status sekarang → catatan tambahan. Hafalkan urutan ini, lalu tinggal ganti kata bendanya.')}</p></section>`;
}

/* ---------- HALAMAN TATA BAHASA ---------- */
let GVS = { tier: 1, open: null };
function vGrammar() {
  const list = GRAMMAR.filter(g => g.lv === GVS.tier);
  const learned = GRAMMAR.filter(g => gramSeen(g.k)).length;
  return `<section class="card glass"><h1>${t('Tata bahasa')}</h1>
    <p class="muted" style="margin:8px 0 12px">${t('Tata bahasa Mandarin tidak punya konjugasi, jenis kelamin, atau jamak. Yang menentukan arti adalah urutan kata. Di sini urutannya dipecah jadi {n} pola, dari rangka kalimat sampai kalimat majemuk — masing-masing dengan rumus, contoh, dan kesalahan yang paling sering terjadi.', { n: GRAMMAR.length })}</p>
    <div class="row wrap"><div class="seg">${[1, 2, 3].map(v => `<button class="${GVS.tier === v ? 'on' : ''}" data-a="gtier" data-v="${v}">${t('Tingkat')} ${v}</button>`).join('')}</div><span class="chip">${ICON('check')} ${learned}/${GRAMMAR.length}</span></div>
    <div class="gtip" style="margin-top:12px">${ICON('lightbulb')}<span><b>${gramTxt(GRAM_TIER[GVS.tier - 1])}</b> · ${t('Ketuk satu pola untuk membukanya, lalu ketuk contohnya untuk mendengar.')}</span></div></section>
  ${list.map(g => gCard(g)).join('')}
  <section class="card glass"><h2>${t('Latih polanya')}</h2><p class="small muted" style="margin:-4px 0 12px">${t('Cara tercepat menghafal pola adalah memakainya: susun kalimat dan isi bagian yang hilang.')}</p>
    <div class="row wrap"><button class="btn pri" data-a="build">${ICON('blocks')} ${t('Susun kalimat')}</button><button class="btn sec" data-a="cloze">${ICON('puzzle')} ${t('Lengkapi kalimat')}</button></div></section>`;
}
function gCard(g) {
  const open = GVS.open === g.k;
  return `<section class="gcard">
    <button class="row" style="width:100%;text-align:left;gap:12px" data-a="gopen" data-v="${g.k}">
      ${TILE(g.icon, 'tint c' + (g.lv + 4))}<span class="grow"><b style="font-size:16px">${esc(gramTxt(g.name))}</b><div class="small muted hz" style="margin-top:2px">${esc(g.form)}</div></span>
      <span class="small muted">${gramSeen(g.k) ? ICON('check') : ICON('chevron')}</span></button>
    ${open ? `<div style="margin-top:10px">
      <div class="gform hz">${esc(g.form)}</div>
      <p style="margin:6px 0 0">${esc(gramTxt(g.gloss))}</p>
      <div class="gtip">${ICON('lightbulb')}<span>${esc(gramTxt(g.tip))}</span></div>
      <div class="gtip">${ICON('info')}<span>${esc(gramTxt(g.warn))}</span></div>
      <div style="margin-top:10px">${g.ex.map(e => `<button class="gex" style="width:100%;text-align:left" data-a="gsay" data-v="${esc(e[0])}">${ICON('speaker')}<span><span class="zh hz">${esc(e[0])}</span><div class="py">${esc(e[1])}</div><div class="tr">${esc(L3(e, 2))}</div></span></button>`).join('')}</div>
      <div class="row wrap" style="margin-top:12px"><button class="btn ${gramSeen(g.k) ? 'sec' : 'pri'} small" data-a="gmark" data-v="${g.k}">${gramSeen(g.k) ? t('Sudah dipahami') : t('Tandai sudah paham (+10 XP)')}</button><button class="btn sec small" data-a="cloze">${ICON('puzzle')} ${t('Latih')}</button></div>
    </div>` : ''}</section>`;
}
/* ---------- ACTIONS ---------- */
function hzPool() { const p = CHAR_ORDER.filter(c => CHAR_WORDS[c].some(i => S.cards[i]) && CH[c]); return p.length >= 4 ? p : CHAR_ORDER.slice(0, 24); }
const ACT = {
  smart: () => startSession(buildSmart(), { title: t('Sesi pintar'), rebuild: () => buildSmart() }),
  'q-new': () => startSession(buildSmart({ bigNew: true }), { rebuild: () => buildSmart({ bigNew: true }) }),
  'q-rev': () => startSession(buildSmart({ noNew: true }), { rebuild: () => buildSmart({ noNew: true }) }),
  'q-prac': () => startSession(buildPractice(15), { rebuild: () => buildPractice(15) }),
  'q-prac2': () => startSession(buildPractice(25), { rebuild: () => buildPractice(25) }),
  'q-tone': () => ACT['tones-drill'](), 'q-hz': () => ACT.hzquiz(), 'q-combo': () => ACT.smart(), 'q-match': () => ACT.match(),
  'q-sent': () => ACT.sent(),
  'q-story': () => { const c0 = todayChar(); const c = S.stories[c0] ? (CHAR_ORDER.find(x => CH[x] && !S.stories[x] && charSeen(x)) || CHAR_ORDER.find(x => CH[x] && !S.stories[x]) || c0) : c0; go('hanzi'); setTimeout(() => openChar(c), 60); },
  'q-listen': () => (voiceOK() ? ACT['drill-listen']() : ACT.lfill()), 'q-type': () => ACT['drill-type'](),
  'tones-drill': () => startSession(buildTone(12), { title: t('Dril nada'), rebuild: () => buildTone(12) }),
  'drill-tone': () => ACT['tones-drill'](),
  'drill-listen': () => { if (!voiceOK()) return toast(t('🔇 Suara belum tersedia di perangkat ini')); startSession(buildPractice(14, 'listen'), { rebuild: () => buildPractice(14, 'listen') }); },
  'drill-type': () => startSession(buildPractice(12, 'type'), { rebuild: () => buildPractice(12, 'type') }),
  'drill-mc_mean': () => startSession(buildPractice(14, 'mc_mean')), 'drill-mc_hanzi': () => startSession(buildPractice(14, 'mc_hanzi')),
  'drill-hz': () => ACT.hzquiz(),
  'drill-cloze': () => ACT.cloze(), 'drill-build': () => ACT.build(),
  cloze: () => startSession(buildSent(10, 'cloze'), { title: t('Lengkapi kalimat'), rebuild: () => buildSent(10, 'cloze') }),
  build: () => startSession(buildSent(8, 'build'), { title: t('Susun kalimat'), rebuild: () => buildSent(8, 'build') }),
  sent: () => startSession(buildSent(12), { title: t('Latihan kalimat'), rebuild: () => buildSent(12) }),
  match: () => startSession(buildMatch(), { rebuild: buildMatch }),
  hzquiz: () => startSession(buildHz(hzPool()), { rebuild: () => buildHz(hzPool()) }),
  writedrill: () => startSession(buildWriteWords(4), { title: t('Latihan menulis'), rebuild: () => buildWriteWords(4) }),
  'drill-write': () => ACT.writedrill(),
  'q-write': () => ACT.writedrill(),
  writetoday: () => { const ids = Object.keys(S.cards).map(Number).filter(i => S.cards[i].add === todayKey() && !S.cards[i].skip && W[i].m); const mk = () => (ids.length ? buildWriteWords(5, shuffle(ids)) : buildWriteWords(4)); startSession(mk(), { title: t('Latihan menulis'), rebuild: mk }); },
  writeword: b => { const i = +b.dataset.v; closeModal(); startSession(writeItemsFor(i), { title: t('Latihan menulis'), rebuild: () => writeItemsFor(i) }); },
  writechar: b => { const c = b.dataset.v; closeModal(); startSession(buildWrite(1, [c]), { title: t('Latihan menulis'), rebuild: () => buildWrite(1, [c]) }); },
  semilearn: () => { const fresh = semiIds().filter(i => !S.cards[i]).slice(0, 8); if (!fresh.length) return toast(t('Semua istilah pabrik sudah kamu kenal — lanjut latih saja.')); startSession(interleave(fresh, []), { title: t('Mandarin Pabrik') }); },
  semiprac: () => { const kn = semiIds().filter(i => S.cards[i]); if (kn.length < 4) return toast(t('Pelajari beberapa istilah dulu ya.')); startSession(shuffle(kn).slice(0, 14).map(i => ({ type: chooseType(i), wid: i })), { title: t('Mandarin Pabrik') }); },
  gtier: b => { GVS.tier = +b.dataset.v; GVS.open = null; render(); },
  gopen: b => { GVS.open = GVS.open === b.dataset.v ? null : b.dataset.v; render(); },
  gmark: b => { gramMark(b.dataset.v); toast(t('Pola ditandai sudah paham')); render(); },
  gsay: b => { FX.ensure(); TTS.speak(b.dataset.v); },
  leech: () => { const ids = Object.keys(S.cards).map(Number).filter(i => isLeech(S.cards[i]) || S.cards[i].lp >= 2); if (ids.length < 3) return toast(t('🌟 Belum ada kata bandel — ingatanmu mantap!')); startSession(shuffle(ids).slice(0, 14).map(i => ({ type: chooseType(i), wid: i, hint: true }))); },
  unit: b => openUnit(b.dataset.v),
  ulearn: b => { const [lv, k] = b.dataset.v.split('-').map(Number); closeModal(); startSession(buildUnitLearn(UNITS[lv][k]), { title: t('Unit') }); },
  uprac: b => { const [lv, k] = b.dataset.v.split('-').map(Number); closeModal(); startSession(buildUnitPractice(UNITS[lv][k]), { rebuild: () => buildUnitPractice(UNITS[lv][k]) }); },
  place: b => startSession(buildPlacement(+b.dataset.v), { title: t('Tes lompat'), placeLv: +b.dataset.v }),
  lvtoggle: b => { const lv = +b.dataset.v; const cur = b.getAttribute('aria-expanded') === 'true'; VS.openLv = cur ? -1 : lv; render(); },
  word: b => openWord(+b.dataset.v),
  learnone: b => { closeModal(); startSession(interleave([+b.dataset.v], [])); },
  char: b => openChar(b.dataset.v),
  say: b => say(W[+b.dataset.v], b.dataset.slow),
  sayc: b => { FX.ensure(); TTS.speak(b.dataset.v); },
  syl: b => { FX.ensure(); const tn = +b.dataset.t; if (S.settings.toneCue !== false && tn) TONE.play([tn], { force: true }); setTimeout(() => TTS.speak(b.dataset.v, 0.55), tn ? 650 : 0); },
  hum: b => { FX.ensure(); TONE.play(b.dataset.v.split('').map(Number), { force: true }); },
  humone: b => { FX.ensure(); TONE.demo(+b.dataset.v); },
  hum4: () => { FX.ensure(); TONE.compare(); toast('🎼 ' + t('nada 1 · 2 · 3 · 4')); },
  hwanim: () => HW && HW.animateCharacter(),
  hwquiz: () => { if (!HW) return; toast('✍️ ' + t('Tulis goresan satu per satu di kotak')); HW.quiz({ onComplete: s => { FX.play('ok', 4); toast(s.totalMistakes ? t('Selesai dengan {n} koreksi', { n: s.totalMistakes }) : t('Sempurna! 🌟')); } }); },
  savestory: b => { const c = b.dataset.v; const v = $('#story').value.trim(); if (!v) return toast(t('Tulis dulu ceritanya ✎')); const isNew = !S.stories[c]; S.stories[c] = v.slice(0, 400); if (isNew) { dayRec().story = (dayRec().story || 0) + 1; addXP(15); } FX.play('ok', 3); toast(isNew ? t('✎ Cerita disimpan +15 XP') : t('✎ Cerita diperbarui')); checkQuests(); save(); closeModal(); render(); },
  delstory: b => { delete S.stories[b.dataset.v]; save(); closeModal(); render(); },
  close: () => closeModal(),
  goto: b => { closeModal(); go(b.dataset.v); },
  more: () => moreSheet(),
  gotofab: () => go('fab'),
  hzlv: b => { VS.hzLv = +b.dataset.v; render(); },
  wlv: b => { VS.lv = +b.dataset.v; VS.lim = 120; render(); },
  wst: b => { VS.st = b.dataset.v; VS.lim = 120; render(); },
  wmore: () => { VS.lim += 200; render(); },
  wqclear: () => { VS.q = ''; VS.focus = true; render(); },
  tgl: b => { const k = b.dataset.v; const s = S.settings; if (k.startsWith('lang-')) { const l = k.slice(5); if (l === s.primary) return toast(t('Bahasa arti utama selalu tampil')); s.langsSet = true; s.langs[l] = !s.langs[l]; } else s[k] = !s[k]; save(); render(); },
  set: b => {
    const k = b.dataset.k; let v = b.dataset.v;
    if (k === 'targetDays') { S.targetDays = +v; S.start = todayKey(); const d = dayRec(); replanDay(); toast(t('🎯 Target {v} hari · {n} kata baru hari ini', { v, n: d.plan.new })); }
    else { if (k === 'rate') v = +v; S.settings[k] = v; if (k === 'primary') { S.settings.langs[v] = true; S.settings.primarySet = v !== S.settings.ui; } if (k === 'ui' && !S.settings.primarySet) { S.settings.primary = v; S.settings.langs[v] = true; } if (k === 'theme' || k === 'perf' || k === 'ui') applyTheme(); if (k === 'rate') TTS.speak('你好', v); }
    save(); render();
  },
  export: () => { const blob = new Blob([JSON.stringify(S)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `xiaobu-backup-${todayKey()}.json`; document.body.appendChild(a); a.click(); a.remove(); toast(t('⬇️ Cadangan diunduh')); },
  reset: () => { if (!confirm(t('Hapus SEMUA progres? Ini tidak bisa dibatalkan.'))) return; SAVE_LOCK = true; clearTimeout(saveT); localStorage.removeItem(KEY); location.hash = ''; location.reload(); },
  install: async () => { if (!deferredInstall) return; deferredInstall.prompt(); await deferredInstall.userChoice; deferredInstall = null; render(); },
  tap: () => FX.play('tap')
};
const START_ACTS = new Set(['semilearn', 'semiprac', 'writedrill', 'writetoday', 'writeword', 'writechar', 'drill-write', 'q-write', 'smart', 'q-new', 'q-rev', 'q-prac', 'q-prac2', 'q-tone', 'q-hz', 'q-combo', 'q-match', 'q-listen', 'q-type', 'q-sent', 'tones-drill', 'drill-tone', 'drill-listen', 'drill-type', 'drill-mc_mean', 'drill-mc_hanzi', 'drill-hz', 'drill-cloze', 'drill-build', 'cloze', 'build', 'sent', 'match', 'hzquiz', 'leech', 'ulearn', 'uprac', 'place', 'learnone', 'q-story', 'reset']);
let lastActEl = null, lastActT = 0;
document.addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b || b.closest('#session') && !b.closest('.overlay')) return;
  const f = ACT[b.dataset.a]; if (!f) return;
  if (SES && START_ACTS.has(b.dataset.a)) { toast(t('Selesaikan atau tutup sesi yang sedang berjalan dulu ✨')); return; }
  const now = Date.now(); if (b.dataset.a !== 'tap' && b === lastActEl && now - lastActT < 350) return; lastActEl = b; lastActT = now;
  FX.ensure(); if (b.dataset.a !== 'tap') FX.play('tap');
  try { f(b, e); } catch (err) { console.error('action', b.dataset.a, err); toast(t('🩹 Ups, ada gangguan kecil. Coba lagi ya.')); }
});
let wqT = 0;
document.addEventListener('input', e => {
  const k = e.target.dataset && e.target.dataset.in; if (!k) return;
  if (e.isComposing) return;   // tunggu sampai IME (pinyin/zhuyin) selesai menyusun huruf
  if (k === 'wq') { VS.q = e.target.value; clearTimeout(wqT); wqT = setTimeout(() => { VS.lim = 120; VS.focus = true; render(); }, 220); }
  if (k === 'name') { S.name = e.target.value.slice(0, 24); save(); }
});
document.addEventListener('compositionend', e => { if (e.target.dataset && e.target.dataset.in) e.target.dispatchEvent(new Event('input', { bubbles: true })); });
document.addEventListener('change', e => {
  const k = e.target.dataset && e.target.dataset.in; if (!k) return;
  if (k === 'voice') { S.settings.voice = e.target.value; TTS.voice = TTS.voices.find(v => v.name === e.target.value) || TTS.voice; save(); TTS.speak('你好，很高興認識你。'); render(); }
  if (k === 'import') {
    const f = e.target.files[0]; if (!f) return; const r = new FileReader();
    r.onload = () => { try { const d = JSON.parse(r.result); if (!d || !d.cards || !d.settings) throw 0; if (!confirm(t('Timpa progres di perangkat ini dengan cadangan?'))) return; SAVE_LOCK = true; clearTimeout(saveT); localStorage.setItem(KEY, JSON.stringify(d)); location.reload(); } catch (x) { toast(t('⚠️ File cadangan tidak valid')); } };
    r.readAsText(f);
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('.overlay') && !$('#onb')) closeModal(); });

/* ---------- GLOBAL SAFETY NET ---------- */
let errCount = 0;
function onGlobalError(err) {
  console.error('uncaught', err);
  if (++errCount > 20) return;
  try {
    const log = JSON.parse(localStorage.getItem('xiaobu.err') || '[]'); log.push([new Date().toISOString(), String(err && (err.stack || err.message || err)).slice(0, 400)]);
    localStorage.setItem('xiaobu.err', JSON.stringify(log.slice(-15)));
  } catch (e) {}
  if (SES && $('#session')) { const body = $('#sbody'); if (!body || !body.children.length) recoverSession(err); }
}
window.addEventListener('error', e => onGlobalError(e.error || e.message));
window.addEventListener('unhandledrejection', e => onGlobalError(e.reason));

/* ---------- BOOT ---------- */
function boot() {
  load(); applyTheme();
  try { const d = dayRec(); if (d.q && !d.qd) { d.qd = {}; d.q.forEach((q, k) => { if (questDone(q, d)) d.qd[k] = 1; }); } } catch (e) {}
  if (matchMedia('(prefers-color-scheme: dark)').addEventListener) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  TTS.init(); render();
  const unlock = () => { FX.ensure(); TTS.unlock(); };
  ['touchend', 'pointerdown', 'click'].forEach(ev => addEventListener(ev, unlock, { once: true, passive: true }));
  if (!S.onboarded) onboarding();
  let lastDay = todayKey();
  setInterval(() => { if (todayKey() !== lastDay && !SES) { lastDay = todayKey(); render(); } }, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && todayKey() !== lastDay && !SES) { lastDay = todayKey(); render(); } });
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').then(reg => { reg.update && reg.update().catch(() => {}); }).catch(() => {});
    const hadCtrl = !!navigator.serviceWorker.controller; let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadCtrl || reloaded) return;
      if (SES) { window.__xbUpdate = true; return; }
      reloaded = true; save(true); location.reload();
    });
  }
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
}
