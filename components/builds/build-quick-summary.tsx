/** 文件职责：将 Build 已核验的 Front Matter 转为可扫描摘要，禁止补造精确评分或缺失字段。 */
import type { BuildFrontMatter } from "../../lib/content/schema";

/** 将稳定标识转为可读短语，用于展示已有字段而不创建第二份枚举映射。 */
function formatValue(value: string): string {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/** 渲染 Build 的真实快速摘要；字段来自已发布内容，不展示 DPS 或评分等不可复核数值。 */
export function BuildQuickSummary({
  frontMatter,
}: {
  frontMatter: BuildFrontMatter;
}) {
  const isChinese = frontMatter.locale === "zh-cn";
  const items = [
    {
      label: isChinese ? "适合人群" : "Best For",
      value: frontMatter.bestFor.map(formatValue).join(" · "),
    },
    {
      label: isChinese ? "主伤害类型" : "Main Damage Type",
      value: frontMatter.damageTypes.map(formatValue).join(" · "),
    },
    {
      label: isChinese ? "玩法风格" : "Playstyle",
      value: frontMatter.playstyle.map(formatValue).join(" · "),
    },
    ...(frontMatter.budget
      ? [
          {
            label: isChinese ? "装备依赖" : "Gear Dependency",
            value: formatValue(frontMatter.budget),
          },
        ]
      : []),
  ];

  return (
    <section
      className="build-quick-summary"
      aria-labelledby="build-quick-summary-title"
    >
      <h2 id="build-quick-summary-title">
        {isChinese ? "快速摘要" : "Quick Summary"}
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
