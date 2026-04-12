import Nav from './components/Nav'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />

      <main className="pt-[68px]">
        <section className="bg-hero-left text-white py-28 px-[52px]">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Drive Results.<br />
              Not Just Traffic.
            </h1>
            <p className="text-lg text-white/70 max-w-xl font-body">
              Placeholder hero — components will be ported from reference.html
            </p>
          </div>
        </section>

        <section className="py-28 px-[52px]">
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Scaffold Complete</h2>
            <p className="text-muted font-body">
              React + Vite + Tailwind CSS is ready. Components will be ported next.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
