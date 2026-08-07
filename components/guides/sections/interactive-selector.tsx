/** 文件职责：复用 diagnostic 交互器逻辑，服务 strictness-selector / compatibility-diagnostic / resource-diagnostic。 */
import { useState } from "react";

export type SelectorResult = {
  link?: string | undefined;
  linkLabel?: string | undefined;
  steps: string[];
  title: string;
};

export interface SelectorData {
  intro?: string | undefined;
  controls: {
    id: string;
    label: string;
    options: { label: string; value: string }[];
  }[];
  rules: {
    link?: string | undefined;
    linkLabel?: string | undefined;
    steps: string[];
    title: string;
    when: Record<string, string>;
  }[];
  defaultResult?: SelectorResult | undefined;
}

export function InteractiveSelector({
  section,
  runLabel,
  resultLabel,
}: {
  section: SelectorData;
  runLabel: string;
  resultLabel: string;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      section.controls.map((control) => [
        control.id,
        control.options[0]?.value ?? "",
      ]),
    ),
  );
  const [result, setResult] = useState<SelectorResult | null>(null);

  const generate = () => {
    const matched = section.rules.find((rule) =>
      Object.entries(rule.when).every(
        ([key, expected]) => values[key] === expected,
      ),
    );
    setResult(
      matched
        ? {
            link: matched.link,
            linkLabel: matched.linkLabel,
            steps: matched.steps,
            title: matched.title,
          }
        : (section.defaultResult ?? null),
    );
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
          {runLabel}
        </button>
      </div>
      {result ? (
        <div className="guide-diagnostic__result">
          <span>{resultLabel}</span>
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
