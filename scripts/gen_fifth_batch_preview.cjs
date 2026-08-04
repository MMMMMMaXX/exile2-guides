/** 文件职责：将第五批 16 篇 patch 文章内联进一个自包含 HTML 预览，复用既有独立预览的渲染思路。
 * 由于并行内容代理实时写入的 items/boss 文件存在 schema 违规，整仓生产构建被阻断，
 * 故沿用前几批策略——生成离线预览并本地静态服务，便于查看第五批页面真实渲染效果。 */

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SLUGS = [
  "patch-0-2-0g-loot-tier-rework",
  "patch-0-2-0h-item-filter-jewellers-qol",
  "patch-0-2-0c-minion-spear-boss-rebalance",
  "patch-0-2-0e-act-3-runes-player-balance",
  "patch-0-3-0b-abyss-vessel-stabilization",
  "patch-0-3-0c-sprint-skills-boss-fixes",
  "patch-0-1-1d-map-stash-console-qol",
  "patch-0-1-0f-delirium-ritual-xesht-fixes",
];
const LOCALES = ["en", "zh-cn"];

function loadArticles() {
  const out = [];
  for (const slug of SLUGS) {
    for (const loc of LOCALES) {
      const p = path.join(ROOT, "content", loc, "patches", slug + ".json");
      const raw = JSON.parse(fs.readFileSync(p, "utf8"));
      out.push(raw);
    }
  }
  return out;
}

function imgSrc(p) {
  if (!p) return "";
  if (p.startsWith("/images/")) return "app/assets/images/" + p.slice("/images/".length);
  return p;
}

const articles = loadArticles();

// 将 hero 图以 base64 data URI 内联，保证预览在任何打开方式下都能显示封面（不依赖相对路径解析）。
const heroPaths = [...new Set(articles.map((a) => a.heroImage).filter(Boolean))];
const IMG_MAP = {};
for (const p of heroPaths) {
  const fp = imgSrc(p);
  try {
    const buf = fs.readFileSync(path.join(ROOT, fp));
    const ext = fp.split(".").pop();
    IMG_MAP[p] = "data:image/" + (ext === "jpg" ? "jpeg" : ext) + ";base64," + buf.toString("base64");
  } catch {
    /* 缺失文件则回退到路径 */
  }
}
const imgMapJs = "const IMG_MAP = " + JSON.stringify(IMG_MAP) + ";";

const dataJs = "const ARTICLES = " + JSON.stringify(articles) + ";";

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>PoE2 Patch Notes — Fifth Batch (Standalone Preview)</title>
<style>
  :root{ --bg:#0d1117; --panel:#161b22; --ink:#e6edf3; --muted:#8b949e; --accent:#58a6ff; --border:#30363d; --card:#1c2230; --good:#3fb950; --warn:#d29922; }
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
  header{padding:22px 32px;border-bottom:1px solid var(--border);background:var(--panel);position:sticky;top:0;z-index:5}
  header h1{margin:0 0 4px;font-size:21px}
  header p{margin:0;color:var(--muted);font-size:13px}
  .langbar{margin-top:10px;display:flex;gap:8px}
  .langbar button{cursor:pointer;background:var(--card);color:var(--ink);border:1px solid var(--border);border-radius:6px;padding:4px 12px;font-size:13px}
  .langbar button.active{background:var(--accent);color:#08111f;border-color:var(--accent);font-weight:700}
  .layout{display:flex;align-items:flex-start}
  nav{width:300px;flex:0 0 300px;position:sticky;top:96px;height:calc(100vh - 96px);overflow:auto;padding:16px 12px;border-right:1px solid var(--border);background:var(--panel)}
  nav h3{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin:14px 8px 6px}
  nav ul{list-style:none;margin:0;padding:0}
  nav a{display:block;padding:5px 8px;color:var(--accent);text-decoration:none;font-size:12.5px;border-radius:5px}
  nav a:hover{background:var(--card);text-decoration:underline}
  nav .badge{font-size:10px;padding:1px 6px;border-radius:10px;margin-left:6px;background:var(--card);color:var(--muted);border:1px solid var(--border)}
  main{flex:1;padding:24px 40px;max-width:960px}
  .patch{border:1px solid var(--border);background:var(--card);border-radius:12px;padding:22px 28px;margin:0 0 30px;scroll-margin-top:16px}
  .patch h1{font-size:25px;margin:0 0 4px}
  .patch .meta{color:var(--muted);font-size:12.5px;margin-bottom:14px;display:flex;gap:10px;flex-wrap:wrap}
  .patch .meta .pill{background:var(--panel);border:1px solid var(--border);border-radius:20px;padding:2px 10px}
  .hero{width:100%;max-height:320px;object-fit:cover;border-radius:10px;margin:6px 0 16px;border:1px solid var(--border)}
  .summary{font-size:15.5px;color:#c9d4e0}
  section.blk{border-top:1px solid var(--border);margin-top:18px;padding-top:14px}
  section.blk h2{font-size:18px;margin:0 0 10px;color:#fff}
  .paras p{margin:0 0 10px}
  ul.bul{margin:6px 0 0;padding-left:20px} ul.bul li{margin:3px 0}
  table{border-collapse:collapse;width:100%;margin:8px 0;font-size:13.5px}
  th,td{border:1px solid var(--border);padding:7px 10px;text-align:left;vertical-align:top}
  th{background:var(--panel);color:var(--ink)}
  .ba{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .ba .old{background:#2a1414;border:1px solid #5a2020;border-radius:8px;padding:12px}
  .ba .new{background:#10241a;border:1px solid #1f5236;border-radius:8px;padding:12px}
  .ba h4{margin:0 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:.05em}
  .ba .old h4{color:#ff9b9b} .ba .new h4{color:#7ee2a8}
  .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
  .card{background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:12px 14px}
  .card h4{margin:0 0 6px;font-size:14.5px;color:var(--accent)}
  .card .tag{font-size:11px;color:var(--muted)}
  .qa{border:1px solid var(--border);border-radius:10px;padding:12px 16px;margin:10px 0;background:var(--panel)}
  .qa h4{margin:0 0 6px;font-size:14.5px}
  .status-open{color:var(--warn)} .status-fixed{color:var(--good)} .status-tracking{color:var(--accent)}
  .status-still-current{color:var(--good)} .status-changed-later{color:var(--warn)} .status-removed{color:#ff9b9b}
  .vid{border:1px solid var(--border);border-radius:10px;padding:12px 16px;background:var(--panel)}
  .vid iframe{width:100%;aspect-ratio:16/9;border:0;border-radius:8px}
  .ts{font-size:12px;color:var(--muted);margin-top:6px}
  .src a{color:var(--accent)}
  .verify{font-size:12.5px;color:var(--good);margin-top:8px}
  .footnote{color:var(--muted);font-size:12px;margin-top:30px;border-top:1px solid var(--border);padding-top:14px}
</style>
</head><body>
<header>
  <h1>PoE2 Patch Notes — Fifth Batch (Standalone Preview)</h1>
  <p>8 patches × English/中文 = 16 articles. Auto-approved (published, verified, client 0.5.4e). Rendered from committed content JSON.</p>
  <div class="langbar">
    <button data-l="all" class="active">All</button>
    <button data-l="en">English</button>
    <button data-l="zh-cn">中文</button>
  </div>
</header>
<div class="layout">
  <nav id="nav"></nav>
  <main id="main"></main>
</div>
<script>
${imgMapJs}
${dataJs}
function esc(s){ if(s===null||s===undefined) return ""; return String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function img(p){ if(!p) return ""; if(typeof IMG_MAP!=='undefined'&&IMG_MAP[p]) return IMG_MAP[p]; if(p.startsWith("/images/")) return "app/assets/images/"+p.slice("/images/".length); return p; }
function P(arr){ return '<div class="paras">'+(Array.isArray(arr)?arr:[]).map(t=>'<p>'+esc(t)+'</p>').join('')+'</div>'; }
function B(arr){ return (Array.isArray(arr)&&arr.length)?'<ul class="bul">'+arr.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>':''; }
function statusClass(s){ return 'status-'+String(s).replace(/[^a-z-]/gi,''); }

function renderSection(s){
  switch(s.type){
    case "overview":
      return P(s.paragraphs)+B(s.bullets);
    case "historical-context":
      return '<p class="tag">'+esc(s.era||'')+'</p>'+P(s.paragraphs)+B(s.bullets);
    case "patch-family-timeline":
      return '<table><thead><tr><th>Patch</th><th>Date</th><th>Kind</th><th>Summary</th></tr></thead><tbody>'+
        (s.versions||[]).map(v=>'<tr><td><b>'+esc(v.code)+'</b></td><td>'+esc(v.date||'')+'</td><td>'+esc(v.kind||'')+'</td><td>'+esc(v.summary||'')+'</td></tr>').join('')+'</tbody></table>';
    case "data-table":
      return (s.caption?'<p class="tag">'+esc(s.caption)+'</p>':'')+
        '<table><thead><tr>'+(s.columns||[]).map(c=>'<th>'+esc(c.label)+'</th>').join('')+'</tr></thead><tbody>'+
        (s.rows||[]).map(r=>'<tr>'+(s.columns||[]).map(c=>'<td>'+esc(r[c.key])+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
    case "item-impact":
    case "build-impact":
      return (s.paragraphs?P(s.paragraphs):'')+(s.bullets?B(s.bullets):'')+
        (s.items?'<div class="cards">'+s.items.map(it=>'<div class="card"><h4>'+esc(it.title)+'</h4><p>'+esc(it.detail)+'</p><div class="tag">'+esc((it.tags||[]).join(', '))+'</div></div>').join('')+'</div>':'');
    case "boss-impact":
      return (s.paragraphs?P(s.paragraphs):'')+(s.bosses?'<div class="cards">'+s.bosses.map(b=>'<div class="card"><h4>'+esc(b.name)+'</h4><p>'+esc(b.detail)+'</p><div class="tag">'+esc(b.action||'')+'</div></div>').join('')+'</div>':'');
    case "before-after":
      return '<div class="ba"><div class="old"><h4>'+esc(s.oldLabel||'Before')+'</h4><p>'+esc(s.oldText)+'</p></div><div class="new"><h4>'+esc(s.newLabel||'After')+'</h4><p>'+esc(s.newText)+'</p></div></div>';
    case "then-vs-now":
      return '<table><thead><tr><th>Aspect</th><th>Then</th><th>Now</th></tr></thead><tbody>'+
        (s.rows||[]).map(r=>'<tr><td><b>'+esc(r.aspect)+'</b></td><td>'+esc(r.thenText)+'</td><td>'+esc(r.nowText)+'</td></tr>').join('')+'</tbody></table>';
    case "known-issues":
      return (s.issues||[]).map(i=>'<div class="card"><span class="'+statusClass(i.status)+'">['+esc(i.status)+']</span> <p>'+esc(i.text)+'</p></div>').join('');
    case "current-applicability":
      return '<table><thead><tr><th>Topic</th><th>Status</th><th>Current summary</th><th>Superseded by</th><th>Affected</th></tr></thead><tbody>'+
        (s.rows||[]).map(r=>'<tr><td><b>'+esc(r.topic)+'</b></td><td class="'+statusClass(r.status)+'">'+esc(r.status)+'</td><td>'+esc(r.currentSummary)+'</td><td>'+esc(r.supersededBy||'')+'</td><td>'+esc(r.affectedContent||'')+'</td></tr>').join('')+'</tbody></table>';
    case "community-evidence":
      return (s.reports||[]).map(r=>'<div class="card"><h4>'+esc(r.source)+'</h4><p><i>'+esc(r.context)+'</i></p><blockquote>“'+esc(r.quote)+'”</blockquote><p class="tag">'+esc(r.analysis)+'</p></div>').join('');
    case "legacy-content-audit":
    case "affected-content":
      return '<table><thead><tr><th>Name / ID</th><th>Type</th><th>Issue / Trigger</th><th>Action</th><th>Status</th></tr></thead><tbody>'+
        (s.rows||[]).map(r=>'<tr><td><b>'+esc(r.name||r.contentId)+'</b></td><td>'+esc(r.type||r.kind||'')+'</td><td>'+esc(r.issue||r.trigger||'')+'</td><td>'+esc(r.action||'')+'</td><td class="'+statusClass(r.status)+'">'+esc(r.status)+'</td></tr>').join('')+'</tbody></table>';
    case "change-explorer":
      return '<div class="cards">'+(s.changes||[]).map(c=>'<div class="card"><span class="tag">'+esc(c.category)+'</span><h4>'+esc(c.title)+'</h4><p>'+esc(c.detail)+'</p><div class="tag">'+esc(c.scope||'')+'</div></div>').join('')+'</div>';
    case "video":
      return (s.entries||[]).map(e=>{
        const yt = (e.url||'').match(/[?&]v=([^&]+)/);
        const embed = yt?('https://www.youtube.com/embed/'+yt[1]):e.url;
        return '<div class="vid"><h4>'+esc(e.label||'Video')+'</h4>'+(embed?'<iframe src="'+esc(embed)+'" loading="lazy" allowfullscreen></iframe>':'')+
          '<p>'+esc(e.takeaway||'')+'</p><div class="tag">'+esc(e.creator||'')+'</div>'+
          (e.timestamps&&e.timestamps.length?'<div class="ts">'+e.timestamps.map(t=>esc(t.time)+' '+esc(t.label)).join(' · ')+'</div>':'')+'</div>';
      }).join('');
    case "faq":
      return (s.items||[]).map(f=>'<div class="qa"><h4>'+esc(f.question)+'</h4>'+P(f.answer)+'</div>').join('');
    case "sources":
      return '<div class="src"><ul>'+(s.categories||[]).map(c=>'<li><b>'+esc(c.label)+'</b> — '+esc(c.description||'')+' <br><a href="'+esc(c.url)+'" target="_blank" rel="noopener">'+esc(c.url)+'</a></li>').join('')+'</ul>'+
        (s.verificationChecklist?'<div class="verify">✓ Verification: '+esc(s.verificationChecklist.status)+(s.verificationChecklist.verifiedClientVersion?' @ '+esc(s.verificationChecklist.verifiedClientVersion):'')+'</div>':'');
    case "changelog":
      return '<ul>'+(s.entries||[]).map(e=>'<li><b>'+esc(e.date)+'</b>: '+(e.changes||[]).map(c=>esc(c)).join('; ')+'</li>').join('')+'</ul>';
    default:
      return '<p class="tag">[unrendered section: '+esc(s.type)+']</p>';
  }
}

function renderArticle(a){
  const cats = (a.tags||[]).join(', ');
  const blocks = (a.sections||[]).map(s=>'<section class="blk"><h2>'+esc(s.title||s.type)+'</h2>'+renderSection(s)+'</section>').join('');
  return '<article class="patch" data-locale="'+esc(a.locale)+'">'+
    '<h1>'+esc(a.title)+'</h1>'+
    '<div class="meta">'+
      '<span class="pill">'+esc(a.patchVersion||a.patch)+'</span>'+
      '<span class="pill">'+esc(a.patchCategory)+'</span>'+
      '<span class="pill">'+esc(a.patchStatus)+'</span>'+
      '<span class="pill">'+esc(a.verificationStatus)+'</span>'+
      '<span class="pill">'+esc(a.locale)+'</span>'+
    '</div>'+
    (a.heroImage?'<img class="hero" src="'+esc(img(a.heroImage))+'" alt="'+esc(a.imageAlt||'')+'">':'')+
    '<p class="summary">'+esc(a.summary)+'</p>'+
    blocks+
    '</article>';
}

function build(){
  const nav = document.getElementById('nav');
  const main = document.getElementById('main');
  nav.innerHTML = '<h3>Articles ('+ARTICLES.length+')</h3><ul>'+
    ARTICLES.map((a,i)=>'<li><a href="#a'+i+'" data-locale="'+a.locale+'">'+esc(a.shortTitle||a.slug)+'<span class="badge">'+a.locale+'</span></a></li>').join('')+'</ul>';
  main.innerHTML = ARTICLES.map((a,i)=>'<div id="a'+i+'">'+renderArticle(a)+'</div>').join('')+
    '<div class="footnote">Standalone preview — content sourced from content/{en,zh-cn}/patches/*.json (fifth batch). Not the production build (repo-wide build is blocked by parallel content-agent WIP files).</div>';
}

function applyLang(l){
  document.querySelectorAll('[data-locale]').forEach(el=>{
    const show = (l==='all'||el.getAttribute('data-locale')===l);
    el.style.display = show ? '' : 'none';
  });
}

document.querySelectorAll('.langbar button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.langbar button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    applyLang(btn.getAttribute('data-l'));
  });
});

build();
</script>
</body></html>`;

const outPath = path.join(ROOT, "preview", "patches-fifth-batch-preview.html");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, html);
console.log("wrote", outPath, "bytes=", html.length, "articles=", articles.length);
