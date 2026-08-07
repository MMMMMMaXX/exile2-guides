/** 文件职责：渲染 Patch 详情页视觉原型所要求的富内容模块（时间线、影响仪表盘、改动浏览器、Before/After、Boss/Item 影响、受影响内容队列、社区证据、技术环境矩阵、已知问题、后续链）。所有文案均与文章语言一致，分类与状态标签由本地化映射提供。 */
import type { ContentLocale } from "../../lib/content/constants";
import type { PatchSection } from "../../lib/patches/schema";

/** 状态与分类标签本地化映射，避免在 JSON 中写入界面词。 */
const i18n: Record<
  "en" | "zh-cn",
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

const changeCategoryLabel: Record<"en" | "zh-cn", Record<string, string>> = {
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

const affectedTypeLabel: Record<"en" | "zh-cn", Record<string, string>> = {
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
  const map = i18n[locale === "zh-cn" ? "zh-cn" : "en"];
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
  const map = i18n[locale === "zh-cn" ? "zh-cn" : "en"];
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
          <span
            className={`patch-change-badge patch-change-badge--${change.category}`}
          >
            {changeCategoryLabel[locale === "zh-cn" ? "zh-cn" : "en"][
              change.category
            ] ?? change.category}
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
          <b>{counts.ready ?? 0}</b> {locale === "zh-cn" ? "已更新" : "updated"}
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
                <td>
                  {affectedTypeLabel[locale === "zh-cn" ? "zh-cn" : "en"][
                    row.type
                  ] ?? row.type}
                </td>
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
              (((counts.ready ?? 0) + (counts.reviewing ?? 0)) /
                Math.max(section.rows.length, 1)) *
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
            <span className="patch-community-card__source">
              {report.source}
            </span>
            <span className="patch-community-card__context">
              {report.context}
            </span>
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
          <span className="patch-followup-chain__relation">
            {child.relation}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** 历史 Patch 富模块 i18n（状态/优先级/横幅/表头），与文章语言一致。 */
const historicalI18n: Record<
  "en" | "zh-cn",
  {
    stillCurrent: string;
    changedLater: string;
    removed: string;
    unknown: string;
    high: string;
    medium: string;
    low: string;
    historical: string;
    partiallyCurrent: string;
    superseded: string;
    baseline: string;
    notCurrentClient: string;
    lastChecked: string;
    applicabilityBoard: string;
    thenVsNow: string;
    supersededBy: string;
    priority: string;
    introduces: string;
    dependsOn: string;
    breaks: string;
    from: string;
    to: string;
    status: string;
  }
> = {
  en: {
    stillCurrent: "Still current",
    changedLater: "Changed later",
    removed: "Removed",
    unknown: "Needs verification",
    high: "High",
    medium: "Medium",
    low: "Low",
    historical: "Historical Patch",
    partiallyCurrent: "Partially current",
    superseded: "Superseded",
    baseline: "Current comparison baseline",
    notCurrentClient: "Not the current client version",
    lastChecked: "Last checked against current content",
    applicabilityBoard: "Current Applicability Board",
    thenVsNow: "Then vs Now",
    supersededBy: "Superseded by",
    priority: "Priority",
    introduces: "Introduces",
    dependsOn: "Depends on",
    breaks: "Breaks",
    from: "From",
    to: "To",
    status: "Status",
  },
  "zh-cn": {
    stillCurrent: "仍然有效",
    changedLater: "后续已修改",
    removed: "已移除",
    unknown: "待核实",
    high: "高",
    medium: "中",
    low: "低",
    historical: "历史版本",
    partiallyCurrent: "部分仍适用",
    superseded: "已被取代",
    baseline: "当前对照基线",
    notCurrentClient: "非当前客户端版本",
    lastChecked: "最近对照当前内容核验",
    applicabilityBoard: "当前适用性看板",
    thenVsNow: "新旧对照",
    supersededBy: "被以下版本取代",
    priority: "优先级",
    introduces: "引入",
    dependsOn: "依赖",
    breaks: "破坏",
    from: "旧",
    to: "新",
    status: "状态",
  },
};

function applicabilityStatusLabel(
  locale: ContentLocale,
  status: string,
): string {
  const map = historicalI18n[locale === "zh-cn" ? "zh-cn" : "en"];
  if (status === "still-current") return map.stillCurrent;
  if (status === "changed-later") return map.changedLater;
  if (status === "removed") return map.removed;
  if (status === "unknown") return map.unknown;
  return status;
}

function priorityLabel(locale: ContentLocale, priority: string): string {
  const map = historicalI18n[locale === "zh-cn" ? "zh-cn" : "en"];
  if (priority === "high") return map.high;
  if (priority === "medium") return map.medium;
  if (priority === "low") return map.low;
  return priority;
}

/** 历史背景：所处时代 + 当前对照基线 + 叙述。 */
function PatchHistoricalContext({
  section,
}: {
  section: Extract<PatchSection, { type: "historical-context" }>;
}) {
  return (
    <div className="patch-historical-context">
      <p className="patch-historical-context__era">{section.era}</p>
      <p className="patch-historical-context__baseline">
        {section.baselineNote}
      </p>
      {section.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {section.bullets.length > 0 ? (
        <ul>
          {section.bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** 当前适用性看板：逐项记录机制在 0.5.4e 是否仍有效。 */
function PatchCurrentApplicability({
  section,
  locale,
}: {
  section: Extract<PatchSection, { type: "current-applicability" }>;
  locale: ContentLocale;
}) {
  return (
    <div className="patch-current-applicability">
      <div className="patch-table-wrap">
        <table className="patch-data-table patch-current-applicability__table">
          <thead>
            <tr>
              <th>{locale === "zh-cn" ? "机制" : "Mechanic"}</th>
              <th>
                {historicalI18n[locale === "zh-cn" ? "zh-cn" : "en"].status}
              </th>
              <th>
                {locale === "zh-cn"
                  ? "当前规则（0.5.4e）"
                  : "Current rule (0.5.4e)"}
              </th>
              <th>
                {
                  historicalI18n[locale === "zh-cn" ? "zh-cn" : "en"]
                    .supersededBy
                }
              </th>
              <th>{locale === "zh-cn" ? "应读页面" : "Read"}</th>
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, index) => (
              <tr data-patch-app-status={row.status} key={index}>
                <td>
                  <b>{row.topic}</b>
                </td>
                <td>
                  <span
                    className={`patch-app-status patch-app-status--${row.status}`}
                  >
                    {applicabilityStatusLabel(locale, row.status)}
                  </span>
                </td>
                <td>{row.currentSummary}</td>
                <td>{row.supersededBy}</td>
                <td>{row.affectedContent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Then vs Now 对照矩阵。 */
function PatchThenVsNow({
  section,
  locale,
}: {
  section: Extract<PatchSection, { type: "then-vs-now" }>;
  locale: ContentLocale;
}) {
  return (
    <div className="patch-then-now">
      {section.rows.map((row, index) => (
        <div className="patch-then-now__row" key={index}>
          <p className="patch-then-now__aspect">{row.aspect}</p>
          <div className="patch-then-now__cols">
            <div className="patch-then-now__then">
              <span className="patch-then-now__label">
                {locale === "zh-cn" ? "旧版本" : "Then"}
              </span>
              <p>{row.thenText}</p>
            </div>
            <div className="patch-then-now__now">
              <span className="patch-then-now__label">
                {locale === "zh-cn" ? "当前 0.5.4e" : "Now"}
              </span>
              <p>{row.nowText}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** 被取代的变更列表。 */
function PatchSupersededChanges({
  section,
  locale,
}: {
  section: Extract<PatchSection, { type: "superseded-changes" }>;
  locale: ContentLocale;
}) {
  const map = historicalI18n[locale === "zh-cn" ? "zh-cn" : "en"];
  return (
    <ul className="patch-superseded">
      {section.items.map((item, index) => (
        <li className="patch-superseded__item" key={index}>
          <p className="patch-superseded__change">{item.change}</p>
          <p className="patch-superseded__meta">
            <span>{map.supersededBy}</span> {item.byPatch}
          </p>
          <p className="patch-superseded__replacement">{item.replacement}</p>
        </li>
      ))}
    </ul>
  );
}

/** 回归玩家清单：按优先级排列必须重新学习的内容。 */
function PatchReturningPlayerChecklist({
  section,
  locale,
}: {
  section: Extract<PatchSection, { type: "returning-player-checklist" }>;
  locale: ContentLocale;
}) {
  return (
    <div className="patch-returning">
      {section.items.map((item, index) => (
        <div
          className={`patch-returning__item patch-returning__item--${item.priority}`}
          key={index}
        >
          <span className="patch-returning__priority">
            {priorityLabel(locale, item.priority)}
          </span>
          <div>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** 站内旧内容审计表。 */
function PatchLegacyContentAudit({
  section,
  locale,
}: {
  section: Extract<PatchSection, { type: "legacy-content-audit" }>;
  locale: ContentLocale;
}) {
  return (
    <div className="patch-legacy-audit">
      <div className="patch-table-wrap">
        <table className="patch-data-table patch-legacy-audit__table">
          <thead>
            <tr>
              <th>{locale === "zh-cn" ? "站内页面" : "Page"}</th>
              <th>{locale === "zh-cn" ? "类型" : "Type"}</th>
              <th>{locale === "zh-cn" ? "问题" : "Issue"}</th>
              <th>{locale === "zh-cn" ? "动作" : "Action"}</th>
              <th>{locale === "zh-cn" ? "状态" : "Status"}</th>
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, index) => (
              <tr data-patch-qstatus={row.status} key={index}>
                <td>
                  <b>{row.contentId}</b>
                </td>
                <td>
                  {affectedTypeLabel[locale === "zh-cn" ? "zh-cn" : "en"][
                    row.kind
                  ] ?? row.kind}
                </td>
                <td>{row.issue}</td>
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
    </div>
  );
}

/** 版本依赖图。 */
function PatchVersionDependencyMap({
  section,
  locale,
}: {
  section: Extract<PatchSection, { type: "version-dependency-map" }>;
  locale: ContentLocale;
}) {
  const map = historicalI18n[locale === "zh-cn" ? "zh-cn" : "en"];
  return (
    <div className="patch-version-map">
      {section.nodes.map((node, index) => (
        <div className="patch-version-map__node" key={index}>
          <h3 className="patch-version-map__version">{node.version}</h3>
          <dl className="patch-version-map__dl">
            <dt>{map.introduces}</dt>
            <dd>{node.introduces}</dd>
            <dt>{map.dependsOn}</dt>
            <dd>{node.dependsOn}</dd>
            <dt>{map.breaks}</dt>
            <dd>{node.breaks}</dd>
          </dl>
        </div>
      ))}
    </div>
  );
}

/** 系统来源叙述。 */
function PatchSystemOrigin({
  section,
}: {
  section: Extract<PatchSection, { type: "system-origin" }>;
}) {
  return (
    <div className="patch-system-origin">
      <p className="patch-system-origin__meta">
        {section.introducedIn} · {section.sourceId}
      </p>
      {section.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {section.bullets.length > 0 ? (
        <ul>
          {section.bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** 迁移指南：旧配置到当前配置的迁移步骤。 */
function PatchMigrationGuide({
  section,
  locale,
}: {
  section: Extract<PatchSection, { type: "migration-guide" }>;
  locale: ContentLocale;
}) {
  const map = historicalI18n[locale === "zh-cn" ? "zh-cn" : "en"];
  return (
    <ol className="patch-migration">
      {section.steps.map((step, index) => (
        <li className="patch-migration__step" key={index}>
          <div className="patch-migration__flow">
            <span className="patch-migration__from">
              {map.from}: {step.from}
            </span>
            <span className="patch-migration__arrow" aria-hidden="true">
              →
            </span>
            <span className="patch-migration__to">
              {map.to}: {step.to}
            </span>
          </div>
          <p>{step.note}</p>
        </li>
      ))}
    </ol>
  );
}

/** 通用数据表格：列与行由数据驱动，复用 patch-data-table 样式。 */
function PatchDataTable({
  section,
  locale,
}: {
  section: Extract<PatchSection, { type: "data-table" }>;
  locale: ContentLocale;
}) {
  return (
    <div className="patch-table-wrap">
      {section.caption ? (
        <p className="patch-data-table__caption">
          {locale === "zh-cn" ? "表格说明：" : "Note: "}
          {section.caption}
        </p>
      ) : null}
      <table className="patch-data-table patch-data-table--generic">
        <thead>
          <tr>
            {section.columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, index) => (
            <tr key={index}>
              {section.columns.map((column) => (
                <td key={column.key}>{row[column.key] ?? ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
    case "historical-context":
      return <PatchHistoricalContext section={section} />;
    case "current-applicability":
      return <PatchCurrentApplicability section={section} locale={locale} />;
    case "then-vs-now":
      return <PatchThenVsNow section={section} locale={locale} />;
    case "superseded-changes":
      return <PatchSupersededChanges section={section} locale={locale} />;
    case "returning-player-checklist":
      return (
        <PatchReturningPlayerChecklist section={section} locale={locale} />
      );
    case "legacy-content-audit":
      return <PatchLegacyContentAudit section={section} locale={locale} />;
    case "version-dependency-map":
      return <PatchVersionDependencyMap section={section} locale={locale} />;
    case "system-origin":
      return <PatchSystemOrigin section={section} />;
    case "migration-guide":
      return <PatchMigrationGuide section={section} locale={locale} />;
    case "data-table":
      return <PatchDataTable section={section} locale={locale} />;
    default:
      return null;
  }
}
