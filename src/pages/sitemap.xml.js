import portfolio from '../data/portfolio.json';

const SITE = 'https://eagle-restorations.com';

export async function GET() {
  const staticPages = [
    '/',
    '/projects/',
    '/about-and-services/',
    '/contact/',
    '/press-awards/',
    '/altadena-fire/',
  ];
  const projectPages = portfolio.map((p) => `/projects/${p.slug}/`);
  const urls = [...staticPages, ...projectPages];
  const today = new Date().toISOString().split('T')[0];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod>` +
          `<changefreq>monthly</changefreq><priority>${u === '/' ? '1.0' : '0.7'}</priority></url>`
      )
      .join('\n') +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
