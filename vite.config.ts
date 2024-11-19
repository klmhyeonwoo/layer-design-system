import { defineConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
export default defineConfig({
  build: {
    sourcemap: true,
    target: "es2022",
    minify: "terser",
    rollupOptions: {
      external: [/@layer-lib\/.+/, /@layer-ui\/.+/],
      treeshake: true,
    },
  },
});
