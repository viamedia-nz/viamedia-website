"""Spend-at-risk card and currency convention for Via Media audit reports.

risk_card() returns a full-width card: the minimum (seen in the account) as the headline,
the estimated maximum as a smaller line, and a stacked bar of total ad spend:
  - Minimum: spend seen in the account going on clicks unlikely to produce enquiries
  - Estimated: the same pattern applied to search spend whose searches Google doesn't show
  - Not yet measurable: the rest, which can't be judged until enquiries are tracked

currency() applies the convention: state "NZ$, excluding GST" once in the hero, then plain $.
"""
import re

RISK_CSS = '''
  .g--6 { grid-column:span 6; }
  @media (max-width: 860px) { .g--6 { grid-column:auto; } }
  .g--alert { border-top:5px solid var(--crit); }
  .risk__head { display:block; }
  .risk__big { font-weight:900; font-size:clamp(2rem, 4.6vw, 3rem); line-height:1; letter-spacing:-0.03em; color:var(--crit); }
  .risk__of { font-weight:700; font-size:1.05rem; color:var(--ink); line-height:1.35; margin-top:8px; }
  .risk__max { font-size:0.95rem; font-weight:600; color:var(--ink2); }
  .risk__max b { color:var(--crit); font-weight:800; }
  .risk__to { color:#C9625B; font-weight:800; }
  .risk__bar { width:100%; height:auto; display:block; margin-top:6px; }
  .risk__key { list-style:none; display:grid; grid-template-columns:repeat(3, 1fr); gap:12px 22px; font-size:0.86rem; color:var(--ink2); }
  .risk__key li { display:grid; grid-template-columns:16px 1fr; gap:8px; align-items:start; }
  .risk__key i { width:16px; height:16px; border-radius:3px; margin-top:2px; }
  .risk__key b { display:block; color:var(--ink); font-weight:800; }
  @media (max-width: 860px) { .risk__key { grid-template-columns:1fr; } }
'''


def fmt(n):
    return f"${n:,.0f}"


def rnd(n):
    return int(round(n / 100.0) * 100)


def risk_card(total, seen, est_max, seen_desc, hidden_share, pattern_pct, src, fixes="fixes 1 to 3"):
    seen_r, max_r = rnd(seen), rnd(est_max)
    est_r = max_r - seen_r
    unp_r = rnd(total - est_max)
    p_seen = seen / total * 100
    p_max = est_max / total * 100
    bw = 1000
    ws = bw * seen / total
    wm = bw * est_max / total
    lx = lambda x: x - 8 if x > 300 else x + 8
    la = lambda x: 'end' if x > 300 else 'start'
    svg = f'''<svg class="risk__bar" viewBox="0 0 {bw} 150" role="img" aria-label="Of {fmt(total)} in Google ad spend, at least {fmt(seen_r)} ({p_seen:.0f}%) and up to an estimated {fmt(max_r)} ({p_max:.0f}%) went on clicks unlikely to produce enquiries.">
  <defs><pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="#E7A39E"/><rect width="4" height="10" fill="#B3261E"/></pattern></defs>
  <rect x="0" y="56" width="{bw}" height="46" rx="8" fill="#DAD7D1"/>
  <rect x="0" y="56" width="{wm:.1f}" height="46" fill="url(#hatch)"/>
  <rect x="0" y="56" width="{ws:.1f}" height="46" fill="#B3261E"/>
  <line x1="{ws:.1f}" y1="30" x2="{ws:.1f}" y2="108" stroke="#111110" stroke-width="2"/>
  <line x1="{wm:.1f}" y1="8" x2="{wm:.1f}" y2="108" stroke="#111110" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="{lx(ws):.1f}" y="44" text-anchor="{la(ws)}" font-size="15" font-weight="800" fill="#111110">At least {fmt(seen_r)} · {p_seen:.0f}%</text>
  <text x="{lx(wm):.1f}" y="22" text-anchor="{la(wm)}" font-size="15" font-weight="700" fill="#5A5955">Up to {fmt(max_r)} · {p_max:.0f}% (estimated)</text>
  <text x="0" y="132" font-size="13" fill="#5A5955">$0</text>
  <text x="{bw}" y="132" text-anchor="end" font-size="13" fill="#5A5955">{fmt(total)} total Google ad spend</text>
</svg>'''
    return f'''
      <div class="g g--6 g--alert">
        <div class="g__kicker">Spend unlikely to produce enquiries · 12 months</div>
        <div class="risk__head">
          <div class="risk__big num">{fmt(seen_r)}<span class="risk__to"> to {fmt(max_r)}</span></div>
          <div class="risk__of">of {fmt(total)} in Google ad spend ({p_seen:.0f}%, potentially {p_max:.0f}%) went on clicks unlikely to produce an enquiry</div>
        </div>
        <div class="risk__max">The lower figure is seen in the account, and the upper figure is estimated from the pattern in the searches Google shows.</div>
        {svg}
        <ul class="risk__key">
          <li><i style="background:#B3261E"></i><span><b>At least {fmt(seen_r)}</b>Seen in the account: {seen_desc}.</span></li>
          <li><i style="background-image:repeating-linear-gradient(45deg,#B3261E 0 4px,#E7A39E 4px 10px)"></i><span><b>Estimated, a further {fmt(est_r)}</b>Of the searches Google shows, {pattern_pct} of spend went on clicks unlikely to produce an enquiry. Google doesn't show the searches behind {hidden_share} of the search spend; applying the same {pattern_pct} to the rest of the search spend gives this figure.</span></li>
          <li><i style="background:#DAD7D1"></i><span><b>Not yet measurable: {fmt(unp_r)}</b>Clicks on searches that look relevant, such as product searches. Whether they produced enquiries can't be judged until enquiries are tracked ({fixes}).</span></li>
        </ul>
        <div class="g__src">{src}</div>
      </div>
'''


HERO_FIGURES = '<div><dt>Figures</dt><dd>NZ$, excluding GST</dd></div>'


def currency(h, keep=()):
    """Plain $ for NZ$ amounts, except inside the given exact snippets. Adds the hero line."""
    i = h.index('<body>')
    head, body = h[:i], h[i:]
    tokens = []
    for k in keep:
        assert body.count(k) == 1, k[:60]
        tokens.append(k)
        body = body.replace(k, f'@@KEEP{len(tokens)-1}@@')
    body = re.sub(r'NZ\$(?=\d)', '$', body)
    for n, k in enumerate(tokens):
        body = body.replace(f'@@KEEP{n}@@', k)
    if HERO_FIGURES not in body:
        anchor = '<div><dt>Audit dates</dt>'
        assert body.count(anchor) == 1
        body = body.replace(anchor, HERO_FIGURES + anchor)
    return head + body
