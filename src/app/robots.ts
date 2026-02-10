import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/estimate/complete'],
    },
    sitemap: 'https://ezpzspace.com/sitemap.xml',
  };
}
