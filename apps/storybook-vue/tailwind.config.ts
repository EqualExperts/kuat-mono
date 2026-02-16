import type { Config } from "tailwindcss";
import kuatPreset from "@equal-experts/kuat-core";

/**
 * Tailwind config for Storybook (Vue).
 * Ensures Tailwind is applied to stories and to @equal-experts/kuat-vue components.
 */
const config: Config = {
  presets: [kuatPreset],
  content: [
    "./stories/**/*.{js,ts,jsx,tsx,vue,mdx}",
    "../../packages/kuat-vue/src/**/*.{js,ts,jsx,tsx,vue}",
  ],
};

export default config;
