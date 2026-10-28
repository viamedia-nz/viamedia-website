# Client resource pages and PDF downloads

Pattern for client-facing resources on viamedia.co.nz: the ad specs page, its PDF,
and future client reports. Approved by Simon and Michael, 28 October 2026.
Reference build: `/ad-sizes` and `/ad-sizes/print`.

## How a page and its PDF fit together

1. **One data file.** All content that changes lives in `src/data/` (for example
   `printDeadlines.js`, `adSpecs.js`). Nothing is typed into page components twice.
2. **Web page.** Reads the data file. Responsive, phone first.
3. **Print layout route.** A second route (for example `/ad-sizes/print`) reads the same
   data and lays it out as fixed A4 sheets (`210mm × 297mm`, `@page { margin: 0 }`).
   It renders without the site nav and footer (see the check in `src/App.jsx`).
4. **Static PDF.** The PDF is generated from the print route and committed to
   `public/downloads/`. It is not rebuilt on click.
5. **Versioned link.** The download link carries `?v=<date>`. Bump it every time the PDF
   is replaced, or browsers can serve an old cached copy.

### Why static

- Browser print buttons are unreliable for clients: Chrome drops background colours by
  default, so the header band and colour coding disappear.
- Generating the PDF on every Vercel build adds a headless browser to every deploy, for
  files that change a few times a year.

### Regenerating a PDF

- Chrome: open the print route, Print, Save as PDF, margins None, Background graphics on.
- Or headless Chromium (Playwright `page.pdf` with `prefer_css_page_size`). Montserrat must
  load, or the PDF falls back to another font; check with `pdffonts`.
- Then update the "Updated" date in the print layout and bump `?v=` on the link.

## Design rules

- Header: dark gradient band `#1A1918` → `#354757` (105deg) with a red rule under it
  (`#D4001A` → `#A80015`). White Via Media wordmark from `public/logos/`.
- Montserrat throughout. Light utility palette: page `#F4F3F0`, white cards, 14px radius.
- No red eyebrow labels with a pin line on resource pages. Each section uses a line icon
  in a circle, a heading, and one functional line underneath (for example the supply rule).
- Rounded pills for jump links and small tags.
- Colour coding must be consistent and always paired with a text label. Date types:
  make-up `#2F5F8A`, supply `#D4001A`, on sale / distribution `#111110`.
- Brand names set in type. No magazine masthead logos on Via Media resource pages.
- Lead with the identifier the client uses (cover month range, campaign name), and keep
  internal numbers as small secondary text.
- Lead with digital. Put print-heavy or secondary detail in collapsible panels that open
  from `#anchor` links, so emails can link straight to them.
- Shared components: `src/components/AdSpecParts.jsx` (icons, scale drawings, date
  legend, deadlines table).

## Indexing

Resource pages are unlisted and must not be indexed. Add each new route and its PDF folder
to the `X-Robots-Tag: noindex` headers in `vercel.json`. A meta robots tag set by React
alone is not enough, and it cannot cover PDFs.
