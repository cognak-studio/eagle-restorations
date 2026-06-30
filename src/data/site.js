// Central site config + helpers

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
  text: 'Affected by the fires in Altadena? We are here to help you rebuild',
  href: '/altadena-fire/',
};

export const stats = [
  { value: '36', label: 'Years of Experience' },
  { value: '80+', label: 'Projects Completed' },
  { value: '1790', label: 'Oldest Historic Project' },
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
