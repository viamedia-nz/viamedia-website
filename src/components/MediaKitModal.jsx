import * as Dialog from '@radix-ui/react-dialog'

const BRANDS = [
  { id: 'nzpc', label: 'NZ Performance Car' },
  { id: 'nzv8', label: 'NZV8' },
  { id: 'autochannel', label: 'Auto Channel' },
  { id: 'specialist', label: 'Specialist Sectors' },
]

export default function MediaKitModal({ children }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-300 bg-black/70 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed z-310 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[90vw] md:max-w-[520px] bg-off p-6 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.3)] focus:outline-none max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <Dialog.Close className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-muted hover:text-ink transition-colors duration-150 cursor-pointer bg-transparent border-none text-lg font-light">
            ×
          </Dialog.Close>

          {/* Logo */}
          <img
            src="/logos/viamedia-mark-black.svg"
            alt=""
            className="h-8 w-8 mb-6"
          />

          {/* Heading */}
          <Dialog.Title className="text-xl font-black uppercase tracking-[-0.02em] text-ink mb-2">
            Request Audience Data & Media Kit
          </Dialog.Title>
          <Dialog.Description className="text-[13px] text-muted leading-[1.7] mb-8">
            Tell us about your business and we'll send through the relevant audience profile.
          </Dialog.Description>

          {/* Form */}
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-muted">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="bg-white border border-black/10 text-ink px-4 py-3 font-sans text-sm outline-none transition-colors duration-[180ms] focus:border-red placeholder:text-muted/40"
              />
            </div>

            <div className="flex flex-col gap-[6px]">
              <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-muted">Company</label>
              <input
                type="text"
                placeholder="Company name"
                className="bg-white border border-black/10 text-ink px-4 py-3 font-sans text-sm outline-none transition-colors duration-[180ms] focus:border-red placeholder:text-muted/40"
              />
            </div>

            <div className="flex flex-col gap-[6px]">
              <label className="text-[10px] font-bold tracking-[0.14em] uppercase text-muted">Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="bg-white border border-black/10 text-ink px-4 py-3 font-sans text-sm outline-none transition-colors duration-[180ms] focus:border-red placeholder:text-muted/40"
              />
            </div>

            <fieldset className="border-none p-0 m-0">
              <legend className="text-[10px] font-bold tracking-[0.14em] uppercase text-muted mb-3">Which brands are you interested in?</legend>
              <div className="flex flex-col gap-2.5">
                {BRANDS.map(({ id, label }) => (
                  <label key={id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name={id}
                      className="w-4 h-4 accent-red cursor-pointer"
                    />
                    <span className="text-sm text-dim group-hover:text-ink transition-colors duration-150">{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full font-sans text-[11px] font-bold tracking-[0.14em] uppercase text-white bg-red border-none py-4 px-8 cursor-pointer transition-colors duration-[180ms] hover:bg-red-dark mt-5"
            >
              Request Media Kit →
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
