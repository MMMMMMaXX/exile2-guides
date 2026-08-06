/** 文件职责：集中维护分类页可索引导语和无内容状态文案，避免路由分散硬编码。 */
import type { ContentLocale, ContentType } from "../content/constants";

type CategoryCopy = {
  emptyDescription: string;
  emptyTitle: string;
  intro: string;
  label: string;
  metaDescription: string;
  metaTitle: string;
};

const categoryLabelByType: Record<ContentType, Record<ContentLocale, string>> = {
  boss: {
    en: "Bosses",
    "zh-cn": "首领攻略",
    "pt-br": "Chefes",
    ru: "Боссы",
    de: "Bosse",
    es: "Jefes",
    fr: "Bosses",
    ja: "ボス",
    ko: "보스",
    tr: "Bosslar",
  },
  build: {
    en: "Builds",
    "zh-cn": "Build 攻略",
    "pt-br": "Builds",
    ru: "Билды",
    de: "Builds",
    es: "Builds",
    fr: "Builds",
    ja: "ビルド",
    ko: "빌드",
    tr: "Build'ler",
  },
  guide: {
    en: "Guides",
    "zh-cn": "攻略",
    "pt-br": "Guias",
    ru: "Гайды",
    de: "Leitfäden",
    es: "Guías",
    fr: "Guides",
    ja: "ガイド",
    ko: "가이드",
    tr: "Rehberler",
  },
  item: {
    en: "Items",
    "zh-cn": "物品",
    "pt-br": "Itens",
    ru: "Предметы",
    de: "Gegenstände",
    es: "Objetos",
    fr: "Objets",
    ja: "アイテム",
    ko: "아이템",
    tr: "Eşyalar",
  },
  patch: {
    en: "Patch Notes",
    "zh-cn": "补丁说明",
    "pt-br": "Notas de Atualização",
    ru: "Примечания к обновлению",
    de: "Patch-Hinweise",
    es: "Notas del Parche",
    fr: "Notes de Mise à Jour",
    ja: "パッチノート",
    ko: "패치 노트",
    tr: "Yama Notları",
  },
  skill: {
    en: "Skills",
    "zh-cn": "技能",
    "pt-br": "Habilidades",
    ru: "Навыки",
    de: "Fähigkeiten",
    es: "Habilidades",
    fr: "Compétences",
    ja: "スキル",
    ko: "스킬",
    tr: "Yetenekler",
  },
};

const buildCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Build guides will appear here after editorial review. Drafts and unverified sample builds are never shown on this public page.",
    emptyTitle: "Verified Builds are being prepared",
    intro:
      "Compare Path of Exile 2 builds by class, ascendancy, main skill and stage. Each guide links passive tree, gear progression and source notes for the current patch.",
    label: "Builds",
    metaDescription:
      "Verified Path of Exile 2 build guides, filterable by class, ascendancy, stage and budget. Updated for patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过编辑核验的 Build 攻略会在发布后显示于此。草稿、示例和未经核验的 Build 不会进入公开页面。",
    emptyTitle: "已核验 Build 攻略正在准备中",
    intro:
      "按职业、升华、核心技能与阶段比较 Path of Exile 2 的 Build。每篇攻略链接天赋树、装备提升路线与当前版本的来源记录。",
    label: "Build 攻略",
    metaDescription:
      "经过核验的 Path of Exile 2 Build 攻略，可按职业、升华、阶段与预算筛选。适配当前版本 0.5.4e。",
    metaTitle: "Path of Exile 2 Build 攻略 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias de Build verificados aparecerão aqui após a revisão editorial. Rascunhos e builds de amostra não verificados nunca são exibidos nesta página pública.",
    emptyTitle: "Builds verificados estão sendo preparados",
    intro:
      "Compare builds de Path of Exile 2 por classe, ascendência, habilidade principal e estágio. Cada guia traz a árvore de passivas, progressão de equipamento e fontes para o patch atual.",
    label: "Builds",
    metaDescription:
      "Guias de Build de Path of Exile 2 verificados, filtráveis por classe, ascendência, estágio e orçamento. Atualizado para o patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды по билдам появятся здесь после редакционной проверки. Черновики и непроверенные примеры билдов никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные билды готовятся к публикации",
    intro:
      "Сравнивайте билды Path of Exile 2 по классу, вознесению, основному навыку и стадии. Каждый гайд содержит дерево пассивок, прогрессию снаряжения и источники для текущего патча.",
    label: "Билды",
    metaDescription:
      "Проверенные гайды по билдам Path of Exile 2, с фильтрацией по классу, вознесению, стадии и бюджету. Обновлено для патча 0.5.4e.",
    metaTitle: "Path of Exile 2 Билды | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Build-Guides erscheinen hier nach redaktioneller Prüfung. Entwürfe und unverifizierte Beispiel-Builds werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Builds werden vorbereitet",
    intro:
      "Vergleiche Path of Exile 2-Builds nach Klasse, Ascendancy, Hauptfähigkeit und Stufe. Jeder Guide verlinkt Passivbaum, Ausrüstungsprogression und Quellen für den aktuellen Patch.",
    label: "Builds",
    metaDescription:
      "Verifizierte Path of Exile 2 Build-Guides, filterbar nach Klasse, Ascendancy, Stufe und Budget. Aktualisiert für Patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías de Build verificadas aparecerán aquí tras la revisión editorial. Los borradores y las builds de muestra no verificadas nunca se muestran en esta página pública.",
    emptyTitle: "Las Builds verificadas se están preparando",
    intro:
      "Compara builds de Path of Exile 2 por clase, ascendencia, habilidad principal y etapa. Cada guía incluye el árbol de pasivas, progresión de equipo y fuentes para el parche actual.",
    label: "Builds",
    metaDescription:
      "Guías de Build de Path of Exile 2 verificadas, filtrables por clase, ascendencia, etapa y presupuesto. Actualizado para el parche 0.5.4e.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides de Build vérifiés apparaîtront ici après relecture éditoriale. Les brouillons et les builds d'exemple non vérifiés ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les Builds vérifiés sont en préparation",
    intro:
      "Comparez les builds Path of Exile 2 par classe, ascendance, compétence principale et étape. Chaque guide inclut l'arbre passif, la progression d'équipement et les sources pour le patch actuel.",
    label: "Builds",
    metaDescription:
      "Guides de Build Path of Exile 2 vérifiés, filtrables par classe, ascendance, étape et budget. Mis à jour pour le patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みのビルドガイドは編集審査後にこちらに表示されます。草稿や未検証のサンプルビルドがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みビルドを準備中です",
    intro:
      "クラス、昇華、メインスキル、ステージごとに Path of Exile 2 のビルドを比較。各ガイドにはパッシブツリー、装備進行、現在のパッチの出典が含まれます。",
    label: "ビルド",
    metaDescription:
      "Path of Exile 2 の検証済みビルドガイド。クラス、昇華、ステージ、予算で絞り込み可能。パッチ 0.5.4e に対応。",
    metaTitle: "Path of Exile 2 ビルド | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 빌드 가이드는 편집 검토 후에 여기에 표시됩니다. 초안과 검증되지 않은 샘플 빌드는 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 빌드를 준비 중입니다",
    intro:
      "클리스, 승천, 주력 스킬, 단계별로 Path of Exile 2 빌드를 비교하세요. 각 가이드에는 패시브 트리, 장비 성장 경로, 현재 패치 출처가 포함됩니다.",
    label: "빌드",
    metaDescription:
      "Path of Exile 2 빌드 가이드 검증 완료본. 클래스, 승천, 단계, 예산으로 필터링 가능. 패치 0.5.4e 기준 업데이트.",
    metaTitle: "Path of Exile 2 빌드 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Build rehberleri, editöryel incelemeden sonra burada görünecektir. Taslaklar ve doğrulanmamış örnek build'ler bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Build'ler hazırlanıyor",
    intro:
      "Path of Exile 2 build'lerini sınıf, yükseliş, ana yetenek ve aşamaya göre karşılaştırın. Her rehber pasif ağaç, ekipman ilerlemesi ve mevcut yama kaynaklarını içerir.",
    label: "Build'ler",
    metaDescription:
      "Path of Exile 2 Build rehberleri doğrulanmış, sınıf, yükseliş, aşama ve bütçeye göre filtrelenebilir. 0.5.4e yaması için güncellendi.",
    metaTitle: "Path of Exile 2 Build'ler | Exile2 Guides",
  },
};

const bossCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Boss guides will appear here after the encounter notes, sources and review date are ready. Drafts, placeholders and unverified sample bosses are never shown on this public page.",
    emptyTitle: "Verified Boss guides are being prepared",
    intro:
      "Find Path of Exile 2 boss strategies by campaign act, trial or endgame tier. Each guide covers attack patterns, phases, defenses and rewards.",
    label: "Bosses",
    metaDescription:
      "Verified Path of Exile 2 boss guides with phase notes, defenses and rewards. Filter by campaign, trial or endgame.",
    metaTitle: "Path of Exile 2 Bosses | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "首领攻略会在战斗笔记、来源和核验日期准备完成后显示。草稿、占位内容和未经核验的示例首领不会进入公开页面。",
    emptyTitle: "已核验首领攻略正在准备中",
    intro:
      "按战役章节、试炼或终局层数查找 Path of Exile 2 首领打法。每篇攻略包含攻击前摇、阶段要点、防御准备与掉落奖励。",
    label: "首领攻略",
    metaDescription:
      "经过核验的 Path of Exile 2 首领攻略，含阶段笔记、防御准备与掉落。可按战役、试炼或终局筛选。",
    metaTitle: "Path of Exile 2 首领攻略 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias de Chefes verificados aparecerão aqui quando as notas de encontro, fontes e data de revisão estiverem prontas. Rascunhos, espaços reservados e chefes de amostra não verificados nunca são exibidos nesta página pública.",
    emptyTitle: "Guias de Chefes verificados estão sendo preparados",
    intro:
      "Encontre estratégias de chefes de Path of Exile 2 por ato de campanha, prova ou tier de endgame. Cada guia cobre padrões de ataque, fases, defesas e recompensas.",
    label: "Chefes",
    metaDescription:
      "Guias de Chefes de Path of Exile 2 verificados, com notas de fase, defesas e recompensas. Filtre por campanha, prova ou endgame.",
    metaTitle: "Path of Exile 2 Chefes | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды по боссам появятся здесь, когда будут готовы заметки о встрече, источники и дата проверки. Черновики, заготовки и непроверенные примеры боссов никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные гайды по боссам готовятся к публикации",
    intro:
      "Найдите стратегии по боссам Path of Exile 2 по акту кампании, испытанию или эндгейм-уровню. Каждый гайд включает паттерны атак, фазы, защиту и награды.",
    label: "Боссы",
    metaDescription:
      "Проверенные гайды по боссам Path of Exile 2 с заметками по фазам, защитой и наградами. Фильтрация по кампании, испытанию или эндгейму.",
    metaTitle: "Path of Exile 2 Боссы | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Boss-Guides erscheinen hier, sobald die Begegnungsnotizen, Quellen und das Prüfdatum bereit sind. Entwürfe, Platzhalter und unverifizierte Beispiel-Bosse werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Boss-Guides werden vorbereitet",
    intro:
      "Finde Path of Exile 2 Boss-Strategien nach Akt, Prüfung oder Endgame-Stufe. Jeder Guide deckt Angriffsmuster, Phasen, Verteidigung und Belohnungen ab.",
    label: "Bosse",
    metaDescription:
      "Verifizierte Path of Exile 2 Boss-Guides mit Phasennotizen, Verteidigung und Belohnungen. Filterbar nach Akt, Prüfung oder Endgame.",
    metaTitle: "Path of Exile 2 Bosses | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías de Jefes verificadas aparecerán aquí cuando las notas de encuentro, las fuentes y la fecha de revisión estén listas. Los borradores, marcadores y jefes de muestra no verificados nunca se muestran en esta página pública.",
    emptyTitle: "Las guías de Jefes verificadas se están preparando",
    intro:
      "Encuentra estrategias de jefes de Path of Exile 2 por acto de campaña, prueba o nivel de endgame. Cada guía cubre patrones de ataque, fases, defensas y recompensas.",
    label: "Jefes",
    metaDescription:
      "Guías de Jefes de Path of Exile 2 verificadas, con notas por fase, defensas y recompensas. Filtra por campaña, prueba o endgame.",
    metaTitle: "Path of Exile 2 Jefes | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides de Bosses vérifiés apparaîtront ici lorsque les notes de rencontre, les sources et la date de relecture seront prêtes. Les brouillons, les espaces réservés et les boss d'exemple non vérifiés ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les guides de Bosses vérifiés sont en préparation",
    intro:
      "Trouvez des stratégies de boss Path of Exile 2 par acte de campagne, épreuve ou niveau d'endgame. Chaque guide couvre les schémas d'attaque, les phases, la défense et les récompenses.",
    label: "Bosses",
    metaDescription:
      "Guides de Bosses Path of Exile 2 vérifiés, avec notes de phases, défenses et récompenses. Filtrez par campagne, épreuve ou endgame.",
    metaTitle: "Path of Exile 2 Bosses | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みボスガイドは、エンカウントのメモ・出典・確認日が揃い次第こちらに表示されます。草稿、プレースホルダー、未検証のサンプルボスがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みボスガイドを準備中です",
    intro:
      "キャンペーンアクト、試練、エンドゲーム層別に Path of Exile 2 のボス攻略を探す。各ガイドは攻撃パターン、フェーズ、防御、報酬をカバーします。",
    label: "ボス",
    metaDescription:
      "Path of Exile 2 の検証済みボスガイド。フェーズメモ、防御、報酬付き。キャンペーン、試練、エンドゲームで絞り込み可能。",
    metaTitle: "Path of Exile 2 ボス | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 보스 가이드는 전투 메모, 출처, 확인 날짜가 준비되면 여기에 표시됩니다. 초안, 플레이스홀더, 검증되지 않은 샘플 보스는 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 보스 가이드를 준비 중입니다",
    intro:
      "캠페인 액트, 시련, 엔드게임 티어별로 Path of Exile 2 보스 공략을 찾아보세요. 각 가이드는 공격 패턴, 단계, 방어, 보상을 다룹니다.",
    label: "보스",
    metaDescription:
      "Path of Exile 2 보스 가이드 검증 완료본. 단계 메모, 방어, 보상 포함. 캠페인, 시련, 엔드게임으로 필터링 가능.",
    metaTitle: "Path of Exile 2 보스 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Boss rehberleri, karşılaşma notları, kaynaklar ve inceleme tarihi hazır olunca burada görünecektir. Taslaklar, yer tutucular ve doğrulanmamış örnek boss'lar bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Boss rehberleri hazırlanıyor",
    intro:
      "Path of Exile 2 boss stratejilerini kampanya bölümüne, denemeye veya endgame seviyesine göre bulun. Her rehber saldırı desenlerini, aşamaları, savunmayı ve ödülleri kapsar.",
    label: "Bosslar",
    metaDescription:
      "Path of Exile 2 Boss rehberleri doğrulanmış, aşama notları, savunma ve ödüllerle. Kampanya, deneme veya endgame'e göre filtrelenebilir.",
    metaTitle: "Path of Exile 2 Bosslar | Exile2 Guides",
  },
};

const itemCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Item guides will appear here after editorial review. Drafts and sample items are never shown on this public page.",
    emptyTitle: "Verified Items are being prepared",
    intro:
      "Path of Exile 2 item reference for currency, unique items, waystones, essences, tablets and crafting materials. Filter by category and use case.",
    label: "Items",
    metaDescription:
      "Verified Path of Exile 2 item guides for currency, uniques, waystones and crafting materials. Updated for patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Items | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过核验的物品攻略会在编辑审阅后显示于此。草稿与示例物品不会进入公开页面。",
    emptyTitle: "已核验物品正在准备中",
    intro:
      "Path of Exile 2 物品资料：通货、暗金、异界石、精华、石碑与 crafting 材料。按类别与用途筛选。",
    label: "物品",
    metaDescription:
      "经过核验的 Path of Exile 2 物品攻略，涵盖通货、暗金、异界石与 crafting 材料。适配当前版本 0.5.4e。",
    metaTitle: "Path of Exile 2 物品 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias de Itens verificados aparecerão aqui após a revisão editorial. Rascunhos e itens de amostra nunca são exibidos nesta página pública.",
    emptyTitle: "Itens verificados estão sendo preparados",
    intro:
      "Referência de itens de Path of Exile 2: moedas, itens únicos, waystones, essências, tablets e materiais de crafting. Filtre por categoria e uso.",
    label: "Itens",
    metaDescription:
      "Guias de itens de Path of Exile 2 verificados para moedas, únicos, waystones e materiais de crafting. Atualizado para o patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Itens | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды по предметам появятся здесь после редакционной проверки. Черновики и примеры предметов никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные предметы готовятся к публикации",
    intro:
      "Справочник по предметам Path of Exile 2: валюта, уникальные предметы, waystones, эссенции, таблички и материалы крафта. Фильтрация по категории и применению.",
    label: "Предметы",
    metaDescription:
      "Проверенные гайды по предметам Path of Exile 2: валюта, уникальные предметы, waystones и материалы крафта. Обновлено для патча 0.5.4e.",
    metaTitle: "Path of Exile 2 Предметы | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Item-Guides erscheinen hier nach redaktioneller Prüfung. Entwürfe und Beispiel-Items werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Gegenstände werden vorbereitet",
    intro:
      "Path of Exile 2 Item-Referenz für Währung, einzigartige Gegenstände, Waystones, Essenzen, Tablets und Crafting-Materialien. Nach Kategorie und Anwendungsfall filtern.",
    label: "Gegenstände",
    metaDescription:
      "Verifizierte Path of Exile 2 Item-Guides für Währung, Unique-Items, Waystones und Crafting-Materialien. Aktualisiert für Patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Gegenstände | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías de Objetos verificadas aparecerán aquí tras la revisión editorial. Los borradores y objetos de muestra nunca se muestran en esta página pública.",
    emptyTitle: "Los Objetos verificados se están preparando",
    intro:
      "Referencia de objetos de Path of Exile 2: moneda, objetos únicos, waystones, esencias, tablillas y materiales de crafting. Filtra por categoría y uso.",
    label: "Objetos",
    metaDescription:
      "Guías de objetos de Path of Exile 2 verificadas para moneda, únicos, waystones y materiales de crafting. Actualizado para el parche 0.5.4e.",
    metaTitle: "Path of Exile 2 Objetos | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides d'Objets vérifiés apparaîtront ici après relecture éditoriale. Les brouillons et objets d'exemple ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les Objets vérifiés sont en préparation",
    intro:
      "Référence des objets Path of Exile 2 : monnaie, objets uniques, waystones, essences, tablettes et matériaux de craft. Filtrez par catégorie et usage.",
    label: "Objets",
    metaDescription:
      "Guides d'objets Path of Exile 2 vérifiés pour la monnaie, les objets uniques, les waystones et les matériaux de craft. Mis à jour pour le patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Objets | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みのアイテムガイドは編集審査後にこちらに表示されます。草稿やサンプルアイテムがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みアイテムを準備中です",
    intro:
      "Path of Exile 2 のアイテムリファレンス：通貨、ユニーク、アルター石、エッセンス、タブレット、クラフト素材。カテゴリと用途で絞り込み可能。",
    label: "アイテム",
    metaDescription:
      "Path of Exile 2 の検証済みアイテムガイド。通貨、ユニーク、waystones、クラフト素材をカバー。パッチ 0.5.4e に対応。",
    metaTitle: "Path of Exile 2 アイテム | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 아이템 가이드는 편집 검토 후 여기에 표시됩니다. 초안과 샘플 아이템은 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 아이템을 준비 중입니다",
    intro:
      "Path of Exile 2 아이템 참고 자료：통화, 유니크 아이템, waystones, 에센스, 태블릿, crafting 재료. 카테고리와 용도로 필터링하세요.",
    label: "아이템",
    metaDescription:
      "Path of Exile 2 아이템 가이드 검증 완료본. 통화, 유니크, waystones, crafting 재료 포함. 패치 0.5.4e 기준 업데이트.",
    metaTitle: "Path of Exile 2 아이템 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Eşya rehberleri, editöryel incelemeden sonra burada görünecektir. Taslaklar ve örnek eşyalar bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Eşyalar hazırlanıyor",
    intro:
      "Path of Exile 2 eşya referansı: para, eşsiz eşyalar, waystones, özler, tabletler ve crafting malzemeleri. Kategori ve kullanım alanına göre filtreleyin.",
    label: "Eşyalar",
    metaDescription:
      "Path of Exile 2 eşya rehberleri doğrulanmış, para, eşsiz eşyalar, waystones ve crafting malzemeleri için. 0.5.4e yaması için güncellendi.",
    metaTitle: "Path of Exile 2 Eşyalar | Exile2 Guides",
  },
};

const skillCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Skill guides will appear here after editorial review. Drafts and sample skills are never shown on this public page.",
    emptyTitle: "Verified Skills are being prepared",
    intro:
      "Path of Exile 2 skill database: active, support, spirit and meta gems with tags, requirements and build links.",
    label: "Skills",
    metaDescription:
      "Verified Path of Exile 2 skill guides for active, support, spirit and meta gems. Updated for patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Skills | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过核验的技能攻略会在编辑审阅后显示于此。草稿与示例技能不会进入公开页面。",
    emptyTitle: "已核验技能正在准备中",
    intro:
      "Path of Exile 2 技能数据库：主动、辅助、精魂与 Meta 宝石，含标签、需求与关联 Build。",
    label: "技能",
    metaDescription:
      "经过核验的 Path of Exile 2 技能攻略，涵盖主动、辅助、精魂与 Meta 宝石。适配当前版本 0.5.4e。",
    metaTitle: "Path of Exile 2 技能 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias de Habilidades verificados aparecerão aqui após a revisão editorial. Rascunhos e habilidades de amostra nunca são exibidos nesta página pública.",
    emptyTitle: "Habilidades verificadas estão sendo preparadas",
    intro:
      "Banco de habilidades de Path of Exile 2: gemas ativas, de suporte, espirituais e meta, com tags, requisitos e links de builds.",
    label: "Habilidades",
    metaDescription:
      "Guias de habilidades de Path of Exile 2 verificados para gemas ativas, de suporte, espirituais e meta. Atualizado para o patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Habilidades | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды по навыкам появятся здесь после редакционной проверки. Черновики и примеры навыков никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные навыки готовятся к публикации",
    intro:
      "База навыков Path of Exile 2: активные, поддерживающие, духовные и мета-камни с тегами, требованиями и ссылками на билды.",
    label: "Навыки",
    metaDescription:
      "Проверенные гайды по навыкам Path of Exile 2: активные, поддерживающие, духовные и мета-камни. Обновлено для патча 0.5.4e.",
    metaTitle: "Path of Exile 2 Навыки | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Skill-Guides erscheinen hier nach redaktioneller Prüfung. Entwürfe und Beispiel-Skills werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Fähigkeiten werden vorbereitet",
    intro:
      "Path of Exile 2 Skill-Datenbank: aktive, unterstützende, Geist- und Meta-Gems mit Tags, Anforderungen und Build-Links.",
    label: "Fähigkeiten",
    metaDescription:
      "Verifizierte Path of Exile 2 Skill-Guides für aktive, unterstützende, Geist- und Meta-Gems. Aktualisiert für Patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Fähigkeiten | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías de Habilidades verificadas aparecerán aquí tras la revisión editorial. Los borradores y habilidades de muestra nunca se muestran en esta página pública.",
    emptyTitle: "Las Habilidades verificadas se están preparando",
    intro:
      "Base de datos de habilidades de Path of Exile 2: gemas activas, de soporte, espirituales y meta, con etiquetas, requisitos y enlaces de builds.",
    label: "Habilidades",
    metaDescription:
      "Guías de habilidades de Path of Exile 2 verificadas para gemas activas, de soporte, espirituales y meta. Actualizado para el parche 0.5.4e.",
    metaTitle: "Path of Exile 2 Habilidades | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides de Compétences vérifiés apparaîtront ici après relecture éditoriale. Les brouillons et compétences d'exemple ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les Compétences vérifiées sont en préparation",
    intro:
      "Base de compétences Path of Exile 2 : gemmes actives, de soutien, d'esprit et meta, avec tags, prérequis et liens de builds.",
    label: "Compétences",
    metaDescription:
      "Guides de compétences Path of Exile 2 vérifiés pour gemmes actives, de soutien, d'esprit et meta. Mis à jour pour le patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Compétences | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みのスキルガイドは編集審査後にこちらに表示されます。草稿やサンプルスキルがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みスキルを準備中です",
    intro:
      "Path of Exile 2 のスキルデータベース：アクティブ、サポート、スピリット、メタジェム。タグ、必要条件、ビルドリンク付き。",
    label: "スキル",
    metaDescription:
      "Path of Exile 2 の検証済みスキルガイド。アクティブ、サポート、スピリット、メタジェムをカバー。パッチ 0.5.4e に対応。",
    metaTitle: "Path of Exile 2 スキル | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 스킬 가이드는 편집 검토 후 여기에 표시됩니다. 초안과 샘플 스킬은 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 스킬을 준비 중입니다",
    intro:
      "Path of Exile 2 스킬 데이터베이스: 액티브, 서포트, 정신, 메타 젬. 태그, 요구 조건, 빌드 링크 포함.",
    label: "스킬",
    metaDescription:
      "Path of Exile 2 스킬 가이드 검증 완료본. 액티브, 서포트, 정신, 메타 젬 포함. 패치 0.5.4e 기준 업데이트.",
    metaTitle: "Path of Exile 2 스킬 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Yetenek rehberleri, editöryel incelemeden sonra burada görünecektir. Taslaklar ve örnek yetenekler bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Yetenekler hazırlanıyor",
    intro:
      "Path of Exile 2 yetenek veritabanı: aktif, destek, ruh ve meta mücevherleri; etiketler, gereksinimler ve build bağlantılarıyla.",
    label: "Yetenekler",
    metaDescription:
      "Path of Exile 2 yetenek rehberleri doğrulanmış, aktif, destek, ruh ve meta mücevherleri için. 0.5.4e yaması için güncellendi.",
    metaTitle: "Path of Exile 2 Yetenekler | Exile2 Guides",
  },
};

const guideCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Guides will appear here after editorial review. Drafts and sample guides are never shown on this public page.",
    emptyTitle: "Verified Guides are being prepared",
    intro:
      "Path of Exile 2 progression guides for campaign, Atlas, crafting, defenses and beginner questions.",
    label: "Guides",
    metaDescription:
      "Verified Path of Exile 2 progression guides for campaign, Atlas, crafting and beginners. Updated for patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Guides | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过核验的攻略会在编辑审阅后显示于此。草稿与示例攻略不会进入公开页面。",
    emptyTitle: "已核验攻略正在准备中",
    intro:
      "Path of Exile 2 成长攻略：战役流程、异界图鉴、crafting、防御机制与新手问题。",
    label: "攻略",
    metaDescription:
      "经过核验的 Path of Exile 2 成长攻略，涵盖战役、异界图鉴、crafting 与新手内容。适配当前版本 0.5.4e。",
    metaTitle: "Path of Exile 2 攻略 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias verificados aparecerão aqui após a revisão editorial. Rascunhos e guias de amostra nunca são exibidos nesta página pública.",
    emptyTitle: "Guias verificados estão sendo preparados",
    intro:
      "Guias de progressão de Path of Exile 2 para campanha, Atlas, crafting, defesas e perguntas de iniciantes.",
    label: "Guias",
    metaDescription:
      "Guias de progressão de Path of Exile 2 verificados para campanha, Atlas, crafting e iniciantes. Atualizado para o patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Guias | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды появятся здесь после редакционной проверки. Черновики и примеры гайдов никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные гайды готовятся к публикации",
    intro:
      "Гайды по прогрессии Path of Exile 2: кампания, Атлас, крафт, защита и вопросы новичков.",
    label: "Гайды",
    metaDescription:
      "Проверенные гайды по прогрессии Path of Exile 2: кампания, Атлас, крафт и новички. Обновлено для патча 0.5.4e.",
    metaTitle: "Path of Exile 2 Гайды | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Guides erscheinen hier nach redaktioneller Prüfung. Entwürfe und Beispiel-Guides werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Leitfäden werden vorbereitet",
    intro:
      "Path of Exile 2 Progression-Guides für Kampagne, Atlas, Crafting, Verteidigung und Einsteigerfragen.",
    label: "Leitfäden",
    metaDescription:
      "Verifizierte Path of Exile 2 Progression-Guides für Kampagne, Atlas, Crafting und Einsteiger. Aktualisiert für Patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Leitfäden | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías verificadas aparecerán aquí tras la revisión editorial. Los borradores y guías de muestra nunca se muestran en esta página pública.",
    emptyTitle: "Las guías verificadas se están preparando",
    intro:
      "Guías de progresión de Path of Exile 2 para campaña, Atlas, crafting, defensas y preguntas de principiantes.",
    label: "Guías",
    metaDescription:
      "Guías de progresión de Path of Exile 2 verificadas para campaña, Atlas, crafting y principiantes. Actualizado para el parche 0.5.4e.",
    metaTitle: "Path of Exile 2 Guías | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides vérifiés apparaîtront ici après relecture éditoriale. Les brouillons et guides d'exemple ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les guides vérifiés sont en préparation",
    intro:
      "Guides de progression Path of Exile 2 : campagne, Atlas, craft, défenses et questions de débutants.",
    label: "Guides",
    metaDescription:
      "Guides de progression Path of Exile 2 vérifiés pour la campagne, l'Atlas, le craft et les débutants. Mis à jour pour le patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Guides | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みのガイドは編集審査後にこちらに表示されます。草稿やサンプルガイドがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みガイドを準備中です",
    intro:
      "Path of Exile 2 の育成ガイド：キャンペーン、アトラス、クラフト、防御、初心者向けの疑問。",
    label: "ガイド",
    metaDescription:
      "Path of Exile 2 の検証済み育成ガイド。キャンペーン、アトラス、クラフト、初心者向け。パッチ 0.5.4e に対応。",
    metaTitle: "Path of Exile 2 ガイド | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 가이드는 편집 검토 후 여기에 표시됩니다. 초안과 샘플 가이드는 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 가이드를 준비 중입니다",
    intro:
      "Path of Exile 2 성장 가이드: 캠페인, 아틀라스, crafting, 방어, 초보자 질문.",
    label: "가이드",
    metaDescription:
      "Path of Exile 2 성장 가이드 검증 완료본. 캠페인, 아틀라스, crafting, 초보자용. 패치 0.5.4e 기준 업데이트.",
    metaTitle: "Path of Exile 2 가이드 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Rehberler, editöryel incelemeden sonra burada görünecektir. Taslaklar ve örnek rehberler bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Rehberler hazırlanıyor",
    intro:
      "Path of Exile 2 ilerleme rehberleri: kampanya, Atlas, crafting, savunma ve yeni başlayan soruları.",
    label: "Rehberler",
    metaDescription:
      "Path of Exile 2 ilerleme rehberleri doğrulanmış, kampanya, Atlas, crafting ve yeni başlayanlar için. 0.5.4e yaması için güncellendi.",
    metaTitle: "Path of Exile 2 Rehberler | Exile2 Guides",
  },
};

const patchCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Patch Notes will appear here after editorial review. Drafts and sample patches are never shown on this public page.",
    emptyTitle: "Verified Patch Notes are being prepared",
    intro:
      "Path of Exile 2 patch notes, balance changes and build/boss/item impact summaries for every update.",
    label: "Patch Notes",
    metaDescription:
      "Path of Exile 2 patch notes and impact summaries for builds, bosses and items. Updated for patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Patch Notes | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过核验的补丁说明会在编辑审阅后显示于此。草稿与示例补丁不会进入公开页面。",
    emptyTitle: "已核验补丁说明正在准备中",
    intro:
      "Path of Exile 2 补丁说明、平衡改动，以及对 Build、首领、物品的影响汇总。",
    label: "补丁说明",
    metaDescription:
      "Path of Exile 2 补丁说明与对 Build、首领、物品的影响汇总。适配当前版本 0.5.4e。",
    metaTitle: "Path of Exile 2 补丁说明 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Notas de Atualização verificadas aparecerão aqui após a revisão editorial. Rascunhos e patches de amostra nunca são exibidos nesta página pública.",
    emptyTitle: "Notas de Atualização verificadas estão sendo preparadas",
    intro:
      "Notas de atualização de Path of Exile 2, mudanças de balanceamento e resumos de impacto em builds, chefes e itens.",
    label: "Notas de Atualização",
    metaDescription:
      "Notas de atualização de Path of Exile 2 e resumos de impacto em builds, chefes e itens. Atualizado para o patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Notas de Atualização | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные примечания к обновлению появятся здесь после редакционной проверки. Черновики и примеры обновлений никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные примечания к обновлению готовятся к публикации",
    intro:
      "Примечания к обновлениям Path of Exile 2, изменения баланса и сводки влияния на билды, боссов и предметы.",
    label: "Примечания к обновлению",
    metaDescription:
      "Примечания к обновлениям Path of Exile 2 и сводки влияния на билды, боссов и предметы. Обновлено для патча 0.5.4e.",
    metaTitle: "Path of Exile 2 Примечания к обновлению | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Patch-Hinweise erscheinen hier nach redaktioneller Prüfung. Entwürfe und Beispiel-Patches werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Patch-Hinweise werden vorbereitet",
    intro:
      "Path of Exile 2 Patch-Hinweise, Balance-Änderungen und Auswirkungen auf Builds, Bosse und Items für jedes Update.",
    label: "Patch-Hinweise",
    metaDescription:
      "Path of Exile 2 Patch-Hinweise und Auswirkungen auf Builds, Bosse und Items. Aktualisiert für Patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Patch-Hinweise | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las Notas del Parche verificadas aparecerán aquí tras la revisión editorial. Los borradores y parches de muestra nunca se muestran en esta página pública.",
    emptyTitle: "Las Notas del Parche verificadas se están preparando",
    intro:
      "Notas del parche de Path of Exile 2, cambios de balance y resúmenes de impacto en builds, jefes y objetos.",
    label: "Notas del Parche",
    metaDescription:
      "Notas del parche de Path of Exile 2 y resúmenes de impacto en builds, jefes y objetos. Actualizado para el parche 0.5.4e.",
    metaTitle: "Path of Exile 2 Notas del Parche | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les Notes de Mise à Jour vérifiées apparaîtront ici après relecture éditoriale. Les brouillons et mises à jour d'exemple ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les Notes de Mise à Jour vérifiées sont en préparation",
    intro:
      "Notes de mise à jour Path of Exile 2, changements d'équilibrage et résumés d'impact sur les builds, boss et objets.",
    label: "Notes de Mise à Jour",
    metaDescription:
      "Notes de mise à jour Path of Exile 2 et résumés d'impact sur les builds, boss et objets. Mis à jour pour le patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Notes de Mise à Jour | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みのパッチノートは編集審査後にこちらに表示されます。草稿やサンプルパッチがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みパッチノートを準備中です",
    intro:
      "Path of Exile 2 のパッチノート、バランス調整、ビルド・ボス・アイテムへの影響まとめ。",
    label: "パッチノート",
    metaDescription:
      "Path of Exile 2 のパッチノートとビルド、ボス、アイテムへの影響まとめ。パッチ 0.5.4e に対応。",
    metaTitle: "Path of Exile 2 パッチノート | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 패치 노트는 편집 검토 후 여기에 표시됩니다. 초안과 샘플 패치는 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 패치 노트를 준비 중입니다",
    intro:
      "Path of Exile 2 패치 노트, 밸런스 변경, 빌드/보스/아이템 영향 요약.",
    label: "패치 노트",
    metaDescription:
      "Path of Exile 2 패치 노트와 빌드, 보스, 아이템 영향 요약. 패치 0.5.4e 기준 업데이트.",
    metaTitle: "Path of Exile 2 패치 노트 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Yama Notları, editöryel incelemeden sonra burada görünecektir. Taslaklar ve örnek yamalar bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Yama Notları hazırlanıyor",
    intro:
      "Path of Exile 2 yama notları, denge değişiklikleri ve build/boss/eşya etki özetleri.",
    label: "Yama Notları",
    metaDescription:
      "Path of Exile 2 yama notları ve build, boss, eşya etki özetleri. 0.5.4e yaması için güncellendi.",
    metaTitle: "Path of Exile 2 Yama Notları | Exile2 Guides",
  },
};

/** 返回分类标题；Build 与 Boss 使用专属本地化名称，其他类型取对应语言的本地化术语。 */
export function getCategoryLabel(
  locale: ContentLocale,
  contentType: ContentType,
): string {
  if (contentType === "build") return buildCopyByLocale[locale].label;
  if (contentType === "boss") return bossCopyByLocale[locale].label;
  return categoryLabelByType[contentType][locale];
}

/** 返回当前任务可用的分类文案；Item / Skill / Guide / Patch 使用类型专属文案。 */
export function getCategoryCopy(
  locale: ContentLocale,
  contentType: ContentType,
): CategoryCopy {
  if (contentType === "build") return buildCopyByLocale[locale];
  if (contentType === "boss") return bossCopyByLocale[locale];
  if (contentType === "item") return itemCopyByLocale[locale];
  if (contentType === "skill") return skillCopyByLocale[locale];
  if (contentType === "guide") return guideCopyByLocale[locale];
  if (contentType === "patch") return patchCopyByLocale[locale];

  const label = getCategoryLabel(locale, contentType);
  return {
    emptyDescription:
      "Verified entries will appear after editorial review and publication. Drafts and sample content are not shown here.",
    emptyTitle: `${label} are being prepared`,
    intro: `Browse verified ${label} content for Path of Exile 2.`,
    label,
    metaDescription: `Verified ${label} content for Path of Exile 2.`,
    metaTitle: `${label} | Exile2 Guides`,
  };
}
