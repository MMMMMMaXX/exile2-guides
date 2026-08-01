/** 文件职责：渲染 master-unlock-route，逐 Master 的解锁位置与四点分配步骤。 */
import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "master-unlock-route" }>;

export function MasterUnlockRoute({ section }: { section: Section }) {
  return (
    <div className="guide-master-unlock">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <div className="guide-master-unlock__masters">
        {section.masters.map((master) => (
          <div className="guide-master-unlock__master" key={master.id}>
            <h3>{master.name}</h3>
            <p className="guide-master-unlock__location">
              <strong>位置：</strong>
              {master.location}
            </p>
            <ol className="guide-steps guide-steps--unlock">
              {master.unlockSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
