import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const tokensAlias = fileURLToPath(
  new URL("../../packages/ui/src/tokens/index.ts", import.meta.url)
);

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  staticDirs: [
    "../public",
    { from: "../../packages/ui/assets", to: "/assets" },
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias as Record<string, string>),
      "@felix/ui/tokens": tokensAlias,
    };
    return viteConfig;
  },
};

export default config;
