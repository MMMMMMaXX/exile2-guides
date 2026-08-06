/** 文件职责：比对译文 sourceRevision 与英语事实源 revision，检测并可选标记 stale。 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  isTranslationStale,
  translationMetaFromRaw,
} from "../lib/content/translation";

const contentRoot = path.resolve(process.cwd(), "content");
const writeMode = process.argv.includes("--write");

async function walkJson(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkJson(entryPath);
      return entry.name.endsWith(".json") ? [entryPath] : [];
    }),
  );
  return nested.flat();
}

type FileInfo = {
  type: string;
  slug: string;
  locale: string;
  translation?: unknown;
  revision?: string | undefined;
  file: string;
};

async function main(): Promise<void> {
  const files = await walkJson(contentRoot);
  const enRevisions = new Map<string, string>();
  const infos: FileInfo[] = [];

  for (const file of files) {
    let raw: unknown;
    try {
      raw = JSON.parse(await readFile(file, "utf8"));
    } catch {
      continue;
    }
    if (typeof raw !== "object" || raw === null) continue;
    const record = raw as Record<string, unknown>;
    const relative = path.relative(contentRoot, file);
    const parts = relative.split(path.sep);
    const locale = parts[0];
    const type = parts[1];
    const slug = path.basename(file, ".json");
    if (!locale || !type || !slug) continue;
    const info: FileInfo = {
      type,
      slug,
      locale,
      translation: record.translation,
      revision:
        typeof record.revision === "string" ? record.revision : undefined,
      file,
    };
    infos.push(info);
    if (locale === "en" && info.revision) {
      enRevisions.set(`${type}/${slug}`, info.revision);
    }
  }

  const stale: FileInfo[] = [];
  for (const info of infos) {
    if (info.locale === "en") continue;
    const meta = translationMetaFromRaw(info.translation);
    if (!meta) continue;
    const sourceRevision = enRevisions.get(`${info.type}/${info.slug}`);
    if (isTranslationStale(meta, sourceRevision)) stale.push(info);
  }

  if (stale.length === 0) {
    console.log("No stale translations detected.");
    return;
  }

  console.log(`Found ${stale.length} stale translation(s):`);
  for (const info of stale) {
    const relative = path.relative(process.cwd(), info.file);
    console.log(`  - ${relative} (source revision changed)`);
    if (writeMode) {
      const record = JSON.parse(await readFile(info.file, "utf8")) as Record<
        string,
        unknown
      >;
      const existing =
        (record.translation as Record<string, unknown> | undefined) ?? {};
      record.translation = { ...existing, translationStatus: "stale" };
      await writeFile(info.file, `${JSON.stringify(record, null, 2)}\n`);
    }
  }
  if (!writeMode) {
    console.log("Re-run with --write to set translationStatus to 'stale'.");
  }
}

await main();
