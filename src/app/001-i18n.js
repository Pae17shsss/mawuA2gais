/* ========== i18n ==========
   Kunci = teks Bahasa Indonesia. Nilai = [English, Filipino kasual].
   Kalau sebuah kunci belum ada terjemahannya, teks Indonesia dipakai apa adanya. */
const I18N = {
  /* nav & umum */
  'Beranda': ['Home', 'Home'], 'Jalur A2': ['A2 Path', 'Landas A2'], 'Jalur': ['Path', 'Landas'], 'Kata': ['Words', 'Salita'],
  'Hanzi Lab': ['Hanzi Lab', 'Hanzi Lab'], 'Hanzi': ['Hanzi', 'Hanzi'], 'Nada': ['Tones', 'Tono'], 'Statistik': ['Stats', 'Stats'], 'Saya': ['Me', 'Ako'],
  'Navigasi': ['Navigation', 'Nabigasyon'], 'Menu': ['Menu', 'Menu'], 'Ringkasan': ['Summary', 'Buod'], 'langkah kecil': ['small steps', 'maliliit na hakbang'],
  'Level': ['Level', 'Level'], 'Target A2': ['A2 target', 'Target A2'], 'Go': ['Go', 'Go'], 'Unit': ['Unit', 'Unit'], 'Paket': ['Pack', 'Pack'],
  'Lanjut': ['Next', 'Next'], 'Kembali': ['Back', 'Balik'], 'Periksa': ['Check', 'Check'], 'Hapus': ['Delete', 'Burahin'], 'Cari': ['Search', 'Hanapin'],
  'Semua': ['All', 'Lahat'], 'Semua A2': ['All A2', 'Lahat A2'], 'Belum': ['Not yet', 'Wala pa'], 'Dikenal': ['Known', 'Kilala'], 'Kuat': ['Strong', 'Matatag'],
  'Bandel': ['Tricky', 'Matigas'], 'Dikuasai': ['Mastered', 'Bihasa'], 'Baru dikenal': ['Just met', 'Bagong kilala'],
  'kuat': ['strong', 'matatag'], 'dikuasai': ['mastered', 'bihasa'], 'nada': ['tone', 'tono'], 'juga': ['also', 'pati'], 'dtk': ['s', 's'], 'mnt': ['min', 'min'], 'hr': ['days', 'araw'],
  'Selamat pagi': ['Good morning', 'Magandang umaga'], 'Selamat siang': ['Good afternoon', 'Magandang tanghali'], 'Selamat sore': ['Good evening', 'Magandang hapon'], 'Selamat malam': ['Good evening', 'Magandang gabi'],

  /* beranda */
  'Hari ke-{n} menuju A2': ['Day {n} towards A2', 'Araw {n} papuntang A2'],
  'Bunga hari ini mekar penuh 🌸': ["Today's blossom is in full bloom 🌸", 'Bukadkad ang bulaklak ngayon 🌸'],
  'Hari ini: {n} kata baru': ['Today: {n} new words', 'Ngayon: {n} bagong salita'],
  'Target kata baru sudah beres ✅': ['New-word target done ✅', 'Tapos na ang target na bagong salita ✅'],
  '{n} kata menunggu diulang': ['{n} words due for review', '{n} salitang dapat ulitin'],
  'Sisa {n} hari ke target ({d}).': ['{n} days left to your target ({d}).', '{n} araw na lang bago ang target ({d}).'],
  'Tempo': ['Pace', 'Bilis'],
  'Mulai sesi pintar': ['Start smart session', 'Simulan ang smart session'], 'Latihan bebas': ['Free practice', 'Malayang practice'],
  'Latihan kalimat': ['Sentence practice', 'Practice sa pangungusap'],
  'kata A2 dikenal': ['A2 words known', 'A2 na salitang kilala'], 'jalan ke A2': ['of the way to A2', 'papuntang A2'],
  'Misi harian': ['Daily quests', 'Daily quests'],
  '3 misi = api streak menyala · 5 misi = bunga mekar penuh +100 XP. Misi ke-5 berubah tiap hari dan menyesuaikan kelemahanmu.':
    ['3 quests keep your streak alive · 5 quests make the blossom open, +100 XP. The 5th quest changes daily and targets your weak spot.',
     'Tatlong quest para tuloy ang streak · limang quest para bumukadkad ang bulaklak, +100 XP. Nagpapalit ang ika-5 quest araw-araw base sa kahinaan mo.'],
  'Mode cepat': ['Quick modes', 'Mabilisang mode'],
  'Lengkapi kalimat': ['Fill the sentence', 'Buuin ang pangungusap'], 'Pilih kata yang hilang': ['Pick the missing word', 'Piliin ang nawawalang salita'],
  'Susun kalimat': ['Build a sentence', 'Ayusin ang pangungusap'], 'Urutkan hanzi jadi kalimat': ['Put the hanzi in order', 'Isaayos ang hanzi'],
  'Dril nada': ['Tone drill', 'Tone drill'], 'Tebak kontur nada': ['Guess the tone contour', 'Hulaan ang tono'],
  'Pasangkan': ['Match up', 'Pagtambalin'], 'Game cepat 2 ronde': ['Fast game, 2 rounds', 'Mabilis na laro, 2 round'],
  'Telinga': ['Listening', 'Pandinig'], 'Dengar lalu pilih': ['Listen, then choose', 'Makinig, tapos pumili'],
  'Ketik pinyin': ['Type pinyin', 'I-type ang pinyin'], 'Latih ejaan + nada': ['Practise spelling + tones', 'Practice spelling at tono'],
  'Hanzi kilat': ['Hanzi flash', 'Hanzi flash'], '10 hanzi lewat cerita': ['10 hanzi through their stories', '10 hanzi gamit ang kwento'],
  'Kata bandel': ['Tricky words', 'Matitigas na salita'], 'Yang sering lupa': ['The ones you keep forgetting', 'Yung laging nakakalimutan'],
  'Peta menuju A2': ['Road to A2', 'Daan papuntang A2'],
  '🍑 Semua kosakata A2 sudah kamu kenal! Lanjut kuatkan sampai "dikuasai", lalu buka Level 3.':
    ['🍑 You have met every A2 word! Keep strengthening them to "mastered", then open Level 3.',
     '🍑 Nakilala mo na lahat ng A2 na salita! Patatagin pa hanggang "bihasa", tapos buksan ang Level 3.'],
  'Dengan tempo 7 hari terakhir ({p} kata/hari), semua kata A2 terkenalkan sekitar {d}. Target: {t}.':
    ['At your last-7-day pace ({p} words/day), you will have met every A2 word around {d}. Target: {t}.',
     'Sa bilis mo nitong 7 araw ({p} salita/araw), makikilala mo lahat ng A2 na salita sa paligid ng {d}. Target: {t}.'],
  'Mulai sesi pertama untuk melihat perkiraan tanggal A2-mu.': ['Finish your first session to see your projected A2 date.', 'Tapusin ang unang session para makita ang tantyang petsa ng A2 mo.'],
  'XP datang dari setiap jawaban, misi harian, game, dan cerita hanzi yang kamu tulis.':
    ['XP comes from every answer, daily quest, game, and hanzi story you write.', 'Galing ang XP sa bawat sagot, daily quest, laro, at kwentong hanzi na sinusulat mo.'],
  '{a} / {b} XP menuju {e} Level {n}': ['{a} / {b} XP to {e} Level {n}', '{a} / {b} XP papuntang {e} Level {n}'],
  'Level tertinggi tercapai! ✨ {x} XP': ['Highest level reached! ✨ {x} XP', 'Pinakamataas na level! ✨ {x} XP'],
  'Naik level {n}': ['Level {n} reached', 'Level {n} na'],
  'Benih': ['Seed', 'Binhi'], 'Tunas': ['Sprout', 'Usbong'], 'Kecambah': ['Seedling', 'Punla'], 'Bunga kecil': ['Little bloom', 'Munting bulaklak'],
  'Taman': ['Garden', 'Hardin'], 'Bambu': ['Bamboo', 'Kawayan'], 'Pohon muda': ['Sapling', 'Batang puno'], 'Pohon buah': ['Fruit tree', 'Puno ng prutas'],
  'Bukit': ['Hill', 'Burol'], 'Gunung': ['Mountain', 'Bundok'], 'Sungai': ['River', 'Ilog'], 'Laut': ['Sea', 'Dagat'],
  'Bintang': ['Star', 'Bituin'], 'Bulan': ['Moon', 'Buwan'], 'Matahari': ['Sun', 'Araw'], 'Galaksi': ['Galaxy', 'Galaksiya'],
  'Kuncup': ['Bud', 'Usbong'], 'Mekar': ['Bloom', 'Bukadkad'], 'Berbuah': ['Fruiting', 'Namumunga'], 'Pohon': ['Tree', 'Puno'], 'Hutan': ['Forest', 'Gubat'], 'Langit': ['Sky', 'Langit'],

  /* streak */
  '{n} hari': ['{n} days', '{n} araw'],
  'Hari ini aman! Api menyala.': ['Today is safe — the flame is lit.', 'Ligtas ngayon — sindi ang apoy.'],
  'Selesaikan 3 misi untuk menyalakan api hari ini': ['Finish 3 quests to light today\'s flame', 'Tapusin ang 3 quest para sindihan ang apoy ngayon'],
  '🧊 Pelindung api dipakai — streak aman!': ['🧊 Streak freeze used — your streak is safe!', '🧊 Nagamit ang streak freeze — ligtas ang streak mo!'],
  '🧊 Dapat 1 pelindung api (maks 2)': ['🧊 You earned a streak freeze (max 2)', '🧊 May nakuha kang streak freeze (max 2)'],
  'Hanzi hari ini': ['Hanzi of the day', 'Hanzi ngayong araw'], 'Buka cerita & goresan': ['Open story & strokes', 'Buksan ang kwento at stroke'],
  'Otak adaptif': ['Adaptive brain', 'Adaptive brain'],

  /* misi */
  'Pelajari {n} kata baru': ['Learn {n} new words', 'Mag-aral ng {n} bagong salita'],
  'Bereskan {n} ulangan hari ini': ['Clear {n} reviews today', 'Tapusin ang {n} review ngayon'],
  'Jawab {n} soal latihan': ['Answer {n} practice questions', 'Sagutan ang {n} tanong'],
  '{n} jawaban nada benar': ['{n} correct tone answers', '{n} tamang sagot sa tono'],
  'Kenali {n} hanzi lewat ceritanya': ['Recognise {n} hanzi from their stories', 'Kilalanin ang {n} hanzi sa kwento nila'],
  'Capai combo {n} berturut-turut': ['Hit a {n} combo', 'Umabot ng {n} combo'],
  'Selesaikan 1 game pasangkan kata': ['Finish 1 matching game', 'Tapusin ang 1 matching game'],
  'Tulis cerita sendiri untuk 1 hanzi': ['Write your own story for 1 hanzi', 'Sumulat ng sariling kwento para sa 1 hanzi'],
  '{n} soal dengar benar': ['{n} correct listening answers', '{n} tamang sagot sa pakikinig'],
  'Ketik {n} pinyin dengan benar': ['Type {n} pinyin correctly', 'I-type nang tama ang {n} pinyin'],
  'Selesaikan {n} soal kalimat': ['Finish {n} sentence questions', 'Tapusin ang {n} tanong sa pangungusap'],
  'Misi selesai': ['Quest complete', 'Tapos ang quest'],
  '🌸 Bunga plum hari ini mekar penuh! +100 XP': ['🌸 Today\'s plum blossom opened fully! +100 XP', '🌸 Bumukadkad nang buo ang plum blossom ngayon! +100 XP'],
  'Lencana baru': ['New badge', 'Bagong badge'],

  /* jalur */
  'Jalur belajar': ['Learning path', 'Landas ng pag-aaral'],
  '7 level resmi TOCFL Taiwan. Empat level pertama ({n} kata) adalah jalur A2, dikelompokkan per tema kehidupan sehari-hari — tiap unit maksimal 8 kata supaya ringan. Sudah paham satu level? Pakai tes lompat.':
    ['The 7 official TOCFL Taiwan levels. The first four ({n} words) form the A2 path, grouped by everyday themes — each unit holds at most 8 words so it stays light. Already know a level? Take the skip test.',
     'Ang 7 opisyal na TOCFL Taiwan level. Ang unang apat ({n} salita) ang landas papuntang A2, nakagrupo ayon sa pang-araw-araw na tema — 8 salita lang kada unit para magaan. Alam mo na ang isang level? Kunin ang skip test.'],
  'Tes lompat {lv} (12 soal)': ['Skip test: {lv} (12 questions)', 'Skip test: {lv} (12 tanong)'],
  'Tes lompat': ['Skip test', 'Skip test'],
  'Level lanjutan setelah A2 ({n} kata, paket 40). Pinyin & suara sudah siap; arti 3 bahasa masih fokus di jalur A2.':
    ['Levels beyond A2 ({n} words, packs of 40). Pinyin and audio are ready; the 3-language meanings still focus on the A2 path.',
     'Mga level pagkatapos ng A2 ({n} salita, tig-40 kada pack). Handa na ang pinyin at audio; ang 3-wikang kahulugan ay naka-focus pa sa A2.'],
  '{a} dikenal · {b} dikuasai': ['{a} known · {b} mastered', '{a} kilala · {b} bihasa'],
  'Pelajari {n} kata': ['Learn {n} words', 'Mag-aral ng {n} salita'], 'Latih unit': ['Practise this unit', 'Practice ang unit'],

  /* kata */
  'Kamus kata': ['Word list', 'Talasalitaan'],
  'Cari dengan hanzi, pinyin (tanpa nada juga bisa), atau arti dalam Indonesia / English / Filipino.':
    ['Search by hanzi, pinyin (with or without tone marks), or meaning in Indonesian / English / Filipino.',
     'Maghanap gamit ang hanzi, pinyin (may tono o wala), o kahulugan sa Indonesian / English / Filipino.'],
  'mis. makan, chī, 吃…': ['e.g. eat, chī, 吃…', 'hal. kain, chī, 吃…'],
  '{n} kata': ['{n} words', '{n} salita'],
  'Tidak ketemu. Coba kata lain 🌿': ['Nothing found. Try another word 🌿', 'Walang nahanap. Subukan ang ibang salita 🌿'],
  'Tampilkan lebih banyak': ['Show more', 'Magpakita pa'],
  'per suku kata': ['syllable by syllable', 'pantig-pantig'], 'kontur nada': ['tone contour', 'tone contour'], 'kontur': ['contour', 'contour'],
  'Ketuk tiap suku kata untuk mendengarnya sendiri-sendiri — nadanya paling jelas begitu.':
    ['Tap each syllable to hear it on its own — that is where the tone is clearest.',
     'Pindutin ang bawat pantig para marinig mag-isa — doon pinakalinaw ang tono.'],
  'ulang hari ini': ['review today', 'review ngayon'], 'ulang {n} hari lagi': ['review in {n} days', 'review sa {n} araw'],
  'Cerita hanzi': ['Hanzi stories', 'Kwento ng hanzi'], 'Masukkan ke hafalanku': ['Add to my memory', 'Idagdag sa memorya ko'],
  'Belum ada cerita — tap untuk menulis versimu.': ['No story yet — tap to write your own.', 'Wala pang kwento — pindutin para sumulat ng sarili mo.'],
  'Arti 3 bahasa untuk level ini menyusul — pinyin & suara sudah siap.': ['3-language meanings for this level are coming — pinyin and audio are ready.', 'Paparating pa ang 3-wikang kahulugan dito — handa na ang pinyin at audio.'],

  /* hanzi lab */
  '{n} hanzi unik di jalur A2, masing-masing punya cerita bentuk dari benda sehari-hari. Cerita buatanmu sendiri paling nempel — tap hanzi mana pun lalu tulis versimu (✎).':
    ['{n} unique hanzi on the A2 path, each with a shape story built from everyday objects. Your own story sticks best — tap any hanzi and write your version (✎).',
     '{n} natatanging hanzi sa landas A2, may kwento ang hugis bawat isa mula sa pang-araw-araw na bagay. Pinakadikit ang sarili mong kwento — pindutin ang kahit anong hanzi at isulat ang bersyon mo (✎).'],
  'Hanzi kilat (10)': ['Hanzi flash (10)', 'Hanzi flash (10)'], 'Hanzi per level': ['Hanzi by level', 'Hanzi kada level'],
  'Titik hijau = sudah benar di kuis hanzi. Yang pudar = katanya belum kamu pelajari.':
    ['Green dot = answered correctly in the hanzi quiz. Faded = its word is not learned yet.',
     'Berdeng tuldok = tama sa hanzi quiz. Kupas = hindi pa natututunan ang salita nito.'],
  'Komponen penting (radikal)': ['Key components (radicals)', 'Mahahalagang bahagi (radical)'],
  'Kenali "potongan lego" ini, dan hanzi baru terasa seperti gabungan benda yang sudah kamu kenal.':
    ['Learn these "lego bricks" and new hanzi feel like combinations of things you already know.',
     'Kabisaduhin ang mga "lego bricks" na ito at parang kombinasyon na lang ng pamilyar na bagay ang bagong hanzi.'],
  'muncul pertama di {lv}': ['first appears in {lv}', 'unang lumitaw sa {lv}'],
  'Cerita bentuk': ['Shape story', 'Kwento ng hugis'], 'Ceritamu sendiri': ['Your own story', 'Sarili mong kwento'],
  'Bentuk ini mengingatkanmu pada apa?': ['What does this shape remind you of?', 'Ano ang naaalala mo sa hugis na ito?'],
  'Simpan cerita': ['Save story', 'I-save ang kwento'], 'Muncul di kata': ['Appears in words', 'Lumalabas sa mga salita'],
  'dengar': ['listen', 'pakinggan'], 'urutan goresan': ['stroke order', 'stroke order'], 'coba tulis': ['try writing', 'subukang isulat'],
  'Tulis goresan satu per satu di kotak': ['Draw the strokes one by one in the box', 'Iguhit ang stroke isa-isa sa kahon'],
  'Selesai dengan {n} koreksi': ['Done with {n} corrections', 'Tapos na may {n} pagtatama'], 'Sempurna! 🌟': ['Perfect! 🌟', 'Perpekto! 🌟'],
  'Tulis dulu ceritanya ✎': ['Write the story first ✎', 'Isulat muna ang kwento ✎'],
  '✎ Cerita disimpan +15 XP': ['✎ Story saved +15 XP', '✎ Na-save ang kwento +15 XP'], '✎ Cerita diperbarui': ['✎ Story updated', '✎ Na-update ang kwento'],

  /* nada */
  'Nada Mandarin Taiwan': ['Taiwanese Mandarin tones', 'Tono ng Mandarin sa Taiwan'],
  'Nada mengubah arti: 媽 麻 馬 罵 = ibu, rami, kuda, memarahi. Warna nada dipakai konsisten di seluruh app.':
    ['Tone changes meaning: 媽 麻 馬 罵 = mother, hemp, horse, to scold. Tone colours stay the same everywhere in the app.',
     'Nagbabago ang kahulugan sa tono: 媽 麻 馬 罵 = nanay, abaka, kabayo, pagalitan. Pareho ang kulay ng tono sa buong app.'],
  'Dril nada (12 soal)': ['Tone drill (12 questions)', 'Tone drill (12 tanong)'],
  'Dengar 4 nada berurutan': ['Hear all 4 tones in a row', 'Pakinggan ang 4 na tono nang sunod-sunod'],
  'Tombol 🎼 memutar kontur nada murni (tanpa kata), jadi naik-turunnya terdengar jelas. Tombol 🔊 memutar kata aslinya.':
    ['The 🎼 button plays the pure tone contour (no words), so the rise and fall is obvious. The 🔊 button plays the real word.',
     'Ang 🎼 ay pinatutugtog ang purong tone contour (walang salita), kaya halata ang taas-baba. Ang 🔊 ay ang totoong salita.'],
  'Akurasi nada': ['Tone accuracy', 'Tamang tono'],
  '4 nada + netral': ['The 4 tones + neutral', 'Ang 4 na tono + neutral'],
  'Datar & tinggi': ['High and flat', 'Mataas at patag'], 'Naik': ['Rising', 'Pataas'], 'Rendah': ['Low', 'Mababa'], 'Turun tajam': ['Sharp fall', 'Matulin na pagbaba'],
  'ibu': ['mother', 'nanay'], 'rami / kesemutan': ['hemp / numb', 'abaka / manhid'], 'kuda': ['horse', 'kabayo'], 'memarahi': ['to scold', 'pagalitan'],
  'Seperti suara dengung "nggg…" yang ditahan, atau nada tunggu telepon. Jangan turun di akhir.':
    ['Like a held hum "nnnn…", or a phone dial tone. Do not let it drop at the end.',
     'Parang hinihintay na hum na "nnnn…", o dial tone ng telepono. Huwag pababain sa dulo.'],
  'Seperti orang kaget bertanya "Hah?" atau "Serius?" — dari tengah naik ke atas.':
    ['Like a surprised "Huh?" or "Really?" — rising from the middle upward.',
     'Parang nagulat na "Ha?" o "Talaga?" — pataas mula sa gitna.'],
  'Di Taiwan biasanya diucapkan rendah & sedikit serak, seperti menggumam kecewa "hmm…". Naik penuh hanya di akhir kalimat atau saat diucapkan sendiri.':
    ['In Taiwan it is usually just low and a little creaky, like a disappointed "hmm…". It only rises fully at the end of a sentence or when said alone.',
     'Sa Taiwan, madalas mababa lang at bahagyang paos, parang dismayadong "hmm…". Pataas lang talaga sa dulo ng pangungusap o kapag mag-isa.'],
  'Seperti membentak "Stop!" atau menjawab tegas "Nggak!" — dari atas jatuh cepat.':
    ['Like snapping "Stop!" or a firm "No!" — falling fast from the top.',
     'Parang sigaw na "Stop!" o mariing "Hindi!" — mabilis na pagbagsak mula sa taas.'],
  'Nada netral': ['Neutral tone', 'Neutral na tono'],
  'pendek & ringan, seperti "ya" yang cepat di akhir kalimat': ['short and light, like a quick "yeah" at the end of a sentence', 'maikli at magaan, parang mabilis na "oo" sa dulo ng pangungusap'],
  'Catatan Taiwan: penutur Taiwan lebih jarang memakai nada netral dibanding Beijing, dan hampir tidak memakai akhiran -r (兒化).':
    ['Taiwan note: Taiwanese speakers use the neutral tone less often than Beijing speakers, and almost never add the -r ending (兒化).',
     'Taiwan note: mas bihira gamitin ng taga-Taiwan ang neutral tone kumpara sa Beijing, at halos hindi nila ginagamit ang -r ending (兒化).'],
  'Aturan perubahan nada (sandhi)': ['Tone change rules (sandhi)', 'Panuntunan sa pagbabago ng tono (sandhi)'],
  'Dua nada 3 berurutan: yang pertama berubah jadi nada 2.': ['Two third tones in a row: the first becomes a second tone.', 'Dalawang third tone na magkasunod: nagiging second tone ang una.'],
  '不 jadi nada 2 kalau diikuti nada 4.': ['不 becomes second tone before a fourth tone.', 'Nagiging second tone ang 不 bago ang fourth tone.'],
  'Sebelum nada 4 → yí; sebelum nada 1/2/3 → yì; saat menghitung tetap yī.': ['Before tone 4 → yí; before tones 1/2/3 → yì; when counting it stays yī.', 'Bago ang tono 4 → yí; bago ang tono 1/2/3 → yì; kapag nagbibilang, yī pa rin.'],
  'Nada 3 setengah': ['Half third tone', 'Kalahating third tone'],
  'Nada 3 sebelum nada lain cukup rendah saja, tidak perlu naik lagi.': ['A third tone before any other tone just stays low — no need to rise.', 'Ang third tone bago ang ibang tono ay mababa lang — hindi na kailangang pataasin.'],
  'App menulis nada kamus (seperti di TOCFL). Suara TTS otomatis menerapkan perubahan nada ini — jadi dengarkan, lalu tiru.':
    ['The app writes dictionary tones (as TOCFL does). The speech engine applies these changes automatically — so listen, then copy.',
     'Dictionary tone ang nakasulat sa app (gaya ng TOCFL). Awtomatikong inilalapat ng boses ang mga pagbabago — kaya makinig, tapos gayahin.'],
  'Pasangan yang sering tertukar': ['Pairs you mix up most', 'Madalas mong mapagpalit'],
  'Kamu paling sering mengira nada {a} sebagai nada {b} ({n}×). Soal dril nada otomatis memakai jebakan ini.':
    ['You most often hear tone {a} as tone {b} ({n}×). The tone drill uses that trap on purpose.',
     'Madalas mong marinig ang tono {a} bilang tono {b} ({n}×). Sinasadya ito ng tone drill.'],
  'Setelah beberapa dril nada, app akan memetakan nada mana yang sering tertukar di telingamu.':
    ['After a few tone drills the app maps which tones your ear mixes up.', 'Pagkatapos ng ilang tone drill, mama-map ng app kung anong tono ang napagpapalit ng tenga mo.'],
  'benar ↓ / dijawab →': ['correct ↓ / answered →', 'tama ↓ / sinagot →'],
  'nada 1 · 2 · 3 · 4': ['tones 1 · 2 · 3 · 4', 'tono 1 · 2 · 3 · 4'],
  'dengar 4 nada': ['hear 4 tones', 'pakinggan ang 4 tono'], 'dengar kontur': ['hear contour', 'pakinggan ang contour'],

  /* sesi */
  'Sesi pintar': ['Smart session', 'Smart session'], 'Kata baru': ['New word', 'Bagong salita'],
  'Sudah kuingat, lanjut': ['Got it, continue', 'Kabisado na, tuloy'],
  'Apa artinya?': ['What does it mean?', 'Ano ang ibig sabihin?'], 'Pilih hanzinya': ['Pick the hanzi', 'Piliin ang hanzi'],
  'Dengar, lalu pilih': ['Listen, then choose', 'Makinig, tapos pumili'], 'Nada apa?': ['Which tone?', 'Anong tono?'],
  'Ketik pinyin-nya': ['Type the pinyin', 'I-type ang pinyin'], 'Hanzi ini artinya?': ['What does this hanzi mean?', 'Ano ang ibig sabihin ng hanzi na ito?'],
  'Pasangkan hanzi dengan artinya': ['Match hanzi with meanings', 'Itapat ang hanzi sa kahulugan'],
  'Lengkapi kalimatnya': ['Complete the sentence', 'Buuin ang pangungusap'],
  'Susun jadi kalimat yang benar': ['Put it in the right order', 'Ayusin sa tamang pagkakasunod'],
  'ketuk kata sesuai urutan': ['tap the words in order', 'pindutin ang salita ayon sa ayos'],
  'hapus satu': ['undo one', 'bawiin ang isa'],
  'Kalimat yang benar:': ['The correct sentence:', 'Ang tamang pangungusap:'],
  'contoh: ni3hao3 atau nǐhǎo': ['e.g. ni3hao3 or nǐhǎo', 'hal. ni3hao3 o nǐhǎo'],
  'Angka 1–4 untuk nada, tanpa angka untuk nada netral. Huruf ü bisa diketik v.':
    ['Digits 1–4 for tones, no digit for the neutral tone. Type v for ü.', 'Numero 1–4 para sa tono, walang numero para sa neutral. I-type ang v para sa ü.'],
  'Hurufnya sudah benar — tinggal nadanya.': ['The letters are right — only the tone is off.', 'Tama ang letra — tono na lang ang mali.'],
  'Kata bandel — ingat ceritanya:': ['Tricky word — remember its story:', 'Matigas na salita — alalahanin ang kwento:'],
  'Benar!': ['Correct!', 'Tama!'], 'Tepat!': ['Spot on!', 'Ayos!'], 'Pintar!': ['Clever!', 'Galing!'], 'Nah itu dia!': ['That is it!', 'Ayan na!'], 'Keren!': ['Nice!', 'Astig!'], 'Mantap!': ['On fire!', 'Sunod-sunod!'],
  'Belum tepat —': ['Not quite —', 'Hindi tama —'], 'lihat jawabannya:': ['here is the answer:', 'eto ang sagot:'], 'Artinya': ['It means', 'Ibig sabihin'],
  'Selesai dalam {s} detik!': ['Finished in {s} seconds!', 'Tapos sa {s} segundo!'], '{n} salah': ['{n} misses', '{n} mali'], 'Tanpa salah 🌟': ['No mistakes 🌟', 'Walang mali 🌟'],
  'Sesi yang cantik!': ['Beautiful session!', 'Ang ganda ng session!'], 'Sesi selesai, makin nempel!': ['Session done — it is sticking!', 'Tapos ang session — dumidikit na!'],
  'Selesai — pengulangan bikin kuat.': ['Done — repetition is what makes it stick.', 'Tapos — ang ulit-ulit ang nagpapatatag.'],
  'akurasi': ['accuracy', 'tama'], 'combo terbaik': ['best combo', 'pinakamahusay na combo'],
  '{n} kata baru masuk ingatan.': ['{n} new words entered your memory.', '{n} bagong salita ang pumasok sa memorya mo.'],
  'Sisa target hari ini: {n} kata.': ['Left for today: {n} words.', 'Natitira ngayon: {n} salita.'],
  'Target kata baru hari ini tercapai ✅': ['Today\'s new-word target is done ✅', 'Tapos na ang target na bagong salita ngayon ✅'],
  'Sesi lagi': ['Another session', 'Isa pang session'],
  'Lulus {n}/12 🎉 Semua kata {lv} ditandai dikenal dan akan muncul sebagai ulangan ringan dalam beberapa hari.':
    ['Passed {n}/12 🎉 Every {lv} word is marked as known and will come back as light reviews in a few days.',
     'Pasado {n}/12 🎉 Markado nang kilala lahat ng salita sa {lv} at babalik bilang magaan na review sa loob ng ilang araw.'],
  'Skor {n}/12 — butuh 10 untuk lompat. Belajar per unit dulu, kamu pasti cepat menyusul.':
    ['Score {n}/12 — you need 10 to skip. Work through the units first; you will catch up fast.',
     'Iskor {n}/12 — kailangan ng 10 para makalundag. Dumaan muna sa units; mabilis kang makakahabol.'],
  'Belum ada soal untuk mode ini — pelajari beberapa kata dulu 🌱': ['No questions for this mode yet — learn a few words first 🌱', 'Wala pang tanong dito — mag-aral muna ng ilang salita 🌱'],
  '🌟 Belum ada kata bandel — ingatanmu mantap!': ['🌟 No tricky words yet — your memory is solid!', '🌟 Wala pang matigas na salita — matatag ang memorya mo!'],
  '🔇 Suara belum tersedia di perangkat ini': ['🔇 No speech voice available on this device', '🔇 Walang available na boses sa device na ito'],
  'Putar suara': ['Play audio', 'I-play ang audio'],

  /* saya / pengaturan */
  'Profil': ['Profile', 'Profile'], 'Statistik & lencana': ['Stats & badges', 'Stats at badges'], 'Kalender, akurasi, insight': ['Calendar, accuracy, insights', 'Kalendaryo, tama, insights'],
  'Panduan nada': ['Tone guide', 'Gabay sa tono'], '4 nada, sandhi, nada Taiwan': ['4 tones, sandhi, Taiwan notes', '4 tono, sandhi, Taiwan notes'],
  'Pasang di HP': ['Install on your phone', 'I-install sa phone'],
  'Di Safari: tombol Bagikan → Tambah ke Layar Utama.': ['In Safari: Share button → Add to Home Screen.', 'Sa Safari: Share button → Add to Home Screen.'],
  'Di Chrome: menu ⋮ → Instal aplikasi / Tambahkan ke layar utama.': ['In Chrome: ⋮ menu → Install app / Add to Home screen.', 'Sa Chrome: ⋮ menu → Install app / Add to Home screen.'],
  'Pasang sekarang': ['Install now', 'I-install ngayon'],
  'Bahasa': ['Language', 'Wika'], 'Bahasa aplikasi': ['App language', 'Wika ng app'], 'Semua menu, tombol, dan penjelasan': ['All menus, buttons and explanations', 'Lahat ng menu, button at paliwanag'],
  'Bahasa arti utama': ['Main meaning language', 'Pangunahing wika ng kahulugan'],
  'Dipakai untuk pilihan jawaban & terjemahan kalimat': ['Used for answer choices and sentence translations', 'Ginagamit sa mga pagpipilian at salin ng pangungusap'],
  'Tampilkan sebagai subtitel': ['Show as a subtitle', 'Ipakita bilang subtitle'],
  'Bahasa arti utama selalu tampil': ['The main meaning language is always shown', 'Laging nakikita ang pangunahing wika'],
  'Cerita bentuk hanzi masih ditulis dalam Bahasa Indonesia; bagian lain mengikuti bahasa aplikasi.':
    ['The hanzi shape stories are still written in Indonesian; everything else follows the app language.',
     'Nasa Indonesian pa ang mga kwento ng hugis ng hanzi; ang iba ay sumusunod sa wika ng app.'],
  'Belajar': ['Learning', 'Pag-aaral'], 'Nama panggilan': ['Nickname', 'Palayaw'], 'Untuk sapaan di beranda': ['Used to greet you on the home screen', 'Ginagamit sa pagbati sa home'],
  'namamu': ['your name', 'pangalan mo'],
  'Kata baru per hari dihitung ulang otomatis': ['New words per day are recalculated automatically', 'Awtomatikong kinakalkula ang bagong salita kada araw'],
  'Mode pinyin': ['Pinyin mode', 'Pinyin mode'], 'Tanda nada, angka, atau sembunyikan': ['Tone marks, numbers, or hidden', 'Tone marks, numero, o tago'],
  'Suara & nada': ['Audio & tones', 'Audio at tono'], 'Efek suara': ['Sound effects', 'Sound effects'], 'Putar pelafalan otomatis': ['Auto-play pronunciation', 'Awtomatikong i-play ang bigkas'],
  'Isyarat kontur nada': ['Tone contour cue', 'Tone contour cue'],
  'Bunyi nada murni diputar sebelum kata, supaya naik-turunnya jelas': ['A pure tone sound plays before the word so the rise and fall is clear', 'May purong tunog bago ang salita para malinaw ang taas-baba'],
  'Suara pelafalan': ['Speech voice', 'Boses'], 'Mencari suara…': ['Looking for a voice…', 'Naghahanap ng boses…'],
  '✅ Suara Mandarin Taiwan aktif': ['✅ Taiwanese Mandarin voice active', '✅ Aktibo ang Taiwanese Mandarin voice'],
  '⚠️ Belum ada suara Taiwan — memakai {v}': ['⚠️ No Taiwan voice found — using {v}', '⚠️ Walang Taiwan voice — gamit ang {v}'],
  'Browser ini tidak mendukung suara': ['This browser has no speech support', 'Walang speech support ang browser na ito'],
  'Kecepatan bicara': ['Speech speed', 'Bilis ng pagsasalita'], 'Tombol 🐢 memutar kata per suku kata': ['The 🐢 button plays the word syllable by syllable', 'Ang 🐢 ay pinatutugtog ang salita nang pantig-pantig'],
  'Pelan': ['Slow', 'Mabagal'], 'Sedang': ['Medium', 'Katamtaman'], 'Normal': ['Normal', 'Normal'], 'Cepat': ['Fast', 'Mabilis'],
  'Supaya logat Taiwan asli: iPhone → Pengaturan → Aksesibilitas → Konten Lisan → Suara → Chinese (Taiwan) Mei-Jia. Android → Setelan → Text-to-speech → Google → Instal data suara → Chinese (Taiwan). Lalu buka ulang app.':
    ['For a real Taiwanese accent: iPhone → Settings → Accessibility → Spoken Content → Voices → Chinese (Taiwan) Mei-Jia. Android → Settings → Text-to-speech → Google → Install voice data → Chinese (Taiwan). Then reopen the app.',
     'Para sa totoong Taiwanese accent: iPhone → Settings → Accessibility → Spoken Content → Voices → Chinese (Taiwan) Mei-Jia. Android → Settings → Text-to-speech → Google → Install voice data → Chinese (Taiwan). Tapos buksan ulit ang app.'],
  'Tampilan': ['Appearance', 'Itsura'], 'Tema': ['Theme', 'Tema'], 'Terang': ['Light', 'Maliwanag'], 'Gelap': ['Dark', 'Madilim'],
  'Mode ringan': ['Light mode (performance)', 'Light mode (performance)'],
  'Matikan efek blur kaca supaya lebih lancar di HP.': ['Turns off the glass blur so the app runs smoother on phones.', 'Pinapatay ang glass blur para mas smooth sa phone.'],
  '(sedang aktif)': ['(currently on)', '(naka-on ngayon)'], 'Ringan': ['Light', 'Magaan'], 'Penuh': ['Full', 'Buo'],
  'Data & progres': ['Data & progress', 'Data at progress'],
  'Progres tersimpan otomatis di perangkat ini. Ekspor cadangan sesekali.': ['Progress is saved automatically on this device. Export a backup now and then.', 'Awtomatikong naka-save ang progress sa device na ito. Mag-export ng backup paminsan-minsan.'],
  'Ekspor cadangan': ['Export backup', 'I-export ang backup'], 'Impor': ['Import', 'Import'], 'Reset semua': ['Reset everything', 'I-reset lahat'],
  'Hapus SEMUA progres? Ini tidak bisa dibatalkan.': ['Delete ALL progress? This cannot be undone.', 'Burahin ANG LAHAT ng progress? Hindi na ito maibabalik.'],
  'Timpa progres di perangkat ini dengan cadangan?': ['Overwrite the progress on this device with the backup?', 'Papalitan ang progress sa device na ito gamit ang backup?'],
  '⚠️ File cadangan tidak valid': ['⚠️ That backup file is not valid', '⚠️ Hindi valid ang backup file'],
  '⬇️ Cadangan diunduh': ['⬇️ Backup downloaded', '⬇️ Na-download ang backup'],
  '🎯 Target {v} hari · {n} kata baru hari ini': ['🎯 Target {v} days · {n} new words today', '🎯 Target {v} araw · {n} bagong salita ngayon'],
  '⚠️ Penyimpanan penuh — ekspor cadanganmu di menu Saya': ['⚠️ Storage is full — export your backup from the Me menu', '⚠️ Puno ang storage — i-export ang backup mo sa Me menu'],

  /* onboarding */
  'Selamat datang di Xiǎobù!': ['Welcome to Xiǎobù!', 'Maligayang pagdating sa Xiǎobù!'],
  'Langkah kecil tiap hari → Mandarin Taiwan level A2. {w} kata TOCFL, {c} hanzi dengan cerita bentuk, misi harian, dan suara bernada asli.':
    ['Small steps every day → Taiwanese Mandarin at A2. {w} TOCFL words, {c} hanzi with shape stories, daily quests, and real tone audio.',
     'Maliliit na hakbang araw-araw → Taiwanese Mandarin hanggang A2. {w} salitang TOCFL, {c} hanzi na may kwento ng hugis, daily quests, at totoong tunog ng tono.'],
  'Target A2 dalam': ['Reach A2 in', 'Abutin ang A2 sa'], 'kata baru/hari': ['new words/day', 'bagong salita/araw'],
  'Mulai dari nol': ['Start from zero', 'Magsimula sa zero'], 'Sudah tahu dasar? Tes lompat': ['Already know the basics? Skip test', 'Alam mo na ang basics? Skip test'],
  'Progres disimpan di perangkat ini. Tidak perlu akun.': ['Progress is stored on this device. No account needed.', 'Naka-store ang progress sa device na ito. Walang kailangang account.'],
  'Bisa diganti kapan saja di menu Saya.': ['You can change this any time in the Me menu.', 'Mapapalitan mo ito anumang oras sa Me menu.'],

  /* statistik */
  'kata dikenal': ['words known', 'salitang kilala'], 'akurasi total': ['overall accuracy', 'kabuuang tama'], 'menit belajar': ['minutes studied', 'minutong pag-aaral'],
  'streak terbaik': ['best streak', 'pinakamahabang streak'], 'Kalender belajar': ['Study calendar', 'Kalendaryo ng pag-aaral'],
  'Makin ungu = makin banyak XP hari itu.': ['The more purple, the more XP that day.', 'Mas lila, mas maraming XP nang araw na iyon.'],
  '14 hari terakhir': ['Last 14 days', 'Huling 14 araw'], 'kata baru + ulangan per hari': ['new words + reviews per day', 'bagong salita + review kada araw'],
  'Akurasi per jenis soal': ['Accuracy by question type', 'Tama kada uri ng tanong'],
  'Jenis soal terlemah otomatis lebih sering muncul.': ['Your weakest question type shows up more often.', 'Mas madalas lumabas ang pinakamahina mong uri ng tanong.'],
  'Tingkat penguasaan per level': ['Mastery by level', 'Bihasa kada level'], 'Lencana': ['Badges', 'Badges'],
  'Arti kata': ['Word meaning', 'Kahulugan'], 'Pilih hanzi': ['Pick hanzi', 'Piliin ang hanzi'], 'Mendengar': ['Listening', 'Pakikinig'], 'Arti hanzi': ['Hanzi meaning', 'Kahulugan ng hanzi'],
  'Kata pertama': ['First word', 'Unang salita'], '50 kata': ['50 words', '50 salita'], '150 kata': ['150 words', '150 salita'], '400 kata': ['400 words', '400 salita'], '800 kata': ['800 words', '800 salita'],
  'Semua kata A2': ['All A2 words', 'Lahat ng A2'], '100 dikuasai': ['100 mastered', '100 bihasa'], 'Streak 3': ['Streak 3', 'Streak 3'], 'Streak 7': ['Streak 7', 'Streak 7'], 'Streak 30': ['Streak 30', 'Streak 30'],
  'Combo 20': ['Combo 20', 'Combo 20'], '5 cerita sendiri': ['5 own stories', '5 sariling kwento'], 'Bunga mekar penuh': ['Full bloom', 'Bukadkad na bulaklak'],
  'Novice 1 tuntas': ['Novice 1 complete', 'Tapos ang Novice 1'], 'Novice 2 tuntas': ['Novice 2 complete', 'Tapos ang Novice 2'], 'Level 1 tuntas': ['Level 1 complete', 'Tapos ang Level 1'],

  /* insight & tempo */
  'Nada {a} sering kamu kira nada {b}.': ['You often hear tone {a} as tone {b}.', 'Madalas mong marinig ang tono {a} bilang tono {b}.'],
  'Latih nada': ['Drill tones', 'Drill ang tono'], 'Latih sekarang': ['Practise now', 'Mag-practice ngayon'], 'Lihat': ['View', 'Tingnan'],
  'Bagian terlemahmu: {k} ({p}%). Sesi berikutnya akan lebih sering melatihnya.':
    ['Your weakest area: {k} ({p}%). The next sessions will drill it more often.', 'Pinakamahina mo: {k} ({p}%). Mas madadalas ito sa susunod na sessions.'],
  '{n} kata bandel sering lupa. Buat cerita sendiri untuk hanzinya — cerita pribadi paling nempel.':
    ['{n} tricky words keep slipping away. Write your own story for their hanzi — personal stories stick best.',
     '{n} matitigas na salita ang laging nakakalimutan. Sumulat ng sariling kwento para sa hanzi nila — mas dumidikit ang personal.'],
  'Jam emasmu sekitar pukul {h}.00 — akurasimu paling tinggi di jam itu.': ['Your golden hour is around {h}:00 — your accuracy peaks then.', 'Ang golden hour mo ay bandang {h}:00 — doon pinakamataas ang tama mo.'],
  'Akurasi 7 hari terakhir {p}%.': ['Accuracy over the last 7 days: {p}%.', 'Tama sa huling 7 araw: {p}%.'],
  'Tempo kata baru bisa naik.': ['Your new-word pace can go up.', 'Pwedeng bilisan ang bagong salita kada araw.'],
  'Tempo kata baru diperlambat supaya ingatan mantap.': ['The new-word pace is slowed so memories settle.', 'Binagalan ang bagong salita para tumatag ang memorya.'],
  'Makin sering kamu pakai, makin pintar app ini membaca kebiasaanmu: jam belajar, nada yang tertukar, dan jenis soal terlemah.':
    ['The more you use it, the better this app reads your habits: study hours, mixed-up tones, and your weakest question type.',
     'Mas madalas mong gamitin, mas nababasa ng app ang ugali mo: oras ng pag-aaral, napagpapalit na tono, at pinakamahinang uri ng tanong.'],
  'sesuai target': ['on target', 'nasa target'],
  'ulangan menumpuk — fokus mengulang dulu': ['reviews piled up — focus on reviewing first', 'dumami ang review — mag-review muna'],
  'ulangan agak banyak': ['a few too many reviews', 'medyo maraming review'],
  'akurasi turun — tempo diperlambat sedikit': ['accuracy dipped — pace slowed a little', 'bumaba ang tama — bahagyang binagalan'],
  'akurasi tinggi — tempo dinaikkan': ['accuracy is high — pace raised', 'mataas ang tama — binilisan'],

  /* POS */
  'kata benda': ['noun', 'pangngalan'], 'kata kerja': ['verb', 'pandiwa'], 'kata kerja intransitif': ['intransitive verb', 'pandiwang intransitive'],
  'kata sifat': ['adjective', 'pang-uri'], 'kata sifat (atributif)': ['adjective (attributive)', 'pang-uri (attributive)'], 'kata sifat (predikat)': ['adjective (predicate)', 'pang-uri (predicate)'],
  'kata kerja keadaan': ['stative verb', 'stative verb'], 'kata kerja proses': ['process verb', 'process verb'], 'kata kerja bantu': ['auxiliary verb', 'pantulong na pandiwa'],
  'kata kerja pisah': ['separable verb', 'separable verb'], 'sifat pisah': ['separable adjective', 'separable adjective'], 'proses pisah': ['separable process verb', 'separable process verb'],
  'kata keterangan': ['adverb', 'pang-abay'], 'kata bantu bilangan': ['measure word', 'pantukoy sa bilang'], 'partikel': ['particle', 'partikula'],
  'konjungsi': ['conjunction', 'pangatnig'], 'preposisi': ['preposition', 'pang-ukol'], 'penentu': ['determiner', 'panuring'],

  /* error & misc */
  'Halaman gagal dimuat': ['This page failed to load', 'Hindi na-load ang page na ito'], 'Muat ulang': ['Reload', 'I-reload'],
  '🩹 Ada gangguan kecil — soal dilewati': ['🩹 Small hiccup — question skipped', '🩹 May maliit na aberya — nilaktawan ang tanong'],
  '🩹 Ups, ada gangguan kecil. Coba lagi ya.': ['🩹 Oops, small hiccup. Please try again.', '🩹 Ay, maliit na aberya. Subukan ulit.'],
  'Selesaikan atau tutup sesi yang sedang berjalan dulu ✨': ['Finish or close the running session first ✨', 'Tapusin o isara muna ang kasalukuyang session ✨'],
  '✨ Versi baru terpasang': ['✨ New version installed', '✨ Na-install ang bagong bersyon']
};
function t(str, vars) {
  let out = str;
  const ui = (typeof S !== 'undefined' && S && S.settings && S.settings.ui) || 'id';
  if (ui !== 'id') {
    const e = I18N[str];
    if (ui === 'vi') {
      const v = typeof I18N_VI !== 'undefined' ? I18N_VI[str] : null;
      if (v) out = v;
      else if (e) { out = e[0]; if (typeof MISSING_T !== 'undefined') MISSING_T.add(str); }
      else if (typeof MISSING_T !== 'undefined') MISSING_T.add(str);
    } else if (e) out = ui === 'en' ? e[0] : e[1];
    else if (typeof MISSING_T !== 'undefined') MISSING_T.add(str);
  }
  if (vars) out = out.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
  return out;
}
const MISSING_T = new Set();