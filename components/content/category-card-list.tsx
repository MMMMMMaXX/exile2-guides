/** 文件职责：复用真实内容卡片与空状态，供 Item、Skill、Guide、Patch 分类保持一致的公开边界。 */
import { useMemo, useState } from "react";

import type { ContentLocale, ContentType } from "../../lib/content/constants";
import { contentRoutePath } from "../../lib/content/constants";
import type { StaticContentPage } from "../../lib/content/content-page";
import { CatalogContextRail } from "../catalog/catalog-context-rail";
import { CatalogLayout } from "../catalog/catalog-layout";
import { ContentCard } from "./content-card";

type CategoryListCopy = { emptyDescription: string; emptyTitle: string };

/** 将具体类别的已校验字段压缩为最多三项卡片属性，而不伪造数值或未知字段。 */
function getCardAttributes(page: StaticContentPage): string[] {
  const { frontMatter } = page;
  switch (frontMatter.contentType) {
    case "item":
      return [
        frontMatter.itemType,
        frontMatter.rarity,
        ...frontMatter.useCases,
      ].filter(
        (value): value is string => typeof value === "string" && Boolean(value),
      );
    case "skill":
      return [
        frontMatter.skillType,
        ...frontMatter.tags,
        frontMatter.requiredLevel ? `Level ${frontMatter.requiredLevel}` : "",
      ].filter(
        (value): value is string => typeof value === "string" && Boolean(value),
      );
    case "guide":
      return [
        frontMatter.guideCategory,
        `${frontMatter.estimatedReadingMinutes} min read`,
        ...frontMatter.prerequisites,
      ].filter(
        (value): value is string => typeof value === "string" && Boolean(value),
      );
    case "patch":
      return [frontMatter.patchStatus, frontMatter.patch].filter(Boolean);
    default:
      return frontMatter.tags;
  }
}

/** 返回稳定类型标签，避免由 URL 或标题文本猜测页面所属分类。 */
function getTypeLabel(contentType: ContentType): string {
  return {
    boss: "Boss",
    build: "Build",
    guide: "Guide",
    item: "Item",
    patch: "Patch",
    skill: "Skill",
  }[contentType];
}

/** 从已发布内容的真实标签收集可筛选项，不通过标题或原型样例推测分类。 */
function getFilterTags(items: readonly StaticContentPage[]): string[] {
  return [
    ...new Set(items.flatMap((page) => page.frontMatter.tags).filter(Boolean)),
  ].slice(0, 8);
}

/** 渲染无额外筛选要求的分类列表，仅消费静态生产内容页。 */
export function CategoryCardList({
  copy,
  items,
  locale,
}: {
  copy: CategoryListCopy;
  items: readonly StaticContentPage[];
  locale: ContentLocale;
}) {
  const [selectedTag, setSelectedTag] = useState("all");
  const filterTags = useMemo(() => getFilterTags(items), [items]);
  const filteredItems = useMemo(
    () =>
      selectedTag === "all"
        ? items
        : items.filter((page) => page.frontMatter.tags.includes(selectedTag)),
    [items, selectedTag],
  );
  if (items.length === 0)
    return (
      <section
        className="content-empty-state"
        aria-labelledby="category-card-empty-title"
      >
        <h2 id="category-card-empty-title">{copy.emptyTitle}</h2>
        <p>{copy.emptyDescription}</p>
      </section>
    );
  const contentType = items[0]?.frontMatter.contentType;
  if (!contentType) return null;
  return (
    <CatalogLayout
      context={<CatalogContextRail contentType={contentType} locale={locale} />}
      filters={
        <div
          className="category-card-list__filters"
          aria-label="Content filters"
        >
          <h2>Filter entries</h2>
          <div className="catalog-filter__buttons">
            <button
              className={selectedTag === "all" ? "is-selected" : undefined}
              onClick={() => setSelectedTag("all")}
              type="button"
            >
              All published
            </button>
            {filterTags.map((tag) => (
              <button
                className={selectedTag === tag ? "is-selected" : undefined}
                key={tag}
                onClick={() => setSelectedTag(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="filter-note">
            <strong>Patch 0.5.4</strong>
            <br />
            Only verified published entries are shown.
          </p>
        </div>
      }
    >
      <section aria-label="Content results" className="category-card-list">
        <div className="catalog-toolbar">
          <div>
            <p className="section-kicker">Verified catalogue</p>
            <h2>{contentType}</h2>
          </div>
          <span>{filteredItems.length} result(s)</span>
        </div>
        {filteredItems.length ? (
          <div className="content-card-grid catalog-grid">
            {filteredItems.map((page) => {
              const { frontMatter } = page;
              return (
                <ContentCard
                  key={frontMatter.contentId}
                  content={{
                    attributes: getCardAttributes(page),
                    href: contentRoutePath(
                      locale,
                      frontMatter.contentType,
                      frontMatter.slug,
                    ),
                    meta: `Patch ${frontMatter.patch} · Updated ${frontMatter.updatedAt}`,
                    summary: frontMatter.summary,
                    title: frontMatter.title,
                    typeLabel: getTypeLabel(frontMatter.contentType),
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
              );
            })}
          </div>
        ) : (
          <section className="content-empty-state">
            <h2>No entries match this filter</h2>
            <p>Choose another verified tag to restore the catalogue.</p>
          </section>
        )}
      </section>
    </CatalogLayout>
  );
}
