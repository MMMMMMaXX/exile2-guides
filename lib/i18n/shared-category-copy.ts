/**
 * 文件职责：集中维护分类页与子类页共享的 UI 文案（目录标题、快速事实、来源边界、
 * 关联内容、空状态、分类统计、站内搜索入口等），覆盖 10 种语言，避免在共享组件内
 * 硬编码英语或以 en/zh 二选一方式把英语用作非英语 fallback。
 *
 * 设计约束：
 * - 使用 `ContentLocale` 与仓库既有 i18n 模式（对齐 lib/i18n/ui.ts 的 `Record<ContentLocale, ...>` 契约）。
 * - 每种语言都必须提供全部 `SharedCategoryCopyKey`，由 TypeScript 的 `Record` 类型在编译期强制完整性。
 * - `getSharedCategoryCopy` 直接返回目标语言的文案；当语言或键缺失时仅作防御性英语回退，
 *   该回退不应用于正常的非英语页面渲染（正常路径下数据完整，不会触发）。
 */
import type { ContentLocale } from "../content/constants";

/** 分类共享文案键；新增键必须在此登记并在 10 种语言中同时提供。 */
export type SharedCategoryCopyKey =
  | "tocHeading" // On this page
  | "quickFacts" // Quick facts
  | "sourcesRequired" // Sources are required before publication
  | "relatedContent" // Related content
  | "relatedPending" // Related content will appear after verification
  | "emptyDefaultDescription" // 空状态默认描述（调用方未显式传入 description 时）
  | "categoryStatistics" // Category statistics（统计区 aria-label）
  | "publishedEntries" // Published entries
  | "trackedPatch" // Tracked patch
  | "verified" // Verified（状态值）
  | "editorialBoundary" // Editorial boundary
  | "searchTitle" // Search {label}
  | "searchDescription" // Search published content in this language.
  | "searchQueryLabel" // Search query
  | "searchPlaceholder" // Search guides
  | "searchSubmit" // Search
  | "skeletonType"; // Skeleton（卡片类型占位标签）

/** 10 语言 × 全键的文案表；`Record<ContentLocale, Record<SharedCategoryCopyKey, string>>` 强制每种语言键齐全。 */
const sharedCategoryCopyByLocale: Record<
  ContentLocale,
  Record<SharedCategoryCopyKey, string>
> = {
  en: {
    tocHeading: "On this page",
    quickFacts: "Quick facts",
    sourcesRequired: "Sources are required before publication",
    relatedContent: "Related content",
    relatedPending: "Related content will appear after verification",
    emptyDefaultDescription:
      "This route is ready for reviewed content. No publishable detail is available yet.",
    categoryStatistics: "Category statistics",
    publishedEntries: "Published entries",
    trackedPatch: "Tracked patch",
    verified: "Verified",
    editorialBoundary: "Editorial boundary",
    searchTitle: "Search {label}",
    searchDescription: "Search published content in this language.",
    searchQueryLabel: "Search query",
    searchPlaceholder: "Search guides",
    searchSubmit: "Search",
    skeletonType: "Skeleton",
  },
  "zh-cn": {
    tocHeading: "本页内容",
    quickFacts: "速览事实",
    sourcesRequired: "发布前必须提供来源",
    relatedContent: "关联内容",
    relatedPending: "关联内容将在核验完成后显示",
    emptyDefaultDescription:
      "该路由已准备好接收已审核内容，目前尚无可发布的详情。",
    categoryStatistics: "分类统计",
    publishedEntries: "已发布条目",
    trackedPatch: "当前追踪版本",
    verified: "可核验",
    editorialBoundary: "编辑边界",
    searchTitle: "搜索 {label}",
    searchDescription: "从当前语言的已发布内容中查找。",
    searchQueryLabel: "搜索词",
    searchPlaceholder: "输入关键词",
    searchSubmit: "搜索",
    skeletonType: "骨架",
  },
  "pt-br": {
    tocHeading: "Nesta página",
    quickFacts: "Fatos rápidos",
    sourcesRequired: "Fontes são obrigatórias antes da publicação",
    relatedContent: "Conteúdo relacionado",
    relatedPending: "O conteúdo relacionado aparecerá após a verificação",
    emptyDefaultDescription:
      "Esta rota está pronta para conteúdo revisado. Nenhum detalhe publicável está disponível ainda.",
    categoryStatistics: "Estatísticas da categoria",
    publishedEntries: "Entradas publicadas",
    trackedPatch: "Patch acompanhado",
    verified: "Verificado",
    editorialBoundary: "Limite editorial",
    searchTitle: "Buscar {label}",
    searchDescription: "Pesquise o conteúdo publicado neste idioma.",
    searchQueryLabel: "Termo de busca",
    searchPlaceholder: "Buscar guias",
    searchSubmit: "Buscar",
    skeletonType: "Esqueleto",
  },
  ru: {
    tocHeading: "На этой странице",
    quickFacts: "Краткие факты",
    sourcesRequired: "Перед публикацией обязательно нужны источники",
    relatedContent: "Связанный контент",
    relatedPending: "Связанный контент появится после проверки",
    emptyDefaultDescription:
      "Этот маршрут готов для проверенного контента. Публикуемых подробностей пока нет.",
    categoryStatistics: "Статистика категории",
    publishedEntries: "Опубликованные записи",
    trackedPatch: "Отслеживаемый патч",
    verified: "Проверено",
    editorialBoundary: "Редакционная граница",
    searchTitle: "Искать {label}",
    searchDescription: "Ищите опубликованный контент на этом языке.",
    searchQueryLabel: "Поисковый запрос",
    searchPlaceholder: "Искать гайды",
    searchSubmit: "Искать",
    skeletonType: "Каркас",
  },
  de: {
    tocHeading: "Auf dieser Seite",
    quickFacts: "Kurzinfos",
    sourcesRequired: "Vor der Veröffentlichung sind Quellen erforderlich",
    relatedContent: "Verwandte Inhalte",
    relatedPending: "Verwandte Inhalte erscheinen nach der Verifizierung",
    emptyDefaultDescription:
      "Diese Route ist bereit für redaktionell geprüfte Inhalte. Es sind noch keine veröffentlichbaren Details verfügbar.",
    categoryStatistics: "Kategoriestatistiken",
    publishedEntries: "Veröffentlichte Einträge",
    trackedPatch: "Verfolgter Patch",
    verified: "Verifiziert",
    editorialBoundary: "Redaktionelle Grenze",
    searchTitle: "Suche {label}",
    searchDescription:
      "Durchsuchen Sie veröffentlichte Inhalte in dieser Sprache.",
    searchQueryLabel: "Suchbegriff",
    searchPlaceholder: "Guides suchen",
    searchSubmit: "Suchen",
    skeletonType: "Gerüst",
  },
  es: {
    tocHeading: "En esta página",
    quickFacts: "Datos rápidos",
    sourcesRequired: "Las fuentes son obligatorias antes de la publicación",
    relatedContent: "Contenido relacionado",
    relatedPending: "El contenido relacionado aparecerá tras la verificación",
    emptyDefaultDescription:
      "Esta ruta está lista para contenido revisado. Aún no hay detalles publicables disponibles.",
    categoryStatistics: "Estadísticas de la categoría",
    publishedEntries: "Entradas publicadas",
    trackedPatch: "Parche rastreado",
    verified: "Verificado",
    editorialBoundary: "Límite editorial",
    searchTitle: "Buscar {label}",
    searchDescription: "Busque contenido publicado en este idioma.",
    searchQueryLabel: "Término de búsqueda",
    searchPlaceholder: "Buscar guías",
    searchSubmit: "Buscar",
    skeletonType: "Esqueleto",
  },
  fr: {
    tocHeading: "Sur cette page",
    quickFacts: "Faits rapides",
    sourcesRequired: "Les sources sont requises avant publication",
    relatedContent: "Contenu associé",
    relatedPending: "Le contenu associé apparaîtra après vérification",
    emptyDefaultDescription:
      "Cette route est prête pour le contenu vérifié. Aucun détail publiable n'est encore disponible.",
    categoryStatistics: "Statistiques de la catégorie",
    publishedEntries: "Entrées publiées",
    trackedPatch: "Patch suivi",
    verified: "Vérifié",
    editorialBoundary: "Limite éditoriale",
    searchTitle: "Rechercher {label}",
    searchDescription: "Recherchez le contenu publié dans cette langue.",
    searchQueryLabel: "Requête de recherche",
    searchPlaceholder: "Rechercher des guides",
    searchSubmit: "Rechercher",
    skeletonType: "Squelette",
  },
  ja: {
    tocHeading: "このページの内容",
    quickFacts: "クイックファクト",
    sourcesRequired: "公開前に出典の提示が必要です",
    relatedContent: "関連コンテンツ",
    relatedPending: "関連コンテンツは検証後に表示されます",
    emptyDefaultDescription:
      "このルートはレビュー済みコンテンツの受け入れ準備が完了しています。公開可能な詳細はまだありません。",
    categoryStatistics: "カテゴリ統計",
    publishedEntries: "公開済み項目",
    trackedPatch: "追跡中のパッチ",
    verified: "検証済み",
    editorialBoundary: "編集境界",
    searchTitle: "{label}を検索",
    searchDescription: "この言語の公開済みコンテンツを検索します。",
    searchQueryLabel: "検索語",
    searchPlaceholder: "ガイドを検索",
    searchSubmit: "検索",
    skeletonType: "スケルトン",
  },
  ko: {
    tocHeading: "이 페이지 내용",
    quickFacts: "핵심 요약",
    sourcesRequired: "게시 전 출처가 필요합니다",
    relatedContent: "관련 콘텐츠",
    relatedPending: "관련 콘텐츠는 검증 후에 표시됩니다",
    emptyDefaultDescription:
      "이 라우트는 검토된 콘텐츠를 받을 준비가 되어 있으나, 아직 게시 가능한 세부 내용이 없습니다.",
    categoryStatistics: "분류 통계",
    publishedEntries: "게시된 항목",
    trackedPatch: "추적 중인 패치",
    verified: "검증됨",
    editorialBoundary: "편집 경계",
    searchTitle: "{label} 검색",
    searchDescription: "이 언어의 게시된 콘텐츠를 검색합니다.",
    searchQueryLabel: "검색어",
    searchPlaceholder: "가이드 검색",
    searchSubmit: "검색",
    skeletonType: "스켈레톤",
  },
  tr: {
    tocHeading: "Bu sayfada",
    quickFacts: "Hızlı bilgiler",
    sourcesRequired: "Yayınlamadan önce kaynaklar gereklidir",
    relatedContent: "İlgili içerik",
    relatedPending: "İlgili içerik, doğrulamadan sonra görünecektir",
    emptyDefaultDescription:
      "Bu rota incelenmiş içerik için hazır. Yayınlanabilir bir ayrıntı henüz mevcut değil.",
    categoryStatistics: "Kategori istatistikleri",
    publishedEntries: "Yayınlanan girdiler",
    trackedPatch: "İzlenen yama",
    verified: "Doğrulanmış",
    editorialBoundary: "Editöryel sınır",
    searchTitle: "{label} Ara",
    searchDescription: "Bu dildeki yayınlanmış içeriği arayın.",
    searchQueryLabel: "Arama sorgusu",
    searchPlaceholder: "Rehber ara",
    searchSubmit: "Ara",
    skeletonType: "İskelet",
  },
};

/**
 * 返回指定语言的分类共享文案；支持 {placeholder} 简单替换。
 * 当语言或键缺失（应为编程错误）时防御性回退英语，但正常渲染路径下数据完整，
 * 不会把英语用作非英语页面的常态 fallback。
 */
export function getSharedCategoryCopy(
  locale: ContentLocale | undefined,
  key: SharedCategoryCopyKey,
  params?: Record<string, string>,
): string {
  const localeTable = locale ? sharedCategoryCopyByLocale[locale] : undefined;
  const value = localeTable?.[key] ?? sharedCategoryCopyByLocale.en[key];
  if (!params) return value;
  let result = value;
  for (const [name, replacement] of Object.entries(params)) {
    // 逐键替换命名占位符（如 searchTitle 的 {label}）。
    result = result.replaceAll(`{${name}}`, replacement);
  }
  return result;
}

/** 暴露全部键，供测试与校验脚本遍历检查完整性。 */
export const sharedCategoryCopyKeys = Object.keys(
  sharedCategoryCopyByLocale.en,
) as SharedCategoryCopyKey[];
