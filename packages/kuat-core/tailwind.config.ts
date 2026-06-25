import type { Config } from "tailwindcss";

/**
 * Kuat Design System - Tailwind CSS Preset (legacy)
 *
 * @deprecated Prefer the Tailwind v4 CSS-first setup. Import the tokens into
 * your Tailwind entry CSS so the `@theme` block in `variables.css` registers
 * the design-token utilities for you — no JS config required:
 *
 * ```css
 * @import "tailwindcss";
 * @import "@equal-experts/kuat-core/variables.css";
 * ```
 *
 * This JS preset predates the move to OKLCH color tokens. It is kept as the
 * package's default export for backward compatibility (e.g. consumers loading
 * it via Tailwind's `@config` directive). It now references the raw token
 * custom properties directly (`var(--primary)`) rather than wrapping them in
 * `hsl(...)`, which produced invalid colors against the current OKLCH tokens.
 * It will be removed in a future major release.
 *
 * See README "Usage Patterns" and `kuat-docs/DEPRECATIONS.md`.
 *
 * ## Important: CSS Variables Required
 *
 * This preset references CSS variables defined in `variables.css`. You must
 * import them in your application (via the CSS `@import` above, or
 * `import '@equal-experts/kuat-core/variables.css'` for the raw variables):
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
 * - `rounded-xs` - Extra small (2px, e.g. icon buttons)
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
       * Tokens resolve to OKLCH color values (see variables.css), so they are
       * referenced directly via `var(--token)` — do NOT wrap them in `hsl()`.
       *
       * Brand colors available via variables.css:
       * - EE Blue (#1795d4) - Primary brand color
       * - Tech Blue (#22567c) - Technical/professional contexts
       * - Transform Teal (#269c9e) - Transformation/growth themes
       * - Equal Ember (#f07c00) - Energy/action accents
       */
      colors: {
        /** Page background color */
        background: "var(--background)",
        /** Primary text color */
        foreground: "var(--foreground)",

        /** Card/surface colors */
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },

        /** Popover/dropdown colors */
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },

        /** Primary action colors (EE Blue) */
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },

        /** Secondary action colors (Transform Teal) */
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },

        /** Muted/disabled state colors */
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },

        /** Accent/highlight colors */
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },

        /** Destructive/error action colors */
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },

        /** Border color for dividers and outlines */
        border: "var(--border)",

        /** Input field background color */
        input: "var(--input)",

        /** Focus ring color */
        ring: "var(--ring)",

        /** Chart/data visualization colors */
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },

      /**
       * Border Radius Scale
       *
       * Based on the --radius CSS variable (default: 0.3rem).
       * Use `rounded-lg` for interactive elements, `rounded-sm` for inputs.
       * Use `rounded-xs` for compact icon buttons (e.g. carousel nav).
       */
      borderRadius: {
        xs: "var(--radius-xs)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [],
} satisfies Config;

export default config;
