// A4 portrait, two pages. Rendered at /ad-sizes/print and saved as the PDF
// linked from /ad-sizes. Page 1: print deadlines. Page 2: print sizes and supply.
// To update: change src/data/printDeadlines.js, set UPDATED and AS_FROM below,
// then open /ad-sizes/print in Chrome, Print, Save as PDF (margins: none,
// background graphics on), and replace public/downloads/via-media-print-deadlines-and-specs.pdf.
import { PRINT, printSize, DIGITAL_SCHEDULING } from '../data/adSpecs'
import { BRANDS, openIssues } from '../data/printDeadlines'
import { DateLegend, DeadlinesTable, Icon, PrintThumb } from '../components/AdSpecParts'

const UPDATED = '28 October 2026'
// Rows are filtered as at this date, so the PDF does not change with the day it is built.
const AS_FROM = '2026-10-28'

const PAGE_CSS = `
  @page { size: A4 portrait; margin: 0; }
  html, body { background: #E2E0DC; }
  @media print { html, body { background: #FFFFFF; } }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
`

function Sheet({ children }) {
  return (
    <div
      className="relative bg-white mx-auto my-6 print:my-0 overflow-hidden flex flex-col shadow-[0_12px_32px_rgba(0,0,0,0.12)] print:shadow-none"
      style={{ width: '210mm', height: '297mm', breakAfter: 'page' }}
    >
      {children}
    </div>
  )
}

function Band({ title, sub }) {
  return (
    <div
      className="relative text-white px-[12mm] pt-[9mm] pb-[8mm]"
      style={{ background: 'linear-gradient(105deg, #1A1918 0%, #1A1918 42%, #354757 100%)' }}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[24pt] font-black leading-[1.05] tracking-[-0.01em]">{title}</h1>
          <p className="mt-[2.5mm] text-[9pt] text-white/75 leading-[1.5]">{sub}</p>
        </div>
        <img src="/logos/viamedia-wordmark-white.svg" alt="Via Media" style={{ height: '7mm', width: 'auto' }} />
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-[1.6mm] bg-gradient-to-r from-red to-red-dark" />
    </div>
  )
}

function Foot({ page }) {
  return (
    <div className="mt-auto px-[12mm] pb-[7mm] pt-[3mm] flex justify-between text-[7.5pt] text-muted">
      <span>viamedia.co.nz/ad-sizes · Updated {UPDATED}</span>
      <span>Page {page} of 2</span>
    </div>
  )
}

function BrandTitle({ children }) {
  return <h2 className="text-[13pt] font-black text-ink mb-[2.5mm]">{children}</h2>
}

function SizeList({ spec }) {
  return (
    <div>
      {spec.units.map((u) => (
        <div key={u.name} className="flex items-center gap-[4mm] py-[3.2mm] border-b border-stone">
          <div className="w-[20mm] shrink-0 flex justify-center">
            <PrintThumb unit={u} page={spec.page} height={46} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10pt] font-semibold text-ink">{u.name}</div>
            <div className="text-[9.5pt] text-dim tabular-nums">{printSize(u)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AdSpecsPrint() {
  return (
    <div className="font-sans text-ink">
      <style>{PAGE_CSS}</style>
      <meta name="robots" content="noindex, nofollow" />

      {/* Page 1: deadlines */}
      <Sheet>
        <Band
          title="Print deadlines and specs"
          sub="Auto Channel, NZ Performance Car, and NZV8 · Issues to December 2027"
        />
        <div className="px-[12mm] pt-[7mm]">
          <DateLegend compact />
        </div>
        <div className="px-[12mm] pt-[7mm] grid grid-cols-2 gap-[8mm]">
          <div>
            <BrandTitle>Auto Channel</BrandTitle>
            <DeadlinesTable brand={BRANDS.ac} rows={openIssues(BRANDS.ac, AS_FROM)} compact />
            <p className="text-[7.5pt] text-muted mt-[2mm]">Monthly. No January issue.</p>
          </div>
          <div className="grid gap-[7mm] content-start">
            <div>
              <BrandTitle>NZ Performance Car</BrandTitle>
              <DeadlinesTable brand={BRANDS.nzpc} rows={openIssues(BRANDS.nzpc, AS_FROM)} compact />
            </div>
            <div>
              <BrandTitle>NZV8</BrandTitle>
              <DeadlinesTable brand={BRANDS.nzv8} rows={openIssues(BRANDS.nzv8, AS_FROM)} compact />
            </div>
          </div>
        </div>
        <div className="mx-[12mm] mt-[7mm] rounded-[3mm] bg-off px-[5mm] py-[3.5mm] flex gap-[3mm] items-start">
          <Icon name="calendar" className="w-[4.5mm] h-[4.5mm] text-muted shrink-0 mt-[0.3mm]" />
          <p className="text-[8pt] text-dim leading-[1.55]">
            Deadlines that fall on a public holiday have moved to the previous working day. {DIGITAL_SCHEDULING}
          </p>
        </div>
        <Foot page={1} />
      </Sheet>

      {/* Page 2: sizes and supply */}
      <Sheet>
        <Band title="Print sizes and supply" sub="Dimensions are width × height. Drawings show each unit to scale on its page." />
        <div className="px-[12mm] pt-[7mm] grid grid-cols-2 gap-[8mm]">
          <div>
            <BrandTitle>Auto Channel</BrandTitle>
            <p className="text-[8pt] text-muted mb-[1mm]">Broadsheet, 240 × 340mm trim</p>
            <SizeList spec={PRINT.ac} />
          </div>
          <div>
            <BrandTitle>NZ Performance Car &amp; NZV8</BrandTitle>
            <p className="text-[8pt] text-muted mb-[1mm]">A4 magazine, 210 × 297mm trim</p>
            <SizeList spec={PRINT.consumer} />
          </div>
        </div>
        <div className="mx-[12mm] mt-[8mm] grid grid-cols-2 gap-[5mm]">
          <div className="rounded-[3mm] border border-black/10 px-[5mm] py-[4mm]">
            <div className="flex items-center gap-[2.5mm] text-[9.5pt] font-extrabold text-ink">
              <Icon name="print" className="w-[5mm] h-[5mm]" />
              Supplying print artwork
            </div>
            <p className="mt-[2mm] text-[8.5pt] text-dim leading-[1.55]">
              <b className="text-ink">Auto Channel:</b> {PRINT.ac.note.replace('Supply print ads as ', '')}
            </p>
            <p className="mt-[1mm] text-[8.5pt] text-dim leading-[1.55]">
              <b className="text-ink">NZ Performance Car &amp; NZV8:</b> {PRINT.consumer.note.replace('Supply print ads as ', '')}
            </p>
            <p className="mt-[1.5mm] text-[8.5pt] text-dim leading-[1.55]">
              Add 5mm bleed to double-page, full-page and bottom cover strip ads. Other units need no bleed.
            </p>
          </div>
          <div className="rounded-[3mm] bg-ink text-white px-[5mm] py-[4mm]">
            <div className="flex items-center gap-[2.5mm] text-[9.5pt] font-extrabold">
              <Icon name="digital" className="w-[5mm] h-[5mm]" />
              Digital, social, and EDM
            </div>
            <p className="mt-[2mm] text-[8.5pt] text-white/75 leading-[1.55]">
              Website banners, Meta ads, and email newsletter specs for all three brands are at
              <span className="font-bold text-white"> viamedia.co.nz/ad-sizes</span>
            </p>
          </div>
        </div>
        <Foot page={2} />
      </Sheet>
    </div>
  )
}
