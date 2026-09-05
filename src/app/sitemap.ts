import type { MetadataRoute } from 'next';
import { navigation, site } from '@/data/site';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', ...navigation.map(([, url]) => url), '/cv', '/contact'];
  return [
    ...staticRoutes.map((route) => ({ url: `${site.url}${route}`, changeFrequency: 'monthly' as const, priority: route === '/' ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, changeFrequency: 'yearly' as const, priority: 0.5 })),
  ];
}
