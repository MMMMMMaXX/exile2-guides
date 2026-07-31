/* global console, process, Buffer */
/**
 * 文件职责：为每个已发布内容生成专属社交分享 OG 图（1200x630 webp）。
 * 模板统一，仅动态替换：文章标题、职业/Boss 名称、Patch、主视觉、页面类型标签。
 * 输出到 app/assets/images/og/{segment}/{slug}.webp，由 Vite 指纹管线生成带哈希的资源 URL；
 * 详情页通过 resolveImageAsset("/images/og/{segment}/{slug}.webp") 取得 og:image，
 * 满足“图片必须经 Vite 输出到 assets”的构建门禁（禁止 public/images 回流）。
 *
 * 运行：NODE_PATH=<managed node_modules> node scripts/generate-og-images.mjs
 * 依赖：sharp（位于隔离的工作区 node_modules，不污染项目依赖）。
 * 说明：OG 图按 slug 共享（locale 无关），卡片文案采用英文版本，避免 librsvg 中文字体缺失问题。
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

// sharp 位于隔离的 workspace node_modules（见文件头运行说明）。
// ESM 的 import 不读取 NODE_PATH，因此改用 createRequire 经由 require 加载，
// 这样保留 NODE_PATH=<managed node_modules> 的运行约定即可解析到 sharp。
// 若未设置 NODE_PATH，则按候选顺序回退到隔离工作区的绝对路径，便于直接 `node` 运行。
const require = createRequire(import.meta.url);
const SHARP_CANDIDATES = [
  "sharp",
  "/Users/manxin/.workbuddy/binaries/node/workspace/node_modules/sharp",
];
let sharp;
for (const candidate of SHARP_CANDIDATES) {
  try {
    sharp = require(candidate);
    break;
  } catch {
    // 继续尝试下一个候选路径
  }
}
if (!sharp) {
  console.error(
    "未能加载 sharp：请通过 NODE_PATH 指向包含 sharp 的 node_modules，或在隔离工作区安装 sharp。",
  );
  process.exit(1);
}

const ROOT = process.cwd();
const CONTENT_EN = path.join(ROOT, "content", "en");
const ASSETS_IMAGES = path.join(ROOT, "app", "assets", "images");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");
const OUT_BASE = path.join(ROOT, "app", "assets", "images", "og");

const COLORS = {
  bg: "#0B0E10",
  surface: "#11161A",
  gold: "#C39A55",
  goldHover: "#D8B673",
  text: "#ECE7DC",
  muted: "#A8A39A",
};

const SEGMENT_BY_TYPE = {
  boss: "bosses",
  build: "builds",
  item: "items",
  skill: "skills",
  guide: "guides",
  patch: "patches",
};

/** 转义 XML 文本，避免标题中的 & < > 破坏 SVG。 */
function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** 按近似字符宽度折行，避免标题溢出卡片。 */
function wrapText(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    if (!current) {
      current = word;
      continue;
    }
    if ((current + " " + word).length <= maxChars) {
      current = `${current} ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** 构造基础卡片 SVG（不含主视觉，主视觉随后合成）。 */
function buildBaseSvg({ tag, titleLines, name, patch, hasHero }) {
  const titleSpans = titleLines
    .map(
      (line, index) =>
        `<tspan x="64" dy="${index === 0 ? 0 : 54}">${escapeXml(line)}</tspan>`,
    )
    .join("");
  const heroX = 700;
  const heroArea = hasHero
    ? `<rect x="${heroX}" y="0" width="500" height="630" fill="${COLORS.surface}"/>`
    : `<rect x="${heroX}" y="48" width="436" height="534" rx="12" fill="${COLORS.surface}"/>`;
  const blendRect = hasHero
    ? `<rect x="640" y="0" width="180" height="630" fill="url(#blend)"/>`
    : `<rect x="640" y="48" width="120" height="534" fill="url(#blend)"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="blend" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${COLORS.bg}"/>
      <stop offset="1" stop-color="${COLORS.bg}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="1200" height="630" fill="${COLORS.bg}"/>
  ${heroArea}
  <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="${COLORS.gold}" stroke-opacity="0.55" stroke-width="2"/>
  ${blendRect}
  <text x="64" y="84" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="${COLORS.gold}">${escapeXml(tag)}</text>
  <text font-family="Helvetica Neue, Arial, sans-serif" font-size="46" font-weight="700" fill="${COLORS.text}">${titleSpans}</text>
  <text x="64" y="430" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="600" fill="${COLORS.goldHover}">${escapeXml(name)}</text>
  <text x="64" y="588" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${COLORS.muted}">${escapeXml(patch)} · EXILE2 GUIDES</text>
</svg>`;
}

/** 构造主视觉左侧的渐变遮罩，使图片与背景自然融合。 */
function buildBlendOverlaySvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="blend" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${COLORS.bg}"/>
      <stop offset="1" stop-color="${COLORS.bg}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="660" y="0" width="160" height="630" fill="url(#blend)"/>
</svg>`;
}

/** 将 /images/... 路径解析为磁盘上的真实图片文件。 */
function resolveHeroFile(imagePath) {
  if (!imagePath) return undefined;
  const relative = imagePath.replace(/^\/images\//, "");
  const candidates = [
    path.join(ASSETS_IMAGES, relative),
    path.join(PUBLIC_IMAGES, relative),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

/** 从已发布英文文章数据中提取卡片所需字段。 */
function extractCardData(article) {
  const type = article.type;
  const tagByType = {
    boss: "BOSS GUIDE",
    build: "BUILD GUIDE",
    item: "ITEM GUIDE",
    skill: "SKILL GUIDE",
    guide: "GUIDE",
    patch: "PATCH NOTES",
  };
  let name = article.title;
  if (type === "boss") {
    name = article.shortTitle || article.title;
  } else if (type === "build") {
    name = [article.className, article.ascendancy]
      .filter(Boolean)
      .join(" · ");
  } else if (type === "guide") {
    name = article.guideCategory || article.title;
  }
  return {
    segment: SEGMENT_BY_TYPE[type],
    slug: article.slug,
    tag: tagByType[type] || "GUIDE",
    title: article.title,
    name: name || article.title,
    patch: article.patch || "",
    heroImage: resolveHeroFile(article.heroImage || article.cardImage),
  };
}

/** 生成单张 OG 图并写入磁盘。 */
async function generateOne(card) {
  const titleLines = wrapText(card.title, 24).slice(0, 3);
  const baseSvg = buildBaseSvg({
    tag: card.tag,
    titleLines,
    name: card.name,
    patch: card.patch,
    hasHero: Boolean(card.heroImage),
  });
  const baseBuffer = await sharp(Buffer.from(baseSvg)).webp({ quality: 88 }).toBuffer();

  const outDir = path.join(OUT_BASE, card.segment);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${card.slug}.webp`);

  if (!card.heroImage) {
    await sharp(baseBuffer).webp({ quality: 88 }).toFile(outFile);
    return outFile;
  }

  const heroBuffer = await sharp(card.heroImage)
    .resize(500, 630, { fit: "cover", position: "centre" })
    .webp({ quality: 88 })
    .toBuffer();
  const overlayBuffer = await sharp(Buffer.from(buildBlendOverlaySvg()))
    .webp({ quality: 88 })
    .toBuffer();

  await sharp(baseBuffer)
    .composite([
      { input: heroBuffer, left: 700, top: 0 },
      { input: overlayBuffer, left: 0, top: 0 },
    ])
    .webp({ quality: 88 })
    .toFile(outFile);
  return outFile;
}

/** 扫描已发布英文内容并批量生成 OG 图。 */
async function main() {
  const types = Object.keys(SEGMENT_BY_TYPE);
  const cards = [];
  for (const type of types) {
    const dir = path.join(CONTENT_EN, SEGMENT_BY_TYPE[type]);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".json")) continue;
      const article = JSON.parse(
        fs.readFileSync(path.join(dir, file), "utf8"),
      );
      if (article.status !== "published" || article.draft === true) continue;
      cards.push(extractCardData(article));
    }
  }

  let generated = 0;
  for (const card of cards) {
    const outFile = await generateOne(card);
    generated += 1;
    console.log(`OG: ${outFile}`);
  }
  console.log(`\nGenerated ${generated} OG image(s) into ${OUT_BASE}`);
}

await main();
