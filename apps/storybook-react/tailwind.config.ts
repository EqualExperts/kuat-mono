import type { Config } from "tailwindcss";
import kuatPreset from "@equal-experts/kuat-core";

/**
 * Tailwind config for Storybook (React).
 * Ensures Tailwind is applied to stories and to @equal-experts/kuat-react components.
 */
const config: Config = {
  presets: [kuatPreset],
  content: [
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/kuat-react/src/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
