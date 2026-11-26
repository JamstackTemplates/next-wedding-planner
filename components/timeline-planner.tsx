'use client';

import { useEffect, useId, useState } from 'react';
import { stages } from '../content/timeline';
import { weddingCountdown, type CountdownResult } from '../lib/countdown';
import { site } from '../lib/site';
import { LineIcon, SilkBow } from './art/motifs';

/**
 * Interactive wedding-date countdown + vertical silk planning ribbon.
 * Without JS: hides the date input, displays a neutral prompt, and shows every stage.
 * With JS: computes months out in America/New_York, refreshes every minute, highlights the matching stage,
 * and offers a scroll-to-stage button.
 */
export function TimelinePlanner() {
  const inputId = useId();
  const [mounted, setMounted] = useState(false);
  const [dateValue, setDateValue] = useState('');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTick(t => t + 1), 60_000);
    return () => clearInterval(timer);
  }, []);

  // Recompute whenever dateValue or the 1-minute tick updates
  const result: CountdownResult | null =
    mounted && dateValue
      ? weddingCountdown(dateValue, stages, site.timeZone || 'America/New_York', new Date(Date.now() + tick * 0))
      : null;

  const activeStageId =
    result && (result.status === 'stage' || result.status === 'far') ? result.stageId : null;

  function scrollToStage() {
    if (!activeStageId) return;
    const target = document.getElementById(`stage-${activeStageId}`);
    if (!target) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    target.focus({ preventScroll: true });
  }

  return (
    <>
      {/* Countdown vellum card */}
      <section className="wrap py-12" aria-label="Wedding date countdown">
        <div className="vellum-band mx-auto max-w-3xl px-6 py-8 sm:px-10">
          {mounted ? (
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex-1">
                <label htmlFor={inputId} className="small-caps block text-sm text-primary">
                  Your wedding date
                </label>
                <input
                  id={inputId}
                  type="date"
                  value={dateValue}
                  onChange={e => setDateValue(e.target.value)}
                  className="mt-2 min-h-11 w-full max-w-xs rounded-ui border border-foil/80 bg-paper px-3.5 py-2 text-base text-ink"
                />
                <p className="mt-2 text-xs italic text-muted">
                  Nothing is stored or sent — this calculation stays in your browser (Eastern Time).
                </p>
              </div>

              {activeStageId ? (
                <button type="button" onClick={scrollToStage} className="button button-quiet shrink-0">
                  Jump to your stage
                </button>
              ) : null}
            </div>
          ) : (
            <p className="text-center text-lg italic text-ink">
              Find your stage below by how many months you have left.
            </p>
          )}

          {result ? (
            <p
              className="mt-5 border-t border-foil/40 pt-4 font-display text-xl text-ink"
              role="status"
              aria-live="polite"
            >
              {result.message}
            </p>
          ) : mounted ? (
            <p className="mt-5 border-t border-foil/40 pt-4 text-base italic text-muted">
              Enter your date above to highlight where you sit on the eighteen-month ribbon.
            </p>
          ) : null}
        </div>
      </section>

      {/* Vertical silk planning ribbon */}
      <section className="wrap py-8 sm:py-14" aria-label="Eighteen-month planning stages">
        <div className="relative">
          {/* Centre silk ribbon on desktop, left silk ribbon on mobile */}
          <svg
            viewBox="0 0 40 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="print-hide pointer-events-none absolute top-0 bottom-0 left-4 h-full w-8 md:left-1/2 md:-translate-x-1/2"
          >
            <path
              d="M20 0 C32 160, 8 330, 20 500 C32 670, 8 840, 20 1000"
              fill="none"
              stroke="var(--ribbon)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M20 0 C32 160, 8 330, 20 500 C32 670, 8 840, 20 1000"
              fill="none"
              stroke="#FFFDF8"
              strokeOpacity="0.4"
              strokeWidth="1.4"
            />
          </svg>

          <ol className="space-y-10 md:space-y-14">
            {stages.map((stage, index) => {
              const isLeft = index % 2 === 0;
              const isHighlighted = activeStageId === stage.id;
              const rangeLabel =
                stage.monthsBefore.from === 0
                  ? '0'
                  : `${stage.monthsBefore.from}–${stage.monthsBefore.to}`;

              return (
                <li
                  key={stage.id}
                  id={`stage-${stage.id}`}
                  tabIndex={-1}
                  className="relative pl-14 md:grid md:grid-cols-12 md:items-start md:gap-8 md:pl-0"
                >
                  {/* Bow node pinned on the ribbon */}
                  <span className="print-hide absolute left-2 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-desk md:left-1/2 md:-translate-x-1/2">
                    <SilkBow width={32} height={22} filled={isHighlighted} />
                  </span>

                  <div
                    className={`paper-sheet p-6 transition-all sm:p-8 ${
                      isLeft
                        ? 'md:col-span-5 md:col-start-1'
                        : 'md:col-span-5 md:col-start-8'
                    } ${
                      isHighlighted
                        ? 'border-2 border-primary ring-4 ring-forget-me-not/35'
                        : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 border-b border-rule pb-4">
                      <div>
                        <p className="small-caps text-xs text-primary">
                          {stage.monthsBefore.from === 0
                            ? 'Final week'
                            : `${rangeLabel} months before`}
                        </p>
                        <h2 className="mt-1 font-display text-2xl text-ink">{stage.title}</h2>
                      </div>
                      <div className="flex items-center gap-2 text-foil">
                        <LineIcon name={stage.icon} className="h-5 w-5" />
                        <span className="font-display text-3xl leading-none text-primary/80">
                          {rangeLabel}
                        </span>
                      </div>
                    </div>

                    {isHighlighted ? (
                      <p className="small-caps mt-3 inline-block bg-vellum px-2.5 py-1 text-xs text-primary">
                        Your current stage
                      </p>
                    ) : null}

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <h3 className="small-caps text-xs text-muted">You decide</h3>
                        <ul className="mt-2 space-y-1.5 text-sm text-ink">
                          {stage.weDecide.map(item => (
                            <li key={item} className="flex gap-2">
                              <span className="text-foil" aria-hidden="true">
                                ·
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="small-caps text-xs text-primary">We handle</h3>
                        <ul className="mt-2 space-y-1.5 text-sm text-ink">
                          {stage.weHandle.map(item => (
                            <li key={item} className="flex gap-2">
                              <span className="text-ribbon" aria-hidden="true">
                                —
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
