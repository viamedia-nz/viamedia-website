# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Via Media automotive marketing website. Being migrated from a single-file static site (`reference.html`) to React + Vite + Tailwind CSS.

## Development

```bash
npm install        # install dependencies
npm run dev        # start dev server on localhost:5173
npm run build      # production build to dist/
npm run preview    # preview production build
```

Deployed on Vercel.

## Architecture

- **Stack**: React 19, Vite 6, Tailwind CSS v4
- **Entry**: `index.html` → `src/main.jsx` → `src/App.jsx`
- **Components**: `src/components/` — landing page sections (Nav, Hero, Services, FAQ, Contact, etc.)
- **Styling**: Tailwind utility classes with custom design tokens in `src/index.css` via `@theme`
- **Reference**: `reference.html` contains the original static site (~1,567 lines) used as visual reference during migration

## Design System (defined in `src/index.css`)

- Fonts: `font-sans` = Montserrat (headings/body), `font-body` = Inter (secondary text)
- Brand colors: `red` (#D4001A), `red-dark` (#A80015), `navy` (#0F2340), `steel` (#2B3A4A)
- Neutrals: `ink` (#111110), `muted` (#6B6A67), `bg` (#F4F3F0), `stone` (#E2E0DC)
- All colors available as Tailwind utilities (e.g. `text-red`, `bg-navy`, `border-stone`)
