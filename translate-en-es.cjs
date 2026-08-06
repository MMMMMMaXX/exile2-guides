// apply.cjs — en -> es transformer.
// extract <enFile>            -> prints JSON array of translatable strings (document order)
// apply  <enFile> <esArr> <outFile>  -> writes es, consuming an ordered Spanish array (same length/order)
const fs = require('fs');

const PROSE_KEYS = new Set([
  'title','shortTitle','summary','description','imageAlt','label','text','question','answer',
  'intro','caption','why','fix','callout','trigger','heading','content','name','subtitle',
  'overview','solution','alt','note','notes','detail','details','body','objective','objectives',
  'paragraph','paragraphs','bullet','bullets','pro','pros','con','cons','step','steps','changes'
]);
const BLACKLIST_KEYS = new Set([
  'id','slug','locale','type','status','order','sourceType','rarity','itemType','itemClass',
  'patch','league','verificationStatus','severity','noindex','canonical','format','engine',
  'rights','credit','author','reviewer'
]);
const ENUM_SINGLE = new Set([
  'official','community','tool','unique','rare','magic','normal','epic','legendary','common',
  'starter','leveling','early-endgame','endgame','bossing','mapping','pinnacle','campaign',
  'side','low','medium','high','luxury','easy','advanced','hard','beginner','spellcaster',
  'elemental','physical','fire','cold','lightning','holy','chaos','poison','bleed','current',
  'pending-pc','source-reviewed','auto','manual','published','en','es','true','false','draft',
  'optional','required','none'
]);
function isUrl(s){ return /^https?:\/\//i.test(s) || /^mailto:/i.test(s) || s.startsWith('/images/') || /youtube\.com/.test(s) || /youtu\.be/.test(s) || /watch\?v=/.test(s) || /twitch\.tv/.test(s); }
function isDate(s){ return /^\d{4}-\d{2}-\d{2}([T ].*)?$/.test(s.trim()); }
function isNum(s){ return /^\s*-?\d+([.,]\d+)?%?\s*$/.test(s) || /^\s*\d+(\.\d+)?\s*(m|km|lvl|level|%|x)\s*$/i.test(s.trim()); }
function isIdKey(k){ return /Id$/i.test(k) || /Ids$/i.test(k); }
function rewriteLinks(s){ return s.replace(/\/en\//g, '/es/'); }
const LINKONLY_KEYS = new Set(['url','src','href']);

// returns 'translate' | 'linkonly' | null
function classify(key, val, ctx){
  if (typeof val !== 'string') return null;
  if (isUrl(val) || isDate(val) || isNum(val)) return null;
  if (LINKONLY_KEYS.has(key)) return 'linkonly';
  if (BLACKLIST_KEYS.has(key) || isIdKey(key)) return null;
  if ((ctx === 'sources' || ctx === 'categories') && key === 'label') return null;
  if (!PROSE_KEYS.has(key)) return null;
  if (ENUM_SINGLE.has(val.trim().toLowerCase()) && val.trim().split(/\s+/).length === 1) return null;
  return 'translate';
}

// Visit every translatable string node in document order. visit({get,set,action,key,ctx,path})
function forEach(obj, ctx, visit){
  if (Array.isArray(obj)){
    obj.forEach((item, i) => { if (item && typeof item === 'object') forEach(item, ctx, visit); });
    return;
  }
  if (obj && typeof obj === 'object'){
    for (const k of Object.keys(obj)){
      const v = obj[k];
      if (typeof v === 'string'){
        const action = classify(k, v, ctx);
        if (action) visit({ key:k, ctx, get:()=>obj[k], set:(x)=>{obj[k]=x;}, action });
      } else if (Array.isArray(v)){
        if (PROSE_KEYS.has(k) && v.length && v.every(x=>typeof x==='string')){
          v.forEach((s, i) => visit({ key:k, ctx, get:()=>v[i], set:(x)=>{v[i]=x;}, action:'translate' }));
        } else {
          forEach(v, k, visit);
        }
      } else if (v && typeof v === 'object'){
        forEach(v, k, visit);
      }
    }
  }
}

function deepClone(o){ return JSON.parse(JSON.stringify(o)); }

function main(){
  const mode = process.argv[2];
  if (mode === 'extract'){
    const data = JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
    const seq = [];
    forEach(data, 'root', ({get}) => seq.push(get()));
    console.log(JSON.stringify(seq));
    return;
  }
  if (mode === 'apply'){
    const en = JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
    const esArr = JSON.parse(fs.readFileSync(process.argv[4],'utf8'));
    const out = process.argv[5];
    const clone = deepClone(en);
    let i = 0; const missing = [];
    forEach(clone, 'root', ({get, set, action}) => {
      const en = get();
      if (i >= esArr.length){ missing.push('Ran out of translations at: ' + en.slice(0,60)); return; }
      const es = esArr[i++];
      if (action === 'linkonly') set(rewriteLinks(en));
      else set(rewriteLinks(es));
    });
    clone.locale = 'es';
    if (i !== esArr.length) missing.push(`Count mismatch: en=${i} esArr=${esArr.length}`);
    fs.writeFileSync(out, JSON.stringify(clone, null, 2) + '\n');
    if (missing.length){ console.log('WARN:'); missing.forEach(m=>console.log('  '+m)); }
    else console.log('OK: '+out);
    return;
  }
  if (mode === 'batch'){
    // manifest.json: { "<enPath>": [spanishArray], ... }  writes to <enPath with /en/->/es/>
    const manifest = JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
    let total=0, problems=0;
    for (const enPath of Object.keys(manifest)){
      const esPath = enPath.replace('/en/','/es/');
      const esArr = manifest[enPath];
      const en = JSON.parse(fs.readFileSync(enPath,'utf8'));
      const clone = deepClone(en);
      let i=0; const miss=[];
      forEach(clone,'root',({get,set,action})=>{
        const e=get();
        if(i>=esArr.length){miss.push('out of translations: '+e.slice(0,50));return;}
        const es=esArr[i++];
        if(action==='linkonly') set(rewriteLinks(e)); else set(rewriteLinks(es));
      });
      clone.locale='es';
      if(i!==esArr.length) miss.push('count mismatch en='+i+' es='+esArr.length);
      if(miss.length){ problems++; console.log('PROBLEM '+enPath); miss.slice(0,5).forEach(m=>console.log('   '+m)); }
      else { total++; fs.writeFileSync(esPath, JSON.stringify(clone,null,2)+'\n'); }
    }
    console.log('batch done: '+total+' ok, '+problems+' problems');
    return;
  }
  console.error('usage: apply.cjs extract|apply|batch ...');
  process.exit(1);
}
main();
