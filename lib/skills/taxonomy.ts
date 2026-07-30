/** 文件职责：集中维护 Skills 可公开聚合的稳定词表，避免路由、筛选和 Sitemap 各自复制规则。 */
import { skillCategorySlugs, type SkillArticle } from "./schema";

export type SkillCollection = {
  kind: "category";
  value: (typeof skillCategorySlugs)[number];
};

/** 判断公开聚合参数是否属于受控词表，未知值必须进入 404。 */
export function isKnownSkillCollection(collection: SkillCollection): boolean {
  return skillCategorySlugs.includes(collection.value);
}

/** 按聚合语义筛选同语言已发布 Skill，供页面和 Sitemap 共用同一规则。 */
export function matchesSkillCollection(
  article: SkillArticle,
  collection: SkillCollection,
): boolean {
  return article.skillCategory === collection.value;
}
