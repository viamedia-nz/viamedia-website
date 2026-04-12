import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Audiences', href: '#audiences' },
  { label: 'Services', href: '#solutions' },
  { label: 'Insights', href: '#insights-page' },
  { label: 'About', href: '#about-page' },
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
      <a href="#hero" className="flex items-center h-9 no-underline">
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 432 432'%3E%3Cpath d='M234,0c106.348,10.752,187.255,91.649,198,198v36c-10.739,106.337-91.662,187.266-198,198h-36C91.659,421.261,10.741,340.34,0,234v-36C10.743,91.61,91.639,10.784,198,0h36ZM197.648,144.07l-143.523-.061,71.793,143.556,71.73-143.495ZM234.02,287.661l-.037-143.399-35.997.044.018,143.743,36.016-.388ZM377.865,287.965l-71.962-143.444-71.614,143.488,143.575-.045Z'/%3E%3C/svg%3E"
          alt="Via Media"
          className="h-8 w-auto block"
        />
      </a>

      <ul className="flex gap-8 items-center list-none">
        {LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted no-underline transition-colors duration-[180ms] hover:text-ink"
            >
              {label}
            </a>
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
