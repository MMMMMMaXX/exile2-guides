/** 文件职责：渲染 filter-installation，Loot Filter 安装方法（PC / Console）。 */
import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "filter-installation" }>;

export function FilterInstallation({ section }: { section: Section }) {
  return (
    <div className="guide-filter-install">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <div className="guide-filter-install__methods">
        {section.methods.map((method) => (
          <div className="guide-filter-install__method" key={method.id}>
            <h3>
              {method.name}
              <span className="pill pill--blue">{method.platform}</span>
            </h3>
            <ol className="guide-steps guide-steps--install">
              {method.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            {method.note ? <p className="guide-note">{method.note}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
