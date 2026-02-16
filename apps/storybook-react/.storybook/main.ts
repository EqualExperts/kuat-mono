import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

// Storybook may load this config as CJS where import.meta is unavailable
const configDir =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath((import.meta as { url?: string }).url ?? "file://" + process.cwd() + "/.storybook"));

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    const repoRoot = path.resolve(configDir, "../../..");
    const kuatReactSrc = path.join(repoRoot, "packages/kuat-react/src");
    const kuatReactIndex = path.join(kuatReactSrc, "index.ts");
    const kuatReactStyles = path.join(kuatReactSrc, "styles.css");

    const existingAliases = Array.isArray(config.resolve?.alias)
      ? config.resolve.alias
      : config.resolve?.alias
        ? Object.entries(config.resolve.alias).map(([find, replacement]) => ({ find, replacement: String(replacement) }))
        : [];

    return {
      ...config,
      plugins: [...(config.plugins ?? []), tailwindcss()],
      resolve: {
        ...config.resolve,
        alias: [
          ...existingAliases,
          { find: "@equal-experts/kuat-react/styles", replacement: kuatReactStyles },
          { find: "@equal-experts/kuat-react", replacement: kuatReactIndex },
          { find: "@", replacement: kuatReactSrc },
        ],
      },
    };
  },
};

export default config;

