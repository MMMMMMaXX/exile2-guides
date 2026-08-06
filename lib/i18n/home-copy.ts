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
      "Browse the latest source-linked pages. Entries marked as pending verification remain public under the site's editorial policy and clearly state that boundary.",
    contentStatusTitle: "Latest published content",
    description:
      "Clear, patch-aware guides for builds, bosses, items, skills and progression.",
    emptyDescription:
      "Published content will appear here after editorial approval. Templates and internal research are never shown.",
    emptyTitle: "Published content is being prepared",
    eyebrow: "Unofficial Path of Exile 2 guide site",
    heroTitle: "Path of Exile 2 Builds, Boss Guides and Beginner Help",
    metaDescription:
      "Clear, patch-aware Path of Exile 2 guides for builds, bosses, items, skills and beginners.",
    metaTitle:
      "Exile2 Guides - Path of Exile 2 Builds, Boss Guides & Beginner Help",
    primaryCta: "Browse Guides",
    secondaryCta: "View Patch Notes",
  },
  "zh-cn": {
    contentStatusDescription:
      "浏览最新的来源链接页面。按编辑规则公开但仍待实机核验的内容会明确标注核验边界。",
    contentStatusTitle: "最新公开内容",
    description: "提供清晰、适配当前版本的 Build、Boss、物品、技能与成长攻略。",
    emptyDescription:
      "内容会在编辑批准后显示于此；模板和内部研究不会进入公开首页。",
    emptyTitle: "公开内容正在准备中",
    eyebrow: "非官方 Path of Exile 2 攻略站",
    heroTitle: "Path of Exile 2 Build、Boss 与新手攻略",
    metaDescription:
      "清晰、适配当前版本的 Path of Exile 2 Build、Boss、物品、技能与新手攻略。",
    metaTitle: "Exile2 Guides - Path of Exile 2 Build、Boss 与新手攻略",
    primaryCta: "浏览 Guides",
    secondaryCta: "查看 Patch Notes",
  },
  "pt-br": {
    contentStatusDescription:
      "Navegue pelas páginas mais recentes vinculadas à fonte. Entradas marcadas como pendentes de verificação permanecem públicas segundo a política editorial do site e declaram claramente esse limite.",
    contentStatusTitle: "Conteúdo publicado recentemente",
    description:
      "Guias claros e atualizados por patch para builds, bosses, itens, habilidades e progressão.",
    emptyDescription:
      "O conteúdo publicado aparecerá aqui após a aprovação editorial. Modelos e pesquisas internas nunca são exibidos.",
    emptyTitle: "O conteúdo publicado está sendo preparado",
    eyebrow: "Site de guias não oficial de Path of Exile 2",
    heroTitle: "Builds de Path of Exile 2, Guias de Boss e Ajuda para Iniciantes",
    metaDescription:
      "Guias claros e atualizados por patch de Path of Exile 2 para builds, bosses, itens, habilidades e iniciantes.",
    metaTitle:
      "Exile2 Guides - Builds de Path of Exile 2, Guias de Boss e Ajuda para Iniciantes",
    primaryCta: "Ver Guias",
    secondaryCta: "Ver Notas do Patch",
  },
  ru: {
    contentStatusDescription:
      "Просматривайте последние страницы со ссылками на источники. Записи, отмеченные как ожидающие проверки, остаются опубликованными согласно редакционной политике сайта и чётко указывают этот предел.",
    contentStatusTitle: "Последний опубликованный контент",
    description:
      "Понятные гайды с учётом патчей для билдов, боссов, предметов, навыков и прогресса.",
    emptyDescription:
      "Опубликованный контент появится здесь после редакционного одобрения. Шаблоны и внутренние исследования никогда не показываются.",
    emptyTitle: "Опубликованный контент готовится",
    eyebrow: "Неофициальный сайт гайдов по Path of Exile 2",
    heroTitle: "Билды Path of Exile 2, гайды по боссам и помощь новичкам",
    metaDescription:
      "Понятные гайды по Path of Exile 2 с учётом патчей для билдов, боссов, предметов, навыков и новичков.",
    metaTitle:
      "Exile2 Guides — билды Path of Exile 2, гайды по боссам и помощь новичкам",
    primaryCta: "Смотреть гайды",
    secondaryCta: "Смотреть примечания к патчу",
  },
  de: {
    contentStatusDescription:
      "Durchsuche die neuesten, mit Quellen verknüpften Seiten. Einträge, die als wartend auf Verifizierung markiert sind, bleiben gemäß der redaktionellen Richtlinie der Seite öffentlich und grenzen dies deutlich ab.",
    contentStatusTitle: "Zuletzt veröffentlichter Inhalt",
    description:
      "Klare, patch-bewusste Guides für Builds, Bosse, Items, Skills und Fortschritt.",
    emptyDescription:
      "Veröffentlichter Inhalt erscheint hier nach redaktioneller Freigabe. Vorlagen und interne Recherchen werden niemals angezeigt.",
    emptyTitle: "Veröffentlichter Inhalt wird vorbereitet",
    eyebrow: "Inoffizielle Path of Exile 2-Guide-Seite",
    heroTitle: "Path of Exile 2 Builds, Boss-Guides und Hilfe für Einsteiger",
    metaDescription:
      "Klare, patch-bewusste Path of Exile 2-Guides für Builds, Bosse, Items, Skills und Einsteiger.",
    metaTitle:
      "Exile2 Guides – Path of Exile 2 Builds, Boss-Guides & Hilfe für Einsteiger",
    primaryCta: "Guides durchsuchen",
    secondaryCta: "Patch-Notes ansehen",
  },
  es: {
    contentStatusDescription:
      "Explora las páginas más recientes vinculadas a fuentes. Las entradas marcadas como pendientes de verificación permanecen públicas según la política editorial del sitio y declaran claramente ese límite.",
    contentStatusTitle: "Contenido publicado más reciente",
    description:
      "Guías claras y actualizadas por parche para builds, jefes, objetos, habilidades y progresión.",
    emptyDescription:
      "El contenido publicado aparecerá aquí tras la aprobación editorial. Las plantillas e investigaciones internas nunca se muestran.",
    emptyTitle: "El contenido publicado se está preparando",
    eyebrow: "Sitio de guías no oficial de Path of Exile 2",
    heroTitle: "Builds de Path of Exile 2, guías de jefes y ayuda para principiantes",
    metaDescription:
      "Guías claras y actualizadas por parche de Path of Exile 2 para builds, jefes, objetos, habilidades y principiantes.",
    metaTitle:
      "Exile2 Guides - Builds de Path of Exile 2, guías de jefes y ayuda para principiantes",
    primaryCta: "Ver guías",
    secondaryCta: "Ver notas del parche",
  },
  fr: {
    contentStatusDescription:
      "Parcourez les dernières pages liées à leurs sources. Les entrées marquées comme en attente de vérification restent publiques selon la politique éditoriale du site et indiquent clairement cette limite.",
    contentStatusTitle: "Dernier contenu publié",
    description:
      "Des guides clairs et à jour des correctifs pour les builds, boss, objets, compétences et la progression.",
    emptyDescription:
      "Le contenu publié apparaîtra ici après validation éditoriale. Les modèles et recherches internes ne sont jamais affichés.",
    emptyTitle: "Le contenu publié est en préparation",
    eyebrow: "Site de guides non officiel de Path of Exile 2",
    heroTitle: "Builds Path of Exile 2, guides de boss et aide aux débutants",
    metaDescription:
      "Des guides clairs et à jour des correctifs de Path of Exile 2 pour les builds, boss, objets, compétences et débutants.",
    metaTitle:
      "Exile2 Guides - Builds Path of Exile 2, guides de boss et aide aux débutants",
    primaryCta: "Parcourir les guides",
    secondaryCta: "Voir les notes de mise à jour",
  },
  ja: {
    contentStatusDescription:
      "最新のソース付きページを閲覧できます。検証待ちとマークされた項目は、サイトの編集方針に基づき公開されたままとなり、その境界を明確に示します。",
    contentStatusTitle: "最新の公開コンテンツ",
    description:
      "ビルド、ボス、アイテム、スキル、育成に関する、パッチに沿った分かりやすいガイド。",
    emptyDescription:
      "公開コンテンツは編集承認後にここに表示されます。テンプレートと社内リサーチが表示されることはありません。",
    emptyTitle: "公開コンテンツを準備中",
    eyebrow: "非公式の Path of Exile 2 ガイドサイト",
    heroTitle: "Path of Exile 2 のビルド、ボス攻略、初心者向けヘルプ",
    metaDescription:
      "ビルド、ボス、アイテム、スキル、初心者向けの、パッチに沿った分かりやすい Path of Exile 2 ガイド。",
    metaTitle:
      "Exile2 Guides - Path of Exile 2 のビルド、ボス攻略、初心者向けヘルプ",
    primaryCta: "ガイドを見る",
    secondaryCta: "パッチノートを見る",
  },
  ko: {
    contentStatusDescription:
      "최신 소스 연결 페이지를 둘러보세요. 검증 대기로 표시된 항목은 사이트 편집 정책에 따라 공개 상태로 유지되며 그 경계를 명확히 안내합니다.",
    contentStatusTitle: "최신 게시 콘텐츠",
    description:
      "빌드, 보스, 아이템, 스킬, 육성에 대한 패치 반영 가이드.",
    emptyDescription:
      "게시 콘텐츠는 편집 승인 후 여기에 표시됩니다. 템플릿과 내부 연구는 절대 표시되지 않습니다.",
    emptyTitle: "게시 콘텐츠를 준비하는 중",
    eyebrow: "비공식 Path of Exile 2 가이드 사이트",
    heroTitle: "Path of Exile 2 빌드, 보스 공략, 초보자 도움말",
    metaDescription:
      "빌드, 보스, 아이템, 스킬, 초보자를 위한 패치 반영 Path of Exile 2 가이드.",
    metaTitle:
      "Exile2 Guides - Path of Exile 2 빌드, 보스 공략, 초보자 도움말",
    primaryCta: "가이드 보기",
    secondaryCta: "패치 노트 보기",
  },
  tr: {
    contentStatusDescription:
      "Kaynak bağlantılı en son sayfaları göz atın. Doğrulama bekliyor olarak işaretlenen girişler, sitenin editoryal politikası gereği herkese açık kalır ve bu sınırı açıkça belirtir.",
    contentStatusTitle: "En son yayımlanan içerik",
    description:
      "Build'ler, boss'lar, eşyalar, yetenekler ve ilerleme için yama farkında, net rehberler.",
    emptyDescription:
      "Yayımlanan içerik, editoryal onaydan sonra burada görünecek. Şablonlar ve dahili araştırmalar hiçbir zaman gösterilmez.",
    emptyTitle: "Yayımlanan içerik hazırlanıyor",
    eyebrow: "Resmi olmayan Path of Exile 2 rehber sitesi",
    heroTitle: "Path of Exile 2 Build'leri, Boss Rehberleri ve Yeni Başlayan Yardımı",
    metaDescription:
      "Build'ler, boss'lar, eşyalar, yetenekler ve yeni başlayanlar için yama farkında, net Path of Exile 2 rehberleri.",
    metaTitle:
      "Exile2 Guides - Path of Exile 2 Build'leri, Boss Rehberleri ve Yeni Başlayan Yardımı",
    primaryCta: "Rehberlere Göz At",
    secondaryCta: "Yama Notlarını Görüntüle",
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
