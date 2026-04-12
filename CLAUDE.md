# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Via Media automotive marketing website. Single-page static site — one `index.html` file containing all HTML, CSS, and JavaScript. No build tools, no package manager, no framework.

## Development

No build step. Open `index.html` directly in a browser or use any static file server:

```bash
npx serve .
# or
python -m http.server 8000
```

Deployed on Vercel (hence the file is named `index.html`).

## Architecture

Everything lives in `index.html` (~1,567 lines):

- **CSS** (lines ~9–900): CSS custom properties in `:root`, responsive design via media queries, scroll animations (`.fade-up` / `.visible`)
- **HTML** (lines ~900–1517): Fixed nav, hero with split-panel toggle, services tabs, FAQ accordion, client logos, contact section
- **JavaScript** (lines ~1518–1565): Vanilla JS — nav scroll shadow, IntersectionObserver for fade-up animations, hero panel toggle, services tab switching, FAQ accordion

Key interactive patterns:
- `setHeroPanel(mode)` — toggles hero background between steel/carrara
- `showService(id, el)` — tab-based service panel switcher
- `toggleAccordion(trigger)` — single-open accordion for FAQ

## Design System

- Fonts: Montserrat (headings/body), Inter (secondary)
- Colors: `--red: #D4001A` (brand accent), `--navy: #0F2340`, `--steel: #2B3A4A`, `--bg: #F4F3F0`
- All styling uses CSS custom properties defined in `:root`
