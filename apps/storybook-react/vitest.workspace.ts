import { defineWorkspace } from "vitest/config";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";

export default defineWorkspace([
  {
    optimizeDeps: {
      include: ["@storybook/react", "react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
    plugins: [
      storybookTest({
        configDir: ".storybook",
        storybookScript: "pnpm exec storybook dev -p 6006 --ci",
      }),
    ],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        provider: "playwright",
        headless: true,
        instances: [{ browser: "chromium" }],
      },
      setupFiles: [".storybook/vitest.setup.ts"],
    },
  },
]);
