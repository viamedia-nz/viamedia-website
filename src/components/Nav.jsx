import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'Audiences', href: '#audiences' },
  { label: 'Services', href: '#solutions' },
  { label: 'Insights', href: '#insights-page' },
  { label: 'About', href: '/about', isRoute: true },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-200 flex items-center justify-between px-[52px] h-[68px] bg-[rgba(244,243,240,0.96)] backdrop-blur-[20px] border-b border-black/10 transition-shadow duration-200 ${scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.08)]' : ''}`}
    >
      <a href="#hero" className="flex items-center shrink-0 h-9 no-underline">
        {/* Desktop: full horizontal wordmark */}
        <img
          src="/logos/viamedia-wordmark-black.svg"
          alt="Via Media"
          className="hidden md:block h-7 w-auto"
        />
        {/* Mobile: circle mark only */}
        <img
          src="/logos/viamedia-mark-black.svg"
          alt="Via Media"
          className="block md:hidden h-8 w-8"
        />
      </a>

      <ul className="flex gap-8 items-center list-none">
        {LINKS.map(({ label, href, isRoute }) => (
          <li key={href}>
            {isRoute ? (
              <Link
                to={href}
                className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted no-underline transition-colors duration-[180ms] hover:text-ink"
              >
                {label}
              </Link>
            ) : (
              <a
                href={href}
                className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted no-underline transition-colors duration-[180ms] hover:text-ink"
              >
                {label}
              </a>
            )}
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="text-[11px] font-bold tracking-[0.1em] uppercase text-white! bg-red px-6 py-3 no-underline transition-colors duration-[180ms] hover:bg-red-dark"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}
