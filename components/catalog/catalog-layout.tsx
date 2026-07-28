/** 文件职责：提供 V3 分类目录的三栏响应式壳层，允许各分类复用自身已验证的筛选状态。 */
import type { ReactNode } from "react";

/** 将左侧筛选、内容目录与右侧上下文栏组合为单一布局边界，避免分类路由复制断点结构。 */
export function CatalogLayout({
  children,
  context,
  filters,
}: {
  children: ReactNode;
  context: ReactNode;
  filters: ReactNode;
}) {
  return (
    <div className="page-shell catalog-layout">
      <aside className="catalog-filter panel">{filters}</aside>
      <section className="catalog-main">{children}</section>
      <aside className="catalog-rail">{context}</aside>
    </div>
  );
}
