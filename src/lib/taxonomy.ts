export const RESOURCE_HUBS = [
  {
    type: "Webinar",
    path: "webinars",
    title: "Webinars",
    plural: "webinars",
    description:
      "Recorded sessions and live workshops with our team and the people who run scheduling every day.",
  },
  {
    type: "Ebook",
    path: "guides",
    title: "Guides and ebooks",
    plural: "guides",
    description:
      "Long-form guides you can hand to a team, written from what we see across 38,000 workspaces.",
  },
  {
    type: "Report",
    path: "reports",
    title: "Reports",
    plural: "reports",
    description:
      "Benchmarks and research drawn from the bookings that run through Openslot.",
  },
  {
    type: "Template",
    path: "templates",
    title: "Templates",
    plural: "templates",
    description:
      "Availability rules, interview loops and agendas you can copy into your own workspace.",
  },
  {
    type: "Course",
    path: "courses",
    title: "Courses",
    plural: "courses",
    description:
      "Short video courses that take you from a first booking page to a workspace a whole team can use.",
  },
] as const;

export type ResourceType = (typeof RESOURCE_HUBS)[number]["type"];

const BY_TYPE = new Map(RESOURCE_HUBS.map((hub) => [hub.type, hub]));

export const hubFor = (type: string) => {
  const hub = BY_TYPE.get(type as ResourceType);
  if (!hub) throw new Error(`No resource hub is defined for type "${type}".`);
  return hub;
};

export const resourceHref = (type: string, slug: string) =>
  `/resources/${hubFor(type).path}/${slug}`;

export const blogHref = (slug: string) => `/blog/${slug}`;

export const customerHref = (slug: string) => `/customers/${slug}`;
