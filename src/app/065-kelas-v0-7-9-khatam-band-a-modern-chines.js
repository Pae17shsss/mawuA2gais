/* ========== Kelas V0.7.9: KHATAM BAND A — 時代華語 Modern Chinese 1 (L1–15) ==========
   Alur mengikuti buku: 對話一 → 生詞 → 語法 + 課堂練習 → (kuasai dialog) → 對話二 → … → 短文 → 課堂活動 → 小考.
   Ulangan berjarak memakai kartu SRS bawaan; tiap 4 lesson ada ujian bab gaya TOCFL Band A. */

const KB_C = 'sd';
const KB_META = {
  voc: { zh: '生詞', ti: 'Kosakata', sub: 'Kenali semua kata lesson dulu (20 kata per sesi), lalu cek arti, suara & hanzi', ic: 'seed', pass: 70, min: 8 },
  dlg: { zh: '對話', ti: 'Dialog', sub: 'Dengar, tirukan & main peran dialog buku, lalu cek pemahaman', ic: 'chat', pass: 70, min: 12 },
  gram: { zh: '語法', ti: 'Grammar + latihan buku', sub: 'Tiap pola: penjelasan → contoh → 課堂練習, lalu isi titik-titik', ic: 'grammar', pass: 70, min: 12 },
  read: { zh: '短文', ti: 'Bacaan & bicara', sub: 'Baca & dengar teks, kegiatan kelas, lalu soal bacaan', ic: 'book', pass: 70, min: 10 },
  mix: { zh: '熟練', ti: 'Latihan campur', sub: 'Isi dialog, susun kalimat, dengar — semua isi lesson diacak', ic: 'target', pass: 75, min: 8 },
  test: { zh: '小考', ti: 'Ujian lesson', sub: '20 soal tanpa bantuan — lulus ≥ 80% = lesson khatam', ic: 'crown', pass: 80, min: 8 }
};
const KB_PACE = { santai: { n: 1, ti: 'Santai', sub: '1 langkah/hari · ±12 menit' }, normal: { n: 2, ti: 'Normal', sub: '2 langkah/hari · ±25 menit' }, ngebut: { n: 4, ti: 'Ngebut', sub: '4 langkah/hari · ±50 menit' } };
const KB_OLD = { voc: ['v1', 'v2'], dlg: ['d1', 'd2', 'm1', 'm2'], gram: ['g1', 'g2'], read: ['rd', 'act'], test: ['test'] };
const KB_UNITS = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15]];
const KB_M = { 中明: 'M', 國安: 'M', 爸爸: 'M', 太郎: 'M', 小林: 'M', 王先生: 'M', 李先生: 'M', 老闆: 'M', 司機: 'M', 哥哥: 'M', 弟弟: 'M', 宜文: 'F', 友美: 'F', 媽媽: 'F', 女店員: 'F', 小美: 'F', 姐姐: 'F', 妹妹: 'F', 老師: 'F', 店員: 'F', 王太太: 'F', 陳小姐: 'F', 護士: 'F', 醫生: 'M' };

function kbS() {
  const st = klState(); if (!st.kb || typeof st.kb !== 'object') st.kb = {};
  const k = st.kb; ['st', 'done', 'unit', 'log'].forEach(x => { if (!k[x] || typeof k[x] !== 'object') k[x] = {}; });
  if (!KB_PACE[k.pace]) k.pace = 'normal'; if (!k.start) k.start = todayKey();
  if (k.py === undefined) k.py = true; if (k.tr === undefined) k.tr = true;
  if (!k.v2) { /* pindahkan progres format lama (11 babak) ke 6 langkah baru */
    const ns = new Set(Object.keys(k.st).map(x => x.split('-')[0]));
    ns.forEach(n => Object.entries(KB_OLD).forEach(([nk, olds]) => { if (k.st[n + '-' + nk] !== undefined) return; const vs = olds.map(o => k.st[n + '-' + o]).filter(v => v !== undefined); if (vs.length && vs.length === olds.filter(o => k.st[n + '-' + o] !== undefined || ['v2', 'd2', 'm2', 'g2', 'act'].indexOf(o) < 0).length) k.st[n + '-' + nk] = Math.min(...vs); }));
    k.v2 = 1;
  }
  return k;
}
const kbLessons = () => KLS.filter(L => L.course === KB_C);
const kbBook = n => (KL(n) && KL(n).book) || { dialogs: [], activity: [], notes: [] };
const kbDlg = (n, k) => kbBook(n).dialogs.find(d => d.k === k);
function kbStages(n) {
  const L = KL(n); const B = kbBook(n); const out = ['voc'];
  if (B.dialogs.length) out.push('dlg');
  if (L.grammar.length) out.push('gram');
  if (B.reading || (B.activity && B.activity.length)) out.push('read');
  out.push('mix', 'test');
  return out;
}
const KB_AW = {};
function kbAllWords(n) { /* kosakata lesson + semua kata lain yang muncul di dialog & bacaan buku */
  if (KB_AW[n]) return KB_AW[n];
  const base = klWords(n); const set = new Set(base); const B = kbBook(n); const tx = [];
  B.dialogs.forEach(D => D.lines.forEach(x => tx.push(x.zh))); if (B.reading) tx.push(B.reading.zh);
  if (typeof vcSegment === 'function') tx.forEach(s0 => vcSegment(s0).forEach(i => { const w = W[i]; if (w && !VC_SKIP.has(w.w)) set.add(i); }));
  return (KB_AW[n] = [...set]);
}
const kbFresh = n => kbAllWords(n).filter(i => !S.cards[i]).length;
const kbKey = (n, k) => n + '-' + k;
const kbScore = (n, k) => kbS().st[kbKey(n, k)];
const kbStageDone = (n, k) => { const s = kbScore(n, k); const p = KB_META[k] && KB_META[k].pass; return s !== undefined && (p ? s >= p : s >= 100); };
const kbLessonDone = n => !!kbS().done[n];
function kbNextStage(n) { return kbStages(n).find(k => !kbStageDone(n, k)) || null; }
function kbNextLesson() { const L = kbLessons().find(L => !kbLessonDone(L.n)); return L ? L.n : null; }
function kbTotals() {
  const ls = kbLessons(); let tot = 0, done = 0;
  ls.forEach(L => kbStages(L.n).forEach(k => { tot++; if (kbStageDone(L.n, k)) done++; }));
  return { tot, done, lessons: ls.length, khatam: ls.filter(L => kbLessonDone(L.n)).length };
}
function kbMark(n, k, score) {
  const S0 = kbS(); const key = kbKey(n, k); const was = kbStageDone(n, k);
  S0.st[key] = Math.max(S0.st[key] || 0, score);
  const now = kbStageDone(n, k);
  if (now && !was) { const d = todayKey(); S0.log[d] = (S0.log[d] || 0) + 1; }
  if (k === 'test' && now && !S0.done[n]) S0.done[n] = todayKey();
  save(); return { now, first: now && !was };
}
const kbToday = () => kbS().log[todayKey()] || 0;
function kbEta() {
  const T = kbTotals(); const left = T.tot - T.done; const per = KB_PACE[kbS().pace].n;
  const days = Math.ceil(left / per); return { left, days, date: keyAdd(todayKey(), Math.max(0, days - 1)) };
}
function kbDue() { const ids = new Set(klWords(kbLessons().map(L => L.n))); return [...ids].filter(i => S.cards[i] && S.cards[i].due <= Date.now()); }
const kbVoice = (sp, map) => { if (KB_M[sp]) return KB_M[sp]; if (/先生|哥|弟|爸|叔|爺/.test(sp)) return 'M'; if (/小姐|太太|姐|妹|媽|阿姨|奶/.test(sp)) return 'F'; return map[sp] || 'N'; };
function kbVoiceMap(lines) { const m = {}; let alt = 0; lines.forEach(x => { if (x.sp && !KB_M[x.sp] && !m[x.sp]) m[x.sp] = alt++ % 2 ? 'F' : 'M'; }); return m; }

/* ---------- tampilan: halaman utama Khatam Band A ---------- */
const KBV = { n: 0, k: 'd1', role: '', play: -1, sh: false };
function kbRing(p, size = 64, col = 'var(--acc)') {
  const r = size / 2 - 5; const c = 2 * Math.PI * r;
  return `<svg class="kb-ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="6"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${col}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - clamp(p, 0, 1))}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg>`;
}
function vKb() {
  const S0 = kbS(); const T = kbTotals(); const nl = kbNextLesson(); const ns = nl ? kbNextStage(nl) : null; const eta = kbEta(); const due = kbDue().length;
  const per = KB_PACE[S0.pace].n; const td = kbToday(); const pct = Math.round(T.done / Math.max(1, T.tot) * 100);
  const curU = nl ? KB_UNITS.findIndex(u => u.includes(KL(nl).num)) : KB_UNITS.length - 1;
  const head = `<section class="card glass kb-hero"><button class="btn ghost small" data-a="klback">‹ ${t('Kelas')}</button>
    <div class="kb-ht"><span class="kb-seal hz">時代<br>華語</span><div class="grow" style="min-width:0"><span class="kl-badge">${ICON('award')} Khatam Band A</span><h1 class="hz" style="margin:4px 0 0">時代華語 1</h1><p class="muted small" style="margin:2px 0 0">${t('Lesson 1–15 sesuai buku. Tiap lesson 6 langkah — ikuti urutannya, satu langkah ±10 menit.')}</p></div>${kbRing(T.done / Math.max(1, T.tot), 64)}</div>
    <div class="kb-kpi"><div><b>${pct}%</b><span>${t('selesai')}</span></div><div><b>${T.khatam}/${T.lessons}</b><span>${t('lesson khatam')}</span></div><div><b>${Math.min(td, per)}/${per}</b><span>${t('target hari ini')}</span></div><div><b>${eta.left ? eta.date.slice(5).replace('-', '/') : '✓'}</b><span>${eta.left ? t('perkiraan tamat') : t('buku tamat!')}</span></div></div></section>`;
  const next = nl ? `<section class="card glass kb-next"><div class="kb-nh"><span class="small muted">${td >= per ? t('Target hari ini sudah tercapai — boleh lanjut atau ulang kartu.') : t('Langkah berikutnya')}</span></div>
      <button class="kb-nc" data-a="kbgo" data-n="${nl}" data-k="${ns}"><span class="kb-ni">${ICON(KB_META[ns].ic)}</span><span class="grow" style="min-width:0"><small>${lnShort(nl)} · <span class="hz">${esc(KL(nl).title.zh)}</span></small><b><span class="hz">${KB_META[ns].zh}</span> ${t(KB_META[ns].ti)}</b><span class="small muted">±${KB_META[ns].min} ${t('menit')} · ${t('langkah {a}/{b}', { a: kbStages(nl).indexOf(ns) + 1, b: kbStages(nl).length })}</span></span><span class="btn pri">${ICON('play')} ${t('Mulai')}</span></button>
      <div class="kb-tools">${due ? `<button class="btn sec small" data-a="kbrev">${ICON('refresh')} ${t('Ulang {n} kartu', { n: due })}</button>` : ''}<div class="seg kb-pseg">${Object.entries(KB_PACE).map(([k, p]) => `<button class="${S0.pace === k ? 'on' : ''}" data-a="kbpace" data-v="${k}" title="${esc(t(p.sub))}">${t(p.ti)}</button>`).join('')}</div></div></section>`
    : `<section class="card glass kb-next"><b>${t('Semua lesson khatam! Kerjakan ujian bab untuk mengunci hasilmu.')}</b></section>`;
  const units = KB_UNITS.map((u, ui) => {
    const ls = u.map(x => kbLessons().find(L => L.num === x)).filter(Boolean);
    const ready = ls.every(L => kbLessonDone(L.n)); const us = S0.unit[ui]; const dn = ls.filter(L => kbLessonDone(L.n)).length;
    return `<details class="kb-unit" ${ui === curU ? 'open' : ''}><summary><b>${t('Bab {u}', { u: ui + 1 })}</b><span class="small muted">Lesson ${u[0]}–${u[u.length - 1]} · ${dn}/${ls.length} ${t('khatam')}${us !== undefined ? ' · ' + t('ujian') + ' ' + us + '%' : ''}</span>${ICON('chevron')}</summary>
      <div class="kb-ls">${ls.map(L => kbLessonCard(L)).join('')}
      <button class="kb-boss ${ready ? 'ready' : ''} ${us >= 80 ? 'won' : ''}" data-a="kbunit" data-v="${ui}"><span class="kb-bi">${us >= 80 ? ICON('crown') : ICON('target')}</span><span class="grow" style="min-width:0"><b>${t('Ujian bab {u}', { u: ui + 1 })} · <span class="hz">單元測驗</span></b><span class="small">${us !== undefined ? t('Skor terbaik {s}%', { s: us }) : ready ? t('30 soal gaya TOCFL Band A — siap!') : t('Disarankan setelah semua lesson bab ini khatam')}</span></span>${ICON('chevron')}</button></div></details>`;
  }).join('');
  const how = `<details class="card glass kb-how"><summary><b>${t('Kenapa urutannya begini?')}</b>${ICON('chevron')}</summary><div class="steps-mini">
    ${[['生詞', 'Kata dulu', 'Kenal kata sebelum membaca dialog membuat dialog langsung bisa dipahami, bukan ditebak.'],
      ['對話', 'Dialog = konteks', 'Dengar → tirukan → main peran. Kata & pola muncul dalam percakapan nyata dari buku.'],
      ['語法', 'Pola + latihan buku', 'Tiap pola langsung dicoba di 課堂練習: jawab dulu di kepala, baru lihat kunci.'],
      ['短文', 'Baca & bicara', 'Bacaan mengulang kata dalam teks baru; kegiatan kelas melatih bicara.'],
      ['熟練', 'Campur & ulang', 'Soal diacak dari semua bagian. Kartu lama yang jatuh tempo ikut muncul di awal tiap langkah.'],
      ['小考', 'Gerbang khatam', 'Lulus ≥ 80% tanpa bantuan = khatam. Tiap 4 lesson ada ujian bab gaya TOCFL Band A.']].map(([i, a, b]) => `<div class="sm-step"><span class="hz">${i}</span><div><b>${t(a)}</b><p>${t(b)}</p></div></div>`).join('')}</div>
    <p class="small muted" style="margin:10px 0 0">${t('Catatan: scan buku berhenti di tengah Lesson 15, jadi bacaan & kegiatan Lesson 15 belum ada.')}</p></details>`;
  return head + next + units + how;
}
function kbLessonCard(L) {
  const n = L.n; const sts = kbStages(n); const dn = sts.filter(k => kbStageDone(n, k)).length; const done = kbLessonDone(n);
  return `<button class="kb-lc ${done ? 'done' : ''}" data-a="kbopen" data-v="${n}"><span class="kb-ln">${done ? ICON('crown') : L.num}</span>
    <span class="grow" style="min-width:0"><b class="hz">${esc(L.title.zh)}</b><span class="small muted">${esc(kx(L.title))}</span>
    <span class="kb-dots">${sts.map(k => `<i class="${kbStageDone(n, k) ? 'on' : ''} ${k === 'test' ? 'tst' : ''}" title="${KB_META[k].zh}"></i>`).join('')}</span></span>
    <span class="kb-pct">${dn}/${sts.length}</span></button>`;
}
function vKbLesson(n) {
  const L = KL(n); const B = kbBook(n); const sts = kbStages(n); const nx = kbNextStage(n); const dn = sts.filter(k => kbStageDone(n, k)).length;
  const fresh = kbFresh(n); const nw = kbAllWords(n).length;
  const rows = sts.map((k, i) => {
    const M = KB_META[k]; const sc = kbScore(n, k); const ok = kbStageDone(n, k); const cur0 = k === nx;
    const extra = k === 'voc' && !ok ? ` · ${t('{a}/{b} kata dikenal', { a: nw - fresh, b: nw })}` : '';
    return `<button class="kb-st ${ok ? 'ok' : ''} ${cur0 ? 'next' : ''}" data-a="kbgo" data-n="${n}" data-k="${k}"><span class="kb-sn">${ok ? ICON('check') : i + 1}</span>
      <span class="grow" style="min-width:0"><b><span class="hz">${M.zh}</span> · ${t(M.ti)}</b>${cur0 ? `<span class="small muted">${t(M.sub)}</span>` : ''}<span class="small muted">±${M.min} ${t('menit')}${extra}</span></span>
      <span class="kb-sc">${sc !== undefined ? (ok ? ICON('check') : sc + '%') : ''}</span>${cur0 ? `<span class="btn pri small">${t('Mulai')}</span>` : ICON('chevron')}</button>`;
  }).join('');
  return `<section class="card glass kb-lhero"><button class="btn ghost small" data-a="kbhome">‹ Khatam Band A</button>
    <div class="kb-lh"><span class="kb-ln big">${L.num}</span><div class="grow" style="min-width:0"><small class="muted">${lnLong(n)}</small><h1 class="hz" style="margin:2px 0">${esc(L.title.zh)}</h1><div class="small muted">${esc(L.title.py || '')} · ${esc(kx(L.title))}</div></div>${kbRing(dn / sts.length, 54)}</div>
    ${kx(L.goal) ? `<div class="gtip">${ICON('target')}<span><b>${t('Target')}:</b> ${esc(kx(L.goal))}</span></div>` : ''}
    ${B.incomplete ? `<div class="notice">${t('Scan buku berakhir di tengah lesson ini — yang tersedia: dialog 1, dialog 2 dan sebagian grammarnya.')}</div>` : ''}
    <div class="kb-tools"><button class="btn sec small" data-a="kbbook" data-v="${n}">${ICON('book')} ${t('Buka buku')}</button><button class="btn ghost small" data-a="kbfc" data-v="${n}">${ICON('cards')} ${t('Flashcard')}</button>${kbLessonDone(n) ? `<span class="chip on">${ICON('crown')} ${t('khatam')}</span>` : ''}</div></section>
    <section class="kb-sts">${rows}</section>`;
}
function kbLineHTML(x, i, o) {
  const S0 = kbS();
  if (!x.sp) return `<div class="kb-sd">${esc(x.zh)}</div>`;
  const me = o.role && o.role === x.sp;
  return `<div class="dl ${spCls(x.sp)} ${me ? 'me' : ''} ${o.play === i ? 'playing' : ''}" data-i="${i}"><span class="dl-sp">${esc(x.sp)}</span>
    <div class="dl-b"><div class="dl-l">${S0.py ? klLine(x.zh, x.py) : `<span class="hz kb-zh">${esc(x.zh)}</span>${lvBadgeS(x.zh)}`}</div>${S0.tr ? `<div class="dl-tr">${esc(kx(x))}</div>` : ''}${me ? `<button class="dl-rev" data-a="kbrevl">${t('Giliranmu! Ucapkan, lalu ketuk')}</button>` : ''}</div>
    <button class="speak mini" data-a="kbsay" data-v="${esc(x.zh)}" data-sp="${esc(x.sp)}">${ICON('speaker')}</button></div>`;
}
function kbToggles() {
  const S0 = kbS();
  return `<div class="kb-tg"><button class="chip ${S0.py ? 'on' : ''}" data-a="kbtog" data-v="py">拼音 pinyin</button><button class="chip ${S0.tr ? 'on' : ''}" data-a="kbtog" data-v="tr">${t('Terjemahan')}</button></div>`;
}
function vKbDialog(n, k) {
  const B = kbBook(n); if (!B.dialogs.find(d => d.k === k)) k = KBV.k = B.dialogs[0].k;
  const D = kbDlg(n, k); const L = KL(n); const sps = [...new Set(D.lines.filter(x => x.sp).map(x => x.sp))];
  const done = kbStageDone(n, 'dlg');
  return `<section class="card glass"><button class="btn ghost small" data-a="kbopen" data-v="${n}">‹ ${lnShort(n)} <span class="hz">${esc(L.title.zh)}</span></button>
    <h1 style="margin:6px 0 8px"><span class="hz">對話</span> · ${t('Dialog')}</h1>
    ${B.dialogs.length > 1 ? `<div class="seg kb-dtab">${B.dialogs.map(d => `<button class="${d.k === k ? 'on' : ''}" data-a="kbdtab" data-v="${d.k}"><span class="hz">${esc(d.label)}</span></button>`).join('')}</div>` : ''}
    ${D.place ? `<div class="kb-place hz">${esc(D.place.zh || '')} <span class="small muted">${esc(kx(D.place) || '')}</span></div>` : ''}
    <ol class="kb-howto small muted"><li>${t('Putar semua & ikuti teksnya')}</li><li>${t('Mode bayangan: tirukan tiap kalimat')}</li><li>${t('Main peran: ucapkan kalimat satu tokoh tanpa melihat')}</li></ol>
    <div class="kb-ctl"><button class="btn pri" data-a="kbplay">${ICON(KBV.play >= 0 ? 'close' : 'play')} ${KBV.play >= 0 ? t('Stop') : t('Putar semua')}</button>
      <button class="btn sec ${KBV.sh ? 'on' : ''}" data-a="kbshadow">${ICON('mic')} ${t('Mode bayangan')}</button>${kbToggles()}</div>
    <div class="kb-roles"><span class="small muted">${t('Main peran')}:</span>${sps.map(s => `<button class="chip ${KBV.role === s ? 'on' : ''}" data-a="kbrole" data-v="${esc(s)}">${esc(s)}</button>`).join('')}${KBV.role ? `<button class="chip" data-a="kbrole" data-v="">${t('Selesai')}</button>` : ''}</div>
    <div class="kl-dlg kb-dlg">${D.lines.map((x, i) => kbLineHTML(x, i, { role: KBV.role, play: KBV.play })).join('')}</div></section>
    <section class="card glass kb-cta"><div class="grow"><b>${t('Sudah paham semua dialog?')}</b><span class="small muted">${t('Cek pemahaman: isi kata hilang, lanjutkan percakapan, tanya-jawab (dengan konteks).')}</span></div><button class="btn ${done ? 'sec' : 'pri'}" data-a="kbrun" data-n="${n}" data-k="dlg">${ICON(done ? 'refresh' : 'play')} ${done ? t('Ulangi cek') : t('Cek pemahaman')}</button></section>
    ${kbVocabList(n, k)}`;
}
function kbVocabList(n, g) {
  const vs = KL(n).vocab.filter(v => v.g === g); if (!vs.length) return '';
  return `<section class="card glass"><h2>${t('Kosakata')} <span class="hz">生詞</span> <span class="small muted">${vs.length}</span></h2><div class="kb-vl">${vs.map(v => `<div class="kb-v ${v.sub ? 'sub' : ''}">
    <span class="kb-vn">${v.no != null && !v.sub ? v.no : ''}</span><button class="kb-vh hz" data-cx="say" data-v="${esc(v.hz)}">${esc(v.hz)}${lvBadgeW(v.wid != null ? v.wid : v.hz)}</button>
    <span class="grow" style="min-width:0"><span class="kb-vp">${esc(v.py)}</span> <span class="kb-pos">${esc(v.pos || '')}</span><span class="kb-vm">${esc(kx(v))}</span>
    ${v.ex ? `<span class="kb-vx"><span class="hz">${esc(v.ex.zh)}</span>${lvBadgeS(v.ex.zh)} <button class="cx-sp" data-cx="say" data-v="${esc(v.ex.zh)}">${ICON('speaker')}</button><small>${esc(kx(v.ex))}</small></span>` : ''}</span></div>`).join('')}</div></section>`;
}
function vKbReading(n) {
  const B = kbBook(n); const R = B.reading; const L = KL(n); const S0 = kbS(); const hasAct = (B.activity && B.activity.length) || L.speak.length;
  const tab = R ? (KBV.rt === 'act' && hasAct ? 'act' : 'rd') : 'act'; const done = kbStageDone(n, 'read');
  let body = '';
  if (tab === 'rd') {
    const sents = (R.zh.match(/[^。！？!?]+[。！？!?」]*/g) || [R.zh]).map(s => s.trim()).filter(Boolean);
    body = `<h2 class="hz" style="margin:8px 0 0">${esc((R.title && R.title.zh) || '')}</h2><div class="small muted">${esc((R.title && (R.title.py || '')) || '')} ${R.title ? '· ' + esc(kx(R.title)) : ''}</div>
      <div class="kb-ctl"><button class="btn pri" data-a="kbrdplay">${ICON(KBV.play >= 0 ? 'close' : 'play')} ${KBV.play >= 0 ? t('Stop') : t('Dengar bacaan')}</button>${kbToggles()}</div>
      <div class="kb-rd">${S0.py ? `<div class="kb-rdpy">${klLine(R.zh, R.py)}</div>` : `<p class="hz kb-rdzh">${sents.map((s, i) => `<span class="${KBV.play === i ? 'playing' : ''}" data-a="kbsay" data-v="${esc(s)}">${esc(s)}</span>`).join('')}</p>`}
      ${S0.tr ? `<p class="kb-rdtr">${esc(kx(R))}</p>` : ''}</div>`;
  }
  return `<section class="card glass"><button class="btn ghost small" data-a="kbopen" data-v="${n}">‹ ${lnShort(n)} <span class="hz">${esc(L.title.zh)}</span></button>
    <h1 style="margin:6px 0 8px"><span class="hz">短文</span> · ${t('Bacaan & bicara')}</h1>
    ${R && hasAct ? `<div class="seg kb-dtab"><button class="${tab === 'rd' ? 'on' : ''}" data-a="kbrtab" data-v="rd">${ICON('book')} ${t('Bacaan')}</button><button class="${tab === 'act' ? 'on' : ''}" data-a="kbrtab" data-v="act">${ICON('mic')} ${t('Kegiatan kelas')}</button></div>` : ''}
    ${body}</section>
    ${tab === 'act' ? vKbAct(n, true) : kbVocabList(n, 'core')}
    <section class="card glass kb-cta"><div class="grow"><b>${R ? t('Soal bacaan') : t('Kegiatan kelas')}</b><span class="small muted">${R ? t('Benar/salah & tanya-jawab dengan teks di atas soal.') : t('Latih bicara sesuai kegiatan buku, lalu tandai selesai.')}</span></div>${R ? `<button class="btn ${done ? 'sec' : 'pri'}" data-a="kbrun" data-n="${n}" data-k="read">${ICON(done ? 'refresh' : 'play')} ${done ? t('Ulangi') : t('Kerjakan')}</button>` : `<button class="btn ${done ? 'sec' : 'pri'}" data-a="kbdone" data-n="${n}" data-k="read">${ICON('check')} ${done ? t('Selesai') : t('Sudah latihan')}</button>`}</section>`;
}
function vKbAct(n, inner) {
  const L = KL(n); const B = kbBook(n); const done = kbStageDone(n, 'read');
  const recBtns = k => `<button class="cx-sp kl-rec" data-a="klrec" data-v="${k}" aria-label="${t('Rekam suaraku')}">${ICON('mic')}</button>${REC.url[k] ? `<button class="cx-sp" data-a="klplay" data-v="${k}">${ICON('play')}</button>` : ''}`;
  const acts = (B.activity || []).map((a, ai) => `<section class="card glass kb-act"><div class="kb-at"><span class="kb-an">${ai + 1}</span><div class="grow"><b>${esc((a.title && (a.title.zh || '')) || '')} ${a.title && kx(a.title) ? '· ' + esc(kx(a.title)) : ''}</b>${a.inst && kx(a.inst) ? `<p class="small">${esc(kx(a.inst))}</p>` : ''}${a.inst && a.inst.en && meanLang() !== 'en' ? `<p class="small muted">${esc(a.inst.en)}</p>` : ''}</div></div>
    ${(a.prompts || []).length ? `<div class="kb-pr">${a.prompts.map((p, pi) => `<div class="kl-sq"><div class="grow" style="min-width:0">${p.py ? klLine(p.zh, p.py) : `<span class="hz">${esc(p.zh)}</span>`}${kx(p) ? `<div class="small">${esc(kx(p))}</div>` : ''}</div><div class="kl-sqb"><button class="cx-sp" data-cx="say" data-v="${esc(p.zh)}">${ICON('speaker')}</button>${recBtns('kb' + n + '-' + ai + '-' + pi)}</div></div>`).join('')}</div>` : ''}</section>`).join('');
  const sq = L.speak.length ? `<section class="card glass"><h2>${t('Jawab dengan suaramu')}</h2><p class="small muted">${t('Dengar pertanyaannya, jawab pakai pola di bawahnya, rekam, lalu dengarkan lagi suaramu.')}</p>
    ${L.speak.map((q, j) => `<div class="kl-sq"><div class="grow" style="min-width:0">${klLine(q.q, q.qpy)}<div class="small">${esc(kx(q))}</div><div class="kl-tpl"><span class="hz">${esc(q.tpl || '')}</span> <small>${esc(q.tplpy || '')}</small></div></div><div class="kl-sqb"><button class="cx-sp" data-cx="say" data-v="${esc(q.q)}">${ICON('speaker')}</button>${recBtns('kbq' + n + '-' + j)}</div></div>`).join('')}</section>` : '';
  if (inner) return acts + sq;
  return `<section class="card glass"><button class="btn ghost small" data-a="kbopen" data-v="${n}">‹ ${lnShort(n)} <span class="hz">${esc(L.title.zh)}</span></button>
    <h1 style="margin:6px 0 2px"><span class="hz">課堂活動</span> · ${t('Kegiatan kelas')}</h1><p class="small muted">${t('Kerjakan berpasangan dengan teman kalau bisa. Sendirian? Jawab lisan & rekam suaramu.')}</p></section>
    ${acts}${sq}
    <section class="card glass"><button class="btn ${done ? 'sec' : 'pri'} big" data-a="kbdone" data-n="${n}" data-k="act">${ICON('check')} ${done ? t('Sudah selesai ✓ — lanjut') : t('Sudah latihan bicara')}</button></section>`;
}
/* buka buku: seluruh isi lesson sesuai urutan buku */
function vKbBook(n) {
  const L = KL(n); const B = kbBook(n);
  const gram = g => `<div class="kb-g"><div class="kb-gh"><span class="kb-gno">${esc(g.no || '')}</span><b>${esc(kx(g.t))}</b></div>
    ${g.table && g.table.length ? `<div class="kb-tbw"><table class="kb-tb">${g.table.map((r, ri) => `<tr>${(Array.isArray(r) ? r : [r]).map(c => `<${ri === 0 ? 'th' : 'td'} class="hz">${esc(c)}</${ri === 0 ? 'th' : 'td'}>`).join('')}</tr>`).join('')}</table></div>` : ''}
    ${kx(g.note) ? `<p class="small">${esc(kx(g.note))}</p>` : ''}
    <div class="kl-exs">${g.ex.map(e => `<div class="kl-ex"><div class="grow" style="min-width:0">${klLine(e.zh, e.py)}<div class="small">${esc(kx(e))}</div></div><button class="speak mini" data-cx="say" data-v="${esc(e.zh)}">${ICON('speaker')}</button></div>`).join('')}</div>
    ${g.exercise && (g.exercise.items || []).length ? `<details class="kb-ex"><summary>${ICON('puzzle')} <span class="hz">課堂練習</span> · ${esc(kx(g.exercise.inst) || t('Latihan'))}</summary>${g.exercise.items.map((it, i) => `<div class="kb-exi"><span>${i + 1}.</span><div class="grow"><div class="hz">${esc(it.q)}</div>${it.hint ? `<small class="muted">${esc(it.hint)}</small>` : ''}<details><summary class="small">${t('Lihat jawaban')}</summary><div class="hz kb-ans">${esc(it.a || '')}</div><small>${esc(it.py || '')}</small></details></div></div>`).join('')}</details>` : ''}</div>`;
  const dlg = D => `<section class="card glass"><h2><span class="hz">${esc(D.label)}</span> · ${t(D.k === 'd1' ? 'Dialog 1' : 'Dialog 2')}</h2>${D.place ? `<div class="kb-place hz">${esc(D.place.zh || '')} <span class="small muted">${esc(kx(D.place) || '')}</span></div>` : ''}
    <div class="kl-dlg kb-dlg">${D.lines.map((x, i) => kbLineHTML(x, i, {})).join('')}</div></section>
    ${kbVocabList(n, D.k)}${(D.names || []).length ? `<section class="card glass"><h3>${t('Nama')} · Names</h3>${D.names.map(x => `<div class="small"><span class="hz">${esc(x.hz)}</span> ${esc(x.py || '')} — ${esc(kx(x) || x.en || '')}</div>`).join('')}</section>` : ''}
    ${L.grammar.filter(g => g.src === D.k).length ? `<section class="card glass"><h2><span class="hz">語法</span> · Grammar</h2>${L.grammar.filter(g => g.src === D.k).map(gram).join('')}</section>` : ''}`;
  return `<section class="card glass"><button class="btn ghost small" data-a="kbopen" data-v="${n}">‹ ${lnShort(n)}</button><h1 class="hz" style="margin:6px 0 0">${esc(L.title.zh)}</h1><div class="small muted">${lnLong(n)} · ${esc(kx(L.title))}</div>${kbToggles()}</section>
    ${B.dialogs.map(dlg).join('')}
    ${B.reading ? `<section class="card glass"><h2><span class="hz">短文 · ${esc((B.reading.title && B.reading.title.zh) || '')}</span></h2><div class="kb-rd">${klLine(B.reading.zh, B.reading.py)}<p class="kb-rdtr">${esc(kx(B.reading))}</p></div><button class="btn sec small" data-cx="say" data-v="${esc(B.reading.zh)}">${ICON('speaker')} ${t('Dengar bacaan')}</button></section>${kbVocabList(n, 'core')}` : ''}
    ${(B.notes || []).length ? `<section class="card glass"><h2><span class="hz">注釋</span> · Notes</h2>${B.notes.map(x => `<div class="gtip">${ICON('lightbulb')}<span><b>${esc(x.title || '')}</b> ${esc(kx(x))}</span></div>`).join('')}</section>` : ''}
    ${(B.activity || []).length ? `<section class="card glass"><h2><span class="hz">課堂活動</span> · ${t('Kegiatan kelas')}</h2>${B.activity.map(a => `<div class="kb-g"><b>${esc((a.title && a.title.zh) || '')} ${esc(kx(a.title) || '')}</b><p class="small">${esc(kx(a.inst) || '')}</p>${(a.prompts || []).map(p => `<div class="hz small">${esc(p.zh)}</div>`).join('')}</div>`).join('')}</section>` : ''}`;
}

/* ---------- pembuat sesi ---------- */
function kbWid(n, g) { return [...new Set(KL(n).vocab.filter(v => v.g === g && v.wid !== undefined).map(v => v.wid))]; }
function kbVocabItems(ids, max = 22) {
  const out = []; const part = ids.slice(0, 30);
  for (let j = 0; j < part.length; j += 5) { const ch = part.slice(j, j + 5); ch.forEach(i => out.push({ type: 'intro', wid: i })); shuffle(ch).forEach(i => out.push(wItem(i, 'mc_mean'))); }
  shuffle(part).slice(0, Math.min(max, part.length)).forEach((i, j) => out.push(wItem(i, ['listen', 'mc_hanzi', 'tone', 'mc_mean'][j % 4])));
  return out.filter(Boolean);
}
function kbExItems(n, gi) {
  const g = KL(n).grammar[gi]; const ex = g.exercise; if (!ex || !ex.items) return [];
  return ex.items.filter(it => it.q && it.a).slice(0, 5).map(it => ({ lx: 1, type: 'kbx', kind: 'gram', n, gi, opts: [], a: -1, x: it, inst: ex.inst, label: '課堂練習', say: it.a, fb: `<span class="hz kl-fbz">${esc(it.a)}</span><small>${esc(it.py || '')}</small>` }));
}
function kbCloze(n, line, pool) {
  const L = KL(n); const vs = L.vocab.filter(v => v.hz.length <= 4 && line.zh.includes(v.hz)).sort((a, b) => b.hz.length - a.hz.length);
  const v = vs.find(x => x.hz.length >= 2) || vs[0]; if (!v) return null;
  const others = pool.filter(x => x !== v.hz && !line.zh.includes(x));
  const { opts, a } = optsWith(v.hz, others);
  const q = esc(line.zh).replace(esc(v.hz), '<span class="blank">▢</span>');
  return mk({ kind: 'dlg', n, label: 'Isi kata yang hilang', ic: 'puzzle', q: `<span class="kl-sp">${esc(line.sp)}</span> ${q}`, qhz: 1, tr: line, opts: opts.map(x => ({ t: x, hz: 1 })), a, say: line.zh, fb: `<span class="hz kl-fbz">${esc(line.zh)}</span><small>${esc(kx(line))}</small>` });
}
function kbNextItem(n, lines, i) {
  const cur0 = lines[i]; const nx = lines[i + 1]; if (!nx || !cur0) return null;
  const pool = kbLessons().flatMap(L => L.dialog).filter(x => x.zh !== nx.zh && x.zh !== cur0.zh).map(x => x.zh);
  const { opts, a } = optsWith(nx.zh, pool);
  return mk({ kind: 'dlg', n, label: 'Lanjutkan percakapannya', ic: 'chat', q: `<span class="kl-sp">${esc(cur0.sp)}</span> ${esc(cur0.zh)}`, qhz: 1, qpy: cur0.py, sub: `${esc(nx.sp)}: …?`, opts: opts.map(x => ({ t: x, hz: 1 })), a, one: 1, say: nx.zh, fb: `<span class="hz kl-fbz">${esc(nx.sp)}: ${esc(nx.zh)}</span><small>${esc(kx(nx))}</small>` });
}
function kbWhoItem(n, line, sps) {
  const { opts, a } = optsWith(line.sp, sps.filter(s => s !== line.sp));
  return mk({ kind: 'dlg', n, label: 'Siapa yang bilang ini?', ic: 'chat', q: esc(line.zh), qhz: 1, tr: line, opts: opts.map(x => ({ t: x, hz: 1 })), a, say: line.zh, fb: `<span class="hz kl-fbz">${esc(line.sp)}: ${esc(line.zh)}</span>` });
}
function kbCtx(n) {
  const B = kbBook(n); const out = [];
  B.dialogs.forEach(D => { out.push({ h: D.label }); D.lines.filter(x => x.sp).forEach(x => out.push(x)); });
  if (B.reading) { out.push({ h: '短文' }); out.push({ sp: '', zh: B.reading.zh, id: B.reading.id, en: B.reading.en }); }
  return out;
}
function kbDlgCtx(D) { return [{ h: D.label }].concat(D.lines.filter(x => x.sp)); }
function kbBuild(n, k) {
  const L = KL(n); const B = kbBook(n); const out = []; const pool = [...new Set(L.vocab.map(v => v.hz))];
  if (k === 'voc') {
    const all = kbAllWords(n); const own = new Set(klWords(n)); const fresh = all.filter(i => !S.cards[i]).sort((a, b) => (own.has(b) ? 1 : 0) - (own.has(a) ? 1 : 0)); const part = fresh.slice(0, 20);
    for (let j = 0; j < part.length; j += 5) { const ch = part.slice(j, j + 5); ch.forEach(i => out.push({ type: 'intro', wid: i })); shuffle(ch).forEach(i => out.push(wItem(i, 'mc_mean'))); }
    const known = all.filter(i => S.cards[i] && !part.includes(i));
    shuffle(part.concat(shuffle(known).slice(0, Math.max(4, 12 - part.length)))).slice(0, 16).forEach((i, j) => out.push(wItem(i, ['listen', 'mc_hanzi', 'tone', 'mc_mean'][j % 4])));
    return out.filter(Boolean);
  }
  if (k === 'dlg') {
    B.dialogs.forEach(D => {
      const lines = D.lines.filter(x => x.sp); const sps = [...new Set(lines.map(x => x.sp))];
      out.push({ lx: 1, type: 'kbd', n, k: D.k });
      shuffle(lines.map((_, i) => i)).slice(0, 3).forEach(i => { const x = kbCloze(n, lines[i], pool); if (x) out.push(x); });
      shuffle(lines.map((_, i) => i).slice(0, lines.length - 1)).slice(0, 2).forEach(i => { const x = kbNextItem(n, lines, i); if (x) out.push(x); });
      if (sps.length >= 2) out.push(kbWhoItem(n, pick(lines), sps));
    });
    shuffle(L.pairs).slice(0, 5).forEach(p => out.push(pairItem(n, p, L.pairs)));
    return out.filter(Boolean);
  }
  if (k === 'gram') {
    L.grammar.forEach((g, gi) => { out.push({ lx: 1, type: 'kbg', n, gi }); out.push(...kbExItems(n, gi).slice(0, 3)); });
    shuffle(L.mcq).slice(0, 6).forEach(m => out.push(mcqItem(n, m)));
    shuffle(L.reorder).slice(0, 3).forEach(r => out.push(reorderItem(n, r)));
    return out.filter(Boolean);
  }
  if (k === 'read') {
    shuffle(kbWid(n, 'core')).slice(0, 5).forEach((i, j) => out.push(wItem(i, ['mc_mean', 'listen', 'mc_hanzi'][j % 3])));
    const tf = L.tf[0];
    if (B.reading) out.push({ lx: 1, type: 'lread', kind: 'pas', n, pas: { zh: B.reading.zh, py: B.reading.py, id: B.reading.id, en: B.reading.en } });
    if (tf) shuffle(tf.items).slice(0, 7).forEach(x => out.push(tfItem(n, null, x)));
    shuffle(L.pairs).slice(0, 3).forEach(p => out.push(pairItem(n, p, L.pairs)));
    return out.filter(Boolean);
  }
  if (k === 'mix') {
    const lines = B.dialogs.flatMap(D => D.lines.filter(x => x.sp));
    shuffle(lines).slice(0, 5).forEach(x => { const c = kbCloze(n, x, pool); if (c) out.push(c); });
    shuffle(L.reorder).slice(0, 4).forEach(r => out.push(reorderItem(n, r)));
    shuffle(L.mcq).slice(0, 5).forEach(m => out.push(mcqItem(n, m)));
    shuffle(klWords(n)).slice(0, 5).forEach(i => out.push(wItem(i, voiceOK() ? 'listen' : 'mc_hanzi')));
    shuffle(L.pairs).slice(0, 3).forEach(p => out.push(pairItem(n, p, L.pairs)));
    return shuffle(out.filter(Boolean));
  }
  if (k === 'test') return kbExam([n], { w: 8, m: 4, r: 3, p: 3, f: 2 });
  return out;
}
function kbExam(ns, c) {
  const out = []; const ids = shuffle(klWords(ns));
  ids.slice(0, c.w).forEach((i, j) => out.push(wItem(i, ['mc_mean', 'mc_hanzi', 'listen', 'tone'][j % 4])));
  const all = f => shuffle(ns.flatMap(n => KL(n)[f].map(x => [n, x])));
  all('mcq').slice(0, c.m).forEach(([n, m]) => out.push(mcqItem(n, m)));
  all('reorder').slice(0, c.r).forEach(([n, r]) => out.push(reorderItem(n, r)));
  all('pairs').slice(0, c.p).forEach(([n, p]) => out.push(pairItem(n, p, KL(n).pairs)));
  shuffle(ns.flatMap(n => KL(n).tf.flatMap(tf => tf.items.map(x => [n, tf.passage, x])))).slice(0, c.f).forEach(([n, pas, x]) => { const it = tfItem(n, KL(n).book ? null : pas, x); it.pasOpen = true; out.push(it); });
  return shuffle(out.filter(Boolean)).map(x => Object.assign(x, { noRetry: 1 }));
}
function kbRun(n, k) {
  const M = KB_META[k]; klState().last = n; KBV.n = n; save();
  const b = () => {
    const items = kbBuild(n, k);
    if (k !== 'test') { const own = new Set(klWords(n)); const due = kbDue().filter(i => !own.has(i)); shuffle(due).slice(0, 5).reverse().forEach(i => items.unshift({ type: 'recall', wid: i, dir: 'hz' })); }
    return items;
  };
  startKls(b(), { n, kb: k, title: `${lnShort(n)} · ${M.zh} ${t(M.ti)}`, rebuild: b, cat: k === 'voc' ? 'kenal' : k === 'test' ? 'latih' : 'paham', retry: k !== 'test' });
}
function kbUnit(ui) {
  const ns = KB_UNITS[ui].map(x => (kbLessons().find(L => L.num === x) || {}).n).filter(Boolean); if (!ns.length) return;
  const b = () => kbExam(ns, { w: 12, m: 6, r: 4, p: 4, f: 4 });
  startKls(b(), { ns, n: ns[0], kbu: ui, title: `${t('Ujian bab {u}', { u: ui + 1 })} · 單元測驗`, rebuild: b, cat: 'latih', retry: false });
}

/* ---------- kartu khusus di dalam sesi ---------- */
function kbGramCard(n, g) {
  return `<div class="kl-gram"><div class="kb-gh"><span class="kb-gno">${esc(g.no || '')}</span><h3 style="margin:0">${esc(kx(g.t))}</h3></div>
    ${g.table && g.table.length ? `<div class="kb-tbw"><table class="kb-tb">${g.table.map((r, ri) => `<tr>${(Array.isArray(r) ? r : [r]).map(c => `<${ri === 0 ? 'th' : 'td'} class="hz">${esc(c)}</${ri === 0 ? 'th' : 'td'}>`).join('')}</tr>`).join('')}</table></div>` : `<div class="kl-gform hz">${esc(g.form)}</div>`}
    ${kx(g.note) ? `<p>${esc(kx(g.note))}</p>` : ''}
    <div class="kl-exs">${g.ex.map(e => `<div class="kl-ex"><div class="grow" style="min-width:0">${klLine(e.zh, e.py)}<div class="small">${esc(kx(e))}</div></div><button class="speak mini" data-s="saysent" data-v="${esc(e.zh)}">${ICON('speaker')}</button></div>`).join('')}</div></div>`;
}
function renderKbRead(it) {
  progressBar(); SES.answered = true; SES.shown = Date.now(); SES.m = null;
  let body = '';
  if (it.type === 'kbg') body = `<div class="q-kind">${ICON('grammar')} <span class="hz">語法</span> · ${lnShort(it.n)}</div>${kbGramCard(it.n, KL(it.n).grammar[it.gi])}`;
  else { const D = kbDlg(it.n, it.k); body = `<div class="q-kind">${ICON('chat')} <span class="hz">${esc(D.label)}</span> · ${t('baca sekali lagi')}</div><div class="kl-dlg kb-dlg">${D.lines.map((x, i) => kbLineHTML(x, i, {})).join('').replace(/data-a="kbsay"/g, 'data-s="saysent"')}</div>`; }
  $('#sbody').innerHTML = `<div class="s-card glass kl-read">${body}</div>`;
  $('#sfoot').innerHTML = `<div class="inner"><button class="btn pri big wide" data-s="next">${t('Paham, lanjut')}</button></div>`;
  $('#sbody').scrollTop = 0; FX.play('flip');
}
function renderKbx(it) {
  progressBar(); SES.answered = false; SES.shown = Date.now(); SES.m = null; it.rev = false;
  const q = esc(it.x.q).replace(/＿+|_{2,}/g, '<span class="blank">▢</span>');
  $('#sbody').innerHTML = `<div class="s-card glass kl-q kb-x"><div class="q-kind">${ICON('puzzle')} <span class="hz">課堂練習</span> · ${t('Latihan buku')} <span class="kl-ln">${lnShort(it.n)}</span></div>
    ${it.inst && kx(it.inst) ? `<div class="small muted">${esc(kx(it.inst))}</div>` : ''}
    <div class="kl-qz hz">${q}</div>${it.x.hint ? `<div class="small muted" style="text-align:center">${esc(it.x.hint)}</div>` : ''}
    <div class="kb-xa" id="kbxa"><p class="small muted">${t('Jawab dulu di kepala atau ucapkan keras-keras, lalu cek jawabannya.')}</p></div></div>`;
  $('#sfoot').innerHTML = `<div class="inner"><button class="btn pri big wide" data-s="kbrev">${ICON('search')} ${t('Lihat jawaban')}</button></div>`;
  $('#sbody').scrollTop = 0;
}
function kbReveal() {
  const it = cur(); if (!it || it.type !== 'kbx' || it.rev) return; it.rev = true;
  const a = $('#kbxa'); if (a) a.innerHTML = `<div class="kb-ans">${klLine(it.x.a, it.x.py)}</div><button class="btn ghost small" data-s="saysent" data-v="${esc(it.x.a)}">${ICON('speaker')} ${t('Dengar')}</button>`;
  if (voiceOK()) TTS.speak(it.x.a);
  $('#sfoot').innerHTML = `<div class="inner row" style="gap:10px"><button class="btn sec big grow" data-s="kbno">${t('Belum tepat')}</button><button class="btn pri big grow" data-s="kbok">${ICON('check')} ${t('Jawabanku benar')}</button></div>`;
}
const _renderItemKB = _renderItem;
_renderItem = function () { const it = cur(); if (it && (it.type === 'kbg' || it.type === 'kbd')) return renderKbRead(it); if (it && it.type === 'kbx') return renderKbx(it); return _renderItemKB(); };
const _sessionClickKB = _sessionClick;
_sessionClick = function (e) {
  const b = e.target.closest('[data-s]');
  if (b && SES) { const s = b.dataset.s;
    if (s === 'kbrev') return kbReveal();
    if (s === 'kbok' || s === 'kbno') { const it = cur(); if (!it || SES.answered) return; it.fb = it.fb || ''; return answer(s === 'kbok'); } }
  return _sessionClickKB(e);
};
const showSummaryKB = showSummary;
showSummary = function () {
  const o = SES && SES.opts; const tot = SES ? SES.ok + SES.bad : 0; const acc = tot ? Math.round(SES.ok / tot * 100) : 100;
  showSummaryKB();
  if (!o || (!o.kb && o.kbu === undefined)) return;
  const sum = $('#sbody .summary'); if (sum) sum.querySelectorAll('[data-s="klnext"]').forEach(x => x.remove());
  let msg = '';
  if (o.kb) {
    const M = KB_META[o.kb]; const fresh = o.kb === 'voc' ? kbFresh(o.n) : 0;
    const r = kbMark(o.n, o.kb, fresh ? Math.min(acc, M.pass - 1) : acc);
    if (fresh) { msg = `<div class="notice">${t('Bagus! Masih ada {n} kata baru di lesson ini — lanjutkan sesi kosakata berikutnya.', { n: fresh })}</div>`; const row0 = sum && sum.querySelector('.row.wrap:last-child'); if (row0) row0.insertAdjacentHTML('beforeend', `<button class="btn pri" data-s="kbnext" data-n="${o.n}" data-k="voc">${t('20 kata berikutnya')} ${ICON('chevron')}</button>`); if (sum) { const k0 = sum.querySelector('.kpis'); (k0 || sum).insertAdjacentHTML('afterend', msg); } return; }
    if (o.kb === 'test' && r.now) { msg = `<div class="kl-khatam">${ICON('crown')}<div><b>${t('{n} khatam!', { n: lnShort(o.n) })}</b><span>${t('Semua isi lesson ini sudah kamu kuasai. Lanjut ke lesson berikutnya!')}</span></div></div>`; if (r.first) confetti(); }
    else msg = `<div class="notice">${r.now ? t('Babak lulus ({a}%) ✓', { a: acc }) : t('Skor {a}% — butuh {p}% untuk lulus babak ini. Coba sekali lagi, pasti naik!', { a: acc, p: M.pass })}</div>`;
    const nx = kbNextStage(o.n); const row = sum && sum.querySelector('.row.wrap:last-child');
    if (row && r.now && nx) row.insertAdjacentHTML('beforeend', `<button class="btn pri" data-s="kbnext" data-n="${o.n}" data-k="${nx}"><span class="hz">${KB_META[nx].zh}</span> ${t(KB_META[nx].ti)} ${ICON('chevron')}</button>`);
  } else {
    const S0 = kbS(); S0.unit[o.kbu] = Math.max(S0.unit[o.kbu] || 0, acc); save();
    msg = `<div class="notice">${acc >= 80 ? t('Ujian bab lulus ({a}%) 🎉 — siap untuk soal TOCFL Band A tingkat ini.', { a: acc }) : t('Skor {a}%. Ulangi kartu & latihan lesson yang lemah, lalu coba lagi (lulus ≥ 80%).', { a: acc })}</div>`;
    if (acc >= 80) confetti();
  }
  if (sum && msg) { const k = sum.querySelector('.kpis'); (k || sum).insertAdjacentHTML('afterend', msg); }
};
const _sessionClickKB2 = _sessionClick;
_sessionClick = function (e) {
  const b = e.target.closest('[data-s="kbnext"]');
  if (b) { const n = +b.dataset.n, k = b.dataset.k; endSession(false, true); render(); setTimeout(() => kbGo(n, k), 60); return; }
  return _sessionClickKB2(e);
};

/* ---------- audio dialog ---------- */
function kbPlayLines(lines, from, opts = {}) {
  tfStop(); const vm = kbVoiceMap(lines); const seq = []; const idx = [];
  lines.forEach((x, i) => {
    if (i < from || !x.sp) return;
    if (opts.role && x.sp === opts.role) { seq.push({ pause: 900 + x.zh.length * 380 }); idx.push(i); return; }
    seq.push({ who: kbVoice(x.sp, vm), zh: x.zh, gap: opts.sh ? 300 : 450 }); idx.push(i);
    if (opts.sh) { seq.push({ pause: 700 + x.zh.length * 360 }); idx.push(i); }
  });
  KBV.play = idx[0] ?? -1; render();
  tfPlay(seq, () => { KBV.play = -1; KBV.heard = (KBV.heard || 0) + 1; render(); }, (s, j) => { const i = idx[j]; if (i !== KBV.play) { KBV.play = i; document.querySelectorAll('.kb-dlg .dl').forEach(el => el.classList.toggle('playing', +el.dataset.i === i)); const el = document.querySelector(`.kb-dlg .dl[data-i="${i}"]`); if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } });
}
function kbStopAudio() { tfStop(); KBV.play = -1; }

/* ---------- navigasi ---------- */
function kbGo(n, k) {
  kbStopAudio(); KBV.n = n; KBV.role = ''; KBV.sh = false;
  if (k === 'dlg') { const B = kbBook(n); if (!B.dialogs.some(d => d.k === KBV.k)) KBV.k = (B.dialogs[0] || {}).k || 'd1'; VK.view = 'kbd'; render(); window.scrollTo(0, 0); return; }
  if (k === 'read') { VK.view = 'kbr'; render(); window.scrollTo(0, 0); return; }
  kbRun(n, k);
}
const XVIEWS_KB = XVIEWS.kelas;
XVIEWS.kelas = function () {
  const v = VK.view;
  if (v === 'kb') return vKb();
  if (v === 'kbl') return vKbLesson(KBV.n);
  if (v === 'kbd') return vKbDialog(KBV.n, KBV.k);
  if (v === 'kbr') return vKbReading(KBV.n);
  if (v === 'kba') return vKbAct(KBV.n);
  if (v === 'kbb') return vKbBook(KBV.n);
  const h = XVIEWS_KB(); if (VK.view !== 'map' && VK.view) return h;
  const k = h.indexOf('</section>'); return k < 0 ? h : h.slice(0, k + 10) + kbBanner() + h.slice(k + 10);
};
function kbBanner() {
  const T = kbTotals(); if (!T.lessons) return '';
  const nl = kbNextLesson();
  return `<section class="kb-banner" data-a="kbhome" role="button"><span class="kb-seal hz">時代<br>華語</span><div class="grow" style="min-width:0"><b>Khatam Band A</b><span>${t('時代華語 1 · Lesson 1–15 persis buku — {p}% selesai', { p: Math.round(T.done / Math.max(1, T.tot) * 100) })}${nl ? ' · ' + t('berikutnya {n}', { n: lnShort(nl) }) : ''}</span></div>${kbRing(T.done / Math.max(1, T.tot), 46, '#fff')}</section>`;
}
Object.assign(ACT, {
  kbhome: () => { kbStopAudio(); VK.view = 'kb'; render(); window.scrollTo(0, 0); },
  kbopen: b => { kbStopAudio(); KBV.n = +b.dataset.v; VK.view = 'kbl'; render(); window.scrollTo(0, 0); },
  kbgo: b => kbGo(+b.dataset.n, b.dataset.k),
  kbrun: b => { kbStopAudio(); kbRun(+b.dataset.n, b.dataset.k); },
  kbbook: b => { kbStopAudio(); KBV.n = +b.dataset.v; VK.view = 'kbb'; render(); window.scrollTo(0, 0); },
  kbfc: b => { const n = +b.dataset.v; openFC({ ns: [n], dir: 'hz', scope: 'all', only: 'all', max: 999 }); if (FC) { FC.ids = shuffle(klWords(n)); fcRender(); } },
  kbpace: b => { kbS().pace = b.dataset.v; save(); render(); },
  kbtog: b => { const S0 = kbS(); S0[b.dataset.v] = !S0[b.dataset.v]; save(); render(); },
  kbsay: b => { FX.ensure(); const sp = b.dataset.sp; if (sp) { const D = kbDlg(KBV.n, KBV.k) || { lines: [] }; tfPlay([{ who: kbVoice(sp, kbVoiceMap(D.lines)), zh: b.dataset.v }]); } else TTS.speak(b.dataset.v); },
  kbplay: () => { FX.ensure(); TTS.unlock && TTS.unlock(); if (KBV.play >= 0) { kbStopAudio(); render(); return; } const D = kbDlg(KBV.n, KBV.k); kbPlayLines(D.lines, 0, { role: KBV.role, sh: KBV.sh }); },
  kbshadow: () => { kbStopAudio(); KBV.sh = !KBV.sh; render(); },
  kbrole: b => { kbStopAudio(); KBV.role = b.dataset.v; render(); },
  kbrevl: b => { const d = b.closest('.dl'); if (d) d.classList.add('rev'); },
  kbrdplay: () => {
    FX.ensure(); if (KBV.play >= 0) { kbStopAudio(); render(); return; }
    const R = kbBook(KBV.n).reading; const sents = (R.zh.match(/[^。！？!?]+[。！？!?」]*/g) || [R.zh]).map(s => s.trim()).filter(Boolean);
    KBV.play = 0; render();
    tfPlay(sents.map(s => ({ who: 'N', zh: s, gap: 350 })), () => { KBV.play = -1; render(); }, (s, j) => { KBV.play = j; document.querySelectorAll('.kb-rdzh span').forEach((el, i) => el.classList.toggle('playing', i === j)); });
  },
  kbdone: b => { const n = +b.dataset.n, k = b.dataset.k; kbStopAudio(); const r = kbMark(n, k, 100); if (r.first) { FX.play('ok'); addXP(15); toast(t('Babak selesai ✓ +15 XP')); } const nx = kbNextStage(n); if (nx) kbGo(n, nx); else { VK.view = 'kbl'; render(); } },
  kbrev: () => { const ids = kbDue(); startKls(buildRecall(Math.min(30, ids.length), ids), { ns: kbLessons().map(L => L.n), title: t('Ulang kartu') + ' · 時代華語', cat: 'hafal' }); },
  kbunit: b => kbUnit(+b.dataset.v),
  kbdtab: b => { kbStopAudio(); KBV.k = b.dataset.v; KBV.role = ''; render(); },
  kbrtab: b => { kbStopAudio(); KBV.rt = b.dataset.v; render(); }
});
['kbgo', 'kbrun', 'kbrev', 'kbunit', 'kbfc'].forEach(a => START_ACTS.add(a));
window.addEventListener('hashchange', () => kbStopAudio());