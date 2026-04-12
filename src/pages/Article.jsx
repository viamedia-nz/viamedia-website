import { useParams, Link } from 'react-router-dom'
import { ARTICLES } from '../data/articles'
import InsightGraphic from '../components/InsightGraphic'

export default function Article() {
  const { slug } = useParams()
  const article = ARTICLES.find(a => a.slug === slug)

  if (!article) {
    return (
      <section className="bg-off py-[110px] px-[52px] border-t-4 border-t-red">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-3xl font-black uppercase mb-4">Article not found</h2>
          <Link to="/insights" className="text-red no-underline text-sm font-bold uppercase tracking-[0.1em]">
            ← Back to Insights
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-off border-t-4 border-t-red">
      {/* Hero graphic — full width */}
      <div className="h-[280px] relative overflow-hidden">
        <InsightGraphic type={article.graphic} />
      </div>

      <div className="max-w-[800px] mx-auto py-[80px] px-[52px]">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.1em] uppercase text-muted no-underline mb-10 hover:text-ink transition-colors duration-[180ms]"
        >
          ← Back to Insights
        </Link>

        <div className="text-[9px] font-bold tracking-[0.18em] uppercase text-red mb-3">
          {article.category}
        </div>
        <div className="text-[9px] tracking-[0.1em] uppercase text-muted mb-6">
          {article.date}
        </div>

        <h1 className="text-[clamp(28px,3.5vw,44px)] font-black leading-[1.1] tracking-[-0.02em] uppercase mb-10">
          {article.title}
        </h1>

        <div className="text-[15px] text-dim leading-[1.85]">
          {article.body.map((block, i) =>
            block.type === 'h' ? (
              <h3 key={i} className="text-lg font-extrabold tracking-[-0.01em] text-ink mt-10 mb-4">
                {block.text}
              </h3>
            ) : (
              <p key={i} className="mb-[18px]">
                {block.text}
              </p>
            )
          )}
        </div>

        <div className="mt-14 pt-8 border-t border-black/10">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-red no-underline border-b border-red/30 pb-[3px] hover:border-red transition-colors duration-[180ms]"
          >
            ← More Insights
          </Link>
        </div>
      </div>
    </section>
  )
}
