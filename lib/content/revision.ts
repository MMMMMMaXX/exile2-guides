/**
 * 文件职责：定义内容修订号（`{slug}-{YYYY-MM-DD}-{sequence}`）的构造与比较工具。
 *
 * 修订号不依赖文件修改时间，由内容生产者显式写入，用于检测翻译是否过期：
 * 当译文的 `translation.sourceRevision` 与英语事实源的 `revision` 不一致时，
 * 该译文标记为 stale。
 */

export type Revision = {
  slug: string;
  date: string;
  sequence: number;
};

const REVISION_PATTERN =
  /^(?<slug>[a-z0-9]+(?:-[a-z0-9]+)*)-(?<date>\d{4}-\d{2}-\d{2})-(?<sequence>\d{2})$/;

/** 由稳定 slug、ISO 日期与当日序号构造规范修订号。 */
export function buildRevision(
  slug: string,
  date: string,
  sequence: number,
): string {
  return `${slug}-${date}-${String(sequence).padStart(2, "0")}`;
}

/** 解析修订号；格式不符时返回 undefined。 */
export function parseRevision(revision: string): Revision | undefined {
  const match = REVISION_PATTERN.exec(revision);
  if (!match?.groups) return undefined;
  const groups = match.groups;
  if (!groups.slug || !groups.date || groups.sequence == null) return undefined;
  return {
    slug: groups.slug,
    date: groups.date,
    sequence: Number(groups.sequence),
  };
}

/**
 * 判断 `current` 是否落后于 `target`：用于检测译文过期。
 * 任一为空或非规范格式时，退化为严格字符串比较（不同即视为落后）。
 */
export function revisionIsBehind(
  current: string | undefined,
  target: string | undefined,
): boolean {
  if (!current || !target) return false;
  const a = parseRevision(current);
  const b = parseRevision(target);
  if (!a || !b) return current !== target;
  if (a.date !== b.date) return a.date < b.date;
  return a.sequence < b.sequence;
}
