# Via Media Website — Project Notes

*Last updated: 17 May 2026 — v5. Hero rebuild complete. Michael's change requests actioned. Contact form wired. Font audit complete. See Section 16 for full session record.*

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
| Forms | Formspree | Contact form: mykoanpz / Audience data form: xzdoqjad |
| Authentication (staff area) | Google OAuth | Phase 2 |
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

### Phase 1 — Core public site (COMPLETE)

**Main scroll (single page):**
- ✅ Nav — Audiences / Services / Insights / About / Contact (red CTA button)
- ✅ Hero — wordmark lockup, eyebrow, H1, sub-headline, stats, two CTAs, diagonal split panel, watermark (see Section 7 for full spec)
- ✅ Client logo scrolling band — white background, full bleed
- ✅ Our Difference — four pillars
- ✅ First-Party Audiences — four brand cards + audience data CTA
- ✅ Who We Work With — three-tier self-selection accordion
- ✅ How We Work — five service panels, horizontal tab navigation
- ✅ Get in Touch — contact form wired to Formspree
- ✅ Footer

**Standalone pages:**
- ✅ About — at `/about`
- ✅ Insights index — at `/insights`
- ✅ Three article pages — at `/insights/[slug]`
- ✅ Audience data request modal — Radix Dialog, triggered from Audiences section CTA

**Outstanding Phase 1 items:**
- [ ] Logo band scroll glitch — occasional jump, deferred to standalone session
- [ ] Logo band scale, ordering, greyscale tightening — deferred to standalone session
- [ ] SEO basics — page titles, meta descriptions, Open Graph tags
- [ ] noindex tags on non-public pages
- [ ] reCAPTCHA v3 re-enable after DNS cutover to viamedia.co.nz
- [ ] Decap CMS setup — final task before DNS cutover
- [ ] Cross-browser checks

### Phase 2 — Staff internal dashboard
### Phase 3 — Client-facing pages
### Phase 4 — Pre-populated editable client records
### Phase 5 — Client campaign reporting
*(Unchanged from v4 — see previous notes for detail)*

---

## 5. Site structure principle — qualify first, explain delivery second

*(Unchanged from v4)*

---

## 6. Confirmed copy — locked decisions

### Navigation
- **Final nav confirmed:** Audiences / Services / Insights / About / Contact (red button)
- Logo top-left functions as Home link — links to `/`

### Hero
- **Lockup:** Via Media wordmark (`viamedia-wordmark-white.svg`) above eyebrow — opening brand element
- **Eyebrow:** Content-Led, Audience-Powered *(comma, no trailing punctuation)*
- **H1:** Automotive Marketing, Built on Audience *(demoted to subhead beneath lockup — full typographic weight maintained)*
- **Sub-headline:** Via Media connects brands with New Zealand's automotive audiences through content, paid media, and search.
- **Stats (in order):** 3.5M+ Audience Contact Points Each Month | 450K+ First-Party Audience Across NZ Automotive | 30+ Years Trusted by NZ Automotive Communities
- **CTAs:** Explore Services → (primary, red) | Our Audiences → (ghost white)

### H1/H2 heading sequence — main landing page

| Position | Heading | Section |
|---|---|---|
| H1 | Automotive Marketing, Built on Audience | Hero |
| H2 | Connected to the Industry | Our Difference |
| H2 | The Audiences Your Customers Already Trust | First-Party Audiences |
| H2 | Solutions to Suit You | Who We Work With |
| H2 | One Brief, Everything Covered | How We Work |
| H2 | Let's Talk About Your Business | Contact |

### Section eyebrows
- Our Difference
- First-Party Audiences
- Who We Work With *(eyebrow)* / Solutions to Suit You *(H2)*
- How We Work
- Get in Touch

### Audience card eyebrows — colour coded
- NZPC: **Consumer** (red)
- NZV8: **Consumer** (red)
- Auto Channel: **Trade** (grey)
- Specialist Sectors: **Consumer & Trade** (red/grey split)

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

### Testimonials — all three tiers confirmed
- Tier 1 (Independent Business): Vincent Offenbaker, Director, American Pickup Parts
- Tier 2 (Regional or Multi-Location): Scott Wood, Director, Harrys Euro *(no apostrophe — intentional, references Fast and Furious)*
- Tier 3 (National Brand or Importer): Frances Vettori, General Manager Marketing, NAPA ANZ

### Footer
- © 2026 Via Media Ltd
- Nav links centred / copyright right-aligned / no logo

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

/* Hero specific */
--hero-left:  #1A1918
--hero-right: #354757
```

### Body text legibility
- Dark background primary: `#D1D5DB`
- Dark background secondary/caption: `#9CA3AF`
- Light background primary: `#4B5563`
- Body leading: `leading-[1.85]` globally

### Typography
- Headings, nav, stats: Montserrat
- Body, captions: Inter
- `text-wrap: pretty` applied globally

### Font sizes — site-wide standard (updated May 2026 font audit)
- Section eyebrows: `text-[11px]`, `tracking-[0.22em]` — applied site-wide
- Primary CTA buttons: `text-[11px]`
- Body copy: `text-[15px]` on dark backgrounds (`text-on-dark` token), `text-dim` (#3e3d3a) on light
- Secondary/caption: `text-muted` (#6b6a67) on light backgrounds
- Testimonial attribution: `text-[13px]`

### Logo usage
- **Nav desktop:** `viamedia-wordmark-black.svg` (background rect paths stripped from SVG)
- **Nav mobile:** `viamedia-mark-black.svg`
- **Hero left panel:** `viamedia-wordmark-white.svg` — complete lockup, single asset only. Do not combine with `viamedia-mark-white.svg`.
- **Hero right panel watermark:** `viamedia-mark-hero-overlay.svg`
- **Contact section desktop:** `viamedia-wordmark-white.svg` at `312px` fixed width
- **Contact section mobile:** `viamedia-wordmark-white.svg` at `clamp(180px, 55vw, 280px)` — full wordmark at all viewport sizes, no mark-only fallback
- **Footer:** no logo

### Get in Touch wordmark SVG fix (May 2026)
- Letter counter shapes (enclosed spaces in a, e, d, i): changed to `fill="none"` — background shows through correctly
- `shape-rendering="geometricPrecision"` and `text-rendering="geometricPrecision"` added to SVG element
- Wordmark must not appear in footer — was incorrectly added by Claude Code and removed

### Hero — full technical spec (May 2026 rebuild)

**This section is critical for any future Claude Code session touching Hero.jsx. Do not simplify the dynamic system.**

**Left panel:**
- Lockup: `viamedia-wordmark-white.svg`, `width: clamp(200px, 22vw, 330px)`, `height: auto`
- Lockup bottom margin and eyebrow bottom margin: same clamp value — `clamp(16px, 1.8vw, 26px)` — equalises gaps above and below eyebrow
- H1: `clamp(42px, 5.2vw, 76px)`, weight 900, line-height 0.97, letter-spacing -0.035em
- "BUILT ON" and "AUDIENCE" lines in red (#D4001A), `display: block`
- Sub-headline: Inter, `clamp(13px, 1.0vw, 15px)`, `rgba(255,255,255,0.52)`, line-height 1.85
- Left panel background: `#1A1918`
- Red left rule: 4px solid `#D4001A`, full hero height, position absolute, left 0

**Split line:**
- `clip-path: polygon(80px 0, 100% 0, 100% 100%, 0% 100%)` — 80px diagonal offset must never change
- Anchored to 1200px container midpoint via ResizeObserver — not 50vw
- Right column does not have `overflow: hidden` — watermark extends freely to right edge of hero

**Right panel:**
- Background: `#354757` applied to split background element, not the column itself
- Watermark: `viamedia-mark-hero-overlay.svg`, opacity `0.06`, sized and positioned dynamically
- Watermark SVG geometry (viewBox 0 0 432 432): VIA letterform top at y=144.07 (33.35% of height), bottom at y=287.965 (66.66%), centre at exactly 50%
- Pin lines: `rgba(255,255,255,0.09)`, 1px height, positioned between stat rows, anchored to VIA letterform zone
- Pin line left boundary: starts at diagonal split line (calculated from `splitLeft` state), extends to right edge of hero (`right: 0`)
- Stat numbers: dynamic font size — `Math.min(80, Math.max(36, Math.floor(pinSpan * 0.55 / 3)))` — intentionally larger than H1
- Stat labels: `clamp(9px, 0.85vw, 12px)` desktop, `11px` fixed mobile
- Diagonal indentation: per-row left padding follows split slope — top row most indented, bottom least

**Dynamic right panel — three sequential requestAnimationFrame frames:**
- Frame 1: measure eyebrow top and sub-headline bottom → position stat block → set provisional font size
- Frame 2 (double rAF): calculate and apply diagonal indentation per row
- Frame 3 (triple rAF): measure row gaps → set pin lines → size watermark from pin line span → position watermark
- All frames guarded: `if (window.innerWidth < 768) reset all state and return`
- Short viewport guard: `statHeight = Math.max(200, calculatedHeight)`

**Stat block anchoring:**
- Top of 3.5M+ numeral aligns with top of eyebrow
- Bottom of 30+ numeral aligns with bottom of sub-headline
- "Years Trusted" caption sits below bottom anchor — outside the measured span
- `firstNumRef` on 3.5M+ numeral div, `lastNumRef` on 30+ numeral div (not row containers)

**Hero height system:**
- `min-height` and `max-height`: `calc(100vh - 68px - ${bandHeight}px)`
- `bandHeight` measured dynamically from logo band element via ResizeObserver — self-corrects on resize
- Short viewport fallback: below 720px viewport height → `height: auto`, no band subtraction, content scrolls naturally
- Mobile: `height: auto`, no band subtraction
- Hero-inner vertical padding: `clamp(40px, 7vh, 88px) top`, `clamp(48px, 8vh, 100px) bottom`

**Mobile hero:**
- Single dark panel, no split, no right panel dynamic calculations
- Lockup: `viamedia-wordmark-white.svg`, `width: clamp(180px, 55vw, 280px)`
- Top padding: 32px, lockup bottom margin: 28px
- Eyebrow: `11px` fixed
- Stat labels: `11px` fixed
- Stats stack below CTAs, pin lines as `border-bottom: 1px solid rgba(255,255,255,0.09)` between rows

### Client logo band
- White background, full bleed
- Scrolling via `transform: translateX`, `will-change: transform`
- Known issue: occasional minor glitch/jump in scroll loop — deferred to standalone session

### Accordion — Solutions to Suit You
- Top border hidden on open panel
- On close: returns to top of Solutions section
- Descriptor line: `text-[15px] text-on-dark` (not opacity modifier — opacity was the legibility problem)
- Bridge CTA below accordion cards: "See How We Work →" anchoring to How We Work section

### Forms — Formspree wiring (May 2026)
- Contact form endpoint: `https://formspree.io/f/mykoanpz`
- Audience data form endpoint: `https://formspree.io/f/xzdoqjad`
- Inline success/error states — no redirect on success
- Hidden field subject lines: "New Enquiry — Via Media Website" / "Audience Data Request — Via Media Website"
- reCAPTCHA v3 disabled — Formshield active as baseline spam protection
- **Re-enable reCAPTCHA v3 after DNS cutover to viamedia.co.nz**

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

Handled entirely in React/Tailwind. Breakpoints: 375px (mobile), 768px (tablet), 1280px (desktop).

**Mobile treatments:**
- Hero: single dark panel, no diagonal split, wordmark lockup above eyebrow, stats stack below CTAs — see Section 7 full spec
- How We Work tabs: horizontally scrollable tab strip
- Audience grid: two columns (tablet), single column (mobile)
- Accordion: works at all sizes as-is
- Nav: hamburger menu, items stack vertically
- Logo band: full bleed at all sizes
- Nav logo: mark only on mobile, full wordmark on desktop
- Contact section: full wordmark at all viewport sizes (not mark-only on mobile)

---

## 10. Brand and tone

- New Zealand English throughout
- Oxford comma
- Space before ellipses
- Space before and after em dashes
- Tone: direct, credible, not promotional. Avoid marketing speak and redundant adjectives.
- Positioning: mid-to-high end.

---

## 11. Search indexing

- All public agency pages: indexed normally
- Staff internal area: noindex + login protection
- Client-facing pages: noindex
- Client report pages: noindex
- Sitemap: public pages only

---

## 12. Workflow

- Planning and copy: Claude.ai project chat
- Build: Claude Code desktop app — `C:\Users\simon\Documents\viamedia-website`
- Claude Code does not auto-push — always run `git push origin main` from VS Code terminal at end of session
- Michael feedback: Simon collects → brings to Claude.ai → implements in Claude Code → pushes → Vercel redeploys → preview URL shared

---

## 13. Next session priorities

1. Logo band: scroll glitch fix, scale adjustments, per-logo vertical centring, manual ordering, greyscale tightening — standalone session
2. Contact section lockup size — review against hero lockup once live on viamedia.co.nz at production viewport sizes
3. SEO basics — page titles, meta descriptions, Open Graph tags
4. noindex tags on non-public pages
5. Decap CMS setup — final task before DNS cutover
6. DNS cutover to viamedia.co.nz — after Michael approves
7. reCAPTCHA v3 re-enable — after DNS cutover
8. CAANZ / NZ industry association membership check — add to footer or About if applicable
9. Media kit / audience profile page — confirmed next deliverable after launch
10. About page visual block — separate design task
11. Cross-browser checks

---

## 14. Project files and assets

### Asset locations in the React build
- Brand assets: `public/logos/`
- Client logos: `public/logos/client/`
- Favicon files: `public/` (root level)

### Via Media brand assets
- `viamedia-wordmark-black.svg` — nav desktop (background rect removed)
- `viamedia-wordmark-white.svg` — hero left panel, contact section, dark backgrounds
- `viamedia-mark-black.svg` — nav mobile
- `viamedia-mark-white.svg` — general dark background use
- `viamedia-mark-hero-overlay.svg` — hero right panel watermark
- Favicon set: svg, ico, 32px png, apple-touch-icon, 192px png

### Reference files in project root
| File | Purpose | Status |
|---|---|---|
| index.html | v5 desktop mockup — visual reference only | Current |
| CLAUDE.md | Claude Code context file | Current — update after each session |
| viamedia-project-notes.md | This file | Current |
| viamedia-logo-band-spec.md | Client logo band technical spec | Current |
| viamedia-website-copy.docx | Full site copy including articles | Current — not committed to GitHub |

---

## 15. What is deliberately out of scope

- NZPC and NZV8 WordPress/Elementor sites — separate project
- HubSpot CRM tidying and pipeline setup — separate project
- Monday.com dashboards — separate project
- Looker Studio reporting build — separate project
- AI agent / internal chat assistant — separate project

---

## 16. Session record

### Session 1 — 13 April 2026
Full React build scaffolded and deployed. All Phase 1 sections built. Mobile responsive pass complete. Micro-interactions added. Live at viamedia-website.vercel.app.

### Session 2 — May 2026 (Michael's change requests + hero rebuild)

**Michael's change requests — disposition:**

| Request | Outcome |
|---|---|
| Nav logo too small | Not changed — brand presence addressed via hero lockup instead |
| Logo band scale/glitch | Deferred — standalone session required |
| Main heading copy change | Not changed — H1 demoted to subhead beneath lockup instead |
| Hero watermark: make smaller, lift top right | Counter-proposal: opacity reduced to 0.06, size and position now dynamic |
| Audience boxes: labels bigger, all red | Colour-coded instead — Consumer red, Trade grey. Sizes increased. |
| Media kit CTA: make red | Outlined red, solid on hover. Renamed to "audience data" language. |
| Solutions accordion: colour and font size | Descriptor at 15px text-on-dark, body contrast increased, structure revised |
| "One Brief" move above Solutions | Order unchanged. Bridge CTA "See How We Work →" added below accordion. |
| Our Work / case studies in nav | Deferred to Phase 2 |

**Additional changes completed:**
- Insights page nav alignment fixed
- Contact form Android layout fixed
- Both forms wired to Formspree — confirmed submitting to Google Groups inbox
- Get in Touch wordmark SVG letter counter fill fixed, geometric precision rendering added
- Testimonials updated — all three tiers confirmed with final attributions
- Pillar 3 copy fix: "it keeps finding new ones" → "it keeps on finding new audiences"
- Font audit: eyebrows 11px site-wide, CTA buttons 11px, body leading 1.85, attribution 13px, body copy tokens standardised

**Hero rebuild — completed across 11 iterations (V1–V11):**
- Wordmark lockup added above eyebrow as opening brand element
- Dynamic right panel system implemented — stat sizing, watermark sizing, pin line positioning all calculated at runtime
- Pin lines anchored to exact VIA letterform SVG coordinates (y=144.07 top, y=287.965 bottom)
- Hero height dynamically accounts for logo band — band visible on first load at viewports above 720px height
- Short viewport fallback below 720px — content sizes naturally, band reveals on scroll
- Mobile hero: corrected spacing, fixed 11px font sizes for eyebrow and stat labels

---

*End of document — v5, 17 May 2026.*