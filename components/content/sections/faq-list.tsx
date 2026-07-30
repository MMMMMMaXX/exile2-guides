/** 文件职责：渲染 FAQ 问答列表，供各内容模块的 faq 章节复用。 */

/** 将问答条目渲染为可折叠的 details 元素。 */
export function FaqList({
  items,
}: {
  items: readonly { answer: readonly string[]; question: string }[];
}) {
  return (
    <>
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          {item.answer.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </details>
      ))}
    </>
  );
}
