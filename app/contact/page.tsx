import type { Metadata } from 'next';
import { LineIcon, OpenEnvelope } from '../../components/art/motifs';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business } from '../../content/business';
import { mapDirectionsUrl } from '../../lib/maps';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead eyebrow="Enquire" title={business.enquiries.title} motif="envelope">
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      {/* Writing desk layout */}
      <div className="wrap grid items-start gap-10 py-14 sm:py-20 lg:grid-cols-12">
        {/* Left: Notepaper with hosted form (or email fallback) + message guide + wording note */}
        <section aria-label="Enquiry form" className="lg:col-span-7">
          <div className="paper-sheet p-6 sm:p-10">
            <div className="border-b border-foil/55 pb-4">
              <p className="small-caps text-xs text-primary">Date &amp; planning enquiry</p>
              <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">
                Write to Clementine &amp; team
              </h2>
            </div>

            <div className="mt-6">
              {hosted ? (
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              ) : (
                <div className="rounded-ui border border-foil/60 bg-vellum/55 p-6">
                  <h3 className="font-display text-xl text-ink">Write to us directly</h3>
                  <p className="mt-2 text-base text-muted">
                    The online enquiry form is not connected on this preview. Send your note
                    directly to{' '}
                    <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                      {business.email}
                    </a>{' '}
                    and include the details listed below.
                  </p>
                </div>
              )}
            </div>

            {/* Handwritten-style message guide checklist */}
            <div className="mt-8 border-t border-rule pt-6">
              <h3 className="small-caps text-xs text-primary">Helpful to include in your note</h3>
              <ul className="mt-3 grid gap-2 text-base italic text-muted sm:grid-cols-2">
                {business.enquiries.usefulToInclude.map(tip => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <span className="mt-1 text-foil" aria-hidden="true">
                      ☐
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required enquiry wording note */}
            <p className="mt-6 border-t border-foil/40 pt-4 text-sm italic text-muted">
              {business.enquiries.note}
            </p>
          </div>
        </section>

        {/* Right: Open envelope art, direct email/phone, studio hours + OpenBadge, studio & map */}
        <aside aria-label="Studio details" className="grid gap-6 lg:col-span-5">
          {/* Direct contact card */}
          <div className="paper-sheet p-6 sm:p-8">
            <div className="print-hide mb-4 flex justify-center">
              <OpenEnvelope className="h-24 w-40 text-ink" />
            </div>

            <h2 className="font-display text-2xl text-ink">Direct correspondence</h2>
            <div className="mt-4 space-y-3">
              <p className="flex items-center gap-2.5 text-base">
                <LineIcon name="envelope" className="h-4 w-4 shrink-0 text-foil" />
                <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <CopyEmail email={business.email} />
              </div>
              {business.phone ? (
                <p className="flex items-center gap-2.5 pt-1 text-base">
                  <LineIcon name="phone" className="h-4 w-4 shrink-0 text-foil" />
                  <a
                    className="text-link"
                    href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                  >
                    {business.phone}
                  </a>
                </p>
              ) : null}
            </div>
          </div>

          {/* Studio hours card with OpenBadge */}
          <div className="paper-sheet p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
              <h2 className="font-display text-2xl text-ink">Studio hours</h2>
              <span className="small-caps rounded-ui border border-foil/60 bg-vellum px-3 py-1 text-xs text-primary">
                <OpenBadge hours={business.hours} />
              </span>
            </div>

            <dl className="mt-4 space-y-2 text-sm text-ink">
              {business.hours.map(entry => (
                <div
                  key={entry.day}
                  className="flex items-baseline justify-between gap-4 border-b border-rule/60 pb-1.5 last:border-b-0"
                >
                  <dt className="font-medium">{entry.day}</dt>
                  <dd className={entry.opens ? 'text-ink' : 'italic text-muted'}>
                    {entry.opens && entry.closes ? `${entry.opens} – ${entry.closes}` : 'Closed'}
                  </dd>
                </div>
              ))}
            </dl>
            <TimeZoneNote />
            <p className="mt-3 text-sm italic text-muted">{business.hoursNote}</p>
          </div>

          {/* Studio location & deckled map */}
          <div className="paper-sheet p-6 sm:p-8">
            <div className="flex items-start gap-2.5">
              <LineIcon name="map-pin" className="mt-1 h-5 w-5 shrink-0 text-foil" />
              <div>
                <h2 className="font-display text-2xl text-ink">Charleston studio</h2>
                <p className="mt-1 text-base text-muted">{business.studioDescription}</p>
                <p className="mt-1 text-sm italic text-muted">{business.consultationsNote}</p>
              </div>
            </div>

            <div className="deckled-sheet mt-5 overflow-hidden border border-foil/55">
              <GoogleMap
                address={business.mapQuery}
                title="Map of Rainbow Row on East Bay Street, Charleston, South Carolina"
              />
            </div>

            <p className="mt-4 text-sm">
              <a
                href={mapDirectionsUrl(business.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="small-caps text-link"
              >
                Directions to Rainbow Row, Charleston →
              </a>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
