const NZPC_NZV8 = [
  {
    label: 'Print',
    items: [
      'Double-page — 420mm × 297mm + 5mm bleed',
      'Full-page — 210mm × 297mm + 5mm bleed',
      'Half-page — 190mm × 133mm, no bleed required',
      'Quarter-page — 90mm × 133mm, no bleed required',
    ],
  },
  {
    label: 'Social',
    items: [
      'Social post — 1080px × 1080px and 1080px × 1350px. Safe space: allow 90px left/right, 90px top/bottom. Font sizes: H1 30–34pt, H2 24–28pt, Body 16–18pt. Formats: JPG, MP4. Carousel: max. 10 tiles, 1:1 ratio only.',
      'Social reel — 1080px × 1920px. Safe space: allow 250px top, 250px bottom, full 1080px width. Font sizes: H1 36–42pt, H2 28–32pt, Body 18–22pt. Format: MP4.',
    ],
  },
  {
    label: 'EDM',
    items: [
      'EDM banner — 1510px × 194px',
      'EDM sponsored block — 1200px × 900px',
    ],
  },
  {
    label: 'Banner impressions — please supply',
    items: [
      'Med rec — 300px × 250px',
      'ROS leaderboard — 728px × 90px',
      'ROS banner mobile — 320px × 50px',
    ],
  },
]

const AUTO_CHANNEL = [
  {
    label: 'Print',
    items: [
      'Double-page — 480mm × 340mm + 5mm bleed',
      'Full-page — 240mm × 340mm + 5mm bleed',
      'Half-page — 220mm × 156mm, no bleed required',
      'Quarter-page — 105mm × 156mm, no bleed required',
      'Eighth-page — 105mm × 73mm, no bleed required',
      'Cover strip (top) — 93mm × 71mm, no bleed required',
      'Cover strip (bottom) — 240mm × 116mm + 5mm bleed',
      'Cover mailing sheet — 165mm × 175mm, no bleed required',
    ],
  },
  {
    label: 'Social',
    items: [
      'Social post — 1080px × 1080px and 1080px × 1350px. Safe space: allow 90px left/right, 90px top/bottom. Font sizes: H1 30–34pt, H2 24–28pt, Body 16–18pt. Formats: JPG, MP4. Carousel: max. 10 tiles, 1:1 ratio only.',
      'Social reel — 1080px × 1920px. Safe space: allow 250px top, 250px bottom, full 1080px width. Font sizes: H1 36–42pt, H2 28–32pt, Body 18–22pt. Format: MP4.',
    ],
  },
  {
    label: 'Digital',
    items: [
      'Home-page banner — 1080px × 552px',
      'EDM banner — 1200px × 154px',
    ],
  },
]

function SubsectionGroup({ label, items }) {
  return (
    <div className="mb-10">
      <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-on-dark-muted mb-4">
        {label}
      </div>
      <ul className="list-none p-0 m-0">
        {items.map((item, i) => (
          <li
            key={i}
            className={`py-3 pl-[22px] text-sm text-on-dark leading-[1.85] relative ${i < items.length - 1 ? 'border-b border-white/[0.07]' : ''}`}
          >
            <span className="absolute left-0 text-red text-xs">—</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function AdSizes() {
  return (
    <>
      <title>Ad Sizes — Via Media</title>
      <meta name="robots" content="noindex, nofollow" />

      <section id="ad-sizes-page" className="bg-[#0A0A0A] border-t-4 border-t-red">
        <div className="max-w-[1200px] mx-auto py-16 md:py-[110px] px-5 md:px-[52px]">
          <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase text-red mb-[18px]">
            <div className="w-[22px] h-0.5 bg-red" />
            Material Supply Specifications
          </div>
          <h1 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.03] tracking-[-0.03em] uppercase text-white mb-6">
            Ad Sizes
          </h1>
          <p className="max-w-[800px] text-[15px] text-on-dark-muted leading-[1.85] mb-14">
            Dimensions are width × height + bleed as specified. Print: PDF, CMYK, 300dpi, fonts embedded. Digital: PNG, RGB.
          </p>

          <div className="max-w-[800px]">
            <h2 className="text-[clamp(22px,2.5vw,32px)] font-black tracking-[-0.02em] uppercase text-white mt-4 mb-8 pb-4 border-b border-white/15">
              NZ Performance Car &amp; NZV8
            </h2>
            {NZPC_NZV8.map((group) => (
              <SubsectionGroup key={group.label} label={group.label} items={group.items} />
            ))}

            <h2 className="text-[clamp(22px,2.5vw,32px)] font-black tracking-[-0.02em] uppercase text-white mt-16 mb-8 pb-4 border-b border-white/15">
              Auto Channel
            </h2>
            {AUTO_CHANNEL.map((group) => (
              <SubsectionGroup key={group.label} label={group.label} items={group.items} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
