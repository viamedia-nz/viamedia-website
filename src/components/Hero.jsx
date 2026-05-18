import { useEffect, useRef, useState } from 'react'

const STATS = [
  { num: '3.5', suffix: 'M+', label: 'Audience Contact Points Each Month' },
  { num: '450', suffix: 'K+', label: 'First-Party Audience Across NZ Automotive' },
  { num: '30', suffix: '+', label: 'Years Trusted by NZ Automotive Communities' },
]

// Equal-gap clamp — used for both lockup→eyebrow and eyebrow→H1
const VALUE_A = 'clamp(16px, 1.8vw, 26px)'
const MOBILE_MAX = 767

export default function Hero() {
  const heroRef = useRef(null)
  const containerRef = useRef(null)
  const rightColRef = useRef(null)
  const eyebrowRef = useRef(null)
  const subRef = useRef(null)
  const watermarkRef = useRef(null)
  const statBlockRef = useRef(null)
  const statRowRefs = useRef([])
  const firstNumRef = useRef(null)
  const lastNumRef = useRef(null)

  const [splitLeft, setSplitLeft] = useState('50%')
  const [statBlockStyle, setStatBlockStyle] = useState({})
  const [watermarkStyle, setWatermarkStyle] = useState({})
  const [pinTopStyle, setPinTopStyle] = useState({})
  const [pinBottomStyle, setPinBottomStyle] = useState({})
  const [statFontSize, setStatFontSize] = useState(null)
  const [rowIndents, setRowIndents] = useState([16, 16, 16])
  const [bandHeight, setBandHeight] = useState(0)
  const [isShortViewport, setIsShortViewport] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [heroMaxHeight, setHeroMaxHeight] = useState('none')

  // Split anchoring + band height + viewport flags + hero max-height — always runs
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const SHORT_VIEWPORT = 720
    const update = () => {
      const rect = el.getBoundingClientRect()
      setSplitLeft(`${rect.left + rect.width / 2}px`)

      // Viewport flags
      const vw = window.innerWidth
      const vh = window.innerHeight
      const mob = vw < 768
      const short = vh < SHORT_VIEWPORT
      setIsMobileViewport(mob)
      setIsShortViewport(short)

      // Logo band sits directly after the hero in the DOM.
      // No band subtraction on mobile — hero takes content height naturally.
      let measuredBand = 0
      if (!mob) {
        const bandEl = heroRef.current?.nextElementSibling
        if (bandEl) measuredBand = bandEl.offsetHeight
      }
      setBandHeight(measuredBand)

      // Content-aware max-height: only constrain when there is enough room for
      // both the hero content and the logo band. Otherwise let the hero take
      // its natural content height and reveal the band on scroll. Prevents
      // top/bottom clipping at non-standard viewport/zoom combinations.
      if (mob || short) {
        setHeroMaxHeight('none')
        return
      }
      const availableHeight = vh - 68 - measuredBand
      requestAnimationFrame(() => {
        // containerRef IS the hero-inner element — reuse for content height
        const innerEl = containerRef.current
        if (innerEl) {
          const contentHeight = innerEl.scrollHeight
          if (contentHeight > availableHeight * 0.92) {
            setHeroMaxHeight('none')
          } else {
            setHeroMaxHeight(`${availableHeight}px`)
          }
        } else {
          setHeroMaxHeight('none')
        }
      })
    }
    const obs = new ResizeObserver(update)
    obs.observe(el)
    obs.observe(document.body)
    const bandEl = heroRef.current?.nextElementSibling
    if (bandEl) obs.observe(bandEl)
    update()
    return () => obs.disconnect()
  }, [])

  // Right panel dynamic system — desktop only
  useEffect(() => {
    const computeMobileReset = () => {
      setStatBlockStyle({})
      setWatermarkStyle({ display: 'none' })
      setPinTopStyle({ display: 'none' })
      setPinBottomStyle({ display: 'none' })
      setStatFontSize(null)
      setRowIndents([0, 0, 0])
    }

    const update = () => {
      if (window.innerWidth <= MOBILE_MAX) {
        computeMobileReset()
        return
      }

      requestAnimationFrame(() => {
        const heroEl = heroRef.current
        const eyebrowEl = eyebrowRef.current
        const subEl = subRef.current
        const rcEl = rightColRef.current
        const firstNumEl = firstNumRef.current
        const lastNumEl = lastNumRef.current
        const firstRowEl = statRowRefs.current[0]
        const lastRowEl = statRowRefs.current[2]
        if (!heroEl || !eyebrowEl || !subEl || !rcEl ||
            !firstNumEl || !lastNumEl || !firstRowEl || !lastRowEl) return

        // 1. Measure all rects
        const heroRect = heroEl.getBoundingClientRect()
        const eyebrowRect = eyebrowEl.getBoundingClientRect()
        const subRect = subEl.getBoundingClientRect()
        const rcRect = rcEl.getBoundingClientRect()
        const firstNumRect = firstNumEl.getBoundingClientRect()
        const lastNumRect = lastNumEl.getBoundingClientRect()
        const firstRowRect = firstRowEl.getBoundingClientRect()
        const lastRowRect = lastRowEl.getBoundingClientRect()

        // Padding between numeral and the row container edges (rounded to avoid sub-pixel drift)
        const numPaddingAbove = Math.round(firstNumRect.top - firstRowRect.top)
        const numPaddingBelow = Math.round(lastRowRect.bottom - lastNumRect.bottom)

        // 2. Stat block — sized so the first numeral top aligns with eyebrow top
        // and the last numeral bottom aligns with sub-headline bottom.
        // Top is relative to the right column (stat block's positioned ancestor).
        // Rounded to eliminate sub-pixel drift between left and right panel alignment.
        const statTop = Math.round((eyebrowRect.top - rcRect.top) - numPaddingAbove)
        const targetSpan = subRect.bottom - eyebrowRect.top
        // Floor stat block height — prevents invalid inputs at very short viewports
        // from breaking the watermark/pin line calculations downstream.
        const minStatHeight = 200
        const statHeight = Math.max(
          minStatHeight,
          targetSpan + numPaddingAbove + numPaddingBelow
        )

        setStatBlockStyle({
          position: 'absolute',
          top: `${statTop}px`,
          height: `${statHeight}px`,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 2,
        })

        // Provisional stat font size — close to final, allows row positions
        // to settle in Frame 2 before pin/watermark calc in Frame 3.
        const provisionalFontSize = Math.min(80, Math.max(36, Math.floor((statHeight / 3) * 0.55)))
        setStatFontSize(provisionalFontSize)

        // Frame 2 — diagonal indentation. Nested rAF so the font size
        // change has reflowed before we measure the row midpoints.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const heroRect2 = heroEl.getBoundingClientRect()
            const heroHeight = heroRect2.height
            const basePad = 32

            const indents = statRowRefs.current.map((row) => {
              if (!row) return basePad
              const rRect = row.getBoundingClientRect()
              const midY = rRect.top + rRect.height / 2 - heroRect2.top
              const indent = ((heroHeight - midY) / heroHeight) * 80 + basePad
              return indent
            })
            setRowIndents(indents)

            // Frame 3 — pin lines from inter-row gaps, then watermark from pin span.
            // Triple-nested rAF (Frame 1 outer + Frame 2 + this) so all row positions
            // have settled after font reflow and diagonal indentation.
            requestAnimationFrame(() => {
              if (window.innerWidth < 768) return

              const heroEl3 = heroRef.current
              const rcEl3 = rightColRef.current
              const row0El = statRowRefs.current[0]
              const row1El = statRowRefs.current[1]
              const row2El = statRowRefs.current[2]
              if (!heroEl3 || !rcEl3 || !row0El || !row1El || !row2El) return

              const rcRect3 = rcEl3.getBoundingClientRect()
              const row0Rect = row0El.getBoundingClientRect()
              const row1Rect = row1El.getBoundingClientRect()
              const row2Rect = row2El.getBoundingClientRect()

              // Pin lines: midpoint of each inter-row gap, relative to right column
              const pinTopY = (row0Rect.bottom + row1Rect.top) / 2 - rcRect3.top
              const pinBottomY = (row1Rect.bottom + row2Rect.top) / 2 - rcRect3.top

              // Pin left boundary — start at the diagonal split line at the pin's own Y
              // so the pin never overlaps into the dark left panel area.
              // Compute splitPx from the container directly (not from state) to avoid
              // a stale closure value if the container has resized.
              const heroRect3 = heroEl3.getBoundingClientRect()
              const cRect3 = containerRef.current.getBoundingClientRect()
              const splitPx = cRect3.left + cRect3.width / 2
              const pinTopY_vp = rcRect3.top + pinTopY
              const pinBottomY_vp = rcRect3.top + pinBottomY
              const diagAtPinTop =
                splitPx + 80 * (1 - (pinTopY_vp - heroRect3.top) / heroRect3.height)
              const diagAtPinBottom =
                splitPx + 80 * (1 - (pinBottomY_vp - heroRect3.top) / heroRect3.height)
              const pinTopLeft = diagAtPinTop - rcRect3.left
              const pinBottomLeft = diagAtPinBottom - rcRect3.left

              setPinTopStyle({
                position: 'absolute',
                top: `${pinTopY}px`,
                left: `${pinTopLeft}px`,
                right: 0,
                height: 1,
                background: 'rgba(255,255,255,0.09)',
                zIndex: 3,
                pointerEvents: 'none',
              })
              setPinBottomStyle({
                position: 'absolute',
                top: `${pinBottomY}px`,
                left: `${pinBottomLeft}px`,
                right: 0,
                height: 1,
                background: 'rgba(255,255,255,0.09)',
                zIndex: 3,
                pointerEvents: 'none',
              })

              // Watermark sized so its letterform band lands on the pin lines
              const letterformSpan = pinBottomY - pinTopY
              const wmHeight = letterformSpan / (0.6666 - 0.3335)
              const wmTop = pinTopY - wmHeight * 0.3335

              setWatermarkStyle({
                position: 'absolute',
                width: `${wmHeight}px`,
                height: `${wmHeight}px`,
                top: `${wmTop}px`,
                left: '50%',
                transform: 'translateX(-30%)',
                opacity: 0.06,
                pointerEvents: 'none',
                zIndex: 1,
                maxWidth: 'none',
              })
            })
          })
        })
      })
    }

    update()
    const obs = new ResizeObserver(update)
    if (heroRef.current) obs.observe(heroRef.current)
    if (containerRef.current) obs.observe(containerRef.current)
    obs.observe(document.body)
    window.addEventListener('resize', update)

    return () => {
      obs.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  // Derived hero min-height. Max-height is now content-aware state (heroMaxHeight),
  // set in the ResizeObserver — 'none' when content is too tall for the band to fit,
  // otherwise the calc value so the band shows on first load.
  const heroHeightCalc = `calc(100vh - 68px - ${bandHeight}px)`
  const heroMinHeight =
    isMobileViewport || isShortViewport ? 'auto' : heroHeightCalc

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden flex items-stretch px-5 md:px-[52px]"
      style={{
        minHeight: heroMinHeight,
        maxHeight: heroMaxHeight,
        background: '#1A1918',
      }}
    >
      {/* Red left rule */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: '#D4001A',
          zIndex: 4,
        }}
      />

      {/* Split background — right panel colour, anchored to container midpoint */}
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: splitLeft,
          right: 0,
          background: '#354757',
          clipPath: 'polygon(80px 0, 100% 0, 100% 100%, 0% 100%)',
          zIndex: 0,
        }}
      />

      {/* Hero inner — 1200px max two-column grid.
          Vertical padding uses clamp(_, _vh, _) so it compresses at shorter
          viewports while keeping the original feel at 1080+. Horizontal padding
          stays on the section (px-5 md:px-[52px]). */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          minHeight: heroMinHeight,
          alignItems: 'stretch',
          padding: isMobileViewport
            ? '32px 0 clamp(28px, 5vh, 100px)'
            : 'clamp(24px, 4vh, 88px) 0 clamp(28px, 5vh, 100px)',
        }}
      >
        {/* LEFT COLUMN */}
        <div
          className="md:pr-[clamp(32px,4vw,64px)]"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            overflow: 'hidden',
          }}
        >
          {/* Wordmark lockup */}
          <img
            src="/logos/viamedia-wordmark-white.svg"
            alt="Via Media"
            className="w-[clamp(180px,55vw,280px)] md:w-[clamp(200px,22vw,330px)]"
            style={{
              display: 'block',
              height: 'auto',
              marginBottom: isMobileViewport ? 28 : VALUE_A,
              imageRendering: 'auto',
              WebkitFontSmoothing: 'antialiased',
            }}
          />

          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: isMobileViewport ? '11px' : 'clamp(9px, 0.8vw, 11px)',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#D4001A',
              marginBottom: VALUE_A,
            }}
          >
            <div style={{ width: 28, height: 2, background: '#D4001A' }} />
            Content-Led, Audience-Powered
          </div>

          {/* H1 */}
          <h1
            className="text-[clamp(38px,5.2vw,72px)] md:text-[clamp(42px,5.2vw,76px)]"
            style={{
              fontWeight: 900,
              lineHeight: 0.97,
              letterSpacing: '-0.035em',
              color: 'white',
              textTransform: 'uppercase',
              marginBottom: 'clamp(14px, 1.4vw, 20px)',
            }}
          >
            Automotive Marketing,
            <span style={{ display: 'block', color: '#D4001A' }}>Built on</span>
            <span style={{ display: 'block', color: '#D4001A' }}>Audience</span>
          </h1>

          {/* Sub-headline */}
          <p
            ref={subRef}
            className="font-body"
            style={{
              fontSize: 'clamp(13px, 1.0vw, 15px)',
              fontWeight: 400,
              lineHeight: 1.85,
              color: 'rgba(255,255,255,0.52)',
              maxWidth: 420,
              marginBottom: 'clamp(28px, 2.8vw, 44px)',
            }}
          >
            Via Media connects brands with New Zealand's automotive audiences through content, paid media, and search.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 14,
            }}
          >
            <a
              href="#solutions"
              className="hover:bg-[#A80015] hover:-translate-y-px"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#D4001A',
                color: 'white',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '16px 32px',
                textDecoration: 'none',
                transition: 'all 180ms',
              }}
            >
              Explore Services →
            </a>
            <a
              href="#audiences"
              className="hover:border-white/60 hover:text-white/90"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.55)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '15px 26px',
                textDecoration: 'none',
                transition: 'all 180ms',
              }}
            >
              Our Audiences →
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN — overflow not clipped here; section-level overflow:hidden
            contains any bleed at the page level. */}
        <div
          ref={rightColRef}
          className="mt-10 md:mt-0"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Watermark — desktop only */}
          <img
            ref={watermarkRef}
            src="/logos/viamedia-mark-hero-overlay.svg"
            alt=""
            className="hidden md:block"
            style={watermarkStyle}
          />

          {/* Pin lines — desktop only */}
          <div className="hidden md:block" style={pinTopStyle} />
          <div className="hidden md:block" style={pinBottomStyle} />

          {/* Stat block — desktop is absolutely positioned (via inline style),
              mobile falls back to in-flow flex column */}
          <div
            ref={statBlockRef}
            className="md:block flex flex-col"
            style={statBlockStyle}
          >
            {STATS.map((stat, i) => {
              const isFirst = i === 0
              const isLast = i === STATS.length - 1
              return (
                <div
                  key={i}
                  ref={(el) => { statRowRefs.current[i] = el }}
                  className={!isLast ? 'border-b border-white/[0.09] md:border-b-0 py-5 md:py-0' : 'py-5 md:py-0'}
                  style={{ paddingLeft: rowIndents[i] }}
                >
                  <div
                    ref={isFirst ? firstNumRef : isLast ? lastNumRef : null}
                    className="text-[clamp(36px,3.8vw,58px)] md:text-[unset]"
                    style={{
                      fontSize: window.innerWidth > MOBILE_MAX && statFontSize ? `${statFontSize}px` : undefined,
                      fontWeight: 900,
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      color: 'white',
                    }}
                  >
                    {stat.num}
                    <span style={{ color: '#D4001A' }}>{stat.suffix}</span>
                  </div>
                  <div
                    style={{
                      fontSize: isMobileViewport ? '11px' : 'clamp(9px, 0.85vw, 12px)',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#9CA3AF',
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
