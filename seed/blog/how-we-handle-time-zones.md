---
slug: "how-we-handle-time-zones"
title: "How we handle time zones, and the bugs we shipped along the way"
date: 2025-05-06
category: "Engineering"
summary: "How Openslot stores availability, generates slots and shows every invitee their own time, plus the daylight saving bug we shipped and how we fixed it."
excerpt: "Wall-clock rules, absolute bookings, and a daylight saving bug that moved meetings by an hour."
readTime: 8
author: "tomasz-wierzbicki"
cover: "../../assets/blog/how-we-handle-time-zones.svg"
---

Time zones are the part of scheduling software that looks solved. Every language has a date library and every browser reports a zone. Then a government moves a clock change by a week, or a host books an invitee across a daylight saving boundary, and a meeting quietly lands an hour off.

This post is about the decisions that make this rare, and about the time it happened anyway.

## What has to be true

Three things, and they pull against each other.

The invitee always sees their own time. Someone in Denver opening a Lisbon host's booking page should see Denver times and never do the subtraction.

A host's rules mean what they would mean on a wall clock. Available 9:00 to 17:00 means 9:00 to 17:00 every day, including the day after the clocks change.

A booking is one instant. Once made, it is the same moment for both people, in every message, on every calendar.

The first two are about local time, which shifts. The third is about absolute time, which does not.

## The decision: wall-clock rules, absolute bookings

We store availability rules as local wall-clock time plus a zone identifier. A rule is 09:00 to 17:00, Monday to Friday, Europe/Lisbon. We never store a UTC offset for a rule, and we never convert a rule to UTC at rest.

Slot generation works one calendar day at a time, in the host's zone. For each day in the booking window we take that day's rules, resolve them against the zone database for that specific date, and only then produce absolute instants. Buffers, daily limits and minimum notice are applied in the host's zone before the conversion, because that is where they mean something. The instants are converted to the invitee's zone at the last step, in the browser.

A booking is stored as one absolute instant plus two zone identifiers, the host's and the invitee's at the moment of booking. Everything else, the 10:00 on Tuesday in the confirmation email, the calendar event, the reminder times, is derived from the instant on demand. Nothing about a booking is stored as local time.

Any rule stored in UTC drifts by an hour twice a year in most zones: 08:00 to 16:00 UTC is right for a Lisbon host in winter and wrong in summer. The only representation that survives clock changes is the one the host typed.

### Why the browser's zone is a suggestion

The invitee's zone comes from the browser. It is usually right, and wrong in a way that matters: someone booking from an airport, or on a laptop whose zone was set three countries ago. So the booking page shows the detected zone next to the times, with a control to change it, and remembers the choice. Detection is a strong default, not a fact.

## The bug we shipped

In early March we shipped a change meant to make slot generation faster. Resolving the host's zone against the database for every day of a multi-week booking window looked wasteful. The new code resolved the offset once, for the first day of the window, and reused it for every day after.

That is correct on every day of the year except the days between a clock change and the end of the window. For hosts in most of North America the change fell on the second Sunday in March, a few days after the deploy. Until that Sunday, the first day of the window was on winter time, so every day after the change was generated with the winter offset. Slots ran an hour late against the host's rules. A host available until 17:00 was getting bookings at 17:30. Once the window rolled past the change, generation was correct again, which is why the bug was live for about a week and only for bookings made before the change for dates after it.

We found out from a host, not from monitoring. The fix took most of a day and was the boring one: resolve the offset per day, as before, and get the speed back by caching resolved offsets per zone and date.

Forty-one bookings had been made against a wrong slot. We wrote to every host involved with a reschedule link and let them decide. Most kept the meeting.

Two things changed permanently:

- The test suite now covers every zone that changes clocks, generating slots on either side of every transition in the next two years. It is slow, and it runs on every change to the availability code anyway.
- A nightly job regenerates the slot list for a sample of booking pages using the plain per-day method and compares it with what the fast path produced. Any difference pages the on-call engineer. It has not fired since.

## The smaller mistakes

A few other things were just wrong for a while.

Reminders scheduled for the evening before were originally computed in the host's zone, so an invitee eight hours ahead got theirs at three in the morning. Relative reminders, such as one hour before, use the absolute instant. Reminders tied to a time of day now use the invitee's zone.

And we once accepted a booking at a wall-clock time that does not exist, 02:30 on the morning clocks go forward. The generator skips the missing hour now, and the hour that happens twice in the fall is offered once, at its first occurrence.

## What we still do by hand

The zone database changes several times a year, usually because a government has moved or canceled a clock change at short notice. We update it within a day of each release and then re-derive the local times of every future booking from its stored instant, because a database update is exactly the kind of change that can move them. So far it has only ever moved the display, never the instant, which is what the design was for.
