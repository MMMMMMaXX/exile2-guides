/** 文件职责：渲染真实 Boss 卡片及四项轻量筛选，空目录绝不以虚构首领填充。 */
import { useMemo, useState } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import { contentRoutePath } from "../../lib/content/constants";
import {
  createDefaultBossFilters,
  filterBossListItems,
  type BossFilters,
  type BossListItem,
} from "../../lib/content/boss-list";
import { ContentCard } from "../content/content-card";
import { CatalogContextRail } from "../catalog/catalog-context-rail";
import { CatalogLayout } from "../catalog/catalog-layout";

type BossListCopy = { emptyDescription: string; emptyTitle: string };
type FilterKey = keyof BossFilters;

/** 收集非空、去重的真实字段作为筛选 Chip，避免空位置或阶段形成无意义选项。 */
function getFilterValues(
  items: readonly BossListItem[],
  key: FilterKey,
): string[] {
  return [
    ...new Set(
      items
        .map((item) => item.frontMatter[key])
        .filter(
          (value): value is string =>
            typeof value === "string" && Boolean(value),
        ),
    ),
  ].sort((left, right) => left.localeCompare(right));
}

/** 将保存于内容中的机器可读值转换成简短标签，不改变源数据。 */
function formatValue(value: string): string {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/** 渲染 PRD 规定的四类 Boss 筛选器；首发少量内容继续采用无 URL 状态的 Chips。 */
function BossFilterChips({
  filters,
  items,
  onFilterChange,
}: {
  filters: BossFilters;
  items: readonly BossListItem[];
  onFilterChange: (key: FilterKey, value: string) => void;
}) {
  const definitions: readonly { key: FilterKey; label: string }[] = [
    { key: "campaignStage", label: "Campaign / Endgame" },
    { key: "location", label: "Act / Area" },
    { key: "difficulty", label: "Difficulty" },
    { key: "patch", label: "Patch" },
  ];

  return (
    <div className="boss-list__filters" aria-label="Boss filters">
      {definitions.map(({ key, label }) => {
        const values = getFilterValues(items, key);
        if (values.length === 0) return null;
        return (
          <fieldset className="boss-list__filter" key={key}>
            <legend>{label}</legend>
            <div className="boss-list__chips">
              {["all", ...values].map((value) => (
                <button
                  aria-pressed={filters[key] === value}
                  className="boss-list__chip"
                  key={value}
                  onClick={() => onFilterChange(key, value)}
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

/** 输出 Boss 结果卡片；仅展示 Schema 已验证的位置、等级、阶段、伤害、摘要和更新时间。 */
export function BossList({
  copy,
  items,
  locale,
}: {
  copy: BossListCopy;
  items: readonly BossListItem[];
  locale: ContentLocale;
}) {
  const [filters, setFilters] = useState(createDefaultBossFilters);
  const filteredItems = useMemo(
    () => filterBossListItems(items, filters),
    [filters, items],
  );
  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== "all",
  );

  /** 只更新选择的筛选维度，以便用户组合四类条件。 */
  function updateFilter(key: FilterKey, value: string) {
    setFilters((current) => ({ ...current, [key]: value }) as BossFilters);
  }

  /** 恢复所有真实 Boss，避免无结果状态把用户困在当前组合中。 */
  function clearFilters() {
    setFilters(createDefaultBossFilters());
  }

  if (items.length === 0) {
    return (
      <section
        className="content-empty-state"
        aria-labelledby="boss-empty-title"
      >
        <h2 id="boss-empty-title">{copy.emptyTitle}</h2>
        <p>{copy.emptyDescription}</p>
      </section>
    );
  }

  return (
    <CatalogLayout
      context={<CatalogContextRail contentType="boss" locale={locale} />}
      filters={
        <BossFilterChips
          filters={filters}
          items={items}
          onFilterChange={updateFilter}
        />
      }
    >
      <section className="boss-list" aria-label="Boss results">
        <div className="catalog-toolbar">
          <div>
            <p className="section-kicker">Verified catalogue</p>
            <h2>Bosses</h2>
          </div>
          <span>{filteredItems.length} result(s)</span>
        </div>
        {filteredItems.length > 0 ? (
          <div className="content-card-grid catalog-grid">
            {filteredItems.map(({ frontMatter }) => (
              <ContentCard
                key={frontMatter.contentId}
                content={{
                  attributes: [
                    frontMatter.location,
                    frontMatter.recommendedLevel
                      ? `Level ${frontMatter.recommendedLevel}`
                      : "",
                    frontMatter.campaignStage,
                    ...frontMatter.damageTypes.map(formatValue),
                  ].filter(
                    (value): value is string =>
                      typeof value === "string" && Boolean(value),
                  ),
                  href: contentRoutePath(locale, "boss", frontMatter.slug),
                  meta: `Patch ${frontMatter.patch} · Updated ${frontMatter.updatedAt}`,
                  summary: frontMatter.summary,
                  title: frontMatter.title,
                  typeLabel: "Boss",
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
            aria-labelledby="boss-filter-empty-title"
          >
            <h2 id="boss-filter-empty-title">No Bosses match these filters</h2>
            <p>Try another combination to see the verified Boss catalogue.</p>
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
    </CatalogLayout>
  );
}
