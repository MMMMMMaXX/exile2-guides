/** 文件职责：校验 10 语言契约完整性（localeMeta + UI 文案表），作为 i18n 门禁。 */
import {
  localeMeta,
  supportedLocales,
  type ContentLocale,
} from "../lib/content/constants";
import { hasUiTable, uiByLocale } from "../lib/i18n/ui";

function fail(message: string): never {
  console.error(`i18n validation failed: ${message}`);
  process.exitCode = 1;
  throw new Error(message);
}

function main(): void {
  const metaLocales = Object.keys(localeMeta) as ContentLocale[];
  const missingMeta = supportedLocales.filter(
    (locale) => !metaLocales.includes(locale),
  );
  if (missingMeta.length > 0) {
    fail(`localeMeta missing locales: ${missingMeta.join(", ")}`);
  }
  for (const locale of supportedLocales) {
    const meta = localeMeta[locale];
    if (!meta.htmlLang || !meta.hreflang || !meta.label || !meta.ogLocale) {
      fail(`localeMeta[${locale}] missing required fields`);
    }
  }

  const declaredUi = Object.keys(uiByLocale) as ContentLocale[];
  const missingUi = supportedLocales.filter(
    (locale) => !declaredUi.includes(locale),
  );
  if (missingUi.length > 0) {
    fail(`uiByLocale missing locales: ${missingUi.join(", ")}`);
  }
  for (const locale of supportedLocales) {
    if (!hasUiTable(locale)) {
      const expected = Object.keys(uiByLocale.en).length;
      const actual = Object.keys(uiByLocale[locale]).length;
      fail(
        `UI copy table for ${locale} incomplete (${actual}/${expected} keys)`,
      );
    }
  }

  console.log(
    `i18n validation passed: ${supportedLocales.length} locales, localeMeta and UI copy tables complete.`,
  );
}

main();
