/* ========== V1.5: SATU SUARA DI SEMUA MENU ==========
   Semua ucapan Mandarin (termasuk jalur yang memanggil speechSynthesis langsung: TOCFL, dialog, Dengar 50,
   Kelas Tema, kalimat, game) dipaksa memakai suara yang dipilih pengguna (atau suara terbaik otomatis),
   dan bila suara cloud aktif, kalimat Mandarin dialihkan ke sana. Variasi tokoh dialog cukup lewat nada (pitch). */
Object.assign(I18N, {
  'Suara tokoh berbeda (dialog)': ['Different voices per speaker (dialogs)', 'Ibang boses bawat tauhan'],
  'Matikan agar semua menu memakai suara pilihanmu saja.': ['Turn off so every menu uses only your chosen voice.', 'I-off para iisang boses lang sa lahat.']
});
Object.assign(I18N_VI, { 'Suara tokoh berbeda (dialog)': 'Giọng khác nhau cho từng nhân vật', 'Matikan agar semua menu memakai suara pilihanmu saja.': 'Tắt để mọi mục chỉ dùng giọng bạn chọn.' });
function vfIsZh(u) {
  try { const l = String(u.lang || '').toLowerCase(); if (l.startsWith('zh') || l.startsWith('cmn')) return true; return /[㐀-鿿]/.test(String(u.text || '')) && !/^(id|en|tl|fil|vi)/.test(l); } catch (e) { return false; }
}
try {
  if (typeof speechSynthesis !== 'undefined' && !speechSynthesis._vfWrap) {
    const spPrev = speechSynthesis.speak.bind(speechSynthesis);
    speechSynthesis.speak = function (u) {
      try {
        if (u && vfIsZh(u) && TTS.voice) {
          const multi = !!(S.settings && S.settings.multiVoice);
          if (!multi || !u.voice || !/^zh|^cmn/i.test(u.voice.lang || '')) {
            if (u.voice !== TTS.voice) { u.voice = TTS.voice; u.lang = TTS.voice.lang || 'zh-TW'; }
          }
        }
      } catch (e) {}
      return spPrev(u);
    };
    speechSynthesis._vfWrap = 1;
  }
} catch (e) {}
/* pengaturan di Saya: sakelar "Suara tokoh berbeda" (bawaan mati = satu suara) */
const vfMeBase = vMe;
vMe = function () {
  const h = vfMeBase();
  const on = !!(S.settings && S.settings.multiVoice);
  const row = `<section class="card glass vf-row"><div class="row" style="align-items:center;gap:12px"><div class="grow"><b>${t('Suara tokoh berbeda (dialog)')}</b><div class="small muted">${t('Matikan agar semua menu memakai suara pilihanmu saja.')}</div></div>
    <button class="chip ${on ? 'on' : ''}" data-a="vfmulti" aria-pressed="${on}">${on ? t('Nyala') : t('Mati')}</button></div></section>`;
  const k = h.lastIndexOf('</main>'); return k < 0 ? h + row : h.slice(0, k) + row + h.slice(k);
};
Object.assign(ACT, { vfmulti: () => { S.settings.multiVoice = !S.settings.multiVoice; save(); render(); } });

