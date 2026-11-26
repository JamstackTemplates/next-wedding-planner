import type { AddOn } from '../content/add-ons.ts';
import type { Business } from '../content/business.ts';
import type { DateBook } from '../content/date-book.ts';
import type { Inclusion } from '../content/inclusions.ts';
import type { Package } from '../content/packages.ts';
import type { RealWedding } from '../content/real-weddings.ts';
import type { Setting } from '../content/settings.ts';
import type { SampleRunOfDayItem, TimelineStage } from '../content/timeline.ts';
import { validateHours } from './hours.ts';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX = /^#[0-9A-Fa-f]{6}$/;
const YEAR_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;
const ISO_DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const CLOCK = /^([01]\d|2[0-3]):[0-5]\d$/;
const MAX_RUN_OF_DAY_MINUTES = 23 * 60 + 30; // 23:30

function clockMinutes(hhmm: string): number {
  return Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
}

function assertSlugUnique(
  items: readonly { id: string }[],
  collection: string,
): Set<string> {
  const seen = new Set<string>();
  for (const item of items) {
    if (!item.id || !SLUG.test(item.id)) {
      throw new Error(`${collection}: "${item.id}" is not a valid URL-safe ID`);
    }
    if (seen.has(item.id)) {
      throw new Error(`${collection}: duplicate ID "${item.id}"`);
    }
    seen.add(item.id);
  }
  return seen;
}

function assertPositiveInt(value: number, label: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${label}: expected a positive integer, got ${value}`);
  }
}

export function validateRunOfDay(
  items: readonly { time: string; label: string }[],
  context: string,
): void {
  let prev = -1;
  for (const [index, item] of items.entries()) {
    if (!item.label.trim()) {
      throw new Error(`${context}: entry #${index + 1} requires a label`);
    }
    if (!CLOCK.test(item.time)) {
      throw new Error(`${context}: "${item.label}" has invalid time "${item.time}" (expected HH:MM)`);
    }
    const mins = clockMinutes(item.time);
    if (mins > MAX_RUN_OF_DAY_MINUTES) {
      throw new Error(`${context}: "${item.label}" at ${item.time} is after 23:30`);
    }
    if (mins <= prev) {
      throw new Error(`${context}: "${item.label}" at ${item.time} must be strictly ascending`);
    }
    prev = mins;
  }
}

export function validateBusiness(b: Business): void {
  for (const key of [
    'name',
    'tagline',
    'introduction',
    'email',
    'studioDescription',
    'mapQuery',
    'hoursNote',
  ] as const) {
    if (!b[key].trim()) throw new Error(`business.${key}: required`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) {
    throw new Error(`business.email: valid public email required, got "${b.email}"`);
  }
  if (!b.serviceArea.length) {
    throw new Error('business.serviceArea: must list at least one location');
  }
  validateHours(b.hours);
  if (!b.enquiries.title.trim()) throw new Error('business.enquiries.title: required');
  if (!b.enquiries.introduction.trim()) throw new Error('business.enquiries.introduction: required');
  if (!b.enquiries.note.trim()) throw new Error('business.enquiries.note: required');
  if (!b.enquiries.usefulToInclude.length) {
    throw new Error('business.enquiries.usefulToInclude: include message guidance');
  }
  for (const tip of b.enquiries.usefulToInclude) {
    if (!tip.trim()) throw new Error('business.enquiries.usefulToInclude: empty tip');
  }
}

export function validateInclusions(items: readonly Inclusion[]): Set<string> {
  const ids = assertSlugUnique(items, 'inclusions');
  for (const item of items) {
    if (!item.label.trim()) throw new Error(`inclusions.${item.id}: label is required`);
  }
  return ids;
}

export function validatePackages(
  items: readonly Package[],
  inclusionIds: ReadonlySet<string>,
): Map<string, Package> {
  assertSlugUnique(items, 'packages');
  const byId = new Map<string, Package>();
  let featuredCount = 0;

  for (const pkg of items) {
    for (const field of ['name', 'rhymeLine', 'promise', 'summary', 'bestFor'] as const) {
      if (!pkg[field].trim()) throw new Error(`packages.${pkg.id}.${field}: required`);
    }
    assertPositiveInt(pkg.priceFrom, `packages.${pkg.id}.priceFrom`);
    assertPositiveInt(pkg.guests.min, `packages.${pkg.id}.guests.min`);
    assertPositiveInt(pkg.guests.max, `packages.${pkg.id}.guests.max`);
    if (pkg.guests.min > pkg.guests.max) {
      throw new Error(`packages.${pkg.id}: guests.min (${pkg.guests.min}) exceeds guests.max (${pkg.guests.max})`);
    }
    assertPositiveInt(pkg.leadMonths.min, `packages.${pkg.id}.leadMonths.min`);
    assertPositiveInt(pkg.leadMonths.max, `packages.${pkg.id}.leadMonths.max`);
    if (pkg.leadMonths.min > pkg.leadMonths.max) {
      throw new Error(`packages.${pkg.id}: leadMonths.min exceeds leadMonths.max`);
    }
    assertPositiveInt(pkg.meetings, `packages.${pkg.id}.meetings`);
    assertPositiveInt(pkg.hoursOnTheDay, `packages.${pkg.id}.hoursOnTheDay`);
    if (!['open', 'limited', 'waitlist'].includes(pkg.availability)) {
      throw new Error(`packages.${pkg.id}: invalid availability "${pkg.availability}"`);
    }
    for (const incId of pkg.includes) {
      if (!inclusionIds.has(incId)) {
        throw new Error(`packages.${pkg.id}: unknown inclusion reference "${incId}"`);
      }
    }
    if (pkg.featured) featuredCount++;
    byId.set(pkg.id, pkg);
  }

  if (featuredCount !== 1) {
    throw new Error(`packages: expected exactly 1 featured package, found ${featuredCount}`);
  }
  return byId;
}

export function validateAddOns(
  items: readonly AddOn[],
  packageIds: ReadonlySet<string>,
): void {
  assertSlugUnique(items, 'addOns');
  for (const item of items) {
    if (!item.name.trim()) throw new Error(`addOns.${item.id}: name is required`);
    if (!item.description.trim()) throw new Error(`addOns.${item.id}: description is required`);
    assertPositiveInt(item.priceFrom, `addOns.${item.id}.priceFrom`);
    if (!item.packageIds.length) {
      throw new Error(`addOns.${item.id}: must reference at least one package`);
    }
    for (const pkgId of item.packageIds) {
      if (!packageIds.has(pkgId)) {
        throw new Error(`addOns.${item.id}: unknown package reference "${pkgId}"`);
      }
    }
  }
}

export function validateSettings(items: readonly Setting[]): Set<string> {
  const ids = assertSlugUnique(items, 'settings');
  for (const item of items) {
    if (!item.label.trim()) throw new Error(`settings.${item.id}: label is required`);
  }
  return ids;
}

export function validateDateBook(book: DateBook): void {
  assertPositiveInt(book.year, 'dateBook.year');
  if (!ISO_DATE.test(book.lastReviewed)) {
    throw new Error(`dateBook.lastReviewed: expected YYYY-MM-DD, got "${book.lastReviewed}"`);
  }
  const seen = new Set<number>();
  let prev = 0;
  for (const entry of book.months) {
    if (!Number.isInteger(entry.month) || entry.month < 1 || entry.month > 12) {
      throw new Error(`dateBook: month ${entry.month} is outside 1–12`);
    }
    if (seen.has(entry.month)) {
      throw new Error(`dateBook: duplicate month ${entry.month}`);
    }
    if (entry.month < prev) {
      throw new Error(`dateBook: month ${entry.month} is out of ascending order`);
    }
    seen.add(entry.month);
    prev = entry.month;

    if (!Number.isInteger(entry.saturdaysLeft) || entry.saturdaysLeft < 0 || entry.saturdaysLeft > 5) {
      throw new Error(`dateBook month ${entry.month}: saturdaysLeft (${entry.saturdaysLeft}) must be an integer 0–5`);
    }
    if (entry.status === 'full' && entry.saturdaysLeft !== 0) {
      throw new Error(`dateBook month ${entry.month}: status "full" requires saturdaysLeft to be 0`);
    }
    if (entry.status !== 'full' && entry.saturdaysLeft < 1) {
      throw new Error(`dateBook month ${entry.month}: status "${entry.status}" requires saturdaysLeft >= 1`);
    }
  }
}

export function validateRealWeddings(
  weddings: readonly RealWedding[],
  packagesById: ReadonlyMap<string, Package>,
  settingIds: ReadonlySet<string>,
): void {
  assertSlugUnique(weddings, 'realWeddings');
  const usedSettings = new Set<string>();
  let featuredCount = 0;

  for (const w of weddings) {
    for (const field of ['couple', 'place', 'dek', 'quote'] as const) {
      if (!w[field].trim()) throw new Error(`realWeddings.${w.id}.${field}: required`);
    }
    if (!YEAR_MONTH.test(w.month)) {
      throw new Error(`realWeddings.${w.id}: malformed month "${w.month}" (expected YYYY-MM)`);
    }
    if (!settingIds.has(w.settingId)) {
      throw new Error(`realWeddings.${w.id}: unknown settingId "${w.settingId}"`);
    }
    usedSettings.add(w.settingId);

    const pkg = packagesById.get(w.packageId);
    if (!pkg) {
      throw new Error(`realWeddings.${w.id}: unknown packageId "${w.packageId}"`);
    }
    assertPositiveInt(w.guests, `realWeddings.${w.id}.guests`);
    if (w.guests < pkg.guests.min || w.guests > pkg.guests.max) {
      throw new Error(
        `realWeddings.${w.id}: guests (${w.guests}) outside ${pkg.id} range (${pkg.guests.min}–${pkg.guests.max})`,
      );
    }

    if (w.story.length < 2 || w.story.length > 3) {
      throw new Error(`realWeddings.${w.id}: story must have 2–3 paragraphs`);
    }
    if (w.palette.length !== 3) {
      throw new Error(`realWeddings.${w.id}: palette must have exactly 3 swatches`);
    }
    for (const swatch of w.palette) {
      if (!swatch.name.trim() || !HEX.test(swatch.hex)) {
        throw new Error(`realWeddings.${w.id}: invalid palette swatch "${swatch.name}" (${swatch.hex})`);
      }
    }
    if (w.runOfDay.length < 3 || w.runOfDay.length > 5) {
      throw new Error(`realWeddings.${w.id}: runOfDay must have 3–5 entries`);
    }
    validateRunOfDay(w.runOfDay, `realWeddings.${w.id}.runOfDay`);
    if (w.featured) featuredCount++;
  }

  if (featuredCount !== 3) {
    throw new Error(`realWeddings: expected exactly 3 featured weddings, found ${featuredCount}`);
  }
  for (const id of settingIds) {
    if (!usedSettings.has(id)) {
      throw new Error(`settings.${id}: setting is unused by any real wedding`);
    }
  }
}

export function validateTimeline(
  stageList: readonly TimelineStage[],
  sampleDay: readonly SampleRunOfDayItem[],
): void {
  assertSlugUnique(stageList, 'timeline.stages');
  if (!stageList.length) throw new Error('timeline.stages: must not be empty');

  for (let i = 0; i < stageList.length; i++) {
    const stage = stageList[i];
    if (!stage.title.trim()) throw new Error(`timeline.stages.${stage.id}: title required`);
    if (stage.monthsBefore.from < stage.monthsBefore.to || stage.monthsBefore.to < 0) {
      throw new Error(
        `timeline.stages.${stage.id}: invalid monthsBefore (${stage.monthsBefore.from}–${stage.monthsBefore.to})`,
      );
    }
    if (i > 0) {
      const prev = stageList[i - 1];
      if (prev.monthsBefore.to !== stage.monthsBefore.from + 1) {
        throw new Error(
          `timeline.stages.${stage.id}: gap or overlap between "${prev.id}" (to ${prev.monthsBefore.to}) and "${stage.id}" (from ${stage.monthsBefore.from})`,
        );
      }
    }
  }
  const last = stageList[stageList.length - 1];
  if (last.monthsBefore.to !== 0) {
    throw new Error(`timeline.stages.${last.id}: final stage must end at 0 months`);
  }

  validateRunOfDay(sampleDay, 'timeline.runOfDay');
}
