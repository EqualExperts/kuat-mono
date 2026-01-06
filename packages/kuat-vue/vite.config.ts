import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      include: ["src/**/*"],
      exclude: ["src/**/*.test.ts", "src/**/*.test.vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        button: resolve(__dirname, "src/button.ts"),
        accordion: resolve(__dirname, "src/accordion.ts"),
        "alert-dialog": resolve(__dirname, "src/alert-dialog.ts"),
        badge: resolve(__dirname, "src/badge.ts"),
        "button-group": resolve(__dirname, "src/button-group.ts"),
      },
      formats: ["es"],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        "vue",
        "radix-vue",
        "reka-ui",
        "lucide-vue-next",
      ],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    cssCodeSplit: false,
    cssMinify: true,
  },
});

