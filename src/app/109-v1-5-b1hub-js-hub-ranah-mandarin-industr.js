/* ========== V1.5 b1hub.js — hub ranah: "Mandarin Industri" (route fab, membungkus Mandarin Pabrik lama) & "Kampus Elektro" (route kampus)
   + pendaftaran route baru (conv, kampus) di sidebar ui2, bar bawah "Lainnya", deskripsi & warna. ========== */
const B1_CAT_IC = { '半導體前段': 'chip', '無塵室': 'sparkle', '半導體基礎': 'layers', '封裝測試': 'grid', '設備維護': 'settings', '工廠生活': 'clock', '課堂學習': 'class',
  '電學電路': 'bolt', '量測儀器': 'target', '機電控制': 'swap', '程式與嵌入式': 'keyboard', '實驗室安全': 'warn', '口語表達': 'chat', '動詞補語': 'link', '生活情境': 'home' };
function b1CatTile(dom, c, ids, k) {
  const kn = ids.filter(i => S.cards[i]).length;
  return `<button class="b1-cat" data-a="b1cat" data-v="${esc(dom + ':' + c)}" style="--tc:var(--c${(k % 8) + 1})">${TILE(B1_CAT_IC[c] || 'book', 'tint c' + ((k % 8) + 1))}
    <span class="b1-catt"><b>${esc(ctxName(c))}</b><span class="hz small muted">${esc(c)}</span></span>
    <span class="b1-catm"><span class="small muted">${kn}/${ids.length}</span><span class="bar"><i style="width:${ids.length ? kn / ids.length * 100 : 0}%"></i></span></span></button>`;
}
function b1HubExamples(tag, n = 8) {
  const out = []; GRAMMAR.forEach(g => { if (out.length >= n) return; const e = (g.ex || []).find(x => x[5] === tag); if (e) out.push([g, e]); });
  return out.map(([g, e]) => `<div class="b1-hx">${b1GEx(e, g.k)}<button class="chip b1-hxg" data-a="gotog" data-v="${esc(g.k)}">${ICON('grammar')} <span class="hz">${esc(G_SHORT[g.k] || g.form)}</span></button></div>`).join('');
}
function b1Hub(dom) {
  const tag = B1_TAG_OF_W[dom]; const D0 = B1_DOM[tag]; const cats = b1Cats()[dom] || [];
  const ids = b1SrcIds('dom:' + dom); const kn = ids.filter(i => S.cards[i]).length;
  const dl = CONV.filter(d => d.dom === tag).sort((a, b) => a.lv - b.lv);
  return `<section class="card glass b1-hcats"><div class="b1-th">${TILE('grid', 'tint ' + D0.c)}<div class="grow" style="min-width:0"><h2>${t('Kosakata per bidang')}</h2><span class="small muted">${t('{a} dari {b} kata dikenal · ketuk bidang untuk belajar, latih, kartu ingat, atau game', { a: fmtN(kn), b: fmtN(ids.length) })}</span></div></div>
      <div class="b1-catg">${cats.map((c, k) => b1CatTile(dom, c.c, c.ids, k)).join('')}</div>
      <div class="row wrap b1-wact" style="margin-top:12px">${b1SrcBtns('dom:' + dom)}</div></section>
    ${dl.length ? `<section class="card glass"><div class="b1-th">${TILE('chat', 'tint c5')}<div class="grow" style="min-width:0"><h2>${t('Percakapan')}</h2><span class="small muted">${t(D0.long)}</span></div><span class="chip">${ICON('check')} ${dl.filter(d => cvDone(d.id)).length}/${dl.length}</span></div><div class="cv-grid">${dl.map(cvCard).join('')}</div></section>` : ''}
    <section class="card glass"><div class="b1-th">${TILE('grammar', 'tint c6')}<div class="grow" style="min-width:0"><h2>${t('Pola grammar dalam konteks ini')}</h2><span class="small muted">${t('Ketuk kalimat untuk mendengar, label pola untuk penjelasannya.')}</span></div></div><div class="b1-exlist">${b1HubExamples(tag)}</div></section>`;
}
/* Kampus Elektro */
function vKampus() {
  const ids = b1SrcIds('dom:ee');
  return `<section class="card glass b1-hhero" style="--tc:var(--c6)"><div class="row" style="gap:14px;align-items:flex-start">${TILE('bolt', 'lg tint c6')}<div class="grow" style="min-width:0"><h1 style="margin:0">${t('Kampus Elektro')}</h1>
      <p class="muted small" style="margin:6px 0 0">${t('Mandarin untuk kuliah Equipment Engineering di Taiwan: kelas & tugas, rangkaian listrik, alat ukur, mekatronika, pemrograman embedded, dan keselamatan lab — plus percakapan dengan dosen, asisten, dan teman sekelompok.')}</p></div></div>
    <div class="b1-tstat"><div><b>${fmtN(ids.length)}</b><span>${t('kata kampus')}</span></div><div><b>${fmtN(ids.filter(i => S.cards[i]).length)}</b><span>${t('dikenal')}</span></div><div><b>${CONV.filter(d => d.dom === 'campus' && cvDone(d.id)).length}/${CONV.filter(d => d.dom === 'campus').length}</b><span>${t('percakapan selesai')}</span></div></div></section>
  ${b1Hub('ee')}`;
}
XVIEWS.kampus = vKampus;
/* Mandarin Industri = hub ranah semi + halaman Mandarin Pabrik lama (istilah ASE, frasa, laporan shift) */
const b1VFabBase = vFab;
vFab = function () {
  const old = b1VFabBase();
  const ids = b1SrcIds('dom:semi');
  const hero = `<section class="card glass b1-hhero" style="--tc:var(--c4)"><div class="row" style="gap:14px;align-items:flex-start">${TILE('chip', 'lg tint c4')}<div class="grow" style="min-width:0"><h1 style="margin:0">${t('Mandarin Industri')}</h1>
      <p class="muted small" style="margin:6px 0 0">${t('Semua untuk kerja di fab & pabrik semikonduktor Taiwan (ASE, TSMC, dll.): istilah proses, cleanroom, perawatan mesin, packaging & testing, kehidupan pabrik, percakapan dengan senior & atasan, dan istilah ASE yang sudah ada.')}</p></div></div>
    <div class="b1-tstat"><div><b>${fmtN(ids.length)}</b><span>${t('istilah & kata')}</span></div><div><b>${fmtN(ids.filter(i => S.cards[i]).length)}</b><span>${t('dikenal')}</span></div><div><b>${CONV.filter(d => d.dom === 'fab' && cvDone(d.id)).length}/${CONV.filter(d => d.dom === 'fab').length}</b><span>${t('percakapan selesai')}</span></div></div></section>`;
  /* halaman lama: judul h1 → h2 supaya hanya ada satu judul utama */
  const legacy = old.replace(`<h1>${t('Mandarin Pabrik')}</h1>`, `<h2>${ICON('chip')} ${t('Istilah ASE · equipment engineering')}</h2>`);
  return hero + b1Hub('semi') + `<div class="u2-group b1-legacy">${u2Head('Istilah ASE & frasa lantai produksi')}${legacy}</div>`;
};
Object.assign(ACT, {
  b1cat: b => {
    const [dom, ...rest] = b.dataset.v.split(':'); const c = rest.join(':'); const src = 'c:' + dom + ':' + c; const ids = b1SrcIds(src);
    openModal(`<div class="q-kind">${ICON(B1_CAT_IC[c] || 'book')} ${esc(b1SrcName('dom:' + dom))}</div><h2 style="margin:6px 0 2px">${esc(ctxName(c))}</h2><div class="hz small muted" style="margin-bottom:12px">${esc(c)} · ${ids.length} ${t('kata')}</div>
      <div class="row wrap b1-wact" style="margin-bottom:14px">${b1SrcBtns(src)}</div><div class="wlist">${ids.map(wordRow).join('')}</div>`);
  },
  kampus: () => go('kampus')
});

/* ---------- route & navigasi ---------- */
if (!ROUTES.some(r => r[0] === 'conv')) { const k = ROUTES.findIndex(r => r[0] === 'listen'); ROUTES.splice(k >= 0 ? k + 1 : 2, 0, ['conv', 'chat', 'Percakapan']); }
if (!ROUTES.some(r => r[0] === 'kampus')) { const k = ROUTES.findIndex(r => r[0] === 'fab'); ROUTES.splice(k >= 0 ? k : ROUTES.length - 2, 0, ['kampus', 'bolt', 'Kampus Elektro']); }
{ const f = ROUTES.find(r => r[0] === 'fab'); if (f) f[2] = 'Mandarin Industri'; }
Object.assign(TAB_SHORT, { conv: 'Percakapan', kampus: 'Kampus', fab: 'Industri' });
Object.assign(ROUTE_DESC, { conv: '38 dialog · shadowing & role-play', kampus: 'Kuliah elektro & lab', fab: 'Fab, cleanroom & istilah ASE' });
ROUTE_DESC.conv = (typeof CONV !== 'undefined' ? CONV.length : 0) + ' dialog · shadowing & role-play';
Object.assign(ROUTE_COLOR, { conv: 'c5', kampus: 'c6', fab: 'c4' });
(function () {
  const lat = U2_GROUPS.find(g => g[0] === 'Latihan'); if (lat && !lat[1].includes('conv')) lat[1].splice(Math.min(2, lat[1].length), 0, 'conv');
  const main = U2_GROUPS.find(g => g[0] === 'Main'); if (main) { const k = main[1].indexOf('fab'); if (k >= 0) main[1].splice(k, 1); }
  if (!U2_GROUPS.some(g => g[0] === 'Kampus & kerja')) { const k = U2_GROUPS.findIndex(g => g[0] === 'Main'); U2_GROUPS.splice(k >= 0 ? k : U2_GROUPS.length - 1, 0, ['Kampus & kerja', ['kampus', 'fab']]); }
})();

Object.assign(I18N, {
  'Kampus & kerja': ['Campus & work', 'Kampus at trabaho'], 'Mandarin Industri': ['Industry Mandarin', 'Mandarin sa industriya'], 'Kosakata per bidang': ['Vocabulary by field', 'Bokabularyo ayon sa larangan'],
  '{a} dari {b} kata dikenal · ketuk bidang untuk belajar, latih, kartu ingat, atau game': ['{a} of {b} words known · tap a field to learn, practise, review or play', '{a} sa {b} salita ang kilala · pindutin ang larangan'],
  'Pola grammar dalam konteks ini': ['Grammar in this context', 'Grammar sa kontekstong ito'], 'Ketuk kalimat untuk mendengar, label pola untuk penjelasannya.': ['Tap a sentence to hear it, the pattern label for its explanation.', 'Pindutin ang pangungusap para marinig.'],
  'Mandarin untuk kuliah Equipment Engineering di Taiwan: kelas & tugas, rangkaian listrik, alat ukur, mekatronika, pemrograman embedded, dan keselamatan lab — plus percakapan dengan dosen, asisten, dan teman sekelompok.': ['Mandarin for Equipment Engineering studies in Taiwan: classes & assignments, circuits, measuring instruments, mechatronics, embedded programming and lab safety — plus conversations with lecturers, TAs and teammates.', 'Mandarin para sa Equipment Engineering sa Taiwan: klase, circuit, instrumento, mechatronics, embedded at kaligtasan sa lab.'],
  'kata kampus': ['campus words', 'salita sa kampus'], 'percakapan selesai': ['conversations done', 'tapos na usapan'], 'istilah & kata': ['terms & words', 'termino at salita'],
  'Semua untuk kerja di fab & pabrik semikonduktor Taiwan (ASE, TSMC, dll.): istilah proses, cleanroom, perawatan mesin, packaging & testing, kehidupan pabrik, percakapan dengan senior & atasan, dan istilah ASE yang sudah ada.': ['Everything for working in Taiwan’s semiconductor fabs (ASE, TSMC…): process terms, cleanroom, maintenance, packaging & testing, factory life, talking with seniors & supervisors, plus the ASE terms.', 'Lahat para sa trabaho sa semiconductor fab sa Taiwan: proseso, cleanroom, maintenance, packaging, buhay sa pabrika at usapan.'],
  'Istilah ASE · equipment engineering': ['ASE terms · equipment engineering', 'Termino ng ASE · equipment engineering'], 'Istilah ASE & frasa lantai produksi': ['ASE terms & shop-floor phrases', 'Termino ng ASE at parirala']
});
Object.assign(I18N_VI, {
  'Kampus & kerja': 'Trường & công việc', 'Mandarin Industri': 'Tiếng Trung công nghiệp', 'Kosakata per bidang': 'Từ vựng theo lĩnh vực',
  '{a} dari {b} kata dikenal · ketuk bidang untuk belajar, latih, kartu ingat, atau game': 'Đã biết {a}/{b} từ · chạm lĩnh vực để học, luyện, ôn hoặc chơi', 'Pola grammar dalam konteks ini': 'Ngữ pháp trong ngữ cảnh này',
  'Ketuk kalimat untuk mendengar, label pola untuk penjelasannya.': 'Chạm câu để nghe, chạm nhãn mẫu để xem giải thích.',
  'Mandarin untuk kuliah Equipment Engineering di Taiwan: kelas & tugas, rangkaian listrik, alat ukur, mekatronika, pemrograman embedded, dan keselamatan lab — plus percakapan dengan dosen, asisten, dan teman sekelompok.': 'Tiếng Trung cho ngành Kỹ thuật thiết bị ở Đài Loan: lớp học, mạch điện, dụng cụ đo, cơ điện tử, lập trình nhúng và an toàn phòng thí nghiệm.',
  'kata kampus': 'từ ở trường', 'percakapan selesai': 'hội thoại xong', 'istilah & kata': 'thuật ngữ & từ',
  'Semua untuk kerja di fab & pabrik semikonduktor Taiwan (ASE, TSMC, dll.): istilah proses, cleanroom, perawatan mesin, packaging & testing, kehidupan pabrik, percakapan dengan senior & atasan, dan istilah ASE yang sudah ada.': 'Mọi thứ để làm việc ở nhà máy bán dẫn Đài Loan: quy trình, phòng sạch, bảo trì, đóng gói & kiểm thử, đời sống nhà máy và hội thoại.',
  'Istilah ASE · equipment engineering': 'Thuật ngữ ASE · kỹ thuật thiết bị', 'Istilah ASE & frasa lantai produksi': 'Thuật ngữ ASE & câu nói ở xưởng'
});

