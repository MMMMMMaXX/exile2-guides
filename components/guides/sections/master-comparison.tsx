/** 文件职责：渲染 master-comparison，三 Master 卡片对比 + 场景推荐表。 */
import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "master-comparison" }>;

export function MasterComparison({ section }: { section: Section }) {
  return (
    <div className="guide-master-comparison">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <div className="guide-master-comparison__masters">
        {section.masters.map((master) => (
          <div className="guide-master-comparison__master" key={master.id}>
            <h3>{master.name}</h3>
            <p className="guide-master-comparison__tagline">{master.tagline}</p>
            <p className="guide-master-comparison__unlock">
              <strong>解锁：</strong>
              {master.unlock}
            </p>
            <div className="guide-master-comparison__cols">
              <div>
                <h4>优势</h4>
                <ul>
                  {master.strengths.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>注意</h4>
                <ul>
                  {master.watchOuts.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <table className="guide-matrix__table">
        <thead>
          <tr>
            <th>目标</th>
            <th>首选 Master</th>
            <th>为什么</th>
            <th>代价</th>
            <th>适合阶段</th>
            <th>核验日期</th>
          </tr>
        </thead>
        <tbody>
          {section.scenarios.map((scenario, index) => (
            <tr key={index}>
              <td>{scenario.goal}</td>
              <td>{scenario.recommendedMaster}</td>
              <td>{scenario.why}</td>
              <td>{scenario.cost}</td>
              <td>{scenario.stage}</td>
              <td>{scenario.verifiedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
