const BRANDS = [
  {
    type: 'consumer',
    eyebrow: 'Consumer',
    title: 'NZ Performance Car',
    text: "NZ's leading voice in the performance and modified vehicle space. An audience of active, engaged enthusiasts — from younger hands-on modifiers through to established professionals with discretionary income and high purchase intent — who follow trends, invest in their vehicles, and influence the buying decisions of those around them.",
    pin: '18–44  |  High Purchase Intent  |  Peer-Led',
  },
  {
    type: 'consumer',
    eyebrow: 'Consumer',
    title: 'NZV8',
    text: "Serving NZ's V8 and classic vehicle community for over two decades. An audience that combines genuine passion with serious purchasing power — invested in quality, reliability, and the brands they trust. Builds in this community regularly run into six figures.",
    pin: '30–65+  |  Established Income  |  Brand Loyal',
  },
  {
    type: 'trade',
    eyebrow: 'Trade',
    title: 'Auto Channel',
    text: 'Direct access to the people who run, supply, and service the NZ automotive industry. Decision-makers across workshops, parts distribution, and specialist services — reached through channels built specifically for the trade.',
    pin: 'Workshop Owners  |  Parts Distributors  |  Industry Decision-Makers',
  },
  {
    type: 'both',
    eyebrow: 'Consumer & Trade',
    title: 'Specialist Sectors',
    text: 'Beyond our three core brands, we have built and maintain first-party audiences across specific high-value sectors of the NZ automotive market — including dedicated EV, four-wheel drive, and RV communities, spanning both consumer enthusiasts and trade professionals.',
    pin: 'EV  |  Four-Wheel Drive  |  RV',
  },
]

const BORDER_TOP = {
  consumer: 'border-t-red',
  trade: 'border-t-steel-mid',
  both: '',
}

const EYEBROW_COLOR = {
  consumer: 'text-red',
  trade: 'text-steel-mid',
  both: 'text-muted',
}

export default function Audiences() {
  return (
    <section id="audiences" className="bg-off py-[110px] px-[52px]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-2 gap-20 items-end mb-13">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] uppercase text-red mb-[18px]">
              <div className="w-[22px] h-0.5 bg-red" />
              First-Party Audiences
            </div>
            <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.03] tracking-[-0.03em] uppercase mb-0">
              The Audiences Your Customers <em className="not-italic text-red">Already Trust</em>
            </h2>
          </div>
          <p className="text-[15px] text-muted leading-[1.85]">
            Our audiences span the New Zealand automotive aftermarket — from engaged consumer communities to trade professionals and specialist sector groups — built over decades across three owned brands and trusted by the people they serve. They're the starting point for what we can help you reach.
          </p>
        </div>

        {/* Brand cards */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {BRANDS.map(({ type, eyebrow, title, text, pin }) => (
            <div
              key={title}
              className={`bg-white border border-black/10 border-t-3 ${BORDER_TOP[type]} p-8 pb-7 flex flex-col cursor-default transition-all duration-[220ms] hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-[3px]`}
              style={type === 'both' ? { borderTop: '3px solid', borderImage: 'linear-gradient(to right, #D4001A 50%, #354757 50%) 1', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' } : undefined}
            >
              <div className={`text-[9px] font-bold tracking-[0.18em] uppercase ${EYEBROW_COLOR[type]} mb-3.5 min-h-[1.6em]`}>
                {eyebrow}
              </div>
              <h3 className="text-lg font-black uppercase tracking-[-0.02em] text-ink mb-3.5 leading-[1.1]">
                {title}
              </h3>
              <p className="text-[13px] text-muted leading-[1.75] flex-1 mb-5">
                {text}
              </p>
              <div className="text-[10px] font-semibold tracking-[0.08em] text-muted pt-4 border-t border-black/10 mt-auto">
                {pin}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-end border-t border-black/10 pt-8">
          <a
            href="#media-kit-form"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-ink border-2 border-ink px-7 py-3.5 no-underline transition-all duration-[180ms] hover:bg-ink hover:text-white hover:-translate-y-px"
          >
            Request Audience Data & Media Kit →
          </a>
        </div>
      </div>
    </section>
  )
}
