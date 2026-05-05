---
URLpath: /firefly-generation-history
title: Firefly Generation History
date: 2025-02-15
description: Designed Generation History's shift from browser cache to cloud,
    delivering persistent asset storage and cross-app access for 900M+ Firefly
    generations.
tags: Adobe / Product Design
timePeriod: Jan–Feb 2025
---

<div class="cs-nav-anchor" id="overview" data-label="Overview"></div>

#### Overview

Firefly is Adobe's AI asset generation platform for images, video, audio, and more. Generation History is where these assets live. Before this project, those assets lived solely in the browser's cache, on a single machine, gone the moment you cleared your cookies.

I led design on the transformation of Generation History, moving it from a browser artifact to a persistent cloud collection, providing a set of actions (sharing, favoriting, downloading, and more), and extending it into Adobe's flagship apps so users could continue work across tools without having to download the assets.

The page supported **900M+ generations** to date. After launch, MAU grew by 56% and asset reuse by 61%.

<img src="/generationHistory/Main%20gen%20history.png" alt="Firefly Generation History — cloud-stored asset grid with action controls" />

<div class="cs-nav-anchor" id="the-problem" data-label="The problem"></div>

#### The problem

The original Generation History was stored in the browser's cache and was accessible only on the device where it was created. Clear your cache or switch devices, and your history will be gone. There was no way to return to a generation, share it with someone, or bring it into Photoshop without downloading and manually re-importing it.

The gap mattered more than it might seem. Firefly is positioned as a creative starting point, a place to generate the raw material that gets refined in Illustrator, composited in Photoshop, or animated in Express.

> The design challenge: move an ephemeral, cache-bound system to a persistent cloud model, then build the interface that makes that shift feel like a feature rather than infrastructure.

<div class="cs-nav-anchor" id="cards-and-actions" data-label="Cards & actions"></div>

#### Cards & actions

The foundation of Generation History is the card: how a generated asset is displayed, identified, and acted on. I designed cards to work across three asset types (image, video, audio) using our design system and adapting it to surface the right metadata and the right actions without overloading the UI.

The action set for each asset:

- **Share** — Generate a public link for sharing generations outside of Adobe
- **Favorite** — Bookmark individual assets for quick access in the favorites tab
- **Copy link** — Copy a direct URL to a specific generation
- **Add to / Move** — Send assets to CC Libraries or other collections
- **Download** — In original format, per asset type
- **Delete** — With confirmation state to prevent accidental loss
- **Open in** — Continue work in Boards, Photoshop Web, or Express directly from a generation

<div class="cs-image-row cs-image-row--2">
  <img src="/generationHistory/Actions%20in%20Firefly.png" alt="Action menu on a Generation History card in Firefly" />
  <img src="/generationHistory/Sharing%20a%20public%20link.png" alt="Sharing a public link from a Generation History asset" />
</div>

Error states were a meaningful part of the surface: failed cloud loads, assets that couldn't be retrieved, and expired share links. Each needed a design response that didn't leave users guessing.

<div class="cs-nav-anchor" id="cross-app" data-label="Cross-app"></div>

#### Generation History in flagship apps

The second phase extended Generation History beyond Firefly.com and into the flagship Adobe applications, where our users do the majority of their work. I designed a new Generation History tab for apps, including Photoshop, giving users direct access to their cloud-stored assets without leaving the tool.

<img src="/generationHistory/Add%20from%20gen%20history%20within%20PS%20desktop.png" alt="Generation History panel open within Photoshop desktop" />

The intent was to eliminate the download-and-import step entirely. A user could generate a background in Firefly, switch to Photoshop, and place it directly from their history. The card system designed for the web had to adapt to a constrained panel width and a different workflow intent.

<img src="/generationHistory/Add%20from%20gen%20history%20PS.png" alt="Adding an asset from Generation History into a Photoshop document" />

<div class="cs-nav-anchor" id="constraints" data-label="Constraints & tradeoffs"></div>

#### Constraints & tradeoffs

1. **Fixed deadlines, limited engineering scope**

   Two non-negotiable ship dates — Adobe MAX London and Adobe MAX Los Angeles — shaped the entire project. Engineering bandwidth was constrained, specifically around how much the card component could change. I mapped which design decisions were load-bearing (asset type differentiation, action availability states, error handling) versus cosmetic (card proportions, thumbnail treatment) and prioritized the former to keep the engineering path clear.

2. **Three asset types, one system**

   Designing for image, video, and audio simultaneously without creating three divergent systems. Shared card components meant shared interaction patterns — differentiation between asset types lived in metadata and actions, not card architecture.

<div class="cs-nav-anchor" id="impact" data-label="Impact"></div>

#### Impact

<div class="cs-stats">
  <div class="cs-stats__item cs-stats__item--blue">
    <span class="cs-stats__number">900M+</span>
    <span class="cs-stats__label">Generations stored across image, video, and audio</span>
  </div>
  <div class="cs-stats__item">
    <span class="cs-stats__number">56%</span>
    <span class="cs-stats__label">MAU growth post-MAX — 1.89M → 2.37M</span>
  </div>
  <div class="cs-stats__item">
    <span class="cs-stats__number">61%</span>
    <span class="cs-stats__label">Generation asset reuse MAU growth — 759K → 1.19M</span>
  </div>
  <div class="cs-stats__item">
    <span class="cs-stats__number">13.5% → 16.1%</span>
    <span class="cs-stats__label">Reuse penetration as a share of Firefly MAU</span>
  </div>
</div>

The reuse number is what matters. MAU tells you people showed up; reuse tells you they did something with what they found. The 61% growth in generation asset reuse (assets pulled from Generation History into another tool) is the signal that the cross-app integration landed as intended.

<div class="cs-nav-anchor" id="what-i-learned" data-label="What I learned"></div>

#### What I Learned

1. **The shift was about intent, not storage**

   Moving Generation History to the cloud was the enabling infrastructure, but the growth in reuse only happened because the assets were surfaced where work actually happens. Embedding Generation History in Photoshop wasn't an incremental improvement — it was a different product proposition: your Firefly outputs as a resource within your existing Creative Cloud workflow.

2. **Constraints clarify what the design actually depends on**

   Designing under a shared system with limited engineering time forced useful prioritization. When you can't change everything, you have to decide what the design actually depends on. That pressure clarified which decisions were about the experience and which were about appearance. The card system is better for it.

3. **A unified model beats type-by-type design every time**

   Designing for three asset types at once is harder than it looks, and easier than doing it three times separately. Starting from a unified model — same card, same action patterns, differentiation only where truly needed — produced a system that's extensible in ways a type-by-type approach wouldn't have been.
