import { useState } from 'react'

const SERVICE_OPTIONS = [
  'Content & Channels',
  'Lead Generation & Paid Media',
  'Organic Search & Discovery',
  'Audience Intelligence & Strategy',
  'Activations & Events',
  'Not sure yet',
]

const FORMSPREE_URL = 'https://formspree.io/f/mykoanpz'

export default function Contact() {
  const [fields, setFields] = useState({
    firstName: '', lastName: '', email: '', company: '', service: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const body = new FormData()
      body.append('_subject', 'New Enquiry — Via Media Website')
      body.append('First Name', fields.firstName)
      body.append('Last Name', fields.lastName)
      body.append('Email', fields.email)
      body.append('Company', fields.company)
      body.append('Service Area', fields.service)
      body.append('Message', fields.message)
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
          <div className="mb-8">
            {/* Desktop: full horizontal wordmark */}
            <img
              src="/logos/viamedia-wordmark-white.svg"
              alt="Via Media"
              className="hidden md:block h-12 w-auto"
            />
            {/* Mobile: circle mark only */}
            <img
              src="/logos/viamedia-mark-white.svg"
              alt="Via Media"
              className="block md:hidden h-14 w-14"
            />
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] uppercase text-white/45 mb-[18px]">
            <div className="w-[22px] h-0.5 bg-white/45" />
            Get in Touch
          </div>
          <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.03] tracking-[-0.03em] uppercase text-white mb-5">
            Let's Talk About<br />Your <em className="not-italic text-red">Business</em>
          </h2>
          <p className="text-[15px] text-on-dark leading-[1.8] mb-11">
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
            <form className="flex flex-wrap gap-3" onSubmit={handleSubmit}>
              {/* Row 1: First Name + Last Name */}
              <div className="flex flex-col gap-[7px] w-full min-[480px]:w-[calc(50%-6px)]">
                <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  value={fields.firstName}
                  onChange={set('firstName')}
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
                  className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22] min-w-0 w-full"
                />
              </div>
              {/* Service area — full width */}
              <div className="flex flex-col gap-[7px] w-full">
                <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Service Area</label>
                <select
                  value={fields.service}
                  onChange={set('service')}
                  required
                  className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 [&>option]:bg-[#2B3A4A] [&>option]:text-[#D1D5DB] [&>option:checked]:bg-[#354757] [&>option:checked]:text-white [&:invalid]:text-white/[0.22]"
                >
                  <option value="" disabled hidden>Select a service area</option>
                  {SERVICE_OPTIONS.map(opt => (
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
                  className="w-full font-sans text-xs font-bold tracking-[0.14em] uppercase text-white bg-red border-none py-5 px-11 cursor-pointer transition-colors duration-[180ms] hover:bg-red-dark disabled:opacity-60 disabled:cursor-not-allowed"
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
