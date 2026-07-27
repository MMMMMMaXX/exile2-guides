/** 文件职责：复用真实内容卡片与空状态，供 Item、Skill、Guide、Patch 分类保持一致的公开边界。 */
import type { ContentLocale, ContentType } from "../../lib/content/constants";
import { contentRoutePath } from "../../lib/content/constants";
import type { StaticContentPage } from "../../lib/content/content-page";
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
  return (
    <section aria-label="Content results" className="category-card-list">
      <div className="content-card-grid">
        {items.map((page) => {
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
    </section>
  );
}
