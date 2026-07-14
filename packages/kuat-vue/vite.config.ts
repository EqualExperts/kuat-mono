import { dirname, resolve } from "path";
import { fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vite";
import dts from "vite-plugin-dts";
import { kuatVueLibraryViteConfig } from "./vite.shared";

const __dirname = dirname(fileURLToPath(import.meta.url));
export default mergeConfig(
  kuatVueLibraryViteConfig(),
  defineConfig({
    plugins: [
      ...(process.env.VITEST
        ? []
        : [
            dts({
              include: ["src/**/*"],
              exclude: ["src/**/*.test.ts", "src/**/*.test.vue", "src/**/*.spec.ts", "src/**/*.spec.vue"],
            }),
          ]),
    ],
    build: {
      sourcemap: false,
      reportCompressedSize: false,
      lib: {
        entry: {
          index: resolve(__dirname, "src/index.ts"),
          button: resolve(__dirname, "src/button.ts"),
          accordion: resolve(__dirname, "src/accordion.ts"),
          "alert-dialog": resolve(__dirname, "src/alert-dialog.ts"),
          badge: resolve(__dirname, "src/badge.ts"),
          "status-badge": resolve(__dirname, "src/status-badge.ts"),
          tag: resolve(__dirname, "src/tag.ts"),
          "tag-group": resolve(__dirname, "src/tag-group.ts"),
          "counter-badge": resolve(__dirname, "src/counter-badge.ts"),
          "button-group": resolve(__dirname, "src/button-group.ts"),
          callout: resolve(__dirname, "src/callout.ts"),
          carousel: resolve(__dirname, "src/carousel.ts"),
          "kuat-carousel": resolve(__dirname, "src/kuat-carousel.ts"),
          textarea: resolve(__dirname, "src/textarea.ts"),
          input: resolve(__dirname, "src/input.ts"),
          field: resolve(__dirname, "src/field.ts"),
          select: resolve(__dirname, "src/select.ts"),
          checkbox: resolve(__dirname, "src/checkbox.ts"),
          radio: resolve(__dirname, "src/radio.ts"),
          switch: resolve(__dirname, "src/switch.ts"),
          sonner: resolve(__dirname, "src/sonner.ts"),
          toggle: resolve(__dirname, "src/toggle.ts"),
          "toggle-group": resolve(__dirname, "src/toggle-group.ts"),
          "icon-button": resolve(__dirname, "src/icon-button.ts"),
        },
        formats: ["es"],
        fileName: (_format, entryName) => `${entryName}.js`,
      },
      rollupOptions: {
        maxParallelFileOps: 6,
        external: ["vue", "radix-vue", "reka-ui", "lucide-vue-next", "vue-sonner"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
      cssCodeSplit: false,
      cssMinify: true,
    },
  }),
);
