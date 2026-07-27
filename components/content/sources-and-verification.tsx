/** 文件职责：统一展示内容的来源与核验日期，让公开页面的事实依据可见且可追溯。 */
import type { ContentFrontMatter } from "../../lib/content/schema";

/** 将来源类型转换为编辑可读标签，不改变来源 URL 或其原始核验语义。 */
function formatSourceType(
  sourceType: ContentFrontMatter["sources"][number]["sourceType"],
): string {
  const labels = {
    community: "Community discussion",
    "in-game": "In-game verification",
    official: "Official source",
    other: "Other source",
    tool: "External tool",
  } as const;
  return labels[sourceType];
}

/** 渲染来源清单；没有来源的未发布内容不生成虚构的核验区块。 */
export function SourcesAndVerification({
  frontMatter,
}: {
  frontMatter: ContentFrontMatter;
}) {
  if (frontMatter.sources.length === 0) return null;

  const isChinese = frontMatter.locale === "zh-cn";
  return (
    <section
      className="sources-and-verification"
      aria-labelledby="sources-heading"
    >
      <h2 id="sources-heading">
        {isChinese ? "来源与核验" : "Sources & Verification"}
      </h2>
      {frontMatter.verifiedAt ? (
        <p>
          {isChinese ? "最近核验日期：" : "Last verified: "}
          <time dateTime={frontMatter.verifiedAt}>
            {frontMatter.verifiedAt}
          </time>
        </p>
      ) : null}
      <ul>
        {frontMatter.sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} rel="noreferrer" target="_blank">
              {source.label}
            </a>
            <span> · {formatSourceType(source.sourceType)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
