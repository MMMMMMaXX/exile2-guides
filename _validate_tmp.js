// 临时校验脚本：校验目标 JSON 可解析且关键字段符合预期
const fs = require('fs');
const p = '/Users/manxin/Downloads/exile2-guides-prd/content/ja/patches/patch-0-3-0-support-gem-overhaul.json';
const data = JSON.parse(fs.readFileSync(p, 'utf8'));
console.log('JSON parse OK');
const t = data.translation;
console.log('sourceLocale:', t.sourceLocale);
console.log('sourceContentId:', t.sourceContentId);
console.log('sourceRevision:', t.sourceRevision);
console.log('translationStatus:', t.translationStatus);
console.log('translationRisk:', t.translationRisk);
console.log('translatedAt:', t.translatedAt);
console.log('translator:', t.translator);
console.log('root has contentId/sourceContentId/sourceRevision:', 'contentId' in data || 'sourceContentId' in data || 'sourceRevision' in data);
console.log('status:', data.status, 'seo.noindex:', data.seo.noindex);
const bad = ['completed','manual-review','none'].filter(k => JSON.stringify(data).includes('"'+k+'"'));
console.log('forbidden tokens present:', bad.length ? bad : 'none');
