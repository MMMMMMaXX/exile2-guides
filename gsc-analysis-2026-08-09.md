# GSC 效果数据分析与优化建议（poe2.stratlore.com）

- **数据来源**：`stratlore.com-Performance-on-Search-2026-08-09.zip`（Google Search Console 效果报告）
- **时间范围**：过去 24 小时（`过滤器.csv` 确认：搜索类型=网络，时间范围=过去 24 小时）
- **分析口径**：⚠️ 该导出是 **整域 `stratlore.com`** 而非子域。解包后发现混入了 `blockout.stratlore.com`（方块消除游戏站）的流量。本报告已**按子域拆分**，仅分析 `poe2.stratlore.com`。
- **样本警示**：24h 窗口下 poe2 站仅 27 点击 / 2199 展示 / 421 个查询，统计显著性低。**所有结论需用 28 天数据复核后再落地。**

---

## 一、数据质量提示（最重要）

这份 zip 包含 7 个维度文件（图表/查询/网页/国家/设备/搜索结果呈现/过滤器）。其中**网页维度里出现了 `https://blockout.stratlore.com/...` 的 URL**——说明 GSC 属性是以 `sc-domain:stratlore.com` 或整域形式配置，把两个子站流量合并了。

> **建议**：以后在 GSC 用 **URL 前缀 `https://poe2.stratlore.com`** 过滤后再导出，分析才准确，否则 blockout 站的 "block out level 209" 等查询会污染 poe2 的决策（例如误判为「CTR 低的查询去优化」）。

---

## 二、24h 总体表现（已按子域拆分）

| 子域                                         | 点击 | 展示 |       CTR | 加权平均排名 |
| -------------------------------------------- | ---: | ---: | --------: | -----------: |
| **poe2.stratlore.com**                       |   27 | 2199 | **1.23%** |     **14.6** |
| blockout.stratlore.com（方块消除，非本项目） |   11 | 1443 |     0.76% |          6.1 |
| 其他（根域/www）                             |    0 |   74 |     0.00% |         19.7 |

**整域 CTR 1.00% 是混合值，poe2 站真实 CTR 为 1.23%。**

设备分布（整域口径，仅参考）：移动 CTR 1.13% 排名 7.5；桌面 CTR 0.89% 排名 15.2 —— **桌面端排名明显更差**，建议核查桌面端 Core Web Vitals（LCP/INP）。

国家/地区（整域口径）：美国展示最大（1166）但 CTR 仅 0.26%、排名 17；俄罗斯 CTR 4.17% 排名 8、日本 2.63% 排名 10、韩国/西班牙约 2.5% —— 非英语市场单页 CTR 反而更健康。

---

## 三、核心诊断

**poe2 站的问题不是「摘要不吸引」，而是「整体排名太低」。**

证据：

1. **加权排名 14.6**（第二页中段）。首页 `/en/` 排 25、分类页 `/en/items/` 排 33、`/en/builds/` 排 28、`/en/patches/` 排 15.7 —— 核心 hub 页全在第二页及以后，导致大展示（240/72/50）却 0 点击。
2. **一旦排名进前 10，CTR 立刻很高**：
   - `/ru/bosses/the-crowbell/` 排 1.0 → CTR 25%
   - `/zh-cn/items/the-masters-reach/` 排 6.0 → CTR 25%
   - `/ko/builds/kelari-ruzhan-.../` 排 6.0 → CTR 20%
   - `/zh-cn/bosses/atziri-red-queen/` 排 6.8 → CTR 7.14%
     → 内容相关性没问题，**只差权威性把页面推上首屏**。

3. 查询维度（poe2 类 421 个）里，真正有体量且卡在首屏边缘的查询，全部是我们的内容已覆盖、但排名 9–15 的：

| 查询                                                      |  排名 | 展示 | 目标落地页（当前排名）                               | 差距            |
| --------------------------------------------------------- | ----: | ---: | ---------------------------------------------------- | --------------- |
| `poe2 patch notes`                                        |  13.3 |   13 | `/en/patches/`（15.7）                               | 差 3–4 位进首屏 |
| `poe 2 patch notes`                                       |  19.0 |    8 | 同上                                                 | 需内容强化      |
| `wind dancer poe2` / `poe 2 wind dancer`                  |  9–10 |  4+4 | `/en/skills/wind-dancer/`（8.7）                     | 差 1–3 位       |
| `poe endurance charge` / `path of exile endurance charge` | 13–15 |  3+3 | `/en/guides/power-frenzy-endurance-charges/`（13.9） | 差 4–5 位       |
| `poe2 cast on elemental ailment`                          |  11.0 |    2 | 技能机制页                                           | 差 1–2 位       |
| `poe exposure`                                            |  13.5 |    2 | 机制/技能页                                          | 需内容强化      |

4. **多语言长尾已有正向信号**：俄文 `олрот пое 2`（Olroth）、日文 `poe2 ラスブレイカー`（Rathbreaker）、繁中 `巔峰阿茲里`（Atziri）等查询排名 6–7 且能获点击 —— 10 语言策略方向正确，需持续巩固。

5. **无关噪声（忽略）**：`emily stardew valley` / `abigail stardew`（星露谷）、`poe 2 seven pillars` 等属于游戏站语义混淆，展示极低，不需处理。

---

## 四、优化建议（按优先级）

### 🔴 P0 — 数据监控口径（立刻做）

- GSC 改用 **URL 前缀 `https://poe2.stratlore.com`** 导出，避免 blockout 站污染。
- 建立 **28 天基准**：24h 样本太小，所有排名/CTR 结论用 28 天数据复核后再投优化资源。

### 🟠 P1 — 首屏冲刺（内容已覆盖，排名卡 9–15，性价比最高）

针对上面表格的 6 组查询，做「首屏边缘」专项优化（每组预计可提升 3–8 位）：

1. **Patch Notes 专题**：`/en/patches/` 及最新 patch 详情页
   - 标题/H1 显式包含 "Patch Notes" + 版本号；加 `datePublished`/`dateModified` 结构化数据
   - 新增 FAQ（"What changed in PoE2 0.5.x?"）+ HowTo（升级/迁移步骤）—— 复用已上线的 FAQ/HowTo 富结果能力
   - 内部链接：从首页、builds、bosses 高频链向 patches
2. **Wind Dancer 技能页**：`/en/skills/wind-dancer/` 已排 8.7，冲刺前 5
   - 加来自 builds（使用风舞者的 BD）、items 的上下文内链
   - 补技能数值表 + FAQ（机制问答）
3. **Endurance/Charge 机制指南**：`/en/guides/power-frenzy-endurance-charges/`
   - 深化内容（公式、阈值、搭配），覆盖 `endurance charge`/`frenzy charge`/`poe charges` 查询意图
4. **Cast on Elemental Ailment / Exposure**：补机制页内部链接与 FAQ

### 🟡 P2 — 整站权威性（治本，解决加权排名 14.6）

1. **Hub 页提权**：首页、`/en/items/`、`/en/builds/`、`/en/bosses/`、`/en/patches/` 排 15–33，是整站排名天花板。
   - 实施 **pillar-cluster 内部链接**：每个 hub 页链向 5–10 个相关 cluster 页，cluster 页回链 hub
   - 加 E-E-A-T 信号：作者署名（带 credential）、显式「最后更新于 YYYY-MM-DD」、来源标注
2. **富结果验证**：已上线的 FAQPage/HowTo 结构化数据（P1-1）需在 GSC「增强功能」确认覆盖率，富摘要可抬升 CTR 与排名。
3. **外链 / 数字 PR**：新站 DA 低是排名根因，需行业相关外链（社区、论坛、数据站友链）。

### 🟡 P2 — 技术 / 体验

- **桌面端 CWV**：桌面排名 15.2 远差于移动 7.5，查 GSC Core Web Vitals 报告，重点看桌面 LCP/INP（大图、字体、长列表可能导致）。
- **多语言**：繁中 `巔峰阿茲里` 有点击但站点是简中（zh-cn），样本仅 1 点击暂观察，不急于加 zh-tw。

---

## 五、下一步行动

1. 在 GSC 用 `poe2.stratlore.com` 前缀重新导出 **28 天** 效果数据，建立准确基准。
2. 对 `poe2 patch notes` / `wind dancer` / `endurance charge` 三组目标页执行 P1 优化并更新内容。
3. 在 GSC「网址检查」对优化页提交重新抓取。
4. 持续监控「增强功能 → 富结果」确认 FAQ/HowTo 已收录。
5. 核查桌面端 Core Web Vitals 报告。

> 备注：原始 7 个维度 CSV 已提取至 `/tmp/gsc-2026-08-09/file_0..6.csv`，含图表(24h)、查询(759)、网页(1000)、国家(99)、设备(3)、搜索结果呈现(0)、过滤器(2)。
