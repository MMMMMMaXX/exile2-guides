/** 文件职责：渲染 cost-breakdown，重置 / 材料成本明细。 */
import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "cost-breakdown" }>;

export function CostBreakdown({ section }: { section: Section }) {
  return (
    <div className="guide-cost-breakdown">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <table className="guide-matrix__table">
        <thead>
          <tr>
            <th>项目</th>
            <th>成本</th>
            <th>说明</th>
            <th>货币</th>
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, index) => (
            <tr key={index}>
              <td>{row.item}</td>
              <td>{row.cost}</td>
              <td>{row.detail ?? "—"}</td>
              <td>{row.currency ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {section.note ? <p className="guide-note">{section.note}</p> : null}
    </div>
  );
}
