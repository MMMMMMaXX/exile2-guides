# Publish Gate Report

Checklist against the batch-5 authoring spec.

- [x] Top-level key order matches the reference JSON (id, slug, locale, type, status, featured, title, shortTitle, summary, description, guideCategory, heroImage, cardImage, imageAlt, estimatedReadingMinutes, prerequisites, patch, league, patchStatus, verificationStatus, verifiedClientVersion, author, reviewer, createdAt, publishedAt, updatedAt, tags, sections, relatedBuildIds, relatedBossIds, relatedItemIds, relatedPatchIds, relatedSkillIds, sources, seo).
- [x] status = "published"; featured = false; guideCategory = "mechanics"; verificationStatus = "pending-pc".
- [x] No `draft`, `unresolvedClaimCount`, or `automated-verified` field used.
- [x] seo.noindex = false.
- [x] heroImage and cardImage = /images/skills/lightning-arrow.webp (webp, under /images/).
- [x] imageAlt present (EN English, ZH Chinese).
- [x] dates createdAt/publishedAt/updatedAt = 2026-08-03; patch = "Path of Exile 2 Early Access 0.5.4"; league = "Standard"; patchStatus = "current"; verifiedClientVersion = "0.5.4"; author = "Exile2 Guides Editorial Team"; reviewer = "Max".
- [x] Section types are all valid (quick-answer, overview, data-table, diagnostic, common-mistakes, card-grid, video, faq, sources, changelog). No invented types.
- [x] Video uses the exact URL https://www.youtube.com/watch?v=X9kM7Wuyuog with 6 timestamps.
- [x] Bilingual: EN file fully English; ZH file fully Simplified Chinese; id/order/slug/type/tags/URLs identical.
- [x] Banned words avoided (no draft, 草稿, 版本复核中, TODO, REPLACE_WITH_, example.invalid, placeholder, TBD, pending verification, under review, 待审核, blocked). "pending PC verification" used only where the brief sanctions it for version-sensitive claims.
- [x] Sources present and real (wiki + YouTube + Maxroll); no fabricated URLs.
- [x] Both EN and ZH files written and JSON-validated (node JSON.parse passed).

Result: READY to publish (verificationStatus pending-pc, as designed).
