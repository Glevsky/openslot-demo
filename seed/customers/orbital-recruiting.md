---
slug: "orbital-recruiting"
name: "Orbital Recruiting"
industry: "Recruiting"
title: "Orbital Recruiting took time to first interview from 6 days to 1.5 days"
summary: "How a 60-recruiter agency in Berlin used round-robin interview pages to take time to first interview from 6 days to 1.5 days, at 2,400 a month."
excerpt: "Round-robin pages took Orbital Recruiting from 6 days to 1.5 days to a first interview."
order: 2
plan: "Team"
products:
  - "Booking pages"
  - "Team pages"
  - "Availability rules"
  - "Time-zone detection"
stats:
  - value: "1.5 days"
    label: "to first interview, from 6 days"
  - value: "2,400"
    label: "interviews a month"
  - value: "60"
    label: "recruiters on one workspace"
quote:
  text: "Speed is most of our advantage. Going from 6 days to 1.5 days is the difference between placing an engineer and hearing that somebody else placed them."
  name: "Felix Brandt"
  role: "Head of Talent, Orbital Recruiting"
---

## The challenge

Orbital Recruiting places engineers. Its 60 recruiters work out of Berlin for clients across Europe, and the agency is paid for the placement rather than for the search, which makes every day between a candidate saying yes and a candidate sitting in an interview a day it funds itself.

That gap averaged 6 days, and almost none of it was assessment. A recruiter asked a candidate for three possible times. The candidate replied that evening. The client replied the next morning to say two of the three were gone. The recruiter went back to the candidate. Each leg cost a day, and a full loop had four stages.

"Candidates do not wait politely," said Felix Brandt, Head of Talent at Orbital Recruiting. "Every day between yes and the first call is a day another agency is talking to them."

Three coordinators spent most of their week inside that problem. Hiring a fourth would have moved the queue, not shortened it.

## What changed

Orbital rebuilt interview scheduling on Openslot Team pages, one page per stage of the loop.

The recruiter screen is a round-robin page. The candidate opens one link, picks a time, and the booking rotates to whichever recruiter covering that client is free. The technical interview is a second round-robin page drawing on a pool of engineers, so no single interviewer becomes the reason a candidate waits. The final conversation is a collective page: the hiring manager and a team lead both have to be free, and the page only offers times where they are.

Availability rules hold it together. Recruiters set working hours per weekday, a buffer after every interview for notes and scorecards, and a daily limit so nobody takes six screens back to back. Minimum notice is set per stage, two hours for a screen and a full day for a panel.

Time-zone detection removed the other standing error. Candidates apply from wherever they live, and the booking page shows them their own clock, so nobody converts anything and nobody joins an hour late.

Recruiters now send one link instead of three times, and the link is the same one every week.

## The results

Time to first interview is 1.5 days, down from 6. Orbital runs 2,400 interviews a month through Openslot across all 60 recruiters, on one workspace with per-client admin controls.

Reschedules stopped landing in inboxes. A candidate who cannot make their slot uses the link in the reminder, the page offers the next free time from the same pool, and the recruiter learns about it from their calendar rather than from an email at eight in the morning.

The three coordinators moved to candidate care and client reporting. The work that was left was worth doing by a person.

## What's next

Orbital is putting a routing form in front of the screen page, so a candidate answers one question about the role they applied for and lands on that client's pool rather than a general one.

Meeting polls are being tried for internal debriefs, where four interviewers have to agree on 30 minutes and none of them are the reason a candidate is waiting. Webhooks that write each booking back into the agency's CRM are next after that.
