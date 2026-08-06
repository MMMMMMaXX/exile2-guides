/** 文件职责：集中维护 Patches 可公开聚合的稳定词表，避免路由、筛选和 Sitemap 各自复制规则。 */
import { patchCategorySlugs, type PatchArticle } from "./schema";

export type PatchCollection = {
  kind: "category";
  value: (typeof patchCategorySlugs)[number];
};

/** 判断公开聚合参数是否属于受控词表，未知值必须进入 404。 */
export function isKnownPatchCollection(collection: PatchCollection): boolean {
  return patchCategorySlugs.includes(collection.value);
}

/** 按聚合语义筛选同语言已发布 Patch，供页面和 Sitemap 共用同一规则。 */
export function matchesPatchCollection(
  article: Pick<PatchArticle, "patchCategory">,
  collection: PatchCollection,
): boolean {
  return article.patchCategory === collection.value;
}
