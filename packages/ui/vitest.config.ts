import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  // JSX transform via esbuild's automatic runtime — no @vitejs/plugin-react needed
  // for unit tests. This avoids the Vite 6/rolldown peer-dep conflict in the workspace.
  esbuild: {
    jsxImportSource: "react",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
      exclude: [
        "src/test/**",
        "**/*.test.ts",
        "**/*.test.tsx",
        "src/preset.ts",
        "dist/**",
        "scripts/**",
        // config files
        "**/*.config.ts",
        "**/*.config.mjs",
        // barrel re-exports
        "src/index.ts",
        "src/tokens/tokens.ts",
        "src/tokens/index.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
