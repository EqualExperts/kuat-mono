import { createRequire } from "node:module";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...(process.env.VITEST
      ? []
      : [
          dts({
            include: ["src/**/*"],
            exclude: ["src/**/*.test.ts", "src/**/*.test.tsx"],
          }),
        ]),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      // @tailwindcss/vite uses enhanced-resolve; explicit targets avoid export-map gaps during build.
      "@equal-experts/kuat-core/variables.css": require.resolve("@equal-experts/kuat-core/variables.css"),
      "@equal-experts/kuat-core/button-variables.css": require.resolve(
        "@equal-experts/kuat-core/button-variables.css",
      ),
    },
  },
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
        "button-group": resolve(__dirname, "src/button-group.ts"),
        "kuat-radial-progress": resolve(__dirname, "src/kuat-radial-progress.ts"),
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
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      maxParallelFileOps: 6,
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@radix-ui\/react-/,
        "lucide-react",
        "sonner",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
    cssCodeSplit: false,
    cssMinify: true,
  },
});

