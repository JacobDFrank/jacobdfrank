---
URLpath: /tawOrgSite
title: Thought at Work community
published: true
date: 'April 29, 2019'
description: Set up an event framework and website for a 400+ interdisciplinary design conference.
tags: DESIGN / DEV / MANAGEMENT
timePeriod: 6 Weeks
---

## Problem

#### Creating a website for an interdisciplinary design club.

I have been working on a design conference called Thought At Work for the past four years, leading the website and eventually the whole conference. While leading it, I realized the conference could fulfill a larger purpose and help foster the design community at RIT immensely. The club will host smaller events in addition to the conference based on what worked best at the conference and the community's needs.

**A website that supports and disseminates information about this design organization and the events they host.**

![Upcoming Events Page](/img/upcoming-events-page.png "Upcoming Events Page")

## Visual design

#### Adjusting a weak brand

Since the site would represent the organization, it was best to stick to a brand people attending knew so I took the visual style used at the previous year's conference.

The previous year's style was fun, friendly, and straightforward using basic primary colors and 2.5d shapes. To improve on this, I removed some rules and added a few:

A flat, rounded drop shadow on clickable elements.

#### Changes

* This change made the site feel like more was going on as it added color and filled some of the white space. It also helped with usability as buttons were missing affordances before.

* Changed the font from FS Elliot to Nunito, a friendly, round font.

* Removal of a dark purple color which took the place of the traditional black (#000000)

* This decision made sense to us because it would keep the style friendlier but with so few being able to tell the difference between it and black I opted to replace it.

* Swapping isometric shapes with 2d shapes and replaced the background
  * We'd thought requiring isometric shapes in the past would give the brand a more identifiable look, but it ended up making it more restrictive. With a flat shape filled approach, we could do more and replace the dot-grid background.

![Speaker Page Template](/img/sm-1.9.png "Speaker Page Template")
### Design System


#### On a small team, Design Systems are helpful for the future but get in the way in the present.

* A modern design system used while working on the website, this would help the team when designing new pages in the future.

#### Negatives

* While working on the system, I found myself having to explain how to use the design system to other members of the team.
* Even though each visual design change was recorded in the new design system, team members usually didn't announce the changes until the weekly meetings, and this amounted to wasted time when people used old styles

#### Positives

* So far, developing the site has been a breeze since most components are documented in the system, creating the styles to be reused later was as simple as copy and pasting from Figma's CSS.
* Since everyone that created pages used the same grid, navigation, buttons more there's no need to adjust specific elements for specific pages as they've already been designed.

## Final Comps

* After going through the various design steps in creating an information architecture, sketching, wire-framing, and crafting visual comps we crafted a successful set of functional and clean pages ready to support the organization.

![About Page](/img/about-page.png "About Page")

##### Designed for a Content Management System

* Since I knew I would be using a content management backend for the site to begin, we had in mind when designing the website that some pages and components would be reusable and customizable.
* Event page and speaker page templates were created for use over time, as new events were crafted and speakers added to each event a basic set of reusable templates was created.
* On the Event Archive page consisted of events we'd have in the future and when the date passed the site would shift that event to being archived.

![Design System](/img/design-system.png "Design System")


#### Giving them the ability to manage content

* Once the pages were designed, I began developing out the backend of the website. Including a way for the team to customize the site on their own was a priority for me so I used a development stack that would enable that.
* Using a combination of React, Emotion (CSS in JS), Netlify (CDN and webhooks), and Contentful as the CMS, I was able to develop a framework for the site to be accessed and altered if you had no coding experience. A member of the team could log in and edit, create or delete an event, speaker, schedule, or even text on a particular page.

#### Thoughts on Learning To Manage A Team

I could probably and likely will write a whole article about my experiences as a manager of a student design team but for now, here are a few notes tips from what I've learned.
  * Make sure to ask each team member if they want to be working on it
    * I noticed that since students were working for free, their other priorities in life were usually above the side-project they were helping design, so it was always helpful to give them tasks they wanted to do to keep them motivated. While a volunteer may have said they'd work on anything they don't actually want "anything."
  * Have work sessions when people aren't able to find time on their own.
    * Having meetings set up with time to work on the side-project were beneficial as it gave team members the chance to be corrected as they were working on a design.
    * Videoing each other also increases how personal the meetings will be. When everyone can communicate on the same level, they'll be open to speaking up more.

![Contentful CMS for TAW Site](/img/contentful.png "Contentful CMS for TAW Site")

#### Thanks for reading!
