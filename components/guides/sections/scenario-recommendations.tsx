/** 文件职责：渲染 scenario-recommendations，场景 → 推荐 Master 与依据表。 */
import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "scenario-recommendations" }>;

export function ScenarioRecommendations({ section }: { section: Section }) {
  return (
    <div className="guide-scenario-recs">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <table className="guide-matrix__table">
        <thead>
          <tr>
            <th>场景</th>
            <th>推荐 Master</th>
            <th>候选</th>
            <th>依据</th>
            <th>代价</th>
            <th>核验日期</th>
          </tr>
        </thead>
        <tbody>
          {section.scenarios.map((scenario) => (
            <tr key={scenario.id}>
              <td>{scenario.scenario}</td>
              <td>{scenario.recommendedMaster}</td>
              <td>{scenario.alternatives}</td>
              <td>{scenario.rationale}</td>
              <td>{scenario.cost}</td>
              <td>{scenario.verifiedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
