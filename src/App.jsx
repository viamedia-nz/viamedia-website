import Nav from './components/Nav'
import Hero from './components/Hero'
import LogoBand from './components/LogoBand'
import OurDifference from './components/OurDifference'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />

      <main className="pt-[68px]">
        <Hero />
        <LogoBand />
        <OurDifference />
      </main>
    </div>
  )
}
