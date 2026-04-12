export function DivergingLines() {
  return (
    <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <rect width="400" height="180" fill="#1a1a1a"/>
      <line x1="0" y1="36" x2="400" y2="36" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <line x1="0" y1="72" x2="400" y2="72" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <line x1="0" y1="108" x2="400" y2="108" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <line x1="0" y1="144" x2="400" y2="144" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <polyline points="40,60 100,70 160,90 220,110 280,128 360,142" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="40,120 100,108 160,88 220,66 280,46 360,28" fill="none" stroke="#D4001A" strokeWidth="2" strokeLinecap="round"/>
      <text x="368" y="25" fontFamily="Montserrat,sans-serif" fontSize="9" fontWeight="700" fill="#D4001A" letterSpacing="0.06em">BANDWIDTH</text>
      <text x="368" y="147" fontFamily="Montserrat,sans-serif" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.35)" letterSpacing="0.06em">TRAFFIC</text>
      <line x1="240" y1="100" x2="240" y2="72" stroke="rgba(212,0,26,0.3)" strokeWidth="1" strokeDasharray="3,3"/>
      <text x="38" y="172" fontFamily="Montserrat,sans-serif" fontSize="8" fill="rgba(255,255,255,0.2)" letterSpacing="0.08em">JAN 2025</text>
      <text x="328" y="172" fontFamily="Montserrat,sans-serif" fontSize="8" fill="rgba(255,255,255,0.2)" letterSpacing="0.08em">DEC 2025</text>
    </svg>
  )
}

export function ConvergingLines() {
  return (
    <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <rect width="400" height="180" fill="#1e1e1e"/>
      <line x1="20" y1="20" x2="340" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="50" x2="340" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="90" x2="340" y2="90" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="130" x2="340" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="160" x2="340" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="340" cy="90" r="5" fill="none" stroke="#D4001A" strokeWidth="2"/>
      <line x1="340" y1="90" x2="380" y2="90" stroke="#D4001A" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="380" cy="90" r="3" fill="#D4001A"/>
      <circle cx="18" cy="20" r="3" fill="rgba(255,255,255,0.18)"/>
      <circle cx="18" cy="50" r="3" fill="rgba(255,255,255,0.18)"/>
      <circle cx="18" cy="90" r="3" fill="rgba(255,255,255,0.22)"/>
      <circle cx="18" cy="130" r="3" fill="rgba(255,255,255,0.18)"/>
      <circle cx="18" cy="160" r="3" fill="rgba(255,255,255,0.18)"/>
      <text x="20" y="174" fontFamily="Montserrat,sans-serif" fontSize="8" fill="rgba(255,255,255,0.18)" letterSpacing="0.08em">FRAGMENTED</text>
      <text x="310" y="174" fontFamily="Montserrat,sans-serif" fontSize="8" fill="rgba(212,0,26,0.6)" letterSpacing="0.08em">INTEGRATED</text>
    </svg>
  )
}

export function TrustType() {
  return (
    <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <rect width="400" height="180" fill="#111110"/>
      <text x="-8" y="152" fontFamily="Montserrat,sans-serif" fontSize="108" fontWeight="900" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" letterSpacing="-4">TRUST</text>
      <text x="-8" y="152" fontFamily="Montserrat,sans-serif" fontSize="108" fontWeight="900" fill="rgba(255,255,255,0.04)" letterSpacing="-4">TRUST</text>
      <rect x="0" y="0" width="4" height="180" fill="#D4001A"/>
      <text x="22" y="48" fontFamily="Montserrat,sans-serif" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.35)" letterSpacing="0.18em">THE GATEKEEPER</text>
      <text x="22" y="68" fontFamily="Montserrat,sans-serif" fontSize="10" fontWeight="700" fill="#D4001A" letterSpacing="0.18em">RETURNS</text>
    </svg>
  )
}

const GRAPHICS = {
  'diverging-lines': DivergingLines,
  'converging-lines': ConvergingLines,
  'trust-type': TrustType,
}

export default function InsightGraphic({ type }) {
  const Graphic = GRAPHICS[type]
  return Graphic ? <Graphic /> : null
}
