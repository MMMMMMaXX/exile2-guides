/** 文件职责：渲染 map-modifier-matrix，Waystone 词缀按 Build 类型定危险等级。 */
import type { GuideSection } from "../../../lib/guides/schema";

type Section = Extract<GuideSection, { type: "map-modifier-matrix" }>;

const dangerPill: Record<string, string> = {
  green: "pill--green",
  yellow: "pill--yellow",
  red: "pill--red",
};

export function MapModifierMatrix({ section }: { section: Section }) {
  return (
    <div className="guide-matrix">
      {section.intro ? <p className="guide-note">{section.intro}</p> : null}
      <table className="guide-matrix__table">
        <thead>
          <tr>
            <th>词缀</th>
            <th>影响对象</th>
            <th>危险等级</th>
            <th>症状</th>
            <th>处理</th>
            <th>版本</th>
          </tr>
        </thead>
        <tbody>
          {section.modifiers.map((modifier, index) => (
            <tr key={index} className={`guide-matrix__row--${modifier.danger}`}>
              <td>{modifier.modifier}</td>
              <td>{modifier.affects}</td>
              <td>
                <span
                  className={`pill ${dangerPill[modifier.danger] ?? "pill--blue"}`}
                >
                  {modifier.danger}
                </span>
              </td>
              <td>{modifier.symptom}</td>
              <td>{modifier.action}</td>
              <td>{modifier.version}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
