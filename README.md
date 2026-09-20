# Openslot

A demo marketing site for an invented scheduling product, built to show how a
content-heavy site is put together: Astro for the pages, Sanity for the
content, and an editing Studio served from the site itself.

Everything on the site is fiction. Openslot is not a real company, and none of
the customers, people or numbers exist.

## Run it

```bash
npm ci
npm run dev
```

The site runs on http://localhost:4321 and the Studio on
http://localhost:4321/admin. `npm run build` writes `dist/`.

Node 22.12 or newer.

## How content works

Sanity is the source of truth. The site reads it at build time over GROQ, so
the output is plain static files with no runtime calls.

| Piece | Where |
| --- | --- |
| Schema | `src/sanity/schemaTypes/` |
| Studio config and navigation | `sanity.config.ts`, `src/sanity/structure.ts` |
| Queries | `src/lib/content.ts` |
| Rich text rendering | `src/components/ui/Prose.astro` |

Five document types: `author`, `blogPost`, `resource`, `customerStory` and
`legalPage`. Posts and resources reference an author rather than repeating a
name and bio, so one edit updates every byline.

A resource's `type` decides which hub it appears under. Change it in the
Studio and the page moves from `/resources/guides/...` to
`/resources/webinars/...` on the next build. The mapping lives in
`src/lib/taxonomy.ts`.

### Seeding

`seed/` holds the original markdown the dataset was built from. It is not read
at build time. To rebuild the dataset from scratch:

```bash
SANITY_WRITE_TOKEN=<an editor token> npm run import
```

The script converts markdown to Portable Text, uploads cover art as assets,
and matches existing documents by slug so it can be run more than once.

## Conventions

`CLAUDE.md` is the rulebook: tokens, naming, CSS discipline and what may be
pulled in. Read it before changing anything.

Sections are numbered, never named after their content, and each has a render
in `.claude/sections/`. Check `.claude/sections/INDEX.md` before building a new
one, because the section you need probably exists.

## Checking your work

`.claude/tools/` drives headless Chrome over CDP. Nothing to install.

```bash
node .claude/tools/shot.mjs "http://localhost:4321/" out.png 1440
node .claude/tools/sect.mjs "http://localhost:4321/pricing" ".section_layout10" out.png 1440
node .claude/tools/errs.mjs "http://localhost:4321/" "http://localhost:4321/blog"
node .claude/tools/net.mjs  "http://localhost:4321/"
```

## Deploys

Cloudflare Pages, from `dist/`. The Studio needs the site's origin registered
as a CORS origin on the Sanity project before it will load.
