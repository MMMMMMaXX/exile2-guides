/** 文件职责：渲染变更日志时间线，供各内容模块的 changelog 章节复用。 */

/** 将变更条目按日期渲染为有序列表。 */
export function ChangelogList({
  entries,
}: {
  entries: readonly { changes: readonly string[]; date: string }[];
}) {
  return (
    <ol>
      {entries.map((entry) => (
        <li key={entry.date}>
          <time dateTime={entry.date}>{entry.date}</time>
          <ul>
            {entry.changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
