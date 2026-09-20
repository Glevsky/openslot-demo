import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "openslot",
  title: "Openslot",
  projectId: "1zmf457v",
  dataset: "production",
  basePath: "/admin",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: "2026-02-01" })],
  schema: { types: schemaTypes },
});
