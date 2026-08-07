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

const categoryLabelByType: Record<
  ContentType,
  Record<ContentLocale, string>
> = {
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
      "Compare verified Path of Exile 2 builds by class, ascendancy, main skill and progression stage. Every PoE2 build guide links its passive tree, gear progression, leveling path and source notes for the current 0.5 patch.",
    label: "Builds",
    metaDescription:
      "Verified Path of Exile 2 build guides filterable by class, ascendancy, stage and budget. Each PoE2 build covers the passive tree, gear and leveling for patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过编辑核验的 Build 攻略会在发布后显示于此。草稿、示例和未经核验的 Build 不会进入公开页面。",
    emptyTitle: "已核验 Build 攻略正在准备中",
    intro:
      "对比 Path of Exile 2 已核验的 Build：按职业、升华、核心技能与阶段筛选。每篇 PoE2 Build 攻略都链接天赋树、装备成长路线、练级路径与当前 0.5 版本的来源记录。",
    label: "Build 攻略",
    metaDescription:
      "已核验的 Path of Exile 2 Build 攻略，可按职业、升华、阶段与预算筛选。每篇 PoE2 Build 涵盖天赋树、装备与练级，适配 0.5.4e 版本。",
    metaTitle: "Path of Exile 2 Build 攻略 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias de Build verificados aparecerão aqui após a revisão editorial. Rascunhos e builds de amostra não verificados nunca são exibidos nesta página pública.",
    emptyTitle: "Builds verificados estão sendo preparados",
    intro:
      "Compare builds verificados de Path of Exile 2 por classe, ascendência, habilidade principal e estágio de progressão. Cada guia de build PoE2 linka a árvore de passivas, progressão de equipamento, caminho de leveling e fontes para o patch 0.5 atual.",
    label: "Builds",
    metaDescription:
      "Guias de build de Path of Exile 2 verificados, filtráveis por classe, ascendência, estágio e orçamento. Cada build PoE2 cobre a árvore de passivas, equipamento e leveling para o patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды по билдам появятся здесь после редакционной проверки. Черновики и непроверенные примеры билдов никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные билды готовятся к публикации",
    intro:
      "Сравнивайте проверенные билды Path of Exile 2 по классу, вознесению, основному навыку и стадии прогрессии. Каждый гайд по билду PoE2 содержит дерево пассивок, прогрессию снаряжения, путь прокачки и источники для текущего патча 0.5.",
    label: "Билды",
    metaDescription:
      "Проверенные гайды по билдам Path of Exile 2, с фильтрацией по классу, вознесению, стадии и бюджету. Каждый билд PoE2 охватывает дерево пассивок, снаряжение и прокачку для патча 0.5.4e.",
    metaTitle: "Path of Exile 2 Билды | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Build-Guides erscheinen hier nach redaktioneller Prüfung. Entwürfe und unverifizierte Beispiel-Builds werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Builds werden vorbereitet",
    intro:
      "Vergleiche verifizierte Path of Exile 2-Builds nach Klasse, Ascendancy, Hauptfähigkeit und Progressionsstufe. Jeder PoE2-Build-Guide verlinkt Passivbaum, Ausrüstungsprogression, Leveling-Pfad und Quellen für den aktuellen 0.5-Patch.",
    label: "Builds",
    metaDescription:
      "Verifizierte Path of Exile 2-Build-Guides, filterbar nach Klasse, Ascendancy, Stufe und Budget. Jeder PoE2-Build deckt Passivbaum, Ausrüstung und Leveling für Patch 0.5.4e ab.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías de Build verificadas aparecerán aquí tras la revisión editorial. Los borradores y las builds de muestra no verificadas nunca se muestran en esta página pública.",
    emptyTitle: "Las Builds verificadas se están preparando",
    intro:
      "Compara builds verificados de Path of Exile 2 por clase, ascendencia, habilidad principal y etapa de progresión. Cada guía de build PoE2 enlaza el árbol de pasivas, la progresión de equipo, la ruta de nivelado y las fuentes para el parche 0.5 actual.",
    label: "Builds",
    metaDescription:
      "Guías de build de Path of Exile 2 verificadas, filtrables por clase, ascendencia, etapa y presupuesto. Cada build PoE2 cubre el árbol de pasivas, el equipo y el nivelado para el parche 0.5.4e.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides de Build vérifiés apparaîtront ici après relecture éditoriale. Les brouillons et les builds d'exemple non vérifiés ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les Builds vérifiés sont en préparation",
    intro:
      "Comparez les builds vérifiés de Path of Exile 2 par classe, ascendance, compétence principale et stade de progression. Chaque guide de build PoE2 lie l'arbre passif, la progression d'équipement, le chemin de leveling et les sources pour le patch 0.5 actuel.",
    label: "Builds",
    metaDescription:
      "Guides de build Path of Exile 2 vérifiés, filtrables par classe, ascendance, stade et budget. Chaque build PoE2 couvre l'arbre passif, l'équipement et le leveling pour le patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みのビルドガイドは編集審査後にこちらに表示されます。草稿や未検証のサンプルビルドがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みビルドを準備中です",
    intro:
      "クラス、昇華、メインスキル、進行ステージごとに Path of Exile 2 の検証済みビルドを比較。各 PoE2 ビルドガイドはパッシブツリー、装備の進行、レベリング経路、現在の 0.5 パッチの出典をリンクしています。",
    label: "ビルド",
    metaDescription:
      "クラス、昇華、ステージ、予算で絞り込める Path of Exile 2 の検証済みビルドガイド。各 PoE2 ビルドはパッシブツリー、装備、レベリングをパッチ 0.5.4e 向けにカバー。",
    metaTitle: "Path of Exile 2 ビルド | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 빌드 가이드는 편집 검토 후에 여기에 표시됩니다. 초안과 검증되지 않은 샘플 빌드는 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 빌드를 준비 중입니다",
    intro:
      "클래스, 승천, 주력 스킬, 진행 단계별로 Path of Exile 2의 검증된 빌드를 비교하세요. 각 PoE2 빌드 가이드는 패시브 트리, 장비 성장 경로, 레벨링 경로, 현재 0.5 패치의 출처를 링크합니다.",
    label: "빌드",
    metaDescription:
      "클래스, 승천, 단계, 예산으로 필터링할 수 있는 Path of Exile 2 검증 완료 빌드 가이드. 각 PoE2 빌드는 패시브 트리, 장비, 레벨링을 패치 0.5.4e 기준으로 다룹니다.",
    metaTitle: "Path of Exile 2 빌드 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Build rehberleri, editöryel incelemeden sonra burada görünecektir. Taslaklar ve doğrulanmamış örnek build'ler bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Build'ler hazırlanıyor",
    intro:
      "Path of Exile 2 build'lerini sınıf, yükseliş, ana yetenek ve ilerleme aşamasına göre karşılaştırın. Her PoE2 build rehberi pasif ağacı, ekipman ilerlemesi, leveling yolu ve güncel 0.5 yamasının kaynaklarını içerir.",
    label: "Build'ler",
    metaDescription:
      "Sınıf, yükseliş, aşama ve bütçeye göre filtrelenebilir Path of Exile 2 build rehberleri. Her PoE2 build, pasif ağacı, ekipmanı ve leveling'i 0.5.4e yaması için kapsar.",
    metaTitle: "Path of Exile 2 Build'ler | Exile2 Guides",
  },
};

const bossCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Boss guides will appear here after the encounter notes, sources and review date are ready. Drafts, placeholders and unverified sample bosses are never shown on this public page.",
    emptyTitle: "Verified Boss guides are being prepared",
    intro:
      "Find Path of Exile 2 boss strategies by campaign act, trial or endgame tier. Every PoE2 boss guide covers attack patterns, phases, defensive setups, mechanics and loot rewards for the current patch.",
    label: "Bosses",
    metaDescription:
      "Verified Path of Exile 2 boss guides with phase notes, defensive setups and loot rewards. Filter bosses by campaign, trial, endgame or pinnacle.",
    metaTitle: "Path of Exile 2 Bosses | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "首领攻略会在战斗笔记、来源和核验日期准备完成后显示。草稿、占位内容和未经核验的示例首领不会进入公开页面。",
    emptyTitle: "已核验首领攻略正在准备中",
    intro:
      "按战役章节、试炼或终局层数查找 Path of Exile 2 首领打法。每篇 PoE2 首领攻略涵盖攻击前摇、阶段、防御配置、机制与掉落奖励，对应当前版本。",
    label: "首领攻略",
    metaDescription:
      "已核验的 Path of Exile 2 首领攻略，含阶段笔记、防御配置与掉落奖励。可按战役、试炼、终局或巅峰筛选。",
    metaTitle: "Path of Exile 2 首领攻略 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias de Chefes verificados aparecerão aqui quando as notas de encontro, fontes e data de revisão estiverem prontas. Rascunhos, espaços reservados e chefes de amostra não verificados nunca são exibidos nesta página pública.",
    emptyTitle: "Guias de Chefes verificados estão sendo preparados",
    intro:
      "Encontre estratégias de chefes de Path of Exile 2 por ato de campanha, prova ou tier de endgame. Cada guia de chefe PoE2 cobre padrões de ataque, fases, defesas, mecânicas e recompensas de loot para o patch atual.",
    label: "Chefes",
    metaDescription:
      "Guias de chefes de Path of Exile 2 verificados com notas de fase, defesas e recompensas de loot. Filtre chefes por campanha, prova, endgame ou pinnacle.",
    metaTitle: "Path of Exile 2 Chefes | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды по боссам появятся здесь, когда будут готовы заметки о встрече, источники и дата проверки. Черновики, заготовки и непроверенные примеры боссов никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные гайды по боссам готовятся к публикации",
    intro:
      "Найдите стратегии по боссам Path of Exile 2 по акту кампании, испытанию или эндгейм-уровню. Каждый гайд по боссу PoE2 охватывает паттерны атак, фазы, защиту, механики и награды за лут для текущего патча.",
    label: "Боссы",
    metaDescription:
      "Проверенные гайды по боссам Path of Exile 2 с заметками по фазам, защитой и наградами за лут. Фильтрация по кампании, испытанию, эндгейму или пиннаклу.",
    metaTitle: "Path of Exile 2 Боссы | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Boss-Guides erscheinen hier, sobald die Begegnungsnotizen, Quellen und das Prüfdatum bereit sind. Entwürfe, Platzhalter und unverifizierte Beispiel-Bosse werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Boss-Guides werden vorbereitet",
    intro:
      "Finde Path of Exile 2-Boss-Strategien nach Kampagnenakt, Prüfung oder Endgame-Stufe. Jeder PoE2-Boss-Guide deckt Angriffsmuster, Phasen, Verteidigung, Mechaniken und Loot-Belohnungen für den aktuellen Patch ab.",
    label: "Bosse",
    metaDescription:
      "Verifizierte Path of Exile 2-Boss-Guides mit Phasennotizen, Verteidigung und Loot-Belohnungen. Filterbar nach Kampagne, Prüfung, Endgame oder Pinnacle.",
    metaTitle: "Path of Exile 2 Bosses | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías de Jefes verificadas aparecerán aquí cuando las notas de encuentro, las fuentes y la fecha de revisión estén listas. Los borradores, marcadores y jefes de muestra no verificados nunca se muestran en esta página pública.",
    emptyTitle: "Las guías de Jefes verificadas se están preparando",
    intro:
      "Encuentra estrategias de jefes de Path of Exile 2 por acto de campaña, prueba o nivel de endgame. Cada guía de jefe PoE2 cubre patrones de ataque, fases, defensas, mecánicas y recompensas de botín para el parche actual.",
    label: "Jefes",
    metaDescription:
      "Guías de jefes de Path of Exile 2 verificadas con notas por fase, defensas y recompensas de botín. Filtra jefes por campaña, prueba, endgame o pinnacle.",
    metaTitle: "Path of Exile 2 Jefes | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides de Bosses vérifiés apparaîtront ici lorsque les notes de rencontre, les sources et la date de relecture seront prêtes. Les brouillons, les espaces réservés et les boss d'exemple non vérifiés ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les guides de Bosses vérifiés sont en préparation",
    intro:
      "Trouvez des stratégies de boss Path of Exile 2 par acte de campagne, épreuve ou niveau d'endgame. Chaque guide de boss PoE2 couvre les schémas d'attaque, les phases, les défenses, les mécaniques et les récompenses de loot pour le patch actuel.",
    label: "Bosses",
    metaDescription:
      "Guides de boss Path of Exile 2 vérifiés avec notes de phases, défenses et récompenses de loot. Filtrez les boss par campagne, épreuve, endgame ou pinnacle.",
    metaTitle: "Path of Exile 2 Bosses | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みボスガイドは、エンカウントのメモ・出典・確認日が揃い次第こちらに表示されます。草稿、プレースホルダー、未検証のサンプルボスがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みボスガイドを準備中です",
    intro:
      "キャンペーンアクト、試練、エンドゲーム層別に Path of Exile 2 のボス攻略を探す。各 PoE2 ボスガイドは攻撃パターン、フェーズ、防御、メカニズム、現在のパッチの報酬をカバー。",
    label: "ボス",
    metaDescription:
      "フェーズメモ、防御、報酬付きの Path of Exile 2 検証済みボスガイド。キャンペーン、試練、エンドゲーム、ピナクルで絞り込み可能。",
    metaTitle: "Path of Exile 2 ボス | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 보스 가이드는 전투 메모, 출처, 확인 날짜가 준비되면 여기에 표시됩니다. 초안, 플레이스홀더, 검증되지 않은 샘플 보스는 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 보스 가이드를 준비 중입니다",
    intro:
      "캠페인 액트, 시련, 엔드게임 티어별로 Path of Exile 2 보스 공략을 찾아보세요. 각 PoE2 보스 가이드는 공격 패턴, 단계, 방어, 메커니즘, 현재 패치의 보상과 로트를 다룹니다.",
    label: "보스",
    metaDescription:
      "단계 메모, 방어, 로트 보상이 있는 Path of Exile 2 검증 완료 보스 가이드. 캠페인, 시련, 엔드게임, 피나클로 필터링 가능.",
    metaTitle: "Path of Exile 2 보스 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Boss rehberleri, karşılaşma notları, kaynaklar ve inceleme tarihi hazır olunca burada görünecektir. Taslaklar, yer tutucular ve doğrulanmamış örnek boss'lar bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Boss rehberleri hazırlanıyor",
    intro:
      "Path of Exile 2 boss stratejilerini kampanya bölümüne, denemeye veya endgame seviyesine göre bulun. Her PoE2 boss rehberi saldırı desenlerini, aşamaları, savunmayı, mekanikleri ve güncel yamanın loot ödüllerini kapsar.",
    label: "Bosslar",
    metaDescription:
      "Aşama notları, savunma ve loot ödülleriyle Path of Exile 2 boss rehberleri. Boss'ları kampanya, deneme, endgame veya pinnacle'a göre filtreleyin.",
    metaTitle: "Path of Exile 2 Bosslar | Exile2 Guides",
  },
};

const itemCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Item guides will appear here after editorial review. Drafts and sample items are never shown on this public page.",
    emptyTitle: "Verified Items are being prepared",
    intro:
      "Path of Exile 2 item reference for currency, unique items, waystones, essences, tablets and crafting materials. Filter by category and use case, then open a deep guide for drop locations and crafting risk.",
    label: "Items",
    metaDescription:
      "Verified Path of Exile 2 item guides for currency, uniques, waystones, essences and crafting materials, with drop sources and crafting risk. Updated for patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Items | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过核验的物品攻略会在编辑审阅后显示于此。草稿与示例物品不会进入公开页面。",
    emptyTitle: "已核验物品正在准备中",
    intro:
      "Path of Exile 2 物品资料：通货、暗金、异界石、精华、石碑与 crafting 材料。按类别与用途筛选，再打开深度攻略查看掉落点与 crafting 风险。",
    label: "物品",
    metaDescription:
      "已核验的 Path of Exile 2 物品攻略，涵盖通货、暗金、异界石、精华与 crafting 材料，含掉落来源与 crafting 风险。适配 0.5.4e 版本。",
    metaTitle: "Path of Exile 2 物品 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias de Itens verificados aparecerão aqui após a revisão editorial. Rascunhos e itens de amostra nunca são exibidos nesta página pública.",
    emptyTitle: "Itens verificados estão sendo preparados",
    intro:
      "Referência de itens de Path of Exile 2 para moedas, itens únicos, waystones, essências, tablets e materiais de crafting. Filtre por categoria e uso, depois abra um guia profundo para locais de drop e risco de crafting.",
    label: "Itens",
    metaDescription:
      "Guias de itens de Path of Exile 2 verificados para moedas, únicos, waystones, essências e materiais de crafting, com fontes de drop e risco de crafting. Atualizado para o patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Itens | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды по предметам появятся здесь после редакционной проверки. Черновики и примеры предметов никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные предметы готовятся к публикации",
    intro:
      "Справочник по предметам Path of Exile 2: валюта, уникальные предметы, waystones, эссенции, таблички и материалы крафта. Фильтрация по категории и применению, затем откройте глубокий гайд по местам дропа и риску крафта.",
    label: "Предметы",
    metaDescription:
      "Проверенные гайды по предметам Path of Exile 2: валюта, уникальные предметы, waystones, эссенции и материалы крафта, с источниками дропа и риском крафта. Обновлено для патча 0.5.4e.",
    metaTitle: "Path of Exile 2 Предметы | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Item-Guides erscheinen hier nach redaktioneller Prüfung. Entwürfe und Beispiel-Items werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Gegenstände werden vorbereitet",
    intro:
      "Path of Exile 2-Item-Referenz für Währung, Unique-Gegenstände, Waystones, Essenzen, Tablets und Crafting-Materialien. Nach Kategorie und Anwendungsfall filtern, dann einen tiefen Guide zu Drop-Orten und Crafting-Risiko öffnen.",
    label: "Gegenstände",
    metaDescription:
      "Verifizierte Path of Exile 2-Item-Guides für Währung, Uniques, Waystones, Essenzen und Crafting-Materialien, mit Drop-Quellen und Crafting-Risiko. Aktualisiert für Patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Gegenstände | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías de Objetos verificadas aparecerán aquí tras la revisión editorial. Los borradores y objetos de muestra nunca se muestran en esta página pública.",
    emptyTitle: "Los Objetos verificados se están preparando",
    intro:
      "Referencia de objetos de Path of Exile 2 para moneda, objetos únicos, waystones, esencias, tablillas y materiales de crafting. Filtra por categoría y uso, luego abre una guía profunda para ubicaciones de drop y riesgo de crafting.",
    label: "Objetos",
    metaDescription:
      "Guías de objetos de Path of Exile 2 verificadas para moneda, únicos, waystones, esencias y materiales de crafting, con fuentes de drop y riesgo de crafting. Actualizado para el parche 0.5.4e.",
    metaTitle: "Path of Exile 2 Objetos | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides d'Objets vérifiés apparaîtront ici après relecture éditoriale. Les brouillons et objets d'exemple ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les Objets vérifiés sont en préparation",
    intro:
      "Référence d'objets Path of Exile 2 pour monnaie, objets uniques, waystones, essences, tablettes et matériaux de craft. Filtrez par catégorie et usage, puis ouvrez un guide approfondi pour les lieux de drop et le risque de craft.",
    label: "Objets",
    metaDescription:
      "Guides d'objets Path of Exile 2 vérifiés pour monnaie, uniques, waystones, essences et matériaux de craft, avec sources de drop et risque de craft. Mis à jour pour le patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Objets | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みのアイテムガイドは編集審査後にこちらに表示されます。草稿やサンプルアイテムがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みアイテムを準備中です",
    intro:
      "Path of Exile 2 のアイテムリファレンス：通貨、ユニーク、waystones、エッセンス、タブレット、クラフト素材。カテゴリと用途で絞り込み、その後ディープガイドでドロップ場所とクラフトリスクを確認。",
    label: "アイテム",
    metaDescription:
      "通貨、ユニーク、waystones、エッセンス、クラフト素材をカバーする Path of Exile 2 の検証済みアイテムガイド。ドロップソースとクラフトリスク付き。パッチ 0.5.4e に対応。",
    metaTitle: "Path of Exile 2 アイテム | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 아이템 가이드는 편집 검토 후 여기에 표시됩니다. 초안과 샘플 아이템은 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 아이템을 준비 중입니다",
    intro:
      "Path of Exile 2 아이템 참고 자료: 통화, 유니크 아이템, waystones, 에센스, 태블릿, crafting 재료. 카테고리와 용도로 필터링한 뒤 딥 가이드에서 드롭 위치와 crafting 위험을 확인하세요.",
    label: "아이템",
    metaDescription:
      "통화, 유니크, waystones, 에센스, crafting 재료를 다루는 Path of Exile 2 검증 완료 아이템 가이드. 드롭 소스와 crafting 위험 포함. 패치 0.5.4e 기준 업데이트.",
    metaTitle: "Path of Exile 2 아이템 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Eşya rehberleri, editöryel incelemeden sonra burada görünecektir. Taslaklar ve örnek eşyalar bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Eşyalar hazırlanıyor",
    intro:
      "Path of Exile 2 eşya referansı: para, eşsiz eşyalar, waystones, özler, tabletler ve crafting malzemeleri. Kategoriye ve kullanım alanına göre filtreleyin, sonra drop noktaları ve crafting riski için derin bir rehber açın.",
    label: "Eşyalar",
    metaDescription:
      "Parayı, eşsiz eşyaları, waystones, özleri ve crafting malzemelerini kapsayan Path of Exile 2 eşya rehberleri, drop kaynakları ve crafting riskiyle. 0.5.4e yaması için güncellendi.",
    metaTitle: "Path of Exile 2 Eşyalar | Exile2 Guides",
  },
};

const skillCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Skill guides will appear here after editorial review. Drafts and sample skills are never shown on this public page.",
    emptyTitle: "Verified Skills are being prepared",
    intro:
      "Path of Exile 2 skill database: active, support, spirit and meta gems with tags, requirements, interactions and build links. Includes trigger, energy and reservation mechanics.",
    label: "Skills",
    metaDescription:
      "Verified Path of Exile 2 skill guides for active, support, spirit and meta gems, with tags, requirements and build links. Updated for patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Skills | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过核验的技能攻略会在编辑审阅后显示于此。草稿与示例技能不会进入公开页面。",
    emptyTitle: "已核验技能正在准备中",
    intro:
      "Path of Exile 2 技能数据库：主动、辅助、精魂与 Meta 宝石，含标签、需求、联动与 Build 链接。涵盖触发、能量与保留机制。",
    label: "技能",
    metaDescription:
      "已核验的 Path of Exile 2 技能攻略，涵盖主动、辅助、精魂与 Meta 宝石，含标签、需求与 Build 链接。适配 0.5.4e 版本。",
    metaTitle: "Path of Exile 2 技能 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias de Habilidades verificados aparecerão aqui após a revisão editorial. Rascunhos e habilidades de amostra nunca são exibidos nesta página pública.",
    emptyTitle: "Habilidades verificadas estão sendo preparadas",
    intro:
      "Banco de habilidades de Path of Exile 2: gemas ativas, de suporte, espirituais e meta com tags, requisitos, interações e links de builds. Inclui mecânicas de trigger, energia e reserva.",
    label: "Habilidades",
    metaDescription:
      "Guias de habilidades de Path of Exile 2 verificados para gemas ativas, de suporte, espirituais e meta, com tags, requisitos e links de builds. Atualizado para o patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Habilidades | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды по навыкам появятся здесь после редакционной проверки. Черновики и примеры навыков никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные навыки готовятся к публикации",
    intro:
      "База навыков Path of Exile 2: активные, поддерживающие, духовные и мета-камни с тегами, требованиями, взаимодействиями и ссылками на билды. Включает механики триггера, энергии и резервации.",
    label: "Навыки",
    metaDescription:
      "Проверенные гайды по навыкам Path of Exile 2: активные, поддерживающие, духовные и мета-камни, с тегами, требованиями и ссылками на билды. Обновлено для патча 0.5.4e.",
    metaTitle: "Path of Exile 2 Навыки | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Skill-Guides erscheinen hier nach redaktioneller Prüfung. Entwürfe und Beispiel-Skills werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Fähigkeiten werden vorbereitet",
    intro:
      "Path of Exile 2-Skill-Datenbank: aktive, unterstützende, Geist- und Meta-Gems mit Tags, Anforderungen, Interaktionen und Build-Links. Beinhaltet Trigger-, Energie- und Reservierungs-Mechaniken.",
    label: "Fähigkeiten",
    metaDescription:
      "Verifizierte Path of Exile 2-Skill-Guides für aktive, unterstützende, Geist- und Meta-Gems, mit Tags, Anforderungen und Build-Links. Aktualisiert für Patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Fähigkeiten | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías de Habilidades verificadas aparecerán aquí tras la revisión editorial. Los borradores y habilidades de muestra nunca se muestran en esta página pública.",
    emptyTitle: "Las Habilidades verificadas se están preparando",
    intro:
      "Base de datos de habilidades de Path of Exile 2: gemas activas, de soporte, espirituales y meta con etiquetas, requisitos, interacciones y enlaces de builds. Incluye mecánicas de trigger, energía y reserva.",
    label: "Habilidades",
    metaDescription:
      "Guías de habilidades de Path of Exile 2 verificadas para gemas activas, de soporte, espirituales y meta, con etiquetas, requisitos y enlaces de builds. Actualizado para el parche 0.5.4e.",
    metaTitle: "Path of Exile 2 Habilidades | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides de Compétences vérifiés apparaîtront ici après relecture éditoriale. Les brouillons et compétences d'exemple ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les Compétences vérifiées sont en préparation",
    intro:
      "Base de compétences Path of Exile 2 : gemmes actives, de soutien, d'esprit et meta avec tags, prérequis, interactions et liens de builds. Inclut les mécaniques de trigger, d'énergie et de réservation.",
    label: "Compétences",
    metaDescription:
      "Guides de compétences Path of Exile 2 vérifiés pour gemmes actives, de soutien, d'esprit et meta, avec tags, prérequis et liens de builds. Mis à jour pour le patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Compétences | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みのスキルガイドは編集審査後にこちらに表示されます。草稿やサンプルスキルがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みスキルを準備中です",
    intro:
      "Path of Exile 2 のスキルデータベース：アクティブ、サポート、スピリット、メタジェム。タグ、必要条件、相互作用、ビルドリンク付き。トリガー、エネルギー、予約メカニズムを含む。",
    label: "スキル",
    metaDescription:
      "アクティブ、サポート、スピリット、メタジェムをカバーする Path of Exile 2 の検証済みスキルガイド。タグ、必要条件、ビルドリンク付き。パッチ 0.5.4e に対応。",
    metaTitle: "Path of Exile 2 スキル | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 스킬 가이드는 편집 검토 후 여기에 표시됩니다. 초안과 샘플 스킬은 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 스킬을 준비 중입니다",
    intro:
      "Path of Exile 2 스킬 데이터베이스: 액티브, 서포트, 정신, 메타 젬. 태그, 요구 조건, 상호작용, 빌드 링크 포함. 트리거, 에너지, 예약 메커니즘 포함.",
    label: "스킬",
    metaDescription:
      "액티브, 서포트, 정신, 메타 젬을 다루는 Path of Exile 2 검증 완료 스킬 가이드. 태그, 요구 조건, 빌드 링크 포함. 패치 0.5.4e 기준 업데이트.",
    metaTitle: "Path of Exile 2 스킬 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Yetenek rehberleri, editöryel incelemeden sonra burada görünecektir. Taslaklar ve örnek yetenekler bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Yetenekler hazırlanıyor",
    intro:
      "Path of Exile 2 yetenek veritabanı: etiketler, gereksinimler, etkileşimler ve build bağlantılarıyla aktif, destek, ruh ve meta mücevherleri. Tetikleme, enerji ve rezervasyon mekaniklerini içerir.",
    label: "Yetenekler",
    metaDescription:
      "Etiketler, gereksinimler ve build bağlantılarıyla aktif, destek, ruh ve meta mücevherlerini kapsayan Path of Exile 2 yetenek rehberleri. 0.5.4e yaması için güncellendi.",
    metaTitle: "Path of Exile 2 Yetenekler | Exile2 Guides",
  },
};

const guideCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Guides will appear here after editorial review. Drafts and sample guides are never shown on this public page.",
    emptyTitle: "Verified Guides are being prepared",
    intro:
      "Path of Exile 2 progression guides for campaign, Atlas, crafting, defenses and beginner questions. Each guide answers a specific problem and links the related items, skills and bosses.",
    label: "Guides",
    metaDescription:
      "Verified Path of Exile 2 progression guides for campaign, Atlas, crafting, defenses and beginners, with direct answers to common problems. Updated for patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Guides | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过核验的攻略会在编辑审阅后显示于此。草稿与示例攻略不会进入公开页面。",
    emptyTitle: "已核验攻略正在准备中",
    intro:
      "Path of Exile 2 成长攻略：战役流程、异界图鉴、crafting、防御机制与新手问题。每篇攻略解答一个具体问题，并链接相关物品、技能与首领。",
    label: "攻略",
    metaDescription:
      "已核验的 Path of Exile 2 成长攻略，涵盖战役、异界图鉴、crafting、防御与新手内容，直接回答常见问题。适配 0.5.4e 版本。",
    metaTitle: "Path of Exile 2 攻略 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias verificados aparecerão aqui após a revisão editorial. Rascunhos e guias de amostra nunca são exibidos nesta página pública.",
    emptyTitle: "Guias verificados estão sendo preparados",
    intro:
      "Guias de progressão de Path of Exile 2 para campanha, Atlas, crafting, defesas e dúvidas de iniciantes. Cada guia responde a um problema específico e linka os itens, habilidades e chefes relacionados.",
    label: "Guias",
    metaDescription:
      "Guias de progressão de Path of Exile 2 verificados para campanha, Atlas, crafting, defesas e iniciantes, com respostas diretas a problemas comuns. Atualizado para o patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Guias | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды появятся здесь после редакционной проверки. Черновики и примеры гайдов никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные гайды готовятся к публикации",
    intro:
      "Гайды по прогрессии Path of Exile 2: кампания, Атлас, крафт, защита и вопросы новичков. Каждый гайд отвечает на конкретную проблему и ссылается на связанные предметы, навыки и боссов.",
    label: "Гайды",
    metaDescription:
      "Проверенные гайды по прогрессии Path of Exile 2: кампания, Атлас, крафт, защита и новички, с прямыми ответами на частые проблемы. Обновлено для патча 0.5.4e.",
    metaTitle: "Path of Exile 2 Гайды | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Guides erscheinen hier nach redaktioneller Prüfung. Entwürfe und Beispiel-Guides werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Leitfäden werden vorbereitet",
    intro:
      "Path of Exile 2-Progression-Guides für Kampagne, Atlas, Crafting, Verteidigung und Einsteigerfragen. Jeder Guide beantwortet ein spezifisches Problem und verlinkt die relevanten Items, Skills und Bosse.",
    label: "Leitfäden",
    metaDescription:
      "Verifizierte Path of Exile 2-Progression-Guides für Kampagne, Atlas, Crafting, Verteidigung und Einsteiger, mit direkten Antworten auf häufige Probleme. Aktualisiert für Patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Leitfäden | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías verificadas aparecerán aquí tras la revisión editorial. Los borradores y guías de muestra nunca se muestran en esta página pública.",
    emptyTitle: "Las guías verificadas se están preparando",
    intro:
      "Guías de progresión de Path of Exile 2 para campaña, Atlas, crafting, defensas y dudas de principiantes. Cada guía responde a un problema específico y enlaza los objetos, habilidades y jefes relacionados.",
    label: "Guías",
    metaDescription:
      "Guías de progresión de Path of Exile 2 verificadas para campaña, Atlas, crafting, defensas y principiantes, con respuestas directas a problemas comunes. Actualizado para el parche 0.5.4e.",
    metaTitle: "Path of Exile 2 Guías | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides vérifiés apparaîtront ici après relecture éditoriale. Les brouillons et guides d'exemple ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les guides vérifiés sont en préparation",
    intro:
      "Guides de progression Path of Exile 2 pour campagne, Atlas, craft, défenses et questions de débutants. Chaque guide répond à un problème précis et lie les objets, compétences et boss associés.",
    label: "Guides",
    metaDescription:
      "Guides de progression Path of Exile 2 vérifiés pour campagne, Atlas, craft, défenses et débutants, avec des réponses directes aux problèmes courants. Mis à jour pour le patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Guides | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みのガイドは編集審査後にこちらに表示されます。草稿やサンプルガイドがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みガイドを準備中です",
    intro:
      "Path of Exile 2 の育成ガイド：キャンペーン、アトラス、クラフト、防御、初心者向けの疑問。各ガイドは具体的な問題に答え、関連するアイテム、スキル、ボスをリンク。",
    label: "ガイド",
    metaDescription:
      "キャンペーン、アトラス、クラフト、防御、初心者向けをカバーする Path of Exile 2 の検証済み育成ガイド。よくある問題への直接回答付き。パッチ 0.5.4e に対応。",
    metaTitle: "Path of Exile 2 ガイド | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 가이드는 편집 검토 후 여기에 표시됩니다. 초안과 샘플 가이드는 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 가이드를 준비 중입니다",
    intro:
      "Path of Exile 2 성장 가이드: 캠페인, 아틀라스, crafting, 방어, 초보자 질문. 각 가이드는 구체적인 문제에 답하고 관련 아이템, 스킬, 보스를 링크합니다.",
    label: "가이드",
    metaDescription:
      "캠페인, 아틀라스, crafting, 방어, 초보자를 다루는 Path of Exile 2 검증 완료 성장 가이드. 흔한 문제에 대한 직접적인 답변 포함. 패치 0.5.4e 기준 업데이트.",
    metaTitle: "Path of Exile 2 가이드 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Rehberler, editöryel incelemeden sonra burada görünecektir. Taslaklar ve örnek rehberler bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Rehberler hazırlanıyor",
    intro:
      "Path of Exile 2 ilerleme rehberleri: kampanya, Atlas, crafting, savunma ve yeni başlayan soruları. Her rehber belirli bir soruyu yanıtlar ve ilgili eşyaları, yetenekleri ve boss'ları bağlar.",
    label: "Rehberler",
    metaDescription:
      "Kampanya, Atlas, crafting, savunma ve yeni başlayanları kapsayan Path of Exile 2 ilerleme rehberleri, yaygın sorunlara doğrudan yanıtlarla. 0.5.4e yaması için güncellendi.",
    metaTitle: "Path of Exile 2 Rehberler | Exile2 Guides",
  },
};

const patchCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Patch Notes will appear here after editorial review. Drafts and sample patches are never shown on this public page.",
    emptyTitle: "Verified Patch Notes are being prepared",
    intro:
      "Path of Exile 2 patch notes, balance changes and build, boss and item impact summaries for every update. Track major patches, hotfixes and bug fixes through a patch-first content graph.",
    label: "Patch Notes",
    metaDescription:
      "Path of Exile 2 patch notes and impact summaries for builds, bosses and items, plus balance changes and hotfixes. Updated for patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Patch Notes | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过核验的补丁说明会在编辑审阅后显示于此。草稿与示例补丁不会进入公开页面。",
    emptyTitle: "已核验补丁说明正在准备中",
    intro:
      "Path of Exile 2 补丁说明、平衡改动，以及对 Build、首领、物品的影响汇总，覆盖每次更新。通过以补丁为先的内容图谱追踪大版本、热修与 bug 修复。",
    label: "补丁说明",
    metaDescription:
      "Path of Exile 2 补丁说明与对 Build、首领、物品的影响汇总，外加平衡改动与热修。适配 0.5.4e 版本。",
    metaTitle: "Path of Exile 2 补丁说明 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Notas de Atualização verificadas aparecerão aqui após a revisão editorial. Rascunhos e patches de amostra nunca são exibidos nesta página pública.",
    emptyTitle: "Notas de Atualização verificadas estão sendo preparadas",
    intro:
      "Notas de atualização, mudanças de balanceamento e resumos de impacto em builds, chefes e itens de Path of Exile 2 para cada atualização. Acompanhe patches principais, hotfixes e correções de bug por um grafo de conteúdo prioritário por patch.",
    label: "Notas de Atualização",
    metaDescription:
      "Notas de atualização e resumos de impacto de Path of Exile 2 para builds, chefes e itens, além de mudanças de balanceamento e hotfixes. Atualizado para o patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Notas de Atualização | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные примечания к обновлению появятся здесь после редакционной проверки. Черновики и примеры обновлений никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные примечания к обновлению готовятся к публикации",
    intro:
      "Примечания к обновлению, изменения баланса и сводки влияния на билды, боссов и предметы Path of Exile 2 для каждого обновления. Отслеживайте крупные патчи, хотфиксы и исправления багов через граф контента с приоритетом патча.",
    label: "Примечания к обновлению",
    metaDescription:
      "Примечания к обновлению и сводки влияния Path of Exile 2 для билдов, боссов и предметов, а также изменения баланса и хотфиксы. Обновлено для патча 0.5.4e.",
    metaTitle: "Path of Exile 2 Примечания к обновлению | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Patch-Hinweise erscheinen hier nach redaktioneller Prüfung. Entwürfe und Beispiel-Patches werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Patch-Hinweise werden vorbereitet",
    intro:
      "Path of Exile 2-Patch-Hinweise, Balance-Änderungen und Auswirkungen auf Builds, Bosse und Items für jedes Update. Verfolge große Patches, Hotfixes und Bug-Fixes über einen Patch-zuerst-Inhaltsgraphen.",
    label: "Patch-Hinweise",
    metaDescription:
      "Path of Exile 2-Patch-Hinweise und Auswirkungszusammenfassungen für Builds, Bosse und Items, plus Balance-Änderungen und Hotfixes. Aktualisiert für Patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Patch-Hinweise | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las Notas del Parche verificadas aparecerán aquí tras la revisión editorial. Los borradores y parches de muestra nunca se muestran en esta página pública.",
    emptyTitle: "Las Notas del Parche verificadas se están preparando",
    intro:
      "Notas del parche, cambios de balance y resúmenes de impacto en builds, jefes e objetos de Path of Exile 2 para cada actualización. Sigue parches principales, hotfixes y correcciones de errores mediante un grafo de contenido prioritario por parche.",
    label: "Notas del Parche",
    metaDescription:
      "Notas del parche y resúmenes de impacto de Path of Exile 2 para builds, jefes y objetos, además de cambios de balance y hotfixes. Actualizado para el parche 0.5.4e.",
    metaTitle: "Path of Exile 2 Notas del Parche | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les Notes de Mise à Jour vérifiées apparaîtront ici après relecture éditoriale. Les brouillons et mises à jour d'exemple ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les Notes de Mise à Jour vérifiées sont en préparation",
    intro:
      "Notes de mise à jour, changements d'équilibrage et résumés d'impact sur les builds, boss et objets Path of Exile 2 pour chaque mise à jour. Suivez les patches majeurs, hotfixes et corrections de bugs via un graphe de contenu piloté par patch.",
    label: "Notes de Mise à Jour",
    metaDescription:
      "Notes de mise à jour et résumés d'impact Path of Exile 2 pour builds, boss et objets, plus changements d'équilibrage et hotfixes. Mis à jour pour le patch 0.5.4e.",
    metaTitle: "Path of Exile 2 Notes de Mise à Jour | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みのパッチノートは編集審査後にこちらに表示されます。草稿やサンプルパッチがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みパッチノートを準備中です",
    intro:
      "Path of Exile 2 のパッチノート、バランス調整、ビルド・ボス・アイテムへの影響まとめを毎回の更新で提供。パッチ優先のコンテンツグラフでメジャーパッチ、ホットフィックス、バグ修正を追跡。",
    label: "パッチノート",
    metaDescription:
      "ビルド、ボス、アイテムへの影響まとめ付きの Path of Exile 2 パッチノート。バランス調整とホットフィックスも。パッチ 0.5.4e に対応。",
    metaTitle: "Path of Exile 2 パッチノート | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 패치 노트는 편집 검토 후 여기에 표시됩니다. 초안과 샘플 패치는 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 패치 노트를 준비 중입니다",
    intro:
      "Path of Exile 2 패치 노트, 밸런스 변경, 빌드/보스/아이템 영향 요약을 모든 업데이트마다 제공. 패치 우선 콘텐츠 그래프로 메이저 패치, 핫픽스, 버그 수정을 추적하세요.",
    label: "패치 노트",
    metaDescription:
      "빌드, 보스, 아이템 영향 요약이 있는 Path of Exile 2 패치 노트. 밸런스 변경과 핫픽스 포함. 패치 0.5.4e 기준 업데이트.",
    metaTitle: "Path of Exile 2 패치 노트 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Yama Notları, editöryel incelemeden sonra burada görünecektir. Taslaklar ve örnek yamalar bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Yama Notları hazırlanıyor",
    intro:
      "Path of Exile 2 yama notları, denge değişiklikleri ve her güncellemede build/boss/eşya etki özetleri. Büyük yamaları, hotfix'leri ve bug düzeltmelerini yama öncelikli içerik grafiğiyle takip edin.",
    label: "Yama Notları",
    metaDescription:
      "Build, boss ve eşya etki özetleriyle Path of Exile 2 yama notları, artı denge değişiklikleri ve hotfix'ler. 0.5.4e yaması için güncellendi.",
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
