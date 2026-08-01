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
import { MasterComparison } from "./sections/master-comparison";
import { MasterUnlockRoute } from "./sections/master-unlock-route";
import { PassivePlanner } from "./sections/passive-planner";
import { ScenarioRecommendations } from "./sections/scenario-recommendations";
import { ActivationTiming } from "./sections/activation-timing";
import { RecipeBoard } from "./sections/recipe-board";
import { RiskRewardMatrix } from "./sections/risk-reward-matrix";
import { MapModifierMatrix } from "./sections/map-modifier-matrix";
import { FilterInstallation } from "./sections/filter-installation";
import { RespecMatrix } from "./sections/respec-matrix";
import { CostBreakdown } from "./sections/cost-breakdown";
import { VersionConflicts } from "./sections/version-conflicts";
import { InteractiveSelector } from "./sections/interactive-selector";

const rendererLabels: Record<
  ContentLocale,
  {
    source: string;
    takeaway: string;
    videoPreview: string;
  }
> = {
  en: {
    source: "Open source",
    takeaway: "What to watch for",
    videoPreview: "Open the original video",
  },
  "zh-cn": {
    source: "查看来源",
    takeaway: "建议重点观看",
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
      return <SourcesSection categories={section.categories} />;
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
    case "master-comparison":
      return <MasterComparison section={section} />;
    case "master-unlock-route":
      return <MasterUnlockRoute section={section} />;
    case "passive-planner":
      return <PassivePlanner section={section} />;
    case "scenario-recommendations":
      return <ScenarioRecommendations section={section} />;
    case "activation-timing":
      return <ActivationTiming section={section} />;
    case "recipe-board":
      return <RecipeBoard section={section} />;
    case "risk-reward-matrix":
      return <RiskRewardMatrix section={section} />;
    case "map-modifier-matrix":
      return <MapModifierMatrix section={section} />;
    case "filter-installation":
      return <FilterInstallation section={section} />;
    case "strictness-selector":
      return (
        <InteractiveSelector
          resultLabel="推荐"
          runLabel="生成推荐严格度"
          section={section}
        />
      );
    case "compatibility-diagnostic":
      return (
        <InteractiveSelector
          resultLabel="诊断结果"
          runLabel="诊断兼容性"
          section={section}
        />
      );
    case "resource-diagnostic":
      return (
        <InteractiveSelector
          resultLabel="检查顺序"
          runLabel="生成检查顺序"
          section={section}
        />
      );
    case "respec-matrix":
      return <RespecMatrix section={section} />;
    case "cost-breakdown":
      return <CostBreakdown section={section} />;
    case "version-conflicts":
      return <VersionConflicts section={section} />;
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
