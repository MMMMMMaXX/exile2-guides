/** 文件职责：为原型 V2 详情页右栏集中展示可核验元数据与安全导航，不重复正文结论。 */

export type ArticleSidebarProps = {
  author: string;
  categoryHref: string;
  categoryLabel: string;
  locale: "en" | "zh-cn";
  patch: string;
  tags: readonly string[];
  updatedAt: string;
  verificationStatus?: string;
};

/** 渲染详情页右侧事实摘要、分类入口和核验边界。 */
export function ArticleSidebar({
  author,
  categoryHref,
  categoryLabel,
  locale,
  patch,
  tags,
  updatedAt,
  verificationStatus,
}: ArticleSidebarProps) {
  const zh = locale === "zh-cn";

  return (
    <>
      <section className="article-rail-panel">
        <h2>{zh ? "页面信息" : "Page facts"}</h2>
        <dl>
          <div>
            <dt>Patch</dt>
            <dd>{patch}</dd>
          </div>
          <div>
            <dt>{zh ? "更新日期" : "Updated"}</dt>
            <dd>{updatedAt}</dd>
          </div>
          <div>
            <dt>{zh ? "作者" : "Author"}</dt>
            <dd>{author}</dd>
          </div>
          {verificationStatus ? (
            <div>
              <dt>{zh ? "核验状态" : "Verification"}</dt>
              <dd>{verificationStatus}</dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section className="article-rail-panel">
        <h2>{zh ? "内容标签" : "Content tags"}</h2>
        <div className="article-rail-tags">
          {tags.slice(0, 6).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a className="article-rail-link" href={categoryHref}>
          {zh ? `浏览全部${categoryLabel}` : `Browse all ${categoryLabel}`} →
        </a>
      </section>

      <section className="article-rail-panel article-rail-panel--notice">
        <h2>{zh ? "核验边界" : "Verification boundary"}</h2>
        <p>
          {zh
            ? "来源、Patch 与待实机核验范围会在正文中明确区分；本站不会把待核验内容表述为实测结论。"
            : "Sources, patch scope and pending in-game checks remain visibly separated. Pending work is never presented as tested fact."}
        </p>
      </section>
    </>
  );
}
