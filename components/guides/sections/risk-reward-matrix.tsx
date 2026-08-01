/** 文件职责：渲染 risk-reward-matrix，绿黄红分级的风险收益矩阵。 */
import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "risk-reward-matrix" }>;

const riskPill: Record<string, string> = {
  green: "pill--green",
  yellow: "pill--yellow",
  red: "pill--red",
};

export function RiskRewardMatrix({ section }: { section: Section }) {
  return (
    <div className="guide-matrix">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <table className="guide-matrix__table">
        <thead>
          <tr>
            <th>选择</th>
            <th>危险等级</th>
            <th>风险</th>
            <th>收益</th>
            <th>何时选</th>
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, index) => (
            <tr key={index} className={`guide-matrix__row--${row.riskLevel}`}>
              <td>{row.choice}</td>
              <td>
                <span className={`pill ${riskPill[row.riskLevel] ?? "pill--blue"}`}>
                  {row.riskLevel}
                </span>
              </td>
              <td>{row.risk}</td>
              <td>{row.reward}</td>
              <td>{row.when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
