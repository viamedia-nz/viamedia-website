import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './components/About'
import Insights from './pages/Insights'
import Article from './pages/Article'
import AdSizes from './pages/AdSizes'
import useScrollAnimations from './hooks/useScrollAnimations'

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

// Pushes a page view into the GTM dataLayer on every route change.
// The site is a single-page app, so only the first load is a real page load —
// every navigation after that has to be reported explicitly.
// In GTM, the GA4 page_view tag fires on the custom event 'spa_page_view'.
function GtmPageView() {
  const { pathname, search } = useLocation()
  useEffect(() => {
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
      <GtmPageView />
      <Nav />

      <main className="pt-[68px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<Article />} />
          <Route path="/ad-sizes" element={<AdSizes />} />
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
