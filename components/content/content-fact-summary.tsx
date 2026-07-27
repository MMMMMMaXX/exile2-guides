/** 文件职责：以可扫描摘要展示各内容类型已经过 Schema 校验的事实字段，禁止推断缺失信息。 */
import type { ContentFrontMatter } from "../../lib/content/schema";

/** 将稳定标识转换为可读标签，避免在组件中重复维护内容枚举。 */
function formatValue(value: string): string {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/** 根据具体内容类型生成详情页摘要；只显示存在且可被前置 Schema 验证的字段。 */
function getFacts(frontMatter: ContentFrontMatter) {
  const zh = frontMatter.locale === "zh-cn";
  switch (frontMatter.contentType) {
    case "item":
      return [
        ...(frontMatter.itemType
          ? [
              {
                label: zh ? "物品类型" : "Item Type",
                value: formatValue(frontMatter.itemType),
              },
            ]
          : []),
        ...(frontMatter.rarity
          ? [
              {
                label: zh ? "稀有度" : "Rarity",
                value: formatValue(frontMatter.rarity),
              },
            ]
          : []),
        ...(frontMatter.requiredLevel
          ? [
              {
                label: zh ? "需求等级" : "Required Level",
                value: frontMatter.requiredLevel,
              },
            ]
          : []),
        {
          label: zh ? "适用场景" : "Use Cases",
          value: frontMatter.useCases.map(formatValue).join(" · "),
        },
      ];
    case "skill":
      return [
        ...(frontMatter.skillType
          ? [
              {
                label: zh ? "技能类型" : "Skill Type",
                value: formatValue(frontMatter.skillType),
              },
            ]
          : []),
        {
          label: zh ? "标签" : "Tags",
          value: frontMatter.tags.map(formatValue).join(" · "),
        },
        ...(frontMatter.requiredLevel
          ? [
              {
                label: zh ? "需求等级" : "Required Level",
                value: frontMatter.requiredLevel,
              },
            ]
          : []),
      ];
    case "guide":
      return [
        ...(frontMatter.guideCategory
          ? [
              {
                label: zh ? "指南类别" : "Guide Category",
                value: formatValue(frontMatter.guideCategory),
              },
            ]
          : []),
        ...(frontMatter.estimatedReadingMinutes
          ? [
              {
                label: zh ? "预计阅读" : "Reading Time",
                value: zh
                  ? `${frontMatter.estimatedReadingMinutes} 分钟`
                  : `${frontMatter.estimatedReadingMinutes} min`,
              },
            ]
          : []),
        ...(frontMatter.prerequisites.length > 0
          ? [
              {
                label: zh ? "前置条件" : "Prerequisites",
                value: frontMatter.prerequisites.join(" · "),
              },
            ]
          : []),
      ];
    case "patch":
      return [
        { label: zh ? "版本" : "Patch", value: frontMatter.patch },
        {
          label: zh ? "内容状态" : "Content Status",
          value: formatValue(frontMatter.patchStatus),
        },
        { label: zh ? "最近更新" : "Updated", value: frontMatter.updatedAt },
      ];
    default:
      return [];
  }
}

/** 渲染 Item、Skill、Guide、Patch 的简要事实卡；Build 与 Boss 使用各自更完整的摘要组件。 */
export function ContentFactSummary({
  frontMatter,
}: {
  frontMatter: ContentFrontMatter;
}) {
  const facts = getFacts(frontMatter);
  if (facts.length === 0) return null;
  const zh = frontMatter.locale === "zh-cn";
  return (
    <section
      className="content-fact-summary"
      aria-labelledby="content-fact-summary-title"
    >
      <h2 id="content-fact-summary-title">{zh ? "快速信息" : "Quick Facts"}</h2>
      <dl>
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
