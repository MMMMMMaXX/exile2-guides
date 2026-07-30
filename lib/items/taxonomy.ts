/** 文件职责：集中维护 Items 可公开聚合的稳定词表，避免路由、筛选和 Sitemap 各自复制规则。 */
import { itemCategorySlugs, type ItemArticle } from "./schema";

export type ItemCollection = {
  kind: "category";
  value: (typeof itemCategorySlugs)[number];
};

/** 判断公开聚合参数是否属于受控词表，未知值必须进入 404。 */
export function isKnownItemCollection(collection: ItemCollection): boolean {
  return itemCategorySlugs.includes(collection.value);
}

/** 按聚合语义筛选同语言已发布 Item，供页面和 Sitemap 共用同一规则。 */
export function matchesItemCollection(
  article: ItemArticle,
  collection: ItemCollection,
): boolean {
  return article.itemCategory === collection.value;
}
