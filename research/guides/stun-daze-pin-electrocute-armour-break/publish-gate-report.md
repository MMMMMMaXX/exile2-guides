# Publish Gate Report — stun-daze-pin-electrocute-armour-break

| Check | Status |
|-------|--------|
| `status` = "published" | PASS |
| No `draft` field present | PASS |
| `noindex` = false | PASS |
| Exactly one `sources` section (type "sources") | PASS |
| Top-level `sources` array present with real URLs | PASS |
| No banned words (draft/草稿/TODO/placeholder/TBD/pending verification/under review/待审核) | PASS (verified via grep) |
| Both EN and ZH files authored | PASS |
| JSON valid (node JSON.parse) | PASS (both parse) |
| `id` == `slug` (lowercase-hyphen) | PASS |
| tags lowercase-hyphen, no capitals/spaces | PASS |
| empty related*Ids arrays | PASS |
| `imageAlt` required & non-empty (EN/ZH) | PASS |
| bilingual video timestamps (EN labels / ZH labels) | PASS |
| featured = false, verificationStatus = pending-pc | PASS |

Notes:
- Exact buildup thresholds intentionally described qualitatively; flagged for in-game verification (verificationStatus pending-pc).
- Video timestamps are representative navigation cues pending review of the live video.
- Cross-guide mentions are inline prose only; no relatedGuideIds used.
