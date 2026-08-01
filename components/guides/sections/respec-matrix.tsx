/** 文件职责：渲染 respec-matrix，Passive / Weapon Set / Ascendancy 退款边界矩阵。 */
import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "respec-matrix" }>;

export function RespecMatrix({ section }: { section: Section }) {
  return (
    <div className="guide-respec-matrix">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <table className="guide-matrix__table">
        <thead>
          <tr>
            <th>重置类型</th>
            <th>负责 NPC / 方式</th>
            <th>前置条件</th>
            <th>风险</th>
            <th>需要 Trial</th>
            <th>成本</th>
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, index) => (
            <tr key={index}>
              <td>{row.respecType}</td>
              <td>{row.npc}</td>
              <td>{row.prerequisite}</td>
              <td>{row.risk}</td>
              <td>{row.needsTrial ? "是" : "否"}</td>
              <td>{row.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
