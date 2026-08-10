/** 文件职责：维护第一批 15 篇攻略的土耳其语审校译文，不包含稳定标识与事实源 URL。 */
export const locale = "tr";
export const translator = "codex-gpt5-local-review";

export const ui = {
  sectionTitles: {
    overview: "Genel bakış",
    "pros-cons": "Artılar ve eksiler",
    leveling: "Seviye kasma ve geçiş",
    mapping: "Harita rotasyonu",
    bossing: "Boss rotasyonu",
    mechanics: "Temel mekanikler",
    supports: "Destek gemi önceliği",
    "build-use-cases": "Build kullanımları",
    properties: "Özellikler",
    alternatives: "Alternatifler ve yükseltmeler",
    "common-mistakes": "Yaygın hatalar",
    "quick-answer": "Kısa cevap",
    "progression-steps": "Önerilen ilerleme",
    decisions: "Karar kuralları",
    strategy: "Güvenli strateji",
    "build-considerations": "Build hazırlığı",
    faq: "Sık sorulan sorular",
    sources: "Kaynaklar ve doğrulama",
  },
  sourceLabel: "Güncel kaynaklar ve çapraz doğrulama",
  sourceDescription:
    "Bilgiler resmî yama notları, güncel veri tabanları ve listelenen topluluk kaynaklarıyla karşılaştırıldı.",
  verificationNote:
    "Mekanikler ve yama kapsamı resmî kaynaklar, güncel veri tabanları ve topluluk rehberleriyle doğrulandı; doğrudan PC testleri ayrı kaydedilir ve yapılmamış testler yapılmış gibi sunulmaz.",
};

export const articles = {
  "big-monkee-spirit-walker": {
    meta: {
      title: "Big Monkee Spirit Walker: Tame Beast'ten endgame'e",
      shortTitle: "Big Monkee Spirit Walker",
      summary:
        "Mighty Silverfist'i evcilleştirip Pounce, Maul ve Pain Offering kullanan yoldaş odaklı Spirit Walker; kampanyadan endgame'e düşük bütçeyle ilerler.",
      description:
        "PoE2 0.5 Big Monkee Spirit Walker rehberi: Twister ile seviye kasma, Tame Beast geçişi, yoldaş ölçekleme, savunma ve rotasyonlar.",
      imageAlt:
        "Big Monkee Spirit Walker build'inde kullanılan Mighty Silverfist",
      seoTitle: "Big Monkee Spirit Walker build rehberi (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Big Monkee Spirit Walker: Mighty Silverfist'i evcilleştirin; ilerleme, ekipman, harita ve boss rotasyonlarını öğrenin.",
    },
    overview: [
      "Ana hasarı evcilleştirilmiş eşsiz bir canavar verir; Huntress ise Pounce ve Maul ile aktif kalır. Mighty Silverfist yüksek kritik tabanına sahiptir ve kampanyada en anlaşılır tek hedef seçeneğidir.",
      "Tame Beast başlangıçta kullanılamaz. Twister veya güvenilir bir Huntress yeteneğiyle seviye kasın, yeniden dağıtım için altın ayırın ve yoldaş gemleri ile pasifleri hazır olduğunda geçiş yapın.",
    ],
    keyPoints: [
      "3. Bölümde Mighty Silverfist'i evcilleştirin.",
      "Dayanıklı nadir düşmanlarda ve bosslarda Pain Offering'i koruyun.",
      "Kendi hasarınız ve can çalmanız için Pounce ile Maul kullanın.",
    ],
    pros: [
      "Düşük bütçeyle güçlü hasar.",
      "Canavar alındıktan sonra SSF için uygun.",
      "Yoldaş harita baskısını azaltır.",
    ],
    cons: [
      "İdeal canavar modlarını bulmak zaman alır.",
      "Pasif geçişi altın gerektirir.",
      "Dar alanlarda yoldaş yapay zekâsı aksayabilir.",
    ],
    leveling: [
      [
        "1. ve 2. Bölüm",
        "Twister ve Whirling Slash ile seviye kasarken can, direnç ve saldırılara ek hasarı önceliklendirin.",
      ],
      [
        "3. Bölüm geçişi",
        "İkinci Ascendancy aşamasından sonra Mighty Silverfist'i evcilleştirip puanları yoldaş ve paylaşılan hasara taşıyın.",
      ],
      [
        "İlk haritalar",
        "Pahalı anointment veya lüks yoldaş eşyalarından önce can, mana yenilenmesi ve zırhı dengeleyin.",
      ],
    ],
    mapping: [
      "Pounce ile gruplara girin, Maul ile katkınızı sürdürün ve canavarın temizlemesine izin verin. Yoldaşın savaş menzilinden çıkmayın; gerekirse çağırıp yeniden konumlandırın.",
    ],
    bossing: [
      "Pain Offering ile başlayın, yoldaşı boss üzerinde tutun ve tehlikeli zemini Pounce ile aşın. Offering'i yalnızca güvenli aralıklarda yenileyin.",
    ],
    faq: [
      [
        "Tame Beast'e ne zaman geçmeliyim?",
        "Gem 7. kademede açılır; ancak geçiş genellikle ikinci Ascendancy ve yeterli yoldaş pasifiyle daha rahattır.",
      ],
      [
        "Mighty Silverfist zorunlu mu?",
        "Hayır. Diğer eşsiz canavarlar da çalışır; fakat kampanyada tek hedef için en açık seçenektir.",
      ],
    ],
  },
  "grenade-gemling-legionnaire": {
    meta: {
      title: "Grenade Gemling Legionnaire: seviye, harita ve boss rehberi",
      shortTitle: "Grenade Gemling",
      summary:
        "Explosive Shot ile temizleyen, patlama için el bombalarını birleştiren; Gemling kalitesi, Mirage Archer ve katmanlı savunma kullanan arbalet build'i.",
      description:
        "PoE2 0.5 Grenade Gemling Legionnaire rehberi: yetenek geçişleri, Explosive, Cluster ve Oil Grenade, ekipman ve rotasyonlar.",
      imageAlt: "Arbalet ve el bombaları kullanan Gemling Legionnaire",
      seoTitle: "Grenade Gemling Legionnaire (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Grenade Gemling seviye ve endgame rehberi: kalite, savunma, harita ve boss rotasyonları.",
    },
    overview: [
      "Normal temizlikte Explosive Shot, patlama hasarında Explosive Grenade ile Cluster Grenade kullanılır. Oil Grenade ateş hasarını artırır, Flash Grenade sersemletmeyle savunma aralığı yaratır.",
      "Gemling Legionnaire gem seviyesi ve kalitesinden çok yararlanır. Kampanyada yüksek hasarlı bir arbaleti zamanında yenilemek, uyumsuz pahalı bir unique kovalamaktan daha önemlidir.",
    ],
    keyPoints: [
      "Arbalet hasarını bölge seviyesine uygun tutun.",
      "El bombalarının bir bölümünü Mirage Archer ile otomatikleştirin.",
      "Lüks hasardan önce can, direnç, kaçınma ve deflection tamamlayın.",
    ],
    pros: [
      "Hızlı temizlik ve güçlü boss patlaması.",
      "Doğrudan kampanya rotası.",
      "Zırh, kaçınma ve enerji kalkanını birleştirir.",
    ],
    cons: [
      "Patlamalar görüşü azaltır.",
      "Endgame kalite ve toparlanma ekipmanı pahalıdır.",
      "Fitil süresi ve düşüş noktaları öğrenilmelidir.",
    ],
    leveling: [
      [
        "1. Bölüm",
        "Permafrost Bolts ve Fragmentation Rounds kullanın, arbaleti sık yenileyin.",
      ],
      [
        "2. Bölüm",
        "Temizlik için Explosive Shot'a geçin; Explosive Grenade ve Flash Grenade ekleyin.",
      ],
      [
        "3. Bölüm ve sonrası",
        "Mirage Archer, ardından Cluster Grenade ekleyin; kalite Ascendancy'sini gerçek fayda başladığında alın.",
      ],
    ],
    mapping: [
      "İlerlerken Explosive Shot atın, dayanıklı gruplara Explosive Grenade fırlatın ve kalanları Mirage Archer'a bırakın. Tehlikeli nadirler için Flash Grenade saklayın.",
    ],
    bossing: [
      "Oil Grenade yerleştirin, Cluster ve Explosive Grenade kullanın, ardından Explosive Shot'ı sürdürün. Faz değişiminden hemen önce tüm yükleri harcamayın.",
    ],
    faq: [
      [
        "Arbalette en önemli özellik nedir?",
        "Yüksek silah hasarı ve yararlı projeksiyon yeteneği seviyeleri; uygun rare, bağlantısız bir unique'ten iyidir.",
      ],
      [
        "Advanced Thaumaturgy ne zaman alınmalı?",
        "Ana el bombalarının kalitesi toparlanma, projeksiyon veya hasarda gerçek kazanç sağladığında.",
      ],
    ],
  },
  "lightning-arrow-deadeye": {
    meta: {
      title: "Lightning Arrow Deadeye: başlangıçtan endgame'e",
      shortTitle: "Lightning Arrow Deadeye",
      summary:
        "Lightning Arrow, Lightning Rod patlamaları, Herald of Thunder ve Deadeye Mirage kullanan hızlı yay build'i; kritik olmayan sürümden kritiğe aşamalı geçer.",
      description:
        "PoE2 0.5 Lightning Arrow Deadeye rehberi: seviye kasma, Lightning Rod yerleşimi, Mirage Archer, yay ve savunma.",
      imageAlt: "Hızlı yıldırım yayıyla saldıran Deadeye",
      seoTitle: "Lightning Arrow Deadeye rehberi (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Lightning Arrow Deadeye: seviye, Lightning Rod, yay yükseltmeleri, haritalar ve pinnacle boss düzenleri.",
    },
    overview: [
      "Lightning Arrow grupları hızla temizler, Lightning Rod tekrarlanan okları yoğun boss hasarına çevirir. Herald of Thunder ve Mirage kapsama alanını büyütse de doğru Rod yerleşiminin yerini tutmaz.",
      "Güçlü fiziksel bir yay ve kritik olmayan sürümle başlayın; isabet, kritik şansı ve savunma dengelendikten sonra kritiğe geçin.",
    ],
    keyPoints: [
      "Normal haritalarda çoğunlukla Lightning Arrow yeterlidir.",
      "Boss saldırısından önce birkaç Lightning Rod yerleştirin.",
      "Kaliteyi yardımcı araçlardan önce Lightning Rod'a verin.",
    ],
    pros: [
      "Üst düzey temizleme hızı.",
      "Akıcı kampanya ilerlemesi.",
      "Pinnacle içeriğe kadar ölçeklenir.",
    ],
    cons: [
      "Başlangıç savunması zayıftır.",
      "Boss hasarı kombinasyon hazırlığı ister.",
      "Son yay ve kritik ekipmanı pahalıdır.",
    ],
    leveling: [
      [
        "Kampanya",
        "Lightning Arrow ve Lightning Rod ile seviye kasın, fiziksel yay bölgenin gerisinde kaldığında değiştirin.",
      ],
      [
        "İlk haritalar",
        "Kritik olmayan pasifleri kullanın, dirençleri tamamlayın ve kaçınmayı dengeleyin.",
      ],
      [
        "Kritik geçişi",
        "Yalnızca isabet, yay hasarı, kritik ve savunma hazırsa ve yeni düzen gerçekten daha güçlüyse geçin.",
      ],
    ],
    mapping: [
      "Normal gruplarda Lightning Arrow kullanın. Dayanıklı nadirlerin altına Lightning Rod koyup chain ve patlamalar üst üste gelecek şekilde ateş etmeyi sürdürün.",
    ],
    bossing: [
      "Birkaç Lightning Rod hazırlayın, sürüm kullanıyorsa Tornado Shot ekleyin ve Lightning Arrow atın. Pinnacle dövüşlerinde gerekirse alan desteğini yoğun hasarla değiştirin.",
    ],
    faq: [
      [
        "0.5'te Lightning Rod hâlâ gerekli mi?",
        "Evet. Ayarlamalara rağmen tek hedef hasarının ana parçasıdır.",
      ],
      [
        "Doğrudan kritikle başlayabilir miyim?",
        "Önerilmez. İsabet, ekipman ve savunma hazır olana kadar kritik olmayan sürüm daha güvenilirdir.",
      ],
    ],
  },
  tornado: {
    meta: {
      title: "Tornado: element zemini, sınır ve zamanla hasar",
      shortTitle: "Tornado",
      summary:
        "Tornado düşmanları çeken fiziksel zamanla hasar fırtınası yaratır ve ilgili element hasarını eklemek için element zeminini emer.",
      description:
        "PoE2 Tornado rehberi: 8 saniye süre, fırtına sınırı, element zemini emme, ölçekleme, destekler ve build kullanımları.",
      imageAlt: "Acolyte of Chayula build'inin oluşturduğu Tornado fırtınası",
      seoTitle: "Tornado ve zemin emme rehberi (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Tornado: fiziksel zamanla hasar, element zemini, süre, sınır, destek gemleri ve build kullanımları.",
    },
    overview: [
      "Tornado yakındaki düşmanları çeken ve fiziksel zamanla hasar veren bir fırtına oluşturur. Element zeminiyle üst üste geldiğinde debuff'ını emer ve ilgili elementin ek hasarını kazanır.",
      "Temel süre 8 saniye, temel sınır birdir; kalite süreyi ve aynı anda bulunabilecek sayıyı artırabilir.",
    ],
    keyPoints: [
      "Spell Damage, zamanla hasar debuff'ına etki eder.",
      "Fırtına yarıçapı 3 metredir.",
      "Element sürümleri doğru zemini emmeye bağlıdır.",
    ],
    mechanics: [
      "Tornado'nun temeli ardışık vuruşlar değil, zamanla hasardır. Element zemini uygulanan debuff'ı ve ek hasar türünü değiştirir.",
      "Sınırı artırmak birden fazla fırtınaya izin verir, süre kapsama alanını belirler. Projeksiyon saldırısı Tornado Shot ile karıştırmayın.",
    ],
    mechanicBullets: [
      "Temel süre: 8 saniye.",
      "Temel sınır: 1 Tornado.",
      "Kalite süreyi ve sınırı artırabilir.",
    ],
    supports: [
      [
        "Prolonged Duration",
        "Kapsamı uzatır ve yeniden kullanma sıklığını azaltır.",
        "core",
      ],
      ["Magnified Area", "Çekişi ve harita kapsamını artırır.", "situational"],
      ["Physical Mastery", "Fiziksel yetenek seviyesini yükseltir.", "core"],
    ],
    buildUse: [
      "Archon tetikleme zincirleri, fiziksel zamanla hasar build'leri ve fırtınanın altına güvenilir şekilde element zemini koyan kombinasyonlara uygundur.",
    ],
    mistakes: [
      "Yalnızca vuruş hasarını ölçeklemeyin. Yakındaki bir zemini emilmiş saymak yerine Tornado ile gerçekten üst üste geldiğini kontrol edin.",
    ],
    faq: [
      [
        "Tornado birden fazla elementi emebilir mi?",
        "Emilen element zeminlerinden ilgili ek hasarı alabilir; build her üst üste gelmeyi ve süreyi sağlamalıdır.",
      ],
      [
        "Tornado ile Tornado Shot aynı mı?",
        "Hayır. Tornado zamanla hasar veren bir spell, Tornado Shot ayrı bir projeksiyon attack'tır.",
      ],
    ],
  },
  "ball-lightning": {
    meta: {
      title: "Ball Lightning: yıldırım sıklığı, Fire Infusion ve shock",
      shortTitle: "Ball Lightning",
      summary:
        "Ball Lightning kendisi vurmayan yavaş bir projeksiyon gönderir ve yakındaki hedeflere her 0,2 saniyede yıldırım boşaltır.",
      description:
        "PoE2 Ball Lightning rehberi: boşalma sıklığı, shock, hız, Fire Infusion, yanan zemin, destekler ve Blood Mage.",
      imageAlt: "Ball Lightning kullanan Blood Mage",
      seoTitle: "Ball Lightning ve Infusion rehberi (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Ball Lightning: 0,2 saniyelik boşalma, shock, Fire Infusion, projeksiyon hızı, destekler ve build'ler.",
    },
    overview: [
      "Ball Lightning yavaş bir küreyi düşmanların arasından geçirir. Küre kendisi vurmaz; aynı hedefe her 0,2 saniyede tekrarlı yıldırımlar gönderir.",
      "Fire Infusion tüketildiğinde küre yavaşlar, yanan zemin bırakır ve kaybolurken ateş patlaması oluşturur.",
    ],
    keyPoints: [
      "Projeksiyonun kendisi vurmaz.",
      "Hedef arama yarıçapı 1,8 metredir.",
      "Yüksek shock şansına sahiptir.",
    ],
    mechanics: [
      "Düşük hız küreyi boss yakınında daha uzun tutar; aşırı hız boşalma sayısını azaltabilir. Alan ve konum, hedefin menzilde kalma süresini belirler.",
      "Fire Infusion ayrı bir yanan zemin ve ateş patlaması koludur; bilinçli biçimde ölçeklenmelidir.",
    ],
    mechanicBullets: [
      "Aynı hedef aralığı: 0,2 saniye.",
      "Hedef yarıçapı: 1,8 metre.",
      "Temel kritik şansı: %9.",
    ],
    supports: [
      [
        "Considered Casting",
        "Hız kaybını kaldırabilen self-cast düzenleri için uygundur.",
        "situational",
      ],
      [
        "Magnified Area",
        "Temizlikte konumlanma baskısını azaltır.",
        "situational",
      ],
      [
        "Lightning Mastery",
        "Uyumlu yıldırım build'lerinde yetenek seviyesini artırır.",
        "core",
      ],
    ],
    buildUse: [
      "Ballcano Blood Mage, Ball Lightning ile temizleyip shock uygular; bosslarda hasarı Volcano veya başka bir spell ile yoğunlaştırır.",
    ],
    mistakes: [
      "Kürenin temasından hasar çıkarmayın; kendisi vurmaz. Yeterli sayıda boşalmadan hedefi geçecek kadar hız da eklemeyin.",
    ],
    faq: [
      [
        "Küre düşmandan geçerken vurur mu?",
        "Hayır; hasar tekrarlanan yıldırım boşalmalarından gelir.",
      ],
      [
        "Fire Infusion neden kullanılır?",
        "Yanan zemin ve son patlama ekler; Infusion üreten ve ölçekleyen hibrit build'lerde kullanışlıdır.",
      ],
    ],
  },
  "gas-grenade": {
    meta: {
      title: "Gas Grenade: zehir bulutu, patlatma ve bekleme süresi",
      shortTitle: "Gas Grenade",
      summary:
        "Gas Grenade büyüyen zehir bulutu oluşturur; yanma veya Detonator yeteneği bulutu ateş patlamasına çevirir. En fazla 6 bulut bulunabilir.",
      description:
        "PoE2 Gas Grenade rehberi: bulut sınırı, poison, ateş patlaması, toparlanma, destekler ve Pathfinder rotasyonu.",
      imageAlt: "Gas Grenade fırlatan Pathfinder",
      seoTitle: "Gas Grenade zehir ve patlatma rehberi (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Gas Grenade: 6 bulut sınırı, ateş, toparlanma, kalite, destekler ve build'ler.",
    },
    overview: [
      "Gas Grenade sekip fitil bittiğinde gaz salar. Bulut normal bir vuruş değildir ama vuruş gibi poison uygular ve büyür; yanma veya uyumlu Detonator ateş patlaması yaratır.",
      "Yetenek birkaç toparlanma yükü saklar ve en fazla altı bulut tutar; rotasyon üst üste gelme, süre ve yük yenilenmesine dayanır.",
    ],
    keyPoints: [
      "En fazla 6 bulut.",
      "Yanma veya Detonator bulutu patlatır.",
      "Kalite toparlanma ve ateş hasarını artırır.",
    ],
    mechanics: [
      "Zehir bulutu ile ateş patlaması farklı ölçeklenir. Zehir kolu chaos, poison gücü ve süreye; patlatma kolu güvenilir yanma veya Detonator'a ihtiyaç duyar.",
      "0.3'ten beri yetenek el bombası fitiline kesin olarak uyar, bu yüzden hareketli hedefleri öngörmek gerekir.",
    ],
    mechanicBullets: [
      "3 toparlanma kullanımı saklar.",
      "Bulut mevcut üst sınıra kadar büyür.",
      "Normal vurmaz ama vuruş gibi poison uygular.",
    ],
    supports: [
      ["Second Wind", "Patlama aralığında yük esnekliği sağlar.", "core"],
      [
        "Persistent Ground",
        "Zehir bulutlarının kapsama süresini uzatır.",
        "situational",
      ],
      ["Fire Mastery", "Ateş patlatma kolunu destekler.", "situational"],
    ],
    buildUse: [
      "Pathfinder boss görünmeden bulutları hazırlayıp Wither ve Despair biriktirebilir; ardından poison'ı sürdürür veya ateş hasarı için patlatır.",
    ],
    mistakes: [
      "Ana kol seçmeden zehir ve ateşi birlikte ölçeklemeyin. Altı bulut sınırını unutmayın ve boss hedeflenmeden tüm yükleri tüketmeyin.",
    ],
    faq: [
      [
        "Bulut vurmadan poison uygular mı?",
        "Evet. Normal vuruş değildir ama vuruş gibi poison uygular.",
      ],
      [
        "Bulutu ne patlatır?",
        "Yanma etkileri ve uyumlu Detonator yetenekleri ateş patlamasını tetikler.",
      ],
    ],
  },
  "lightning-spear": {
    meta: {
      title: "Lightning Spear: Frenzy Charge bölünmesi, yıldırımlar ve shock",
      shortTitle: "Lightning Spear",
      summary:
        "Lightning Spear isabette 5 yıldırım çıkarır; Frenzy Charge varsa bir yük tüketip ana mızrağı 3 hedefe böler.",
      description:
        "PoE2 Lightning Spear rehberi: yıldırıma dönüşüm, Frenzy Charge bölünmesi, ikincil projeksiyonlar, shock, kalite ve Amazon.",
      imageAlt: "Lightning Spear fırlatan Amazon",
      seoTitle: "Lightning Spear bölünme rehberi (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Lightning Spear: dönüşüm, 5 yıldırım, Frenzy Charge bölünmesi, shock, kalite ve build'ler.",
    },
    overview: [
      "Lightning Spear isabette yakındaki düşmanlara beş ikincil yıldırım salan bir mızrak atar. Frenzy Charge varsa birini tüketerek ana mızrağı üç hedefe böler; her mızrak kendi patlamasını üretir.",
      "Ana mızrak fiziksel hasarın çoğunu yıldırıma, ikincil projeksiyonlar tamamını dönüştürür ve daha güçlü shock uygular.",
    ],
    keyPoints: [
      "Ana mızrak: fizikselin %80'i yıldırıma dönüşür.",
      "İkincil yıldırımlar: %100 dönüşüm ve 5 projeksiyon.",
      "Frenzy Charge mızrağı 3 hedefe böler.",
    ],
    mechanics: [
      "Ek projeksiyonlar ikincil yıldırım sınırını etkiler, ana mızrağı normal şekilde artırmaz. Ana mızrak pierce, fork, chain veya return yapamaz.",
      "Sürekli hasar Frenzy Charge üretimine bağlıdır; kararsız kaynak kapsama ve çoklu patlamaları azaltır.",
    ],
    mechanicBullets: [
      "Saldırı hızı: temelin %60'ı.",
      "Yıldırımlar 5 metre içindeki hedefleri arar.",
      "Kalite yıldırım ekler ve yük bonuslarını ikiye katlayabilir.",
    ],
    supports: [
      [
        "Lightning Mastery",
        "Uyumlu olduğunda yıldırım yeteneği seviyesini artırır.",
        "core",
      ],
      ["Rapid Attacks", "Düşük temel saldırı hızını telafi eder.", "core"],
      [
        "Magnified Area",
        "Temizlikte patlama kapsamını genişletir.",
        "situational",
      ],
    ],
    buildUse: [
      "Amazon isabet, kritik ve Frenzy Charge üretimini birleştirerek temizlikte mızrakları düzenli böler ve ayrı bir tek hedef rotasyonu korur.",
    ],
    mistakes: [
      "Normal projeksiyon modlarının ana mızrağı artırdığını sanmayın. Önce Frenzy Charge akışını ve saldırı hızını düzeltin.",
    ],
    faq: [
      [
        "Frenzy Charge ne yapar?",
        "Ana mızrağı üç hedefe böler ve her bölünmüş mızrak kendi yıldırım patlamasını üretir.",
      ],
      [
        "Ana mızrak pierce veya chain yapabilir mi?",
        "Hayır. Kendi bölünme kuralına uyar ve pierce, fork, chain veya return yapamaz.",
      ],
    ],
  },
  "adonias-ego": {
    meta: {
      title: "Adonia's Ego: Power Charge hazırlığı ve silah değiştirme",
      shortTitle: "Adonia's Ego",
      summary:
        "Adonia's Ego, ileri spell build'leri için Infusion ve silah değişimiyle Power Charge hazırlayan eşsiz bir Siphoning Wand'dır.",
      description:
        "PoE2 Adonia's Ego rehberi: Power Charge, silah setleri, yaygın sorunlar ve Stormweaver kullanımı.",
      seoTitle: "Adonia's Ego Power Charge ve silah değiştirme rehberi",
      seoDescription:
        "PoE2 0.5 Adonia's Ego: Infusion hazırlığı, silah değişimi, Power Charge, yaygın hatalar ve Stormweaver kullanımı.",
    },
    overview: [
      "Adonia's Ego, Power Charge hazırlamak için Infusion'ı aktif olarak üretip tüketir. Ana hasar silahını engellememesi için genellikle ayrı bir silah setinde tutulur.",
      "Pasif bir yük kaynağı değildir: yetenekleri ve silah setlerini doğru kurup harita başında veya boss öncesinde işlemi uygulayın.",
    ],
    keyPoints: [
      "Hazırlığı ayrı bir silah setinde yapın.",
      "Infusion yeteneğini doğru sette etkinleştirin.",
      "Ana set daha güçlü rare wand veya çekirdek eşya kullanabilir.",
    ],
    properties: [
      [
        "Taban",
        "Siphoning Wand",
        "Infusion ve Power Charge işlemi için eşsiz wand.",
      ],
      [
        "Ana kullanım",
        "Power Charge hazırlamak",
        "Hazırlığı destekler, hasar rotasyonunun yerini almaz.",
      ],
      [
        "Temel risk",
        "Silah seti ayarı",
        "Yanlış etkinleştirme eşyanın çalışmıyor görünmesine yol açar.",
      ],
    ],
    buildUse: [
      "Adonia's Trifusion Stormweaver gibi build'ler ikinci sette Infusion ve yük üretip ardından ana sete döner.",
    ],
    alternatives: [
      "Yük işlemi gerekmiyorsa rare wand ve Focus çoğunlukla daha güçlüdür. Eşyayı yalnızca build yüklerin nasıl tüketildiğini açıklıyorsa alın.",
    ],
    mistakes: [
      "Yaygın nedenler yeteneğin yanlış sette açık olması veya gerekli Infusion'ın önceden üretilmemesidir. Setler arasındaki eşsiz Rune çatışması da işlemi kapatabilir.",
    ],
    faq: [
      [
        "Ana hasar silahı olmalı mı?",
        "Genellikle hayır. Birçok 0.5 build'i onu ikinci sette tutup daha güçlü wand veya wand ve Focus ile saldırır.",
      ],
      [
        "Neden yük alamıyorum?",
        "Infusion kaynağını, silah seti başına yetenek etkinliğini ve eşsiz Rune çatışmalarını kontrol edin.",
      ],
    ],
  },
  "sire-of-shards": {
    meta: {
      title:
        "Sire of Shards: dairesel projeksiyonlar, spell ölçekleme ve kullanım",
      shortTitle: "Sire of Shards",
      summary:
        "Sire of Shards; Sigil of Power, spell hasarı ve cast speed sağlayıp spell'lere dairesel 4 ek projeksiyon veren eşsiz bir Chiming Staff'tır.",
      description:
        "PoE2 Sire of Shards rehberi: modlar, dairesel projeksiyonlar, Sigil of Power, Ball Lightning, avantajlar ve alternatifler.",
      seoTitle: "Sire of Shards dairesel projeksiyon rehberi (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Sire of Shards: dairede +4 projeksiyon, spell hasarı, cast speed, Sigil of Power ve alternatifler.",
    },
    overview: [
      "Sire of Shards uyumlu spell'lerin daire biçiminde dört ek projeksiyon fırlatmasını sağlar. Ayrıca 10. seviye Sigil of Power, spell hasarı, cast speed ve biraz element direnci verir.",
      "Dairesel desen geniş alan temizler ancak yoğun tek hedef hasarını azaltabilir; yalnızca hasar değerini değil yetenek geometrisini değerlendirin.",
    ],
    keyPoints: [
      "Spell'ler 4 ek projeksiyon fırlatır.",
      "Projeksiyonlar daire biçiminde çıkar.",
      "10. seviye Sigil of Power verir.",
    ],
    properties: [
      ["Spell hasarı", "%80–120 artırılmış", "Geniş aralıklı global mod."],
      ["Cast speed", "%10–20 artırılmış", "Self-cast hissini iyileştirir."],
      [
        "Projeksiyonlar",
        "Dairede +4",
        "Temizlik kapsamını ve boss konumunu değiştirir.",
      ],
      ["Gerekli seviye", "25", "Tabanın güncel gereksinimi."],
    ],
    buildUse: [
      "Ball Lightning gibi spell'ler grupları kaplamak veya büyük hedeflerin yakınında projeksiyonları üst üste bindirmek için dağılımı kullanır; Ballcano Blood Mage geçiş ya da ana silah olarak seçebilir.",
    ],
    alternatives: [
      "Yoğun boss hasarı, savunma veya kritik daha önemliyse rare staff, wand ve Focus ya da başka özel bir unique daha güçlü olabilir.",
    ],
    mistakes: [
      "Dört ek projeksiyon boss hasarının beş katını garanti etmez; hedefi gerçekten kaç projeksiyonun geçtiğini dairesel geometri belirler.",
    ],
    faq: [
      [
        "Her spell dört projeksiyon alır mı?",
        "Yalnızca uyumlu projeksiyon spell'leri; diğerleri dairesel atış kazanmaz.",
      ],
      [
        "En yüksek hasar değeri her zaman en iyisi mi?",
        "Değerlidir; ancak cast speed ve desen uyumu küçük hasar farkından daha önemli olabilir.",
      ],
    ],
  },
  "crown-of-the-pale-king": {
    meta: {
      title:
        "Crown of the Pale King: Thorns karşılığı, modlar ve Runemaster yükseltmesi",
      shortTitle: "Crown of the Pale King",
      summary:
        "Fiziksel Thorns ekleyen ve Thorns'un tüm vuruşlara karşılık vermesini sağlayan düşük seviyeli eşsiz Cultist Crown.",
      description:
        "PoE2 Crown of the Pale King rehberi: Thorns, zırh, enerji kalkanı, can, Runemaster yükseltmesi ve Warbringer.",
      seoTitle: "Crown of the Pale King Thorns rehberi (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Crown of the Pale King: tüm vuruşlara karşılık, can, savunma, yükseltme ve build'ler.",
    },
    overview: [
      "Crown of the Pale King fiziksel Thorns ekleyip tüm vuruşlara karşılık vermesini sağlayarak erken karşılık build'lerini etkinleştirir.",
      "Ayrıca zırh, enerji kalkanı, azami can ve eşya nadirliği verir. Gereksinimi düşüktür ve daha sonra Runemastered Cultist Crown'a yükseltilebilir.",
    ],
    keyPoints: [
      "Thorns tüm vuruşlara karşılık verir.",
      "Fiziksel Thorns hasarı ekler.",
      "Runemastered Cultist Crown'a yükseltilebilir.",
    ],
    properties: [
      [
        "Savunma",
        "%50–100 daha fazla zırh ve enerji kalkanı",
        "Geniş aralıklı yerel mod.",
      ],
      ["Azami can", "+40–80", "Başlangıçta yararlı dayanıklılık."],
      ["Thorns", "10–15 ile 20–25 fiziksel", "Güncel açık karşılık aralığı."],
      ["Eşsiz etki", "Tüm vuruşlara karşılık", "Thorns build'inin temel modu."],
    ],
    buildUse: [
      "Thorns Warbringer, miğferle düzenli karşılık üretir ve hasarı tetikleyen vuruşlara dayanmak için Thorns, armor break ve hayatta kalmayı ölçekler.",
    ],
    alternatives: [
      "Tetikleme zaten çözülmüşse veya çok daha fazla zırh, can, direnç ya da özel corruption gerekiyorsa savunmacı rare miğfer daha iyidir.",
    ],
    mistakes: [
      "Miğfer savunmayı yok saydırmaz. Thorns'un çalışması için vuruştan sağ çıkmalı, ağır boss saldırılarından kaçmaya devam etmelisiniz.",
    ],
    faq: [
      [
        "Her vuruşta Thorns tetiklenir mi?",
        "Temel mod tüm vuruşlara karşılık vermeyi sağlar; ancak karakter hâlâ vuruşu alıp hayatta kalmalıdır.",
      ],
      [
        "Yükseltilebilir mi?",
        "Evet. Güncel Runeforging sisteminde Runemastered Cultist Crown tarifi vardır.",
      ],
    ],
  },
  "best-atlas-tree-0-5": {
    meta: {
      title: "PoE2 0.5 en iyi Atlas ağacı: ilk 20, 40 ve 60 puan",
      shortTitle: "0.5 Atlas ağacı",
      summary:
        "Aşamalı plan: Atlas Master ile tek bir kârlı mekaniğe yönelmeden önce Waystone devamlılığını ve güvenli ilerlemeyi kurun.",
      description:
        "PoE2 0.5 Atlas ağacı rehberi: 20/40/60 puan rotaları, Waystone devamlılığı, Atlas Master, uzmanlaşma ve respec.",
      imageAlt: "Doryani ve PoE2 Atlas arayüzü",
      seoTitle: "PoE2 0.5 en iyi Atlas ağacı: 20/40/60 puan",
      seoDescription:
        "PoE2 0.5 Atlas rotası: ilk 20, 40 ve 60 puan, Waystone, Atlas Master, kârlı mekanik ve respec.",
    },
    quickAnswers: [
      [
        "İlk öncelik",
        "Uzmanlaşmış kârdan önce Waystone devamlılığını ve ilerlemeyi kurun.",
      ],
      [
        "Ne zaman uzmanlaşmalı",
        "Haritalar ve savunma dengelendiğinde tek mekanik seçip Atlas Master ve Tablet ile birleştirin.",
      ],
      [
        "Ne zaman respec",
        "Build mekaniği güvenle tamamlamıyorsa veya maliyet beklenen getiriyi aşıyorsa değiştirin.",
      ],
    ],
    overview: [
      "Kalıcı tek bir en iyi Atlas yoktur. İlk ağaç erişim ve devamlılığı çözer; kâr pasifleri, karakter hedef içeriği düzenli tamamladığında gelir.",
      "20/40/60 puanı kontrol noktası sayın ve bitmiş ekipmanla tam endgame açılımlarını varsayan bir ağacı kopyalamayın.",
    ],
    keyPoints: [
      "Önce devamlılık, sonra kâr.",
      "Puanları dağıtmadan önce tek uzmanlığı tamamlayın.",
      "Tablet ve harita modları stratejiye hizmet etmeli.",
    ],
    steps: [
      [
        "İlk 20 puan",
        "Waystone devamlılığı, harita ilerlemesi ve normal haritaları dengeleyen düğümleri alın.",
      ],
      [
        "Yaklaşık 40 puan",
        "Döngünüze uyan Atlas Master'ı seçip tek mekanik koluna girin.",
      ],
      [
        "Yaklaşık 60 puan",
        "Mekanik ödül kümelerini tamamlayın, güvenli miktar ve nadirlik ekleyip oynanamaz modlardan kaçının.",
      ],
      [
        "60 puan sonrası",
        "İlk strateji dengeli ve ödenebilir olduğunda tamamlayıcı bir mekanik ekleyin.",
      ],
    ],
    decisions: [
      "Hızlı geniş alan build'leri Breach veya Delirium'u; dayanıklı ve kontrollü build'ler Expedition ile tehlikeli Remnant'ları tercih eder. SSF'de yalnız ticarette değerlenen getiriden önce kesin malzemeyi seçin.",
    ],
    mistakes: [
      "Haritalara yeni girerken yüksek yatırımlı kâr ağacını kopyalamayın, puanları dört mekaniğe dağıtmayın ve temel karşılaşmayı bitirebildiğinizi görmeden pahalı Tablet almayın.",
    ],
    faq: [
      [
        "Eşya miktarına hemen gitmeli miyim?",
        "Hayır. Waystone devamlılığı ve hayatta kalma dengelendikten sonra anlamlıdır.",
      ],
      [
        "Atlas Master nasıl seçilir?",
        "En düzenli tamamladığınız ve uzun süre oynamak istediğiniz tek mekaniği güçlendiren Master'ı seçin.",
      ],
    ],
  },
  "currency-farming-strategies-0-5": {
    meta: {
      title: "PoE2 0.5 para kasma: bütçe, Atlas ve risk stratejileri",
      shortTitle: "0.5 para kasma",
      summary:
        "Çabuk eskiyen saatlik rakamlar yerine karakter gücü, giriş maliyeti, likidite ve başarısızlık riskine göre strateji seçin.",
      description:
        "PoE2 0.5 para rehberi: Expedition, Runes of Aldur, Breach, Delirium, Ritual ve düşük bütçeli haritaların maliyet ve riskleri.",
      imageAlt: "PoE2 para birimleri ve crafting malzemeleri",
      seoTitle: "PoE2 0.5 para kasma: bütçeye göre strateji",
      seoDescription:
        "PoE2 0.5 kâr stratejileri: Expedition, Runes, Breach, Delirium, Ritual ve Atlas düzenini bütçeye göre seçin.",
    },
    quickAnswers: [
      [
        "Düşük bütçe",
        "Devamlılık düğümlü normal haritaları oynayın, likit malzemeleri satın; pahalı davetler almayın.",
      ],
      [
        "Dengeli strateji",
        "Expedition ve Grand Expedition açık satılabilir çıktılar sunar ancak Remnant planlaması ister.",
      ],
      [
        "Yüksek değişkenlik",
        "Ritual, Delirium boss rush ve pahalı Rune bahisleri daha fazla sermaye ve risk toleransı gerektirir.",
      ],
    ],
    overview: [
      "Kâr piyasa fiyatlarıyla değişir. Bu rehber strateji yapısını karşılaştırır, saat başına sabit Divine Orb sözü vermez.",
      "Stratejinin çalışıp çalışmadığına karar vermeden önce en az 20 denemenin maliyetini, tamamlanmasını, likit çıktısını ve hatalarını kaydedin.",
    ],
    keyPoints: [
      "Likidite teorik değerden önemlidir.",
      "Her zaman bitirilen normal strateji, sık ölüm yaşanan gelişmiş stratejiden iyidir.",
      "Örnek başlamadan girdileri fiyatlandırın.",
    ],
    steps: [
      [
        "Haritaları dengeleyin",
        "Hedef tier'ı portal harcamadan bitirene kadar Waystone devamlılığı ve ucuz Tablet kullanın.",
      ],
      [
        "Tek döngü seçin",
        "Build gücü ve güncel fiyatlara göre Expedition, Runes, Breach, Delirium veya Ritual seçin.",
      ],
      [
        "20 deneme kaydedin",
        "Toplam maliyet, doğrudan para, likit malzeme, değerli eşya ve başarısızlıkları yazın.",
      ],
      [
        "Doğrulama sonrası büyütün",
        "Satılmamış stok çıkarıldıktan sonra da kâr pozitifse daha iyi Tablet veya davet alın.",
      ],
    ],
    decisions: [
      "Expedition planlama ve dayanıklılığı; Breach ile Delirium hız ve alanı; Ritual dar alandaki hasarı ödüllendirir. Pahalı Rune of Aldur'un beklenen değeri fiyatından düşükse doğrudan satın.",
    ],
    mistakes: [
      "Satılamayan rare'leri iyimser fiyatlarla kâra eklemeyin, başarısız haritaları yok saymayın ve üç şanslı sonuçla strateji değiştirmeyin. Pahalı crafting öncesi hedef ve zarar sınırı belirleyin.",
    ],
    faq: [
      [
        "En güvenli başlangıç nedir?",
        "Denenmemiş build için pahalı giriş almadan önce devamlılık düğümlü normal haritalar ve likit düşüşler.",
      ],
      [
        "Kârı ne zaman yeniden hesaplamalıyım?",
        "Yama, popüler rehber veya piyasa değişimi arzı, talebi ya da maliyeti etkilediğinde.",
      ],
    ],
  },
  "classes-ascendancies-guide": {
    meta: {
      title: "PoE2 sınıfları ve Ascendancy: 0.5'te oyun tarzına göre seçim",
      shortTitle: "Sınıflar ve Ascendancy",
      summary:
        "Güncel sınıfları yakın dövüş, menzil, spell, minion, dönüşüm veya az tuşla eşleştirin; tier list'i kalıcı cevap saymayın.",
      description:
        "PoE2 0.5 sınıf ve Ascendancy seçimini oyun tarzı, karmaşıklık, savunma, SSF ve tam build rehberine göre yapın.",
      imageAlt: "PoE2 sınıf ve Ascendancy seçimini temsil eden savaş sahnesi",
      seoTitle: "PoE2 0.5 sınıf ve Ascendancy seçim rehberi",
      seoDescription:
        "PoE2 0.5 sınıf ve Ascendancy'nizi tarz, zorluk, savunma, SSF ve build'e göre seçin.",
    },
    quickAnswers: [
      [
        "En basit seçim",
        "Önce nasıl dövüşmek istediğinizi seçin, sonra tam seviye rotası olan güncel rehber bulun.",
      ],
      [
        "Sınıf sınırları",
        "Temel sınıf pasif başlangıcı ve Ascendancy'leri belirler; çoğu gem sınıfa kilitli değildir.",
      ],
      [
        "Değiştirilebilir mi",
        "Ascendancy güncel kurallarla ayarlanabilir; fakat temel sınıf başka sınıfa çevrilemez.",
      ],
    ],
    overview: [
      "Sınıf seçimi yetenekleri sonsuza dek kilitlemez; ağacın başlangıcı, özellik kolaylığı ve mevcut Ascendancy'leri belirler.",
      "İlk karakter için tam rehber, teorik S-tier tavanından önemlidir. Açık yetenek geçişi, yaygın ekipman ve anlaşılır savunma arayın.",
    ],
    keyPoints: [
      "Warrior: zırh, ağır vuruşlar, kalkan ve Thorns.",
      "Ranger/Huntress: yay, mızrak, hareketlilik ve yoldaş.",
      "Sorceress/Witch: spell, trigger, minion, can ve enerji kalkanı.",
      "Mercenary/Monk: arbalet, kalite, quarterstaff ve hızlı dövüş.",
      "Druid: dönüşüm, bitkiler ve hibrit attack/spell.",
    ],
    steps: [
      [
        "Menzili seçin",
        "Yakın dövüş, menzilli saldırı, spell, minion veya dönüşüm arasında karar verin.",
      ],
      [
        "Karmaşıklığı seçin",
        "Az tuş, kombo, trigger veya kaynak yönetiminden sürdürmek istediğinizi belirleyin.",
      ],
      [
        "Giriş şartını kontrol edin",
        "İlk build nadir unique, pahalı anointment veya gizli Ascendancy'ye bağlı olmamalı.",
      ],
      [
        "İlgili rehberi açın",
        "Kampanya yetenekleri, pasif aşamalar, ekipman önceliği ve yedek seçenekleri doğrulayın.",
      ],
    ],
    decisions: [
      "Hız isteyen yeni oyuncu menzilli Deadeye; dayanıklılık isteyen kalkan veya zırh Warrior seçebilir. Minion oyuncuları Infernalist ile Spirit Walker'ı, caster'lar basit self-cast ile ileri trigger'ları karşılaştırır.",
    ],
    mistakes: [
      "Yalnız tier harfine göre seçmeyin, gösterim ekipmanını başlangıç ekipmanı sanmayın ve temel mekanik hissini denemeden Ascendancy kararı vermeyin.",
    ],
    faq: [
      [
        "Her sınıf her yeteneği kullanabilir mi?",
        "Silah ve özellik koşulları sağlanırsa birçok yetenek sınıflar arasında kullanılabilir; ağaç konumu ve Ascendancy yine büyük fark yaratır.",
      ],
      [
        "Yeni başlayan için en iyi sınıf hangisi?",
        "Güncel, ucuz ve tam ilerleme rotası bulunan; rotasyonu ile savunmasını anladığınız sınıf.",
      ],
    ],
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    meta: {
      title: "PoE2 1–4. Bölüm boss ve kalıcı ödül kontrol listesi",
      shortTitle: "1–4. Bölüm boss listesi",
      summary:
        "1–4. Bölümlerde ana bossları, kalıcı ödüllü isteğe bağlı hedefleri ve kolay kaçırılan görev eşyalarını ayırın.",
      description:
        "PoE2 1–4. Bölüm listesi: boss sırası, can, Spirit, dirençler, silah seti pasifleri ve kaçırılan ödülleri geri alma.",
      imageAlt: "PoE2 kampanya boss listesini temsil eden Count Geonor",
      seoTitle: "PoE2 1–4. Bölüm boss ve kalıcı ödül listesi",
      seoDescription:
        "PoE2 1–4. Bölüm bossları, can, Spirit, direnç, silah seti pasifleri ve isteğe bağlı hedefleri takip edin.",
    },
    quickAnswers: [
      [
        "Ana bosslar",
        "Ana işaretleri izleyin; bu dövüşler sonraki bölgeyi veya bölümü açar.",
      ],
      [
        "Kalıcı ödüller",
        "Bölümden çıkmadan can, Spirit, direnç veya silah seti puanı veren hedefleri kontrol edin.",
      ],
      [
        "Kaçırılan ödül",
        "Waypoint ile dönün, hedefi tamamlayın ve eşyayı gerektiği gibi kullanın veya teslim edin.",
      ],
    ],
    overview: [
      "Sayfa boss rotasını kalıcı ödül listesiyle birleştirerek şimdi zorunlu, sapmaya değer veya sonraya bırakılabilir hedefleri ayırır.",
      "Ödül değerleri ve rotalar kampanya düzenlemeleriyle değişebilir. Saldırılar için boss sayfasına, sayısal matris için kalıcı ödül rehberine bakın.",
    ],
    keyPoints: [
      "1. Bölüm: Beira, Crowbell, King in the Mists ve Candlemass.",
      "2. Bölüm: Balbala ilk Trial'ı açar, Kabala silah seti puanı verir.",
      "3. Bölüm: Mighty Silverfist ve Ignagduk kalıcı güç verir.",
      "4. Bölüm ve geçiş kısımları Spirit, direnç ve ilerleme ödülleri ekler.",
    ],
    steps: [
      [
        "Yeni bölüme girince",
        "Listeyi açın ve yalnız güncel yama için doğrulanmış ödülleri işaretleyin.",
      ],
      [
        "Ana hikâyeyi ilerletin",
        "Uzun sapmaları değerlendirmeden önce ana bossları yenip Waypoint'leri açın.",
      ],
      [
        "Yakın ödülleri alın",
        "Ana rotada olan veya mevcut sorunu çözen kalıcı ödülleri hemen tamamlayın.",
      ],
      [
        "Harita öncesi denetim",
        "Endgame ekipmanına büyük yatırım yapmadan tüm kaçırılmış ödülleri alın.",
      ],
    ],
    decisions: [
      "Hayatta kalma zayıfsa direnç veya canı; aura, minion ve kalıcı yetenek build'lerinde erken Spirit'i seçin. Silah seti puanları gerçekten iki uzman ağaç kullanıldığında değerlidir.",
    ],
    mistakes: [
      "Boss öldürmek ödülü her zaman otomatik vermez: bazı eşyalar sağ tıklanır, bazıları NPC'ye teslim edilir. Kampanyadaki King in the Mists, endgame pinnacle sürümü değildir.",
    ],
    faq: [
      [
        "Kaçırılan kalıcı ödüle dönebilir miyim?",
        "Evet. İlgili Waypoint'e dönüp boss veya görevi tamamlayın ve eşyanın kullanılması ya da teslim edilmesi gerekip gerekmediğine bakın.",
      ],
      [
        "Tüm isteğe bağlı bossları hemen öldürmeli miyim?",
        "Kalıcı özellik verenler çoğunlukla değerlidir; yalnız normal loot veren ve uzak olan boss sonraya kalabilir.",
      ],
    ],
  },
  "the-executioner": {
    meta: {
      title:
        "The Executioner: ağır vuruşlar, takviyeler ve Ogham Village rotası",
      shortTitle: "The Executioner",
      summary:
        "1. Bölüm Ogham Village ana bossu; yavaş ama ölümcül fiziksel vuruşları, kırmızı ön saldırısı ve takviyeleri önde duranları cezalandırır.",
      description:
        "PoE2 The Executioner rehberi: konum, saldırı işaretleri, takviyeler, güvenli yerleşim, ateş direnci ve görev ilerlemesi.",
      seoTitle: "The Executioner 1. Bölüm boss rehberi (PoE2)",
      seoDescription:
        "PoE2 The Executioner'ı yenin: Ogham Village rotası, kırmızı ağır vuruş, takviyeler, konum, hazırlık ve görev.",
    },
    overview: [
      "The Executioner, Ogham Village sonundaki ana rotayı kapatır. Yavaş saldırır ama önden çok sert vurur; takviyeler temizlenmezse arena hızla dolar.",
      "Orta mesafede çevresinde dönmek, hazırlıkta yana yuvarlanmak veya arkasına geçmek ve uzun toparlanmada saldırmak güvenlidir.",
    ],
    keyPoints: [
      "Konum: Ogham Village sonundaki Executioner's Block.",
      "Tehditler: ağır fiziksel vuruşlar ve ön süpürmeler.",
      "Sonuç: The Trail of Corruption ilerler.",
    ],
    strategy: [
      "Silahını kaldırdığında veya kırmızı parladığında ön çizgiden çıkın: uzaktaysanız yana yuvarlanın, yakındaysanız arkasına geçin. Toparlanma sırasında saldırın.",
      "Paralı asker çağırdığında önce menzilli düşmanları öldürüp arena dışından hareket edin. Projeksiyonlar ile yanan zemin üst üste gelirken boss hasarını zorlamayın.",
    ],
    strategyBullets: [
      "Hazırlık sırasında önünde durmayın.",
      "Bossa dönmeden önce takviyeleri temizleyin.",
      "Kırmızı çizgi vuruşu için bir kaçış saklayın.",
    ],
    preparation: [
      "Girmeden önce ana yetenek ve silahı yükseltin. Ateş direnci bölge ve yanan zemine yardım eder; yeterli can ile hareketlilik ağır fiziksel saldırıda tek vuruşta ölmeyi önler.",
    ],
    faq: [
      [
        "The Executioner nerede?",
        "1. Bölüm Ogham Village sonundaki Executioner's Block'ta, genellikle Waypoint'in diğer tarafındadır.",
      ],
      [
        "Önce hangi saldırıdan kaçmalıyım?",
        "Kırmızı veya silahın kalktığı ağır vuruştan; sonra geniş süpürme sırasında önünden kaçının.",
      ],
      [
        "Yenince ne açılır?",
        "The Trail of Corruption ilerler ve Manor Ramparts yolu açılır.",
      ],
    ],
  },
};
