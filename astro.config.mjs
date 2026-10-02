// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const local = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  site: "https://demo.glevsky.com",
  trailingSlash: "never",

  build: {
    format: "file",
  },

  vite: {
    resolve: {
      alias: {
        "openslot:client": local("./src/lib/client.ts"),
        "openslot:overlay": local("./src/lib/Overlay.astro"),
      },
    },
  },
});
