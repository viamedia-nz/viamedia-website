import Nav from './components/Nav'
import Hero from './components/Hero'
import LogoBand from './components/LogoBand'
import OurDifference from './components/OurDifference'
import Audiences from './components/Audiences'
import Solutions from './components/Solutions'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />

      <main className="pt-[68px]">
        <Hero />
        <LogoBand />
        <OurDifference />
        <Audiences />
        <Solutions />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
