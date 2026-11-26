export type StageIconKey =
  | 'calendar'
  | 'ring'
  | 'envelope'
  | 'umbrella'
  | 'clock'
  | 'champagne';

/** One stage of the eighteen-month planning ribbon. */
export interface TimelineStage {
  /** URL-safe unique identifier. */
  id: string;
  /** Display heading for the stage. */
  title: string;
  /** Inclusive month window before the wedding (from >= to; descending without gaps). */
  monthsBefore: { from: number; to: number };
  /** Decisions the couple leads during this window. */
  weDecide: readonly string[];
  /** Tasks Something Blue Weddings handles during this window. */
  weHandle: readonly string[];
  /** Line icon rendered beside the stage note. */
  icon: StageIconKey;
}

export interface SampleRunOfDayItem {
  /** Local 24-hour time HH:MM, ascending, none after 23:30. */
  time: string;
  /** Short milestone title. */
  label: string;
  /** Optional coordinating detail. */
  note?: string;
  /** Whether a tied silk bow marks this major milestone. */
  milestone?: boolean;
}

export const stages: readonly TimelineStage[] = [
  {
    id: 'twelve-plus',
    title: 'Twelve months and beyond',
    monthsBefore: { from: 18, to: 12 },
    weDecide: [
      'Budget and guest-count estimate',
      'Venue shortlist',
      'Engagement announcements',
    ],
    weHandle: [
      'Venue walk-throughs',
      'Budget plan',
      'First vendor introductions and date checks',
    ],
    icon: 'calendar',
  },
  {
    id: 'nine-to-eleven',
    title: 'Nine to eleven months',
    monthsBefore: { from: 11, to: 9 },
    weDecide: [
      'Photographer',
      'Band or DJ',
      'Florist',
      'Hotel blocks',
    ],
    weHandle: [
      'Vendor introductions',
      'Design concept',
    ],
    icon: 'ring',
  },
  {
    id: 'six-to-eight',
    title: 'Six to eight months',
    monthsBefore: { from: 8, to: 6 },
    weDecide: [
      'Attire',
      'Invitation design',
      'Rehearsal dinner venue',
    ],
    weHandle: [
      'Rentals',
      'Floor plan draft',
      'Guest weekend itinerary',
    ],
    icon: 'envelope',
  },
  {
    id: 'three-to-five',
    title: 'Three to five months',
    monthsBefore: { from: 5, to: 3 },
    weDecide: [
      'Menu tasting',
      'Cake',
      'Hair and makeup trial',
      'Officiant',
    ],
    weHandle: [
      'Transport',
      'Rain plan',
      'Vendor contract review',
    ],
    icon: 'umbrella',
  },
  {
    id: 'last-two',
    title: 'The last two months',
    monthsBefore: { from: 2, to: 1 },
    weDecide: [
      'Invitations mailed eight weeks out',
      'Final guest count',
      'Seating chart',
      'Marriage licence (South Carolina has a 24-hour waiting period)',
    ],
    weHandle: [
      'Run of day',
      'Vendor timeline',
      'Final walk-through',
    ],
    icon: 'clock',
  },
  {
    id: 'week-of',
    title: 'The week of',
    monthsBefore: { from: 0, to: 0 },
    weDecide: [
      'Pick up attire',
      'Welcome bags',
    ],
    weHandle: [
      'Rehearsal',
      'Deliveries',
      'Vendor arrival schedule checks',
    ],
    icon: 'champagne',
  },
];

export const runOfDay: readonly SampleRunOfDayItem[] = [
  { time: '10:00', label: 'Hair and makeup begin', note: 'Suite coffee and steaming' },
  { time: '13:30', label: 'First look under the oaks' },
  { time: '14:15', label: 'Wedding party portraits' },
  { time: '15:15', label: 'Family portraits' },
  { time: '16:30', label: 'Ceremony', note: 'Prelude begins at 16:00', milestone: true },
  { time: '17:00', label: 'Cocktail hour and lawn games' },
  { time: '18:15', label: 'Grand entrance' },
  { time: '18:30', label: 'Dinner', note: 'Candlelight and Lowcountry courses', milestone: true },
  { time: '19:45', label: 'First dance and toasts' },
  { time: '20:00', label: 'Dancing' },
  { time: '22:00', label: 'Sparkler send-off', note: 'Vintage car waiting at the drive', milestone: true },
];

export function formatTime12h(hhmm: string): string {
  const [hRaw, m] = hhmm.split(':');
  const h = Number(hRaw);
  const period = h >= 12 ? 'pm' : 'am';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m} ${period}`;
}
