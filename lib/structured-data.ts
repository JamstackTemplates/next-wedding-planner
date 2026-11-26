import { business } from '../content/business.ts';
import { formatUsd, packages } from '../content/packages.ts';
import { absoluteUrl } from './paths.ts';

/** ProfessionalService JSON-LD derived directly from typed content. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const prices = packages.map(pkg => pkg.priceFrom);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = `${formatUsd(minPrice)}–${formatUsd(maxPrice)}`;

  const openingHoursSpecification = business.hours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    areaServed: business.serviceArea.map(place => ({
      '@type': 'AdministrativeArea',
      name: `${place}, SC`,
    })),
    openingHoursSpecification,
    priceRange,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Wedding planning packages',
      itemListElement: packages.map(pkg => {
        const pkgUrl = absoluteUrl(`/packages/#${pkg.id}`);
        return {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: String(pkg.priceFrom),
          ...(pkgUrl ? { url: pkgUrl } : {}),
          itemOffered: {
            '@type': 'Service',
            name: pkg.name,
            description: pkg.promise,
          },
        };
      }),
    },
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
