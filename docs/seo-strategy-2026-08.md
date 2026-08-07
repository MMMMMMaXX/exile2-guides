# StratLore (PoE2 Guides) — 全面 SEO 优化策略

> 审计日期：2026-08-07 · 审计对象：`poe2.stratlore.com`（GSC 域名属性 `sc-domain:stratlore.com`）
> 审计方式：直接审计站点代码库与构建产物（`build/client/`），无需 GSC 权限即可定位技术根因。

---

## 0. 先说结论（TL;DR）

你们的**技术 SEO 基建相当扎实**（SSR 预渲染、sitemap、canonical、JSON-LD、OG、10 语言全覆盖），流量不足**不是因为技术崩了**，而是两个层面的问题叠加：

1. **新域名零权威（Domain Authority ≈ 0）** —— 这是压倒性的主因。PoE2 攻略这个词群的对手（maxroll、poe2wiki、poe2db、icy-veins、mobalytics）都是高 DR 老站，没有外链，内容再好也排不进前 3。
2. **两个可被快速修复的技术漏点**在浪费已有的排名潜力：
   - **hreflang 属性没渲染出来**（10 语言 alternate 链接不带 `hreflang`，国际定向失效）；
   - **缺 FAQ / HowTo 结构化数据**（文章已有问答与步骤章节，却没拿「People Also Ask」和精选摘要）。

下面分「技术止血 → 内容权威 → 外链杠杆 → SERP 特性 → 监测」五阶段，按 ROI 排序。

---

## 1. 技术审计结果

### 1.1 已做对的部分（不要动）

| 维度                 | 状态       | 证据                                                      |
| -------------------- | ---------- | --------------------------------------------------------- |
| 服务端渲染 / 预渲染  | ✅         | 详情页 HTML 71KB，含 `<article>`，真实正文在源码          |
| Sitemap              | ✅         | `sitemap.xml` 含 **2921** 条 URL                          |
| robots.txt           | ✅         | 声明 `Sitemap:`，`Allow: /`                               |
| Canonical            | ✅（相对） | 每页有 canonical，但为相对路径                            |
| JSON-LD              | ✅         | `Article` + `BreadcrumbList` 已注入                       |
| Open Graph / Twitter | ✅         | 指纹化 webp og:image，summary_large_image                 |
| 多语言覆盖           | ✅         | 10 语言 × 242 篇 = 2420 页，翻译为真实母语内容（非占位）  |
| 图片优化             | ✅         | webp + `loading="lazy"` + 显式 `width/height`（CLS 受控） |
| 标题关键词           | ✅         | 如「Hollow Palm Martial Artist Build Guide (PoE2 0.5)」   |
| 内链                 | ✅         | `relatedContentIds` 上下文关联已接线                      |

### 1.2 必须修的漏点（按紧急度）

#### 🔴 P0 — hreflang 属性丢失（国际 SEO 致命）

- **现象**：构建产物里 11 条 `<link rel="alternate">`（10 语言 + x-default）**全部没有 `hreflang` 属性**，只剩 `href`。
- **后果**：Google 无法判断哪个 URL 对应哪种语言/地区，会错误投放语言版本、稀释排名信号，x-default 也失效。
- **根因**：`lib/seo/metadata.ts` 的 `createSeoMetadata` 产出 `{ tagName:"link", rel:"alternate", hrefLang, href }`，但 React Router 的 `<Meta>` 在此构建中未把 `hrefLang` 渲染成属性。
- **修复**：确认 React Router `Meta` 对 `hrefLang` 的支持；若其丢弃该键，改为在 `root.tsx` 手动注入 `<link rel="alternate" hreflang=...>`，或用 `links()` 导出。修复后必须验证 HTML 源码出现 `hreflang="en"` / `hreflang="x-default"` 等。

#### 🟠 P1 — 缺 FAQ / HowTo 结构化数据（丢 SERP 特性）

- **现象**：文章有大量 `question-answer` 与步骤型章节，但 JSON-LD 只有 `Article` + `BreadcrumbList`，**无 `FAQPage`、无 `HowTo`**。
- **后果**：白白错过「People Also Ask」展开、问答富媒体结果、步骤富摘要——这些是攻略站最容易抢的免费 SERP 位置。
- **修复**：为 `question-answer` 章节生成 `FAQPage` schema；为带有序号步骤的章节（leveling / mapping / bossing 等）生成 `HowTo` schema。复用现有 `components/seo/structured-data.tsx` 的 `StructuredData` 组件。

#### 🟡 P2 — canonical / hreflang / OG 应为绝对地址

- **现象**：构建时未设 `VITE_SITE_URL`，canonical、alternate、og:url 均为相对路径（`/en/...`）。
- **后果**：相对 canonical 合法但非最优；多子域 + 10 语言场景下，绝对地址能消除歧义。
- **修复**：生产构建注入 `VITE_SITE_URL=https://poe2.stratlore.com`，`toPublicUrl()` 会自动输出绝对地址（代码已支持，只差配置）。

#### 🟡 P2 — 分类/聚合页薄内容风险

- `V4SubtypeSkeleton` 等聚合页当前 `noindex`，处理正确；但各分类列表页（如 `/en/builds/`）需保证有**独特的导语文本**而非仅卡片网格，否则难以单独排名。

---

## 2. 流量不足的根因（不在技术，在权威与策略）

### 2.1 域名权威 ≈ 0（头号原因）

- 这是一个相对新的站点。Google 对 YMYL/游戏攻略类查询高度依赖 **Domain Authority + 反向链接质量**。
- 你们的对手是运营多年、DR 70+ 的站点。没有外链，单页内容质量无法弥补权威差距。
- **这是 SEO 里最慢、但唯一的排名杠杆**——必须做外链建设（见第 4 节）。

### 2.2 关键词策略可更锋利

- 当前标题已含玩法名 + 「Build Guide」+ 版本号，方向对。
- 但「Path of Exile 2」vs「PoE 2」在标题里混用（如 guide 用「PoE 2」、item 用「Path of Exile 2」），建议**统一为高搜索量主词**以避免信号分散。
- 缺系统化的**话题集群（Topic Cluster）**：应有「Builds Hub / Bosses Hub / Items Hub」支柱页，把 242 篇聚合成可排名的主题权威，而非各自为战。

### 2.3 patch 时效性流量没吃满

- PoE2 每次更新（0.5.x、0.6 等）都会带来搜索量尖峰（「patch 0.5 changes」「best build after patch」）。
- 你们已有 patch 内容类型，但需要**在补丁上线数小时内**发布解读文，才能抢到这波短时高意图流量。

---

## 3. 分阶段执行路线图（按 ROI 排序）

### 阶段一：技术止血（1–2 周，立即可做，零依赖）

1. **修 hreflang 渲染**（P0）—— 验证 HTML 出现 `hreflang` 属性。
2. **加 FAQPage + HowTo schema**（P1）—— 直接用现有 Q&A/步骤章节生成。
3. **生产构建注入 `VITE_SITE_URL`**（P2）—— 绝对 canonical/OG。
4. **统一标题主词**「Path of Exile 2」vs「PoE 2」。
5. 用 GSC「URL 检查」提交几个代表页，确认索引无异常。

### 阶段二：内容权威（持续，核心竞争力）

1. **建话题集群**：每类建 1 个支柱页（Hub）+ 内部链接网，把 242 篇串成权威主题。
2. **长尾 + 高意图覆盖**：针对「[技能/BD] build 0.5」「how to beat [boss]」「best currency farm 0.5」写精准页。
3. **patch 时效战**：补丁上线 ≤ 24h 出解读，抢搜索尖峰。
4. **放大已有差异化**：社区视频（community-voices）、build planner 导入、来源核验——这些是独特价值，多做曝光。

### 阶段三：外链杠杆（最慢但决定性，持续 3–12 个月）

1. **数字 PR / 原创数据**：做 PoE2 原创研究（如「我们分析了 1 万套 BD 的 ascendancy 分布」）、信息图、层级榜 → 媒体/创作者外联。
2. **未链接品牌提及 → 转链接**。
3. **入驻 PoE 资源聚合站 / wiki 引用**（如相关页面在 poe2wiki 加引用）。
4. **社区贡献**（Reddit r/PathOfExile2、Discord、论坛签名）—— 克制，不 spam，靠价值换自然链接。
5. **专家署名评注**：游戏/直播类媒体 HARO 机会。

### 阶段四：SERP 特性 & 监测

1. FAQ/HowTo schema 上线后追踪富结果覆盖率（GSC 增强报告）。
2. 监测指标（建议 Looker Studio 看板）：
   - 非品牌自然会话、关键词 Top3 占比、CWV 通过率、DR 增长、索引覆盖率。
3. 每月复盘 GSC「查询」报告：曝光↑但点击不↑ → 优化标题/描述 CTR；位置↑ → 扩相似词。

---

## 4. 需要你提供的真实数据（让策略从「通用」变「精准」）

我无法登录你们的 GSC 私有后台。请把以下导出贴给我，我据此做**关键词意图分析 + 差距诊断 + 排名机会清单**：

1. GSC → 「效果」→ 导出 **查询（Queries）** 与 **页面（Pages）** CSV（近 3 个月，含曝光/点击/CTR/平均位置）。
2. GSC → 「覆盖率」是否有**已排除 / 未索引**异常页（核对 2921 条 sitemap 是否都进了索引）。
3. 当前反向链接概况（Ahrefs / Semrush / GSC 链接报告导出），确认 DR 与对手差距。

拿到这些，我可以把第 3 节落成一份**带具体关键词与优先级的内容日历**。

---

## 5. 立即可执行的下一步（你点头我就做）

- [ ] **修 hreflang**（P0，约半天，纯代码）
- [ ] **加 FAQ/HowTo schema**（P1，约 1 天）
- [ ] **生产构建配 `VITE_SITE_URL`**（P2，配置项）
- [ ] 统一标题主词

要我现在直接动手修 P0/P1 两个技术漏点吗？还是先把 GSC 数据导出来做关键词层诊断？
