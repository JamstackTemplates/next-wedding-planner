import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stages } from '../content/timeline.ts';
import { weddingCountdown } from '../lib/countdown.ts';

const NY = 'America/New_York';

test('countdown maps 12 months, 11 months, 6 days and today to the right stages', () => {
  const now = new Date('2026-10-15T16:00:00Z'); // 12:00 EDT on 2026-10-15

  const twelve = weddingCountdown('2027-10-15', stages, NY, now);
  assert.equal(twelve.status, 'stage');
  if (twelve.status === 'stage') {
    assert.equal(twelve.monthsOut, 12);
    assert.equal(twelve.stageId, 'twelve-plus');
  }

  const eleven = weddingCountdown('2027-09-15', stages, NY, now);
  assert.equal(eleven.status, 'stage');
  if (eleven.status === 'stage') {
    assert.equal(eleven.monthsOut, 11);
    assert.equal(eleven.stageId, 'nine-to-eleven');
  }

  const sixDays = weddingCountdown('2026-10-21', stages, NY, now);
  assert.equal(sixDays.status, 'stage');
  if (sixDays.status === 'stage') {
    assert.equal(sixDays.monthsOut, 0);
    assert.equal(sixDays.stageId, 'week-of');
  }

  const today = weddingCountdown('2026-10-15', stages, NY, now);
  assert.equal(today.status, 'stage');
  if (today.status === 'stage') {
    assert.equal(today.monthsOut, 0);
    assert.equal(today.stageId, 'week-of');
  }
});

test('countdown handles past dates, >18 months, and invalid dates', () => {
  const now = new Date('2026-10-15T16:00:00Z');

  const past = weddingCountdown('2026-10-14', stages, NY, now);
  assert.equal(past.status, 'past');
  assert.equal(past.message, 'Congratulations, and happy anniversary in advance.');

  const far = weddingCountdown('2028-06-20', stages, NY, now);
  assert.equal(far.status, 'far');
  assert.equal(far.message, 'Plenty of time: start with the first stage.');

  for (const bad of ['', 'not-a-date', '2027-02-30', '2027-13-01']) {
    const invalid = weddingCountdown(bad, stages, NY, now);
    assert.equal(invalid.status, 'invalid', `expected invalid for "${bad}"`);
  }
});

test('countdown respects America/New_York calendar date across November DST fallback', () => {
  // 2026-11-01 03:30 UTC is still 2026-10-31 23:30 EDT in New York -> 2027-10-31 is exactly 12 months out
  const beforeMidnightNy = weddingCountdown(
    '2027-10-31',
    stages,
    NY,
    new Date('2026-11-01T03:30:00Z'),
  );
  assert.equal(beforeMidnightNy.status, 'stage');
  if (beforeMidnightNy.status === 'stage') {
    assert.equal(beforeMidnightNy.monthsOut, 12);
    assert.equal(beforeMidnightNy.stageId, 'twelve-plus');
  }

  // 2026-11-01 06:30 UTC is 2026-11-01 01:30 EST (post-DST) in New York -> 2027-10-31 is 11 months out
  const afterDstNy = weddingCountdown(
    '2027-10-31',
    stages,
    NY,
    new Date('2026-11-01T06:30:00Z'),
  );
  assert.equal(afterDstNy.status, 'stage');
  if (afterDstNy.status === 'stage') {
    assert.equal(afterDstNy.monthsOut, 11);
    assert.equal(afterDstNy.stageId, 'nine-to-eleven');
  }
});
