# Verification tools

Headless-Chrome screenshot and measurement helpers. The Browser pane returns
blank frames often enough that these are the reliable path.

Chrome is driven over CDP; nothing is installed, no Playwright needed. The
scripts look for Chrome, Chromium or Edge in the usual places — set
`CHROME_PATH` if yours lives somewhere else.

They need the dev server up: `npm run dev`, or start it from the editor.

```bash
node .claude/tools/sect.mjs  "http://localhost:4321/about" ".section_layout128" out.png 1440
node .claude/tools/shot.mjs  "http://localhost:4321/about" full.png 1440
node .claude/tools/zoomsel.mjs "http://localhost:4321/about" ".timeline_item" zoom.png 20 6
node .claude/tools/probe.mjs "http://localhost:4321/about" "(()=>document.title)()" 1440
node .claude/tools/errs.mjs  "http://localhost:4321/about" "http://localhost:4321/insights"
```

- `sect` — one section by selector, at a given viewport width
- `shot` — the whole page, full height
- `zoomsel` — one element with padding, scaled up, for inspecting an effect
- `probe` — run an expression in the page and print the JSON result, at a given
  viewport width (default 1440)
- `errs` — console errors across several URLs

Each script binds its own debug port, so two can run at once.
