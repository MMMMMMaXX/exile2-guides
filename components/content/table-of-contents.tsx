/** 文件职责：展示构建期提取的文章目录，并在浏览器中同步当前阅读章节。 */
import { useEffect, useState } from "react";

import type { TableOfContentsItem } from "../../lib/content/table-of-contents";

/** 监听目录对应标题，返回当前最接近阅读位置的章节锚点。 */
function useActiveHeadingId(
  items: readonly TableOfContentsItem[],
): string | undefined {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    if (items.length === 0 || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const visibleIds = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleIds.add(entry.target.id);
          else visibleIds.delete(entry.target.id);
        }
        const firstVisibleItem = items.find((item) => visibleIds.has(item.id));
        if (firstVisibleItem) setActiveId(firstVisibleItem.id);
      },
      { rootMargin: "-18% 0px -70% 0px" },
    );

    for (const item of items) {
      const heading = document.getElementById(item.id);
      if (heading) observer.observe(heading);
    }

    return () => observer.disconnect();
  }, [items]);

  return activeId;
}

/** 渲染一份目录链接列表，供桌面侧栏和移动端折叠面板共享。 */
function TableOfContentsLinks({
  activeId,
  items,
}: {
  activeId?: string | undefined;
  items: readonly TableOfContentsItem[];
}) {
  return (
    <ol className="table-of-contents__list">
      {items.map((item) => (
        <li key={item.id} data-level={item.level}>
          <a
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "location" : undefined}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** 同时输出桌面侧栏与移动折叠目录；没有 H2/H3 时不占用任何版面。 */
export function TableOfContents({
  items,
  variant,
}: {
  items: readonly TableOfContentsItem[];
  variant: "desktop" | "mobile";
}) {
  const activeId = useActiveHeadingId(items);
  if (items.length === 0) return null;

  if (variant === "mobile") {
    return (
      <details className="table-of-contents table-of-contents--mobile">
        <summary>On this page</summary>
        <TableOfContentsLinks activeId={activeId} items={items} />
      </details>
    );
  }

  return (
    <aside className="table-of-contents table-of-contents--desktop">
      <p className="table-of-contents__title">On this page</p>
      <TableOfContentsLinks activeId={activeId} items={items} />
    </aside>
  );
}
