import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LineIcon } from '../../../components/art/motifs';
import {
  BotanicalSectionRule,
  BotanicalWatermark,
  DeckledBandDivider,
  FoilCornerBrackets,
  ScallopedLinerBorder,
} from '../../../components/art/section-borders';
import { WeddingVignette } from '../../../components/art/vignettes';
import { ClosingEnquiry } from '../../../components/closing-enquiry';
import { RibbonRunSheet } from '../../../components/ribbon-run-sheet';
import { SiteLink } from '../../../components/site-link';
import { packageById } from '../../../content/packages';
import {
  formatWeddingMonth,
  realWeddings,
  weddingById,
} from '../../../content/real-weddings';
import { settingById } from '../../../content/settings';
import { absoluteUrl } from '../../../lib/paths';

export function generateStaticParams() {
  return realWeddings.map(wedding => ({ id: wedding.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const wedding = weddingById(id);
  if (!wedding) return {};

  return {
    title: `${wedding.couple} — Real wedding`,
    description: `${wedding.couple}: ${wedding.dek} (${wedding.guests} guests ${wedding.place}.)`,
    alternates: { canonical: absoluteUrl(`/real-weddings/${wedding.id}/`) },
  };
}

export default async function RealWeddingFeaturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = realWeddings.findIndex(w => w.id === id);
  if (index < 0) notFound();

  const wedding = realWeddings[index];
  const prevWedding = realWeddings[(index - 1 + realWeddings.length) % realWeddings.length];
  const nextWedding = realWeddings[(index + 1) % realWeddings.length];
  const setting = settingById(wedding.settingId);
  const pkg = packageById(wedding.packageId);

  return (
    <>
      {/* 1. Feature head: magazine opener with big script couple names left, oval vignette right */}
      <div>
        <section className="liner-band py-12 sm:py-16">
          <div className="wrap">
            <div className="paper-sheet relative grid items-center gap-8 px-6 py-9 sm:px-12 sm:py-12 lg:grid-cols-12">
              <FoilCornerBrackets />
              <div className="lg:col-span-6">
                <p className="small-caps text-xs text-primary">
                  <SiteLink href="/real-weddings/" className="text-link no-underline hover:underline">
                    Real weddings
                  </SiteLink>{' '}
                  · {setting?.label ?? wedding.settingId}
                </p>
                <h1 className="script-accent mt-3 text-5xl text-ink sm:text-7xl">
                  {wedding.couple}
                </h1>
                <p className="mt-4 font-display text-xl leading-snug text-ink sm:text-2xl">
                  {wedding.dek}
                </p>
                <p className="mt-3 text-base italic text-muted">
                  Married {wedding.place}.
                </p>
              </div>
              <div className="w-full lg:col-span-6">
                <WeddingVignette vignette={wedding.vignette} priority />
              </div>
            </div>
          </div>
        </section>
        <ScallopedLinerBorder position="bottom" outerBg="transparent" />
      </div>

      {/* 2. Facts row separated by foil hairlines */}
      <section className="wrap py-8" aria-label="Wedding facts">
        <dl className="grid grid-cols-2 gap-6 border-y border-foil/60 py-6 text-center sm:grid-cols-4">
          <div className="sm:border-r sm:border-foil/35 sm:pr-4">
            <dt className="small-caps text-xs text-muted">Month</dt>
            <dd className="mt-1 font-display text-lg text-ink">
              {formatWeddingMonth(wedding.month)}
            </dd>
          </div>
          <div className="sm:border-r sm:border-foil/35 sm:pr-4">
            <dt className="small-caps text-xs text-muted">Setting</dt>
            <dd className="mt-1 font-display text-lg text-ink">
              {setting?.label ?? wedding.settingId}
            </dd>
          </div>
          <div className="sm:border-r sm:border-foil/35 sm:pr-4">
            <dt className="small-caps text-xs text-muted">Guests</dt>
            <dd className="mt-1 font-display text-lg text-ink">{wedding.guests}</dd>
          </div>
          <div>
            <dt className="small-caps text-xs text-muted">Package</dt>
            <dd className="mt-1 font-display text-lg text-primary">
              <SiteLink href={`/packages/#${wedding.packageId}`} className="text-link">
                {pkg?.name ?? wedding.packageId}
              </SiteLink>
            </dd>
          </div>
        </dl>
      </section>

      {/* 3. Story: two-column text with Prata drop cap & pull quote breaking the columns */}
      <section className="wrap py-10 sm:py-14" aria-label="The story of the day">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6 text-lg leading-relaxed text-ink md:columns-2 md:gap-10">
            {wedding.story.map((paragraph, pIndex) => (
              <p
                key={paragraph}
                className={pIndex === 0 ? 'drop-cap break-inside-avoid' : 'break-inside-avoid'}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className="my-12 border-y border-foil/60 bg-vellum/65 px-6 py-8 text-center sm:px-10">
            <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
              &ldquo;{wedding.quote}&rdquo;
            </p>
            <footer className="script-accent mt-3 text-3xl text-primary">
              — {wedding.couple}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 4. Palette: three silk ribbon spools coloured by the wedding's hex values */}
      <div>
        <DeckledBandDivider from="transparent" to="var(--vellum)" />
        <section
          className="vellum-band relative overflow-hidden border-t-0 border-b-0 py-12 sm:py-16"
          aria-labelledby="palette-heading"
        >
          <BotanicalWatermark corner="top-right" className="text-ink" />
          <div className="wrap-narrow relative z-10 text-center">
          <p className="small-caps text-xs text-primary">Colour story</p>
          <h2 id="palette-heading" className="mt-2 font-display text-2xl text-ink sm:text-3xl">
            The silk palette
          </h2>

          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {wedding.palette.map(swatch => (
              <li key={swatch.name} className="paper-sheet flex flex-col items-center p-6">
                {/* Wooden spool wound with coloured silk ribbon */}
                <svg viewBox="0 0 110 86" width="110" height="86" aria-hidden="true">
                  {/* Top & bottom wooden spool flanges */}
                  <ellipse cx="55" cy="14" rx="34" ry="8" fill="var(--desk)" stroke="var(--foil)" strokeWidth="1.2" />
                  <ellipse cx="55" cy="72" rx="34" ry="8" fill="var(--desk)" stroke="var(--foil)" strokeWidth="1.2" />
                  {/* Wound silk ribbon */}
                  <rect
                    x="28"
                    y="16"
                    width="54"
                    height="54"
                    rx="4"
                    fill={swatch.hex}
                    stroke="currentColor"
                    strokeOpacity="0.22"
                  />
                  {/* Subtle satin sheen highlight */}
                  <rect x="38" y="18" width="10" height="50" fill="#FFFFFF" fillOpacity="0.22" />
                  {/* Loose silk tail */}
                  <path
                    d="M82 54 C96 58, 100 72, 106 78"
                    fill="none"
                    stroke={swatch.hex}
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="mt-3 font-display text-lg text-ink">{swatch.name}</p>
                <p className="small-caps mt-0.5 text-xs text-muted">{swatch.hex}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
        <DeckledBandDivider from="var(--vellum)" to="transparent" flip />
      </div>

      {/* 5. Run of day excerpt on the signature ribbon */}
      <section className="wrap py-14 sm:py-20" aria-labelledby="feature-run-heading">
        <div className="paper-sheet deckled-sheet px-6 py-10 sm:px-10 sm:py-12">
          <div className="text-center">
            <p className="small-caps text-xs text-primary">How the day unfolded</p>
            <h2 id="feature-run-heading" className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              {wedding.couple}&apos;s run of day
            </h2>
          </div>
          <div className="mt-8">
            <RibbonRunSheet
              moments={wedding.runOfDay}
              variant="paper"
              ariaLabel={`${wedding.couple} run of day`}
            />
          </div>
        </div>
      </section>

      {/* 6. Vendor credits colophon */}
      <BotanicalSectionRule />
      <section className="wrap-narrow py-8" aria-labelledby="credits-heading">
        <div className="border-y border-foil/55 py-8 text-center">
          <p className="small-caps text-xs text-primary">Colophon</p>
          <h2 id="credits-heading" className="mt-1 font-display text-2xl text-ink">
            Creative team
          </h2>
          <p className="mt-1 text-xs italic text-muted">
            Fictitious vendor names for this gallery sample.
          </p>
          <dl className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {wedding.vendors.map(vendor => (
              <div key={`${vendor.role}-${vendor.name}`}>
                <dt className="small-caps text-xs text-muted">{vendor.role}</dt>
                <dd className="font-display text-base text-ink">{vendor.name}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 7. Previous / next as two envelopes */}
      <nav className="wrap py-10" aria-label="More real weddings">
        <div className="grid gap-6 sm:grid-cols-2">
          <SiteLink
            href={`/real-weddings/${prevWedding.id}/`}
            className="paper-sheet stationery-lift group flex items-center gap-4 border-t-2 border-t-foil p-6 no-underline hover:no-underline"
          >
            <LineIcon name="envelope" className="h-6 w-6 shrink-0 text-foil" />
            <div>
              <p className="small-caps text-xs text-muted">← Previous wedding</p>
              <p className="script-accent mt-1 text-3xl text-ink group-hover:text-primary">
                {prevWedding.couple}
              </p>
            </div>
          </SiteLink>

          <SiteLink
            href={`/real-weddings/${nextWedding.id}/`}
            className="paper-sheet stationery-lift group flex items-center justify-end gap-4 border-t-2 border-t-foil p-6 text-right no-underline hover:no-underline"
          >
            <div>
              <p className="small-caps text-xs text-muted">Next wedding →</p>
              <p className="script-accent mt-1 text-3xl text-ink group-hover:text-primary">
                {nextWedding.couple}
              </p>
            </div>
            <LineIcon name="envelope" className="h-6 w-6 shrink-0 text-foil" />
          </SiteLink>
        </div>
      </nav>

      <ClosingEnquiry>
        <ClosingEnquiry.Eyebrow>Inspired by {wedding.couple}?</ClosingEnquiry.Eyebrow>
        <ClosingEnquiry.Heading>
          Tell us about your date and setting, and we&apos;ll send back honest notes.
        </ClosingEnquiry.Heading>
        <ClosingEnquiry.Body>
          This wedding used our {pkg?.name ?? 'planning'} suite—we&apos;re glad to talk through
          which level fits your plans.
        </ClosingEnquiry.Body>
        <ClosingEnquiry.Action>Enquire about your date</ClosingEnquiry.Action>
      </ClosingEnquiry>
    </>
  );
}
