# Via Media — Client Logo Band: Technical Specification
## Prepared: April 2026
### For reference during HTML mockup update and React/Vite site build

---

## Asset summary

- **47 processed logo files** — stored in `client-logos.zip` (download from this session)
- **File format:** PNG, transparent background
- **Naming convention:** `logo-[brand-name].png` (lowercase, hyphenated, e.g. `logo-ac-delco.png`)
- **Destination in build:** `public/logos/client/`

---

## Image processing — how logos were produced

All logos were processed through a Python/Pillow pipeline with the following treatment:

### Greyscale conversion
- All colour logos converted to greyscale using luminance-weighted formula: `lum = 0.299R + 0.587G + 0.114B`
- Remapped to a compressed range of **45–185** (not 0–255) to prevent any logo going full black or full white
- This keeps all logos tonally consistent on the site's `--bg` colour (`#F4F3F0`)
- Pre-converted greyscale source files (e.g. Supercheap, Valvoline, Beach Hop, Mount Shop) were still passed through the remap to normalise them into the same tonal range

### Background removal
- Dark/black backgrounds: pixels with luminance < 30 set to transparent
- Light/white backgrounds: pixels with luminance > 245 set to transparent
- Checker/transparent-pattern backgrounds (e.g. Mobil, Subaru, Exedy): pixels with luminance > 200 set to transparent
- Solid colour backgrounds (e.g. Mount Shop yellow): colour-distance threshold removal
- SVG sources (AC Delco, Capricorn, Spark Foundry): rendered via CairoSVG at 4× then downsampled

### Autocrop
- After background removal, each logo is cropped to its content bounding box before resizing
- Crop threshold: luminance < 220 and alpha > 10

### Artifact cleanup
- Connected-component analysis (scipy.ndimage) run on every logo
- Pixel clusters smaller than 20px removed to eliminate stray compression noise

---

## Canvas and sizing

### Canvas dimensions
- **Output height:** 160px (2× of 80px display height — retina-ready)
- **Padding:** 16px top, bottom, left, right (built into each canvas)
- **Inner usable height:** 128px (160 − 32px padding)
- Width is proportional — logos are not forced to a fixed width

### Fill fractions (logo height as proportion of inner 128px)
Most logos render at `fill_frac = 1.0` (full 128px inner height). The following have overrides:

| Logo | Fill fraction | Reason |
|---|---|---|
| Atomic 212 | 0.70 | Very wide wordmark — reduced to balance band |
| Capricorn | 0.75 | Wide SVG mark — reduced with padding |
| Downtime Entertainment | 0.75 | Reduced to match Capricorn treatment |
| Mindshare | 0.70 | Oversized wordmark |
| Mobil | 0.80 | Slightly oversized |
| Niterra | 0.78 | Slightly oversized |
| Mito | 0.78 | Matches Mindshare/Mobil treatment |
| Premier Events | 0.72 | Reduced + lighter greyscale remap (80–175) |
| AC Delco | 0.90 | Slightly reduced |
| Classic Cover | 1.10 | Grown to match context |
| Blackfern | 1.20 | Badge logo — grown for visual parity |
| NAPA | 1.10 | Badge logo |
| Penrite | 1.10 | Badge logo |
| Rapid Media | 1.10 | Badge logo |
| YHI | 1.10 | Badge logo |
| Mount Shop | 0.95 | Cropped tight source — sized to avoid top/bottom clipping |
| BAC Systems | 1.10 | Slightly grown |
| George Stock | 1.12 | Slightly grown |
| Holden | 1.12 | Slightly grown for visual presence |
| AC Delco | 1.15 (then revised to 0.90) | Final: 0.90 |

---

## Scrolling band — CSS/JS implementation notes

### Padding between logos in the marquee
Logos are classified into two groups based on rendered width:

- **Compact** (width ≤ 340px — badge/circular/short logos): **56px padding each side**
- **Wide** (width > 340px — wordmarks): **36px padding each side**

Compact logos get more horizontal breathing room so they don't feel crowded between wide neighbours.

Current compact logos (≤ 340px rendered width):
`logo-audi`, `logo-blackfern`, `logo-bmw`, `logo-brown-watson`, `logo-george-stock`, `logo-holden`, `logo-infinitev`, `logo-meguiars`, `logo-mito`, `logo-mount-shop`, `logo-napa`, `logo-penrite`, `logo-rapid-media`, `logo-rare-spares`, `logo-smits-group`, `logo-subaru`, `logo-toyota`, `logo-valvoline`, `logo-yhi`

### Randomised display order
Logos should be displayed in a randomised order (not alphabetical). Suggested order for the CSS marquee (seeded random, fixed for consistency):

1. logo-napa
2. logo-mann-hummel
3. logo-meguiars
4. logo-beach-hop
5. logo-holden
6. logo-bapcor
7. logo-niterra
8. logo-spark-foundry
9. logo-bmw
10. logo-aecs
11. logo-ryco
12. logo-atomic-212
13. logo-toyota
14. logo-mito
15. logo-blackfern
16. logo-rapid-media
17. logo-mount-shop
18. logo-yhi
19. logo-experience-gold-coast
20. logo-penrite
21. logo-wtac
22. logo-premier-events
23. logo-smits-group
24. logo-mindshare
25. logo-harrys-euro
26. logo-infinitev
27. logo-subaru
28. logo-tyrewise
29. logo-1st-auto-parts
30. logo-george-stock
31. logo-downtime-entertainment
32. logo-supercheap
33. logo-brown-watson
34. logo-sp-tools
35. logo-valvoline
36. logo-ace-auto-parts
37. logo-mobil
38. logo-audi
39. logo-rare-spares
40. logo-auto-master
41. logo-bac-systems
42. logo-capricorn
43. logo-classic-cover
44. logo-exedy
45. logo-ac-delco
46. logo-autoserv
47. logo-sunday-drive

Alternatively, shuffle order in JS on page load for true randomisation — preferable for the live site so repeat visitors see variation.

### CSS marquee implementation (reference)
The band should use a CSS infinite scroll animation rather than JS-driven scrolling for performance. Basic pattern:

```css
.logo-band {
  overflow: hidden;
  white-space: nowrap;
  background: var(--white); /* or --bg */
}

.logo-track {
  display: inline-flex;
  align-items: center;
  animation: marquee 60s linear infinite;
}

/* Duplicate the logo set in HTML for seamless loop */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

Each logo `<img>` sits in a wrapper `<div>` with class `logo-compact` or `logo-wide`:

```css
.logo-item { display: inline-flex; align-items: center; }
.logo-item.compact { padding: 0 56px; }
.logo-item.wide    { padding: 0 36px; }
.logo-item img     { height: 80px; width: auto; }
```

Logo set must be duplicated in the DOM (two copies of all 47) for the seamless loop to work. The animation duration (currently 60s) can be adjusted — longer = slower scroll.

---

## Via Media brand logos — required files

To be exported from Illustrator source by Simon and uploaded to project:

| File | Use |
|---|---|
| `viamedia-wordmark-black.svg` | Nav (light background) |
| `viamedia-wordmark-white.svg` | Hero, footer, contact section (dark backgrounds) |
| `viamedia-mark-black.svg` | Circle mark only — nav or favicon source |
| `viamedia-mark-white.svg` | Circle mark — dark background contexts |

PNG fallbacks (transparent bg, minimum 800px wide for wordmark) also recommended as belt-and-braces.

---

## Logos still flagged as low-resolution (acceptable for launch, upgrade if possible)

These were processed but source files were marginal. They'll look acceptable at 80px display height but may appear soft on high-DPI screens if viewed closely:

- 1st Auto Parts (50K px source)
- Bapcor (50K px source)
- Exedy (replaced with better file — acceptable)
- George Stock (40K px source)
- Holden (50K px source)
- Penrite (50K px source)
- Smits Group (50K px source)
- Tyrewise (good — replaced with high-res source)

SVG versions of any of the above would be ideal if obtainable from the clients.