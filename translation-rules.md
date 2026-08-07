# POE2 内容翻译规则（机器草稿 machine-draft）

将 `content/en/<TYPE>/*.json` 翻译为目标语种，写入 `content/<LOC>/<TYPE>/<slug>.json`。

## 通用

- 输入：`content/en/<TYPE>/*.json`
- 输出：`content/<LOC>/<TYPE>/<slug>.json`（`slug` 与源完全相同）
- **绝不**修改 `content/en/`、`content/zh-cn/` 下任何文件，也**绝不**删除任何文件。只新建 `content/<LOC>/<TYPE>/` 文件。
- 若目标文件已存在则**跳过**（断点续跑）。
- 保持 JSON 结构与所有 `sections` 数组及其内部对象类型/`id` 完全不变。

## 必须翻译（改为目标语种）的字段 VALUE

根级：`title`, `shortTitle`, `seoTitle`, `seoDescription`, `summary`, `description`, `imageAlt`, `league`（可保留 "Early Access"）, `reviewMethod`, `verificationMethod`；`patch` 中版本串（如 "Path of Exile 2 Early Access 0.5.4"）保持原样、其余可读文本翻译；`seo.title`, `seo.description`。
所有 `sections[]` 内文本字段：`title`, `callout`, `calloutDetail[]`, `answers[].label`, `answers[].text[]`, `facts[].label`, `facts[].value`, `facts[].note[]`, `paragraphs[]`, `bullets[]`, `note[]`, `columns[]`, `rows[].label`, `rows[].note`, `rows[].values[].text`, `intro[]`, `routes[].label`, `routes[].body[]`, `items[].label`, `items[].checks[]`, `items[].why`, `items[].fix`, `steps[].label`, `steps[].body[]`, `scenario`, `audience`, `benefit`, `risk`, `recommendation`, `gain`, `loss`, `builds[].title`, `builds[].description`, `entries[].kind`, `entries[].question`, `entries[].summary[]`, `entries[].editorialAnalysis[]`, `entries[].officialAnswer[]`, `entries[].sourceId`（保持 slug 原样）, `problems[].symptom`, `problems[].directAnswer[]`, `problems[].checks[]`, `faq[].question`, `faq[].answer[]`, `patch-history` 的 `changes[]`, `sources` 块的 `categories[].label`（分类标签如 "OFFICIAL" 可保留英文或译）, `categories[].description`, `community-evidence` 文本, `video` 块的 `entries[].label`, `entries[].description`, `entries[].takeaway`, `timestamps[].label`, `related-content` 的 `items[].title`, `items[].description`, `links[].label`, `changelog` 的 `changes[]` 等所有可读文本。
游戏专有名词（如 "Vaal Orb"、"Atziri"、"Whirling Assault"）可保留英文（各语种社区常混用），但描述性句子必须翻译。

## 禁止翻译（保持原值）

JSON 键名；以下形式的值保持原样：标识符/slug（`^[a-z0-9]+(?:-[a-z0-9]+)*$`）、URL（http/https 开头）、图片/文件路径（以 / 开头）、ISO 日期（YYYY-MM-DD）、数字、null、布尔；枚举值：`yes`/`no`/`text`/`high`/`low`/`medium`/`official`/`in-game`/`community`/`tool`/`other`/`current`/`supported`/`legacy`/`under-review`/`draft`/`published`/`source-reviewed`/`pending-pc`/`verified`。

## 必须修改

- `locale` → `"<LOC>"`
- `status` → 复制源文件的值
- `id`/`slug`/`contentId` → 与源相同

## 内部链接本地化

`href` 字段若为 `/en/...` 形式，把 `/en/` 替换为 `/<LOC>/`（保留 `#anchor`）。外部 https 链接保持。

## 必须新增 translation 块（根对象末尾）

```json
"translation": {
  "sourceLocale": "en",
  "sourceContentId": "<slug>",
  "sourceRevision": "<源 en 文件 updatedAt 值，YYYY-MM-DD>",
  "translationStatus": "machine-draft",
  "translatedAt": "2026-08-04",
  "translator": "llm-automated",
  "translationRisk": "low"
}
```

## 输出格式

JSON 2 空格缩进，结尾换行；字段顺序与源尽量一致（`translation` 放末尾）。用 Write 工具写入。

## 完成后

运行 `export BASH_ENV=/dev/null NODE_OPTIONS="--use-system-ca" && npm run validate:content`。对「其他类型/语种尚未翻译」关联内容打印的 missing-related-content **警告**是预期的、非致命；但若报**你写的文件**的 schema/校验 ERROR，修复对应文件后重跑。报告：写入文件数、跳过数、以及你不确定如何处理的特殊字段。不要 push、不要 commit、不要运行 build。
