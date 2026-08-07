const d = require("./content/fr/patches/patch-0-3-0c-sprint-skills-boss-fixes.json");
console.log("JSON OK");
console.log(
  "status:",
  d.status,
  "| locale:",
  d.locale,
  "| seo.noindex:",
  d.seo.noindex,
);
console.log(
  "translationStatus:",
  d.translation.translationStatus,
  "| translator:",
  d.translation.translator,
  "| sourceRevision:",
  d.translation.sourceRevision,
  "| translatedAt:",
  d.translation.translatedAt,
  "| risk:",
  d.translation.translationRisk,
);
const bad = [
  "completed",
  "manual-review",
  "none",
  "contentId",
  "sourceContentId",
].filter((k) => JSON.stringify(d).includes(k));
console.log("forbidden tokens present:", bad.length ? bad : "none");
// check no leftover Chinese
const chinese = /[\u4e00-\u9fff]/.test(JSON.stringify(d));
console.log("leftover CJK present:", chinese);
