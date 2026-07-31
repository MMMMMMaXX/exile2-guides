/** 文件职责：按 Items JSON 的判别联合章节渲染正文，未知结构必须在 Schema 阶段被拒绝。 */
import type { ReactNode } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import type { ItemArticle, ItemSection } from "../../lib/items/schema";
import { NarrativeContent } from "../content/sections/narrative-content";
import { FaqList } from "../content/sections/faq-list";
import { VideoList } from "../content/sections/video-list";
import { ChangelogList } from "../content/sections/changelog-list";
import { SourcesSection } from "../content/sections/sources-section";
import {
  BossCommunityGrid,
  BossPrepChecklist,
} from "../bosses/boss-interactive";
import { ItemOutcomesTable, ItemValuationTabs } from "./item-interactive";

/** 每个章节的英文眉标（kicker），与原型 section-heading 内的 <p> 一致。 */
const sectionKickers: Record<string, string> = {
  "build-usage": "BUILD USAGE",
  "common-mistakes": "COMMON MISTAKES",
  "community-evidence": "COMMUNITY EVIDENCE",
  "effect": "EFFECT",
  "eligibility": "VALID TARGET MATRIX",
  "family-overview": "ITEM FAMILY",
  "media-gallery": "MEDIA GALLERY",
  "modifiers": "MODIFIERS",
  "outcomes": "OUTCOME ANALYSIS",
  "overview": "OVERVIEW",
  "patch-history": "PATCH HISTORY",
  "pre-use-checklist": "PRE-USE CHECKLIST",
  "quick-answer": "QUICK ANSWER",
  "quick-facts": "QUICK FACTS",
  "risk-analysis": "RISK ANALYSIS",
  "acquisition": "ACQUISITION",
  "acquisition-steps": "ACQUISITION STEPS",
  "alternatives": "ALTERNATIVES",
  "crafting": "CRAFTING",
  "properties": "PROPERTIES",
  "related-content": "CONNECTED CONTENT",
  "skill-interactions": "SKILL INTERACTIONS",
  "sources": "SOURCES & VERIFICATION",
  "troubleshooting": "PROBLEMS & DIRECT ANSWERS",
  "use-cases": "USE CASES",
  "usage": "USE FLOW",
  "valuation": "USE / SELL / HOLD",
  "verification": "VERIFICATION",
};

const rendererLabels: Record<
  ContentLocale,
  {
    editorialAnalysis: string;
    officialAnswer: string;
    playVideo: string;
    source: string;
    takeaway: string;
    timestamps: string;
    verificationChecklist: string;
    videoPreview: string;
    why: string;
  }
> = {
  en: {
    editorialAnalysis: "Editorial analysis",
    officialAnswer: "Our answer",
    playVideo: "Play video",
    source: "Open source",
    takeaway: "What to watch for",
    timestamps: "Key timestamps",
    verificationChecklist: "Verification checklist",
    videoPreview: "Open the original video",
    why: "Why it matters",
  },
  "zh-cn": {
    editorialAnalysis: "编辑分析",
    officialAnswer: "本站解答",
    playVideo: "播放视频",
    source: "查看来源",
    takeaway: "建议重点观看",
    timestamps: "重要节点",
    verificationChecklist: "发布前核验清单",
    videoPreview: "打开原始视频",
    why: "为什么重要",
  },
};

/** 社区卡片头像颜色循环，与 V5 原型的 avatar 配色对应。 */
const avatarColors = ["", " boss-avatar--green", " boss-avatar--orange"];

/** 风险等级标签，与 V4 表格一致。 */
function riskLabel(level: string, locale: ContentLocale) {
  return level === "high"
    ? locale === "zh-cn"
      ? "高风险"
      : "High"
    : level === "medium"
      ? locale === "zh-cn"
        ? "中风险"
        : "Medium"
      : locale === "zh-cn"
        ? "低风险"
        : "Low";
}

/** 根据章节类型输出受控结构；新增章节类型或文案时必须在此显式扩展。 */
function renderSectionContent(
  section: ItemSection,
  article: ItemArticle,
): ReactNode {
  const locale = article.locale;
  const labels = rendererLabels[locale];

  switch (section.type) {
    case "overview":
    case "effect":
    case "modifiers":
    case "crafting":
    case "skill-interactions":
    case "use-cases":
    case "alternatives":
    case "common-mistakes":
    case "verification":
      return (
        <NarrativeContent
          bullets={section.bullets}
          paragraphs={section.paragraphs}
        />
      );
    case "properties":
      return (
        <dl className="item-properties">
          {section.properties.map((property) => (
            <div className="item-property-row" key={property.label}>
              <dt>{property.label}</dt>
              <dd>{property.value}</dd>
              {property.notes.map((note) => (
                <dd className="item-property-note" key={note}>
                  {note}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      );
    case "acquisition-steps":
      return (
        <ol className="item-acquisition-steps">
          {section.steps.map((step) => (
            <li key={step.label}>
              <h3>{step.label}</h3>
              {step.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </li>
          ))}
        </ol>
      );
    case "faq":
      return <FaqList items={section.items} />;
    case "video":
      return (
        <VideoList
          entries={section.entries}
          labels={{
            playVideo: labels.playVideo,
            source: labels.source,
            takeaway: labels.takeaway,
            timestamps: labels.timestamps,
            videoPreview: labels.videoPreview,
          }}
        />
      );
    case "changelog":
      return <ChangelogList entries={section.entries} />;
    case "quick-answer":
      return (
        <div className="boss-quick-answer">
          <div className="boss-answer-callout">
            <strong>{section.callout}</strong>
            {section.calloutDetail.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          {section.answers.length > 0 ? (
            <div className="boss-answer-grid">
              {section.answers.map((answer) => (
                <article key={answer.label}>
                  <b>{answer.label}</b>
                  {answer.text.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </article>
              ))}
            </div>
          ) : null}
          {section.links.length > 0 ? (
            <div className="boss-inline-links">
              {section.links.map((link) => (
                <a
                  href={link.href}
                  key={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      );
    case "quick-facts":
      return (
        <dl className="item-quick-facts">
          {section.facts.map((fact) => (
            <div className="item-fact-row" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
              {fact.note.map((note) => (
                <dd className="item-fact-note" key={note}>
                  {note}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      );
    case "family-overview":
      return (
        <div className="item-family">
          {section.intro.map((paragraph) => (
            <p key={paragraph} className="item-family-intro">
              {paragraph}
            </p>
          ))}
          <div className="item-family-grid">
            {section.members.map((member) => (
              <article className="item-family-card" key={member.id}>
                <div className="item-family-badge" aria-hidden="true">
                  {member.id.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="eyebrow">{member.eyebrow}</p>
                  <h3>{member.title}</h3>
                  <small>{member.sub}</small>
                  {member.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {member.tags.length > 0 ? (
                    <div className="tag-row">
                      {member.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    case "eligibility":
      return (
        <div className="item-eligibility">
          {section.note.map((paragraph) => (
            <p key={paragraph} className="item-eligibility-note">
              {paragraph}
            </p>
          ))}
          <div className="boss-table-wrap">
            <table className="boss-data-table item-eligibility-table">
              <thead>
                <tr>
                  <th>{locale === "zh-cn" ? "目标" : "Target"}</th>
                  {section.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                  <th>{locale === "zh-cn" ? "说明" : "Note"}</th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.label}>
                    <td>
                      <b>{row.label}</b>
                    </td>
                    {row.values.map((value, index) => (
                      <td
                        className={
                          value.kind === "yes"
                            ? "item-cell item-cell--yes"
                            : value.kind === "no"
                              ? "item-cell item-cell--no"
                              : undefined
                        }
                        key={index}
                      >
                        {value.text}
                      </td>
                    ))}
                    <td>{row.note ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "acquisition":
      return (
        <div className="item-acquisition">
          {section.intro.map((paragraph) => (
            <p key={paragraph} className="item-acquisition-intro">
              {paragraph}
            </p>
          ))}
          <ol className="boss-access-steps">
            {section.routes.map((route) => (
              <li key={route.label}>
                <h3>{route.label}</h3>
                {route.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {route.href ? (
                  <a href={route.href} rel="noopener noreferrer" target="_blank">
                    ↗
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      );
    case "usage":
      return (
        <div className="item-usage">
          <ol className="boss-access-steps">
            {section.steps.map((step) => (
              <li key={step.label}>
                <h3>{step.label}</h3>
                {step.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </li>
            ))}
          </ol>
          {section.compare ? (
            <div className="item-compare">
              <div>
                <strong>
                  {locale === "zh-cn" ? "使用前" : "Before"}
                </strong>
                {section.compare.before.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              <div>
                <strong>
                  {locale === "zh-cn" ? "使用后" : "After"}
                </strong>
                {section.compare.after.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              <p className="item-compare-note">{section.compare.note}</p>
            </div>
          ) : null}
        </div>
      );
    case "pre-use-checklist":
      return (
        <BossPrepChecklist
          items={section.items}
          locale={locale}
          storageKey={`${article.slug}:${section.id}`}
        />
      );
    case "outcomes":
      return <ItemOutcomesTable locale={locale} section={section} />;
    case "risk-analysis":
      return (
        <div className="boss-table-wrap">
          <table className="boss-data-table item-risk-table">
            <thead>
              <tr>
                <th>{locale === "zh-cn" ? "场景" : "Scenario"}</th>
                <th>{locale === "zh-cn" ? "潜在收益" : "Gain"}</th>
                <th>{locale === "zh-cn" ? "可能损失" : "Loss"}</th>
                <th>{locale === "zh-cn" ? "风险" : "Risk"}</th>
                <th>{locale === "zh-cn" ? "建议" : "Recommendation"}</th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row) => (
                <tr key={row.scenario}>
                  <td>
                    <b>{row.scenario}</b>
                  </td>
                  <td>{row.gain}</td>
                  <td>{row.loss}</td>
                  <td>
                    <span
                      className={`boss-risk boss-risk--${
                        row.level === "high" ? "high" : row.level
                      }`}
                    >
                      {riskLabel(row.level, locale)}
                    </span>
                  </td>
                  <td>{row.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "valuation":
      return <ItemValuationTabs locale={locale} section={section} />;
    case "build-usage":
      return (
        <div className="item-build-usage">
          {section.intro.map((paragraph) => (
            <p key={paragraph} className="item-build-intro">
              {paragraph}
            </p>
          ))}
          <div className="item-build-grid">
            {section.builds.map((build) => (
              <article className="item-build-card" key={build.title}>
                <h3>{build.title}</h3>
                <p>{build.description}</p>
                {build.href ? (
                  <a href={build.href} rel="noopener noreferrer" target="_blank">
                    ↗
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      );
    case "community-evidence":
      return (
        <BossCommunityGrid
          locale={locale}
          totalCount={section.entries.length}
        >
          {section.entries.map((entry, index) => (
            <article
              className={`boss-community-card${
                index >= 2 ? " boss-community-extra" : ""
              }`}
              key={entry.sourceId}
            >
              <div className="boss-community-meta">
                <span
                  className={`boss-avatar${avatarColors[index % avatarColors.length]}`}
                >
                  {(entry.question ?? entry.sourceId)
                    .charAt(0)
                    .toUpperCase()}
                </span>
                <div>
                  <b>{entry.sourceId.replace(/-/g, " ")}</b>
                  <small>{entry.kind}</small>
                </div>
              </div>
              {entry.question ? <h3>{entry.question}</h3> : null}
              {entry.summary.length > 0 ? (
                <blockquote>{entry.summary.join(" ")}</blockquote>
              ) : null}
              {entry.editorialAnalysis.length > 0 ? (
                <div className="boss-editor-analysis">
                  <b>{labels.editorialAnalysis}</b>
                  <p>{entry.editorialAnalysis.join(" ")}</p>
                </div>
              ) : null}
              {entry.officialAnswer.length > 0 ? (
                <div className="boss-official-answer">
                  <b>{labels.officialAnswer}</b>
                  <p>{entry.officialAnswer.join(" ")}</p>
                </div>
              ) : null}
              {entry.linkHref ? (
                <a
                  className="boss-community-source"
                  href={entry.linkHref}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {entry.linkLabel ?? labels.source} ↗
                </a>
              ) : null}
            </article>
          ))}
        </BossCommunityGrid>
      );
    case "troubleshooting":
      return (
        <div className="boss-qa-list">
          {section.problems.map((problem) => (
            <details key={problem.symptom}>
              <summary>{problem.symptom}</summary>
              <div className="boss-qa-body">
                {problem.directAnswer.length > 0 ? (
                  <p>
                    <b>
                      {locale === "zh-cn" ? "直接答案：" : "Direct answer:"}{" "}
                    </b>
                    {problem.directAnswer.join(" ")}
                  </p>
                ) : null}
                {problem.checks.length > 0 ? (
                  <ol>
                    {problem.checks.map((check) => (
                      <li key={check}>{check}</li>
                    ))}
                  </ol>
                ) : null}
                {problem.links.length > 0 ? (
                  <div className="qa-links">
                    {problem.links.map((link) => (
                      <a
                        href={link.href}
                        key={link.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      );
    case "media-gallery":
      return (
        <div className="item-gallery-grid">
          {section.items.map((item) => (
            <figure className="item-gallery-card" key={item.caption}>
              <figcaption>{item.caption}</figcaption>
              {item.note ? <p>{item.note}</p> : null}
              {item.sourceUrl ? (
                <a
                  href={item.sourceUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ↗
                </a>
              ) : null}
            </figure>
          ))}
        </div>
      );
    case "related-content":
      return (
        <div className="boss-related-grid">
          {section.items.map((item) => (
            <a
              className="boss-related-card"
              href={item.href}
              key={item.contentId}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span
                className={`boss-card-type boss-card-type--${item.contentType}`}
              >
                {item.contentType}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
      );
    case "patch-history":
      return (
        <div className="item-patch-timeline">
          {section.entries.map((entry) => (
            <div className="item-patch-row" key={entry.version}>
              <span className="item-patch-version">{entry.version}</span>
              {entry.date ? <time>{entry.date}</time> : null}
              <div>
                {entry.changes.map((change) => (
                  <p key={change}>{change}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "sources":
      return (
        <SourcesSection
          categories={section.categories}
          verificationChecklist={section.verificationChecklist}
          verificationChecklistLabel={labels.verificationChecklist}
        />
      );
  }
}

/** 按 order 排序并跳过隐藏章节，页面目录由同一数据顺序生成；V4 编号眉标结构。 */
export function ItemSectionRenderer({ article }: { article: ItemArticle }) {
  const sections = article.sections
    .filter((section) => section.visible)
    .sort((left, right) => left.order - right.order);
  let majorSectionIndex = 0;

  return sections.map((section) => {
    if (section.toc) majorSectionIndex += 1;

    return (
      <section
        className={`boss-section item-section item-section--${section.type}`}
        id={section.id}
        key={section.id}
      >
        {section.toc ? (
          <header className="boss-section-heading">
            <span>{majorSectionIndex}</span>
            <div>
              <p>{sectionKickers[section.type] ?? section.type}</p>
              <h2>{section.title}</h2>
            </div>
          </header>
        ) : (
          <h2 className="boss-section-title-plain">{section.title}</h2>
        )}
        {renderSectionContent(section, article)}
      </section>
    );
  });
}

/**
 * 外部资料免责声明固定放在文章全部正文模块之后，避免每篇 JSON 重复维护法律文案。
 * 图片来源仍由各 figure 的 credit/sourceUrl 独立声明，二者承担不同职责。
 */
export function ItemMediaNotice({ locale }: { locale: ContentLocale }) {
  return (
    <p className="item-media-notice">
      {locale === "zh-cn"
        ? "本文信息整理自公开网络资料与游戏内观察，部分配图为本站原创编辑示意图。外部信息与图片版权归原作者或平台所有；如有侵权，请联系我们删除。"
        : "Information is compiled from public web sources and in-game observations; some visuals are original editorial diagrams. External information and images remain the property of their authors or platforms; contact us for removal requests."}
    </p>
  );
}
