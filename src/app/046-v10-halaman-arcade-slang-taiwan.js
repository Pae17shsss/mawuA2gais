/* ========== v10: halaman Arcade & Slang Taiwan ========== */

/* ---------- ARCADE ---------- */
function vArcade() {
  const g = arcState(); const d = g.diff || 'normal'; const pool = arcPool().length;
  const seen = MON_TYPES.concat(['dragon']).map((tp, k) => ({ tp, got: tp === 'dragon' ? g.best.stage >= 5 : g.best.stage > k, k }));
  return `<section class="arc-hero">${arcBG(ARC_THEMES[(g.plays || 0) % ARC_THEMES.length])}
      <div class="ah-t"><div class="gpill" style="background:rgba(255,255,255,.15);color:#fff;border-color:rgba(255,255,255,.3)">🕹 ${t('Arcade')}</div>
        <h1><span class="hz">漢字</span> Monster</h1>
        <p>${t('Kalahkan monster dengan kata yang tepat: baca artinya, pilih hanzinya sebelum waktu habis. Kata yang hampir kamu lupa lebih sering keluar.')}</p>
        <div class="row wrap" style="gap:8px"><button class="btn pri big" data-a="arcade">▶ ${t('Main sekarang')}</button>
          <div class="seg" style="background:rgba(255,255,255,.15)">${['easy', 'normal', 'hard'].map(k => `<button class="${d === k ? 'on' : ''}" style="color:${d === k ? '' : '#fff'}" data-a="arcdiff" data-v="${k}">${t({ easy: 'Mudah', normal: 'Normal', hard: 'Sulit 🎧' }[k])}</button>`).join('')}</div></div></div>
      <div class="mon">${monSVG(MON_TYPES[(g.plays || 0) % MON_TYPES.length], MON_PAL[(g.plays || 0) % MON_PAL.length])}</div></section>
  <section class="card glass"><div class="arc-stats">
      <div class="kpi"><b>${g.best.stage}</b><span>${t('stage terjauh')}</span></div><div class="kpi"><b>${fmtN(g.best.score)}</b><span>${t('skor terbaik')}</span></div>
      <div class="kpi"><b>${g.coins}🪙</b><span>${t('koin')}</span></div><div class="kpi"><b>${pool}</b><span>${t('kata siap bertarung')}</span></div></div>
    ${pool < 30 ? `<p class="small muted" style="margin:10px 0 0">${t('Tips: makin banyak kata yang kamu pelajari, makin beragam monster & jawabannya.')}</p>` : ''}</section>
  <section class="card glass"><h2>${t('Buku monster')}</h2><p class="small muted" style="margin:-6px 0 12px">${t('Monster baru terbuka setiap kamu mencapai stage lebih jauh. Naga muncul di stage 5.')}</p>
    <div class="mongrid">${seen.map(m => `<div class="moncard ${m.got ? '' : 'locked'}">${monSVG(m.tp, MON_PAL[m.k % MON_PAL.length], 'idle', m.tp === 'dragon')}<b>${m.got ? `${t(MON_NAME[m.tp])} <span class="hz">${MON_ZH[m.tp]}</span>` : '???'}</b></div>`).join('')}</div></section>
  <section class="card glass"><h2>${t('Cara main')}</h2><div class="steps-mini">
    ${[['🛡', 'Perisai kata', 'Setiap monster membawa 3 arti kata (bos: 5). Pilih hanzi yang cocok, urutan bebas.'],
       ['⏱', 'Waktu', 'Tiap pilihan punya batas waktu. Jawab di bawah 3 detik = KRITIS, koin dobel.'],
       ['❤', 'Nyawa', 'Salah atau telat = monster menyerang. 5 nyawa, jangan sampai habis!'],
       ['🛒', 'Toko', 'Koin untuk membeli 💡 petunjuk, ⏱ bekukan waktu, dan ❤ ramuan.'],
       ['⚔', 'Ulangan sungguhan', 'Kata yang jatuh tempo dan kamu jawab di arcade langsung dihitung sebagai ulangan hafalan.'],
       ['👿', 'Monster balas dendam', 'Kata yang salah kembali lagi di monster berikutnya sampai kamu menguasainya.'],
       ['🎵', 'Bonus nada', 'Kadang muncul tantangan tebak nada 1–4 untuk koin ekstra — latihan telinga di tengah pertarungan.'],
       ['🔥', 'Fever', '8 jawaban benar beruntun = FEVER: koin & skor dobel sampai kamu salah.'],
       ['🎁', 'Rampasan kata', 'Setelah monster kalah, kata-katanya diputar ulang dengan pinyin & arti — pengulangan singkat yang bikin nempel.']].map(([i, a, b]) => `<div class="sm-step"><span>${i}</span><div><b>${t(a)}</b><p>${t(b)}</p></div></div>`).join('')}</div></section>`;
}

/* ---------- SLANG TAIWAN ---------- */
const VS10 = { cat: 'all', q: '' };
const slangLang = () => (['id', 'en', 'tl', 'vi'].includes(meanLang()) ? meanLang() : 'en');
const slangP = s => s.p[slangLang()] || s.p.en;
const slangN = s => s.n[slangLang()] || s.n.en;
const slangEx = s => s.ex[2][slangLang()] || s.ex[2].en;
const catName = c => { const r = SLANG_CATS.find(x => x[0] === c); return r ? t(r[1]) : c; };
const REG_CLS = ['r0', 'r1', 'r2'];
/* baris multibahasa: bahasa utama dulu, lalu ID / EN / PH (+VI bila dipakai) */
const SL_LANGS = () => { const p = slangLang(); const base = ['id', 'en', 'tl']; if (p === 'vi') base.push('vi'); return [p, ...base.filter(l => l !== p)]; };
function slangLangRows(s, which) {
  const ls = SL_LANGS().slice(1);
  return `<div class="sl-langs">${ls.map(l => { const v = which === 'ex' ? (s.ex[2][l] || '') : (s.p[l] || ''); return v ? `<div><span class="lg">${LANG_LABEL[l]}</span><span>${esc(v)}</span></div>` : ''; }).join('')}</div>`;
}
function slangCard(s, big) {
  return `<div class="slcard ${big ? 'big' : ''}"><div class="sl-top"><span class="sl-local"><span class="lg">${LANG_LABEL[slangLang()]}</span> ${esc(slangP(s))}</span><span class="regb ${REG_CLS[s.reg]}">${t(SLANG_REG[s.reg])}</span></div>
    ${slangLangRows(s, 'p')}
    <button class="sl-zh" ${big ? 'data-s="slsay"' : `data-a="sayc" data-v="${esc(s.zh.replace(/[～~]/g, ''))}"`}><span class="hz">${esc(s.zh)}</span><span class="sl-py">${esc(s.py)}</span>${ICON('speaker')}</button>
    <p class="sl-note">${esc(slangN(s))}</p>
    <button class="sl-ex" ${big ? 'data-s="slsayex"' : `data-a="sayc" data-v="${esc(s.ex[0].replace(/—/g, '，'))}"`}><span class="hz">${esc(s.ex[0])}</span><small>${esc(s.ex[1])}</small><small class="tr">${esc(slangEx(s))}</small>${slangLangRows(s, 'ex')}</button></div>`;
}
/* ---- belajar semua slang satu per satu dalam satu babak ---- */
function slangList(cat) { return cat && cat !== 'all' ? SLANG.filter(s => s.c === cat) : SLANG.slice(); }
function slangPos(cat) { S.slangPos = S.slangPos && typeof S.slangPos === 'object' ? S.slangPos : {}; return +S.slangPos[cat || 'all'] || 0; }
function buildSlangLearn(cat = 'all', from = 0) {
  const list = slangList(cat); const out = [];
  if (from >= list.length) from = 0;
  const rest = list.slice(from);
  for (let k = 0; k < rest.length; k += 4) {
    const chunk = rest.slice(k, k + 4);
    chunk.forEach((s, j) => out.push({ type: 'slangintro', ch: s.k, cat, n: from + k + j + 1, total: list.length }));
    // cek cepat untuk 4 slang barusan (campur: tebak versi Taiwan / dengar & tebak)
    shuffle(chunk).forEach(s => { const others = shuffle(SLANG.filter(x => x.k !== s.k)).slice(0, 3); out.push({ type: 'slang', ch: s.k, mode: Math.random() < 0.5 ? 'pick' : 'listen', opts: shuffle([s.k, ...others.map(x => x.k)]) }); });
  }
  return out;
}
function renderSlangIntro(it) {
  const s = slangOf(it.ch); SES.answered = true;
  $('#sbody').innerHTML = `<div class="s-card glass slintro"><div class="q-kind">${ICON('chat')} ${t('Slang')} ${it.n}/${it.total} · ${esc(catName(s.c))}</div>${slangCard(s, true)}</div>`;
  $('#sfoot').innerHTML = `<div class="inner"><button class="btn sec" data-s="slslow">${ICON('slow')} ${t('pelan')}</button><button class="btn pri big wide" data-s="next">${t('Paham, lanjut')}</button></div>`;
  S.slangPos = S.slangPos && typeof S.slangPos === 'object' ? S.slangPos : {}; S.slangPos[it.cat || 'all'] = it.n >= it.total ? 0 : it.n;
  S.slangSeen = S.slangSeen && typeof S.slangSeen === 'object' ? S.slangSeen : {}; S.slangSeen[s.k] = 1;
  if (voiceOK()) speakFor(it, s.zh.replace(/[～~]/g, ''), 300);
  FX.play('flip'); save();
}

function vSlang() {
  const q = VS10.q.trim().toLowerCase();
  const list = SLANG.filter(s => (VS10.cat === 'all' || s.c === VS10.cat) && (!q || [slangP(s), s.p.id, s.zh, s.py, stripTone(s.py)].some(x => (x || '').toLowerCase().includes(q))));
  const seen = Object.keys(S.slang || {}).length;
  return `<section class="card glass"><div class="row" style="gap:14px;align-items:center">${TILE('chat', 'lg tint c6')}<div class="grow"><h1 style="margin:0">${t('Slang Taiwan')}</h1>
      <p class="muted small" style="margin:4px 0 0">${t('Cara anak muda Taiwan bilang “ah yang bener?”, “boong lu”, “kepo lu”, dan ungkapan santai lainnya — lengkap dengan kapan boleh dipakai.')}</p></div></div>
    <div class="row wrap" style="margin-top:12px;gap:8px"><button class="btn pri" data-a="slanglearn" data-v="all">${ICON('play')} ${slangPos('all') ? t('Lanjut belajar dari no. {n}', { n: slangPos('all') + 1 }) : t('Pelajari semua ({n}) satu per satu', { n: SLANG.length })}</button>${slangPos('all') ? `<button class="btn sec" data-a="slanglearn" data-v="all" data-from="0">${ICON('refresh')} ${t('Mulai dari awal')}</button>` : ''}<button class="btn sec" data-a="slangquiz">${ICON('target')} ${t('Kuis slang (10)')}</button><button class="btn sec" data-a="slanglisten">${ICON('headphone')} ${t('Dengar & tebak (10)')}</button><span class="chip">${ICON('check')} ${t('dipelajari')} ${Object.keys(S.slangSeen || {}).length}/${SLANG.length} · ${t('dikuasai')} ${seen}</span></div>
    <div class="legend small" style="margin-top:12px"><span><i class="regb r0"></i>${t('santai')} — ${t('aman ke siapa saja yang akrab')}</span><span><i class="regb r1"></i>${t('gaul / online')}</span><span><i class="regb r2"></i>${t('agak kasar')} — ${t('hanya ke teman dekat')}</span></div></section>
  <section class="card glass"><div class="chips-scroll">${[['all', t('Semua'), '🌈']].concat(SLANG_CATS.map(c => [c[0], t(c[1]), c[3]])).map(([k, n, e]) => `<button class="chip ${VS10.cat === k ? 'on' : ''}" data-a="slcat" data-v="${k}">${e} ${esc(n)}</button>`).join('')}</div>
    <input class="search" style="width:100%;margin-top:10px" data-in="slq" id="slq" value="${esc(VS10.q)}" placeholder="${t('cari: kepo, 真的, jiche …')}" autocomplete="off" autocapitalize="off" spellcheck="false"></section>
  ${(VS10.cat === 'all' ? SLANG_CATS.map(c => c[0]) : [VS10.cat]).map(c => { const it = list.filter(s => s.c === c); if (!it.length) return ''; const cc = SLANG_CATS.find(x => x[0] === c);
    return `<div class="row sl-hrow"><h2 class="sl-h grow">${cc[3]} ${esc(catName(c))} <span class="small muted">(${slangList(c).length})</span></h2><button class="btn sec small" data-a="slanglearn" data-v="${c}">${ICON('play')} ${slangPos(c) ? t('Lanjut no. {n}', { n: slangPos(c) + 1 }) : t('Pelajari kategori ini')}</button></div><section class="slgrid">${it.map(slangCard).join('')}</section>`; }).join('') || `<div class="card glass muted">${t('Tidak ada yang cocok.')}</div>`}`;
}
/* ---- kuis slang (memakai mesin sesi) ---- */
function buildSlang(n = 10, mode = 'pick') {
  const pool = shuffle(SLANG.slice()); const out = [];
  for (const s of pool.slice(0, n)) {
    const others = shuffle(SLANG.filter(x => x.k !== s.k && (x.c === s.c || Math.random() < 0.5))).slice(0, 3);
    out.push({ type: 'slang', ch: s.k, mode: mode === 'mix' ? (Math.random() < 0.5 ? 'pick' : 'listen') : mode, opts: shuffle([s.k, ...others.map(x => x.k)]) });
  }
  return out;
}
const slangOf = k => SLANG.find(s => s.k === k);
function renderSlang(it) {
  const s = slangOf(it.ch); const v = voiceOK();
  const listen = it.mode === 'listen';
  $('#sbody').innerHTML = `<div class="s-card glass"><div class="q-kind">${ICON('chat')} ${listen ? t('Dengar — artinya apa?') : t('Versi Taiwan-nya apa?')}</div>
    ${listen ? `${v ? `<div style="padding:10px 0"><button class="speak huge" data-s="slsay">🔊</button></div>` : ''}<div class="q-hz hz sm" style="font-size:clamp(34px,8vw,54px)">${esc(s.zh)}</div>${v ? '' : `<div class="q-py">${esc(s.py)}</div>`}`
      : `<div class="sl-q">“${esc(slangP(s))}”</div><div class="small muted" style="text-align:center">${esc(catName(s.c))}</div>`}
    <div class="opts">${it.opts.map((k, j) => { const o = slangOf(k); return `<button class="opt" data-s="opt" data-v="${k}"><kbd>${j + 1}</kbd>${listen ? esc(slangP(o)) : `<span class="hz" style="font-size:20px">${esc(o.zh)}</span><span class="small muted" style="display:block">${esc(o.py)}</span>`}</button>`; }).join('')}</div></div>`;
  if (listen && v) speakFor(it, s.zh.replace(/[～~]/g, ''), 250);
}
function slangFeedback(it, ok) {
  const s = slangOf(it.ch);
  if (ok) { S.slang = S.slang && typeof S.slang === 'object' ? S.slang : {}; S.slang[s.k] = (S.slang[s.k] || 0) + 1; }
  if (voiceOK()) speakFor(it, s.zh.replace(/[～~]/g, ''), 250);
  return `<div class="fb ${ok ? 'ok' : 'bad'}"><div style="flex:1;min-width:0">${ok ? t(pick(['Benar!', 'Tepat!', 'Keren!'])) : t('Jawabannya')}: <span class="hz" style="font-size:20px">${esc(s.zh)}</span> <b>${esc(s.py)}</b> = “${esc(slangP(s))}”
    <small>${esc(slangN(s))}</small></div></div>`;
}

/* ---------- aksi & input ---------- */
Object.assign(ACT, {
  arcade: () => openArcade(),
  arcdiff: b => { arcState().diff = b.dataset.v; save(); render(); },
  slcat: b => { VS10.cat = b.dataset.v; render(); },
  slanglearn: b => { const cat = b.dataset.v || 'all'; const from = b.dataset.from !== undefined ? +b.dataset.from : slangPos(cat); startSession(buildSlangLearn(cat, from), { title: t('Belajar slang'), rebuild: () => buildSlangLearn(cat, 0) }); },
  slangquiz: () => startSession(buildSlang(10, 'pick'), { title: t('Kuis slang'), rebuild: () => buildSlang(10, 'pick') }),
  slanglisten: () => startSession(buildSlang(10, 'listen'), { title: t('Dengar & tebak'), rebuild: () => buildSlang(10, 'listen') }),
  'goto-arcade': () => go('arcade'), 'goto-slang': () => go('slang')
});
['arcade', 'slangquiz', 'slanglisten', 'slanglearn'].forEach(a => START_ACTS.add(a));
let slqT = 0;
document.addEventListener('input', e => {
  if (!e.target.dataset || e.target.dataset.in !== 'slq' || e.isComposing) return;
  VS10.q = e.target.value; clearTimeout(slqT);
  slqT = setTimeout(() => { render(); const i = $('#slq'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 240);
});