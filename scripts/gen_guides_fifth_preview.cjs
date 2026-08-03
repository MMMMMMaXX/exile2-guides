/** 文件职责：将第五批 16 篇 guides 文章渲染为一个自包含 HTML 预览，复用既有第五批离线预览思路。
 * 由于并行内容代理实时写入的 items 文件存在 dangling relatedContentIds（24 个 missing-related-content），
 * 整仓生产构建被阻断；故沿用前几批策略——生成离线预览并本地静态服务，便于查看第五批 guides 页面真实渲染效果。 */

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SLUGS = [
  "attack-spell-hit-damage-over-time-tags",
  "damage-scaling-order-conversion-gain-as-extra",
  "resistance-curse-exposure-penetration",
  "accuracy-distance-penalty-hit-chance",
  "critical-hit-chance-damage-bonus-transition",
  "life-mana-recovery-leech-regeneration-recoup-recharge",
  "projectile-pierce-fork-chain-return",
  "power-frenzy-endurance-charges",
];
const LOCALES = ["en", "zh-cn"];

function loadArticles() {
  const out = [];
  for (const slug of SLUGS) {
    for (const loc of LOCALES) {
      const p = path.join(ROOT, "content", loc, "guides", slug + ".json");
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
  } catch (e) {
    /* 缺失文件则回退到路径 */
  }
}
const imgMapJs = "const IMG_MAP = " + JSON.stringify(IMG_MAP) + ";";
const dataJs = "const ARTICLES = " + JSON.stringify(articles) + ";";

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>PoE2 Guides — Fifth Batch (Standalone Preview)</title>
<style>
  :root{ --bg:#0d1117; --panel:#161b22; --ink:#e6edf3; --muted:#8b949e; --accent:#58a6ff; --border:#30363d; --card:#1c2230; --good:#3fb950; --warn:#d29922; --bad:#f85149; }
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
  main{flex:1;padding:24px 40px;max-width:980px}
  .guide{border:1px solid var(--border);background:var(--card);border-radius:12px;padding:22px 28px;margin:0 0 30px;scroll-margin-top:16px}
  .guide h1{font-size:25px;margin:0 0 4px}
  .guide .meta{color:var(--muted);font-size:12.5px;margin-bottom:14px;display:flex;gap:8px;flex-wrap:wrap}
  .guide .meta .pill{background:var(--panel);border:1px solid var(--border);border-radius:20px;padding:2px 10px}
  .hero{width:100%;max-height:300px;object-fit:cover;border-radius:10px;margin:6px 0 16px;border:1px solid var(--border)}
  .summary{font-size:15.5px;color:#c9d4e0}
  .prereq{background:var(--panel);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:8px;padding:10px 14px;margin:12px 0;font-size:13.5px}
  .prereq b{color:var(--accent)}
  .tagrow{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}
  .tagrow span{background:var(--panel);border:1px solid var(--border);border-radius:20px;padding:2px 9px;font-size:11.5px;color:var(--muted)}
  section.blk{border-top:1px solid var(--border);margin-top:18px;padding-top:14px}
  section.blk h2{font-size:18px;margin:0 0 10px;color:#fff}
  .paras p{margin:0 0 10px}
  ul.bul{margin:6px 0 0;padding-left:20px} ul.bul li{margin:3px 0}
  table{border-collapse:collapse;width:100%;margin:8px 0;font-size:13.5px}
  th,td{border:1px solid var(--border);padding:7px 10px;text-align:left;vertical-align:top}
  th{background:var(--panel);color:var(--ink)}
  .note{font-size:12.5px;color:var(--muted);margin-top:8px;font-style:italic}
  .qa-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .qa{border:1px solid var(--border);border-radius:10px;padding:12px 16px;background:var(--panel)}
  .qa h4{margin:0 0 6px;font-size:14.5px;color:var(--accent)}
  .mistakes{background:#2a1414;border:1px solid #5a2020;border-radius:10px;padding:12px 16px}
  .mistakes ul.bul li{color:#ffd7d7}
  .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
  .card{background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:12px 14px}
  .card h4{margin:0 0 6px;font-size:14.5px;color:var(--accent)}
  .card .tag{font-size:11px;color:var(--muted)}
  .diag .rule{border:1px solid var(--border);border-radius:10px;padding:12px 16px;margin:10px 0;background:var(--panel)}
  .diag .rule .when{font-size:12px;color:var(--warn);margin-bottom:6px}
  .diag .rule ol{margin:4px 0 0;padding-left:20px}
  .vid{border:1px solid var(--border);border-radius:10px;padding:12px 16px;background:var(--panel)}
  .vid iframe{width:100%;aspect-ratio:16/9;border:0;border-radius:8px}
  .ts{font-size:12px;color:var(--muted);margin-top:6px}
  .src a{color:var(--accent)}
  .verify{font-size:12.5px;color:var(--good);margin-top:8px}
  .chg{font-size:13px}
  .chg li{margin:3px 0}
  .footnote{color:var(--muted);font-size:12px;margin-top:30px;border-top:1px solid var(--border);padding-top:14px}
</style>
</head><body>
<header>
  <h1>PoE2 Guides — Fifth Batch (Standalone Preview)</h1>
  <p>8 mechanics guides × English/中文 = 16 articles. Auto-approved (published, pending-pc, client 0.5.4). Rendered from committed content JSON.</p>
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
function ytId(url){ const m=(url||'').match(/[?&]v=([^&]+)/); return m?m[1]:null; }

function renderSection(s){
  switch(s.type){
    case "overview":
      return P(s.paragraphs)+B(s.bullets);
    case "quick-answer":
      return '<div class="qa-grid">'+(s.items||[]).map(it=>'<div class="qa"><h4>'+esc(it.title)+'</h4>'+P(it.body)+'</div>').join('')+'</div>';
    case "data-table":
      return (s.caption?'<p class="note">'+esc(s.caption)+'</p>':'')+
        '<table><thead><tr>'+(s.columns||[]).map(c=>'<th>'+esc(c.label)+'</th>').join('')+'</tr></thead><tbody>'+
        (s.rows||[]).map(r=>'<tr>'+(s.columns||[]).map(c=>'<td>'+esc((r.cells&&r.cells[c.key])||'')+'</td>').join('')+'</tr>').join('')+'</tbody></table>'+
        (s.note?'<p class="note">'+esc(s.note)+'</p>':'');
    case "diagnostic":
      var html='<p class="note">'+esc(s.intro||'')+'</p>';
      html+='<p class="note">Controls: '+((s.controls||[]).map(c=>esc(c.label)).join(' · '))+'</p>';
      html+=(s.rules||[]).map(r=>{
        var when=Object.keys(r.when||{}).map(k=>k+' = '+(r.when[k]||'')).join(', ');
        return '<div class="rule"><div class="when">IF '+esc(when)+'</div><h4>'+esc(r.title)+'</h4><ol>'+(r.steps||[]).map(st=>'<li>'+esc(st)+'</li>').join('')+'</ol></div>';
      }).join('');
      if(s.defaultResult){ html+='<div class="rule"><div class="when">DEFAULT</div><h4>'+esc(s.defaultResult.title)+'</h4><ol>'+(s.defaultResult.steps||[]).map(st=>'<li>'+esc(st)+'</li>').join('')+'</ol></div>'; }
      return html;
    case "common-mistakes":
      return '<div class="mistakes">'+P(s.paragraphs)+B(s.bullets)+'</div>';
    case "card-grid":
      return (s.intro?'<p class="note">'+esc(s.intro)+'</p>':'')+
        '<div class="cards">'+(s.cards||[]).map(c=>'<div class="card"><h4>'+esc(c.title)+'</h4>'+P(c.body)+'<div class="tag">'+esc(c.tag||'')+'</div></div>').join('')+'</div>';
    case "video":
      return (s.entries||[]).map(e=>{
        const id=ytId(e.url);
        const embed=id?('https://www.youtube.com/embed/'+id):e.url;
        return '<div class="vid"><h4>'+esc(e.label||'Video')+'</h4>'+(embed?'<iframe src="'+esc(embed)+'" loading="lazy" allowfullscreen></iframe>':'')+
          (e.description?'<p>'+esc(e.description)+'</p>':'')+
          (e.takeaway?'<p class="note"><b>Takeaway:</b> '+esc(e.takeaway)+'</p>':'')+
          '<div class="tag">'+esc(e.creator||'')+'</div>'+
          (e.timestamps&&e.timestamps.length?'<div class="ts">'+e.timestamps.map(t=>esc(t.time)+' '+esc(t.label)).join(' · ')+'</div>':'')+'</div>';
      }).join('');
    case "faq":
      return (s.items||[]).map(f=>'<div class="qa"><h4>'+esc(f.question)+'</h4>'+P(f.answer)+'</div>').join('');
    case "sources":
      return '<div class="src"><ul>'+(s.categories||[]).map(c=>'<li><b>'+esc(c.label)+'</b> — '+esc(c.description||'')+' <br><a href="'+esc(c.url)+'" target="_blank" rel="noopener">'+esc(c.url)+'</a></li>').join('')+'</ul>'+
        (s.verificationChecklist?'<div class="verify">✓ Verification: '+esc(s.verificationChecklist.status)+(s.verificationChecklist.verifiedClientVersion?' @ '+esc(s.verificationChecklist.verifiedClientVersion):'')+'</div>':'');
    case "changelog":
      return (s.entries||[]).map(e=>'<div class="chg"><b>'+esc(e.date)+'</b><ul>'+((e.changes||[]).map(c=>'<li>'+esc(c)+'</li>').join(''))+'</ul></div>').join('');
    default:
      return '<p class="note">[unrendered section: '+esc(s.type)+']</p>';
  }
}

function renderArticle(a){
  const cats=(a.tags||[]).join(', ');
  const blocks=(a.sections||[]).map(s=>'<section class="blk"><h2>'+esc(s.title||s.type)+'</h2>'+renderSection(s)+'</section>').join('');
  const prereq=(a.prerequisites&&a.prerequisites.length)?'<div class="prereq"><b>Prerequisites:</b><ul class="bul">'+a.prerequisites.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul></div>':'';
  const tags=(a.tags||[]).map(t=>'<span>'+esc(t)+'</span>').join('');
  return '<article class="guide" data-locale="'+esc(a.locale)+'">'+
    '<h1>'+esc(a.title)+'</h1>'+
    '<div class="meta">'+
      '<span class="pill">'+esc(a.guideCategory||'guide')+'</span>'+
      '<span class="pill">'+esc(a.patch||'')+'</span>'+
      '<span class="pill">'+esc(a.patchStatus||'')+'</span>'+
      '<span class="pill">'+esc(a.verificationStatus||'')+'</span>'+
      '<span class="pill">'+esc(a.locale)+'</span>'+
      (a.estimatedReadingMinutes?'<span class="pill">'+esc(a.estimatedReadingMinutes)+' min</span>':'')+
    '</div>'+
    (a.heroImage?'<img class="hero" src="'+esc(img(a.heroImage))+'" alt="'+esc(a.imageAlt||'')+'">':'')+
    '<p class="summary">'+esc(a.summary)+'</p>'+
    prereq+
    '<div class="tagrow">'+tags+'</div>'+
    blocks+
    '</article>';
}

function build(){
  const nav=document.getElementById('nav');
  const main=document.getElementById('main');
  nav.innerHTML='<h3>Articles ('+ARTICLES.length+')</h3><ul>'+
    ARTICLES.map((a,i)=>'<li><a href="#a'+i+'" data-locale="'+a.locale+'">'+esc(a.shortTitle||a.slug)+'<span class="badge">'+a.locale+'</span></a></li>').join('')+'</ul>';
  main.innerHTML=ARTICLES.map((a,i)=>'<div id="a'+i+'">'+renderArticle(a)+'</div>').join('')+
    '<div class="footnote">Standalone preview — content sourced from content/{en,zh-cn}/guides/*.json (fifth batch). Not the production build (repo-wide build is blocked by parallel content-agent WIP: 24 missing-related-content issues in items/).</div>';
}

function applyLang(l){
  document.querySelectorAll('[data-locale]').forEach(el=>{
    const show=(l==='all'||el.getAttribute('data-locale')===l);
    el.style.display=show?'':'none';
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

const outPath = path.join(ROOT, "preview", "guides-fifth-batch-preview.html");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, html);
console.log("wrote", outPath, "bytes=", html.length, "articles=", articles.length, "heroImagesInlined=", Object.keys(IMG_MAP).length);
