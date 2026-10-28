// Print deadlines for the /ad-sizes page and the PDF at /ad-sizes/print.
//
// AFTER ANY EDIT HERE, ALSO:
//   1. Regenerate the PDF from /ad-sizes/print (Chrome: Print > Save as PDF,
//      margins none, background graphics on) and replace
//      public/downloads/via-media-print-deadlines-and-specs.pdf.
//   2. Update UPDATED and AS_FROM in src/pages/AdSpecsPrint.jsx.
//   3. Bump the ?v= value on PDF_HREF in src/pages/AdSizes.jsx.
// The download is a static file; it does not rebuild from this data on its own.
//
// Source of truth: Monday board "Deadlines & Ad Revenue" (1487983673).
//   makeUp = Make-up Deadline (date36)
//   supply = Supply Deadline (date44)
//   live   = Live Date (dup__of_print_deadline) — shown as On sale / Distribution
// The internal print deadline is not published.
//
// Rules (Oct 2026):
//   NZPC and NZV8: make-up = Friday, print − 11; supply = Tuesday, print − 7.
//   Auto Channel:  make-up = Tuesday, print − 7;  supply = Thursday, print − 5.
//   A date that falls on a public holiday moves to the previous working day.
//
// cover: the month or month range printed on the cover — how advertisers refer to an issue.
// The web page hides any issue whose supply date has passed, so old rows can
// stay here until the next yearly update. Dates are ISO strings (NZ local).

export const BRANDS = {
  ac: {
    id: 'ac',
    name: 'Auto Channel',
    short: 'Auto Channel',
    liveLabel: 'Distribution',
    issues: [
      { issue: '097', cover: 'Dec 2026', makeUp: '2026-11-17', supply: '2026-11-19', live: '2026-12-02' },
      { issue: '098', cover: 'Feb 2027', makeUp: '2027-01-19', supply: '2027-01-21', live: '2027-02-03' },
      { issue: '099', cover: 'Mar 2027', makeUp: '2027-02-16', supply: '2027-02-18', live: '2027-03-03' },
      { issue: '100', cover: 'Apr 2027', makeUp: '2027-03-16', supply: '2027-03-18', live: '2027-04-01' },
      { issue: '101', cover: 'May 2027', makeUp: '2027-04-20', supply: '2027-04-22', live: '2027-05-05' },
      { issue: '102', cover: 'Jun 2027', makeUp: '2027-05-18', supply: '2027-05-20', live: '2027-06-02' },
      { issue: '103', cover: 'Jul 2027', makeUp: '2027-06-15', supply: '2027-06-17', live: '2027-07-01' },
      { issue: '104', cover: 'Aug 2027', makeUp: '2027-07-20', supply: '2027-07-22', live: '2027-08-04' },
      { issue: '105', cover: 'Sep 2027', makeUp: '2027-08-17', supply: '2027-08-19', live: '2027-09-01' },
      { issue: '106', cover: 'Oct 2027', makeUp: '2027-09-21', supply: '2027-09-23', live: '2027-10-05' },
      { issue: '107', cover: 'Nov 2027', makeUp: '2027-10-19', supply: '2027-10-21', live: '2027-11-03' },
      { issue: '108', cover: 'Dec 2027', makeUp: '2027-11-16', supply: '2027-11-18', live: '2027-12-01' },
    ],
  },
  nzpc: {
    id: 'nzpc',
    name: 'NZ Performance Car',
    short: 'NZPC',
    liveLabel: 'On sale',
    issues: [
      { issue: '324', cover: 'Jan–Mar 2027', makeUp: '2026-11-20', supply: '2026-11-24', live: '2026-12-14' },
      { issue: '325', cover: 'Apr–Jun 2027', makeUp: '2027-02-12', supply: '2027-02-16', live: '2027-03-08' },
      { issue: '326', cover: 'Jul–Sep 2027', makeUp: '2027-05-14', supply: '2027-05-18', live: '2027-06-07' },
      { issue: '327', cover: 'Oct–Dec 2027', makeUp: '2027-08-06', supply: '2027-08-10', live: '2027-08-30' },
      { issue: '328', cover: 'Jan–Mar 2028', makeUp: '2027-11-12', supply: '2027-11-16', live: '2027-12-06' },
    ],
  },
  nzv8: {
    id: 'nzv8',
    name: 'NZV8',
    short: 'NZV8',
    liveLabel: 'On sale',
    issues: [
      { issue: '237', cover: 'Jan–Feb 2027', makeUp: '2026-11-20', supply: '2026-11-24', live: '2026-12-14' },
      { issue: '238', cover: 'Mar–Apr 2027', makeUp: '2027-01-29', supply: '2027-02-02', live: '2027-02-22' },
      { issue: '239', cover: 'May–Jun 2027', makeUp: '2027-03-25', supply: '2027-03-30', live: '2027-04-19' },
      { issue: '240', cover: 'Jul–Aug 2027', makeUp: '2027-05-21', supply: '2027-05-25', live: '2027-06-14' },
      { issue: '241', cover: 'Sep–Oct 2027', makeUp: '2027-07-23', supply: '2027-07-27', live: '2027-08-16' },
      { issue: '242', cover: 'Nov–Dec 2027', makeUp: '2027-09-24', supply: '2027-09-28', live: '2027-10-18' },
      { issue: '243', cover: 'Jan–Feb 2028', makeUp: '2027-11-19', supply: '2027-11-23', live: '2027-12-13' },
    ],
  },
}

// Plain-language definitions, matched to the Auto Channel media kit page.
export const DATE_TYPES = {
  makeUp: {
    label: 'Make-up',
    text: 'Send copy and images by this date if we are creating your ad or editorial.',
  },
  supply: {
    label: 'Supply',
    text: 'Send finished, production-ready artwork by this date.',
  },
  live: {
    label: 'On sale / Distribution',
    text: 'The date the issue goes on sale or is distributed.',
  },
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "Tue 17 Nov", or "Tue 17 Nov 2026" with withYear.
export function formatDate(iso, withYear = false) {
  const [y, m, d] = iso.split('-').map(Number)
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  return `${DAYS[dow]} ${d} ${MONTHS[m - 1]}${withYear ? ` ${y}` : ''}`
}

// Today's date in New Zealand as YYYY-MM-DD, whatever the viewer's time zone.
export function todayNZ() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Pacific/Auckland' }).format(new Date())
}

// Issues still open for booking: supply date is today or later.
export function openIssues(brand, today = todayNZ()) {
  return brand.issues.filter((i) => i.supply >= today)
}
