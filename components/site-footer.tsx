import { business } from '../content/business';
import { ForgetMeNotSprig } from './art/motifs';
import { ScallopedLinerBorder } from './art/section-borders';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

export function SiteFooter() {
  return (
    <div className="mt-20">
      <ScallopedLinerBorder position="top" outerBg="transparent" />
      <footer className="liner-band pt-14 pb-12 text-deep-band-ink">
      <div className="wrap">
        {/* Closing script line */}
        <div className="flex flex-col items-center text-center">
          <p className="script-accent text-4xl text-deep-band-ink sm:text-5xl">
            See you at the altar
          </p>
          <ForgetMeNotSprig className="print-hide mt-2 text-forget-me-not opacity-85" />
        </div>

        <div className="mt-12 grid gap-10 border-t border-foil/35 pt-10 md:grid-cols-12">
          {/* Studio & navigation */}
          <div className="md:col-span-4">
            <p className="font-display text-xl text-deep-band-ink">{business.name}</p>
            <p className="mt-3 text-base text-deep-band-muted">{business.studioDescription}</p>
            <p className="mt-1 text-sm italic text-deep-band-muted">{business.consultationsNote}</p>
            <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              <SiteLink href="/packages/" className="small-caps text-sm text-deep-band-ink">
                Packages
              </SiteLink>
              <SiteLink href="/real-weddings/" className="small-caps text-sm text-deep-band-ink">
                Real weddings
              </SiteLink>
              <SiteLink href="/timeline/" className="small-caps text-sm text-deep-band-ink">
                Timeline
              </SiteLink>
              <SiteLink href="/contact/" className="small-caps text-sm text-deep-band-ink">
                Enquire
              </SiteLink>
            </nav>
          </div>

          {/* Studio hours */}
          <div className="md:col-span-4">
            <p className="small-caps text-sm text-foil">Studio hours</p>
            <p className="mt-2 inline-block rounded-ui border border-foil/40 bg-deep-band-surface/75 px-3 py-1 text-sm text-deep-band-ink">
              <OpenBadge hours={business.hours} />
            </p>
            <dl className="mt-4 space-y-1 text-sm text-deep-band-muted">
              <div className="flex justify-between gap-4 border-b border-foil/20 pb-1">
                <dt>Tuesday – Friday</dt>
                <dd>10:00 – 18:00</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-foil/20 pb-1">
                <dt>Saturday</dt>
                <dd>10:00 – 14:00</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sunday &amp; Monday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
            <TimeZoneNote className="text-deep-band-muted" />
          </div>

          {/* Contact details */}
          <div className="md:col-span-4">
            <p className="small-caps text-sm text-foil">Write or call</p>
            <p className="mt-3 text-base">
              <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </p>
            {business.phone ? (
              <p className="mt-2 text-base">
                <a
                  className="text-link"
                  href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                >
                  {business.phone}
                </a>
              </p>
            ) : null}
            <p className="mt-4 text-sm italic text-deep-band-muted">{business.hoursNote}</p>
          </div>
        </div>

        {/* Service area run-on small-caps line */}
        <div className="mt-10 border-t border-foil/30 pt-6">
          <p className="small-caps text-center text-xs leading-relaxed text-deep-band-muted">
            Serving {business.serviceArea.join(' · ')}
          </p>
        </div>

        {/* Credit */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-deep-band-muted">
          <p>{business.name} · Charleston, South Carolina (sample template)</p>
          <span title="Made with love by jamstacks.net">
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a
              className="text-deep-band-ink no-underline hover:underline"
              href="https://jamstacks.net"
            >
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
    </div>
  );
}
