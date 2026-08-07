/** 文件职责：为第二批 8 个 Boss 生成本地占位 webp 图（hero/arena/phase/attack/annotated）。
 * 这些不是 AI 生成的艺术图，而是带明确“官方原画待补”标识的编辑占位图，
 * 以满足 schema 的 /images/...webp 本地指纹契约与 check:images 门禁。
 * 上线前请将 app/assets/images/bosses/<slug>-hero.webp 等替换为官网/攻略站原画。 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(process.cwd(), "app/assets/images/bosses");

const bosses = [
  { slug: "xesht-we-that-are-one", label: "Xesht, We That Are One" },
  { slug: "olroth-origin-of-the-fall", label: "Olroth, Origin of the Fall" },
  { slug: "king-in-the-mists-pinnacle", label: "The King in the Mists" },
  { slug: "vessel-of-kulemak", label: "Vessel of Kulemak" },
  { slug: "kosis-the-revelation", label: "Kosis, the Revelation" },
  { slug: "omniphobia-fear-manifest", label: "Omniphobia, Fear Manifest" },
  { slug: "blackjaw-the-remnant", label: "Blackjaw, the Remnant" },
  { slug: "mektul-the-forgemaster", label: "Mektul, the Forgemaster" },
];

const kinds = [
  { key: "hero", w: 1200, h: 675, note: "OFFICIAL ART PENDING" },
  { key: "arena", w: 1200, h: 675, note: "ARENA LAYOUT PENDING" },
  { key: "phase", w: 1200, h: 675, note: "PHASE / TELEGRAPH PENDING" },
  { key: "attack", w: 1200, h: 675, note: "ATTACK FRAME PENDING" },
  { key: "annotated", w: 1200, h: 675, note: "EDITORIAL ANNOTATION PENDING" },
];

function svg(label, note, w, h) {
  const escaped = label
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a1410"/>
      <stop offset="0.5" stop-color="#2a1d14"/>
      <stop offset="1" stop-color="#0f0b08"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="none" stroke="#c8893a" stroke-opacity="0.5" stroke-width="3"/>
  <text x="50%" y="46%" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="48" fill="#f0e4d0" font-weight="700">${escaped}</text>
  <text x="50%" y="58%" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#c8893a" letter-spacing="3">${note}</text>
  <text x="50%" y="90%" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#8a7a66">Exile2 Guides · editorial placeholder · replace with official art before publish</text>
</svg>`;
}

await mkdir(OUT_DIR, { recursive: true });

let count = 0;
for (const boss of bosses) {
  for (const kind of kinds) {
    const svgText = svg(boss.label, kind.note, kind.w, kind.h);
    const outPath = path.join(OUT_DIR, `${boss.slug}-${kind.key}.webp`);
    await sharp(Buffer.from(svgText)).webp({ quality: 80 }).toFile(outPath);
    count += 1;
  }
}
console.log(`Generated ${count} placeholder webp images in ${OUT_DIR}`);
