import type { Config } from 'tailwindcss';

/**
 * Kuat Design System Tailwind CSS Preset
 *
 * This preset provides the Equal Experts design tokens as Tailwind CSS theme extensions.
 * Use it as a preset in your tailwind.config.ts to get access to all design tokens.
 *
 * @example
 * ```ts
 * // tailwind.config.ts
 * import kuatPreset from '@equal-experts/kuat-core';
 *
 * export default {
 *   presets: [kuatPreset],
 *   content: ['./src/**\/*.{html,js,ts,jsx,tsx,vue,svelte}'],
 * };
 * ```
 *
 * @see https://github.com/equalexperts/kuat-mono
 */
declare const config: Config;

export default config;
