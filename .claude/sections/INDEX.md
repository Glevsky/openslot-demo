# Section index

Check this before building anything. Every section has a render in
`.claude/sections/`. **That render is the identity of the section.** A section
that already exists is reused with different props, never rebuilt under a new
number.

| Section | Looks like | Used on |
| --- | --- | --- |
| `navbar` | sticky translucent bar, logo left, links centre, resources mega menu, dark CTA right | all |
| `layout01` | homepage hero, centred copy over the booking-page mock | `/` |
| `layout02` | wordmark strip of client names, light or dark | `/`, `/pricing`, `/customers`, `/signup` |
| `layout03` | centred or left intro, then N columns of icon plate, heading and text | `/`, `/product`, `/about` |
| `layout04` | two columns, copy with tick list one side and a product visual the other, `reverse` swaps them | `/`, `/product` |
| `layout05` | stat band, optional heading left and values in a row, dark or canvas | `/`, `/product`, `/about`, `/customers`, `/customers/*` |
| `layout06` | three testimonial cards with quote mark, text and attribution | `/` |
| `layout07` | dark closing CTA, heading left, buttons right | almost all |
| `layout08` | inner-page hero on canvas, eyebrow, h1, text, optional buttons, slot below | every inner page |
| `layout09` | filter pills plus a card grid, filters by tag in the browser | `/blog`, `/resources`, `/resources/*`, `/customers` |
| `layout10` | four pricing plans with a CSS-only yearly/monthly switch | `/pricing` |
| `layout11` | FAQ, intro left and accordion right, animated `::details-content` | `/product`, `/pricing`, `/contact` |
| `layout12` | article hero, back link, pill, title, author and meta, optional cover | `/blog/*`, `/resources/*/*` |
| `layout13` | article body, sticky table of contents left, prose right, author box below | `/blog/*` |
| `layout14` | resource detail, body left, sticky card with the gated form right, highlights and topics below | `/resources/*/*` |
| `layout15` | customer story, pull quote and body left, facts panel right | `/customers/*` |
| `layout16` | team grid, initials avatars, 3 or 4 columns | `/about` |
| `layout17` | form card left, supporting points right, `contact` or `signup` variant | `/contact`, `/signup` |
| `layout18` | legal page, narrow column, title with last-updated rule, prose below | `/privacy`, `/terms` |
| `layout19` | heading with a link on the same row, then three cards | `/`, `/blog/*`, `/resources/*/*`, `/customers/*` |
| `layout20` | featured resource, copy and tick list left, cover right, on a canvas panel | `/resources` |
| `layout21` | resource type tabs with counts, sits in the hero slot | `/resources`, `/resources/*` |
| `layout22` | 404, centred code, heading and three links | `/404` |
| `footer` | dark footer, brand left, three link columns, legal rule | all |

## Page composition

- `/` — 01, 02, 03, 04 ×3, 05, 06, 19, 07
- `/product` — 08, booking mock, 03, 04 ×3, 05, 11, 07
- `/pricing` — 08, 10, 02, 11, 07
- `/resources` — 08 + 21, 20, 09, 07
- `/resources/<hub>` — 08 + 21, 09, 07
- `/resources/<hub>/<slug>` — 12, 14, 19, 07
- `/blog` — 08, 09, 07
- `/blog/<slug>` — 12, 13, 19, 07
- `/customers` — 08, 09, 05, 02, 07
- `/customers/<slug>` — 08, 05, 15, 19, 07
- `/about` — 08, 05, 03, 16 ×2, 07
- `/contact` — 08, 17, 11
- `/signup` — 08, 17, 02
- `/privacy`, `/terms` — 18
- `/404` — 22

Sections take their copy and assets as props. The component owns the markup,
the page owns the words. That is how fifteen pages share a section without
becoming one template.

## Product visuals

`src/components/visuals/` holds the fake product UI, built as real DOM rather
than images so it stays sharp and responsive: `BookingMock` (the booking page),
`TeamRotation` (round-robin), `ReminderThread` (reminders), `WorkflowChain`
(workflow steps).

## Renders

Save the verification screenshot as `.claude/sections/<name>.png` in the same
commit that builds or changes a section, and add the row above.
