/** 文件职责：渲染带标题行的对比表格，供各内容模块的 comparison-table 章节复用。 */

/** 将列标题和行数据渲染为可横向滚动的表格。 */
export function ComparisonTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: readonly string[];
  rows: readonly { cells: readonly string[]; label: string }[];
}) {
  return (
    <figure className="build-comparison-table">
      <div className="build-comparison-table__scroller">
        <table>
          <thead>
            <tr>
              <th scope="col" />
              {columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.cells.map((cell, index) => (
                  <td key={`${row.label}:${columns[index] ?? index}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
