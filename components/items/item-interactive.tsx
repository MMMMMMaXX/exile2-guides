/** 文件职责：提供 Items 富内容正文的交互组件（使用/出售/保留决策器、结果筛选表）。 */
import { useState } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import type { ItemSection } from "../../lib/items/schema";

type ItemValuationSection = Extract<ItemSection, { type: "valuation" }>;
type ItemOutcomesSection = Extract<ItemSection, { type: "outcomes" }>;

const labels: Record<
  ContentLocale,
  {
    decisionCondition: string;
    decisionFirst: string;
    decisionRisk: string;
    filterAll: string;
    highRisk: string;
    sell: string;
    hold: string;
    use: string;
  }
> = {
  en: {
    decisionCondition: "Best when",
    decisionFirst: "Confirm first",
    decisionRisk: "Biggest risk",
    filterAll: "All",
    highRisk: "High risk",
    hold: "I want to hold",
    sell: "I want to sell",
    use: "I want to use it",
  },
  "zh-cn": {
    decisionCondition: "适合条件",
    decisionFirst: "先确认",
    decisionRisk: "最大风险",
    filterAll: "全部",
    highRisk: "高风险",
    hold: "我想保留",
    sell: "我想出售",
    use: "我想自用",
  },
};

const riskLabel = (level: string, locale: ContentLocale) =>
  level === "high"
    ? locale === "zh-cn"
      ? "高风险"
      : "High"
    : level === "medium"
      ? locale === "zh-cn"
        ? "中风险"
        : "Medium"
      : locale === "zh-cn"
        ? "低风险"
        : "Low";

// --- 使用 / 出售 / 保留决策器 ---

/** 按玩家目标切换显示使用、出售或保留的前提、条件与风险。 */
export function ItemValuationTabs({
  locale,
  section,
}: {
  locale: ContentLocale;
  section: ItemValuationSection;
}) {
  const [active, setActive] = useState<"use" | "sell" | "hold">("use");
  const text = labels[locale];
  const option = section[active];

  return (
    <div className="item-decision">
      <div className="item-decision-buttons">
        <button
          className={active === "use" ? "selected" : undefined}
          onClick={() => setActive("use")}
          type="button"
        >
          {text.use}
        </button>
        <button
          className={active === "sell" ? "selected" : undefined}
          onClick={() => setActive("sell")}
          type="button"
        >
          {text.sell}
        </button>
        <button
          className={active === "hold" ? "selected" : undefined}
          onClick={() => setActive("hold")}
          type="button"
        >
          {text.hold}
        </button>
      </div>
      <div className="item-decision-panel">
        <div>
          <small>{text.decisionFirst}</small>
          <strong>{option.first}</strong>
        </div>
        <div>
          <small>{text.decisionCondition}</small>
          <strong>{option.condition}</strong>
        </div>
        <div>
          <small>{text.decisionRisk}</small>
          <strong>{option.risk}</strong>
        </div>
        {option.text.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

// --- 结果 / 收益风险筛选表 ---

/** 带筛选按钮的结果矩阵；筛选状态仅存在于客户端。 */
export function ItemOutcomesTable({
  locale,
  section,
}: {
  locale: ContentLocale;
  section: ItemOutcomesSection;
}) {
  const text = labels[locale];
  const anyHigh = section.rows.some((row) => row.level === "high");
  const availableFilters = [
    ...new Set([
      ...section.filters,
      ...(anyHigh ? ["high"] : []),
    ]),
  ];
  const [filter, setFilter] = useState("all");

  const matches = (row: ItemOutcomesSection["rows"][number]) => {
    if (filter === "all") return true;
    if (filter === "high") return row.level === "high";
    return row.tags.includes(filter);
  };

  return (
    <div className="item-outcomes">
      <div className="boss-filter-row">
        <button
          className={filter === "all" ? "selected" : undefined}
          onClick={() => setFilter("all")}
          type="button"
        >
          {text.filterAll}
        </button>
        {availableFilters.map((value) => (
          <button
            className={filter === value ? "selected" : undefined}
            key={value}
            onClick={() => setFilter(value)}
            type="button"
          >
            {value === "high" ? text.highRisk : value}
          </button>
        ))}
      </div>
      <div className="boss-table-wrap">
        <table className="boss-data-table item-outcome-table">
          <thead>
            <tr>
              <th>{locale === "zh-cn" ? "场景" : "Scenario"}</th>
              <th>{locale === "zh-cn" ? "潜在收益" : "Benefit"}</th>
              <th>{locale === "zh-cn" ? "主要风险" : "Risk"}</th>
              <th>{locale === "zh-cn" ? "适合谁" : "Audience"}</th>
              <th>{locale === "zh-cn" ? "建议" : "Verdict"}</th>
            </tr>
          </thead>
          <tbody>
            {section.rows.filter(matches).map((row) => (
              <tr key={row.scenario}>
                <td>
                  <b>{row.scenario}</b>
                </td>
                <td>{row.benefit}</td>
                <td>{row.risk}</td>
                <td>{row.audience}</td>
                <td>
                  <span
                    className={`boss-risk boss-risk--${
                      row.level === "high" ? "high" : row.level
                    }`}
                  >
                    {riskLabel(row.level, locale)}
                  </span>
                  <p>{row.recommendation}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
