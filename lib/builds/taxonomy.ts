/** 文件职责：集中维护 Builds 可公开聚合的稳定词表，避免路由、筛选和 Sitemap 各自复制规则。 */
import { buildCategorySlugs, type BuildArticle } from "./schema";

export const buildClassSlugs = [
  "druid",
  "huntress",
  "mercenary",
  "monk",
  "ranger",
  "sorceress",
  "warrior",
  "witch",
] as const;

// 当前只登记用户路由方案中明确出现的升华；新增值应随已审核内容一起扩展。
export const buildAscendancySlugs = [
  "deadeye",
  "lich",
  "martial-artist",
] as const;

export type BuildCollection =
  | { kind: "class"; value: string }
  | { kind: "ascendancy"; value: string }
  | { kind: "category"; value: (typeof buildCategorySlugs)[number] };

/** 判断公开聚合参数是否属于受控词表，未知值必须进入 404。 */
export function isKnownBuildCollection(collection: BuildCollection): boolean {
  if (collection.kind === "class") {
    return buildClassSlugs.includes(
      collection.value as (typeof buildClassSlugs)[number],
    );
  }
  if (collection.kind === "ascendancy") {
    return buildAscendancySlugs.includes(
      collection.value as (typeof buildAscendancySlugs)[number],
    );
  }
  return buildCategorySlugs.includes(collection.value);
}

/** 按聚合语义筛选同语言已发布 Build，供页面和 Sitemap 共用同一规则。 */
export function matchesBuildCollection(
  article: Pick<
    BuildArticle,
    "classId" | "ascendancyId" | "budgets" | "stages"
  >,
  collection: BuildCollection,
): boolean {
  if (collection.kind === "class") return article.classId === collection.value;
  if (collection.kind === "ascendancy") {
    return article.ascendancyId === collection.value;
  }
  if (collection.value === "budget") return article.budgets.includes("low");
  return article.stages.includes(
    collection.value === "endgame" ? "endgame" : collection.value,
  );
}
