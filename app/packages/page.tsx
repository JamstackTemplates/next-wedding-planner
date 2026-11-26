import type { Metadata } from 'next';
import { BotanicalSectionRule, ScallopedLinerBorder } from '../../components/art/section-borders';
import { ClosingEnquiry } from '../../components/closing-enquiry';
import { DanceCard } from '../../components/dance-card';
import {
  ComparisonTable,
  EnclosureAddOns,
  PackageStationerySuite,
} from '../../components/package-suite';
import { PageHead } from '../../components/page-head';
import { dateBook } from '../../content/date-book';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Packages',
  description:
    'Compare our four Lowcountry wedding planning packages—Something Old, Something Borrowed, Something New and Something Blue—plus weekend enclosures and the 2027 date book.',
  alternates: { canonical: absoluteUrl('/packages/') },
};

export default function PackagesPage() {
  return (
    <>
      <PageHead eyebrow="Planning packages" title="Four ways to plan, one old rhyme." motif="ribbon">
        <p>
          From a sunrise dune elopement to eighteen months of full design and weekend coordination,
          every package comes with a written rain plan and a steady team on the day.
        </p>
      </PageHead>

      {/* 2. The suite: four distinct stationery pieces */}
      <PackageStationerySuite />

      {/* 3. Side by side comparison reply card */}
      <ComparisonTable />

      {/* 4. Enclosures: optional weekend add-ons */}
      <EnclosureAddOns />

      {/* 5. The 2027 date book in full with seasonal notes */}
      <div>
        <ScallopedLinerBorder position="top" outerBg="transparent" />
        <section className="liner-band py-14 sm:py-20" aria-label="2027 date book in full">
          <div className="wrap">
            <DanceCard
              book={dateBook}
              showNotes={true}
              showCta={true}
              heading={`The ${dateBook.year} date book, month by month`}
            />
          </div>
        </section>
        <ScallopedLinerBorder position="bottom" outerBg="transparent" />
      </div>

      {/* 6. Good to know: folded notes (details/summary) in two columns */}
      <section className="wrap py-16 sm:py-24" aria-labelledby="good-to-know-heading">
        <div className="mx-auto max-w-2xl text-center">
          <p className="small-caps text-sm text-primary">Before you write</p>
          <h2 id="good-to-know-heading" className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            Good to know
          </h2>
        </div>

        <div className="mt-10 grid items-start gap-5 md:grid-cols-2">
          <details className="folded-note">
            <summary>How does a date get held?</summary>
            <p className="px-6 pb-5 text-base text-muted">
              After a consultation we send a written proposal. A date is held only once a planning
              agreement is signed by both of us. An enquiry or a call never holds a date.
            </p>
          </details>

          <details className="folded-note">
            <summary>Do you travel?</summary>
            <p className="px-6 pb-5 text-base text-muted">
              Anywhere in the service area at no charge. Further afield, we&apos;ll quote travel in
              the proposal.
            </p>
          </details>

          <details className="folded-note">
            <summary>Can we change packages later?</summary>
            <p className="px-6 pb-5 text-base text-muted">
              Yes. Most couples who move up do it around eight months out.
            </p>
          </details>

          <details className="folded-note">
            <summary>Do you plan weekday weddings?</summary>
            <p className="px-6 pb-5 text-base text-muted">
              Gladly, and weekday dates are often open when Saturdays are not.
            </p>
          </details>

          <details className="folded-note md:col-span-2">
            <summary>Are vendor costs included?</summary>
            <p className="px-6 pb-5 text-base text-muted">
              No. Our fee covers planning and coordination. Venues, catering, flowers and other
              vendors contract with you directly, and we never take commissions from them.
            </p>
          </details>
        </div>
      </section>

      <BotanicalSectionRule />

      {/* 7. Enquiry prompt */}
      <ClosingEnquiry>
        <ClosingEnquiry.Eyebrow>Not sure which suite fits?</ClosingEnquiry.Eyebrow>
        <ClosingEnquiry.Heading>
          Tell us where you are in planning, and we&apos;ll recommend the right starting point.
        </ClosingEnquiry.Heading>
        <ClosingEnquiry.Body>
          An enquiry is simply a conversation—never a commitment or a held date.
        </ClosingEnquiry.Body>
        <ClosingEnquiry.Action>Enquire about your date</ClosingEnquiry.Action>
      </ClosingEnquiry>
    </>
  );
}
