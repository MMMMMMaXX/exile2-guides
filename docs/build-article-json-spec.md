<!-- 文件职责：声明 Build 文章生成、人工编辑、构建校验和未来数据库导入共同遵守的 JSON 规范。 -->

# BuildArticle JSON 规范

> 规范版本：1.2  
> 更新时间：2026-07-30 10:51（Asia/Shanghai）  
> 代码事实源：`lib/builds/schema.ts`

## 1. 使用范围

本规范仅用于 Builds 模块。Bosses、Items、Skills、Guides 和 Patch Notes
继续使用现有 Markdown 内容链，除非后续另行批准迁移。

每篇文章、每种语言使用一个 JSON 文件：

```text
content/
├── en/
│   └── builds/
│       └── ice-shot-deadeye.json
└── zh-cn/
    └── builds/
        └── ice-shot-deadeye.json
```

文件名必须与 `slug` 完全相同。翻译版本必须共享相同的 `id` 和 `slug`。

## 2. 核心原则

- JSON 是 Build 内容的唯一事实源，页面组件不得直接维护第二份文章数据。
- `id` 用于数据库关系和翻译关系，发布后不得修改。
- `slug` 用于公开 URL，发布后原则上不得修改。
- canonical 由 `locale + slug` 自动生成，不写入 JSON。
- 筛选、搜索、预渲染和 Sitemap 全部从同一份已发布 JSON 派生。
- `draft` 和 `archived` 不进入页面、搜索、Sitemap 或生产预渲染。
- 不允许 HTML 字符串；正文以结构化段落、列表和章节数据表达。
- 未核验事实可以存在于草稿，但不得把草稿改成 `published`。

## 3. 顶层字段

### 3.1 身份与发布状态

| 字段       | 类型                                   | 必填 | 说明                       |
| ---------- | -------------------------------------- | ---- | -------------------------- |
| `id`       | stable identifier                      | 是   | 数据库主关联与翻译关系     |
| `slug`     | stable identifier                      | 是   | URL slug，必须与文件名相同 |
| `locale`   | `"en" \| "zh-cn"`                      | 是   | 当前文件语言               |
| `type`     | `"build"`                              | 是   | 固定值                     |
| `status`   | `"draft" \| "published" \| "archived"` | 是   | 发布状态                   |
| `featured` | boolean                                | 是   | 是否允许首页或推荐模块突出 |

stable identifier 只允许：

```text
小写英文字母
数字
单个短横线
```

正确：

```text
ice-shot-deadeye
build-003
```

错误：

```text
Ice_Shot
ice--shot
冰霜射击
```

以下 slug 被路由保留，文章不得使用：

```text
classes
ascendancies
starter
leveling
endgame
bossing
budget
```

### 3.2 标题与摘要

| 字段          | 类型   | 说明                     |
| ------------- | ------ | ------------------------ |
| `title`       | string | 页面 H1                  |
| `shortTitle`  | string | 卡片或窄布局使用的短标题 |
| `summary`     | string | 列表卡片及详情 Hero 摘要 |
| `description` | string | 文章定位和编辑说明       |

这些字段都不能为空。不要在已发布标题中使用“草稿”“模板”“待补充”等字样。

### 3.3 Build 分类字段

| 字段                | 类型                        | 说明             |
| ------------------- | --------------------------- | ---------------- |
| `classId`           | stable identifier           | 职业             |
| `ascendancyId`      | stable identifier 或 `null` | 升华             |
| `mainSkillIds`      | stable identifier[]         | 主技能           |
| `secondarySkillIds` | stable identifier[]         | 辅助或次要技能   |
| `stages`            | BuildStage[]                | 适用成长阶段     |
| `budgets`           | BuildBudget[]               | 可支持的预算范围 |
| `difficulty`        | BuildDifficulty 或 `null`   | 学习难度         |
| `playstyleTags`     | stable identifier[]         | 玩法标签         |
| `damageTypes`       | stable identifier[]         | 伤害类型         |
| `bestFor`           | stable identifier[]         | 适合人群或目标   |

`BuildStage`：

```text
starter
leveling
early-endgame
endgame
bossing
```

`BuildBudget`：

```text
low
medium
high
luxury
```

`BuildDifficulty`：

```text
beginner
intermediate
advanced
```

### 3.4 Patch、核验与编辑信息

| 字段                    | 类型                               | 说明              |
| ----------------------- | ---------------------------------- | ----------------- |
| `patch`                 | string                             | 适用 Patch        |
| `league`                | string                             | League 或发布环境 |
| `patchStatus`           | PatchStatus                        | Patch 状态        |
| `verificationStatus`    | `"pending-pc" \| "verified"`，可选 | 核验状态          |
| `verifiedClientVersion` | string，可选                       | 已核验客户端版本  |
| `author`                | string                             | 作者或编辑团队    |
| `reviewer`              | string                             | 审核人            |
| `createdAt`             | `YYYY-MM-DD`                       | 创建日期          |
| `publishedAt`           | `YYYY-MM-DD`，发布时必填           | 首次发布日期      |
| `updatedAt`             | `YYYY-MM-DD`                       | 最近内容修改日期  |
| `lastVerifiedAt`        | `YYYY-MM-DD`                       | 最近事实核验日期  |

`PatchStatus`：

```text
current
supported
legacy
under-review
```

发布状态下必须填写：

- `reviewer`
- `publishedAt`
- `difficulty`
- 至少一个主技能、阶段、预算、玩法、伤害类型和适用目标
- 至少一个可见章节
- 至少一个来源
- `verified` 状态必须有 `lastVerifiedAt` 和 `verifiedClientVersion`
- `pending-pc` 可以暂时没有 `lastVerifiedAt`，但页面必须保留待核验提示

### 3.5 图片

| 字段        | 类型             | 说明                   |
| ----------- | ---------------- | ---------------------- |
| `heroImage` | string，可选     | 详情 Hero 图片         |
| `cardImage` | string，可选     | 列表卡片图片           |
| `imageAlt`  | string，条件必填 | 任意图片存在时必须填写 |

图片必须：

- 使用以 `/` 开头的稳定资源路径。
- 使用 `.webp` 或 `.avif`。
- 通过现有 Vite 图片指纹管线输出长期缓存 URL。

示例：

```json
{
  "heroImage": "/images/builds/ice-shot-deadeye.webp",
  "cardImage": "/images/builds/ice-shot-deadeye-card.webp",
  "imageAlt": "Ice Shot Deadeye build overview illustration"
}
```

### 3.6 关系、来源与 SEO

```json
{
  "tags": ["ranged", "cold", "starter"],
  "relatedBuildIds": ["lightning-arrow-deadeye"],
  "relatedGuideIds": ["campaign-progression"],
  "sources": [
    {
      "label": "Official Path of Exile 2 source",
      "url": "https://www.pathofexile.com/",
      "sourceType": "official"
    }
  ],
  "seo": {
    "title": "Ice Shot Deadeye Build | Exile2 Guides",
    "description": "Complete description for search results.",
    "noindex": false
  }
}
```

`sourceType`：

```text
official
in-game
community
tool
other
```

不要填写 `canonical`。系统会生成：

```text
/{locale}/builds/{slug}/
```

## 4. 章节公共字段

每个章节都必须包含：

```json
{
  "id": "overview",
  "type": "overview",
  "title": "Build Overview",
  "order": 10,
  "visible": true,
  "toc": true
}
```

约束：

- `id` 在单篇文章内唯一。
- `order` 在单篇文章内唯一。
- 页面按 `order` 从小到大渲染。
- `visible: false` 的章节不显示，也不进入目录。
- `toc` 默认为 `true`；设为 `false` 时章节仍会渲染，但不进入目录，并使用次级紧凑样式。
- 推荐按 `10、20、30` 递增，方便以后插入章节。

## 5. 章节类型

### 5.1 叙述章节

适用类型：

```text
overview
playstyle
mapping
bossing
transformation
crossbow
dot-rotation
community
sources
```

结构：

```json
{
  "id": "overview",
  "type": "overview",
  "title": "Build Overview",
  "order": 10,
  "visible": true,
  "paragraphs": ["First paragraph.", "Second paragraph."],
  "bullets": ["First verified point.", "Second verified point."]
}
```

### 5.2 优缺点

```json
{
  "id": "pros-cons",
  "type": "pros-cons",
  "title": "Pros and Cons",
  "order": 20,
  "visible": true,
  "pros": ["Advantage one"],
  "cons": ["Trade-off one"]
}
```

### 5.3 成长步骤

适用类型：

```text
leveling
passive-tree
ascendancy
upgrade-priority
```

结构：

```json
{
  "id": "leveling",
  "type": "leveling",
  "title": "Leveling Progression",
  "order": 30,
  "visible": true,
  "steps": [
    {
      "label": "Early campaign",
      "levelRange": "1-20",
      "body": ["Explain the verified skill and equipment transition."]
    }
  ]
}
```

`levelRange` 可省略，其他字段必须存在。

### 5.4 技能配置

```json
{
  "id": "skills",
  "type": "skills",
  "title": "Skill Setup",
  "order": 40,
  "visible": true,
  "groups": [
    {
      "label": "Main damage setup",
      "skills": [
        {
          "skillId": "ice-shot",
          "role": "Primary damage skill",
          "supportSkillIds": ["support-one", "support-two"],
          "notes": ["Explain when and why this setup is used."]
        }
      ]
    }
  ]
}
```

### 5.5 装备

```json
{
  "id": "gear",
  "type": "gear",
  "title": "Equipment",
  "order": 50,
  "visible": true,
  "slots": [
    {
      "slot": "Weapon",
      "recommendations": [
        "Describe required properties without inventing an item."
      ],
      "notes": ["Explain budget alternatives and upgrade timing."]
    }
  ]
}
```

### 5.6 属性优先级

```json
{
  "id": "stat-priority",
  "type": "stat-priority",
  "title": "Stat Priority",
  "order": 60,
  "visible": true,
  "priorities": [
    {
      "label": "Verified stat",
      "reason": "Explain why this stat matters."
    }
  ]
}
```

### 5.7 故障排查

```json
{
  "id": "troubleshooting",
  "type": "troubleshooting",
  "title": "Troubleshooting",
  "order": 70,
  "visible": true,
  "problems": [
    {
      "symptom": "The build runs out of resources",
      "checks": [
        "Check the verified resource requirements.",
        "Check the relevant support setup."
      ]
    }
  ]
}
```

### 5.8 FAQ

```json
{
  "id": "faq",
  "type": "faq",
  "title": "FAQ",
  "order": 80,
  "visible": true,
  "items": [
    {
      "question": "Is this suitable for a new player?",
      "answer": ["Give a direct answer and then explain the limits."]
    }
  ]
}
```

### 5.9 视频

```json
{
  "id": "video",
  "type": "video",
  "title": "Video",
  "order": 90,
  "visible": true,
  "entries": [
    {
      "label": "Verified gameplay demonstration",
      "url": "https://www.youtube.com/watch?v=example",
      "creator": "Creator name",
      "description": "Explain what part of the route the video demonstrates.",
      "takeaway": "State the exact mechanic or decision readers should verify."
    }
  ]
}
```

只接受完整 URL。为避免 YouTube 验证、地区限制或第三方 Cookie 导致正文出现错误框，
页面只渲染可点击的来源卡，不直接内嵌第三方播放器。没有经过审核的视频时应省略整个章节。

### 5.10 正文配图

```json
{
  "id": "rotation-visual",
  "type": "figure",
  "title": "Read the rotation before copying gear",
  "order": 95,
  "visible": true,
  "toc": false,
  "image": {
    "src": "/images/builds/media/ice-shot-deadeye-mechanic.webp",
    "alt": "Ice Shot building freeze before a prepared Snipe release",
    "caption": "Build freeze first, then release Snipe inside the prepared window.",
    "credit": "Original editorial illustration by Exile2 Guides",
    "sourceKind": "generated"
  }
}
```

- `src` 只接受本地 `/images/…` 稳定路径和 `.webp` / `.avif`，生产构建会自动改写为指纹 URL。
- `alt`、`caption` 和 `credit` 必填；装饰性图片不应写入正文。
- `sourceKind` 只能是 `generated`、`official`、`community`、`video` 或 `other`。
- 搬运官方、社区或视频画面时必须增加 `sourceUrl`；原创编辑示意图可以省略。
- 页面底部由组件统一显示网络资料与图片免责声明，不在每篇 JSON 重复维护。
- 配图必须解释相邻正文的机制或决策，不得只用于填充页面。

### 5.11 多维对照表

```json
{
  "id": "decision-table",
  "type": "comparison-table",
  "title": "Progression decisions",
  "order": 100,
  "visible": true,
  "toc": false,
  "caption": "Choose the next step from the failure mode you can observe.",
  "columns": ["Situation", "Action", "Why"],
  "rows": [
    {
      "label": "Boss damage falls behind",
      "cells": ["Prepare the single-target loop", "Review the weapon first"]
    }
  ]
}
```

`cells` 数量必须等于 `columns` 数量减一；第一列由 `label` 提供。

### 5.12 社区观点卡

```json
{
  "id": "community-voices",
  "type": "community-voices",
  "title": "What players report",
  "order": 110,
  "visible": true,
  "toc": false,
  "note": "Community reports are experience samples, not verified game rules.",
  "entries": [
    {
      "context": "Endgame transition",
      "label": "Player discussion",
      "representation": "paraphrase",
      "sourceType": "reddit",
      "statement": "Summarize the useful observation in the article language.",
      "url": "https://www.reddit.com/example"
    }
  ]
}
```

- `representation` 只能是 `quote` 或 `paraphrase`。
- `sourceType` 只能是 `forum`、`reddit`、`guide` 或 `video`。
- 默认使用归纳转述；直接引用必须简短，并保留可访问的原始来源链接。
- 社区经验不得伪装成已核验机制，和官方来源冲突时以当前 Patch 官方资料为准。

### 5.13 问题、解答与站内延伸

```json
{
  "id": "reader-questions",
  "type": "question-answer",
  "title": "Questions this route should answer",
  "order": 120,
  "visible": true,
  "toc": false,
  "items": [
    {
      "question": "Why does boss damage feel lower than mapping damage?",
      "answer": [
        "Give the direct diagnosis before listing optional optimizations."
      ],
      "bullets": ["Check the prepared single-target loop."],
      "relatedLinks": [
        {
          "label": "Related Build",
          "href": "/en/builds/related-build/"
        }
      ]
    }
  ]
}
```

`relatedLinks.href` 只接受以 `/` 开头的站内路径。没有可用的站内页面时省略该字段，
不要生成薄详情页充数。

### 5.14 更新记录

```json
{
  "id": "changelog",
  "type": "changelog",
  "title": "Changelog",
  "order": 100,
  "visible": true,
  "entries": [
    {
      "date": "2026-07-29",
      "changes": ["Updated the verified patch scope."]
    }
  ]
}
```

## 6. 最小草稿示例

草稿允许字段为空，但所有字段类型仍必须正确：

```json
{
  "id": "ice-shot-deadeye",
  "slug": "ice-shot-deadeye",
  "locale": "en",
  "type": "build",
  "status": "draft",
  "featured": false,
  "title": "Ice Shot Deadeye",
  "shortTitle": "Ice Shot Deadeye",
  "summary": "Draft summary pending content review.",
  "description": "Editorial draft for a future verified Build.",
  "classId": "ranger",
  "ascendancyId": "deadeye",
  "mainSkillIds": ["ice-shot"],
  "secondarySkillIds": [],
  "stages": ["starter"],
  "budgets": [],
  "difficulty": null,
  "playstyleTags": ["ranged"],
  "damageTypes": [],
  "bestFor": [],
  "patch": "REPLACE_WITH_VERIFIED_PATCH",
  "league": "early-access",
  "patchStatus": "under-review",
  "author": "Exile2 Guides Editorial Team",
  "reviewer": "",
  "createdAt": "2026-07-29",
  "updatedAt": "2026-07-29",
  "tags": ["ranged", "starter"],
  "sections": [],
  "relatedBuildIds": [],
  "relatedGuideIds": [],
  "sources": [],
  "seo": {
    "title": "Ice Shot Deadeye Build",
    "description": "Editorial draft for a future verified Build.",
    "noindex": true
  }
}
```

## 7. 文章生成方案的输出要求

生成器每次必须输出：

1. 单个 JSON object，不要输出 Markdown Front Matter。
2. 不要包含注释、尾随逗号或 JSON5 语法。
3. `id`、`slug`、技能 ID 和标签必须使用 stable identifier。
4. 不要写 canonical。
5. 不要生成不存在的来源、数值、作者、评分或测试结论。
6. 不确定事实保持 `draft`，不要通过填充看似合理的值绕过发布门禁。
7. 英文和中文分别生成独立文件，并共享 `id` 与 `slug`。
8. 章节只选择文章真正需要的类型，不强制每篇文章包含所有章节。
9. 数组为空时写 `[]`，可选字段未知时省略或按规范使用 `null`。
10. 输出后必须通过：

```text
npm run validate:content
```

## 8. 路由与索引规则

JSON 会自动生成：

```text
/{locale}/builds/{slug}/
```

并参与：

- Builds 列表
- 职业聚合
- 升华聚合
- Starter、Leveling、Endgame、Bossing、Budget 聚合
- 查询参数筛选
- 站内搜索
- canonical 和真实翻译 hreflang
- Article 与 BreadcrumbList JSON-LD
- 静态预渲染
- Sitemap

聚合页至少有 2 篇同语言已发布文章时才进入 Sitemap；查询参数页面始终
`noindex,follow`，canonical 指向 Builds 首页。

## 9. 未来数据库映射

建议数据库保持：

```text
build_articles
build_article_translations
build_article_sections
build_article_relations
build_article_sources
```

数据库或 API 返回的数据仍必须通过同一个 `buildArticleSchema`。页面只依赖
`BuildRepository` 与 `BuildService`，因此切换数据源时不修改页面组件和公开 URL。

当前静态站建议在构建时读取数据库，并在内容发布后触发新构建。不要在浏览器首次打开
详情页后才请求正文，否则会失去现有静态 HTML、SEO 和刷新直达能力。
