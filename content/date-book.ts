export type DateBookStatus = 'open' | 'few-left' | 'full';

/** Month entry in the studio's enquiry date book. */
export interface DateBookMonth {
  /** Calendar month number (1 = January, 12 = December), unique and ascending. */
  month: number;
  /** Saturday enquiry status for the month. */
  status: DateBookStatus;
  /** Remaining open Saturdays (0 when full, 1–5 otherwise). */
  saturdaysLeft: number;
  /** Optional seasonal note shown on the Packages dance card. */
  note?: string;
}

export interface DateBook {
  /** Calendar year covered by this date book. */
  year: number;
  /** ISO date (YYYY-MM-DD) when the studio last reviewed availability. */
  lastReviewed: string;
  /** Ordered month entries. */
  months: readonly DateBookMonth[];
}

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const dateBook: DateBook = {
  year: 2027,
  lastReviewed: '2026-11-18',
  months: [
    { month: 3, status: 'open', saturdaysLeft: 4, note: 'Azaleas, cool evenings' },
    { month: 4, status: 'few-left', saturdaysLeft: 1, note: 'Peak garden season' },
    { month: 5, status: 'few-left', saturdaysLeft: 2 },
    { month: 6, status: 'open', saturdaysLeft: 3 },
    { month: 7, status: 'open', saturdaysLeft: 4, note: 'Heat plan required outdoors' },
    { month: 8, status: 'open', saturdaysLeft: 4, note: 'Heat plan required outdoors' },
    { month: 9, status: 'open', saturdaysLeft: 3, note: 'Hurricane season rain plan included' },
    { month: 10, status: 'few-left', saturdaysLeft: 1, note: 'Our busiest month' },
    { month: 11, status: 'open', saturdaysLeft: 2, note: 'Oyster-roast weather' },
    { month: 12, status: 'full', saturdaysLeft: 0, note: 'Weekday dates still open' },
  ],
};

export function monthName(month: number): string {
  return MONTH_NAMES[month - 1] ?? '';
}

export function dateBookStatusLabel(entry: DateBookMonth): string {
  if (entry.status === 'full') return 'Full for Saturdays';
  if (entry.status === 'few-left') {
    return entry.saturdaysLeft === 1
      ? '1 Saturday open for enquiry'
      : `${entry.saturdaysLeft} Saturdays open for enquiry`;
  }
  return `${entry.saturdaysLeft} Saturdays open for enquiry`;
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/** Computes the one-line summary for the Home hero directly from content/date-book.ts. */
export function dateBookSummaryLine(book: DateBook = dateBook): string {
  const openOrFew = book.months.filter(m => m.status !== 'full');
  if (openOrFew.length === 0) {
    return `${book.year} Saturday dates are full; weekday dates are still open for enquiry`;
  }

  const fullMonths = book.months.filter(m => m.status === 'full');
  const peakFull = fullMonths.filter(m => m.month !== 12);
  if (peakFull.length > 0) {
    const names = fullMonths.map(m => monthName(m.month));
    return `${book.year} dates are open for enquiry: ${joinList(names)} ${names.length === 1 ? 'is' : 'are'} full`;
  }

  const almostFull = book.months.filter(m => m.status === 'few-left' && m.saturdaysLeft === 1);
  if (almostFull.length > 0) {
    const october = almostFull.find(m => m.month === 10);
    const focus = october ?? almostFull[almostFull.length - 1];
    return `${book.year} dates are open for enquiry: ${monthName(focus.month)} is almost full`;
  }

  const fewLeft = book.months.filter(m => m.status === 'few-left');
  if (fewLeft.length > 0) {
    const names = fewLeft.map(m => monthName(m.month));
    return `${book.year} dates are open for enquiry: ${joinList(names)} ${names.length === 1 ? 'has' : 'have'} limited Saturdays`;
  }

  if (fullMonths.length > 0) {
    const names = fullMonths.map(m => monthName(m.month));
    return `${book.year} dates are open for enquiry: ${joinList(names)} ${names.length === 1 ? 'is' : 'are'} full`;
  }

  return `${book.year} dates are open for enquiry`;
}

/** Formats YYYY-MM-DD as a calm, timezone-neutral month-day-year string (e.g. "November 18, 2026"). */
export function formatIsoDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return `${monthName(month)} ${day}, ${year}`;
}
