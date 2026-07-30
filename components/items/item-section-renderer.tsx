/** 文件职责：按 Items JSON 的判别联合章节渲染正文，未知结构必须在 Schema 阶段被拒绝。 */
import type { ReactNode } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import type { ItemArticle, ItemSection } from "../../lib/items/schema";
import { NarrativeContent } from "../content/sections/narrative-content";
import { FaqList } from "../content/sections/faq-list";
import { VideoList } from "../content/sections/video-list";
import { ChangelogList } from "../content/sections/changelog-list";

const rendererLabels: Record<
  ContentLocale,
  {
    notes: string;
    source: string;
    takeaway: string;
    value: string;
    videoPreview: string;
  }
> = {
  en: {
    notes: "Notes",
    source: "Open source",
    takeaway: "What to watch for",
    value: "Value",
    videoPreview: "Open the original video",
  },
  "zh-cn": {
    notes: "备注",
    source: "查看来源",
    takeaway: "建议重点观看",
    value: "数值",
    videoPreview: "打开原始视频",
  },
};

/** 根据章节类型输出受控结构；新增章节类型或文案时必须在此显式扩展。 */
function renderSectionContent(
  section: ItemSection,
  locale: ContentLocale,
): ReactNode {
  const labels = rendererLabels[locale];

  switch (section.type) {
    case "overview":
    case "acquisition":
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
            source: labels.source,
            takeaway: labels.takeaway,
            videoPreview: labels.videoPreview,
          }}
        />
      );
    case "changelog":
      return <ChangelogList entries={section.entries} />;
  }
}

/** 按 order 排序并跳过隐藏章节，页面目录由同一数据顺序生成。 */
export function ItemSectionRenderer({ article }: { article: ItemArticle }) {
  const sections = article.sections
    .filter((section) => section.visible)
    .sort((left, right) => left.order - right.order);
  let majorSectionIndex = 0;

  return sections.map((section) => {
    const Heading = section.toc ? "h2" : "h3";
    if (section.toc) majorSectionIndex += 1;

    return (
      <section
        className={`item-section item-section--${section.type}${section.toc ? " item-section--major" : " item-section--minor"}`}
        id={section.id}
        key={section.id}
      >
        {section.toc ? (
          <span aria-hidden="true" className="item-section__number">
            {majorSectionIndex}
          </span>
        ) : null}
        <div className="item-section__content">
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
export function ItemMediaNotice({ locale }: { locale: ContentLocale }) {
  return (
    <p className="item-media-notice">
      {locale === "zh-cn"
        ? "本文信息整理自公开网络资料与游戏内观察，部分配图为本站原创编辑示意图。外部信息与图片版权归原作者或平台所有；如有侵权，请联系我们删除。"
        : "Information is compiled from public web sources and in-game observations; some visuals are original editorial diagrams. External information and images remain the property of their authors or platforms; contact us for removal requests."}
    </p>
  );
}
