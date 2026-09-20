# Openslot — the fiction bible

Everything on this site is invented. This file is the single source of truth
for the invented facts, so every page, post and story agrees with every other.
Before writing any copy, read it. If a fact is not here, do not make one up
that contradicts something here; add it here first.

## The product

**Openslot** — scheduling for teams. One link, no back-and-forth.

- Booking pages — one link per event type (30 min intro call, 60 min demo).
- Team pages — round-robin (bookings rotate across a team) and collective
  (every invited teammate must be free).
- Availability rules — working hours per weekday, buffers before/after,
  daily limits, minimum notice, date ranges.
- Reminders — email, and SMS on paid plans. Reschedule and cancel links in
  every message.
- Embeds — inline or popup, two lines of markup.
- Workflows and webhooks — run something after a booking is made, moved or
  cancelled.
- Meeting polls — propose several times, let a group vote.
- Routing forms — ask a question first, send the invitee to the right page.
- Time-zone detection — invitee sees their own time, always.
- Calendar sync — connects to any calendar the invitee's team already uses.
  Never name a real calendar, video or CRM product. Say "your calendar",
  "your video tool", "your CRM".

## Plans (pricing page is the etalon; posts must agree)

| Plan | Price | Includes |
| --- | --- | --- |
| Free | $0 | 1 booking page, 1 calendar, email reminders, Openslot branding |
| Pro | $12 per user per month billed yearly, $15 monthly | unlimited booking pages, SMS reminders, workflows and webhooks, embeds, no branding |
| Team | $20 per user per month billed yearly, $24 monthly | everything in Pro, round-robin and collective team pages, routing forms, meeting polls, admin controls, priority support |
| Enterprise | custom | everything in Team, SSO, audit log, data residency, dedicated support |

14-day free trial of Team. No card needed. Annual billing saves 20 percent.

## The company

- Founded 2023 in Lisbon by Mara Lindqvist and Tomasz Wierzbicki.
- Remote team of 12 across 6 countries (as of 2026).
- Legal entity: Openslot Technologies, Lda., Rua do Relógio 14, 1200-001
  Lisboa, Portugal.
- No funding announcements. Never mention investors, rounds or valuations.
- No emails and no phone numbers anywhere on the site. Contact goes through
  the form on `/contact`.

## People (ids are the `author` values)

| id | Name | Role | Writes about |
| --- | --- | --- | --- |
| `mara-lindqvist` | Mara Lindqvist | CEO and co-founder | sales calls, meetings culture, company |
| `tomasz-wierzbicki` | Tomasz Wierzbicki | CTO and co-founder | engineering, time zones, reliability |
| `priya-raman` | Priya Raman | Head of Product | product releases |
| `jonah-adebayo` | Jonah Adebayo | Head of Growth | data, playbooks, no-shows |
| `elena-saenz` | Elena Sáenz | Design Lead | accessibility, interface design |

Other team members for the About page only: Ruth Kaplan (Customer Support
Lead), Diego Ferreira (Backend Engineer), Hana Sato (Frontend Engineer),
Olu Adeyemi (Security Engineer), Ingrid Vos (Finance and Operations), Samir
Haddad (Account Executive), Noor Farahani (Content Writer).

## Numbers (use these, never others)

- 4.1 million bookings scheduled through Openslot in 2025.
- 38,000 teams on Openslot. 140 countries. Uptime 99.98 percent in 2025.
- 1.2 million bookings analysed for the no-show study (post 6).
- No-show rate: 19 percent without reminders; 11 percent with email plus
  SMS reminders and a reschedule link in the message.
- Average time from signup to first booking: 2 days.

## Customers (all invented)

| Name | What they are | Story |
| --- | --- | --- |
| Halcyon Health | 14 physiotherapy clinics, Manchester and the north of England | No-shows down 38 percent with SMS reminders and reschedule links; 14 clinics on one workspace; rolled out in 2 days |
| Orbital Recruiting | 60-recruiter agency placing engineers, Berlin | Round-robin interview pages: time to first interview from 6 days to 1.5 days; 2,400 interviews a month |
| Lumen Tutoring | Online tutoring marketplace, 900 tutors | Embedded booking pages on every tutor profile; 21,000 sessions a month; support tickets about scheduling down 70 percent |

Logo-strip names (never given stories, only wordmarks): Northwind Legal,
Bramble Studio, Fieldnote, Kestrel Insurance, Parallax Labs, Tidewater Realty.

Testimonial voices: Dr. Amara Whitfield (Operations Director, Halcyon
Health), Felix Brandt (Head of Talent, Orbital Recruiting), Sofia Moreau
(Co-founder, Lumen Tutoring), Ines Carvalho (Office Manager, Northwind
Legal), Marcus Bell (Founder, Bramble Studio).

## Voice

Plain, specific, calm. Short paragraphs. Sentence-case headings. No
exclamation marks. No hype words: never "seamless", "revolutionary",
"supercharge", "game-changer", "unlock", "empower", "effortless",
"world-class", "cutting-edge". No em dashes; use commas and full stops.
Concrete numbers over adjectives. American spelling.

Never name a real company, product, person, place of business or website.
Never link outside the site. Internal links only, and only to routes that
exist: `/`, `/product`, `/pricing`, `/customers`,
`/customers/halcyon-health`, `/customers/orbital-recruiting`,
`/customers/lumen-tutoring`, `/blog`, `/blog/<slug from the calendar>`,
`/resources`, `/resources/<hub>` and `/resources/<hub>/<slug>` where
`<hub>` is the type's path below, `/about`, `/contact`, `/signup`,
`/privacy`, `/terms`.

## Editorial calendar (blog)

Categories, exact strings: `Guides`, `Scheduling`, `Product`, `Engineering`,
`Company`.

| # | slug | title | category | author | date | min |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `end-the-back-and-forth` | How to stop the scheduling back-and-forth for good | Guides | mara-lindqvist | 2025-02-11 | 6 |
| 2 | `round-robin-vs-collective` | Round-robin vs collective scheduling: which one your team needs | Scheduling | priya-raman | 2025-03-04 | 7 |
| 3 | `buffer-time-is-not-optional` | Buffer time is not optional | Guides | jonah-adebayo | 2025-03-25 | 4 |
| 4 | `introducing-team-pages` | Introducing Team pages | Product | priya-raman | 2025-04-15 | 3 |
| 5 | `how-we-handle-time-zones` | How we handle time zones, and the bugs we shipped along the way | Engineering | tomasz-wierzbicki | 2025-05-06 | 8 |
| 6 | `what-1-2-million-bookings-taught-us-about-no-shows` | What 1.2 million bookings taught us about no-shows | Scheduling | jonah-adebayo | 2025-06-03 | 6 |
| 7 | `a-better-first-call` | A better first sales call starts with the booking form | Guides | mara-lindqvist | 2025-06-24 | 5 |
| 8 | `sms-reminders-are-live` | SMS reminders are live | Product | priya-raman | 2025-07-15 | 3 |
| 9 | `why-we-rebuilt-availability` | Why we rebuilt availability from scratch | Engineering | tomasz-wierzbicki | 2025-08-12 | 9 |
| 10 | `interview-scheduling-playbook` | Interview scheduling for remote hiring teams: a playbook | Guides | jonah-adebayo | 2025-09-09 | 7 |
| 11 | `embed-a-booking-page-anywhere` | Embed a booking page anywhere in two lines | Product | priya-raman | 2025-10-07 | 4 |
| 12 | `the-case-against-15-minute-meetings` | The case against 15-minute meetings | Scheduling | mara-lindqvist | 2025-11-04 | 5 |
| 13 | `workflows-and-webhooks` | Workflows and webhooks: automate what happens after a booking | Product | tomasz-wierzbicki | 2025-11-25 | 6 |
| 14 | `2025-in-numbers` | 2025 in numbers | Company | mara-lindqvist | 2025-12-16 | 4 |
| 15 | `a-calendar-grid-you-can-use-with-a-keyboard` | A calendar grid you can use with a keyboard | Engineering | elena-saenz | 2026-01-27 | 7 |
| 16 | `meeting-polls` | Meeting polls for groups that can't agree | Product | priya-raman | 2026-03-10 | 3 |

## Post file contract

Path: `src/content/blog/<slug>.md`. Frontmatter exactly:

```yaml
---
slug: "end-the-back-and-forth"
title: "How to stop the scheduling back-and-forth for good"
date: 2025-02-11
category: "Guides"
summary: "One sentence for the meta description, 120 to 155 characters."
excerpt: "One sentence for the card, 80 to 120 characters, not the same as summary."
readTime: 6
author: "mara-lindqvist"
cover: "../../assets/blog/end-the-back-and-forth.svg"
---
```

Body rules: no H1 (the title is rendered by the page). Open with one or two
short paragraphs, then three to six `##` sections, `###` inside them if
needed. Lists where the content is a list. At most one blockquote. Tables
are fine when comparing things. No images. 600 to 1,000 words, matching the
`min` column at roughly 150 words per minute. Product posts describe what
shipped, who it is for, which plan has it, and how to turn it on. Engineering
posts contain one concrete technical decision and one mistake. Guides end
with a short checklist.

## Customer story file contract

Path: `src/content/customers/<slug>.md`. Frontmatter exactly:

```yaml
---
slug: "halcyon-health"
name: "Halcyon Health"
industry: "Healthcare"
title: "Halcyon Health cut no-shows by 38 percent across 14 clinics"
summary: "Meta description, 120 to 155 characters."
excerpt: "Card sentence, 80 to 120 characters."
order: 1
plan: "Team"
products:
  - "Booking pages"
  - "SMS reminders"
  - "Reschedule links"
stats:
  - value: "38%"
    label: "fewer no-shows"
  - value: "14"
    label: "clinics on one workspace"
  - value: "2 days"
    label: "from signup to first booking"
quote:
  text: "One or two sentences in the customer's voice."
  name: "Dr. Amara Whitfield"
  role: "Operations Director, Halcyon Health"
---
```

Body: `## The challenge`, `## What changed`, `## The results`, optional
`## What's next`. 450 to 650 words. Written as a case study, third person,
with one or two direct quotes from the named person inside the prose.

## Legal file contract

Path: `src/content/legal/<slug>.md`, slugs `privacy` and `terms`.

```yaml
---
slug: "privacy"
title: "Privacy policy"
updated: 2026-02-01
summary: "Meta description, 120 to 155 characters."
---
```

Body: `##` sections in the order a real policy has them. 600 to 900 words.
Plain language. The controller is Openslot Technologies, Lda. Requests go
through `/contact`.

## Authors collection

Path: `src/content/authors/<id>.md`, one file per person in the People table.
Blog posts and resources reference an author by this id, so a bio is written
once and reused.

```yaml
---
id: "mara-lindqvist"
name: "Mara Lindqvist"
role: "CEO and co-founder"
bio: "Two sentences, third person, what they work on and what they did before."
---
```

Body is empty.

## Resource center

Route `/resources` is the hub. Each type has its own sub-hub, and a
resource's detail page lives under its type:

| type | hub route | hub title |
| --- | --- | --- |
| `Webinar` | `/resources/webinars` | Webinars |
| `Ebook` | `/resources/guides` | Guides and ebooks |
| `Report` | `/resources/reports` | Reports |
| `Template` | `/resources/templates` | Templates |
| `Course` | `/resources/courses` | Courses |

So `the-no-show-handbook` is an `Ebook` and lives at
`/resources/guides/the-no-show-handbook`.
Filters are by `type`, exact strings: `Webinar`, `Ebook`, `Template`,
`Report`, `Course`.

Topics, exact strings, a resource carries one to three:
`Sales`, `Recruiting`, `Healthcare`, `Education`, `Operations`,
`Engineering`, `Accessibility`.

Levels: `Intro`, `Practical`, `Advanced`.

Gated resources show a short form instead of a download button. Nothing is
actually downloadable, the form is the end of the flow.

| # | slug | title | type | topics | level | author | date | meta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `state-of-scheduling-2026` | The state of scheduling 2026 | Report | Operations, Sales | Intro | jonah-adebayo | 2026-02-03 | 34 pages, gated, featured |
| 2 | `scheduling-playbook-for-revenue-teams` | The scheduling playbook for revenue teams | Ebook | Sales | Practical | mara-lindqvist | 2025-09-16 | 48 pages, gated |
| 3 | `the-no-show-handbook` | The no-show handbook | Ebook | Healthcare, Operations | Practical | jonah-adebayo | 2025-06-10 | 32 pages, gated |
| 4 | `remote-hiring-the-scheduling-chapter` | Remote hiring: the scheduling chapter | Ebook | Recruiting | Practical | jonah-adebayo | 2025-10-21 | 26 pages, gated |
| 5 | `the-meetings-audit-workbook` | The meetings audit workbook | Ebook | Operations | Intro | mara-lindqvist | 2025-12-02 | 18 pages, free |
| 6 | `no-show-benchmarks-by-industry` | No-show benchmarks by industry | Report | Healthcare, Education | Practical | jonah-adebayo | 2025-07-08 | 22 pages, gated |
| 7 | `scaling-interview-scheduling` | Scaling interview scheduling without adding coordinators | Webinar | Recruiting | Practical | jonah-adebayo | 2025-11-12 | 42 min, on demand, featured |
| 8 | `filling-clinic-calendars` | Filling clinic calendars: what 14 clinics learned | Webinar | Healthcare | Practical | mara-lindqvist | 2025-08-19 | 38 min, on demand |
| 9 | `working-across-time-zones` | Working across time zones without the 6am calls | Webinar | Operations, Engineering | Intro | tomasz-wierzbicki | 2026-04-22 | 45 min, upcoming |
| 10 | `routing-forms-workshop` | Workshop: routing forms from scratch | Webinar | Sales, Operations | Advanced | priya-raman | 2026-01-20 | 55 min, on demand |
| 11 | `availability-rules-template-pack` | Availability rules template pack | Template | Operations | Intro | priya-raman | 2025-05-20 | 9 templates, free |
| 12 | `interview-loop-scheduling-template` | Interview loop scheduling template | Template | Recruiting | Practical | jonah-adebayo | 2025-10-28 | 4 templates, free |
| 13 | `first-call-agenda-templates` | First-call agenda templates | Template | Sales | Intro | mara-lindqvist | 2026-02-17 | 6 templates, free |
| 14 | `openslot-fundamentals` | Openslot fundamentals: a six-part course | Course | Operations | Intro | priya-raman | 2025-04-08 | 6 lessons, 1 hr 10 min, free, featured |
| 15 | `accessible-booking-flows` | Building accessible booking flows | Course | Accessibility, Engineering | Advanced | elena-saenz | 2026-03-03 | 4 lessons, 55 min, free |

Webinar speakers may include a customer voice from the Customers table,
with their real role string. A webinar carries a `speakers` list; everything
else carries only `author`.

### Resource file contract

Path: `src/content/resources/<slug>.md`. Frontmatter exactly:

```yaml
---
slug: "the-no-show-handbook"
title: "The no-show handbook"
type: "Ebook"
topics:
  - "Healthcare"
  - "Operations"
level: "Practical"
author: "jonah-adebayo"
date: 2025-06-10
summary: "Meta description, 120 to 155 characters."
excerpt: "Card sentence, 80 to 120 characters, different wording from summary."
gated: true
featured: false
meta: "32 pages"
cta: "Get the handbook"
highlights:
  - "Four to six short lines. What the reader gets. No sentences longer than 90 characters."
cover: "../../assets/resources/the-no-show-handbook.svg"
---
```

A `Webinar` adds `duration: "42 min"`, `status: "On demand"` or
`"Upcoming"`, and `speakers` as a list of `{ name, role }`. A `Course` adds
`duration` and a `lessons` list of `{ title, length }`. Everything else
omits those keys.

Body: two or three short paragraphs of description under no heading, then
`## What's inside` with a list, then `## Who it's for` with two or three
lines. Webinars use `## What we cover` instead of `## What's inside` and add
`## The speakers` with a line per speaker. Courses use `## The lessons`.
350 to 550 words. Same voice rules as the blog.
