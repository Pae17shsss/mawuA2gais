/* ========== AUDIO: TTS (zh-TW) ========== */
const TTS = {
  voices: [], voice: null, ok: 'speechSynthesis' in window,
  init() {
    if (!this.ok) return;
    const pickV = () => {
      this.voices = speechSynthesis.getVoices().filter(v => /^zh|^cmn|yue/i.test(v.lang) || /chinese|中文|國語|台灣|臺灣/i.test(v.name));
      const score = v => {
        let p = 0;
        if (/zh[-_]TW|cmn[-_]Hant|Hant[-_]TW/i.test(v.lang)) p += 100;
        if (/Mei-?Jia|Meijia|Yating|Hanhan|HsiaoChen|HsiaoYu|臺灣|台灣|Taiwan/i.test(v.name)) p += 90;
        if (/zh[-_]CN|cmn[-_]Hans/i.test(v.lang)) p += 40;
        if (/Google/i.test(v.name)) p += 35;          // Google voices are the clearest for tones
        if (/Siri|Premium|Enhanced|Neural|Natural/i.test(v.name)) p += 30;
        if (!v.localService) p += 12;                  // network voices are usually higher quality
        if (/Compact|eSpeak|Espeak/i.test(v.name)) p -= 60;
        if (/HK|yue|Cantonese|粵/i.test(v.lang + v.name)) p -= 80;
        return p;
      };
      const ranked = this.voices.slice().sort((a, b) => score(b) - score(a));
      this.ranked = ranked;
      this.voice = this.voices.find(v => v.name === S.settings.voice) || ranked[0] || null;
      if (typeof onVoices === 'function') onVoices();
    };
    pickV(); speechSynthesis.onvoiceschanged = pickV; [400, 900, 1800, 3500, 6000].forEach(ms => setTimeout(pickV, ms));
  },
  // iOS hanya mengizinkan suara setelah sentuhan pertama — panaskan mesin suaranya di situ
  unlock() {
    if (this.unlocked || !this.ok) return; this.unlocked = true;
    try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; u.lang = 'zh-TW'; speechSynthesis.speak(u); } catch (e) {}
    if (!this.voice) setTimeout(() => { try { this.voices = speechSynthesis.getVoices(); } catch (e) {} }, 200);
  },
  isTW() { return this.voice && (/TW/i.test(this.voice.lang) || /Mei-?Jia|Hanhan|HsiaoChen|HsiaoYu|Yating|Zhiwei|台灣|臺灣|Taiwan/i.test(this.voice.name)); },
  u: null, t: 0, dog: 0,
  stop() { clearTimeout(this.t); clearTimeout(this.dog); if (!this.ok) return; try { if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel(); } catch (e) {} },
  speak(text, rate) {
    if (!this.ok || !text) return;
    this.stop();
    // small gap after cancel(): Chrome/Android sometimes drops or hangs an utterance spoken in the same tick
    this.t = setTimeout(() => {
      try {
        const u = new SpeechSynthesisUtterance(String(text).replace(/[()（）]/g, ''));
        u.lang = this.voice ? this.voice.lang : 'zh-TW';
        if (this.voice) u.voice = this.voice;
        u.rate = rate || S.settings.rate; u.pitch = 1;
        u.onend = u.onerror = () => { clearTimeout(this.dog); if (this.u === u) this.u = null; };
        this.u = u; // keep a reference: iOS garbage-collects utterances mid-speech and the queue freezes
        if (speechSynthesis.paused) speechSynthesis.resume();
        speechSynthesis.speak(u);
        // watchdog: if the engine gets stuck "speaking", reset it so the next word still plays
        this.dog = setTimeout(() => { try { if (speechSynthesis.speaking) speechSynthesis.cancel(); } catch (e) {} }, 7000);
      } catch (e) {}
    }, 40);
  }
};
TTS.speakSyl = function (text, gap = 420, rate = 0.62) {
  // isolated syllables keep their full citation tone — the clearest way to hear tone differences
  const cs = String(text).replace(/[()（）\s]/g, '').split('');
  if (!cs.length) return;
  clearTimeout(this.seq); let k = 0;
  const step = () => { if (k >= cs.length) return; this.speak(cs[k++], rate); this.seq = setTimeout(step, gap + 260); };
  step();
};
const say = (w, slow) => {
  if (!w) return;
  const txt = typeof w === 'string' ? w : w.s;
  if (slow) { if (txt.length > 1) TTS.speakSyl(txt); else TTS.speak(txt, 0.5); return; }
  TTS.speak(txt);
};
// pelafalan + kontur nada: hum dulu, lalu suara kata
function sayWithTone(w, opts = {}) {
  const tones = typeof w === 'string' ? null : w.t;
  if (tones && tones.length && S.settings.toneCue !== false) {
    TONE.play(tones);
    clearTimeout(sayT); sayT = setTimeout(() => say(w, opts.slow), tones.length * 620 + 220);
  } else say(w, opts.slow);
}
let sayT = 0;
function sayLater(w, ms) { clearTimeout(sayT); sayT = setTimeout(() => say(w), ms); }
function hushAll() { clearTimeout(sayT); clearTimeout(TTS.seq); if (typeof stopLines === 'function' && LPLAY.on) stopLines(); TTS.stop(); TONE.stop(); }
