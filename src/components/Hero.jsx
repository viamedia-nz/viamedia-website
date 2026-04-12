import { useState } from 'react'

const STATS = [
  { value: '3.5', accent: 'M+', label: 'Audience Contact Points Each Month' },
  { value: '450', accent: 'K+', label: 'First-Party Audience Across NZ Automotive' },
  { value: '30', accent: '+', label: 'Years Trusted by NZ Automotive Communities' },
]

export default function Hero() {
  const [panelBg, setPanelBg] = useState('#354757')

  return (
    <section id="hero" className="relative overflow-hidden flex items-stretch bg-hero-left">
      {/* Red left rule */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red z-4" />

      {/* Right panel split background */}
      <div
        className="hero-split-bg absolute top-0 bottom-0 right-0 z-0 transition-[background] duration-400 ease-in-out"
        style={{ background: panelBg }}
      />

      {/* Centred content grid */}
      <div className="relative z-2 w-full max-w-[1200px] mx-auto grid grid-cols-2 items-center px-[52px] pt-[88px] pb-[100px]">

        {/* LEFT: copy + CTAs */}
        <div className="pr-12 relative overflow-hidden">
          {/* Ghosted wordmark */}
          <div className="absolute left-0 bottom-[-16px] h-[88px] w-auto opacity-[0.035] pointer-events-none z-1 max-w-[90%]">
            <svg viewBox="0 0 1326 432" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
              <path d="M235,0h1091v432H235C347.022,421.062,433.361,329.13,433.111,215.515,432.861,101.516,346.664,10.938,235,0Z" fill="#ffffff"/>
              <polygon points="198.648 144.07 126.918 287.566 55.125 144.01 198.648 144.07" fill="#ffffff"/>
              <polygon points="378.865 287.965 235.29 288.01 306.904 144.521 378.865 287.965" fill="#ffffff"/>
              <polygon points="235.02 287.661 199.004 288.049 198.987 144.306 234.984 144.262 235.02 287.661" fill="#ffffff"/>
            </svg>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.24em] uppercase text-red mb-6">
            <div className="w-7 h-0.5 bg-red" />
            Content-Led, Audience-Powered
          </div>

          <h1 className="text-[clamp(42px,5.2vw,76px)] font-black leading-[0.97] tracking-[-0.035em] text-white mb-7 uppercase">
            Automotive<br />Marketing,<br />
            <span className="text-red block">Built on<br />Audience</span>
          </h1>

          <p className="text-sm font-normal text-white/[0.52] max-w-[420px] leading-[1.85] mb-10">
            Via Media connects brands with New Zealand's automotive audiences through content, paid media, and search.
          </p>

          <div className="flex gap-3.5 items-center flex-wrap">
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-red px-8 py-4 no-underline transition-all duration-[180ms] hover:bg-red-dark hover:-translate-y-px"
            >
              Explore Services →
            </a>
            <a
              href="#audiences"
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-white/55 border-[1.5px] border-white/18 px-[26px] py-[15px] no-underline transition-all duration-[180ms] hover:border-white/60 hover:text-white/90"
            >
              Our Audiences →
            </a>
          </div>
        </div>

        {/* RIGHT: stats + mark watermark */}
        <div className="pl-[52px] relative flex flex-col justify-center">
          <div className="relative z-2">
            {/* Mark watermark behind stats */}
            <img
              src="/logos/viamedia-mark-hero-overlay.svg"
              alt=""
              className="absolute left-1/2 top-[40%] -translate-x-[20%] -translate-y-1/2 w-[clamp(280px,100%,420px)] h-[clamp(280px,100%,420px)] opacity-10 pointer-events-none z-1"
            />

            {STATS.map(({ value, accent, label }, i) => (
              <div
                key={i}
                className={`w-full py-[22px] flex flex-col gap-[5px] ${i < STATS.length - 1 ? 'border-b border-white/[0.09]' : ''}`}
              >
                <div className="text-[clamp(36px,3.6vw,50px)] font-black tracking-[-0.04em] leading-none text-white">
                  {value}<span className="text-red">{accent}</span>
                </div>
                <div className="text-[10px] font-semibold tracking-[0.16em] uppercase text-white/[0.38]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel toggle (dev tool) */}
      <div className="absolute bottom-5 right-5 z-10 flex gap-2 items-center">
        <span className="text-[9px] font-bold tracking-[0.08em] uppercase text-white/40">Right panel:</span>
        {[
          { label: 'Steel Mid', bg: '#354757' },
          { label: 'Carrara', bg: '#E2E0DC' },
        ].map(({ label, bg }) => (
          <button
            key={bg}
            onClick={() => setPanelBg(bg)}
            className={`text-[9px] font-bold tracking-[0.08em] uppercase px-3 py-1.5 border-none cursor-pointer transition-all duration-200 font-sans ${
              panelBg === bg
                ? 'bg-red text-white'
                : 'bg-white/10 text-white/40 hover:bg-white/18 hover:text-white/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  )
}
