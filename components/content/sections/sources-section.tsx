/** 文件职责：统一渲染“来源与核验”章节的分类卡片 + 核验清单布局，供六类内容模块复用。 */
import type { ReactNode } from "react";

/** 来源分类条目，与共享 sourceCategorySchema 对齐。 */
type SourceCategory = {
  description: string;
  label: string;
  url?: string | undefined;
};

/** 来源与核验章节文案，核验清单标题由调用方按语言注入。 */
type SourcesSectionProps = {
  categories: readonly SourceCategory[];
  verificationChecklist: readonly string[];
  verificationChecklistLabel: string;
};

/** 渲染分类来源卡片列表与右侧核验清单；无分类时不渲染空区块。 */
export function SourcesSection({
  categories,
  verificationChecklist,
  verificationChecklistLabel,
}: SourcesSectionProps): ReactNode {
  if (categories.length === 0 && verificationChecklist.length === 0) return null;

  return (
    <div className="boss-source-layout">
      <div className="boss-source-list">
        {categories.map((category) => (
          <article key={category.label}>
            <span>{category.label}</span>
            <div>
              <p>{category.description}</p>
            </div>
            {category.url ? (
              <a
                href={category.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                ↗
              </a>
            ) : null}
          </article>
        ))}
      </div>
      {verificationChecklist.length > 0 ? (
        <aside className="boss-verification-card">
          <h3>{verificationChecklistLabel}</h3>
          <ul>
            {verificationChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      ) : null}
    </div>
  );
}
