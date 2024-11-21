import path from "path";
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
  resolve: {
    alias: {
      // lib
      "@layer-lib/react-use-callback-ref": path.resolve(__dirname, "packages/lib/use-callback-ref/src"),
      "@layer-lib/react-use-mounted": path.resolve(__dirname, "packages/lib/use-mounted/src"),
      "@layer-lib/react-context": path.resolve(__dirname, "packages/lib/react-context/src"),
      "@layer-lib/react-use-composed-ref": path.resolve(__dirname, "packages/lib/use-composed-ref/src"),
      "@layer-lib/react-use-browser-layout-effect": path.resolve(__dirname, "packages/lib/use-browser-layout-effect/src"),
      "@layer-lib/react-use-escape-key-down": path.resolve(__dirname, "packages/lib/use-escape-key-down/src"),

      // ui
      "@layer-ui/button": path.resolve(__dirname, "packages/ui/button/src"),
      "@layer-ui/portal": path.resolve(__dirname, "packages/ui/portal/src"),
      "@layer-ui/modal": path.resolve(__dirname, "packages/ui/modal/src"),
      "@layer-ui/presence": path.resolve(__dirname, "packages/ui/presence/src"),
    },
  },
});
