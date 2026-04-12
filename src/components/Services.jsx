import { useState } from 'react'

const TABS = [
  {
    id: 'content',
    label: 'Content',
    title: 'Content & Channels',
    lead: "Content is our core asset — and the channel it appears on is secondary to the quality, credibility, and reach behind it. We create automotive content that surfaces in AI-assisted discovery, performs in search, and lands natively across social platforms, because it's built on genuine audience knowledge.",
    whatLabel: 'What We Create',
    items: [
      'Editorial features, product profiles, technical guides, and campaign-led content',
      'Social-first video, reels, and platform-native formats across Facebook, Instagram, TikTok, and YouTube',
      'Publishing across our owned social channels — reaching combined audiences of 450,000+',
      'EDM campaigns to our owned brand audiences, and management of client database communications and subscriber lists',
      'Content optimised for AI-assisted discovery and long-tail search',
      'Case studies and client story content',
      'Amplification of client-supplied content across our owned channels',
    ],
  },
  {
    id: 'lead',
    label: 'Paid Media',
    title: 'Lead Generation & Paid Media',
    lead: "We run targeted campaigns that turn audience engagement into measurable action. Because we start with first-party automotive audiences rather than building them from scratch, your budget goes further, and your message lands in context, not alongside unrelated content.",
    whatLabel: "What's Included",
    items: [
      'Paid social campaigns served directly to our first-party automotive audiences, with custom audience building and retargeting',
      'Audience segmentation, overlay targeting, and retargeting within our first-party automotive data',
      'Custom audience development — building and refining client-specific audience assets across the campaign lifecycle',
      'Paid search campaigns targeted to high-intent automotive audiences and keywords',
      'Display advertising — programmatic placements via Google Ads and premium publisher positions within trusted automotive editorial environments',
      'Lead generation campaigns via custom landing pages and targeted conversion-focused placements',
      'Managed campaigns served from your brand channel, targeting our audiences',
    ],
  },
  {
    id: 'search',
    label: 'Search',
    title: 'Organic Search & Discovery',
    lead: "Our automotive sites already appear in AI-generated answers — not because we optimise for algorithms, but because we have spent decades building topical authority and audience trust within a defined sector. That foundation is what makes content we publish, and content we create for clients, genuinely discoverable across AI-assisted and traditional search.",
    whatLabel: 'What We Incorporate',
    items: [
      'Publication of client content on our owned automotive domains — leveraging established domain authority and topical trust',
      'Content structured for AI-generated answers and featured snippets — with question-based formats, clear topic clusters, and schema where appropriate (AEO/GEO)',
      'Keyword and topic strategy aligned with how automotive audiences actually search — including conversational query patterns driven by AI search behaviour',
      'On-page optimisation of all content published across our channels',
      "Backlinking via editorial content to support your own site's discoverability",
    ],
  },
  {
    id: 'audience',
    label: 'Audience Strategy',
    title: 'Audience Intelligence & Strategy',
    lead: "We know how NZ automotive audiences think, decide, and respond — because we've been in conversation with them for three decades. We use that knowledge to shape campaigns and strategies grounded in real audience behaviour, across consumer and trade segments.",
    whatLabel: 'What We Apply',
    items: [
      'Audience research deployed across our owned channels and communities',
      'Behavioural data and audience insights from GA4 and Tag Manager — informing targeting and content strategy',
      'Strategic marketing recommendations to guide campaign composition and improve the effectiveness of your existing marketing activity',
      'Competitor and category analysis to inform positioning, messaging, and content strategy',
      'Campaign performance benchmarking and ongoing optimisation recommendations',
    ],
  },
  {
    id: 'events',
    label: 'Activations',
    title: 'Activations & Events',
    lead: "As media partner to NZ's major automotive events, we bring the presence, the channels, and the audience — creating opportunities for sponsors, partners, and brands looking for event visibility. For clients running their own activations, we provide the promotion, coverage, and amplification to ensure maximum reach and impact.",
    whatLabel: 'What We Cover',
    items: [
      'Advertising and sponsorship packages built around our media partnership coverage',
      'Paid event promotion across our channels — reaching automotive audiences, whether you\'re a sponsor, partner, or event organiser',
      'Promotion, coverage, and delivery of client marketing activations — connecting your brand directly with our automotive audiences',
      'Branded collateral, collectible content, and post-event editorial that capture and extend the event story',
    ],
  },
]

export default function Services() {
  const [activeTab, setActiveTab] = useState('content')
  const panel = TABS.find(t => t.id === activeTab)

  return (
    <section id="services" className="bg-white py-[110px] px-[52px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] uppercase text-red mb-[18px]">
          <div className="w-[22px] h-0.5 bg-red" />
          How We Work
        </div>
        <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.03] tracking-[-0.03em] uppercase mb-5">
          One Brief, <em className="not-italic text-red">Everything Covered</em>
        </h2>
        <p className="text-[15px] text-muted leading-[1.8] font-normal max-w-[560px] mb-14">
          An integrated approach to automotive marketing — content, audience, and amplification working together.
        </p>

        {/* Tab bar */}
        <div className="flex border-b-2 border-black/10 mt-14 mb-0 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`shrink-0 px-7 py-3.5 text-[11px] font-bold tracking-[0.1em] uppercase cursor-pointer whitespace-nowrap bg-transparent border-none border-b-3 -mb-[2px] transition-all duration-[180ms] font-sans ${
                activeTab === id
                  ? 'text-ink border-b-red'
                  : 'text-muted border-b-transparent hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Panel content */}
        <div className="pt-12">
          <h3 className="text-[26px] font-black tracking-[-0.02em] uppercase mb-5 text-ink border-l-3 border-l-red pl-4">
            {panel.title}
          </h3>
          <p className="text-[15px] text-muted leading-[1.8] mb-8 pb-8 border-b border-black/10 max-w-[800px]">
            {panel.lead}
          </p>
          <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-red mb-3">
            {panel.whatLabel}
          </div>
          <ul className="list-none p-0 m-0 max-w-[800px]">
            {panel.items.map((item, j) => (
              <li
                key={j}
                className={`py-[11px] pl-[22px] text-sm text-muted leading-[1.65] relative ${j < panel.items.length - 1 ? 'border-b border-black/10' : ''}`}
              >
                <span className="absolute left-0 text-red text-xs">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
