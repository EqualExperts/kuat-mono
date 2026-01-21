import type { Config } from "tailwindcss";
import kuatPreset from "@equal-experts/kuat-core";

/**
 * Tailwind CSS configuration for @equal-experts/kuat-vue
 *
 * Uses the kuat-core preset for all design tokens (colors, fonts, border radius, etc.)
 * and adds package-specific extensions for Radix Vue component animations.
 */
const config: Config = {
  presets: [kuatPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      // Package-specific keyframes for Radix Vue accordion animations
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
