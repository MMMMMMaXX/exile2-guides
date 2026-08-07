/** 文件职责：渲染 activation-timing，Master 切换生效时机规则。 */
import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "activation-timing" }>;

export function ActivationTiming({ section }: { section: Section }) {
  return (
    <div className="guide-activation-timing">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <ul className="guide-activation-timing__rules">
        {section.rules.map((rule, index) => (
          <li className="guide-activation-timing__rule" key={index}>
            <p className="guide-activation-timing__situation">
              {rule.situation}
            </p>
            <p className="guide-activation-timing__effect">
              <strong>生效：</strong>
              {rule.takesEffect}
            </p>
            <p className="guide-activation-timing__note">{rule.note}</p>
          </li>
        ))}
      </ul>
      {section.note ? <p className="guide-note">{section.note}</p> : null}
    </div>
  );
}
