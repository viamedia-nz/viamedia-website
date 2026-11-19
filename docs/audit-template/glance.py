"""Build the 'Audit at a glance' section and splice it into the Ag Steel report."""
import sys, re, math

path = sys.argv[1]
html = open(path, encoding="utf-8").read()

# Waffle: 99 contact-page cells + 1 other
waffle = "".join('<span class="w w--bad"></span>' for _ in range(99)) + '<span class="w w--ok"></span>'
# Ratio dots: 75 grey + 1 red
dots = "".join('<i></i>' for _ in range(75))

# Donut: Google 37% of NZ$41,366 (Mar-Oct)
r = 54
c = 2 * math.pi * r
g = 15260 / 41366
donut = f'''<svg class="donut" viewBox="0 0 140 140" role="img" aria-label="Google ads NZ$15,260 (37%) and print, radio and events NZ$26,106 (63%), March to October 2026">
  <circle cx="70" cy="70" r="{r}" fill="none" stroke="#C9C6C0" stroke-width="22"/>
  <circle cx="70" cy="70" r="{r}" fill="none" stroke="#354757" stroke-width="22" stroke-dasharray="{c*g:.2f} {c:.2f}" transform="rotate(-90 70 70)"/>
  <text x="70" y="66" text-anchor="middle" font-size="22" font-weight="900" fill="#111110">37%</text>
  <text x="70" y="84" text-anchor="middle" font-size="9.5" font-weight="600" fill="#5A5955">Google ads</text>
</svg>'''

# Email timeline: Nov 2025 .. Nov 2026, x per month
months = ["N", "D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N"]
x0, step, base = 20, 34, 104
def mx(i, frac=0.0):
    return x0 + (i + frac) * step
sends = [(1, 0.15, 516, "full"), (4, 0.4, 511, "full"), (5, 0.5, 40, "group"), (9, 0.1, 51, "group")]
tl = [f'<svg class="tl" viewBox="0 0 460 140" role="img" aria-label="Ag Steel emails: full newsletters in December 2025 (516) and March 2026 (511); vineyard groups in April (40) and August (51)">']
# gap shading from mid-March to mid-Nov
gx1, gx2 = mx(4, 0.45), mx(12, 0.55)
tl.append(f'<rect x="{gx1:.1f}" y="18" width="{gx2-gx1:.1f}" height="{base-18}" fill="#F8E1DF" rx="4"/>')
tl.append(f'<text x="{(gx1+gx2)/2:.1f}" y="34" text-anchor="middle" font-size="11" font-weight="700" fill="#8E1D17">8 months without a full newsletter</text>')
tl.append(f'<line x1="{x0}" y1="{base}" x2="{mx(12,1):.1f}" y2="{base}" stroke="#B9B6B0" stroke-width="1.5"/>')
for i, m in enumerate(months):
    tl.append(f'<text x="{mx(i,0.5):.1f}" y="{base+16}" text-anchor="middle" font-size="10" fill="#5A5955">{m}</text>')
tl.append(f'<text x="{mx(0,0.5):.1f}" y="{base+30}" text-anchor="middle" font-size="9" fill="#5A5955">2025</text>')
tl.append(f'<text x="{mx(2,0.5):.1f}" y="{base+30}" text-anchor="middle" font-size="9" fill="#5A5955">2026</text>')
for i, f, n, kind in sends:
    x = mx(i, f)
    h = 14 + (n / 516) * 50
    col = "#354757" if kind == "full" else "#6E9F3A"
    tl.append(f'<line x1="{x:.1f}" y1="{base}" x2="{x:.1f}" y2="{base-h:.1f}" stroke="{col}" stroke-width="3"/>')
    tl.append(f'<circle cx="{x:.1f}" cy="{base-h:.1f}" r="6" fill="{col}"><title>{n} recipients</title></circle>')
    tl.append(f'<text x="{x:.1f}" y="{base-h-10:.1f}" text-anchor="middle" font-size="11" font-weight="700" fill="#111110">{n}</text>')
tl.append('</svg>')
timeline = "\n".join(tl)

# Search spend stacked bar
segs = [
    (54, "#B3261E", "Wineries, orchards, horticulture firms"),
    (28, "#D9622B", "Other steel suppliers"),
    (5, "#D4A017", "General agriculture information"),
    (5, "#B9B6B0", "Other, mostly business names"),
    (4, "#354757", "Ag Steel and AgBeam by name"),
    (3, "#8C8A85", "Buying steel, no product named"),
    (2, "#1E7A4C", "Posts, trellis, wire, beams, clips"),
]
stack = "".join(f'<span style="width:{p}%;background:{col}" title="{lab}: {p}%"></span>' for p, col, lab in segs)
stack_leg = "".join(f'<li><i style="background:{col}"></i><b>{p}%</b> {lab}</li>' for p, col, lab in segs)

# Organic top pages
pages = [("Ag Beam", 196, True), ("Vineyard posts", 103, True), ("Stringing poles", 99, True), ("Home page", 90, False), ("Kiwifruit orchards", 70, True)]
org = "".join(
    f'<li><span class="hb__l">{n}</span><span class="hb__t"><span style="width:{v/196*100:.1f}%;background:{"var(--good)" if p else "#B9B6B0"}"></span></span><span class="hb__v num">{v}</span></li>'
    for n, v, p in pages)

section = f'''<!-- NUMBERS -->
<section class="section" id="numbers">
  <div class="wrap">
    <div class="eyebrow">Key figures</div>
    <h2>Audit at a glance</h2>
    <div class="glance">

      <div class="g g--3 g--dark">
        <div class="g__kicker">Google ad spend · 12 months</div>
        <div class="g__big num">NZ$23,381</div>
        <div class="split" aria-hidden="true"><span style="width:73%;background:var(--red)"></span><span style="width:27%;background:#9FB0BF"></span></div>
        <ul class="key key--dark">
          <li><i style="background:var(--red)"></i><b>73%</b> Performance Max · NZ$16,998</li>
          <li><i style="background:#9FB0BF"></i><b>27%</b> Search campaigns · NZ$6,383</li>
        </ul>
        <div class="g__src">Google Ads, 12 Nov 2025 to 11 Nov 2026</div>
      </div>

      <div class="g g--3 g--risk">
        <div class="g__row">
          <div>
            <div class="g__kicker">What Google counts as a conversion</div>
            <div class="g__big num" style="color:var(--poor)">99%</div>
            <div class="g__label">of 2,656 recorded conversions were visits to the contact page</div>
            <ul class="key">
              <li><i style="background:var(--poor)"></i>Contact-page visits · 2,642</li>
              <li><i style="background:var(--good)"></i>Everything else · 14</li>
            </ul>
          </div>
          <div class="waffle" role="img" aria-label="Waffle chart: 99 of 100 squares are contact-page visits">{waffle}</div>
        </div>
        <div class="g__src">Google Ads, 12 months</div>
      </div>

      <div class="g g--2 g--risk">
        <div class="g__kicker">March to October 2026</div>
        <div class="g__big num">75 : 1</div>
        <div class="g__label">conversions recorded for every form enquiry</div>
        <div class="dots" role="img" aria-label="75 grey dots for recorded conversions and one red dot for a form enquiry">{dots}<i class="dots__one"></i></div>
        <div class="g__src">1,884 conversions and 25 form enquiries, AgSteel Performance Tracker</div>
      </div>

      <div class="g g--4">
        <div class="g__kicker">Where Performance Max spent · NZ$17,358</div>
        <div class="g__title">55% of Performance Max spend ran outside Google Search</div>
        <div class="split split--tall" aria-hidden="true"><span style="width:44.4%;background:var(--steel)"></span><span style="width:41.5%;background:var(--fair)"></span><span style="width:13.7%;background:var(--red)"></span><span style="width:0.4%;background:#B9B6B0"></span></div>
        <ul class="key key--grid">
          <li><i style="background:var(--steel)"></i><b>44%</b> Google Search · NZ$7,701</li>
          <li><i style="background:var(--fair)"></i><b>41%</b> Ads on other websites and apps · NZ$7,196</li>
          <li><i style="background:var(--red)"></i><b>14%</b> YouTube · NZ$2,382</li>
          <li><i style="background:#B9B6B0"></i><b>&lt;1%</b> Discover and search partners · NZ$78</li>
        </ul>
        <div class="callout"><span class="callout__n num">8</span><span>contact-form submissions recorded from this spend, against 2,114 contact-page visits. Form submissions are counted from 18 May 2026.</span></div>
        <div class="g__src">Google Ads channel performance report, Vineyard and Kiwifruit campaigns, 10 Nov 2025 to 16 Nov 2026</div>
      </div>

      <div class="g g--3 g--risk">
        <div class="g__kicker">Visible search spend · NZ$5,987</div>
        <div class="g__big num" style="color:var(--strong)">2%</div>
        <div class="g__label">reached people searching for your products</div>
        <div class="stack" aria-hidden="true">{stack}</div>
        <ul class="key key--small">{stack_leg}</ul>
        <div class="g__src">Google Ads search terms report, 500 most-clicked searches, 12 months</div>
      </div>

      <div class="g g--3">
        <div class="g__kicker">Marketing spend · March to October 2026</div>
        <div class="g__row g__row--center">
          {donut}
          <ul class="key">
            <li><i style="background:var(--steel)"></i><b>NZ$15,260</b> Google ads</li>
            <li><i style="background:#C9C6C0"></i><b>NZ$26,106</b> Print, radio and events</li>
            <li class="key__total">Total NZ$41,366</li>
          </ul>
        </div>
        <p class="g__note">Offline spend is recorded in the tracker for March to October only, so this comparison covers those eight months.</p>
        <div class="g__src">Paid KPIs and Offline Media sheets, AgSteel Performance Tracker</div>
      </div>

      <div class="g g--3 g--opp">
        <div class="g__kicker">Organic search · 9 Apr to 9 Nov 2026</div>
        <div class="g__big num" style="color:var(--strong)">923</div>
        <div class="g__label">clicks at no media cost, mostly to product pages</div>
        <ul class="hb">{org}</ul>
        <div class="g__src">Google Search Console, top five pages by clicks</div>
      </div>

      <div class="g g--3 g--opp">
        <div class="g__kicker">Email · Mailchimp</div>
        <div class="g__big num" style="color:var(--strong)">About 700</div>
        <div class="g__label">contacts carry tags that appear to relate to Ag Steel</div>
        {timeline}
        <ul class="key key--small">
          <li><i style="background:var(--steel)"></i>Full newsletter</li>
          <li><i style="background:var(--good)"></i>Vineyard group email</li>
        </ul>
        <div class="g__src">Mailchimp sends, Nov 2025 to Nov 2026. The count includes unsubscribed contacts.</div>
      </div>

    </div>
    <p class="note" style="margin-top:16px">Enquiries and orders that came from the ads: <span class="pending">Pending: your sales records</span></p>
  </div>
</section>

'''

start = html.index("<!-- NUMBERS -->")
end = html.index("<!-- WHAT WAS AUDITED -->")
html = html[:start] + section + html[end:]
open(path, "w", encoding="utf-8").write(html)
print("spliced", len(html))
