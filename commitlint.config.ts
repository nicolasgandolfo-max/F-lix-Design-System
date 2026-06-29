import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Enforce conventional commit types
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation only
        "style", // Formatting, missing semicolons, etc.
        "refactor", // Code change that neither fixes a bug nor adds a feature
        "perf", // Performance improvement
        "test", // Adding missing tests
        "build", // Changes to build system or dependencies
        "ci", // Changes to CI configuration
        "chore", // Other changes that don't modify src or test files
        "revert", // Reverts a previous commit
      ],
    ],
    // Scope is optional but must be lowercase when present
    "scope-case": [2, "always", "lower-case"],
    // Subject must not end with a period
    "subject-full-stop": [2, "never", "."],
    // Subject must start with lowercase
    "subject-case": [2, "never", ["upper-case", "pascal-case", "start-case"]],
    // Max header length
    "header-max-length": [2, "always", 100],
  },
};

export default config;
