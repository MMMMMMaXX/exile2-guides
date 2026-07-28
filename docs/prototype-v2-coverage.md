<!-- 文件职责：记录交互原型 V2 与当前公开路由的覆盖关系，并列出仍需补充的专属设计稿。 -->

# 交互原型 V2 页面覆盖与缺失设计清单

> 本节更新时间：2026-07-28 21:36（Asia/Shanghai）

## 已直接覆盖

> 本节更新时间：2026-07-28 21:36（Asia/Shanghai）

| 原型页面                         | 对应生产页面                            | 覆盖范围                                    |
| -------------------------------- | --------------------------------------- | ------------------------------------------- |
| `index.html`                     | `/en/`、`/zh-cn/`                       | 首页 Hero、快捷入口、内容模块、侧栏与响应式 |
| `guide-liquid-verisium.html`     | 两种语言的 Liquid Verisium Guide 详情页 | Article Hero、目录、正文、右栏与移动布局    |
| 两页共享 Header、Footer 与交互层 | 全部公开路由                            | 导航、搜索入口、语言切换与全站视觉 Token    |

## 缺少专属设计稿的线上页面

> 本节更新时间：2026-07-28 21:36（Asia/Shanghai）

下列页面继续保留现有功能，并复用 V2 的共享 Header、Footer、卡片、Panel 和响应式
规则；由于原型没有提供其专属信息架构，不把推导布局误报为已确认设计。

| 页面组             | 生产路由                                                                  | 当前公开 URL 数 | 缺少的专属设计重点                         |
| ------------------ | ------------------------------------------------------------------------- | --------------: | ------------------------------------------ |
| 根语言入口         | `/`                                                                       |               1 | 语言选择首屏                               |
| 六类分类列表       | `/:locale/builds/`、`bosses/`、`items/`、`skills/`、`guides/`、`patches/` |              12 | 列表 Hero、筛选器、不同类型卡片与空状态    |
| 其他 Guide 详情    | Expedition Atlas、Orb of Sacrifice、Skill-Granting Unique Scaling         |               6 | 各主题专属步骤、表格、清单与右栏模块       |
| Boss 详情          | Arbiter of Ash、Atziri, the Red Queen                                     |               4 | 攻击模式、阶段、危险提示与战前准备模块     |
| Item 详情          | Liquid Verisium Reference                                                 |               2 | 物品头图、属性、用途、替代品与获取模块     |
| Patch 详情         | 0.5.4 Runes of Aldur                                                      |               2 | 版本摘要、影响范围和 Legacy 状态模块       |
| Build / Skill 详情 | 当前没有公开内容，但对应路由模板已存在                                    |               0 | Build、装备、技能联动与 Skill 机制专属布局 |
| 搜索               | `/en/search/`、`/zh-cn/search/`                                           |               2 | 搜索首屏、结果卡片、无结果与加载更多状态   |
| 信息与法律页       | About、Contact、Privacy、Terms、Cookie、Disclaimer 的双语页面             |              12 | 长文本阅读层级、联系信息与法律导航         |
| 404                | 未知路径及静态 `/404.html`                                                |               1 | 错误页主视觉、搜索与推荐入口               |

按当前公开路由计算，共有 **42 个 URL 缺少专属页面设计稿**。其中 14 个非 Liquid
Verisium 详情 URL 已使用 V2 Article Layout 的通用实现，但仍需要对应内容类型的专属模块
设计才能视为完整设计覆盖。

## 实施边界

> 本节更新时间：2026-07-28 21:36（Asia/Shanghai）

- 只使用已发布内容和真实内部链接，不复制原型中的虚构 Build、Boss、排行或内容数量。
- 原型原创 WebP 只绑定到名称明确对应的内容；没有可靠映射时继续使用可识别占位图。
- 保留 React Router 预渲染、双语 URL、Canonical、hreflang、JSON-LD、Sitemap、
  robots 和本地搜索索引。
- 缺失专属设计的页面先共享 V2 视觉层，不新增未经确认的业务模块或内容结论。
