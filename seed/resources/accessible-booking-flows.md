---
slug: "accessible-booking-flows"
title: "Building accessible booking flows"
type: "Course"
topics:
  - "Accessibility"
  - "Engineering"
level: "Advanced"
author: "elena-saenz"
date: 2026-03-03
summary: "Four lessons on a booking flow that works with a keyboard and a screen reader, from the calendar grid to time zones, form errors, contrast and motion."
excerpt: "Four lessons in 55 minutes on booking flows that work without a mouse or a screen."
gated: false
featured: false
meta: "4 lessons, 55 min"
duration: "55 min"
cta: "Start the course"
lessons:
  - title: "The calendar grid, keyboard and screen reader"
    length: "16 min"
  - title: "Dates, times and time zones people can read"
    length: "12 min"
  - title: "Forms, errors and focus"
    length: "15 min"
  - title: "Color, contrast and motion"
    length: "12 min"
highlights:
  - "Keyboard support for a month grid, key by key"
  - "What a screen reader should announce on every move"
  - "Dates and times written so nobody has to guess"
  - "Error and focus handling that does not lose the invitee"
  - "Contrast and motion decided by numbers, not opinion"
cover: "../../assets/resources/accessible-booking-flows.svg"
---

A booking flow is a small piece of software with a hard part in the middle. The calendar grid has to be operable with a keyboard, readable by a screen reader, and clear to someone who cannot see which month they landed on. Most implementations get the layout right and the rest wrong, and the rest is where the booking is lost.

This course is the work behind our own calendar grid, taken apart into four lessons. It is code-level and assumes you write front-end code and know your way around an accessibility tree. The short version of the first lesson is on the blog, in [a calendar grid you can use with a keyboard](/blog/a-calendar-grid-you-can-use-with-a-keyboard).

Four lessons, 55 minutes, free. Each one ends with a test you can run against your own build in about ten minutes, with a keyboard and a screen reader rather than an automated checker.

## The lessons

- The calendar grid, keyboard and screen reader, 16 min. Roving focus across a month, arrow keys between days and weeks, page keys between months, and what is announced on every move, including a day with no times left.
- Dates, times and time zones people can read, 12 min. Writing a time that does not depend on a format nobody agreed on, naming the zone the invitee is actually in, and handling an offset that changes inside the booking window.
- Forms, errors and focus, 15 min. Labels that stay visible, required fields marked in words, error text next to the field it belongs to, and where focus goes after a submit that failed.
- Color, contrast and motion, 12 min. Contrast for text and for state, focus rings that survive a dark background, and respecting a reduced motion setting without dropping the feedback the motion was carrying.

## Who it's for

- Front-end engineers building a booking or calendar interface from scratch rather than adopting one.
- Designers who specify the states of an interface and want to specify the right ones the first time.
- Teams embedding a booking page inside a product that has an accessibility standard to meet.
