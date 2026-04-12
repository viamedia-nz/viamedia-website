import Nav from './components/Nav'
import Hero from './components/Hero'
import LogoBand from './components/LogoBand'
import OurDifference from './components/OurDifference'
import Audiences from './components/Audiences'
import Solutions from './components/Solutions'

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
      </main>
    </div>
  )
}
