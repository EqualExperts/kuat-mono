import { createRequire } from "node:module";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import type { UserConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export function kuatVueResolveConfig(): NonNullable<UserConfig["resolve"]> {
  return {
    alias: {
      "@": pathResolve(__dirname, "./src"),
      "@equal-experts/kuat-core/variables.css": require.resolve("@equal-experts/kuat-core/variables.css"),
      "@equal-experts/kuat-core/button-variables.css": require.resolve(
        "@equal-experts/kuat-core/button-variables.css",
      ),
    },
    dedupe: ["vue"],
  };
}

/** `vite build` / dev — Tailwind is required for component CSS (`@apply`, `@reference`). */
export function kuatVueLibraryViteConfig(): UserConfig {
  return {
    plugins: [vue(), tailwindcss()],
    resolve: kuatVueResolveConfig(),
  };
}

/**
 * Vitest: same resolution as the library, but omit `@tailwindcss/vite` so dependency scanning
 * does not exhaust the Node heap (Tailwind still runs for production builds).
 */
export function kuatVueVitestViteConfig(): UserConfig {
  return {
    plugins: [vue()],
    resolve: kuatVueResolveConfig(),
  };
}
