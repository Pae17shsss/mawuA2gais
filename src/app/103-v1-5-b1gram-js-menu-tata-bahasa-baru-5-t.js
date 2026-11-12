/* ========== V1.5 b1gram.js — menu Tata bahasa baru: 5 tingkat (Dasar → B1+), cari, halaman pola, Logika Mandarin vs Indonesia, latihan ========== */
GVS.tier = 0; GVS.q = ''; GVS.tag = '';
const B1_TIERS = [[1, 'Dasar', 0], [2, 'A1', 2], [3, 'A2', 3], [4, 'B1', 4], [5, 'B1+', 5]];
const gTier = g => g.tier || g.lv;
const gQ = () => S.gq || (S.gq = {});
/* status pola: 2 = paham (lulus latihan / ditandai), 1 = sudah dilatih, 0 = belum */
function b1GramSt(k) { try { const s = gramStatus(k); if (s >= 2) return 2; } catch (e) {} if (gramSeen(k)) return 2; return gQ()[k] !== undefined ? 1 : 0; }
function b1GMatch(g, q) {
  if (!q) return true; q = q.toLowerCase();
  const hay = [g.form, g.k, ...(g.name || []), ...(g.gloss || []).slice(0, 2), ...(g.ex || []).map(e => e[0] + ' ' + e[2] + ' ' + e[3])].join(' ').toLowerCase();
  return hay.includes(q) || stripTone(hay).includes(stripTone(q));
}
function b1GCard(g) {
  const st = b1GramSt(g.k); const best = gQ()[g.k];
  return `<button class="b1-gp ${st === 2 ? 'done' : ''}" data-a="gopen" data-v="${esc(g.k)}">
    ${TILE(g.icon, 'tint c' + ((gTier(g) + 3) % 8 + 1))}
    <span class="b1-gpt"><b>${esc(gramTxt(g.name))}</b><span class="hz b1-gpf">${esc(g.form)}</span>
      <span class="b1-gpm">${g.drill && g.drill.length ? `<span>${ICON('target')} ${g.drill.length} ${t('soal')}</span>` : ''}${g.ex ? `<span>${ICON('speaker')} ${g.ex.length} ${t('contoh')}</span>` : ''}${best !== undefined ? `<span class="b1-best">${best}%</span>` : ''}</span></span>
    <span class="b1-gps">${st === 2 ? ICON('check') : ICON('chevron')}</span></button>`;
}
function vGrammarList() {
  const q = GVS.q.trim(); const all = GRAMMAR; const learned = all.filter(g => b1GramSt(g.k) === 2).length;
  const tiers = B1_TIERS.filter(([n]) => !GVS.tier || GVS.tier === n);
  const body = tiers.map(([n, code, lv]) => {
    const list = all.filter(g => gTier(g) === n && b1GMatch(g, q)); if (!list.length) return '';
    const tot = all.filter(g => gTier(g) === n); const dn = tot.filter(g => b1GramSt(g.k) === 2).length;
    return `<section class="card glass b1-tier">
      <div class="b1-th">${lvBadge(lv, 'sm')}<div class="grow" style="min-width:0"><h2>${esc(gramTxt(GRAM_TIER[n - 1]))}</h2><div class="bar"><i style="width:${tot.length ? dn / tot.length * 100 : 0}%"></i></div></div><span class="chip">${ICON('check')} ${dn}/${tot.length}</span></div>
      <div class="b1-gps-grid">${list.map(b1GCard).join('')}</div></section>`;
  }).join('');
  return `<section class="card glass b1-ghero"><div class="row" style="gap:14px;align-items:flex-start">${TILE('grammar', 'lg tint c6')}<div class="grow" style="min-width:0"><h1 style="margin:0">${t('Tata bahasa')}</h1>
      <p class="muted small" style="margin:6px 0 0">${t('{n} pola dari rangka kalimat dasar sampai B1+. Tiap pola punya rumus, logika Mandarin dibanding bahasa Indonesia, contoh sehari-hari · kampus · pabrik, dan latihan singkat.', { n: all.length })}</p></div></div>
    <div class="b1-gtools"><input class="search" id="gq" data-in="gq" value="${esc(GVS.q)}" placeholder="${t('cari pola: 了, 把, bukan hanya…')}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="${t('Cari')}">
      <span class="chip">${ICON('check')} ${learned}/${all.length}</span></div>
    <div class="seg b1-seg b1-tiers"><button class="${!GVS.tier ? 'on' : ''}" data-a="gtier" data-v="0">${t('Semua')}</button>${B1_TIERS.map(([n, code]) => `<button class="${GVS.tier === n ? 'on' : ''}" data-a="gtier" data-v="${n}">${code} <small>${all.filter(g => gTier(g) === n).length}</small></button>`).join('')}</div></section>
  ${body || `<section class="card glass"><p class="muted" style="text-align:center;margin:12px 0">${t('Tidak ada pola yang cocok.')}</p></section>`}
  <section class="card glass"><h2>${t('Latih polanya')}</h2><p class="small muted" style="margin:-4px 0 12px">${t('Cara tercepat menghafal pola adalah memakainya: susun kalimat dan isi bagian yang hilang.')}</p>
    <div class="row wrap"><button class="btn pri" data-a="build">${ICON('blocks')} ${t('Susun kalimat')}</button><button class="btn sec" data-a="cloze">${ICON('puzzle')} ${t('Lengkapi kalimat')}</button></div></section>`;
}
function b1GEx(e, k) {
  const tag = e[5] || ''; const tr = L3(e, 2);
  return `<div class="b1-ex"><button class="b1-exb" data-a="gsay" data-v="${esc(e[0])}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button>
    <div class="grow" style="min-width:0"><div class="b1-exl">${b1Line(e[0], e[1])}</div><div class="b1-ext">${esc(tr)}</div></div>
    <div class="b1-exs">${tag ? b1TagChip(tag) : ''}<button class="btn ghost small" data-a="gsays" data-v="${esc(e[0])}" title="${t('pelan')}" aria-label="${t('pelan')}">${ICON('slow')}</button></div></div>`;
}
function vGrammarPoint(g) {
  const n = gTier(g); const list = GRAMMAR.filter(x => gTier(x) === n); const at = GRAMMAR.indexOf(g);
  const prev = GRAMMAR[at - 1], next = GRAMMAR[at + 1];
  const tags = [...new Set((g.ex || []).map(e => e[5]).filter(Boolean))];
  const tg = tags.includes(GVS.tag) ? GVS.tag : '';
  const ex = (g.ex || []).filter(e => !tg || e[5] === tg);
  const lg = g.logic ? (S.settings.ui === 'id' || meanLang() === 'id' ? g.logic.id : (g.logic.en || g.logic.id)) : '';
  const st = b1GramSt(g.k); const best = gQ()[g.k];
  const dl = (typeof CONV !== 'undefined' ? CONV : []).filter(d => (d.grammar || []).includes(g.k));
  const stages = typeof b1Stages === 'function' ? b1Stages().filter(s => s.gram.includes(g.k)) : [];
  return `<section class="card glass b1-gpage">
      <div class="row" style="gap:8px;align-items:center;flex-wrap:wrap"><button class="btn ghost small" data-a="gback">‹ ${t('Semua pola')}</button><span class="grow"></span>${lvBadge(B1_TIERS[n - 1][2], 'sm')}<span class="small muted">${esc(gramTxt(GRAM_TIER[n - 1]))} · ${list.indexOf(g) + 1}/${list.length}</span></div>
      <div class="row" style="gap:12px;align-items:center;margin-top:10px">${TILE(g.icon, 'lg tint c' + ((n + 3) % 8 + 1))}<h1 class="grow" style="margin:0;min-width:0">${esc(gramTxt(g.name))}</h1></div>
      <div class="gform hz b1-form">${esc(g.form)}</div>
      <p class="b1-gloss">${esc(gramTxt(g.gloss))}</p>
      <div class="gtip">${ICON('lightbulb')}<span>${esc(gramTxt(g.tip))}</span></div>
      ${lg ? `<div class="b1-logic"><div class="b1-lh">${ICON('swap')} <b>${t('Logika Mandarin vs Indonesia')}</b></div><p>${esc(lg)}</p></div>` : ''}
      <div class="gtip b1-warn">${ICON('warn')}<span>${esc(gramTxt(g.warn))}</span></div></section>
    <section class="card glass b1-gexs"><div class="row" style="gap:10px;align-items:center;flex-wrap:wrap"><h2 class="grow" style="margin:0">${t('Contoh')}</h2>
      ${tags.length > 1 ? `<div class="seg b1-seg">${[['', 'Semua']].concat(tags.map(x => [x, B1_TAGNAME[x] || x])).map(([v, l]) => `<button class="${tg === v ? 'on' : ''}" data-a="gtag" data-v="${v}">${t(l)}${v ? ` <small>${g.ex.filter(e => e[5] === v).length}</small>` : ''}</button>`).join('')}</div>` : ''}
      <button class="btn sec small" data-a="gplayall" data-v="${esc(g.k)}">${ICON('play')} ${t('Putar semua')}</button></div>
      <div class="b1-exlist">${ex.map(e => b1GEx(e, g.k)).join('')}</div></section>
    <section class="card glass b1-gprac"><div class="row" style="gap:12px;align-items:center">${TILE('target', 'tint c2')}<div class="grow" style="min-width:0"><b>${t('Latihan pola ini')}</b>
        <div class="small muted">${g.drill && g.drill.length ? t('{n} soal isian + susun kalimat dari contoh. Lulus ≥ 75% = pola ditandai paham.', { n: g.drill.length }) : t('Susun ulang contoh & tebak artinya. Lulus ≥ 75% = pola ditandai paham.')}${best !== undefined ? ` · ${t('Skor terbaik')}: <b>${best}%</b>` : ''}</div></div>${st === 2 ? `<span class="chip b1-ok">${ICON('check')} ${t('Paham')}</span>` : ''}</div>
      <div class="row wrap" style="margin-top:12px;gap:8px"><button class="btn pri" data-a="gdrill" data-v="${esc(g.k)}">${ICON('play')} ${t('Mulai latihan')}</button>
        ${st === 2 ? '' : `<button class="btn sec small" data-a="gmark" data-v="${esc(g.k)}">${t('Tandai sudah paham (+10 XP)')}</button>`}</div>
      ${dl.length || stages.length ? `<div class="b1-rel">${stages.map(s => `<button class="chip" data-a="b1open" data-v="${s.id}">${ICON('path')} ${t('Tahap')} ${esc(s.code)}</button>`).join('')}${dl.map(d => `<button class="chip" data-a="cvopen" data-v="${d.id}">${ICON('chat')} <span class="hz">${esc(d.title.zh)}</span></button>`).join('')}</div>` : ''}</section>
    <div class="row b1-gnav">${prev ? `<button class="btn sec small" data-a="gopen" data-v="${esc(prev.k)}">‹ <span class="hz">${esc(G_SHORT[prev.k] || prev.form)}</span></button>` : ''}<span class="grow"></span>${next ? `<button class="btn sec small" data-a="gopen" data-v="${esc(next.k)}"><span class="hz">${esc(G_SHORT[next.k] || next.form)}</span> ›</button>` : ''}</div>`;
}
vGrammar = function () {
  const g = GVS.open && gOf(GVS.open);
  if (g) return vGrammarPoint(g);
  GVS.open = null; return vGrammarList();
};

/* ---------- latihan pola ---------- */
function b1GramItems(g, o = {}) {
  const items = [];
  const exs = shuffle((g.ex || []).slice());
  (g.drill || []).forEach(d => {
    const ans = d.opts[d.a]; const full = d.q.replace('＿', ans);
    items.push(b1Mcq({ label: 'Isi bagian kosong', ic: 'grammar', kind: 'gram', q: esc(d.q).replace('＿', '<span class="blank">＿</span>'), qhz: 1, sub: esc(G_SHORT[g.k] || g.form),
      opts: d.opts.map(x => ({ t: x, hz: 1 })), a: d.a, say: full, fb: d.why ? `<div class="small">${esc(d.why)}</div>` : '' }));
  });
  /* tanpa soal isian: tebak arti contoh */
  if (!(g.drill && g.drill.length)) {
    const others = shuffle(GRAMMAR.filter(x => x !== g).flatMap(x => x.ex || [])).slice(0, 30);
    exs.slice(0, 3).forEach(e => {
      const wrong = shuffle(others.filter(x => L3(x, 2) !== L3(e, 2))).slice(0, 2);
      const opts = shuffle([e, ...wrong]); items.push(b1Mcq({ label: 'Apa arti kalimat ini?', ic: 'book', q: esc(e[0]), qhz: 1, qpy: e[1], opts: opts.map(x => ({ t: L3(x, 2) })), a: opts.indexOf(e), say: e[0] }));
    });
  }
  let nb = 0; for (const e of exs) { if (nb >= (o.build || 2)) break; const b = b1BuildItem(e[0], e[1], { id: e[2], en: e[3], tl: e[4] }); if (b) { items.push(b); nb++; } }
  return items;
}
function b1GramDone(k) {
  return (acc) => {
    const q = gQ(); q[k] = Math.max(q[k] || 0, acc); const pass = acc >= 75; const was = b1GramSt(k) === 2;
    if (pass) setGramStatus(k, 2); save();
    return `<div class="notice b1-sumn">${pass ? `${ICON('check')} ${was ? t('Pola tetap ditandai paham — skor {n}%.', { n: acc }) : t('Lulus {n}% — pola ditandai paham (+10 XP).', { n: acc })}` : `${ICON('lightbulb')} ${t('Skor {n}% — butuh 75%. Baca lagi Logika & contohnya, lalu coba sekali lagi.', { n: acc })}`}</div>`;
  };
}
function b1StartGram(k) {
  const g = gOf(k); if (!g) return;
  const mk = () => b1GramItems(g);
  startSession(mk(), { title: gramTxt(g.name), retry: false, noCover: true, rebuild: mk, xbDone: b1GramDone(k) });
}
let GPLAY = 0;
Object.assign(ACT, {
  gtier: b => { GVS.tier = +b.dataset.v || 0; GVS.open = null; render(); },
  gopen: b => { GVS.open = b.dataset.v; GVS.tag = ''; render(); window.scrollTo(0, 0); },
  gback: () => { GVS.open = null; render(); window.scrollTo(0, 0); },
  gtag: b => { GVS.tag = b.dataset.v; render(); },
  gsays: b => { FX.ensure(); TTS.speak(b.dataset.v, 0.6); },
  gplayall: b => {
    const g = gOf(b.dataset.v); if (!g) return; const run = ++GPLAY;
    const ex = (g.ex || []).filter(e => !GVS.tag || e[5] === GVS.tag); let j = 0;
    const nx = () => { if (run !== GPLAY || ROUTE !== 'grammar' || SES || j >= ex.length) { document.querySelectorAll('.b1-ex.playing').forEach(x => x.classList.remove('playing')); return; }
      const els = document.querySelectorAll('.b1-exlist .b1-ex'); els.forEach((x, i) => x.classList.toggle('playing', i === j)); const e = ex[j++]; b1Speak(e[0], { onend: () => setTimeout(nx, 650) }); };
    nx();
  },
  gdrill: b => b1StartGram(b.dataset.v),
  gmark: b => { setGramStatus(b.dataset.v, 2); gramMark(b.dataset.v); toast(t('Pola ditandai sudah paham')); render(); },
  gotog: b => { const g = gOf(b.dataset.v); closeModal(); if (g) { GVS.open = g.k; GVS.tag = ''; } go('grammar'); }
});
START_ACTS.add('gdrill'); XM_ACT.gdrill = 'gram';
let gqT = 0;
document.addEventListener('input', e => {
  if (!e.target.dataset || e.target.dataset.in !== 'gq' || e.isComposing) return;
  GVS.q = e.target.value; clearTimeout(gqT);
  gqT = setTimeout(() => { render(); const i = $('#gq'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 240);
});
/* Progres: membuka pola dari tab Grammar */
if (ACT.pggopen) { const pgb = ACT.pggopen; ACT.pggopen = b => { const g = gramItem(b.dataset.g); if (g && g.src === 'gp') { GVS.open = g.id; GVS.tag = ''; go('grammar'); window.scrollTo(0, 0); return; } return pgb(b); }; }

Object.assign(I18N, {
  'soal': ['questions', 'tanong'], 'contoh': ['examples', 'halimbawa'], 'Semua pola': ['All patterns', 'Lahat ng pattern'],
  '{n} pola dari rangka kalimat dasar sampai B1+. Tiap pola punya rumus, logika Mandarin dibanding bahasa Indonesia, contoh sehari-hari · kampus · pabrik, dan latihan singkat.': ['{n} patterns from basic sentence frames to B1+. Each has a formula, Mandarin-vs-Indonesian logic, everyday · campus · fab examples and a short drill.', '{n} pattern mula batayan hanggang B1+. May pormula, lohika ng Mandarin kumpara sa Indonesian, halimbawa at maikling drill.'],
  'cari pola: 了, 把, bukan hanya…': ['search: 了, 把, not only…', 'hanapin: 了, 把…'], 'Tidak ada pola yang cocok.': ['No matching pattern.', 'Walang tugmang pattern.'],
  'Logika Mandarin vs Indonesia': ['Mandarin vs Indonesian logic', 'Lohika: Mandarin kumpara sa Indonesian'], 'Contoh': ['Examples', 'Halimbawa'], 'Putar semua': ['Play all', 'I-play lahat'],
  'Latihan pola ini': ['Practise this pattern', 'Sanayin ang pattern na ito'], 'Mulai latihan': ['Start practice', 'Simulan'], 'Paham': ['Understood', 'Naintindihan'], 'Skor terbaik': ['Best score', 'Pinakamataas'],
  '{n} soal isian + susun kalimat dari contoh. Lulus ≥ 75% = pola ditandai paham.': ['{n} fill-in questions + sentence building. Pass ≥ 75% = marked as understood.', '{n} tanong + pagbuo ng pangungusap. Pasado ≥ 75% = naintindihan.'],
  'Susun ulang contoh & tebak artinya. Lulus ≥ 75% = pola ditandai paham.': ['Rebuild the examples & guess their meaning. Pass ≥ 75% = marked as understood.', 'Buuin muli ang halimbawa at hulaan ang kahulugan. Pasado ≥ 75% = naintindihan.'],
  'Isi bagian kosong': ['Fill in the blank', 'Punan ang patlang'], 'Apa arti kalimat ini?': ['What does this sentence mean?', 'Ano ang ibig sabihin nito?'],
  'Pola tetap ditandai paham — skor {n}%.': ['Pattern stays marked as understood — score {n}%.', 'Naintindihan pa rin — iskor {n}%.'], 'Lulus {n}% — pola ditandai paham (+10 XP).': ['Passed {n}% — pattern marked as understood (+10 XP).', 'Pasado {n}% — naintindihan (+10 XP).'],
  'Skor {n}% — butuh 75%. Baca lagi Logika & contohnya, lalu coba sekali lagi.': ['Score {n}% — 75% needed. Re-read the logic & examples, then try again.', 'Iskor {n}% — kailangan 75%. Basahin muli at subukan ulit.']
});
Object.assign(I18N_VI, {
  'soal': 'câu', 'contoh': 'ví dụ', 'Semua pola': 'Mọi mẫu câu', '{n} pola dari rangka kalimat dasar sampai B1+. Tiap pola punya rumus, logika Mandarin dibanding bahasa Indonesia, contoh sehari-hari · kampus · pabrik, dan latihan singkat.': '{n} mẫu câu từ khung cơ bản đến B1+. Mỗi mẫu có công thức, logic tiếng Trung so với tiếng Indonesia, ví dụ đời thường · trường · nhà máy và bài luyện ngắn.',
  'cari pola: 了, 把, bukan hanya…': 'tìm: 了, 把…', 'Tidak ada pola yang cocok.': 'Không có mẫu phù hợp.', 'Logika Mandarin vs Indonesia': 'Logic tiếng Trung vs tiếng Indonesia', 'Contoh': 'Ví dụ', 'Putar semua': 'Phát tất cả',
  'Latihan pola ini': 'Luyện mẫu này', 'Mulai latihan': 'Bắt đầu luyện', 'Paham': 'Đã hiểu', 'Skor terbaik': 'Điểm cao nhất',
  '{n} soal isian + susun kalimat dari contoh. Lulus ≥ 75% = pola ditandai paham.': '{n} câu điền + xếp câu. Đạt ≥ 75% = đánh dấu đã hiểu.', 'Susun ulang contoh & tebak artinya. Lulus ≥ 75% = pola ditandai paham.': 'Xếp lại ví dụ & đoán nghĩa. Đạt ≥ 75% = đã hiểu.',
  'Isi bagian kosong': 'Điền vào chỗ trống', 'Apa arti kalimat ini?': 'Câu này nghĩa là gì?', 'Pola tetap ditandai paham — skor {n}%.': 'Vẫn đánh dấu đã hiểu — điểm {n}%.',
  'Lulus {n}% — pola ditandai paham (+10 XP).': 'Đạt {n}% — đã hiểu (+10 XP).', 'Skor {n}% — butuh 75%. Baca lagi Logika & contohnya, lalu coba sekali lagi.': 'Điểm {n}% — cần 75%. Đọc lại rồi thử lại.'
});

