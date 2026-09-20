---
slug: "workflows-and-webhooks"
title: "Workflows and webhooks: automate what happens after a booking"
date: 2025-11-25
category: "Product"
summary: "Workflows and webhooks are live on Pro and Team: send messages on a schedule, and post every booking event to your own systems, signed."
excerpt: "Run something after a booking is made, moved or cancelled, with no code or with a little."
readTime: 6
author: "tomasz-wierzbicki"
cover: "../../assets/blog/workflows-and-webhooks.jpg"
---

A booking is rarely the end of a process. Someone needs to be told, a record needs to exist somewhere, a message needs to go out the day before. Until now, doing that with Openslot meant watching your inbox. Today we are shipping two ways to do it automatically. Both are available on the Pro and Team plans.

Workflows are for the things you would otherwise do by hand: send a message, at a time, to a person, when something happens. Webhooks are for the things your own systems should do: we tell your server the moment a booking is created, moved or cancelled, and your server takes it from there.

## Workflows

A workflow is a trigger, an optional delay, and an action.

Triggers are the three booking events: created, rescheduled and cancelled. Delays are relative to the event or to the meeting itself, so "24 hours before the meeting starts" and "2 hours after the booking is cancelled" are each a single setting. Actions today are an email or an SMS, to the invitee, to the host, or to an address you type in.

Reminders, which have been in Openslot since the start and as SMS since July, are a workflow with a fixed shape. They keep working as they are. What is new is everything that is not a reminder: a preparation email with a questionnaire two days before a demo, a thank-you note an hour after a call, an SMS to the host when a booking is cancelled inside the minimum notice window, a message to the office manager whenever a page tied to a meeting room is booked.

Every message can use fields from the booking: invitee name, event name, start time in the invitee's zone and in the host's, answers to the booking form questions, and the reschedule and cancel links. The links are in every template by default and we recommend leaving them there. Across 1.2 million bookings, a reschedule link in the message was part of what took no-shows from 19 percent to 11.

Workflows belong to a booking page, so a demo page and an intro call page can behave differently. Team pages run a workflow once per booking, not once per member.

## Webhooks

A webhook is an address on your server that we send a request to when a booking event happens. You register the address, choose the events, and we do the rest.

Each delivery carries one event. The body is a document with a stable shape, documented in your settings, that includes:

| Field | What it holds |
| --- | --- |
| Event | One of booking created, booking rescheduled, booking cancelled |
| Event id | Unique per event, and the same on every retry |
| Booking | Id, event type, start and end in UTC, invitee name and email, form answers |
| Host | The member or members assigned, with their time zones |
| Previous | For rescheduled events only, the old start and end |
| Occurred at | When the event happened, in UTC |

Three properties matter to anyone building on this.

Deliveries are signed. Every request carries a signature computed with the secret shown when you create the endpoint. Verify it before you trust the body. Anyone can send a request to a public address; only we can sign one.

Deliveries retry. If your server does not answer with a success status within 10 seconds, we try again with growing gaps for a day, then stop and mark the endpoint as failing in your settings. Because the event id is stable across retries, your handler can ignore an event it has already processed.

Order is not guaranteed. A created event and a rescheduled event for the same booking can arrive close together and out of order, especially after a retry. Use the occurred-at time, not the arrival time, if order matters to you.

## A decision we made on purpose

We considered one webhook per workspace that receives everything, with filtering on your side. We chose per-endpoint event selection instead. It is more clicks in settings, and it means you can point booking created at your CRM and booking cancelled at a message to your sales lead, without either endpoint receiving traffic it has to ignore. It also means an endpoint that starts failing takes only its own events down with it.

## Who it is for

Workflows are for anyone who sends the same message around the same kind of meeting more than a few times a week. If you keep a document of email templates you paste from, start there.

Webhooks are for teams with an engineer and a CRM, a support desk or an internal tool that should know about bookings without someone typing them in. Recruiting agencies update candidate records the moment an interview is booked. Clinics push appointments into the system the front desk already uses. Marketplaces reconcile sessions against payments.

## How to turn it on

Workflows: open the booking page, choose Workflows in the page menu, then New workflow. Pick the trigger, set the delay, choose the action and write the message. Turn it on with the switch at the top. Nothing else on the page changes.

Webhooks: open Settings, then Developers, then Webhooks, and choose Add endpoint. Paste the address, pick the events, and copy the signing secret before you close the dialog; it is shown once. Use Send test event to check your handler before real bookings arrive. Every delivery, with its status and your server's response, is listed under the endpoint for 30 days.

Both features are included in Pro at $12 per user per month billed yearly, and in Team, alongside everything else on the [pricing page](/pricing). On the Free plan, the Workflows and Webhooks screens show what they do and where to upgrade.
