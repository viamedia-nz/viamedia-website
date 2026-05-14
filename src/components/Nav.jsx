import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const LINKS = [
  { label: 'Audiences', hash: '#audiences' },
  { label: 'Services', hash: '#solutions' },
  { label: 'Insights', to: '/insights' },
  { label: 'About', to: '/about' },
]

function useScrollLink() {
  const location = useLocation()
  const navigate = useNavigate()

  return (hash) => (e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/' + hash)
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const handleScroll = useScrollLink()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  const location = useLocation()
  useEffect(() => setMenuOpen(false), [location])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const linkClass = "text-[11px] font-semibold tracking-[0.1em] uppercase text-muted no-underline transition-colors duration-[180ms] hover:text-ink"
  const mobileLinkClass = "text-[13px] font-bold tracking-[0.12em] uppercase text-ink no-underline py-3"

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-200 px-5 md:px-[52px] h-[68px] bg-[rgba(244,243,240,0.96)] backdrop-blur-[20px] border-b border-black/10 transition-shadow duration-200 ${scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.08)]' : ''}`}
      >
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between">
          <Link to="/" onClick={() => { if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="flex items-center shrink-0 h-9 no-underline">
            <img src="/logos/viamedia-wordmark-black.svg" alt="Via Media" className="hidden md:block h-7 w-auto" />
            <img src="/logos/viamedia-mark-black.svg" alt="Via Media" className="block md:hidden h-8 w-8" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8 items-center list-none">
            {LINKS.map(({ label, to, hash }) => (
              <li key={label}>
                {to ? (
                  <Link to={to} className={linkClass}>{label}</Link>
                ) : (
                  <a href={hash} onClick={handleScroll(hash)} className={linkClass}>{label}</a>
                )}
              </li>
            ))}
            <li>
              <a href="#contact" onClick={handleScroll('#contact')} className="text-[11px] font-bold tracking-[0.1em] uppercase text-white! bg-red px-6 py-3 no-underline transition-colors duration-[180ms] hover:bg-red-dark">
                Contact
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer"
            aria-label="Menu"
          >
            <span className={`block w-5 h-[2px] bg-ink transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-ink transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-ink transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-190 pt-[68px] bg-bg/98 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center gap-2 pt-12">
            {LINKS.map(({ label, to, hash }) => (
              to ? (
                <Link key={label} to={to} className={mobileLinkClass} onClick={() => setMenuOpen(false)}>{label}</Link>
              ) : (
                <a key={label} href={hash} onClick={(e) => { handleScroll(hash)(e); setMenuOpen(false) }} className={mobileLinkClass}>{label}</a>
              )
            ))}
            <a
              href="#contact"
              onClick={(e) => { handleScroll('#contact')(e); setMenuOpen(false) }}
              className="text-[13px] font-bold tracking-[0.12em] uppercase text-white bg-red px-8 py-4 no-underline mt-4"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  )
}
