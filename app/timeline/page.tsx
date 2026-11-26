import type { Metadata } from 'next';
import { BotanicalSectionRule, ScallopedLinerBorder } from '../../components/art/section-borders';
import { ClosingEnquiry } from '../../components/closing-enquiry';
import { PageHead } from '../../components/page-head';
import { RibbonRunSheet } from '../../components/ribbon-run-sheet';
import { SiteLink } from '../../components/site-link';
import { TimelinePlanner } from '../../components/timeline-planner';
import { formatUsd, packages } from '../../content/packages';
import { runOfDay } from '../../content/timeline';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Timeline',
  description:
    'An eighteen-month Lowcountry wedding planning guide with a wedding-date countdown, what you decide versus what we handle, and a sample Saturday run sheet.',
  alternates: { canonical: absoluteUrl('/timeline/') },
};

export default function TimelinePage() {
  return (
    <>
      <PageHead eyebrow="Planning guide" title="Eighteen months, one ribbon" motif="bow">
        <p>
          How a Charleston wedding comes together month by month—what you choose, what our studio
          handles, and how the Saturday itself unfolds.
        </p>
      </PageHead>

      {/* 2 & 3. Countdown vellum card + vertical planning ribbon */}
      <TimelinePlanner />

      {/* 4. The day itself: sample run of day on the deep-blue liner band */}
      <div>
        <ScallopedLinerBorder position="top" outerBg="transparent" />
        <section className="liner-band py-14 sm:py-20" aria-labelledby="day-itself-heading">
          <div className="wrap">
            <div className="mx-auto max-w-2xl text-center">
              <p className="small-caps text-xs text-foil">Hour by hour</p>
              <h2
                id="day-itself-heading"
                className="mt-2 font-display text-3xl text-deep-band-ink sm:text-4xl"
              >
                The day itself
              </h2>
              <p className="mt-3 text-base italic text-deep-band-muted">
                A classic Lowcountry Saturday from morning steaming to the sparkler send-off.
              </p>
            </div>

            <div className="mt-10">
              <RibbonRunSheet
                moments={runOfDay}
                variant="deep"
                ariaLabel="The day itself run of day"
              />
            </div>
          </div>
        </section>
        <ScallopedLinerBorder position="bottom" outerBg="transparent" />
      </div>

      {/* 5. When to bring us in: matching each package's leadMonths to the stages */}
      <section className="wrap py-16 sm:py-20" aria-labelledby="when-to-start-heading">
        <div className="mx-auto max-w-2xl text-center">
          <p className="small-caps text-xs text-primary">Matching your starting point</p>
          <h2 id="when-to-start-heading" className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            When to bring us in
          </h2>
        </div>

        <ol className="mx-auto mt-10 max-w-3xl divide-y divide-foil/40 border-y border-foil/50">
          {packages.map(pkg => (
            <li
              key={pkg.id}
              className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <p className="small-caps text-xs text-primary">
                  {pkg.leadMonths.min}–{pkg.leadMonths.max} months out
                </p>
                <p className="mt-0.5 font-display text-xl text-ink">
                  <SiteLink href={`/packages/#${pkg.id}`} className="text-link">
                    {pkg.name}
                  </SiteLink>
                </p>
                <p className="mt-1 text-base italic text-muted">{pkg.promise}</p>
              </div>
              <p className="small-caps shrink-0 text-sm text-ink">
                From {formatUsd(pkg.priceFrom)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <BotanicalSectionRule />

      {/* 6. Enquiry prompt */}
      <ClosingEnquiry>
        <ClosingEnquiry.Eyebrow>Wherever you are on the ribbon</ClosingEnquiry.Eyebrow>
        <ClosingEnquiry.Heading>
          Share your target date and we&apos;ll map out the next three steps together.
        </ClosingEnquiry.Heading>
        <ClosingEnquiry.Body>
          Whether you&apos;re eighteen months out or eight weeks from the aisle, we&apos;re glad to
          hear what you&apos;re planning.
        </ClosingEnquiry.Body>
        <ClosingEnquiry.Action>Enquire about your date</ClosingEnquiry.Action>
      </ClosingEnquiry>
    </>
  );
}
