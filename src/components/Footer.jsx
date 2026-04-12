import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'Audiences', href: '#audiences' },
  { label: 'Services', href: '#solutions' },
  { label: 'Insights', href: '/insights', isRoute: true },
  { label: 'About', href: '/about', isRoute: true },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/[0.06] px-[52px] py-9 grid grid-cols-[1fr_auto] items-center gap-8">
      <ul className="flex gap-7 list-none justify-center">
        {LINKS.map(({ label, href, isRoute }) => (
          <li key={href}>
            {isRoute ? (
              <Link
                to={href}
                className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/35 no-underline transition-colors duration-[180ms] hover:text-white"
              >
                {label}
              </Link>
            ) : (
              <a
                href={href}
                className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/35 no-underline transition-colors duration-[180ms] hover:text-white"
              >
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="text-xs text-white/25 text-right">© 2026 Via Media Ltd</p>
    </footer>
  )
}
