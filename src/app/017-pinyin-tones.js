/* ========== PINYIN & TONES ========== */
const MARKS = {}; for (const [b, m] of Object.entries({ a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', ü: 'ǖǘǚǜ' })) [...m].forEach((c, i) => (MARKS[c] = [b, i + 1]));
const stripTone = s => [...s].map(c => (MARKS[c] ? MARKS[c][0] : c)).join('');
const hasMarks = s => [...s].some(c => MARKS[c]);
const aligned = w => w.y && w.y.length > 0;
function pinyinHTML(w, mode = S.settings.pinyin) {
  if (mode === 'none') return '';
  if (!aligned(w)) return esc(mode === 'num' ? stripTone(w.p) : w.p);
  return w.y.map((s, i) => `<span class="t${w.t[i]}">${esc(mode === 'num' ? stripTone(s) + (w.t[i] < 5 ? w.t[i] : '') : s)}</span>`).join(' ');
}
function hzHTML(w, plain) {
  const al = aligned(w); let k = 0; let out = '';
  for (const c of w.w) {
    if (c === '(' || c === ')') { out += `<span style="opacity:.45;font-size:.6em">${c}</span>`; continue; }
    if (isHan(c) && al && !plain) out += `<span class="t${w.t[k++] || 5}">${c}</span>`;
    else { out += esc(c); if (isHan(c)) k++; }
  }
  return out;
}
const TONE_PATH = { 1: 'M3 6 L27 6', 2: 'M3 18 L27 5', 3: 'M3 13 Q12 29 18 25 T27 12', 4: 'M3 4 L27 26', 5: 'M13 17 L17 17' };
const TONE_COL = { 1: 'var(--t1)', 2: 'var(--t2)', 3: 'var(--t3)', 4: 'var(--t4)', 5: 'var(--t5)' };
function contourSVG(tones, h = 30) {
  const n = tones.length; const wdt = n * 30;
  return `<svg class="contour" viewBox="0 0 ${wdt} 30" width="${wdt * h / 30}" height="${h}" aria-label="nada ${tones.join('-')}">` + tones.map((t, i) => `<path d="${TONE_PATH[t]}" transform="translate(${i * 30} 0)" fill="none" stroke="${TONE_COL[t]}" stroke-width="${t === 5 ? 6 : 3.4}" stroke-linecap="round"/>`).join('') + '</svg>';
}
const toneName = t => (t === 5 ? 'netral' : 'nada ' + t);
