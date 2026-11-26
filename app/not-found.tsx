import { EmptyAisleArt, WaxSealMini } from '../components/art/motifs';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="wrap py-16 sm:py-24">
      <div className="vellum-band mx-auto max-w-2xl px-6 py-12 text-center sm:px-12">
        <EmptyAisleArt className="mx-auto h-auto w-full max-w-sm text-ink" />
        <p className="small-caps mt-6 text-xs text-primary">404 · Page not found</p>
        <h1 className="mt-2 font-display text-3xl text-ink letterpress sm:text-4xl">
          This page left the reception early.
        </h1>
        <p className="mt-3 text-lg italic text-muted">
          Let&apos;s walk you back to the party.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <SiteLink href="/" className="button">
            <WaxSealMini />
            <span>Home</span>
          </SiteLink>
          <SiteLink href="/packages/" className="button button-quiet">
            Packages
          </SiteLink>
          <SiteLink href="/contact/" className="button button-quiet">
            Contact
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
