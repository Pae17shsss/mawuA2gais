/* ========== V0.9 · KELAS TEMA — kosakata per kategori (Novice 1 → A2) ==========
   Pilih tema → tabel kata (sembunyikan hanzi/pinyin/arti ala Quizlet) → belajar per set
   (Kenalan → Latihan → Kalimat → Pola → Rangkuman) → Ujian tema (≥ 80% = Lulus).
   Data: TEMA (temadata.js, dibuat oleh /tmp/claude-0/tema/build.py). Kata dirujuk lewat bentuk hanzi → W.
   Progres di S.tema, selalu dikunci dengan k tema & bentuk kata (bukan indeks W). */

/* ---------- ikon tema ---------- */
(function () {
  const P = {
    star: '<path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>',
    food: '<path d="M3.5 11.5h17a8.5 8.5 0 0 1-17 0z"/><path d="M8.5 20.2h7"/><path d="M13.6 3.6l-2.6 6M19 4.2l-5.2 5.6"/>',
    people: '<circle cx="9" cy="8.5" r="3.2"/><path d="M3 19.5c.7-3.2 3.1-5 6-5s5.3 1.8 6 5"/><circle cx="17" cy="9" r="2.6"/><path d="M16.4 14.2c2.4.2 4.1 1.8 4.6 4.6"/>',
    work: '<rect x="3.2" y="7.4" width="17.6" height="12" rx="2"/><path d="M9 7.4V5.6A1.6 1.6 0 0 1 10.6 4h2.8A1.6 1.6 0 0 1 15 5.6v1.8M3.2 12.6h17.6"/>',
    body: '<circle cx="12" cy="5" r="2.2"/><path d="M5 9.2h14M12 9.2v6M12 15.2l-3.4 5.4M12 15.2l3.4 5.4"/>',
    shirt: '<path d="M8.6 3.8 4 6.4l1.8 4 2-.9V20h8.4V9.5l2 .9 1.8-4-4.6-2.6a3.4 3.4 0 0 1-6.8 0z"/>',
    city: '<path d="M3.5 20.5h17M5 20.5V9.5h5v11M10 20.5V4.5h6v16M16 20.5v-8h3.5v8"/><path d="M12.4 8h1.2M12.4 11.5h1.2M12.4 15h1.2M7 12.5h1M7 16h1"/>',
    bus: '<rect x="4.6" y="3.6" width="14.8" height="14.4" rx="2.6"/><path d="M4.6 11h14.8M8 18v2.4M16 18v2.4"/><circle cx="8.3" cy="14.6" r=".9"/><circle cx="15.7" cy="14.6" r=".9"/>',
    coin: '<circle cx="12" cy="12" r="8.2"/><path d="M14.6 9.2c-.5-.9-1.5-1.4-2.6-1.4-1.5 0-2.6.8-2.6 2s1 1.7 2.6 2.1 2.8.9 2.8 2.2-1.2 2.1-2.8 2.1c-1.2 0-2.3-.5-2.8-1.5M12 6.2v1.6M12 16.2v1.6"/>',
    cart: '<path d="M3 4.5h2.4l2.2 10.6h10.2l2-7.6H6.5"/><circle cx="9.4" cy="19" r="1.4"/><circle cx="16.6" cy="19" r="1.4"/>',
    school: '<path d="M3.5 20.5h17M5.5 20.5v-9L12 7l6.5 4.5v9M12 7V3.5h3.4"/><path d="M10 20.5V16h4v4.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.8v2.2M12 19v2.2M2.8 12h2.2M19 12h2.2M5.5 5.5l1.6 1.6M16.9 16.9l1.6 1.6M5.5 18.5l1.6-1.6M16.9 7.1l1.6-1.6"/>',
    paw: '<ellipse cx="12" cy="15.6" rx="4.4" ry="3.8"/><circle cx="6" cy="10.4" r="1.9"/><circle cx="9.6" cy="6.4" r="1.9"/><circle cx="14.4" cy="6.4" r="1.9"/><circle cx="18" cy="10.4" r="1.9"/>',
    ball: '<circle cx="12" cy="12" r="8.2"/><path d="M3.8 12h16.4M12 3.8c2.4 2.2 3.6 5 3.6 8.2s-1.2 6-3.6 8.2M12 3.8C9.6 6 8.4 8.8 8.4 12s1.2 6 3.6 8.2"/>',
    question: '<circle cx="12" cy="12" r="8.2"/><path d="M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5v.6M12 16.8h.01"/>',
    plane: '<path d="M21 4.2 3.6 10.6l6.6 2.6 2.6 6.6z"/><path d="M10.2 13.2 21 4.2"/>',
    eyeoff: '<path d="M3.5 12s3.2-6 8.5-6c1.6 0 3 .5 4.2 1.2M20.5 12s-3.2 6-8.5 6c-1.6 0-3-.5-4.2-1.2"/><path d="M4.5 19.5 19.5 4.5"/>',
    table: '<rect x="3.4" y="4.4" width="17.2" height="15.2" rx="2.2"/><path d="M3.4 9.4h17.2M3.4 14.4h17.2M9.4 9.4v10.2"/>'
  };
  for (const k in P) if (!ICON_PATHS[k]) ICON_PATHS[k] = P[k];
  if (!ICON_PATHS.heart) ICON_PATHS.heart = P.star;
})();
const tmIcon = n => (ICON_PATHS[n] ? n : 'sparkle');

/* ---------- teks UI (ID → EN, TL, VI) ---------- */
(function () {
  const T = {
    'Set {n}': ['Set {n}', 'Set {n}', 'Bộ {n}'],
    'Buka': ['Open', 'Buksan', 'Mở'],
    'Kelas Tema': ['Theme Class', 'Klase ayon sa Tema', 'Lớp theo chủ đề'],
    'Kosakata per kategori: tabel kata, kalimat, pola, lalu ujian tema.': ['Vocabulary by category: word table, sentences, patterns, then a theme test.', 'Bokabularyo ayon sa kategorya: talaan ng salita, pangungusap, pattern, saka pagsusulit.', 'Từ vựng theo chủ đề: bảng từ, câu, mẫu câu, rồi bài kiểm tra chủ đề.'],
    '{a} tema · {b} lulus': ['{a} themes · {b} passed', '{a} tema · {b} pasado', '{a} chủ đề · {b} đã đạt'],
    'Pilih satu tema (benda, makanan, pekerjaan…), lihat tabel katanya, pelajari kata + kalimat + pola grammar-nya, lalu lulus ujian tema.': ['Pick a theme (objects, food, jobs…), look at its word table, learn the words + sentences + grammar patterns, then pass the theme test.', 'Pumili ng tema (gamit, pagkain, trabaho…), tingnan ang talaan ng salita, aralin ang salita + pangungusap + grammar, saka pumasa sa pagsusulit.', 'Chọn một chủ đề (đồ vật, đồ ăn, nghề nghiệp…), xem bảng từ, học từ + câu + ngữ pháp, rồi vượt qua bài kiểm tra chủ đề.'],
    'tema lulus': ['themes passed', 'pasadong tema', 'chủ đề đã đạt'],
    'set selesai': ['sets done', 'tapos na set', 'bộ đã xong'],
    'kata dipelajari': ['words learned', 'salitang napag-aralan', 'từ đã học'],
    'Lanjut: {s}': ['Continue: {s}', 'Ituloy: {s}', 'Tiếp tục: {s}'],
    'Mulai: {s}': ['Start: {s}', 'Simulan: {s}', 'Bắt đầu: {s}'],
    'Tabel kata': ['Word table', 'Talaan ng salita', 'Bảng từ'],
    'Belajar per set': ['Learn set by set', 'Mag-aral bawat set', 'Học từng bộ'],
    'Pola & dialog': ['Patterns & dialogue', 'Pattern at diyalogo', 'Mẫu câu & hội thoại'],
    'Ujian ≥ 80%': ['Test ≥ 80%', 'Pagsusulit ≥ 80%', 'Kiểm tra ≥ 80%'],
    'Tingkat': ['Level', 'Antas', 'Cấp độ'],
    'Semua': ['All', 'Lahat', 'Tất cả'],
    'Tingkat tema = level mayoritas katanya (median).': ['Theme level = the median level of its words.', 'Antas ng tema = median na antas ng mga salita nito.', 'Cấp chủ đề = cấp độ trung vị của các từ.'],
    'Belum ada tema di tingkat ini.': ['No themes at this level yet.', 'Wala pang tema sa antas na ito.', 'Chưa có chủ đề ở cấp này.'],
    'Tema sedang disiapkan — coba lagi nanti.': ['Themes are being prepared — check back soon.', 'Inihahanda pa ang mga tema — balikan mamaya.', 'Chủ đề đang được chuẩn bị — quay lại sau nhé.'],
    '{n} kata': ['{n} words', '{n} salita', '{n} từ'],
    '{n} set': ['{n} sets', '{n} set', '{n} bộ'],
    'Lulus': ['Passed', 'Pasado', 'Đã đạt'],
    'Baru': ['New', 'Bago', 'Mới'],
    'Ujian terbaik {p}%': ['Best test {p}%', 'Pinakamataas {p}%', 'Điểm cao nhất {p}%'],
    '‹ Semua tema': ['‹ All themes', '‹ Lahat ng tema', '‹ Tất cả chủ đề'],
    'Kata': ['Words', 'Salita', 'Từ'],
    'Pola': ['Patterns', 'Pattern', 'Mẫu câu'],
    'Dialog': ['Dialogue', 'Diyalogo', 'Hội thoại'],
    'Belajar Set {n}': ['Learn Set {n}', 'Aralin ang Set {n}', 'Học bộ {n}'],
    'Ujian tema': ['Theme test', 'Pagsusulit ng tema', 'Kiểm tra chủ đề'],
    'Ulangi ujian': ['Retake test', 'Ulitin ang pagsusulit', 'Làm lại bài kiểm tra'],
    'Putar semua': ['Play all', 'I-play lahat', 'Phát tất cả'],
    'Berhenti': ['Stop', 'Ihinto', 'Dừng'],
    'Latih kata berbintang ({n})': ['Practise starred words ({n})', 'Sanayin ang may bituin ({n})', 'Luyện từ gắn sao ({n})'],
    'Latih kata lemah ({n})': ['Practise weak words ({n})', 'Sanayin ang mahihinang salita ({n})', 'Luyện từ yếu ({n})'],
    'Set belajar': ['Learning sets', 'Mga set', 'Các bộ học'],
    'Tiap set: Kenalan → Latihan → Kalimat → Pola → Rangkuman. Kata yang dipelajari masuk kartu ulangan (SRS).': ['Each set: Meet → Practice → Sentences → Pattern → Recap. Learned words go into your review cards (SRS).', 'Bawat set: Kilalanin → Sanayin → Pangungusap → Pattern → Buod. Pumapasok sa review cards (SRS) ang mga salita.', 'Mỗi bộ: Làm quen → Luyện → Câu → Mẫu câu → Tóm tắt. Từ đã học được thêm vào thẻ ôn tập (SRS).'],
    'Belum': ['Not yet', 'Hindi pa', 'Chưa'],
    'Ujian tema · lulus ≥ 80%': ['Theme test · pass ≥ 80%', 'Pagsusulit · pasado ≥ 80%', 'Kiểm tra chủ đề · đạt ≥ 80%'],
    '18 soal campur dari semua kata tema: isi kalimat, pinyin → hanzi, arti → hanzi, hanzi → arti, dengar, susun kalimat, dan KETIK hanzi & pinyin sendiri — tanpa petunjuk.': ['18 mixed questions from every word in the theme: fill the sentence, pinyin → hanzi, meaning → hanzi, hanzi → meaning, listening, sentence building, and TYPING hanzi & pinyin yourself — no hints.', '18 halo-halong tanong mula sa lahat ng salita: punan ang pangungusap, pinyin → hanzi, kahulugan → hanzi, hanzi → kahulugan, pakikinig, pagbuo ng pangungusap, at PAG-TYPE ng hanzi at pinyin — walang pahiwatig.', '18 câu hỏi trộn từ mọi từ trong chủ đề: điền câu, pinyin → chữ Hán, nghĩa → chữ Hán, chữ Hán → nghĩa, nghe, sắp xếp câu, và TỰ GÕ chữ Hán & pinyin — không gợi ý.'],
    'Lulus {d} · skor terbaik {p}%': ['Passed {d} · best score {p}%', 'Pumasa {d} · pinakamataas {p}%', 'Đạt ngày {d} · điểm cao nhất {p}%'],
    'Skor terbaik {p}% · butuh 80%': ['Best score {p}% · need 80%', 'Pinakamataas {p}% · kailangan 80%', 'Điểm cao nhất {p}% · cần 80%'],
    'Belum dicoba. Saran: selesaikan semua set dulu.': ['Not taken yet. Tip: finish all sets first.', 'Hindi pa nasusubukan. Payo: tapusin muna ang lahat ng set.', 'Chưa làm. Gợi ý: học xong các bộ trước.'],
    'Mulai ujian': ['Start test', 'Simulan ang pagsusulit', 'Bắt đầu kiểm tra'],
    'Sembunyikan': ['Hide', 'Itago', 'Ẩn'],
    'Arti': ['Meaning', 'Kahulugan', 'Nghĩa'],
    'Kata ukur': ['Measure word', 'Pambilang', 'Lượng từ'],
    'Ketuk sel yang disembunyikan untuk mengintip — cara cepat menguji diri.': ['Tap a hidden cell to peek — a quick way to test yourself.', 'I-tap ang nakatagong cell para sumilip — mabilis na pagsusuri sa sarili.', 'Chạm ô bị ẩn để xem — cách tự kiểm tra nhanh.'],
    'Ketuk untuk melihat': ['Tap to reveal', 'I-tap para makita', 'Chạm để xem'],
    'Bintangi': ['Star', 'Lagyan ng bituin', 'Gắn sao'],
    'Berbintang': ['Starred', 'May bituin', 'Đã gắn sao'],
    'Tandai sudah hafal': ['Mark as known', 'Markahang alam na', 'Đánh dấu đã thuộc'],
    'Sudah hafal': ['Known', 'Alam na', 'Đã thuộc'],
    'Kartu kata lengkap': ['Full word card', 'Buong word card', 'Thẻ từ đầy đủ'],
    'Latih menulis': ['Practise writing', 'Sanayin ang pagsulat', 'Luyện viết'],
    'Putar suara': ['Play audio', 'I-play ang tunog', 'Phát âm thanh'],
    'per suku kata': ['syllable by syllable', 'pantig-pantig', 'từng âm tiết'],
    'Latih pola ini': ['Practise this pattern', 'Sanayin ang pattern na ito', 'Luyện mẫu câu này'],
    'Contoh': ['Examples', 'Halimbawa', 'Ví dụ'],
    'Putar dialog': ['Play dialogue', 'I-play ang diyalogo', 'Phát hội thoại'],
    'Terjemahan': ['Translation', 'Salin', 'Bản dịch'],
    'Peran': ['Role', 'Papel', 'Vai'],
    'Nonton': ['Watch', 'Manood', 'Xem'],
    'Giliranmu — ucapkan dulu, lalu ketuk': ['Your turn — say it, then tap', 'Ikaw na — sabihin muna, saka i-tap', 'Đến lượt bạn — nói trước rồi chạm'],
    'ketuk untuk arti': ['tap for meaning', 'i-tap para sa kahulugan', 'chạm để xem nghĩa'],
    'Kenalan': ['Meet', 'Kilalanin', 'Làm quen'],
    'Latihan': ['Practice', 'Sanayin', 'Luyện tập'],
    'Kalimat': ['Sentences', 'Pangungusap', 'Câu'],
    'Rangkuman': ['Recap', 'Buod', 'Tóm tắt'],
    'Apa artinya?': ['What does it mean?', 'Ano ang kahulugan?', 'Nghĩa là gì?'],
    'Pilih hanzinya': ['Choose the hanzi', 'Piliin ang hanzi', 'Chọn chữ Hán'],
    'Pinyin ini hanzinya yang mana?': ['Which hanzi is this pinyin?', 'Aling hanzi ang pinyin na ito?', 'Pinyin này là chữ Hán nào?'],
    'Dengar, lalu pilih hanzinya': ['Listen, then choose the hanzi', 'Makinig, saka piliin ang hanzi', 'Nghe rồi chọn chữ Hán'],
    'Lengkapi kalimatnya': ['Complete the sentence', 'Kumpletuhin ang pangungusap', 'Hoàn thành câu'],
    'Ketik hanzinya': ['Type the hanzi', 'I-type ang hanzi', 'Gõ chữ Hán'],
    'Ketik kata yang hilang': ['Type the missing word', 'I-type ang nawawalang salita', 'Gõ từ còn thiếu'],
    'Dengar, lalu ketik pinyin-nya': ['Listen, then type the pinyin', 'Makinig, saka i-type ang pinyin', 'Nghe rồi gõ pinyin'],
    'Ketik pinyin-nya': ['Type the pinyin', 'I-type ang pinyin', 'Gõ pinyin'],
    'ketik hanzi di sini': ['type hanzi here', 'i-type ang hanzi dito', 'gõ chữ Hán ở đây'],
    'Jawaban hanzi': ['Hanzi answer', 'Sagot na hanzi', 'Câu trả lời chữ Hán'],
    'Pakai keyboard Mandarin 注音/拼音 (karakter tradisional) di HP/laptopmu. Tanpa petunjuk — ingat sendiri!': ['Use your own Chinese keyboard 注音/拼音 (traditional characters). No hints — recall it yourself!', 'Gamitin ang sariling Chinese keyboard 注音/拼音 (tradisyonal). Walang pahiwatig — alalahanin mo!', 'Dùng bàn phím tiếng Trung 注音/拼音 (phồn thể) của bạn. Không gợi ý — tự nhớ nhé!'],
    'Tidak tahu': ["Don't know", 'Hindi alam', 'Không biết'],
    'Periksa': ['Check', 'Suriin', 'Kiểm tra'],
    'Jawabanmu': ['Your answer', 'Sagot mo', 'Câu trả lời của bạn'],
    'Hurufnya sudah benar — tinggal nadanya.': ['The letters are right — just the tones.', 'Tama ang mga titik — tono na lang.', 'Chữ cái đúng rồi — chỉ sai thanh điệu.'],
    'Hampir! Itu bentuk sederhana (简体) — di Taiwan pakai karakter tradisional.': ['Almost! That is the simplified form — Taiwan uses traditional characters.', 'Muntik na! Simplified iyan — tradisyonal ang gamit sa Taiwan.', 'Gần đúng! Đó là chữ giản thể — Đài Loan dùng chữ phồn thể.'],
    'Angka 1–4 untuk nada (atau tanda nada), spasi boleh tidak. ü bisa diketik v.': ['Digits 1–4 for tones (or tone marks); spaces optional. Type ü as v.', 'Numero 1–4 para sa tono (o tone mark); opsyonal ang espasyo. I-type ang ü bilang v.', 'Số 1–4 cho thanh điệu (hoặc dấu); không cần dấu cách. Gõ ü bằng v.'],
    'Pola kalimat': ['Sentence pattern', 'Pattern ng pangungusap', 'Mẫu câu'],
    'Paham, lanjut': ['Got it, next', 'Gets ko, tuloy', 'Hiểu rồi, tiếp'],
    'Rangkuman set': ['Set recap', 'Buod ng set', 'Tóm tắt bộ'],
    'Kata-kata ini sudah masuk kartu ulanganmu. Ucapkan sekali lagi sambil melihat tabelnya.': ['These words are now in your review cards. Say them once more while looking at the table.', 'Nasa review cards mo na ang mga salitang ito. Bigkasin muli habang tinitingnan ang talaan.', 'Các từ này đã vào thẻ ôn tập. Đọc lại một lần khi nhìn bảng.'],
    'Selesai': ['Finish', 'Tapos', 'Xong'],
    'Set {n} selesai ({p}%)': ['Set {n} done ({p}%)', 'Tapos ang Set {n} ({p}%)', 'Xong bộ {n} ({p}%)'],
    'Skor {p}% — ulangi set ini sekali lagi supaya lebih nempel (butuh 60%).': ['Score {p}% — repeat this set once more so it sticks (need 60%).', 'Iskor {p}% — ulitin ang set para tumatak (kailangan 60%).', 'Điểm {p}% — học lại bộ này để nhớ lâu hơn (cần 60%).'],
    'Semua set selesai — saatnya ujian tema!': ['All sets done — time for the theme test!', 'Tapos ang lahat ng set — oras na ng pagsusulit!', 'Đã học xong các bộ — đến lúc kiểm tra chủ đề!'],
    'Set berikutnya': ['Next set', 'Susunod na set', 'Bộ tiếp theo'],
    'Lulus! Tema ini selesai': ['Passed! Theme complete', 'Pasado! Tapos ang tema', 'Đạt! Hoàn thành chủ đề'],
    'Belum lulus — butuh 80%': ['Not passed yet — need 80%', 'Hindi pa pasado — kailangan 80%', 'Chưa đạt — cần 80%'],
    '{a}/{b} benar': ['{a}/{b} correct', '{a}/{b} tama', '{a}/{b} đúng'],
    'Skor terbaik {p}%': ['Best score {p}%', 'Pinakamataas {p}%', 'Điểm cao nhất {p}%'],
    'Lulus sejak {d}': ['Passed on {d}', 'Pumasa noong {d}', 'Đạt từ ngày {d}'],
    'Ulangi kata yang salah, lalu coba lagi — kamu pasti bisa.': ['Review the missed words, then try again — you can do it.', 'Balikan ang mga mali, saka subukan muli — kaya mo iyan.', 'Ôn lại các từ sai rồi thử lại — bạn làm được mà.'],
    'Membaca': ['Reading', 'Pagbasa', 'Đọc'],
    'Mendengar': ['Listening', 'Pakikinig', 'Nghe'],
    'Mengetik': ['Typing', 'Pag-type', 'Gõ chữ'],
    'Periksa yang salah ({n})': ['Review mistakes ({n})', 'Suriin ang mga mali ({n})', 'Xem lại câu sai ({n})'],
    'Semua benar — sempurna!': ['All correct — perfect!', 'Lahat tama — perpekto!', 'Đúng hết — hoàn hảo!'],
    'Jawaban benar': ['Correct answer', 'Tamang sagot', 'Đáp án đúng'],
    'Kembali ke tema': ['Back to theme', 'Bumalik sa tema', 'Quay lại chủ đề'],
    'Latih kata yang salah': ['Practise missed words', 'Sanayin ang mga mali', 'Luyện các từ sai'],
    'Lengkapi kalimat': ['Complete the sentence', 'Kumpletuhin', 'Hoàn thành câu'],
    'Pinyin → hanzi': ['Pinyin → hanzi', 'Pinyin → hanzi', 'Pinyin → chữ Hán'],
    'Arti → hanzi': ['Meaning → hanzi', 'Kahulugan → hanzi', 'Nghĩa → chữ Hán'],
    'Hanzi → arti': ['Hanzi → meaning', 'Hanzi → kahulugan', 'Chữ Hán → nghĩa'],
    'Dengar → hanzi': ['Listen → hanzi', 'Pakinig → hanzi', 'Nghe → chữ Hán'],
    'Ketik hanzi': ['Type hanzi', 'I-type ang hanzi', 'Gõ chữ Hán'],
    'Susun kalimat': ['Build the sentence', 'Buuin ang pangungusap', 'Sắp xếp câu'],
    'Dengar → ketik pinyin': ['Listen → type pinyin', 'Pakinig → i-type ang pinyin', 'Nghe → gõ pinyin'],
    'Ketik pinyin': ['Type pinyin', 'I-type ang pinyin', 'Gõ pinyin'],
    'Selesaikan atau tutup sesi yang sedang berjalan dulu': ['Finish or close the current session first', 'Tapusin o isara muna ang kasalukuyang session', 'Hãy hoàn thành hoặc đóng phiên hiện tại trước'],
    'Pola ini belum punya contoh yang bisa disusun.': ['This pattern has no examples to build yet.', 'Wala pang halimbawang mabubuo sa pattern na ito.', 'Mẫu câu này chưa có ví dụ để sắp xếp.'],
    'Kata berbintang': ['Starred words', 'Mga may bituin', 'Từ gắn sao'],
    'Kata lemah': ['Weak words', 'Mahihinang salita', 'Từ yếu'],
    'Selamat! Tema {s} lulus 🎉': ['Congrats! Theme {s} passed 🎉', 'Binabati ka! Pasado ang tema {s} 🎉', 'Chúc mừng! Đã đạt chủ đề {s} 🎉'],
    'Cara belajar paling efektif': ['Most effective way to learn', 'Pinakamabisang paraan', 'Cách học hiệu quả nhất'],
    'Lihat tabel dulu, sembunyikan arti, lalu tebak — ingat aktif lebih kuat dari membaca ulang.': ['Look at the table, hide the meanings, then guess — active recall beats rereading.', 'Tingnan ang talaan, itago ang kahulugan, saka hulaan — mas tumatak ang aktibong pag-alala.', 'Xem bảng, ẩn nghĩa rồi đoán — chủ động nhớ hiệu quả hơn đọc lại.'],
    'Belajar 1 set per hari (5–10 kata). Kata langsung dipakai di kalimat & pola grammar.': ['Learn 1 set a day (5–10 words). Words are used right away in sentences & patterns.', 'Isang set kada araw (5–10 salita). Agad ginagamit sa pangungusap at pattern.', 'Học 1 bộ mỗi ngày (5–10 từ). Từ được dùng ngay trong câu & mẫu câu.'],
    'Bintangi kata yang susah; latih kata berbintang & kata yang salah di ujian.': ['Star hard words; practise starred words and test mistakes.', 'Lagyan ng bituin ang mahihirap; sanayin ang may bituin at mga mali.', 'Gắn sao từ khó; luyện từ gắn sao và từ sai trong bài kiểm tra.'],
    'Ujian mewajibkan mengetik hanzi sendiri — itu yang membuat kosakata benar-benar milikmu.': ['The test makes you type hanzi yourself — that is what makes the words truly yours.', 'Kailangang i-type mo ang hanzi — iyan ang nagpapatibay sa bokabularyo.', 'Bài kiểm tra yêu cầu tự gõ chữ Hán — đó là cách để từ vựng thật sự là của bạn.'],
    'Kata baru di set ini': ['New words in this set', 'Bagong salita sa set na ito', 'Từ mới trong bộ này'],
    'Ulangi set': ['Repeat set', 'Ulitin ang set', 'Học lại bộ'],
    '{n} kata belum terhubung ke kamus — dilewati.': ['{n} words are not linked to the dictionary — skipped.', '{n} salita ang hindi naka-link — nilaktawan.', '{n} từ chưa liên kết với từ điển — bỏ qua.']
  };
  Object.entries(T).forEach(([k, v]) => { I18N[k] = [v[0], v[1]]; I18N_VI[k] = v[2]; });
})();

/* ---------- data: bentuk hanzi → indeks W ---------- */
let TM_MAP = null; const TM_BAD = [];
function tmIdx() {
  if (TM_MAP) return TM_MAP;
  const m = new Map();
  const add = (f, i) => { f = String(f || '').trim(); if (f && !m.has(f)) m.set(f, i); };
  W.forEach((w, i) => { if (!w || w.semi) return; add(w.w, i); add(w.s, i); (w.v || []).forEach(v => add(v, i)); });
  return (TM_MAP = m);
}
const TM_LV = [['N1', 'Novice 1', '準備一級'], ['N2', 'Novice 2', '準備二級'], ['A1', 'A1', '入門級'], ['A2', 'A2', '基礎級']];
const tmLvOf = w => clamp(w && isFinite(w.l) ? w.l : 3, 0, 3);
function tmPrep(T) {
  if (T._p) return T._p;
  const m = tmIdx(); const sets = []; const words = []; const seen = new Set(); let bad = 0;
  (T.sets || []).forEach((s, si) => {
    const ws = [];
    (s.words || []).forEach(x => {
      const wid = m.get(x.hz);
      if (wid === undefined || !W[wid] || seen.has(x.hz)) { bad++; TM_BAD.push(T.k + ':' + x.hz); return; }
      seen.add(x.hz); const o = { hz: x.hz, wid, mw: x.mw || '', ex: x.ex, si }; ws.push(o); words.push(o);
    });
    sets.push({ title: s.title, key: (s.title && (s.title.id || s.title.en)) || 'set' + si, words: ws });
  });
  const lv = [0, 0, 0, 0]; words.forEach(x => lv[tmLvOf(W[x.wid])]++);
  const sorted = words.map(x => tmLvOf(W[x.wid])).sort((a, b) => a - b);
  const main = sorted.length ? sorted[Math.floor((sorted.length - 1) / 2)] : 0;
  if (bad) console.warn('Kelas Tema: kata tak terhubung', T.k, TM_BAD.filter(x => x.startsWith(T.k + ':')));
  return (T._p = { sets: sets.filter(s => s.words.length), words, lv, main, bad });
}
const tmAll = () => (typeof TEMA !== 'undefined' && Array.isArray(TEMA) ? TEMA : []).filter(T => T && T.k && Array.isArray(T.sets) && tmPrep(T).words.length >= 4);
const tmT = k => tmAll().find(T => T.k === k) || null;
const tmWords = T => tmPrep(T).words;
const tmPos = w => ((w && w.o) || '').split('/')[0].trim();
const tmHz = w => String(w.s || w.w).replace(/[()（）]/g, '');
const tmPyTxt = w => (aligned(w) ? w.y.join(' ') : String(w.p || ''));
function tmForm(w, zh, hz) { const fs = [hz].concat(wForms(w)).filter(Boolean); fs.sort((a, b) => b.length - a.length); return fs.find(f => zh.includes(f)) || ''; }

/* ---------- state ---------- */
function tmS() {
  if (!S.tema || typeof S.tema !== 'object') S.tema = {};
  const s = S.tema;
  ['th', 'star', 'known'].forEach(k => { if (!s[k] || typeof s[k] !== 'object' || Array.isArray(s[k])) s[k] = {}; });
  if (!s.hide || typeof s.hide !== 'object') s.hide = { hz: false, py: false, mean: false };
  if (s.lv === undefined) s.lv = 'all';
  return s;
}
function tmTh(k) {
  const s = tmS(); let o = s.th[k];
  if (!o || typeof o !== 'object') o = s.th[k] = {};
  if (!o.sets || typeof o.sets !== 'object') o.sets = {};
  if (!Array.isArray(o.weak)) o.weak = [];
  return o;
}
const tmSetDone = (T, si) => { const s = tmPrep(T).sets[si]; const r = s && tmTh(T.k).sets[s.key]; return !!(r && r.sc >= 60); };
const tmSetsDone = T => tmPrep(T).sets.filter((s, si) => tmSetDone(T, si)).length;
const tmPass = T => !!tmTh(T.k).pass;
const tmPct = T => { const n = tmPrep(T).sets.length; return (tmSetsDone(T) + (tmPass(T) ? 1 : 0)) / (n + 1); };
const tmNextSet = T => { const n = tmPrep(T).sets.length; for (let i = 0; i < n; i++) if (!tmSetDone(T, i)) return i; return -1; };
function tmNextTheme() { const all = tmAll(); return all.find(T => !tmPass(T) && tmPct(T) > 0) || all.find(T => !tmPass(T)) || null; }
const tmFmtD = d => { try { const [y, m, dd] = d.split('-').map(Number); return new Date(y, m - 1, dd).toLocaleDateString(({ id: 'id-ID', en: 'en-GB', tl: 'fil-PH', vi: 'vi-VN' })[S.settings.ui] || 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) { return d; } };

/* ---------- komponen kecil ---------- */
function tmRing(pct, inner, size = 46) {
  const R = 18, C = 2 * Math.PI * R;
  return `<svg class="tm-ring" viewBox="0 0 44 44" width="${size}" height="${size}" aria-hidden="true"><circle cx="22" cy="22" r="${R}" fill="none" stroke="var(--acc-soft)" stroke-width="5"/><circle cx="22" cy="22" r="${R}" fill="none" stroke="var(--ring, var(--acc))" stroke-width="5" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - clamp(pct, 0, 1))}" transform="rotate(-90 22 22)"/>${inner ? `<text x="22" y="26" text-anchor="middle" font-size="11" font-weight="800" fill="var(--ink)">${inner}</text>` : ''}</svg>`;
}
const tmLvB = (l, n) => (l == null ? '' : `<span class="lvb lv${l} ${n !== undefined ? 'sm' : 'xs'} nm" title="${esc(lvName(l))}">${LV_CODE[l]}${n !== undefined ? `<i>${n}</i>` : ''}</span>`);
const tmLvRow = T => `<span class="tm-lvs">${tmPrep(T).lv.map((n, l) => (n ? tmLvB(l, n) : '')).join('')}</span>`;
const tmCol = T => 'c' + (((tmAll().indexOf(T) % 8) + 8) % 8 + 1);
const tmTitle = T => kx(T.title);
function tmPat(p) { return String(p || '').split(/\s*\+\s*/).map(x => `<span class="tm-pt ${/[㐀-鿿]/.test(x) ? 'hz' : ''}">${esc(x)}</span>`).join('<i>+</i>'); }

/* ---------- pemutar suara (playlist kata & dialog) ---------- */
const TMP = { run: 0, on: '', u: null };
function tmUtter(text, lang, rate, done) {
  const run = TMP.run; let fin = false; let dog = 0;
  const end = () => { if (fin) return; fin = true; clearTimeout(dog); if (run === TMP.run && done) done(); };
  if (!TTS.ok || !text) { dog = setTimeout(end, 500); return; }
  try {
    const v = lang === 'zh' ? TTS.voice : (typeof l50Voice === 'function' ? l50Voice(lang) : null);
    if (lang !== 'zh' && !v) { dog = setTimeout(end, 250); return; }
    const u = new SpeechSynthesisUtterance(String(text).replace(/[()（）]/g, ''));
    u.lang = v ? v.lang : 'zh-TW'; try { if (v) u.voice = v; } catch (e) {}
    u.rate = rate; u.onend = end; u.onerror = end; TMP.u = u;
    dog = setTimeout(end, 2600 + String(text).length * 420);
    if (speechSynthesis.paused) speechSynthesis.resume();
    speechSynthesis.speak(u);
  } catch (e) { dog = setTimeout(end, 400); }
}
function tmStop() {
  if (!TMP.on) return; TMP.run++; TMP.on = '';
  try { speechSynthesis.cancel(); } catch (e) {}
  document.querySelectorAll('.tm-playing').forEach(el => el.classList.remove('tm-playing'));
  document.querySelectorAll('[data-a="tmplay"],[data-a="tmdplay"]').forEach(b => { b.innerHTML = `${ICON('play')} ${t(b.dataset.a === 'tmplay' ? 'Putar semua' : 'Putar dialog')}`; b.classList.remove('on'); });
}
function tmMark(sel) { document.querySelectorAll('.tm-playing').forEach(el => el.classList.remove('tm-playing')); const el = sel && document.querySelector(sel); if (el) { el.classList.add('tm-playing'); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } }
function tmPlayWords(b) {
  if (TMP.on) { tmStop(); return; }
  const T = tmT(TMV.k); if (!T) return; FX.ensure(); if (TTS.unlock) TTS.unlock();
  const list = tmVisible(T); if (!list.length) return;
  TMP.run++; TMP.on = 'w'; const run = TMP.run; let j = 0;
  if (b) { b.innerHTML = `${ICON('pause')} ${t('Berhenti')}`; b.classList.add('on'); }
  const lg = meanLang();
  const step = () => {
    if (run !== TMP.run) return;
    if (j >= list.length || ROUTE !== 'kelas' || SES) { tmStop(); return; }
    const x = list[j++]; const w = W[x.wid];
    tmMark(`.tm-tr[data-f="${CSS.escape(x.hz)}"]`);
    tmUtter(tmHz(w), 'zh', 0.8, () => setTimeout(() => tmUtter(shortMean(meanP(w)), lg, 1, () => setTimeout(step, 700)), 450));
  };
  step();
}
function tmPlayDialog(b) {
  if (TMP.on) { tmStop(); return; }
  const T = tmT(TMV.k); if (!T || !T.dialog) return; FX.ensure(); if (TTS.unlock) TTS.unlock();
  TMP.run++; TMP.on = 'd'; const run = TMP.run; let j = 0; const d = T.dialog;
  if (b) { b.innerHTML = `${ICON('pause')} ${t('Berhenti')}`; b.classList.add('on'); }
  const step = () => {
    if (run !== TMP.run) return;
    if (j >= d.length || ROUTE !== 'kelas' || SES) { tmStop(); return; }
    const i = j++; const x = d[i]; tmMark(`.tm-dl[data-i="${i}"]`);
    if (TMV.role && x.sp === TMV.role) { setTimeout(() => { if (run !== TMP.run) return; const el = document.querySelector(`.tm-dl[data-i="${i}"]`); if (el) el.classList.add('rev'); tmUtter(x.zh, 'zh', S.settings.rate || 0.85, () => setTimeout(step, 500)); }, 1400 + x.zh.length * 380); return; }
    tmUtter(x.zh, 'zh', S.settings.rate || 0.85, () => setTimeout(step, 450));
  };
  step();
}
const hushAllTM = hushAll;
hushAll = function () { tmStop(); return hushAllTM(); };
window.addEventListener('hashchange', () => tmStop());
