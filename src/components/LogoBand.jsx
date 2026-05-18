// Per-logo configuration. Edit individual entries to tune compact padding,
// visual scale, or vertical nudge without touching the render code.
const LOGO_CONFIG = [
  { file: 'logo-napa',                    compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-mann-hummel',             compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-meguiars',                compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-beach-hop',               compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-holden',                  compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-bapcor',                  compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-yhi',                     compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-spark-foundry',           compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-bmw',                     compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-aecs',                    compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-ryco',                    compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-blackfern',               compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-atomic-212',              compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-niterra',                 compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-toyota',                  compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-mito',                    compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-rapid-media',             compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-mount-shop',              compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-experience-gold-coast',   compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-penrite',                 compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-wtac',                    compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-premier-events',          compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-repco',                   compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-smits-group',             compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-mindshare',               compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-harrys-euro',             compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-ac-delco',                compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-infinitev',               compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-subaru',                  compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-tyrewise',                compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-1st-auto-parts',          compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-george-stock',            compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-downtime-entertainment',  compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-supercheap',              compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-brown-watson',            compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-sp-tools',                compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-valvoline',               compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-ace-auto-parts',          compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-mobil',                   compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-audi',                    compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-rare-spares',             compact: true,  scale: 1.0, yOffset: 0 },
  { file: 'logo-auto-master',             compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-bac-systems',             compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-capricorn',               compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-classic-cover',           compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-exedy',                   compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-autoserv',                compact: false, scale: 1.0, yOffset: 0 },
  { file: 'logo-sunday-drive',            compact: false, scale: 1.0, yOffset: 0 },
]

function LogoSet({ copy }) {
  return (
    <div className="flex shrink-0 items-center py-3" aria-hidden={copy === 1}>
      {LOGO_CONFIG.map((item) => (
        <div
          key={item.file}
          className={`shrink-0 flex items-center ${item.compact ? 'px-6' : 'px-4'}`}
        >
          <img
            src={`/logos/client/${item.file}.png`}
            alt={copy === 0 ? item.file.replace('logo-', '').replace(/-/g, ' ') : ''}
            className="h-8 md:h-11 w-auto max-w-none block"
            loading="eager"
            style={{ transform: `scale(${item.scale}) translateY(${item.yOffset}px)` }}
          />
        </div>
      ))}
    </div>
  )
}

export default function LogoBand() {
  return (
    <div className="overflow-hidden bg-white">
      <div className="logo-track flex">
        <LogoSet copy={0} />
        <LogoSet copy={1} />
      </div>
    </div>
  )
}
