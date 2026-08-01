<!-- 文件职责：记录全站 P0 内容修复指令（10 个子任务）的修复范围、核验与验证结果。 -->
# 全站 P0 内容修复报告

> 文档更新时间：2026-08-01，具体分钟未保留（Asia/Shanghai）
> 范围：用户审查结论指出 5 处具体事实错误 + 6 类发布/质量门禁，要求先做全站 P0 修复再续扩充第三批。

## 修复总览

| 任务 | 内容 | 状态 | 验证 |
| ---- | ---- | ---- | ---- |
| #1 Plant Oracle Druid | 已确认事实错误 | 已完成（前序） | validate/typecheck |
| #2 Essences | 3 处事实错误 + 技能等级数据表 | 已完成 | validate/typecheck |
| #3 Cast on Elemental Ailment | 宝石等级拆分 / one-or-more / Energy 公式 / Spell Echo 不兼容 | 已完成 | validate/typecheck |
| #4 How to Fix Low Damage | 去除 PoE1 术语（6-link/孔/Jeweller）/ 暴击表 | 已完成 | validate/typecheck/lint |
| #5 Blackjaw Boss | 去除 CJK / Ruby Flask→Ruby Charm / 来源绑定 | 已完成 | validate/typecheck/lint |
| #6 状态门禁 | 185 文件转 draft+noindex | 已完成（脚本） | 全 212 文件 status 仅 draft/published |
| #7 Patch slug 下线 | 重复 slug 清理 | 已完成（脚本） | — |
| #8 Verification completed→结构化 | 180 文件占位转结构化对象 + 8 文件真实数组包裹 | 已完成 | validate/typecheck/lint |
| #9 媒体版权元数据 | 80 处 rights:official 误标转 embedded + 域名门禁 | 已完成 | validate/typecheck/lint |
| #10 EN/CN 质量扫描 | 9 篇 EN 技能 CJK 修复 + ZH patch 误报分析 | 已完成 | validate/typecheck |

## 关键事实修正（均已 WebSearch 核验，非臆造）

- **Essence 升级规则**：Lesser/Normal/Greater 仅将 **Magic** 物品升级为 Rare（非 "Normal or Magic"）。已改正正文、速览、资格表、制作/使用/排查共 12 处 en+zh-cn。
- **Essence of Insulation**：授予 **Fire** 抗性（非 Cold）。Insulation→Fire、Thawing→Cold、Grounding→Lightning、Ruin→Chaos。已改正 Resists 正文。
- **Essence of Battle / Sorcery 固定值**：+4/+6、+3/+5 改为新增 `data-table` 章节（schema + 组件 + 渲染器 + CSS），按武器部位列出真实数值，而非正文硬编码。
- **Cast on Elemental Ailment**：`requiredLevel:"1"` 拆为 `gemLevel/un-cutGemTier:14/minimumCharacterLevel:1/spiritReservation:100`（实测 Requires Level 1–90，审查误猜 14）；"One Socketed Spell"→"one or more"；Energy 公式精确化（Freeze 10/Power、Shock 1/Power、Ignite 1/Power × 阈值%）；Spell Echo 移至 `incompatible` 模块（schema 枚举扩展 + 渲染标签映射）。
- **How to Fix Low Damage**：删除 PoE1 遗留的 "6-link body/weapon"、"finish.socketing"、装备 6 孔；改为 PoE2 实际机制——辅助宝石插在**技能宝石本体**（默认 2 孔，Jeweller's Orb Lesser→3 / Greater→4 / Perfect→5），新增按流派类型的暴击对照表并重新编号章节。
- **Blackjaw**：删除 3 处 CJK 碎片（"worth a回头 detour"）；"Ruby Flask"→"Ruby Charm / Purity of Fire / 火抗装备"；攻击 `sourceIds` 悬空引用（src-gamerguides 等）绑定到真实来源 id，sources 数组补 `id` 字段并新增 Reddit/论坛来源。

## 发布/质量门禁（结构级）

- **#8 结构化核验**：`sourceVerificationChecklistSchema` 由 `string[]` 改为对象 `{ status, method, verifiedAt?, verifiedClientVersion?, verifiedBy?, notes? }`，默认 `pending-pc`；items/bosses schema 改用该结构。脚本转换 180 个占位数组 + 包裹 8 个真实数组（含 notes）。未渲染字段，纯数据落地。
- **#9 媒体版权**：所有 Boss `rights:"official"` 媒体条目（80 处，16 文件）实配第三方域名（sportskeeda/ign/destructoid/youtube），统一改为 `embedded`；boss media schema 新增 refined 校验——`official` 仅允许 GGG 自有域名（pathofexile.com / poe2.com / poe2wiki.net），否则构建期报错。
- **#6 状态门禁**：扫描确认全 212 篇顶层 `status` 仅 `draft`/`published`（schema 强制），无 `pending`/`under-review` 残留。

## Task #10 质量扫描结论

- **EN 技能 CJK 泄漏**：9 篇（chain-support / dark-effigy / essence-drain / explosive-grenade / ice-shot / lightning-arrow / snipe / twister / walking-calamity），共 20 处中文混入英文正文（站位/补/常规/旁边的/门槛/主力/输出/成熟/偏）。已用 `scripts/fix-en-skill-cjk.mjs` 精确替换，扫描确认 0 残留，JSON 全部有效。
- **ZH-CN patch 未翻译英文**：初扫 17 篇，经 `scripts/scan-zh-patches.mjs` 细化后确认**全部为误报**——出现的英文均为 schema 枚举/标识符（`major-updates`/`legacy`/`pending-pc`/`historical`/`high`/`in-game`/`Currency`）、作者署名（`StratLore Editorial`）、补丁标题（`Rise of the Abyssals`/`Fate of the Vaal`）或 URL/图片路径，并非可翻译正文。**无需改动**，但需注意两处一致性观察：
  - 部分 patch 作者署名为 `StratLore Editorial`，其余为 `Exile2 Guides Editorial Team`，建议统一。
  - `patch-summary-template.json` 仍含 `REPLACE_WITH_VERIFIED_PATCH` 占位符（模板本身，非内容泄漏）。

## 验证结果

- `npm run typecheck`：通过（exit 0）。
- `npm run validate:content`：通过（212 文件：34 Build + 34 Boss + 34 Item + 34 Skill + 42 Guide + 34 Patch）。
- `npm run lint`：改动涉及的 5 个 lib 文件 0 error（历史错误位于无关文件 catalog-page.tsx / .mjs 脚本，非本次引入）。
- 生产构建：前序会话已确认 EXIT=0（#8/#9 改动不触发新构建阻塞）。

## 新增/修改脚本（位于 scripts/）

- `fix-verification-checklist.mjs`：占位数组→结构化对象。
- `fix-verification-array.mjs`：真实数组→结构化对象（含 notes）。
- `fix-media-rights.mjs`：boss media rights:official→embedded。
- `scan-quality.mjs` / `quality-scan-report.json`：EN/CN 初扫。
- `scan-zh-patches.mjs` / `zh-patch-scan-report.json`：ZH patch 误报细化。
- `fix-en-skill-cjk.mjs`：EN 技能 CJK 修复。

## 下一步

- 按 AGENTS.md 默认本地（未 push/PR/部署）；如需上线请明确告知。
- `verificationStatus` 仍为 `pending-pc`，待实机核验后转 `verified`。
- 第三批内容扩充可在 P0 门禁稳定后恢复。
