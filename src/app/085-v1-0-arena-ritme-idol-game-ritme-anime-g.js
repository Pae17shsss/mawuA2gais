/* ========== V1.0 ARENA · 節奏偶像 Ritme Idol — game ritme anime (gaya Project SEKAI / osu!mania) ==========
   Not ber-hanzi turun ke garis mengikuti ketukan lagu J-pop sintetis. Petunjuk (arti / suara / pinyin) di atas;
   ketuk jalur yang hanzi-nya BENAR tepat di garis. Not biru = ketukan ritme, not panjang = tahan.
   Semua grafis digambar di kanvas; musik & SFX disintesis dengan Web Audio (tanpa file). */
(function () {
'use strict';
Object.assign(I18N, {
  'Ritme Idol': ['Rhythm Idol', 'Ritmo Idol'],
  'Ketuk hanzi yang benar tepat di garis, ikuti ketukan lagu J-pop!': ['Tap the right hanzi right on the line, in time with the J-pop beat!', 'I-tap ang tamang hanzi sa linya, sabay sa J-pop beat!'],
  'Arti → hanzi': ['Meaning → hanzi', 'Kahulugan → hanzi'], 'Suara → hanzi': ['Sound → hanzi', 'Tunog → hanzi'], 'Pinyin → hanzi': ['Pinyin → hanzi', 'Pinyin → hanzi'],
  'Mode': ['Mode', 'Mode'], 'Kesulitan': ['Difficulty', 'Hirap'], 'Mudah': ['Easy', 'Madali'], 'Sulit': ['Hard', 'Mahirap'],
  '{n} jalur': ['{n} lanes', '{n} lane'], 'Mulai live': ['Start live', 'Simulan ang live'], 'Cara main': ['How to play', 'Paano laruin'],
  'ARTI': ['MEANING', 'KAHULUGAN'], 'DENGAR': ['LISTEN', 'PAKINGGAN'], 'Pilih hanzi yang kamu dengar': ['Pick the hanzi you hear', 'Piliin ang hanzi na narinig mo'],
  'Putar ulang': ['Replay', 'Ulitin'], 'Jeda': ['Paused', 'Naka-pause'], 'Lanjut': ['Resume', 'Ituloy'], 'Ulang lagu': ['Restart song', 'Ulitin ang kanta'], 'Keluar': ['Quit', 'Lumabas'],
  'Musik': ['Music', 'Musika'], 'Tutup': ['Close', 'Isara'], 'Jawaban': ['Answer', 'Sagot'],
  'LIVE SUKSES!': ['LIVE CLEAR!', 'LIVE CLEAR!'], 'LIVE GAGAL…': ['LIVE FAILED…', 'LIVE NABIGO…'], 'Skor': ['Score', 'Iskor'], 'Akurasi': ['Accuracy', 'Katumpakan'],
  'Kombo maks': ['Max combo', 'Max combo'], 'Kata benar': ['Words right', 'Tamang salita'], 'Rekor baru!': ['New record!', 'Bagong rekord!'],
  'Kata yang terlewat': ['Missed words', 'Mga nalampasang salita'], 'Main lagi': ['Play again', 'Laro ulit'], 'Kembali': ['Back', 'Bumalik'],
  'Sempurna — tidak ada kata yang terlewat!': ['Flawless — no missed words!', 'Perpekto — walang nalampasan!'],
  'Lihat petunjuk di atas: arti, suara, atau pinyin.': ['Check the clue at the top: meaning, sound or pinyin.', 'Tingnan ang clue sa itaas: kahulugan, tunog o pinyin.'],
  'Not ber-hanzi turun. Ketuk jalur hanzi yang BENAR tepat saat menyentuh garis. Salah hanzi = MISS.': ['Hanzi notes fall. Tap the lane with the RIGHT hanzi exactly as it hits the line. Wrong hanzi = MISS.', 'Bumabagsak ang hanzi. I-tap ang TAMANG hanzi pagdating sa linya. Maling hanzi = MISS.'],
  'Ketuk juga not biru biar kombo jalan. Not panjang: tahan sampai habis. Kombo tinggi = FEVER!': ['Tap the blue beat notes too to keep the combo. Long notes: hold to the end. High combo = FEVER!', 'I-tap din ang asul na nota para sa combo. Mahabang nota: hawakan. Mataas na combo = FEVER!'],
  'Laptop: tombol D F J K · HP/tablet: ketuk jalurnya': ['Laptop: keys D F J K · Phone/tablet: tap the lanes', 'Laptop: D F J K · Phone/tablet: i-tap ang lane'],
  'Siap!': ['Ready!', 'Handa na!'], 'Sumber': ['Source', 'Pinagmulan'], 'kata': ['words', 'salita'],
  'Kata di sumber ini belum cukup.': ['Not enough words in this source.', 'Kulang ang salita sa source na ito.'], 'LEPAS': ['RELEASED', 'BINITAWAN'],
  'Skor ×1,5': ['Score ×1.5', 'Iskor ×1.5'], 'Spasi/Enter: putar ulang · Esc: jeda': ['Space/Enter: replay · Esc: pause', 'Space/Enter: ulitin · Esc: pause'],
  'Esc: jeda': ['Esc: pause', 'Esc: pause'], 'Nyawa': ['Life', 'Buhay'], 'minum': ['drink', 'uminom'], 'Enter/Esc: lanjut': ['Enter/Esc: resume', 'Enter/Esc: ituloy'],
  '1 lawan 1 · lagu & not sama': ['1 vs 1 · same song & notes', '1 laban 1 · parehong kanta at nota'], 'Lawan': ['Opponent', 'Kalaban'],
  '{n} KO!': ['{n} is KO!', 'KO si {n}!'], '{n} KO': ['{n} KO', 'KO si {n}'], 'KO — skor dibekukan. Lanjut latihan!': ['KO — score frozen. Keep practising!', 'KO — naka-freeze ang iskor. Magpraktis pa!'],
  'Ketuk X sekali lagi untuk keluar dari ronde': ['Tap X again to leave the match', 'I-tap ulit ang X para umalis'], 'Menunggu lawan…': ['Waiting for opponent…', 'Hinihintay ang kalaban…'],
  'masih menyelesaikan lagu': ['still finishing the song', 'tinatapos pa ang kanta'], 'Skor kamu': ['Your score', 'Iskor mo'], 'MENANG!': ['YOU WIN!', 'PANALO!'], 'KALAH…': ['YOU LOSE…', 'TALO…'], 'SERI!': ['DRAW!', 'TABLA!'],
  '{n} keluar — kamu menang!': ['{n} left — you win!', 'Umalis si {n} — panalo ka!'], 'Lawan tidak merespons': ['Opponent not responding', 'Hindi sumasagot ang kalaban'], 'Dua-duanya KO': ['Both KO', 'Parehong KO'],
  'Kamu KO — skor dibekukan': ['You were KO — score frozen', 'KO ka — naka-freeze ang iskor'], 'keluar': ['left', 'umalis'], 'skor dibekukan': ['score frozen', 'naka-freeze ang iskor'], '{n} FEVER ATTACK!': ['{n} FEVER ATTACK!', '{n} FEVER ATTACK!']
});
Object.assign(I18N_VI, {
  'Ritme Idol': 'Thần tượng nhịp điệu', 'Ketuk hanzi yang benar tepat di garis, ikuti ketukan lagu J-pop!': 'Chạm đúng chữ Hán ngay trên vạch, theo nhịp nhạc J-pop!',
  'Arti → hanzi': 'Nghĩa → chữ Hán', 'Suara → hanzi': 'Âm thanh → chữ Hán', 'Pinyin → hanzi': 'Pinyin → chữ Hán', 'Mode': 'Chế độ', 'Kesulitan': 'Độ khó',
  'Mudah': 'Dễ', 'Sulit': 'Khó', '{n} jalur': '{n} làn', 'Mulai live': 'Bắt đầu live', 'Cara main': 'Cách chơi', 'ARTI': 'NGHĨA', 'DENGAR': 'NGHE',
  'Pilih hanzi yang kamu dengar': 'Chọn chữ Hán bạn nghe thấy', 'Putar ulang': 'Phát lại', 'Jeda': 'Tạm dừng', 'Lanjut': 'Tiếp tục', 'Ulang lagu': 'Chơi lại bài',
  'Keluar': 'Thoát', 'Musik': 'Nhạc', 'Tutup': 'Đóng', 'Jawaban': 'Đáp án', 'LIVE SUKSES!': 'LIVE THÀNH CÔNG!', 'LIVE GAGAL…': 'LIVE THẤT BẠI…', 'Skor': 'Điểm',
  'Akurasi': 'Độ chính xác', 'Kombo maks': 'Combo tối đa', 'Kata benar': 'Từ đúng', 'Rekor baru!': 'Kỷ lục mới!', 'Kata yang terlewat': 'Từ bị lỡ', 'Main lagi': 'Chơi lại',
  'Kembali': 'Quay lại', 'Sempurna — tidak ada kata yang terlewat!': 'Hoàn hảo — không lỡ từ nào!', 'Lihat petunjuk di atas: arti, suara, atau pinyin.': 'Xem gợi ý ở trên: nghĩa, âm thanh hoặc pinyin.',
  'Not ber-hanzi turun. Ketuk jalur hanzi yang BENAR tepat saat menyentuh garis. Salah hanzi = MISS.': 'Nốt chữ Hán rơi xuống. Chạm làn có chữ ĐÚNG ngay khi chạm vạch. Sai chữ = MISS.',
  'Ketuk juga not biru biar kombo jalan. Not panjang: tahan sampai habis. Kombo tinggi = FEVER!': 'Chạm cả nốt xanh để giữ combo. Nốt dài: giữ đến hết. Combo cao = FEVER!',
  'Laptop: tombol D F J K · HP/tablet: ketuk jalurnya': 'Laptop: phím D F J K · Điện thoại/máy tính bảng: chạm làn', 'Siap!': 'Sẵn sàng!', 'Sumber': 'Nguồn', 'kata': 'từ',
  'Kata di sumber ini belum cukup.': 'Nguồn này chưa đủ từ.', 'LEPAS': 'THẢ RA', 'Skor ×1,5': 'Điểm ×1,5', 'Spasi/Enter: putar ulang · Esc: jeda': 'Space/Enter: phát lại · Esc: tạm dừng',
  'Esc: jeda': 'Esc: tạm dừng', 'Nyawa': 'Máu', 'minum': 'uống', 'Enter/Esc: lanjut': 'Enter/Esc: tiếp tục',
  '1 lawan 1 · lagu & not sama': '1 đấu 1 · cùng bài & nốt', 'Lawan': 'Đối thủ', '{n} KO!': '{n} bị KO!', '{n} KO': '{n} KO', 'KO — skor dibekukan. Lanjut latihan!': 'KO — điểm bị đóng băng. Tiếp tục luyện tập!',
  'Ketuk X sekali lagi untuk keluar dari ronde': 'Chạm X lần nữa để rời trận', 'Menunggu lawan…': 'Đang chờ đối thủ…', 'masih menyelesaikan lagu': 'vẫn đang chơi nốt bài', 'Skor kamu': 'Điểm của bạn',
  'MENANG!': 'THẮNG!', 'KALAH…': 'THUA…', 'SERI!': 'HÒA!', '{n} keluar — kamu menang!': '{n} đã rời — bạn thắng!', 'Lawan tidak merespons': 'Đối thủ không phản hồi', 'Dua-duanya KO': 'Cả hai đều KO',
  'Kamu KO — skor dibekukan': 'Bạn bị KO — điểm bị đóng băng', 'keluar': 'đã rời', 'skor dibekukan': 'điểm đóng băng', '{n} FEVER ATTACK!': '{n} FEVER ATTACK!'
});

/* ---------- data lagu & tingkat ---------- */
const DIFF = [
  { k: 'mudah', name: 'Mudah', bpm: 112, lanes: 3, travel: 2.55, win: [0.06, 0.11, 0.165], lv: 0, fever: 15, up: 3, dmg: [3, 8],
    secs: [['intro', 4], ['verse', 8], ['pre', 4], ['chorus', 8], ['verse', 4], ['pre', 4], ['chorus', 8, 1], ['outro', 2]] },
  { k: 'normal', name: 'Normal', bpm: 128, lanes: 4, travel: 2.05, win: [0.05, 0.095, 0.14], lv: 1, fever: 22, up: 4, dmg: [4, 11],
    secs: [['intro', 4], ['verse', 8], ['pre', 4], ['chorus', 8], ['post', 2], ['verse', 8], ['pre', 4], ['chorus', 8, 1], ['outro', 2]] },
  { k: 'sulit', name: 'Sulit', bpm: 146, lanes: 4, travel: 1.72, win: [0.045, 0.085, 0.125], lv: 3, fever: 28, up: 6, dmg: [6, 14],
    secs: [['intro', 4], ['verse', 8], ['pre', 4], ['chorus', 8], ['post', 2], ['verse', 8], ['pre', 4], ['chorus', 8, 1], ['chorus', 8, 1], ['outro', 2]] }
];
const MODES = [{ k: 'baca', name: 'Baca', sub: 'Arti → hanzi' }, { k: 'dengar', name: 'Dengar', sub: 'Suara → hanzi' }, { k: 'pinyin', name: 'Pinyin', sub: 'Pinyin → hanzi' }];
const CH = { I: { r: 0, n: [0, 4, 7] }, ii: { r: 2, n: [2, 5, 9] }, iii: { r: 4, n: [4, 7, 11] }, IV: { r: 5, n: [5, 9, 12] }, V: { r: 7, n: [7, 11, 14] }, vi: { r: 9, n: [9, 12, 16] } };
const PROG = { intro: ['IV', 'V', 'iii', 'vi'], verse: ['IV', 'V', 'iii', 'vi'], pre: ['ii', 'iii', 'IV', 'V'], chorus: ['IV', 'V', 'iii', 'vi', 'IV', 'V', 'I', 'I'], post: ['IV', 'V'], outro: ['I', 'I'] };
/* melodi reff (ketukan, semiton dari tonika, durasi ketukan) — 王道進行 IV-V-iii-vi */
const MEL = [
  [[0, 9, .5], [.5, 12, .5], [1, 17, 1], [2, 16, .5], [2.5, 17, .5], [3, 19, 1]],
  [[0, 19, 1.5], [1.5, 17, .5], [2, 16, .5], [2.5, 14, .5], [3, 11, 1]],
  [[0, 16, .5], [.5, 19, .5], [1, 23, 1], [2, 21, .5], [2.5, 19, .5], [3, 16, 1]],
  [[0, 21, 1.5], [1.5, 19, .5], [2, 16, 1], [3, 12, .5], [3.5, 14, .5]],
  [[0, 16, .5], [.5, 17, .5], [1, 21, 1], [2, 19, .5], [2.5, 17, .5], [3, 16, 1]],
  [[0, 14, .5], [.5, 16, .5], [1, 17, 1], [2, 19, 1], [3, 23, .5], [3.5, 21, .5]],
  [[0, 19, 2], [2, 16, 1], [3, 12, 1]],
  [[0, 12, 3.5]]
];
const FILL = [
  { verse: [2, 4, 6], pre: [2, 4, 5, 6], chorus: [2, 3, 4, 5, 6], post: [2, 4, 6] },
  { verse: [2, 3, 4, 5, 6], pre: [2, 3, 4, 4.5, 5, 6], chorus: [2, 2.5, 3, 4, 4.5, 5, 5.5, 6], post: [2, 3, 4, 5, 6] },
  { verse: [2, 2.5, 3, 4, 4.5, 5, 6, 6.5], pre: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6], chorus: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5], post: [2, 2.5, 3, 4, 4.5, 5, 6] }
];
const LPAT = { 4: [[0, 1, 2, 3], [3, 2, 1, 0], [0, 2, 1, 3], [1, 2, 1, 2], [3, 1, 2, 0], [2, 1, 3, 0], [0, 3, 1, 2]], 3: [[0, 1, 2], [2, 1, 0], [0, 2, 1], [1, 0, 1, 2], [2, 0, 1]] };
const KEYS = { 4: ['D', 'F', 'J', 'K'], 3: ['D', 'F', 'J'] };
const JV = { P: 1, G: .75, D: .4, M: 0 };
const JNAME = { P: 'PERFECT', G: 'GREAT', D: 'GOOD', M: 'MISS' };
const SV = {
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M9 6v12M15 6v12"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" fill-opacity=".25"/></svg>',
  mus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17.5V6l10-2.2v11.5"/><circle cx="6.6" cy="17.5" r="2.4"/><circle cx="16.6" cy="15.3" r="2.4"/></svg>',
  musOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17.5V6l10-2.2v11.5"/><circle cx="6.6" cy="17.5" r="2.4"/><circle cx="16.6" cy="15.3" r="2.4"/><path d="M3.5 3.5l17 17"/></svg>',
  spk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12a7 7 0 1 1-2.1-5"/><path d="M19.5 4.5v4.2h-4.2"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 6l-6 6 6 6"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7C19.5 15.9 12 20.5 12 20.5z"/></svg>',
  help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5v.4"/><circle cx="12" cy="16.9" r=".6" fill="currentColor"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.7 6.2 6.8.6-5.2 4.5 1.6 6.6L12 16.9l-5.9 3.5 1.6-6.6-5.2-4.5 6.8-.6z"/></svg>',
  vs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2.5 19c.6-3 2.3-4.6 4.5-4.6s3.9 1.6 4.5 4.6M12.5 19c.6-3 2.3-4.6 4.5-4.6s3.9 1.6 4.5 4.6"/></svg>',
  crown: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"><path d="M3.5 8.5l4.5 4 4-7 4 7 4.5-4-2 10h-13z"/></svg>',
  wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 9.5a12 12 0 0 1 16 0M7 13a7.5 7.5 0 0 1 10 0M10 16.5a3 3 0 0 1 4 0"/><path d="M3 3l18 18"/></svg>'
};

let B = null;
const nowP = () => performance.now() / 1000;
const m2f = m => 440 * Math.pow(2, (m - 69) / 12);
const rnd = (a, b) => a + Math.random() * (b - a);
function cfg() {
  const a = arS(); if (!a.beat || typeof a.beat !== 'object') a.beat = { m: 'baca', d: 1, mus: 1, tut: 0 };
  const c = a.beat; if (!(c.d >= 0 && c.d <= 2)) c.d = 1; if (!MODES.some(x => x.k === c.m)) c.m = 'baca'; return c;
}

/* ---------- lagu: susunan birama + peta tempo ---------- */
function mkSong(D) {
  const bars = []; let tm = 0, fin = false;
  D.secs.forEach(([sec, len, f]) => {
    if (f) fin = true;
    for (let i = 0; i < len; i++) {
      const bpm = D.bpm + (fin ? D.up : 0); const pr = PROG[sec];
      bars.push({ sec, i, bpm, key: fin ? 1 : 0, ch: CH[pr[i % pr.length]], t: tm, g: bars.length * 4, fin, last: i === len - 1 });
      tm += 240 / bpm;
    }
  });
  return { bars, len: tm, end: tm + 0.4 };
}
function posAt(tm) {
  const bars = B.song.bars;
  if (tm < 0) { const b = tm * bars[0].bpm / 60; return { bi: 0, b, g: b, bar: bars[0] }; }
  let k = B.posK || 0; if (k >= bars.length || bars[k].t > tm) k = 0;
  while (k + 1 < bars.length && bars[k + 1].t <= tm) k++;
  B.posK = k; const bar = bars[k]; const b = (tm - bar.t) * bar.bpm / 60; return { bi: k, b, g: bar.g + b, bar };
}
function gTime(g) { const bars = B.song.bars; const bi = clamp(Math.floor(g / 4), 0, bars.length - 1); const bar = bars[bi]; return bar.t + (g - bar.g) * 60 / bar.bpm; }

/* ---------- chart: baris soal (hanzi) + not ketukan dari grid birama ---------- */
function mkChart() {
  const D = B.D, n = D.lanes, bars = B.song.bars, F = FILL[B.d]; const notes = [], qs = [];
  const bt = (bi, b) => { const bar = bars[bi + Math.floor(b / 4)] || bars[bi]; return bar.t + (b % 4) * 60 / bar.bpm; };
  const pats = LPAT[n]; let pk = 0, blk = 0;
  const tap = (tm, lane, dur) => notes.push({ t: tm, lane, kind: dur ? 'hold' : 'tap', dur: dur || 0 });
  bars.forEach((bar, bi) => {
    if (bar.sec === 'intro') {
      if (bar.i >= 2) { const pat = pats[pk++ % pats.length]; (B.d === 0 ? [0, 2] : [0, 1, 2, 3]).forEach((b, k) => tap(bt(bi, b), pat[k % pat.length])); }
      return;
    }
    if (bar.sec === 'outro') { if (bar.i === 0) { tap(bt(bi, 0), 0); tap(bt(bi, 0), n - 1); } return; }
    if (bar.i % 2) return;
    const spb = 60 / bar.bpm;
    qs.push({ t: bt(bi, 0), bi, k: qs.length, spb, promptAt: bt(bi, 0) - D.travel - 0.8, sec: bar.sec });
    let beats = (F[bar.sec] || F.verse).slice();
    const pat = pats[pk++ % pats.length];
    const holdBlk = B.d > 0 && (bar.sec === 'chorus' || bar.sec === 'post') && blk % 2 === 1;
    if (holdBlk) beats = beats.filter(b => b < 4 || b > 5.25);
    beats.forEach((b, k) => tap(bt(bi, b), pat[k % pat.length]));
    if (holdBlk) tap(bt(bi, 4), pat[1 % pat.length], spb);
    if (B.d === 2 && bar.sec === 'chorus' && blk % 2 === 0) [4, 6].forEach(b => { const o = notes.find(x => Math.abs(x.t - bt(bi, b)) < 1e-6); if (o) tap(o.t, (o.lane + 2) % n); });
    blk++;
  });
  notes.sort((a, b) => a.t - b.t);
  B.notes = notes; B.qs = qs; B.nTot = notes.length + qs.length;
}

/* ---------- kata: dek + pengecoh ---------- */
function mkDeck() {
  const X = lgIdx(); const okW = i => W[i] && X.syl[i] && lgTxt(W[i]).length >= 1 && lgTxt(W[i]).length <= 4 && (B.mode !== 'baca' || lgWItem(i).tr);
  let ids = (B.pool.ids || []).filter(okW);
  if (ids.length < 8) { try { ids = ids.concat(lgWordsOf('a2').filter(i => okW(i) && !ids.includes(i))); } catch (e) {} }
  B.all = ids.slice(); return shuffle(ids);
}
function nextWord() {
  if (!B.deck.length) B.deck = shuffle(B.all.slice());
  if (B.retry.length && B.retry[0].at <= B.qi) return B.retry.shift().i;
  return B.deck.shift();
}
function distract(i, n) {
  const me = lgTxt(W[i]); const out = []; const seen = new Set([me]);
  let ds = []; try { ds = lgDistract(i, n + 2, B.D.lv) || []; } catch (e) {}
  for (const k of ds) { const tx = lgTxt(W[k]); if (out.length >= n) break; if (!W[k] || seen.has(tx) || tx.length > 4) continue; seen.add(tx); out.push(k); }
  const L = me.length; const rest = shuffle(B.all);
  for (const pass of [0, 1]) for (const k of rest) { if (out.length >= n) break; const tx = lgTxt(W[k]); if (seen.has(tx) || (pass === 0 && tx.length !== L)) continue; seen.add(tx); out.push(k); }
  return out.slice(0, n);
}
function insNote(x) { const a = B.notes; let lo = 0, hi = a.length; while (lo < hi) { const m = (lo + hi) >> 1; if (a[m].t <= x.t) lo = m + 1; else hi = m; } a.splice(lo, 0, x); }
function ask(q) {
  if (q.pre) return askPre(q);
  const n = B.D.lanes; const i = nextWord(); const it = lgWItem(i); const ds = shuffle(distract(i, n - 1));
  let cl = Math.floor(Math.random() * n); if (B.lastCl.length >= 2 && B.lastCl.every(x => x === cl)) cl = (cl + 1 + Math.floor(Math.random() * (n - 1))) % n;
  B.lastCl = B.lastCl.concat(cl).slice(-2);
  const opts = []; let d = 0; for (let l = 0; l < n; l++) opts.push(l === cl ? i : (ds[d++] != null ? ds[d - 1] : null));
  q.it = it; q.opts = opts; q.cl = cl; q.hold = it.sy.length >= 2 ? q.spb : 0; q.state = 'live';
  q.notes = opts.map((id, l) => id == null ? null : ({ t: q.t, lane: l, kind: 'word', q, id, zh: lgTxt(W[id]), dur: q.hold })).filter(Boolean);
  q.notes.forEach(insNote); B.cur = q; B.wordsN++;
  showPrompt(q);
  if (B.mode === 'dengar') speak(it.zh, 1.5);
}

/* ---------- audio: bus, instrumen, SFX ---------- */
function audioInit() {
  let ctx = null; try { ctx = FX.ensure(); } catch (e) {} if (!ctx) return null;
  const A = { ctx };
  try {
    A.master = ctx.createGain(); A.master.gain.value = 0.85;
    A.comp = ctx.createDynamicsCompressor(); A.comp.threshold.value = -12; A.comp.ratio.value = 4; A.comp.attack.value = 0.004; A.comp.release.value = 0.18;
    A.master.connect(A.comp); A.comp.connect(ctx.destination);
    A.sfx = ctx.createGain(); A.sfx.gain.value = 0.75; A.sfx.connect(A.master);
    const sr = ctx.sampleRate; const nb = ctx.createBuffer(1, sr, sr); const d = nb.getChannelData(0); for (let i = 0; i < sr; i++) d[i] = Math.random() * 2 - 1; A.noise = nb;
    const rl = Math.floor(sr * 1.7); const ir = ctx.createBuffer(2, rl, sr);
    for (let c = 0; c < 2; c++) { const x = ir.getChannelData(c); for (let i = 0; i < rl; i++) x[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / rl, 3.4); }
    A.ir = ir;
  } catch (e) { return null; }
  return A;
}
function mkBus() {
  const A = B.A; if (!A) return null; const ctx = A.ctx;
  try {
    const bus = ctx.createGain(); bus.gain.value = B.musOn && B.snd ? 0.85 : 0;
    const duck = ctx.createGain(); duck.gain.value = 1; bus.connect(duck); duck.connect(A.master);
    const pump = ctx.createGain(); pump.gain.value = 1; pump.connect(bus);
    const rev = ctx.createConvolver(); rev.buffer = A.ir; const rg = ctx.createGain(); rg.gain.value = 0.3; rev.connect(rg); rg.connect(bus);
    return { bus, duck, pump, rev, rg };
  } catch (e) { return null; }
}
function killBus(fade) {
  const P = B && B.bus; if (!P) return; B.bus = null;
  try { const c = B.A.ctx; P.bus.gain.cancelScheduledValues(c.currentTime); P.bus.gain.setTargetAtTime(0, c.currentTime, fade ? 0.25 : 0.015); } catch (e) {}
  setTimeout(() => { try { P.duck.disconnect(); P.bus.disconnect(); P.rg.disconnect(); P.rev.disconnect(); P.pump.disconnect(); } catch (e) {} }, fade ? 1500 : 120);
}
function env(g, at, v, a, d, sus) {
  g.gain.setValueAtTime(0.0001, at); g.gain.linearRampToValueAtTime(v, at + a);
  if (sus && d > 0.25) { const rel = Math.min(0.18, d * 0.3); g.gain.exponentialRampToValueAtTime(v * sus, at + a + 0.12); g.gain.setValueAtTime(v * sus, at + d - rel); g.gain.exponentialRampToValueAtTime(0.0001, at + d); }
  else g.gain.exponentialRampToValueAtTime(0.0001, at + a + d);
}
function osc(type, f, at, dur, v, dest, o = {}) {
  const c = B.A.ctx; const os = c.createOscillator(); const g = c.createGain(); os.type = type; os.frequency.setValueAtTime(f, at);
  if (o.f2) os.frequency.exponentialRampToValueAtTime(o.f2, at + (o.ft || dur));
  if (o.det) os.detune.value = o.det;
  env(g, at, v, o.a || 0.004, dur, o.sus); os.connect(g);
  let out = g; if (o.lp) { const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.setValueAtTime(o.lp, at); if (o.lp2) fl.frequency.exponentialRampToValueAtTime(o.lp2, at + dur); fl.Q.value = o.q || 0.7; g.connect(fl); out = fl; }
  out.connect(dest); if (o.send) out.connect(o.send);
  os.start(at); os.stop(at + (o.a || 0.004) + dur + 0.05);
  return os;
}
function noise(at, dur, v, type, f, dest, o = {}) {
  const c = B.A.ctx; const s = c.createBufferSource(); s.buffer = B.A.noise; const fl = c.createBiquadFilter(); fl.type = type; fl.frequency.setValueAtTime(f, at);
  if (o.f2) fl.frequency.exponentialRampToValueAtTime(o.f2, at + dur); fl.Q.value = o.q || 0.8; const g = c.createGain();
  if (o.rise) { g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(v, at + dur); g.gain.linearRampToValueAtTime(0, at + dur + 0.02); }
  else env(g, at, v, o.a || 0.002, dur);
  s.connect(fl); fl.connect(g); g.connect(dest); s.start(at, Math.random() * 0.5); s.stop(at + dur + 0.08);
}
const I = {
  kick(at, v, P) { osc('sine', 155, at, 0.3, v, P.bus, { f2: 44, ft: 0.12 }); noise(at, 0.02, v * 0.25, 'highpass', 3000, P.bus); P.pump.gain.setValueAtTime(0.4, at); P.pump.gain.linearRampToValueAtTime(1, at + 0.2); },
  snare(at, v, P) { noise(at, 0.17, v, 'bandpass', 1900, P.bus, { q: 0.9 }); osc('triangle', 215, at, 0.09, v * 0.55, P.bus, { f2: 150 }); noise(at, 0.12, v * 0.2, 'bandpass', 1900, P.rev); },
  clap(at, v, P) { for (let k = 0; k < 3; k++) noise(at + k * 0.011, 0.03, v * 0.7, 'bandpass', 1300, P.bus, { q: 1.4 }); noise(at + 0.033, 0.16, v, 'bandpass', 1250, P.bus, { q: 1.2 }); noise(at, 0.2, v * 0.3, 'bandpass', 1300, P.rev); },
  hat(at, v, P, open) { noise(at, open ? 0.24 : 0.04, v, 'highpass', 7800, P.bus); },
  crash(at, v, P) { noise(at, 1.6, v, 'highpass', 4200, P.bus); noise(at, 1.2, v * 0.4, 'highpass', 4200, P.rev); },
  bass(at, m, dur, v, P) { osc('sawtooth', m2f(m), at, dur, v, P.bus, { lp: 900, lp2: 300, q: 4, sus: 0.55 }); osc('sine', m2f(m - 12), at, dur, v * 0.8, P.bus, { sus: 0.7 }); },
  pad(at, ms, dur, v, br, P) { ms.forEach(m => { [-9, 9].forEach(dt => osc('sawtooth', m2f(m), at, dur, v, P.pump, { det: dt, a: 0.08, lp: br, lp2: br * 0.6, send: P.rev, sus: 0.7 })); }); },
  pluck(at, m, dur, v, P) { osc('square', m2f(m), at, dur, v, P.pump, { lp: 3400, lp2: 700, send: P.rev }); },
  bell(at, m, dur, v, P) { osc('sine', m2f(m), at, dur, v, P.bus, { send: P.rev }); osc('sine', m2f(m) * 3.01, at, dur * 0.4, v * 0.25, P.bus); },
  lead(at, m, dur, v, P) {
    const c = B.A.ctx; const f = m2f(m);
    [['sawtooth', 0], ['square', 7]].forEach(([ty, dt], k) => {
      const os = c.createOscillator(); os.type = ty; os.frequency.setValueAtTime(f, at); os.detune.value = dt;
      const lfo = c.createOscillator(); lfo.frequency.value = 5.6; const lg = c.createGain(); lg.gain.setValueAtTime(0, at); lg.gain.linearRampToValueAtTime(f * 0.012, at + Math.min(0.35, dur)); lfo.connect(lg); lg.connect(os.frequency);
      const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = 2600; const g = c.createGain();
      const vv = v * (k ? 0.5 : 1); g.gain.setValueAtTime(0.0001, at); g.gain.linearRampToValueAtTime(vv, at + 0.018); g.gain.setValueAtTime(vv * 0.8, at + Math.max(0.03, dur - 0.06)); g.gain.exponentialRampToValueAtTime(0.0001, at + dur + 0.1);
      os.connect(fl); fl.connect(g); g.connect(P.bus); g.connect(P.rev); os.start(at); os.stop(at + dur + 0.15); lfo.start(at); lfo.stop(at + dur + 0.15);
    });
  },
  riser(at, dur, v, P) { noise(at, dur, v, 'bandpass', 300, P.bus, { f2: 6000, q: 2.5, rise: 1 }); }
};
/* satu langkah 1/16 lagu */
function step(st, at) {
  const bi = st >> 4, s = st & 15; const bar = B.song.bars[bi]; if (!bar) return;
  if (bi === 0 && s % 4 === 0) sfx('count', s === 12 ? 1 : 0, at);
  const P = B.bus; if (!P || !B.musOn || !B.snd) return;
  const sec = bar.sec, i = bar.i, ch = bar.ch, spb = 60 / bar.bpm, s16 = spb / 4; const T = 62 + bar.key + (B.vk || 0);
  const intro = sec === 'intro', verse = sec === 'verse', pre = sec === 'pre', cho = sec === 'chorus', post = sec === 'post', outro = sec === 'outro';
  const fev = B.fever;
  try {
    /* drum */
    if (intro) { if (i >= 1 && s % 2 === 0) I.hat(at, s % 4 === 2 ? 0.07 : 0.04, P); if (i >= 2 && s % 4 === 0) I.kick(at, 0.75, P); if (i === 3 && s >= 8 && s % 2 === 0) I.snare(at, 0.08 + (s - 8) * 0.03, P); if (i === 3 && s === 0) I.riser(at, spb * 4, 0.12, P); }
    if (verse) {
      if (s === 0 || s === 8 || (s === 10 && i % 2) || (s === 14 && i % 4 === 3)) I.kick(at, 0.85, P);
      if (s === 4 || s === 12) I.snare(at, 0.3, P);
      if (s % 2 === 0) I.hat(at, s % 4 === 2 ? 0.075 : 0.045, P);
      if (i === 0 && s === 0) I.crash(at, 0.12, P);
    }
    if (pre) {
      if (s === 0 || s === 8) I.kick(at, 0.85, P);
      if (i < 3) { if (s === 4 || s === 12) I.snare(at, 0.3, P); } else if (s % (s < 8 ? 2 : 1) === 0) I.snare(at, 0.1 + s * 0.017, P);
      I.hat(at, s % 2 ? 0.025 : 0.05, P);
      if (i === 2 && s === 0) I.riser(at, spb * 8, 0.16, P);
    }
    if (cho || post) {
      if (s % 4 === 0) I.kick(at, 0.95, P);
      if (s === 4 || s === 12) { I.snare(at, 0.3, P); I.clap(at, 0.26, P); }
      if (s % 4 === 2) I.hat(at, 0.09, P, true); else I.hat(at, fev ? 0.05 : 0.03, P);
      if (s === 0 && (i === 0 || (cho && i === 4))) I.crash(at, i === 0 ? 0.2 : 0.12, P);
    }
    if (outro && i === 0 && s === 0) { I.crash(at, 0.24, P); I.kick(at, 1, P); }
    /* bass */
    const root = T - 24 + ch.r;
    if (outro) { if (i === 0 && s === 0) I.bass(at, root, spb * 4, 0.32, P); }
    else if (cho || post) { if (s % 2 === 0) I.bass(at, root + (s % 4 === 2 ? 12 : 0), s16 * 1.7, 0.3, P); }
    else if (verse) { if (s % 2 === 0 && s !== 6 && s !== 14) I.bass(at, root, s16 * 1.8, 0.28, P); }
    else if (pre) { if (s % 2 === 0) I.bass(at, root + (s >= 12 ? 12 : 0), s16 * 1.7, 0.28, P); }
    else if (intro && i >= 2 && s % 4 === 0) I.bass(at, root, s16 * 3, 0.24, P);
    /* pad */
    if (s === 0) { const br = intro ? 700 + i * 500 : cho ? 3200 : pre ? 1400 + i * 400 : outro ? 2400 : 1900; I.pad(at, ch.n.map(x => T - 12 + x), outro ? spb * 7 : spb * 4, intro ? 0.032 : cho ? 0.04 : 0.034, br, P); }
    /* arpeggio */
    const tn = [ch.n[0], ch.n[1], ch.n[2], ch.n[0] + 12, ch.n[1] + 12, ch.n[2] + 12];
    if ((verse || intro && i >= 1) && s % 2 === 0) { const pt = [0, 1, 2, 3, 2, 1, 2, 4]; I.pluck(at, T + tn[pt[s / 2]], s16 * 1.6, 0.045, P); }
    if (cho || pre || post) { const pt = pre ? [0, 1, 2, 3, 1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 5] : [0, 2, 1, 3, 2, 4, 3, 2, 0, 2, 1, 3, 2, 4, 3, 4]; I.pluck(at, T + tn[pt[s]], s16 * 0.9, cho ? 0.032 : 0.036, P); }
    /* melodi */
    if (cho) { for (const [b, nn, d] of MEL[(i + (B.vm ? 4 : 0)) % 8]) if (b * 4 === s) { I.lead(at, T + nn, d * spb * 0.95, 0.075, P); if (fev) I.lead(at, T + nn + 12, d * spb * 0.9, 0.025, P); } }
    if (verse && (s === 0 || s === 6 || s === 10)) I.bell(at, T + 12 + tn[[2, 1, 0][s === 0 ? 0 : s === 6 ? 1 : 2]] + (i % 2 ? 12 : 0) - 12, spb * 1.2, 0.05, P);
    if (post && s % 4 === 0) I.bell(at, T + 12 + tn[(s / 4) % 3], spb, 0.05, P);
  } catch (e) { if (!B.aerr) B.aerr = String(e); }
}
function sched() {
  const A = B.A; if (!A) return; const ctx = A.ctx; if (ctx.state !== 'running') return;
  const smp = ctx.currentTime - nowP(); B.off = B.off == null ? smp : B.off + (smp - B.off) * 0.06;
  const ahead = B.now + 0.2 * B.rate;
  for (let guard = 0; guard < 64; guard++) {
    const bi = B.st >> 4; const bar = B.song.bars[bi]; if (!bar) break;
    const tm = bar.t + (B.st & 15) * 15 / bar.bpm; if (tm > ahead) break;
    const st = B.st++; if (tm < B.now - 0.03 || B.rate !== 1) continue;
    step(st, Math.max(ctx.currentTime + 0.005, B.t0 + tm / B.rate + B.off - B.lat));
  }
}
function duck(sec) {
  const P = B && B.bus; if (!P) return; try { const c = B.A.ctx; const g = P.duck.gain; g.cancelScheduledValues(c.currentTime); g.setTargetAtTime(0.3, c.currentTime, 0.04); g.setTargetAtTime(1, c.currentTime + sec, 0.25); } catch (e) {}
}
function speak(txt, sec) { try { duck(sec || 1.2); lgSay(txt); B.lastSay = B.rt; } catch (e) {} }
function sfx(name, n, at) {
  const A = B && B.A; if (!A || !B.snd || A.ctx.state !== 'running') return; const c = A.ctx; const o = A.sfx; at = at || c.currentTime + 0.005;
  const P5 = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5, 1568, 1760, 2093];
  try {
    switch (name) {
      case 'tap': osc('triangle', 1760, at, 0.05, 0.05, o); noise(at, 0.03, 0.06, 'highpass', 6000, o); break;
      case 'word': { const b = Math.min(6, Math.floor((n || 0) / 6)); [0, 2, 4].forEach((k, j) => { osc('triangle', P5[b + k], at + j * 0.045, 0.22, 0.1, o); osc('sine', P5[b + k] * 2, at + j * 0.045, 0.14, 0.035, o); }); noise(at + 0.09, 0.2, 0.04, 'highpass', 9000, o); break; }
      case 'bad': osc('sine', 150, at, 0.26, 0.32, o, { f2: 70 }); osc('triangle', 233, at, 0.14, 0.06, o, { f2: 180 }); break;
      case 'hold': osc('sine', 1568, at, 0.12, 0.05, o); osc('sine', 2093, at + 0.05, 0.16, 0.04, o); break;
      case 'count': osc(n ? 'triangle' : 'sine', n ? 1318.5 : 880, at, n ? 0.4 : 0.14, 0.13, o); if (n) osc('sine', 659.25, at, 0.4, 0.08, o); break;
      case 'fever': noise(at, 0.55, 0.16, 'bandpass', 500, o, { f2: 5000, q: 2, rise: 1 }); [0, 2, 4, 5, 7].forEach((k, j) => osc('sawtooth', P5[k], at + 0.32 + j * 0.05, 0.2, 0.035, o, { lp: 4000 })); break;
      case 'win': [0, 2, 4, 5, 7].forEach((k, j) => osc('square', P5[k] / 2, at + j * 0.1, 0.22, 0.05, o, { lp: 3200 })); [0, 2, 4, 7].forEach(k => { osc('triangle', P5[k], at + 0.55, 1.3, 0.07, o); osc('sawtooth', P5[k] / 2, at + 0.55, 1.2, 0.025, o, { lp: 2000 }); }); noise(at + 0.55, 1.4, 0.09, 'highpass', 5000, o); break;
      case 'lose': [659.25, 587.33, 523.25, 392].forEach((f, j) => osc('triangle', f, at + j * 0.2, 0.32, 0.08, o)); osc('sine', 196, at + 0.8, 0.9, 0.08, o); break;
      case 'ui': osc('sine', 1318.5, at, 0.06, 0.05, o); break;
      case 'atk': [7, 9, 8, 10, 9].forEach((k, j) => osc('sine', P5[k], at + j * 0.05, 0.16, 0.05, o)); noise(at, 0.5, 0.06, 'highpass', 7000, o); break;
    }
  } catch (e) { if (!B.aerr) B.aerr = name + ':' + e; }
}

/* ---------- membuka / menutup ---------- */
function open(pool, net) {
  if (B) close(true);
  const root = document.createElement('div'); root.id = 'arbeat'; root.className = 'rb-root rb-setup';
  root.innerHTML = `<canvas class="rb-cv"></canvas>
    <div class="rb-top">
      <button class="rb-gb rb-xb" data-rb="close" aria-label="${t('Tutup')}">${SV.x}</button>
      ${net ? vsHudHTML(net) : `<div class="rb-hud"><div class="rb-sc"><small>SCORE</small><b id="rbsc">0</b></div><div class="rb-life" aria-label="${t('Nyawa')}"><span class="rb-hi">${SV.heart}</span><span class="rb-lt"><i id="rblife"></i></span></div></div>`}
      <button class="rb-gb rb-mus" data-rb="music" aria-label="${t('Musik')}">${SV.mus}</button>
      <button class="rb-gb rb-pz" data-rb="pause" aria-label="${t('Jeda')}">${SV.pause}</button>
    </div>
    <div class="rb-prog"><i id="rbprog"></i></div>
    <div class="rb-prompt" id="rbpr"></div>
    ${net ? oppChipHTML(net) : ''}<div class="rb-note" id="rbnote"></div>
    <div class="rb-panel" id="rbpanel"></div>`;
  if (net) root.classList.add('rb-online');
  document.body.appendChild(root); document.body.classList.add('in-session');
  const cv = root.querySelector('canvas');
  B = { root, cv, cx: cv.getContext('2d'), pool, phase: 'setup', parts: [], rings: [], floats: [], flash: [0, 0, 0, 0], held: [0, 0, 0, 0], ptr: new Map(), timers: [], rate: +(window.BEAT_RATE || 1) || 1,
    rt: nowP(), lastP: 0, shake: 0, net: net || null, snd: !!S.settings.sound, musOn: cfg().mus !== 0, combo: 0, fever: false, crowd: [], lastCl: [], retry: [], hz: '', ui: '' };
  B.D = DIFF[net ? net.go.d : cfg().d];
  try { const cs = getComputedStyle(document.documentElement); B.hz = (cs.getPropertyValue('--hz') || '').trim() || "'Noto Sans TC',sans-serif"; B.ui = (cs.getPropertyValue('--ui') || '').trim() || 'system-ui,sans-serif'; } catch (e) { B.hz = 'sans-serif'; B.ui = 'sans-serif'; }
  B.touch = !!(window.matchMedia && matchMedia('(pointer: coarse)').matches);
  B.led = document.createElement('canvas'); B.led.width = 48; B.led.height = 22; B.lx = B.led.getContext('2d'); B.limg = B.lx.createImageData(48, 22);
  B.on = [
    [window, 'keydown', onKey], [window, 'keyup', onKeyUp], [window, 'resize', resize], [document, 'visibilitychange', onVis], [window, 'blur', onVis],
    [root, 'pointerdown', onDown], [root, 'pointerup', onUp], [root, 'pointercancel', onUp], [root, 'click', onClick], [root, 'contextmenu', e => e.preventDefault()]
  ];
  B.on.forEach(([el, ev, f]) => el.addEventListener(ev, f, ev === 'pointerdown' ? { passive: false } : undefined));
  setMusIcon(); resize();
  if (net) netIntro(); else if (!cfg().tut) panelTut(); else panelSetup();
  B.raf = requestAnimationFrame(frame);
}
function close(silent) {
  if (!B) return; const b = B;
  cancelAnimationFrame(b.raf); b.timers.forEach(x => clearTimeout(x));
  b.on.forEach(([el, ev, f]) => el.removeEventListener(ev, f));
  killBus(false);
  try { hushAll(); } catch (e) {}
  const A = b.A; if (A) setTimeout(() => { try { A.sfx.disconnect(); A.master.disconnect(); A.comp.disconnect(); } catch (e) {} }, 200);
  b.root.remove(); document.body.classList.remove('in-session'); B = null;
  if (b.net) b.net.dead = true;
  if (!silent) { if (typeof ROUTE !== 'undefined' && ROUTE !== 'arena') go('arena'); else if (typeof render === 'function') render(); }
}
function later(f, ms) { const b = B; const id = setTimeout(() => { if (B === b) f(); }, ms); B.timers.push(id); if (B.timers.length > 40) B.timers = B.timers.slice(-20); }

/* ---------- mulai / jeda / selesai ---------- */
function begin() {
  const c = cfg(); const N = B.net;
  if (N) { B.mode = N.go.m; B.d = N.go.d; B.vk = N.go.vk; B.vm = N.go.vm; } else { B.mode = c.m; B.d = c.d; B.vk = 0; B.vm = 0; }
  B.D = DIFF[B.d];
  B.song = mkSong(B.D); B.posK = 0;
  B.retry = []; B.lastCl = [];
  if (N) { loadChart(N.go); B.all = []; B.deck = []; }
  else { mkChart(); B.deck = mkDeck(); if (B.all.length < B.D.lanes + 1) { panelSetup(t('Kata di sumber ini belum cukup.')); return; } }
  Object.assign(B, { qi: 0, score: 0, dScore: 0, combo: 0, maxCombo: 0, life: 100, fever: false, cnt: { P: 0, G: 0, D: 0, M: 0 }, wsum: 0, wtot: 0, wordsOk: 0, wordsN: 0,
    missed: [], parts: [], rings: [], floats: [], jt: null, cut: 0, ko: false, koSnap: null, atkT: -9, koT: 0, jseq: '', cur: null, st: 0, off: null, shake: 0, comboT: 0, lastSay: -9, resumeAt: 0, lastHud: '', mood: null, flash: [0, 0, 0, 0], held: [0, 0, 0, 0] });
  B.ptr.clear();
  B.snd = !!S.settings.sound;
  if (!B.A) B.A = audioInit();
  killBus(false); B.bus = B.A ? mkBus() : null;
  const ctx = B.A && B.A.ctx; B.lat = ctx ? clamp((ctx.outputLatency || 0) + (ctx.baseLatency || 0), 0, 0.12) : 0;
  B.t0 = nowP() + 0.9 / B.rate; B.now = -0.9;
  B.phase = 'play'; B.root.className = 'rb-root rb-play' + (N ? ' rb-online' : ''); panelHide(); B.pr.className = 'rb-prompt'; B.pr.innerHTML = '';
  resize();
}
function pause(on) {
  if (!B) return;
  if (on && (B.phase === 'play' || B.phase === 'resume')) {
    B.pauseAt = B.phase === 'resume' ? B.pauseAt : B.now; B.phase = 'pause'; killBus(false); try { hushAll(); } catch (e) {}
    B.ptr.clear(); B.held = [0, 0, 0, 0]; B.notes.forEach(n => { if (n.hd) { n.hd = null; n.res = 'broke'; n.brokeT = B.now; } });
    panelPause(); B.root.classList.add('rb-paused');
  } else if (!on && B.phase === 'pause') {
    panelHide(); B.root.classList.remove('rb-paused'); B.phase = 'resume'; B.resumeAt = B.rt + 1.5;
  }
}
function doResume() {
  B.phase = 'play'; B.t0 = nowP() - B.pauseAt / B.rate; B.now = B.pauseAt; B.off = null;
  B.st = 0; const bars = B.song.bars; while (true) { const bar = bars[B.st >> 4]; if (!bar) break; if (bar.t + (B.st & 15) * 15 / bar.bpm >= B.now) break; B.st++; }
  if (B.A) { B.bus = mkBus(); }
}
function finish(clear) {
  if (!B || B.phase === 'end') return;
  if (B.net) return netFinish();
  B.phase = 'end'; B.endClear = clear; killBus(true); B.root.className = 'rb-root rb-end'; B.pr.className = 'rb-prompt'; B.fever = false;
  const acc = B.wtot ? B.wsum / B.wtot : 0; const wacc = B.wordsN ? B.wordsOk / B.wordsN : 0;
  let rank = 'C'; if (clear) rank = acc >= 0.93 && wacc >= 0.9 ? 'S' : acc >= 0.82 ? 'A' : acc >= 0.65 ? 'B' : 'C';
  let pb = false; try { pb = arenaRecord('beat', Math.round(B.score), acc); } catch (e) {}
  const xp = clamp(Math.round(B.wordsOk * 2 + B.maxCombo / 6 + (clear ? 8 : 0)), 1, 80);
  B.endInfo = { clear, rank, acc, wacc, pb, xp };
  B.mood = clear ? 'cheer' : 'sad';
  later(() => sfx(clear ? 'win' : 'lose'), 250);
  later(() => { panelEnd(); try { addXP(xp); } catch (e) {} }, clear ? 900 : 700);
}

/* ---------- input ---------- */
function laneAt(x) { const L = B.L; const l = Math.floor((x - (L.cx - L.trackW / 2)) / L.laneW); return clamp(l, 0, L.n - 1); }
function onDown(e) {
  if (!B) return; if (e.target.closest('button,.rb-card,.rb-top,.rb-prompt,select,a')) return;
  if (B.phase !== 'play') return; e.preventDefault();
  const r = B.root.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top; if (y < B.L.yTop * 0.55) return;
  const l = laneAt(x); B.ptr.set(e.pointerId, l); press(l, 'p' + e.pointerId);
  try { B.root.setPointerCapture && B.root.setPointerCapture(e.pointerId); } catch (er) {}
}
function onUp(e) { if (!B) return; const l = B.ptr.get(e.pointerId); if (l == null) return; B.ptr.delete(e.pointerId); release(l, 'p' + e.pointerId); }
function keyLane(e) {
  const n = B.D.lanes; const c = e.code;
  const m4 = { KeyD: 0, KeyF: 1, KeyJ: 2, KeyK: 3, Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, ArrowLeft: 0, ArrowDown: 1, ArrowUp: 2, ArrowRight: 3, Numpad1: 0, Numpad2: 1, Numpad3: 2, Numpad4: 3 };
  const m3 = { KeyD: 0, KeyF: 1, KeyJ: 2, KeyK: 2, Digit1: 0, Digit2: 1, Digit3: 2, ArrowLeft: 0, ArrowDown: 1, ArrowUp: 1, ArrowRight: 2, Numpad1: 0, Numpad2: 1, Numpad3: 2 };
  const v = (n === 3 ? m3 : m4)[c]; return v == null ? -1 : v;
}
function onKey(e) {
  if (!B) return; const k = e.key;
  if (k === 'Escape' && B.net) { e.preventDefault(); if (B.phase === 'end') netQuit(); else armQuit(); return; }
  if (k === 'Escape') { e.preventDefault(); if (B.phase === 'play' || B.phase === 'resume') pause(true); else if (B.phase === 'pause') pause(false); else close(); return; }
  if (B.phase === 'play') {
    const l = keyLane(e);
    if (l >= 0) { e.preventDefault(); if (!e.repeat) press(l, 'k' + e.code); return; }
    if (k === ' ' || k === 'Enter') { e.preventDefault(); if (!e.repeat && B.cur && B.cur.it) speak(B.cur.it.zh, 1.3); return; }
    if ((k === 'p' || k === 'P') && !B.net) { pause(true); return; }
    if (k === 'm' || k === 'M') { toggleMus(); return; }
    return;
  }
  if ((k === 'Enter' || k === ' ') && !e.repeat) {
    const pri = B.root.querySelector('.rb-panel.on [data-rb].pri'); if (pri) { e.preventDefault(); pri.click(); }
  }
}
function onKeyUp(e) { if (!B || B.phase !== 'play') return; const l = keyLane(e); if (l >= 0) release(l, 'k' + e.code); }
function onVis() { if (B && !B.net && (document.hidden || document.visibilityState === 'hidden') && (B.phase === 'play' || B.phase === 'resume')) pause(true); }
function onClick(e) {
  const b = e.target.closest('[data-rb]'); if (!b || !B) return; const a = b.dataset.rb; const v = b.dataset.v;
  try { FX.ensure(); if (TTS.unlock) TTS.unlock(); } catch (er) {}
  if (a !== 'close') sfx('ui');
  switch (a) {
    case 'close': if (B.net) { if (B.phase === 'end') netQuit(); else armQuit(); } else close(); break;
    case 'quit': if (B.net) netQuit(); else close(); break;
    case 'online': goOnline(); break;
    case 'vsagain': netAgain(); break;
    case 'music': toggleMus(); break;
    case 'pause': if (B.phase === 'pause') pause(false); else pause(true); break;
    case 'resume': pause(false); break;
    case 'restart': begin(); break;
    case 'go': begin(); break;
    case 'mode': cfg().m = v; save(); panelSetup(); break;
    case 'diff': cfg().d = +v; B.D = DIFF[+v]; save(); resize(); panelSetup(); break;
    case 'tut': panelTut(); break;
    case 'tutok': cfg().tut = 1; save(); panelSetup(); break;
    case 'setup': B.mood = null; B.phase = 'setup'; B.root.className = 'rb-root rb-setup'; panelSetup(); break;
    case 'say': if (B.cur && B.cur.it) speak(B.cur.it.zh, 1.3); break;
    case 'sayw': { const w = W[+v]; if (w) lgSay(lgTxt(w)); break; }
  }
}
function toggleMus() {
  B.musOn = !B.musOn; cfg().mus = B.musOn ? 1 : 0; save(); setMusIcon();
  if (B.bus) try { B.bus.bus.gain.setTargetAtTime(B.musOn && B.snd ? 0.85 : 0, B.A.ctx.currentTime, 0.05); } catch (e) {}
}
function setMusIcon() { const b = B.root.querySelector('.rb-mus'); if (b) { b.innerHTML = B.musOn ? SV.mus : SV.musOff; b.classList.toggle('off', !B.musOn); } }

/* ---------- penilaian ---------- */
function press(l, id, tm) {
  if (!B || B.phase !== 'play') return; const now = tm != null ? tm : (nowP() - B.t0) * B.rate; B.flash[l] = B.rt; B.held[l] = id;
  const w = B.D.win; let best = null, bd = 9;
  for (const n of B.notes) { if (n.done || n.lane !== l) continue; const d = Math.abs(now - n.t); if (d <= w[2] && d < bd) { bd = d; best = n; } if (n.t > now + w[2]) break; }
  if (!best) return;
  const j = bd <= w[0] ? 'P' : bd <= w[1] ? 'G' : 'D';
  const P = notePos(best.lane, 0);
  if (best.kind === 'word') {
    const q = best.q; if (q.state !== 'live') return;
    if (best.id === q.opts[q.cl]) {
      resolveQ(q, best, true); judge(j, P.x, P.y, 2, best);
      if (best.dur) { best.hd = id; best.res = 'hold'; } else best.res = 'hit';
    } else {
      resolveQ(q, best, false); judge('M', P.x, P.y, 2, best); best.res = 'bad';
    }
    return;
  }
  best.done = true; best.doneT = now; judge(j, P.x, P.y, 1, best);
  if (best.dur) { best.hd = id; best.res = 'hold'; } else best.res = 'hit';
}
function release(l, id) {
  if (!B) return; if (B.held[l] === id) B.held[l] = 0; if (B.phase !== 'play') return;
  for (const n of B.notes) if (n.hd === id && n.lane === l) {
    n.hd = null; const end = n.t + n.dur;
    if (B.now < end - 0.14) { n.res = 'broke'; n.brokeT = B.now; floatTxt(t('LEPAS'), notePos(l, 0).x, B.L.yHit - 30, '#c9c3e6'); if (B.d === 2) { B.combo = 0; setFever(false); } }
    else holdDone(n);
  }
}
function holdDone(n) { n.hd = null; n.res = 'hit'; n.doneT = B.now; B.combo++; B.maxCombo = Math.max(B.maxCombo, B.combo); if (!B.ko) B.score += 100 * mult(); B.comboT = B.rt; sfx('hold'); const P = notePos(n.lane, 0); burst(P.x, P.y, '#d9ff6a', 10); checkFever(); }
function mult() { return (1 + Math.min(B.combo, 100) / 100) * (B.fever ? 1.5 : 1); }
function judge(j, x, y, wgt, n) {
  const word = n && n.kind === 'word';
  B.cnt[j]++; B.wsum += JV[j] * wgt; B.wtot += wgt; B.jt = { j, at: B.rt, x };
  if (B.net && !B.ko) B.jseq = (B.jseq + (word ? j.toLowerCase() : j)).slice(-6);
  if (j === 'M') {
    B.combo = 0; setFever(false); B.life = Math.max(0, B.life - B.D.dmg[word ? 1 : 0]);
    if (B.bot) (B.mlog || (B.mlog = [])).push([+B.now.toFixed(3), n && n.kind, n && n.lane, n && +n.t.toFixed(3), n && n.res]);
    if (word) { B.shake = 9; B.mood = { e: 'oops', until: B.rt + 0.8 }; sfx('bad'); }
    if (B.life <= 0) { if (B.net) netKO(); else later(() => finish(false), 350); }
  } else {
    B.combo++; B.maxCombo = Math.max(B.maxCombo, B.combo); B.comboT = B.rt;
    if (!B.ko) { B.score += (word ? 400 : 100) * JV[j] * mult(); B.life = Math.min(100, B.life + (word ? 5 : j === 'P' ? 1 : 0.5)); }
    if (word) { sfx('word', B.combo); burst(x, y, '#ff8fd0', 22, true); ring(x, y, '#ffe36a'); B.mood = { e: 'joy', until: B.rt + 0.6 }; }
    else { sfx('tap'); burst(x, y, j === 'P' ? '#7ff6ff' : '#a6b8ff', j === 'P' ? 12 : 8); ring(x, y, '#7ff6ff'); }
    checkFever();
  }
}
function checkFever() { if (!B.fever && B.combo >= B.D.fever) setFever(true); }
function setFever(on) {
  if (on === B.fever) return; B.fever = on;
  if (on) { B.cut = B.rt; sfx('fever'); for (let k = 0; k < 40; k++) confetti(); if (B.net && !B.ko) netSend({ e: 'atk' }, true); }
  if (B.net) netTick(true);
}
function resolveQ(q, hitNote, ok) {
  q.state = 'done'; const now = B.now;
  q.notes.forEach(n => { n.done = true; n.doneT = now; if (n !== hitNote) n.res = n.id === q.opts[q.cl] ? 'show' : 'fade'; });
  const id = q.opts[q.cl];
  if (ok) { B.wordsOk++; try { lgHitRec(id); } catch (e) {} if (B.mode !== 'dengar' && B.rt - B.lastSay > 2.2) speak(q.it.zh, 1.2); const P = notePos(q.cl, 0); floatTxt(q.it.zh + '  ' + q.it.sy.map(s => s.y).join(' '), P.x, B.L.yHit - 40, '#fff', true); }
  else {
    try { lgMissRec(id); } catch (e) {} if (!B.missed.includes(id)) B.missed.push(id);
    B.retry.push({ i: id, at: B.qi + 3 }); speak(q.it.zh, 1.5);
  }
  showReveal(q, ok);
}

/* ---------- loop ---------- */
function frame(ms) {
  if (!B) return; B.raf = requestAnimationFrame(frame);
  const p = nowP(); const dt = Math.min(0.05, Math.max(0, p - (B.lastP || p))); B.lastP = p; B.rt = p;
  if (B.phase === 'resume' && B.rt >= B.resumeAt) doResume();
  if (B.phase === 'play') { B.now = (p - B.t0) * B.rate; sched(); update(); }
  if (B && B.net) netFrame();
  const d0 = performance.now();
  try { draw(dt); } catch (e) { if (!B.drawErr) { B.drawErr = 1; console.error(e); } }
  B.dms = (B.dms || 0) * 0.95 + (performance.now() - d0) * 0.05; B.fms = (B.fms || 16) * 0.95 + dt * 1000 * 0.05;
}
function update() {
  const now = B.now, w = B.D.win; if (!B.L) return;
  while (B.qi < B.qs.length && now >= B.qs[B.qi].promptAt) { ask(B.qs[B.qi]); B.qi++; }
  if (B.bot) bot(now);
  for (const n of B.notes) {
    if (n.t > now + 0.5) break;
    if (!n.done && now > n.t + w[2]) {
      if (n.kind === 'word') { const q = n.q; if (q.state === 'live') { const P = notePos(q.cl, 0); resolveQ(q, null, false); judge('M', P.x, P.y, 2, n); } }
      else { n.done = true; n.doneT = now; n.res = 'miss'; judge('M', 0, 0, 1, n); }
    }
    if (n.hd && now >= n.t + n.dur) holdDone(n);
  }
  if (B.notes.length > 40 && (B.gc = (B.gc || 0) + 1) % 30 === 0) B.notes = B.notes.filter(n => !(n.done && !n.hd && now - (n.doneT || n.t) > 1.2 && now > n.t + n.dur + 0.6));
  if (now >= B.song.end) finish(true);
  if (B) hud();
}
function bot(now) {
  for (const n of B.notes) {
    if (n.t > now) break; if (n.done) continue;
    if (n.kind === 'word') { const q = n.q; if (q.state !== 'live') continue; const wrong = B.bot.wrong && q.k % B.bot.wrong === B.bot.wrong - 1; const tgt = wrong ? q.notes.find(x => x.id !== q.opts[q.cl]) : q.notes.find(x => x.id === q.opts[q.cl]); if (tgt) { press(tgt.lane, 'bot', n.t); B.held[tgt.lane] = 0; } }
    else { press(n.lane, 'bot', n.t); B.held[n.lane] = 0; }
  }
}
function hud() {
  B.dScore += (B.score - B.dScore) * 0.25; const sc = String(Math.round(B.dScore >= B.score - 1 ? B.score : B.dScore)).padStart(7, '0');
  const key = sc + '|' + Math.round(B.life) + '|' + Math.round(B.now / B.song.len * 200);
  if (key === B.lastHud) return; B.lastHud = key;
  const s = B.root.querySelector('#rbsc'); if (s) s.textContent = B.net ? fmtN(Math.round(B.dScore >= B.score - 1 ? B.score : B.dScore)) : sc;
  const l = B.root.querySelector('#rblife'); if (l) { l.style.width = B.life + '%'; l.parentNode.parentNode.classList.toggle('low', B.life < 30); }
  const pr = B.root.querySelector('#rbprog'); if (pr) pr.style.width = clamp(B.now / B.song.len * 100, 0, 100) + '%';
}

/* ---------- prompt kartu (HTML) ---------- */
function pyH(sy) { return sy.map(s => `<span class="t${s.tone}">${esc(s.y)}</span>`).join(' '); }
function showPrompt(q) {
  const it = q.it; let body;
  if (B.mode === 'baca') body = `<span class="rb-pl">${t('ARTI')}</span><div class="rb-pm">${esc(it.tr)}</div>`;
  else if (B.mode === 'pinyin') body = `<span class="rb-pl">PINYIN</span><div class="rb-pp">${pyH(it.sy)}</div>`;
  else body = `<div class="rb-dg"><button class="rb-say" data-rb="say" aria-label="${t('Putar ulang')}">${SV.spk}</button><div><span class="rb-pl">${t('DENGAR')}</span><div class="rb-ph">${t('Pilih hanzi yang kamu dengar')}</div>${B.touch ? '' : `<small class="rb-hint">${t('Spasi/Enter: putar ulang · Esc: jeda')}</small>`}</div></div>`;
  const el = B.pr; el.className = 'rb-prompt'; void el.offsetWidth; el.className = 'rb-prompt on in ' + B.mode; el.innerHTML = lvItemBadge(it, 'rb-lvb') + body;
}
function showReveal(q, ok) {
  const it = q.it; const el = B.pr;
  el.className = 'rb-prompt'; void el.offsetWidth; el.className = 'rb-prompt on rv ' + (ok ? 'ok' : 'bad');
  el.innerHTML = `<div class="rb-rvw"><button class="rb-say sm" data-rb="say" aria-label="${t('Putar ulang')}">${SV.spk}</button><div class="rb-rv"><b class="hz">${esc(it.zh)}${lvItemBadge(it, '', 'xs')}</b><span class="rb-rpy">${pyH(it.sy)}</span><small>${esc(it.tr || '')}</small></div>${ok ? '' : `<span class="rb-tag">${t('Jawaban')}</span>`}</div>`;
}

/* ---------- panel (setup / tutorial / jeda / hasil) ---------- */
function panel(html) { const p = B.root.querySelector('#rbpanel'); p.innerHTML = html; p.className = 'rb-panel on'; B.pr = B.root.querySelector('#rbpr'); }
function panelHide() { const p = B.root.querySelector('#rbpanel'); p.className = 'rb-panel'; p.innerHTML = ''; B.pr = B.root.querySelector('#rbpr'); }
function panelSetup(err) {
  const c = cfg(); const best = (arS().best || {}).beat || 0; let nW = 0; try { nW = (B.pool.ids || []).length; } catch (e) {}
  panel(`<div class="rb-card rb-setupc">
    <div class="rb-logo"><span class="hz">節奏偶像</span><b>Ritme Idol</b><i>RHYTHM · LIVE</i></div>
    <p class="rb-desc">${t('Ketuk hanzi yang benar tepat di garis, ikuti ketukan lagu J-pop!')}</p>
    <div class="rb-lab">${t('Mode')}</div>
    <div class="rb-seg">${MODES.map(m => `<button class="${c.m === m.k ? 'on' : ''}" data-rb="mode" data-v="${m.k}"><b>${t(m.name)}</b><small>${t(m.sub)}</small></button>`).join('')}</div>
    <div class="rb-lab">${t('Kesulitan')}</div>
    <div class="rb-seg rb-dif">${DIFF.map((d, k) => `<button class="${c.d === k ? 'on' : ''} d${k}" data-rb="diff" data-v="${k}"><b>${t(d.name)}</b><small>${d.bpm} BPM · ${t('{n} jalur', { n: d.lanes })}</small></button>`).join('')}</div>
    <div class="rb-meta"><span>${t('Sumber')}: <b>${esc(B.pool.name || '')}</b> · ${fmtN(nW)} ${t('kata')}</span>${best ? `<span class="rb-pb">${SV.star} ${t('Rekor')} <b>${fmtN(best)}</b></span>` : ''}</div>
    ${err ? `<p class="rb-err">${esc(err)}</p>` : ''}
    <div class="rb-acts"><button class="rb-btn ghost" data-rb="tut">${SV.help} ${t('Cara main')}</button><button class="rb-btn pri" data-rb="go">${SV.play} ${t('Mulai live')}</button></div>
    ${typeof ARNET !== 'undefined' ? `<button class="rb-btn rb-onl" data-rb="online">${SV.vs}<span><b>${t('Main online')}</b><small>${t('1 lawan 1 · lagu & not sama')}</small></span></button>` : ''}
  </div>`);
}
function panelTut() {
  const n = B.D.lanes; const keys = KEYS[n];
  const lanes = Array.from({ length: n }, (_, k) => k);
  const lw = 220 / n;
  const svg = `<svg class="rb-tsvg" viewBox="0 0 260 170" aria-hidden="true">
    <defs><linearGradient id="rbtg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1458" stop-opacity=".2"/><stop offset="1" stop-color="#1a0b3d" stop-opacity=".85"/></linearGradient>
    <linearGradient id="rbtl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff5fb0"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#5fe8ff"/></linearGradient></defs>
    <path d="M95 8 H165 L240 128 H20 Z" fill="url(#rbtg)" stroke="rgba(255,255,255,.35)"/>
    ${lanes.slice(1).map(k => `<path d="M${95 + k * 70 / n} 8 L${20 + k * lw} 128" stroke="rgba(255,255,255,.18)"/>`).join('')}
    ${lanes.map(k => { const x = 20 + (k + 0.5) * lw, x0 = 95 + (k + 0.5) * 70 / n; const mx = (x * 0.62 + x0 * 0.38); const ok = k === 1; return `<g transform="translate(${mx} 70)"><rect x="-${lw * 0.36}" y="-13" width="${lw * 0.72}" height="26" rx="7" fill="${ok ? '#fff' : '#ffeaf4'}" stroke="${ok ? '#3dff9a' : '#ff4fa3'}" stroke-width="${ok ? 3 : 2}"/><text y="6" text-anchor="middle" font-size="16" font-weight="700" fill="#2b1240" font-family="${esc(B.hz)}">${['水', '喝', '吃', '茶'][k]}</text></g>`; }).join('')}
    <rect x="16" y="124" width="228" height="7" rx="3.5" fill="url(#rbtl)"/>
    ${lanes.map(k => `<g transform="translate(${20 + (k + 0.5) * lw} 152)"><rect x="-15" y="-13" width="30" height="26" rx="8" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.6)"/><text y="5" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="system-ui">${keys[k]}</text></g>`).join('')}
    <path d="M${20 + 1.5 * lw} 96 v18" stroke="#3dff9a" stroke-width="3" stroke-linecap="round"/><path d="M${20 + 1.5 * lw - 6} 108 l6 7 6-7" fill="none" stroke="#3dff9a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  panel(`<div class="rb-card rb-tut">
    <div class="rb-logo sm"><span class="hz">節奏偶像</span><b>${t('Cara main')}</b></div>
    <div class="rb-tbox"><div class="rb-tprompt"><span class="rb-pl">${t('ARTI')}</span> <b>${esc(t('minum'))}</b></div>${svg}</div>
    <ol class="rb-steps">
      <li><i>1</i><span>${t('Lihat petunjuk di atas: arti, suara, atau pinyin.')}</span></li>
      <li><i>2</i><span>${t('Not ber-hanzi turun. Ketuk jalur hanzi yang BENAR tepat saat menyentuh garis. Salah hanzi = MISS.')}</span></li>
      <li><i>3</i><span>${t('Ketuk juga not biru biar kombo jalan. Not panjang: tahan sampai habis. Kombo tinggi = FEVER!')}</span></li>
    </ol>
    <p class="rb-kb">${t('Laptop: tombol D F J K · HP/tablet: ketuk jalurnya')}</p>
    <div class="rb-acts"><button class="rb-btn pri" data-rb="tutok">${SV.play} ${t('Siap!')}</button></div>
  </div>`);
}
function panelPause() {
  panel(`<div class="rb-card rb-pausec"><div class="rb-logo sm"><span class="hz">暫停</span><b>${t('Jeda')}</b></div>
    <div class="rb-acts col"><button class="rb-btn pri" data-rb="resume">${SV.play} ${t('Lanjut')}</button><button class="rb-btn" data-rb="restart">${SV.redo} ${t('Ulang lagu')}</button><button class="rb-btn ghost" data-rb="quit">${SV.x} ${t('Keluar')}</button></div>
    <p class="rb-kb">${t('Enter/Esc: lanjut')}</p></div>`);
}
function panelEnd() {
  if (!B || !B.endInfo) return; const E = B.endInfo; const c = B.cnt;
  const mex = E.rank === 'S' || E.rank === 'A' ? 'joy' : E.rank === 'B' ? 'happy' : E.clear ? 'think' : 'oops';
  const miss = B.missed.map(i => { const w = W[i]; if (!w) return ''; const it = lgWItem(i); return `<li><button class="rb-say sm" data-rb="sayw" data-v="${i}" aria-label="${t('Putar ulang')}">${SV.spk}</button><b class="hz">${esc(it.zh)}${lvItemBadge(it, '', 'xs')}</b><span class="rb-mpy">${pyH(it.sy)}</span><small>${esc(it.tr || '')}</small></li>`; }).join('');
  panel(`<div class="rb-card rb-endc">
    <div class="rb-res">
      <div class="rb-rank r${E.rank}"><svg class="rb-rays" viewBox="0 0 200 200" aria-hidden="true">${Array.from({ length: 12 }, (_, k) => `<path d="M100 100 L${100 + 110 * Math.cos(k * Math.PI / 6 - 0.12)} ${100 + 110 * Math.sin(k * Math.PI / 6 - 0.12)} L${100 + 110 * Math.cos(k * Math.PI / 6 + 0.12)} ${100 + 110 * Math.sin(k * Math.PI / 6 + 0.12)}Z"/>`).join('')}</svg><b>${E.rank}</b><span>RANK</span></div>
      <div class="rb-rmas">${typeof mascot === 'function' ? mascot(mex, 96) : ''}</div>
      <div class="rb-rt"><div class="rb-clear ${E.clear ? 'ok' : 'no'}">${E.clear ? t('LIVE SUKSES!') : t('LIVE GAGAL…')}</div>
        <div class="rb-fs"><small>${t('Skor')}</small><b>${fmtN(Math.round(B.score))}</b></div>${E.pb ? `<span class="rb-pbn">${SV.star} ${t('Rekor baru!')}</span>` : ''}</div>
    </div>
    <div class="rb-stats">
      <div><small>${t('Akurasi')}</small><b>${Math.round(E.acc * 100)}%</b></div><div><small>${t('Kombo maks')}</small><b>${B.maxCombo}</b></div>
      <div><small>${t('Kata benar')}</small><b>${B.wordsOk}/${B.wordsN}</b></div><div><small>XP</small><b>+${E.xp}</b></div>
    </div>
    <div class="rb-jc"><span class="jp">PERFECT <b>${c.P}</b></span><span class="jg">GREAT <b>${c.G}</b></span><span class="jd">GOOD <b>${c.D}</b></span><span class="jm">MISS <b>${c.M}</b></span></div>
    <div class="rb-lab">${t('Kata yang terlewat')}</div>
    ${miss ? `<ul class="rb-miss">${miss}</ul>` : `<p class="rb-none">${t('Sempurna — tidak ada kata yang terlewat!')}</p>`}
    <div class="rb-acts"><button class="rb-btn ghost" data-rb="quit">${SV.back} ${t('Kembali')}</button><button class="rb-btn ghost" data-rb="setup">${SV.help} ${t('Mode')}</button><button class="rb-btn pri" data-rb="restart">${SV.redo} ${t('Main lagi')}</button></div>
  </div>`);
}

/* ---------- efek ---------- */
function burst(x, y, col, n, star) {
  for (let k = 0; k < n; k++) { if (B.parts.length > 180) B.parts.shift(); const a = rnd(-Math.PI, 0) + rnd(-0.3, 0.3); const v = rnd(150, star ? 560 : 420); B.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: rnd(0.3, 0.6), age: 0, col, ty: star && k % 3 === 0 ? 'star' : 'spark', sz: rnd(3, star ? 9 : 6), rot: rnd(0, 6) }); }
}
function ring(x, y, col) { if (B.rings.length > 24) B.rings.shift(); B.rings.push({ x, y, col, age: 0 }); }
function confetti() { if (B.parts.length > 150) return; const L = B.L; B.parts.push({ x: rnd(0, L.W), y: rnd(-40, 0), vx: rnd(-40, 40), vy: rnd(80, 220), life: rnd(1.6, 2.6), age: 0, col: `hsl(${rnd(0, 360) | 0},95%,70%)`, ty: 'conf', sz: rnd(4, 8), rot: rnd(0, 6), vr: rnd(-8, 8) }); }
function floatTxt(txt, x, y, col, big) { if (B.floats.length > 6) B.floats.shift(); B.floats.push({ txt, x, y, col, big, at: B.rt }); }

/* ---------- tata letak ---------- */
function resize() {
  if (!B) return; const r = B.root.getBoundingClientRect(); const Wd = Math.max(300, r.width), H = Math.max(400, r.height);
  let dpr = Math.min(2, window.devicePixelRatio || 1); if (Wd * H * dpr * dpr > 4.2e6) dpr = Math.max(1, Math.sqrt(4.2e6 / (Wd * H)));
  B.cv.width = Math.round(Wd * dpr); B.cv.height = Math.round(H * dpr); B.dpr = dpr;
  const land = Wd > H * 1.05; const n = (B.D || DIFF[1]).lanes; let trackW, yTop, yHit, idol, comboAt;
  const pBot = 76 + (Wd < 420 ? 72 : 84) + (B.net ? 16 : 0);
  const short = land && H < 560; B.root.classList.toggle('rb-short', short);
  if (short) {
    trackW = Math.min(520, Math.max(300, Wd * 0.44)); yTop = 34; yHit = H - Math.max(62, H * 0.15); const side = (Wd - trackW) / 2;
    idol = { x: Wd - side / 2, y: H * 0.9, h: Math.min(H * 0.62, side * 1.2), plat: 1 }; comboAt = { x: side / 2, y: H * 0.78, side: 1, fs: 42 };
    B.root.style.setProperty('--rb-side', side + 'px');
  } else if (land) {
    trackW = Math.min(620, Math.max(360, Wd * 0.44)); yHit = H - Math.max(92, H * 0.135); yTop = Math.max(pBot + 52, H * 0.31);
    const side = (Wd - trackW) / 2;
    if (side >= 170) { idol = { x: side * 0.5, y: H * 0.83, h: Math.min(H * 0.5, side * 1.3, 340), plat: 1 }; comboAt = { x: Wd - side * 0.5, y: H * 0.52, side: 1 }; }
    else { idol = { x: Wd / 2, y: yTop + 6, h: clamp(yTop - pBot, 70, 200) }; }
  } else {
    trackW = Math.min(Wd - 18, 580); yHit = H - Math.max(92, H * 0.13); yTop = Math.max(pBot + 92, H * 0.37);
    idol = { x: Wd / 2, y: yTop + 4, h: clamp((yTop - pBot) * 0.92, 80, 230) };
  }
  const D = 1.35; const yVan = (yTop * (1 + D) - yHit) / D;
  if (!comboAt) comboAt = { x: Wd / 2, y: yTop + (yHit - yTop) * 0.36 };
  B.L = { W: Wd, H, land, trackW, cx: Wd / 2, yTop, yHit, yVan, D, laneW: trackW / n, n, idol, comboAt, short };
  if (B.net) placeOpp();
  /* penonton */
  const cr = []; const gap = 30;
  for (let row = 0; row < 2; row++) for (let x = -10 + row * 15; x < Wd + 20; x += gap + rnd(-3, 3)) cr.push({ x, row, ci: Math.floor(rnd(0, 5)), ph: rnd(0, 6.28), sc: rnd(0.85, 1.1), two: Math.random() < 0.25 });
  B.crowd = cr;
}
function proj(u) { const L = B.L; const z = 1 + Math.max(-0.28, u) * L.D; const s = 1 / z; return { s, y: L.yVan + (L.yHit - L.yVan) * s }; }
function laneX(l, s) { const L = B.L; return L.cx + (l - (L.n - 1) / 2) * L.laneW * s; }
function notePos(l, u) { const p = proj(u); return { x: laneX(l, p.s), y: p.y, s: p.s }; }

/* ---------- gambar ---------- */
function rr(c, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
function star4(c, x, y, r, rot) { c.save(); c.translate(x, y); c.rotate(rot || 0); c.beginPath(); for (let k = 0; k < 8; k++) { const rr2 = k % 2 ? r * 0.32 : r; const a = k * Math.PI / 4; c.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2); } c.closePath(); c.fill(); c.restore(); }
function beatInfo() {
  if (B.song && (B.phase === 'play' || B.phase === 'pause' || B.phase === 'resume')) { const tm = B.phase === 'play' ? B.now : B.pauseAt; const p = posAt(tm); return { g: p.g, sec: tm < 0 ? 'intro' : p.bar.sec, bar: p.bar, b: p.b, tm }; }
  const g = B.rt * 96 / 60; return { g, sec: B.phase === 'end' ? (B.endClear ? 'chorus' : 'verse') : 'idle', bar: null, b: g % 4, tm: 0 };
}
function draw(dt) {
  const c = B.cx, L = B.L, Wd = L.W, H = L.H; const bi = beatInfo(); const g = bi.g; const ph = ((g % 1) + 1) % 1; const pulse = Math.pow(1 - ph, 3);
  const fev = B.fever; const cho = bi.sec === 'chorus' || bi.sec === 'post'; const inten = fev ? 1.35 : cho ? 1 : bi.sec === 'pre' ? 0.8 : bi.sec === 'idle' ? 0.55 : 0.62;
  c.setTransform(B.dpr, 0, 0, B.dpr, 0, 0);
  B.shake *= Math.pow(0.002, dt); if (B.shake > 0.3) c.translate(rnd(-B.shake, B.shake), rnd(-B.shake, B.shake));
  /* latar */
  const hue = fev ? (B.rt * 60) % 360 : cho ? 318 : 268;
  const bg = c.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, `hsl(${hue},62%,${11 + pulse * 3 * inten}%)`); bg.addColorStop(0.55, `hsl(${(hue + 30) % 360},58%,${17 + pulse * 4 * inten}%)`); bg.addColorStop(1, '#090416');
  c.fillStyle = bg; c.fillRect(-20, -20, Wd + 40, H + 40);
  drawLED(c, bi, pulse, inten);
  drawLights(c, bi, pulse, inten);
  drawIdolLayer(c, bi, pulse);
  drawCrowd(c, g, inten);
  if (B.phase === 'play' || B.phase === 'pause' || B.phase === 'resume') { drawTrack(c, bi, pulse); drawCombo(c); drawNotes(c); }
  else drawTrackIdle(c, pulse);
  drawFx(c, dt);
  drawJudge(c);
  if (B.phase === 'play' || B.phase === 'resume') drawCount(c, bi);
  if (B.cut && B.rt - B.cut < 1.2) drawCut(c, B.rt - B.cut);
  if (fev) { c.save(); c.globalCompositeOperation = 'lighter'; const gr = c.createLinearGradient(0, 0, Wd, H); for (let k = 0; k <= 4; k++) gr.addColorStop(k / 4, `hsla(${(B.rt * 140 + k * 72) % 360},100%,60%,${0.35 + pulse * 0.3})`); c.strokeStyle = gr; c.lineWidth = 10; c.strokeRect(5, 5, Wd - 10, H - 10); c.restore(); if (Math.random() < 0.3) confetti(); }
  if (B.net) drawNet(c, pulse);
  if (B.life < 30 && B.phase === 'play' && !B.ko) { const v = c.createRadialGradient(Wd / 2, H / 2, Math.min(Wd, H) * 0.35, Wd / 2, H / 2, Math.max(Wd, H) * 0.75); v.addColorStop(0, 'rgba(255,40,80,0)'); v.addColorStop(1, `rgba(255,40,80,${0.18 + 0.2 * pulse})`); c.fillStyle = v; c.fillRect(0, 0, Wd, H); }
}
function drawLED(c, bi, pulse, inten) {
  const L = B.L, img = B.limg, d = img.data, cw = 48, chh = 22; const g = bi.g, tt = B.rt; const fev = B.fever, sec = bi.sec;
  for (let y = 0; y < chh; y++) for (let x = 0; x < cw; x++) {
    let h, v;
    if (fev) { h = (x * 7 + y * 5 + tt * 120) % 360; const w = Math.sin(x * 0.45 + y * 0.35 + tt * 5); v = w > 0.2 ? 0.45 + 0.5 * w * (0.6 + 0.4 * pulse) : 0.06; }
    else if (sec === 'chorus' || sec === 'post') { const colH = (0.25 + 0.75 * Math.abs(Math.sin(x * 0.55 + Math.floor(g * 2) * 1.7))) * (0.55 + 0.45 * pulse); const lit = (chh - y) / chh < colH; h = (300 + x * 3) % 360; v = lit ? 0.85 : 0.07; }
    else if (sec === 'pre') { const prog = ((bi.bar ? bi.bar.i : 0) * 4 + (bi.b || 0)) / 16; h = 200 + y * 4; v = (chh - y) / chh < prog * 1.05 ? 0.7 : 0.08; v *= 0.7 + 0.3 * pulse; }
    else { h = 280 + 30 * Math.sin(x * 0.2 + tt); v = 0.18 + 0.32 * (0.5 + 0.5 * Math.sin(x * 0.32 + y * 0.25 - tt * 2.2)) + 0.12 * pulse; }
    const k = (y * cw + x) * 4; const [r, gg, b] = hsl(h, 0.9, v * 0.6);
    d[k] = r; d[k + 1] = gg; d[k + 2] = b; d[k + 3] = 255;
  }
  B.lx.putImageData(img, 0, 0);
  const wh = L.land ? L.H * 0.66 : L.yTop + 30;
  c.save(); c.globalAlpha = B.fever ? 0.36 : 0.5 * Math.min(1, inten + 0.1); c.imageSmoothingEnabled = false; c.drawImage(B.led, 0, 0, cw, chh, 0, 0, L.W, wh); c.imageSmoothingEnabled = true;
  c.globalAlpha = 1; c.strokeStyle = 'rgba(6,2,18,.75)'; c.lineWidth = 2; c.beginPath();
  for (let x = 0; x <= cw; x++) { const px = x * L.W / cw; c.moveTo(px, 0); c.lineTo(px, wh); } for (let y = 0; y <= chh; y++) { const py = y * wh / chh; c.moveTo(0, py); c.lineTo(L.W, py); } c.stroke();
  const fade = c.createLinearGradient(0, wh * 0.45, 0, wh); fade.addColorStop(0, 'rgba(9,4,22,0)'); fade.addColorStop(1, 'rgba(9,4,22,1)'); c.fillStyle = fade; c.fillRect(0, wh * 0.45, L.W, wh * 0.55 + 1);
  c.restore();
}
const hslC = {};
function hsl(h, s, l) {
  const key = ((h | 0) % 360) * 100000 + Math.round(l * 100) * 10 + Math.round(s * 9); const hit = hslC[key]; if (hit) return hit;
  const a = s * Math.min(l, 1 - l); const f = n => { const k = (n + h / 30) % 12; return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))); };
  return (hslC[key] = [f(0), f(8), f(4)]);
}
function drawLights(c, bi, pulse, inten) {
  const L = B.L; const fev = B.fever; const n = L.W > 700 ? 6 : 4; const cols = fev ? null : ['255,95,176', '95,232,255', '178,140,255', '255,227,106', '255,95,176', '95,232,255'];
  c.save(); c.globalCompositeOperation = 'lighter';
  for (let k = 0; k < n; k++) {
    const sx = L.W * (k + 0.5) / n; const sp = fev ? 2.4 : 0.7; const a = Math.PI / 2 + Math.sin(B.rt * sp + k * 1.9) * 0.5; const len = L.H * 1.15; const wa = 0.11 + 0.03 * pulse;
    const col = fev ? hsl((B.rt * 120 + k * 60) % 360, 1, 0.6).join(',') : cols[k];
    const gr = c.createLinearGradient(sx, 0, sx + Math.cos(a) * len, Math.sin(a) * len); gr.addColorStop(0, `rgba(${col},${0.3 * inten * (0.7 + 0.3 * pulse)})`); gr.addColorStop(1, `rgba(${col},0)`);
    c.fillStyle = gr; c.beginPath(); c.moveTo(sx, -10); c.lineTo(sx + Math.cos(a - wa) * len, Math.sin(a - wa) * len); c.lineTo(sx + Math.cos(a + wa) * len, Math.sin(a + wa) * len); c.closePath(); c.fill();
  }
  if (fev) { c.lineWidth = 2; for (let k = 0; k < 5; k++) { const a = Math.PI / 2 + Math.sin(B.rt * 3 + k) * 1.1; const x0 = L.W * (k + 0.5) / 5; c.strokeStyle = `hsla(${(B.rt * 200 + k * 70) % 360},100%,65%,.5)`; c.beginPath(); c.moveTo(x0, L.H); c.lineTo(x0 + Math.cos(-a) * L.H * 1.4, L.H + Math.sin(-a) * L.H * 1.4); c.stroke(); } }
  c.restore();
}
function drawIdolLayer(c, bi, pulse) {
  const L = B.L, I0 = L.idol; const fev = B.fever;
  let expr = 'idle'; if (B.mood && B.mood.e && B.rt < B.mood.until) expr = B.mood.e; else if (B.mood === 'cheer') expr = 'joy'; else if (B.mood === 'sad') expr = 'oops'; else if (fev) expr = 'joy';
  const sing = (bi.sec === 'chorus') && B.phase === 'play';
  if (I0.plat) { c.save(); const pw = I0.h * 0.55; const gr = c.createRadialGradient(I0.x, I0.y, 4, I0.x, I0.y, pw); gr.addColorStop(0, 'rgba(255,120,200,.45)'); gr.addColorStop(1, 'rgba(255,120,200,0)'); c.fillStyle = gr; c.beginPath(); c.ellipse(I0.x, I0.y + 4, pw, pw * 0.2, 0, 0, Math.PI * 2); c.fill(); c.strokeStyle = `rgba(255,170,230,${0.5 + 0.4 * pulse})`; c.lineWidth = 2; c.beginPath(); c.ellipse(I0.x, I0.y + 4, pw * 0.8, pw * 0.14, 0, 0, Math.PI * 2); c.stroke(); c.restore(); }
  if (fev || B.mood === 'cheer') { c.save(); c.globalCompositeOperation = 'lighter'; const r = I0.h * 0.75; const gr = c.createRadialGradient(I0.x, I0.y - I0.h * 0.5, 4, I0.x, I0.y - I0.h * 0.5, r); gr.addColorStop(0, `hsla(${(B.rt * 90) % 360},100%,70%,${0.35 + 0.25 * pulse})`); gr.addColorStop(1, 'hsla(0,0%,0%,0)'); c.fillStyle = gr; c.fillRect(I0.x - r, I0.y - I0.h * 0.5 - r, r * 2, r * 2); c.restore(); }
  let g = bi.g; if (B.phase === 'pause') g = Math.floor(g);
  idol(c, I0.x, I0.y, I0.h, { g, fev, expr, sing, cheer: B.mood === 'cheer', sad: B.mood === 'sad', idle: bi.sec === 'idle' });
  if (bi.sec === 'chorus' || fev) { c.save(); c.fillStyle = `rgba(255,240,170,${0.5 + 0.5 * pulse})`; for (let k = 0; k < 4; k++) { const a = k * 1.57 + B.rt * 0.8; star4(c, I0.x + Math.cos(a) * I0.h * 0.42, I0.y - I0.h * 0.55 + Math.sin(a) * I0.h * 0.3, I0.h * 0.035 * (0.6 + pulse), a); } c.restore(); }
}
/* chibi idol: Hacimi berkerudung kucing pink, kostum panggung, headset mic */
function idol(c, x, y, h, o) {
  const OL = '#6b2147', HOOD = '#F4A9BC', HOODD = '#E58AA2', EARIN = '#FCD5DF', FACE = '#FFFDFC', BLUSH = '#FBB9C9', MAG = '#ff4fa3', MAGD = '#c2187a', CY = '#5fe8ff', GOLD = '#ffd84a';
  const sp = o.fev ? 2 : o.idle ? 0.5 : 1; const g = o.g * sp; const ph = ((g % 1) + 1) % 1;
  let hop = Math.sin(Math.PI * ph); if (o.sad) hop *= 0.2;
  const sq = Math.pow(1 - hop, 3); const lift = hop * (o.fev || o.cheer ? 11 : 5);
  const lean = o.sad ? 0.05 : Math.sin(Math.PI * g) * (o.fev ? 0.13 : 0.08);
  const s = h / 124;
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(0, 0, 30 - hop * 6, 6, 0, 0, Math.PI * 2); c.fill();
  c.translate(0, -lift); c.rotate(lean); c.scale(1 + 0.04 * sq, 1 - 0.05 * sq);
  c.lineJoin = 'round'; c.lineCap = 'round'; c.lineWidth = 2.4; c.strokeStyle = OL;
  const fl = Math.max(0, Math.sin(Math.PI * g)) * 5, fr = Math.max(0, -Math.sin(Math.PI * g)) * 5;
  /* pita kuncir belakang */
  const sw = -lean * 50 + Math.sin(B.rt * 3) * 2;
  [-1, 1].forEach(sd => { c.fillStyle = MAG; c.beginPath(); c.moveTo(sd * 26, -96); c.quadraticCurveTo(sd * (44 + sw * sd * 0.3), -82, sd * 38 + sw, -54 + hop * 3); c.lineTo(sd * 31 + sw, -58 + hop * 3); c.quadraticCurveTo(sd * 34, -80, sd * 22, -90); c.closePath(); c.fill(); c.stroke(); });
  /* kaki */
  [[-7, fl], [7, fr]].forEach(([lx, up]) => { c.fillStyle = '#fff'; rr(c, lx - 4, -28 - up, 8, 24, 4); c.fill(); c.stroke(); c.fillStyle = MAG; c.beginPath(); c.ellipse(lx + (lx < 0 ? -1 : 1), -4 - up, 7, 4.6, 0, 0, Math.PI * 2); c.fill(); c.stroke(); });
  /* rok berlapis */
  const fla = 1 + 0.1 * hop + (o.fev ? 0.08 : 0);
  c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-12, -48); c.lineTo(-29 * fla, -22); for (let k = 0; k <= 6; k++) { const xx = -29 * fla + k * (58 * fla / 6); c.quadraticCurveTo(xx - 4.8 * fla, -16, xx, -22); } c.lineTo(12, -48); c.closePath(); c.fill(); c.stroke();
  const sk = c.createLinearGradient(-26, 0, 26, 0); sk.addColorStop(0, MAGD); sk.addColorStop(0.45, MAG); sk.addColorStop(1, '#ff8cc6');
  c.fillStyle = sk; c.beginPath(); c.moveTo(-12, -48); c.lineTo(-25 * fla, -26); for (let k = 0; k <= 5; k++) { const xx = -25 * fla + k * (50 * fla / 5); c.quadraticCurveTo(xx - 5 * fla, -21, xx, -26); } c.lineTo(12, -48); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = CY; c.lineWidth = 2.2; c.beginPath(); c.moveTo(-20 * fla, -32); c.quadraticCurveTo(0, -29, 20 * fla, -32); c.stroke(); c.strokeStyle = OL; c.lineWidth = 2.4;
  /* badan */
  c.fillStyle = '#fff6fb'; rr(c, -12, -68, 24, 23, 8); c.fill(); c.stroke();
  c.fillStyle = MAG; c.beginPath(); c.moveTo(-11, -66); c.lineTo(0, -56); c.lineTo(11, -66); c.lineTo(6, -68); c.lineTo(0, -62); c.lineTo(-6, -68); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = MAG; c.beginPath(); c.ellipse(-6, -58, 6, 4, -0.4, 0, Math.PI * 2); c.ellipse(6, -58, 6, 4, 0.4, 0, Math.PI * 2); c.fill(); c.stroke(); c.fillStyle = CY; c.beginPath(); c.arc(0, -58, 3, 0, Math.PI * 2); c.fill(); c.stroke();
  c.fillStyle = GOLD; star5(c, 0, -50, 3.2);
  /* lengan */
  const poses = [[2.7, 0.45], [0.45, 2.7], [2.35, 2.35], [0.9, 0.9], [3.0, 1.5], [1.5, 3.0]];
  let al, ar;
  if (o.cheer) { const w = Math.sin(B.rt * 9) * 0.25; al = 2.75 + w; ar = 2.75 - w; }
  else if (o.sad) { al = 0.25; ar = 0.25; }
  else if (o.fev) { const w = Math.sin(Math.PI * g); al = 2.6 + w * 0.4; ar = 2.6 - w * 0.4; }
  else { const k = ((Math.floor(g) % poses.length) + poses.length) % poses.length; const kp = (k + poses.length - 1) % poses.length; const e = Math.min(1, ph * 3.2); al = poses[kp][0] + (poses[k][0] - poses[kp][0]) * e; ar = poses[kp][1] + (poses[k][1] - poses[kp][1]) * e; if (o.idle) { al = 0.5 + 0.35 * Math.sin(B.rt * 2); ar = 0.5 - 0.35 * Math.sin(B.rt * 2); } }
  [[-1, al], [1, ar]].forEach(([sd, a]) => {
    const sx = sd * 12, sy = -64; const ex = sx + sd * Math.sin(a) * 19, ey = sy + Math.cos(a) * 19;
    c.strokeStyle = OL; c.lineWidth = 8.4; c.beginPath(); c.moveTo(sx, sy); c.lineTo(ex, ey); c.stroke();
    c.strokeStyle = '#fff'; c.lineWidth = 5.2; c.beginPath(); c.moveTo(sx, sy); c.lineTo(ex, ey); c.stroke();
    c.lineWidth = 2.4; c.strokeStyle = OL; c.fillStyle = FACE; c.beginPath(); c.arc(ex, ey, 4.4, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = MAG; c.beginPath(); c.arc(sx, sy, 5.4, 0, Math.PI * 2); c.fill(); c.stroke();
  });
  /* kepala */
  c.save(); c.translate(0, -92); c.rotate(o.sad ? 0.12 : Math.sin(Math.PI * g) * 0.06);
  [-1, 1].forEach(sd => { c.fillStyle = HOOD; c.beginPath(); c.moveTo(sd * 13, -24); c.lineTo(sd * 27, -44); c.quadraticCurveTo(sd * 30, -46, sd * 30, -40); c.lineTo(sd * 27, -12); c.closePath(); c.fill(); c.stroke(); c.fillStyle = EARIN; c.beginPath(); c.moveTo(sd * 17, -24); c.lineTo(sd * 26.5, -38); c.lineTo(sd * 25, -18); c.closePath(); c.fill(); });
  c.fillStyle = HOOD; c.beginPath(); c.ellipse(0, 0, 31, 28, 0, 0, Math.PI * 2); c.fill(); c.stroke();
  c.fillStyle = HOODD; c.globalAlpha = 0.5; c.beginPath(); c.ellipse(2, 5, 26, 22, 0, 0, Math.PI * 2); c.fill(); c.globalAlpha = 1;
  c.fillStyle = FACE; c.beginPath(); c.ellipse(0, 5, 23, 19.5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 2.6; c.beginPath(); c.arc(0, 0, 25, -2.5, -1.7); c.stroke(); c.strokeStyle = OL; c.lineWidth = 2.4;
  c.fillStyle = GOLD; star5(c, 19, -21, 5.2, B.rt * 0.8);
  const blink = (B.rt % 3.3) < 0.11; const ex = o.expr;
  [-1, 1].forEach(sd => {
    const cx = sd * 9.5, cy = 4;
    if (ex === 'joy') { c.beginPath(); c.moveTo(cx - 5, cy + 1.5); c.quadraticCurveTo(cx, cy - 5.5, cx + 5, cy + 1.5); c.stroke(); }
    else if (ex === 'oops') { c.beginPath(); c.moveTo(cx - sd * 4, cy - 4); c.lineTo(cx + sd * 3.5, cy); c.lineTo(cx - sd * 4, cy + 4); c.stroke(); }
    else if (blink) { c.beginPath(); c.moveTo(cx - 4.5, cy); c.lineTo(cx + 4.5, cy); c.stroke(); }
    else { const eg = c.createLinearGradient(0, cy - 6, 0, cy + 6); eg.addColorStop(0, '#3b1240'); eg.addColorStop(1, '#a2357a'); c.fillStyle = eg; c.beginPath(); c.ellipse(cx, cy, 4.4, 6, 0, 0, Math.PI * 2); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(cx - 1.4, cy - 2.4, 1.9, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(cx + 1.6, cy + 2.4, 0.9, 0, Math.PI * 2); c.fill(); }
  });
  c.fillStyle = BLUSH; c.globalAlpha = 0.9; c.beginPath(); c.ellipse(-15, 11, 5, 2.8, 0, 0, Math.PI * 2); c.ellipse(15, 11, 5, 2.8, 0, 0, Math.PI * 2); c.fill(); c.globalAlpha = 1;
  c.fillStyle = '#d94f72';
  if (o.sing && !o.sad) { const op = 1.5 + 3 * Math.abs(Math.sin(Math.PI * g * 2)); c.beginPath(); c.ellipse(0, 14, 3, op, 0, 0, Math.PI * 2); c.fill(); c.stroke(); }
  else if (ex === 'joy') { c.beginPath(); c.moveTo(-4.5, 12); c.quadraticCurveTo(0, 20, 4.5, 12); c.closePath(); c.fill(); c.stroke(); }
  else if (ex === 'oops') { c.beginPath(); c.moveTo(-5, 15); c.quadraticCurveTo(-2.5, 12, 0, 15); c.quadraticCurveTo(2.5, 18, 5, 15); c.stroke(); }
  else { c.beginPath(); c.moveTo(-4, 12.5); c.quadraticCurveTo(-2, 15.5, 0, 12.5); c.quadraticCurveTo(2, 15.5, 4, 12.5); c.stroke(); }
  c.strokeStyle = '#3a3a52'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-23, 3); c.quadraticCurveTo(-20, 15, -8, 15); c.stroke(); c.fillStyle = '#3a3a52'; c.beginPath(); c.arc(-7.5, 15, 1.9, 0, Math.PI * 2); c.fill();
  c.fillStyle = CY; c.strokeStyle = OL; c.lineWidth = 2; c.beginPath(); c.arc(-24, 3, 4, 0, Math.PI * 2); c.fill(); c.stroke();
  c.restore();
  c.restore();
}
function star5(c, x, y, r, rot) { c.save(); c.translate(x, y); c.rotate(rot || 0); c.beginPath(); for (let k = 0; k < 10; k++) { const rr2 = k % 2 ? r * 0.45 : r; const a = -Math.PI / 2 + k * Math.PI / 5; c.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2); } c.closePath(); c.fill(); c.lineWidth = 1.2; c.stroke(); c.restore(); }
function drawCrowd(c, g, inten) {
  const L = B.L; const fev = B.fever; const by = L.H; const k0 = L.W < 500 ? 0.85 : 1; const sp = fev ? 2 : 1;
  c.save();
  for (const row of [1, 0]) {
    c.fillStyle = row ? '#140a2e' : '#0d061f'; c.beginPath();
    for (const p of B.crowd) {
      if (p.row !== row) continue; const sc = p.sc * (row ? 0.82 : 1) * k0; const yb = by - (row ? 26 : 2) * sc; const bob = Math.abs(Math.sin(Math.PI * g + p.ph * 0.2)) * 3;
      const hy = yb - 32 * sc - bob; c.moveTo(p.x + 11 * sc, hy); c.arc(p.x, hy, 11 * sc, 0, Math.PI * 2);
      const sy = yb - 6 * sc - bob * 0.5; c.moveTo(p.x + 17 * sc, sy); c.ellipse(p.x, sy, 17 * sc, 16 * sc, 0, 0, Math.PI, true);
    }
    c.fill();
  }
  /* lightstick: dikelompokkan per warna supaya hanya beberapa stroke */
  const NB = 6; const paths = Array.from({ length: NB }, () => []);
  for (const p of B.crowd) {
    const sc = p.sc * (p.row ? 0.82 : 1) * k0; const yb = by - (p.row ? 26 : 2) * sc;
    const ci = fev ? Math.floor(((B.rt * 160 + p.x) % 360) / 60) % NB : p.ci;
    for (const sd of (p.two || fev ? [-1, 1] : [1])) {
      const a = Math.sin(Math.PI * g * sp + p.ph) * 0.55 * sd + sd * 0.15; const hx = p.x + sd * 12 * sc, hy = yb - 30 * sc; const len = 28 * sc;
      paths[ci].push(hx, hy, hx + Math.sin(a) * len, hy - Math.cos(a) * len);
    }
  }
  c.globalCompositeOperation = 'lighter'; c.lineCap = 'round';
  const cols = fev ? ['#ff5f5f', '#ffd25f', '#7dff6a', '#5fe8ff', '#7a7dff', '#ff5fd8'] : ['#ff5fb0', '#5fe8ff', '#ffe36a', '#b28cff', '#7dffb0', '#ff5fb0'];
  for (let k = 0; k < NB; k++) {
    const a = paths[k]; if (!a.length) continue; c.strokeStyle = cols[k]; c.beginPath();
    for (let q = 0; q < a.length; q += 4) { c.moveTo(a[q], a[q + 1]); c.lineTo(a[q + 2], a[q + 3]); }
    c.globalAlpha = 0.22 * inten; c.lineWidth = 10 * k0; c.stroke(); c.globalAlpha = 0.9; c.lineWidth = 3.4 * k0; c.stroke();
  }
  c.restore();
}
function trackPath(c, u0, u1, l0, l1) {
  const p0 = proj(u0), p1 = proj(u1); const L = B.L; const a = l0 - L.n / 2, b = l1 - L.n / 2;
  c.beginPath(); c.moveTo(L.cx + a * L.laneW * p1.s, p1.y); c.lineTo(L.cx + b * L.laneW * p1.s, p1.y); c.lineTo(L.cx + b * L.laneW * p0.s, p0.y); c.lineTo(L.cx + a * L.laneW * p0.s, p0.y); c.closePath();
}
function drawTrackIdle(c, pulse) { drawTrackBase(c, pulse, null); }
function drawTrack(c, bi, pulse) { drawTrackBase(c, pulse, bi); }
function drawTrackBase(c, pulse, bi) {
  const L = B.L, n = L.n; const top = proj(1);
  const gr = c.createLinearGradient(0, top.y, 0, L.yHit); gr.addColorStop(0, 'rgba(14,6,40,.12)'); gr.addColorStop(1, 'rgba(14,6,40,.7)');
  c.fillStyle = gr; trackPath(c, 0, 1, 0, n); c.fill();
  c.fillStyle = 'rgba(14,6,40,.55)'; c.fillRect(L.cx - L.trackW / 2, L.yHit, L.trackW, L.H - L.yHit);
  /* kilat jalur */
  for (let l = 0; l < n; l++) {
    const age = B.rt - (B.flash[l] || 0); const hold = !!B.held[l];
    if (age < 0.2 || hold) { const al = hold ? 0.32 : 0.4 * (1 - age / 0.2); const lg = c.createLinearGradient(0, L.yHit, 0, L.yHit - (L.yHit - top.y) * 0.6); lg.addColorStop(0, `rgba(255,140,220,${al})`); lg.addColorStop(1, 'rgba(255,140,220,0)'); c.fillStyle = lg; trackPath(c, 0, 0.6, l, l + 1); c.fill(); c.fillStyle = `rgba(255,170,230,${al * 0.8})`; c.fillRect(L.cx + (l - n / 2) * L.laneW, L.yHit, L.laneW, L.H - L.yHit); }
  }
  c.strokeStyle = 'rgba(255,255,255,.13)'; c.lineWidth = 1;
  for (let l = 1; l < n; l++) { const a = l - n / 2; c.beginPath(); c.moveTo(L.cx + a * L.laneW * top.s, top.y); c.lineTo(L.cx + a * L.laneW, L.yHit); c.lineTo(L.cx + a * L.laneW, L.H); c.stroke(); }
  /* garis ketukan */
  if (bi && bi.bar && B.song) {
    const g0 = Math.ceil(bi.g); const now = bi.tm;
    for (let gg = g0; gg < g0 + 16; gg++) { const tm = gTime(gg); const u = (tm - now) / B.D.travel; if (u > 1) break; if (u < 0) continue; const p = proj(u); const hw = L.trackW / 2 * p.s; c.strokeStyle = gg % 4 === 0 ? 'rgba(255,255,255,.28)' : 'rgba(255,255,255,.09)'; c.lineWidth = gg % 4 === 0 ? 2 : 1; c.beginPath(); c.moveTo(L.cx - hw, p.y); c.lineTo(L.cx + hw, p.y); c.stroke(); }
  }
  /* tepi neon */
  c.save(); c.globalCompositeOperation = 'lighter'; c.lineCap = 'round';
  const fev = B.fever; const hw0 = L.trackW / 2 * top.s, hw1 = L.trackW / 2;
  [[-1, fev ? `hsl(${(B.rt * 150) % 360},100%,65%)` : '#ff5fb0'], [1, fev ? `hsl(${(B.rt * 150 + 180) % 360},100%,65%)` : '#5fe8ff']].forEach(([sd, col]) => {
    c.strokeStyle = col; c.globalAlpha = 0.25 + 0.2 * pulse; c.lineWidth = 9; c.beginPath(); c.moveTo(L.cx + sd * hw0, top.y); c.lineTo(L.cx + sd * hw1, L.yHit); c.stroke();
    c.globalAlpha = 0.95; c.lineWidth = 2.4; c.beginPath(); c.moveTo(L.cx + sd * hw0, top.y); c.lineTo(L.cx + sd * hw1, L.yHit); c.lineTo(L.cx + sd * hw1, L.H); c.stroke();
  });
  /* garis penilaian */
  const jl = c.createLinearGradient(L.cx - hw1, 0, L.cx + hw1, 0); jl.addColorStop(0, '#ff5fb0'); jl.addColorStop(0.5, '#ffffff'); jl.addColorStop(1, '#5fe8ff');
  c.globalAlpha = 0.35 + 0.35 * pulse; c.fillStyle = jl; c.fillRect(L.cx - hw1 - 6, L.yHit - 9, L.trackW + 12, 18);
  c.globalAlpha = 1; c.fillRect(L.cx - hw1 - 4, L.yHit - 2.5, L.trackW + 8, 5);
  c.restore();
  c.fillStyle = '#fff'; [-1, 1].forEach(sd => { c.save(); c.translate(L.cx + sd * (hw1 + 4), L.yHit); c.rotate(Math.PI / 4); c.fillRect(-6, -6, 12, 12); c.restore(); });
  /* label tombol */
  if (!B.touch || L.W >= 900) {
    const keys = KEYS[n]; c.font = `800 13px ${B.ui}`; c.textAlign = 'center'; c.textBaseline = 'middle';
    for (let l = 0; l < n; l++) { const x = laneX(l, 1), y = L.yHit + 34; const on = !!B.held[l]; c.fillStyle = on ? 'rgba(255,140,220,.55)' : 'rgba(255,255,255,.12)'; rr(c, x - 17, y - 15, 34, 30, 9); c.fill(); c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 1; c.stroke(); c.fillStyle = '#fff'; c.fillText(keys[l], x, y + 1); }
  }
}
function drawCombo(c) {
  if (B.combo < 3) return; const L = B.L, A = L.comboAt; const pop = Math.max(0, 1 - (B.rt - B.comboT) / 0.15);
  c.save(); c.translate(A.x, A.y); c.scale(1 + pop * 0.18, 1 + pop * 0.18); c.textAlign = 'center'; c.textBaseline = 'middle';
  c.globalAlpha = A.side ? 0.95 : 0.55; const fs = A.fs || (A.side ? 64 : Math.min(58, L.W * 0.14));
  c.font = `italic 900 ${fs}px ${B.ui}`;
  const gr = c.createLinearGradient(0, -fs / 2, 0, fs / 2); if (B.fever) { gr.addColorStop(0, `hsl(${(B.rt * 200) % 360},100%,75%)`); gr.addColorStop(1, `hsl(${(B.rt * 200 + 120) % 360},100%,62%)`); } else { gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#ff9ad5'); }
  c.lineWidth = fs * 0.12; c.strokeStyle = 'rgba(40,8,60,.85)'; c.strokeText(B.combo, 0, 0); c.fillStyle = gr; c.fillText(B.combo, 0, 0);
  c.font = `italic 800 ${fs * 0.26}px ${B.ui}`; c.fillStyle = B.fever ? '#ffe36a' : '#ffd0ec'; c.fillText(B.fever ? 'FEVER COMBO' : 'COMBO', 0, fs * 0.66);
  c.restore();
}
function drawNotes(c) {
  const L = B.L; const now = (B.phase === 'pause' || B.phase === 'resume') ? B.pauseAt : B.now; const tr = B.D.travel; const vis = [];
  for (const n of B.notes) {
    const u = (n.t - now) / tr; if (u > 1.04) break;
    const uEnd = (n.t + n.dur - now) / tr;
    if (n.done && !n.hd && (n.res === 'hit' || n.res === 'miss') && uEnd < 0) continue;
    if (n.done && n.res !== 'hold' && n.res !== 'broke' && now - n.doneT > 0.9) continue;
    if (u < -0.28 && uEnd < -0.28) continue; vis.push([n, u]);
  }
  vis.sort((a, b) => b[1] - a[1]);
  const fev = B.fever;
  for (const [n, u] of vis) {
    const word = n.kind === 'word'; const lw = L.laneW;
    /* ekor not tahan */
    if (n.dur && n.res !== 'fade' && n.res !== 'bad' && n.res !== 'show' && !(n.res === 'hit' && n.kind === 'word' && !n.hd && now > n.t + n.dur)) {
      const hu = n.hd ? 0 : n.res === 'broke' ? Math.max(u, (n.brokeT - now) / tr) : u; const eu = Math.min(1.04, (n.t + n.dur - now) / tr);
      if (eu > hu && !(n.res === 'hit' && !n.hd)) {
        const p0 = proj(Math.max(-0.28, hu)), p1 = proj(eu); const x0 = laneX(n.lane, p0.s), x1 = laneX(n.lane, p1.s); const w0 = lw * 0.34 * p0.s, w1 = lw * 0.34 * p1.s;
        const gr = c.createLinearGradient(0, p0.y, 0, p1.y); const base = word ? '255,120,200' : '150,255,140'; const al = n.res === 'broke' ? 0.25 : n.hd ? 0.85 : 0.6;
        gr.addColorStop(0, `rgba(${base},${al})`); gr.addColorStop(1, `rgba(${base},${al * 0.45})`);
        c.fillStyle = gr; c.beginPath(); c.moveTo(x0 - w0, p0.y); c.lineTo(x1 - w1, p1.y); c.lineTo(x1 + w1, p1.y); c.lineTo(x0 + w0, p0.y); c.closePath(); c.fill();
        c.strokeStyle = `rgba(255,255,255,${al * 0.8})`; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, p0.y); c.lineTo(x1, p1.y); c.stroke();
        if (n.hd && Math.random() < 0.5) burst(laneX(n.lane, 1), L.yHit, word ? '#ff9ad5' : '#d9ff6a', 1);
      }
    }
    let uu = u, alpha = 1, sc = 1;
    if (n.hd) uu = 0;
    if (n.done && !n.hd) {
      const age = now - n.doneT;
      if (n.res === 'hit') continue;
      if (n.res === 'broke') { alpha = 0.35; }
      if (n.res === 'fade') { alpha = Math.max(0, 1 - age / 0.35); sc = 1 + age * 0.6; }
      if (n.res === 'bad') { alpha = Math.max(0, 1 - age / 0.6); }
      if (n.res === 'show') { alpha = age < 0.5 ? 1 : Math.max(0, 1 - (age - 0.5) / 0.4); }
      if (n.res === 'miss') { alpha = Math.max(0, 0.6 - age); }
    }
    if (alpha <= 0.01) continue;
    const p = proj(uu); const s = p.s; let x = laneX(n.lane, s); const y = p.y;
    if (n.res === 'bad') x += Math.sin(B.rt * 60) * 4 * alpha;
    c.save(); c.globalAlpha = alpha * Math.min(1, (1.04 - u) * 6);
    if (word) {
      const w = lw * 0.9 * s * sc, h = lw * 0.5 * s * sc;
      if (fev || n.res === 'show' || n.hd) { c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = n.res === 'show' ? 'rgba(80,255,160,.55)' : fev ? `hsla(${(B.rt * 160 + n.lane * 60) % 360},100%,60%,.5)` : 'rgba(255,120,200,.5)'; rr(c, x - w / 2 - 6 * s, y - h / 2 - 6 * s, w + 12 * s, h + 12 * s, 14 * s); c.fill(); c.restore(); }
      const sp = noteSpr(n, n.res === 'bad' ? 'bad' : n.res === 'show' ? 'show' : 'n'); const k = s * sc; c.drawImage(sp.cv, x - sp.w * k / 2, y - sp.h * k / 2, sp.w * k, sp.h * k);
    } else {
      const w = lw * 0.86 * s, h = Math.max(6, lw * 0.18 * s); const hold = n.kind === 'hold';
      if (fev) { c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = `hsla(${(B.rt * 160 + n.lane * 60) % 360},100%,60%,.45)`; rr(c, x - w / 2 - 5, y - h / 2 - 5, w + 10, h + 10, h); c.fill(); c.restore(); }
      const gr = c.createLinearGradient(0, y - h / 2, 0, y + h / 2); if (hold) { gr.addColorStop(0, '#f2ff9a'); gr.addColorStop(1, '#3fdc86'); } else { gr.addColorStop(0, '#bffcff'); gr.addColorStop(1, '#2a8dff'); }
      c.fillStyle = gr; rr(c, x - w / 2, y - h / 2, w, h, h / 2); c.fill(); c.lineWidth = Math.max(1.2, 2.2 * s); c.strokeStyle = '#141040'; c.stroke();
      c.fillStyle = 'rgba(255,255,255,.85)'; c.fillRect(x - w * 0.3, y - 1, w * 0.6, 2);
    }
    c.restore();
  }
}
/* sprite not hanzi (dirender sekali per varian, lalu diskalakan — fillText tiap frame itu mahal) */
function noteSpr(n, v) {
  const lw = B.L.laneW; const cache = n.spr || (n.spr = {}); const o = cache[v]; if (o && o.lw === lw) return o;
  const w = lw * 0.9, h = lw * 0.5, pad = 4; const d = Math.min(2, B.dpr * 1.25); const cv = document.createElement('canvas');
  cv.width = Math.ceil((w + pad * 2) * d); cv.height = Math.ceil((h + pad * 2) * d); const c = cv.getContext('2d'); c.scale(d, d); c.translate(pad, pad);
  const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, v === 'bad' ? '#ffb3c2' : v === 'show' ? '#c9ffe0' : '#ffd9ec');
  c.fillStyle = gr; rr(c, 0, 0, w, h, 10); c.fill(); c.lineWidth = 3; c.strokeStyle = v === 'show' ? '#1fd47a' : v === 'bad' ? '#ff3355' : '#ff4fa3'; c.stroke();
  c.fillStyle = 'rgba(255,255,255,.75)'; rr(c, 4, 3, w - 8, h * 0.22, 6); c.fill();
  const len = [...n.zh].length; const fs = Math.min(lw * 0.8 / len, lw * 0.38);
  c.fillStyle = '#2b1240'; c.font = `700 ${fs}px ${B.hz}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(n.zh, w / 2, h / 2 + fs * 0.05);
  return (cache[v] = { cv, w: w + pad * 2, h: h + pad * 2, lw });
}
function drawFx(c, dt) {
  c.save(); c.globalCompositeOperation = 'lighter';
  for (let k = B.rings.length - 1; k >= 0; k--) { const r = B.rings[k]; r.age += dt; if (r.age > 0.4) { B.rings.splice(k, 1); continue; } const f = r.age / 0.4; c.strokeStyle = r.col; c.globalAlpha = 1 - f; c.lineWidth = 4 * (1 - f) + 1; c.beginPath(); c.ellipse(r.x, r.y, 14 + f * 60, (14 + f * 60) * 0.42, 0, 0, Math.PI * 2); c.stroke(); }
  for (let k = B.parts.length - 1; k >= 0; k--) {
    const p = B.parts[k]; p.age += dt; if (p.age > p.life) { B.parts.splice(k, 1); continue; } const f = p.age / p.life;
    p.x += p.vx * dt; p.y += p.vy * dt;
    if (p.ty === 'conf') { p.rot += p.vr * dt; c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1 - f * f; c.fillStyle = p.col; c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.fillRect(-p.sz / 2, -p.sz / 4, p.sz, p.sz / 2); c.restore(); c.globalCompositeOperation = 'lighter'; continue; }
    p.vy += 520 * dt; p.vx *= 0.97;
    c.globalAlpha = 1 - f; c.fillStyle = p.col; c.strokeStyle = p.col;
    if (p.ty === 'star') star4(c, p.x, p.y, p.sz * (1 - f * 0.5), p.rot + f * 4);
    else { c.lineWidth = 2.4; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x - p.vx * 0.03, p.y - p.vy * 0.03); c.stroke(); }
  }
  c.restore();
  c.save(); c.textAlign = 'center'; c.textBaseline = 'middle';
  for (let k = B.floats.length - 1; k >= 0; k--) { const f = B.floats[k]; const age = B.rt - f.at; if (age > 1.1) { B.floats.splice(k, 1); continue; } c.globalAlpha = Math.min(1, (1.1 - age) * 3); const fs = f.big ? 20 : 15; c.font = `800 ${fs}px ${f.big ? B.hz : B.ui}`; c.lineWidth = 4; c.strokeStyle = 'rgba(40,8,60,.85)'; const yy = f.y - age * 46; c.strokeText(f.txt, clamp(f.x, 90, B.L.W - 90), yy); c.fillStyle = f.col; c.fillText(f.txt, clamp(f.x, 90, B.L.W - 90), yy); }
  c.restore();
}
function drawJudge(c) {
  const J = B.jt; if (!J) return; const age = B.rt - J.at; if (age > 0.6) return; const L = B.L;
  const pop = age < 0.1 ? 1.45 - age * 4.5 : 1; const al = age > 0.42 ? 1 - (age - 0.42) / 0.18 : 1;
  const fs = Math.min(46, L.W * 0.1); const y = L.yHit - (L.yHit - L.yTop) * 0.22 - age * 14;
  c.save(); c.translate(L.cx, y); c.transform(1, 0, -0.18, 1, 0, 0); c.scale(pop, pop); c.globalAlpha = al; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.font = `italic 900 ${fs}px ${B.ui}`; const txt = JNAME[J.j];
  const gr = c.createLinearGradient(0, -fs / 2, 0, fs / 2);
  if (J.j === 'P') { gr.addColorStop(0, '#fff6a8'); gr.addColorStop(0.5, '#ff9ad5'); gr.addColorStop(1, '#b28cff'); }
  else if (J.j === 'G') { gr.addColorStop(0, '#e0fbff'); gr.addColorStop(1, '#3fb5ff'); }
  else if (J.j === 'D') { gr.addColorStop(0, '#e8ffe0'); gr.addColorStop(1, '#45d47a'); }
  else { gr.addColorStop(0, '#d9d4ec'); gr.addColorStop(1, '#7b72a8'); }
  c.lineJoin = 'round'; c.lineWidth = fs * 0.3; c.strokeStyle = 'rgba(30,6,50,.9)'; c.strokeText(txt, 0, 0); c.lineWidth = fs * 0.13; c.strokeStyle = '#fff'; c.strokeText(txt, 0, 0); c.fillStyle = gr; c.fillText(txt, 0, 0);
  c.restore();
}
function drawCount(c, bi) {
  const L = B.L; let txt = null, age = 0;
  if (B.phase === 'resume') { const left = B.resumeAt - B.rt; txt = String(Math.max(1, Math.ceil(left / 0.5))); age = 0.5 - (left % 0.5); }
  else if (bi.tm < 0) { txt = 'READY'; age = 0.2; }
  else if (bi.bar && B.song.bars.indexOf(bi.bar) === 0) { const k = Math.floor(bi.b); txt = ['3', '2', '1', 'GO!'][k]; age = (bi.b - k) * 60 / bi.bar.bpm; }
  if (!txt) return;
  const pop = age < 0.12 ? 1.6 - age * 5 : 1; const fs = Math.min(110, L.W * 0.24) * (txt.length > 2 ? 0.6 : 1);
  c.save(); c.translate(L.cx, (L.yTop + L.yHit) / 2); c.transform(1, 0, -0.15, 1, 0, 0); c.scale(pop, pop); c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `italic 900 ${fs}px ${B.ui}`;
  const gr = c.createLinearGradient(0, -fs / 2, 0, fs / 2); gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#ff7ac8');
  c.lineJoin = 'round'; c.lineWidth = fs * 0.22; c.strokeStyle = 'rgba(40,8,60,.9)'; c.strokeText(txt, 0, 0); c.fillStyle = gr; c.fillText(txt, 0, 0); c.restore();
}
function drawCut(c, age) {
  const L = B.L; const f = age / 1.2; const inA = Math.min(1, age / 0.15), outA = f > 0.8 ? (1 - f) / 0.2 : 1; const bh = Math.min(150, L.H * 0.2);
  c.save(); c.globalAlpha = inA * outA; c.translate(L.W / 2, L.H * 0.42); c.rotate(-0.12);
  const gr = c.createLinearGradient(-L.W, 0, L.W, 0); gr.addColorStop(0, 'rgba(255,60,170,.92)'); gr.addColorStop(0.5, 'rgba(120,60,255,.92)'); gr.addColorStop(1, 'rgba(40,200,255,.92)');
  c.fillStyle = gr; c.fillRect(-L.W, -bh / 2, L.W * 2, bh); c.fillStyle = '#fff'; c.fillRect(-L.W, -bh / 2 - 5, L.W * 2, 3); c.fillRect(-L.W, bh / 2 + 2, L.W * 2, 3);
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2; for (let k = 0; k < 14; k++) { const yy = -bh / 2 + ((k * 37) % bh); const xx = ((k * 211 + age * 2600) % (L.W * 2)) - L.W; c.beginPath(); c.moveTo(xx, yy); c.lineTo(xx + 80 + (k % 3) * 40, yy); c.stroke(); }
  c.save(); c.beginPath(); c.rect(-L.W, -bh / 2, L.W * 2, bh); c.clip(); idol(c, -Math.min(L.W * 0.3, 260), bh * 0.95, bh * 1.5, { g: B.rt * 4, fev: true, expr: 'joy', sing: false }); c.restore();
  const tx = (1 - Math.min(1, age / 0.22)) * L.W * 0.6; const fs = Math.min(84, L.W * 0.15);
  c.translate(tx + Math.min(L.W * 0.08, 60), 0); c.transform(1, 0, -0.2, 1, 0, 0); c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `italic 900 ${fs}px ${B.ui}`;
  const tg = c.createLinearGradient(0, -fs / 2, 0, fs / 2); tg.addColorStop(0, '#fff8b0'); tg.addColorStop(1, '#ff8ad0');
  c.lineJoin = 'round'; c.lineWidth = fs * 0.2; c.strokeStyle = 'rgba(40,8,60,.95)'; c.strokeText('FEVER!!', 0, -fs * 0.12); c.fillStyle = tg; c.fillText('FEVER!!', 0, -fs * 0.12);
  c.font = `800 ${fs * 0.24}px ${B.ui}`; c.fillStyle = '#fff'; c.fillText(t('Skor ×1,5'), 0, fs * 0.55);
  c.restore();
}

/* ---------- ONLINE 1v1 (ARNET) ----------
   Host membuat SELURUH chart di makeGo: not (waktu/jalur/durasi), baris soal (W id, opsi jalur, jalur jawaban), mode, kesulitan,
   varian lagu (transpose + variasi melodi). Kedua HP memutar lagu & not yang sama; penilaian tetap lokal.
   Skor/kombo/nyawa/akurasi disiarkan ~5 Hz. FEVER mengirim "serangan" kosmetik (kilau + goyang kecil) ke panggung lawan.
   Nyawa 0 = KO: skor dibekukan, tetap boleh main sampai lagu habis (latihan); bila keduanya KO, ronde selesai. Pemenang = skor tertinggi. */
let lastPool = null;
const OKJ = /^[PGDMpgdm]{0,6}$/;
const numC = (v, a, b) => { v = +v; return isFinite(v) ? clamp(v, a, b) : a; };
function crestH(p, sz) { try { return dlCrest(p.av | 0, sz); } catch (e) { return ''; } }
function vsHudHTML(net) {
  const me = net.me, op = net.opp;
  return `<div class="rb-hud rb-vs" aria-label="VS">
    <div class="rb-vr"><span class="rb-vme">${crestH(me, 'xs')}<b id="rbsc">0</b></span><span class="rb-vsx">VS</span><span class="rb-vop"><b id="rbosc">0</b>${crestH(op, 'xs')}</span></div>
    <div class="rb-tug"><i id="rbtug"></i><em id="rbknot"></em></div>
    <div class="rb-lifes"><span class="rb-life" aria-label="${t('Nyawa')}"><span class="rb-lt"><i id="rblife"></i></span></span><span class="rb-net" id="rbnet">${SV.wifi}</span><span class="rb-lt op"><i id="rbolife"></i></span></div>
  </div>`;
}
function oppChipHTML(net) {
  const op = net.opp;
  return `<div class="rb-oppc" id="rboc">${crestH(op, 'xs')}<div class="rb-ocn"><b>${esc(op.name)}</b><small><span id="rbocc">0</span> COMBO</small></div><span class="rb-oj" id="rboj"></span><span class="rb-oko">KO</span></div>`;
}
function note(msg) {
  const el = B && B.root.querySelector('#rbnote'); if (!el) return;
  el.textContent = msg; el.className = 'rb-note'; void el.offsetWidth; el.className = 'rb-note on';
  clearTimeout(B.noteT); const b = B; B.noteT = setTimeout(() => { if (B === b) el.className = 'rb-note'; }, 2300);
}
/* host: bangun seluruh konten ronde */
function buildGo(pool) {
  const c = cfg(); const prev = B;
  B = { pool: pool || { ids: [] }, mode: c.m, d: c.d, D: DIFF[c.d], retry: [], qi: 0, lastCl: [] };
  try {
    B.song = mkSong(B.D); mkChart(); B.deck = mkDeck();
    if (B.all.length < B.D.lanes + 1) return null;
    const n = B.D.lanes; const q = [];
    for (const x of B.qs) {
      const i = nextWord(); const ds = shuffle(distract(i, n - 1));
      let cl = Math.floor(Math.random() * n); if (B.lastCl.length >= 2 && B.lastCl.every(y => y === cl)) cl = (cl + 1 + Math.floor(Math.random() * (n - 1))) % n;
      B.lastCl = B.lastCl.concat(cl).slice(-2);
      const opts = []; let d = 0; for (let l = 0; l < n; l++) opts.push(l === cl ? i : (ds[d++] != null ? ds[d - 1] : -1));
      q.push([Math.round(x.t * 1000), Math.round(x.spb * 1000), x.bi, cl].concat(opts)); B.qi++;
    }
    return { bt: 1, m: c.m, d: c.d, vk: Math.floor(Math.random() * 6) - 3, vm: Math.random() < 0.5 ? 1 : 0, src: String((pool && pool.name) || '').slice(0, 40),
      nt: B.notes.map(o => [Math.round(o.t * 1000), o.lane, Math.round(o.dur * 1000)]), q };
  } catch (e) { console.warn('beat go', e); return null; }
  finally { B = prev; }
}
function loadChart(go) {
  const n = B.D.lanes, bars = B.song.bars, end = B.song.len * 1000 + 500;
  B.notes = (Array.isArray(go.nt) ? go.nt : []).slice(0, 3000).filter(a => Array.isArray(a)).map(a => {
    const dur = numC(a[2], 0, 4000) / 1000; return { t: numC(a[0], 0, end) / 1000, lane: numC(a[1] | 0, 0, n - 1), kind: dur > 0 ? 'hold' : 'tap', dur };
  }).sort((a, b) => a.t - b.t);
  const okW = v => v >= 0 && W[v] && lgTxt(W[v]);
  B.qs = (Array.isArray(go.q) ? go.q : []).slice(0, 300).filter(a => Array.isArray(a)).map(a => {
    const bi = numC(a[2] | 0, 0, bars.length - 1); const tq = numC(a[0], 0, end) / 1000; const spb = numC(a[1], 150, 1200) / 1000;
    const cl = numC(a[3] | 0, 0, n - 1); const opts = []; for (let l = 0; l < n; l++) { const v = a[4 + l] | 0; opts.push(okW(v) ? v : null); }
    return { t: tq, bi, spb, promptAt: tq - B.D.travel - 0.8, sec: bars[bi].sec, pre: { opts, cl } };
  }).filter(q => q.pre.opts[q.pre.cl] != null).sort((a, b) => a.t - b.t);
  B.qs.forEach((q, k) => q.k = k);
  B.nTot = B.notes.length + B.qs.length;
}
function askPre(q) {
  const { opts, cl } = q.pre; const i = opts[cl]; const it = lgWItem(i);
  q.it = it; q.opts = opts; q.cl = cl; q.hold = it.sy.length >= 2 ? q.spb : 0; q.state = 'live';
  q.notes = opts.map((id, l) => id == null ? null : ({ t: q.t, lane: l, kind: 'word', q, id, zh: lgTxt(W[id]), dur: q.hold })).filter(Boolean);
  q.notes.forEach(insNote); B.cur = q; B.wordsN++;
  showPrompt(q);
  if (B.mode === 'dengar') speak(it.zh, 1.5);
}
function goOnline() {
  if (typeof ARNET === 'undefined') return;
  lastPool = B.pool; close(true);
  ARNET.open('beat', { max: 2, min: 2, title: 'Ritme Idol', c1: '#ff4fa3', c2: '#6a4cff',
    makeGo: () => buildGo(lastPool) || { bt: 0 }, onStart: ctx => onlineStart(ctx) });
}
function onlineStart(ctx) {
  const g = ctx.go || {};
  if (g.bt !== 1 || !(g.d >= 0 && g.d <= 2)) { if (B) close(true); try { toast(t('Kata di sumber ini belum cukup.')); } catch (e) {} try { ctx.rematch(); } catch (e) {} return; }
  const go = { bt: 1, m: MODES.some(x => x.k === g.m) ? g.m : 'baca', d: g.d | 0, vk: numC(g.vk | 0, -3, 3), vm: g.vm ? 1 : 0, nt: g.nt, q: g.q, src: String(g.src || '').slice(0, 40) };
  const o = ctx.players.find(p => p.id !== ctx.me.id) || { id: '?', name: t('Lawan'), av: 0 };
  const net = { ctx, go, me: { id: ctx.me.id, name: String(ctx.me.name || '').slice(0, 16), av: ctx.me.av | 0 },
    opp: { id: o.id, name: String(o.name || t('Lawan')).slice(0, 16), av: o.av | 0, s: 0, ds: 0, c: 0, l: 100, a: 1000, f: 0, ko: 0, p: 0, jl: '', jt: -9, fin: null, gone: false },
    last: -9, tug: 0.5, hk: '' };
  open(lastPool || { name: go.src, ids: [] }, net);
  ctx.on(m => { if (B && B.net === net) netMsg(m); });
  ctx.onLeave(id => { if (B && B.net === net && (id === net.opp.id || id === 'host')) netGone(); });
  ctx.onStatus(st => { if (B && B.net === net) { net.down = st === 'down'; B.root.classList.toggle('rb-down', net.down); if (!net.down) netTick(true); } });
}
function netSend(o) { const N = B && B.net; if (!N || N.dead) return; try { N.ctx.send(o); } catch (e) {} }
function snap() { return { s: Math.round(B.score), a: B.wtot ? B.wsum / B.wtot : 0, mc: B.maxCombo, wo: B.wordsOk, wn: B.wordsN, cnt: Object.assign({}, B.cnt), ko: B.ko ? 1 : 0 }; }
function netTick(force) {
  const N = B.net; if (!N || (B.phase !== 'play' && !force) || B.phase === 'end' || !B.song) return;
  if (!force && B.rt - N.last < 0.2) return; N.last = B.rt;
  const sc = B.ko ? B.koSnap : null;
  netSend({ e: 'st', s: sc ? sc.s : Math.round(B.score), c: B.combo, l: Math.round(B.life), a: Math.round((B.wtot ? B.wsum / B.wtot : 1) * 1000), f: B.fever ? 1 : 0, k: B.ko ? 1 : 0, p: Math.round(clamp(B.now / B.song.len, 0, 1) * 1000), j: B.jseq || '' });
  B.jseq = '';
}
function cleanFin(m) {
  const c = m.cnt || {}; const cnt = {}; ['P', 'G', 'D', 'M'].forEach(k => cnt[k] = numC(c[k] | 0, 0, 9999));
  return { s: Math.round(numC(m.s, 0, 9999999)), a: numC(m.a, 0, 1), mc: numC(m.mc | 0, 0, 9999), wo: numC(m.wo | 0, 0, 999), wn: numC(m.wn | 0, 0, 999), cnt, ko: m.ko ? 1 : 0, r: /^[SABC]$/.test(m.r) ? m.r : 'C' };
}
function netMsg(m) {
  const N = B.net, O = N.opp; if (!m || m.from !== O.id) return;
  if (m.e === 'st') {
    if (O.fin) return;
    O.s = Math.round(numC(m.s, 0, 9999999)); O.c = numC(m.c | 0, 0, 9999); O.l = numC(m.l, 0, 100); O.a = numC(m.a, 0, 1000); O.f = m.f ? 1 : 0; O.p = numC(m.p, 0, 1000);
    const j = typeof m.j === 'string' && OKJ.test(m.j) ? m.j : ''; if (j) { O.jl = j[j.length - 1]; O.jt = B.rt; O.jn = (O.jn || 0) + 1; }
    if (m.k && !O.ko) { O.ko = 1; note(t('{n} KO!', { n: O.name })); if (B.ko && B.phase === 'play') later(() => finish(false), 600); }
  } else if (m.e === 'atk') {
    if (B.phase !== 'play' || B.rt - B.atkT < 3) return;
    B.atkT = B.rt; B.shake = Math.max(B.shake, 4); sfx('atk');
    B.root.classList.remove('rb-hit'); void B.root.offsetWidth; B.root.classList.add('rb-hit');
  } else if (m.e === 'fin') {
    if (O.fin) return; O.fin = cleanFin(m); O.s = O.fin.s; O.ko = O.fin.ko;
    if (B.phase === 'end') panelVs();
  }
}
function netGone() {
  const N = B.net; if (N.opp.gone) return; N.opp.gone = true;
  note(t('{n} keluar', { n: N.opp.name })); B.root.classList.add('rb-ogone');
  if (B.phase === 'intro') { /* lawan keluar sebelum mulai: tetap main sendiri */ }
  if (B.phase === 'end') panelVs();
  else if (B.ko && B.phase === 'play') later(() => finish(false), 400);
}
function netKO() {
  if (B.ko) return; B.ko = true; B.koT = B.rt; B.koSnap = snap(); B.koSnap.ko = 1; B.life = 0;
  setFever(false); B.shake = 12; sfx('bad'); note(t('KO — skor dibekukan. Lanjut latihan!'));
  netTick(true);
  if (B.net.opp.ko || B.net.opp.gone) later(() => finish(false), 900);
}
function netFrame() {
  const N = B.net; if (!N || N.dead) return;
  if (B.phase === 'play') netTick(false);
  if (B.phase === 'end' && !N.shown && !N.opp.fin && !N.opp.gone && B.rt - N.endAt > 12) { N.timeout = true; panelVs(); }
  if (B.phase === 'end' && N.mine && !N.opp.fin && B.rt - (N.resend || 0) > 1.5 && B.rt - N.endAt < 15) { N.resend = B.rt; netSend(Object.assign({ e: 'fin' }, N.mine)); }
  if (B.phase === 'play' || B.phase === 'intro') netHud();
}
function netHud() {
  const N = B.net, O = N.opp, R = B.root;
  O.ds += (O.s - O.ds) * 0.25; if (Math.abs(O.s - O.ds) < 1) O.ds = O.s;
  const my = B.ko && B.koSnap ? B.koSnap.s : (B.score || 0);
  const r = (my + 600) / (my + O.s + 1200); N.tug += (r - N.tug) * 0.08;
  const jfresh = B.rt - O.jt < 0.5 ? O.jl : '';
  const key = Math.round(O.ds) + '|' + Math.round(N.tug * 400) + '|' + Math.round(O.l) + '|' + O.c + '|' + O.f + O.ko + (O.gone ? 1 : 0) + '|' + (O.jn || 0) + jfresh;
  if (key === N.hk) return; N.hk = key;
  const q = id => R.querySelector(id);
  const os = q('#rbosc'); if (os) os.textContent = fmtN(Math.round(O.ds));
  const k = q('#rbknot'); if (k) k.style.left = (N.tug * 100).toFixed(1) + '%';
  const tg = q('#rbtug'); if (tg) tg.style.width = (N.tug * 100).toFixed(1) + '%';
  const ol = q('#rbolife'); if (ol) ol.style.width = O.l + '%';
  const oc = q('#rbocc'); if (oc) oc.textContent = O.c;
  const ch = q('#rboc'); if (ch) { ch.classList.toggle('fev', !!O.f && !O.ko); ch.classList.toggle('ko', !!O.ko); ch.classList.toggle('gone', !!O.gone); }
  const oj = q('#rboj'); if (oj && O.jn !== N.jn) { N.jn = O.jn; const L = O.jl.toUpperCase(); oj.textContent = JNAME[L] || ''; oj.className = 'rb-oj on j' + L + (O.jl !== L ? ' w' : ''); void oj.offsetWidth; }
}
function placeOpp() {
  const ch = B.root.querySelector('#rboc'); if (!ch) return; const L = B.L; const cw = 150, chH = 50;
  let x, y;
  if (L.short) { x = L.W - (L.W - L.trackW) / 4 - cw / 2; y = 66; x = Math.min(x, L.W - cw - 12); }
  else if (L.land && L.comboAt.side) { x = L.W - (L.W - L.trackW) / 4 - cw / 2; y = Math.max(140, L.H * 0.3); }
  else { x = L.W - cw - 12; y = L.yTop - chH - 10; }
  ch.style.left = Math.round(Math.max(8, x)) + 'px'; ch.style.top = Math.round(y) + 'px';
}
function netIntro() {
  const N = B.net; B.phase = 'intro'; B.root.className = 'rb-root rb-setup rb-online rb-intro';
  if (!B.A) B.A = audioInit();
  const D = DIFF[N.go.d], M = MODES.find(x => x.k === N.go.m) || MODES[0];
  panel(`<div class="rb-vsin">
    <div class="rb-vside me">${crestH(N.me, 'lg')}<b>${esc(N.me.name)}</b><small>${t('Kamu')}</small></div>
    <div class="rb-vsmid"><b>VS</b><span class="rb-vtag">${t(M.name)} · ${t(D.name)}</span><span class="rb-vtag dim">${D.bpm} BPM · ${t('{n} jalur', { n: D.lanes })}</span></div>
    <div class="rb-vside op">${crestH(N.opp, 'lg')}<b>${esc(N.opp.name)}</b><small>${t('Lawan')}</small></div>
  </div>`);
  later(() => sfx('fever'), 120);
  later(() => { if (B.phase === 'intro') begin(); }, 1900);
}
function armQuit() {
  const xb = B.root.querySelector('.rb-xb');
  if (B.quitArm && B.rt - B.quitArm < 2.5) { netQuit(); return; }
  B.quitArm = B.rt; note(t('Ketuk X sekali lagi untuk keluar dari ronde')); if (xb) { xb.classList.add('arm'); const b = B; setTimeout(() => { if (B === b) xb.classList.remove('arm'); }, 2500); }
}
function netQuit() { const N = B.net; try { N.ctx.leave(); } catch (e) {} close(); }
function netAgain() { const N = B.net; close(true); try { N.ctx.rematch(); } catch (e) {} }
function netFinish() {
  const N = B.net;
  B.phase = 'end'; N.endAt = B.rt; B.endClear = !B.ko; killBus(true); B.root.className = 'rb-root rb-end rb-online'; B.pr.className = 'rb-prompt'; B.fever = false;
  const me = B.ko && B.koSnap ? B.koSnap : snap(); me.ko = B.ko ? 1 : 0;
  const wacc = me.wn ? me.wo / me.wn : 0; let rank = 'C'; if (!B.ko) rank = me.a >= 0.93 && wacc >= 0.9 ? 'S' : me.a >= 0.82 ? 'A' : me.a >= 0.65 ? 'B' : 'C';
  me.r = rank; N.mine = me;
  let pb = false; try { pb = arenaRecord('beat', me.s, me.a); } catch (e) {}
  B.endInfo = { clear: !B.ko, rank, acc: me.a, wacc, pb, xp: 0 };
  netSend(Object.assign({ e: 'fin' }, me)); N.resend = B.rt;
  if (N.opp.fin || N.opp.gone) later(panelVs, 500); else later(() => { if (B.phase === 'end' && !N.shown) panelWait(); }, 500);
}
function panelWait() {
  const N = B.net;
  panel(`<div class="rb-card rb-waitc"><div class="rb-logo sm"><span class="hz">等待</span><b>${t('Menunggu lawan…')}</b></div>
    <div class="rb-wrow">${crestH(N.opp, 'md')}<div><b>${esc(N.opp.name)}</b><small>${t('masih menyelesaikan lagu')}</small></div><span class="rb-wdot"></span></div>
    <div class="rb-fs" style="text-align:center;margin-top:12px"><small>${t('Skor kamu')}</small><b>${fmtN(N.mine.s)}</b></div></div>`);
}
function panelVs() {
  const N = B.net; if (!N || !N.mine) return; N.shown = true;
  const me = N.mine, O = N.opp; const of = O.fin;
  const os = of ? of.s : O.s;
  let res = O.gone && !of ? 'win' : me.s > os ? 'win' : me.s < os ? 'lose' : 'draw';
  if (!N.xp) {
    N.res = res; N.xp = clamp(Math.round(me.wo * 2 + me.mc / 6 + (me.ko ? 0 : 8) + (res === 'win' ? 10 : res === 'draw' ? 4 : 0)), 1, 90);
    B.endInfo.xp = N.xp; try { addXP(N.xp); } catch (e) {}
    B.mood = res === 'lose' ? 'sad' : 'cheer'; later(() => sfx(res === 'lose' ? 'lose' : 'win'), 150);
  } else res = N.res;
  const head = res === 'win' ? t('MENANG!') : res === 'lose' ? t('KALAH…') : t('SERI!');
  const why = O.gone && !of ? t('{n} keluar — kamu menang!', { n: O.name }) : N.timeout && !of ? t('Lawan tidak merespons') : me.ko && of && of.ko ? t('Dua-duanya KO') : me.ko ? t('Kamu KO — skor dibekukan') : of && of.ko ? t('{n} KO', { n: O.name }) : '';
  const om = of || { s: os, a: O.a / 1000, mc: null, wo: null, wn: null, cnt: null, ko: O.ko, r: null };
  const pct = v => v == null ? '—' : Math.round(v * 100) + '%';
  const rows = [
    [t('Akurasi'), me.a, om.a, pct],
    [t('Kombo maks'), me.mc, om.mc, v => v == null ? '—' : v],
    [t('Kata benar'), me.wo, om.wo, (v, w) => v == null ? '—' : v + '/' + w, me.wn, om.wn],
    ['PERFECT', me.cnt.P, om.cnt && om.cnt.P, v => v == null ? '—' : v],
    ['GREAT', me.cnt.G, om.cnt && om.cnt.G, v => v == null ? '—' : v],
    ['MISS', me.cnt.M, om.cnt && om.cnt.M, v => v == null ? '—' : v, null, null, 1]
  ].map(([lab, a, b, f, wa, wb, low]) => { const better = a == null || b == null ? 0 : (low ? a < b : a > b) ? 1 : (low ? a > b : a < b) ? -1 : 0;
    return `<div class="rb-vrow"><b class="${better > 0 ? 'up' : ''}">${f(a, wa)}</b><small>${lab}</small><b class="${better < 0 ? 'up' : ''}">${f(b, wb)}</b></div>`; }).join('');
  const side = (p, st, cls, win) => `<div class="rb-vp ${cls} ${win ? 'win' : ''}">${win ? `<span class="rb-crown">${SV.crown}</span>` : ''}${crestH(p, 'md')}<b class="rb-vn">${esc(p.name)}</b>
    <span class="rb-vsc2">${fmtN(st.s)}</span><span class="rb-vtags">${st.r ? `<i class="rk r${st.r}">${st.r}</i>` : ''}${st.ko ? '<i class="ko">KO</i>' : ''}${cls === 'op' && O.gone ? `<i class="ko">${t('keluar')}</i>` : ''}</span></div>`;
  const miss = B.missed.map(i => { const w = W[i]; if (!w) return ''; const it = lgWItem(i); return `<li><button class="rb-say sm" data-rb="sayw" data-v="${i}" aria-label="${t('Putar ulang')}">${SV.spk}</button><b class="hz">${esc(it.zh)}${lvItemBadge(it, '', 'xs')}</b><span class="rb-mpy">${pyH(it.sy)}</span><small>${esc(it.tr || '')}</small></li>`; }).join('');
  panel(`<div class="rb-card rb-vsc ${res}">
    <div class="rb-vhead"><b>${head}</b>${why ? `<small>${esc(why)}</small>` : ''}</div>
    <div class="rb-vcols">${side(N.me, me, 'me', res === 'win')}<div class="rb-vvs">VS</div>${side(O, om, 'op', res === 'lose')}</div>
    <div class="rb-vstat">${rows}</div>
    <div class="rb-vfoot"><span>XP <b>+${N.xp}</b></span>${B.endInfo.pb ? `<span class="rb-pbn">${SV.star} ${t('Rekor baru!')}</span>` : ''}</div>
    ${miss ? `<div class="rb-lab">${t('Kata yang terlewat')}</div><ul class="rb-miss">${miss}</ul>` : ''}
    <div class="rb-acts"><button class="rb-btn ghost" data-rb="quit">${SV.back} ${t('Keluar')}</button><button class="rb-btn pri" data-rb="vsagain">${SV.redo} ${t('Main lagi')}</button></div>
  </div>`);
}
function drawNet(c, pulse) {
  const L = B.L; const age = B.rt - B.atkT;
  if (age >= 0 && age < 1.9) {
    const f = age / 1.9; const fade = Math.min(1, age / 0.12) * (f > 0.7 ? (1 - f) / 0.3 : 1);
    c.save(); c.globalCompositeOperation = 'lighter';
    const vg = c.createRadialGradient(L.W / 2, L.H / 2, Math.min(L.W, L.H) * 0.4, L.W / 2, L.H / 2, Math.max(L.W, L.H) * 0.75);
    vg.addColorStop(0, 'rgba(255,90,200,0)'); vg.addColorStop(1, `rgba(255,90,200,${0.32 * fade})`); c.fillStyle = vg; c.fillRect(0, 0, L.W, L.H);
    for (let k = 0; k < 26; k++) {
      const side = k % 2 ? 1 : -1; const lane = (k * 0.37) % 1; const mx = (L.W - L.trackW) / 2;
      const x = side < 0 ? lane * Math.max(40, mx) : L.W - lane * Math.max(40, mx); const y = ((k * 97 + age * (160 + (k % 5) * 40)) % (L.H * 0.9));
      c.globalAlpha = fade * (0.55 + 0.45 * Math.sin(age * 12 + k)); c.fillStyle = `hsl(${(k * 47 + B.rt * 200) % 360},100%,72%)`;
      star4(c, x, y, 5 + (k % 4) * 2.5, age * 4 + k);
    }
    c.restore();
    c.save(); c.globalAlpha = fade; c.textAlign = 'center'; c.textBaseline = 'middle'; const fs = Math.min(22, L.W * 0.055);
    c.font = `italic 900 ${fs}px ${B.ui}`; c.translate(L.cx, L.yHit + (L.H - L.yHit) * 0.62 + (1 - Math.min(1, age / 0.2)) * 20); c.transform(1, 0, -0.15, 1, 0, 0);
    const tx = t('{n} FEVER ATTACK!', { n: B.net.opp.name }); c.lineJoin = 'round'; c.lineWidth = fs * 0.3; c.strokeStyle = 'rgba(40,8,60,.9)'; c.strokeText(tx, 0, 0);
    const gr = c.createLinearGradient(0, -fs / 2, 0, fs / 2); gr.addColorStop(0, '#fff6a8'); gr.addColorStop(1, '#ff7ac8'); c.fillStyle = gr; c.fillText(tx, 0, 0); c.restore();
  }
  if (B.ko && (B.phase === 'play')) {
    const a = B.rt - B.koT; const pop = a < 0.25 ? 2 - a * 4 : 1; const L2 = B.L;
    c.save(); c.fillStyle = 'rgba(20,10,40,.28)'; trackPath(c, 0, 1, 0, L2.n); c.fill();
    c.translate(L2.comboAt.x, L2.comboAt.side ? L2.comboAt.y - 70 : (L2.yTop + L2.yHit) * 0.5 - 40); c.rotate(-0.12); c.scale(pop, pop);
    c.globalAlpha = a < 1.5 ? 1 : 0.55; c.textAlign = 'center'; c.textBaseline = 'middle'; const fs = Math.min(64, L2.W * 0.16);
    c.font = `italic 900 ${fs}px ${B.ui}`; c.lineJoin = 'round'; c.lineWidth = fs * 0.22; c.strokeStyle = 'rgba(40,8,60,.95)'; c.strokeText('KO', 0, 0);
    const gr = c.createLinearGradient(0, -fs / 2, 0, fs / 2); gr.addColorStop(0, '#ffd0d8'); gr.addColorStop(1, '#ff3d6e'); c.fillStyle = gr; c.fillText('KO', 0, 0);
    c.font = `800 ${fs * 0.22}px ${B.ui}`; c.fillStyle = '#fff'; c.fillText(t('skor dibekukan'), 0, fs * 0.62); c.restore();
  }
}

/* ---------- daftar ke hub ---------- */
ARENA.reg({
  k: 'beat', ord: 2, title: 'Ritme Idol', zh: '節奏偶像', desc: 'Ketuk hanzi yang benar tepat di garis, ikuti ketukan lagu J-pop!', tags: ['Baca', 'Dengar', 'Pinyin'], c1: '#ff4fa3', c2: '#6a4cff',
  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17.5V6l10-2.2v11.5"/><circle cx="6.6" cy="17.5" r="2.4"/><circle cx="16.6" cy="15.3" r="2.4"/><path d="M4 4.5l.7 1.6 1.6.7-1.6.7L4 9.1l-.7-1.6-1.6-.7 1.6-.7z"/></svg>',
  art: `<svg class="ar-ill" viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="rbA1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a0d5c"/><stop offset="1" stop-color="#7a1a7a"/></linearGradient>
    <linearGradient id="rbA2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="rbA3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff5fb0"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#5fe8ff"/></linearGradient>
    <linearGradient id="rbA4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a0b3d" stop-opacity=".1"/><stop offset="1" stop-color="#1a0b3d" stop-opacity=".75"/></linearGradient></defs>
    <rect width="320" height="150" fill="url(#rbA1)"/>
    <g opacity=".35">${Array.from({ length: 16 }, (_, k) => `<rect x="${k * 20 + 2}" y="6" width="16" height="${18 + (k * 37) % 40}" rx="2" fill="${['#ff5fb0', '#b28cff', '#5fe8ff'][k % 3]}"/>`).join('')}</g>
    <path d="M40 0 L10 150 L80 150Z M150 0 L120 150 L200 150Z M270 0 L230 150 L310 150Z" fill="url(#rbA2)" opacity=".5"/>
    <path d="M130 30 H200 L262 150 H68 Z" fill="url(#rbA4)" stroke="rgba(255,255,255,.5)"/>
    <path d="M147.5 30 L116 150 M165 30 L165 150 M182.5 30 L214 150" stroke="rgba(255,255,255,.2)"/>
    <rect x="66" y="126" width="198" height="6" rx="3" fill="url(#rbA3)"/>
    <g font-family="'Noto Sans TC','PingFang TC',sans-serif" font-weight="800" text-anchor="middle" font-size="15">
      <rect x="128" y="62" width="34" height="22" rx="6" fill="#fff" stroke="#ff4fa3" stroke-width="2.5"/><text x="145" y="78" fill="#2b1240">歌</text>
      <rect x="172" y="62" width="34" height="22" rx="6" fill="#ffe3f1" stroke="#ff4fa3" stroke-width="2.5"/><text x="189" y="78" fill="#2b1240">跳</text>
    </g>
    <rect x="96" y="100" width="40" height="9" rx="4.5" fill="#5fe8ff" stroke="#141040" stroke-width="1.5"/><rect x="198" y="40" width="22" height="6" rx="3" fill="#5fe8ff" stroke="#141040" stroke-width="1.2"/>
    <g transform="translate(272 92)">
      <path d="M-22 -30 L-26 -54 L-8 -40Z M22 -30 L26 -54 L8 -40Z" fill="#F4A9BC" stroke="#6b2147" stroke-width="2" stroke-linejoin="round"/>
      <path d="M-14 6 L-24 34 H24 L14 6Z" fill="#ff4fa3" stroke="#6b2147" stroke-width="2" stroke-linejoin="round"/>
      <path d="M-12 2 h24 v12 h-24z" fill="#fff6fb" stroke="#6b2147" stroke-width="2"/>
      <path d="M12 6 L30 -10" stroke="#6b2147" stroke-width="7" stroke-linecap="round"/><path d="M12 6 L30 -10" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <circle cx="0" cy="-22" r="27" fill="#F4A9BC" stroke="#6b2147" stroke-width="2"/><ellipse cx="0" cy="-18" rx="20" ry="17" fill="#FFFDFC"/>
      <path d="M-12 -20 q4 -6 8 0 M4 -20 q4 -6 8 0" fill="none" stroke="#6b2147" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M-5 -10 q5 7 10 0z" fill="#d94f72"/><ellipse cx="-13" cy="-12" rx="4" ry="2.4" fill="#FBB9C9"/><ellipse cx="13" cy="-12" rx="4" ry="2.4" fill="#FBB9C9"/>
      <path d="M17 -42 l2 4.5 4.8.5-3.6 3.2 1 4.8-4.2-2.5-4.2 2.5 1-4.8-3.6-3.2 4.8-.5z" fill="#ffd84a" stroke="#6b2147" stroke-width="1"/>
    </g>
    <g fill="#fff"><path d="M40 60 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5z"/><path d="M228 22 l1.8 4 4 1.8 -4 1.8 -1.8 4 -1.8 -4 -4 -1.8 4 -1.8z" opacity=".85"/></g>
    <g stroke-linecap="round" stroke-width="4">${Array.from({ length: 11 }, (_, k) => `<circle cx="${k * 30 + 8}" cy="152" r="11" fill="#0d061f"/><path d="M${k * 30 + 16} 140 l${k % 2 ? 7 : -7} -16" stroke="${['#ff5fb0', '#5fe8ff', '#ffe36a', '#b28cff'][k % 4]}"/>`).join('')}</g>
  </svg>`,
  start(pool) { open(pool); }
});
window.BEAT = { get st() { return B; }, close: () => close(), bot(o) { if (B) B.bot = o || { wrong: 4 }; } };
})();