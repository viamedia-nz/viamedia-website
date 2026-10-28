import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  DIGITAL,
  DIGITAL_NOTE,
  DIGITAL_SCHEDULING,
  PRINT,
  PRINT_NOTE,
  SOCIAL,
  SOCIAL_COPY,
  printSize,
} from '../data/adSpecs'
import { BRANDS, formatDate, openIssues, todayNZ } from '../data/printDeadlines'
import {
  DateLegend,
  DeadlinesTable,
  DigitalThumb,
  Dot,
  Icon,
  PrintThumb,
} from '../components/AdSpecParts'

export const PDF_HREF = '/downloads/via-media-print-deadlines-and-specs.pdf'

// ---------- Layout pieces ----------

function ChannelCard({ icon, title, rule, children }) {
  return (
    <div className="bg-white border border-black/10 rounded-[14px] overflow-hidden">
      <div className="flex items-start gap-4 px-5 sm:px-7 pt-6 pb-5 border-b border-black/10">
        <div className="w-11 h-11 rounded-full bg-off border border-black/10 grid place-items-center text-ink shrink-0">
          <Icon name={icon} className="w-[22px] h-[22px]" />
        </div>
        <div className="min-w-0">
          <h3 className="text-[19px] font-extrabold text-ink leading-tight">{title}</h3>
          {rule && <p className="text-[13px] text-muted leading-[1.55] mt-1 max-w-[62ch]">{rule}</p>}
        </div>
      </div>
      <div className="px-4 sm:px-7 py-2">{children}</div>
    </div>
  )
}

function UnitRow({ thumb, name, size, detail }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-black/10 last:border-b-0">
      <div className="w-[64px] shrink-0 flex justify-center">{thumb}</div>
      <div className="min-w-0 flex-1 sm:flex sm:items-baseline sm:justify-between sm:gap-4">
        <div className="text-[14px] font-semibold text-ink">{name}</div>
        <div className="text-[14px] text-dim tabular-nums sm:text-right">{size}</div>
        {detail && <p className="sm:hidden text-[12.5px] text-muted mt-1 leading-[1.5]">{detail}</p>}
      </div>
    </div>
  )
}

function DigitalCard({ units }) {
  return (
    <ChannelCard icon="digital" title="Digital" rule={DIGITAL_NOTE}>
      {units.map((u) => (
        <UnitRow key={u.name} thumb={<DigitalThumb unit={u} />} name={u.name} size={`${u.w} × ${u.h}px`} />
      ))}
      <div className="flex gap-3 items-start my-4 rounded-[10px] bg-off px-4 py-3">
        <Icon name="calendar" className="w-[18px] h-[18px] text-muted mt-[2px] shrink-0" />
        <p className="text-[13px] text-dim leading-[1.55]">{DIGITAL_SCHEDULING}</p>
      </div>
    </ChannelCard>
  )
}

function SocialCard() {
  return (
    <ChannelCard icon="social" title="Social" rule="Meta feed and reel placements. Copy limits apply to both.">
      {SOCIAL.map((u) => (
        <div key={u.name} className="flex items-start gap-4 py-3 border-b border-black/10">
          <div className="w-[64px] shrink-0 flex justify-center">
            <DigitalThumb unit={u} />
          </div>
          <div className="min-w-0">
            <div className="text-[14px] font-semibold text-ink">
              {u.name} <span className="font-normal text-dim tabular-nums">· {u.size}</span>
            </div>
            <p className="text-[13px] text-muted leading-[1.55] mt-1">{u.detail}</p>
          </div>
        </div>
      ))}
      <dl className="my-3 grid sm:grid-cols-[140px_1fr] gap-x-4">
        {SOCIAL_COPY.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-[13px] font-semibold text-ink pt-2 sm:py-2 sm:border-b sm:border-black/10">{k}</dt>
            <dd className="m-0 text-[13px] text-muted leading-[1.55] pb-2 sm:py-2 border-b border-black/10">{v}</dd>
          </div>
        ))}
      </dl>
    </ChannelCard>
  )
}

// Collapsible print deadlines. Opens when the URL hash names it or one of its brands.
function DeadlinesPanel({ id, brands }) {
  const { hash } = useLocation()
  const ids = [id, ...brands.map((b) => `${b.id}-deadlines`)]
  const [open, setOpen] = useState(false)
  const today = todayNZ()

  useEffect(() => {
    if (ids.includes(hash.replace('#', ''))) setOpen(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])

  const nexts = brands.map((b) => ({ brand: b, row: openIssues(b, today)[0] })).filter((n) => n.row)

  return (
    <details
      id={id}
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      className="group my-4 rounded-[12px] border border-black/15 bg-off overflow-hidden scroll-mt-[84px]"
    >
      <summary className="list-none cursor-pointer select-none px-4 sm:px-5 py-4 flex items-start sm:items-center gap-3 [&::-webkit-details-marker]:hidden">
        <Icon name="calendar" className="w-5 h-5 text-ink shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-extrabold text-ink">Print deadlines</div>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-muted">
            {nexts.map(({ brand, row }) => (
              <span key={brand.id} className="inline-flex items-center gap-[6px] whitespace-nowrap">
                {brands.length > 1 && (
                  <span className="font-semibold text-dim">
                    <span className="sm:hidden">{brand.short}</span>
                    <span className="hidden sm:inline">{brand.name}</span>
                  </span>
                )}
                Next supply
                <Dot type="supply" size={7} />
                <span className="font-semibold text-ink">{formatDate(row.supply)}</span>
              </span>
            ))}
          </div>
        </div>
        <span className="shrink-0 inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-3 py-[6px] text-[12px] font-bold text-ink">
          <span className="hidden sm:inline group-open:sm:hidden">Show dates</span>
          <span className="hidden group-open:sm:inline">Hide dates</span>
          <svg viewBox="0 0 12 12" className="w-3 h-3 transition-transform group-open:rotate-180" aria-hidden="true">
            <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </summary>

      <div className="px-3 sm:px-5 pb-5 pt-1 bg-white border-t border-black/10">
        <div className="py-4">
          <DateLegend />
        </div>
        <div className="grid gap-8">
          {brands.map((b) => {
            const rows = openIssues(b, today)
            return (
              <div key={b.id} id={`${b.id}-deadlines`} className="scroll-mt-[84px] min-w-0">
                {brands.length > 1 && <h4 className="text-[14px] font-extrabold text-ink mb-2">{b.name}</h4>}
                {rows.length ? (
                  <div className="overflow-x-auto">
                    <DeadlinesTable brand={b} rows={rows} highlightFirst />
                  </div>
                ) : (
                  <p className="text-[13px] text-muted">New dates are being set. Contact your account manager.</p>
                )}
              </div>
            )
          })}
        </div>
        <p className="text-[12px] text-muted mt-4 leading-[1.55]">
          Deadlines that fall on a public holiday move to the previous working day. Issues past their supply date are not shown.
        </p>
      </div>
    </details>
  )
}

function PrintCard({ spec, panel }) {
  return (
    <ChannelCard icon="print" title="Print" rule={PRINT_NOTE}>
      {spec.units.map((u) => (
        <UnitRow key={u.name} thumb={<PrintThumb unit={u} page={spec.page} />} name={u.name} size={printSize(u)} />
      ))}
      {panel}
    </ChannelCard>
  )
}

function BrandSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-[84px] pt-14 first:pt-10">
      <h2 className="text-[clamp(24px,2.8vw,34px)] font-black tracking-[-0.02em] text-ink mb-6">{title}</h2>
      <div className="grid gap-5">{children}</div>
    </section>
  )
}

// ---------- Page ----------

export default function AdSizes() {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />

      <header
        className="relative overflow-hidden text-white px-5 md:px-[52px] pt-14 pb-12 md:pt-20 md:pb-16"
        style={{ background: 'linear-gradient(105deg, #1A1918 0%, #1A1918 42%, #354757 100%)' }}
      >
        <div className="max-w-[980px] mx-auto">
          <h1 className="text-[clamp(32px,4.6vw,52px)] font-black leading-[1.04] tracking-[-0.02em]">
            Ad specs and deadlines
          </h1>
          <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.6] text-white/80">
            Sizes and file requirements for digital, social, and print, with print deadlines for Auto Channel, NZ
            Performance Car, and NZV8.
          </p>
          <nav aria-label="Jump to" className="mt-8 flex flex-wrap gap-3">
            <a
              href="#auto-channel"
              className="rounded-full bg-white text-ink text-[13px] font-bold px-5 py-[10px] hover:bg-off transition-colors"
            >
              Auto Channel
            </a>
            <a
              href="#nzpc-nzv8"
              className="rounded-full bg-white text-ink text-[13px] font-bold px-5 py-[10px] hover:bg-off transition-colors"
            >
              NZ Performance Car &amp; NZV8
            </a>
            <a
              href={PDF_HREF}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/35 text-white text-[13px] font-bold px-5 py-[10px] hover:bg-white/10 transition-colors"
            >
              <Icon name="download" className="w-4 h-4" />
              Print deadlines and specs (PDF)
            </a>
          </nav>
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-[5px] bg-gradient-to-r from-red to-red-dark" />
      </header>

      <div className="bg-off px-5 md:px-[52px] pb-20">
        <div className="max-w-[980px] mx-auto">
          <BrandSection id="auto-channel" title="Auto Channel">
            <DigitalCard units={DIGITAL.ac} />
            <SocialCard />
            <PrintCard
              spec={PRINT.ac}
              panel={<DeadlinesPanel id="ac-print-deadlines" brands={[BRANDS.ac]} />}
            />
          </BrandSection>

          <BrandSection id="nzpc-nzv8" title="NZ Performance Car & NZV8">
            <DigitalCard units={DIGITAL.consumer} />
            <SocialCard />
            <PrintCard
              spec={PRINT.consumer}
              panel={<DeadlinesPanel id="consumer-print-deadlines" brands={[BRANDS.nzpc, BRANDS.nzv8]} />}
            />
          </BrandSection>

          <p className="mt-10 text-[13px] text-muted">
            Dimensions are width × height. Questions about a booking or artwork: talk to your Via Media account manager.
          </p>
        </div>
      </div>
    </>
  )
}
