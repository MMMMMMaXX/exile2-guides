/** 文件职责：以与 buildContentIndex 完全一致的语义，列出所有 broken related 引用。 */
import { loadContentIndex } from "../lib/content/content-index";
import { ContentIndexError } from "../lib/content/content-index";

try {
  await loadContentIndex();
  console.log("content index OK");
} catch (err) {
  if (!(err instanceof ContentIndexError)) throw err;
  const lines: string[] = [];
  lines.push(`TOTAL ISSUES: ${err.issues.length}`);
  // contentId -> referenced broken ids (per locale embedded in message)
  const bySource = new Map<string, string[]>();
  for (const issue of err.issues) {
    const cid = issue.contentId ?? "(unknown)";
    const m = /references unavailable (\S+) for locale (\S+)/.exec(issue.message);
    const ref = m ? `${m[1]}@${m[2]}` : issue.message;
    const arr = bySource.get(cid) ?? [];
    arr.push(ref);
    bySource.set(cid, arr);
  }
  for (const [cid, refs] of [...bySource.entries()].sort()) {
    lines.push(`${cid}: ${refs.join(", ")}`);
  }
  const fs = await import("node:fs");
  fs.writeFileSync("scripts/diag-related-out.txt", lines.join("\n") + "\n");
  console.log(lines.join("\n"));
}
