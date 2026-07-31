/** 文件职责：渲染 Patch 详情页视觉原型所要求的富内容模块（时间线、影响仪表盘、改动浏览器、Before/After、Boss/Item 影响、受影响内容队列、社区证据、技术环境矩阵、已知问题、后续链）。所有文案均与文章语言一致，分类与状态标签由本地化映射提供。 */
import type { ContentLocale } from "../../lib/content/constants";
import type { PatchSection } from "../../lib/patches/schema";

/** 状态与分类标签本地化映射，避免在 JSON 中写入界面词。 */
const i18n: Record<
  ContentLocale,
  {
    new: string;
    buff: string;
    nerf: string;
    fix: string;
    qol: string;
    technical: string;
    atlas: string;
    boss: string;
    item: string;
    balance: string;
    ready: string;
    reviewing: string;
    queued: string;
    open: string;
    tracking: string;
    fixed: string;
    bossKind: string;
    buildKind: string;
    itemKind: string;
    skillKind: string;
    guideKind: string;
    patchKind: string;
    otherKind: string;
    communityLabel: string;
    officialLabel: string;
  }
> = {
  en: {
    new: "New",
    buff: "Buff",
    nerf: "Nerf",
    fix: "Fix",
    qol: "QoL",
    technical: "Technical",
    atlas: "Atlas",
    boss: "Boss",
    item: "Item",
    balance: "Balance",
    ready: "Ready",
    reviewing: "Reviewing",
    queued: "Queued",
    open: "Open",
    tracking: "Tracking",
    fixed: "Fixed",
    bossKind: "Boss",
    buildKind: "Build",
    itemKind: "Item",
    skillKind: "Skill",
    guideKind: "Guide",
    patchKind: "Patch",
    otherKind: "Other",
    communityLabel: "Community report",
    officialLabel: "Official fact",
  },
  "zh-cn": {
    new: "新增",
    buff: "Buff",
    nerf: "Nerf",
    fix: "修复",
    qol: "优化",
    technical: "技术",
    atlas: "Atlas",
    boss: "Boss",
    item: "物品",
    balance: "平衡",
    ready: "已完成",
    reviewing: "复核中",
    queued: "排队",
    open: "待解决",
    tracking: "跟进中",
    fixed: "已修复",
    bossKind: "Boss",
    buildKind: "Build",
    itemKind: "物品",
    skillKind: "技能",
    guideKind: "攻略",
    patchKind: "Patch",
    otherKind: "其他",
    communityLabel: "社区报告",
    officialLabel: "官方事实",
  },
};

const changeCategoryLabel: Record<ContentLocale, Record<string, string>> = {
  en: {
    new: "New",
    buff: "Buff",
    nerf: "Nerf",
    fix: "Fix",
    qol: "QoL",
    technical: "Technical",
    atlas: "Atlas",
    boss: "Boss",
    item: "Item",
    balance: "Balance",
  },
  "zh-cn": {
    new: "新增",
    buff: "Buff",
    nerf: "Nerf",
    fix: "修复",
    qol: "优化",
    technical: "技术",
    atlas: "Atlas",
    boss: "Boss",
    item: "物品",
    balance: "平衡",
  },
};

const affectedTypeLabel: Record<ContentLocale, Record<string, string>> = {
  en: {
    boss: "Boss",
    build: "Build",
    item: "Item",
    skill: "Skill",
    guide: "Guide",
    patch: "Patch",
    other: "Other",
  },
  "zh-cn": {
    boss: "Boss",
    build: "Build",
    item: "物品",
    skill: "技能",
    guide: "攻略",
    patch: "Patch",
    other: "其他",
  },
};

function statusLabel(locale: ContentLocale, status: string): string {
  const map = i18n[locale];
  if (status === "ready") return map.ready;
  if (status === "reviewing") return map.reviewing;
  if (status === "queued") return map.queued;
  if (status === "open") return map.open;
  if (status === "tracking") return map.tracking;
  if (status === "fixed") return map.fixed;
  return status;
}

/** 把文章内容映射成"官方/编辑/社区"三层语义标记，与本项目内容门禁一致。 */
function layerBadge(locale: ContentLocale, scope: string): string {
  const map = i18n[locale];
  if (/official|官方/.test(scope)) return map.officialLabel;
  if (/community|社区/.test(scope)) return map.communityLabel;
  return "";
}

/** Patch Family 时间线：渲染为可联动的版本节点列表。 */
function PatchFamilyTimeline({
  section,
}: {
  section: Extract<PatchSection, { type: "patch-family-timeline" }>;
}) {
  return (
    <ol className="patch-family-timeline">
      {section.versions.map((version) => (
        <li className="patch-family-timeline__node" key={version.code}>
          <div className="patch-family-timeline__meta">
            <span className="patch-family-timeline__code">{version.code}</span>
            <span className="patch-family-timeline__date">{version.date}</span>
            <span className="patch-family-timeline__kind">{version.kind}</span>
          </div>
          <p className="patch-family-timeline__summary">{version.summary}</p>
          {version.tags.length > 0 ? (
            <div className="patch-tag-row">
              {version.tags.map((tag) => (
                <span className="patch-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/** 影响仪表盘：受影响域卡片网格。 */
function PatchImpactDashboard({
  section,
}: {
  section: Extract<PatchSection, { type: "impact-dashboard" }>;
}) {
  return (
    <div className="patch-impact-grid">
      {section.cards.map((card) => (
        <article className="patch-impact-card" key={card.area}>
          <h3>{card.area}</h3>
          <strong>{card.verdict}</strong>
          <p>{card.detail}</p>
        </article>
      ))}
    </div>
  );
}

/** 改动浏览器：每条改动分类/类型/范围清晰标注。 */
function PatchChangeExplorer({
  section,
  locale,
}: {
  section: Extract<PatchSection, { type: "change-explorer" }>;
  locale: ContentLocale;
}) {
  return (
    <div className="patch-change-list">
      {section.changes.map((change, index) => (
        <article
          className={`patch-change-card patch-change-card--${change.category}`}
          key={`${change.category}-${index}`}
        >
          <span className={`patch-change-badge patch-change-badge--${change.category}`}>
            {changeCategoryLabel[locale][change.category] ?? change.category}
          </span>
          <h3>{change.title}</h3>
          <p>{change.detail}</p>
          {change.scope ? (
            <div className="patch-change-meta">
              {layerBadge(locale, change.scope) ? (
                <span>{layerBadge(locale, change.scope)}</span>
              ) : null}
              <span>{change.scope}</span>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

/** Before/After 对照。 */
function PatchBeforeAfter({
  section,
}: {
  section: Extract<PatchSection, { type: "before-after" }>;
}) {
  return (
    <div className="patch-before-after">
      <div className="patch-before-after__old">
        <span className="patch-before-after__label">{section.oldLabel}</span>
        <strong>{section.oldText}</strong>
      </div>
      <div className="patch-before-after__arrow" aria-hidden="true">
        →
      </div>
      <div className="patch-before-after__new">
        <span className="patch-before-after__label">{section.newLabel}</span>
        <strong>{section.newText}</strong>
      </div>
    </div>
  );
}

/** Boss 影响网格。 */
function PatchBossImpact({
  section,
}: {
  section: Extract<PatchSection, { type: "boss-impact" }>;
}) {
  return (
    <div className="patch-boss-grid">
      {section.bosses.map((boss) => (
        <article className="patch-boss-card" key={boss.name}>
          <h3>{boss.name}</h3>
          <p>{boss.detail}</p>
          <span className="patch-boss-card__action">{boss.action}</span>
        </article>
      ))}
    </div>
  );
}

/** Item 影响标签页（CSS-only radio 切换，兼容 SSR，无需客户端脚本）。 */
function PatchItemImpact({
  section,
}: {
  section: Extract<PatchSection, { type: "item-impact" }>;
}) {
  const group = `patch-item-${section.id}`;
  return (
    <div className="patch-item-tabs">
      <div className="patch-item-tab-buttons">
        {section.items.map((entry, index) => (
          <label className="patch-item-tab-button" key={entry.title}>
            <input
              defaultChecked={index === 0}
              name={group}
              type="radio"
              value={entry.title}
            />
            <span>{entry.title}</span>
          </label>
        ))}
      </div>
      <div className="patch-item-panel">
        {section.items.map((entry, index) => (
          <div
            className="patch-item-panel__block"
            data-patch-item-panel={entry.title}
            key={entry.title}
            style={{ order: index }}
          >
            <p className="patch-section-kicker">{entry.kind}</p>
            <h3>{entry.title}</h3>
            <p>{entry.detail}</p>
            {entry.tags.length > 0 ? (
              <div className="patch-tag-row">
                {entry.tags.map((tag) => (
                  <span className="patch-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 受影响内容更新队列：状态表格 + 统计。 */
function PatchAffectedContent({
  section,
  locale,
}: {
  section: Extract<PatchSection, { type: "affected-content" }>;
  locale: ContentLocale;
}) {
  const counts = section.rows.reduce(
    (acc, row) => {
      acc[row.status] = (acc[row.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  return (
    <div className="patch-affected">
      <div className="patch-affected__stats">
        <span>
          <b>{section.rows.length}</b>{" "}
          {locale === "zh-cn" ? "受影响" : "affected"}
        </span>
        <span>
          <b>{counts.ready ?? 0}</b>{" "}
          {locale === "zh-cn" ? "已更新" : "updated"}
        </span>
        <span>
          <b>{counts.reviewing ?? 0}</b>{" "}
          {locale === "zh-cn" ? "复核中" : "reviewing"}
        </span>
        <span>
          <b>{counts.queued ?? 0}</b> {locale === "zh-cn" ? "排队" : "queued"}
        </span>
      </div>
      <div className="patch-table-wrap">
        <table className="patch-data-table patch-affected__table">
          <thead>
            <tr>
              <th>{locale === "zh-cn" ? "内容" : "Content"}</th>
              <th>{locale === "zh-cn" ? "类型" : "Type"}</th>
              <th>{locale === "zh-cn" ? "触发改动" : "Trigger"}</th>
              <th>{locale === "zh-cn" ? "动作" : "Action"}</th>
              <th>{locale === "zh-cn" ? "状态" : "Status"}</th>
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, index) => (
              <tr data-patch-qstatus={row.status} key={`${row.name}-${index}`}>
                <td>
                  <b>{row.name}</b>
                </td>
                <td>{affectedTypeLabel[locale][row.type] ?? row.type}</td>
                <td>{row.trigger}</td>
                <td>{row.action}</td>
                <td>
                  <span className={`patch-status patch-status--${row.status}`}>
                    {statusLabel(locale, row.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="patch-affected__progress">
        <span
          style={{
            width: `${Math.round(
              ((counts.ready ?? 0) + (counts.reviewing ?? 0)) /
                Math.max(section.rows.length, 1) *
                100,
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

/** 社区证据：报告卡片 + 本站分析。 */
function PatchCommunityEvidence({
  section,
}: {
  section: Extract<PatchSection, { type: "community-evidence" }>;
}) {
  return (
    <div className="patch-community-grid">
      {section.reports.map((report, index) => (
        <article className="patch-community-card" key={index}>
          <div className="patch-community-card__meta">
            <span className="patch-community-card__source">{report.source}</span>
            <span className="patch-community-card__context">{report.context}</span>
          </div>
          <blockquote>{report.quote}</blockquote>
          <div className="patch-community-card__analysis">
            <b>{report.analysis}</b>
          </div>
        </article>
      ))}
    </div>
  );
}

/** 技术环境矩阵。 */
function PatchTechnicalEnvironment({
  section,
}: {
  section: Extract<PatchSection, { type: "technical-environment" }>;
}) {
  return (
    <div className="patch-technical-grid">
      {section.environments.map((entry) => (
        <article className="patch-technical-card" key={entry.key}>
          <h3>{entry.key}</h3>
          <p>{entry.note}</p>
        </article>
      ))}
    </div>
  );
}

/** 已知问题面板。 */
function PatchKnownIssues({
  section,
  locale,
}: {
  section: Extract<PatchSection, { type: "known-issues" }>;
  locale: ContentLocale;
}) {
  return (
    <ul className="patch-known-issues">
      {section.issues.map((issue, index) => (
        <li
          className={`patch-known-issues__item patch-known-issues__item--${issue.status}`}
          key={index}
        >
          <span className="patch-known-issues__status">
            {statusLabel(locale, issue.status)}
          </span>
          <span>{issue.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** Patch 后续链。 */
function PatchFollowup({
  section,
}: {
  section: Extract<PatchSection, { type: "patch-followup" }>;
}) {
  return (
    <ul className="patch-followup-chain">
      {section.children.map((child, index) => (
        <li className="patch-followup-chain__item" key={index}>
          <span className="patch-followup-chain__code">{child.code}</span>
          <span className="patch-followup-chain__relation">{child.relation}</span>
        </li>
      ))}
    </ul>
  );
}

/** 富内容章节统一出口，供 PatchSectionRenderer 调用。 */
export function renderPatchRichSection(
  section: PatchSection,
  locale: ContentLocale,
): React.ReactNode {
  switch (section.type) {
    case "patch-family-timeline":
      return <PatchFamilyTimeline section={section} />;
    case "impact-dashboard":
      return <PatchImpactDashboard section={section} />;
    case "change-explorer":
      return <PatchChangeExplorer section={section} locale={locale} />;
    case "before-after":
      return <PatchBeforeAfter section={section} />;
    case "boss-impact":
      return <PatchBossImpact section={section} />;
    case "item-impact":
      return <PatchItemImpact section={section} />;
    case "affected-content":
      return <PatchAffectedContent section={section} locale={locale} />;
    case "community-evidence":
      return <PatchCommunityEvidence section={section} />;
    case "technical-environment":
      return <PatchTechnicalEnvironment section={section} />;
    case "known-issues":
      return <PatchKnownIssues section={section} locale={locale} />;
    case "patch-followup":
      return <PatchFollowup section={section} />;
    default:
      return null;
  }
}
