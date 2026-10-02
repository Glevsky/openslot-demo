import { sanityClient } from "sanity:client";
import { getSecret } from "astro:env/server";

const EDITABLE = new Set([
  "title",
  "summary",
  "excerpt",
  "text",
  "name",
  "role",
  "bio",
  "meta",
  "cta",
  "label",
  "value",
  "highlights",
  "duration",
  "status",
  "eyebrow",
  "heading",
  "saving",
  "yearly",
  "monthly",
  "unit",
  "features",
  "note",
  "faqHeading",
  "question",
  "answer",
]);

export const preview = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";

export const client = preview
  ? sanityClient.withConfig({
      token: getSecret("SANITY_API_READ_TOKEN"),
      perspective: "drafts",
      stega: {
        enabled: true,
        filter: (props) => {
          const field = props.sourcePath.findLast((segment) => typeof segment === "string");
          return typeof field === "string" && EDITABLE.has(field) && props.filterDefault(props);
        },
      },
    })
  : sanityClient;
