import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@layer-ui/button": path.resolve(__dirname, "../packages/ui/button/src"),
    },
  },
});
