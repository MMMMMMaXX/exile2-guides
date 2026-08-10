/** 文件职责：审计第一批 15 篇攻略在 10 种语言中的发布状态、结构、来源与翻译修订一致性。 */

import { readFile } from "node:fs/promises";
import path from "node:path";

const locales = [
  "en",
  "zh-cn",
  "pt-br",
  "ru",
  "de",
  "es",
  "fr",
  "ja",
  "ko",
  "tr",
];
const batch = [
  ["builds", "big-monkee-spirit-walker"],
  ["builds", "grenade-gemling-legionnaire"],
  ["builds", "lightning-arrow-deadeye"],
  ["skills", "tornado"],
  ["skills", "ball-lightning"],
  ["skills", "gas-grenade"],
  ["skills", "lightning-spear"],
  ["items", "adonias-ego"],
  ["items", "sire-of-shards"],
  ["items", "crown-of-the-pale-king"],
  ["guides", "best-atlas-tree-0-5"],
  ["guides", "currency-farming-strategies-0-5"],
  ["guides", "classes-ascendancies-guide"],
  ["guides", "act-1-4-boss-permanent-rewards-checklist"],
  ["bosses", "the-executioner"],
];

const errors = [];
const readArticle = async (locale, type, slug) => {
  const file = path.join("content", locale, type, `${slug}.json`);
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    errors.push(
      `${file}: ${error.code === "ENOENT" ? "文件缺失" : error.message}`,
    );
    return null;
  }
};

/** 返回必须跨语言保持一致的章节骨架。 */
const sectionShape = (article) =>
  article.sections.map(({ id, order, type, visible, toc }) => ({
    id,
    order,
    type,
    visible,
    toc,
  }));
/** 返回事实源 URL；译文可以本地化说明，但不可悄悄更换证据。 */
const sourceUrls = (article) => article.sources.map(({ url }) => url);
/** 收集面向读者的长文本，用于阻止整句英文正文残留；短专名和稳定枚举不参与。 */
function visibleLongStrings(article) {
  const values = [];
  const visit = (value, key = "") => {
    if (typeof value === "string") {
      if (
        !["id", "type", "priority", "url"].includes(key) &&
        value.length >= 24 &&
        value.includes(" ")
      ) {
        values.push(value);
      }
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) visit(item, key);
      return;
    }
    if (value && typeof value === "object") {
      for (const [childKey, childValue] of Object.entries(value))
        visit(childValue, childKey);
    }
  };
  visit({
    title: article.title,
    summary: article.summary,
    description: article.description,
    imageAlt: article.imageAlt,
    seo: article.seo,
    sections: article.sections,
  });
  return values;
}

let checked = 0;
for (const [type, slug] of batch) {
  const source = await readArticle("en", type, slug);
  if (!source) continue;
  if (source.status !== "published")
    errors.push(`en/${type}/${slug}: status 不是 published`);
  if (source.seo?.noindex !== false)
    errors.push(`en/${type}/${slug}: seo.noindex 不是 false`);
  if (!source.revision) errors.push(`en/${type}/${slug}: 缺少 revision`);
  const expectedShape = JSON.stringify(sectionShape(source));
  const expectedSources = JSON.stringify(sourceUrls(source));
  const sourceVisibleStrings = new Set(visibleLongStrings(source));

  for (const locale of locales) {
    const article =
      locale === "en" ? source : await readArticle(locale, type, slug);
    if (!article) continue;
    checked += 1;
    const label = `${locale}/${type}/${slug}`;
    if (article.locale !== locale) errors.push(`${label}: locale 字段不匹配`);
    if (article.status !== "published")
      errors.push(`${label}: status 不是 published`);
    if (article.seo?.noindex !== false)
      errors.push(`${label}: seo.noindex 不是 false`);
    if (!article.seo?.title || !article.seo?.description)
      errors.push(`${label}: SEO 标题或描述为空`);
    if (JSON.stringify(sectionShape(article)) !== expectedShape)
      errors.push(`${label}: 章节骨架与英文事实源不一致`);
    if (JSON.stringify(sourceUrls(article)) !== expectedSources)
      errors.push(`${label}: 来源 URL 与英文事实源不一致`);
    if (locale !== "en") {
      const meta = article.translation;
      if (!meta) {
        errors.push(`${label}: 缺少 translation 元数据`);
      } else {
        if (meta.sourceLocale !== "en" || meta.sourceContentId !== slug)
          errors.push(`${label}: 翻译事实源标识错误`);
        if (meta.sourceRevision !== source.revision)
          errors.push(`${label}: sourceRevision 未跟随英文 revision`);
        if (meta.translationStatus !== "reviewed")
          errors.push(`${label}: translationStatus 不是 reviewed`);
      }
      if (
        article.title === source.title ||
        article.summary === source.summary ||
        article.description === source.description
      ) {
        errors.push(`${label}: 核心展示文案仍与英文完全相同`);
      }
      const unchangedSentence = visibleLongStrings(article).find((value) =>
        sourceVisibleStrings.has(value),
      );
      if (unchangedSentence)
        errors.push(`${label}: 仍有整句英文残留：${unchangedSentence}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`第一批多语言审计失败：${errors.length} 个问题。`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `第一批多语言审计通过：${checked}/${batch.length * locales.length} 个内容文件。`,
);
