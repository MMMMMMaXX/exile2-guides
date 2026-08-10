/** 文件职责：集中定义源码静态检查规则，并排除生成目录。 */
import eslint from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "build/**",
      ".react-router/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      // 外接技能资产与历史一次性迁移脚本不属于站点运行时代码，避免污染正式门禁。
      ".agents/**",
      "_validate_*.{js,mjs}",
      "tmp_validate.js",
      "i18n_boss.mjs",
      "translate-en-es.cjs",
      "scripts/_*.{js,mjs,cjs,ts,mts,cts}",
      "scripts/apply_tr.cjs",
      "scripts/gen-de-guides.mjs",
      "scripts/i18n-parity-report.mts",
      "scripts/ko_helper.cjs",
      "scripts/ko_pipeline.cjs",
      "scripts/translate-content.mjs",
      "scripts/translate_to_tr.cjs",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ["app/routes/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    // 文件职责：为 Node 维护脚本声明全局变量，避免 no-undef 误报。
    files: ["scripts/**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // globals.node 已包含 console/process/Buffer 等内置全局，关闭内置全局重声明报错。
      "no-redeclare": ["error", { builtinGlobals: false }],
    },
  },
  {
    // 文件职责：.cjs 为 CommonJS 文件，require() 是其原生导入方式，关闭该规则误报。
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
