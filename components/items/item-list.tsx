/** 文件职责：渲染 Item 的三维轻量筛选与真实卡片，符合非数据库型代表性物品指南定位。 */
import { useMemo, useState } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import { contentRoutePath } from "../../lib/content/constants";
import {
  createDefaultItemFilters,
  filterItemListItems,
  type ItemFilters,
  type ItemListItem,
} from "../../lib/content/item-list";
import { ContentCard } from "../content/content-card";

type ItemListCopy = { emptyDescription: string; emptyTitle: string };
type FilterKey = keyof ItemFilters;

/** 收集每个筛选维度的真实、非空、去重选项；Use Case 需要展开每篇内容的数组字段。 */
function getFilterValues(
  items: readonly ItemListItem[],
  key: FilterKey,
): string[] {
  const values =
    key === "useCase"
      ? items.flatMap((item) => item.frontMatter.useCases)
      : items.map((item) => item.frontMatter[key]);
  return [
    ...new Set(
      values.filter(
        (value): value is string => typeof value === "string" && Boolean(value),
      ),
    ),
  ].sort((left, right) => left.localeCompare(right));
}

/** 将存储标识转为卡片和 Chip 使用的易读标签。 */
function formatValue(value: string): string {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/** 输出 Item Type、Use Case、Patch 三组筛选控件；首发内容少时不升级为复杂侧栏。 */
function ItemFiltersView({
  filters,
  items,
  onChange,
}: {
  filters: ItemFilters;
  items: readonly ItemListItem[];
  onChange: (key: FilterKey, value: string) => void;
}) {
  const definitions: readonly { key: FilterKey; label: string }[] = [
    { key: "itemType", label: "Item Type" },
    { key: "useCase", label: "Use Case" },
    { key: "patch", label: "Patch" },
  ];
  return (
    <div className="item-list__filters" aria-label="Item filters">
      {definitions.map(({ key, label }) => {
        const values = getFilterValues(items, key);
        if (values.length === 0) return null;
        return (
          <fieldset className="item-list__filter" key={key}>
            <legend>{label}</legend>
            <div className="item-list__chips">
              {["all", ...values].map((value) => (
                <button
                  aria-pressed={filters[key] === value}
                  className="item-list__chip"
                  key={value}
                  onClick={() => onChange(key, value)}
                  type="button"
                >
                  {value === "all" ? "All" : formatValue(value)}
                </button>
              ))}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}

/** 显示代表性 Item 指南，不把空目录伪装为完整物品数据库。 */
export function ItemList({
  copy,
  items,
  locale,
}: {
  copy: ItemListCopy;
  items: readonly ItemListItem[];
  locale: ContentLocale;
}) {
  const [filters, setFilters] = useState(createDefaultItemFilters);
  const results = useMemo(
    () => filterItemListItems(items, filters),
    [filters, items],
  );
  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== "all",
  );
  /** 单独更新一个筛选条件，保持其他已选条件。 */
  function updateFilter(key: FilterKey, value: string) {
    setFilters((current) => ({ ...current, [key]: value }) as ItemFilters);
  }
  /** 清除所有筛选，恢复可见的完整 Item 集合。 */
  function clearFilters() {
    setFilters(createDefaultItemFilters());
  }
  if (items.length === 0)
    return (
      <section
        className="content-empty-state"
        aria-labelledby="item-empty-title"
      >
        <h2 id="item-empty-title">{copy.emptyTitle}</h2>
        <p>{copy.emptyDescription}</p>
      </section>
    );
  return (
    <section className="item-list" aria-label="Item results">
      <ItemFiltersView
        filters={filters}
        items={items}
        onChange={updateFilter}
      />
      {results.length ? (
        <div className="content-card-grid">
          {results.map(({ frontMatter }) => (
            <ContentCard
              key={frontMatter.contentId}
              content={{
                attributes: [
                  ...(frontMatter.itemType
                    ? [formatValue(frontMatter.itemType)]
                    : []),
                  ...(frontMatter.rarity
                    ? [formatValue(frontMatter.rarity)]
                    : []),
                  ...frontMatter.useCases.map(formatValue),
                ],
                href: contentRoutePath(locale, "item", frontMatter.slug),
                meta: `Patch ${frontMatter.patch} · Updated ${frontMatter.updatedAt}`,
                summary: frontMatter.summary,
                title: frontMatter.title,
                typeLabel: "Item",
                ...(frontMatter.image
                  ? {
                      image: frontMatter.image,
                      ...(frontMatter.imageAlt
                        ? { imageAlt: frontMatter.imageAlt }
                        : {}),
                    }
                  : {}),
              }}
            />
          ))}
        </div>
      ) : (
        <section
          className="content-empty-state"
          aria-labelledby="item-filter-empty-title"
        >
          <h2 id="item-filter-empty-title">No Items match these filters</h2>
          <p>Try another combination to see the verified Item guides.</p>
          {hasActiveFilters ? (
            <button
              className="button button--secondary"
              onClick={clearFilters}
              type="button"
            >
              Clear filters
            </button>
          ) : null}
        </section>
      )}
    </section>
  );
}
