/* ========== V0.9: SIMPAN PROGRES YANG AMAN ==========
   1) Kunci kata stabil: tiap kartu diberi cap bentuk hanzi (c.h). Kalau urutan daftar kata berubah
      antar versi (mis. V0.8 → V0.8.5 menambah 2.360 kata), kartu dipindah ke kata yang benar.
   2) Snapshot otomatis harian di IndexedDB (5 terakhir) + minta penyimpanan permanen (iOS/Android).
   3) Ekspor yang jalan di iPhone (share sheet) + kartu cadangan yang selalu terlihat.            */
Object.assign(I18N, {
  'Snapshot otomatis': ['Automatic snapshots', 'Awtomatikong snapshot'],
  'App menyimpan salinan progres tiap hari di perangkat ini (7 harian, 4 mingguan, 6 bulanan).': ['The app keeps a daily copy of your progress on this device (7 daily, 4 weekly, 6 monthly).', 'Nagse-save ang app ng kopya ng progress araw-araw (7 araw, 4 linggo, 6 buwan).'],
  'Pulihkan': ['Restore', 'I-restore'], 'Belum ada snapshot.': ['No snapshots yet.', 'Wala pang snapshot.'],
  'Pulihkan progres dari snapshot ini?': ['Restore progress from this snapshot?', 'I-restore ang progress mula sa snapshot na ito?'],
  'Simpan progres': ['Save progress', 'I-save ang progress'],
  'Penyimpanan permanen aktif': ['Persistent storage on', 'Naka-on ang permanenteng storage'],
  'Progres disimpan otomatis tiap kamu menjawab.': ['Progress saves automatically every time you answer.', 'Awtomatikong nase-save ang progress bawat sagot.'],
  '{n} kartu dipindahkan ke kata yang benar setelah update.': ['{n} cards were moved to the right words after the update.', '{n} card ang inilipat sa tamang salita pagkatapos ng update.']
});
Object.assign(I18N_VI, {
  'Snapshot otomatis': 'Bản lưu tự động', 'App menyimpan salinan progres tiap hari di perangkat ini (7 harian, 4 mingguan, 6 bulanan).': 'Ứng dụng lưu một bản tiến độ mỗi ngày trên thiết bị này (7 ngày, 4 tuần, 6 tháng).',
  'Pulihkan': 'Khôi phục', 'Belum ada snapshot.': 'Chưa có bản lưu.', 'Pulihkan progres dari snapshot ini?': 'Khôi phục tiến độ từ bản lưu này?',
  'Simpan progres': 'Lưu tiến độ', 'Penyimpanan permanen aktif': 'Đã bật lưu trữ lâu dài', 'Progres disimpan otomatis tiap kamu menjawab.': 'Tiến độ được lưu tự động mỗi lần bạn trả lời.',
  '{n} kartu dipindahkan ke kata yang benar setelah update.': 'Đã chuyển {n} thẻ về đúng từ sau khi cập nhật.'
});

/* ---------- 1. kunci kata stabil ---------- */
const SF_DATA0 = 7517;                       // jumlah kata data.js di V0.8 (sebelum tambahan V0.8.5)
const SF_T085 = Date.UTC(2026, 9, 7, 12, 0);  // rilis V0.8.5
function sfKey(w) { return w.semi ? w.w + '§s' : w.w; }
function sfIndex() {
  const m = {}; W.forEach((w, i) => { const k = sfKey(w); if (m[k] === undefined) m[k] = i; (w.v || []).forEach(v => { if (m[v] === undefined) m[v] = i; }); });
  return m;
}
/* susunan lama V0.8: 7517 kata data → semi → kata lesson yang belum ada di data lama */
function sfOldLayout() {
  const old = W.slice(0, SF_DATA0).map(sfKey);
  const idx = {}; W.slice(0, SF_DATA0).forEach((w, i) => [w.w.replace(/[()]/g, ''), w.w.replace(/\(.*?\)/g, ''), w.s].concat(w.v || []).forEach(f => { if (f && idx[f] === undefined) idx[f] = i; }));
  W.forEach(w => { if (w.semi) old.push(sfKey(w)); });
  if (typeof KLS !== 'undefined') KLS.forEach(L => (L.vocab || []).forEach(v => {
    let i = idx[v.hz]; if (i === undefined && v.alt) i = idx[v.alt];
    if (i === undefined) { idx[v.hz] = old.length; old.push(v.hz); }
  }));
  return old;
}
function sfRemap() {
  if (!S || !S.cards) return 0;
  const map = sfIndex(); let moved = 0; let old = null;
  const out = {};
  for (const k in S.cards) {
    const c = S.cards[k]; const i = +k; let tgt = i;
    if (c.h) { if (!W[i] || sfKey(W[i]) !== c.h) { const j = map[c.h]; tgt = j === undefined ? -1 : j; } }
    else if (!S.lay && i >= SF_DATA0 && (c.ls || c.lr || 0) < SF_T085) {
      old = old || sfOldLayout(); const f = old[i]; const j = f === undefined ? undefined : map[f];
      tgt = j === undefined ? i : j;
    }
    if (tgt < 0 || !W[tgt]) { out[k] = c; continue; }          // tidak ketemu: biarkan (tidak dihapus)
    if (tgt !== i) moved++;
    const prev = out[tgt]; if (!prev || (c.r || 0) + (c.st || 0) > (prev.r || 0) + (prev.st || 0)) out[tgt] = c;
    c.h = sfKey(W[tgt]);
  }
  S.cards = out; S.lay = 9;
  return moved;
}
const sfLoadBase = load;
load = function () {
  sfLoadBase();
  try { const n = sfRemap(); if (n) { save(true); setTimeout(() => toast(t('{n} kartu dipindahkan ke kata yang benar setelah update.', { n }), 4200), 1200); } } catch (e) { console.warn('remap', e); }
};
/* kartu baru: beri cap saat disimpan */
const sfSaveBase = save;
save = function (now) {
  try { if (S && S.cards) for (const k in S.cards) { const c = S.cards[k]; if (c && !c.h && W[k]) c.h = sfKey(W[k]); } } catch (e) {}
  return sfSaveBase(now);
};

/* ---------- 2. snapshot harian (IndexedDB) ---------- */
const SF_DB = 'xiaobu-snap';
function sfDb() {
  return new Promise((res, rej) => { if (!window.indexedDB) return rej(0); const r = indexedDB.open(SF_DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore('s'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
}
async function sfSnapList() {
  try { const db = await sfDb(); return await new Promise(res => { const out = []; const q = db.transaction('s').objectStore('s').openCursor();
    q.onsuccess = () => { const c = q.result; if (c) { out.push({ k: c.key, n: c.value.n, xp: c.value.xp }); c.continue(); } else res(out.sort((a, b) => a.k < b.k ? 1 : -1)); }; q.onerror = () => res(out); }); }
  catch (e) { return []; }
}
async function sfSnap() {
  try {
    if (!S || !S.cards || !Object.keys(S.cards).length) return;
    const k = todayKey(); const db = await sfDb(); const st = db.transaction('s', 'readwrite').objectStore('s');
    st.put({ d: JSON.stringify(S), n: Object.keys(S.cards).length, xp: S.xp || 0 }, k);
    const keys = await new Promise(res => { const r = st.getAllKeys ? st.getAllKeys() : null; if (!r) return res([]); r.onsuccess = () => res(r.result || []); r.onerror = () => res([]); });
    keys.sort().slice(0, Math.max(0, keys.length - 5)).forEach(x => st.delete(x));
  } catch (e) {}
}
async function sfSnapGet(k) { const db = await sfDb(); return new Promise((res, rej) => { const r = db.transaction('s').objectStore('s').get(k); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); }
let SF_PERSIST = false;
function sfPersist() { try { if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then(p => p ? (SF_PERSIST = true) : navigator.storage.persist().then(x => { SF_PERSIST = !!x; })).catch(() => {}); } catch (e) {} }
setTimeout(() => { sfPersist(); sfSnap(); }, 4000);
document.addEventListener('visibilitychange', () => { if (document.hidden) sfSnap(); });

/* ---------- 3. ekspor yang jalan di iPhone + kartu cadangan ---------- */
async function sfExport() {
  S.lastBackup = Date.now(); save(true);
  const name = `xiaobu-kelas-${todayKey()}.json`; const json = JSON.stringify(S);
  try {
    const f = new File([json], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [f] }) && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) { await navigator.share({ files: [f], title: name }); toast(t('⬇️ Cadangan diunduh')); return; }
  } catch (e) { if (e && e.name === 'AbortError') return; }
  try { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); toast(t('⬇️ Cadangan diunduh')); }
  catch (e) { copyCode(); }
}
function sfSnapCard() {
  return `<section class="card glass sfsnap"><h3 style="margin:0 0 4px">${ICON('calendar')} ${t('Snapshot otomatis')}</h3>
    <p class="small muted" style="margin:0 0 8px">${t('App menyimpan salinan progres tiap hari di perangkat ini (7 harian, 4 mingguan, 6 bulanan).')}${SF_PERSIST ? ' · ' + t('Penyimpanan permanen aktif') : ''}</p><div id="sfsnaps" class="small muted">…</div></section>`;
}
function sfFillSnaps() {
  const el = document.getElementById('sfsnaps'); if (!el) return;
  sfSnapList().then(l => { el.innerHTML = l.length ? l.map(s => `<div class="sfrow"><b>${esc(s.k)}</b><span class="grow">${s.n} ${t('kata')} · ${fmtN(s.xp)} XP</span><button class="btn sec small" data-a="sfrestore" data-v="${esc(s.k)}">${t('Pulihkan')}</button></div>`).join('') : t('Belum ada snapshot.'); });
}
const sfMeBase = vMe;
vMe = function () { setTimeout(sfFillSnaps, 30); const h = sfMeBase(); const k = h.indexOf('</section>'); return k < 0 ? h + sfSnapCard() : h.slice(0, k + 10) + sfSnapCard() + h.slice(k + 10); };
Object.assign(ACT, {
  export: () => sfExport(),
  sfrestore: async b => {
    if (!confirm(t('Pulihkan progres dari snapshot ini?'))) return;
    try { const r = await sfSnapGet(b.dataset.v); if (!r) return; SAVE_LOCK = true; clearTimeout(saveT); localStorage.setItem(KEY, r.d); location.reload(); } catch (e) { toast(t('⚠️ File cadangan tidak valid')); }
  },
  gobackup: () => { go('me'); setTimeout(() => { const el = document.querySelector('.bkcard'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 120); }
});
/* pengingat cadangan lebih cepat muncul: ≥10 kata & 3 hari */
backupNag = function () {
  const n = Object.keys(S.cards).length; if (n < 10) return '';
  const last = S.lastBackup || 0; const snooze = S.backupSnooze || 0;
  if (Date.now() - last < 3 * DAY || Date.now() < snooze) return '';
  return `<section class="card glass bknag"><span class="bk-ic">${ICON('download')}</span><div class="grow"><b>${t('Amankan progresmu')}</b><div class="small muted">${t('{n} kata sudah kamu pelajari. Simpan kode progres supaya tidak perlu mengulang dari nol saat ganti HP atau alamat app.', { n })}</div></div>
    <div class="row wrap bkbtns"><button class="btn pri small" data-a="copycode">${t('Salin kode')}</button><button class="btn sec small" data-a="export">${t('Unduh file cadangan')}</button><button class="btn ghost small" data-a="bksnooze">${t('Nanti')}</button></div></section>`;
};