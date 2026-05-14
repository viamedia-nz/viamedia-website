import { Link, useLocation, useNavigate } from 'react-router-dom'

const LINKS = [
  { label: 'Audiences', hash: '#audiences' },
  { label: 'Services', hash: '#solutions' },
  { label: 'Insights', to: '/insights' },
  { label: 'About', to: '/about' },
  { label: 'Contact', hash: '#contact' },
]

function ScrollLink({ hash, className, children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/' + hash)
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a href={hash} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/[0.06] px-5 md:px-[52px] py-8 md:py-9">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10">
        <img
          src="/logos/viamedia-wordmark-white.svg"
          alt="Via Media"
          className="block h-7 w-auto"
        />
        <ul className="flex flex-wrap gap-4 md:gap-7 list-none justify-center">
          {LINKS.map(({ label, to, hash }) => (
            <li key={label}>
              {to ? (
                <Link
                  to={to}
                  className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/35 no-underline transition-colors duration-[180ms] hover:text-white"
                >
                  {label}
                </Link>
              ) : (
                <ScrollLink
                  hash={hash}
                  className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/35 no-underline transition-colors duration-[180ms] hover:text-white"
                >
                  {label}
                </ScrollLink>
              )}
            </li>
          ))}
        </ul>
        <p className="text-xs text-white/25 text-center md:text-right whitespace-nowrap">© 2026 Via Media Ltd</p>
      </div>
    </footer>
  )
}
