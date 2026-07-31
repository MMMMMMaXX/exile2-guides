/** 文件职责：渲染 diagnostic 交互诊断器，从症状下拉反查原因与修复步骤。 */
import { useState } from "react";

import type { GuideSection } from "../../../lib/guides/schema";

type DiagnosticSection = Extract<GuideSection, { type: "diagnostic" }>;
type DiagnosticResult = {
  link?: string | undefined;
  linkLabel?: string | undefined;
  steps: string[];
  title: string;
};

export function Diagnostic({ section }: { section: DiagnosticSection }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      section.controls.map((control) => [
        control.id,
        control.options[0]?.value ?? "",
      ]),
    ),
  );
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const generate = () => {
    const matched = section.rules.find((rule) =>
      Object.entries(rule.when).every(
        ([key, expected]) => values[key] === expected,
      ),
    );
    const chosen = matched
      ? {
          link: matched.link,
          linkLabel: matched.linkLabel,
          steps: matched.steps,
          title: matched.title,
        }
      : section.defaultResult ?? null;
    setResult(chosen);
  };

  return (
    <div className="guide-diagnostic">
      {section.intro ? (
        <p className="guide-diagnostic__intro">{section.intro}</p>
      ) : null}
      <div className="guide-diagnostic__controls">
        {section.controls.map((control) => (
          <label className="guide-diagnostic__control" key={control.id}>
            <span>{control.label}</span>
            <select
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  [control.id]: event.target.value,
                }))
              }
              value={values[control.id]}
            >
              {control.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
        <button
          className="guide-diagnostic__run"
          onClick={generate}
          type="button"
        >
          生成检查顺序
        </button>
      </div>
      {result ? (
        <div className="guide-diagnostic__result">
          <span>检查顺序</span>
          <h3>{result.title}</h3>
          <ol>
            {result.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          {result.link ? (
            <a href={result.link} rel="noreferrer" target="_blank">
              {result.linkLabel ?? "查看 →"}
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
