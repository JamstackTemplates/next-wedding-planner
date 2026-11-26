import type { InclusionId } from './inclusions.ts';

export type PackageAvailability = 'open' | 'limited' | 'waitlist';

/** Wedding planning package offered by the studio. */
export interface Package {
  /** URL-safe unique anchor identifier (used in /packages/#<id>). */
  id: string;
  /** Display name of the package. */
  name: string;
  /** Line from the traditional wedding rhyme. */
  rhymeLine: string;
  /** Single-line promise shown on Home and Packages. */
  promise: string;
  /** Longer prose description for the Packages suite. */
  summary: string;
  /** Starting fee in whole USD. */
  priceFrom: number;
  /** Typical guest-count range supported by this package. */
  guests: { min: number; max: number };
  /** Typical months before the wedding when couples start. */
  leadMonths: { min: number; max: number };
  /** Number of planning meetings included. */
  meetings: number;
  /** Coordinator hours on the wedding day. */
  hoursOnTheDay: number;
  /** Inclusion IDs referencing content/inclusions.ts. */
  includes: readonly InclusionId[];
  /** One-line description of who the package suits best. */
  bestFor: string;
  /** Exactly one package carries the featured wax seal. */
  featured: boolean;
  /** Current enquiry availability stamp. */
  availability: PackageAvailability;
}

export const packages: readonly Package[] = [
  {
    id: 'something-old',
    name: 'Something Old',
    rhymeLine: 'Something old',
    promise: 'An elopement or micro-wedding, beautifully simple',
    summary:
      'A ceremony on a dune, a courtyard or a quiet garden, with a photographer, an officiant and a dinner table for the people who matter most.',
    priceFrom: 1650,
    guests: { min: 2, max: 30 },
    leadMonths: { min: 2, max: 6 },
    meetings: 2,
    hoursOnTheDay: 4,
    includes: ['officiant-photo', 'run-of-day', 'rain-plan', 'day-team'],
    bestFor: 'couples who want it small and unhurried.',
    featured: false,
    availability: 'open',
  },
  {
    id: 'something-borrowed',
    name: 'Something Borrowed',
    rhymeLine: 'Something borrowed',
    promise: "You've planned it; we take the final eight weeks",
    summary:
      'We learn your plans six to eight weeks out, check every vendor schedule and run the rehearsal and the day so nobody you love has to hold a clipboard.',
    priceFrom: 2600,
    guests: { min: 20, max: 250 },
    leadMonths: { min: 2, max: 4 },
    meetings: 3,
    hoursOnTheDay: 10,
    includes: ['vendor-confirm', 'run-of-day', 'rehearsal', 'rain-plan', 'day-team'],
    bestFor: 'couples who loved planning and want to enjoy the day.',
    featured: false,
    availability: 'limited',
  },
  {
    id: 'something-new',
    name: 'Something New',
    rhymeLine: 'Something new',
    promise: 'Partial planning from the halfway mark',
    summary:
      'We join at the halfway mark, fill the gaps in your vendor team, build the design and the run of day and see it through.',
    priceFrom: 6200,
    guests: { min: 40, max: 250 },
    leadMonths: { min: 6, max: 10 },
    meetings: 6,
    hoursOnTheDay: 12,
    includes: [
      'vendor-team',
      'vendor-confirm',
      'design',
      'rentals',
      'run-of-day',
      'rehearsal',
      'rain-plan',
      'day-team',
    ],
    bestFor: 'couples with a venue chosen and a long list left.',
    featured: false,
    availability: 'open',
  },
  {
    id: 'something-blue',
    name: 'Something Blue',
    rhymeLine: 'And something blue',
    promise: 'Full planning and design, from the first venue visit',
    summary:
      'From budget and venue shortlist to the last sparkler: vendor team, design, guest weekend, rentals, run of day and a full team on the day.',
    priceFrom: 12800,
    guests: { min: 50, max: 300 },
    leadMonths: { min: 12, max: 18 },
    meetings: 12,
    hoursOnTheDay: 14,
    includes: [
      'venue-search',
      'budget',
      'vendor-team',
      'vendor-confirm',
      'design',
      'rentals',
      'guest-weekend',
      'run-of-day',
      'rehearsal',
      'day-team',
      'rain-plan',
    ],
    bestFor: 'busy or long-distance couples who want one person to call.',
    featured: true,
    availability: 'limited',
  },
];

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export function availabilityLabel(status: PackageAvailability): string {
  switch (status) {
    case 'open':
      return 'Open for enquiry';
    case 'limited':
      return 'Limited dates';
    case 'waitlist':
      return 'Waitlist';
  }
}

export function packageById(id: string): Package | undefined {
  return packages.find(pkg => pkg.id === id);
}
