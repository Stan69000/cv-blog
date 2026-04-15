import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import siteConfig from '../data/site.json';

const toAbsoluteUrl = (path: string) => {
  const base = siteConfig.url || 'https://example.com';
  return new URL(path, base.endsWith('/') ? base : `${base}/`).toString();
};

const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const GET: APIRoute = async () => {
  const now = new Date();
  const blogEntries = await getCollection('blog');
  const publishedPosts = blogEntries.filter((entry) => entry.data?.draft !== true);

  const urls = [
    { loc: toAbsoluteUrl('/'), lastmod: formatDate(now) },
    { loc: toAbsoluteUrl('/parcours/'), lastmod: formatDate(now) },
    { loc: toAbsoluteUrl('/projets/'), lastmod: formatDate(now) },
    { loc: toAbsoluteUrl('/engagement-associatif/'), lastmod: formatDate(now) },
    { loc: toAbsoluteUrl('/blog/'), lastmod: formatDate(now) },
    ...publishedPosts.map((post) => ({
      loc: toAbsoluteUrl(`/blog/${post.slug}/`),
      lastmod: formatDate(post.data?.pubDate ? new Date(post.data.pubDate) : now),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
