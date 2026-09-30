// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

const local = (path) => fileURLToPath(new URL(path, import.meta.url));

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

const PUBLIC_SANITY_PROJECT_ID = env.PUBLIC_SANITY_PROJECT_ID || "1zmf457v";
const PUBLIC_SANITY_DATASET = env.PUBLIC_SANITY_DATASET || "production";

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
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: false,
    }),
    react(),
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
