/** 文件职责：渲染变更日志时间线，供各内容模块的 changelog 章节复用。 */

/**
 * 内部生成与审核状态不属于读者可用的版本历史，也不应进入搜索摘要。
 * 这些短语覆盖仓库已发布内容中出现过的十语言旧工作流文案；新增内容应直接写用户可理解的事实变更。
 */
const nonPublicWorkflowPhrases = [
  "pending-pc",
  "machine-draft",
  "Initial version generated from",
  "Erstversion erzeugt",
  "Versión inicial generada",
  "Version initiale générée",
  "初版を生成",
  "초기 버전 생성",
  "Versão inicial gerada",
  "Начальная версия, сгенерированная",
  "oluşturulan ilk sürüm",
  "初始版本：基于",
] as const;

/** 判断一条变更是否描述读者可见的内容更新，而不是内部生产流程。 */
function isPublicChange(change: string): boolean {
  return !nonPublicWorkflowPhrases.some((phrase) => change.includes(phrase));
}

/** 将变更条目按日期渲染为有序列表，并在最终公开 HTML 前移除内部工作流说明。 */
export function ChangelogList({
  entries,
}: {
  entries: readonly { changes: readonly string[]; date: string }[];
}) {
  const publicEntries = entries
    .map((entry) => ({
      ...entry,
      changes: entry.changes.filter(isPublicChange),
    }))
    .filter((entry) => entry.changes.length > 0);

  if (publicEntries.length === 0) return null;

  return (
    <ol>
      {publicEntries.map((entry, index) => (
        <li key={`${entry.date}-${index}`}>
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
