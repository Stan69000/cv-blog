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
  const latestPostDate = publishedPosts
    .map((post) => post.data?.updatedDate ?? post.data?.pubDate)
    .filter((date): date is Date => Boolean(date))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const urls = [
    { loc: toAbsoluteUrl('/'), lastmod: formatDate(now), changefreq: 'weekly', priority: '1.0' },
    { loc: toAbsoluteUrl('/parcours/'), lastmod: formatDate(now), changefreq: 'monthly', priority: '0.8' },
    { loc: toAbsoluteUrl('/projets/'), lastmod: formatDate(now), changefreq: 'weekly', priority: '0.8' },
    { loc: toAbsoluteUrl('/engagement-associatif/'), lastmod: formatDate(now), changefreq: 'monthly', priority: '0.7' },
    {
      loc: toAbsoluteUrl('/blog/'),
      lastmod: formatDate(latestPostDate ?? now),
      changefreq: 'weekly',
      priority: '0.8'
    },
    { loc: toAbsoluteUrl('/contact/'), lastmod: formatDate(now), changefreq: 'yearly', priority: '0.5' },
    ...publishedPosts.map((post) => ({
      loc: toAbsoluteUrl(`/blog/${post.slug}/`),
      lastmod: formatDate(post.data?.updatedDate ?? post.data?.pubDate ?? now),
      changefreq: 'monthly',
      priority: '0.7'
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
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
