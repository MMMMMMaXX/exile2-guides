/** 文件职责：渲染段落与列表的共用组合，供各内容模块的结构化章节复用。 */

/** 输出纯文本段落和可选列表；JSON 内容不允许注入 HTML。 */
export function NarrativeContent({
  bullets,
  paragraphs,
}: {
  bullets: readonly string[];
  paragraphs: readonly string[];
}) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {bullets.length > 0 ? (
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
