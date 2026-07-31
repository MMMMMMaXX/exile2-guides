/** 文件职责：渲染 tabs 标签切换面板，用于阶段、模式、平台等切换说明。 */
import { useState } from "react";

import type { GuideSection } from "../../../lib/guides/schema";

type TabsSection = Extract<GuideSection, { type: "tabs" }>;

export function Tabbed({ section }: { section: TabsSection }) {
  const firstId = section.tabs[0]?.id ?? "";
  const [active, setActive] = useState<string>(firstId);
  const current =
    section.tabs.find((tab) => tab.id === active) ?? section.tabs[0];

  return (
    <div className="guide-tabs">
      {section.intro ? (
        <p className="guide-tabs__intro">{section.intro}</p>
      ) : null}
      <div className="guide-tabs__list" role="tablist">
        {section.tabs.map((tab) => (
          <button
            aria-selected={tab.id === active}
            className={tab.id === active ? "is-selected" : ""}
            key={tab.id}
            onClick={() => setActive(tab.id)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {current ? (
        <div className="guide-tabs__panel">
          {current.paragraphs.map((paragraph, index) => (
            <p key={`p${index}`}>{paragraph}</p>
          ))}
          {current.bullets.length > 0 ? (
            <ul>
              {current.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          {current.steps.length > 0 ? (
            <ol className="guide-steps guide-steps--tabs">
              {current.steps.map((step, index) => (
                <li key={index}>
                  <h4>{step.label}</h4>
                  {step.body.map((paragraph, bodyIndex) => (
                    <p key={bodyIndex}>{paragraph}</p>
                  ))}
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
