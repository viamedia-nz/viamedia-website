const COMPACT = new Set([
  'logo-audi', 'logo-blackfern', 'logo-bmw', 'logo-brown-watson',
  'logo-george-stock', 'logo-holden', 'logo-infinitev', 'logo-meguiars',
  'logo-mito', 'logo-mount-shop', 'logo-napa', 'logo-penrite',
  'logo-rapid-media', 'logo-rare-spares', 'logo-smits-group',
  'logo-subaru', 'logo-toyota', 'logo-valvoline', 'logo-yhi',
])

const LOGOS = [
  'logo-napa',
  'logo-mann-hummel',
  'logo-meguiars',
  'logo-beach-hop',
  'logo-holden',
  'logo-bapcor',
  'logo-yhi',
  'logo-spark-foundry',
  'logo-bmw',
  'logo-aecs',
  'logo-ryco',
  'logo-blackfern',
  'logo-atomic-212',
  'logo-niterra',
  'logo-toyota',
  'logo-mito',
  'logo-rapid-media',
  'logo-mount-shop',
  'logo-experience-gold-coast',
  'logo-penrite',
  'logo-wtac',
  'logo-premier-events',
  'logo-repco',
  'logo-smits-group',
  'logo-mindshare',
  'logo-harrys-euro',
  'logo-ac-delco',
  'logo-infinitev',
  'logo-subaru',
  'logo-tyrewise',
  'logo-1st-auto-parts',
  'logo-george-stock',
  'logo-downtime-entertainment',
  'logo-supercheap',
  'logo-brown-watson',
  'logo-sp-tools',
  'logo-valvoline',
  'logo-ace-auto-parts',
  'logo-mobil',
  'logo-audi',
  'logo-rare-spares',
  'logo-auto-master',
  'logo-bac-systems',
  'logo-capricorn',
  'logo-classic-cover',
  'logo-exedy',
  'logo-autoserv',
  'logo-sunday-drive',
]

function LogoSet({ copy }) {
  return (
    <div className="flex shrink-0 items-center py-3" aria-hidden={copy === 1}>
      {LOGOS.map((name) => {
        const isCompact = COMPACT.has(name)
        return (
          <div
            key={name}
            className={`shrink-0 flex items-center ${isCompact ? 'px-6' : 'px-4'}`}
          >
            <img
              src={`/logos/client/${name}.png`}
              alt={copy === 0 ? name.replace('logo-', '').replace(/-/g, ' ') : ''}
              className="h-8 md:h-11 w-auto max-w-none block"
              loading="eager"
            />
          </div>
        )
      })}
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
