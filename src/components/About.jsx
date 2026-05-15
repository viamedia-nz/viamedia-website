import { Link } from 'react-router-dom'
import LogoBand from './LogoBand'

export default function About() {
  return (
    <section id="about-page" className="bg-stone border-t-4 border-t-red">
      <div className="max-w-[1200px] mx-auto py-16 md:py-[110px] px-5 md:px-[52px]">
        <div className="fade-up flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase text-muted mb-[18px]">
          <div className="w-[22px] h-0.5 bg-red" />
          About
        </div>
        <h2 className="fade-up delay-1 text-[clamp(34px,4vw,56px)] font-black leading-[1.03] tracking-[-0.03em] uppercase mb-6">
          Thirty Years <em className="not-italic text-red">Inside the Industry</em>
        </h2>

        <div className="fade-up delay-2 max-w-[800px] about-body text-[15px] text-dim leading-[1.85]">
          <p className="mb-[18px]">Via Media is a New Zealand marketing agency specialising in the automotive sector. What sets us apart is not just what we do — it is what we have spent three decades building: owned audiences, trusted channels, and deep relationships across every part of the NZ automotive community, from enthusiast to trade professional.</p>
          <p className="mb-[18px]">The business has its roots in the early 1990s, when it established itself as one of New Zealand's leading independent automotive publishers. Over the following decades it built three of the sector's most recognised brands — NZ Performance Car, NZV8, and Auto Channel — along with the first-party audiences that follow them. Those audiences were not acquired or aggregated. They were earned, community by community, over thirty years.</p>
        </div>

        {/* Stat block */}
        <div className="fade-up delay-3 bg-ink w-full md:w-[55%] py-8 md:py-10 px-6 md:px-10 my-8 md:my-10">
          <div className="flex items-center gap-6 mb-8">
            <div className="text-[clamp(48px,5vw,72px)] font-black tracking-[-0.05em] leading-none text-white">
              30<span className="text-red">+</span>
            </div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/35">
              Years in NZ Automotive
            </div>
          </div>
          <div className="relative">
            {/* Progress bar — red line stops at 2022, blank to Today */}
            <div className="h-[3px] bg-white/[0.06]">
              <div className="h-full w-[88%] bg-red" />
            </div>
            <div className="flex justify-between text-[9px] font-semibold tracking-[0.1em] uppercase text-white/20 pt-3">
              <span>1990s</span>
              <span>2000s</span>
              <span>2010s</span>
              <span>2022</span>
              <span>Today</span>
            </div>
          </div>
        </div>

        <div className="max-w-[800px] about-body text-[15px] text-dim leading-[1.85]">
          <p className="mb-[18px]">In 2022 the business evolved into Via Media, bringing together that publishing depth with the strategic and campaign capability of a modern marketing agency. The editorial function that built the audiences remains — it is what keeps those audiences engaged and growing — but it now sits inside a broader offer that spans content creation, paid media, search and discovery, and integrated campaign delivery.</p>
          <p className="mb-[18px]">We're a specialist agency that owns its audiences and its channels, understands the sector from the inside, and can deliver an integrated campaign without assembling it from separate parts.</p>
        </div>

        <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted mt-8 mb-2.5">
          Our People
        </div>
        <div className="max-w-[800px] about-body text-[15px] text-dim leading-[1.85]">
          <p className="mb-[18px]">Via Media is led by Michael White, who has been part of the business since its earliest years. His background is in automotive media and sales, and his understanding of the NZ automotive sector — its audiences, its commercial dynamics, and where it is heading — has been built over three decades of working within it.</p>
          <p className="mb-[18px]">Our full-time team is supported by a wide network of specialist contributors, photographers, videographers, and content creators who operate throughout the country. Many have been working with Via Media for ten years or more — people who know the automotive community because they are part of it.</p>
        </div>

        <Link
          to="/#contact"
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-ink px-[34px] py-[17px] no-underline mt-2.5 transition-all duration-[180ms] hover:bg-red hover:-translate-y-px"
        >
          Get in Touch →
        </Link>
      </div>

      {/* Full-bleed logo band — no label, no borders */}
      <LogoBand />
    </section>
  )
}
