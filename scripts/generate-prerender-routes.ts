/** 文件职责：枚举每个 locale 必须存在的“外壳”预渲染路由，输出 manifest 供 CI 核对。 */
import { writeFile } from "node:fs/promises";
import path from "node:path";

import {
  contentTypeSegments,
  contentTypes,
  supportedLocales,
  type ContentType,
} from "../lib/content/constants";

/** 每个 locale 都存在的页面外壳（尾部斜杠规范路径）。 */
const shellSegments = [
  "",
  "builds",
  "bosses",
  "items",
  "skills",
  "guides",
  "patches",
  "search",
  "about",
  "contact",
  "privacy-policy",
  "terms-of-use",
  "cookie-policy",
  "disclaimer",
];

/** 分类聚合子路由，依内容类型而异。 */
const categoryKinds: Record<ContentType, readonly string[]> = {
  build: ["classes", "ascendancies", "categories"],
  boss: ["categories"],
  item: ["categories"],
  skill: ["categories"],
  guide: ["categories"],
  patch: ["categories"],
};

/** 拼接 locale 与段名为规范预渲染路由（尾部斜杠）。 */
function localeRoute(locale: string, segment: string): string {
  return segment === "" ? `/${locale}/` : `/${locale}/${segment}/`;
}

/** 入口：生成全量预渲染路由 manifest 并写入文件，供 CI 核对构建完整性。 */
async function main(): Promise<void> {
  const routes: string[] = [];
  for (const locale of supportedLocales) {
    for (const segment of shellSegments) {
      routes.push(localeRoute(locale, segment));
    }
    for (const type of contentTypes) {
      for (const kind of categoryKinds[type]) {
        routes.push(`/${locale}/${contentTypeSegments[type]}/${kind}/`);
      }
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    localeCount: supportedLocales.length,
    routeCount: routes.length,
    routes,
  };
  const outputPath = path.resolve(process.cwd(), "prerender-routes.json");
  await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(
    `Wrote ${outputPath}: ${routes.length} shell routes across ${supportedLocales.length} locales.`,
  );
}

await main();
