# Publish Gate Report — damage-scaling-order-conversion-gain-as-extra

## Gate checks

- [x] status = "published" (no `draft` field, no `unresolvedClaimCount`, no "automated-verified").
- [x] guideCategory = "mechanics".
- [x] verificationStatus = "pending-pc".
- [x] seo.noindex = false.
- [x] heroImage & cardImage = /images/skills/explosive-shot.webp (same path; .webp under /images/).
- [x] imageAlt present (EN English, ZH Chinese).
- [x] dates createdAt/publishedAt/updatedAt = "2026-08-03"; patch = "Path of Exile 2 Early Access 0.5.4"; league = "Standard"; patchStatus = "current"; verifiedClientVersion = "0.5.4"; author = "Exile2 Guides Editorial Team"; reviewer = "Max".
- [x] All 14 sections have unique id + sequential order + toc:true + visible:true + a valid type.
- [x] Required sections present: quick-answer, overview(s), data-table(s) x4, common-mistakes, card-grid, video, faq (6 items), sources (one), changelog.
- [x] Video URL = https://www.youtube.com/watch?v=MvwmmjVIes0 with 7 timestamps (EN labels / ZH labels).
- [x] related* arrays are empty.
- [x] Bilingual: EN file all English; ZH file all Simplified Chinese (id/order/slug/type/tags/URLs identical).
- [x] No banned words (draft, 草稿, 版本复核中, TODO, REPLACE_WITH_, example.invalid, placeholder, TBD, pending verification, under review, 待审核, blocked). Uncertain specifics phrased qualitatively (e.g. "version-sensitive", "confirm in the live client") rather than as banned prose.
- [x] Sources present (top-level + sources section), real URLs only.

## Files

- EN: content/en/guides/damage-scaling-order-conversion-gain-as-extra.json
- ZH: content/zh-cn/guides/damage-scaling-order-conversion-gain-as-extra.json

## Status

Ready for the orchestrator's validation and build. JSON parse-validated separately.
