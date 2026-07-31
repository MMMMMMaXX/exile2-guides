/** 文件职责：渲染 stat-grid 关键数字概览，用于进度与总量速览。 */
import type { GuideSection } from "../../../lib/guides/schema";

type StatGridSection = Extract<GuideSection, { type: "stat-grid" }>;

export function StatGrid({ section }: { section: StatGridSection }) {
  return (
    <div className="guide-stat-grid">
      <div className="guide-stat-grid__items">
        {section.stats.map((stat, index) => (
          <div className="guide-stat-grid__item" key={index}>
            <b>{stat.value}</b>
            <span>{stat.label}</span>
            {stat.note ? <small>{stat.note}</small> : null}
          </div>
        ))}
      </div>
      {section.note ? <p className="guide-note">{section.note}</p> : null}
    </div>
  );
}
