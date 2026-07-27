/** 文件职责：将已核验 Boss Front Matter 组织为战前快速准备摘要，不推测机制或配装。 */
import type { BossFrontMatter } from "../../lib/content/schema";

/** 将已有稳定标识转为可读标签，避免为展示层维护第二份难度和伤害类型枚举。 */
function formatValue(value: string): string {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/** 渲染 Boss 的真实位置、等级、伤害和难度；缺失的可选字段不会伪造展示。 */
export function BossQuickPreparation({
  frontMatter,
}: {
  frontMatter: BossFrontMatter;
}) {
  const isChinese = frontMatter.locale === "zh-cn";
  const items = [
    frontMatter.location
      ? { label: isChinese ? "位置" : "Location", value: frontMatter.location }
      : undefined,
    frontMatter.campaignStage
      ? {
          label: isChinese ? "战役阶段" : "Campaign / Endgame",
          value: frontMatter.campaignStage,
        }
      : undefined,
    frontMatter.recommendedLevel
      ? {
          label: isChinese ? "建议等级" : "Recommended Level",
          value: frontMatter.recommendedLevel,
        }
      : undefined,
    {
      label: isChinese ? "主要伤害类型" : "Primary Damage Types",
      value: frontMatter.damageTypes.map(formatValue).join(" · "),
    },
    ...(frontMatter.difficulty
      ? [
          {
            label: isChinese ? "编辑难度" : "Editorial Difficulty",
            value: formatValue(frontMatter.difficulty),
          },
        ]
      : []),
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <section
      className="boss-quick-preparation"
      aria-labelledby="boss-quick-preparation-title"
    >
      <h2 id="boss-quick-preparation-title">
        {isChinese ? "战前快速准备" : "Quick Preparation"}
      </h2>
      <dl>
        {items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
