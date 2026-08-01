/** 文件职责：统一渲染“来源与核验”章节的分类来源卡片，供六类内容模块复用。 */
import type { ReactNode } from "react";

/** 来源分类条目，与共享 sourceCategorySchema 对齐。约定：label 为类型标签（官方来源/社区讨论等短文本），description 为来源标题（长文本）；窄列显示标签、宽列显示标题。 */
type SourceCategory = {
  description: string;
  label: string;
  url?: string | undefined;
};

/** 来源与核验章节文案。 */
type SourcesSectionProps = {
  categories: readonly SourceCategory[];
};

/** 渲染分类来源卡片列表；无分类时不渲染空区块。 */
export function SourcesSection({ categories }: SourcesSectionProps): ReactNode {
  if (categories.length === 0) return null;

  return (
    <div className="boss-source-layout">
      <div className="boss-source-list">
        {categories.map((category, index) => (
          <article key={index}>
            <span>{category.label}</span>
            <div>
              <p>{category.description}</p>
            </div>
            {category.url ? (
              <a href={category.url} rel="noopener noreferrer" target="_blank">
                ↗
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
