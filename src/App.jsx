import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './components/About'
import Insights from './pages/Insights'
import Article from './pages/Article'
import AdSizes from './pages/AdSizes'
import ChromeShowcase from './pages/lp/ChromeShowcase'
import useScrollAnimations from './hooks/useScrollAnimations'
import { ARTICLES } from './data/articles'

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

// Browser tab titles, one per route. These are what appears in the tab, in
// search results, in bookmarks, and in GA4's page title reports. Edit the
// strings here — nothing else needs to change.
const SITE_NAME = 'Via Media'
const DEFAULT_TITLE = 'Via Media — Automotive Marketing'

const ROUTE_TITLES = {
  '/': DEFAULT_TITLE,
  '/about': `About — ${SITE_NAME}`,
  '/insights': `Insights — ${SITE_NAME}`,
  '/ad-sizes': `Ad Sizes — ${SITE_NAME}`,
  '/lp/chrome-showcase': `Elite 50 entrant details — ${SITE_NAME}`,
}

function titleForPath(pathname) {
  // Ignore a trailing slash so /about and /about/ behave the same.
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

  if (ROUTE_TITLES[path]) return ROUTE_TITLES[path]

  if (path.startsWith('/insights/')) {
    const slug = path.slice('/insights/'.length)
    const article = ARTICLES.find(a => a.slug === slug)
    if (article) return `${article.title} — ${SITE_NAME}`
  }

  return DEFAULT_TITLE
}

// Sets the page title, then reports the page view to GTM.
// The site is a single-page app, so only the first load is a real page load —
// every navigation after that has to be handled explicitly.
// The title is set BEFORE the dataLayer push so GA4 records the correct one.
// In GTM, the GA4 page_view tag fires on the custom event 'spa_page_view'.
function PageTitleAndView() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    document.title = titleForPath(pathname)
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'spa_page_view',
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, search])
  return null
}

function AppContent() {
  useScrollAnimations()

  return (
    <div className="min-h-screen bg-bg text-ink snap-container">
      <ScrollToHash />
      <PageTitleAndView />
      <Nav />

      <main className="pt-[68px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<Article />} />
          <Route path="/ad-sizes" element={<AdSizes />} />
          <Route path="/lp/chrome-showcase" element={<ChromeShowcase />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
