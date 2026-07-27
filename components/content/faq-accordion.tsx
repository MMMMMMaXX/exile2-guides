/** 文件职责：使用原生 details 构建可访问 FAQ，不依赖额外客户端状态或第三方组件。 */
import type { ReactNode } from "react";

export type FaqItem = {
  answer: ReactNode;
  question: string;
};

/** 渲染真实问答内容；空数组不产生空白区块或虚构 FAQ。 */
export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="faq-accordion" aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently asked questions</h2>
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <div className="faq-accordion__answer">{item.answer}</div>
        </details>
      ))}
    </section>
  );
}
