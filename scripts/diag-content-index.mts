import {
  loadStaticContentPages,
} from "../lib/content/content-page.server";
import { ContentIndexError } from "../lib/content/content-index";

try {
  const pages = await loadStaticContentPages();
  console.log("total parsed pages:", pages.length);
  console.log("content index OK");
} catch (err) {
  if (err instanceof ContentIndexError) {
    console.log("issues:", err.issues.length);
    const byCode: Record<string, number> = {};
    for (const i of err.issues) {
      byCode[i.code] = (byCode[i.code] ?? 0) + 1;
      console.log(`[${i.code}] ${i.contentId ?? ""} :: ${i.message} :: ${i.sourcePaths.join(",")}`);
    }
    console.log("BY CODE:", JSON.stringify(byCode));
  } else {
    throw err;
  }
}
