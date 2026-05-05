---
URLpath: /cc-projects
title: Creative Cloud Projects
published: false
date: 2025-04-15
description: Led design expanding Creative Cloud Projects across Ps, Ai, Id,
  Firefly, and Adobe Home. Plus enterprise features for organizations with
  hundreds of projects.
tags: Adobe / Product Design
timePeriod: April 2020 – April 2025
---

<div class="cs-nav-anchor" id="overview" data-label="Overview"></div>

#### Overview

Projects is Adobe's solution for sharing a group of assets across the Creative Cloud ecosystem. They can hold folders and any file type with permissions and sharing settings for teams and enterprises.

I led design for the second half of the multi-year rollout, bringing Projects into flagship desktop and web apps (Photoshop, Illustrator, InDesign), as well as Adobe Home and Firefly. Alongside that, I designed enterprise features that let organizations with hundreds of projects manage workspaces, profiles, and creation permissions at scale.

Post-launch, **Projects had expanded to 10 apps**, and **MAU grew 27% to 376K**, with 82% of users on paid plans.

![Projects view across Creative Cloud apps](/ccProjects/hero%20image.png)

<div class="cs-section-header" id="project-1">
  <div class="cs-section-header__eyebrow">Part 1</div>
  <div class="cs-section-header__title">Projects in the flagship apps</div>
</div>

The strategic call was to ship Projects into Photoshop, Illustrator, and InDesign before the rest of the Adobe ecosystem was fully ready. Getting the surface in front of real users early and providing value was worth more than waiting for full feature parity with Adobe Express. Within Photoshop, users could finally share assets and collaborate through a file management structure, something the desktop apps never had.

<div class="cs-nav-anchor" id="cards" data-label="Cards & metadata"></div>

#### Cards & metadata

Hiding unsupported formats would feel like data loss, so every file in a Project had to be visible. The cards had to communicate file type, sync state, location, and last-edited metadata in a small footprint that worked in both a panel and a full-page grid.

![Card grid showing mixed file types — Ps, Ai, Express, and Firefly assets inside a project](/ccProjects/mixed%20files%20in%20project.png)

*Mixed file types in a project — the cards communicate file type, sync state, and last-edited metadata at a glance.*

For files the host app couldn't open, I designed an "Open in another app" view that handed the user off cleanly without making the file feel inaccessible.

<div class="cs-nav-anchor" id="loading" data-label="Skeleton loading"></div>

#### Skeleton loading, coded in CSS

Project content loads from the cloud, often over slow connections inside a heavy app like Photoshop. A spinner in that context reads as failure, and with limited scope, I designed and coded a ghost-loading skeleton animation that mirrored the cards.

<div class="cs-nav-anchor" id="navigation" data-label="Navigation, members, delete"></div>

#### Navigation, members, delete

I added a breadcrumb navigation component for moving in and out of projects as well as any folders nested within them, designed the member-management screens for adding people and assigning roles, and worked through the delete flow, which had to be reassuring without being annoying, since accidental deletes inside a shared workspace cascade across collaborators.

<div class="cs-image-row cs-image-row--2 cs-image-row--tweets">
  <img src="/ccProjects/breadcrumbs.png" alt="Breadcrumb navigation inside a project" />
  <img src="/ccProjects/Member%20management.png" alt="Member management screen — adding and removing collaborators" />
</div>

*Breadcrumb nav (left) and member management (right).*

![Delete-from-project confirmation dialog](/ccProjects/Delete%20project%20dialog.png)

*The delete flow had to be clear without being alarming — accidental deletes in a shared workspace affect everyone.*

<div class="cs-nav-anchor" id="onboarding" data-label="Onboarding & empty states"></div>

#### Onboarding

A user's first time inside a project is the moment Projects either lands as a feature or fades into the background, so I adjusted copy and made sure creating a project was easy and involved no more than a few clicks. It was meant to feel like creating a folder, but with more features.

![Early view of the files animation in Adobe Home](/ccProjects/Early%20view%20of%20the%20files%20animation%20in%20Adobe%20home.gif)

*Early exploration of the Projects entry point in Adobe Home — the animation helped surface active projects without requiring navigation.*

<div class="cs-nav-anchor" id="sync" data-label="Sync simplification"></div>

#### Sync simplification

A large body of work that didn't ship with a marketing moment: redesigning the experience for saving files for offline use. To build more trust in our cloud storage solution and reduce cloud spend, we had to adjust the offline syncing flow to avoid cloud sync errors.

It was an important feature to nail because most desktop users worked with local files, so when they used cloud files, we had to make it just as seamless. The previous process caused a lot of headaches if cloud files were edited by someone else while the user was offline. The previous flow, designed half a decade earlier, hid the offline status and syncing, so I redesigned it, reducing the number of states and making it more obvious when a file would be available offline or had a different sync status.

<div class="cs-image-row cs-image-row--2 cs-image-row--tweets">
  <img src="/ccProjects/Sync%20simplification%20remove%20from%20cache.png" alt="Sync simplification — remove from cache flow" />
  <img src="/ccProjects/Sync%20simplification%20you're%20offline.png" alt="Sync simplification — offline state" />
</div>

*Redesigned sync states: removing a file from local cache (left) and the offline warning before editing (right). Both were hidden or unclear in the previous design.*

<div class="cs-stats">
  <div class="cs-stats__item cs-stats__item--blue">
    <span class="cs-stats__number">62%</span>
    <span class="cs-stats__label">Decrease in data loss from sync churn and traffic to content storage services</span>
  </div>
  <div class="cs-stats__item">
    <span class="cs-stats__number">50%</span>
    <span class="cs-stats__label">Lower cloud spend on affected services</span>
  </div>
</div>

<div class="cs-section-header" id="project-2">
  <div class="cs-section-header__eyebrow">Part 2</div>
  <div class="cs-section-header__title">Connected Enterprise</div>
</div>

Enterprises with hundreds of projects and assets were looking for a way to grant people structured permissions during project creation and to route those projects into a specific organization rather than scattering them across the enterprise. Without it, Projects didn't scale effectively beyond a small team.

<div class="cs-nav-anchor" id="workspaces" data-label="Workspaces & permissions"></div>

#### Workspaces & creation permissions

I designed the flow that allows admins to grant users permission to create projects and route them to a chosen org. The hard part wasn't any single screen. It was making the permission model legible to a designer who is just trying to start a project, rather than parsing org policy or having to ask their admin.

<div class="cs-nav-anchor" id="profiles" data-label="Consolidated profiles"></div>

#### Consolidated profiles

Enterprise users often live in multiple workspaces — agency work, freelance, and an in-house brand can all sit under the same Adobe identity. I designed consolidated profiles so a user's projects, workspaces (organization), and permissions surface together in one identity-aware view rather than fragmenting across context switches.

![Consolidated profiles and workspace switcher](/ccProjects/Consolidated%20profiles%26workspace%20switcher.jpg)

*Consolidated profile view — projects, workspaces, and permissions in one identity-aware surface.*

<div class="cs-nav-anchor" id="impact" data-label="Impact"></div>

#### Impact

<div class="cs-stats">
  <div class="cs-stats__item cs-stats__item--blue">
    <span class="cs-stats__number">10</span>
    <span class="cs-stats__label">Apps shipped with Projects — including Photoshop (Desktop &amp; Web), Illustrator, InDesign, Firefly, and Boards</span>
  </div>
  <div class="cs-stats__item">
    <span class="cs-stats__number">376K</span>
    <span class="cs-stats__label">Projects MAU — up 27% from 295K</span>
  </div>
  <div class="cs-stats__item">
    <span class="cs-stats__number">+61%</span>
    <span class="cs-stats__label">CCI (Individuals) MAU growth — to 174K</span>
  </div>
  <div class="cs-stats__item">
    <span class="cs-stats__number">310K</span>
    <span class="cs-stats__label">Paid MAU — up 27%, 82% of all Projects users</span>
  </div>
</div>

The growth in Projects usage is a signal. It pulls users already invested in the suite into a workflow that ties them deeper across apps — exactly the cross-app stickiness the strategy was aiming for.

<div class="cs-nav-anchor" id="what-i-learned" data-label="What I learned"></div>

#### What I Learned

Shipping before the ecosystem is ready is a real design constraint, not a failure mode. Several decisions on cards, file-type handling, and skeleton loading were made because we chose to ship it to Photoshop while other surfaces caught up, and early user feedback shaped the rest of the rollout in ways a polished, simultaneous launch wouldn't have.

The unglamorous work is where the leverage lives. Sync simplification didn't ship with a marketing moment, but it cut data loss by 62% and reduced infrastructure costs by half; these small features matter, even though they can be a little boring.
