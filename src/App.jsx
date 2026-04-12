import Nav from './components/Nav'
import Hero from './components/Hero'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />

      <main className="pt-[68px]">
        <Hero />
      </main>
    </div>
  )
}
