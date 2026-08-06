#!/usr/bin/env node
// Self-check for a single ko file. Usage: node ko_check.js <file.json>
const fs = require('fs');
const p = process.argv[2];
if (!p) { console.error('usage: ko_check.js <file>'); process.exit(2); }
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const bad = [];
if (d.locale !== 'ko') bad.push('locale');
if (!d.id || !d.slug) bad.push('id/slug');
const s = JSON.stringify(d);
if (/TODO|草稿|draft|placeholder|REPLACE_WITH/i.test(s)) bad.push('forbidden-marker');
// CJK unified ideographs (Chinese) must not appear in ko prose
if (/[一-鿿]/.test(s)) bad.push('cjk-garbage');
if (bad.length) { console.error('BAD: ' + p + ' :: ' + bad.join(',')); process.exit(1); }
console.log('OK ' + p);
