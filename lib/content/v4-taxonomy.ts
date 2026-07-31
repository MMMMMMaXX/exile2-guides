/** 文件职责：集中维护 V4 聚合页面的受控分类词表、静态预渲染路径和已验证的骨架索引行。 */
import type { ContentLocale, ContentType } from "./constants";
import type { SearchDocument } from "../search/search-index";

export const v4Taxonomy: Record<ContentType, readonly string[]> = {
  boss: ["campaign", "interludes", "optional", "trial", "endgame", "pinnacle"],
  build: [
    "ranger",
    "witch",
    "warrior",
    "monk",
    "mercenary",
    "sorceress",
    "druid",
    "huntress",
  ],
  guide: [
    "beginner",
    "campaign",
    "mechanics",
    "crafting-trading",
    "endgame-atlas",
    "troubleshooting",
  ],
  item: [
    "weapons",
    "off-hand",
    "armour",
    "jewellery",
    "currency",
    "unique-items",
  ],
  patch: ["major-updates", "balance", "hotfixes", "bug-fixes"],
  skill: ["active", "support", "spirit", "meta", "lineage", "ascendancy"],
};

export type V4MockRow = {
  category: string;
  contentType: ContentType;
  detailReady: false;
  slug: string;
  title: string;
};

/** 设计稿已验证的结构索引行；只提供列表与搜索数据，不创建薄详情页。 */
export const v4SkeletonRows: readonly V4MockRow[] = [
  {
    category: "ranger",
    contentType: "build",
    detailReady: false,
    slug: "ranger-starter",
    title: "Ranger starter skeleton",
  },
];

/** 返回双语可预渲染的 V4 子类路径；Patch 分类仅供筛选，不创建独立详情页。 */
export function getV4SubtypePaths(): string[] {
  const segmentByType: Record<ContentType, string> = {
    boss: "bosses",
    build: "builds",
    guide: "guides",
    item: "items",
    patch: "patches",
    skill: "skills",
  };
  return (["en", "zh-cn"] as const).flatMap((locale) =>
    (Object.entries(v4Taxonomy) as [ContentType, readonly string[]][]).flatMap(
      ([type, categories]) =>
        type === "patch" || type === "build" || type === "boss" || type === "item" || type === "skill" || type === "guide"
          ? []
          : categories.map(
              (category) => `/${locale}/${segmentByType[type]}/${category}/`,
            ),
    ),
  );
}

/** 对受控参数进行判定，避免未知 URL 被渲染为看似真实的聚合页。 */
export function isV4Subtype(contentType: ContentType, value: string): boolean {
  return v4Taxonomy[contentType].includes(value);
}

/** 将已验证的结构索引行转换为搜索文档；详情仍只来自正式 Markdown。 */
export function getV4SkeletonSearchDocuments(
  locale: ContentLocale,
): SearchDocument[] {
  return v4SkeletonRows.map((row) => ({
    category: row.contentType,
    description: "Verified V4 structure row. No detail page is published.",
    headings: [],
    locale,
    patch: "V4 skeleton",
    path: `/${locale}/${
      {
        boss: `bosses/${row.category}`,
        build: `builds/classes/${row.category}`,
        guide: `guides/${row.category}`,
        item: `items/${row.category}`,
        patch: "patches",
        skill: `skills/${row.category}`,
      }[row.contentType]
    }/`,
    tags: [row.category, "v4-skeleton"],
    title: row.title,
    updatedAt: "—",
  }));
}
