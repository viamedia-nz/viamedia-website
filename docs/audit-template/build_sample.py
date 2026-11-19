"""Sample digital platform audit (fictional business) built from the Via Media audit template.

Uses the Ag Steel report's head, CSS, wordmark and script; riskcard.py for the spend-at-risk card.
Output: /home/claude/work/sample-audit/index.html
"""
import sys, os
sys.path.insert(0, "/home/claude/scripts")
from riskcard import risk_card, RISK_CSS, currency

src = open("/home/claude/work/agsteel-audit/index.html", encoding="utf-8").read()
head = src[: src.index('<div class="draft">')]
tail = src[src.index("<script>"):]
# drop any earlier RISK_CSS copy from the template head, then add our own once
head = head.replace(RISK_CSS, "")
head = head.replace("<title>Ag Steel Google Ads audit</title>", "<title>Sample digital platform audit · Tarnell Industrial</title>")


def gauge(level, label):
    return f'<div class="gauge" data-level="{level}"><div class="gauge__bar">{"<span></span>" * 5}</div><div class="gauge__label">{label}</div></div>'


CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>'


def finding(n, p, title, summ, f, i, fixes, open_=False):
    tag = {"high": "High", "medium": "Medium", "low": "Low"}[p]
    o = " open" if open_ else ""
    return f'''
      <details class="finding" data-p="{p}"{o}>
        <summary><span class="tag tag--{p}">{tag}</span><span><span class="ftitle">{n}. {title}</span><span class="fsum">{summ}</span></span>{CHEV}</summary>
        <div class="fbody"><dl>
          <dt>Finding</dt><dd>{f}</dd>
          <dt>Impact</dt><dd>{i}</dd>
          <dt>Fixes</dt><dd>{fixes}</dd>
        </dl></div>
      </details>'''


def fix(n, t, why, chips):
    c = "".join(f'<span class="chip">{x}</span>' for x in chips)
    return f'<div class="fix"><div class="fix__top"><span class="fix__n">{n}</span><span class="fix__t">{t}</span></div><p class="fix__why">{why}</p><div class="fix__meta">{c}</div></div>'


def hb(rows, maxv, wide=False):
    cls = "hb hb--wide" if wide else "hb"
    out = []
    for label, v, col in rows:
        out.append(f'<li><span class="hb__l">{label}</span><span class="hb__t"><span style="width:{v / maxv * 100:.1f}%;background:{col}"></span></span><span class="hb__v num">{v:,}</span></li>')
    return f'<ul class="{cls}">' + "".join(out) + "</ul>"


RISK = risk_card(
    31400, 10408, 15652,
    "searches for other businesses or off-target searches (about $4,400), and Performance Max ads outside Google Search (about $6,000)",
    "about half", "38%",
    "Google Ads search terms and channel performance reports. Sample figures; estimates rounded.")

dots = "".join("<i></i>" for _ in range(12))

segs = [(29, "#B3261E", "Other businesses by name"), (9, "#D9622B", "Clearly off-target"),
        (31, "#1E7A4C", "Relevant product searches"), (18, "#D4A017", "General trade searches"),
        (13, "#354757", "Tarnell by name")]
stack = "".join(f'<span style="width:{p}%;background:{c}" title="{l}: {p}%"></span>' for p, c, l in segs)
stack_leg = "".join(f'<li><i style="background:{c}"></i><b>{p}%</b> {l}</li>' for p, c, l in segs)

body = f'''<div class="sample">Sample report. Tarnell Industrial is a fictional business; names and figures are illustrative.</div>

<header class="hero">
  <div class="hero__inner">
    <svg class="wordmark" viewBox="0 0 1326 432" role="img" aria-label="Via Media"><use href="#vm-wordmark"></use></svg>
    <h1>Tarnell Industrial digital platform audit</h1>
    <p class="hero__sub">Findings and prioritised fixes</p>
    <dl class="hero__meta">
      <div><dt>Prepared for</dt><dd>Tarnell Industrial</dd></div>
      <div><dt>Period reviewed</dt><dd>12 months to Nov 2026</dd></div>
      <div><dt>Audit dates</dt><dd>Two weeks, Nov 2026</dd></div>
      <div><dt>Prepared by</dt><dd>Via Media</dd></div>
    </dl>
  </div>
</header>

<!-- KEY POINTS -->
<section class="section section--white" id="summary">
  <div class="wrap">
    <div class="eyebrow">Overview</div>
    <h2>Key points</h2>
    <p class="lede">Tarnell Industrial spent <span class="num">NZ$38,600</span> on Google and Meta ads in the last 12 months. The ads produce enquiries, but the platforms count the wrong things, and a third of Google spend reaches people unlikely to buy.</p>
    <div class="points">
      <div class="point"><div><strong>Google counts page visits and repeat form submissions as enquiries</strong><p>Google recorded 3,140 conversions. Your CRM shows 260 enquiries from the website and phone in the same period, about 12 recorded conversions for every real enquiry.</p></div></div>
      <div class="point"><div><strong>A third of Google spend went on clicks unlikely to produce an enquiry</strong><p>At least $10,400 of $31,400 went on searches for other businesses and Performance Max ads outside Google Search.</p></div></div>
      <div class="point"><div><strong>Meta lead ads produce leads that are not followed up</strong><p>Meta collected 52 leads. Fourteen were contacted within two days, and none reach the CRM automatically.</p></div></div>
      <div class="point"><div><strong>Two of three product lines are not advertised</strong><p>Bearings and fasteners have no campaigns, although they receive a quarter of organic search clicks.</p></div></div>
      <div class="point"><div><strong>The website and email list can do more</strong><p>Product pages are slow on mobile and a third are not in Google's index. 2,850 trade contacts receive a newsletter but no reorder reminders.</p></div></div>
    </div>
    <div class="verdict"><b>Verdict</b><span>Google can pay its way at current spend once it counts real enquiries. Move a third of it to product searches, and connect Meta leads to the CRM.</span></div>
  </div>
</section>

<!-- NUMBERS -->
<section class="section" id="numbers">
  <div class="wrap">
    <div class="eyebrow">Key figures</div>
    <h2>Audit at a glance</h2>
    <div class="glance">

      <div class="g g--3 g--dark">
        <div class="g__kicker">Paid media spend · 12 months</div>
        <div class="g__big num">NZ$38,600</div>
        <div class="split" aria-hidden="true"><span style="width:34%;background:#9FB0BF"></span><span style="width:47%;background:var(--red)"></span><span style="width:19%;background:#6FA8DC"></span></div>
        <ul class="key key--dark">
          <li><i style="background:#9FB0BF"></i><b>34%</b> Google Search campaigns · NZ$13,200</li>
          <li><i style="background:var(--red)"></i><b>47%</b> Google Performance Max · NZ$18,200</li>
          <li><i style="background:#6FA8DC"></i><b>19%</b> Meta lead ads · NZ$7,200</li>
        </ul>
        <div class="g__src">Google Ads and Meta Ads Manager</div>
      </div>

      <div class="g g--3 g--risk">
        <div class="g__kicker">What Google counts</div>
        <div class="g__big num">12 : 1</div>
        <div class="g__label">conversions recorded by Google for every real enquiry</div>
        <div class="dots" role="img" aria-label="12 grey dots for recorded conversions and one red dot for a real enquiry">{dots}<i class="dots__one"></i></div>
        <div class="g__src">3,140 Google Ads conversions; 260 website and phone enquiries in the CRM</div>
      </div>
{RISK}
      <div class="g g--3">
        <div class="g__kicker">Where Performance Max spent · NZ$18,200</div>
        <div class="g__title">33% ran outside Google Search</div>
        <div class="split split--tall" aria-hidden="true"><span style="width:67%;background:var(--steel)"></span><span style="width:21%;background:var(--fair)"></span><span style="width:12%;background:var(--red)"></span></div>
        <ul class="key">
          <li><i style="background:var(--steel)"></i><b>67%</b> Google Search · NZ$12,200</li>
          <li><i style="background:var(--fair)"></i><b>21%</b> Ads on other websites and apps · NZ$3,800</li>
          <li><i style="background:var(--red)"></i><b>12%</b> YouTube and Discover · NZ$2,200</li>
        </ul>
        <div class="g__src">Google Ads channel performance report</div>
      </div>

      <div class="g g--3 g--risk">
        <div class="g__kicker">Visible search spend · NZ$11,600</div>
        <div class="g__big num">38%</div>
        <div class="g__label">reached people searching for other businesses, or for something Tarnell does not sell</div>
        <div class="stack" aria-hidden="true">{stack}</div>
        <ul class="key key--small">{stack_leg}</ul>
        <div class="g__src">Google Ads search terms report</div>
      </div>

      <div class="g g--3 g--risk">
        <div class="g__kicker">Meta lead ads · NZ$7,200</div>
        <div class="g__big num">52</div>
        <div class="g__label">leads collected; 14 contacted within two days</div>
        {hb([("Leads collected", 52, "#6FA8DC"), ("Contacted within two days", 14, "var(--poor)"), ("Became quotes", 9, "var(--poor)")], 52, wide=True)}
        <div class="g__src">Meta Ads Manager and CRM</div>
      </div>

      <div class="g g--3 g--risk">
        <div class="g__kicker">Website · light technical check</div>
        <div class="g__big num">6.8s</div>
        <div class="g__label">to load a product page on mobile; Google recommends under 2.5 seconds</div>
        {hb([("Product pages", 664, "var(--steel)"), ("In Google's index", 412, "var(--good)"), ("Not indexed", 252, "var(--poor)")], 664, wide=True)}
        <div class="g__src">PageSpeed Insights and Search Console</div>
      </div>

      <div class="g g--3 g--opp">
        <div class="g__kicker">Organic search · per month</div>
        <div class="g__big num" style="color:var(--strong)">640</div>
        <div class="g__label">organic clicks a month at no media cost, 71% to product pages</div>
        {hb([("Hydraulic hose fittings", 132, "var(--good)"), ("Bearings", 96, "var(--good)"), ("Hydraulic cylinders", 88, "var(--good)"), ("Fasteners", 61, "var(--good)"), ("Home page", 54, "#B9B6B0")], 132, wide=True)}
        <div class="g__src">Search Console, top five pages by clicks</div>
      </div>

      <div class="g g--3 g--opp">
        <div class="g__kicker">Email · 12 months</div>
        <div class="g__big num" style="color:var(--strong)">2,850</div>
        <div class="g__label">trade contacts on the email list</div>
        <ul class="key">
          <li><i style="background:var(--good)"></i><b>11</b> newsletters sent</li>
          <li><i style="background:var(--good)"></i><b>3.8%</b> average click rate</li>
          <li><i style="background:var(--poor)"></i><b>0</b> automated reorder or follow-up emails</li>
        </ul>
        <div class="g__src">Email platform reports</div>
      </div>

    </div>
  </div>
</section>

<!-- WHAT WAS AUDITED -->
<section class="section section--white" id="audited">
  <div class="wrap">
    <div class="eyebrow">Scope</div>
    <h2>What was audited</h2>
    <p class="lede">Each area we reviewed, what it covered, and its health today.</p>
    <div class="scorecard" role="table" aria-label="Audit areas and health">
      <div class="sc-row sc-head" role="row"><div role="columnheader">Area</div><div role="columnheader">What was audited</div><div role="columnheader">Health</div></div>
      <div class="sc-row" role="row"><div class="sc-task" role="cell">Google Ads review</div><div class="sc-what" role="cell">Campaigns, budgets, bidding, keywords, ads, settings, and the searches that triggered the ads</div><div role="cell">{gauge(2, "Poor")}</div></div>
      <div class="sc-row" role="row"><div class="sc-task" role="cell">Coverage of products and industries</div><div class="sc-what" role="cell">Keywords and campaigns against your product lines, target industries and regions</div><div role="cell">{gauge(2, "Poor")}</div></div>
      <div class="sc-row" role="row"><div class="sc-task" role="cell">Conversion tracking</div><div class="sc-what" role="cell">What Google Ads, Meta, Google Analytics and Tag Manager count, and the tags on the website</div><div role="cell">{gauge(1, "Critical")}</div></div>
      <div class="sc-row" role="row"><div class="sc-task" role="cell">Call tracking</div><div class="sc-what" role="cell">Calls from ads, calls to the numbers on the website, and taps on website phone links</div><div role="cell">{gauge(3, "Fair")}</div></div>
      <div class="sc-row" role="row"><div class="sc-task" role="cell">Meta ads</div><div class="sc-what" role="cell">Campaigns, audiences, lead forms, the Meta pixel, and where leads go</div><div role="cell">{gauge(2, "Poor")}</div></div>
      <div class="sc-row" role="row"><div class="sc-task" role="cell">Website, organic search and Merchant Centre</div><div class="sc-what" role="cell">Mobile speed, indexing, organic search performance, and whether products can appear in Google Shopping</div><div role="cell">{gauge(3, "Fair")}</div></div>
      <div class="sc-row" role="row"><div class="sc-task" role="cell">Enquiry forms and lead handling</div><div class="sc-what" role="cell">Forms on the website and in Meta, and how enquiries reach the sales team</div><div role="cell">{gauge(2, "Poor")}</div></div>
      <div class="sc-row" role="row"><div class="sc-task" role="cell">Email</div><div class="sc-what" role="cell">List, segments, sign-up sources, sends and automations</div><div role="cell">{gauge(3, "Fair")}</div></div>
      <div class="sc-row" role="row"><div class="sc-task" role="cell">Reporting</div><div class="sc-what" role="cell">Your monthly marketing report against what the platforms and the CRM record</div><div role="cell">{gauge(2, "Poor")}</div></div>
    </div>
    <div class="legend" aria-hidden="true"><span><i style="background:var(--crit)"></i>Critical</span><span><i style="background:var(--poor)"></i>Poor</span><span><i style="background:var(--fair)"></i>Fair</span><span><i style="background:var(--good)"></i>Good</span><span><i style="background:var(--strong)"></i>Strong</span></div>
  </div>
</section>

<!-- FINDINGS -->
<section class="section" id="findings">
  <div class="wrap">
    <div class="eyebrow">Findings</div>
    <h2>Audit findings</h2>
    <p class="lede">Six findings, listed in order of urgency. Each shows the finding, its impact, and the fixes that address it in the prioritised fix list below.</p>
    <div class="toolbar"><span class="toolbar__hint">Select a finding to open it, or open them all.</span><button class="btn" type="button" id="toggle-all">Expand all</button></div>
    <div class="findings">
{finding(1, "high", "Google counts page visits and repeat form submissions as enquiries", "About 12 recorded conversions for every real enquiry",
 "Google Ads uses three main conversions: a visit to the contact page, a visit to the quote page, and the quote form. The quote form's thank-you page reloads when a visitor returns to it, so one enquiry can be counted several times. Calls from the ads are counted correctly. Google recorded 3,140 conversions in 12 months; your CRM shows 260 enquiries from the website and phone.",
 "Every cost-per-lead figure in Google and in your monthly report is far lower than the real cost. The campaigns are set to find more conversions, so they find more page visits.", "1 and 3", True)}
{finding(2, "high", "A third of Google spend went on clicks unlikely to produce an enquiry", "Searches for other businesses, and Performance Max ads outside Search",
 "Of the searches Google shows, 38% of spend went on searches for other businesses by name or for products Tarnell does not sell, such as ‘hydraulic repairs near me’. Most keywords are broad match. Performance Max spent 33% of its budget on ads on other websites, apps and YouTube.",
 "At least $10,400 of $31,400, and up to an estimated $15,700, went on clicks unlikely to produce an enquiry.", "4 and 5")}
{finding(3, "high", "Meta leads are not followed up", "52 leads; 14 contacted within two days; no link to the CRM",
 "Meta lead ads collected 52 leads in 12 months. The leads stay in Meta until someone downloads them, which happened about once a fortnight. Fourteen leads were contacted within two days and nine became quotes. The Meta pixel is on the website but records page views only.",
 "Leads go cold before anyone calls. Meta also cannot learn which leads became customers, so it keeps finding people who fill in forms rather than people who buy.", "2, 3 and 10")}
{finding(4, "medium", "Two of three product lines are not advertised", "No campaigns for bearings or fasteners",
 "All campaigns promote hydraulics. Bearings and fasteners have no keywords or ads, although they receive a quarter of organic search clicks. There are no campaigns for your target industries (transport fleets, agriculture, food processing).",
 "Buyers searching for two thirds of your range, or by industry, are not reached by the ads.", "6")}
{finding(5, "medium", "Product pages are slow on mobile, and a third are not indexed", "6.8 seconds to load; 252 of 664 product pages not in Google's index",
 "Product pages take 6.8 seconds to load on mobile, mainly because of large product images. Search Console shows 252 product pages not indexed, mostly filter pages that duplicate the main category pages. The online catalogue has no product feed in Merchant Centre.",
 "Slow pages lose visitors from both ads and organic search, and products not in the index or in Merchant Centre cannot be found.", "7 and 8")}
{finding(6, "low", "The email list is used for news, not reorders", "2,850 trade contacts; no automated emails",
 "The list holds 2,850 trade contacts, tagged by branch but not by industry or product line. Eleven newsletters went out in 12 months, with a 3.8% average click rate. There are no reorder reminders, quote follow-ups or welcome emails.",
 "Repeat trade buyers are the easiest sales to win, and the list is not prompting them.", "9")}
    </div>
  </div>
</section>

<!-- FIX LIST -->
<section class="section section--white" id="fixes">
  <div class="wrap">
    <div class="eyebrow">Fixes</div>
    <h2>Prioritised fix list</h2>
    <p class="lede">Fixes 1 to 4 come first: they make the results accurate and stop the clearest losses. Once the data is correct, it will show how far to take fixes 5 to 11, and the effect of each fix can be measured.</p>
    <div class="lanes">
      <div class="lane">
        <div class="lane__head"><h3>Now</h3><span>4 fixes</span></div>
        {fix(1, "Count only real enquiries: each form once, calls over 60 seconds, and phone taps", "Gives the bidding a true target.", ["Small", "Via Media", "Finding 1"])}
        {fix(2, "Send Meta leads straight to the CRM, with an alert to the sales team", "Leads are called the same day.", ["Small", "Via Media", "Finding 3"])}
        {fix(3, "Test every enquiry route together and confirm each is counted once", "Proves the counting works.", ["Small", "Tarnell and Via Media", "Findings 1 and 3"])}
        {fix(4, "Exclude searches for other businesses; narrow broad keywords", "Stops the clearest unproductive spend.", ["Small", "Via Media", "Finding 2"])}
      </div>
      <div class="lane">
        <div class="lane__head"><h3>Next</h3><span>4 fixes</span></div>
        {fix(5, "Move Performance Max budget into Search campaigns by product line", "Puts spend where buyers search for products.", ["Medium", "Via Media", "Finding 2"])}
        {fix(6, "Add campaigns for bearings, fasteners and target industries", "Covers the whole range.", ["Medium", "Via Media", "Finding 4"])}
        {fix(7, "Compress product images; speed up product pages on mobile", "Keeps visitors from ads and search.", ["Medium", "Your web developer", "Finding 5"])}
        {fix(8, "Remove duplicate filter pages from the index; set up a Merchant Centre feed", "Makes every product findable.", ["Medium", "Your web developer and Via Media", "Finding 5"])}
      </div>
      <div class="lane">
        <div class="lane__head"><h3>Later</h3><span>3 fixes</span></div>
        {fix(9, "Tag contacts by industry and product line; add reorder and quote follow-up emails", "Brings repeat buyers back.", ["Medium", "Tarnell and Via Media", "Finding 6"])}
        {fix(10, "Use Meta to reach past website visitors and people similar to existing customers", "Keeps Tarnell in front of likely buyers.", ["Small", "Via Media", "Finding 3"])}
        {fix(11, "Rebuild the monthly report on enquiries, quotes and orders by source", "Judges each channel on sales.", ["Small", "Via Media"])}
      </div>
    </div>
  </div>
</section>

<!-- REPORTING -->
<section class="section" id="tracker">
  <div class="wrap">
    <div class="eyebrow">Reporting</div>
    <h2>Your monthly marketing report</h2>
    <p class="lede">You've requested that campaign results fit your existing reporting, so we've reviewed your monthly marketing report against the audit findings. The report uses platform figures to judge performance, and those figures can't support that judgement until the following are fixed.</p>
    <div class="tablewrap">
      <table class="ttable">
        <thead><tr><th scope="col">Report rows</th><th scope="col">Status</th><th scope="col">Why</th><th scope="col">Fix</th></tr></thead>
        <tbody>
          <tr><td>Ad spend, clicks, impressions</td><td><span class="pill pill--ok">Reliable</span></td><td>Taken directly from Google Ads and Meta.</td><td>None</td></tr>
          <tr><td>Google conversions, cost per lead</td><td><span class="pill pill--no">Not reliable</span></td><td>Page visits and repeat form submissions are counted as enquiries.</td><td>1 and 3</td></tr>
          <tr><td>Meta leads, cost per lead</td><td><span class="pill pill--part">Partly reliable</span></td><td>The lead count is correct, but nothing shows which leads were followed up or became quotes.</td><td>2</td></tr>
          <tr><td>Website enquiries</td><td><span class="pill pill--part">Partly reliable</span></td><td>Counts the quote form, including repeat submissions; phone taps are not counted.</td><td>1</td></tr>
          <tr><td>Organic search rows</td><td><span class="pill pill--ok">Reliable</span></td><td>Matches Search Console.</td><td>None</td></tr>
          <tr><td>Quotes and orders by source</td><td><span class="pill pill--wait">Not reported</span></td><td>The CRM holds the data, but the report does not use it.</td><td>11</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- STRATEGY -->
<section class="section section--white" id="strategy">
  <div class="wrap">
    <div class="eyebrow">Strategy</div>
    <h2>Making Google, Meta, organic search and email work</h2>
    <p class="lede">Based on your enquiry and order data, and the findings above.</p>
    <div class="strat">
      <div class="strat__row"><b>Recommended budget</b><span>Keep Google at about $2,600 a month, with a third moved from Performance Max into Search campaigns by product line. Keep Meta at about $600 a month, moved from lead forms to past website visitors and people similar to existing customers.</span></div>
      <div class="strat__row"><b>Role of each channel</b><span>Google Search captures buyers looking for a product. Meta keeps Tarnell in front of likely buyers between purchases. Email prompts reorders. Organic search supports all three through faster, indexed product pages.</span></div>
      <div class="strat__row"><b>Required for execution</b><span>A landing page for each product line with a short quote form; lead source recorded in the CRM; product images resized for mobile.</span></div>
      <div class="strat__row"><b>Success measures</b><span>Cost per qualified enquiry under $85; 70% of leads contacted within two hours; organic clicks to product pages up 25% in six months; reorder emails producing 10 orders a month.</span></div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section cta" id="book">
  <div class="wrap cta__inner">
    <div>
      <div class="eyebrow eyebrow--light">Book an audit</div>
      <h2>See this for your business</h2>
      <p>A Via Media digital platform audit covers Google, Meta, email, your website and your reporting. You get a report like this one, a prioritised fix list, and a walkthrough with our team.</p>
    </div>
    <a class="cta__btn" href="https://viamedia.co.nz/#contact">Talk to us</a>
  </div>
</section>

<!-- BASIS + GLOSSARY -->
<section class="section" id="basis">
  <div class="wrap">
    <div class="eyebrow">Notes</div>
    <h2>About this sample</h2>
    <div class="basis">This sample shows the format and depth of a Via Media digital platform audit. Tarnell Industrial, its people and its figures are fictional, based on patterns we see in real audits. A real audit is based on read-only access to your ad accounts, analytics, Search Console and email platform, your own reports, and information you supply.</div>
    <details class="gloss">
      <summary>Plain-English glossary {CHEV}</summary>
      <dl>
        <dt>Conversion</dt><dd>Whatever an ad platform is told to count as a success.</dd>
        <dt>Performance Max</dt><dd>A Google campaign that places ads across Search, YouTube, Maps and partner sites, and chooses where itself.</dd>
        <dt>Ads on other websites and apps</dt><dd>Google's Display Network: banner and image ads shown on sites and apps that carry Google ads.</dd>
        <dt>Lead ad</dt><dd>A Meta ad with a form inside Facebook or Instagram, so people can enquire without visiting the website.</dd>
        <dt>Indexed</dt><dd>Stored by Google so the page can appear in search results.</dd>
        <dt>Product feed</dt><dd>A list of products, prices and stock sent to Google Merchant Centre so they can appear in Shopping results.</dd>
        <dt>Broad keyword</dt><dd>A keyword Google may match to loosely related searches.</dd>
        <dt>Organic search</dt><dd>The ordinary Google results below the ads, at no media cost.</dd>
      </dl>
    </details>
  </div>
</section>

<footer class="footer">
  <div class="wrap"><span><b>Via Media</b> · Sample digital platform audit · Fictional business, illustrative figures</span><span>Prepared November 2026</span></div>
</footer>

'''

extra = RISK_CSS + '''
  .sample { background:#ECEBE8; color:#5A5955; font-size:0.78rem; font-weight:600; padding:7px 24px; text-align:center; letter-spacing:0.01em; }
  .hb--wide li { grid-template-columns:190px 1fr 40px; }
  .cta { background:linear-gradient(105deg, var(--hero-left) 0%, var(--hero-left) 42%, var(--hero-right) 100%); color:#F4F3F0; }
  .cta h2 { color:#fff; }
  .cta p { color:rgba(244,243,240,0.85); max-width:62ch; font-size:1.02rem; }
  .eyebrow--light { color:#fff; }
  .eyebrow--light::before { background:var(--red); }
  .cta__inner { display:flex; flex-wrap:wrap; gap:24px 40px; align-items:center; justify-content:space-between; }
  .cta__btn { display:inline-block; background:var(--red); color:#fff; font-weight:700; text-decoration:none; padding:14px 28px; border-radius:100px; white-space:nowrap; }
  .cta__btn:hover { background:var(--red-dark); }
  .cta__btn:focus-visible { outline:3px solid #fff; outline-offset:3px; }
  @media (max-width: 560px) { .hb--wide li { grid-template-columns:130px 1fr 40px; } }
  @media print { .cta { display:none; } }
</style>'''
head = head.replace("</style>", extra, 1)
out = currency(head + body + tail)
os.makedirs("/home/claude/work/sample-audit", exist_ok=True)
open("/home/claude/work/sample-audit/index.html", "w", encoding="utf-8").write(out)
print(len(out))
