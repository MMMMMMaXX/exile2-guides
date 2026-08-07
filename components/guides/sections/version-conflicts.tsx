/** 文件职责：渲染 version-conflicts，旧推荐在 Hotfix 后的失效 / 冲突记录。 */
import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "version-conflicts" }>;

const statusPill: Record<string, string> = {
  valid: "pill--green",
  outdated: "pill--yellow",
  conflict: "pill--red",
  fixed: "pill--blue",
};

export function VersionConflicts({ section }: { section: Section }) {
  return (
    <div className="guide-version-conflicts">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <ul className="guide-version-conflicts__list">
        {section.conflicts.map((conflict, index) => (
          <li className="guide-version-conflicts__item" key={index}>
            <div className="guide-version-conflicts__head">
              <strong>{conflict.recommendation}</strong>
              <span
                className={`pill ${statusPill[conflict.status] ?? "pill--blue"}`}
              >
                {conflict.status}
              </span>
              <span className="guide-version-conflicts__since">
                自 {conflict.sinceVersion}
              </span>
            </div>
            <p>{conflict.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
