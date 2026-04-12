# CLAUDE.md

This file provides guidance to Claude Code when working on the Via Media website build.

## Project overview

Via Media is a New Zealand automotive marketing agency. This is their public-facing agency website (viamedia.co.nz) — not a car site. It positions Via Media as a mid-to-high-end marketing partner that owns its audiences and channels across the NZ automotive sector.

The site is being built in React + Vite + Tailwind CSS and deployed to Vercel via GitHub (viamedia-nz organisation).

## Tech stack

- Framework: React + Vite
- Styling: Tailwind CSS
- Components: shadcn/ui
- Hosting: Vercel (auto-deploys on push to main)
- Repo: github.com/viamedia-nz/viamedia-website
- CMS: Decap CMS (phase 2)
- Forms: Formspree or Make webhook
- Auth (staff area): Google OAuth (viamedia.co.nz accounts only)

## Visual reference

`index.html` in the project root is the v5 desktop HTML mockup — use this as the primary visual and copy reference for all React component work. Do not modify it. Port sections from it into React components.

## Site structure — Phase 1 (current build priority)

Single-page main landing page with these sections in order:
1. Nav — Audiences / Services / Insights / About / Contact (red CTA button)
2. Hero — eyebrow, H1, stats, two CTAs
3. Client logo scrolling band
4. Our Difference — four pillars
5. First-Party Audiences — four brand cards + media kit CTA
6. Who We Work With — three-tier self-selection accordion
7. How We Work — five service panels, horizontal tab nav
8. Get in Touch — contact form
9. Footer

Standalone pages:
- About / Our Story
- Insights index + three article pages

## Confirmed copy — key locked decisions

**Nav:** Audiences / Services / Insights / About / Contact
**Hero eyebrow:** Content-Led, Audience-Powered
**Hero H1:** Automotive Marketing, Built on Audience
**Hero sub-headline:** Via Media connects brands with New Zealand's automotive audiences through content, paid media, and search.
**Hero stats:** 3.5M+ Audience Contact Points Each Month | 450,000+ First-Party Audience Across NZ Automotive | 30+ Years Trusted by NZ Automotive Communities
**Hero CTAs:** Explore Services (primary red) | Our Audiences (ghost white)

## Design system

```css
--white:   #FFFFFF
--off:     #F4F3F0   /* page background, warm ivory */
--stone:   #E2E0DC   /* Carrara — hero right panel, About bg */
--slate:   #6B7280   /* body text */
--navy:    #0F2340   /* dark sections */
--steel:   #1C2B3A   /* hero left panel */
--red:     #D4001A   /* brand accent, CTAs */
--charcoal:#1A1A1A   /* headings */
```

Fonts: Montserrat (headings, nav, stats), Inter (body, captions)

## Asset locations in the React build

- Brand assets (SVG logos, marks): `public/logos/`
- Client logos: `public/logos/client/`
- Favicon files: `public/` (root level)

## Brand assets available

- `viamedia-wordmark-black.svg` — nav (light bg), desktop
- `viamedia-wordmark-white.svg` — hero, footer, dark sections
- `viamedia-mark-black.svg` — nav mobile, light bg
- `viamedia-mark-white.svg` — dark bg use
- `viamedia-mark-hero-overlay.svg` — hero right panel watermark
- Favicon set: svg, ico, 32px png, apple-touch-icon, 192px png

## Indexing rules

- Public agency pages: indexed normally
- Staff internal area: noindex + login protection
- Client-facing pages: noindex
- Client report pages: noindex

## Language and tone

- New Zealand English
- Oxford comma
- Space before ellipses
- Space before and after em dashes
- Tone: direct, credible, not promotional
- No marketing speak, no redundant adjectives

## Workflow

Simon builds with Claude Code only — no other team members involved in the build. Changes pushed to GitHub trigger automatic Vercel redeploys. Preview URL shared with Michael (director) for review before going live.