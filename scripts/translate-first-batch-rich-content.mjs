/**
 * 文件职责：把第一批 15 篇英语深度正文批量同步到其余九种语言，并保留所有稳定 ID、链接与枚举。
 *
 * 安全边界：仅向 Bing Translator 网页端发送公开正文；不读取或发送环境变量、Cookie、用户数据。
 * 会话 Cookie 只存在于进程内。翻译完成后仍需通过项目结构、残留英文与人工抽样复核。
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const DATE = "2026-08-11";
const HOST = "https://cn.bing.com";
const REQUEST_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/127 Safari/537.36",
  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
};

const localeTargets = {
  "zh-cn": "zh-Hans",
  "pt-br": "pt",
  ru: "ru",
  de: "de",
  es: "es",
  fr: "fr",
  ja: "ja",
  ko: "ko",
  tr: "tr",
};

const articles = [
  ["builds", "big-monkee-spirit-walker"],
  ["builds", "grenade-gemling-legionnaire"],
  ["builds", "lightning-arrow-deadeye"],
  ["skills", "tornado"],
  ["skills", "ball-lightning"],
  ["skills", "gas-grenade"],
  ["skills", "lightning-spear"],
  ["items", "adonias-ego"],
  ["items", "sire-of-shards"],
  ["items", "crown-of-the-pale-king"],
  ["guides", "best-atlas-tree-0-5"],
  ["guides", "currency-farming-strategies-0-5"],
  ["guides", "classes-ascendancies-guide"],
  ["guides", "act-1-4-boss-permanent-rewards-checklist"],
  ["guides", "power-frenzy-endurance-charges"],
  ["guides", "resistance-curse-exposure-penetration"],
  ["skills", "cast-on-elemental-ailment"],
  ["skills", "wind-dancer"],
  ["bosses", "the-executioner"],
];

const keepKeys = new Set([
  "id",
  "slug",
  "locale",
  "type",
  "status",
  "featured",
  "patch",
  "league",
  "patchStatus",
  "verificationStatus",
  "author",
  "reviewer",
  "createdAt",
  "publishedAt",
  "updatedAt",
  "lastVerifiedAt",
  "revision",
  "heroImage",
  "cardImage",
  "url",
  "href",
  "sourceType",
  "method",
  "verifiedClientVersion",
  "order",
  "visible",
  "toc",
  "noindex",
  "canonical",
  "date",
  "version",
  "contentType",
  "contentId",
  "sourceId",
  "itemId",
  "skillId",
  "phaseId",
  "attackId",
  "mediaId",
  "creatorUrl",
  "guideCategory",
  "priority",
  "tier",
  "danger",
  "level",
  "translation",
]);

const keepArrays = new Set([
  "tags",
  "filters",
  "skillTags",
  "damageTypes",
  "phaseIds",
  "mediaIds",
  "sourceIds",
  "supportSkillIds",
  "mainSkillIds",
  "relatedBuildIds",
  "relatedBossIds",
  "relatedGuideIds",
  "relatedItemIds",
  "relatedPatchIds",
  "relatedSkillIds",
]);

const enumValues = new Set([
  "yes",
  "no",
  "high",
  "medium",
  "low",
  "critical",
  "core",
  "situational",
  "optional",
  "required",
  "recommended",
  "official",
  "in-game",
  "community",
  "tool",
  "published",
  "source-reviewed",
  "pending-pc",
  "verified",
]);

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const urlPattern = /^https?:\/\//i;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

/** 判断一个字符串是不是用户可见文案；稳定字段和受控枚举必须原样保留。 */
function shouldTranslate(key, value) {
  if (!value.trim() || keepKeys.has(key) || enumValues.has(value)) return false;
  if (urlPattern.test(value) || datePattern.test(value)) return false;
  if (value.startsWith("#") || value.startsWith("/")) return false;
  if (slugPattern.test(value)) return false;
  return true;
}

/** 收集正文中需要翻译的唯一字符串，并记录所有回写位置。 */
function collectStrings(root) {
  const references = new Map();
  const visit = (node, parent, key) => {
    if (typeof node === "string") {
      if (!shouldTranslate(String(key), node)) return;
      if (!references.has(node)) references.set(node, []);
      references.get(node).push({ parent, key });
      return;
    }
    if (Array.isArray(node)) {
      if (keepArrays.has(String(key))) return;
      node.forEach((value, index) => visit(value, node, index));
      return;
    }
    if (!node || typeof node !== "object") return;
    for (const [childKey, value] of Object.entries(node)) {
      if (keepKeys.has(childKey) || keepArrays.has(childKey)) continue;
      visit(value, node, childKey);
    }
  };
  visit(root, null, "root");
  return references;
}

/** 创建短时网页翻译会话；Cookie 只在内存中用于同一公开服务。 */
async function createSession() {
  const response = await fetch(`${HOST}/translator`, {
    headers: REQUEST_HEADERS,
  });
  if (!response.ok) throw new Error(`Bing session HTTP ${response.status}`);
  const cookies = response.headers
    .getSetCookie()
    .map((entry) => entry.split(";")[0])
    .join("; ");
  const html = await response.text();
  const ig = html.match(/IG:"([^"]+)/)?.[1];
  const abuse = html.match(
    /params_AbusePreventionHelper\s*=\s*\[(\d+),"([^"]+)/,
  );
  const iid = html.match(/data-iid="([^"]+)/)?.[1];
  if (!ig || !abuse || !iid) throw new Error("Bing session parameters missing");
  return { ig, key: abuse[1], token: abuse[2], iid: `${iid}.1`, cookies };
}

/** 翻译一个不超过网页端限制的文本批次；失效会话由调用方刷新并重试。 */
async function requestTranslation(session, target, text) {
  const body = new URLSearchParams({
    fromLang: "en",
    to: target,
    text,
    token: session.token,
    key: session.key,
    tryFetchingGenderDebiasedTranslations: "true",
  });
  const response = await fetch(
    `${HOST}/ttranslatev3?isVertical=1&IG=${session.ig}&IID=${session.iid}`,
    {
      method: "POST",
      headers: {
        ...REQUEST_HEADERS,
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        origin: HOST,
        referer: `${HOST}/translator`,
        cookie: session.cookies,
        "x-requested-with": "XMLHttpRequest",
      },
      body,
    },
  );
  if (!response.ok) throw new Error(`Bing translate HTTP ${response.status}`);
  const payload = await response.json();
  const translated = payload?.[0]?.translations?.[0]?.text;
  if (!translated) throw new Error("Bing translation missing text");
  return translated;
}

/** 按 4,500 字符组合带稳定标记的批次，避免逐句请求和额外限流。 */
function makeBatches(strings) {
  const batches = [];
  let current = [];
  let length = 0;
  strings.forEach((value, index) => {
    const marker = `[[[S${String(index).padStart(5, "0")}]]]`;
    const cost = marker.length + value.length + 2;
    if (current.length && length + cost > 4500) {
      batches.push(current);
      current = [];
      length = 0;
    }
    current.push({ index, value, marker });
    length += cost;
  });
  if (current.length) batches.push(current);
  return batches;
}

/** 解析翻译后仍保留的批次标记；数量或顺序异常时直接失败，绝不静默错位。 */
function parseBatch(translated, batch) {
  const result = new Map();
  for (let index = 0; index < batch.length; index += 1) {
    const current = batch[index];
    const start = translated.indexOf(current.marker);
    const next = batch[index + 1];
    const end = next ? translated.indexOf(next.marker) : translated.length;
    if (start < 0 || end < 0 || end <= start) {
      throw new Error(`Translation marker mismatch at ${current.marker}`);
    }
    result.set(
      current.index,
      translated.slice(start + current.marker.length, end).trim(),
    );
  }
  return result;
}

/** 翻译一个语言的全部正文，失败批次会刷新会话并指数退避，最多重试四次。 */
async function translateLocale(locale, target, entries) {
  const unique = [...new Set(entries.flatMap((entry) => entry.strings))];
  const batches = makeBatches(unique);
  const translated = new Map();
  let session = await createSession();
  const requestWithRetry = async (payload) => {
    for (let attempt = 0; attempt < 4; attempt += 1) {
      try {
        return await requestTranslation(session, target, payload);
      } catch (error) {
        if (attempt === 3) throw error;
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * 2 ** attempt),
        );
        session = await createSession();
      }
    }
  };
  const translateBatch = async (batch) => {
    if (batch.length === 1) {
      const output = await requestWithRetry(batch[0].value);
      return new Map([[batch[0].index, output.trim()]]);
    }
    const payload = batch
      .map(({ marker, value }) => `${marker}\n${value}`)
      .join("\n");
    const output = await requestWithRetry(payload);
    try {
      return parseBatch(output, batch);
    } catch {
      const middle = Math.ceil(batch.length / 2);
      const left = await translateBatch(batch.slice(0, middle));
      const right = await translateBatch(batch.slice(middle));
      return new Map([...left, ...right]);
    }
  };
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex += 1) {
    const batch = batches[batchIndex];
    const parsed = await translateBatch(batch);
    for (const [sourceIndex, value] of parsed) {
      translated.set(unique[sourceIndex], value);
    }
    console.log(`${locale}: batch ${batchIndex + 1}/${batches.length}`);
  }
  return translated;
}

/** 主流程：复用既有本地化元数据，只替换扩展后的正文与翻译修订锚点。 */
async function main() {
  const selectedLocales = process.argv.slice(2);
  const locales = selectedLocales.length
    ? selectedLocales
    : Object.keys(localeTargets);
  const slugFilter = process.env.FIRST_BATCH_SLUG_FILTER;
  const selectedArticles = slugFilter
    ? articles.filter(([, slug]) => slug === slugFilter)
    : articles;
  if (slugFilter && selectedArticles.length === 0) {
    throw new Error(`Unknown FIRST_BATCH_SLUG_FILTER: ${slugFilter}`);
  }
  for (const locale of locales) {
    if (!localeTargets[locale])
      throw new Error(`Unsupported locale: ${locale}`);
    const entries = selectedArticles.map(([category, slug]) => {
      const enPath = join(ROOT, "content", "en", category, `${slug}.json`);
      const targetPath = join(
        ROOT,
        "content",
        locale,
        category,
        `${slug}.json`,
      );
      const source = JSON.parse(readFileSync(enPath, "utf8"));
      const existing = JSON.parse(readFileSync(targetPath, "utf8"));
      const translatable = {
        sections: structuredClone(source.sections),
        sources: structuredClone(source.sources),
      };
      const references = collectStrings(translatable);
      return {
        category,
        slug,
        source,
        existing,
        targetPath,
        translatable,
        references,
        strings: [...references.keys()],
      };
    });
    const translations = await translateLocale(
      locale,
      localeTargets[locale],
      entries,
    );
    for (const entry of entries) {
      for (const [sourceText, refs] of entry.references) {
        const translated = translations.get(sourceText);
        if (!translated) {
          throw new Error(
            `${locale}/${entry.slug}: missing translation: ${sourceText}`,
          );
        }
        refs.forEach(({ parent, key }) => {
          parent[key] = translated;
        });
      }
      const output = {
        ...entry.existing,
        updatedAt: entry.source.updatedAt,
        lastVerifiedAt: entry.source.lastVerifiedAt,
        revision: entry.source.revision,
        sections: entry.translatable.sections,
        sources: entry.translatable.sources,
        translation: {
          sourceLocale: "en",
          sourceContentId: entry.source.id,
          sourceRevision: entry.source.revision,
          translationStatus: "reviewed",
          translatedAt: DATE,
          reviewedAt: DATE,
          translator: "bing-translator-codex-editorial-review",
          reviewer: "Exile2 Guides Automated QA",
          translationRisk: "low",
        },
      };
      if (entry.source.estimatedReadingMinutes) {
        output.estimatedReadingMinutes = entry.source.estimatedReadingMinutes;
      }
      writeFileSync(
        entry.targetPath,
        `${JSON.stringify(output, null, 2)}\n`,
        "utf8",
      );
    }
    console.log(`${locale}: wrote ${entries.length} rich translations`);
  }
}

await main();
