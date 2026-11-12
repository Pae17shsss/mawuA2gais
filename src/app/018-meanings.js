/* ========== MEANINGS ========== */
const hasMeaning = w => !!w.m;
const primIdx = () => Math.max(0, LANGS.indexOf(meanLang()));
const meanP = w => (w.m ? wMean(w) : '—');
function subsHTML(w, big) {
  if (!w.m) return `<div class="subs"><div class="sub-line muted small">${t('Arti 3 bahasa untuk level ini menyusul — pinyin & suara sudah siap.')}</div></div>`;
  const p = meanLang();
  const order = [p, ...MEAN_LANGS.filter(l => l !== p)].filter(l => S.settings.langs[l] || l === p);
  return `<div class="subs">${order.map((l, j) => `<div class="sub-line ${j === 0 && big ? 'pri' : ''}"><span class="lg">${LANG_LABEL[l]}</span><span>${esc(wMean(w, l))}</span></div>`).join('')}</div>`;
}
