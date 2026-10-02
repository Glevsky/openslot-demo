// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import cloudflare from "@astrojs/cloudflare";

const local = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  site: "https://demo.glevsky.com",
  trailingSlash: "never",
  output: "server",
  outDir: "./dist-preview",
  session: false,

  build: {
    format: "file",
  },

  adapter: cloudflare({
    configPath: "./wrangler.preview.jsonc",
    imageService: "passthrough",
  }),

  integrations: [
    {
      name: "openslot-preview",
      hooks: {
        "astro:config:setup": ({ addMiddleware }) => {
          addMiddleware({ entrypoint: local("./src/preview/middleware.ts"), order: "pre" });
        },
      },
    },
  ],

  vite: {
    resolve: {
      alias: {
        "openslot:client": local("./src/preview/client.ts"),
        "openslot:overlay": local("./src/preview/Overlay.astro"),
      },
    },
  },
});
