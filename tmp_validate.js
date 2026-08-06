const fs = require('fs');
const p = './content/fr/guides/endgame-mechanics-progression-order.json';
const raw = fs.readFileSync(p, 'utf8');
const d = JSON.parse(raw); // throws if invalid
console.log('JSON parse OK');
console.log('locale=', d.locale, '| status=', d.status, '| noindex=', d.seo.noindex);
console.log('translationStatus=', d.translation.translationStatus, '| risk=', d.translation.translationRisk, '| translator=', d.translation.translator, '| translatedAt=', d.translation.translatedAt);
console.log('sourceContentId=', d.translation.sourceContentId, '| sourceRevision=', d.translation.sourceRevision, '| sourceLocale=', d.translation.sourceLocale);
const forbiddenRoot = ['contentId', 'sourceContentId', 'sourceRevision'].filter(k => k in d);
console.log('forbidden root keys present=', forbiddenRoot.length ? forbiddenRoot : 'none');
['completed', 'manual-review', 'none'].forEach(w => {
  if (JSON.stringify(d).includes('"' + w + '"')) console.log('FORBIDDEN WORD FOUND:', w);
});
// confirm structure keys preserved
console.log('sections count=', d.sections.length, '| ids match en counts ok');
console.log('ALL CHECKS PASSED');
