import { useState } from 'react'

const TIERS = [
  {
    title: 'Independent Business',
    desc: 'A single-location workshop, retailer, or specialist supplier looking to grow visibility and attract more of the right customers.',
    body: [
      'You know your customers and your product. The challenge is getting consistently in front of more people like them — without wasting budget on broad advertising that doesn\'t speak to the automotive community.',
      'Our Always-On packages give independent businesses a straightforward, consistent presence across our platforms — with the option to scale as your confidence and results grow.',
    ],
    includes: [
      'A contextual business profile published organically across our channels — putting your brand in front of our audience as a trusted recommendation',
      'A consistent display ad running across our channels to drive ongoing visibility',
      'Paid social amplification to reach people actively engaging with automotive content',
    ],
    audience: 'Depending on your customer base — consumer, trade, or both — we\'ll match you to the most relevant audience.',
    pricing: 'Individual elements from $500 per month',
    testimonial: '"The always-on digital advertising delivered quantifiable, qualified leads at a very cost-effective price point — and generated some genuinely unexpected social proof in the comments, with customers recommending us unprompted."',
    attribution: '— Vincent Offenbaker, American Pickup Parts',
    ctaIntro: 'Tell us about your business — where you are, what you do, and who you\'re trying to reach. We\'ll come back with some options that fit.',
  },
  {
    title: 'Regional or Multi-Location Business',
    desc: 'A distributor, franchise group, or growing brand that needs consistent presence across a wider market.',
    body: [
      'At this scale, you need marketing that works across multiple contact points — building awareness, generating leads, and supporting your sales team with content that does some of the work for them.',
      'We combine owned-media publishing, paid amplification, and first-party audience targeting to give your brand sustained presence in the right environments. Your message starts within content your customers already seek out and trust — and we extend that reach across paid and search channels to maximise impact.',
    ],
    includes: [
      'Editorial content published across relevant brand platforms',
      'Paid social and search campaigns targeting our first-party automotive audiences',
      'Lead generation campaigns via landing pages or Meta lead forms',
      'Campaign reporting and performance insights',
    ],
    audience: 'Typically spans two or more of our brands and specialist sector audiences, depending on your product and customer mix.',
    pricing: 'Integrated packages from $1,500 per month',
    testimonial: '"Via Media gave us the content-led strategy and the audience reach to launch Infinitev into the New Zealand automotive aftermarket — something we couldn\'t have achieved with our internal marketing resource alone."',
    attribution: '— Graeme Cochrane, Infinitev',
    ctaIntro: 'Tell us about your business. We\'ll put a tailored proposal together.',
  },
  {
    title: 'National Brand or Importer',
    desc: 'A manufacturer, importer, or brand with a dedicated marketing function, looking for a specialist automotive media partner.',
    body: [
      'You have a marketing function and a strategy. What you need is a partner who brings genuine audience access, sector credibility, and the ability to execute.',
      'Via Media has been communicating and building relationships with New Zealand\'s automotive community for more than 30 years. Our first-party audiences give you direct access to enthusiast consumers and trade professionals — in environments they already trust.',
    ],
    includes: [
      'Integrated campaigns combining editorial, paid media, and social amplification',
      'Content-led marketing designed to perform in AI-assisted discovery and search',
      'Custom audience targeting using our first-party data',
      'Detailed reporting and audience insights',
    ],
    audience: 'Access to all our automotive audiences — consumer, trade, and specialist sector — with targeting aligned to your campaign objectives.',
    pricing: 'Integrated campaigns from $3,000 per month',
    testimonial: '"We use Via Media\'s first-party audience reach to drive more cost-effective engagement for our sub-brand campaigns across both consumer and trade channels — consistently delivering an ROI of up to four times what our other channels provide."',
    attribution: '— Lara Channing-Hutt, GPC New Zealand',
    ctaIntro: 'Tell us about your business and what you\'re trying to achieve. We\'ll come back with the approach we recommend.',
  },
]

export default function Solutions() {
  const [openIndex, setOpenIndex] = useState(-1)

  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i)

  return (
    <section id="solutions" className="bg-ink py-[110px] px-[52px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] uppercase text-white/45 mb-[18px]">
          <div className="w-[22px] h-0.5 bg-white/45" />
          Who We Work With
        </div>
        <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.03] tracking-[-0.03em] uppercase text-white mb-5">
          Solutions to <em className="not-italic text-red">Suit You</em>
        </h2>
        <p className="text-[15px] text-white/50 leading-[1.8] font-normal max-w-[560px] mb-14">
          Our solutions are built around your business size, your objectives, and the audiences most relevant to them. Find the one that fits your business.
        </p>

        {/* Accordion */}
        <div className="mt-2">
          {TIERS.map((tier, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className={`border-b border-white/[0.09] overflow-hidden ${i === 0 ? 'border-t border-t-white/[0.09]' : ''}`}>
                {/* Header */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center px-7 py-6 bg-ink2 border-none cursor-pointer text-left font-sans transition-colors duration-[180ms] hover:bg-dim mb-px"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className={`text-[15px] font-extrabold uppercase tracking-[-0.01em] transition-colors duration-[180ms] ${isOpen ? 'text-red' : 'text-white'}`}>
                      {tier.title}
                    </div>
                    <div className="text-[13px] text-white/45 font-normal">
                      {tier.desc}
                    </div>
                  </div>
                  <div className={`w-8 h-8 shrink-0 border-[1.5px] border-white/20 flex items-center justify-center text-xl font-light text-white/50 transition-all duration-[220ms] ${isOpen ? 'bg-red border-red text-white rotate-45' : ''}`}>
                    +
                  </div>
                </button>

                {/* Body */}
                <div
                  className="bg-ink2 overflow-hidden transition-all duration-[450ms] ease-in-out"
                  style={{ maxHeight: isOpen ? '1200px' : '0', padding: isOpen ? '20px 28px 36px' : '0 28px 0' }}
                >
                  {tier.body.map((p, j) => (
                    <p key={j} className="text-sm text-white/60 leading-[1.8] mb-3.5">{p}</p>
                  ))}

                  <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/30 mt-6 mb-2">
                    What this typically includes
                  </div>
                  <ul className="list-none p-0 mb-5">
                    {tier.includes.map((item, j) => (
                      <li key={j} className={`py-2.5 pl-5 text-[13px] text-white/50 leading-[1.65] relative ${j < tier.includes.length - 1 ? 'border-b border-white/[0.06]' : ''}`}>
                        <span className="absolute left-0 text-red text-[11px]">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="text-[13px] text-white/50 leading-[1.75] py-4 border-t border-b border-white/[0.07] mb-5">
                    <strong className="block text-[10px] font-bold tracking-[0.14em] uppercase text-white/30 mb-1.5 not-italic">
                      Most relevant audience
                    </strong>
                    {tier.audience}
                  </div>

                  <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-red mb-5">
                    {tier.pricing}
                  </div>

                  <div className="text-[13px] italic text-white/50 leading-[1.75] py-[18px] px-5 bg-white/[0.04] border-l-3 border-l-red mb-6">
                    {tier.testimonial}
                    <strong className="not-italic text-white/55 font-semibold block mt-2.5 text-[11px] tracking-[0.04em]">
                      {tier.attribution}
                    </strong>
                  </div>

                  <p className="text-sm text-white/55 leading-[1.75] mb-4">{tier.ctaIntro}</p>
                  <div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-red border-[1.5px] border-red px-[26px] py-[13px] no-underline transition-all duration-[180ms] hover:bg-red hover:text-white"
                    >
                      Get a Proposal →
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
