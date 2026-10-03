import type { MetadataRoute } from 'next';
import { links } from '@/data/profile';

export const dynamic = 'force-static';

// Single-page site: every window is a view of the same route.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: links.site, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
