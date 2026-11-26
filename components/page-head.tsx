import type { ReactNode } from 'react';
import { ForgetMeNotSprig, OpenEnvelope, SilkBow, WaxSeal } from './art/motifs';
import { FoilCornerBrackets, ScallopedLinerBorder } from './art/section-borders';

export type PageHeadMotif = 'ribbon' | 'sprig' | 'bow' | 'envelope' | 'seal';

/**
 * Editorial page head: a cotton-paper sheet with gold-foil corner brackets resting over the
 * deep-blue forget-me-not liner band, finished with a scalloped stationery-lace bottom border.
 */
export function PageHead({
  eyebrow,
  title,
  motif = 'sprig',
  children,
}: {
  eyebrow: string;
  title: string;
  motif?: PageHeadMotif;
  children?: ReactNode;
}) {
  return (
    <div>
      <section className="liner-band relative overflow-hidden py-12 sm:py-16">
        <div className="wrap">
          <div className="paper-sheet relative mx-auto max-w-4xl px-6 py-9 text-center sm:px-12 sm:py-12">
            <FoilCornerBrackets />
            <p className="small-caps text-sm text-primary">{eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl text-ink letterpress sm:text-5xl">
            {title}
          </h1>
          {children ? (
            <div className="mx-auto mt-4 max-w-2xl text-lg italic text-muted">
              {children}
            </div>
          ) : null}

          {/* Distinct motif per page head */}
          <div className="print-hide mt-6 flex justify-center">
            {motif === 'ribbon' ? (
              <svg viewBox="0 0 240 24" width="220" height="22" aria-hidden="true">
                <path
                  d="M6 14 C64 4, 176 22, 234 10"
                  fill="none"
                  stroke="var(--ribbon)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M6 14 C64 4, 176 22, 234 10"
                  fill="none"
                  stroke="#FFFDF8"
                  strokeOpacity="0.45"
                  strokeWidth="1.2"
                />
              </svg>
            ) : motif === 'sprig' ? (
              <ForgetMeNotSprig className="text-ink" />
            ) : motif === 'bow' ? (
              <SilkBow width={52} height={36} filled />
            ) : motif === 'envelope' ? (
              <OpenEnvelope className="h-20 w-32 text-ink" />
            ) : (
              <WaxSeal size={56} />
            )}
          </div>
        </div>
      </div>
      </section>
      <ScallopedLinerBorder position="bottom" outerBg="transparent" />
    </div>
  );
}
