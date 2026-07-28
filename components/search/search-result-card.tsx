/** 文件职责：渲染 V3 搜索结果的横向卡片，保持结果数据仅来自生成的本地搜索索引。 */
import type { SearchDocument } from "../../lib/search/search-index";

const typeLabel: Record<SearchDocument["category"], string> = {
  boss: "Boss",
  build: "Build",
  guide: "Guide",
  item: "Item",
  patch: "Patch",
  skill: "Skill",
};

/** 输出可整卡点击的搜索结果；缺少图像字段时使用类别媒体块而不伪造游戏素材。 */
export function SearchResultCard({ document }: { document: SearchDocument }) {
  return (
    <article className="search-page-result">
      <a href={document.path}>
        <span
          aria-hidden="true"
          className={`search-page-result__media search-page-result__media--${document.category}`}
        >
          {typeLabel[document.category].slice(0, 2).toUpperCase()}
        </span>
        <span>
          <span className="content-card__type">
            {typeLabel[document.category]}
          </span>
          <strong>{document.title}</strong>
          <small>{document.description}</small>
        </span>
        <b aria-hidden="true">→</b>
      </a>
    </article>
  );
}
