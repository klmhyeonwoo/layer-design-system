import { globSync } from "glob";
import * as vite from "vite";
import * as tsup from "tsup";
import dts from "vite-plugin-dts";

async function build(path) {
  const file = `${path}/src/index.ts`;
  const dist = `${path}/dist`;

  /**
   * @type {import("vite").InlineConfig}
   */
  const viteConfig = {
    build: {
      lib: {
        entry: file,
        formats: ["cjs", "es"],
        fileName: (format) => {
          return format === "es" ? "index.mjs" : "index.js";
        },
      },
      ssr: true,
      outDir: dist,
    },
    plugins: [
      dts({
        entryRoot: file,
        outDir: dist,
      }),
    ],
  };

  await vite.build(viteConfig);

  await tsup.build({
    entry: [file],
    format: ["cjs", "esm"],
    dts: { only: true },
    outDir: dist,
    silent: true,
    external: [/@layer-lib\/.+/, /@layer-ui\/.+/, /@layer-utils\/.+/],
  });

  console.log(`Built ${path}/dist with Vite`);
}

globSync("packages/*/*").forEach(build);
