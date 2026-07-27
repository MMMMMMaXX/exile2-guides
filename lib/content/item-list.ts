/** 文件职责：提供 Item 列表的类型安全筛选，限定为 PRD 的 Item Type、Use Case 与 Patch。 */
import type { StaticContentPage } from "./content-page";
import type { ItemFrontMatter } from "./schema";

export type ItemListItem = StaticContentPage & { frontMatter: ItemFrontMatter };
export type ItemFilters = {
  itemType: string | "all";
  patch: string | "all";
  useCase: string | "all";
};

/** 将通用静态页缩窄为 Item，以防其他分类字段误进 Item 筛选逻辑。 */
function isItemListItem(page: StaticContentPage): page is ItemListItem {
  return page.frontMatter.contentType === "item";
}

/** 创建空筛选状态，使列表首次打开和清除筛选的行为一致。 */
export function createDefaultItemFilters(): ItemFilters {
  return { itemType: "all", patch: "all", useCase: "all" };
}

/** 按三个公开筛选维度过滤真实 Item；Use Case 使用包含关系而非错误的精确数组比较。 */
export function filterItemListItems(
  items: readonly ItemListItem[],
  filters: ItemFilters,
): ItemListItem[] {
  return items.filter(
    ({ frontMatter }) =>
      (filters.itemType === "all" ||
        frontMatter.itemType === filters.itemType) &&
      (filters.useCase === "all" ||
        frontMatter.useCases.includes(filters.useCase)) &&
      (filters.patch === "all" || frontMatter.patch === filters.patch),
  );
}

/** 将已发布静态页转换为 Item 列表的类型化数据，按更新时间倒序。 */
export function getItemListItems(
  pages: readonly StaticContentPage[],
): ItemListItem[] {
  return pages
    .filter(isItemListItem)
    .sort((left, right) =>
      right.frontMatter.updatedAt.localeCompare(left.frontMatter.updatedAt),
    );
}
