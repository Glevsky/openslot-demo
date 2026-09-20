import { sanityClient } from "sanity:client";
import { headingId } from "./text";

export interface AuthorRef {
  name: string;
  role: string;
  bio?: string;
  slug: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: number;
  summary: string;
  excerpt: string;
  cover?: unknown;
  author: AuthorRef;
  body?: unknown[];
}

export interface Resource {
  slug: string;
  title: string;
  type: string;
  topics: string[];
  level: string;
  date: string;
  meta: string;
  cta: string;
  gated: boolean;
  featured: boolean;
  summary: string;
  excerpt: string;
  highlights: string[];
  cover?: unknown;
  duration?: string;
  status?: string;
  speakers?: { name: string; role: string }[];
  lessons?: { title: string; length: string }[];
  author: AuthorRef;
  body?: unknown[];
}

export interface CustomerStory {
  slug: string;
  name: string;
  title: string;
  industry: string;
  plan: string;
  order: number;
  products: string[];
  stats: { value: string; label: string }[];
  quote: { text: string; name: string; role: string };
  summary: string;
  excerpt: string;
  body?: unknown[];
}

export interface LegalPage {
  slug: string;
  title: string;
  updated: string;
  summary: string;
  body?: unknown[];
}

const AUTHOR = `author->{name, role, bio, "slug": slug.current}`;

const POST_CARD = `{
  "slug": slug.current, title, category, date, readTime, summary, excerpt, cover,
  ${AUTHOR}
}`;

const RESOURCE_CARD = `{
  "slug": slug.current, title, type, topics, level, date, meta, cta, gated,
  featured, summary, excerpt, highlights, cover, duration, status, speakers,
  lessons, ${AUTHOR}
}`;

const STORY_CARD = `{
  "slug": slug.current, name, title, industry, plan, order, products, stats,
  quote, summary, excerpt
}`;

export const listPosts = (): Promise<BlogPost[]> =>
  sanityClient.fetch(
    `*[_type == "blogPost" && draft != true] | order(date desc) ${POST_CARD}`
  );

export const getPost = (slug: string): Promise<BlogPost | null> =>
  sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      "slug": slug.current, title, category, date, readTime, summary, excerpt,
      cover, body, ${AUTHOR}
    }`,
    { slug }
  );

export const listResources = (): Promise<Resource[]> =>
  sanityClient.fetch(
    `*[_type == "resource"] | order(date desc) ${RESOURCE_CARD}`
  );

export const getResource = (slug: string): Promise<Resource | null> =>
  sanityClient.fetch(
    `*[_type == "resource" && slug.current == $slug][0] {
      "slug": slug.current, title, type, topics, level, date, meta, cta, gated,
      featured, summary, excerpt, highlights, cover, duration, status, speakers,
      lessons, body, ${AUTHOR}
    }`,
    { slug }
  );

export const listCustomers = (): Promise<CustomerStory[]> =>
  sanityClient.fetch(
    `*[_type == "customerStory"] | order(order asc) ${STORY_CARD}`
  );

export const getCustomer = (slug: string): Promise<CustomerStory | null> =>
  sanityClient.fetch(
    `*[_type == "customerStory" && slug.current == $slug][0] {
      "slug": slug.current, name, title, industry, plan, order, products, stats,
      quote, summary, excerpt, body
    }`,
    { slug }
  );

export const getLegalPage = (slug: string): Promise<LegalPage | null> =>
  sanityClient.fetch(
    `*[_type == "legalPage" && slug.current == $slug][0] {
      "slug": slug.current, title, updated, summary, body
    }`,
    { slug }
  );

export const listAuthors = (): Promise<AuthorRef[]> =>
  sanityClient.fetch(
    `*[_type == "author"] | order(name asc) {name, role, bio, "slug": slug.current}`
  );

export const headings = (body: unknown[] | undefined) =>
  (body ?? [])
    .filter(
      (block): block is { _type: string; style: string; children: { text: string }[] } =>
        typeof block === "object" &&
        block !== null &&
        (block as { _type?: string })._type === "block" &&
        (block as { style?: string }).style === "h2"
    )
    .map((block) => {
      const text = (block.children ?? []).map((child) => child.text).join("");
      return { id: headingId(text), text };
    });

export const relatedPosts = (posts: BlogPost[], current: BlogPost, count = 3) =>
  [
    ...posts.filter((p) => p.slug !== current.slug && p.category === current.category),
    ...posts.filter((p) => p.slug !== current.slug && p.category !== current.category),
  ].slice(0, count);

export const relatedResources = (all: Resource[], current: Resource, count = 3) => {
  const shares = (item: Resource) =>
    item.topics.some((topic) => current.topics.includes(topic));

  return [
    ...all.filter((item) => item.slug !== current.slug && shares(item)),
    ...all.filter((item) => item.slug !== current.slug && !shares(item)),
  ].slice(0, count);
};

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

export const formatDateShort = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
