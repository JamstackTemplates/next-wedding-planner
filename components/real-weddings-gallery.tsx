'use client';

import { useEffect, useState } from 'react';
import { formatWeddingMonth, realWeddings } from '../content/real-weddings';
import { settingById, settings } from '../content/settings';
import { WeddingVignette } from './art/vignettes';
import { SiteLink } from './site-link';

/**
 * Real weddings index with progressive-enhancement setting filter chips (styled as place cards)
 * and an asymmetric editorial contact sheet of six deckled oval vignettes.
 */
export function RealWeddingsGallery() {
  const [mounted, setMounted] = useState(false);
  const [activeSetting, setActiveSetting] = useState<string>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered =
    activeSetting === 'all'
      ? realWeddings
      : realWeddings.filter(w => w.settingId === activeSetting);

  const activeLabel =
    activeSetting === 'all'
      ? 'all settings'
      : settingById(activeSetting)?.label ?? activeSetting;

  const liveAnnouncement =
    activeSetting === 'all'
      ? `Showing all ${filtered.length} weddings`
      : `Showing ${filtered.length} ${filtered.length === 1 ? 'wedding' : 'weddings'} at ${activeLabel}`;

  return (
    <section className="wrap py-12 sm:py-16" aria-label="Real weddings">
      {/* Setting filter chips: hidden without JavaScript so all six weddings remain visible */}
      {mounted ? (
        <div className="mb-12 flex flex-col items-center">
          <div
            role="group"
            aria-label="Filter weddings by setting"
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              type="button"
              aria-pressed={activeSetting === 'all'}
              onClick={() => setActiveSetting('all')}
              className={`small-caps min-h-11 border px-4 py-2 text-sm transition-colors ${
                activeSetting === 'all'
                  ? 'border-primary bg-primary text-on-primary shadow-sm'
                  : 'border-foil/70 bg-paper text-ink hover:border-primary hover:bg-vellum'
              }`}
            >
              All ({realWeddings.length})
            </button>
            {settings.map(setting => {
              const pressed = activeSetting === setting.id;
              return (
                <button
                  key={setting.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setActiveSetting(setting.id)}
                  className={`small-caps min-h-11 border px-4 py-2 text-sm transition-colors ${
                    pressed
                      ? 'border-primary bg-primary text-on-primary shadow-sm'
                      : 'border-foil/70 bg-paper text-ink hover:border-primary hover:bg-vellum'
                  }`}
                >
                  {setting.label}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-sm italic text-muted" role="status" aria-live="polite">
            {liveAnnouncement}
          </p>
        </div>
      ) : null}

      {/* Editorial contact sheet: uneven sizes (2 large, 4 small, alternating sides) */}
      <div className="grid gap-10 md:grid-cols-12 md:gap-y-16">
        {filtered.map((wedding, index) => {
          const isLarge = index === 0 || index === 3;
          const settingLabel = settingById(wedding.settingId)?.label ?? wedding.settingId;
          const colSpan = isLarge
            ? index === 0
              ? 'md:col-span-7'
              : 'md:col-span-7 md:col-start-6'
            : index === 1
              ? 'md:col-span-5 md:mt-10'
              : index === 2
                ? 'md:col-span-5'
                : index === 4
                  ? 'md:col-span-5'
                  : 'md:col-span-7 md:mt-8';

          const tilt = index % 2 === 0 ? 'md:-rotate-[0.6deg]' : 'md:rotate-[0.6deg]';

          return (
            <article
              key={wedding.id}
              className={`paper-sheet stationery-lift flex flex-col p-6 sm:p-8 ${colSpan} ${tilt}`}
            >
              <SiteLink
                href={`/real-weddings/${wedding.id}/`}
                className="group block no-underline hover:no-underline"
              >
                <WeddingVignette vignette={wedding.vignette} />

                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-3">
                  <h2 className="script-accent text-4xl text-ink group-hover:text-primary sm:text-5xl">
                    {wedding.couple}
                  </h2>
                  <p className="small-caps text-xs text-muted">
                    {formatWeddingMonth(wedding.month)} · {settingLabel}
                  </p>
                </div>

                <p className="mt-3 text-lg italic text-ink/90">{wedding.dek}</p>

                {/* Three-swatch palette strip */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2" aria-label="Wedding colour palette">
                    {wedding.palette.map(swatch => (
                      <span
                        key={swatch.name}
                        className="inline-flex items-center gap-1.5 text-xs text-muted"
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-ink/20"
                          style={{ backgroundColor: swatch.hex }}
                          aria-hidden="true"
                        />
                        <span>{swatch.name}</span>
                      </span>
                    ))}
                  </div>
                  <span className="small-caps text-sm text-primary group-hover:underline">
                    Read feature →
                  </span>
                </div>
              </SiteLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}
