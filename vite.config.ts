import { defineConfig } from "vite";
export default defineConfig({
  build: {
    sourcemap: true,
    target: "es2022",
    minify: "terser",
    rollupOptions: {
      external: [/@layer-lib\/.+/, /@layer-ui\/.+/, /@layer-core\/.+/, /@layer-utils\/.+/],
      treeshake: true,
    },
  },
});
