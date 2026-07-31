/** 文件职责：按 Builds JSON 的判别联合章节渲染正文，未知结构必须在 Schema 阶段被拒绝。 */
import type { ReactNode } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import type { BuildArticle, BuildSection } from "../../lib/builds/schema";
import { NarrativeContent } from "../content/sections/narrative-content";
import { FaqList } from "../content/sections/faq-list";
import { FigureBlock } from "../content/sections/figure-block";
import { VideoList } from "../content/sections/video-list";
import { ChangelogList } from "../content/sections/changelog-list";
import { ComparisonTable } from "../content/sections/comparison-table";

const rendererLabels: Record<
  ContentLocale,
  {
    cons: string;
    paraphrase: string;
    pros: string;
    quote: string;
    related: string;
    source: string;
    supports: string;
    takeaway: string;
    videoPreview: string;
  }
> = {
  en: {
    cons: "Cons",
    paraphrase: "Editorial paraphrase",
    pros: "Pros",
    quote: "Brief source quote",
    related: "Continue on this site",
    source: "Open source",
    supports: "Supports",
    takeaway: "What to watch for",
    videoPreview: "Open the original video",
  },
  "zh-cn": {
    cons: "缺点",
    paraphrase: "编辑转述",
    pros: "优点",
    quote: "来源短引",
    related: "站内继续阅读",
    source: "查看来源",
    supports: "辅助技能",
    takeaway: "建议重点观看",
    videoPreview: "打开原始视频",
  },
};

/** 根据章节类型输出受控结构；这里是新增章节类型或文案时必须显式扩展的维护边界。 */
function renderSectionContent(
  section: BuildSection,
  locale: ContentLocale,
): ReactNode {
  const labels = rendererLabels[locale];

  switch (section.type) {
    case "overview":
    case "playstyle":
    case "mapping":
    case "bossing":
    case "transformation":
    case "crossbow":
    case "dot-rotation":
    case "community":
    case "sources":
      return (
        <NarrativeContent
          bullets={section.bullets}
          paragraphs={section.paragraphs}
        />
      );
    case "pros-cons":
      return (
        <div className="build-section-columns">
          <div>
            <h3>{labels.pros}</h3>
            <ul>
              {section.pros.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{labels.cons}</h3>
            <ul>
              {section.cons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "leveling":
    case "passive-tree":
    case "ascendancy":
    case "upgrade-priority":
      return (
        <ol className="build-progression-list">
          {section.steps.map((step) => (
            <li key={`${step.label}-${step.levelRange ?? ""}`}>
              <h3>
                {step.label}
                {step.levelRange ? ` · ${step.levelRange}` : ""}
              </h3>
              {step.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </li>
          ))}
        </ol>
      );
    case "skills":
      return section.groups.map((group) => (
        <section key={group.label}>
          <h3>{group.label}</h3>
          {group.skills.map((skill) => (
            <div className="build-data-row" key={skill.skillId}>
              <strong>{skill.skillId}</strong>
              <span>{skill.role}</span>
              {skill.supportSkillIds.length > 0 ? (
                <p>
                  {labels.supports}: {skill.supportSkillIds.join(" · ")}
                </p>
              ) : null}
              {skill.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          ))}
        </section>
      ));
    case "gear":
      return section.slots.map((slot) => (
        <section className="build-data-row" key={slot.slot}>
          <h3>{slot.slot}</h3>
          <ul>
            {slot.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {slot.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </section>
      ));
    case "stat-priority":
      return (
        <ol>
          {section.priorities.map((priority) => (
            <li key={priority.label}>
              <strong>{priority.label}</strong> — {priority.reason}
            </li>
          ))}
        </ol>
      );
    case "troubleshooting":
      return section.problems.map((problem) => (
        <section className="build-data-row" key={problem.symptom}>
          <h3>{problem.symptom}</h3>
          <ul>
            {problem.checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </section>
      ));
    case "faq":
      return <FaqList items={section.items} />;
    case "figure":
      return <FigureBlock image={section.image} sourceLabel={labels.source} />;
    case "video":
      return (
        <VideoList
          entries={section.entries}
          labels={{
            source: labels.source,
            takeaway: labels.takeaway,
            videoPreview: labels.videoPreview,
          }}
        />
      );
    case "comparison-table":
      return (
        <ComparisonTable
          caption={section.caption}
          columns={section.columns}
          rows={section.rows}
        />
      );
    case "community-voices":
      return (
        <>
          <p className="build-community-note">{section.note}</p>
          <div className="build-community-grid">
            {section.entries.map((entry) => (
              <article className="build-community-card" key={entry.url}>
                <p className="build-section-kicker">
                  {entry.sourceType} ·{" "}
                  {entry.representation === "quote"
                    ? labels.quote
                    : labels.paraphrase}
                </p>
                <blockquote>{entry.statement}</blockquote>
                <p>{entry.context}</p>
                <a href={entry.url} rel="noreferrer" target="_blank">
                  {entry.label} ↗
                </a>
              </article>
            ))}
          </div>
        </>
      );
    case "question-answer":
      return (
        <div className="build-question-list">
          {section.items.map((item) => (
            <article className="build-question-card" key={item.question}>
              <h3>{item.question}</h3>
              {item.answer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {item.bullets.length > 0 ? (
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {item.relatedLinks.length > 0 ? (
                <nav aria-label={`${labels.related}: ${item.question}`}>
                  <strong>{labels.related}</strong>
                  {item.relatedLinks.map((link) => (
                    <a href={link.href} key={link.href} rel="noopener noreferrer" target="_blank">
                      {link.label} →
                    </a>
                  ))}
                </nav>
              ) : null}
            </article>
          ))}
        </div>
      );
    case "changelog":
      return <ChangelogList entries={section.entries} />;
  }
}

/** 按 order 排序并跳过隐藏章节，页面目录由同一数据顺序生成。 */
export function BuildSectionRenderer({ article }: { article: BuildArticle }) {
  const sections = article.sections
    .filter((section) => section.visible)
    .sort((left, right) => left.order - right.order);
  let majorSectionIndex = 0;

  return sections.map((section) => {
    const Heading = section.toc ? "h2" : "h3";
    if (section.toc) majorSectionIndex += 1;

    return (
      <section
        className={`build-section build-section--${section.type}${section.toc ? " build-section--major" : " build-section--minor"}`}
        id={section.id}
        key={section.id}
      >
        {section.toc ? (
          <span aria-hidden="true" className="build-section__number">
            {majorSectionIndex}
          </span>
        ) : null}
        <div className="build-section__content">
          <Heading>{section.title}</Heading>
          {renderSectionContent(section, article.locale)}
        </div>
      </section>
    );
  });
}

/**
 * 外部资料免责声明固定放在文章全部正文模块之后，避免每篇 JSON 重复维护法律文案。
 * 图片来源仍由各 figure 的 credit/sourceUrl 独立声明，二者承担不同职责。
 */
export function BuildMediaNotice({ locale }: { locale: ContentLocale }) {
  return (
    <p className="build-media-notice">
      {locale === "zh-cn"
        ? "本文信息整理自公开网络资料，部分配图为本站原创编辑示意图。外部信息与图片版权归原作者或平台所有；如有侵权，请联系我们删除。"
        : "Information is compiled from public web sources, and some visuals are original editorial diagrams. External information and images remain the property of their authors or platforms; contact us for removal requests."}
    </p>
  );
}
