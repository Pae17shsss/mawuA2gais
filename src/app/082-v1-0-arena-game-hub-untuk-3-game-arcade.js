/* ========== V1.0: ARENA GAME — hub untuk 3 game arcade (perahu, ritme, kalimat) ==========
   Tiap game mendaftar sendiri lewat ARENA.reg({...}) di file masing-masing (arena_boat.js, arena_beat.js, arena_kal.js).
   Hub menyediakan: rute 'arena', pilihan sumber kata (pakai lgWordsOf/lgSentsOf dari listgame.js), rekor, dan pintu masuk di Kelas & Beranda. */
ICON_PATHS.arena = '<path d="M6 11h4M8 9v4"/><circle cx="15.5" cy="10.5" r=".9"/><circle cx="17.5" cy="12.5" r=".9"/><path d="M7.5 6h9a5 5 0 0 1 4.9 6l-.8 4a2.6 2.6 0 0 1-4.5 1.2L14.4 15H9.6l-1.7 2.2A2.6 2.6 0 0 1 3.4 16l-.8-4A5 5 0 0 1 7.5 6z"/>';
Object.assign(I18N, {
  'Arena Game': ['Game Arena', 'Game Arena'], 'Main sambil belajar: baca, dengar, kalimat': ['Play & learn: reading, listening, sentences', 'Maglaro habang nag-aaral: basa, pakinig, pangungusap'],
  'Pilih sumber kata': ['Choose a word source', 'Pumili ng pinagmulan ng salita'], 'Main': ['Play', 'Laro'], 'Rekor': ['Best', 'Rekord'],
  '3 game arcade · perahu, ritme, kalimat': ['3 arcade games · boats, rhythm, sentences', '3 arcade game · bangka, ritmo, pangungusap'],
  'Pelajari minimal 8 kata dulu, atau pilih Kosakata A2 / lesson.': ['Learn at least 8 words first, or pick A2 vocab / a lesson.', 'Mag-aral muna ng 8 salita, o pumili ng A2 / lesson.'],
  'Lesson Kelas…': ['Kelas lesson…', 'Kelas lesson…'], 'kali main': ['plays', 'laro']
});
Object.assign(I18N_VI, {
  'Arena Game': 'Đấu trường trò chơi', 'Main sambil belajar: baca, dengar, kalimat': 'Vừa chơi vừa học: đọc, nghe, câu', 'Pilih sumber kata': 'Chọn nguồn từ', 'Main': 'Chơi', 'Rekor': 'Kỷ lục',
  '3 game arcade · perahu, ritme, kalimat': '3 trò arcade · thuyền, nhịp điệu, câu', 'Pelajari minimal 8 kata dulu, atau pilih Kosakata A2 / lesson.': 'Hãy học ít nhất 8 từ trước, hoặc chọn từ A2 / bài học.',
  'Lesson Kelas…': 'Bài học…', 'kali main': 'lượt chơi'
});
const ARENA = {
  games: [],
  reg(g) { if (!this.games.some(x => x.k === g.k)) this.games.push(g); this.games.sort((a, b) => (a.ord || 9) - (b.ord || 9)); },
  get: k => ARENA.games.find(g => g.k === k)
};
function arS() {
  S.arena = S.arena && typeof S.arena === 'object' ? S.arena : {};
  const a = S.arena; a.best = a.best || {}; a.plays = a.plays || {}; a.last = a.last || {};
  if (!a.src) a.src = (typeof lgLearnedIds === 'function' && lgLearnedIds().length >= 12) ? 'learned' : 'a2';
  return a;
}
/* kumpulan materi untuk game: kata (indeks W yang punya arti & pinyin per suku kata) + kalimat */
function arenaPool(src) {
  src = src || arS().src;
  let ids = []; let sents = [];
  try { ids = lgWordsOf(src); } catch (e) { ids = []; }
  if (ids.length < 8) { try { ids = lgWordsOf('a2'); } catch (e) {} }
  try { sents = lgSentsOf(src); } catch (e) { sents = []; }
  if (sents.length < 6) { try { const extra = lgSentsOf('a2'); sents = sents.concat(extra); } catch (e) {} }
  return { src, ids, sents, name: typeof lgSrcName === 'function' ? lgSrcName(src) : src };
}
/* catat hasil ronde (dipanggil game): skor, akurasi, xp */
function arenaRecord(k, score, acc) {
  const a = arS(); a.plays[k] = (a.plays[k] || 0) + 1; const pb = score > (a.best[k] || 0); if (pb) a.best[k] = score;
  a.last[k] = { s: score, acc: Math.round((acc || 0) * 100), d: todayKey() }; save(); return pb;
}
function arenaWordsN(src) { try { return lgWordsOf(src).length; } catch (e) { return 0; } }
function vArena() {
  const a = arS(); const n = arenaWordsN(a.src);
  const chip = (k, ic, lab) => `<button class="chip ar-src ${a.src === k ? 'on' : ''}" data-a="arsrc" data-v="${k}">${ICON(ic)} ${esc(lab)} <b>${fmtN(arenaWordsN(k))}</b></button>`;
  const Ls = (typeof lgLessons === 'function' ? lgLessons() : []);
  const opt = L => `<option value="k:${L.n}" ${a.src === 'k:' + L.n ? 'selected' : ''}>${esc(lgLessonName(L.n))}</option>`;
  const games = ARENA.games.map(g => {
    const b = a.best[g.k] || 0; const p = a.plays[g.k] || 0;
    return `<article class="ar-card" style="--g1:${g.c1};--g2:${g.c2}">
      <div class="ar-art">${g.art || ''}<span class="ar-gi">${g.icon || ICON('arena')}</span></div>
      <div class="ar-body"><div class="ar-zh hz">${esc(g.zh || '')}</div><h3>${esc(t(g.title))}</h3><p class="small muted">${esc(t(g.desc))}</p>
        <div class="ar-tags">${(g.tags || []).map(x => `<span>${esc(t(x))}</span>`).join('')}</div>
        <div class="row" style="align-items:center;gap:10px;margin-top:10px"><button class="btn pri" data-a="arplay" data-v="${g.k}" ${n < 4 ? 'disabled' : ''}>${ICON('play')} ${t('Main')}</button>
        <span class="small muted grow">${b ? `${t('Rekor')} <b>${fmtN(b)}</b> · ` : ''}${p} ${t('kali main')}</span></div></div></article>`;
  }).join('');
  return `<main class="main ar-page"><section class="card glass ar-hero"><div class="ar-hero-t"><span class="kl-badge">${ICON('arena')} Arena · 遊戲場</span>
      <h1>${t('Arena Game')}</h1><p class="muted">${t('Main sambil belajar: baca, dengar, kalimat')}</p></div><div class="ar-hero-m">${typeof mascot === 'function' ? mascot('joy', 92) : ''}</div></section>
    <section class="card glass"><h3 style="margin:0 0 10px">${t('Pilih sumber kata')}</h3>
      <div class="row wrap" style="gap:8px">${chip('learned', 'seed', 'Kata yang sudah dipelajari')}${chip('a2', 'path', 'Kosakata A2')}</div>
      ${Ls.length ? `<select class="ar-sel" data-arin="src"><option value="">${t('Lesson Kelas…')}</option>${Ls.map(opt).join('')}</select>` : ''}
      ${n < 4 ? `<p class="small" style="color:var(--bad);margin:8px 0 0">${t('Pelajari minimal 8 kata dulu, atau pilih Kosakata A2 / lesson.')}</p>` : ''}</section>
    <div class="ar-grid">${games}</div></main>`;
}
XVIEWS.arena = vArena;
Object.assign(ACT, {
  arena: () => go('arena'),
  arsrc: b => { arS().src = b.dataset.v; save(); render(); },
  arplay: b => { const g = ARENA.get(b.dataset.v); if (!g) return; const pool = arenaPool(); if (!pool.ids.length) return; try { if (typeof FX !== 'undefined') FX.ensure(); } catch (e) {} g.start(pool); }
});
START_ACTS.add('arplay');
document.addEventListener('change', e => { if (e.target && e.target.dataset && e.target.dataset.arin === 'src' && e.target.value) { arS().src = e.target.value; save(); render(); } });
(function () {
  if (!ROUTES.some(r => r[0] === 'arena')) { const k = ROUTES.findIndex(r => r[0] === 'lgame'); ROUTES.splice(k >= 0 ? k + 1 : 2, 0, ['arena', 'arena', 'Arena Game']); }
  TAB_SHORT.arena = 'Arena'; ROUTE_DESC.arena = 'Balap perahu, ritme, duel kalimat'; ROUTE_COLOR.arena = 'c1';
})();
function arEntry() {
  const a = arS(); const best = Object.values(a.best).reduce((x, y) => x + (+y || 0), 0);
  return `<section class="ar-entry" data-a="arena" role="button" tabindex="0"><span class="ar-ei">${ICON('arena')}</span><div class="grow" style="min-width:0"><b>${t('Arena Game')}</b><span>${t('3 game arcade · perahu, ritme, kalimat')}${best ? ` · ${t('Rekor')} ${fmtN(best)}` : ''}</span></div>${ICON('chevron')}</section>`;
}
const vHomeAR = vHome;
vHome = function () { const h = vHomeAR(); try { return lgInsertAfter(h, 2, arEntry()); } catch (e) { return h; } };
const XVK_AR = XVIEWS.kelas;
XVIEWS.kelas = function () { const h = XVK_AR(); try { if (typeof VK !== 'undefined' && VK.view && VK.view !== 'home' && VK.view !== 'map') return h; return lgInsertAfter(h, 1, arEntry()); } catch (e) { return h; } };