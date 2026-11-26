import {
  dateBook,
  dateBookStatusLabel,
  formatIsoDate,
  monthName,
  type DateBook,
} from '../content/date-book';
import { SilkBow, WaxSealMini } from './art/motifs';
import { SiteLink } from './site-link';

/**
 * The 2027 Date Book presented as an open folded dance card with a tasselled silk cord.
 */
export function DanceCard({
  book = dateBook,
  showNotes = false,
  showCta = true,
  heading = `The ${book.year} date book`,
}: {
  book?: DateBook;
  showNotes?: boolean;
  showCta?: boolean;
  heading?: string;
}) {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Tasselled silk cord hanging from the upper-left corner */}
      <svg
        viewBox="0 0 64 180"
        width="56"
        height="160"
        aria-hidden="true"
        className="print-hide pointer-events-none absolute -left-5 -top-4 hidden sm:block"
      >
        <circle cx="28" cy="14" r="5" fill="var(--paper)" stroke="var(--foil)" strokeWidth="1.5" />
        <path
          d="M28 19 C14 54, 24 94, 18 134"
          fill="none"
          stroke="var(--ribbon)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Tassel knot & fringe */}
        <circle cx="18" cy="136" r="4.5" fill="var(--foil)" />
        <path
          d="M14 140 L10 172 M17 140 L15 174 M20 140 L21 174 M23 140 L27 172"
          stroke="var(--ribbon)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <div className="paper-sheet deckled-sheet px-6 py-8 text-ink sm:px-12 sm:py-11">
        <div className="border border-foil/55 p-5 sm:p-8">
          <div className="text-center">
            <p className="small-caps text-xs text-primary">Dance card · Saturday enquiries</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{heading}</h2>
            <p className="mt-2 text-sm italic text-muted">
              Updated {formatIsoDate(book.lastReviewed)} · Weekday dates are often open even when
              Saturdays are full.
            </p>
          </div>

          <hr className="foil-rule my-6" />

          <ol className="space-y-3.5">
            {book.months.map(entry => {
              const isFull = entry.status === 'full';
              const isFew = entry.status === 'few-left';
              return (
                <li key={entry.month} className="text-base">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span
                      className={`font-display text-lg ${
                        isFull ? 'text-muted line-through decoration-foil/80' : 'text-ink'
                      }`}
                    >
                      {monthName(entry.month)}
                    </span>
                    <span className="dotted-leader" aria-hidden="true" />
                    <span className="inline-flex items-center gap-2 text-sm">
                      {isFew ? (
                        <SilkBow width={22} height={15} filled className="shrink-0" />
                      ) : null}
                      <span
                        className={
                          isFull
                            ? 'small-caps text-muted line-through decoration-rule'
                            : isFew
                              ? 'small-caps font-semibold text-primary'
                              : 'small-caps text-ink'
                        }
                      >
                        {dateBookStatusLabel(entry)}
                      </span>
                    </span>
                  </div>
                  {showNotes && entry.note ? (
                    <p className="mt-0.5 text-sm italic text-muted">{entry.note}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5 text-xs text-muted">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <SilkBow width={18} height={13} filled />
                <span>Few Saturdays left</span>
              </span>
              <span className="line-through">Full for Saturdays</span>
            </div>
            <span>All listings are open for enquiry only</span>
          </div>

          {showCta ? (
            <div className="mt-7 text-center">
              <SiteLink href="/contact/" className="button">
                <WaxSealMini />
                <span>Enquire about your date</span>
              </SiteLink>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
