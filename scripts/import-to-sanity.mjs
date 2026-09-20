import { readFileSync, readdirSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createClient } from "@sanity/client";
import { markdownToPortableText } from "@portabletext/markdown";
import { load as parseYaml } from "js-yaml";

const PROJECT_ID = "1zmf457v";
const DATASET = "production";

const tokenFromCli = () => {
  const path = join(homedir(), ".config", "sanity", "config.json");
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8")).authToken ?? null;
};

const token = process.env.SANITY_WRITE_TOKEN ?? tokenFromCli();
if (!token) {
  console.error("No Sanity token. Run `npx sanity login` or set SANITY_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

const readMarkdown = (path) => {
  const raw = readFileSync(path, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`No frontmatter in ${path}`);
  return { data: parseYaml(match[1]) ?? {}, body: match[2].trim() };
};

const listDir = (dir) =>
  readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({ file, ...readMarkdown(join(dir, file)) }));

const slug = (current) => ({ _type: "slug", current });

const toDate = (value) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : String(value);

const body = (markdown) => (markdown ? markdownToPortableText(markdown) : []);

const assetCache = new Map();

const uploadCover = async (relative, fromDir) => {
  if (!relative) return undefined;
  const path = join(fromDir, relative);
  if (assetCache.has(path)) return assetCache.get(path);

  const filename = path.split("/").pop();
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename }
  );

  let id = existing;
  if (!id) {
    const asset = await client.assets.upload("image", readFileSync(path), {
      filename,
      contentType: "image/svg+xml",
    });
    id = asset._id;
  }

  const ref = { _type: "image", asset: { _type: "reference", _ref: id } };
  assetCache.set(path, ref);
  return ref;
};

const upsert = async (type, slugValue, fields) => {
  const existing = await client.fetch(
    `*[_type == $type && slug.current == $slug][0]._id`,
    { type, slug: slugValue }
  );

  const doc = { _type: type, slug: slug(slugValue), ...fields };

  if (existing) {
    await client.createOrReplace({ _id: existing, ...doc });
    return existing;
  }

  const created = await client.create(doc);
  return created._id;
};

const run = async () => {
  const authorIds = new Map();

  for (const entry of listDir("seed/authors")) {
    const id = await upsert("author", entry.data.id, {
      name: entry.data.name,
      role: entry.data.role,
      bio: entry.data.bio,
    });
    authorIds.set(entry.data.id, id);
  }
  console.log(`authors: ${authorIds.size}`);

  const ref = (key) => {
    const id = authorIds.get(key);
    if (!id) throw new Error(`No author document for "${key}"`);
    return { _type: "reference", _ref: id };
  };

  let count = 0;
  for (const entry of listDir("seed/blog")) {
    await upsert("blogPost", entry.data.slug, {
      title: entry.data.title,
      category: entry.data.category,
      author: ref(entry.data.author),
      date: toDate(entry.data.date),
      readTime: entry.data.readTime,
      draft: entry.data.draft ?? false,
      summary: entry.data.summary,
      excerpt: entry.data.excerpt,
      cover: await uploadCover(entry.data.cover, "seed/blog"),
      body: body(entry.body),
    });
    count += 1;
  }
  console.log(`blog posts: ${count}`);

  count = 0;
  for (const entry of listDir("seed/resources")) {
    const { data } = entry;
    await upsert("resource", data.slug, {
      title: data.title,
      type: data.type,
      topics: data.topics,
      level: data.level,
      author: ref(data.author),
      date: toDate(data.date),
      meta: data.meta,
      featured: data.featured ?? false,
      gated: data.gated ?? false,
      cta: data.cta,
      highlights: data.highlights,
      summary: data.summary,
      excerpt: data.excerpt,
      cover: await uploadCover(data.cover, "seed/resources"),
      body: body(entry.body),
      ...(data.duration ? { duration: data.duration } : {}),
      ...(data.status ? { status: data.status } : {}),
      ...(data.speakers ? { speakers: data.speakers.map((s) => ({ _type: "speaker", ...s })) } : {}),
      ...(data.lessons ? { lessons: data.lessons.map((l) => ({ _type: "lesson", ...l })) } : {}),
    });
    count += 1;
  }
  console.log(`resources: ${count}`);

  count = 0;
  for (const entry of listDir("seed/customers")) {
    const { data } = entry;
    await upsert("customerStory", data.slug, {
      name: data.name,
      title: data.title,
      industry: data.industry,
      plan: data.plan,
      products: data.products,
      order: data.order,
      stats: data.stats.map((stat) => ({ _type: "stat", ...stat })),
      quote: data.quote,
      summary: data.summary,
      excerpt: data.excerpt,
      body: body(entry.body),
    });
    count += 1;
  }
  console.log(`customer stories: ${count}`);

  count = 0;
  for (const entry of listDir("seed/legal")) {
    await upsert("legalPage", entry.data.slug, {
      title: entry.data.title,
      updated: toDate(entry.data.updated),
      summary: entry.data.summary,
      body: body(entry.body),
    });
    count += 1;
  }
  console.log(`legal pages: ${count}`);
};

run().then(
  () => console.log("done"),
  (error) => {
    console.error(error.message);
    process.exit(1);
  }
);
