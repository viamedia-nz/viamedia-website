const STATS = [
  { value: '3.5', accent: 'M+', label: 'Audience Contact Points Each Month' },
  { value: '450', accent: 'K+', label: 'First-Party Audience Across NZ Automotive' },
  { value: '30', accent: '+', label: 'Years Trusted by NZ Automotive Communities' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden flex items-stretch bg-hero-left">
      {/* Red left rule */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red z-4" />

      {/* Right panel split background — hidden on mobile */}
      <div className="hero-split-bg hidden md:block absolute top-0 bottom-0 right-0 z-0 bg-steel-mid" />

      {/* Centred content grid */}
      <div className="relative z-2 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-5 md:px-[52px] pt-12 pb-16 md:pt-[88px] md:pb-[100px]">

        {/* LEFT: copy + CTAs */}
        <div className="md:pr-12 relative overflow-hidden">
          <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.24em] uppercase text-red mb-6">
            <div className="w-7 h-0.5 bg-red" />
            Content-Led, Audience-Powered
          </div>

          <h1 className="text-[clamp(36px,5.2vw,76px)] font-black leading-[0.97] tracking-[-0.035em] text-white mb-7 uppercase">
            Automotive<br />Marketing,<br />
            <span className="text-red block">Built on<br />Audience</span>
          </h1>

          <p className="text-sm font-normal text-on-dark max-w-[420px] leading-[1.85] mb-10">
            Via Media connects brands with New Zealand's automotive audiences through content, paid media, and search.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 items-start sm:items-center flex-wrap">
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
        <div className="mt-10 md:mt-0 md:pl-[52px] relative flex flex-col justify-center">
          <div className="relative z-2">
            {/* Mark watermark — hidden on mobile */}
            <img
              src="/logos/viamedia-mark-hero-overlay.svg"
              alt=""
              className="hidden md:block absolute right-[-15%] top-1/2 -translate-y-1/2 h-[120%] aspect-square opacity-[0.12] pointer-events-none z-1"
            />

            {STATS.map(({ value, accent, label }, i) => (
              <div
                key={i}
                className="w-full py-4 md:py-[22px] flex flex-col gap-[5px]"
              >
                <div className="text-[clamp(32px,3.6vw,50px)] font-black tracking-[-0.04em] leading-none text-white">
                  {value}<span className="text-red">{accent}</span>
                </div>
                <div className="text-[10px] font-semibold tracking-[0.16em] uppercase text-on-dark-muted">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
