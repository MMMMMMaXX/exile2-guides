# Publish Gate Report — item-modifiers-item-level-prefix-suffix

- **status**: `published` (not draft/archived) ✅
- **no `draft` field present** ✅
- **noindex**: `false` ✅
- **sources present**: top-level `sources` array (3 entries) + exactly ONE `sources` section (order 18) ✅
- **banned words**: none found (`draft`, `placeholder`, `TODO`, `TBD`, `待审核`, etc. absent) ✅
- **verificationStatus**: `pending-pc`; verificationChecklist.status `pending-pc` (allowed enum) ✅
- **bilingual**: EN file all English; ZH file fully Simplified Chinese. ids/order/slug/type/tags/URLs identical across both ✅
- **imageAlt**: non-empty, English in EN / Chinese in ZH ✅
- **related\*Ids**: all five arrays empty `[]`; no `relatedGuideIds` field ✅
- **JSON valid**: both files pass `JSON.parse` ✅
- **section counts**: 19 sections each (EN and ZH) ✅
- **FAQ**: 6 items (meets 3–6 requirement) ✅
- **estimatedReadingMinutes**: 15 (within 10–18) ✅
- **fabricated data**: no invented URLs, no invented precise breakpoints/prices; version-sensitive numbers phrased qualitatively / pending PC verification ✅

Both EN and ZH articles written and validated. Ready for publish gate.
