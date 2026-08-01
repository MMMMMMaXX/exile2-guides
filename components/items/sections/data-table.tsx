/** 文件职责：渲染可筛选 data-table，用于 Essence 等按槽位 / 阶位枚举的保证词缀矩阵；筛选按行 tags 匹配。 */
import { useState } from "react";

import type { ItemSection } from "../../../lib/items/schema";

type DataTableSection = Extract<ItemSection, { type: "data-table" }>;

export function ItemDataTable({ section }: { section: DataTableSection }) {
  const [active, setActive] = useState<string>("all");
  const filters = [{ id: "all", label: "全部" }, ...section.filters];
  const rows = section.rows.filter(
    (row) => active === "all" || (row.tags ?? []).includes(active),
  );

  return (
    <div className="item-data-table">
      {section.caption ? (
        <p className="item-data-table__caption">{section.caption}</p>
      ) : null}
      {section.filters.length > 0 ? (
        <div className="item-data-table__filters">
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
      <div className="boss-table-wrap">
        <table className="boss-data-table item-data-table__table">
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
      {section.note ? <p className="item-note">{section.note}</p> : null}
    </div>
  );
}
