import { Link } from 'react-router-dom'
import { ARTICLES } from '../data/articles'
import InsightGraphic from '../components/InsightGraphic'

export default function Insights() {
  return (
    <section id="insights-page" className="bg-off py-16 md:py-[110px] px-5 md:px-[52px] border-t-4 border-t-red">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-end mb-10 md:mb-13">
          <div className="fade-up">
            <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase text-red mb-[18px]">
              <div className="w-[22px] h-0.5 bg-red" />
              Insights
            </div>
            <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.03] tracking-[-0.03em] uppercase mb-0">
              Industry <em className="not-italic text-red">Perspectives</em>
            </h2>
          </div>
          <p className="fade-up delay-1 text-[15px] text-dim leading-[1.85]">
            Perspective on automotive marketing, audience behaviour, and the changing media landscape — as we've encountered it.
          </p>
        </div>

        {/* Article grid */}
        <div className="fade-up delay-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={`/insights/${article.slug}`}
              className="bg-ink flex flex-col overflow-hidden no-underline transition-all duration-[220ms] cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
            >
              <div className="h-[140px] md:h-[180px] relative overflow-hidden shrink-0">
                <InsightGraphic type={article.graphic} />
              </div>
              <div className="p-5 md:p-7 pt-6 md:pt-8 flex flex-col flex-1">
                <div className="text-[9px] font-bold tracking-[0.18em] uppercase text-red mb-3">
                  {article.category}
                </div>
                <div className="text-[9px] tracking-[0.1em] uppercase text-white/25 mb-3">
                  {article.date}
                </div>
                <h3 className="text-base font-bold leading-[1.4] text-white mb-3 flex-1">
                  {article.title}
                </h3>
                <p className="text-xs text-white/40 leading-[1.75] mb-5">
                  {article.summary}
                </p>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.1em] uppercase text-red border-b border-red/30 pb-[3px] self-start transition-colors duration-[180ms] hover:border-red">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
