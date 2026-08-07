// 文件职责：将 EN 技能内容中混入的中文（站位/补/常规/旁边的/门槛/主力/输出/成熟/偏）
// 替换为自然英文，消除 CJK 泄漏。按上下文精确替换，避免误伤。
import { readFileSync, writeFileSync } from "node:fs";

const base = "content/en/skills";

// 每个文件一组有序替换：old 必须唯一且包含中文，new 为自然英文。
const replacements = {
  "dark-effigy.json": [
    ["your站位", "your positioning"],
    ["Steady补 damage", "Steady filler damage"],
    ["Burst补,", "Burst filler,"],
    ["independent补 totem", "independent filler totem"],
    ["常规 DoT", "standard DoT"],
  ],
  "lightning-arrow.json": [
    ["旁边的 trash", "nearby trash"],
    ["chain补 damage", "chain filler damage"],
    ["chain补 secondary", "chain-filler secondary"],
    ["chain补,", "chain filler,"],
  ],
  "snipe.json": [
    ["补 damage.", "filler damage."],
    ["near-cap输出", "near-cap output"],
  ],
  "ice-shot.json": [
    ["Lower gear门槛", "Lower gear requirement"],
    ["low门槛", "low gear requirement"],
    ["the gear门槛", "the gear requirement"],
    ["lower门槛", "lower gear requirement"],
  ],
  "explosive-grenade.json": [["burn-laying主力", "burn-laying mainstay"]],
  "walking-calamity.json": [["boss主力", "boss mainstay"]],
  "chain-support.json": [["already补 damage", "already adds filler damage"]],
  "twister.json": [["成熟 play", "mature play"]],
  "essence-drain.json": [["偏 single-target/boss", "leans single-target/boss"]],
};

const cjk = /[一-鿿]/;
let total = 0;
for (const [file, pairs] of Object.entries(replacements)) {
  const path = `${base}/${file}`;
  let text = readFileSync(path, "utf8");
  for (const [oldStr, newStr] of pairs) {
    if (!text.includes(oldStr)) {
      console.warn(`  [WARN] ${file}: expected "${oldStr}" not found`);
      continue;
    }
    const before = text;
    text = text.split(oldStr).join(newStr);
    if (text === before) {
      console.warn(`  [WARN] ${file}: "${oldStr}" replacement had no effect`);
    } else {
      total++;
    }
  }
  // 安全校验：替换后应无任何 CJK 残留
  if (cjk.test(text)) {
    console.error(`  [ERROR] ${file}: CJK still present after replacement!`);
  }
  writeFileSync(path, text, "utf8");
  console.log(`  fixed ${file}`);
}
console.log(`Total replacements applied: ${total}`);
