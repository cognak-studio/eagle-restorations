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

// Map a WordPress media URL to a local public path.
// e.g. http://eagle-restorations.com/wp-content/uploads/2021/01/x.png
//   -> /wp-content/uploads/2021/01/x.png
export function localImage(url) {
  if (!url) return '';
  return url.replace(/^https?:\/\/[^/]+/i, '');
}
