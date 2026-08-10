# 线上复验报告 — SEO P1-1 & P1-2

**复验时间**：2026-08-08 02:38 (GMT+8)
**复验环境**：已部署 Cloudflare Pages（`https://poe2.stratlore.com`）
**复验方法**：curl 抓取线上预渲染 HTML → 提取 `application/ld+json` 块并 JSON.parse 校验 → 核对结构化数据类型、绝对地址、语言本地化。
**关联提交**：`2efc5db`（P1-1）+ 平台环境变量 `VITE_SITE_URL`（P1-2）

---

## 一、P1-1 — FAQPage + HowTo 结构化数据

| 页面                                    | ld+json 块 | Article | BreadcrumbList |     FAQPage      |      HowTo      |
| --------------------------------------- | :--------: | :-----: | :------------: | :--------------: | :-------------: |
| `/en/bosses/arbiter-of-ash/`            |     4      |   ✅    |       ✅       |     ✅ 5 Q&A     |     ✅ 3 步     |
| `/zh-cn/bosses/arbiter-of-ash/`         |     4      |   ✅    |       ✅       | ✅ 5 Q&A（中文） | ✅ 3 步（中文） |
| `/en/builds/spark-gemling-legionnaire/` |     4      |   ✅    |       ✅       |     ✅ 3 Q&A     |     ✅ 9 步     |
| `/en/builds/ice-shot-deadeye/`          |     4      |   ✅    |       ✅       |     ✅ 3 Q&A     |    ✅ 11 步     |

- 所有 JSON-LD 块均为合法 JSON（`JSON.parse` 零报错）。
- **语言本地化确认**：
  - 英文页 `Article.inLanguage = "en"`，中文页 `inLanguage = "zh-CN"`。
  - 中文页 FAQ 问题已翻译：`"如何进入灰烬仲裁者？"`（英文对照 `"How do I reach the Arbiter of Ash?"`）。
- 富结果来源与本地验证一致（1470 页含 FAQPage、1340 页含 HowTo）。

## 二、P1-2 — 绝对地址（canonical / og:url / hreflang）

| 检查项                   | 结果 | 示例（arbiter-en）                                     |
| ------------------------ | :--: | ------------------------------------------------------ |
| `rel="canonical"` 绝对   |  ✅  | `https://poe2.stratlore.com/en/bosses/arbiter-of-ash/` |
| `og:url` 绝对            |  ✅  | `https://poe2.stratlore.com/en/bosses/arbiter-of-ash/` |
| `hreflang` 11 条全部绝对 |  ✅  | `https://poe2.stratlore.com/zh-cn/...`、`x-default` 等 |

- 全部 4 个抽样页面 canonical/og:url/hreflang 均为 `https://poe2.stratlore.com/` 开头的绝对地址，无任何 `/en/...` 相对残留。
- 对照此前 P1-2 失效根因：Vite `import.meta.env.VITE_SITE_URL` 为编译期替换，需重新部署；本次部署已含该环境变量，**绝对地址已正确生效**。

---

## 三、结论

✅ **P1-1（FAQPage / HowTo 富结果结构化数据）线上生效**
✅ **P1-2（绝对 canonical / og:url / hreflang 地址）线上生效**

**后续建议**：

1. 在 Google Search Console「增强功能 → 富结果」观察 FAQ / HowTo 富结果的覆盖率与错误提示（通常需数日重新抓取）。
2. 在 GSC「网址检查」工具对抽样页面提交重新抓取，加速富结果收录。
3. 关注 GSC 国际定向报告，确认 11 条 hreflang 均被 Google 接受（无回标错误）。
