import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      "@layer-ui/button": path.resolve(__dirname, "../packages/ui/button/src"),
      "@layer-ui/tabs": path.resolve(__dirname, "../packages/ui/tabs/src"),
      "@layer-lib/react-context": path.resolve(__dirname, "../packages/lib/react-context/src"),
    },
  },
  build: {
    sourcemap: true,
    target: "es2022",
  },
});
