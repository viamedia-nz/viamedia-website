import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ENTRANTS } from './chromeShowcaseEntrants'

/* ------------------------------------------------------------------
   CONFIG — edit these, nothing else needs to change.
------------------------------------------------------------------ */
const CONFIG = {
  // Make webhook that writes the row to the Google Sheet.
  webhookUrl: 'https://hook.us1.make.com/h3ak4qo8hhwc815yj1mvm4kjxkdvklcc',
  eventName: 'Chrome Showcase',
  eventDates: '3–4 October 2026',
  eventVenue: 'Auckland Showgrounds',
  selectionName: "New Zealand's Elite 50",
  magazineTitle: "New Zealand's Elite Cars 2026",
  publicationDate: '7 December',
  deadline: 'Monday 21 September',
  heroImage: '/lp/chrome-showcase/chrome-showcase-hero.jpg',
  supportEmail: 'editors@viamedia.co.nz',
  storageKey: 'chrome-showcase-2026-draft',
}

/* ------------------------------------------------------------------
   FIELD DEFINITIONS
------------------------------------------------------------------ */
const CONTACT_FIELDS = [
  { key: 'name', label: 'Name', required: true, autoComplete: 'name' },
  { key: 'email', label: 'Email', required: true, type: 'email', autoComplete: 'email' },
  { key: 'phone', label: 'Phone', required: true, type: 'tel', autoComplete: 'tel' },
  { key: 'instagram', label: 'Instagram handle', hint: 'Optional. So we can tag you when the feature runs.' },
]

const VEHICLE_FIELDS = [
  { key: 'vehicle_make', label: 'Make', required: true },
  { key: 'vehicle_model', label: 'Model', required: true },
  { key: 'vehicle_year', label: 'Year', required: true, inputMode: 'numeric' },
]

const MOD_FIELDS = [
  { key: 'engine_mods', label: 'Engine' },
  { key: 'drivetrain_mods', label: 'Drivetrain', hint: 'Gearbox, diff, driveshaft.' },
  { key: 'suspension_brake_mods', label: 'Suspension and brakes', hint: 'Shocks, arms, calipers, rotors.' },
  { key: 'wheels_tyres', label: 'Wheels and tyres', hint: 'Brand, size, offset, tyre spec.' },
  { key: 'exterior_mods', label: 'Exterior', hint: 'Paint, bodywork, aero.' },
  { key: 'interior_mods', label: 'Interior', hint: 'Steering wheel, seats, gauges, trim.' },
]

const PERFORMANCE_FIELDS = [
  { key: 'power_kw', label: 'Power (kW)' },
  { key: 'torque_nm', label: 'Torque (Nm)' },
  { key: 'boost_psi', label: 'Boost (psi)' },
  { key: 'fuel_type', label: 'Fuel type' },
  { key: 'tuner', label: 'Tuner' },
]

const DRIVER_FIELDS = [
  { key: 'driver_owner', label: 'Driver / owner' },
  { key: 'age', label: 'Age' },
  { key: 'location', label: 'Location' },
  { key: 'ownership_length', label: 'Length of ownership' },
]

const TEXT_KEYS = ['workshops', 'build_background', 'thanks']

const ALL_KEYS = [
  ...CONTACT_FIELDS, ...VEHICLE_FIELDS, ...MOD_FIELDS,
  ...PERFORMANCE_FIELDS, ...DRIVER_FIELDS,
].map(f => f.key).concat(TEXT_KEYS, ['specs_unchanged'])

const EMPTY = ALL_KEYS.reduce(
  (acc, k) => ({ ...acc, [k]: k === 'specs_unchanged' ? false : '' }), {}
)

/* ------------------------------------------------------------------
   PRESENTATION HELPERS
------------------------------------------------------------------ */
const inputBase =
  'w-full bg-white border border-stone rounded-sm px-4 py-3 text-[15px] text-ink ' +
  'placeholder:text-muted/60 focus:outline-none focus:border-red focus:ring-1 focus:ring-red ' +
  'transition-colors'

function Field({ field, value, onChange, invalid }) {
  const { key, label, hint, required, type = 'text', ...rest } = field
  return (
    <div className="mb-6">
      <label htmlFor={key} className="block text-[13px] font-bold tracking-[0.06em] uppercase text-ink mb-2">
        {label}{required && <span className="text-red ml-1">*</span>}
      </label>
      {hint && <p className="text-[13px] text-muted leading-[1.7] mb-2">{hint}</p>}
      <input
        id={key}
        name={key}
        type={type}
        value={value}
        aria-invalid={invalid || undefined}
        onChange={e => onChange(key, e.target.value)}
        className={`${inputBase} ${invalid ? 'border-red' : ''}`}
        {...rest}
      />
      {invalid && <p className="text-[13px] text-red mt-2">Please fill this in.</p>}
    </div>
  )
}

function TextArea({ field, value, onChange, rows = 4 }) {
  const { key, label, hint } = field
  return (
    <div className="mb-6">
      <label htmlFor={key} className="block text-[13px] font-bold tracking-[0.06em] uppercase text-ink mb-2">
        {label}
      </label>
      {hint && <p className="text-[13px] text-muted leading-[1.7] mb-2">{hint}</p>}
      <textarea
        id={key}
        name={key}
        rows={rows}
        value={value}
        onChange={e => onChange(key, e.target.value)}
        className={`${inputBase} resize-y leading-[1.7]`}
      />
    </div>
  )
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase text-red mb-3">
        <div className="w-[22px] h-0.5 bg-red" />
        {eyebrow}
      </div>
      <h2 className="text-[clamp(22px,2.5vw,30px)] font-black tracking-[-0.02em] uppercase text-ink">
        {title}
      </h2>
      {children && <div className="text-[15px] text-dim leading-[1.85] mt-4 max-w-[720px]">{children}</div>}
    </div>
  )
}

/* ------------------------------------------------------------------
   PAGE
------------------------------------------------------------------ */
export default function ChromeShowcase() {
  const [params] = useSearchParams()
  const code = (params.get('e') || '').toUpperCase().trim()
  const entrant = ENTRANTS[code]
  // One draft per car. Sharing a single key across links would let a
  // half-finished entry reappear under a different vehicle.
  const storageKey = `${CONFIG.storageKey}-${code || 'nocode'}`

  const initial = useMemo(() => {
    let saved = {}
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (raw) saved = JSON.parse(raw)
    } catch { /* private browsing or storage disabled */ }
    return {
      ...EMPTY,
      ...(entrant ? {
        name: entrant.name || '',
        driver_owner: entrant.name || '',
        vehicle_make: entrant.make || '',
        vehicle_model: entrant.model || '',
        vehicle_year: entrant.year || '',
        build_background: entrant.info || '',
      } : {}),
      ...saved,
    }
  }, [entrant])

  const [values, setValues] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [missing, setMissing] = useState([])
  const formRef = useRef(null)

  // Reads every named field straight out of the DOM.
  // Browser autofill and password managers write values into the input without
  // always firing the event React listens for, so React state can be empty while
  // the field looks filled. The DOM is the only reliable source at submit time.
  function readForm() {
    const el = formRef.current
    if (!el) return {}
    const out = {}
    for (const [key, val] of new FormData(el).entries()) {
      if (typeof val === 'string') out[key] = val
    }
    return out
  }

  // Chrome can autofill before React finishes hydrating. Pick up anything it
  // wrote once the page has settled, so the autosaved draft holds real values.
  useEffect(() => {
    const t = setTimeout(() => {
      const dom = readForm()
      setValues(v => {
        const changed = Object.keys(dom).some(k => (dom[k] || '') !== (v[k] || ''))
        return changed ? { ...v, ...dom } : v
      })
    }, 400)
    return () => clearTimeout(t)
  }, [])

  // Autosave the draft to this browser only.
  useEffect(() => {
    if (status === 'done') return
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(values))
    } catch { /* ignore */ }
  }, [values, status])

  const setField = (key, val) => {
    setValues(v => ({ ...v, [key]: val }))
    if (missing.length) setMissing(m => m.filter(k => k !== key))
  }

  const requiredKeys = [...CONTACT_FIELDS, ...VEHICLE_FIELDS]
    .filter(f => f.required).map(f => f.key)

  async function handleSubmit(e) {
    e.preventDefault()

    const merged = { ...values, ...readForm() }
    setValues(merged)

    const empty = requiredKeys.filter(k => !String(merged[k] || '').trim())
    if (empty.length) {
      setMissing(empty)
      const el = document.getElementById(empty[0])
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el?.focus({ preventScroll: true })
      return
    }

    setStatus('sending')

    // Sent as form-urlencoded: a simple request, so no CORS preflight.
    const body = new URLSearchParams()
    body.set('entrant_code', code || '')
    body.set('submitted_at', new Date().toISOString())
    body.set('plate', entrant?.plate || '')
    body.set('special_info_original', entrant?.info || '')
    ALL_KEYS.forEach(k => {
      const v = merged[k]
      body.set(k, typeof v === 'boolean' ? (v ? 'Yes' : 'No') : String(v || ''))
    })

    try {
      const res = await fetch(CONFIG.webhookUrl, { method: 'POST', body })
      if (!res.ok) throw new Error(`Webhook returned ${res.status}`)
      try { window.localStorage.removeItem(storageKey) } catch { /* ignore */ }
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'chrome_showcase_submit', entrant_code: code || '(none)' })
      setStatus('done')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Chrome Showcase submit failed', err)
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <>
        <title>Thanks — Chrome Showcase</title>
        <meta name="robots" content="noindex, nofollow" />
        <section className="bg-off py-16 md:py-[110px] px-5 md:px-[52px] border-t-4 border-t-red">
          <div className="max-w-[720px] mx-auto">
            <h1 className="text-[clamp(30px,4vw,48px)] font-black leading-[1.05] tracking-[-0.03em] uppercase mb-6">
              Thanks — we have your details
            </h1>
            <p className="text-[15px] text-dim leading-[1.85] mb-4">
              We have emailed you a copy of your answers. If anything needs correcting, reply to
              that email and we will fix it.
            </p>
            <p className="text-[15px] text-dim leading-[1.85]">
              See you at {CONFIG.eventVenue} on {CONFIG.eventDates}. Your feature runs in{' '}
              {CONFIG.magazineTitle}, out {CONFIG.publicationDate}.
            </p>
            <p className="text-[15px] text-dim leading-[1.85] mt-8">
              The teams at NZ Performance Car and NZV8.
            </p>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <title>Elite 50 entrant details — Via Media</title>
      <meta name="robots" content="noindex, nofollow" />

      <section className="bg-ink border-t-4 border-t-red">
        <img
          src={CONFIG.heroImage}
          alt={`${CONFIG.eventName} ${CONFIG.eventDates}`}
          className="w-full max-w-[1217px] mx-auto h-auto block"
        />
      </section>

      <section className="bg-off pt-12 md:pt-16 pb-16 md:pb-[110px] px-5 md:px-[52px]">
        <div className="max-w-[760px] mx-auto">

          <h1 className="text-[clamp(30px,4vw,48px)] font-black leading-[1.05] tracking-[-0.03em] uppercase mb-6">
            Your car is in {CONFIG.selectionName}
          </h1>

          <div className="text-[15px] text-dim leading-[1.85] space-y-4 mb-10">
            <p>
              Your car has been selected for {CONFIG.selectionName} at {CONFIG.eventName},
              {' '}{CONFIG.eventVenue}, {CONFIG.eventDates}.
            </p>
            <p>
              To mark it, the teams at NZ Performance Car and NZV8 are publishing a
              special-edition collectable magazine, {CONFIG.magazineTitle}, out{' '}
              {CONFIG.publicationDate}. Your car gets a dedicated one-page feature covering the
              build, with photos our photographers will shoot at the show.
            </p>
            <p>
              We need the details from you before the show, so the feature is ready to write as
              soon as the photos land. It takes about ten minutes. Your answers save in this
              browser as you go, so you can close the tab and come back to the same link to
              finish.
            </p>
            <p className="font-bold text-ink">
              Please submit by {CONFIG.deadline}.
            </p>
          </div>

          {entrant && (
            <div className="border-l-2 border-red bg-white px-5 py-4 mb-10">
              <p className="text-[14px] text-dim leading-[1.7]">
                This link is for <span className="font-bold text-ink">{entrant.name}</span> and the{' '}
                <span className="font-bold text-ink">
                  {[entrant.year, entrant.make, entrant.model].filter(Boolean).join(' ')}
                </span>
                {entrant.plate ? <> (<span className="font-bold text-ink">{entrant.plate}</span>)</> : null}.
                If anything is not right, type over it below.
              </p>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} noValidate>

            <SectionHeading eyebrow="Step 1" title="Your contact details" />
            {CONTACT_FIELDS.map(f => (
              <Field key={f.key} field={f} value={values[f.key]} onChange={setField}
                     invalid={missing.includes(f.key)} />
            ))}

            <hr className="my-12 border-0 border-t border-black/10" />

            <SectionHeading eyebrow="Step 2" title="Vehicle details" />
            <div className="grid md:grid-cols-3 md:gap-x-5">
              {VEHICLE_FIELDS.map(f => (
                <Field key={f.key} field={f} value={values[f.key]} onChange={setField}
                       invalid={missing.includes(f.key)} />
              ))}
            </div>

            <hr className="my-12 border-0 border-t border-black/10" />

            <SectionHeading eyebrow="Step 3" title="The build">
              {entrant?.info
                ? <p>You gave Chrome Showcase a short note about the build when you entered. It is
                    below. Correct it, add to it, or leave it as it is.</p>
                : <p>Tell us the story of the build in your own words — where the car came from,
                    what you set out to do, and anything that makes it stand out.</p>}
            </SectionHeading>
            <TextArea
              field={{ key: 'build_background', label: 'Build background' }}
              value={values.build_background} onChange={setField} rows={8}
            />

            <hr className="my-12 border-0 border-t border-black/10" />

            <SectionHeading eyebrow="Step 4" title="Workshops and suppliers">
              <p>
                We like to credit everyone involved, so please list the businesses and workshops
                that worked on your build and what they did or supplied. Include your contact
                there and their phone or email. We will approach them so they have the chance to
                promote their work alongside your feature.
              </p>
            </SectionHeading>
            <TextArea
              field={{ key: 'workshops', label: 'Workshops and suppliers' }}
              value={values.workshops} onChange={setField} rows={6}
            />

            <hr className="my-12 border-0 border-t border-black/10" />

            <SectionHeading eyebrow="Step 5" title="Modifications" />
            <label className="flex items-start gap-3 mb-8 cursor-pointer">
              <input
                type="checkbox"
                checked={values.specs_unchanged}
                onChange={e => setField('specs_unchanged', e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#D4001A]"
              />
              <span className="text-[15px] text-dim leading-[1.7]">
                My car has already featured in NZ Performance Car or NZV8 and the specs have not
                changed.
              </span>
            </label>

            {!values.specs_unchanged && (
              <>
                <p className="text-[15px] text-dim leading-[1.85] mb-8">
                  Fill in what applies. Leave anything blank that does not.
                </p>
                {MOD_FIELDS.map(f => (
                  <TextArea key={f.key} field={f} value={values[f.key]} onChange={setField} rows={3} />
                ))}
              </>
            )}

            <hr className="my-12 border-0 border-t border-black/10" />

            <SectionHeading eyebrow="Step 6" title="Performance" />
            <div className="grid md:grid-cols-3 md:gap-x-5">
              {PERFORMANCE_FIELDS.map(f => (
                <Field key={f.key} field={f} value={values[f.key]} onChange={setField} />
              ))}
            </div>

            <hr className="my-12 border-0 border-t border-black/10" />

            <SectionHeading eyebrow="Step 7" title="Driver profile" />
            <div className="grid md:grid-cols-2 md:gap-x-5">
              {DRIVER_FIELDS.map(f => (
                <Field key={f.key} field={f} value={values[f.key]} onChange={setField} />
              ))}
            </div>
            <TextArea
              field={{ key: 'thanks', label: 'Thanks', hint: 'Anyone you want to acknowledge.' }}
              value={values.thanks} onChange={setField} rows={3}
            />

            <hr className="my-12 border-0 border-t border-black/10" />

            {missing.length > 0 && (
              <p className="text-[15px] text-red leading-[1.7] mb-6">
                Some required details are still blank. They are marked above.
              </p>
            )}

            {status === 'error' && (
              <p className="text-[15px] text-red leading-[1.7] mb-6">
                Something went wrong sending your details. Your answers are still saved in this
                browser, so try again in a moment. If it keeps failing, email{' '}
                <a href={`mailto:${CONFIG.supportEmail}`} className="underline">{CONFIG.supportEmail}</a>.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-red hover:bg-red-dark disabled:opacity-60 disabled:cursor-not-allowed
                         text-white text-[13px] font-bold tracking-[0.16em] uppercase
                         px-10 py-4 rounded-sm transition-colors"
            >
              {status === 'sending' ? 'Sending…' : 'Send my details'}
            </button>

            <p className="text-[13px] text-muted leading-[1.7] mt-6">
              We use these details only to produce your feature and to credit the businesses
              involved in your build.
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
