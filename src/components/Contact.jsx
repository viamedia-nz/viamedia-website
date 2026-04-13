const SERVICE_OPTIONS = [
  'Content & Channels',
  'Lead Generation & Paid Media',
  'Organic Search & Discovery',
  'Audience Intelligence & Strategy',
  'Activations & Events',
  'Not sure yet',
]

export default function Contact() {
  return (
    <section id="contact" className="bg-steel py-16 md:py-[120px] px-5 md:px-[52px]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[100px] items-start">

        {/* Left column */}
        <div className="fade-up">
          <div className="mb-8">
            {/* Desktop: full horizontal wordmark — larger than nav for brand presence */}
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
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-[7px]">
              <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">First Name</label>
              <input
                type="text"
                placeholder="First name"
                className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22]"
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Last Name</label>
              <input
                type="text"
                placeholder="Last name"
                className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22]"
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22]"
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Company</label>
              <input
                type="text"
                placeholder="Company name"
                className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22]"
              />
            </div>
            <div className="flex flex-col gap-[7px] col-span-2">
              <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Service Area</label>
              <select defaultValue="" className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 [&>option]:bg-steel [&:invalid]:text-white/[0.22]" required>
                <option value="" disabled hidden>Select a service area</option>
                {SERVICE_OPTIONS.map(opt => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-[7px] col-span-2">
              <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-on-dark-muted">Message</label>
              <textarea
                placeholder="Tell us about your goals"
                className="bg-white/[0.07] border border-white/12 text-white px-4 py-3.5 font-sans text-sm outline-none transition-all duration-[180ms] focus:border-red focus:bg-white/10 placeholder:text-white/[0.22] resize-y min-h-[110px]"
              />
            </div>
            <div className="col-span-2 mt-1">
              <button
                type="submit"
                className="w-full font-sans text-xs font-bold tracking-[0.14em] uppercase text-white bg-red border-none py-5 px-11 cursor-pointer transition-colors duration-[180ms] hover:bg-red-dark"
              >
                Get in Touch →
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
