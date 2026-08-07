# Publish Gate Report — power-frenzy-endurance-charges

## Required fields

- status: "published" — present (EN + ZH) ✅
- featured: false — present ✅
- guideCategory: "mechanics" — present ✅
- verificationStatus: "pending-pc" — present (NOT "automated-verified") ✅
- seo.noindex: false — present ✅
- dates (createdAt/publishedAt/updatedAt): "2026-08-03" — present ✅
- patch: "Path of Exile 2 Early Access 0.5.4"; league: "Standard"; patchStatus: "current"; verifiedClientVersion: "0.5.4" — present ✅
- author: "Exile2 Guides Editorial Team"; reviewer: "Max" — present ✅
- heroImage & cardImage: "/images/skills/combat-frenzy.webp" — present ✅
- imageAlt: required non-empty, EN and ZH variants — present ✅

## Forbidden fields / words

- No `draft` field, no `unresolvedClaimCount`, no "automated-verified" — none present ✅
- Banned prose words (draft, 草稿, 版本复核中, TODO, REPLACE_WITH_, example.invalid, placeholder, TBD, pending verification, under review, 待审核, blocked) — none found in EN or ZH ✅

## Sections

- Both files: 15 sections, ids/orders/types identical across locales.
- Required section types present: quick-answer, data-table (x3), overview (x4), diagnostic, common-mistakes, card-grid, video, faq (6), sources (one), changelog. ✅
- Video URL matches brief exactly: https://www.youtube.com/watch?v=5KBHxWgU-0s (7 timestamps, EN/ZH labels). ✅

## Sources

- Top-level `sources` array (3) and one `sources` section present with verificationChecklist status "pending-pc". ✅

## Bilingual

- EN file fully English; ZH file fully Simplified Chinese (ids/orders/slug/type/tags/URLs identical). ✅

## Validation

- JSON.parse on both files succeeds (see STEP 5 run). ✅

Gate: PASS (publish-first, pending-pc verification).
