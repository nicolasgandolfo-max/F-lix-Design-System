import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import preserveDirectives from "rollup-preserve-directives";
import dts from "rollup-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";
import { copyFileSync } from "fs";
import process from "node:process";

// Simple plugin to copy CSS files to dist
function copyCSS() {
  return {
    name: "copy-css",
    writeBundle() {
      copyFileSync("src/theme.css", "dist/theme.css");
      copyFileSync("src/fonts.css", "dist/fonts.css");
    },
  };
}

const config = [
  // ESM and CJS builds
  {
    input: {
      index: "src/index.ts",
      preset: "src/preset.ts",
      "tokens/index": "src/tokens/index.ts",
    },
    output: [
      {
        dir: "dist",
        format: "es",
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        exports: "named",
      },
      {
        dir: "dist",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].cjs",
        exports: "named",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationDir: undefined,
        outDir: "dist",
      }),
      preserveDirectives(),
      copyCSS(),
      process.env.ANALYZE === "true" &&
        visualizer({
          filename: "dist/bundle-analysis.html",
          template: "treemap",
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),
    external: [
      "react",
      "react-dom",
      "tailwindcss",
      "@tailwindcss/postcss",
      /node_modules/,
    ],
  },
  // Type definitions
  {
    input: {
      index: "src/index.ts",
      preset: "src/preset.ts",
      "tokens/index": "src/tokens/index.ts",
    },
    output: {
      dir: "dist",
      format: "es",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [dts()],
    external: [/\.css$/],
  },
];

export default config;

