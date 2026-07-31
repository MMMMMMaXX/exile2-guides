/** 文件职责：渲染 quick-answer 速答卡片网格，用于文章顶部直接答案。 */
import type { GuideSection } from "../../../lib/guides/schema";

type QuickAnswerSection = Extract<GuideSection, { type: "quick-answer" }>;

export function QuickAnswer({ section }: { section: QuickAnswerSection }) {
  return (
    <div className="guide-quick-answer">
      {section.items.map((item, index) => (
        <article className="guide-quick-answer__card" key={index}>
          <h3>{item.title}</h3>
          {item.body.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
          {item.link ? (
            <a href={item.link} rel="noreferrer" target="_blank">
              {item.linkLabel ?? "查看 →"}
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}
