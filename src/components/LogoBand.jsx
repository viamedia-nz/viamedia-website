const COMPACT = new Set([
  'logo-audi', 'logo-blackfern', 'logo-bmw', 'logo-brown-watson',
  'logo-george-stock', 'logo-holden', 'logo-infinitev', 'logo-meguiars',
  'logo-mito', 'logo-mount-shop', 'logo-napa', 'logo-penrite',
  'logo-rapid-media', 'logo-rare-spares', 'logo-smits-group',
  'logo-subaru', 'logo-toyota', 'logo-valvoline', 'logo-yhi',
])

// Seeded random order from spec
const LOGOS = [
  'logo-napa', 'logo-mann-hummel', 'logo-meguiars', 'logo-beach-hop',
  'logo-holden', 'logo-bapcor', 'logo-niterra', 'logo-spark-foundry',
  'logo-bmw', 'logo-aecs', 'logo-ryco', 'logo-atomic-212',
  'logo-toyota', 'logo-mito', 'logo-blackfern', 'logo-rapid-media',
  'logo-mount-shop', 'logo-yhi', 'logo-experience-gold-coast', 'logo-penrite',
  'logo-wtac', 'logo-premier-events', 'logo-smits-group', 'logo-mindshare',
  'logo-harrys-euro', 'logo-infinitev', 'logo-subaru', 'logo-tyrewise',
  'logo-1st-auto-parts', 'logo-george-stock', 'logo-downtime-entertainment',
  'logo-supercheap', 'logo-brown-watson', 'logo-sp-tools', 'logo-valvoline',
  'logo-ace-auto-parts', 'logo-mobil', 'logo-audi', 'logo-rare-spares',
  'logo-auto-master', 'logo-bac-systems', 'logo-capricorn', 'logo-classic-cover',
  'logo-exedy', 'logo-ac-delco', 'logo-autoserv', 'logo-sunday-drive',
]

function LogoItem({ name }) {
  const isCompact = COMPACT.has(name)
  return (
    <div className={isCompact ? 'px-8' : 'px-5'} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <img
        src={`/logos/client/${name}.png`}
        alt={name.replace('logo-', '').replace(/-/g, ' ')}
        className="h-11 w-auto max-w-none"
        loading="lazy"
      />
    </div>
  )
}

export default function LogoBand() {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-white">
      <div className="logo-track inline-flex items-center">
        {/* Two copies for seamless loop */}
        {[0, 1].map(copy => (
          <div key={copy} className="inline-flex items-center py-3">
            {LOGOS.map(name => (
              <LogoItem key={`${copy}-${name}`} name={name} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
