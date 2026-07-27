/** 文件职责：渲染真实 Build 卡片、首发轻量筛选和不含虚构内容的空状态。 */
import { useMemo, useState } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import {
  createDefaultBuildFilters,
  filterBuildListItems,
  type BuildFilters,
  type BuildListItem,
} from "../../lib/content/build-list";
import { contentRoutePath } from "../../lib/content/constants";
import { ContentCard } from "../content/content-card";

type BuildListCopy = {
  emptyDescription: string;
  emptyTitle: string;
};

type FilterKey = keyof BuildFilters;

/** 将实际 Build 字段收集为稳定、去重的筛选 Chip 选项。 */
function getFilterValues(
  items: readonly BuildListItem[],
  key: Exclude<FilterKey, "className"> | "className",
): string[] {
  return [...new Set(items.map((item) => String(item.frontMatter[key])))].sort(
    (left, right) => left.localeCompare(right),
  );
}

/** 将用于 URL 的枚举值转换为可读的简短标签，而不引入第二份业务枚举。 */
function formatFilterValue(value: string): string {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/** 渲染不依赖查询参数的首发筛选器；少量内容使用 Chips 而不是复杂侧栏。 */
function BuildFilterChips({
  filters,
  items,
  onFilterChange,
}: {
  filters: BuildFilters;
  items: readonly BuildListItem[];
  onFilterChange: (key: FilterKey, value: string) => void;
}) {
  const filterDefinitions: readonly { key: FilterKey; label: string }[] = [
    { key: "className", label: "Class" },
    { key: "difficulty", label: "Difficulty" },
    { key: "budget", label: "Budget" },
    { key: "patch", label: "Patch" },
  ];

  return (
    <div className="build-list__filters" aria-label="Build filters">
      {filterDefinitions.map(({ key, label }) => {
        const values = getFilterValues(items, key);
        if (values.length === 0) return null;

        return (
          <fieldset className="build-list__filter" key={key}>
            <legend>{label}</legend>
            <div className="build-list__chips">
              {["all", ...values].map((value) => (
                <button
                  className="build-list__chip"
                  type="button"
                  key={value}
                  aria-pressed={filters[key] === value}
                  onClick={() => onFilterChange(key, value)}
                >
                  {value === "all" ? "All" : formatFilterValue(value)}
                </button>
              ))}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}

/** 输出真实 Build 结果，筛选为空时提供可恢复状态，不添加广告或样例卡片。 */
export function BuildList({
  copy,
  items,
  locale,
}: {
  copy: BuildListCopy;
  items: readonly BuildListItem[];
  locale: ContentLocale;
}) {
  const [filters, setFilters] = useState(createDefaultBuildFilters);
  const filteredItems = useMemo(
    () => filterBuildListItems(items, filters),
    [filters, items],
  );
  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== "all",
  );

  /** 更新单个筛选维度并保持其他维度不变，避免首发筛选器产生隐式重置。 */
  function updateFilter(key: FilterKey, value: string) {
    setFilters(
      (currentFilters) =>
        ({
          ...currentFilters,
          [key]: value,
        }) as BuildFilters,
    );
  }

  /** 清除全部筛选，供“无结果”状态恢复完整列表。 */
  function clearFilters() {
    setFilters(createDefaultBuildFilters());
  }

  if (items.length === 0) {
    return (
      <section
        className="content-empty-state"
        aria-labelledby="build-empty-title"
      >
        <h2 id="build-empty-title">{copy.emptyTitle}</h2>
        <p>{copy.emptyDescription}</p>
      </section>
    );
  }

  return (
    <section className="build-list" aria-label="Build results">
      <BuildFilterChips
        filters={filters}
        items={items}
        onFilterChange={updateFilter}
      />
      {filteredItems.length > 0 ? (
        <div className="content-card-grid">
          {filteredItems.map(({ frontMatter }) => (
            <ContentCard
              key={frontMatter.contentId}
              content={{
                attributes: [
                  frontMatter.className,
                  frontMatter.difficulty,
                  frontMatter.budget,
                ].filter(
                  (value): value is string =>
                    typeof value === "string" && Boolean(value),
                ),
                href: contentRoutePath(locale, "build", frontMatter.slug),
                meta: `Patch ${frontMatter.patch} · Updated ${frontMatter.updatedAt}`,
                summary: frontMatter.summary,
                title: frontMatter.title,
                typeLabel: "Build",
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
          aria-labelledby="build-filter-empty-title"
        >
          <h2 id="build-filter-empty-title">No Builds match these filters</h2>
          <p>Try another combination to see the verified Build catalogue.</p>
          {hasActiveFilters ? (
            <button
              className="button button--secondary"
              type="button"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          ) : null}
        </section>
      )}
    </section>
  );
}
