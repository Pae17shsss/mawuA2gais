/* =====================================================================
   HALAMAN KELAS
   ===================================================================== */
const VK = { view: 'map', n: 1, tab: 'babak', role: '', grp: 'all', qTypes: null };
function lessonCard(L) {
  const p = lessonPct(L.n); const done = lessonDone(L.n); const nr = nextRound(L.n); const nw = L.vocab.length; const nc = L.vocab.filter(isCore).length;
  return `<button class="kl-lc ${done ? 'done' : ''}" data-a="klopen" data-v="${L.n}" style="--p:${p}">
    <span class="kl-lnum">${done ? ICON('crown') : L.num}</span>
    <span class="grow" style="min-width:0"><small class="muted">${lnLong(L.n)}</small><b class="hz">${esc(L.title.zh)}</b><span class="kl-lt">${esc(kx(L.title))}</span>
      <span class="kl-lbar"><i style="width:${p * 100}%"></i></span><span class="small muted">${t('{a} kata inti · {b} total', { a: nc, b: nw })} · ${done ? t('khatam 👑') : nr ? t('berikutnya: {s}', { s: t(nr.ti) }) : ''}</span></span></button>`;
}
function courseStats(k) {
  const ls = KLS.filter(L => (k ? L.course === k : !isOwnL(L)));
  return { n: ls.length, done: ls.filter(L => lessonDone(L.n)).length, rounds: ls.reduce((a, L) => a + KROUNDS.filter(r => roundDone(L.n, r.k)).length, 0) };
}
function vKelasMap() {
  const st = klState(); const nl = nextLesson(); const A = courseStats();
  const due = klWords(KLS.map(L => L.n)).filter(i => S.cards[i] && S.cards[i].due <= Date.now()).length;
  const mode = st.mode;
  return `<section class="card glass kl-hero"><div class="kl-hero-t"><span class="kl-badge">${ICON('class')} ${t('Kelas')} · ${KLS_VER}</span>
      <h1>${t('Kelas Mandarin')}</h1><p class="muted">${COURSES.filter(C => !C.own).map(C => `<span class="hz">${esc(C.zh)}</span>`).join(' + ')} — ${t('semua kosakata, dialog, grammar, dan latihan dari PDF kelasmu, dipecah jadi babak-babak kecil.')}</p>
      <div class="kl-stats"><div><b>${A.done}/${A.n}</b><span>${t('lesson khatam')}</span></div><div><b>${A.rounds}/${A.n * 6}</b><span>${t('babak lulus')}</span></div><div><b>${klWords(KLS.filter(L => !isOwnL(L)).map(L => L.n)).length}</b><span>${t('kata & frasa')}</span></div><div><b>${due}</b><span>${t('kartu jatuh tempo')}</span></div></div>
      <div class="row wrap" style="gap:8px;margin-top:14px">${nl ? `<button class="btn pri big" data-a="klgo">${ICON('play')} ${t('Lanjut: {n} · {s}', { n: lnShort(nl), s: t(nextRound(nl).ti) })}</button>` : `<button class="btn pri big" data-a="klquiz">${ICON('crown')} ${t('Semua khatam! Kuis campur')}</button>`}${due ? `<button class="btn sec" data-a="klrev">${ICON('refresh')} ${t('Ulang {n} kartu', { n: due })}</button>` : ''}</div></div>
    <div class="kl-mode"><span class="small muted">${t('Cara belajar')}</span><div class="seg">${[['step', 'Bertahap'], ['fast', 'Cepat']].map(([k, l]) => `<button class="${mode === k ? 'on' : ''}" data-a="klmode" data-v="${k}">${t(l)}</button>`).join('')}</div>
      <p class="small">${mode === 'fast' ? t('Cepat: tiap lesson punya tombol ⚡ Kilat (±12 menit) — inti semua babak dalam satu sesi, lalu langsung Ujian khatam.') : t('Bertahap: kerjakan 6 babak berurutan, 1–2 babak per hari. Babak lulus terkunci ✓ sehingga progres jelas.')}</p></div></section>
  <section class="kl-tools">${[['kltocfl', 'award', 'Tes TOCFL', 'Simulasi Band A: listening & reading', 'c1'], ['klfc', 'cards', 'Flashcard', 'Kartu bolak-balik, geser kanan = hafal', 'c1'], ['klquiz', 'target', 'Kuis', 'Pilih lesson & jenis soal sendiri', 'c2'], ['klarc', 'game', 'Arcade kelas', 'Lawan monster pakai kata lesson', 'c7'], ['klspeak', 'mic', 'Bicara', 'Perkenalan diri + rekam suaramu', 'c6'], ['kldrill', 'clock', 'Latihan khusus', 'Jam, tanggal, kata ukur, posisi, harga', 'c4'], ['klsheet', 'grammar', 'Ringkasan grammar', 'Semua pola grammar di satu halaman', 'c3'], ['klpic', 'sparkle', 'Galeri gambar', 'Gambar vektor tiap bagian huruf', 'c5']].map(([a, ic, ti, sub, c]) => `<button class="kl-tool" data-a="${a}">${TILE(ic, 'tint ' + c)}<b>${t(ti)}</b><span>${t(sub)}</span></button>`).join('')}</section>
  ${COURSES.filter(C => !C.own).map(C => { const cs = courseStats(C.k); const nc = nextLesson(C.k); return `<section class="kl-course"><div class="kl-ch">${TILE(C.ic, 'tint ' + (C.k === 'b1' ? 'c6' : 'c2'))}<div class="grow" style="min-width:0"><h2 class="hz">${esc(C.zh)}</h2><span class="small muted">${esc(C.en)} · ${t('{a}/{b} lesson khatam · {c}/{d} babak', { a: cs.done, b: cs.n, c: cs.rounds, d: cs.n * 6 })}</span></div>${nc ? `<button class="btn sec small" data-a="klopen" data-v="${nc}">${ICON('play')} ${lnShort(nc)}</button>` : `<span class="chip">${ICON('crown')}</span>`}</div>
    <div class="kl-grid">${KLS.filter(L => L.course === C.k).map(lessonCard).join('')}</div></section>`; }).join('')}
  <section class="card glass"><h2>${t('Cara paling efisien menghatamkan semua lesson')}</h2><div class="steps-mini">
    ${[['1', 'Kenal dulu, baru hafal', 'Babak 1 memperkenalkan kata 5 per 5 lalu langsung dicek — otak mengingat lebih baik dalam potongan kecil.'],
       ['2', 'Pakai 3 indra', 'Babak 2 melatih telinga (suara & nada) dan mata (bentuk hanzi) — nada salah = arti beda.'],
       ['3', 'Ingat aktif > membaca ulang', 'Kartu ingat & flashcard memaksa kamu mengingat tanpa melihat. Kata yang lupa otomatis muncul lagi (SRS).'],
       ['4', 'Kata → kalimat', 'Babak 4–5 memakai kata dalam pola grammar, dialog, dan bacaan dari PDF — supaya bisa dipakai, bukan cuma dihafal.'],
       ['5', 'Uji & ulang berkala', 'Ujian khatam ≥ 80% menandai lesson selesai; kartu jatuh tempo diulang besok, 3 hari, seminggu kemudian.'],
       ['6', 'Bicara keras-keras', 'Menu Bicara: rekam perkenalan diri & jawab pertanyaan kelas — latihan paling mirip ujian lisan.']].map(([i, a, b]) => `<div class="sm-step"><span>${i}</span><div><b>${t(a)}</b><p>${t(b)}</p></div></div>`).join('')}</div></section>`;
}
function vLesson(n) {
  const L = KL(n); const tab = VK.tab; const mode = klState().mode;
  const tabs = [['babak', 'Babak'], ['vocab', 'Kosakata'], ['dlg', 'Dialog'], ['gram', 'Grammar'], ['latih', 'Latihan PDF']];
  let body = '';
  if (tab === 'babak') {
    const nr = nextRound(n);
    body = `<section class="card glass"><div class="kl-rounds">${KROUNDS.map(R => { const sc = roundScore(n, R.k); const ok = roundDone(n, R.k); const now = nr && nr.k === R.k;
      return `<button class="kl-rd ${ok ? 'ok' : ''} ${now ? 'now' : ''}" data-a="klround" data-n="${n}" data-v="${R.k}"><span class="kl-rn">${ok ? ICON('check') : R.k}</span><span class="grow" style="min-width:0"><b>${t('Babak {k}', { k: R.k })} · ${t(R.ti)}</b><span>${t(R.sub)}</span><span class="cat-tag ${R.cat}">${t(CAT_NAME[R.cat])}</span></span><span class="kl-sc">${R.k === 1 && coreLeft(n) > 0 && klWords(n, 'core').length > 20 ? `<small>${klWords(n, 'core').length - coreLeft(n)}/${klWords(n, 'core').length}</small>` : ''}${sc !== undefined ? sc + '%' : '—'}</span></button>`; }).join('')}</div>
      <div class="row wrap" style="gap:8px;margin-top:12px">${nr ? `<button class="btn pri" data-a="klround" data-n="${n}" data-v="${nr.k}">${ICON('play')} ${t('Mulai babak {k}', { k: nr.k })}</button>` : `<span class="chip">${ICON('crown')} ${t('Lesson ini sudah khatam')}</span>`}
        <button class="btn ${mode === 'fast' ? 'pri' : 'sec'}" data-a="klfast" data-v="${n}">${ICON('bolt')} ${t('Kilat ±12 menit')}</button><button class="btn sec" data-a="klfcl" data-v="${n}">${ICON('cards')} ${t('Flashcard lesson ini')}</button><button class="btn sec" data-a="klarcl" data-v="${n}">${ICON('game')} ${t('Arcade')}</button></div></section>`;
  } else if (tab === 'vocab') {
    const gs = L.groups; const g = VK.grp;
    const list = L.vocab.filter(v => g === 'all' || v.g === g);
    body = `<section class="card glass"><div class="seg kl-gseg"><button class="${g === 'all' ? 'on' : ''}" data-a="klgrp" data-v="all">${t('Semua')} (${L.vocab.length})</button>${gs.map(x => `<button class="${g === x.k ? 'on' : ''}" data-a="klgrp" data-v="${x.k}">${esc(kx(x))} (${L.vocab.filter(v => v.g === x.k).length})</button>`).join('')}</div>
      <div class="row wrap" style="gap:8px;margin:12px 0"><button class="btn pri small" data-a="klfcg" data-v="${n}">${ICON('cards')} ${t('Flashcard grup ini')}</button><button class="btn sec small" data-a="klqg" data-v="${n}">${ICON('target')} ${t('Kuis grup ini')}</button></div>
      <div class="kl-vl">${list.map(v => { const c = card(v.wid); return `<details class="kl-v"><summary><span class="kl-vhw"><span class="hz kl-vh">${esc(v.hz)}${v.alt ? `<small>/${esc(v.alt)}</small>` : ''}${lvBadgeW(v.wid)}</span><span class="kl-vp">${v.y.map((s, k) => `<span class="t${v.t[k]}">${esc(s)}</span>`).join(' ')}</span></span><span class="grow kl-vm">${esc(kx(v))}</span>${c ? `<i class="dot m${mastery(c)}"></i>` : ''}<button class="cx-sp" data-cx="say" data-v="${esc(v.hz)}">${ICON('speaker')}</button></summary>
        <div class="kl-vd">${typeof wordPicto === 'function' ? wordPicto(v.wid) : ''}<div class="small muted">${esc(posLabel(v.pos))} · ${esc(kx(gs.find(x => x.k === v.g)))}</div>
          ${v.ex ? `<div class="kl-ex"><div class="grow" style="min-width:0">${klLine(v.ex.zh, v.ex.py, { tg: v.hz, tap: 1 })}${klTrRows(v.ex)}</div><button class="speak mini" data-cx="say" data-v="${esc(v.ex.zh)}">${ICON('speaker')}</button></div>` : ''}
          ${kx(v.tip) ? `<div class="gtip">${ICON('lightbulb')}<span>${esc(kx(v.tip))}</span></div>` : ''}
          <div class="row wrap" style="gap:6px;margin-top:8px"><button class="btn ghost small" data-a="word" data-v="${v.wid}">${ICON('search')} ${t('Kartu kata & penalaran hanzi')}</button><button class="btn ghost small" data-a="writeword" data-v="${v.wid}">${ICON('write')} ${t('Latih menulis')}</button></div></div></details>`; }).join('')}</div></section>`;
  } else if (tab === 'dlg') {
    const sps = [...new Set(L.dialog.map(x => x.sp))];
    body = `<section class="card glass"><div class="row wrap" style="gap:8px;align-items:center;margin-bottom:12px"><button class="btn pri small" id="kldplay" data-a="kldplay" data-v="${n}">${ICON('play')} ${t('Putar dialog')}</button>
        <span class="small muted">${t('Main peran:')}</span><div class="seg">${['', ...sps].map(s => `<button class="${VK.role === s ? 'on' : ''}" data-a="klrole" data-v="${esc(s)}">${s ? esc(s) : t('Nonton')}</button>`).join('')}</div></div>
      ${VK.role ? `<p class="small muted" style="margin:-4px 0 10px">${t('Baris {s} disembunyikan. Saat diputar, ada jeda untuk kamu mengucapkannya dulu.', { s: VK.role })}</p>` : ''}
      ${L.orig ? `<p class="small muted kl-orig">${ICON('info')} ${t('Slide kelas hanya berisi pertanyaan diskusi, jadi dialog ini ditulis ulang (bukan teks buku) memakai kosakata & grammar lesson ini — semua pertanyaan diskusi bisa dijawab dari sini.')}</p>` : ''}
      ${dlgHTML(n, { role: VK.role })}</section>`;
  } else if (tab === 'gram') {
    body = L.grammar.map(g => `<section class="card glass">${gramCard(n, g)}</section>`).join('') + `<section class="card glass"><button class="btn pri" data-a="klround" data-n="${n}" data-v="4">${ICON('play')} ${t('Latih pola ini (babak 4)')}</button></section>`;
  } else {
    const sets = [['gram', 'Isi yang kosong', L.mcq.length, 'puzzle'], ['build', 'Susun kalimat', L.reorder.length, 'blocks'], ['dlg', 'Tanya-jawab', L.pairs.length, 'chat'], ['tf', 'Bacaan benar/salah', L.tf.reduce((a, x) => a + x.items.length, 0), 'book']];
    body = `<section class="card glass"><p class="small muted" style="margin:0 0 12px">${t('Semua latihan dari PDF (请选择/句子重組/對錯) ditambah soal serupa. Kerjakan per jenis:')}</p><div class="kl-sets">${sets.map(([k, l, c, ic]) => `<button class="kl-set" data-a="klset" data-n="${n}" data-v="${k}">${TILE(ic, 'tint c2')}<b>${t(l)}</b><span>${t('{n} soal', { n: c })}</span></button>`).join('')}</div></section>`;
  }
  return `<section class="card glass kl-lhead"><button class="btn ghost small" data-a="klback">‹ ${t('Semua lesson')}</button>
      <div class="row" style="gap:14px;align-items:center;margin-top:8px">${ringSVG(lessonPct(n), lessonDone(n) ? '👑' : Math.round(lessonPct(n) * 6) + '/6', lnShort(n))}<div class="grow" style="min-width:0"><small class="muted">${lnLong(n)}</small><h1 class="hz" style="margin:2px 0">${esc(L.title.zh)}</h1><div class="small">${esc(L.title.py)} · <b>${esc(kx(L.title))}</b></div></div><button class="speak mini" data-cx="say" data-v="${esc(L.title.zh)}">${ICON('speaker')}</button></div>
      <div class="gtip">${ICON('target')}<span><b>${t('Target')}:</b> ${esc(kx(L.goal))}</span></div>
      <div class="seg kl-tabs">${tabs.map(([k, l]) => `<button class="${tab === k ? 'on' : ''}" data-a="kltab" data-v="${k}">${t(l)}</button>`).join('')}</div></section>${body}`;
}
function lessonPicker(key, sel) {
  return COURSES.map(C => `<div class="kl-pkc"><span class="kl-pkh">${ICON(C.ic)} <span class="hz">${esc(C.zh)}</span><button class="kl-pka" data-a="klpickc" data-k="${key}" data-v="${C.k}">${t('pilih semua')}</button></span><div class="kl-pick">${KLS.filter(L => L.course === C.k).map(L => `<button class="kl-pk ${sel.includes(L.n) ? 'on' : ''}" data-a="klpick" data-k="${key}" data-v="${L.n}"><b>${lnShort(L.n)}</b><span class="hz">${esc(L.title.zh)}</span></button>`).join('')}</div></div>`).join('') + `<button class="kl-pk all" data-a="klpickall" data-k="${key}">${t('Semua lesson')}</button>`;
}
function vKFlash() {
  const st = klState(); const c = st.fcCfg || { ns: [st.last || 1], dir: 'hz', scope: 'core', only: 'all', max: 20 };
  VK.fc = VK.fc || c; const f = VK.fc; const ids = klWords(f.ns, f.scope); const weak = ids.filter(i => fcBox(i) < 3).length;
  const boxes = [0, 1, 2, 3, 4, 5].map(b => ids.filter(i => fcBox(i) === b).length);
  return `<section class="card glass"><button class="btn ghost small" data-a="klback">‹ ${t('Kelas')}</button><h1 style="margin:6px 0 4px">${ICON('cards')} Flashcard</h1><p class="small muted" style="margin:0 0 14px">${t('Kartu dengan sistem kotak: hafal = naik kotak, lupa = balik ke kotak 0 dan muncul lagi sebentar lagi.')}</p>
    <h3>${t('Lesson')}</h3>${lessonPicker('fc', f.ns)}
    <h3>${t('Arah kartu')}</h3><div class="seg">${[['hz', '漢 → arti'], ['mean', 'arti → 漢'], ['audio', '🔊 → arti']].map(([k, l]) => `<button class="${f.dir === k ? 'on' : ''}" data-a="klfcset" data-k="dir" data-v="${k}">${t(l)}</button>`).join('')}</div>
    <h3>${t('Kartu')}</h3><div class="row wrap" style="gap:8px"><div class="seg">${[['core', 'Kata inti'], ['all', 'Semua (+tambahan)']].map(([k, l]) => `<button class="${f.scope === k ? 'on' : ''}" data-a="klfcset" data-k="scope" data-v="${k}">${t(l)}</button>`).join('')}</div>
      <div class="seg">${[['all', 'Semua kartu'], ['weak', 'Yang belum kuat']].map(([k, l]) => `<button class="${f.only === k ? 'on' : ''}" data-a="klfcset" data-k="only" data-v="${k}">${t(l)}</button>`).join('')}</div>
      <div class="seg">${[10, 20, 40, 999].map(m => `<button class="${f.max === m ? 'on' : ''}" data-a="klfcset" data-k="max" data-v="${m}">${m === 999 ? t('Semua') : m}</button>`).join('')}</div></div>
    <div class="kl-boxes">${boxes.map((c, b) => `<div class="kl-bx b${b}"><b>${c}</b><span>${b === 0 ? t('baru/lupa') : t('kotak {b}', { b })}</span></div>`).join('')}</div>
    <div class="row wrap" style="gap:8px;margin-top:14px"><button class="btn pri big" data-a="klfcgo">${ICON('play')} ${t('Mulai ({n} kartu)', { n: Math.min(f.only === 'weak' ? weak : ids.length, f.max) })}</button></div></section>`;
}
function vKQuiz() {
  const st = klState(); VK.q = VK.q || st.qCfg || { ns: [st.last || 1], types: ['mean', 'hz', 'listen', 'gram', 'build', 'dlg'], n: 20, scope: 'all' }; const q = VK.q;
  return `<section class="card glass"><button class="btn ghost small" data-a="klback">‹ ${t('Kelas')}</button><h1 style="margin:6px 0 4px">${ICON('target')} ${t('Kuis kelas')}</h1><p class="small muted" style="margin:0 0 14px">${t('Rakit kuis sendiri: pilih lesson dan jenis soal. Soal yang salah diulang lagi di akhir.')}</p>
    <h3>${t('Lesson')}</h3>${lessonPicker('q', q.ns)}
    <h3>${t('Jenis soal')}</h3><div class="kl-types">${QTYPES.map(([k, l, ic]) => `<button class="kl-ty ${q.types.includes(k) ? 'on' : ''}" data-a="klqtype" data-v="${k}">${ICON(ic)} ${t(l)}</button>`).join('')}</div>
    <h3>${t('Jumlah soal')}</h3><div class="seg">${[10, 20, 30, 50].map(m => `<button class="${q.n === m ? 'on' : ''}" data-a="klqn" data-v="${m}">${m}</button>`).join('')}</div>
    <div class="row wrap" style="gap:8px;margin-top:16px"><button class="btn pri big" data-a="klqgo">${ICON('play')} ${t('Mulai kuis')}</button><button class="btn sec" data-a="klqpreset" data-v="exam">${ICON('award')} ${t('Simulasi ujian campur')}</button></div></section>`;
}
function vKArc() {
  const st = klState(); VK.a = VK.a || st.aNs || [st.last || 1];
  return `<section class="card glass"><button class="btn ghost small" data-a="klback">‹ ${t('Kelas')}</button><h1 style="margin:6px 0 4px">${ICON('game')} ${t('Arcade kelas')}</h1><p class="small muted" style="margin:0 0 14px">${t('Game 漢字 Monster, tapi semua monster membawa kata dari lesson yang kamu pilih. Jawaban di arcade ikut dihitung sebagai ulangan hafalan.')}</p>
    ${lessonPicker('a', VK.a)}<p class="small muted">${t('{n} kata siap bertarung', { n: klWords(VK.a).length })}</p>
    <div class="row wrap" style="gap:8px"><button class="btn pri big" data-a="klarcgo">▶ ${t('Main sekarang')}</button></div></section>`;
}
function vKDrill() {
  return `<section class="card glass"><button class="btn ghost small" data-a="klback">‹ ${t('Kelas')}</button><h1 style="margin:6px 0 4px">${ICON('clock')} ${t('Latihan khusus')}</h1><p class="small muted" style="margin:0 0 14px">${t('Bagian yang paling sering bikin salah di L2–L6, dilatih dengan soal acak tanpa batas.')}</p>
    <div class="kl-sets">${[['time', 'clock', 'Jam', 'L3 · 幾點？ dengan jam analog'], ['date', 'calendar', 'Tanggal & hari', 'L3/L5 · 幾月幾號星期幾'], ['mw', 'layers', 'Kata ukur', 'L2/L6 · 本 張 枝 支 隻 個 杯…'], ['pos', 'target', 'Posisi benda', 'L6 · 上面 下面 旁邊 前面 後面…'], ['price', 'grid', 'Harga & angka besar', 'L5 · 百 千 萬 元']].map(([k, ic, a, b]) => `<button class="kl-set" data-a="kldrillgo" data-v="${k}">${TILE(ic, 'tint c4')}<b>${t(a)}</b><span>${t(b)}</span></button>`).join('')}</div></section>`;
}
function vKSheet() {
  return `<section class="card glass"><button class="btn ghost small" data-a="klback">‹ ${t('Kelas')}</button><h1 style="margin:6px 0 4px">${ICON('grammar')} ${t('Ringkasan grammar semua lesson')}</h1><p class="small muted" style="margin:0">${t('Satu halaman untuk mengulang semua pola sebelum ujian. Ketuk contoh untuk mendengar.')}</p></section>
    ${KLS.map(L => `<section class="card glass"><h2 style="margin:0 0 8px">${L === KLS.find(x => x.course === L.course) ? `<div class="kl-shc hz">${esc(COURSES.find(C => C.k === L.course).zh)}</div>` : ''}<span class="kl-ln">${lnShort(L.n)}</span> <span class="hz">${esc(L.title.zh)}</span></h2>${L.grammar.map(g => `<div class="kl-sh"><div class="kl-gform hz">${esc(g.form)}</div><b>${esc(kx(g.t))}</b><p class="small">${esc(kx(g.note))}</p><div class="kl-shx">${g.ex.slice(0, 2).map(e => `<button class="kl-shb" data-cx="say" data-v="${esc(e.zh)}"><span class="hz">${esc(e.zh)}</span><small>${esc(kx(e))}</small></button>`).join('')}</div></div>`).join('')}</section>`).join('')}`;
}
function vKelas() {
  const v = VK.view;
  if (v === 'lesson') return vLesson(VK.n);
  if (v === 'fc') return vKFlash();
  if (v === 'quiz') return vKQuiz();
  if (v === 'arc') return vKArc();
  if (v === 'speak') return `<section class="card glass"><button class="btn ghost small" data-a="klback">‹ ${t('Kelas')}</button><h1 style="margin:6px 0 0">${ICON('mic')} ${t('Bicara')}</h1></section>${vSpeak()}`;
  if (v === 'drill') return vKDrill();
  if (v === 'sheet') return vKSheet();
  return vKelasMap();
}
/* dialog diputar berurutan; saat main peran, ada jeda untuk giliranmu */
function playDialog(n) {
  if (CXQ.on) { cxQStop(); TTS.stop(); const b = $('#kldplay'); if (b) b.innerHTML = `${ICON('play')} ${t('Putar dialog')}`; return; }
  const d = KL(n).dialog; const run = ++CXQ.run; CXQ.on = true; let j = 0;
  const b = $('#kldplay'); if (b) b.innerHTML = `${ICON('close')} ${t('Berhenti')}`;
  const mark = k => document.querySelectorAll('.kl-dlg .dl').forEach((el, x) => el.classList.toggle('playing', x === k));
  const next = () => {
    if (run !== CXQ.run || !CXQ.on) return;
    if (j >= d.length || ROUTE !== 'kelas' || SES) { CXQ.on = false; mark(-1); const bb = $('#kldplay'); if (bb) bb.innerHTML = `${ICON('play')} ${t('Putar dialog')}`; return; }
    const x = d[j++]; mark(j - 1);
    if (VK.role && x.sp === VK.role) { const el = document.querySelectorAll('.kl-dlg .dl')[j - 1]; setTimeout(() => { if (run === CXQ.run) { if (el) el.classList.add('rev'); speakZh(x.zh, () => setTimeout(next, 600)); } }, 2600 + x.zh.length * 250); return; }
    speakZh(x.zh, ev => { if (ev && ev.type === 'error' && /interrupt|cancel/i.test(ev.error || '')) { CXQ.on = false; mark(-1); return; } setTimeout(next, 500); });
  };
  next();
}

/* ---------- aksi ---------- */
function klPickToggle(key, v) {
  const tgt = key === 'fc' ? VK.fc.ns : key === 'q' ? VK.q.ns : VK.a;
  const k = tgt.indexOf(v); if (k >= 0) { if (tgt.length > 1) tgt.splice(k, 1); } else tgt.push(v); tgt.sort((a, b) => a - b);
}
Object.assign(ACT, {
  klopen: b => { VK.view = 'lesson'; VK.n = +b.dataset.v; VK.tab = 'babak'; VK.grp = 'all'; VK.role = ''; klState().last = VK.n; save(); render(); window.scrollTo(0, 0); },
  klback: () => { cxQStop(); VK.view = VK.view === 'lesson' || VK.view !== 'map' ? 'map' : 'map'; render(); window.scrollTo(0, 0); },
  kltab: b => { cxQStop(); VK.tab = b.dataset.v; render(); },
  klgrp: b => { VK.grp = b.dataset.v; render(); },
  klrole: b => { cxQStop(); VK.role = b.dataset.v; render(); },
  kldplay: b => playDialog(+b.dataset.v),
  klmode: b => { klState().mode = b.dataset.v; save(); render(); },
  klround: b => runRound(+b.dataset.n, +b.dataset.v),
  klfast: b => runFast(+b.dataset.v),
  klgo: () => { const n = nextLesson(); if (!n) return ACT.klquiz(); const r = nextRound(n); if (klState().mode === 'fast' && r.k < 6 && !(klState().r[n + '-fast'] >= 70)) return runFast(n); runRound(n, r.k); },
  klrev: () => { const ids = klWords(KLS.map(L => L.n)).filter(i => S.cards[i] && S.cards[i].due <= Date.now()); startKls(buildRecall(30, ids), { ns: KLS.map(L => L.n), title: t('Ulang kartu kelas'), cat: 'hafal', rebuild: () => buildRecall(30, klWords(KLS.map(L => L.n)).filter(i => S.cards[i] && S.cards[i].due <= Date.now())) }); },
  klfc: () => { VK.view = 'fc'; render(); window.scrollTo(0, 0); },
  klquiz: () => { VK.view = 'quiz'; render(); window.scrollTo(0, 0); },
  klarc: () => { VK.view = 'arc'; render(); window.scrollTo(0, 0); },
  klspeak: () => { VK.view = 'speak'; render(); window.scrollTo(0, 0); },
  kldrill: () => { VK.view = 'drill'; render(); window.scrollTo(0, 0); },
  klsheet: () => { VK.view = 'sheet'; render(); window.scrollTo(0, 0); },
  klfcl: b => openFC({ ns: [+b.dataset.v], dir: 'hz', scope: 'all', only: 'all', max: 999 }),
  klfcg: b => { const n = +b.dataset.v; const L = KL(n); const ids = L.vocab.filter(v => VK.grp === 'all' || v.g === VK.grp).map(v => v.wid); openFC({ ns: [n], dir: 'hz', scope: 'all', only: 'all', max: 999 }); if (FC) { FC.ids = shuffle([...new Set(ids)]); fcRender(); } },
  klqg: b => { const n = +b.dataset.v; const ids = [...new Set(KL(n).vocab.filter(v => VK.grp === 'all' || v.g === VK.grp).map(v => v.wid))]; const mk2 = () => shuffle(ids).slice(0, 20).map((i, j) => wItem(i, ['mc_mean', 'mc_hanzi', 'listen', 'tone'][j % 4])); startKls(mk2(), { n, title: `${lnShort(n)} · ${t('Kuis grup')}`, rebuild: mk2 }); },
  klarcl: b => runArcade([+b.dataset.v]),
  klfcset: b => { const k = b.dataset.k; VK.fc[k] = k === 'max' ? +b.dataset.v : b.dataset.v; render(); },
  klpick: b => { klPickToggle(b.dataset.k, +b.dataset.v); render(); },
  klpickc: b => { const ids = KLS.filter(L => L.course === b.dataset.v).map(L => L.n); const k = b.dataset.k; if (k === 'fc') VK.fc.ns = ids; else if (k === 'q') VK.q.ns = ids; else VK.a = ids; render(); },
  klpickall: b => { const all = KLS.map(L => L.n); const k = b.dataset.k; if (k === 'fc') VK.fc.ns = all; else if (k === 'q') VK.q.ns = all; else VK.a = all.slice(); render(); },
  klfcgo: () => openFC(Object.assign({}, VK.fc, { ns: VK.fc.ns.slice() })),
  klqtype: b => { const v = b.dataset.v; const a = VK.q.types; const k = a.indexOf(v); if (k >= 0) { if (a.length > 1) a.splice(k, 1); } else a.push(v); render(); },
  klqn: b => { VK.q.n = +b.dataset.v; render(); },
  klqgo: () => runQuiz(JSON.parse(JSON.stringify(VK.q))),
  klqpreset: () => { VK.q = { ns: KLS.map(L => L.n), types: ['mean', 'hz', 'listen', 'tone', 'gram', 'build', 'dlg', 'tf', 'time', 'mw', 'pos'], n: 30, scope: 'all' }; runQuiz(JSON.parse(JSON.stringify(VK.q))); },
  klarcgo: () => runArcade(VK.a.slice()),
  kldrillgo: b => { const k = b.dataset.v; const mk2 = () => Array.from({ length: 12 }, () => DRILLS[k]()); startKls(mk2(), { ns: KLS.map(L => L.n), title: t('Latihan khusus'), rebuild: mk2, cat: 'latih' }); },
  klset: b => { const n = +b.dataset.n; const L = KL(n); const k = b.dataset.v;
    const mk2 = () => k === 'gram' ? shuffle(L.mcq).map(m => mcqItem(n, m)) : k === 'build' ? shuffle(L.reorder).map(r => reorderItem(n, r)) : k === 'dlg' ? shuffle(L.pairs).map(p => pairItem(n, p, L.pairs)) : L.tf.flatMap(tf => (tf.passage && tf.passage.zh ? [{ lx: 1, type: 'lread', kind: 'pas', n, pas: tf.passage }] : []).concat(tf.items.map(x => tfItem(n, tf.passage && tf.passage.zh ? tf.passage : null, x))));
    startKls(mk2(), { n, title: `${lnShort(n)} · ${t('Latihan PDF')}`, rebuild: mk2, cat: 'paham' }); },
  klrec: b => recToggle(b.dataset.v, b),
  klplay: b => { const u = REC.url[b.dataset.v]; if (u) new Audio(u).play().catch(() => {}); },
  'goto-kelas': () => { VK.view = 'map'; go('kelas'); }
});
['klround', 'klfast', 'klgo', 'klrev', 'klfcl', 'klfcg', 'klqg', 'klarcl', 'klfcgo', 'klqgo', 'klqpreset', 'klarcgo', 'kldrillgo', 'klset'].forEach(a => START_ACTS.add(a));
document.addEventListener('change', e => {
  const el = e.target; if (!el.dataset || el.dataset.in !== 'klme') return;
  const st = klState(); st.me = st.me || {}; st.me[el.dataset.k] = el.type === 'number' ? Math.max(+el.min, Math.min(+el.max, +el.value || 0)) : el.tagName === 'SELECT' ? +el.value : el.value.slice(0, 12); save(); render();
});
/* halaman lebar untuk kelas + beranda menampilkan kartu kelas di atas */
const afterRenderK = afterRender;
afterRender = function () { afterRenderK(); const app = $('#app'); if (app && ROUTE === 'kelas') app.classList.add('wide'); if (ROUTE !== 'kelas' && CXQ.on && !$('.cx-cards')) cxQStop(); };
function kelasHomeCard() {
  const nl = nextLesson(); const A = courseStats();
  return `<section class="card glass kl-home"><div class="row" style="gap:14px;align-items:center">${ringSVG(A.rounds / (A.n * 6), A.rounds + '/' + A.n * 6, t('BABAK'))}<div class="grow" style="min-width:0"><span class="kl-badge">${ICON('class')} ${t('Kelas')} · ${KLS_VER}</span><h2 style="margin:6px 0 2px">${t('Kelas Mandarin')} · ${A.n} lesson</h2>
    <div class="small muted">${A.done}/${A.n} ${t('lesson khatam')} · ${nl ? t('berikutnya: {n} · {s}', { n: lnShort(nl), s: t(nextRound(nl).ti) }) : t('semua khatam 👑')}</div></div></div>
    <div class="row wrap" style="gap:8px;margin-top:12px"><button class="btn pri" data-a="klgo">${ICON('play')} ${t('Lanjut belajar kelas')}</button><button class="btn sec" data-a="goto-kelas">${ICON('class')} ${t('Buka kelas')}</button></div></section>`;
}
const vHomeK = vHome;
vHome = function () { const h = vHomeK(); const k = h.indexOf('</section>'); return k < 0 ? kelasHomeCard() + h : h.slice(0, k + 10) + kelasHomeCard() + h.slice(k + 10); };
/* rute & tab khusus build kelas */
const startSessionK = startSession;
startSession = function (items, opts = {}) { KLS_ON = !!opts.kls; return startSessionK(items, opts); };
POS.Phr = 'frasa'; POS.Num = 'angka';
ROUTES.splice(1, 0, ['kelas', 'class', 'Kelas']);
TAB_SHORT.kelas = 'Kelas'; ROUTE_DESC.kelas = '16 lesson kelas: babak, flashcard, kuis, arcade'; ROUTE_COLOR.kelas = 'c2';
TABS.splice(0, TABS.length, 'home', 'kelas', 'memory', 'words');
const XVIEWS = { kelas: vKelas };
/* Kelas V0.3: gambar vektor (piktogram) untuk bagian-bagian hanzi + struktur huruf tambahan */