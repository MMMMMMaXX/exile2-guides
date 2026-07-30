/** 文件职责：验证生产构建只输出带指纹的图片，并阻止旧 public/images 目录回流。 */
import { access, readdir } from "node:fs/promises";
import path from "node:path";

const supportedImageExtension = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;
const fingerprintedFileName =
  /-[A-Za-z0-9_-]{8,}\.(?:avif|gif|jpe?g|png|svg|webp)$/i;

/** 递归读取构建资产；Vite 可能按插件或分包规则创建嵌套目录。 */
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

/** 判断路径是否存在，供旧目录回流检查使用。 */
async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

/** 确认所有构建图片均位于 assets 且文件名带内容指纹。 */
export async function verifyFingerprintedImageBuild(
  outputDirectory: string,
): Promise<void> {
  const legacyDirectory = path.join(outputDirectory, "images");
  if (await pathExists(legacyDirectory)) {
    throw new Error(
      `生产构建仍包含 ${legacyDirectory}，页面图片必须通过 Vite 输出到 assets。`,
    );
  }

  const assetDirectory = path.join(outputDirectory, "assets");
  const imageAssets = (await listFiles(assetDirectory)).filter((filePath) =>
    supportedImageExtension.test(filePath),
  );
  if (imageAssets.length === 0) {
    throw new Error("生产构建没有生成任何指纹图片资源。");
  }

  const unversionedAssets = imageAssets.filter(
    (filePath) => !fingerprintedFileName.test(path.basename(filePath)),
  );
  if (unversionedAssets.length > 0) {
    throw new Error(
      `以下构建图片缺少内容指纹：\n${unversionedAssets.join("\n")}`,
    );
  }
}
