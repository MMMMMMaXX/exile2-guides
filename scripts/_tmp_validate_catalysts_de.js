// 临时校验脚本：仅用于解析目标 JSON 并打印关键字段，无副作用
const fs = require("fs");
const p =
  "/Users/manxin/Downloads/exile2-guides-prd/content/de/items/catalysts.json";
const d = JSON.parse(fs.readFileSync(p, "utf8"));
console.log("Valid JSON ✓");
console.log("top-level keys:", Object.keys(d).length);
console.log("status:", d.status);
console.log("seo.noindex:", d.seo.noindex);
console.log("translation.sourceLocale:", d.translation.sourceLocale);
console.log("translation.sourceContentId:", d.translation.sourceContentId);
console.log("translation.sourceRevision:", d.translation.sourceRevision);
console.log("translation.translationStatus:", d.translation.translationStatus);
console.log("translation.translationRisk:", d.translation.translationRisk);
console.log("translation.translatedAt:", d.translation.translatedAt);
console.log("translation.translator:", d.translator);
console.log("sections:", d.sections.length);
const forbidden = [
  "contentId",
  "sourceContentId",
  "completed",
  "manual-review",
  "none",
];
const scan = JSON.stringify(d);
const found = forbidden.filter((k) => new RegExp('"' + k + '"').test(scan));
console.log("forbidden tokens present:", found.length ? found : "none");
