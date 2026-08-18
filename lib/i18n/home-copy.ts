/** 文件职责：集中维护根语言选择与双语首页文案，避免路由组件分散硬编码。 */
import { supportedLocales, type ContentLocale } from "../content/constants";

export type HomeCopy = {
  contentStatusDescription: string;
  contentStatusTitle: string;
  description: string;
  emptyDescription: string;
  emptyTitle: string;
  eyebrow: string;
  heroTitle: string;
  metaDescription: string;
  metaTitle: string;
  primaryCta: string;
  secondaryCta: string;
};

const homeCopyByLocale: Record<ContentLocale, HomeCopy> = {
  en: {
    contentStatusDescription:
      "Browse the latest source-linked pages. Each article identifies its patch, evidence and the limits of its first-hand testing.",
    contentStatusTitle: "Latest published content",
    description:
      "Find verified Path of Exile 2 builds, boss strategies, item answers and skill breakdowns for patch 0.5.4e.",
    emptyDescription:
      "Published content will appear here after editorial approval. Templates and internal research are never shown.",
    emptyTitle: "Published content is being prepared",
    eyebrow: "Unofficial Path of Exile 2 guide site",
    heroTitle: "PoE 2 Builds, Boss Guides & Skill Database",
    metaDescription:
      "Find verified Path of Exile 2 builds, boss strategies, item answers and skill breakdowns. Updated for patch 0.5.4e.",
    metaTitle: "PoE 2 Builds, Boss Guides & Skill Database | Exile2 Guides",
    primaryCta: "Browse Builds",
    secondaryCta: "Boss Guides",
  },
  "zh-cn": {
    contentStatusDescription:
      "浏览最新的来源链接页面；每篇文章都会说明适用版本、证据来源与第一方实机测试范围。",
    contentStatusTitle: "最新公开内容",
    description:
      "查找适配 0.5.4e 版本的 Path of Exile 2 Build、首领打法、物品答案与技能解析。",
    emptyDescription:
      "内容会在编辑批准后显示于此；模板和内部研究不会进入公开首页。",
    emptyTitle: "公开内容正在准备中",
    eyebrow: "非官方 Path of Exile 2 攻略站",
    heroTitle: "PoE 2 Build、Boss 攻略与技能数据库",
    metaDescription:
      "查找经过核验的 Path of Exile 2 Build、首领攻略、物品机制与技能解析。适配当前版本 0.5.4e。",
    metaTitle: "PoE 2 Build、Boss 攻略与技能数据库 | Exile2 Guides",
    primaryCta: "浏览 Build",
    secondaryCta: "Boss 攻略",
  },
  "pt-br": {
    contentStatusDescription:
      "Navegue pelas páginas mais recentes com fontes. Cada artigo identifica o patch, as evidências e os limites dos testes diretos.",
    contentStatusTitle: "Conteúdo publicado recentemente",
    description:
      "Encontre builds, estratégias de chefes, respostas sobre itens e análises de habilidades de Path of Exile 2 para o patch 0.5.4e.",
    emptyDescription:
      "O conteúdo publicado aparecerá aqui após a aprovação editorial. Modelos e pesquisas internas nunca são exibidos.",
    emptyTitle: "O conteúdo publicado está sendo preparado",
    eyebrow: "Site de guias não oficial de Path of Exile 2",
    heroTitle: "Builds, Guias de Chefes e Banco de Habilidades de PoE 2",
    metaDescription:
      "Encontre builds verificadas, estratégias de chefes, respostas sobre itens e análises de habilidades de Path of Exile 2. Atualizado para o patch 0.5.4e.",
    metaTitle:
      "Builds, Guias de Chefes e Banco de Habilidades de PoE 2 | Exile2 Guides",
    primaryCta: "Ver Builds",
    secondaryCta: "Guias de Chefes",
  },
  ru: {
    contentStatusDescription:
      "Читайте последние страницы со ссылками на источники. В каждой статье указаны патч, доказательства и границы собственных игровых проверок.",
    contentStatusTitle: "Последний опубликованный контент",
    description:
      "Найдите проверенные билды, стратегии по боссам, ответы по предметам и разборы навыков Path of Exile 2 для патча 0.5.4e.",
    emptyDescription:
      "Опубликованный контент появится здесь после редакционного одобрения. Шаблоны и внутренние исследования никогда не показываются.",
    emptyTitle: "Опубликованный контент готовится",
    eyebrow: "Неофициальный сайт гайдов по Path of Exile 2",
    heroTitle: "Билды, гайды по боссам и база навыков PoE 2",
    metaDescription:
      "Найдите проверенные билды, стратегии по боссам, ответы по предметам и разборы навыков Path of Exile 2. Обновлено для патча 0.5.4e.",
    metaTitle: "Билды, гайды по боссам и база навыков PoE 2 | Exile2 Guides",
    primaryCta: "Смотреть билды",
    secondaryCta: "Гайды по боссам",
  },
  de: {
    contentStatusDescription:
      "Durchsuche die neuesten Seiten mit Quellenangaben. Jeder Artikel nennt Patch, Nachweise und die Grenzen eigener Spieltests.",
    contentStatusTitle: "Zuletzt veröffentlichter Inhalt",
    description:
      "Finde verifizierte Builds, Boss-Strategien, Item-Antworten und Skill-Erklärungen für Path of Exile 2 Patch 0.5.4e.",
    emptyDescription:
      "Veröffentlichter Inhalt erscheint hier nach redaktioneller Freigabe. Vorlagen und interne Recherchen werden niemals angezeigt.",
    emptyTitle: "Veröffentlichter Inhalt wird vorbereitet",
    eyebrow: "Inoffizielle Path of Exile 2-Guide-Seite",
    heroTitle: "PoE 2 Builds, Boss-Guides & Skill-Datenbank",
    metaDescription:
      "Finde verifizierte Path of Exile 2 Builds, Boss-Strategien, Item-Antworten und Skill-Erklärungen. Aktualisiert für Patch 0.5.4e.",
    metaTitle: "PoE 2 Builds, Boss-Guides & Skill-Datenbank | Exile2 Guides",
    primaryCta: "Builds durchsuchen",
    secondaryCta: "Boss-Guides",
  },
  es: {
    contentStatusDescription:
      "Explora las páginas más recientes con fuentes. Cada artículo indica el parche, las pruebas y los límites de las comprobaciones directas.",
    contentStatusTitle: "Contenido publicado más reciente",
    description:
      "Encuentra builds verificadas, estrategias de jefes, respuestas sobre objetos y análisis de habilidades de Path of Exile 2 para el parche 0.5.4e.",
    emptyDescription:
      "El contenido publicado aparecerá aquí tras la aprobación editorial. Las plantillas e investigaciones internas nunca se muestran.",
    emptyTitle: "El contenido publicado se está preparando",
    eyebrow: "Sitio de guías no oficial de Path of Exile 2",
    heroTitle: "Builds, guías de jefes y base de datos de habilidades de PoE 2",
    metaDescription:
      "Encuentra builds verificadas, estrategias de jefes, respuestas sobre objetos y análisis de habilidades de Path of Exile 2. Actualizado para el parche 0.5.4e.",
    metaTitle:
      "Builds, guías de jefes y base de datos de habilidades de PoE 2 | Exile2 Guides",
    primaryCta: "Ver builds",
    secondaryCta: "Guías de jefes",
  },
  fr: {
    contentStatusDescription:
      "Parcourez les dernières pages avec leurs sources. Chaque article indique le patch, les preuves et les limites des tests directs.",
    contentStatusTitle: "Dernier contenu publié",
    description:
      "Trouvez des builds vérifiés, stratégies de boss, réponses sur les objets et explications de compétences pour Path of Exile 2 patch 0.5.4e.",
    emptyDescription:
      "Le contenu publié apparaîtra ici après validation éditoriale. Les modèles et recherches internes ne sont jamais affichés.",
    emptyTitle: "Le contenu publié est en préparation",
    eyebrow: "Site de guides non officiel de Path of Exile 2",
    heroTitle: "Builds, guides de boss et base de compétences PoE 2",
    metaDescription:
      "Trouvez des builds vérifiés, stratégies de boss, réponses sur les objets et explications de compétences pour Path of Exile 2. Mis à jour pour le patch 0.5.4e.",
    metaTitle:
      "Builds, guides de boss et base de compétences PoE 2 | Exile2 Guides",
    primaryCta: "Parcourir les builds",
    secondaryCta: "Guides de boss",
  },
  ja: {
    contentStatusDescription:
      "最新の出典付きページを閲覧できます。各記事では対象パッチ、根拠、実測範囲の限界を明記しています。",
    contentStatusTitle: "最新の公開コンテンツ",
    description:
      "Path of Exile 2 の検証済みビルド、ボス攻略、アイテム解説、スキル解説をパッチ 0.5.4e 向けに探せます。",
    emptyDescription:
      "公開コンテンツは編集承認後にここに表示されます。テンプレートと社内リサーチが表示されることはありません。",
    emptyTitle: "公開コンテンツを準備中",
    eyebrow: "非公式の Path of Exile 2 ガイドサイト",
    heroTitle: "PoE 2 ビルド、ボス攻略、スキルデータベース",
    metaDescription:
      "Path of Exile 2 の検証済みビルド、ボス攻略、アイテム解説、スキル解説を見つける。パッチ 0.5.4e に対応。",
    metaTitle: "PoE 2 ビルド、ボス攻略、スキルデータベース | Exile2 Guides",
    primaryCta: "ビルドを見る",
    secondaryCta: "ボス攻略",
  },
  ko: {
    contentStatusDescription:
      "최신 출처 연결 페이지를 둘러보세요. 각 글에는 적용 패치, 근거, 직접 테스트 범위의 한계가 명시됩니다.",
    contentStatusTitle: "최신 게시 콘텐츠",
    description:
      "Path of Exile 2 의 검증된 빌드, 보스 공략, 아이템 답변, 스킬 분석을 패치 0.5.4e 기준으로 찾아보세요.",
    emptyDescription:
      "게시 콘텐츠는 편집 승인 후 여기에 표시됩니다. 템플릿과 내부 연구는 절대 표시되지 않습니다.",
    emptyTitle: "게시 콘텐츠를 준비하는 중",
    eyebrow: "비공식 Path of Exile 2 가이드 사이트",
    heroTitle: "PoE 2 빌드, 보스 공략, 스킬 데이터베이스",
    metaDescription:
      "Path of Exile 2 의 검증된 빌드, 보스 공략, 아이템 답변, 스킬 분석을 찾아보세요. 패치 0.5.4e 기준 업데이트.",
    metaTitle: "PoE 2 빌드, 보스 공략, 스킬 데이터베이스 | Exile2 Guides",
    primaryCta: "빌드 보기",
    secondaryCta: "보스 공략",
  },
  tr: {
    contentStatusDescription:
      "Kaynak bağlantılı en son sayfalara göz atın. Her makale yamayı, kanıtları ve doğrudan testlerin sınırlarını belirtir.",
    contentStatusTitle: "En son yayımlanan içerik",
    description:
      "Path of Exile 2 için doğrulanmış build'ler, boss stratejileri, eşya cevapları ve yetenek açıklamalarını 0.5.4e yaması için bulun.",
    emptyDescription:
      "Yayımlanan içerik, editoryal onaydan sonra burada görünecek. Şablonlar ve dahili araştırmalar hiçbir zaman gösterilmez.",
    emptyTitle: "Yayımlanan içerik hazırlanıyor",
    eyebrow: "Resmi olmayan Path of Exile 2 rehber sitesi",
    heroTitle: "PoE 2 Build'leri, Boss Rehberleri ve Yetenek Veritabanı",
    metaDescription:
      "Path of Exile 2 için doğrulanmış build'ler, boss stratejileri, eşya cevapları ve yetenek açıklamalarını bulun. 0.5.4e yaması için güncellendi.",
    metaTitle:
      "PoE 2 Build'leri, Boss Rehberleri ve Yetenek Veritabanı | Exile2 Guides",
    primaryCta: "Build'lere Göz At",
    secondaryCta: "Boss Rehberleri",
  },
};

/** 判断路由参数是否为当前 MVP 支持的语言，防止未知路径伪装成首页。 */
export function isHomeLocale(
  value: string | undefined,
): value is ContentLocale {
  return supportedLocales.includes(value as ContentLocale);
}

/** 获取指定语言首页文案；未知语言返回 undefined 以交由路由显示 404。 */
export function getHomeCopy(locale: string | undefined): HomeCopy | undefined {
  return isHomeLocale(locale) ? homeCopyByLocale[locale] : undefined;
}
