import { addOns } from '../content/add-ons';
import { inclusions } from '../content/inclusions';
import {
  availabilityLabel,
  formatUsd,
  packageById,
  packages,
  type Package,
} from '../content/packages';
import { LineIcon, PalmettoStamp, SilkBow, WaxSeal, WaxSealMini } from './art/motifs';
import { BotanicalWatermark, DeckledBandDivider, FoilCornerBrackets } from './art/section-borders';
import { SiteLink } from './site-link';

const inclusionLabelById = new Map(inclusions.map(item => [item.id, item.label]));

/**
 * Four distinct wedding stationery objects laid out on the planner's desk:
 * - Something Old: deckled antique card with palmetto stamp
 * - Something Borrowed: luggage-style tag tied with ribbon
 * - Something New: crisp letterpress card with foil border
 * - Something Blue: full invitation emerging from a lined envelope with the wax seal
 */
export function PackageStationerySuite() {
  return (
    <section className="wrap py-14 sm:py-20" aria-label="Planning packages">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-y-16">
        {packages.map(pkg => (
          <PackagePiece key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}

function PackagePiece({ pkg }: { pkg: Package }) {
  const availability = availabilityLabel(pkg.availability);
  const stampStyle =
    pkg.availability === 'open'
      ? 'border-primary/45 text-primary bg-vellum/70'
      : pkg.availability === 'limited'
        ? 'border-foil text-ink bg-blush/55'
        : 'border-muted text-muted bg-desk';

  const meta = (
    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 border-y border-rule py-4 text-sm sm:grid-cols-4">
      <div>
        <dt className="small-caps text-xs text-muted">Guests</dt>
        <dd className="font-display text-base text-ink">
          {pkg.guests.min}–{pkg.guests.max}
        </dd>
      </div>
      <div>
        <dt className="small-caps text-xs text-muted">Start window</dt>
        <dd className="font-display text-base text-ink">
          {pkg.leadMonths.min}–{pkg.leadMonths.max} mos
        </dd>
      </div>
      <div>
        <dt className="small-caps text-xs text-muted">Meetings</dt>
        <dd className="font-display text-base text-ink">{pkg.meetings} included</dd>
      </div>
      <div>
        <dt className="small-caps text-xs text-muted">On the day</dt>
        <dd className="font-display text-base text-ink">{pkg.hoursOnTheDay} hrs</dd>
      </div>
    </dl>
  );

  const body = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="small-caps text-xs text-primary">{pkg.rhymeLine}</p>
          <h2 className="mt-1 font-display text-3xl text-ink letterpress">{pkg.name}</h2>
        </div>
        <div className="text-right">
          <p className="small-caps text-xs text-muted">From</p>
          <p className="font-display text-3xl text-primary">{formatUsd(pkg.priceFrom)}</p>
        </div>
      </div>

      <p className="mt-3 text-lg italic text-ink">{pkg.promise}</p>
      <p className="mt-3 text-base text-muted">{pkg.summary}</p>

      {meta}

      <p className="mt-4 text-sm text-ink">
        <span className="small-caps mr-2 text-xs text-primary">Best for</span>
        <span className="italic">{pkg.bestFor}</span>
      </p>

      <ul className="mt-4 grid gap-1.5 text-sm text-ink sm:grid-cols-2">
        {pkg.includes.map(id => (
          <li key={id} className="flex items-start gap-2">
            <SilkBow width={16} height={12} filled className="mt-1 shrink-0" />
            <span>{inclusionLabelById.get(id) ?? id}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
        <span className={`small-caps inline-block border px-3 py-1 text-xs ${stampStyle}`}>
          {availability}
        </span>
        <SiteLink href="/contact/" className="button">
          <WaxSealMini />
          <span>Enquire about {pkg.name}</span>
        </SiteLink>
      </div>
    </>
  );

  // 1. Something Old — deckled antique card with palmetto postage stamp
  if (pkg.id === 'something-old') {
    return (
      <article
        id={pkg.id}
        className="paper-sheet deckled-sheet stationery-lift relative p-7 sm:p-10 lg:col-span-6 lg:-rotate-[0.9deg]"
      >
        <div className="print-hide float-right ml-4 mb-2 hidden sm:block">
          <PalmettoStamp />
        </div>
        {body}
      </article>
    );
  }

  // 2. Something Borrowed — luggage-style tag with grommet & tied silk ribbon
  if (pkg.id === 'something-borrowed') {
    return (
      <article
        id={pkg.id}
        className="paper-sheet stationery-lift relative rounded-t-3xl border-t-4 border-t-ribbon p-7 pt-12 sm:p-10 sm:pt-14 lg:col-span-6 lg:mt-8 lg:rotate-[0.9deg]"
      >
        {/* Grommet hole & silk ribbon tie at top centre */}
        <div
          aria-hidden="true"
          className="print-hide absolute left-1/2 top-3 flex -translate-x-1/2 flex-col items-center"
        >
          <span className="h-4 w-4 rounded-full border-2 border-foil bg-desk shadow-inner" />
          <SilkBow width={36} height={24} filled className="-mt-1" />
        </div>
        {body}
      </article>
    );
  }

  // 3. Something New — crisp double-foil letterpress card
  if (pkg.id === 'something-new') {
    return (
      <article
        id={pkg.id}
        className="paper-sheet stationery-lift relative p-4 sm:p-5 lg:col-span-5 lg:-rotate-[0.6deg]"
      >
        <div className="border border-foil/75 p-5 sm:p-7">
          <div className="border border-rule/80 p-4 sm:p-6">{body}</div>
        </div>
      </article>
    );
  }

  // 4. Something Blue — full invitation emerging from a lined envelope with the wax seal
  return (
    <article
      id={pkg.id}
      className="stationery-lift relative lg:col-span-7 lg:mt-4 lg:rotate-[0.5deg]"
    >
      {/* Lined envelope lip behind the invitation */}
      <div className="liner-band rounded-t-sm border border-foil/60 px-6 pt-5 pb-3 text-center">
        <p className="small-caps text-xs text-foil">Our signature full-planning suite</p>
      </div>
      <div className="paper-sheet relative border-t-0 p-7 sm:p-10">
        <FoilCornerBrackets />
        {/* Wax seal resting on the upper-right edge */}
        <div className="print-hide absolute -top-8 right-5 hidden sm:block">
          <WaxSeal size={78} ringText />
        </div>
        {body}
      </div>
    </article>
  );
}

/**
 * Semantic comparison table styled like a printed reply card (modern-web-guidance: responsive-table).
 * Sticky headers on desktop; clean stacked list per package on small viewports.
 */
export function ComparisonTable() {
  return (
    <div>
      <DeckledBandDivider from="transparent" to="var(--vellum)" />
      <section
        className="vellum-band relative overflow-hidden border-t-0 border-b-0 py-14 sm:py-20"
        aria-labelledby="side-by-side-heading"
      >
        <BotanicalWatermark corner="top-left" className="text-ink" />
        <BotanicalWatermark corner="bottom-right" className="text-ink" />
        <div className="wrap relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="small-caps text-sm text-primary">Printed reply card</p>
            <h2 id="side-by-side-heading" className="mt-2 font-display text-3xl text-ink sm:text-4xl">
              Side by side
            </h2>
            <p className="mt-3 text-base italic text-muted">
              Every package includes a written rain plan and our team on the day.
            </p>
          </div>

          {/* Desktop semantic table */}
          <div
            tabIndex={0}
            role="region"
            aria-labelledby="side-by-side-heading"
            className="reply-table-wrapper paper-sheet stamp-frame mt-10 hidden p-7 md:block"
          >
          <table className="reply-table text-sm">
            <caption className="sr-only">
              Comparison of what each Something Blue Weddings package includes
            </caption>
            <thead>
              <tr>
                <th scope="col" className="py-4 pr-6 text-left small-caps text-xs text-muted">
                  What is included
                </th>
                {packages.map(pkg => (
                  <th key={pkg.id} scope="col" className="px-4 py-4 text-center">
                    <span className="block font-display text-base text-ink">{pkg.name}</span>
                    <span className="small-caps mt-0.5 block text-xs text-primary">
                      From {formatUsd(pkg.priceFrom)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inclusions.map(row => (
                <tr key={row.id} className="border-b border-rule/70">
                  <th scope="row" className="border-b border-rule/70 py-3.5 pr-6 text-ink">
                    {row.label}
                  </th>
                  {packages.map(pkg => {
                    const has = pkg.includes.includes(row.id);
                    return (
                      <td
                        key={`${row.id}-${pkg.id}`}
                        className="border-b border-rule/70 px-4 py-3.5 text-center"
                      >
                        {has ? (
                          <span className="inline-flex items-center justify-center">
                            <SilkBow width={22} height={15} filled />
                            <span className="sr-only">Included in {pkg.name}</span>
                          </span>
                        ) : (
                          <span className="text-muted/60" aria-label={`Not included in ${pkg.name}`}>
                            —
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked list per package */}
        <div className="mt-8 space-y-6 md:hidden">
          {packages.map(pkg => (
            <div key={`m-${pkg.id}`} className="paper-sheet p-5">
              <div className="flex items-baseline justify-between border-b border-foil/60 pb-2">
                <h3 className="font-display text-xl text-ink">{pkg.name}</h3>
                <span className="small-caps text-sm text-primary">
                  From {formatUsd(pkg.priceFrom)}
                </span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-ink">
                {pkg.includes.map(id => (
                  <li key={id} className="flex items-start gap-2">
                    <SilkBow width={16} height={12} filled className="mt-1 shrink-0" />
                    <span>{inclusionLabelById.get(id) ?? id}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
      <DeckledBandDivider from="var(--vellum)" to="transparent" flip />
    </div>
  );
}

/** Add-ons presented as small enclosure cards tucked behind a vellum band. */
export function EnclosureAddOns() {
  return (
    <section className="wrap py-14 sm:py-20" aria-labelledby="enclosures-heading">
      <div className="mx-auto max-w-2xl text-center">
        <p className="small-caps text-sm text-primary">Optional additions</p>
        <h2 id="enclosures-heading" className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          Enclosures
        </h2>
        <p className="mt-3 text-base italic text-muted">
          Tuck any of these into your planning suite for the surrounding weekend.
        </p>
      </div>

      <div className="relative mt-10">
        {/* Translucent vellum belly band spanning behind the enclosure cards */}
        <div
          aria-hidden="true"
          className="print-hide pointer-events-none absolute inset-x-0 top-1/2 hidden h-24 -translate-y-1/2 border-y border-foil/45 bg-vellum/75 lg:block"
        />

        <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {addOns.map((item, idx) => {
            const pairNames = item.packageIds
              .map(id => packageById(id)?.name.replace(/^Something\s+/i, '') ?? id)
              .join(' · ');

            return (
              <article
                key={item.id}
                className={`paper-sheet stationery-lift flex flex-col justify-between p-5 ${
                  idx % 2 === 0 ? 'lg:-translate-y-2' : 'lg:translate-y-2'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-foil">
                    <LineIcon name="envelope" className="h-4 w-4" />
                    <span className="font-display text-lg text-primary">
                      From {formatUsd(item.priceFrom)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg leading-snug text-ink">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
                <p className="mt-4 border-t border-rule pt-3 text-xs text-muted">
                  <span className="small-caps mr-1 text-primary">Pairs with</span>
                  {pairNames}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
