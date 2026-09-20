---
slug: "lumen-tutoring"
name: "Lumen Tutoring"
industry: "Education"
title: "Lumen Tutoring cut scheduling support tickets by 70 percent"
summary: "How an online tutoring marketplace embedded booking on 900 tutor profiles, reached 21,000 sessions a month and cut scheduling tickets 70 percent."
excerpt: "Booking on every one of 900 tutor profiles, and 70 percent fewer scheduling tickets."
order: 3
plan: "Pro"
products:
  - "Booking pages"
  - "Embeds"
  - "Reminders"
  - "Time-zone detection"
stats:
  - value: "21,000"
    label: "sessions booked a month"
  - value: "900"
    label: "tutor profiles with booking embedded"
  - value: "70%"
    label: "fewer scheduling support tickets"
quote:
  text: "Booking used to be the last thing a student had to be talked into. Now it is part of reading the profile."
  name: "Sofia Moreau"
  role: "Co-founder, Lumen Tutoring"
---

## The challenge

Lumen Tutoring is an online marketplace. A student looking for help with calculus or German reads through profiles, finds a tutor they like, and books an hour. There are 900 tutors on it.

The part between finding the tutor and booking the hour used to be a message thread. The student wrote to ask about Tuesday. The tutor answered the next day to say Tuesday was taken but Thursday was open. The student, often a teenager with school all day, answered after that. Somewhere in the exchange one of them said 4pm without saying which country's 4pm.

"Our support team was doing scheduling by hand for people who had already decided to pay us," said Sofia Moreau, co-founder of Lumen Tutoring.

Scheduling was the largest single category of support ticket: hours that had been promised twice, sessions nobody turned up to, and students who gave up waiting for a reply and went somewhere else.

## What changed

Lumen put an Openslot booking page on every tutor profile with an inline embed, two lines of markup in the profile template. The calendar sits under the tutor's biography in Lumen's own fonts and colors, with no Openslot branding on the Pro plan.

Each tutor has their own booking pages, one per session type: a single hour, a recurring weekly slot, and a longer exam preparation block. Tutors set their own hours per weekday and their own minimum notice, which was the setting most of them cared about, because a booking made at 11pm for 8am the next morning is not a lesson anyone wants to teach.

Time-zone detection took care of the rest. Lumen's tutors and students are in different countries more often than not. The student sees the times in their own zone, the tutor sees theirs, and neither of them has to do the arithmetic.

Reminders go out by email and text before every session, each carrying a reschedule link. A student who cannot make Thursday moves the session themselves, and the tutor's calendar updates without a message to anybody.

## The results

Students book 21,000 sessions a month through the embedded pages, without leaving the profile they were reading.

Support tickets about scheduling fell 70 percent. What is left is mostly refunds and questions about a lesson itself, which is the work Lumen wanted its support team doing.

"The tutors noticed first," Moreau said. "They stopped losing evenings to messages about which evening would work."

Onboarding a new tutor did not need rebuilding to take advantage of it. A tutor connects their calendar once, sets their hours, and their profile has a working booking page the same day.

## What's next

Lumen is moving to workflows and webhooks, so a confirmed session writes itself into the tutor's payment record and a canceled one releases the hour on the profile without waiting for a nightly sync.

Small-group classes are the other open question. Collective pages, on the Team plan, would let two tutors hold a workshop slot together, and the marketplace is running that with a handful of tutors before deciding.
