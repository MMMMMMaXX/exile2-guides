# Publish Gate Report — accuracy-distance-penalty-hit-chance

Pre-publish checks for the orchestrator's gate.

- status: "published" — correct, no "draft" field present.
- featured: false — correct.
- guideCategory: "mechanics" — correct for this batch.
- verificationStatus: "pending-pc" — correct enum; "automated-verified" NOT used.
- seo.noindex: false — correct.
- No banned words: verified none of `draft`, `草稿`, `版本复核中`, `TODO`, `REPLACE_WITH_`, `example.invalid`, `placeholder`, `TBD`, `pending verification`, `under review`, `待审核`, `blocked` appear in either file. Note: the prose also avoids the word "pending" entirely (only the structured enum `pending-pc` is used).
- Sources present: top-level `sources` array and a single `sources` section both populated with real URLs from the brief pool.
- Sections: 14 sections per file, including required quick-answer, data-tables (skill-matrix, worked-examples, formula-variables), diagnostic, video, faq (5 items), sources, changelog.
- EN + ZH both written; ids/order/slug/type/tags/URLs identical across files; imageAlt translated.
- video URL matches brief exactly: https://www.youtube.com/watch?v=UiHcZFe2xCo with 6 timestamps.
- JSON parse validation: PASS (node JSON.parse on both files).
- Not committed or pushed (orchestrator handles VCS).
