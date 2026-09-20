---
slug: "a-calendar-grid-you-can-use-with-a-keyboard"
title: "A calendar grid you can use with a keyboard"
date: 2026-01-27
category: "Engineering"
summary: "How we rebuilt the Openslot month grid for keyboard and screen reader users: roving tabindex, arrow keys, and a name on every day."
excerpt: "One tab stop, four arrow keys, and a name on every day. What changed, and the bug we shipped first."
readTime: 7
author: "elena-saenz"
cover: "../../assets/blog/a-calendar-grid-you-can-use-with-a-keyboard.jpg"
---

The month grid is the first thing every invitee touches. Until this month, if you reached it with a keyboard it was up to 31 tab stops in a row, and if you reached it with a screen reader, every one of them was called "button".

This post is about what we replaced it with, one decision I would make again, and one we got wrong in the first release.

## What was wrong

The old grid was a table of buttons. That is not a bad starting point. Buttons are focusable, and a screen reader knows what to do with one. The problems were everything around them.

Tabbing through the grid meant a tab press per day. Getting from the first of the month to the 23rd took 22 presses. A sighted keyboard user found this slow. A screen reader user found it unusable, because each stop announced only a number, and nothing said whether that day had any times.

Days with no availability were disabled. That is the natural way to write it, and it is the mistake that shaped everything else.

## The decision: one tab stop, roving focus

The pattern we chose is a roving tabindex. The grid is a single stop in the page's tab order. Exactly one day cell is tabbable at any moment, and the others can be focused only by script. When you press Tab, you land on that one cell. From there, the arrow keys move focus between days, and as focus moves, the tabbable cell moves with it, so leaving the grid and coming back returns you to where you were.

The alternative was to keep focus on the grid container and tell assistive technology which cell is active through an attribute. It works, and it avoids moving focus around. We chose roving focus because real focus is what browsers scroll into view, what the focus ring is drawn on, and what every screen reader we tested announces consistently. The container pattern depends on more support than we were willing to depend on.

The keys are the ones a keyboard user expects from any calendar:

- Left and Right move one day.
- Up and Down move one week.
- Home and End go to the first and last day of the row.
- Page Up and Page Down move a month, and keep the same day of the month where it exists.
- Enter or Space selects the day and moves focus to the first time in the list of times.
- Escape from the list of times returns focus to the day it came from.

Moving past the end of the month loads the next month and places focus on its first day, which reads better than stopping you at the edge.

## Saying what a day is

A cell that announces "23" tells you nothing you need. Each day now has an accessible name with four parts: the weekday, the date, how many times are available, and whether it is today or the selected day. A screen reader user landing on a day hears something like "Tuesday, February 3, 4 times available", and on a full day, "Wednesday, February 4, no times".

The count comes from the same availability engine that draws the grid, which Tomasz described in [why we rebuilt availability](/blog/why-we-rebuilt-availability). We did not add a second calculation for the name, so the name and the grid cannot disagree.

When the month changes, a polite live region announces the new month and how many of its days have times: "March 2026, 9 days with available times". Polite matters. An assertive announcement on every arrow press talks over the name of the day you just landed on, which we learned by doing it.

The visual state changed as well. Available days already had a filled background. They now also carry a small dot, so the difference does not rely on color alone, and the focus ring is drawn outside the cell so it is visible against both states.

## The mistake we shipped

In the first release, days without times kept the disabled attribute from the old grid. It seemed right. You cannot pick them, and disabled buttons are skipped by Tab, which is what you want.

Disabled buttons are also skipped by arrow key focus, because the browser will not focus them at all. So if the 10th through the 14th had no times, pressing Right on the 9th did nothing. The script tried to move focus to a cell that refused it, and focus stayed put. In a month where the second half was full, you could not reach the next month with the keyboard. We had tested with a month that was mostly open.

Screen readers made it worse. Since unavailable days could not be reached, there was no way to hear that they existed, and the grid seemed to have holes. A user reported it two days after release, with an exact list of the keys pressed, which is the best kind of report.

The fix was to make unavailable days focusable and mark them unavailable with an aria attribute instead of the disabled attribute. They now take arrow focus, announce "no times", and do nothing on Enter. Tab still skips them, because Tab only ever lands on the one roving cell. We added a test that walks every month of the year with a keyboard against a fixture where three quarters of the days are full.

## What to try

Open any booking page, press Tab until you reach the grid, and use the arrows. If you use a screen reader, tell us what you hear. If something is wrong, [the contact form](/contact) reaches the people who built this, and reports that list the keys pressed are read first.

The embed uses the same grid, so any site that embeds Openslot gets this without changes.
