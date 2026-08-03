// Standalone preview generator for the 3rd + 4th batch patch articles.
// Renders committed patch JSON into a single self-contained HTML file so the
// generated content is viewable even while the full production build is blocked
// by parallel-agent item WIP churn. Defensive: any unknown section type falls
// back to a readable JSON dump so nothing is lost.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const ROOT = process.cwd();
const BATCHES = [
  // third batch
  "patch-0-2-0-dawn-of-the-hunt",
  "patch-0-2-0-huntress-ascendancies-weapons",
  "patch-0-2-0-endgame-atlas-wisps-exiles",
  "patch-0-2-0f-ascendancy-respec-atlas-bookmarks",
  "patch-0-2-0-launch-hotfix-timeline",
  "patch-0-2-1-socketables-unique-drops",
  "patch-0-1-1-mapping-arbiter-respawns",
  "patch-0-1-1c-pinnacle-respawns-atlas-recovery",
  // fourth batch
  "patch-0-1-0-early-access-launch",
  "patch-0-1-0-endgame-atlas-baseline",
  "patch-0-1-0-ascendancy-trials-baseline",
  "patch-0-1-0-launch-hotfix-build-breaks",
  "patch-0-1-0c-loot-currency-waystones",
  "patch-0-1-0d-trigger-gems-energy-defence",
  "patch-0-1-0e-checkpoints-respec-honour",
  "patch-0-1-0e-skill-support-item-balance",
];
const LOCALES = ["en", "zh-cn"];

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function inline(text) {
  let t = esc(text);
  // **bold**
  t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // `code`
  t = t.replace(/`(.+?)`/g, "<code>$1</code>");
  // bare URLs
  t = t.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  return t;
}

function renderValue(key, v) {
  if (v == null) return "";
  if (typeof v === "string") return `<p>${inline(v)}</p>`;
  if (typeof v === "number" || typeof v === "boolean") return `<p>${esc(v)}</p>`;
  if (Array.isArray(v)) {
    if (v.length === 0) return "";
    if (typeof v[0] === "string") {
      return `<ul>${v.map((x) => `<li>${inline(x)}</li>`).join("")}</ul>`;
    }
    if (typeof v[0] === "object") {
      // timeline
      if ("code" in v[0] || "date" in v[0] || "version" in v[0]) {
        return `<div class="timeline">${v
          .map(
            (e) =>
              `<div class="tl"><span class="tl-code">${esc(e.code || e.version || "")}</span>` +
              `<span class="tl-date">${esc(e.date || "")}</span>` +
              `<span class="tl-kind">${esc(e.kind || e.type || "")}</span>` +
              `<span class="tl-sum">${inline(e.summary || e.note || "")}</span></div>`
          )
          .join("")}</div>`;
      }
      // table rows (array of arrays) or array of objects
      if (Array.isArray(v[0])) {
        return `<table><tbody>${v.map((row) => `<tr>${row.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
      }
      if ("headers" in v[0] || "cells" in v[0]) {
        return renderTable(v);
      }
      // generic object list
      return `<pre class="json">${esc(JSON.stringify(v, null, 1))}</pre>`;
    }
    return "";
  }
  if (typeof v === "object") {
    if ("headers" in v && "rows" in v) return renderTableObj(v);
    return `<pre class="json">${esc(JSON.stringify(v, null, 1))}</pre>`;
  }
  return "";
}

function renderTable(rows) {
  const headers = rows[0].headers || [];
  const body = rows.map((r) => r.cells || r.row || []);
  return `<table><thead><tr>${headers.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead><tbody>${body
    .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}
function renderTableObj(t) {
  return `<table><thead><tr>${t.headers.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead><tbody>${t.rows
    .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}

function renderSection(s) {
  const title = s.title?.en || s.title?.zh || s.title || s.type;
  const skip = new Set(["id", "type", "order", "title", "toc", "visible"]);
  let body = "";
  for (const k of Object.keys(s)) {
    if (skip.has(k)) continue;
    body += renderValue(k, s[k]);
  }
  if (!body.trim()) body = `<pre class="json">${esc(JSON.stringify(s, null, 1))}</pre>`;
  return `<section class="sec"><h2>${esc(title)}</h2>${body}</section>`;
}

function renderSources(sources) {
  if (!sources || !sources.length) return "";
  const items = sources
    .map((s) => {
      const url = s.url || (s.description && s.description.url) || "";
      const label = s.label || s.category || "source";
      const desc = s.description?.en || s.description?.zh || s.description || "";
      return `<li><span class="src-label">${esc(label)}</span> — <a href="${esc(url)}" target="_blank" rel="noopener">${esc(desc || url)}</a></li>`;
    })
    .join("");
  return `<section class="sec sources"><h2>Sources</h2><ul>${items}</ul></section>`;
}

function renderPatch(a) {
  const secs = (a.sections || []).map(renderSection).join("");
  const srcs = renderSources(a.sources);
  const badges = [
    a.locale,
    a.status,
    a.verificationStatus,
    a.patchVersion || a.patch,
    a.patchCategory,
  ]
    .filter(Boolean)
    .map((b) => `<span class="badge">${esc(b)}</span>`)
    .join("");
  return `<article class="patch">
    <h1>${esc(a.title?.en || a.title)}</h1>
    <div class="badges">${badges}</div>
    <p class="summary">${inline(a.summary?.en || a.summary || "")}</p>
    ${secs}
    ${srcs}
  </article>`;
}

// Build HTML
let toc = "";
let body = "";
let count = 0;
for (const slug of BATCHES) {
  toc += `<li class="toc-item">${esc(slug)}<ul>`;
  for (const loc of LOCALES) {
    const p = `${ROOT}/content/${loc}/patches/${slug}.json`;
    try {
      const a = JSON.parse(readFileSync(p, "utf8"));
      body += renderPatch(a);
      count++;
      toc += `<li><a href="#${esc(loc + "-" + slug)}">${loc}</a></li>`;
    } catch {
      toc += `<li><span class="missing">${loc} MISSING</span></li>`;
    }
  }
  toc += `</ul></li>`;
}

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Patch Batches 3 &amp; 4 — Standalone Preview</title>
<style>
  :root{ --bg:#0d1117; --panel:#161b22; --ink:#e6edf3; --muted:#8b949e; --accent:#58a6ff; --border:#30363d; --card:#1c2230; }
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
  header{padding:24px 32px;border-bottom:1px solid var(--border);background:var(--panel)}
  header h1{margin:0 0 4px;font-size:22px}
  header p{margin:0;color:var(--muted)}
  .layout{display:flex;align-items:flex-start}
  nav{width:300px;flex:0 0 300px;position:sticky;top:0;height:100vh;overflow:auto;padding:16px 12px;border-right:1px solid var(--border);background:var(--panel)}
  nav h3{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin:14px 8px 6px}
  nav ul{list-style:none;margin:0;padding:0}
  nav .toc-item>span,nav .toc-item>a{display:block;padding:4px 8px;color:var(--ink);text-decoration:none;font-weight:600;font-size:13px}
  nav li ul li a{font-weight:400;color:var(--accent);font-size:12px}
  nav a:hover{text-decoration:underline}
  main{flex:1;padding:24px 40px;max-width:920px}
  .patch{border:1px solid var(--border);background:var(--card);border-radius:10px;padding:20px 26px;margin:0 0 28px;scroll-margin-top:16px}
  .patch h1{font-size:24px;margin:0 0 10px}
  .badges{margin-bottom:12px}
  .badge{display:inline-block;background:#21304a;color:var(--accent);border:1px solid #2b3f5c;border-radius:999px;padding:2px 10px;font-size:11px;margin:0 4px 4px 0}
  .summary{color:#c9d1d9;font-size:15px;border-left:3px solid var(--accent);padding-left:12px;margin:8px 0 18px}
  .sec{margin:18px 0}
  .sec h2{font-size:18px;border-bottom:1px solid var(--border);padding-bottom:6px;margin:0 0 10px}
  table{border-collapse:collapse;width:100%;margin:10px 0;font-size:13px}
  th,td{border:1px solid var(--border);padding:6px 9px;text-align:left;vertical-align:top}
  th{background:#1b2230}
  ul{margin:8px 0;padding-left:22px}
  code{background:#1b2230;padding:1px 5px;border-radius:4px;font-size:13px}
  .timeline{display:flex;flex-direction:column;gap:8px;margin:10px 0}
  .tl{display:grid;grid-template-columns:90px 110px 130px 1fr;gap:8px;align-items:baseline;background:#161b22;border:1px solid var(--border);border-radius:8px;padding:8px 12px}
  .tl-code{font-weight:700;color:var(--accent)}
  .tl-date{color:var(--muted);font-size:13px}
  .tl-kind{color:#d29922;font-size:13px}
  .tl-sum{font-size:13px}
  .sources ul{list-style:none;padding-left:0}
  .src-label{color:var(--accent);font-size:12px;font-weight:600}
  .json{background:#0b0f14;border:1px solid var(--border);border-radius:6px;padding:10px;font-size:12px;overflow:auto;white-space:pre-wrap}
  .missing{color:#f85149}
  footer{padding:18px 32px;color:var(--muted);font-size:12px;border-top:1px solid var(--border)}
</style></head>
<body>
<header>
  <h1>Patch Notes — Batches 3 &amp; 4 (Standalone Preview)</h1>
  <p>${count} published patch articles (en + zh-cn) rendered from committed JSON. Generated ${new Date().toISOString().slice(0, 10)}. (Full production build is currently blocked by parallel-agent item WIP churn; see report.)</p>
</header>
<div class="layout">
  <nav>
    <h3>Contents (${BATCHES.length} topics)</h3>
    <ul>${toc}</ul>
  </nav>
  <main>${body}</main>
</div>
<footer>Standalone preview only — not the production site. Sections use a defensive renderer; unknown section types fall back to a JSON dump.</footer>
</body></html>`;

mkdirSync(`${ROOT}/preview`, { recursive: true });
const out = `${ROOT}/preview/patches-preview.html`;
writeFileSync(out, html);
console.log("wrote", out, "with", count, "articles");
