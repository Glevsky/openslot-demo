import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";
import { blogHref, customerHref, resourceHref } from "../src/lib/taxonomy";

export const PREVIEW_URL = "https://demo-staging.glevsky.com";

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: [
    { route: "/blog/:slug", filter: `_type == "blogPost" && slug.current == $slug` },
    { route: "/resources/:hub/:slug", filter: `_type == "resource" && slug.current == $slug` },
    { route: "/customers/:slug", filter: `_type == "customerStory" && slug.current == $slug` },
    { route: "/pricing", filter: `_type == "pricingPage"` },
    { route: "/privacy", filter: `_type == "legalPage" && slug.current == "privacy"` },
    { route: "/terms", filter: `_type == "legalPage" && slug.current == "terms"` },
  ],
  locations: {
    blogPost: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              { title: doc.title || "Untitled", href: blogHref(doc.slug) },
              { title: "Blog", href: "/blog" },
            ]
          : [],
      }),
    }),
    resource: defineLocations({
      select: { title: "title", slug: "slug.current", type: "type" },
      resolve: (doc) => ({
        locations:
          doc?.slug && doc?.type
            ? [
                { title: doc.title || "Untitled", href: resourceHref(doc.type, doc.slug) },
                { title: "Resources", href: "/resources" },
              ]
            : [],
      }),
    }),
    customerStory: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              { title: doc.title || "Untitled", href: customerHref(doc.slug) },
              { title: "Customer stories", href: "/customers" },
            ]
          : [],
      }),
    }),
    pricingPage: defineLocations({
      select: { title: "title" },
      resolve: () => ({ locations: [{ title: "Pricing", href: "/pricing" }] }),
    }),
    legalPage: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: doc?.slug ? [{ title: doc.title || "Untitled", href: `/${doc.slug}` }] : [],
      }),
    }),
  },
};
