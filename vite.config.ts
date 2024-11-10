import { defineConfig } from "vite";
export default defineConfig({
  build: {
    sourcemap: true,
    target: "es2022",
    minify: "esbuild",
  },
  resolve: {
    preserveSymlinks: true,
  },
});
