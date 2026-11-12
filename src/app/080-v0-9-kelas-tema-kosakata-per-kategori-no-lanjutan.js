/* =====================================================================
   HALAMAN
   ===================================================================== */
const TMV = { k: null, tab: 'kata', set: 'all', open: null, dpy: true, dtr: false, role: '', revd: {} };
function tmVisible(T) { return tmWords(T).filter(x => TMV.set === 'all' || x.si === +TMV.set); }

function tmBanner() {
  const all = tmAll(); if (!all.length) return '';
  const passed = all.filter(tmPass).length; const nx = tmNextTheme();
  const tiles = all.slice(0, 4).map(T => `<span class="tm-bt">${TILE(tmIcon(T.icon), 'tint ' + tmCol(T))}</span>`).join('');
  return `<section class="tm-banner" data-a="tmhub" role="button" tabindex="0"><span class="tm-btiles">${tiles}</span><div class="grow" style="min-width:0"><b>${t('Kelas Tema')} <span class="hz">主題</span></b><span>${t('Kosakata per kategori: tabel kata, kalimat, pola, lalu ujian tema.')}</span><small>${t('{a} tema · {b} lulus', { a: all.length, b: passed })}${nx ? ' · ' + esc(tmTitle(nx)) : ''}</small></div>${tmRing(passed / all.length, passed + '/' + all.length, 50)}<span class="tm-bgo">${t('Buka')} ${ICON('chevron')}</span></section>`;
}

function tmCard(T) {
  const P = tmPrep(T); const th = tmTh(T.k); const pass = tmPass(T); const sd = tmSetsDone(T);
  const st = pass ? `<span class="tm-pass">${ICON('crown')} ${t('Lulus')}</span>` : sd ? `<span class="tm-prog">${sd}/${P.sets.length} set</span>` : `<span class="tm-new">${t('Baru')}</span>`;
  return `<button class="tm-card ${pass ? 'pass' : ''}" data-a="tmopen" data-v="${esc(T.k)}">
    <span class="tm-card-top">${TILE(tmIcon(T.icon), 'tint ' + tmCol(T))}${tmRing(tmPct(T), pass ? '' : Math.round(tmPct(T) * 100) + '%', 44)}</span>
    <b class="hz tm-zh">${esc(T.zh)}</b><span class="tm-py">${esc(T.py || '')}</span>
    <span class="tm-ti">${esc(tmTitle(T))}</span>
    ${tmLvRow(T)}
    <span class="tm-cm"><span>${t('{n} kata', { n: P.words.length })} · ${t('{n} set', { n: P.sets.length })}</span>${st}</span>
    ${!pass && th.best ? `<span class="tm-best">${t('Ujian terbaik {p}%', { p: th.best })}</span>` : ''}</button>`;
}

function vTmHub() {
  const all = tmAll(); const s = tmS(); const lv = s.lv;
  const list = all.filter(T => lv === 'all' || tmPrep(T).main === +lv);
  const passed = all.filter(tmPass).length; const setsTot = all.reduce((a, T) => a + tmPrep(T).sets.length, 0); const setsDone = all.reduce((a, T) => a + tmSetsDone(T), 0);
  const wTot = all.reduce((a, T) => a + tmWords(T).length, 0); const wLearn = all.reduce((a, T) => a + tmWords(T).filter(x => S.cards[x.wid]).length, 0);
  const nx = tmNextTheme();
  return `<section class="card glass tm-hero"><button class="btn ghost small" data-a="klback">‹ ${t('Kelas')}</button>
    <div class="tm-hero-t"><span class="tm-seal hz">主題</span><div class="grow" style="min-width:0"><h1>${t('Kelas Tema')}</h1><p class="muted">${t('Pilih satu tema (benda, makanan, pekerjaan…), lihat tabel katanya, pelajari kata + kalimat + pola grammar-nya, lalu lulus ujian tema.')}</p></div></div>
    <div class="kl-stats tm-stats"><div><b>${passed}/${all.length}</b><span>${t('tema lulus')}</span></div><div><b>${setsDone}/${setsTot}</b><span>${t('set selesai')}</span></div><div><b>${wLearn}/${wTot}</b><span>${t('kata dipelajari')}</span></div></div>
    <div class="tm-steps">${[['table', 'Tabel kata'], ['seed', 'Belajar per set'], ['grammar', 'Pola & dialog'], ['crown', 'Ujian ≥ 80%']].map(([ic, l], i) => `<span class="tm-step"><i>${i + 1}</i>${ICON(ic)} ${t(l)}</span>`).join('')}</div>
    ${nx ? `<div class="row wrap" style="gap:8px;margin-top:14px"><button class="btn pri big" data-a="tmopen" data-v="${esc(nx.k)}">${ICON('play')} ${t(tmPct(nx) > 0 ? 'Lanjut: {s}' : 'Mulai: {s}', { s: tmTitle(nx) })}</button></div>` : ''}</section>
  ${all.length ? `<div class="tm-filter"><span class="small muted">${t('Tingkat')}</span>${[['all', t('Semua'), all.length], ...TM_LV.map((x, i) => [String(i), x[1], all.filter(T => tmPrep(T).main === i).length])].filter(x => x[2]).map(([v, l, n]) => `<button class="chip ${String(lv) === v ? 'on' : ''}" data-a="tmlv" data-v="${v}" aria-pressed="${String(lv) === v}">${esc(l)} <i>${n}</i></button>`).join('')}<span class="small muted tm-fnote">${t('Tingkat tema = level mayoritas katanya (median).')}</span></div>
  <section class="tm-grid">${list.length ? list.map(tmCard).join('') : `<p class="muted">${t('Belum ada tema di tingkat ini.')}</p>`}</section>` : `<section class="card glass"><p class="muted">${t('Tema sedang disiapkan — coba lagi nanti.')}</p></section>`}
  <section class="card glass"><h2>${t('Cara belajar paling efektif')}</h2><div class="steps-mini">${['Lihat tabel dulu, sembunyikan arti, lalu tebak — ingat aktif lebih kuat dari membaca ulang.', 'Belajar 1 set per hari (5–10 kata). Kata langsung dipakai di kalimat & pola grammar.', 'Bintangi kata yang susah; latih kata berbintang & kata yang salah di ujian.', 'Ujian mewajibkan mengetik hanzi sendiri — itu yang membuat kosakata benar-benar milikmu.'].map((x, i) => `<div class="sm-step"><span>${i + 1}</span><div><p>${t(x)}</p></div></div>`).join('')}</div></section>`;
}

function tmRow(x) {
  const w = W[x.wid]; const f = x.hz; const s = tmS(); const H = s.hide; const st = !!s.star[f]; const open = TMV.open === f; const c = S.cards[x.wid];
  const mask = (k, html) => (H[k] ? `<span class="tm-mask" data-a="tmpeek" role="button" tabindex="0" title="${t('Ketuk untuk melihat')}"><span class="tm-mv">${html}</span></span>` : html);
  return `<div class="tm-tr ${open ? 'open' : ''}" data-a="tmrow" data-v="${esc(f)}" data-f="${esc(f)}" role="button" tabindex="0" aria-expanded="${open}">
    <button class="tm-st ${st ? 'on' : ''}" data-a="tmstar" data-v="${esc(f)}" aria-pressed="${st}" aria-label="${t('Bintangi')}">${ICON('star')}</button>
    <span class="tm-c-hz hz">${mask('hz', esc(tmHz(w)))}</span>
    <span class="tm-c-py">${mask('py', pinyinHTML(w, 'mark'))}</span>
    <span class="tm-c-mean">${mask('mean', esc(meanP(w)))}</span>
    <span class="tm-meta"><span class="tm-c-mw">${x.mw ? `<span class="hz">${esc(x.mw)}</span>` : '<span class="tm-dash">—</span>'}</span><span class="tm-c-lv">${tmLvB(lvOfWord(x.wid))}${c ? `<i class="dot m${mastery(c)}"></i>` : ''}</span></span>
    <button class="speak mini tm-au" data-a="tmsay" data-v="${esc(tmHz(w))}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button></div>${open ? tmDetail(x) : ''}`;
}
function tmExHTML(ex, tg, sayAttr = 'data-a="tmsay"', mode) {
  return `<div class="tm-ex"><div class="grow" style="min-width:0">${klLine(ex.zh, ex.py, { tg, tap: sayAttr.includes('data-a'), mode })}<div class="tm-ext">${esc(kx(ex))}</div></div><button class="speak mini" ${sayAttr} data-v="${esc(ex.zh)}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button></div>`;
}
function tmDetail(x) {
  const w = W[x.wid]; const s = tmS(); const st = !!s.star[x.hz]; const kn = !!s.known[x.hz];
  const mwW = x.mw ? W[tmIdx().get(x.mw)] : null; const f = tmForm(w, x.ex.zh, x.hz);
  return `<div class="tm-det"><div class="tm-det-w"><div class="tm-det-hz hz">${hzHTML(w)}${lvBadgeW(x.wid, 'sm')}</div><div class="q-py">${pinyinHTML(w, 'mark')}</div>${aligned(w) ? contourSVG(w.t, 22) : ''}
      <div class="row" style="gap:6px;justify-content:center;margin-top:6px"><button class="speak mini" data-a="tmsay" data-v="${esc(tmHz(w))}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button><button class="btn ghost small" data-a="tmsay" data-slow="1" data-v="${esc(tmHz(w))}">${ICON('slow')} ${t('per suku kata')}</button></div></div>
    <div class="tm-det-b">${subsHTML(w)}
      <div class="pill-row"><span class="chip">${esc(posLabel(w.o))}</span><span class="chip">${TM_LV[tmLvOf(w)][1]} · <span class="hz">${TM_LV[tmLvOf(w)][2]}</span></span>${x.mw ? `<span class="chip">${t('Kata ukur')}: <b class="hz">${esc(x.mw)}</b>${mwW ? ' ' + esc(mwW.p) : ''}</span>` : ''}</div>
      ${tmExHTML(x.ex, f)}
      ${typeof wordPicto === 'function' ? wordPicto(x.wid) : ''}
      <div class="row wrap tm-det-act"><button class="btn small ${st ? 'pri' : 'sec'}" data-a="tmstar" data-v="${esc(x.hz)}">${ICON('star')} ${t(st ? 'Berbintang' : 'Bintangi')}</button><button class="btn small ${kn ? 'pri' : 'sec'}" data-a="tmknown" data-v="${esc(x.hz)}">${ICON('check')} ${t(kn ? 'Sudah hafal' : 'Tandai sudah hafal')}</button><button class="btn ghost small" data-a="word" data-v="${x.wid}">${ICON('search')} ${t('Kartu kata lengkap')}</button><button class="btn ghost small" data-a="writeword" data-v="${x.wid}">${ICON('write')} ${t('Latih menulis')}</button></div></div></div>`;
}

function vTmTheme() {
  const T = tmT(TMV.k); if (!T) { VK.view = 'tm'; return vTmHub(); }
  const P = tmPrep(T); const th = tmTh(T.k); const s = tmS(); const pass = tmPass(T); const nsi = tmNextSet(T);
  const stars = P.words.filter(x => s.star[x.hz]).length; const weak = th.weak.filter(f => P.words.some(x => x.hz === f)).length;
  const tab = TMV.tab;
  const main = nsi >= 0 ? `<button class="btn pri" data-a="tmlearn" data-v="${nsi}">${ICON('play')} ${t('Belajar Set {n}', { n: nsi + 1 })}</button>` : `<button class="btn pri" data-a="tmexam">${ICON('crown')} ${t(pass ? 'Ulangi ujian' : 'Ujian tema')}</button>`;
  const head = `<section class="card glass tm-head"><button class="btn ghost small" data-a="tmhub">${t('‹ Semua tema')}</button>
    <div class="tm-hrow">${TILE(tmIcon(T.icon), 'tint ' + tmCol(T) + ' tm-hic')}<div class="grow" style="min-width:0"><h1 class="hz">${esc(T.zh)} <button class="speak mini tm-hsp" data-a="tmsay" data-v="${esc(T.zh)}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button></h1><div class="tm-hpy">${esc(T.py || '')}</div><div class="tm-hti">${esc(tmTitle(T))}</div></div>${tmRing(tmPct(T), pass ? '' : Math.round(tmPct(T) * 100) + '%', 58)}</div>
    ${kx(T.desc) ? `<div class="gtip">${ICON('target')}<span>${esc(kx(T.desc))}</span></div>` : ''}
    <div class="tm-hmeta">${tmLvRow(T)}<span class="small muted">${t('{n} kata', { n: P.words.length })} · ${t('{n} set', { n: P.sets.length })}</span>${pass ? `<span class="tm-pass">${ICON('crown')} ${t('Lulus')} · ${esc(tmFmtD(th.pass))}</span>` : ''}</div>
    <div class="row wrap tm-acts">${main}${nsi >= 0 ? `<button class="btn sec" data-a="tmexam">${ICON('crown')} ${t('Ujian tema')}</button>` : ''}<button class="btn sec" data-a="tmplay">${ICON('play')} ${t('Putar semua')}</button>${stars ? `<button class="btn ghost" data-a="tmprac" data-v="star">${ICON('star')} ${t('Latih kata berbintang ({n})', { n: stars })}</button>` : ''}${weak ? `<button class="btn ghost" data-a="tmprac" data-v="weak">${ICON('target')} ${t('Latih kata lemah ({n})', { n: weak })}</button>` : ''}</div>
    <div class="seg tm-tabs">${[['kata', 'Kata', 'table'], ['pola', 'Pola', 'grammar'], ['dialog', 'Dialog', 'chat']].map(([k, l, ic]) => `<button class="${tab === k ? 'on' : ''}" data-a="tmtab" data-v="${k}">${ICON(ic)} ${t(l)}</button>`).join('')}</div></section>`;
  let body = '';
  if (tab === 'kata') {
    const sets = `<section class="card glass tm-scard"><h2>${ICON('seed')} ${t('Set belajar')}</h2><p class="small muted" style="margin:-6px 0 12px">${t('Tiap set: Kenalan → Latihan → Kalimat → Pola → Rangkuman. Kata yang dipelajari masuk kartu ulangan (SRS).')}</p>
      <div class="tm-sets">${P.sets.map((st0, si) => { const r = th.sets[st0.key]; const ok = tmSetDone(T, si); return `<button class="tm-set ${ok ? 'ok' : ''} ${si === nsi ? 'now' : ''}" data-a="tmlearn" data-v="${si}"><span class="tm-sn">${ok ? ICON('check') : si + 1}</span><span class="grow" style="min-width:0"><b>${esc(kx(st0.title))}</b><span class="hz tm-sw">${st0.words.map(x => esc(tmHz(W[x.wid]))).join('・')}</span></span><span class="tm-ssc">${r ? r.sc + '%' : t('{n} kata', { n: st0.words.length })}</span></button>`; }).join('')}
        <button class="tm-set exam ${pass ? 'ok' : ''} ${nsi < 0 && !pass ? 'now' : ''}" data-a="tmexam"><span class="tm-sn">${ICON('crown')}</span><span class="grow" style="min-width:0"><b>${t('Ujian tema · lulus ≥ 80%')}</b><span class="tm-sw">${pass ? t('Lulus {d} · skor terbaik {p}%', { d: tmFmtD(th.pass), p: th.best }) : th.best ? t('Skor terbaik {p}% · butuh 80%', { p: th.best }) : t('Belum dicoba. Saran: selesaikan semua set dulu.')}</span></span><span class="tm-ssc">${th.best ? th.best + '%' : '—'}</span></button></div>
      <p class="small muted tm-exnote">${ICON('info')} <span>${t('18 soal campur dari semua kata tema: isi kalimat, pinyin → hanzi, arti → hanzi, hanzi → arti, dengar, susun kalimat, dan KETIK hanzi & pinyin sendiri — tanpa petunjuk.')}</span></p></section>`;
    const H = s.hide;
    const table = `<section class="card glass tm-tcard"><div class="tm-thead"><h2>${ICON('table')} ${t('Tabel kata')}</h2>
        <div class="seg tm-sseg"><button class="${TMV.set === 'all' ? 'on' : ''}" data-a="tmset" data-v="all">${t('Semua')}</button>${P.sets.map((x, si) => `<button class="${String(TMV.set) === String(si) ? 'on' : ''}" data-a="tmset" data-v="${si}" title="${esc(kx(x.title))}">${t('Set {n}', { n: si + 1 })}</button>`).join('')}</div></div>
      <div class="tm-hide"><span class="small muted">${ICON('eyeoff')} ${t('Sembunyikan')}</span>${[['hz', '漢字'], ['py', 'Pinyin'], ['mean', t('Arti')]].map(([k, l]) => `<button class="chip ${H[k] ? 'on' : ''}" data-a="tmhide" data-v="${k}" aria-pressed="${!!H[k]}">${esc(l)}</button>`).join('')}</div>
      ${H.hz || H.py || H.mean ? `<p class="small muted" style="margin:0 0 8px">${t('Ketuk sel yang disembunyikan untuk mengintip — cara cepat menguji diri.')}</p>` : ''}
      <div class="tm-table" role="table"><div class="tm-tr tm-th" role="row"><span></span><span class="hz">漢字</span><span>Pinyin</span><span>${t('Arti')}</span><span class="tm-meta"><span>${t('Kata ukur')}</span><span>Level</span></span><span></span></div>
        ${tmVisible(T).map(tmRow).join('')}</div></section>`;
    body = sets + table;
  } else if (tab === 'pola') {
    body = (T.grammar || []).map((g, gi) => `<section class="card glass tm-g"><div class="tm-gh"><span class="tm-gn">${gi + 1}</span><h3>${esc(kx(g.title))}</h3></div><div class="tm-pat">${tmPat(g.pattern)}</div><p class="tm-note">${esc(kx(g.note))}</p>
      <div class="tm-gex">${(g.ex || []).map(e => tmExHTML(e, '')).join('')}</div><button class="btn sec small" data-a="tmgpr" data-v="${gi}">${ICON('blocks')} ${t('Latih pola ini')}</button></section>`).join('');
  } else {
    const d = T.dialog || [];
    body = `<section class="card glass tm-dcard"><div class="tm-dctl"><button class="btn pri small" data-a="tmdplay">${ICON('play')} ${t('Putar dialog')}</button>
        <button class="chip ${TMV.dpy ? 'on' : ''}" data-a="tmdpy" aria-pressed="${TMV.dpy}">拼音</button><button class="chip ${TMV.dtr ? 'on' : ''}" data-a="tmdtr" aria-pressed="${TMV.dtr}">${t('Terjemahan')}</button>
        <span class="small muted">${t('Peran')}</span><div class="seg">${['', 'A', 'B'].map(r => `<button class="${TMV.role === r ? 'on' : ''}" data-a="tmrole" data-v="${r}">${r || t('Nonton')}</button>`).join('')}</div></div>
      <div class="tm-dlg">${d.map((x, i) => { const me = TMV.role && TMV.role === x.sp; return `<div class="tm-dl ${x.sp === 'A' ? 'a' : 'b'} ${me ? 'me' : ''} ${TMV.revd[i] ? 'rev' : ''}" data-i="${i}"><span class="tm-av">${esc(x.sp)}</span>
        <div class="tm-bub">${me ? `<button class="tm-turn" data-a="tmdrev" data-v="${i}">${ICON('mic')} ${t('Giliranmu — ucapkan dulu, lalu ketuk')}</button>` : ''}<div class="tm-dz">${klLine(x.zh, x.py, { mode: TMV.dpy ? 'ruby' : 'off', tap: 1 })}</div>
          <button class="tm-dtr ${TMV.dtr ? 'on' : ''}" data-a="tmdtrl"><span class="tm-dth">${ICON('eye')} ${t('ketuk untuk arti')}</span><span class="tm-dtx">${esc(kx(x))}</span></button></div>
        <button class="speak mini" data-a="tmsay" data-v="${esc(x.zh)}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button></div>`; }).join('')}</div></section>`;
  }
  return head + body;
}

/* masuk lewat Kelas: tampilan VK.view 'tm' (daftar tema) & 'tmt' (halaman tema) */
const XVIEWS_TM = XVIEWS.kelas;
XVIEWS.kelas = function () {
  if (VK.view === 'tm') return vTmHub();
  if (VK.view === 'tmt') return vTmTheme();
  const h = XVIEWS_TM(); if (VK.view !== 'map' && VK.view) return h;
  const b = tmBanner(); if (!b) return h;
  const kb = h.indexOf('<section class="kb-banner"');
  if (kb >= 0) { const e = h.indexOf('</section>', kb); if (e > 0) return h.slice(0, e + 10) + b + h.slice(e + 10); }
  const k = h.indexOf('<section class="kl-tools">'); return k >= 0 ? h.slice(0, k) + b + h.slice(k) : b + h;
};
