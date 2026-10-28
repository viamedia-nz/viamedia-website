// Shared parts for the /ad-sizes page and its PDF layout (/ad-sizes/print).
import { DATE_TYPES, formatDate } from '../data/printDeadlines'

// One colour per date type, used in every table, legend and card.
export const DATE_COLOURS = {
  makeUp: '#2F5F8A',
  supply: '#D4001A',
  live: '#111110',
}

export function Dot({ type, size = 8 }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block rounded-full shrink-0"
      style={{ width: size, height: size, background: DATE_COLOURS[type] }}
    />
  )
}

// ---------- Icons (line style, as in the proposal pages) ----------
const ICON_PATHS = {
  digital: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  social: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </>
  ),
  print: (
    <>
      <path d="M6 2.5h8l4 4v15H6z" />
      <path d="M14 2.5v4h4M9 11h6M9 14.5h6M9 18h4" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
}

export function Icon({ name, className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  )
}

// ---------- Scale drawings ----------
// Print unit drawn on its page, to scale. Units in mm.
export function PrintThumb({ unit, page, height = 44 }) {
  const m = 10 // type-area margin used for non-bleed units
  const spread = unit.at === 'spread'
  const sheet = unit.at === 'sheet'
  const vw = sheet ? unit.w : spread ? page.w * 2 : page.w
  const vh = sheet ? unit.h : page.h
  let r = { x: 0, y: 0, w: unit.w, h: unit.h }
  if (unit.at === 'bottom') r = { x: (page.w - unit.w) / 2, y: page.h - m - unit.h, w: unit.w, h: unit.h }
  if (unit.at === 'bottom-left') r = { x: m, y: page.h - m - unit.h, w: unit.w, h: unit.h }
  if (unit.at === 'top-right') r = { x: page.w - m - unit.w, y: m, w: unit.w, h: unit.h }
  if (unit.at === 'bottom-bleed') r = { x: 0, y: page.h - unit.h, w: unit.w, h: unit.h }
  const sw = vh / 40
  return (
    <svg
      viewBox={`${-sw} ${-sw} ${vw + sw * 2} ${vh + sw * 2}`}
      style={{ height, width: 'auto' }}
      aria-hidden="true"
    >
      {!sheet && (
        <rect x="0" y="0" width={vw} height={vh} fill="#FFFFFF" stroke="#C9C6C0" strokeWidth={sw} />
      )}
      {spread && <line x1={page.w} y1="0" x2={page.w} y2={vh} stroke="#C9C6C0" strokeWidth={sw} />}
      <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="#354757" rx={sheet ? 0 : 0} />
    </svg>
  )
}

// Digital unit drawn to its aspect ratio inside a fixed box.
export function DigitalThumb({ unit, box = 44 }) {
  const scale = box / Math.max(unit.w, unit.h)
  const w = Math.max(unit.w * scale, 3)
  const h = Math.max(unit.h * scale, 3)
  return (
    <svg viewBox={`0 0 ${box} ${box}`} style={{ width: box, height: box }} aria-hidden="true">
      <rect
        x={(box - w) / 2}
        y={(box - h) / 2}
        width={w}
        height={h}
        rx="1.5"
        fill="#FFFFFF"
        stroke="#354757"
        strokeWidth="1.5"
      />
    </svg>
  )
}

// ---------- Date legend ----------
export function DateLegend({ compact = false }) {
  return (
    <dl className={`grid gap-x-6 gap-y-3 ${compact ? 'grid-cols-3' : 'sm:grid-cols-3'}`}>
      {Object.entries(DATE_TYPES).map(([key, t]) => (
        <div key={key}>
          <dt className="flex items-center gap-2 font-bold text-ink text-[13px]">
            <Dot type={key} />
            {t.label}
          </dt>
          <dd className={`m-0 mt-1 text-muted leading-[1.5] ${compact ? 'text-[11px]' : 'text-[13px]'}`}>{t.text}</dd>
        </div>
      ))}
    </dl>
  )
}

// ---------- Deadlines table ----------
// On phones the weekday sits above the date and the year is dropped, so four
// columns fit without sideways scrolling. The PDF (compact) always shows it in full.
function DateText({ iso, compact, withYear = false }) {
  const full = formatDate(iso, withYear)
  if (compact) return full
  const [dow, ...rest] = formatDate(iso).split(' ')
  return (
    <>
      <span className="sm:hidden">
        <span className="block text-[11px] text-muted font-normal">{dow}</span>
        {rest.join(' ')}
      </span>
      <span className="hidden sm:inline">{full}</span>
    </>
  )
}

// rows: issues to show. highlightFirst marks the next open issue.
export function DeadlinesTable({ brand, rows, highlightFirst = false, compact = false }) {
  const showMonth = brand.id === 'ac'
  const th = compact
    ? 'text-[9px] py-[7px] px-[7px]'
    : 'text-[10px] sm:text-[10.5px] py-2 px-[6px] sm:px-3'
  const td = compact ? 'text-[11.5px] py-[7.5px] px-[7px]' : 'text-[13px] py-[10px] px-[6px] sm:px-3'
  const head = (key, label) => (
    <th className={`${th} text-left font-semibold uppercase tracking-[0.06em] text-muted border-b-2 border-ink whitespace-nowrap`}>
      <span className="inline-flex items-center gap-[6px]">
        <Dot type={key} size={compact ? 6 : 8} />
        {label}
      </span>
    </th>
  )
  return (
    <table className="w-full border-collapse tabular-nums">
      <thead>
        <tr>
          <th className={`${th} text-left font-semibold uppercase tracking-[0.06em] text-muted border-b-2 border-ink`}>
            Issue
          </th>
          {head('makeUp', 'Make-up')}
          {head('supply', 'Supply')}
          {head('live', brand.liveLabel)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => {
          const next = highlightFirst && i === 0
          const cell = `${td} border-b border-stone whitespace-nowrap align-top`
          return (
            <tr key={r.issue} className={next ? 'bg-[#EEF2F6]' : ''}>
              <td
                className={`${cell} font-bold text-ink`}
                style={next ? { boxShadow: 'inset 3px 0 0 #D4001A' } : undefined}
              >
                {r.issue}
                {showMonth && (
                  <span className={`block font-medium text-muted ${compact ? 'text-[9px]' : 'text-[11px]'}`}>
                    {r.month}
                  </span>
                )}
                {next && <span className="sr-only"> (next issue)</span>}
              </td>
              <td className={`${cell} text-dim`}>
                <DateText iso={r.makeUp} compact={compact} />
              </td>
              <td className={`${cell} text-dim`}>
                <DateText iso={r.supply} compact={compact} />
              </td>
              <td className={`${cell} text-ink font-semibold`}>
                <DateText iso={r.live} compact={compact} withYear={!showMonth} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
