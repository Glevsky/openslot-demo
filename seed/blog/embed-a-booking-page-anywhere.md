---
slug: "embed-a-booking-page-anywhere"
title: "Embed a booking page anywhere in two lines"
date: 2025-10-07
category: "Product"
summary: "Openslot embeds are live: put any booking page inline on your site or open it as a popup, with two lines of markup, on Pro and Team."
excerpt: "Inline or popup, two lines of markup, and your booking page lives on your own site."
readTime: 4
author: "priya-raman"
cover: "../../assets/blog/embed-a-booking-page-anywhere.svg"
---

Starting today you can put a booking page on your own website. Paste two lines, and the page renders inline where you put it, or opens as a popup from any button. Embeds are available on the Pro and Team plans.

We built this because "here is a link" is not always enough. When a visitor is already on your pricing page, or a student is already reading a tutor's profile, sending them somewhere else to book is a step where people leave.

## What shipped

Two embed modes, one script.

Inline places the full booking flow inside your page: calendar, time list, form and confirmation. It takes the width of its container and grows in height as the invitee moves through the steps, so nothing below it jumps.

Popup keeps your page as it is and opens the booking flow in a layer on top when a visitor clicks. You add one attribute to any button or link you already have.

Both modes carry everything a hosted page does: time-zone detection, availability rules, buffers and reminders. A booking made through an embed is the same as a booking made anywhere else. Team pages, round-robin and collective, embed exactly like personal pages.

## Who it is for

Anyone whose visitors are already somewhere when they decide to book. Marketplaces with a profile per provider, agencies with a contact page, clinics with a locations page, sales teams with a pricing page.

[Lumen Tutoring](/customers/lumen-tutoring) ran the embed on every one of their 900 tutor profiles ahead of this release, as part of the early access group. Students book 21,000 sessions a month without leaving the profile they are reading, and Lumen's support tickets about scheduling dropped 70 percent once booking stopped meaning "copy a link into a message".

## The two lines

Open the booking page you want to embed, choose Share in the top right, then the Embed tab. Pick Inline or Popup, and copy what appears. For an inline embed it is this:

```html
<script src="/embed.js"></script>
<div data-openslot="mara/intro-call"></div>
```

The script is the same for every page and every mode, so load it once. The second line is where the booking page appears, and the attribute names the page. For a popup, you copy the same script line, and instead of the second line you add the popup attribute shown in the Embed tab to the button of your choice.

Styling comes from your page. The embed inherits your fonts and background, uses the brand color from your Openslot settings for buttons and the selected day, and has no border of its own. There is no Openslot logo in an embed on Pro and Team, the same as on a hosted page on those plans.

## How to turn it on

Embeds are on for every Pro and Team workspace; there is nothing to enable. To get the markup for a page:

1. Open the booking page from your dashboard.
2. Choose Share, then Embed.
3. Choose Inline or Popup.
4. Copy the markup and paste it into your site where the page should appear.

Workspace admins on the Team plan can restrict which domains may host an embed under Settings, then Security, then Allowed domains. Leave the list empty to allow any domain.

If you are on the Free plan, the Embed tab shows what an embed looks like and links to [pricing](/pricing). Pro is $12 per user per month billed yearly, and includes embeds alongside unlimited booking pages, SMS reminders and no Openslot branding.

## What is next

We are working on prefilling the booking form from your own page, so a signed-in visitor does not type their name and email twice. Tell us what else you need through [the contact form](/contact).
