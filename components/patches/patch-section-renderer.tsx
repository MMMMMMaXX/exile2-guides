/** 文件职责：按 Patches JSON 的判别联合章节渲染正文，未知结构必须在 Schema 阶段被拒绝。 */
import type { ReactNode } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import type { PatchArticle, PatchSection } from "../../lib/patches/schema";
import { NarrativeContent } from "../content/sections/narrative-content";
import { FaqList } from "../content/sections/faq-list";
import { VideoList } from "../content/sections/video-list";
import { ChangelogList } from "../content/sections/changelog-list";
import { SourcesSection } from "../content/sections/sources-section";
import { renderPatchRichSection } from "./patch-rich-sections";

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
  section: PatchSection,
  locale: ContentLocale,
): ReactNode {
  const labels = rendererLabels[locale];

  switch (section.type) {
    case "overview":
    case "important-changes":
    case "build-impact":
    case "re-verification":
    case "follow-up":
      return (
        <NarrativeContent
          bullets={section.bullets}
          paragraphs={section.paragraphs}
        />
      );
    case "verification-steps":
    case "checklist":
      return (
        <ol className={`patch-steps patch-steps--${section.type}`}>
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
    default:
      return renderPatchRichSection(section, locale);
  }
}

/** 按 order 排序并跳过隐藏章节，页面目录由同一数据顺序生成。 */
export function PatchSectionRenderer({ article }: { article: PatchArticle }) {
  const sections = article.sections
    .filter((section) => section.visible)
    .sort((left, right) => left.order - right.order);
  const historicalBanner = article.historicalStatus ? (
    <HistoricalPatchBanner article={article} locale={article.locale} />
  ) : null;

  // 预计算各主章节（toc）序号：按 order 排序后，toc 章节依次编号为 1..N；
  // 用纯计算替代渲染期变量重赋值，避免 ESLint 的不可变渲染告警。
  const numberedSections = sections.map((section, index) => ({
    section,
    majorNumber: section.toc
      ? sections.slice(0, index).filter((prev) => prev.toc).length + 1
      : 0,
  }));

  return [
    historicalBanner,
    ...numberedSections.map(({ section, majorNumber }) => {
    const Heading = section.toc ? "h2" : "h3";

    return (
      <section
        className={`patch-section patch-section--${section.type}${section.toc ? " patch-section--major" : " patch-section--minor"}`}
        id={section.id}
        key={section.id}
      >
        {section.toc ? (
          <span aria-hidden="true" className="patch-section__number">
            {majorNumber}
          </span>
        ) : null}
        <div className="patch-section__content">
          <Heading>{section.title}</Heading>
          {renderSectionContent(section, article.locale)}
        </div>
      </section>
    );
    }),
  ].filter(Boolean) as ReactNode[];
}

const historicalStatusLabels: Record<ContentLocale, Record<string, string>> = {
  en: {
    historical: "Historical Patch",
    "partially-current": "Partially current",
    superseded: "Superseded",
  },
  "zh-cn": {
    historical: "历史版本",
    "partially-current": "部分仍适用",
    superseded: "已被取代",
  },
};

/** 历史 Patch 首屏状态横幅：明确标注非当前版本、当前对照基线与最近核验日期。 */
function HistoricalPatchBanner({
  article,
  locale,
}: {
  article: PatchArticle;
  locale: ContentLocale;
}) {
  if (!article.historicalStatus) return null;
  const checked = article.lastVerifiedAt ?? article.updatedAt;
  const statusLabel =
    historicalStatusLabels[locale][article.historicalStatus] ??
    article.historicalStatus;
  return (
    <div
      className={`patch-historical-banner patch-historical-banner--${article.historicalStatus}`}
      role="note"
    >
      <span className="patch-historical-banner__badge">{statusLabel}</span>
      <div className="patch-historical-banner__body">
        <p className="patch-historical-banner__line">
          {locale === "zh-cn"
            ? "非当前客户端版本"
            : "Not the current client version"}
        </p>
        {article.currentBaseline ? (
          <p className="patch-historical-banner__line">
            <b>
              {locale === "zh-cn" ? "当前对照基线" : "Current comparison baseline"}
              :
            </b>{" "}
            {article.currentBaseline}
          </p>
        ) : null}
        <p className="patch-historical-banner__line">
          <b>
            {locale === "zh-cn"
              ? "最近对照当前内容核验"
              : "Last checked against current content"}
            :
          </b>{" "}
          {checked}
        </p>
      </div>
    </div>
  );
}

/**
 * 外部资料免责声明固定放在文章全部正文模块之后，避免每篇 JSON 重复维护法律文案。
 * 图片来源仍由各 figure 的 credit/sourceUrl 独立声明，二者承担不同职责。
 */
export function PatchMediaNotice({ locale }: { locale: ContentLocale }) {
  return (
    <p className="patch-media-notice">
      {locale === "zh-cn"
        ? "本文信息整理自公开网络资料与游戏内观察，部分配图为本站原创编辑示意图。外部信息与图片版权归原作者或平台所有；如有侵权，请联系我们删除。"
        : "Information is compiled from public web sources and in-game observations; some visuals are original editorial diagrams. External information and images remain the property of their authors or platforms; contact us for removal requests."}
    </p>
  );
}
