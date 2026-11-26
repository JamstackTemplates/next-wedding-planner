import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
const studioAt = (date: string, zone = 'America/New_York') =>
  openingLabel(business.hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('Something Blue studio hours: Tue 10:00/18:00, Sat 14:00, Mon/Sun closed, and DST changes', () => {
  // Tuesday 2026-11-17 (EST = UTC-5): opens 10:00 (15:00Z), closes 18:00 (23:00Z)
  assert.equal(studioAt('2026-11-17T14:59:00Z'), 'Closed · opens today at 10:00');
  assert.equal(studioAt('2026-11-17T15:00:00Z'), 'Open now · until 18:00');
  assert.equal(studioAt('2026-11-17T23:00:00Z'), 'Closed · opens Wednesday at 10:00');

  // Saturday 2026-11-21 (EST = UTC-5): opens 10:00 (15:00Z), closes 14:00 (19:00Z)
  assert.equal(studioAt('2026-11-21T18:59:00Z'), 'Open now · until 14:00');
  assert.equal(studioAt('2026-11-21T19:00:00Z'), 'Closed · opens Tuesday at 10:00');

  // Sunday 2026-11-22 & Monday 2026-11-23 closed -> opens Tuesday at 10:00
  assert.equal(studioAt('2026-11-22T17:00:00Z'), 'Closed · opens Tuesday at 10:00');
  assert.equal(studioAt('2026-11-23T17:00:00Z'), 'Closed · opens Tuesday at 10:00');

  // Around March DST (2026-03-08 -> EDT UTC-4) on Tuesday 2026-03-10
  assert.equal(studioAt('2026-03-10T13:59:00Z'), 'Closed · opens today at 10:00');
  assert.equal(studioAt('2026-03-10T14:00:00Z'), 'Open now · until 18:00');

  // Around November DST (2026-11-01 -> EST UTC-5) on Tuesday 2026-11-03
  assert.equal(studioAt('2026-11-03T14:59:00Z'), 'Closed · opens today at 10:00');
  assert.equal(studioAt('2026-11-03T15:00:00Z'), 'Open now · until 18:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
