# Automated Publication Report — Ghostwrithe

## Status
- **Published**: YES (status = `published`)
- **noindex**: false
- **verificationStatus**: `pending-pc`
- **locale**: en + zh-cn (both created)
- **patch / league**: 0.5.4 / Early Access
- **dates**: createdAt, publishedAt, updatedAt, lastVerifiedAt = 2026-08-03
- **author / reviewer**: Exile2 Guides / Exile2 Guides Automated QA

## Files created
### Content (4)
1. `content/en/items/ghostwrithe.json`
2. `content/zh-cn/items/ghostwrithe.json`
3. `content/en/items/pillar-of-the-caged-god.json` (peer item, same batch)
4. `content/zh-cn/items/pillar-of-the-caged-god.json` (peer item, same batch)

### Research (this item, 11)
1. `research/items/ghostwrithe/source-ledger.md`
2. `research/items/ghostwrithe/claim-matrix.md`
3. `research/items/ghostwrithe/current-vs-legacy.md`
4. `research/items/ghostwrithe/scaling-formula.md`
5. `research/items/ghostwrithe/build-usage.md`
6. `research/items/ghostwrithe/alternatives.md`
7. `research/items/ghostwrithe/community-questions.md`
8. `research/items/ghostwrithe/video-timestamps.md`
9. `research/items/ghostwrithe/screenshot-shot-list.md`
10. `research/items/ghostwrithe/related-content-map.md`
11. `research/items/ghostwrithe/automated-publication-report.md`

## Gate checks (pre-publish)
- JSON.parse: PASS for both locale files.
- Forbidden unpublished-marker strings: none found in the article body.
- seo.noindex = false; status = published in both files.
- Single Sources module in body (section order 170); top-level `sources` array also present (allowed).

## Notes
- Existing ghostwrithe.json (EN) from a prior batch used incorrect mod values (35% conversion, chaos resistance) and an unapproved video URL; it was overwritten with the correct 100%-Life-from-ES spec.
- Values remain `pending-pc` pending a live 0.5.4 client capture.
