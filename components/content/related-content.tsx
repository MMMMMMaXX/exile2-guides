/** 文件职责：展示已由内容索引解析完成的关联内容，保持关联规则与视图层解耦。 */
import { ContentCard, type ContentCardData } from "./content-card";

/** 渲染关联内容卡片；调用方必须传入已发布且同语言可访问的条目。 */
export function RelatedContent({
  items,
  title = "Related content",
}: {
  items: readonly ContentCardData[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section
      className="related-content"
      aria-labelledby="related-content-heading"
    >
      <h2 id="related-content-heading">{title}</h2>
      <div className="related-content__grid">
        {items.map((item) => (
          <ContentCard key={item.href} content={item} />
        ))}
      </div>
    </section>
  );
}
