const ITEMS = [
  {
    num: '01',
    title: 'First-Party Audiences',
    text: 'Our audiences are first-party and owned — built from within the NZ automotive community over more than 30 years. Your message starts in environments your customers already trust and seek out, and we can amplify it well beyond through paid media, search, and social.',
  },
  {
    num: '02',
    title: 'Sector Expertise',
    text: 'Three decades of content creation have given us an unmatched understanding of how automotive audiences discover, evaluate, and trust brands — from enthusiasts and trade professionals to specialist communities within the sector.',
  },
  {
    num: '03',
    title: 'Content-Led Marketing',
    text: "We specialise in content that informs, builds credibility, and continues working long after it's published — found through AI-assisted discovery, traditional search, and the platforms where your audiences are most active. Content on our channels doesn't just reach people today; it keeps finding new ones.",
  },
  {
    num: '04',
    title: 'End-to-End Delivery',
    text: "Strategy, content, distribution, and campaign optimisation — integrated across owned and paid channels by the same team. Because we control both the content environment and the advertising placements, there's no disconnect between what we publish and how we amplify it.",
  },
]

export default function OurDifference() {
  return (
    <section id="different" className="bg-white py-16 md:py-[110px] px-5 md:px-[52px]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-end mb-10 md:mb-15">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] uppercase text-red mb-[18px]">
              <div className="w-[22px] h-0.5 bg-red" />
              Our Difference
            </div>
            <h2 className="text-[clamp(28px,4vw,56px)] font-black leading-[1.03] tracking-[-0.03em] uppercase mb-0">
              Connected to the <em className="not-italic text-red">Industry</em>
            </h2>
          </div>
          <p className="text-[15px] text-muted leading-[1.85] font-normal">
            Via Media owns the brands, the content, and the audiences — built from within the NZ automotive community for more than 30 years. That foundation shapes everything we do for our clients.
          </p>
        </div>

        {/* Four-tile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/10 border border-black/10">
          {ITEMS.map(({ num, title, text }) => (
            <div
              key={num}
              className="bg-white p-6 md:p-11 border-l-3 border-l-transparent transition-all duration-[220ms] cursor-default hover:bg-off hover:border-l-red hover:translate-x-0.5"
            >
              <div className="text-[40px] md:text-[52px] font-black tracking-[-0.05em] leading-none text-red opacity-[0.18] mb-3">
                {num}
              </div>
              <h3 className="text-[15px] font-extrabold tracking-[-0.01em] mb-[11px]">
                {title}
              </h3>
              <p className="text-sm text-muted leading-[1.8]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
