/** Inclusion rows shared by the package cards and the side-by-side comparison table. */
export interface Inclusion {
  /** Stable, URL-safe unique identifier referenced by packages. */
  id: string;
  /** Human-readable description of what is included. */
  label: string;
}

export const inclusions = [
  { id: 'venue-search', label: 'Venue search and walk-throughs' },
  { id: 'budget', label: 'Budget plan and tracking' },
  { id: 'vendor-team', label: 'Vendor recommendations and introductions' },
  { id: 'vendor-confirm', label: 'Vendor confirmations and contracts review' },
  { id: 'design', label: 'Design concept, palette and mood board' },
  { id: 'rentals', label: 'Rentals and floor plan' },
  { id: 'guest-weekend', label: 'Guest weekend itinerary and hotel blocks' },
  { id: 'run-of-day', label: 'Run of day and vendor timeline' },
  { id: 'rehearsal', label: 'Rehearsal direction' },
  { id: 'day-team', label: 'Lead planner and assistant on the day' },
  { id: 'officiant-photo', label: 'Officiant and photographer arranged' },
  { id: 'rain-plan', label: 'Rain plan' },
] as const satisfies readonly Inclusion[];

export type InclusionId = (typeof inclusions)[number]['id'];
