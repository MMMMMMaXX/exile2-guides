/** 文件职责：展示设计 Token 与基础组件，仅用于开发环境维护和回归检查。 */
const colorTokens = [
  ["Background", "--eg-color-bg"],
  ["Surface", "--eg-color-surface"],
  ["Raised surface", "--eg-color-surface-raised"],
  ["Gold accent", "--eg-color-gold"],
  ["Information", "--eg-color-info"],
  ["Success", "--eg-color-success"],
  ["Danger", "--eg-color-danger"],
] as const;

/** 返回开发演示页元数据，并通过 robots 双重阻止意外索引。 */
export function meta() {
  return [
    { title: "Design System Preview | Exile2 Guides" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

/** 渲染设计系统参考页；这里只展示基础能力，不承载产品业务内容。 */
export default function DesignSystemRoute() {
  return (
    <main className="page-shell design-system">
      <header className="design-system__hero">
        <p className="eyebrow">Development-only reference</p>
        <h1>Exile2 Guides Design System</h1>
        <p className="text-lead">
          Semantic tokens and reusable visual primitives for a readable dark
          fantasy content site.
        </p>
      </header>

      <section className="design-system__section" aria-labelledby="colors">
        <div className="section-heading">
          <p className="eyebrow">Foundations</p>
          <h2 id="colors">Semantic colors</h2>
        </div>
        <div className="token-grid">
          {colorTokens.map(([label, token]) => (
            <article className="token-card" key={token}>
              <span
                className="token-card__swatch"
                style={{ backgroundColor: `var(${token})` }}
              />
              <strong>{label}</strong>
              <code>{token}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="design-system__section" aria-labelledby="typography">
        <div className="section-heading">
          <p className="eyebrow">Foundations</p>
          <h2 id="typography">Typography</h2>
        </div>
        <div className="example-panel typography-samples">
          <h1>Page heading</h1>
          <h2>Section heading</h2>
          <h3>Content group heading</h3>
          <p className="text-lead">
            Lead copy introduces the answer before detailed guide content.
          </p>
          <p>
            Body copy uses a system sans-serif stack and a generous line height
            so long guides remain comfortable to scan on desktop and mobile.
          </p>
          <p className="text-muted">
            Muted text is reserved for metadata and supporting context.
          </p>
        </div>
      </section>

      <section className="design-system__section" aria-labelledby="components">
        <div className="section-heading">
          <p className="eyebrow">Primitives</p>
          <h2 id="components">Controls and surfaces</h2>
        </div>
        <div className="example-panel component-samples">
          <div className="button-row">
            <button className="button button--primary" type="button">
              Primary action
            </button>
            <button className="button button--secondary" type="button">
              Secondary action
            </button>
          </div>
          <article className="surface-card">
            <p className="eyebrow">Patch-aware guide</p>
            <h3>Reusable content surface</h3>
            <p>
              Cards use restrained borders and spacing instead of decorative
              game assets.
            </p>
          </article>
          <aside className="callout callout--info">
            <strong>Information</strong>
            <p>Use callouts only when they improve scanning or safety.</p>
          </aside>
          <aside className="callout callout--danger">
            <strong>Critical mechanic</strong>
            <p>Danger styling is reserved for genuinely important warnings.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
