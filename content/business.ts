import type { OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by the page and fallback metadata. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public fictional-use phone number; blank hides it. */
  phone: string;
  /** Studio location description without a street number. */
  studioDescription: string;
  /** Note about how consultations work. */
  consultationsNote: string;
  /** Public landmark query for the keyless map embed and directions links. */
  mapQuery: string;
  /** Lowcountry towns and islands served at no travel charge. */
  serviceArea: readonly string[];
  /** Weekly studio hours in the configured IANA time zone (same-day only). */
  hours: readonly OpeningHours[];
  /** Seasonal note displayed alongside studio hours. */
  hoursNote: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: readonly string[];
    /** Clear note displayed below the form. */
    note: string;
  };
}

export const business: Business = {
  name: 'Something Blue Weddings',
  tagline: 'Married in the Lowcountry, planned down to the minute.',
  introduction:
    "We're a small Charleston studio that plans fewer weddings so each one gets the whole of our attention, from the first venue walk-through to the last sparkler.",
  email: 'hello@example.com',
  phone: '(843) 555-0142',
  studioDescription:
    'Planning studio on East Bay Street, a few doors from Rainbow Row, Charleston SC',
  consultationsNote: 'Consultations are by appointment.',
  mapQuery: 'Rainbow Row, Charleston, SC',
  serviceArea: [
    'Charleston',
    'Mount Pleasant',
    'Johns Island',
    'Wadmalaw Island',
    'Kiawah Island',
    'Folly Beach',
    "Sullivan's Island",
    'Isle of Palms',
    'Beaufort',
  ],
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '10:00', closes: '18:00' },
    { day: 'Wednesday', opens: '10:00', closes: '18:00' },
    { day: 'Thursday', opens: '10:00', closes: '18:00' },
    { day: 'Friday', opens: '10:00', closes: '18:00' },
    { day: 'Saturday', opens: '10:00', closes: '14:00' },
    { day: 'Sunday' },
  ],
  hoursNote:
    "Saturdays in season we're usually at a wedding; messages are answered on Tuesday.",
  enquiries: {
    title: 'Tell us about your day',
    introduction:
      "Tell us a little about your plans and we'll reply within two working days, usually with a time to talk.",
    usefulToInclude: [
      'Your names, and the best way to reach you if not email',
      "Your date, or the season and year you're considering",
      'Roughly how many guests',
      "Your venue, or the kind of setting you're dreaming of",
      "The package you're curious about, if any",
      "A rough budget range, if you're comfortable sharing",
    ],
    note: "An enquiry doesn't hold a date or commit you to anything. Dates are held only once a planning agreement is signed. Please don't send payment details.",
  },
};
