# PRD — Xiǎobù Kelas (小步) V1.6

| | |
|---|---|
| **Produk** | Xiǎobù Kelas — app belajar Mandarin Taiwan (TOCFL) |
| **Versi yang didokumentasikan** | V1.6 (kode cache `k160`) |
| **Tanggal dokumen** | 11 November 2026 |
| **Sumber** | Disusun dari kode di folder ini (`app.js`, `data.js`, `sd.js`, `ctx.js`, `tocfl.js`, `mdict.js`, `sw.js`). Bukan dari dokumen desain asli. |

> **Catatan cara baca.** PRD ini hasil membaca kode, jadi isinya menggambarkan apa yang *sudah ada* di V1.6. Bagian yang merupakan tafsiran saya (bukan fakta dari kode) ditandai **(tafsiran)**. Angka jumlah konten dihitung dari file data; yang tidak bisa dihitung pasti ditulis "±".

---

## 1. Ringkasan

Xiǎobù ("langkah kecil") adalah PWA statis tanpa akun dan tanpa server sendiri. Pengguna belajar kosakata, hanzi, nada, tata bahasa, menyimak, dan berbicara Mandarin Taiwan lewat porsi harian kecil, ulangan berjarak (FSRS), dan banyak mini-game. Edisi "Kelas" menambahkan materi buku pelajaran yang dipakai di kelas 林老師, simulasi tes TOCFL Band A, jalur lanjutan A2 → B1, serta kosakata ranah kerja (pabrik semikonduktor) dan kampus (teknik elektro).

Semua progres disimpan di perangkat pengguna. Internet hanya diperlukan untuk memuat app pertama kali, font, data goresan hanzi, mode online (duel/arena), dan video YouTube.

## 2. Tujuan produk

1. Membawa pemula dari nol ke **TOCFL A2** dalam target waktu yang dipilih pengguna (bawaan 70 hari, rentang 20–365 hari).
2. Membantu murid **menghatamkan materi kelas** (kosakata, dialog, grammar, latihan dari buku) dengan babak-babak kecil.
3. Menyiapkan pengguna untuk **tes TOCFL Band A** dengan simulasi berformat resmi.
4. Melanjutkan ke **B1** dan ke bahasa yang dipakai di tempat kerja/kuliah di Taiwan.
5. Menjaga kebiasaan belajar harian lewat misi, streak, peringkat, dan game.

## 3. Pengguna sasaran

- **Murid kelas Mandarin 林老師** yang memakai 華語準備級課程(一) dan 當代中文課程 第一冊.
- **Pembelajar mandiri** yang mengejar TOCFL Band A (materi 時代華語 1).
- **Pekerja pabrik semikonduktor** (dek istilah ASE · equipment engineering) dan **mahasiswa teknik elektro** di Taiwan.
- Penutur **Indonesia** (bahasa utama), **Inggris**, **Filipino**, dan **Vietnam**. **(tafsiran: sasaran utamanya pelajar/pekerja migran Asia Tenggara di Taiwan.)**

## 4. Prinsip produk

- **Tanpa akun.** Progres ada di perangkat; pindah perangkat lewat kode progres atau file cadangan.
- **Mandarin Taiwan.** Hanzi tradisional, bacaan pinyin versi Taiwan, suara `zh-TW`.
- **Porsi kecil dan adaptif.** Jumlah kata baru per hari dihitung ulang dari sisa kata, tumpukan ulangan, dan akurasi 7 hari.
- **Tidak ada yang dikunci.** Urutan hanya disarankan; pengguna boleh melompat (ada tes lompat).
- **Tanpa aset luar.** Ikon, maskot, grafis game, musik, dan efek suara dibuat dengan SVG/kanvas/Web Audio.
- **Pengguna memegang kendali.** Status kata/grammar/hanzi otomatis dari latihan, tapi bisa diubah manual.

## 5. Platform & arsitektur

| Aspek | Keadaan di V1.6 |
|---|---|
| Bentuk | PWA statis: `index.html` + JS/CSS polos, tanpa build step, tanpa framework |
| Hosting | Netlify, `publish = "."`; `index.html` dan `sw.js` dikirim `no-cache` |
| Offline | Service worker: shell network-first (timeout 3,5 dtk, cadangan cache), aset berversi cache-first |
| Navigasi | Rute berbasis hash (`#home`, `#kelas`, …); bar bawah di HP, sidebar di layar lebar |
| Penyimpanan | `localStorage` (kunci `xiaobu.v1`) + snapshot harian di IndexedDB (5 terakhir) |
| File yang dimuat saat boot | `data.js`, `sd.js`, `app.js` |
| File yang dimuat saat dibutuhkan | `ctx.js` (Kalimat nyata), `tocfl.js` (simulasi tes), `hw.js` (goresan hanzi), `mdict.js` (kamus Nonton) |
| Layanan luar | Google Fonts; jsDelivr/unpkg (data goresan hanzi); Supabase Realtime (duel & arena online); YouTube (Nonton & Dengar); adaptor suara cloud opsional |
| Bahasa UI | Indonesia (sumber), Inggris, Filipino, Vietnam |
| Tema | Otomatis / Terang / Redup, plus "Mode ringan" tanpa efek blur untuk HP lemah |

## 6. Konten

| Konten | Jumlah | Sumber di kode |
|---|---|---|
| Kata TOCFL, 7 level (Novice 1 → Level 5) | 10.941 (200 · 536 · 904 · 1.786 · 2.087 · 2.652 · 2.776) | `data.js` |
| Kata sasaran A2 (4 level pertama) | 3.426 | `data.js` |
| Hanzi dengan cerita bentuk | ±880 | `CH_T`, `data.js` |
| Kalimat contoh nyata | 3 kalimat untuk 3.909 kata | `ctx.js` |
| Lesson kelas | 16 (準備級 L1–6 + 當代中文 第一冊 L6–16*) | `KLS` |
| Lesson Khatam Band A (時代華語 1) | 15 | `sd.js` |
| Pola tata bahasa dasar | 21 (3 tingkat) | `GP` |
| Pola tata bahasa A2 → B1 | 50 | `GRAM2` |
| Skenario percakapan | 38 (14 sehari-hari · 12 kampus · 12 pabrik) | `CONV` |
| Tema kosakata | 21 | `TEMA` |
| Ungkapan slang Taiwan | ±76 | `SLANG` |
| Set huruf kembar bergerak | 123 huruf beranimasi | `TWD` |
| Piktogram vektor hanzi | 179 | `PICTO` |
| Kamus Nonton | CC-CEDICT + Unihan, ±5 MB | `mdict.js` |

\* Rentang L6–16 mengikuti deskripsi di manifest; data berisi 10 lesson untuk buku ini.

---

## 7. Fitur

Setiap fitur ditulis sebagai: **tujuan**, lalu **perilaku** yang harus dipenuhi.

### 7.1 Onboarding

**Tujuan:** pengguna bisa mulai belajar dalam satu layar.

- Minta nama panggilan dan target hari menuju A2; tampilkan perkiraan kata baru per hari.
- Dua pintu masuk: **Mulai dari nol** atau **Tes lompat** untuk yang sudah tahu dasar.
- Tawarkan **Tempel kode progres** / **Pilih file cadangan** bagi pengguna lama.
- Tegaskan bahwa progres disimpan di perangkat dan tidak perlu akun.

### 7.2 Beranda

**Tujuan:** satu tempat untuk tahu "hari ini mengerjakan apa".

- Sapaan sesuai waktu + maskot **Hacimi 哈吉咪** (bisa diketuk; 7 ekspresi).
- **Rute hari ini**: langkah bernomor (kata baru → ulangan → latihan) dengan tombol **Sesi pintar**.
- **Misi harian**: 5 misi per hari — kata baru, ulangan, nada, hanzi, dan 1 misi bonus yang bergilir atau diarahkan ke jenis soal terlemah. Tiga misi selesai menyalakan "api" hari itu.
- **Kekuatan ingatan**: jumlah kata hampir terlupa + tombol **Selamatkan**.
- **Mode cepat**: jalan pintas ke latihan bebas.
- **Peringkat & XP**, streak (dengan pembeku streak), dan kartu pengingat cadangan bila belum pernah mencadangkan.

### 7.3 Mesin belajar inti

**Tujuan:** memilih soal yang tepat pada waktu yang tepat.

- **Ulangan berjarak FSRS-5** (Difficulty, Stability, Retrievability) dengan 4 penilaian: Lupa · Sulit · Bisa · Mudah. Kartu lama bermodel SM-2 dimigrasikan otomatis.
- **Otak adaptif**: mencatat akurasi per jenis soal, kekeliruan antar-nada (matriks 5×5), jam belajar terbaik, waktu jawab rata-rata, dan ukuran sesi yang cocok.
- **Rencana harian**: kata baru = sisa kata A2 ÷ sisa hari, lalu dikoreksi — dikurangi bila ulangan menumpuk (>80 / >150) atau akurasi 7 hari <72%, dinaikkan bila akurasi >90%. Batas 6–40 kata. Alasan penyesuaian ditampilkan ke pengguna.
- **Jenis soal**: pilihan arti, pilihan hanzi, dengar, nada, ketik pinyin, pasangkan kata, susun kalimat, tulis hanzi, kartu ingat. Proporsinya mengikuti tingkat penguasaan kata.
- **Mesin kalimat**: kalimat dibentuk dari kerangka + slot acak, sehingga soal praktis tidak habis.
- **Lembar "Mode" sebelum aktivitas**: tampil/sembunyikan pinyin, terjemahan, hanzi; pilihan disimpan per jenis aktivitas.

### 7.4 Kosakata

| Menu | Perilaku |
|---|---|
| **Jalur A2** (`path`) | Peta 7 level TOCFL; tiap level dipecah per topik jadi unit ≤8 kata (level tinggi: paket 40 kata). Menampilkan kemajuan per unit. |
| **Kata** (`words`) | Kamus dengan pencarian (hanzi/pinyin/arti), filter level dan status, kartu detail kata. |
| **Kalimat nyata** (`kalimat`) | Tiap kata dalam 3 kalimat nyata dengan pinyin dan terjemahan 4 bahasa; ada mode kuis. |
| **Kelas Tema** | 21 tema (Novice 1 → A2). Tabel kata yang bisa disembunyikan kolomnya → belajar per set (Kenalan → Latihan → Kalimat → Pola → Rangkuman) → ujian tema, lulus ≥80%. |
| **Speedrun 50 kata** | Kenalan + hafalan dalam satu babak berwaktu: sprint per 10 kata, ujian akhir 15 soal, rekor pribadi (sah bila akurasi ≥70%). |
| **Dengar 50 kata** | Sesi menyimak 50 kata berturut-turut. |

### 7.5 Hanzi

| Menu | Perilaku |
|---|---|
| **Hanzi Lab** (`hanzi`) | Hanzi hari ini, hanzi per level, 46 radikal penting dengan cerita, "lensa bagian" (tiap potongan huruf punya nama, arti, bunyi), asal-usul komponen, piktogram vektor, daftar kata yang memakai huruf itu, dan kolom **cerita buatan sendiri**. |
| **Menulis** (`write`) | Latihan goresan dengan jari; 6 aturan urutan goresan; mode kata (huruf ditulis berurutan, otomatis lanjut). |
| **Studio menulis** | Papan besar (tablet: dua panel), dukungan pena dengan penolakan telapak tangan, dan tangga penguasaan per huruf: L0 Kenalan → L1 Jiplak → L2 Petunjuk awal → L3 Ingat sendiri → L4 Hafal (ulangan berjarak). Ada peta penguasaan dan hasil menulis. |
| **Huruf kembar** (`twins`) | Kelompok huruf yang mirip: beda nada, sama bunyi, sama bagian. |
| **Huruf Kembar Bergerak** | Animasi morph antar-huruf mirip (goresan dicocokkan lalu diinterpolasi): galeri set, pemutar reel, kuis. |
| **Galeri gambar hanzi** | Koleksi piktogram per huruf. |

### 7.6 Nada & pelafalan

- **Panduan nada** (`tones`): 4 nada + netral, aturan sandhi, pasangan yang sering tertukar.
- **Sintesis kontur nada**: bunyi nada murni (skala Chao 5 tingkat) bisa diputar sebelum kata.
- **Suara**: TTS `zh-TW` dari perangkat; pemilih suara dengan peringkat kualitas; satu suara dipakai di semua menu; tokoh dialog dibedakan lewat tinggi nada; adaptor suara cloud opsional.
- **Kecepatan bicara** 4 tingkat dan tombol "kura-kura" (per suku kata).
- **Papan tik pinyin**: keyboard app dengan tombol nada 1–4, atau keyboard HP dengan angka (`ni3hao3`).

### 7.7 Menyimak

| Menu | Perilaku |
|---|---|
| **Simak** (`listen`) | Latihan tanpa batas (kalimat acak sesuai level: dengar & isi, dengar & pahami) dan cerita pendek dengan 3 pertanyaan pemahaman. Bila suara tidak tersedia, teks ditampilkan. |
| **Game Dengar** (`lgame`) | 6 mini-game layar penuh: Tangkap Bunyi · Pemburu Nada · Dikte Kilat · Susun Kalimat Dengar · Ucapkan! (pelafalan) · Hujan Kata. Pengguna memilih sumber kata; ada daftar "sering salah dengar". |
| **Nonton & Dengar** (`nonton`) — baru di V1.6 | Lihat 7.12. |

### 7.8 Tata bahasa & percakapan

| Menu | Perilaku |
|---|---|
| **Tata bahasa** (`grammar`) | 5 tingkat (Dasar → B1+), pencarian, halaman per pola dengan contoh bersuara, bagian **Logika Mandarin vs Indonesia**, dan latihan. Status: Belum · Ragu · Paham. |
| **Percakapan** (`conv`) | 38 skenario di 3 ranah. Tiap skenario: tujuan, gelembung chat, putar semua, **shadowing** (dengar → rekam → bandingkan), **role-play** (pilih peran A/B), frasa kunci, pola yang dipakai, tugas bicara, kuis. |
| **Jalur A2 → B1** | Kurikulum bertahap: A2-1…A2-6 (konsolidasi), B1-1…B1-12, lalu B1+. Tiap tahap: 1–2 pola, 1 skenario, ±20 kata, tugas bicara, checkpoint campuran. |
| **Slang Taiwan** (`slang`) | Ungkapan santai dengan padanan lokal, 3 tingkat register (santai · gaul/online · agak kasar) dan catatan kapan boleh dipakai. Mode belajar berurutan, kuis slang, dengar & tebak, pencarian. |

### 7.9 Kelas (`kelas`)

**Tujuan:** menghatamkan materi buku yang dipakai di kelas.

- **Tiga buku**: 華語準備級課程(一), 當代中文課程 第一冊, dan 時代華語 1 (Khatam Band A).
- **Peta lesson**: kartu per lesson dengan persentase, jumlah kata inti/total, dan babak berikutnya.
- **Dua cara belajar**: **Bertahap** (6 babak berurutan; babak lulus terkunci ✓) atau **Kilat ±12 menit** (inti semua babak, lalu ujian khatam).
- **Per lesson**: kosakata per grup (inti, dialog 1, dialog 2, tambahan), kartu kata + penalaran hanzi, latih menulis, **dialog** (putar, main peran dengan baris disembunyikan dan jeda bicara), grammar, dan semua latihan dari buku (pilih jawaban, susun kalimat, benar/salah) plus soal serupa.
- **Flashcard sistem kotak**: pilih lesson, arah kartu, dan jumlah; hafal naik kotak, lupa kembali ke kotak 0.
- **Kuis kelas**: rakit sendiri (lesson, jenis soal, jumlah); soal salah diulang di akhir; ada simulasi ujian campur.
- **Latihan khusus**: bagian yang paling sering salah, soal acak tanpa batas.
- **Ringkasan grammar semua lesson** dalam satu halaman.
- **Bicara**: kartu perkenalan diri dan menjawab pertanyaan kelas dengan suara.
- **Arcade kelas**: game monster dengan kata dari lesson pilihan; jawaban ikut dihitung sebagai ulangan.

#### Khatam Band A (時代華語 1, 15 lesson)

- Alur mengikuti buku: 對話一 → 生詞 → 語法 + latihan → 對話二 → … → 短文 → aktivitas kelas → kuis kecil.
- **Ujian bab** gaya TOCFL setiap 4 lesson.
- **Metode belajar**: bagian mikro 5–8 menit, **Rencana hari ini** dengan intensitas Santai/Normal/Ngebut, ulang buku berjarak 1·3·7·14·30 hari dengan soal diselang-seling antar lesson, **tes lompat** (lulus ≥85% boleh dilewati).
- **Dialog bertahap**: audio → pinyin → hanzi → arti; shadowing dengan rekam & bandingkan.
- **Grammar**: pola → 2 contoh → susun kalimat sendiri → isi → jelaskan "kenapa".
- **Dek "Kesalahan saya"** diulang di akhir sesi dan besoknya.

### 7.10 Simulasi Tes TOCFL Band A

- Format mengikuti panduan resmi: **Listening 50 soal** (4 bagian, ±60 menit) dan **Reading 50 soal** (5 bagian, 60 menit); skor 0–80; batas Level 1 = 42 (L) / 41 (R), Level 2 = 60.
- Soal dan ilustrasi **orisinal**, bukan soal resmi.
- Pengaturan: paket soal/acak, bagian (Lengkap, L, atau R), mode **Ujian** atau **Latihan + pembahasan**, audio diputar 1× atau 2×.
- Selama tes: ringkasan soal, konfirmasi kumpulkan, jeda istirahat.
- **Riwayat skor** dengan grafik dan skor terbaik per bagian.

### 7.11 Game

| Game | Perilaku |
|---|---|
| **Arcade 漢字 Monster** (`arcade`) | Monster punya "perisai kata"; baca arti, pilih hanzi sebelum waktu habis. Kata yang hampir terlupa lebih sering muncul. Ada stage, koin, skor terbaik, dan **Buku monster** (naga di stage 5). |
| **Duel Hanzi 漢字對決** | 1 lawan 1 dengan HP. Jawab kartu (arti/pinyin/dengar/nada/gambar) untuk menyerang; 3 benar beruntun membuka **combo** susun kalimat; energi untuk 盾 perisai, 霧 kabut, 治 pulih. Mode: **online** (kode room atau lawan acak), **2 pemain di 1 HP** (layar dibagi), **lawan bot**. Online memakai seed yang sama agar soal identik. Menangani lawan terputus, tanding ulang, dan menang W.O. |
| **Arena Game** (`arena`) | Hub 3 game dengan pilihan sumber kata dan rekor: **競舟 Balap Perahu Naga** (benar & cepat = dorongan, 5 beruntun = nitro), **節奏偶像 Ritme Idol** (not ber-hanzi jatuh mengikuti ketukan; ketuk jalur yang benar), **句子大作戰 Duel Kalimat** (lawan 3 boss + boss final 2 fase dengan tugas susun/isi/dengar kalimat). |
| **Arena Online** | Lobby bersama untuk ketiga game arena: buat room, gabung dengan kode, atau main cepat. Soal dibuat host lalu dikirim ke semua pemain. |

### 7.12 Nonton & Dengar (baru di V1.6)

**Tujuan:** belajar dari lagu, drama, dan video pilihan pengguna sendiri.

- Pengguna menempel **link YouTube** dan **teks Mandarin**: `.srt`, `.vtt`, `.lrc`, teks biasa per baris, atau file dari perangkat. Terjemahan opsional.
- Video diputar di dalam app; teks berjalan sinkron per baris: hanzi + pinyin bacaan Taiwan + arti per kata.
- **Hanzi sederhana otomatis diubah ke tradisional.**
- Alat belajar: ulang baris, jeda di akhir tiap baris (shadowing), geser waktu, **ketuk-sinkron** untuk teks tanpa waktu, dan **mode suara** (TTS) bila tanpa video.
- Ketuk kata → arti dari kamus app, lalu CC-CEDICT, lalu tabel huruf Unihan → **simpan ke kartu hafalan** (hanya kata yang ada di kamus Xiǎobù).
- **Koleksiku** + contoh bawaan. Batas 1.500 baris per teks.
- Kamus diunduh sekali, lalu bisa dipakai offline. Link dan teks hanya disimpan di perangkat.

### 7.13 Ranah kerja & kampus

- **Mandarin Industri / Pabrik** (`fab`): istilah semikonduktor per bidang (proses wafer, cleanroom, packaging & testing, perawatan mesin, kerja di pabrik), kalimat siap pakai di lantai produksi, contoh laporan serah terima shift, dan pola grammar dalam konteks ini.
- **Kampus Elektro** (`kampus`): kosakata per bidang (kuliah, listrik & rangkaian, alat ukur, mekatronika, pemrograman & embedded, keselamatan lab) plus pola grammar terkait.
- Kata dari kedua ranah memakai mesin yang sama (ulangan berjarak, kuis, suara, game).

### 7.14 Ingatan, progres, dan statistik

| Menu | Perilaku |
|---|---|
| **Ingatan** (`memory`) | Rata-rata peluang ingat, jumlah hampir terlupa dan jatuh tempo, **kurva lupa**, jadwal ulangan 7 hari, daftar "paling rapuh", kartu ingat, pengingat "ulang sebelum tidur", dan penjelasan kenapa metodenya berhasil. |
| **Progres** (`prog`) | Satu model status untuk semua materi. Kata: Baru · Belajar · Kenal · Paham · Hafal · Abaikan. Grammar: Belum · Ragu · Paham. Tren 30 hari, ramalan ulangan 7 hari, penguasaan per level TOCFL dan per lesson, daftar kata dengan cari/urut/filter, ubah status massal, dan tombol "latih yang lemah". |
| **Statistik** (`stats`) | Kalender belajar, 14 hari terakhir, akurasi per jenis soal, penguasaan per level, dan **17 lencana** (jumlah kata, streak 3/7/30, combo 20, cerita sendiri, hanzi ditulis, level tuntas). |

### 7.15 Saya & pengaturan (`me`)

- **Profil**: nama panggilan, peringkat, target A2.
- **Pasang di HP**: petunjuk iPhone/Safari dan Chrome, tombol pasang.
- **Bahasa**: bahasa aplikasi, bahasa arti utama, bahasa subtitel.
- **Belajar**: target hari, papan tik pinyin, mode pinyin (tanda nada / angka / sembunyi), mode belajar bawaan.
- **Suara & nada**: efek suara, putar otomatis, isyarat kontur nada, pemilih suara, kecepatan.
- **Tampilan**: tema dan mode ringan.
- **Data & progres**: ekspor/impor cadangan, kode progres, reset.

### 7.16 Keamanan progres

- **Simpan otomatis** ke `localStorage` (ditunda 300 ms; langsung saat halaman disembunyikan). Peringatan bila penyimpanan gagal (mis. mode Penjelajahan Pribadi iPhone).
- **Snapshot harian** di IndexedDB (5 terakhir) dan permintaan penyimpanan permanen.
- **Kode progres** (teks berawalan `XB1:` / `XB0:`) untuk disalin dan ditempel di perangkat lain.
- **File cadangan** yang bisa diekspor lewat share sheet iPhone.
- **Kunci stabil**: progres dikaitkan ke bentuk hanzi, bukan nomor urut, sehingga tidak rusak saat daftar kata berubah antar versi.
- **Perbaikan data saat muat**: nilai rusak dibuang atau dinormalkan; bila gagal total, kembali ke keadaan awal.
- **Pengingat cadangan** saat pengguna sudah belajar cukup banyak tetapi belum pernah mencadangkan.

---

## 8. Kebutuhan non-fungsional

| Area | Kebutuhan |
|---|---|
| **Perangkat** | Utamanya HP potret; tata letak lebar untuk tablet/desktop (sidebar, dua panel). |
| **Kinerja** | Mode ringan otomatis pada perangkat ≤4 GB RAM / ≤4 inti atau bila pengguna memilih mengurangi transparansi. File data besar dimuat hanya saat dibutuhkan. |
| **Offline** | Semua fitur inti jalan offline setelah kunjungan pertama. Pengecualian: mode online, YouTube, dan unduhan pertama kamus/kalimat/goresan. |
| **Pembaruan** | Shell selalu dicoba dari jaringan dulu supaya perbaikan cepat sampai; cache lama dihapus saat versi naik. |
| **Privasi** | Tanpa akun, tanpa analitik di kode. Data belajar, link video, dan teks pengguna tidak dikirim ke server. Mode online hanya mengirim nama, avatar, dan aksi permainan. |
| **Aksesibilitas** | Tema terang/redup, ikon SVG seragam, teks pengganti saat suara tidak tersedia. |
| **Lisensi** | `mdict.js` turunan CC-CEDICT (CC BY-SA 3.0) dan Unihan/pinyin-data (MIT); `LICENSES-kamus.txt` wajib ikut dibagikan. |

## 9. Ketergantungan & risiko

| Ketergantungan | Dipakai untuk | Risiko |
|---|---|---|
| Suara TTS `zh-TW` di perangkat | Hampir semua latihan dengar/bicara | Kualitas dan ketersediaan berbeda per HP; app sudah punya jalur cadangan teks. |
| Supabase Realtime (satu proyek) | Duel & Arena online | Bila proyek mati atau kuota habis, mode online tidak jalan; mode bot dan 1 HP tetap jalan. |
| YouTube IFrame | Nonton & Dengar | Video bisa dihapus atau diblokir untuk disematkan. |
| CDN jsDelivr/unpkg | Data goresan hanzi | Latihan menulis huruf yang belum pernah dibuka butuh internet. |
| `localStorage` | Seluruh progres | Hilang bila data browser dibersihkan atau alamat situs berganti; diimbangi snapshot, kode progres, dan file cadangan. |
| Satu file `app.js` ±24 ribu baris | Semua logika | Sulit dirawat; modul lama dibungkus modul baru alih-alih diubah, jadi perubahan mudah menimbulkan efek samping. |

## 10. Di luar cakupan V1.6

- Akun, login, dan sinkronisasi progres antar perangkat lewat server.
- Papan peringkat global atau fitur sosial selain room permainan.
- Dasbor guru untuk memantau murid.
- Pengenalan suara yang menilai pelafalan secara otomatis (yang ada: rekam & bandingkan, nilai diri).
- Konten di atas B1+ sebagai kurikulum terstruktur (kata Level 3–5 tersedia hanya sebagai paket kosakata).
- Aksara sederhana (app sengaja memakai tradisional).

## 11. Pertanyaan terbuka

Hal-hal ini tidak bisa dijawab dari kode dan perlu keputusan pemilik produk:

1. **Hak pakai materi buku.** Kosakata, dialog, dan latihan diambil dari PDF buku pelajaran. Apakah app ini hanya untuk kelas sendiri, atau akan dibagikan lebih luas?
2. **Proyek Supabase.** Siapa pemiliknya, paket apa yang dipakai, dan berapa batas pemain serentak?
3. **Suara cloud.** Adaptornya ada di kode; penyedia mana yang dipakai dan siapa yang menanggung biayanya?
4. **Metrik keberhasilan.** Belum ada analitik. Apa ukuran suksesnya — jumlah murid yang khatam, skor TOCFL, atau hari aktif?
5. **Arah V1.7.** Tidak ada catatan rencana di folder ini.

## Lampiran A — Daftar rute

`home` Beranda · `kelas` Kelas · `prog` Progres · `memory` Ingatan · `listen` Simak · `conv` Percakapan · `nonton` Nonton & Dengar · `lgame` Game Dengar · `arena` Arena Game · `path` Jalur A2 · `words` Kata · `kalimat` Kalimat nyata · `hanzi` Hanzi Lab · `write` Menulis · `grammar` Tata bahasa · `kampus` Kampus Elektro · `fab` Mandarin Industri · `arcade` Arcade · `slang` Slang Taiwan · `twins` Huruf kembar · `tones` Nada · `stats` Statistik · `me` Saya

Tab bawah di HP: Beranda · Ingat · Simak · Kata, sisanya di "Lainnya".

## Lampiran B — Riwayat versi (dari komentar kode)

| Versi | Tambahan utama |
|---|---|
| v3–v7 | Tampilan dasar, i18n EN/PH, Ingatan, Simak, maskot |
| v8 | Lensa hanzi, huruf kembar, rute harian, komponen hanzi |
| v9 | Bahasa Vietnam untuk konten, menulis yang mengalir |
| v10 | Arcade 漢字 Monster, Slang Taiwan, Studio menulis, Speedrun, kode progres |
| v11 | Porsi harian disiplin, penalaran bentuk hanzi, kalimat nyata per kata |
| Kelas V0.2–V0.5 | Materi kelas, piktogram vektor, simulasi TOCFL Band A, Duel Hanzi |
| Kelas V0.7–V0.9 | Ikon kaca, Khatam Band A, Dengar 50 kata, simpan progres aman, Progres, metode belajar, Game Dengar, Kelas Tema |
| V1.0–V1.1 | Arena Game (3 game), Huruf Kembar Bergerak, Arena Online |
| V1.5 | Satu suara di semua menu, fondasi A2 → B1, tata bahasa 5 tingkat, Percakapan, hub Industri & Kampus |
| V1.6 | Nonton & Dengar, kamus CC-CEDICT |
