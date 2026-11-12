/* ========== MENYIMAK (listening) ==========
   Cerita: l = [pembicara, hanzi, pinyin, id, en, tl]   (pembicara: '' narator, 'A'/'B'/'C' dialog)
   Soal:   q = [hanzi, pinyin, id, en, tl], o = [[hanzi, id, en, tl] × 4] (indeks 0 = jawaban benar) */
const STORIES = [
  { k: 'day', lv: 1, zh: '我的一天', n: ['Hariku', 'My day', 'Ang araw ko'],
    l: [['', '我叫小美。', 'Wǒ jiào Xiǎoměi.', 'Namaku Xiaomei.', 'My name is Xiaomei.', 'Ako si Xiaomei.'],
        ['', '我是學生。', 'Wǒ shì xuéshēng.', 'Aku pelajar.', 'I am a student.', 'Estudyante ako.'],
        ['', '我每天早上七點起床。', 'Wǒ měitiān zǎoshang qī diǎn qǐchuáng.', 'Setiap pagi aku bangun jam tujuh.', 'I get up at seven every morning.', 'Gumigising ako ng alas-siyete tuwing umaga.'],
        ['', '八點我坐公車去學校。', 'Bā diǎn wǒ zuò gōngchē qù xuéxiào.', 'Jam delapan aku naik bus ke sekolah.', 'At eight I take the bus to school.', 'Alas-otso, sumasakay ako ng bus papuntang eskwela.'],
        ['', '中午我在學校吃飯。', 'Zhōngwǔ wǒ zài xuéxiào chīfàn.', 'Siang hari aku makan di sekolah.', 'At noon I eat at school.', 'Sa tanghali, kumakain ako sa eskwela.'],
        ['', '晚上我在家看書。', 'Wǎnshang wǒ zài jiā kàn shū.', 'Malam hari aku membaca buku di rumah.', 'In the evening I read at home.', 'Sa gabi, nagbabasa ako sa bahay.']],
    q: [{ q: ['小美幾點起床？', 'Xiǎoměi jǐ diǎn qǐchuáng?', 'Jam berapa Xiaomei bangun?', 'What time does Xiaomei get up?', 'Anong oras gumigising si Xiaomei?'],
          o: [['七點', 'jam 7', '7 o’clock', 'alas-siyete'], ['八點', 'jam 8', '8 o’clock', 'alas-otso'], ['六點', 'jam 6', '6 o’clock', 'alas-sais'], ['九點', 'jam 9', '9 o’clock', 'alas-nuwebe']] },
        { q: ['她怎麼去學校？', 'Tā zěnme qù xuéxiào?', 'Dia ke sekolah naik apa?', 'How does she get to school?', 'Paano siya pumupunta sa eskwela?'],
          o: [['坐公車', 'naik bus', 'by bus', 'sakay ng bus'], ['坐捷運', 'naik MRT', 'by MRT', 'sakay ng MRT'], ['走路', 'jalan kaki', 'on foot', 'naglalakad'], ['騎機車', 'naik motor', 'by scooter', 'sakay ng motor']] },
        { q: ['她晚上做什麼？', 'Tā wǎnshang zuò shénme?', 'Apa yang dia lakukan malam hari?', 'What does she do in the evening?', 'Ano ang ginagawa niya sa gabi?'],
          o: [['看書', 'membaca buku', 'reads', 'nagbabasa'], ['看電視', 'menonton TV', 'watches TV', 'nanonood ng TV'], ['買東西', 'belanja', 'goes shopping', 'namimili'], ['打電話', 'menelepon', 'makes phone calls', 'tumatawag']] }] },

  { k: 'bday', lv: 1, zh: '生日', n: ['Ulang tahun', 'A birthday', 'Kaarawan'],
    l: [['', '今天是我妹妹的生日。', 'Jīntiān shì wǒ mèimei de shēngrì.', 'Hari ini ulang tahun adik perempuanku.', 'Today is my little sister’s birthday.', 'Kaarawan ng bunso kong kapatid na babae ngayon.'],
        ['', '她今年十歲。', 'Tā jīnnián shí suì.', 'Tahun ini dia sepuluh tahun.', 'She is ten this year.', 'Sampung taon na siya ngayon.'],
        ['', '媽媽做了一個很大的蛋糕。', 'Māma zuò le yí ge hěn dà de dàngāo.', 'Ibu membuat kue yang besar sekali.', 'Mom made a very big cake.', 'Gumawa si Nanay ng napakalaking cake.'],
        ['', '我送她一本書。', 'Wǒ sòng tā yì běn shū.', 'Aku memberinya sebuah buku.', 'I gave her a book.', 'Binigyan ko siya ng libro.'],
        ['C', '謝謝哥哥！', 'Xièxie gēge!', 'Makasih, kak!', 'Thank you, big brother!', 'Salamat, kuya!']],
    q: [{ q: ['今天是誰的生日？', 'Jīntiān shì shéi de shēngrì?', 'Hari ini ulang tahun siapa?', 'Whose birthday is it today?', 'Kaninong kaarawan ngayon?'],
          o: [['妹妹', 'adik perempuan', 'little sister', 'bunsong kapatid na babae'], ['媽媽', 'ibu', 'mom', 'nanay'], ['哥哥', 'kakak laki-laki', 'big brother', 'kuya'], ['爸爸', 'ayah', 'dad', 'tatay']] },
        { q: ['她幾歲？', 'Tā jǐ suì?', 'Umurnya berapa?', 'How old is she?', 'Ilang taon na siya?'],
          o: [['十歲', '10 tahun', '10 years old', '10 taon'], ['十一歲', '11 tahun', '11 years old', '11 taon'], ['九歲', '9 tahun', '9 years old', '9 taon'], ['七歲', '7 tahun', '7 years old', '7 taon']] },
        { q: ['哥哥送妹妹什麼？', 'Gēge sòng mèimei shénme?', 'Kakak memberi adik apa?', 'What did the brother give his sister?', 'Ano ang ibinigay ng kuya sa kapatid?'],
          o: [['一本書', 'sebuah buku', 'a book', 'isang libro'], ['一個蛋糕', 'sebuah kue', 'a cake', 'isang cake'], ['一件衣服', 'sebuah baju', 'some clothes', 'isang damit'], ['一支手機', 'sebuah ponsel', 'a phone', 'isang cellphone']] }] },

  { k: 'family', lv: 1, zh: '我的家人', n: ['Keluargaku', 'My family', 'Pamilya ko'],
    l: [['', '我家有四個人。', 'Wǒ jiā yǒu sì ge rén.', 'Keluargaku ada empat orang.', 'There are four people in my family.', 'Apat kami sa pamilya.'],
        ['', '爸爸、媽媽、哥哥和我。', 'Bàba, māma, gēge hé wǒ.', 'Ayah, ibu, kakak laki-laki, dan aku.', 'Dad, Mom, my older brother, and me.', 'Si Tatay, si Nanay, si Kuya, at ako.'],
        ['', '爸爸是醫生，他很忙。', 'Bàba shì yīshēng, tā hěn máng.', 'Ayah dokter, dia sibuk sekali.', 'Dad is a doctor; he is very busy.', 'Doktor si Tatay; abala siya.'],
        ['', '媽媽是老師。', 'Māma shì lǎoshī.', 'Ibu seorang guru.', 'Mom is a teacher.', 'Guro si Nanay.'],
        ['', '哥哥在台北工作。', 'Gēge zài Táiběi gōngzuò.', 'Kakak bekerja di Taipei.', 'My brother works in Taipei.', 'Nagtatrabaho si Kuya sa Taipei.'],
        ['', '星期天我們一起吃晚飯。', 'Xīngqítiān wǒmen yìqǐ chī wǎnfàn.', 'Hari Minggu kami makan malam bersama.', 'On Sundays we have dinner together.', 'Tuwing Linggo, sabay kaming naghahapunan.']],
    q: [{ q: ['他家有幾個人？', 'Tā jiā yǒu jǐ ge rén?', 'Keluarganya berapa orang?', 'How many people are in the family?', 'Ilan sila sa pamilya?'],
          o: [['四個', 'empat', 'four', 'apat'], ['三個', 'tiga', 'three', 'tatlo'], ['五個', 'lima', 'five', 'lima'], ['兩個', 'dua', 'two', 'dalawa']] },
        { q: ['爸爸做什麼工作？', 'Bàba zuò shénme gōngzuò?', 'Pekerjaan ayah apa?', 'What is Dad’s job?', 'Ano ang trabaho ni Tatay?'],
          o: [['醫生', 'dokter', 'doctor', 'doktor'], ['老師', 'guru', 'teacher', 'guro'], ['司機', 'sopir', 'driver', 'drayber'], ['警察', 'polisi', 'police officer', 'pulis']] },
        { q: ['哥哥在哪裡工作？', 'Gēge zài nǎlǐ gōngzuò?', 'Kakak bekerja di mana?', 'Where does the brother work?', 'Saan nagtatrabaho si Kuya?'],
          o: [['台北', 'Taipei', 'Taipei', 'Taipei'], ['台南', 'Tainan', 'Tainan', 'Tainan'], ['高雄', 'Kaohsiung', 'Kaohsiung', 'Kaohsiung'], ['台中', 'Taichung', 'Taichung', 'Taichung']] }] },

  { k: 'night', lv: 1, zh: '在夜市', n: ['Di pasar malam', 'At the night market', 'Sa night market'],
    l: [['', '今天是星期六。', 'Jīntiān shì xīngqíliù.', 'Hari ini hari Sabtu.', 'Today is Saturday.', 'Sabado ngayon.'],
        ['', '我跟朋友去夜市。', 'Wǒ gēn péngyǒu qù yèshì.', 'Aku pergi ke pasar malam dengan teman.', 'I go to the night market with a friend.', 'Pumunta ako sa night market kasama ang kaibigan.'],
        ['', '夜市的人很多。', 'Yèshì de rén hěn duō.', 'Pasar malam ramai sekali.', 'The night market is very crowded.', 'Ang daming tao sa night market.'],
        ['', '我買了一杯珍珠奶茶，五十塊。', 'Wǒ mǎi le yì bēi zhēnzhū nǎichá, wǔshí kuài.', 'Aku beli segelas bubble tea, lima puluh dolar.', 'I bought a bubble tea for fifty dollars.', 'Bumili ako ng isang milk tea, singkwenta.'],
        ['', '我朋友吃了雞排。', 'Wǒ péngyǒu chī le jīpái.', 'Temanku makan ayam goreng tepung.', 'My friend ate a fried chicken cutlet.', 'Kumain ng fried chicken ang kaibigan ko.'],
        ['', '我們都很高興。', 'Wǒmen dōu hěn gāoxìng.', 'Kami berdua senang sekali.', 'We were both very happy.', 'Masaya kaming dalawa.']],
    q: [{ q: ['今天星期幾？', 'Jīntiān xīngqí jǐ?', 'Hari ini hari apa?', 'What day is it today?', 'Anong araw ngayon?'],
          o: [['星期六', 'Sabtu', 'Saturday', 'Sabado'], ['星期天', 'Minggu', 'Sunday', 'Linggo'], ['星期五', 'Jumat', 'Friday', 'Biyernes'], ['星期一', 'Senin', 'Monday', 'Lunes']] },
        { q: ['珍珠奶茶多少錢？', 'Zhēnzhū nǎichá duōshǎo qián?', 'Bubble tea harganya berapa?', 'How much was the bubble tea?', 'Magkano ang milk tea?'],
          o: [['五十塊', '50 dolar', '50 dollars', 'singkwenta'], ['十五塊', '15 dolar', '15 dollars', 'kinse'], ['五塊', '5 dolar', '5 dollars', 'singko'], ['一百塊', '100 dolar', '100 dollars', 'sandaan']] },
        { q: ['朋友吃了什麼？', 'Péngyǒu chī le shénme?', 'Temannya makan apa?', 'What did the friend eat?', 'Ano ang kinain ng kaibigan?'],
          o: [['雞排', 'ayam goreng tepung', 'fried chicken cutlet', 'fried chicken'], ['牛肉麵', 'mi daging sapi', 'beef noodles', 'beef noodles'], ['水餃', 'pangsit rebus', 'dumplings', 'dumplings'], ['蛋糕', 'kue', 'cake', 'cake']] }] },

  { k: 'eat', lv: 2, zh: '在餐廳點菜', n: ['Memesan di restoran', 'Ordering at a restaurant', 'Pag-order sa restawran'],
    l: [['A', '你好，請問幾位？', 'Nǐ hǎo, qǐngwèn jǐ wèi?', 'Halo, berapa orang?', 'Hello, how many people?', 'Hello, ilan po kayo?'],
        ['B', '兩位。', 'Liǎng wèi.', 'Dua orang.', 'Two.', 'Dalawa po.'],
        ['A', '請坐，這是菜單。', 'Qǐng zuò, zhè shì càidān.', 'Silakan duduk, ini menunya.', 'Please sit down. Here is the menu.', 'Upo po kayo, eto ang menu.'],
        ['B', '我要一碗牛肉麵，不要太辣。', 'Wǒ yào yì wǎn niúròumiàn, búyào tài là.', 'Aku mau semangkuk mi daging sapi, jangan terlalu pedas.', 'I’d like a bowl of beef noodles, not too spicy.', 'Isang bowl ng beef noodles po, huwag masyadong maanghang.'],
        ['C', '我要一盤炒飯和一杯紅茶。', 'Wǒ yào yì pán chǎofàn hé yì bēi hóngchá.', 'Aku mau sepiring nasi goreng dan segelas teh hitam.', 'I’d like a plate of fried rice and a black tea.', 'Isang plato ng fried rice at isang black tea po.'],
        ['A', '好的，請稍等。', 'Hǎo de, qǐng shāo děng.', 'Baik, mohon tunggu sebentar.', 'Sure, one moment please.', 'Sige po, sandali lang.']],
    q: [{ q: ['有幾個客人？', 'Yǒu jǐ ge kèrén?', 'Ada berapa tamu?', 'How many customers are there?', 'Ilan ang customer?'],
          o: [['兩位', 'dua', 'two', 'dalawa'], ['一位', 'satu', 'one', 'isa'], ['三位', 'tiga', 'three', 'tatlo'], ['四位', 'empat', 'four', 'apat']] },
        { q: ['牛肉麵要怎麼做？', 'Niúròumiàn yào zěnme zuò?', 'Mi daging sapinya diminta bagaimana?', 'How should the beef noodles be made?', 'Paano gagawin ang beef noodles?'],
          o: [['不要太辣', 'jangan terlalu pedas', 'not too spicy', 'hindi masyadong maanghang'], ['要很辣', 'pedas sekali', 'very spicy', 'sobrang anghang'], ['不要牛肉', 'tanpa daging', 'no beef', 'walang karne'], ['要大碗', 'mangkuk besar', 'a big bowl', 'malaking bowl']] },
        { q: ['第二個客人喝什麼？', 'Dì èr ge kèrén hē shénme?', 'Tamu kedua minum apa?', 'What does the second customer drink?', 'Ano ang iinumin ng pangalawang customer?'],
          o: [['紅茶', 'teh hitam', 'black tea', 'black tea'], ['咖啡', 'kopi', 'coffee', 'kape'], ['果汁', 'jus', 'juice', 'juice'], ['珍珠奶茶', 'bubble tea', 'bubble tea', 'milk tea']] }] },

  { k: 'shop', lv: 2, zh: '買外套', n: ['Membeli jaket', 'Buying a jacket', 'Pagbili ng jacket'],
    l: [['A', '歡迎光臨！你要找什麼？', 'Huānyíng guānglín! Nǐ yào zhǎo shénme?', 'Selamat datang! Cari apa?', 'Welcome! What are you looking for?', 'Welcome po! Ano ang hanap ninyo?'],
        ['B', '我想買一件外套。', 'Wǒ xiǎng mǎi yí jiàn wàitào.', 'Aku ingin membeli jaket.', 'I’d like to buy a jacket.', 'Gusto kong bumili ng jacket.'],
        ['A', '這件怎麼樣？', 'Zhè jiàn zěnmeyàng?', 'Yang ini bagaimana?', 'How about this one?', 'Eto po, ano sa tingin mo?'],
        ['B', '很好看，可是有一點大。', 'Hěn hǎokàn, kěshì yǒu yìdiǎn dà.', 'Bagus, tapi agak besar.', 'It looks nice, but it’s a bit big.', 'Maganda, pero medyo malaki.'],
        ['A', '這件小一點，也比較便宜。', 'Zhè jiàn xiǎo yìdiǎn, yě bǐjiào piányí.', 'Yang ini lebih kecil, juga lebih murah.', 'This one is smaller, and cheaper too.', 'Mas maliit ito, at mas mura pa.'],
        ['B', '好，我買這件。可以刷卡嗎？', 'Hǎo, wǒ mǎi zhè jiàn. Kěyǐ shuākǎ ma?', 'Oke, aku beli yang ini. Boleh bayar pakai kartu?', 'OK, I’ll take it. Can I pay by card?', 'Sige, ito na lang. Pwede bang card?']],
    q: [{ q: ['客人想買什麼？', 'Kèrén xiǎng mǎi shénme?', 'Pembeli ingin membeli apa?', 'What does the customer want to buy?', 'Ano ang gustong bilhin ng customer?'],
          o: [['外套', 'jaket', 'a jacket', 'jacket'], ['鞋子', 'sepatu', 'shoes', 'sapatos'], ['褲子', 'celana', 'trousers', 'pantalon'], ['帽子', 'topi', 'a hat', 'sumbrero']] },
        { q: ['第一件外套有什麼問題？', 'Dì yī jiàn wàitào yǒu shénme wèntí?', 'Jaket pertama kenapa?', 'What was wrong with the first jacket?', 'Ano ang problema sa unang jacket?'],
          o: [['有一點大', 'agak besar', 'a bit big', 'medyo malaki'], ['有一點小', 'agak kecil', 'a bit small', 'medyo maliit'], ['太貴了', 'terlalu mahal', 'too expensive', 'sobrang mahal'], ['顏色不好看', 'warnanya jelek', 'ugly colour', 'pangit ang kulay']] },
        { q: ['客人想怎麼付錢？', 'Kèrén xiǎng zěnme fù qián?', 'Pembeli mau bayar pakai apa?', 'How does the customer want to pay?', 'Paano gustong magbayad ng customer?'],
          o: [['刷卡', 'kartu', 'by card', 'card'], ['付現金', 'tunai', 'in cash', 'cash'], ['用手機', 'pakai ponsel', 'by phone', 'gamit ang cellphone'], ['不付錢', 'tidak bayar', 'not paying', 'hindi magbabayad']] }] },

  { k: 'rain', lv: 2, zh: '下雨了', n: ['Hujan turun', 'It started raining', 'Umulan'],
    l: [['', '今天早上天氣很好。', 'Jīntiān zǎoshang tiānqì hěn hǎo.', 'Pagi ini cuacanya bagus.', 'The weather was nice this morning.', 'Maganda ang panahon kaninang umaga.'],
        ['', '可是下午開始下雨了。', 'Kěshì xiàwǔ kāishǐ xià yǔ le.', 'Tapi sore hari mulai hujan.', 'But it started raining in the afternoon.', 'Pero umulan pagdating ng hapon.'],
        ['', '我沒帶傘，所以在便利商店買了一把。', 'Wǒ méi dài sǎn, suǒyǐ zài biànlì shāngdiàn mǎi le yì bǎ.', 'Aku tidak bawa payung, jadi aku beli satu di minimarket.', 'I had no umbrella, so I bought one at a convenience store.', 'Wala akong payong, kaya bumili ako sa convenience store.'],
        ['', '新聞說明天會更冷。', 'Xīnwén shuō míngtiān huì gèng lěng.', 'Berita bilang besok akan lebih dingin.', 'The news says tomorrow will be colder.', 'Sabi sa balita, mas malamig bukas.'],
        ['', '我要多穿一件衣服。', 'Wǒ yào duō chuān yí jiàn yīfú.', 'Aku harus pakai satu lapis baju lagi.', 'I’ll wear an extra layer.', 'Magsusuot ako ng isa pang damit.']],
    q: [{ q: ['什麼時候開始下雨？', 'Shénme shíhòu kāishǐ xià yǔ?', 'Kapan mulai hujan?', 'When did it start raining?', 'Kailan nagsimulang umulan?'],
          o: [['下午', 'sore', 'in the afternoon', 'hapon'], ['早上', 'pagi', 'in the morning', 'umaga'], ['晚上', 'malam', 'at night', 'gabi'], ['中午', 'siang', 'at noon', 'tanghali']] },
        { q: ['他在哪裡買傘？', 'Tā zài nǎlǐ mǎi sǎn?', 'Dia beli payung di mana?', 'Where did he buy the umbrella?', 'Saan siya bumili ng payong?'],
          o: [['便利商店', 'minimarket', 'convenience store', 'convenience store'], ['夜市', 'pasar malam', 'night market', 'night market'], ['學校', 'sekolah', 'school', 'eskwela'], ['百貨公司', 'mal', 'department store', 'mall']] },
        { q: ['明天天氣怎麼樣？', 'Míngtiān tiānqì zěnmeyàng?', 'Cuaca besok bagaimana?', 'What will the weather be like tomorrow?', 'Kumusta ang panahon bukas?'],
          o: [['更冷', 'lebih dingin', 'colder', 'mas malamig'], ['更熱', 'lebih panas', 'hotter', 'mas mainit'], ['很好', 'bagus', 'nice', 'maganda'], ['下雪', 'bersalju', 'snowy', 'mag-i-snow']] }] },

  { k: 'doctor', lv: 2, zh: '看醫生', n: ['Ke dokter', 'Seeing a doctor', 'Pagpapatingin sa doktor'],
    l: [['', '我昨天晚上開始頭痛。', 'Wǒ zuótiān wǎnshang kāishǐ tóutòng.', 'Sejak tadi malam aku sakit kepala.', 'My headache started last night.', 'Nagsimulang sumakit ang ulo ko kagabi.'],
        ['', '今天早上還有一點發燒。', 'Jīntiān zǎoshang hái yǒu yìdiǎn fāshāo.', 'Pagi ini masih agak demam.', 'This morning I still had a slight fever.', 'Kaninang umaga, may kaunti pa akong lagnat.'],
        ['', '所以我請假去看醫生。', 'Suǒyǐ wǒ qǐngjià qù kàn yīshēng.', 'Jadi aku izin untuk ke dokter.', 'So I took leave to see a doctor.', 'Kaya nag-leave ako para magpatingin.'],
        ['', '醫生說我感冒了。', 'Yīshēng shuō wǒ gǎnmào le.', 'Dokter bilang aku flu.', 'The doctor said I have a cold.', 'Sabi ng doktor, may sipon ako.'],
        ['', '他叫我多喝水，多休息。', 'Tā jiào wǒ duō hē shuǐ, duō xiūxí.', 'Dia menyuruhku banyak minum dan istirahat.', 'He told me to drink lots of water and rest.', 'Pinayuhan niya akong uminom ng maraming tubig at magpahinga.'],
        ['', '這個藥一天吃三次。', 'Zhège yào yì tiān chī sān cì.', 'Obat ini diminum tiga kali sehari.', 'This medicine is taken three times a day.', 'Tatlong beses isang araw ang gamot na ito.']],
    q: [{ q: ['他什麼時候開始頭痛？', 'Tā shénme shíhòu kāishǐ tóutòng?', 'Kapan dia mulai sakit kepala?', 'When did his headache start?', 'Kailan sumakit ang ulo niya?'],
          o: [['昨天晚上', 'tadi malam', 'last night', 'kagabi'], ['今天早上', 'pagi ini', 'this morning', 'kaninang umaga'], ['前天', 'kemarin lusa', 'the day before yesterday', 'noong isang araw'], ['上個星期', 'minggu lalu', 'last week', 'noong isang linggo']] },
        { q: ['醫生說他怎麼了？', 'Yīshēng shuō tā zěnme le?', 'Dokter bilang dia kenapa?', 'What did the doctor say was wrong?', 'Ano raw ang sakit niya ayon sa doktor?'],
          o: [['感冒了', 'flu', 'a cold', 'sipon'], ['肚子痛', 'sakit perut', 'a stomach ache', 'sakit ng tiyan'], ['太累了', 'terlalu capek', 'too tired', 'sobrang pagod'], ['沒問題', 'tidak apa-apa', 'nothing wrong', 'walang problema']] },
        { q: ['藥一天吃幾次？', 'Yào yì tiān chī jǐ cì?', 'Obat diminum berapa kali sehari?', 'How many times a day is the medicine taken?', 'Ilang beses iinumin ang gamot kada araw?'],
          o: [['三次', 'tiga kali', 'three times', 'tatlong beses'], ['兩次', 'dua kali', 'twice', 'dalawang beses'], ['一次', 'sekali', 'once', 'isang beses'], ['四次', 'empat kali', 'four times', 'apat na beses']] }] },

  { k: 'way', lv: 2, zh: '問路', n: ['Bertanya jalan', 'Asking for directions', 'Pagtatanong ng daan'],
    l: [['A', '不好意思，請問捷運站怎麼走？', 'Bù hǎoyìsi, qǐngwèn jiéyùn zhàn zěnme zǒu?', 'Permisi, stasiun MRT lewat mana?', 'Excuse me, how do I get to the MRT station?', 'Excuse po, paano pumunta sa MRT station?'],
        ['B', '你往前走，到第二個路口右轉。', 'Nǐ wǎng qián zǒu, dào dì èr ge lùkǒu yòu zhuǎn.', 'Jalan lurus, di persimpangan kedua belok kanan.', 'Go straight and turn right at the second intersection.', 'Diretso ka, tapos kanan sa pangalawang kanto.'],
        ['B', '捷運站就在銀行旁邊。', 'Jiéyùn zhàn jiù zài yínháng pángbiān.', 'Stasiunnya tepat di sebelah bank.', 'The station is right next to the bank.', 'Katabi lang ng bangko ang istasyon.'],
        ['A', '走路要多久？', 'Zǒulù yào duōjiǔ?', 'Jalan kaki berapa lama?', 'How long is the walk?', 'Gaano katagal kung lalakarin?'],
        ['B', '大概十分鐘。', 'Dàgài shí fēnzhōng.', 'Kira-kira sepuluh menit.', 'About ten minutes.', 'Mga sampung minuto.'],
        ['A', '謝謝你！', 'Xièxie nǐ!', 'Terima kasih!', 'Thank you!', 'Salamat!']],
    q: [{ q: ['他要去哪裡？', 'Tā yào qù nǎlǐ?', 'Dia mau ke mana?', 'Where does he want to go?', 'Saan siya pupunta?'],
          o: [['捷運站', 'stasiun MRT', 'the MRT station', 'MRT station'], ['銀行', 'bank', 'the bank', 'bangko'], ['醫院', 'rumah sakit', 'the hospital', 'ospital'], ['公園', 'taman', 'the park', 'parke']] },
        { q: ['到第二個路口要怎麼走？', 'Dào dì èr ge lùkǒu yào zěnme zǒu?', 'Di persimpangan kedua harus ke mana?', 'What should he do at the second intersection?', 'Ano ang gagawin sa pangalawang kanto?'],
          o: [['右轉', 'belok kanan', 'turn right', 'kumanan'], ['左轉', 'belok kiri', 'turn left', 'kumaliwa'], ['往前走', 'lurus', 'go straight', 'dumiretso'], ['往回走', 'putar balik', 'go back', 'bumalik']] },
        { q: ['走路要多久？', 'Zǒulù yào duōjiǔ?', 'Jalan kaki berapa lama?', 'How long is the walk?', 'Gaano katagal kung lalakarin?'],
          o: [['十分鐘', '10 menit', '10 minutes', '10 minuto'], ['五分鐘', '5 menit', '5 minutes', '5 minuto'], ['二十分鐘', '20 menit', '20 minutes', '20 minuto'], ['一個小時', '1 jam', 'an hour', 'isang oras']] }] },

  { k: 'trip', lv: 3, zh: '週末去花蓮', n: ['Akhir pekan ke Hualien', 'A weekend in Hualien', 'Weekend sa Hualien'],
    l: [['', '這個週末我想去花蓮玩。', 'Zhège zhōumò wǒ xiǎng qù Huālián wán.', 'Akhir pekan ini aku ingin jalan-jalan ke Hualien.', 'This weekend I want to visit Hualien.', 'Gusto kong mamasyal sa Hualien ngayong weekend.'],
        ['', '我打算坐火車去，因為比較快也比較舒服。', 'Wǒ dǎsuàn zuò huǒchē qù, yīnwèi bǐjiào kuài yě bǐjiào shūfú.', 'Aku berencana naik kereta, karena lebih cepat dan lebih nyaman.', 'I plan to take the train, because it’s faster and more comfortable.', 'Balak kong mag-tren, kasi mas mabilis at mas komportable.'],
        ['', '我已經訂了民宿，一個晚上兩千塊。', 'Wǒ yǐjīng dìng le mínsù, yí ge wǎnshang liǎng qiān kuài.', 'Aku sudah pesan homestay, dua ribu dolar semalam.', 'I’ve booked a guesthouse, two thousand dollars a night.', 'Naka-book na ako ng homestay, dalawang libo kada gabi.'],
        ['', '雖然有一點貴，但是離海很近。', 'Suīrán yǒu yìdiǎn guì, dànshì lí hǎi hěn jìn.', 'Meskipun agak mahal, tapi dekat laut.', 'Although it’s a bit pricey, it’s close to the sea.', 'Medyo mahal, pero malapit sa dagat.'],
        ['', '我希望天氣好，這樣可以去海邊散步。', 'Wǒ xīwàng tiānqì hǎo, zhèyàng kěyǐ qù hǎibiān sànbù.', 'Semoga cuacanya bagus, supaya bisa jalan-jalan di pantai.', 'I hope the weather is good so I can walk by the sea.', 'Sana maganda ang panahon para makapaglakad sa tabing-dagat.']],
    q: [{ q: ['他週末想去哪裡？', 'Tā zhōumò xiǎng qù nǎlǐ?', 'Akhir pekan dia ingin ke mana?', 'Where does he want to go this weekend?', 'Saan niya gustong pumunta ngayong weekend?'],
          o: [['花蓮', 'Hualien', 'Hualien', 'Hualien'], ['台東', 'Taitung', 'Taitung', 'Taitung'], ['高雄', 'Kaohsiung', 'Kaohsiung', 'Kaohsiung'], ['台中', 'Taichung', 'Taichung', 'Taichung']] },
        { q: ['他為什麼坐火車？', 'Tā wèishénme zuò huǒchē?', 'Kenapa dia naik kereta?', 'Why is he taking the train?', 'Bakit siya magtre-tren?'],
          o: [['比較快也比較舒服', 'lebih cepat & nyaman', 'faster and more comfortable', 'mas mabilis at komportable'], ['比較便宜', 'lebih murah', 'it’s cheaper', 'mas mura'], ['沒有飛機', 'tidak ada pesawat', 'there are no flights', 'walang eroplano'], ['朋友開車', 'teman menyetir', 'a friend is driving', 'magmamaneho ang kaibigan']] },
        { q: ['民宿有什麼好處？', 'Mínsù yǒu shénme hǎochù?', 'Apa kelebihan homestay itu?', 'What is good about the guesthouse?', 'Ano ang maganda sa homestay?'],
          o: [['離海很近', 'dekat laut', 'close to the sea', 'malapit sa dagat'], ['很便宜', 'murah', 'cheap', 'mura'], ['有早餐', 'ada sarapan', 'breakfast included', 'may almusal'], ['在市中心', 'di pusat kota', 'in the city centre', 'nasa sentro ng lungsod']] }] },

  { k: 'job', lv: 3, zh: '新工作', n: ['Pekerjaan baru', 'A new job', 'Bagong trabaho'],
    l: [['', '我上個月開始在一家公司工作。', 'Wǒ shàng ge yuè kāishǐ zài yì jiā gōngsī gōngzuò.', 'Bulan lalu aku mulai bekerja di sebuah perusahaan.', 'Last month I started working at a company.', 'Noong isang buwan, nagsimula akong magtrabaho sa isang kompanya.'],
        ['', '公司離我家不遠，騎機車十五分鐘就到了。', 'Gōngsī lí wǒ jiā bù yuǎn, qí jīchē shíwǔ fēnzhōng jiù dào le.', 'Kantornya tidak jauh dari rumah, naik motor lima belas menit sampai.', 'The office isn’t far; fifteen minutes by scooter.', 'Hindi malayo ang opisina; labinlimang minuto lang sa motor.'],
        ['', '我的同事都很友善，常常幫我。', 'Wǒ de tóngshì dōu hěn yǒushàn, chángcháng bāng wǒ.', 'Rekan kerjaku ramah semua dan sering membantuku.', 'My colleagues are all friendly and often help me.', 'Mababait ang mga katrabaho ko at madalas akong tulungan.'],
        ['', '工作雖然很忙，可是我學到很多東西。', 'Gōngzuò suīrán hěn máng, kěshì wǒ xué dào hěn duō dōngxi.', 'Meskipun sibuk, aku belajar banyak hal.', 'Although work is busy, I’ve learned a lot.', 'Kahit abala, marami akong natutunan.'],
        ['', '下班以後，我會去學中文。', 'Xiàbān yǐhòu, wǒ huì qù xué Zhōngwén.', 'Setelah pulang kerja, aku pergi belajar bahasa Mandarin.', 'After work, I go to study Chinese.', 'Pagkatapos ng trabaho, nag-aaral ako ng Chinese.']],
    q: [{ q: ['他什麼時候開始新工作？', 'Tā shénme shíhòu kāishǐ xīn gōngzuò?', 'Kapan dia mulai kerja baru?', 'When did he start the new job?', 'Kailan siya nagsimula sa bagong trabaho?'],
          o: [['上個月', 'bulan lalu', 'last month', 'noong isang buwan'], ['上個星期', 'minggu lalu', 'last week', 'noong isang linggo'], ['去年', 'tahun lalu', 'last year', 'noong isang taon'], ['昨天', 'kemarin', 'yesterday', 'kahapon']] },
        { q: ['他怎麼去公司？', 'Tā zěnme qù gōngsī?', 'Dia ke kantor naik apa?', 'How does he get to work?', 'Paano siya pumapasok sa opisina?'],
          o: [['騎機車', 'naik motor', 'by scooter', 'sakay ng motor'], ['坐公車', 'naik bus', 'by bus', 'sakay ng bus'], ['走路', 'jalan kaki', 'on foot', 'naglalakad'], ['開車', 'menyetir mobil', 'by car', 'nagmamaneho']] },
        { q: ['下班以後他做什麼？', 'Xiàbān yǐhòu tā zuò shénme?', 'Setelah kerja dia melakukan apa?', 'What does he do after work?', 'Ano ang ginagawa niya pagkatapos ng trabaho?'],
          o: [['學中文', 'belajar Mandarin', 'studies Chinese', 'nag-aaral ng Chinese'], ['去運動', 'olahraga', 'exercises', 'nag-eehersisyo'], ['回家睡覺', 'pulang tidur', 'goes home to sleep', 'umuuwi at natutulog'], ['跟同事吃飯', 'makan dengan rekan', 'eats with colleagues', 'kumakain kasama ang katrabaho']] }] },

  { k: 'fab', lv: 3, zh: '工廠的一天', n: ['Sehari di pabrik', 'A day at the factory', 'Isang araw sa pabrika'],
    l: [['', '我在工廠當設備技術員。', 'Wǒ zài gōngchǎng dāng shèbèi jìshùyuán.', 'Aku bekerja sebagai teknisi peralatan di pabrik.', 'I work as an equipment technician at a factory.', 'Equipment technician ako sa isang pabrika.'],
        ['', '今天我上早班，七點半就到了。', 'Jīntiān wǒ shàng zǎobān, qī diǎn bàn jiù dào le.', 'Hari ini aku shift pagi, jam setengah delapan sudah sampai.', 'Today I’m on the morning shift; I arrived at 7:30.', 'Morning shift ako ngayon; dumating ako ng alas-siyete y medya.'],
        ['', '九點的時候，三號機台停機了。', 'Jiǔ diǎn de shíhòu, sān hào jītái tíngjī le.', 'Jam sembilan, mesin nomor tiga berhenti.', 'At nine, machine number three went down.', 'Alas-nuwebe, nag-down ang makina bilang tatlo.'],
        ['', '我檢查以後發現吸嘴堵住了。', 'Wǒ jiǎnchá yǐhòu fāxiàn xīzuǐ dǔ zhù le.', 'Setelah kuperiksa, ternyata nozzle-nya tersumbat.', 'After checking, I found the nozzle was clogged.', 'Pagkatapos kong suriin, barado pala ang nozzle.'],
        ['', '換了新的吸嘴，機台就正常了。', 'Huàn le xīn de xīzuǐ, jītái jiù zhèngcháng le.', 'Setelah nozzle diganti, mesin normal lagi.', 'After replacing the nozzle, the machine was back to normal.', 'Pagkapalit ng bagong nozzle, umayos ang makina.'],
        ['', '交接班的時候，我把這件事告訴了夜班同事。', 'Jiāojiēbān de shíhòu, wǒ bǎ zhè jiàn shì gàosù le yèbān tóngshì.', 'Saat serah terima shift, aku ceritakan ini ke rekan shift malam.', 'At the shift handover, I told the night-shift colleague about it.', 'Sa shift handover, sinabi ko ito sa katrabaho sa night shift.']],
    q: [{ q: ['他今天上什麼班？', 'Tā jīntiān shàng shénme bān?', 'Hari ini dia shift apa?', 'Which shift is he on today?', 'Anong shift siya ngayon?'],
          o: [['早班', 'shift pagi', 'morning shift', 'morning shift'], ['中班', 'shift siang', 'swing shift', 'swing shift'], ['夜班', 'shift malam', 'night shift', 'night shift'], ['不用上班', 'libur', 'day off', 'walang pasok']] },
        { q: ['幾號機台停機了？', 'Jǐ hào jītái tíngjī le?', 'Mesin nomor berapa yang berhenti?', 'Which machine went down?', 'Aling makina ang nag-down?'],
          o: [['三號', 'nomor 3', 'number 3', 'bilang 3'], ['一號', 'nomor 1', 'number 1', 'bilang 1'], ['五號', 'nomor 5', 'number 5', 'bilang 5'], ['八號', 'nomor 8', 'number 8', 'bilang 8']] },
        { q: ['問題是什麼？', 'Wèntí shì shénme?', 'Masalahnya apa?', 'What was the problem?', 'Ano ang problema?'],
          o: [['吸嘴堵住了', 'nozzle tersumbat', 'a clogged nozzle', 'baradong nozzle'], ['沒有電', 'listrik mati', 'no power', 'walang kuryente'], ['馬達壞了', 'motor rusak', 'a broken motor', 'sirang motor'], ['漏水', 'bocor air', 'a water leak', 'tagas ng tubig']] }] }
];
const STORY_LV_NAME = { 1: 'Pemula', 2: 'Dasar', 3: 'Menengah' };
const storyName = s => L3(s.n);
const lineTr = l => L3(l, 3);

/* ---- pemutar suara berurutan (kalimat demi kalimat) ---- */
const PITCH = { '': 1, A: 1.05, B: 0.88, C: 1.25 };
const LPLAY = { on: false, tok: 0, t: 0 };
function playLines(lines, opts = {}) {
  stopLines(); if (!TTS.ok) return;
  const tok = ++LPLAY.tok; LPLAY.on = true;
  let k = opts.from || 0;
  const next = () => {
    if (tok !== LPLAY.tok) return;
    if (k >= lines.length) { LPLAY.on = false; opts.onEnd && opts.onEnd(); return; }
    const [sp, zh] = lines[k]; const idx = k++;
    opts.onLine && opts.onLine(idx);
    let doneOnce = false;
    const done = () => { if (doneOnce || tok !== LPLAY.tok) return; doneOnce = true; clearTimeout(LPLAY.t); LPLAY.t = setTimeout(next, opts.gap || 380); };
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(zh);
      u.lang = TTS.voice ? TTS.voice.lang : 'zh-TW'; if (TTS.voice) u.voice = TTS.voice;
      u.rate = opts.rate || S.settings.rate; u.pitch = PITCH[sp] || 1;
      u.onend = done; u.onerror = done;
      TTS.u = u; speechSynthesis.speak(u);
      clearTimeout(LPLAY.t);
      LPLAY.t = setTimeout(done, Math.max(2200, zh.length * 420 / (u.rate || 1)) + 1800); // pengaman bila onend tidak terpanggil
    } catch (e) { done(); }
  };
  next();
}
function stopLines() { LPLAY.tok++; LPLAY.on = false; clearTimeout(LPLAY.t); try { speechSynthesis.cancel(); } catch (e) {} }

/* ---- pembangun sesi menyimak ---- */
function buildStory(k) {
  const st = STORIES.find(s => s.k === k); if (!st) return [];
  return [{ type: 'story', st: k }, ...st.q.map((q, j) => ({ type: 'lq', st: k, q: j }))];
}
function buildLFill(n = 10) {
  const lv = reachLv(); const out = [];
  for (let g = 0; g < n * 3 && out.length < n; g++) { const it = clozeItem(lv); if (it) { it.type = 'lfill'; out.push(it); } }
  return out;
}
function buildLMean(n = 10) {
  const lv = reachLv(); const out = [];
  for (let g = 0; g < n * 3 && out.length < n; g++) {
    const s = makeSentence(lv); const others = [];
    for (let h = 0; h < 20 && others.length < 3; h++) { const o = makeSentence(lv); if (o.zh !== s.zh && !others.some(x => x.zh === o.zh)) others.push(o); }
    if (others.length === 3) out.push({ type: 'lmean', sent: s, others });
  }
  return out;
}
function buildLMix(n = 12) { return shuffle([...buildLFill(Math.ceil(n / 2)), ...buildLMean(Math.floor(n / 2))]); }
function storyMark(k, score) { S.listen = S.listen || {}; S.listen[k] = Math.max(S.listen[k] || 0, score); save(); }