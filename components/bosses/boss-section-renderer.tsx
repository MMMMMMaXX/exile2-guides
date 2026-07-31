/** 文件职责：按 Bosses JSON 的判别联合章节渲染正文（V5 富内容结构），视觉与交互对齐 exile2-boss-article-prototype-v5 原型。 */
import type { ReactNode } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import type { BossArticle, BossSection } from "../../lib/bosses/schema";
import { NarrativeContent } from "../content/sections/narrative-content";
import { FaqList } from "../content/sections/faq-list";
import { VideoList } from "../content/sections/video-list";
import { ChangelogList } from "../content/sections/changelog-list";
import { SourcesSection } from "../content/sections/sources-section";
import {
  BossAttackTable,
  BossCommunityGrid,
  BossLightboxTrigger,
  BossPhaseTabs,
  BossPrepChecklist,
} from "./boss-interactive";

/** V5 原型中每个章节的英文眉标（kicker），与原型 section-heading 内的 <p> 一致。 */
const sectionKickers: Record<string, string> = {
  access: "ACCESS & CONTEXT",
  arena: "ARENA READING",
  attacks: "ATTACK REFERENCE",
  "build-considerations": "BUILD-SPECIFIC STRATEGY",
  changelog: "CHANGELOG",
  community: "COMMUNITY",
  "community-evidence": "COMMUNITY EVIDENCE",
  "damage-types": "DAMAGE PROFILE",
  faq: "FAQ",
  gallery: "MEDIA GALLERY",
  overview: "OVERVIEW",
  phases: "PHASE BREAKDOWN",
  preparation: "BEFORE THE FIGHT",
  "quick-answer": "QUICK ANSWER",
  "quick-preparation": "QUICK PREPARATION",
  "related-content": "RELATED CONTENT",
  requirements: "REQUIREMENTS",
  rewards: "REWARDS & PROGRESSION",
  "sources-section": "SOURCES & VERIFICATION",
  strategy: "STRATEGY",
  troubleshooting: "PROBLEMS & DIRECT ANSWERS",
  verification: "VERIFICATION",
  video: "VIDEO & TIMESTAMPS",
};

const rendererLabels: Record<
  ContentLocale,
  {
    condition: string;
    editorialAnalysis: string;
    fix: string;
    mitigation: string;
    officialAnswer: string;
    playVideo: string;
    relatedLinks: string;
    source: string;
    takeaway: string;
    timestamps: string;
    verificationChecklist: string;
    videoPreview: string;
    why: string;
  }
> = {
  en: {
    condition: "Condition",
    editorialAnalysis: "Editorial analysis",
    fix: "Quick fix",
    mitigation: "Mitigation",
    officialAnswer: "Our answer",
    playVideo: "Play video",
    relatedLinks: "Related guides",
    source: "Open source",
    takeaway: "What to watch for",
    timestamps: "Key timestamps",
    verificationChecklist: "Verification checklist",
    videoPreview: "Open the original video",
    why: "Why it matters",
  },
  "zh-cn": {
    condition: "条件",
    editorialAnalysis: "编辑分析",
    fix: "低成本修正",
    mitigation: "减伤手段",
    officialAnswer: "本站解答",
    playVideo: "播放视频",
    relatedLinks: "站内相关攻略",
    source: "查看来源",
    takeaway: "建议重点观看",
    timestamps: "重要节点",
    verificationChecklist: "发布前核验清单",
    videoPreview: "打开原始视频",
    why: "为什么重要",
  },
};

/** 社区卡片头像颜色循环，与 V5 原型的 avatar / green-avatar / orange-avatar 对应。 */
const avatarColors = ["", " boss-avatar--green", " boss-avatar--orange"];

/** 根据章节类型输出受控结构；新增章节类型或文案时必须在此显式扩展。 */
function renderSectionContent(
  section: BossSection,
  article: BossArticle,
): ReactNode {
  const locale = article.locale;
  const labels = rendererLabels[locale];
  const media = article.media;

  switch (section.type) {
    case "overview":
    case "arena":
    case "strategy":
    case "build-considerations":
    case "community":
    case "verification":
      return (
        <NarrativeContent
          bullets={section.bullets}
          paragraphs={section.paragraphs}
        />
      );
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
                  <p>{answer.text}</p>
                </article>
              ))}
            </div>
          ) : null}
          {section.links.length > 0 ? (
            <div className="boss-inline-links">
              {section.links.map((link) => (
                <a href={link.href} key={link.href} rel="noopener noreferrer" target="_blank">
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      );
    case "quick-preparation":
    case "preparation":
      return (
        <BossPrepChecklist
          items={section.items}
          locale={locale}
          storageKey={`${article.slug}:${section.id}`}
        />
      );
    case "access":
      return (
        <div className="boss-access">
          {section.facts.length > 0 ? (
            <div className="boss-fact-cards">
              {section.facts.map((fact) => (
                <article key={fact.label}>
                  <small>{fact.label}</small>
                  <strong>{fact.value}</strong>
                  {fact.note ? <p>{fact.note}</p> : null}
                </article>
              ))}
            </div>
          ) : null}
          {section.steps.length > 0 ? (
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
          ) : null}
        </div>
      );
    case "requirements":
      return (
        <dl className="boss-requirements">
          {section.requirements.map((requirement) => (
            <div className="boss-requirement-row" key={requirement.label}>
              <dt>{requirement.label}</dt>
              <dd>{requirement.value}</dd>
              {requirement.notes.map((note) => (
                <dd className="boss-requirement-note" key={note}>
                  {note}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      );
    case "phases": {
      /** 从顶层 media 数组解析阶段引用的截图，供标签页右侧展示。 */
      const phaseItems = section.phases.map((phase) => {
        const phaseMedia = phase.mediaId
          ? media.find((item) => item.id === phase.mediaId)
          : undefined;
        return {
          label: phase.label,
          ...(phaseMedia?.src ? { mediaSrc: phaseMedia.src } : {}),
          ...(phaseMedia?.alt ? { mediaAlt: phaseMedia.alt } : {}),
          ...(phaseMedia?.caption ? { mediaCaption: phaseMedia.caption } : {}),
          notes: phase.notes,
          objectives: phase.objectives,
          phaseId: phase.phaseId,
          tags: phase.tags,
          trigger: phase.trigger,
        };
      });
      return <BossPhaseTabs locale={locale} phases={phaseItems} />;
    }
    case "attacks": {
      /** 收集所有阶段 ID 生成筛选按钮标签；优先使用 phases 章节中的 label。 */
      const phaseSection = article.sections.find(
        (candidate): candidate is Extract<BossSection, { type: "phases" }> =>
          candidate.type === "phases",
      );
      const phaseLabelMap: Record<string, string> = {};
      if (phaseSection) {
        for (const phase of phaseSection.phases) {
          phaseLabelMap[phase.phaseId] = phase.label;
        }
      }
      const phaseFilters = [
        ...new Set(section.attacks.flatMap((attack) => attack.phaseIds)),
      ];
      return (
        <BossAttackTable
          attacks={section.attacks}
          filterLabels={phaseLabelMap}
          locale={locale}
          phaseFilters={phaseFilters}
        />
      );
    }
    case "damage-types":
      return (
        <div className="boss-damage-grid">
          {section.types.map((type) => (
            <section className="boss-damage-card" key={type.label}>
              <h3>{type.label}</h3>
              {type.mitigation.length > 0 ? (
                <div>
                  <strong>{labels.mitigation}</strong>
                  <ul>
                    {type.mitigation.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {type.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </section>
          ))}
        </div>
      );
    case "rewards":
      return (
        <div className="boss-reward-grid">
          {section.rewards.map((reward) => (
            <article key={reward.itemId}>
              <div className="boss-reward-icon">✦</div>
              <div>
                <small>{reward.condition}</small>
                <h3>{reward.label}</h3>
                {reward.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
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
              </div>
            </details>
          ))}
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
              className={`boss-community-card${index >= 2 ? " boss-community-extra" : ""}`}
              key={entry.sourceId}
            >
              <div className="boss-community-meta">
                <span
                  className={`boss-avatar${avatarColors[index % avatarColors.length]}`}
                >
                  {(entry.question ?? entry.sourceId).charAt(0).toUpperCase()}
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
    case "gallery":
      return (
        <div className="boss-gallery-grid">
          {section.mediaIds.map((mediaId) => {
            const item = media.find((m) => m.id === mediaId);
            if (!item?.src) return null;
            return (
              <BossLightboxTrigger
                alt={item.alt ?? ""}
                caption={item.caption}
                key={mediaId}
                src={item.src}
              />
            );
          })}
        </div>
      );
    case "related-content":
      return (
        <div className="boss-related-grid">
          {section.items.map((item) => (
            <a className="boss-related-card" href={item.href} key={item.contentId} rel="noopener noreferrer" target="_blank">
              <span className={`boss-card-type boss-card-type--${item.contentType}`}>
                {item.contentType}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
      );
    case "sources-section":
      return (
        <SourcesSection
          categories={section.categories}
          verificationChecklist={section.verificationChecklist}
          verificationChecklistLabel={labels.verificationChecklist}
        />
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
  }
}

/** 按 order 排序并跳过隐藏章节；V5 原型的编号眉标 + 金色 kicker 结构。 */
export function BossSectionRenderer({ article }: { article: BossArticle }) {
  const sections = article.sections
    .filter((section) => section.visible)
    .sort((left, right) => left.order - right.order);
  let majorSectionIndex = 0;

  return sections.map((section) => {
    if (section.type === "related-content" && section.items.length === 0) {
      return null;
    }
    if (section.toc) majorSectionIndex += 1;

    return (
      <section
        className={`boss-section boss-section--${section.type}`}
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
export function BossMediaNotice({ locale }: { locale: ContentLocale }) {
  return (
    <p className="boss-media-notice">
      {locale === "zh-cn"
        ? "本文信息整理自公开网络资料与游戏内观察，部分配图为本站原创编辑示意图。外部信息与图片版权归原作者或平台所有；如有侵权，请联系我们删除。"
        : "Information is compiled from public web sources and in-game observations; some visuals are original editorial diagrams. External information and images remain the property of their authors or platforms; contact us for removal requests."}
    </p>
  );
}
