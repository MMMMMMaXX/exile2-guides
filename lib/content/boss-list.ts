/** 文件职责：从已内联的静态页面中派生 Boss 列表与筛选结果，集中约束公开内容消费者。 */
import type { StaticContentPage } from "./content-page";
import type { BossFrontMatter } from "./schema";

export type BossListItem = StaticContentPage & {
  frontMatter: BossFrontMatter;
};

export type BossFilters = {
  campaignStage: string | "all";
  difficulty: BossFrontMatter["difficulty"] | "all";
  location: string | "all";
  patch: string | "all";
};

/** 判断静态页面是否为指定语言可公开展示的 Boss，草稿不会进入构建期虚拟模块。 */
function isBossListItem(
  page: StaticContentPage,
  locale: BossFrontMatter["locale"],
): page is BossListItem {
  return (
    page.frontMatter.contentType === "boss" &&
    page.frontMatter.locale === locale
  );
}

/** 读取指定语言的真实 Boss，并按最近更新时间倒序稳定排列。 */
export function getBossListItems(
  pages: Readonly<Record<string, StaticContentPage>>,
  locale: BossFrontMatter["locale"],
): BossListItem[] {
  return Object.values(pages)
    .filter((page): page is BossListItem => isBossListItem(page, locale))
    .sort((left, right) =>
      right.frontMatter.updatedAt.localeCompare(left.frontMatter.updatedAt),
    );
}

/** 创建无筛选状态，使清除操作始终回到完整且可预测的结果集。 */
export function createDefaultBossFilters(): BossFilters {
  return {
    campaignStage: "all",
    difficulty: "all",
    location: "all",
    patch: "all",
  };
}

/** 仅按 PRD 指定的 Campaign/Endgame、Act/Area、Difficulty 与 Patch 过滤 Boss。 */
export function filterBossListItems(
  items: readonly BossListItem[],
  filters: BossFilters,
): BossListItem[] {
  return items.filter(
    ({ frontMatter }) =>
      (filters.campaignStage === "all" ||
        frontMatter.campaignStage === filters.campaignStage) &&
      (filters.location === "all" ||
        frontMatter.location === filters.location) &&
      (filters.difficulty === "all" ||
        frontMatter.difficulty === filters.difficulty) &&
      (filters.patch === "all" || frontMatter.patch === filters.patch),
  );
}
