// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

const PUBLIC_SANITY_PROJECT_ID = env.PUBLIC_SANITY_PROJECT_ID || "1zmf457v";
const PUBLIC_SANITY_DATASET = env.PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  site: "https://demo.glevsky.com",
  trailingSlash: "never",

  build: {
    format: "file",
  },

  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: false,
      studioBasePath: "/admin",
    }),
    react(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !["/privacy", "/terms"].includes(pathname) && !pathname.startsWith("/admin");
      },
    }),
  ],
});
