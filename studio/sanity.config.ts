import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { PREVIEW_URL, resolve } from "./presentation";

export default defineConfig({
  name: "openslot",
  title: "Openslot",
  projectId: "1zmf457v",
  dataset: "production",
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: { initial: PREVIEW_URL },
      allowOrigins: [PREVIEW_URL],
    }),
    visionTool({ defaultApiVersion: "2026-02-01" }),
  ],
  schema: { types: schemaTypes },
});
