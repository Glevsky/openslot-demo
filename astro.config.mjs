// @ts-check
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

const preview = process.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";

export default defineConfig({
  site: "https://demo.glevsky.com",
  trailingSlash: "never",

  build: {
    format: "file",
  },

  ...(preview && {
    output: "server",
    outDir: "./dist-preview",
    session: false,
    adapter: cloudflare({
      configPath: "./wrangler.preview.jsonc",
      imageService: "passthrough",
    }),
  }),

  integrations: [
    sanity({
      projectId: "1zmf457v",
      dataset: "production",
      apiVersion: "2026-02-01",
      useCdn: false,
      stega: {
        studioUrl: "https://openslot.sanity.studio",
      },
    }),
    react(),
  ],
});
