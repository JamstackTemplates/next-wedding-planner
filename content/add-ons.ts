/** Optional add-on ("enclosure") that can be paired with selected packages. */
export interface AddOn {
  /** URL-safe unique identifier. */
  id: string;
  /** Display name of the enclosure add-on. */
  name: string;
  /** Short description of what the add-on covers. */
  description: string;
  /** Starting fee in whole USD. */
  priceFrom: number;
  /** Package IDs this add-on can be paired with (must reference content/packages.ts). */
  packageIds: readonly string[];
}

export const addOns: readonly AddOn[] = [
  {
    id: 'welcome-party',
    name: 'Welcome party coordination',
    description:
      'Timeline, layout and on-site hosting for the Friday evening gathering so you can greet out-of-town guests relaxed.',
    priceFrom: 950,
    packageIds: ['something-borrowed', 'something-new', 'something-blue'],
  },
  {
    id: 'rehearsal-dinner',
    name: 'Rehearsal dinner planning',
    description:
      'Private dining room sourcing, menu coordination, seating cards and candlelit table styling.',
    priceFrom: 750,
    packageIds: ['something-borrowed', 'something-new', 'something-blue'],
  },
  {
    id: 'guest-bags',
    name: 'Welcome bags and guest itinerary',
    description:
      'Lowcountry treats, a printed weekend guide and hotel desk delivery ahead of guest check-in.',
    priceFrom: 600,
    packageIds: ['something-old', 'something-borrowed', 'something-new', 'something-blue'],
  },
  {
    id: 'stationery-suite',
    name: 'Custom stationery suite',
    description:
      'Art direction and print management for cotton-paper invitations, reply cards, menus and escort displays.',
    priceFrom: 1400,
    packageIds: ['something-old', 'something-new', 'something-blue'],
  },
  {
    id: 'farewell-brunch',
    name: 'Farewell brunch coordination',
    description:
      'A gentle Sunday morning send-off with coffee, biscuits and a clear wrap-up schedule for the family.',
    priceFrom: 650,
    packageIds: ['something-new', 'something-blue'],
  },
];
