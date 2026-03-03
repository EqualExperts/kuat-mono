import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      include: ["src/**/*.test.{ts,vue}", "src/**/*.spec.{ts,vue}"],
      setupFiles: ["./src/test/setup.ts"],
      passWithNoTests: true,
    },
  })
);
