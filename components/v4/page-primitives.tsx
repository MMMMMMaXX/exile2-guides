/** 文件职责：提供 V4 骨架页面可复用的目录、详情、事实、来源、FAQ 与空状态组件，不承载正式攻略结论。 */
import type { ReactNode } from "react";

type LinkItem = { href: string; label: string; note?: string };

/** 渲染 V4 页面英雄区，供分类、子类与详情页复用同一紧凑信息层级。 */
export function PageHero({
  eyebrow,
  title,
  children,
}: {
  children?: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="v4-page-hero">
      <div className="page-shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}

/** 渲染可组合的分类筛选栏；筛选状态由调用页面保留在 URL 或本地状态。 */
export function FilterRail({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <aside className="v4-filter-rail panel">
      <h2>{title}</h2>
      {children}
    </aside>
  );
}

/** 提供结构索引卡片；无详情页的行必须禁用详情入口而非链接到薄页面。 */
export function CatalogCard({
  href,
  meta,
  title,
}: {
  href?: string;
  meta: string;
  title: string;
}) {
  const body = (
    <>
      <span className="content-card__placeholder" aria-hidden="true">
        SK
      </span>
      <span className="content-card__body">
        <span className="content-card__type">Skeleton</span>
        <span className="content-card__title">{title}</span>
        <span className="content-card__meta">{meta}</span>
      </span>
    </>
  );
  return href ? (
    <a className="content-card" href={href}>
      {body}
    </a>
  ) : (
    <article className="content-card content-card--disabled">{body}</article>
  );
}

/** 渲染详情页可降级的目录；小屏由 CSS 回落到普通文档区块。 */
export function StickyToc({ items }: { items: readonly LinkItem[] }) {
  return (
    <aside className="v4-sticky-toc">
      <h2>On this page</h2>
      <nav>
        {items.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

/** 用编号标题包装详情区块，保证所有类型的详情骨架保持扫描顺序。 */
export function DetailSection({
  children,
  id,
  index,
  title,
}: {
  children: ReactNode;
  id: string;
  index: number;
  title: string;
}) {
  return (
    <section className="v4-detail-section" id={id}>
      <span className="v4-detail-section__number">{index}</span>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

/** 展示结构化的快速事实，不将缺失字段替换为虚构数值。 */
export function FactsRail({
  facts,
}: {
  facts: readonly { label: string; value: string }[];
}) {
  return (
    <aside className="v4-facts-rail panel">
      <h2>Quick facts</h2>
      <dl>
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

/** 渲染紧凑数据表，列和行由调用者提供，适合攻击、装备或补丁影响的后续结构数据。 */
export function DataTable({
  columns,
  rows,
}: {
  columns: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className="v4-data-table">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.join("-")}-${index}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** 渲染 FAQ 的原生可展开语义，避免引入浏览器端数据状态。 */
export function FAQ({
  items,
}: {
  items: readonly { answer: string; question: string }[];
}) {
  return (
    <section className="v4-faq">
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}

/** 渲染来源边界；空来源使用 EmptyState 而不产生伪造外链。 */
export function SourceList({ items }: { items: readonly LinkItem[] }) {
  return items.length ? (
    <ul className="v4-source-list">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href}>{item.label}</a>
          {item.note ? <span>{item.note}</span> : null}
        </li>
      ))}
    </ul>
  ) : (
    <EmptyState title="Sources are required before publication" />
  );
}

/** 渲染关联入口；关联数据不足时显示明确的非发布状态。 */
export function RelatedContent({ items }: { items: readonly LinkItem[] }) {
  return (
    <section className="v4-related-content">
      <h2>Related content</h2>
      {items.length ? (
        <nav>
          {items.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      ) : (
        <EmptyState title="Related content will appear after verification" />
      )}
    </section>
  );
}

/** 统一空状态，确保所有聚合和详情骨架对用户说明当前可操作的下一步。 */
export function EmptyState({
  description,
  title,
}: {
  description?: string;
  title: string;
}) {
  return (
    <section className="content-empty-state">
      <h2>{title}</h2>
      <p>
        {description ??
          "This route is ready for reviewed content. No publishable detail is available yet."}
      </p>
    </section>
  );
}
