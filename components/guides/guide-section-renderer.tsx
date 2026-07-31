/** 文件职责：按 Guides JSON 的判别联合章节渲染正文，未知结构必须在 Schema 阶段被拒绝。 */
import type { ReactNode } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import type { GuideArticle, GuideSection } from "../../lib/guides/schema";
import { NarrativeContent } from "../content/sections/narrative-content";
import { FaqList } from "../content/sections/faq-list";
import { VideoList } from "../content/sections/video-list";
import { ChangelogList } from "../content/sections/changelog-list";
import { SourcesSection } from "../content/sections/sources-section";
import { QuickAnswer } from "./sections/quick-answer";
import { StatGrid } from "./sections/stat-grid";
import { DataTable } from "./sections/data-table";
import { Tabbed } from "./sections/tabs";
import { CardGrid } from "./sections/card-grid";
import { Diagnostic } from "./sections/diagnostic";

const rendererLabels: Record<
  ContentLocale,
  {
    source: string;
    takeaway: string;
    verificationChecklist: string;
    videoPreview: string;
  }
> = {
  en: {
    source: "Open source",
    takeaway: "What to watch for",
    verificationChecklist: "Verification checklist",
    videoPreview: "Open the original video",
  },
  "zh-cn": {
    source: "查看来源",
    takeaway: "建议重点观看",
    verificationChecklist: "发布前核验清单",
    videoPreview: "打开原始视频",
  },
};

/** 根据章节类型输出受控结构；新增章节类型或文案时必须在此显式扩展。 */
function renderSectionContent(
  section: GuideSection,
  locale: ContentLocale,
): ReactNode {
  const labels = rendererLabels[locale];

  switch (section.type) {
    case "overview":
    case "preparation":
    case "decisions":
    case "common-mistakes":
    case "verification":
      return (
        <NarrativeContent
          bullets={section.bullets}
          paragraphs={section.paragraphs}
        />
      );
    case "progression-steps":
    case "verification-steps":
    case "checklist":
      return (
        <ol className={`guide-steps guide-steps--${section.type}`}>
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
            source: labels.source,
            takeaway: labels.takeaway,
            videoPreview: labels.videoPreview,
          }}
        />
      );
    case "changelog":
      return <ChangelogList entries={section.entries} />;
    case "sources":
      return (
        <SourcesSection
          categories={section.categories}
          verificationChecklist={section.verificationChecklist}
          verificationChecklistLabel={labels.verificationChecklist}
        />
      );
    case "quick-answer":
      return <QuickAnswer section={section} />;
    case "stat-grid":
      return <StatGrid section={section} />;
    case "data-table":
      return <DataTable section={section} />;
    case "tabs":
      return <Tabbed section={section} />;
    case "card-grid":
      return <CardGrid section={section} />;
    case "diagnostic":
      return <Diagnostic section={section} />;
  }
}

/** 按 order 排序并跳过隐藏章节，页面目录由同一数据顺序生成。 */
export function GuideSectionRenderer({ article }: { article: GuideArticle }) {
  const sections = article.sections
    .filter((section) => section.visible)
    .sort((left, right) => left.order - right.order);
  let majorSectionIndex = 0;

  return sections.map((section) => {
    const Heading = section.toc ? "h2" : "h3";
    if (section.toc) majorSectionIndex += 1;

    return (
      <section
        className={`guide-section guide-section--${section.type}${section.toc ? " guide-section--major" : " guide-section--minor"}`}
        id={section.id}
        key={section.id}
      >
        {section.toc ? (
          <span aria-hidden="true" className="guide-section__number">
            {majorSectionIndex}
          </span>
        ) : null}
        <div className="guide-section__content">
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
export function GuideMediaNotice({ locale }: { locale: ContentLocale }) {
  return (
    <p className="guide-media-notice">
      {locale === "zh-cn"
        ? "本文信息整理自公开网络资料与游戏内观察，部分配图为本站原创编辑示意图。外部信息与图片版权归原作者或平台所有；如有侵权，请联系我们删除。"
        : "Information is compiled from public web sources and in-game observations; some visuals are original editorial diagrams. External information and images remain the property of their authors or platforms; contact us for removal requests."}
    </p>
  );
}
