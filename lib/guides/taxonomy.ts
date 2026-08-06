/** 文件职责：集中维护 Guides 可公开聚合的稳定词表，避免路由、筛选和 Sitemap 各自复制规则。 */
import { guideCategorySlugs, type GuideArticle } from "./schema";

export type GuideCollection = {
  kind: "category";
  value: (typeof guideCategorySlugs)[number];
};

/** 判断公开聚合参数是否属于受控词表，未知值必须进入 404。 */
export function isKnownGuideCollection(collection: GuideCollection): boolean {
  return guideCategorySlugs.includes(collection.value);
}

/** 按聚合语义筛选同语言已发布 Guide，供页面和 Sitemap 共用同一规则。 */
export function matchesGuideCollection(
  article: Pick<GuideArticle, "guideCategory">,
  collection: GuideCollection,
): boolean {
  return article.guideCategory === collection.value;
}
