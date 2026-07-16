// Central site config + helpers

import portfolio from './portfolio.json';

export const company = {
  name: 'Eagle Restorations Group, Inc.',
  shortName: 'Eagle Restorations',
  tagline: "Southern California's Premier Historical and Structural Specialists",
  license: 'License No. 465977',
  licenseClass: "Class 'B' general building contractor in the State of California",
  email: 'info@eagle-restorations.com',
  phone: '(626) 930-0188',
  phoneHref: '+16269300188',
  address: '5441 Cogswell Rd Suite A, Arcadia, CA 91006',
  hours: 'Mon – Fri: 9:00am – 5:00pm',
  // Single source of truth for "founded 1991" — drives both the homepage
  // "Years of Experience" stat and the structured-data foundingDate below,
  // so the two can't drift apart.
  foundedYear: 1991,
};

// Contact form handler. Create a free form at https://formspree.io (or Web3Forms),
// then paste the endpoint URL here (e.g. 'https://formspree.io/f/abcdwxyz').
// While empty, forms fall back to a mailto link so they still work.
export const formEndpoint = 'https://formspree.io/f/meeblakb';

export const nav = [
  { label: 'Projects', href: '/projects/' },
  { label: 'About & Services', href: '/about-and-services/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Press & Awards', href: '/press-awards/' },
];

export const announcement = {
  text: "Affected by the fires in Altadena? We're here to help you rebuild",
  href: '/altadena-fire/',
};

// Years of Experience and Projects Completed are derived, not hand-typed —
// years counts back from company.foundedYear so it's correct on every
// rebuild without anyone having to remember to bump it, and the project
// count comes straight from portfolio.json's real length (currently 80,
// so "80+" below is accurate; if it ever drops under 80 the "+" reads
// wrong for a marketing stat, so this only auto-derives at 80 or above —
// smaller counts should get a literal, non-"+" number set by hand instead).
const yearsOfExperience = new Date().getFullYear() - company.foundedYear;
const projectsCompleted = portfolio.length >= 80 ? `${portfolio.length}+` : String(portfolio.length);

export const stats = [
  { value: String(yearsOfExperience), label: 'Years of Experience' },
  { value: projectsCompleted, label: 'Projects Completed' },
  { value: '1790', label: 'Oldest Historic Project', plain: true },
];

// Single source of truth for service offerings — used on the About & Services
// page, the footer, and the sitewide structured data (hasOfferCatalog) so the
// schema never drifts from what's actually on the page.
export const services = [
  { title: 'Historic Restoration', items: [
    'Commercial buildings, churches, and federal, state, and local landmarks',
    'Materials restoration: stained glass, fine carpentry, stone and marble, light fixtures, statues and mouldings',
    'Door and window fabrication and repair',
  ]},
  { title: 'Seismic & Structural Retrofit', items: [
    'Structural support and bracing',
    'Interior demo and retrofit',
    'Foundation bolting',
  ]},
  { title: 'Adobe Restoration & Reconstruction', items: [
    'Adobe mud plastering',
    'Adobe block repairs and recreation',
    'Adobe retrofitting',
    'Period-authentic interior lime plastering',
  ]},
  { title: 'Building Materials Restoration', items: [
    'Restoration of stained glass, fine carpentry, stone and marble, light fixtures, statues and mouldings',
    'Repairs to brick, historic concrete, tile, and plaster',
    'Door and window fabrication and repair',
  ]},
];

// Founder / President — reused for the schema's `founder` + memberships.
export const founder = {
  name: 'Jeff Seidner',
  jobTitle: 'President',
  memberOf: [
    'California Preservation Foundation',
    'State of California Trust for Historic Preservation Foundation',
    'Building Trades Association',
    'National Association of General Contractors',
  ],
};

// Map a WordPress media URL to a local public path.
// e.g. http://eagle-restorations.com/wp-content/uploads/2021/01/x.png
//   -> /wp-content/uploads/2021/01/x.png
export function localImage(url) {
  if (!url) return '';
  return url.replace(/^https?:\/\/[^/]+/i, '');
}
