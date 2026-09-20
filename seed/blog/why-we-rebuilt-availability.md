---
slug: "why-we-rebuilt-availability"
title: "Why we rebuilt availability from scratch"
date: 2025-08-12
category: "Engineering"
summary: "How Openslot replaced precomputed slot tables with interval arithmetic, the decision behind it, and the buffer bug we shipped and fixed."
excerpt: "We threw out the slot table, moved to interval math, and shipped one bug on the way. Here is the whole story."
readTime: 9
author: "tomasz-wierzbicki"
cover: "../../assets/blog/why-we-rebuilt-availability.jpg"
---

Since launch, the question "when is this person free?" was answered by a table. Every night, and whenever a rule changed, a job wrote out every bookable slot for every booking page for the next 60 days.

In July we replaced that table with a function. This post explains why the table stopped working, what we chose instead, and the mistake we shipped along the way.

## What the slot table did well, and where it broke

The table was a good first design. A lookup is fast and easy to reason about, and for one person with one calendar it is close to perfect.

Then Team pages arrived. A round-robin page draws on the calendars of several people, a collective page needs all of them free at once, and both change whenever any member accepts a meeting anywhere. For a team of ten with eight event types, one accepted lunch invitation could rewrite tens of thousands of rows.

Three things went wrong:

- Staleness. The rewrite ran in a queue. Under load it fell minutes behind, and invitees saw slots that were already taken.
- Cost. Most of the rows we wrote were never read. A page for next Thursday might be opened twice; we wrote it 40 times.
- Rules that did not fit a row. Daily limits, minimum notice and buffers depend on the state of the calendar at the moment someone looks, not the moment the job ran. We handled them with corrections at read time, so the table was never the truth anyway.

The last point was the real reason to start over. Once you correct a cache at read time, you have two implementations of the same rules, and they drift.

## The decision: intervals, not slots

The rebuilt system stores no slots. Availability is computed when someone asks for it, from three inputs: the availability rules, the busy time from every connected calendar, and the bookings already in Openslot.

The concrete decision was to represent all three as sets of half-open intervals in absolute time, and to express every rule as a set operation on those intervals. A working-hours rule compiles to a set of intervals, one per day in the requested range. Busy time is a set of intervals. A buffer is an expansion of every busy interval by the buffer length on each side. A date range is an intersection. Free time is the working-hours set minus the expanded busy set. Slots are cut from free time last, at the event type's duration and step.

We considered keeping slots as the unit and filtering them. It is simpler to explain, but every rule then has to know about slot boundaries, and it breaks when two rules interact, for example a 15 minute buffer next to a 45 minute meeting on a 30 minute grid. Set arithmetic on intervals has no such edge cases. Union, intersection and difference are each about 30 lines of code, they compose in any order, and they can be checked with property tests against a brute-force minute-by-minute implementation.

Time zones enter exactly once. Rules are compiled in the host's zone, because "9 to 5 on weekdays" means the host's weekdays; everything after that is absolute time, and the invitee's zone is applied only when slots are rendered. [How we handle time zones](/blog/how-we-handle-time-zones) covers what we got wrong before, and the rebuild let us delete most of that code.

## How a request is answered now

When an invitee opens a booking page:

1. Load the rules for the page and for the members behind it.
2. Fetch busy intervals for each member for the requested range.
3. Compile the rules to interval sets in each member's zone.
4. Subtract expanded busy time, apply the date range and minimum notice, then intersect across members for collective pages or union for round-robin.
5. Cut slots, apply daily limits against the bookings already made, and render in the invitee's zone.

Collective pages with many members take longer, so we bound the range to 60 days from today.

## The mistake we shipped

Two days after the rollout, a support ticket arrived from a customer whose 15 minute buffer had stopped working. Bookings were landing directly after meetings from her connected calendar.

The cause was in step 4. Expansion by the buffer length was applied to bookings made through Openslot, but not to busy intervals from the connected calendar, which arrived through a different path and were merged in after the expansion had run. Buffers protected you from Openslot bookings and from nothing else. The old system had applied them to both, so this was a regression. Our tests missed it because every fixture used Openslot bookings as the only source of busy time.

The fix was small: merge every source of busy time into one set first, then expand. The lesson was larger. Wherever two sources of the same kind of data enter through different paths, a rule will eventually apply to one and not the other. There is now a single busy set per member, and the source is a label on each interval, not a branch in the code. Every availability fixture now includes calendar-sourced busy time.

## What changed for you

Availability now reflects your calendar within seconds, not minutes. Rules behave the same on Team pages as on personal pages. Daily limits and minimum notice are evaluated at the moment of booking, so two invitees cannot both take the last slot of a day. Nothing about your settings moved; the same rules are now evaluated by one implementation instead of two.

## What is next

The interval engine is a library that knows nothing about booking pages, which is the property we wanted. Meeting polls, which are on the roadmap, will use it directly. If you see availability behave in a way you cannot explain, tell us through [the contact form](/contact). The property tests are good. Customers are better.
