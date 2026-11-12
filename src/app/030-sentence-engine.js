/* ========== SENTENCE ENGINE ==========
   Kalimat dibentuk dari "frame" + slot acak, jadi soalnya praktis tak habis.
   Item slot: [hanzi, pinyin, id, en, tl, lv]                                   */
const SLOT = {
  subj: [['我', 'wǒ', 'aku', 'I', 'ako', 0], ['你', 'nǐ', 'kamu', 'you', 'ikaw', 0], ['他', 'tā', 'dia (lk)', 'he', 'siya', 0], ['她', 'tā', 'dia (pr)', 'she', 'siya', 0], ['我們', 'wǒmen', 'kami', 'we', 'kami', 0], ['他們', 'tāmen', 'mereka', 'they', 'sila', 1], ['老師', 'lǎoshī', 'guru', 'the teacher', 'ang guro', 0], ['媽媽', 'māma', 'ibu', 'mom', 'nanay', 0]],
  family: [['爸爸', 'bàba', 'ayah', 'dad', 'tatay', 0], ['媽媽', 'māma', 'ibu', 'mom', 'nanay', 0], ['哥哥', 'gēge', 'kakak laki-laki', 'older brother', 'kuya', 0], ['姐姐', 'jiějie', 'kakak perempuan', 'older sister', 'ate', 0], ['弟弟', 'dìdi', 'adik laki-laki', 'younger brother', 'bunsong kapatid na lalaki', 0], ['妹妹', 'mèimei', 'adik perempuan', 'younger sister', 'bunsong kapatid na babae', 0], ['朋友', 'péngyǒu', 'teman', 'friend', 'kaibigan', 0], ['同學', 'tóngxué', 'teman sekelas', 'classmate', 'kaklase', 1]],
  count: [['哥哥', 'gēge', 'kakak laki-laki', 'older brothers', 'kuya', 0], ['姐姐', 'jiějie', 'kakak perempuan', 'older sisters', 'ate', 0], ['弟弟', 'dìdi', 'adik laki-laki', 'younger brothers', 'kapatid na lalaki', 0], ['妹妹', 'mèimei', 'adik perempuan', 'younger sisters', 'kapatid na babae', 0], ['朋友', 'péngyǒu', 'teman', 'friends', 'kaibigan', 0], ['孩子', 'háizi', 'anak', 'children', 'anak', 1]],
  num: [['一', 'yī', 'satu', 'one', 'isa', 0], ['兩', 'liǎng', 'dua', 'two', 'dalawa', 0], ['三', 'sān', 'tiga', 'three', 'tatlo', 0], ['四', 'sì', 'empat', 'four', 'apat', 0], ['五', 'wǔ', 'lima', 'five', 'lima', 0]],
  food: [['麵', 'miàn', 'mi', 'noodles', 'pansit', 0], ['飯', 'fàn', 'nasi', 'rice', 'kanin', 0], ['水餃', 'shuǐjiǎo', 'pangsit rebus', 'dumplings', 'dumplings', 1], ['包子', 'bāozi', 'bakpao', 'steamed buns', 'siopao', 1], ['牛肉麵', 'niúròumiàn', 'mi daging sapi', 'beef noodles', 'beef noodles', 2], ['水果', 'shuǐguǒ', 'buah', 'fruit', 'prutas', 0], ['蛋糕', 'dàngāo', 'kue', 'cake', 'cake', 1], ['麵包', 'miànbāo', 'roti', 'bread', 'tinapay', 1]],
  drink: [['水', 'shuǐ', 'air putih', 'water', 'tubig', 0], ['茶', 'chá', 'teh', 'tea', 'tsaa', 0], ['咖啡', 'kāfēi', 'kopi', 'coffee', 'kape', 0], ['牛奶', 'niúnǎi', 'susu', 'milk', 'gatas', 1], ['果汁', 'guǒzhī', 'jus', 'juice', 'juice', 1], ['可樂', 'kělè', 'cola', 'cola', 'cola', 1]],
  place: [['學校', 'xuéxiào', 'sekolah', 'school', 'paaralan', 0], ['家', 'jiā', 'rumah', 'home', 'bahay', 0], ['公司', 'gōngsī', 'kantor', 'the office', 'opisina', 1], ['市場', 'shìchǎng', 'pasar', 'the market', 'palengke', 1], ['醫院', 'yīyuàn', 'rumah sakit', 'the hospital', 'ospital', 1], ['公園', 'gōngyuán', 'taman', 'the park', 'parke', 1], ['餐廳', 'cāntīng', 'restoran', 'the restaurant', 'restawran', 1], ['圖書館', 'túshūguǎn', 'perpustakaan', 'the library', 'aklatan', 2], ['車站', 'chēzhàn', 'stasiun', 'the station', 'istasyon', 1], ['便利商店', 'biànlìshāngdiàn', 'minimarket', 'the convenience store', 'convenience store', 2]],
  time: [['今天', 'jīntiān', 'hari ini', 'today', 'ngayon', 0], ['明天', 'míngtiān', 'besok', 'tomorrow', 'bukas', 0], ['昨天', 'zuótiān', 'kemarin', 'yesterday', 'kahapon', 0], ['星期天', 'xīngqítiān', 'hari Minggu', 'Sunday', 'Linggo', 1], ['星期六', 'xīngqíliù', 'hari Sabtu', 'Saturday', 'Sabado', 1]],
  part: [['早上', 'zǎoshang', 'pagi', 'in the morning', 'sa umaga', 0], ['中午', 'zhōngwǔ', 'siang', 'at noon', 'sa tanghali', 1], ['下午', 'xiàwǔ', 'sore', 'in the afternoon', 'sa hapon', 0], ['晚上', 'wǎnshang', 'malam', 'at night', 'sa gabi', 0]],
  actv: [['看書', 'kànshū', 'membaca buku', 'read books', 'magbasa ng libro', 0], ['看電視', 'kàn diànshì', 'menonton TV', 'watch TV', 'manood ng TV', 0], ['買東西', 'mǎi dōngxi', 'belanja', 'go shopping', 'mamili', 0], ['打電話', 'dǎ diànhuà', 'menelepon', 'make a phone call', 'tumawag sa telepono', 0], ['上課', 'shàngkè', 'ikut kelas', 'go to class', 'pumasok sa klase', 0], ['工作', 'gōngzuò', 'bekerja', 'work', 'magtrabaho', 0], ['運動', 'yùndòng', 'olahraga', 'exercise', 'mag-ehersisyo', 1], ['唱歌', 'chànggē', 'menyanyi', 'sing', 'kumanta', 1], ['睡覺', 'shuìjiào', 'tidur', 'sleep', 'matulog', 0], ['做飯', 'zuòfàn', 'memasak', 'cook', 'magluto', 1], ['寫功課', 'xiě gōngkè', 'mengerjakan PR', 'do homework', 'gumawa ng takdang-aralin', 1]],
  thing: [['書', 'shū', 'buku', 'a book', 'libro', 0], ['手機', 'shǒujī', 'ponsel', 'a phone', 'cellphone', 0], ['衣服', 'yīfú', 'baju', 'clothes', 'damit', 0], ['鞋子', 'xiézi', 'sepatu', 'shoes', 'sapatos', 1], ['杯子', 'bēizi', 'gelas', 'a cup', 'baso', 1], ['電腦', 'diànnǎo', 'komputer', 'a computer', 'kompyuter', 0]],
  feel: [['高興', 'gāoxìng', 'senang', 'happy', 'masaya', 0], ['累', 'lèi', 'lelah', 'tired', 'pagod', 0], ['忙', 'máng', 'sibuk', 'busy', 'abala', 0], ['餓', 'è', 'lapar', 'hungry', 'gutom', 1], ['渴', 'kě', 'haus', 'thirsty', 'uhaw', 1]],
  adjq: [['貴', 'guì', 'mahal', 'expensive', 'mahal', 0], ['便宜', 'piányí', 'murah', 'cheap', 'mura', 1], ['漂亮', 'piàoliang', 'cantik', 'pretty', 'maganda', 0], ['大', 'dà', 'besar', 'big', 'malaki', 0], ['小', 'xiǎo', 'kecil', 'small', 'maliit', 0]],
  weather: [['好', 'hǎo', 'bagus', 'nice', 'maganda', 0], ['冷', 'lěng', 'dingin', 'cold', 'malamig', 0], ['熱', 'rè', 'panas', 'hot', 'mainit', 0]],
  country: [['台灣', 'Táiwān', 'Taiwan', 'Taiwan', 'Taiwan', 0], ['日本', 'Rìběn', 'Jepang', 'Japan', 'Japan', 0], ['美國', 'Měiguó', 'Amerika', 'America', 'Amerika', 0], ['印尼', 'Yìnní', 'Indonesia', 'Indonesia', 'Indonesia', 1], ['菲律賓', 'Fēilǜbīn', 'Filipina', 'the Philippines', 'Pilipinas', 1], ['韓國', 'Hánguó', 'Korea', 'Korea', 'Korea', 1]],
  trans: [['走路', 'zǒulù', 'jalan kaki', 'on foot', 'naglalakad', 1], ['坐公車', 'zuò gōngchē', 'naik bus', 'by bus', 'sakay ng bus', 1], ['坐捷運', 'zuò jiéyùn', 'naik MRT', 'by MRT', 'sakay ng MRT', 2], ['騎機車', 'qí jīchē', 'naik motor', 'by scooter', 'sakay ng motor', 2], ['開車', 'kāichē', 'menyetir', 'by car', 'nagmamaneho', 1]],
  job: [['老師', 'lǎoshī', 'guru', 'a teacher', 'guro', 0], ['醫生', 'yīshēng', 'dokter', 'a doctor', 'doktor', 1], ['學生', 'xuéshēng', 'pelajar', 'a student', 'estudyante', 0], ['警察', 'jǐngchá', 'polisi', 'a police officer', 'pulis', 2], ['司機', 'sījī', 'sopir', 'a driver', 'drayber', 2]],
  skill: [['說中文', 'shuō Zhōngwén', 'berbahasa Mandarin', 'speak Chinese', 'magsalita ng Chinese', 0], ['開車', 'kāichē', 'menyetir', 'drive', 'magmaneho', 1], ['游泳', 'yóuyǒng', 'berenang', 'swim', 'lumangoy', 1], ['做飯', 'zuòfàn', 'memasak', 'cook', 'magluto', 1], ['唱歌', 'chànggē', 'menyanyi', 'sing', 'kumanta', 1]],
  subjct: [['中文', 'Zhōngwén', 'bahasa Mandarin', 'Chinese', 'Chinese', 0], ['英文', 'Yīngwén', 'bahasa Inggris', 'English', 'Ingles', 0], ['日文', 'Rìwén', 'bahasa Jepang', 'Japanese', 'Hapon', 1], ['音樂', 'yīnyuè', 'musik', 'music', 'musika', 1], ['電腦', 'diànnǎo', 'komputer', 'computers', 'kompyuter', 0]]
};
// zh: daftar potongan kalimat. String = kata tetap (pakai "漢字|pinyin"), {s:'slot'} = slot acak.
const FRAMES = [
  { lv: 0, zh: [{ s: 'subj' }, '是|shì', { s: 'country' }, '人|rén'], tr: ['{0} orang {1}.', '{0} is {1}.', '{0} ay {1}.'] },
  { lv: 0, zh: [{ s: 'subj' }, '在|zài', { s: 'place' }], tr: ['{0} ada di {1}.', '{0} is at {1}.', 'Nasa {1} si/ang {0}.'] },
  { lv: 0, zh: ['我|wǒ', '要|yào', '去|qù', { s: 'place' }], tr: ['Aku mau pergi ke {0}.', 'I am going to {0}.', 'Pupunta ako sa {0}.'] },
  { lv: 0, zh: [{ s: 'time' }, '我|wǒ', '要|yào', { s: 'actv' }], tr: ['{0} aku mau {1}.', '{0} I am going to {1}.', '{0} ay {1} ako.'] },
  { lv: 0, zh: ['我|wǒ', '想|xiǎng', '吃|chī', { s: 'food' }], tr: ['Aku ingin makan {0}.', 'I want to eat {0}.', 'Gusto kong kumain ng {0}.'] },
  { lv: 0, zh: ['我|wǒ', '想|xiǎng', '喝|hē', { s: 'drink' }], tr: ['Aku ingin minum {0}.', 'I want to drink {0}.', 'Gusto kong uminom ng {0}.'] },
  { lv: 0, zh: ['這個|zhège', { s: 'food' }, '很|hěn', '好吃|hǎochī'], tr: ['{0} ini enak sekali.', 'This {0} is delicious.', 'Ang sarap ng {0} na ito.'] },
  { lv: 1, zh: ['我|wǒ', '的|de', { s: 'family' }, '在|zài', { s: 'place' }, '工作|gōngzuò'], tr: ['{0}-ku bekerja di {1}.', 'My {0} works at {1}.', 'Nagtatrabaho ang {0} ko sa {1}.'] },
  { lv: 0, zh: ['我|wǒ', '的|de', { s: 'family' }, '喜歡|xǐhuān', { s: 'actv' }], tr: ['{0}-ku suka {1}.', 'My {0} likes to {1}.', 'Mahilig ang {0} ko na {1}.'] },
  { lv: 1, zh: ['我|wǒ', '每天|měitiān', { s: 'trans' }, '去|qù', '學校|xuéxiào'], tr: ['Setiap hari aku {0} ke sekolah.', 'Every day I go to school {0}.', 'Araw-araw ay {0} ako papuntang paaralan.'] },
  { lv: 0, zh: ['我|wǒ', '不|bù', '喜歡|xǐhuān', { s: 'actv' }], tr: ['Aku tidak suka {0}.', "I don't like to {0}.", 'Ayoko na {0}.'] },
  { lv: 0, zh: [{ s: 'time' }, '天氣|tiānqì', '很|hěn', { s: 'weather' }], tr: ['{0} cuacanya {1}.', 'The weather is {1} {0}.', '{1} ang panahon {0}.'] },
  { lv: 1, zh: ['我|wǒ', '有|yǒu', { s: 'num' }, '個|ge', { s: 'count' }], tr: ['Aku punya {0} {1}.', 'I have {0} {1}.', 'May {0} akong {1}.'] },
  { lv: 1, zh: ['請問|qǐngwèn', { s: 'place' }, '在|zài', '哪裡|nǎlǐ'], tr: ['Permisi, {0} di mana?', 'Excuse me, where is {0}?', 'Excuse po, nasaan ang {0}?'] },
  { lv: 0, zh: ['我|wǒ', '想|xiǎng', '買|mǎi', { s: 'thing' }], tr: ['Aku ingin membeli {0}.', 'I want to buy {0}.', 'Gusto kong bumili ng {0}.'] },
  { lv: 0, zh: [{ s: 'subj' }, '很|hěn', { s: 'feel' }], tr: ['{0} sangat {1}.', '{0} is very {1}.', 'Napaka-{1} ni/ng {0}.'] },
  { lv: 1, zh: ['我|wǒ', '昨天|zuótiān', '去|qù', { s: 'place' }, '了|le'], tr: ['Kemarin aku pergi ke {0}.', 'I went to {0} yesterday.', 'Kahapon ay pumunta ako sa {0}.'] },
  { lv: 1, zh: ['我們|wǒmen', '明天|míngtiān', '一起|yìqǐ', { s: 'actv' }, '吧|ba'], tr: ['Besok kita {0} bareng, yuk.', "Let's {0} together tomorrow.", 'Sabay tayong {0} bukas.'] },
  { lv: 1, zh: ['我|wǒ', '的|de', { s: 'family' }, '是|shì', { s: 'job' }], tr: ['{0}-ku adalah {1}.', 'My {0} is {1}.', 'Ang {0} ko ay {1}.'] },
  { lv: 1, zh: ['我|wǒ', '會|huì', { s: 'skill' }], tr: ['Aku bisa {0}.', 'I can {0}.', 'Marunong akong {0}.'] },
  { lv: 0, zh: ['我|wǒ', '每天|měitiān', '早上|zǎoshang', '喝|hē', { s: 'drink' }], tr: ['Setiap pagi aku minum {0}.', 'I drink {0} every morning.', 'Umiinom ako ng {0} tuwing umaga.'] },
  { lv: 0, zh: ['你|nǐ', '要|yào', '不|bù', '要|yào', { s: 'drink' }], tr: ['Kamu mau {0} tidak?', 'Do you want {0}?', 'Gusto mo ba ng {0}?'] },
  { lv: 1, zh: ['這個|zhège', { s: 'thing' }, '很|hěn', { s: 'adjq' }], tr: ['{0} ini {1}.', 'This {0} is {1}.', '{1} ang {0} na ito.'] },
  { lv: 1, zh: ['我|wǒ', '想|xiǎng', '學|xué', { s: 'subjct' }], tr: ['Aku ingin belajar {0}.', 'I want to study {0}.', 'Gusto kong mag-aral ng {0}.'] },
  { lv: 1, zh: ['我|wǒ', { s: 'part' }, '要|yào', { s: 'actv' }], tr: ['{0} aku mau {1}.', 'I will {1} {0}.', '{0} ay {1} ako.'] },
  { lv: 1, zh: ['我|wǒ', '在|zài', { s: 'place' }, '等|děng', '你|nǐ'], tr: ['Aku menunggumu di {0}.', 'I am waiting for you at {0}.', 'Hihintayin kita sa {0}.'] },
  { lv: 1, zh: ['我們|wǒmen', '去|qù', { s: 'place' }, '吃飯|chīfàn', '吧|ba'], tr: ['Yuk kita makan di {0}.', "Let's go eat at {0}.", 'Kain tayo sa {0}.'] },
  { lv: 0, zh: ['他|tā', '是|shì', '我|wǒ', '的|de', { s: 'family' }], tr: ['Dia {0}-ku.', 'He is my {0}.', 'Siya ang {0} ko.'] },
  { lv: 1, zh: ['我|wǒ', '沒有|méiyǒu', { s: 'thing' }], tr: ['Aku tidak punya {0}.', "I don't have {0}.", 'Wala akong {0}.'] },
  { lv: 1, zh: ['你|nǐ', '什麼|shénme', '時候|shíhòu', '去|qù', { s: 'place' }], tr: ['Kapan kamu pergi ke {0}?', 'When are you going to {0}?', 'Kailan ka pupunta sa {0}?'] },
  { lv: 0, zh: ['我|wǒ', '喜歡|xǐhuān', '喝|hē', { s: 'drink' }], tr: ['Aku suka minum {0}.', 'I like drinking {0}.', 'Mahilig akong uminom ng {0}.'] },
  { lv: 2, zh: [{ s: 'subj' }, '會|huì', '說|shuō', { s: 'subjct' }, '嗎|ma'], tr: ['Apa {0} bisa bahasa {1}?', 'Can {0} speak {1}?', 'Marunong ba {0} ng {1}?'] },
  { lv: 2, zh: ['我|wǒ', '覺得|juéde', { s: 'subjct' }, '很|hěn', '有意思|yǒuyìsi'], tr: ['Menurutku {0} sangat menarik.', 'I think {0} is very interesting.', 'Sa tingin ko, interesante ang {0}.'] },
  { lv: 2, zh: ['因為|yīnwèi', '太|tài', { s: 'feel' }, '了|le', '，所以|suǒyǐ', '我|wǒ', '想|xiǎng', '睡覺|shuìjiào'], tr: ['Karena terlalu {0}, aku ingin tidur.', 'Because I am too {0}, I want to sleep.', 'Dahil sobrang {0} ako, gusto kong matulog.'] },
  { lv: 2, zh: ['你|nǐ', '可以|kěyǐ', '幫|bāng', '我|wǒ', { s: 'actv' }, '嗎|ma'], tr: ['Bisakah kamu membantuku {0}?', 'Can you help me {0}?', 'Pwede mo ba akong tulungan na {0}?'] },
  { lv: 2, zh: ['從|cóng', '我|wǒ', '家|jiā', '到|dào', { s: 'place' }, '很|hěn', '遠|yuǎn'], tr: ['Dari rumahku ke {0} jauh.', 'It is far from my home to {0}.', 'Malayo ang {0} mula sa bahay ko.'] }
];
/* templat Vietnam, urutan sama dengan FRAMES */
const FRAMES_VI = ["{0} là người {1}.", "{0} đang ở {1}.", "Tôi sẽ đến {0}.", "{0} tôi sẽ {1}.", "Tôi muốn ăn {0}.", "Tôi muốn uống {0}.", "Món {0} này ngon lắm.", "{0} của tôi làm việc ở {1}.", "{0} của tôi thích {1}.", "Mỗi ngày tôi {0} đến trường.", "Tôi không thích {0}.", "{0} trời rất {1}.", "Tôi có {0} {1}.", "Xin hỏi, {0} ở đâu?", "Tôi muốn mua {0}.", "{0} rất {1}.", "Hôm qua tôi đã đến {0}.", "Ngày mai chúng ta cùng {0} nhé.", "{0} của tôi là {1}.", "Tôi biết {0}.", "Sáng nào tôi cũng uống {0}.", "Bạn có muốn uống {0} không?", "{0} này rất {1}.", "Tôi muốn học {0}.", "{0} tôi sẽ {1}.", "Tôi đợi bạn ở {0}.", "Chúng ta đi ăn ở {0} nhé.", "Anh ấy là {0} của tôi.", "Tôi không có {0}.", "Khi nào bạn đến {0}?", "Tôi thích uống {0}.", "{0} có biết nói {1} không?", "Tôi thấy {0} rất thú vị.", "Vì quá {0} nên tôi muốn ngủ.", "Bạn có thể giúp tôi {0} không?", "Từ nhà tôi đến {0} rất xa."];
FRAMES.forEach((f, k) => { f.tr[3] = FRAMES_VI[k]; });
const slotLv = it => it[5] || 0;
function reachLv() { let r = 0; for (const k in S.cards) r = Math.max(r, W[k].l); return clamp(r, 0, 3); }
function pickSlot(name, lv) {
  const all = SLOT[name]; const ok = all.filter(x => slotLv(x) <= lv + 1);
  return pick(ok.length >= 4 ? ok : all);
}
// -> { chunks:[{hz,py,gloss|null,slot}], zh, py, tr[3], blank:index }
function makeSentence(lv = reachLv()) {
  const frames = FRAMES.filter(f => f.lv <= lv + 1);
  const f = pick(frames.length ? frames : FRAMES);
  const chunks = []; const fills = [];
  f.zh.forEach(part => {
    if (typeof part === 'string') { const [hz, py] = part.split('|'); chunks.push({ hz, py, slot: null }); }
    else { const it = pickSlot(part.s, lv); fills.push(it); chunks.push({ hz: it[0], py: it[1], slot: part.s, gloss: [it[2], it[3], it[4]] }); }
  });
  const tr = f.tr.map((s, li) => {
    const out = s.replace(/\{(\d)\}/g, (m, k) => (fills[+k] ? (li === 3 ? vx(fills[+k][3]) : fills[+k][2 + li]) : ''));
    return out.charAt(0).toUpperCase() + out.slice(1);
  });
  return { chunks, zh: chunks.map(c => c.hz).join(''), py: chunks.map(c => c.py).join(' '), tr, frame: f };
}
function clozeItem(lv) {
  for (let tries = 0; tries < 12; tries++) {
    const s = makeSentence(lv);
    const idx = s.chunks.map((c, k) => [c, k]).filter(([c]) => c.slot).map(([, k]) => k);
    if (!idx.length) continue;
    const b = pick(idx); const c = s.chunks[b];
    const pool = SLOT[c.slot].filter(x => x[0] !== c.hz);
    if (pool.length < 3) continue;
    const opts = shuffle([[c.hz, c.py], ...shuffle(pool).slice(0, 3).map(x => [x[0], x[1]])]);
    return { type: 'cloze', sent: s, blank: b, opts };
  }
  return null;
}
function buildItem(lv) {
  for (let tries = 0; tries < 12; tries++) {
    const s = makeSentence(lv);
    if (s.chunks.length < 3 || s.chunks.length > 8) continue;
    return { type: 'build', sent: s };
  }
  return null;
}
function buildCloze(n = 10, lv) { const out = []; for (let k = 0; k < n * 3 && out.length < n; k++) { const it = clozeItem(lv); if (it) out.push(it); } return out; }
function buildSentence(n = 8, lv) { const out = []; for (let k = 0; k < n * 3 && out.length < n; k++) { const it = buildItem(lv); if (it) out.push(it); } return out; }
function buildMixSentence(n = 12, lv) { return shuffle([...buildCloze(Math.ceil(n / 2), lv), ...buildSentence(Math.floor(n / 2), lv)]); }