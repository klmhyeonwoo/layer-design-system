import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@layer-ui": path.resolve(__dirname, "../packages/ui"),
    },
  },
  build: {
    sourcemap: true,
    target: "es2022",
  },
});
