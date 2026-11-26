import type { TimelineStage } from '../content/timeline.ts';

export type CountdownResult =
  | { status: 'invalid'; message: string }
  | { status: 'past'; message: string }
  | { status: 'far'; monthsOut: number; stageId: string; message: string }
  | { status: 'stage'; monthsOut: number; stageId: string; stageTitle: string; message: string };

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseCalendarDate(input: string): { year: number; month: number; day: number } | null {
  const match = ISO_DATE.exec(input.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const check = new Date(Date.UTC(year, month - 1, day));
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return null;
  }
  return { year, month, day };
}

function todayInZone(timeZone: string, now: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value ?? 0);
  return { year: get('year'), month: get('month'), day: get('day') };
}

function formatStageLabel(title: string): string {
  return title.replace(/^The\s+/i, '').toLowerCase();
}

/**
 * Computes whole months remaining until a wedding date in the studio's IANA time zone
 * (default America/New_York) and matches it to a planning stage.
 */
export function weddingCountdown(
  weddingDateIso: string,
  stageList: readonly TimelineStage[],
  timeZone = 'America/New_York',
  now = new Date(),
): CountdownResult {
  const target = parseCalendarDate(weddingDateIso);
  if (!target) {
    return { status: 'invalid', message: 'Please enter a valid calendar date.' };
  }

  let today: { year: number; month: number; day: number };
  try {
    today = todayInZone(timeZone || 'America/New_York', now);
  } catch {
    today = todayInZone('America/New_York', now);
  }

  const targetKey = target.year * 10000 + target.month * 100 + target.day;
  const todayKey = today.year * 10000 + today.month * 100 + today.day;

  if (targetKey < todayKey) {
    return {
      status: 'past',
      message: 'Congratulations, and happy anniversary in advance.',
    };
  }

  let monthsOut = (target.year - today.year) * 12 + (target.month - today.month);
  if (target.day < today.day) {
    monthsOut -= 1;
  }
  if (monthsOut < 0) monthsOut = 0;

  const maxStageMonths = stageList[0]?.monthsBefore.from ?? 18;
  if (monthsOut > maxStageMonths) {
    return {
      status: 'far',
      monthsOut,
      stageId: stageList[0]?.id ?? 'twelve-plus',
      message: 'Plenty of time: start with the first stage.',
    };
  }

  const match =
    stageList.find(s => monthsOut <= s.monthsBefore.from && monthsOut >= s.monthsBefore.to) ??
    stageList[stageList.length - 1];

  const stagePhrase = formatStageLabel(match.title);
  const lead =
    monthsOut === 0
      ? "You're less than a month out"
      : `You're about ${monthsOut} ${monthsOut === 1 ? 'month' : 'months'} out`;

  return {
    status: 'stage',
    monthsOut,
    stageId: match.id,
    stageTitle: match.title,
    message: `${lead}: the ${stagePhrase} stretch.`,
  };
}
