/** 文件职责：集中维护 Bosses 可公开聚合的稳定词表，避免路由、筛选和 Sitemap 各自复制规则。 */
import { bossActSlugs, bossCategorySlugs, type BossArticle } from "./schema";

export type BossCollection =
  | { kind: "category"; value: (typeof bossCategorySlugs)[number] }
  | { kind: "act"; value: (typeof bossActSlugs)[number] };

/** 判断公开聚合参数是否属于受控词表，未知值必须进入 404。 */
export function isKnownBossCollection(collection: BossCollection): boolean {
  if (collection.kind === "category") {
    return bossCategorySlugs.includes(collection.value);
  }
  return bossActSlugs.includes(collection.value);
}

/** 按聚合语义筛选同语言已发布 Boss，供页面和 Sitemap 共用同一规则。 */
export function matchesBossCollection(
  article: Pick<BossArticle, "bossCategory" | "act">,
  collection: BossCollection,
): boolean {
  if (collection.kind === "category") {
    return article.bossCategory === collection.value;
  }
  return article.act === collection.value;
}
