/** 文件职责：按 Bosses JSON 的判别联合章节渲染正文，未知结构必须在 Schema 阶段被拒绝。 */
import type { ReactNode } from "react";

import type { ContentLocale } from "../../lib/content/constants";
import type { BossArticle, BossSection } from "../../lib/bosses/schema";
import { NarrativeContent } from "../content/sections/narrative-content";
import { FaqList } from "../content/sections/faq-list";
import { VideoList } from "../content/sections/video-list";
import { ChangelogList } from "../content/sections/changelog-list";

const rendererLabels: Record<
  ContentLocale,
  {
    condition: string;
    mitigation: string;
    notes: string;
    objectives: string;
    phases: string;
    responses: string;
    source: string;
    takeaway: string;
    telegraph: string;
    trigger: string;
    videoPreview: string;
  }
> = {
  en: {
    condition: "Condition",
    mitigation: "Mitigation",
    notes: "Notes",
    objectives: "Objectives",
    phases: "Phases",
    responses: "Responses",
    source: "Open source",
    takeaway: "What to watch for",
    telegraph: "Telegraph",
    trigger: "Trigger",
    videoPreview: "Open the original video",
  },
  "zh-cn": {
    condition: "条件",
    mitigation: "减伤手段",
    notes: "备注",
    objectives: "目标",
    phases: "阶段",
    responses: "应对方式",
    source: "查看来源",
    takeaway: "建议重点观看",
    telegraph: "前摇信号",
    trigger: "触发条件",
    videoPreview: "打开原始视频",
  },
};

/** 根据章节类型输出受控结构；新增章节类型或文案时必须在此显式扩展。 */
function renderSectionContent(
  section: BossSection,
  locale: ContentLocale,
): ReactNode {
  const labels = rendererLabels[locale];

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
    case "quick-preparation":
      return (
        <dl className="boss-preparation-list">
          {section.items.map((item) => (
            <div className="boss-preparation-item" key={item.label}>
              <dt>{item.label}</dt>
              {item.checks.map((check) => (
                <dd key={check}>{check}</dd>
              ))}
            </div>
          ))}
        </dl>
      );
    case "access":
      return (
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
    case "phases":
      return (
        <ol className="boss-phase-timeline">
          {section.phases.map((phase) => (
            <li className="boss-phase-entry" key={phase.phaseId}>
              <h3>{phase.label}</h3>
              <p className="boss-phase-trigger">
                <strong>{labels.trigger}:</strong> {phase.trigger}
              </p>
              {phase.objectives.length > 0 ? (
                <div>
                  <strong>{labels.objectives}</strong>
                  <ul>
                    {phase.objectives.map((objective) => (
                      <li key={objective}>{objective}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {phase.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </li>
          ))}
        </ol>
      );
    case "attacks":
      return (
        <div className="boss-attack-list">
          {section.attacks.map((attack) => (
            <article className="boss-attack-card" key={attack.attackId}>
              <h3>{attack.name}</h3>
              {attack.phaseIds.length > 0 ? (
                <p className="boss-attack-phases">
                  {labels.phases}: {attack.phaseIds.join(" · ")}
                </p>
              ) : null}
              {attack.damageTypes.length > 0 ? (
                <p className="boss-attack-damage">
                  {attack.damageTypes.join(" · ")}
                </p>
              ) : null}
              {attack.telegraph.length > 0 ? (
                <div>
                  <strong>{labels.telegraph}</strong>
                  {attack.telegraph.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              ) : null}
              {attack.responses.length > 0 ? (
                <div>
                  <strong>{labels.responses}</strong>
                  <ul>
                    {attack.responses.map((response) => (
                      <li key={response}>{response}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {attack.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </article>
          ))}
        </div>
      );
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
        <div className="boss-reward-list">
          {section.rewards.map((reward) => (
            <article className="boss-reward-card" key={reward.itemId}>
              <h3>{reward.label}</h3>
              <p className="boss-reward-condition">
                <strong>{labels.condition}:</strong> {reward.condition}
              </p>
              {reward.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </article>
          ))}
        </div>
      );
    case "troubleshooting":
      return section.problems.map((problem) => (
        <section className="boss-data-row" key={problem.symptom}>
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
export function BossSectionRenderer({ article }: { article: BossArticle }) {
  const sections = article.sections
    .filter((section) => section.visible)
    .sort((left, right) => left.order - right.order);
  let majorSectionIndex = 0;

  return sections.map((section) => {
    const Heading = section.toc ? "h2" : "h3";
    if (section.toc) majorSectionIndex += 1;

    return (
      <section
        className={`boss-section boss-section--${section.type}${section.toc ? " boss-section--major" : " boss-section--minor"}`}
        id={section.id}
        key={section.id}
      >
        {section.toc ? (
          <span aria-hidden="true" className="boss-section__number">
            {majorSectionIndex}
          </span>
        ) : null}
        <div className="boss-section__content">
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
export function BossMediaNotice({ locale }: { locale: ContentLocale }) {
  return (
    <p className="boss-media-notice">
      {locale === "zh-cn"
        ? "本文信息整理自公开网络资料与游戏内观察，部分配图为本站原创编辑示意图。外部信息与图片版权归原作者或平台所有；如有侵权，请联系我们删除。"
        : "Information is compiled from public web sources and in-game observations; some visuals are original editorial diagrams. External information and images remain the property of their authors or platforms; contact us for removal requests."}
    </p>
  );
}
