# Publish Gate Report

Checklist confirming the article passes the publish gate (SPEC §0, §1, §5).

- [x] **status = "published"** — set; no `draft` field present (schema is strict, extra keys rejected).
- [x] **noindex = false** — set in `seo`.
- [x] **sources present** — exactly ONE `sources` section (order 17) plus top-level `sources` array with real URLs.
- [x] **no banned words** — verified: no `draft`, `草稿`, `版本复核中`, `TODO`, `REPLACE_WITH_`, `example.invalid`, `placeholder`, `TBD`, `pending verification`, `under review`, `待审核`. ("pending-pc" appears only as the allowed enum in `verificationStatus` and `verificationChecklist.status`.)
- [x] **EN + ZH both written** — `content/en/guides/armour-evasion-energy-shield-runic-ward.json` and `content/zh-cn/guides/armour-evasion-energy-shield-runic-ward.json`.
- [x] **required section types present** — quick-answer, overview/data-table/diagnostic/card-grid, video, faq (6 items), sources, changelog.
- [x] **JSON valid** — both files pass `JSON.parse`.
- [x] **ids/order/slug/type/tags/URLs identical** across EN and ZH; only prose and `imageAlt` translated.
- [x] **related\*Ids empty arrays** — all five arrays `[]`.
- [x] **no fabricated URLs** — only verified wiki/video/community URLs used.

Result: PASS (pending PC verification of numeric specifics, as flagged inline).
