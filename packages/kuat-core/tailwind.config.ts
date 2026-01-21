import type { Config } from "tailwindcss";

/**
 * Kuat Design System - Tailwind CSS Preset
 *
 * This configuration provides the Equal Experts design tokens as Tailwind CSS
 * theme extensions. Use it as a preset in your tailwind.config.ts file.
 *
 * ## Usage as a Preset
 *
 * ```ts
 * // tailwind.config.ts
 * import kuatPreset from '@equal-experts/kuat-core';
 *
 * export default {
 *   presets: [kuatPreset],
 *   content: ['./src/**\/*.{html,js,ts,jsx,tsx,vue,svelte}'],
 * } satisfies Config;
 * ```
 *
 * ## Important: CSS Variables Required
 *
 * This preset references CSS variables defined in `variables.css`. You must
 * import the CSS variables in your application entry point:
 *
 * ```ts
 * import '@equal-experts/kuat-core/variables.css';
 * ```
 *
 * ## Available Design Tokens
 *
 * ### Semantic Colors
 * - `background` / `foreground` - Page background and text
 * - `primary` / `primary-foreground` - Primary actions (EE Blue)
 * - `secondary` / `secondary-foreground` - Secondary actions (Transform Teal)
 * - `muted` / `muted-foreground` - Muted/disabled states
 * - `accent` / `accent-foreground` - Accent highlights
 * - `destructive` / `destructive-foreground` - Destructive actions
 * - `card` / `card-foreground` - Card surfaces
 * - `popover` / `popover-foreground` - Popover surfaces
 *
 * ### Utility Colors
 * - `border` - Border color
 * - `input` - Input background
 * - `ring` - Focus ring color
 * - `chart-1` through `chart-5` - Chart/data visualization colors
 *
 * ### Border Radius
 * - `rounded-sm` - Small radius
 * - `rounded-md` - Medium radius
 * - `rounded-lg` - Large radius
 *
 * @see https://github.com/equalexperts/kuat-mono for full documentation
 */
const config: Config = {
  /**
   * Content paths are intentionally empty in the preset.
   * Consumers must specify their own content paths in their tailwind.config.
   */
  content: [],

  theme: {
    extend: {
      /**
       * Semantic Color Tokens
       *
       * These colors reference CSS custom properties defined in variables.css.
       * They automatically adapt to light/dark mode via the `.dark` class.
       *
       * Brand colors available via variables.css:
       * - EE Blue (#1795d4) - Primary brand color
       * - Tech Blue (#22567c) - Technical/professional contexts
       * - Transform Teal (#269c9e) - Transformation/growth themes
       * - Equal Ember (#f07c00) - Energy/action accents
       */
      colors: {
        /** Page background color */
        background: "hsl(var(--background))",
        /** Primary text color */
        foreground: "hsl(var(--foreground))",

        /** Card/surface colors */
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /** Popover/dropdown colors */
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        /** Primary action colors (EE Blue) */
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        /** Secondary action colors (Transform Teal) */
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        /** Muted/disabled state colors */
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        /** Accent/highlight colors */
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        /** Destructive/error action colors */
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        /** Border color for dividers and outlines */
        border: "hsl(var(--border))",

        /** Input field background color */
        input: "hsl(var(--input))",

        /** Focus ring color */
        ring: "hsl(var(--ring))",

        /** Chart/data visualization colors */
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },

      /**
       * Border Radius Scale
       *
       * Based on the --radius CSS variable (default: 0.3rem).
       * Use `rounded-lg` for interactive elements, `rounded-sm` for inputs.
       */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [],
} satisfies Config;

export default config;
