---
URLpath: /cc-projects
title: Creative Cloud Projects
published: false
date: 2025-04-15
description: Led design on expanding Creative Cloud Projects across Photoshop,
  Illustrator, InDesign, Firefly, and Adobe Home — plus Connected Enterprise
  features for organizations with hundreds of projects.
tags: Adobe / Product Design
timePeriod: April 2020 – April 2025
---

<div class="cs-nav-anchor" id="overview" data-label="Overview"></div>

#### Overview

Creative Cloud Projects is Adobe's shared workspace for storage, collaboration, and asset organization across the Creative Cloud ecosystem. A project can hold a Photoshop document, an Illustrator file, a Firefly generation, and a board all in one place — with permissions, members, and version history attached.

I led design on the second half of the multi-year rollout: bringing Projects into the flagship desktop and web apps (Photoshop, Illustrator, InDesign), the Universal Asset Browser, and Adobe Home and Firefly. Alongside that, I designed Connected Enterprise — the features that let organizations with hundreds of projects manage workspaces, profiles, and creation permissions at scale.

By launch, **Projects had expanded to 10 apps** and **MAU grew 27% to 376K**, with 82% of users on paid plans.

<!-- IMAGE: Hero — Projects view inside Photoshop or the Universal Asset Browser, showing a populated project grid -->

<div class="cs-section-header" id="project-1">
  <div class="cs-section-header__eyebrow">Project 01</div>
  <div class="cs-section-header__title">Projects in the flagship apps</div>
</div>

The strategic call was to ship Projects into Photoshop, Illustrator, and InDesign before the rest of the Adobe ecosystem was fully ready. Getting the surface in front of real users early — even with rough edges — was worth more than waiting for full feature parity. From within Photoshop, users could finally share assets and collaborate across a real file management structure, something the desktop apps had never had.

<div class="cs-nav-anchor" id="cards" data-label="Cards & metadata"></div>

#### Cards & metadata

Projects can contain any file type, and every file has to be visible — hiding unsupported formats would feel like data loss. The card had to communicate provenance (which app made this), sync state, and last-edited metadata in a small footprint that worked in a side panel as well as a full-page grid.

<!-- IMAGE: Card grid showing mixed file types (Ps, Ai, Express, Firefly assets) inside a project -->

For files the host app couldn't open — an Express document inside Photoshop, an Illustrator file inside InDesign — I designed an "Open in another app" view that handed the user off cleanly without making the file feel inaccessible.

<!-- IMAGE: "Open in another app" state, e.g. an .indd file selected inside Photoshop -->

<div class="cs-nav-anchor" id="loading" data-label="Skeleton loading"></div>

#### Skeleton loading, coded in CSS

Project content loads from the cloud, often over slow connections inside a heavy app like Photoshop. A spinner in that context reads as failure. I designed a ghost-loading skeleton that mirrors the card grid — and coded the CSS animation myself rather than handing it off as a spec. The result reads as "content arriving" instead of "app stuck."

<!-- IMAGE: Skeleton loading state, ideally a short loop or before/after frame -->

<div class="cs-nav-anchor" id="navigation" data-label="Navigation, members, delete"></div>

#### Navigation, members, delete

I added a breadcrumb navigation component for moving in and out of nested projects, designed the member-management screens for adding people and assigning roles, and worked through the delete flow — which had to be reassuring without being annoying, since accidental deletes inside a shared workspace cascade across collaborators.

<div class="cs-image-row cs-image-row--2">
  <!-- IMAGE: Breadcrumb navigation inside a project (PS or UAB) -->
  <!-- IMAGE: Member management screen — adding/removing collaborators -->
</div>

<!-- IMAGE: Delete-from-project confirmation flow -->

<div class="cs-nav-anchor" id="onboarding" data-label="Onboarding & empty states"></div>

#### Onboarding & empty states

There are roughly 20 different empty states for Projects across the suite. Some change only the copy — "this project is empty" reads differently in Illustrator than it does in Firefly. Others change the illustration, the primary action, or the surrounding chrome based on which app is hosting it. A user's first time inside a project is the moment Projects either lands as a feature or fades into the chrome, so each variation had to land specifically in its own context.

<!-- IMAGE: Grid of empty-state variations across multiple apps -->

<div class="cs-nav-anchor" id="sync" data-label="Sync simplification"></div>

#### Sync simplification

A large body of work that didn't ship with a marketing moment: redesigning the experience for saving project files for offline use. The previous flow asked users to repeatedly choose offline status, which created a long tail of sync churn — files getting pushed to and pulled from cloud storage in patterns that weren't useful to anyone.

The redesign collapsed those decisions into a saner default sync model.

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
  <div class="cs-section-header__eyebrow">Project 02</div>
  <div class="cs-section-header__title">Connected Enterprise</div>
</div>

Enterprises with hundreds of projects had been asking for a way to give people structured permission to create new projects — and to route those projects into a specific workspace rather than scattering them across the org. Without it, Projects didn't scale past a small team.

<div class="cs-nav-anchor" id="workspaces" data-label="Workspaces & permissions"></div>

#### Workspaces & creation permissions

I designed the flow that allows admins to permit users to create projects, route those projects into a chosen workspace, and — in cases where the creator can't choose — hand off workspace assignment to someone who can. The hard part wasn't any single screen. It was making the permission model legible to a designer who is just trying to start a project, rather than parsing org policy.

<!-- IMAGE: Workspace selection / creation-permission flow -->

<div class="cs-nav-anchor" id="profiles" data-label="Consolidated profiles"></div>

#### Consolidated profiles

Enterprise users often live in multiple workspaces — agency work, freelance, and an in-house brand can all sit under the same Adobe identity. I designed consolidated profiles so a user's projects, workspaces, and permissions surface together in one identity-aware view rather than fragmenting across context-switches.

<!-- IMAGE: Consolidated profile / workspace switcher -->

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
  <div class="cs-stats__item cs-stats__item--gold">
    <span class="cs-stats__number">+61%</span>
    <span class="cs-stats__label">CCI (Individuals) MAU growth — to 174K</span>
  </div>
  <div class="cs-stats__item">
    <span class="cs-stats__number">310K</span>
    <span class="cs-stats__label">Paid MAU — up 27%, 82% of all Projects users</span>
  </div>
</div>

The 82% paid concentration is the signal. Projects pulls users already invested in the suite into a workflow that ties them deeper across apps — exactly the cross-app stickiness the strategy was aiming for.

<div class="cs-nav-anchor" id="what-i-learned" data-label="What I learned"></div>

#### What I Learned

Shipping before the ecosystem is ready is a real design constraint, not a failure mode. Several decisions on cards, file-type handling, and skeleton loading exist because we made the call to ship into Photoshop while other surfaces caught up — and the early feedback from users mid-workflow shaped the rest of the rollout in a way that a polished, simultaneous launch wouldn't have.

The unglamorous work is where the leverage lives. The sync simplification didn't ship with a marketing moment, but it cut data loss by 62% and dropped infrastructure cost by half. Every case study should have at least one of these.

Twenty empty states sounds like a wasted week, but the empty state is the loudest moment in onboarding. Each one is a user's first read on whether this surface is for them.
