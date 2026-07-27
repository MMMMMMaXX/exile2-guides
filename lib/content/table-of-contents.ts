/** 文件职责：从 Markdown 正文提取稳定目录，并在构建期为对应 HTML 标题补充锚点。 */

export type TableOfContentsItem = {
  id: string;
  level: 2 | 3;
  text: string;
};

/** 清理常见行内 Markdown 标记，使目录文本保持可读且不依赖渲染器实现。 */
function toPlainHeadingText(value: string): string {
  return value
    .replace(/!?(?:\[([^\]]+)\]\([^)]*\))/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

/** 将标题转换为可重复生成的锚点；重复标题由调用处追加序号以防止链接冲突。 */
function toHeadingId(text: string, fallbackIndex: number): string {
  const normalized = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || `section-${fallbackIndex}`;
}

/** 仅提取 H2/H3，保持 PRD 指定的文章目录层级，避免标题过多导致侧栏不可读。 */
export function extractTableOfContents(
  markdown: string,
): TableOfContentsItem[] {
  const headingPattern = /^(#{2,3})\s+(.+?)\s*#*\s*$/gm;
  const ids = new Map<string, number>();
  const items: TableOfContentsItem[] = [];

  for (const match of markdown.matchAll(headingPattern)) {
    const marker = match[1];
    const rawText = match[2];
    if (!marker || !rawText) continue;

    const text = toPlainHeadingText(rawText);
    if (!text) continue;

    const baseId = toHeadingId(text, items.length + 1);
    const occurrence = (ids.get(baseId) ?? 0) + 1;
    ids.set(baseId, occurrence);
    items.push({
      id: occurrence === 1 ? baseId : `${baseId}-${occurrence}`,
      level: marker.length as 2 | 3,
      text,
    });
  }

  return items;
}

/** 将目录锚点按 HTML 标题出现顺序写入正文，确保点击目录可直接跳转到静态内容。 */
export function addHeadingAnchors(
  html: string,
  tableOfContents: readonly TableOfContentsItem[],
): string {
  let headingIndex = 0;
  return html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g,
    (fullMatch, level: string, attributes: string, content: string) => {
      const item = tableOfContents[headingIndex];
      if (!item || Number(level) !== item.level) return fullMatch;
      headingIndex += 1;
      return `<h${level}${attributes} id="${item.id}">${content}</h${level}>`;
    },
  );
}
