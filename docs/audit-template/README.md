# Via Media digital platform audit template

The audit report format used for client audits (first used for Ag Steel and Industrial Tube Australia, Nov 2026) and for the public sample at `/lp/audits/sample`.

This repository is public. Never commit client data to this folder. Client audit pages live only at `public/lp/audits/<random token>/index.html`.

## Files

- `template.html` — the sample audit (fictional business, Tarnell Industrial). Copy it as the starting point for a new audit: head, CSS, wordmark, sections and script are all in this one file.
- `build_sample.py` — builds the sample page. Shows how each section is generated (findings, fixes, scorecard, cards).
- `riskcard.py` — the "Spend unlikely to produce enquiries" card and the currency convention (state NZ$ once in the hero, then plain $).
- `glance.py` — helpers for the "Audit at a glance" cards (waffle, dots, donut, timeline, stacked bars).

The scripts were written for a working folder at `/home/claude/work/`. Adjust the paths at the top of each script before running.

## Section order

1. Small sample or draft strip (remove the draft strip before the client sees the report).
2. Hero: Prepared for, Period reviewed, Figures (NZ$, excluding GST), Audit dates, Prepared by. No internal job numbers.
3. Key points: five numbered points and a verdict.
4. Audit at a glance: headline spend, spend-at-risk card (full width), then problem cards (orange stripe) and opportunity cards (green stripe).
5. What was audited: Area / What was audited / Health (Critical, Poor, Fair, Good, Strong).
6. Audit findings: six accordions, High / Medium / Low, Finding / Impact / Fixes. Finding 1 open.
7. Prioritised fix list: Now / Next / Later.
8. Reporting: the client's own report or tracker, row by row.
9. Strategy.
10. Basis of the audit and glossary.

The full design and copy rules are in the Claude project doc `claude/tgf-audit-report-design-notes.md` (Via Media Meta reporting project).

## Publishing

Copy the finished HTML to `public/lp/audits/<16-hex token>/index.html` and push to `main`. Vercel deploys in about a minute. `/lp/(.*)` sends `X-Robots-Tag: noindex`, `robots.txt` disallows `/lp/`, and each page carries `<meta name="robots" content="noindex, nofollow">`.
