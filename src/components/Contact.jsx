import { useRef, useState } from 'react'

const OBJECTIVE_OPTIONS = [
  "I'm looking to grow my customer base",
  "I'm launching a new product or service",
  "I'm looking to build brand presence",
  "I'm looking to outsource my marketing function",
  "I'm not sure yet — I'd like to find out what's possible",
]

const FORMSPREE_URL = 'https://formspree.io/f/mykoanpz'

export default function Contact() {
  const [fields, setFields] = useState({
    firstName: '', lastName: '', email: '', company: '', phone: '', objective: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }))

  const formRef = useRef(null)

  // Reads every named field straight out of the DOM.
  // Browser autofill and password managers write values into the input without
  // always firing the event React listens for, so React state can be empty while
  // the field looks filled. The DOM is the only reliable source at submit time.
  const readForm = () => {
    const el = formRef.current
    if (!el) return {}
    const out = {}
    for (const [key, val] of new FormData(el).entries()) {
      if (typeof val === 'string') out[key] = val
    }
    return out
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    const merged = { ...fields, ...readForm() }
    setFields(merged)
    try {
      const body = new FormData()
      body.append('_subject', 'New Enquiry — Via Media Website')
      body.append('First Name', merged.firstName)
      body.append('Last Name', merged.lastName)
      body.append('Email', merged.email)
      body.append('Company', merged.company)
      body.append('Phone', merged.phone)
      body.append('Marketing Objective', merged.objective)
      body.append('Message', merged.message)
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      })
      const data = await res.json()
      setStatus(data.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-steel py-16 md:py-[120px] px-5 md:px-[52px]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[100px] items-start">

        {/* Left column */}
        <div className="fade-up">
          <div className="mb-16">
            {/* Wordmark lockup at all viewport sizes (mobile uses clamp matching hero mobile) */}
            <img
              src="/logos/viamedia-wordmark-white.svg"
              alt="Via Media"
              className="block w-[clamp(180px,55vw,280px)] md:w-[312px] h-auto"
              style={{ imageRendering: 'auto', WebkitFontSmoothing: 'antialiased' }}
            />
          </div>
          <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase text-white/45 mb-[18px]">
            <div className="w-[22px] h-0.5 bg-white/45" />
            Get in Touch
          </div>
          <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.03] tracking-[-0.03em] uppercase text-white mb-5">
            Let's Talk About<br />Your <em className="not-italic text-red">Business</em>
          </h2>
          <p className="text-[15px] text-on-dark leading-[1.85] mb-11">
            Tell us about your business, your goals, and who you're trying to reach. We'll come back with how we can help and what that looks like in practice.
          </p>
        </div>

        {/* Right column — form */}
        <div className="fade-up delay-1">
          {status === 'success' ? (
            <div className="py-10 text-on-dark text-[15px] leading-[1.8]">
              Thank you — we'll be in touch shortly.
            </div>
          ) : (
            <form ref={formRef} className="flex flex-wrap gap-3" onSubmit={handleSubmit}>
              {/* Row 1: First Name + Last Name */}
              <div className="flex flex-col gap-[7px] w-full min-[480px]:w-[calc(50%-6px)]">
                <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  value={fields.firstName}
                  onChange={set('firstName')}
                  name="firstName"
                  autoComplete="given-name"
                  required
                  className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22] min-w-0 w-full"
                />
              </div>
              <div className="flex flex-col gap-[7px] w-full min-[480px]:w-[calc(50%-6px)]">
                <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={fields.lastName}
                  onChange={set('lastName')}
                  name="lastName"
                  autoComplete="family-name"
                  required
                  className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22] min-w-0 w-full"
                />
              </div>
              {/* Row 2: Email + Company */}
              <div className="flex flex-col gap-[7px] w-full min-[480px]:w-[calc(50%-6px)]">
                <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Email Address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={fields.email}
                  onChange={set('email')}
                  name="email"
                  autoComplete="email"
                  required
                  className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22] min-w-0 w-full"
                />
              </div>
              <div className="flex flex-col gap-[7px] w-full min-[480px]:w-[calc(50%-6px)]">
                <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Company</label>
                <input
                  type="text"
                  placeholder="Company name"
                  value={fields.company}
                  onChange={set('company')}
                  name="company"
                  autoComplete="organization"
                  className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22] min-w-0 w-full"
                />
              </div>
              {/* Phone — half width */}
              <div className="flex flex-col gap-[7px] w-full min-[480px]:w-[calc(50%-6px)]">
                <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Phone</label>
                <input
                  type="tel"
                  placeholder="e.g. 021 422 1234 or +64 21 422 1234"
                  value={fields.phone}
                  onChange={set('phone')}
                  name="phone"
                  autoComplete="tel"
                  className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22] min-w-0 w-full"
                />
              </div>
              {/* Marketing Objective — full width */}
              <div className="flex flex-col gap-[7px] w-full">
                <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Marketing Objective</label>
                <select
                  value={fields.objective}
                  onChange={set('objective')}
                  name="objective"
                  autoComplete="off"
                  required
                  className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 [&>option]:bg-[#2B3A4A] [&>option]:text-[#D1D5DB] [&>option:checked]:bg-[#354757] [&>option:checked]:text-white [&:invalid]:text-white/[0.22]"
                >
                  <option value="" disabled hidden>Select your marketing objective</option>
                  {OBJECTIVE_OPTIONS.map(opt => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              {/* Message — full width */}
              <div className="flex flex-col gap-[7px] w-full">
                <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Message</label>
                <textarea
                  placeholder="Tell us about your goals"
                  value={fields.message}
                  onChange={set('message')}
                  name="message"
                  autoComplete="off"
                  className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22] resize-y min-h-[110px] w-full"
                />
              </div>
              {/* Error message */}
              {status === 'error' && (
                <p className="w-full text-sm text-red">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
              {/* Submit */}
              <div className="w-full mt-1">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full font-sans text-[11px] font-bold tracking-[0.14em] uppercase text-white bg-red border-none py-5 px-11 cursor-pointer transition-colors duration-[180ms] hover:bg-red-dark disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending…' : 'Get in Touch →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
