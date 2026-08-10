/** 文件职责：把第一批攻略的本地审校译文覆盖到英文事实源结构，并写入可追踪的翻译元数据。 */

import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

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

const modulePath = process.argv[2];
if (!modulePath)
  throw new Error(
    "用法：node scripts/apply-first-batch-locale.mjs <locale-module>",
  );
const dictionary = await import(pathToFileURL(path.resolve(modulePath)));
const { locale, translator, ui, articles } = dictionary;

/** 将二元组转换成带正文数组的步骤，保持各内容 Schema 的稳定形状。 */
const steps = (values) =>
  values.map(([label, body]) => ({ label, body: [body] }));
/** 将二元组转换成 FAQ 条目。 */
const faq = (values) =>
  values.map(([question, answer]) => ({ question, answer: [answer] }));
/** 用统一的已核验说明本地化来源区，不修改事实源 URL。 */
function localizeSources(section) {
  section.categories = [
    {
      ...section.categories[0],
      label: ui.sourceLabel,
      description: ui.sourceDescription,
    },
  ];
  section.verificationChecklist = {
    ...section.verificationChecklist,
    notes: [ui.verificationNote],
  };
}

/** 按栏目稳定标识覆盖译文；未列出的结构字段始终继承英文事实源。 */
function localizeSections(type, sections, data) {
  for (const section of sections) {
    section.title = ui.sectionTitles[section.id] ?? section.title;
    if (section.id === "overview") {
      section.paragraphs = data.overview;
      section.bullets = data.keyPoints;
    } else if (section.id === "pros-cons") {
      section.pros = data.pros;
      section.cons = data.cons;
    } else if (section.id === "leveling") {
      section.steps = steps(data.leveling);
    } else if (section.id === "mapping") {
      section.paragraphs = data.mapping;
      section.bullets = [];
    } else if (section.id === "bossing") {
      section.paragraphs = data.bossing;
      section.bullets = [];
    } else if (section.id === "mechanics") {
      section.paragraphs = data.mechanics;
      section.bullets = data.mechanicBullets;
    } else if (section.id === "supports") {
      section.supports = data.supports.map(([label, note, priority]) => ({
        label,
        notes: [note],
        priority,
      }));
    } else if (section.id === "build-use-cases") {
      section.paragraphs = data.buildUse;
      section.bullets = [];
    } else if (section.id === "properties") {
      section.properties = data.properties.map(([label, value, note]) => ({
        label,
        value,
        notes: [note],
      }));
    } else if (section.id === "alternatives") {
      section.paragraphs = data.alternatives;
      section.bullets = [];
    } else if (section.id === "quick-answer") {
      section.items = data.quickAnswers.map(([title, body]) => ({
        title,
        body: [body],
      }));
    } else if (section.id === "progression-steps") {
      section.steps = steps(data.steps);
    } else if (section.id === "decisions") {
      section.paragraphs = data.decisions;
      section.bullets = [];
    } else if (section.id === "strategy") {
      section.paragraphs = data.strategy;
      section.bullets = data.strategyBullets;
    } else if (section.id === "build-considerations") {
      section.paragraphs = data.preparation;
      section.bullets = [];
    } else if (section.id === "common-mistakes") {
      section.paragraphs = data.mistakes;
      section.bullets = [];
    } else if (section.id === "faq") {
      section.items = faq(data.faq);
    } else if (section.id === "sources") {
      localizeSources(section);
    }
  }
  return sections;
}

for (const [type, slug] of batch) {
  const data = articles[slug];
  if (!data) throw new Error(`${locale} 缺少 ${slug} 的译文`);
  const sourcePath = path.join("content", "en", type, `${slug}.json`);
  const outputPath = path.join("content", locale, type, `${slug}.json`);
  const article = JSON.parse(await readFile(sourcePath, "utf8"));
  article.locale = locale;
  article.title = data.meta.title;
  article.shortTitle = data.meta.shortTitle;
  article.summary = data.meta.summary;
  article.description = data.meta.description;
  if (data.meta.imageAlt && "imageAlt" in article)
    article.imageAlt = data.meta.imageAlt;
  article.seo.title = data.meta.seoTitle;
  article.seo.description = data.meta.seoDescription;
  article.sections = localizeSections(type, article.sections, data);
  if (Array.isArray(article.relatedLinks)) {
    article.relatedLinks = article.relatedLinks.map((link) => ({
      ...link,
      href: link.href.replace(/^\/en\//, `/${locale}/`),
    }));
  }
  article.translation = {
    sourceLocale: "en",
    sourceContentId: slug,
    sourceRevision: article.revision,
    translationStatus: "reviewed",
    translatedAt: "2026-08-10",
    translator,
    translationRisk: "low",
  };
  await writeFile(outputPath, `${JSON.stringify(article, null, 2)}\n`);
}

console.log(`已写入 ${locale} 第一批 ${batch.length} 篇攻略。`);
