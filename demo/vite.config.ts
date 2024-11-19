import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      "@layer-ui": path.resolve(__dirname, "../packages/ui"),
      "@layer-lib": path.resolve(__dirname, "../packages/lib"),
    },
  },
  build: {
    sourcemap: true,
    target: "es2022",
  },
});
