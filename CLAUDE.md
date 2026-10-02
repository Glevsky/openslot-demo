# Openslot demo site — project rules

## What this is

A demo marketing site for an invented scheduling product. Every fact on it is
fiction, and `.claude/brand.md` is the only source of those facts. Read that
file before writing a single line of copy. Never invent a number, a customer,
a person or a price that is not in it. If something is missing, add it there
first, then use it.

Never name a real company, product, person or website anywhere on the site.
Never link off the site.

## Content lives in Sanity

The site reads Sanity at build time. Do not add a second source of truth.

- Schema: `studio/schemaTypes/`. Change it there, never in the dataset.
- The Studio is its own package in `studio/`, hosted by Sanity at
  https://openslot.sanity.studio. The site never installs it, which keeps the
  build light. After a schema or Studio change run `npm run deploy:studio`.
  `demo.glevsky.com/admin` redirects there through `public/_redirects`.
- Queries: `src/lib/content.ts`. Every page goes through it, no page calls
  `sanityClient` directly.
- `seed/` is the original markdown, kept for re-seeding. It is not read at
  build time and is not the source of truth. Do not edit it to change the site.

A resource's hub comes from its `type` through `src/lib/taxonomy.ts`. Never
hardcode `/resources/guides/...` anywhere; call `resourceHref`.

## Publishing

Two branches, two sites. Cloudflare Workers Builds builds both from GitHub on
every push.

| Branch | Worker | Address | What it shows |
|---|---|---|---|
| `staging` | `openslot-preview` | https://demo-staging.glevsky.com | New code plus Sanity drafts, behind Cloudflare Access |
| `main` | `openslot` | https://demo.glevsky.com | Static build, published content only |

- Every change lands on `staging` first. Never commit to `main`; it is
  protected against direct pushes.
- Release: open a pull request from `staging` into `main`, merge it only after
  the client approves what they saw on staging.
- Publishing a document in Sanity fires a webhook that rebuilds `main`.
  Staging needs no rebuild for content: it reads Sanity on every request.
- Page copy lives in code under `src/pages`. Sanity holds the collections only.
- One Astro config builds both sites. `npm run build:preview` sets
  `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true`, which switches on server
  rendering, drafts, click-to-edit and the Access check in `src/middleware.ts`.
  Without the flag the build is static and none of that ships.
- Rollback: Cloudflare dashboard, Workers, `openslot`, Deployments, Rollback
  for an instant revert. Then `git revert` on `staging` and release again so
  the code matches what is live.
- `npm run deploy` and `npm run deploy:preview` are a manual fallback, not the
  normal path.

### What the user sees after a change

1. Commit to `staging` and push. Wait for the `openslot-preview` build to
   finish (about a minute). Reply with the staging link to the exact page that
   changed, for example `https://demo-staging.glevsky.com/pricing`, and one
   line on what changed.
2. Nothing goes to `main` until the user says to ship it ("катим", "ship it",
   "publish", "на прод"). Then open the pull request from `staging` into
   `main`, merge it, wait for the `openslot` build (about two minutes), and
   reply with the live link to the same page.
3. If a build fails, say so with the error and do not hand over a link.

## Network

Nothing is pulled from the internet at runtime. Fonts ship from `public/fonts`,
subset to Latin. No icon packs, no CDN links. New packages get announced before
they are installed.

## Type and colour

Two families, and they do different jobs. **Instrument Serif** is the display
face: `h1`, `h2`, `h3`, the `heading-display/xlarge/large/mlarge` utilities,
stat values, prices, pull quotes and the wordmark. It has one weight, so never
ask it for bold. **Schibsted Grotesk** carries everything else, including
`h4`-`h6` and every small heading, because a high-contrast serif falls apart
below about 20px.

The palette is pine, sage and clay: `--color-ink` is a near-black with a green
cast, `--color-canvas` a pale sage, `--color-accent` a warm clay that reads on
both. Do not introduce a fourth hue, and never use the accent as small text on
anything but paper or canvas.

## JavaScript

No JS by default. Where it exists it is progressive: the filter grid, the
mobile menu, the forms and the table of contents all work as plain HTML with
it switched off. If a task needs new JS, say so and why before writing it.

## Animation

**The standard is `ease-out` at 180ms. Never write a duration or an easing by
hand.**

- State changes use `var(--transition-interactive)`. If a property is missing
  from that token, add it to the token in `tokens.css`. A hand-written
  `0.2s ease` on an element is the bug this rule exists to stop.
- Movement animates `transform` and `opacity` only.
- A genuinely complex animation may have its own curve. That is the exception:
  say so, and keep it local to the component.
- Honour `prefers-reduced-motion: reduce`.

## CSS rules

- No `clamp()`, no `vw` units, no percentage padding.
- Spacing, type sizes and colours come from `src/styles/tokens.css`. A new
  shared value joins the scale first, after discussion.
- Component-local one-offs are fine when the design calls for them, and still
  go in `rem`, never `px`.
- Desktop-first. Breakpoints are `max-width: 991px`, `767px`, `479px`.
- Responsive type and section padding switch through token overrides in
  `tokens.css`, not per-component media queries.

## Cascade layers

```
@layer reset, tokens, base, layout, components, utilities;
```

Component styles are scoped inside `.astro` files. Never raise specificity to
win a fight, use the layer order.

## NEVER USE BLEND MODES

`mix-blend-mode` and `background-blend-mode` are banned. They render
differently across browsers and force extra compositing layers. There is no
case here where one is the right answer.

## Sections

Sections are numbered, never topical. `Layout01`, `Layout02`, in the order
built. A section showing metrics is not `Metrics01`, because the name has to
survive a content rewrite. Descendants repeat the prefix:
`layout05_component`, `layout05_item`. Content words never appear in a class
name.

The wrapper, typed out fresh each time and never copied from another file:

```astro
<section class="section_layoutNN">
  <div class="padding-global padding-section-large">
    <div class="container-large">
      <div class="layoutNN_component">...</div>
    </div>
  </div>
</section>
```

**Before building a section, read `.claude/sections/INDEX.md`.** A section that
already exists is reused with different props, never rebuilt under a new
number. When a section is added or restructured, put its render in
`.claude/sections/` and add its row to the index in the same commit.

## No class without a job

A class earns its place only if it changes something not already inherited.
`body` sets the body type, `h1`–`h6` carry their own sizes from `base.css`, and
colour is inherited from the section component. A paragraph that is body text
at 70 percent needs `class="text-opacity-70"` and nothing else.

## Visual effects stay local

Never promote a card treatment, shadow stack or glow into a shared class.
Every section's cards look different, and a shared class silently rewrites the
other sections using it. Duplication is correct here; coupling is the bug.

Interactive elements are the exception. Buttons, pills and fields live in
`src/components/ui/` as real components with variants. A second section needing
the same control adds a variant, never a copy.

## Semantics and images

- Tags carry typography only. Colour, margin, padding and borders come from
  classes in the markup.
- One `<h1>` per page, no skipped heading levels.
- `<time datetime="">` for dates, `<blockquote>` with `<cite>` for quotes,
  `<button>` for actions, `<a>` for navigation.
- Every image carries `loading`, an explicit `width` and an explicit `height`.
  `loading="lazy"` is the default; the one above-the-fold image per page gets
  `loading="eager"`, `fetchpriority="high"` and a preload through BaseLayout's
  `preloadImage` prop.
- Decorative images get `alt=""` deliberately. Alt text is never invented.

## Verification

`.claude/tools/` holds headless-Chrome helpers driven over CDP. Use them
instead of the Browser pane, which returns blank frames often enough to waste
a round.

```bash
node .claude/tools/sect.mjs "http://localhost:4321/pricing" ".section_layout10" out.png 1440
node .claude/tools/errs.mjs "http://localhost:4321/blog"
node .claude/tools/net.mjs  "http://localhost:4321/blog"
```

`sect` (one section), `shot` (full page), `zoomsel` (one element scaled up),
`probe` (run an expression, print JSON), `errs` (console errors), `net`
(failed requests). Check 1440, 991, 767 and 390 before reporting a section
done. Never ask the user to check something you could check.

## Code style

No comments in any delivered code.
