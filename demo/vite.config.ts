import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: [
      {
        find: /@layer-ui\/(.*)/,
        replacement: path.resolve(__dirname, "../packages/ui") + "/$1/src/index.ts",
      },
      {
        find: /@layer-core\/(.*)/,
        replacement: path.resolve(__dirname, "../packages/core") + "/$1/src/index.ts",
      },
      {
        find: /@layer-lib\/(.*)/,
        replacement: path.resolve(__dirname, "../packages/lib") + "/$1/src/index.ts",
      },
      {
        find: /@layer-themes\/(.*)/,
        replacement: path.resolve(__dirname, "../packages/themes") + "/$1/src/index.ts",
      },
      {
        find: /@layer-utils\/(.*)/,
        replacement: path.resolve(__dirname, "../packages/utils") + "/$1/src/index.ts",
      },
    ],
  },
  build: {
    sourcemap: true,
    target: "es2022",
  },
});
