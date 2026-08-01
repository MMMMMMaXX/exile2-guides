/** 文件职责：加载全站内容索引并打印每条失效的来源文件路径，定位阻塞构建的内容文件。 */
import { loadContentIndex } from "../lib/content/content-index";

try {
  const idx = await loadContentIndex();
  console.log("CONTENT INDEX OK — articles:", idx.size);
} catch (e: any) {
  console.error("CONTENT INDEX FAILED:");
  const issues = e.issues ?? [];
  const seen = new Set<string>();
  for (const i of issues) {
    const paths = (i.sourcePaths ?? []).join(", ");
    const key = paths || i.message;
    if (seen.has(key)) continue;
    seen.add(key);
    console.error(`- [${i.code}] ${i.contentId ?? ""} :: ${i.message} :: ${paths}`);
  }
  console.error(`TOTAL unique sources: ${seen.size}`);
  process.exit(1);
}
