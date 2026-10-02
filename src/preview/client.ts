import { sanityClient } from "../lib/sanity";
import { env } from "cloudflare:workers";
import { API_VERSION, STUDIO_URL } from "./constants";

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
]);

export const client = sanityClient.withConfig({
  apiVersion: API_VERSION,
  token: env.SANITY_API_READ_TOKEN,
  perspective: "drafts",
  useCdn: false,
  stega: {
    enabled: true,
    studioUrl: STUDIO_URL,
    filter: (props) => {
      const field = props.sourcePath.findLast((segment) => typeof segment === "string");
      return typeof field === "string" && EDITABLE.has(field) && props.filterDefault(props);
    },
  },
});
