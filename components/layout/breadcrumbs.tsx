/** 文件职责：渲染可访问的面包屑，并保持显示层与 SEO 数据层解耦。 */
import type { BreadcrumbItem } from "../../lib/seo/breadcrumb";

export type { BreadcrumbItem } from "../../lib/seo/breadcrumb";

/** 渲染详情页与列表页共用的路径层级；最后一项只作为当前页文本呈现。 */
export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {isCurrentPage || !item.path ? (
                <span aria-current={isCurrentPage ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <a href={item.path}>{item.label}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
