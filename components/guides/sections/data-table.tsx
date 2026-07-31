/** 文件职责：渲染可筛选 data-table，用于奖励矩阵、对比表等；筛选按行 tags 匹配。 */
import { useState } from "react";

import type { GuideSection } from "../../../lib/guides/schema";

type DataTableSection = Extract<GuideSection, { type: "data-table" }>;

export function DataTable({ section }: { section: DataTableSection }) {
  const [active, setActive] = useState<string>("all");
  const filters = [{ id: "all", label: "全部" }, ...section.filters];
  const rows = section.rows.filter(
    (row) => active === "all" || (row.tags ?? []).includes(active),
  );

  return (
    <div className="guide-data-table">
      {section.caption ? (
        <p className="guide-data-table__caption">{section.caption}</p>
      ) : null}
      {section.filters.length > 0 ? (
        <div className="guide-data-table__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={active === filter.id ? "is-selected" : ""}
              onClick={() => setActive(filter.id)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {section.columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {section.columns.map((column) => (
                  <td
                    dangerouslySetInnerHTML={{
                      __html: row.cells[column.key] ?? "",
                    }}
                    key={column.key}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.note ? <p className="guide-note">{section.note}</p> : null}
    </div>
  );
}
