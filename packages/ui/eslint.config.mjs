import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import importX from "eslint-plugin-import-x";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser, // HTMLButtonElement, document, window, etc.
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "import-x": importX,
    },
    rules: {
      // ─── TypeScript ───────────────────────────────────────────────────
      // Disable base rule — @typescript-eslint version handles TS properly
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",

      // ─── React Hooks ──────────────────────────────────────────────────
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ─── Accessibility ────────────────────────────────────────────────
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/no-redundant-roles": "warn",

      // ─── Imports ──────────────────────────────────────────────────────
      "import-x/no-duplicates": "error",
      "import-x/no-self-import": "error",
      "import-x/no-cycle": "warn",
      "import-x/first": "error",
    },
  },
  {
    ignores: ["dist/", "node_modules/"],
  },
];
