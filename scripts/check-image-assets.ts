/** 文件职责：检查内容图片是否全部进入 Vite 指纹资源目录，并阻止缺失引用进入构建。 */
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const fingerprintedImageRoot = path.join(
  projectRoot,
  "app",
  "assets",
  "images",
);
const legacyPublicImageRoot = path.join(projectRoot, "public", "images");
const sourceRoots = ["app", "components", "content", "lib"];
const authoredSourceExtensions = new Set([
  ".json",
  ".md",
  ".mdx",
  ".ts",
  ".tsx",
]);
const imagePathPattern =
  /\/images\/[A-Za-z0-9._/-]+\.(?:avif|gif|jpe?g|png|svg|webp)/g;

/** 递归枚举人工维护文件，避免依赖平台特定的目录遍历行为。 */
async function listFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
    }),
  );
  return nested.flat();
}

/** 判断目录是否存在；不存在属于正常的迁移后状态。 */
async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

/** 校验稳定内容路径与指纹源文件的一一对应关系。 */
async function checkImageAssets(): Promise<void> {
  if (await pathExists(legacyPublicImageRoot)) {
    const legacyFiles = await listFiles(legacyPublicImageRoot);
    if (legacyFiles.length > 0) {
      throw new Error(
        `public/images 不再用于页面图片，请移动到 app/assets/images：\n${legacyFiles.join("\n")}`,
      );
    }
  }

  const authoredFiles = (
    await Promise.all(
      sourceRoots.map((directory) =>
        listFiles(path.join(projectRoot, directory)),
      ),
    )
  )
    .flat()
    .filter((filePath) => authoredSourceExtensions.has(path.extname(filePath)));

  const missingAssets = new Set<string>();
  for (const filePath of authoredFiles) {
    const source = await readFile(filePath, "utf8");
    for (const stablePath of source.match(imagePathPattern) ?? []) {
      const assetPath = path.join(
        fingerprintedImageRoot,
        stablePath.slice("/images/".length),
      );
      if (!(await pathExists(assetPath))) {
        missingAssets.add(
          `${path.relative(projectRoot, filePath)} -> ${stablePath}`,
        );
      }
    }
  }

  if (missingAssets.size > 0) {
    throw new Error(
      `以下图片引用没有对应的 app/assets/images 文件：\n${[...missingAssets].join("\n")}`,
    );
  }

  const registeredAssets = await listFiles(fingerprintedImageRoot);
  console.log(
    `图片资源检查通过：${registeredAssets.length} 个文件将由 Vite 自动生成指纹。`,
  );
}

await checkImageAssets();
