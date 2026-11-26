'use client';

import { useEffect, useRef, useState } from 'react';
import { formatTime12h } from '../content/timeline';
import { SilkBow } from './art/motifs';

export interface RibbonMoment {
  time: string;
  label: string;
  note?: string;
  milestone?: boolean;
}

/**
 * Signature silk ribbon run sheet.
 * Horizontal on desktop (md+), vertical on mobile.
 * Draws the satin-sheen silk ribbon in on viewport entry (disabled under reduced motion).
 */
export function RibbonRunSheet({
  moments,
  variant = 'paper',
  ariaLabel = 'Wedding run of day',
}: {
  moments: readonly RibbonMoment[];
  variant?: 'paper' | 'deep';
  ariaLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setDrawn(true);
      return;
    }

    setDrawn(false);
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isDeep = variant === 'deep';
  const timeColor = isDeep ? 'text-deep-band-ink' : 'text-ink';
  const labelColor = isDeep ? 'text-deep-band-muted' : 'text-muted';
  const count = moments.length;

  // Build an undulating horizontal SVG ribbon path across viewBox 0..1000
  const horizontalPath =
    'M 12 42 C 120 14, 220 68, 340 40 C 460 12, 560 68, 680 40 C 790 14, 890 64, 988 38';

  return (
    <div ref={containerRef} aria-label={ariaLabel} className="relative">
      {/* Desktop horizontal silk ribbon */}
      <div className="hidden md:block">
        <div className="relative py-2">
          {/* Silk ribbon SVG spanning behind milestone dots */}
          <svg
            viewBox="0 0 1000 84"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-20 w-full -translate-y-1/2"
          >
            <defs>
              <linearGradient id={`ribbon-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--ribbon)" />
                <stop offset="50%" stopColor="var(--ribbon-sheen)" />
                <stop offset="100%" stopColor="var(--ribbon)" />
              </linearGradient>
            </defs>
            {/* Base silk ribbon (always visible in static/full-page views) */}
            <path
              d={horizontalPath}
              fill="none"
              stroke={`url(#ribbon-grad-${variant})`}
              strokeOpacity="0.72"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Animated satin sheen draw-in overlay on viewport entry */}
            <path
              d={horizontalPath}
              fill="none"
              stroke={`url(#ribbon-grad-${variant})`}
              strokeWidth="9"
              strokeLinecap="round"
              className="ribbon-path-animate"
              data-drawn={drawn ? 'true' : 'false'}
            />
            <path
              d={horizontalPath}
              fill="none"
              stroke="#FFFDF8"
              strokeOpacity="0.42"
              strokeWidth="1.5"
              className="ribbon-path-animate"
              data-drawn={drawn ? 'true' : 'false'}
            />
          </svg>

          <ol
            className="relative z-10 grid items-center gap-2"
            style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
          >
            {moments.map((moment, index) => {
              const isUpper = index % 2 === 0;
              const isMilestone =
                moment.milestone ||
                /ceremony|vows|dinner|banquet|send-off|bonfire/i.test(moment.label);

              return (
                <li
                  key={`${moment.time}-${moment.label}`}
                  className="grid min-h-44 grid-rows-[1fr_auto_1fr] items-center text-center"
                >
                  {/* Top cell */}
                  <div className={`px-1 pb-3 ${isUpper ? 'self-end' : 'self-end opacity-90'}`}>
                    {isUpper ? (
                      <>
                        <p className={`font-display text-sm tracking-wide letterpress ${timeColor}`}>
                          {formatTime12h(moment.time)}
                        </p>
                        <p className={`mt-1 text-sm leading-snug ${labelColor}`}>
                          {moment.label}
                        </p>
                      </>
                    ) : (
                      <p className={`small-caps text-xs ${isDeep ? 'text-foil' : 'text-muted'}`}>
                        {formatTime12h(moment.time)}
                      </p>
                    )}
                  </div>

                  {/* Ribbon node */}
                  <div className="flex items-center justify-center">
                    {isMilestone ? (
                      <span
                        className={`inline-flex items-center justify-center rounded-full p-1 ${
                          isDeep ? 'bg-deep-band' : 'bg-paper'
                        }`}
                      >
                        <SilkBow width={32} height={22} filled />
                      </span>
                    ) : (
                      <span
                        className="h-3 w-3 rounded-full border-2 border-foil bg-paper shadow-xs"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Bottom cell */}
                  <div className="self-start px-1 pt-3">
                    {!isUpper ? (
                      <>
                        <p className={`font-display text-sm leading-snug ${timeColor}`}>
                          {moment.label}
                        </p>
                        {moment.note ? (
                          <p className={`mt-1 text-xs italic ${labelColor}`}>{moment.note}</p>
                        ) : null}
                      </>
                    ) : moment.note ? (
                      <p className={`text-xs italic ${labelColor}`}>{moment.note}</p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Mobile vertical silk ribbon */}
      <div className="relative pl-10 md:hidden">
        <svg
          viewBox="0 0 28 400"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-2 bottom-2 left-2 w-7 h-[calc(100%-1rem)]"
        >
          <path
            d="M 14 4 C 24 88, 4 176, 14 260 C 22 324, 8 364, 14 396"
            fill="none"
            stroke="var(--ribbon)"
            strokeWidth="6"
            strokeLinecap="round"
            className="ribbon-path-animate"
            data-drawn={drawn ? 'true' : 'false'}
          />
          <path
            d="M 14 4 C 24 88, 4 176, 14 260 C 22 324, 8 364, 14 396"
            fill="none"
            stroke="#FFFDF8"
            strokeOpacity="0.38"
            strokeWidth="1.2"
          />
        </svg>

        <ol className="space-y-5">
          {moments.map(moment => {
            const isMilestone =
              moment.milestone ||
              /ceremony|vows|dinner|banquet|send-off|bonfire/i.test(moment.label);

            return (
              <li key={`m-${moment.time}-${moment.label}`} className="relative">
                <span className="absolute -left-9 top-0.5 flex h-6 w-6 items-center justify-center">
                  {isMilestone ? (
                    <SilkBow width={24} height={17} filled />
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full border-2 border-foil bg-paper" />
                  )}
                </span>
                <p className={`small-caps text-xs ${isDeep ? 'text-foil' : 'text-primary'}`}>
                  {formatTime12h(moment.time)}
                </p>
                <p className={`font-display text-base leading-snug ${timeColor}`}>
                  {moment.label}
                </p>
                {moment.note ? (
                  <p className={`mt-0.5 text-sm italic ${labelColor}`}>{moment.note}</p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
