/** 文件职责：从已内联的静态页面中派生 Build 列表与筛选结果，避免路由重复实现发布过滤。 */
import type { StaticContentPage } from "./content-page";
import type { BuildFrontMatter } from "./schema";

export type BuildListItem = StaticContentPage & {
  frontMatter: BuildFrontMatter;
};

export type BuildFilters = {
  budget: BuildFrontMatter["budget"] | "all";
  className: string | "all";
  difficulty: BuildFrontMatter["difficulty"] | "all";
  patch: string | "all";
};

/** 判断静态页面是否为指定语言可公开展示的 Build，供列表与未来首页共用。 */
function isBuildListItem(
  page: StaticContentPage,
  locale: BuildFrontMatter["locale"],
): page is BuildListItem {
  return (
    page.frontMatter.contentType === "build" &&
    page.frontMatter.locale === locale
  );
}

/** 读取指定语言的真实 Build，并按最近更新时间倒序稳定排列。 */
export function getBuildListItems(
  pages: Readonly<Record<string, StaticContentPage>>,
  locale: BuildFrontMatter["locale"],
): BuildListItem[] {
  return Object.values(pages)
    .filter((page): page is BuildListItem => isBuildListItem(page, locale))
    .sort((left, right) =>
      right.frontMatter.updatedAt.localeCompare(left.frontMatter.updatedAt),
    );
}

/** 创建无筛选状态，确保清除筛选后始终回到同一个可预测的列表结果。 */
export function createDefaultBuildFilters(): BuildFilters {
  return {
    budget: "all",
    className: "all",
    difficulty: "all",
    patch: "all",
  };
}

/** 仅按 PRD 指定的四个维度过滤 Build，避免首发阶段演变为复杂查询系统。 */
export function filterBuildListItems(
  items: readonly BuildListItem[],
  filters: BuildFilters,
): BuildListItem[] {
  return items.filter(({ frontMatter }) => {
    return (
      (filters.className === "all" ||
        frontMatter.className === filters.className) &&
      (filters.difficulty === "all" ||
        frontMatter.difficulty === filters.difficulty) &&
      (filters.budget === "all" || frontMatter.budget === filters.budget) &&
      (filters.patch === "all" || frontMatter.patch === filters.patch)
    );
  });
}
