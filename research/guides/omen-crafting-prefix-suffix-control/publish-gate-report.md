# Publish Gate Report — omen-crafting-prefix-suffix-control

| Check | Status |
|---|---|
| `status` = "published" | PASS (no "draft" value, no `draft` field) |
| `noindex` = false | PASS |
| Exactly ONE `sources` section | PASS (section id `sources`, type `sources`) |
| Top-level `sources` array present | PASS (3 real entries) |
| No banned words (draft, 草稿, TODO, placeholder, TBD, 待审核, etc.) | PASS (verified via grep) |
| Valid JSON (both files) | PASS (node JSON.parse OK) |
| Required sections present | PASS (quick-answer, data-table x2, overview, tabs x2, progression-steps, risk-reward-matrix x2, version-conflicts, card-grid, video, common-mistakes, faq, sources, changelog) |
| Image alt required & non-empty | PASS (EN + ZH distinct) |
| Bilingual (EN + ZH) | PASS (both written, ids/slug/type/tags/URLs identical) |
| Empty related*Ids arrays | PASS (`relatedBuildIds`/`relatedBossIds`/`relatedItemIds`/`relatedPatchIds`/`relatedSkillIds` all `[]`) |
| Real source URLs only (WebSearch) | PASS (poe2wiki, Mobalytics, Bajheera YouTube; no invented URLs) |

Notes: precise numbers (drop level, stack size, prices) deliberately omitted and flagged pending PC verification per SPEC §1. Verification status: pending-pc.
