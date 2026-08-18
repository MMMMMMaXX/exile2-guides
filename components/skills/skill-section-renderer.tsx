/** 文件职责：按 Skills JSON 的判别联合章节渲染正文，未知结构必须在 Schema 阶段被拒绝。 */
import type { ReactNode } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import type {
  SkillArticle,
  SkillRichSection,
  SkillSection,
} from "../../lib/skills/schema";
import { formatPublicEvidenceText } from "../../lib/i18n/public-evidence-copy";
import { NarrativeContent } from "../content/sections/narrative-content";
import { FaqList } from "../content/sections/faq-list";
import { VideoList } from "../content/sections/video-list";
import { ChangelogList } from "../content/sections/changelog-list";
import { SourcesSection } from "../content/sections/sources-section";

const rendererLabels: Record<
  "en" | "zh-cn",
  {
    notes: string;
    priority: string;
    source: string;
    support: string;
    takeaway: string;
    value: string;
    videoPreview: string;
  }
> = {
  en: {
    notes: "Notes",
    priority: "Priority",
    source: "Open source",
    support: "Support",
    takeaway: "What to watch for",
    value: "Value",
    videoPreview: "Open the original video",
  },
  "zh-cn": {
    notes: "备注",
    priority: "优先级",
    source: "查看来源",
    support: "辅助宝石",
    takeaway: "建议重点观看",
    value: "数值",
    videoPreview: "打开原始视频",
  },
};

const priorityLabels: Record<"en" | "zh-cn", Record<string, string>> = {
  en: {
    core: "Core",
    situational: "Situational",
    optional: "Optional",
    incompatible: "Incompatible",
  },
  "zh-cn": {
    core: "核心",
    situational: "情境",
    optional: "可选",
    incompatible: "不兼容",
  },
};

/**
 * 富结构章节渲染：按可用字段（叙述 / 步骤 / 键值 / 表格）组合输出，
 * 供第三批新增的 25 种复用业务模型章节共用，避免为单篇引入一次性 JSX。
 */
function RichSection({
  locale,
  section,
}: {
  section: SkillRichSection;
  locale: ContentLocale;
}) {
  const hasSteps = section.steps && section.steps.length > 0;
  const hasKeyValues = section.keyValues && section.keyValues.length > 0;
  const hasTable =
    section.columns && section.rows && section.columns.length > 0;

  return (
    <div className="skill-rich-section">
      {(section.paragraphs.length > 0 || section.bullets.length > 0) && (
        <NarrativeContent
          bullets={section.bullets}
          locale={locale}
          paragraphs={section.paragraphs}
        />
      )}
      {hasKeyValues ? (
        <dl className="skill-properties">
          {section.keyValues!.map((kv) => (
            <div className="skill-property-row" key={kv.label}>
              <dt>{kv.label}</dt>
              <dd>{formatPublicEvidenceText(locale, kv.value)}</dd>
              {kv.notes.map((note) => (
                <dd className="skill-property-note" key={note}>
                  {formatPublicEvidenceText(locale, note)}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      ) : null}
      {hasSteps ? (
        <ol className="skill-steps">
          {section.steps!.map((step, index) => (
            <li className="skill-step-row" key={index}>
              <span className="skill-step-label">{step.label}</span>
              <span className="skill-step-action">{step.action}</span>
              <span className="skill-step-result">{step.result}</span>
            </li>
          ))}
        </ol>
      ) : null}
      {hasTable ? (
        <div className="skill-data-table-wrap">
          <table className="skill-data-table">
            <thead>
              <tr>
                {section.columns!.map((column, index) => (
                  <th key={`${column}-${index}`}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows!.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ whiteSpace: "pre-line" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

/** 根据章节类型输出受控结构；新增章节类型或文案时必须在此显式扩展。 */
function renderSectionContent(
  section: SkillSection,
  locale: ContentLocale,
): ReactNode {
  const labels = rendererLabels[locale === "zh-cn" ? "zh-cn" : "en"];

  switch (section.type) {
    case "overview":
    case "mechanics":
    case "build-use-cases":
    case "common-mistakes":
    case "verification":
      return (
        <NarrativeContent
          bullets={section.bullets}
          locale={locale}
          paragraphs={section.paragraphs}
        />
      );
    case "supports":
      return (
        <dl className="skill-supports">
          {section.supports.map((support) => (
            <div className="skill-support-row" key={support.label}>
              <dt>{support.label}</dt>
              <dd className="skill-support-priority">
                {priorityLabels[locale === "zh-cn" ? "zh-cn" : "en"][
                  support.priority
                ] ?? support.priority}
              </dd>
              {support.notes.map((note) => (
                <dd className="skill-support-note" key={note}>
                  {note}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      );
    case "properties":
      return (
        <dl className="skill-properties">
          {section.properties.map((property) => (
            <div className="skill-property-row" key={property.label}>
              <dt>{property.label}</dt>
              <dd>{property.value}</dd>
              {property.notes.map((note) => (
                <dd className="skill-property-note" key={note}>
                  {formatPublicEvidenceText(locale, note)}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      );
    case "faq":
      return <FaqList items={section.items} locale={locale} />;
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
    case "changelog":
      return <ChangelogList entries={section.entries} />;
    case "sources":
      return <SourcesSection categories={section.categories} />;
    case "data-table":
      return (
        <div className="skill-data-table-wrap">
          <table className="skill-data-table">
            <thead>
              <tr>
                {section.columns.map((column, index) => (
                  <th key={`${column}-${index}`}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ whiteSpace: "pre-line" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "quick-answer":
    case "requirements":
    case "ammunition-reload":
    case "detonator-interaction":
    case "deployed-object":
    case "object-limits":
    case "skill-interactions":
    case "combo-sequence":
    case "weapon-set":
    case "mapping-rotation":
    case "bossing-rotation":
    case "support-compatibility":
    case "support-loadouts":
    case "troubleshooting":
    case "community-evidence":
    case "attack-empowerment":
    case "charge-generation":
    case "hit-sequence":
    case "hit-behaviour":
    case "persistent-buff":
    case "remnant-revival":
    case "spirit-budget":
    case "quality":
    case "clone-meta":
    case "socketed-attacks":
      return <RichSection section={section} locale={locale} />;
  }
}

/** 按 order 排序并跳过隐藏章节，页面目录由同一数据顺序生成。 */
export function SkillSectionRenderer({ article }: { article: SkillArticle }) {
  const sections = article.sections
    .filter((section) => section.visible)
    .sort((left, right) => left.order - right.order);
  let majorSectionIndex = 0;

  return sections.map((section) => {
    const Heading = section.toc ? "h2" : "h3";
    if (section.toc) majorSectionIndex += 1;

    return (
      <section
        className={`skill-section skill-section--${section.type}${section.toc ? " skill-section--major" : " skill-section--minor"}`}
        id={section.id}
        key={section.id}
      >
        {section.toc ? (
          <span aria-hidden="true" className="skill-section__number">
            {majorSectionIndex}
          </span>
        ) : null}
        <div className="skill-section__content">
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
export function SkillMediaNotice({ locale }: { locale: ContentLocale }) {
  return (
    <p className="skill-media-notice">
      {locale === "zh-cn"
        ? "本文信息整理自公开网络资料与游戏内观察，部分配图为本站原创编辑示意图。外部信息与图片版权归原作者或平台所有；如有侵权，请联系我们删除。"
        : "Information is compiled from public web sources and in-game observations; some visuals are original editorial diagrams. External information and images remain the property of their authors or platforms; contact us for removal requests."}
    </p>
  );
}
