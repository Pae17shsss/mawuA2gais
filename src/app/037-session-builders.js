/* ========== SESSION BUILDERS ========== */
function wpick(obj) { const e = Object.entries(obj).filter(([, v]) => v > 0); if (!e.length) return Object.keys(obj)[0]; const tot = e.reduce((a, [, v]) => a + v, 0); let r = Math.random() * tot; for (const [k, v] of e) { if ((r -= v) <= 0) return k; } return e[0][0]; }
const voiceOK = () => TTS.ok && !!TTS.voice;
const toneQuizOK = w => aligned(w) && w.t.some(t => t < 5);
// a question type that is always answerable for this word
function safeType(i, pref) {
  const w = W[i];
  if (pref === 'listen' && voiceOK()) return 'listen';
  if (w.m) return pref === 'mc_hanzi' ? 'mc_hanzi' : 'mc_mean';
  if (toneQuizOK(w)) return 'tone';
  return voiceOK() ? 'listen' : 'mc_hanzi';
}
function matchIds(ids, n = 5) {
  const out = []; const hz = new Set(); const mn = new Set();
  for (const i of shuffle(ids)) { const w = W[i]; if (!w || !w.m) continue; const m = meanP(w); if (hz.has(w.w) || mn.has(m)) continue; hz.add(w.w); mn.add(m); out.push(i); if (out.length >= n) break; }
  return out;
}
function chooseType(i, prefer) {
  const w = W[i]; const m = mastery(card(i));
  let o = m <= 1 ? { mc_mean: 3, listen: 1, mc_hanzi: 1 } : m === 2 ? { mc_mean: 2, mc_hanzi: 2, listen: 2, tone: 1.2 } : { mc_hanzi: 2, listen: 2, tone: 1.5, type: 1.5, mc_mean: 1 };
  if (!w.m) o = { tone: 2, listen: 1 };
  if (!aligned(w)) { delete o.tone; delete o.type; }
  if (!toneQuizOK(w)) delete o.tone;
  if (!w.m) { delete o.mc_mean; delete o.mc_hanzi; }
  if (!voiceOK()) delete o.listen;
  if (m <= 2 && combineOK(w)) o.combine = 1;
  for (const k in o) { const t = S.adapt.type[k]; if (t && t.n >= 8) o[k] *= 1 + (1 - t.acc) * 1.6; }
  if (prefer && o[prefer] !== undefined) o[prefer] *= 3;
  if (!Object.keys(o).length) return safeType(i);
  return wpick(o);
}
function interleave(news, revs) {
  const out = []; const pend = []; let ni = 0, ri = 0;
  while (ni < news.length || ri < revs.length || pend.length) {
    const ready = pend.findIndex(p => p.d <= 0);
    if (ready >= 0) out.push(pend.splice(ready, 1)[0].item);
    else if (ni < news.length && (out.length % 3 !== 2 || ri >= revs.length)) { const i = news[ni++]; out.push({ type: 'intro', wid: i, isNew: true }); pend.push({ item: { type: safeType(i), wid: i, isNew: true }, d: 2 }); }
    else if (ri < revs.length) out.push(revs[ri++]);
    else { pend.sort((a, b) => a.d - b.d); out.push(pend.shift().item); }
    pend.forEach(p => p.d--);
  }
  return out;
}
function buildSmart(o = {}) {
  const plan = planToday(); const day = dayRec(); const size = S.adapt.size;
  const newLeft = Math.max(0, plan.new - day.new);
  let nNew = o.noNew ? 0 : Math.min(newLeft, o.bigNew ? 10 : 6);
  const due = dueIds();
  const revCount = Math.max(o.noNew ? size : 4, size - nNew * 2);
  const revs = due.slice(0, revCount).map(i => ({ type: chooseType(i, o.prefer), wid: i, hint: isLeech(card(i)) }));
  if (!nNew && !revs.length && !o.noNew) nNew = Math.min(6, nextNew(6).length);
  const news = nextNew(nNew);
  let items = interleave(news, revs);
  const toneAcc = (S.adapt.type.tone || {}).acc;
  const known = Object.keys(S.cards).map(Number).filter(i => toneQuizOK(W[i]) && S.cards[i].iv >= 0.007);
  if (toneAcc !== undefined && toneAcc < .7 && known.length > 5) shuffle(known).slice(0, 2).forEach(i => items.push({ type: 'tone', wid: i }));
  if (!items.length) return buildPractice();
  return items;
}
function buildPractice(n = 14, prefer) {
  const ids = Object.keys(S.cards).map(Number);
  if (ids.length < 4) return interleave(nextNew(5), []);
  const scored = ids.map(i => { const c = S.cards[i]; return [i, (c.lp * 2 + (3 - c.ef)) * (Math.random() + .5) + (c.iv < 7 ? 1 : 0)]; }).sort((a, b) => b[1] - a[1]);
  const valid = (t, i) => { const w = W[i]; return t === 'tone' ? toneQuizOK(w) : t === 'type' ? aligned(w) : t === 'listen' ? voiceOK() : (t === 'mc_mean' || t === 'mc_hanzi') ? !!w.m : t === 'combine' ? combineOK(w) : true; };
  return scored.filter(([i]) => !prefer || valid(prefer, i)).slice(0, n).map(([i]) => ({ type: prefer ? prefer : chooseType(i), wid: i }));
}
function buildTone(n = 12) {
  let ids = Object.keys(S.cards).map(Number).filter(i => toneQuizOK(W[i]));
  if (ids.length < 8) ids = A2_ORDER.slice(0, 60).filter(i => toneQuizOK(W[i]));
  return shuffle(ids).slice(0, n).map(i => ({ type: 'tone', wid: i }));
}
function buildUnitLearn(u) {
  const news = u.ids.filter(i => !S.cards[i]);
  if (!news.length) return buildUnitPractice(u);
  return interleave(news.slice(0, 8), []);
}
function buildUnitPractice(u) {
  const ids = u.ids.filter(i => S.cards[i]);
  if (ids.length < 2) return interleave(u.ids.slice(0, 6), []);
  const items = shuffle(ids).map(i => ({ type: chooseType(i), wid: i }));
  const mi = matchIds(ids); if (mi.length >= 4) items.push({ type: 'match', ids: mi });
  return items;
}
function writePool() {
  const seen = CHAR_ORDER.filter(c => CHAR_WORDS[c].some(i => S.cards[i]));
  const src = seen.length >= 4 ? seen : CHAR_ORDER.slice(0, 24);
  const fresh = src.filter(c => !(S.hzWrite || {})[c]);
  return fresh.length >= 4 ? fresh : src;
}
function buildWrite(n = 6, chars) {
  const pool = chars && chars.length ? chars : writePool();
  return shuffle(pool.slice()).slice(0, n).map(c => ({ type: 'write', ch: c }));
}
function buildSent(n = 12, mode) {
  const lv = reachLv();
  const items = mode === 'cloze' ? buildCloze(n, lv) : mode === 'build' ? buildSentence(n, lv) : buildMixSentence(n, lv);
  return items;
}
function buildMatch() {
  let ids = Object.keys(S.cards).map(Number).filter(i => W[i].m);
  if (ids.length < 8) ids = A2_ORDER.slice(0, 24);
  return [0, 1].map(() => ({ type: 'match', ids: matchIds(ids) })).filter(x => x.ids.length >= 3);
}
function buildHz(chars) {
  return shuffle(chars.filter(c => CH[c])).slice(0, 10).map(c => ({ type: 'hz', ch: c }));
}
function buildPlacement(lv) {
  const ids = shuffle(UNITS[lv].flatMap(u => u.ids)).slice(0, 12);
  return ids.map(i => ({ type: 'mc_mean', wid: i, place: true }));
}
