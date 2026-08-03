# Publish Gate Report — resistance-curse-exposure-penetration

- **status**: `published` (not draft, no `draft` field present).
- **verificationStatus**: `pending-pc` (valid enum; no `automated-verified` used).
- **seo.noindex**: `false`.
- **locale files**: EN (`content/en/guides/...`) and ZH (`content/zh-cn/guides/...`) both written; prose fully translated, ids/order/slug/type/tags/URLs identical.
- **sources**: 4 real URLs present (poe2wiki official, Mobalytics, Elyxir, MisoxShiru video), all from brief/pool or WebFetch 200 verified. No fabricated URLs.
- **required sections present**: quick-answer, overview x2 (definitions, debuff-uptime), data-table x4 (interaction-matrix, order, boss-scenario, hit-vs-dot), diagnostic, common-mistakes, card-grid, video, faq (6), sources, changelog.
- **banned words check**: no `draft`, `草稿`, `版本复核中`, `TODO`, `REPLACE_WITH_`, `example.invalid`, `placeholder`, `TBD`, `pending verification` (prose uses `pending PC verification`), `under review`, `待审核`, `blocked`. The only `pending` usage is the structured enum `pending-pc`.
- **P0 errors avoided**: no PoE1 penetration floor copied; penetration-vs-DoT rule stated with version caveat; enemy persistent resistance vs per-hit resistance clearly distinguished; uptime/coverage (Curse Limit, boss curse reduction, Exposure duration) included.
- **JSON validity**: both files parse (validated with node JSON.parse).
