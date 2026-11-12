/* =====================================================================
   D. NAVIGASI, AKSI, INPUT
   ===================================================================== */
Object.assign(ACT, {
  ctxday: () => startCtx(ctxDayIds, Math.max(3, Math.min(6, Math.ceil(routeTargets().sent / 2) + 1)), t('Kalimat nyata')),
  ctxmine: () => startCtx(() => { const m = Object.keys(S.cards).map(Number).filter(i => ctxOf(i)); return shuffle(m.length >= 3 ? m : A2_ORDER.filter(i => ctxOf(i)).slice(0, 30)); }, 6, t('Kalimat nyata')),
  ctxword: b => { const i = +b.dataset.v; closeModal(); startCtx(() => [i], 1, t('Kalimat nyata')); },
  'goto-kalimat': () => go('kalimat'),
  cxopen: b => { closeModal(); VS11.sel = +b.dataset.v; VS11.q = ''; if (VS11.tab === 'today' && CXD && !cxPool('today').includes(VS11.sel)) VS11.tab = S.cards[VS11.sel] ? 'mine' : 'all'; go('kalimat'); },
  cxsel: b => { cxQStop(); VS11.sel = +b.dataset.v; render(); const m = $('.cx-mainc'); if (m && innerWidth < 900) m.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' }); },
  cxtab: b => { cxQStop(); VS11.tab = b.dataset.v; VS11.q = ''; VS11.lim = 60; VS11.sel = null; render(); },
  cxmore: () => { VS11.lim += 60; render(); },
  cxpy: b => { S.settings.ctxPy = b.dataset.v; save(); render(); },
  cxhide: () => { S.settings.ctxHide = !S.settings.ctxHide; save(); render(); },
  cxretry: () => { CX_ERR = false; render(); },
  dmin: b => { const m = +b.dataset.v; if (!DMIN.includes(m)) return; S.dailyMin = m; replanDay(); save(); render(); toast(t('Target {n} menit/hari — porsi & rute disesuaikan ✓', { n: m }), 2200, 'dmin'); },
  gotog: b => { const g = gOf(b.dataset.v); closeModal(); if (g) { GVS.tier = g.lv; GVS.open = g.k; } go('grammar'); }
});
['ctxday', 'ctxmine', 'ctxword'].forEach(a => START_ACTS.add(a));
document.addEventListener('click', e => {
  const b = e.target.closest('[data-cx]'); if (!b) return;
  const a = b.dataset.cx; try { FX.ensure(); } catch (x) {}
  if (a === 'say') { cxQStop(); TTS.speak(b.dataset.v, b.dataset.slow ? 0.6 : undefined); }
  else if (a === 'sayl') { cxQStop(); speakLang(b.dataset.v, b.dataset.l); }
  else if (a === 'gram') gramModal(b.dataset.v);
  else if (a === 'reveal') { const c = b.closest('.cxcard'); if (c) { c.classList.add('rev'); FX.play('flip'); } }
  else if (a === 'playall') cxPlayAll(+b.dataset.v);
});
let cxqT = 0;
document.addEventListener('input', e => {
  if (!e.target.dataset || e.target.dataset.in !== 'cxq' || e.isComposing) return;
  VS11.q = e.target.value; clearTimeout(cxqT);
  cxqT = setTimeout(() => { VS11.lim = 60; VS11.sel = null; render(); const i = $('#cxq'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 260);
});
const afterRenderV10 = afterRender;
afterRender = function () {
  afterRenderV10();
  const app = $('#app'); if (app) app.classList.toggle('wide', ROUTE === 'kalimat');
  if (ROUTE !== 'kalimat') cxQStop();
};
/* muat kalimat diam-diam setelah aplikasi tenang, supaya kartu kata baru langsung punya contoh */
setTimeout(() => { const f = () => { try { loadCtx(); } catch (e) {} }; if ('requestIdleCallback' in window) requestIdleCallback(f, { timeout: 4000 }); else f(); }, 2500);