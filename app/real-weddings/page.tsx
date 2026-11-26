import type { Metadata } from 'next';
import { BotanicalWatermark, DeckledBandDivider } from '../../components/art/section-borders';
import { ClosingEnquiry } from '../../components/closing-enquiry';
import { PageHead } from '../../components/page-head';
import { RealWeddingsGallery } from '../../components/real-weddings-gallery';
import { realWeddings } from '../../content/real-weddings';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Real weddings',
  description:
    'Six Lowcountry weddings planned by Something Blue Weddings—from sunrise dune elopements to oak-garden banquets and walled downtown courtyards.',
  alternates: { canonical: absoluteUrl('/real-weddings/') },
};

export default function RealWeddingsPage() {
  const quoteWedding = realWeddings[0];

  return (
    <>
      <PageHead eyebrow="Our archives" title="Real weddings, real Saturdays" motif="sprig">
        <p>
          Oak gardens, barrier-island dunes, downtown courtyards, rooftops and riverside farms—every
          celebration below is a fictitious sample feature illustrating our planning range.
        </p>
      </PageHead>

      <RealWeddingsGallery />

      {/* Full-width pull quote in Prata on vellum */}
      <div>
        <DeckledBandDivider from="transparent" to="var(--vellum)" />
        <section
          className="vellum-band relative overflow-hidden border-t-0 border-b-0 py-14 sm:py-20"
          aria-label="Couple testimonial"
        >
          <BotanicalWatermark corner="top-left" className="text-ink" />
          <BotanicalWatermark corner="bottom-right" className="text-ink" />
          <div className="wrap-narrow relative z-10 text-center">
            <blockquote className="font-display text-2xl leading-relaxed text-ink sm:text-3xl">
              &ldquo;{quoteWedding.quote}&rdquo;
            </blockquote>
            <p className="script-accent mt-5 text-3xl text-primary sm:text-4xl">
              {quoteWedding.couple}
            </p>
            <p className="small-caps mt-1 text-xs text-muted">
              Married {quoteWedding.place}
            </p>
          </div>
        </section>
        <DeckledBandDivider from="var(--vellum)" to="transparent" flip />
      </div>

      <ClosingEnquiry>
        <ClosingEnquiry.Eyebrow>Picture your own Saturday</ClosingEnquiry.Eyebrow>
        <ClosingEnquiry.Heading>
          Tell us the setting you have in mind, and we&apos;ll share how we plan for it.
        </ClosingEnquiry.Heading>
        <ClosingEnquiry.Body>
          Every Lowcountry setting has its own rhythm—tides, church bells, heat plans and shuttle
          routes. We know them by heart.
        </ClosingEnquiry.Body>
        <ClosingEnquiry.Action>Enquire about your date</ClosingEnquiry.Action>
      </ClosingEnquiry>
    </>
  );
}
