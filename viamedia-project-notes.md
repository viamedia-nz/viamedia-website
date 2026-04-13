# Via Media Website — Project Notes

*Last updated: 13 April 2026 — Session 1 React build (full site built and deployed to Vercel). This is the primary reference document for the Via Media website build. Update it as decisions are made or scope changes. Version number increments with each session: this is v4.*

---

## 1. Project purpose

Build a new public-facing website for Via Media (viamedia.co.nz) that positions the company as a credible, mid-to-high-end automotive marketing agency in New Zealand. The site must clearly communicate that Via Media owns its audiences and channels — not just distribution platforms — and has done so for 30+ years.

The site is not a car site. It is a marketing agency site that operates in the automotive sector.

---

## 2. Tech stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | React 19 + Vite 6 | Scaffolded and running |
| Styling | Tailwind CSS v4 | Utility-first, responsive by design |
| Components | Radix UI primitives | shadcn/ui not used — Tailwind v4 compatibility issue; Radix Dialog used directly for modal |
| Code repository | GitHub | viamedia-nz organisation account — github.com/viamedia-nz/viamedia-website (public repo) |
| Hosting | Vercel | Free Hobby plan; auto-deploys on push to main |
| CMS (content) | Decap CMS | Not yet implemented — Phase 2 |
| Forms | TBC | Contact form built but not yet wired to a submission endpoint |
| Authentication (staff area) | Google OAuth | Staff log in with their viamedia.co.nz Google Workspace accounts — Phase 2 |
| Client forms | HubSpot embedded forms | Phase 3 |
| Client reporting data | Google Sheets | Phase 5 |

---

## 3. Hosting and infrastructure

- Live preview URL: `viamedia-website.vercel.app` — use this for Michael's review
- Repo: `github.com/viamedia-nz/viamedia-website` — public
- Local project folder: `C:\Users\simon\Documents\viamedia-website`
- Domain: viamedia.co.nz — DNS to be pointed to Vercel once Michael approves the site
- Auto-deploys on every `git push origin main`
- No WordPress involved in this build

---

## 4. Site structure — phases

### Phase 1 — Core public site (BUILT — Session 1, 13 April 2026)

**Main scroll (single page — localhost:5173 / viamedia-website.vercel.app):**
- ✅ Nav — Audiences / Services / Insights / About / Contact (red CTA button)
- ✅ Hero — eyebrow, H1, stats, two CTAs, diagonal split panel, Via Media mark watermark
- ✅ Client logo scrolling band — white background, full bleed
- ✅ Our Difference — four pillars
- ✅ First-Party Audiences — four brand cards + media kit CTA
- ✅ Who We Work With — three-tier self-selection accordion
- ✅ How We Work — five service panels, horizontal tab navigation
- ✅ Get in Touch — contact form with service area dropdown
- ✅ Footer — nav links centred, copyright right-aligned, no logo

**Standalone pages:**
- ✅ About — at `/about`, full-width text layout, 30+ stat block with timeline, client logo band
- ✅ Insights index — at `/insights`
- ✅ Three article pages — at `/insights/[slug]`, full article copy loaded from viamedia-website-copy.docx
- ✅ Media kit request modal — Radix Dialog, triggered from Audiences section CTA

### Phase 2 — Staff internal dashboard
- Google Workspace OAuth login (viamedia.co.nz accounts only)
- noindex on all internal pages

### Phase 3 — Client-facing pages
- HubSpot embedded forms
- noindex

### Phase 4 — Pre-populated editable client records
- HubSpot API integration

### Phase 5 — Client campaign reporting
- Google Sheets as source of truth (one row per report)
- Vercel serverless function fetches sheet at request time
- Make scenario automates row creation when Looker Studio report is ready
- Permanent per-report URLs: `viamedia.co.nz/clients/[client-slug]/[report-period]`
- noindex on all report pages

---

## 5. Site structure principle — qualify first, explain delivery second

The page sequence follows a proven B2B conversion flow. A prospect arriving at the site is not ready to absorb service detail until they have first established that Via Media operates in their world and serves businesses like theirs.

The four-stage journey the site takes them through is:

1. **Credibility** — Do these people know my industry and my customers? *(Our Difference, First-Party Audiences)*
2. **Relevance** — Is this right for a business at my scale and with my objectives? *(Who We Work With — self-selection accordion)*
3. **Delivery** — How does it actually work in practice? *(How We Work — service detail)*
4. **Action** — I'm ready to have a conversation. *(Contact)*

The Services nav item links to Who We Work With (Solutions to Suit You) rather than How We Work, because self-selection is the entry point to the services journey.

---

## 6. Confirmed copy — locked decisions

### Navigation
- **Final nav confirmed:** Audiences / Services / Insights / About / Contact (red button)
- "Contact" is styled as the red CTA button
- Logo top-left functions as Home link — links to `/`

### Hero
- **Eyebrow:** Content-Led, Audience-Powered *(comma, no trailing punctuation)*
- **H1:** Automotive Marketing, Built on Audience
- **Sub-headline:** Via Media connects brands with New Zealand's automotive audiences through content, paid media, and search.
- **Stats (in order):** 3.5M+ Audience Contact Points Each Month | 450,000+ First-Party Audience Across NZ Automotive | 30+ Years Trusted by NZ Automotive Communities
- **CTAs:** Explore Services → (primary, red) | Our Audiences → (ghost white)
- Hero panel toggle removed — steel dark panel only

### H1/H2 heading sequence — main landing page

| Position | Heading | Section |
|---|---|---|
| H1 | Automotive Marketing, Built on Audience | Hero |
| H2 | Connected to the Industry | Our Difference |
| H2 | The Audiences Your Customers Already Trust | First-Party Audiences |
| H2 | Solutions to Suit You | Who We Work With |
| H2 | One Brief, Everything Covered | How We Work |
| H2 | Let's Talk About Your Business | Contact |

### Section eyebrows (confirmed labels)
- Our Difference
- First-Party Audiences
- Who We Work With *(eyebrow)* / Solutions to Suit You *(H2)*
- How We Work
- Get in Touch

### Audience card eyebrows
- NZPC: **Consumer**
- NZV8: **Consumer**
- Auto Channel: **Trade**
- Specialist Sectors: **Consumer & Trade**

### How We Work tab labels and panel headings

| Tab label | Panel heading |
|---|---|
| Content | Content & Channels |
| Paid Media | Lead Generation & Paid Media |
| Search | Organic Search & Discovery |
| Audience Strategy | Audience Intelligence & Strategy |
| Activations | Activations & Events |

### Contact form service dropdown options
- Select a service area *(greyed placeholder — not selectable)*
- Content & Channels
- Lead Generation & Paid Media
- Organic Search & Discovery
- Audience Intelligence & Strategy
- Activations & Events
- Not sure yet

### Media kit modal
- Triggered from Audiences section CTA
- Fields: Name, Company, Email, checkboxes for NZPC / NZV8 / Auto Channel / Specialist Sectors
- Submit button: "Request Media Kit →"
- Via Media mark (not wordmark) top-left of modal

### Footer
- © 2026 Via Media Ltd
- Layout: nav links centred / copyright right-aligned / no logo
- Single row

### Insights article dates
- Article 1 (Search & Discovery): 30 January 2026
- Article 2 (Media & Strategy): 23 February 2026
- Article 3 (Media & Audience): 11 March 2026

---

## 7. Design decisions — locked

### Colour palette (CSS variables)
```css
--white:     #FFFFFF
--off:       #F4F3F0   /* page background, warm ivory */
--stone:     #E2E0DC   /* Carrara — About page bg */
--slate:     #6B7280   /* body text light bg */
--navy:      #0F2340   /* dark sections */
--steel:     #1C2B3A   /* hero left panel */
--red:       #D4001A   /* brand accent, CTAs */
--charcoal:  #1A1A1A   /* headings */
```

### Body text legibility (updated Session 1)
- Dark background body text: `#D1D5DB`
- Dark background secondary/caption text: `#9CA3AF`
- Light background body text: `#4B5563` (unchanged from Tailwind default)

### Typography
- Headings, nav, stats: Montserrat
- Body, captions: Inter
- `text-wrap: pretty` applied globally to prevent single-word orphans

### Logo usage
- **Nav desktop:** `viamedia-wordmark-black.svg` — white background removed from SVG (background rect paths stripped)
- **Nav mobile:** `viamedia-mark-black.svg`
- **Hero watermark:** `viamedia-mark-hero-overlay.svg`
- **Contact section desktop:** `viamedia-wordmark-white.svg` — sized at ~1.5–2x nav size
- **Contact section mobile:** `viamedia-mark-white.svg`
- **Footer:** no logo

### Client logo band
- White background — not off-white or grey
- Full bleed — no border lines, no label
- Scrolling animation — GPU-accelerated via `transform: translateX` and `will-change: transform`
- **Known issue:** occasional minor glitch/jump in scroll loop — to be revisited in Session 2

### Accordion — Solutions to Suit You
- Top border hidden on open panel
- Additional padding above expanded content
- On close: returns to top of Solutions section (deliberate UX decision — allows user to easily select another tier)

### How We Work tabs
- Selected tab: red underline on active tab label
- No vertical accent on panel heading

### About page
- Full-width single column text layout
- 30+ stat block: ~50–60% width, left-aligned, with timeline (1990s — 2000s — 2010s — 2022 — Today)
- Client logo band at bottom: full bleed, no label, no border
- No "Reaching NZ automotive audiences" label

### Scroll behaviour
- CSS scroll snap on main page sections: `scroll-snap-type: y mandatory`
- Smooth scroll on all anchor links
- Fade-up IntersectionObserver animations on scroll
- Nav shadow appears on scroll, disappears at top

---

## 8. Design principles

1. Premium first impression — hero impact, halo effect carried through scroll
2. Low cognitive load — H2-led story, clean section transitions
3. Micro-interactions — hover states, fade-ins, accordion/tab transitions signal quality
4. No photography with opacity overlays
5. Primarily typographic and work-sample-based imagery
6. Car photography not used as decoration

---

## 9. Responsive design

Handled entirely in React/Tailwind.

**Implemented breakpoints:** 375px (mobile), 768px (tablet), 1280px (desktop)

**Mobile treatments:**
- Hero: single dark panel, no diagonal split, stats stack below copy
- How We Work tabs: horizontally scrollable tab strip
- Audience grid: two columns (tablet), single column (mobile)
- Accordion: works at all sizes as-is
- Nav: hamburger menu, items stack vertically
- Logo band: full bleed at all sizes
- Nav logo: mark only on mobile, full wordmark on desktop
- Contact section: mark only on mobile, wordmark on desktop

---

## 10. Brand and tone

- New Zealand English throughout
- Oxford comma
- Space before ellipses
- Space before and after em dashes
- Style guide excerpt to be uploaded when available
- Tone: direct, credible, not promotional. Avoid marketing speak and redundant adjectives.
- Positioning: mid-to-high end.

---

## 11. Search indexing

- All public agency pages: indexed normally
- Staff internal area: noindex meta tag + login protection
- Client-facing pages: noindex meta tag
- Client report pages: noindex meta tag
- Sitemap to be generated for public pages only

---

## 12. Workflow

- Planning and copy: Claude.ai project chat (this interface)
- Build: Claude Code desktop app (Code tab) — pointed at `C:\Users\simon\Documents\viamedia-website`
- Claude Code works in a worktree (`claude/relaxed-aryabhata`) — changes must be pushed to main via `git push origin main` from VS Code terminal at end of session
- Michael feedback: Simon collects, brings to Claude, changes pushed, Vercel redeploys, preview URL shared
- Copy changes are trivial in this stack

**Important Git note:** Claude Code desktop app does not always auto-push to GitHub. Always run `git push origin main` from VS Code terminal at the end of a build session to ensure Vercel has the latest build.

**Pre-build checklist — all complete:**
- [x] GitHub repo created under Via Media organisation account (viamedia-nz)
- [x] Vercel account connected to GitHub repo (Hobby/free plan)
- [x] React + Vite + Tailwind CSS scaffolded
- [x] CLAUDE.md created with full project context
- [x] Client logo PNGs in `public/logos/client/`
- [x] Via Media SVG/PNG brand assets in `public/logos/` and `public/`
- [x] viamedia-logo-band-spec.md in project root
- [x] viamedia-website-copy.docx in project root (for article content — not committed to GitHub)
- [x] All sections built and deployed
- [x] Mobile responsive pass complete
- [x] Micro-interactions and scroll animations added
- [x] Live preview URL confirmed working: viamedia-website.vercel.app

---

## 13. Session 2 — next steps

**Priority fixes before Michael review:**
- [ ] Logo band scroll glitch — occasional jump needs a cleaner loop solution
- [ ] Contact form submission endpoint — currently unconnected (Formspree or Make webhook)
- [ ] SEO basics — page titles, meta descriptions, Open Graph tags
- [ ] noindex tags on any non-public pages

**Michael review process:**
1. Share `viamedia-website.vercel.app` with Michael
2. Collect feedback
3. Bring feedback to Claude.ai chat — plan changes
4. Implement via Claude Code desktop app
5. Push to GitHub → Vercel auto-redeploys

**Post-Michael-review tasks:**
- Connect viamedia.co.nz domain in Vercel DNS settings
- CAANZ or NZ industry association membership check — add to footer/About if applicable
- Media kit / audience profile page build (confirmed next deliverable after launch)
- About page visual block — replace stat/timeline placeholder with properly designed graphic

---

## 14. Project files and assets

### Asset locations in the React build
- Brand assets (SVG logos, marks): `public/logos/`
- Client logos: `public/logos/client/`
- Favicon files: `public/` (root level)

### Via Media brand assets
- `viamedia-wordmark-black.svg` — nav desktop, light backgrounds (background rect removed from SVG)
- `viamedia-wordmark-white.svg` — contact section, dark backgrounds
- `viamedia-mark-black.svg` — nav mobile, light backgrounds
- `viamedia-mark-white.svg` — dark backgrounds
- `viamedia-mark-hero-overlay.svg` — hero right panel watermark
- Favicon set: svg, ico, 32px png, apple-touch-icon, 192px png

### Reference files in project root
| File | Purpose | Status |
|---|---|---|
| index.html | v5 desktop mockup — visual reference only, do not modify | Current |
| CLAUDE.md | Claude Code context file | Current |
| viamedia-project-notes.md | This file | Current |
| viamedia-logo-band-spec.md | Client logo band technical spec | Current |
| viamedia-website-copy.docx | Full site copy including all three articles | Current — not committed to GitHub |

---

## 15. What is deliberately out of scope for this project

- The consumer-facing NZPC and NZV8 WordPress/Elementor sites — separate project
- HubSpot CRM tidying and pipeline setup — separate project
- Monday.com dashboards — separate project
- Looker Studio reporting build — separate project
- AI agent / internal chat assistant — separate project

The brand kit and design language established here should flow into all of the above once locked.

---

*End of document — v4, 13 April 2026.*
