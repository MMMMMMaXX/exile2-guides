/** 文件职责：枚举并验证全部公共静态路径，确保构建产物不是客户端渲染空壳。 */
import path from "node:path";

import type { Config } from "@react-router/dev/config";

import { verifyFingerprintedImageBuild } from "./lib/assets/verify-build.server";
import { loadContentIndex } from "./lib/content/content-index";
import {
  enumeratePublicPaths,
  getPublicPrerenderPaths,
  verifyStaticNotFoundDocument,
  verifyPrerenderBuild,
} from "./lib/prerender";
import { verifyClientPerformance } from "./lib/performance/verify-build";
import {
  getBuildSiteOrigin,
  verifySeoSiteFiles,
  writeSeoSiteFiles,
} from "./lib/seo/site-files.server";

export default {
  /** 构建时扫描生产内容索引；草稿和未核验内容不会进入返回路径。 */
  prerender: async () => getPublicPrerenderPaths(),
  /** 在构建结束时逐页检查 HTML 正文、标题和描述，失败时阻止发布。 */
  buildEnd: async ({ reactRouterConfig }) => {
    const index = await loadContentIndex();
    const publicPaths = enumeratePublicPaths(index);
    const outputDirectory = path.resolve(
      process.cwd(),
      reactRouterConfig.buildDirectory,
      "client",
    );
    const siteOrigin = getBuildSiteOrigin();
    await writeSeoSiteFiles(outputDirectory, index, siteOrigin);
    await verifyPrerenderBuild(outputDirectory, publicPaths, index);
    await verifyStaticNotFoundDocument(outputDirectory);
    await verifySeoSiteFiles(outputDirectory, index, siteOrigin);
    await verifyClientPerformance(outputDirectory, publicPaths);
    await verifyFingerprintedImageBuild(outputDirectory);
  },
  ssr: false,
} satisfies Config;
