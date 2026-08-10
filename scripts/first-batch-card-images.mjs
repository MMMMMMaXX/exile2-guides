/** 文件职责：集中维护第一批 15 篇攻略的外部卡片图来源，以及新增图片替代文本的多语言补充。 */

export const firstBatchCardImages = {
  "big-monkee-spirit-walker": {
    imageUrl: "https://i.ytimg.com/vi/eghVY3XOzsw/maxresdefault.jpg",
    sourcePage: "https://www.youtube.com/watch?v=eghVY3XOzsw",
    credit: "Barczi POE2",
  },
  "grenade-gemling-legionnaire": {
    imageUrl: "https://i.ytimg.com/vi/2EZZGsfYOyY/maxresdefault.jpg",
    sourcePage: "https://www.youtube.com/watch?v=2EZZGsfYOyY",
    credit: "havoc616 VODS",
  },
  "lightning-arrow-deadeye": {
    imageUrl: "https://i.ytimg.com/vi/FDyNpyBgJ5s/maxresdefault.jpg",
    sourcePage: "https://www.youtube.com/watch?v=FDyNpyBgJ5s",
    credit: "Fubgun",
  },
  tornado: {
    imageUrl: "https://i.ytimg.com/vi/8EaFD-SEJGY/maxresdefault.jpg",
    sourcePage: "https://www.youtube.com/watch?v=8EaFD-SEJGY",
    credit: "Odealo embedded Tornado gameplay video",
  },
  "ball-lightning": {
    imageUrl: "https://i.ytimg.com/vi/cFqT8xaKJ8c/maxresdefault.jpg",
    sourcePage: "https://www.youtube.com/watch?v=cFqT8xaKJ8c",
    credit: "PhazePlays",
  },
  "gas-grenade": {
    imageUrl: "https://i.ytimg.com/vi/2NvYzQ61v7M/maxresdefault.jpg",
    sourcePage: "https://www.youtube.com/watch?v=2NvYzQ61v7M",
    credit: "Dreamcore",
  },
  "lightning-spear": {
    imageUrl: "https://i.ytimg.com/vi/99MwPVo0QuA/maxresdefault.jpg",
    sourcePage: "https://www.youtube.com/watch?v=99MwPVo0QuA",
    credit: "MECHuddy",
  },
  "adonias-ego": {
    imageUrl:
      "https://instant-carry.com/wp-content/uploads/2025/06/Buy-PoE-2-Adonias-Ego_alt.webp",
    sourcePage: "https://instant-carry.com/product/buy-poe-2-adonias-ego/",
    credit: "Instant Carry",
  },
  "sire-of-shards": {
    imageUrl: "https://kboosting.com/img/29439/c/sire-of-shards-500x500.png",
    sourcePage: "https://kboosting.com/poe-2/sire-of-shards",
    credit: "KBoosting",
  },
  "crown-of-the-pale-king": {
    imageUrl:
      "https://staticg.sportskeeda.com/editor/2025/08/e8f9c-17564599837035-1920.jpg",
    sourcePage:
      "https://www.sportskeeda.com/mmo/path-exile-2-thorns-warrior-build-guide-0-3-0",
    credit: "Sportskeeda",
  },
  "best-atlas-tree-0-5": {
    imageUrl:
      "https://www.akrpg.com/upload/20260602/6391599728929670966619298.png",
    sourcePage:
      "https://www.akrpg.com/news/1048--poe-2-05-best-atlas-tree-strats--currency-farming-mechanics",
    credit: "AKRPG",
  },
  "currency-farming-strategies-0-5": {
    imageUrl: "https://i.ytimg.com/vi/7-KcUkOYOtc/maxresdefault.jpg",
    sourcePage: "https://www.youtube.com/watch?v=7-KcUkOYOtc",
    credit: "KaidGames2",
  },
  "classes-ascendancies-guide": {
    imageUrl: "https://i.ytimg.com/vi/knx_VyDGYSw/maxresdefault.jpg",
    sourcePage: "https://www.youtube.com/watch?v=knx_VyDGYSw",
    credit: "MrRonit",
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    imageUrl:
      "https://wp.icy-veins.com/wp-content/uploads/2025/01/Permanent-Buffs-Map.jpg",
    sourcePage:
      "https://www.poe-vault.com/poe2/guides/campaign-difficulties-and-permanent-buffs",
    credit: "PoE Vault / Icy Veins",
  },
  "the-executioner": {
    imageUrl: "https://i.ytimg.com/vi/Iw-9TDJ76Xg/maxresdefault.jpg",
    sourcePage: "https://www.youtube.com/watch?v=Iw-9TDJ76Xg",
    credit: "easynow",
  },
};

/** 这些条目原先没有图片，因此在此补齐十语言替代文本；其余条目继续复用既有本地化词典。 */
export const addedImageAlts = {
  "adonias-ego": {
    en: "Adonia's Ego unique wand shown for a Power Charge setup",
    "zh-cn": "用于 Power Charge 准备的 Adonia's Ego 独特法杖",
    "pt-br":
      "Varinha única Adonia's Ego usada em uma preparação de Cargas de Poder",
    ru: "Уникальный жезл Adonia's Ego для подготовки зарядов энергии",
    de: "Der einzigartige Zauberstab Adonia's Ego für ein Kraftladungs-Setup",
    es: "La varita única Adonia's Ego usada para preparar Cargas de poder",
    fr: "La baguette unique Adonia's Ego utilisée pour préparer les Charges de pouvoir",
    ja: "パワーチャージ準備に使うユニークワンド Adonia's Ego",
    ko: "권능 충전 준비에 사용하는 고유 마법봉 Adonia's Ego",
    tr: "Güç Yükü hazırlığında kullanılan eşsiz Adonia's Ego asası",
  },
  "sire-of-shards": {
    en: "Sire of Shards unique staff used by circular projectile spell builds",
    "zh-cn": "用于环形投射物法术构筑的 Sire of Shards 独特长杖",
    "pt-br":
      "Cajado único Sire of Shards usado por builds de projéteis circulares",
    ru: "Уникальный посох Sire of Shards для заклинаний с круговыми снарядами",
    de: "Der einzigartige Stab Sire of Shards für kreisförmige Projektilzauber",
    es: "El bastón único Sire of Shards usado en builds de proyectiles circulares",
    fr: "Le bâton unique Sire of Shards utilisé par les builds de projectiles circulaires",
    ja: "円形投射物スペルビルドで使うユニークスタッフ Sire of Shards",
    ko: "원형 투사체 주문 빌드에 사용하는 고유 지팡이 Sire of Shards",
    tr: "Dairesel mermi büyüsü dizilimlerinde kullanılan eşsiz Sire of Shards asası",
  },
  "crown-of-the-pale-king": {
    en: "Crown of the Pale King unique helmet in a Thorns build",
    "zh-cn": "Thorns 构筑中的 Crown of the Pale King 独特头盔",
    "pt-br": "Elmo único Crown of the Pale King em uma build de Espinhos",
    ru: "Уникальный шлем Crown of the Pale King в билде через шипы",
    de: "Der einzigartige Helm Crown of the Pale King in einem Dornen-Build",
    es: "El casco único Crown of the Pale King en una build de Espinas",
    fr: "Le casque unique Crown of the Pale King dans un build d'Épines",
    ja: "ソーンビルドで使うユニーク兜 Crown of the Pale King",
    ko: "가시 빌드에 사용하는 고유 투구 Crown of the Pale King",
    tr: "Diken diziliminde kullanılan eşsiz Crown of the Pale King miğferi",
  },
  "the-executioner": {
    en: "The Executioner raising his weapon during the Act 1 boss fight",
    "zh-cn": "第一幕 Boss 战中举起武器的 The Executioner",
    "pt-br": "The Executioner erguendo a arma durante a luta de chefe do Ato 1",
    ru: "The Executioner поднимает оружие во время боя с боссом первого акта",
    de: "The Executioner hebt im Bosskampf von Akt 1 seine Waffe",
    es: "The Executioner alza su arma durante el combate de jefe del Acto 1",
    fr: "The Executioner lève son arme pendant le combat de boss de l'Acte 1",
    ja: "第1章のボス戦で武器を振り上げる The Executioner",
    ko: "1막 보스전에서 무기를 치켜드는 The Executioner",
    tr: "1. Perde boss savaşında silahını kaldıran The Executioner",
  },
};
