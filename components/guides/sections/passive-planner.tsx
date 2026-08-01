/** 文件职责：渲染 passive-planner，至多四点的 Atlas Master 节点交互分配器。 */
import { useState } from "react";

import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "passive-planner" }>;

export function PassivePlanner({ section }: { section: Section }) {
  const [activeMasterId, setActiveMasterId] = useState(
    section.masters[0]?.id ?? "",
  );
  const activeMaster =
    section.masters.find((master) => master.id === activeMasterId) ??
    section.masters[0];
  const cap = activeMaster?.maxPoints ?? section.maxPoints ?? 4;
  const [allocated, setAllocated] = useState<Record<string, number>>({});

  const used = Object.values(allocated).reduce((sum, n) => sum + n, 0);
  const remaining = Math.max(0, cap - used);

  const bump = (nodeId: string, delta: number) => {
    setAllocated((prev) => {
      const current = prev[nodeId] ?? 0;
      const next = Math.max(0, current + delta);
      const projected = used - current + next;
      if (projected > cap) return prev;
      return { ...prev, [nodeId]: next };
    });
  };

  if (!activeMaster) return null;

  return (
    <div className="guide-passive-planner">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <div className="guide-passive-planner__masters">
        {section.masters.map((master) => (
          <button
            className={
              master.id === activeMasterId
                ? "is-selected"
                : ""
            }
            key={master.id}
            onClick={() => setActiveMasterId(master.id)}
            type="button"
          >
            {master.name}
          </button>
        ))}
      </div>
      <p className="guide-passive-planner__status">
        已分配 <strong>{used}</strong> / {cap} 点 · 剩余 {remaining} 点
      </p>
      <ul className="guide-passive-planner__nodes">
        {activeMaster.nodes.map((node) => {
          const points = allocated[node.id] ?? 0;
          return (
            <li className="guide-passive-planner__node" key={node.id}>
              <div className="guide-passive-planner__node-head">
                <strong>{node.name}</strong>
                <span className="pill pill--purple">{node.tier}</span>
              </div>
              <p>{node.effect}</p>
              <div className="guide-passive-planner__controls">
                <button onClick={() => bump(node.id, -1)} type="button">
                  −
                </button>
                <span>{points}</span>
                <button
                  disabled={remaining <= 0}
                  onClick={() => bump(node.id, 1)}
                  type="button"
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
