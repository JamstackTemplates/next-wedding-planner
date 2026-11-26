import type { Metadata } from 'next';
import { InvitationFlatLay } from '../components/art/invitation-flatlay';
import { FountainPenArt, WaxSeal, WaxSealMini } from '../components/art/motifs';
import {
  BotanicalSectionRule,
  BotanicalWatermark,
  DeckledBandDivider,
  FoilCornerBrackets,
  ScallopedLinerBorder,
} from '../components/art/section-borders';
import { WeddingVignette } from '../components/art/vignettes';
import { ClosingEnquiry } from '../components/closing-enquiry';
import { DanceCard } from '../components/dance-card';
import { RibbonRunSheet } from '../components/ribbon-run-sheet';
import { SiteLink } from '../components/site-link';
import { dateBook, dateBookSummaryLine } from '../content/date-book';
import { formatUsd, packages } from '../content/packages';
import { formatWeddingMonth, realWeddings } from '../content/real-weddings';
import { settingById } from '../content/settings';
import { runOfDay } from '../content/timeline';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const featuredWeddings = realWeddings.filter(w => w.featured);
  const leadWedding = featuredWeddings[0];
  const sideWeddings = featuredWeddings.slice(1, 3);
  const dateBookLine = dateBookSummaryLine(dateBook);

  return (
    <>
      {/* 1. Hero — Composed stationery flat-lay on the planner's desk */}
      <section className="relative overflow-x-clip pt-4 pb-10 sm:pt-8 lg:pt-14 lg:pb-0">
        <div className="wrap grid items-center gap-6 lg:grid-cols-12 lg:gap-6">
          <div className="relative z-10 lg:col-span-5 lg:pb-16">
            <p className="small-caps text-xs text-primary sm:text-sm">Charleston wedding planners</p>
            <h1 className="mt-2 font-display text-[2.45rem] leading-[1.06] text-ink letterpress sm:mt-3 sm:text-5xl lg:text-[3.45rem]">
              Married in the Lowcountry, planned down to the minute.
            </h1>
            <p className="mt-3 max-w-lg text-base text-muted sm:mt-5 sm:text-lg">
              We&apos;re a small Charleston studio that plans fewer weddings so each one gets the
              whole of our attention, from the first venue walk-through to the last sparkler.
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <SiteLink href="/contact/" className="button w-full sm:w-auto">
                <WaxSealMini />
                <span>Enquire about your date</span>
              </SiteLink>
              <SiteLink
                href="/packages/"
                className="small-caps text-link text-center text-sm sm:button sm:button-quiet sm:no-underline"
              >
                See the packages
              </SiteLink>
            </div>

            {/* Tiny letterpress date-book note (visible on desktop here, and below art on mobile) */}
            <div className="paper-sheet mt-7 hidden border-l-2 border-l-foil px-4 py-3 text-sm lg:inline-block">
              <p className="small-caps text-xs text-primary">From the date book</p>
              <p className="mt-0.5 italic text-ink">{dateBookLine}</p>
            </div>
          </div>

          {/* Right 7 columns: flat-lay bleeding softly off the right edge */}
          <div className="relative lg:col-span-7 lg:-mr-12 xl:-mr-24">
            <div className="mx-auto max-w-md sm:max-w-xl lg:max-w-none">
              <InvitationFlatLay className="-mx-4 sm:mx-0 lg:py-4" />
            </div>

            {/* Mobile date-book note directly beneath the flat-lay */}
            <div className="paper-sheet mt-3 border-l-2 border-l-foil px-4 py-3 text-sm lg:hidden">
              <p className="small-caps text-xs text-primary">From the date book</p>
              <p className="mt-0.5 italic text-ink">{dateBookLine}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Something old, something new…" — Full-bleed vellum band framed by deckled cotton tears */}
      <div className="relative z-10">
        <DeckledBandDivider from="transparent" to="var(--vellum)" />
        <section
          className="vellum-band relative overflow-hidden border-t-0 border-b-0 py-14 sm:py-20"
          aria-labelledby="rhyme-heading"
        >
          <BotanicalWatermark corner="top-left" className="text-ink" />
          <BotanicalWatermark corner="bottom-right" className="text-ink" />
          <div className="wrap-narrow relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="small-caps text-sm text-primary">Four planning packages</p>
              <h2 id="rhyme-heading" className="mt-2 font-display text-3xl text-ink sm:text-4xl">
                Something old, something new…
              </h2>
            </div>
            <SiteLink href="/packages/" className="small-caps text-link text-sm">
              Compare all four packages →
            </SiteLink>
          </div>

          <ol className="mt-10 divide-y divide-foil/35 border-y border-foil/45">
            {packages.map(pkg => (
              <li key={pkg.id} className="group py-6 sm:py-7">
                <SiteLink
                  href={`/packages/#${pkg.id}`}
                  className="block no-underline hover:no-underline"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-2xl text-ink transition-colors group-hover:text-primary sm:text-3xl">
                      {pkg.rhymeLine}
                    </span>
                    <span className="dotted-leader hidden sm:block" aria-hidden="true" />
                    <span className="small-caps text-sm text-primary">{pkg.name}</span>
                    <span className="font-display text-xl text-ink sm:text-2xl">
                      from {formatUsd(pkg.priceFrom)}
                    </span>
                    {pkg.featured ? (
                      <span className="print-hide ml-1 inline-flex align-middle">
                        <WaxSeal size={42} />
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 text-base italic text-muted group-hover:text-ink">
                    {pkg.promise}
                  </p>
                </SiteLink>
              </li>
            ))}
          </ol>
        </div>
      </section>
        <DeckledBandDivider from="var(--vellum)" to="transparent" flip />
      </div>

      {/* 3. "A Saturday, ribbon-tied" — Signature silk ribbon run sheet on a cotton sheet */}
      <section className="wrap py-14 sm:py-20" aria-labelledby="saturday-heading">
        <div className="paper-sheet deckled-sheet relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
          <FoilCornerBrackets />
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-6">
            <div className="max-w-xl">
              <p className="small-caps text-sm text-primary">A sample run of day</p>
              <h2
                id="saturday-heading"
                className="mt-2 font-display text-3xl text-ink letterpress sm:text-4xl"
              >
                A Saturday, ribbon-tied
              </h2>
              <p className="mt-2 text-base italic text-muted">
                Every vendor arrival, portrait cue and sparkler match accounted for before the
                kettle boils.
              </p>
            </div>
            <SiteLink href="/timeline/" className="small-caps text-link text-sm">
              Read the eighteen-month timeline →
            </SiteLink>
          </div>

          <div className="mt-8">
            <RibbonRunSheet moments={runOfDay} variant="paper" ariaLabel="Sample Saturday run of day" />
          </div>
        </div>
      </section>

      <BotanicalSectionRule />

      {/* 4. Real weddings — Asymmetric editorial magazine spread on the desk */}
      <section className="wrap py-12 sm:py-20" aria-labelledby="real-weddings-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="small-caps text-sm text-primary">From our archives</p>
            <h2
              id="real-weddings-heading"
              className="mt-2 font-display text-3xl text-ink sm:text-4xl"
            >
              Real weddings, real Saturdays
            </h2>
          </div>
          <SiteLink href="/real-weddings/" className="small-caps text-link text-sm">
            See all six weddings →
          </SiteLink>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          {/* Lead feature left (7 cols) */}
          {leadWedding ? (
            <article className="paper-sheet stationery-lift p-6 sm:p-10 lg:col-span-7 lg:-rotate-[0.7deg]">
              <SiteLink
                href={`/real-weddings/${leadWedding.id}/`}
                className="group block no-underline hover:no-underline"
              >
                <WeddingVignette vignette={leadWedding.vignette} />
                <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-3">
                  <h3 className="script-accent text-4xl text-ink group-hover:text-primary sm:text-5xl">
                    {leadWedding.couple}
                  </h3>
                  <p className="small-caps text-xs text-muted">
                    {formatWeddingMonth(leadWedding.month)} ·{' '}
                    {settingById(leadWedding.settingId)?.label}
                  </p>
                </div>
                <p className="mt-4 text-xl italic text-ink">{leadWedding.dek}</p>
                <p className="mt-3 text-base text-muted">
                  {leadWedding.guests} guests {leadWedding.place}.
                </p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {leadWedding.palette.map(swatch => (
                      <span
                        key={swatch.name}
                        className="h-4 w-4 rounded-full border border-ink/20"
                        style={{ backgroundColor: swatch.hex }}
                        title={swatch.name}
                      />
                    ))}
                  </div>
                  <span className="small-caps text-sm text-primary group-hover:underline">
                    Open feature →
                  </span>
                </div>
              </SiteLink>
            </article>
          ) : null}

          {/* Two smaller features stacked right (5 cols) */}
          <div className="grid gap-8 lg:col-span-5 lg:mt-8">
            {sideWeddings.map((wedding, idx) => (
              <article
                key={wedding.id}
                className={`paper-sheet stationery-lift p-6 sm:p-7 ${
                  idx === 0 ? 'lg:rotate-[0.8deg]' : 'lg:-rotate-[0.5deg]'
                }`}
              >
                <SiteLink
                  href={`/real-weddings/${wedding.id}/`}
                  className="group grid items-center gap-5 no-underline hover:no-underline sm:grid-cols-12"
                >
                  <div className="sm:col-span-5">
                    <WeddingVignette vignette={wedding.vignette} className="text-ink" />
                  </div>
                  <div className="sm:col-span-7">
                    <p className="small-caps text-xs text-muted">
                      {formatWeddingMonth(wedding.month)} · {settingById(wedding.settingId)?.label}
                    </p>
                    <h3 className="script-accent mt-1 text-3xl text-ink group-hover:text-primary sm:text-4xl">
                      {wedding.couple}
                    </h3>
                    <p className="mt-2 text-base italic text-muted">{wedding.dek}</p>
                    <span className="small-caps mt-3 inline-block text-xs text-primary group-hover:underline">
                      Read story →
                    </span>
                  </div>
                </SiteLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. "The 2027 date book" — Deep-blue liner band with scalloped stationery-lace borders */}
      <div>
        <ScallopedLinerBorder position="top" outerBg="transparent" />
        <section className="liner-band py-14 sm:py-20" aria-label="The 2027 date book">
          <div className="wrap">
            <DanceCard book={dateBook} showNotes={false} showCta={true} />
          </div>
        </section>
        <ScallopedLinerBorder position="bottom" outerBg="transparent" />
      </div>

      {/* 6. "A note from the planner" — Tilted monogrammed notepaper + oversized margin numerals */}
      <section className="wrap relative py-16 sm:py-24" aria-labelledby="planner-note-heading">
        <BotanicalWatermark corner="top-right" className="text-ink" />
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Oversized Prata numerals down the margin */}
          <div className="grid grid-cols-3 gap-4 border-y border-foil/45 py-6 text-center lg:col-span-4 lg:grid-cols-1 lg:gap-8 lg:border-y-0 lg:border-r lg:py-0 lg:pr-10 lg:text-right">
            <div>
              <p className="font-display text-4xl text-primary sm:text-5xl">2014</p>
              <p className="small-caps mt-1 text-xs text-muted">Planning in Charleston since 2014</p>
            </div>
            <div>
              <p className="font-display text-4xl text-primary sm:text-5xl">22</p>
              <p className="small-caps mt-1 text-xs text-muted">Around 22 weddings a year</p>
            </div>
            <div>
              <p className="font-display text-4xl text-primary sm:text-5xl">1</p>
              <p className="small-caps mt-1 text-xs text-muted">
                One lead planner, start to finish
              </p>
            </div>
          </div>

          {/* Tilted monogrammed notepaper */}
          <div className="paper-sheet relative p-7 sm:p-12 lg:col-span-8 lg:rotate-[0.9deg]">
            <div className="flex items-start justify-between gap-4 border-b border-foil/55 pb-4">
              <div>
                <p className="small-caps text-xs text-primary">East Bay Street · Charleston</p>
                <h2 id="planner-note-heading" className="mt-1 font-display text-2xl text-ink sm:text-3xl">
                  A note from the planner
                </h2>
              </div>
              <FountainPenArt className="print-hide hidden text-ink sm:block" />
            </div>

            <div className="mt-6 space-y-4 text-lg italic leading-relaxed text-ink/90">
              <p>
                A wedding in the Lowcountry has its own weather, its own tides and its own unhurried
                rhythm. Our job is to learn yours just as well—so when the church bells ring or the
                marsh breeze picks up, you are standing with your glass raised, never checking a
                watch.
              </p>
              <p>
                We take on around twenty-two Saturdays a year with one lead planner and two
                coordinators. You will never be handed off to a stranger the month before your
                wedding, and we never accept vendor commissions—every recommendation is simply who
                we trust with your guests.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="script-accent text-4xl text-primary sm:text-5xl">Clementine Hale</p>
                <p className="small-caps mt-1 text-xs text-muted">
                  Lead planner &amp; founder · Something Blue Weddings
                </p>
              </div>
              <SiteLink href="/real-weddings/" className="small-caps text-link text-sm">
                See our recent Saturdays →
              </SiteLink>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Closing enquiry — Open envelope art */}
      <ClosingEnquiry>
        <ClosingEnquiry.Eyebrow>Start with a note</ClosingEnquiry.Eyebrow>
        <ClosingEnquiry.Heading>
          Tell us your date, and we&apos;ll tell you honestly if we can be there.
        </ClosingEnquiry.Heading>
        <ClosingEnquiry.Body>
          We reply within two working days—usually with a kettle-on time to talk in our East Bay
          Street studio or by phone.
        </ClosingEnquiry.Body>
        <ClosingEnquiry.Action>Enquire about your date</ClosingEnquiry.Action>
      </ClosingEnquiry>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
