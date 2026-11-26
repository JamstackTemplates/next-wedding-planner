import type { MetadataRoute } from 'next';
import { realWeddings } from '../content/real-weddings';
import { absoluteUrl } from '../lib/paths';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/packages/',
    '/real-weddings/',
    ...realWeddings.map(wedding => `/real-weddings/${wedding.id}/`),
    '/timeline/',
    '/contact/',
  ];

  return paths.flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
