import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './components/About'
import Insights from './pages/Insights'
import Article from './pages/Article'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg text-ink">
        <Nav />

        <main className="pt-[68px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<Article />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
