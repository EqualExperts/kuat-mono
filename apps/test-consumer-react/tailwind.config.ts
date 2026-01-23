import type { Config } from "tailwindcss";
import kuatPreset from "@equal-experts/kuat-core";

export default {
  presets: [kuatPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@equal-experts/kuat-react/**/*.{js,ts,jsx,tsx}",
  ],
} satisfies Config;
