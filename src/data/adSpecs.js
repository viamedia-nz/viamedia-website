// Ad unit specs for the /ad-sizes page and the PDF at /ad-sizes/print.
// w and h are numbers so the page can draw each unit to scale.

export const DIGITAL_NOTE =
  'Supply at the exact sizes listed, RGB, flat JPG or PNG. Do not supply oversized or double-size files — they are not scaled down.'

export const DIGITAL_SCHEDULING =
  'Digital campaign dates are flexible. A campaign can align with a print issue, run to calendar months, or run for a set period.'

export const PRINT_NOTE =
  'Supply print ads as PDF/X-1a: CMYK, 300dpi, fonts embedded, transparency flattened.'

export const SOCIAL = [
  {
    name: 'Social post',
    size: '1080 × 1080px and 1080 × 1350px',
    detail:
      'Safe space: 90px on all sides. Font sizes: H1 30–34pt, H2 24–28pt, body 16–18pt. JPG or MP4. Carousel: up to 10 tiles, 1:1 only.',
    w: 1080,
    h: 1350,
  },
  {
    name: 'Social reel',
    size: '1080 × 1920px',
    detail:
      'Safe space: 250px top and bottom, full 1080px width. Font sizes: H1 36–42pt, H2 28–32pt, body 18–22pt. MP4.',
    w: 1080,
    h: 1920,
  },
]

export const SOCIAL_COPY = [
  ['Headline', '40 characters. Can change per carousel card.'],
  ['Primary text', '80 characters or fewer for feed placements. Applies to the whole ad.'],
  ['Description', 'Optional, 20 characters per card. Often hidden on reels and carousels — do not rely on it.'],
  ['Links', 'One destination URL per ad, or one per card if cards go to different pages.'],
  ['Terms', 'Put mandatory terms or disclaimers in the primary text or headline, not the description.'],
]

// page: the trim size the unit sits on, for the scale drawing.
// at: where the unit sits on the page in the drawing ('full', 'bottom', 'bottom-left', 'top-right', 'sheet').
export const PRINT = {
  ac: {
    page: { w: 240, h: 340 },
    units: [
      { name: 'Double-page spread', w: 480, h: 340, bleed: true, at: 'spread' },
      { name: 'Full-page', w: 240, h: 340, bleed: true, at: 'full' },
      { name: 'Half-page horizontal', w: 220, h: 156, bleed: false, at: 'bottom' },
      { name: 'Quarter-page', w: 105, h: 156, bleed: false, at: 'bottom-left' },
      { name: 'Eighth-page', w: 105, h: 73, bleed: false, at: 'bottom-left' },
      { name: 'Cover strip (top)', w: 93, h: 71, bleed: false, at: 'top-right' },
      { name: 'Cover strip (bottom)', w: 240, h: 116, bleed: true, at: 'bottom-bleed' },
      { name: 'Cover mailing sheet', w: 165, h: 175, bleed: false, at: 'sheet' },
    ],
  },
  consumer: {
    page: { w: 210, h: 297 },
    units: [
      { name: 'Double-page spread', w: 420, h: 297, bleed: true, at: 'spread' },
      { name: 'Full-page', w: 210, h: 297, bleed: true, at: 'full' },
      { name: 'Half-page', w: 190, h: 133, bleed: false, at: 'bottom' },
      { name: 'Quarter-page', w: 90, h: 133, bleed: false, at: 'bottom-left' },
    ],
  },
}

export const DIGITAL = {
  ac: [
    { name: 'In-grid banner', w: 538, h: 275 },
    { name: 'Rail medium rectangle', w: 300, h: 250 },
    { name: 'Rail tall banner', w: 300, h: 600 },
    { name: 'EDM banner', w: 1200, h: 154 },
  ],
  consumer: [
    { name: 'Medium rectangle', w: 300, h: 250 },
    { name: 'Leaderboard (run of site)', w: 728, h: 90 },
    { name: 'Mobile banner (run of site)', w: 320, h: 50 },
    { name: 'Pop-up', w: 600, h: 600 },
    { name: 'EDM banner', w: 1510, h: 194 },
    { name: 'EDM sponsored block', w: 1200, h: 900 },
  ],
}

export function printSize(u) {
  return `${u.w} × ${u.h}mm${u.bleed ? ' + 5mm bleed' : ''}`
}
