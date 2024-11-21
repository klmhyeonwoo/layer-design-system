import react from "@vitejs/plugin-react";
import { mergeConfig, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,

  defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./setup.ts",
    },
  }),
);
