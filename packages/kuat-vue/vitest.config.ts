import { defineConfig, mergeConfig } from "vitest/config";
import { kuatVueVitestViteConfig } from "./vite.shared";

export default mergeConfig(
  kuatVueVitestViteConfig(),
  defineConfig({
    test: {
      environment: "jsdom",
      include: ["src/**/*.test.{ts,vue}", "src/**/*.spec.{ts,vue}"],
      setupFiles: ["./src/test/setup.ts"],
      passWithNoTests: true,
    },
  }),
);
