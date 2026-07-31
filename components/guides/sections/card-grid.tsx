/** 文件职责：渲染 card-grid 卡片网格，用于路线步骤、社区证据、用例等。 */
import type { GuideSection } from "../../../lib/guides/schema";

type CardGridSection = Extract<GuideSection, { type: "card-grid" }>;

export function CardGrid({ section }: { section: CardGridSection }) {
  return (
    <div className="guide-card-grid">
      {section.intro ? (
        <p className="guide-card-grid__intro">{section.intro}</p>
      ) : null}
      <div className="guide-card-grid__items">
        {section.cards.map((card, index) => (
          <article className="guide-card-grid__card" key={index}>
            {card.tag ? (
              <span className="guide-card-grid__tag">{card.tag}</span>
            ) : null}
            <h3>{card.title}</h3>
            {card.body.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}
            {card.link ? (
              <a href={card.link} rel="noreferrer" target="_blank">
                {card.linkLabel ?? "查看 →"}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
