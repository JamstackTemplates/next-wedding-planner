import { DarkModeToggle } from 'jamstacks';
import { WaxSealMini, Wordmark } from './art/motifs';
import { SiteLink } from './site-link';

const NAV_LINKS = [
  { href: '/packages/', label: 'Packages', match: 'page' as const },
  { href: '/real-weddings/', label: 'Real weddings', match: 'section' as const },
  { href: '/timeline/', label: 'Timeline', match: 'page' as const },
];

export function SiteHeader() {
  return (
    <header className="relative z-40 bg-paper shadow-[0_6px_22px_-12px_rgba(31,42,68,0.18)]">
      <div className="wrap flex min-h-20 items-center justify-between gap-4 py-3">
        <SiteLink
          href="/"
          aria-label="Something Blue Weddings — Home"
          className="shrink-0 no-underline hover:no-underline"
        >
          <Wordmark />
        </SiteLink>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map(item => (
            <SiteLink
              key={item.href}
              href={item.href}
              markCurrent={item.match}
              className="small-caps text-base text-ink transition-colors hover:text-primary"
            >
              {item.label}
            </SiteLink>
          ))}
          <DarkModeToggle />
          <SiteLink href="/contact/" markCurrent="page" className="button">
            <WaxSealMini />
            <span>Enquire</span>
          </SiteLink>
        </nav>

        {/* Mobile folded-note disclosure menu */}
        <div className="flex items-center gap-2 md:hidden">
          <DarkModeToggle />
          <details className="mobile-note-nav relative">
            <summary className="small-caps inline-flex min-h-11 items-center gap-2 rounded-ui border border-foil/70 bg-desk/70 px-3.5 py-2 text-sm text-ink">
              <span>Menu</span>
              <span aria-hidden="true" className="text-foil">
                ▾
              </span>
            </summary>
            <nav
              aria-label="Mobile"
              className="paper-sheet absolute right-0 top-[calc(100%+0.65rem)] z-50 w-64 border-t-2 border-t-foil p-5"
            >
              <p className="small-caps border-b border-rule pb-2 text-xs text-muted">
                Invitation suite
              </p>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <SiteLink
                    href="/"
                    markCurrent="page"
                    className="small-caps block py-1 text-base text-ink"
                  >
                    Home
                  </SiteLink>
                </li>
                {NAV_LINKS.map(item => (
                  <li key={item.href}>
                    <SiteLink
                      href={item.href}
                      markCurrent={item.match}
                      className="small-caps block py-1 text-base text-ink"
                    >
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-rule pt-4">
                <SiteLink href="/contact/" className="button w-full">
                  <WaxSealMini />
                  <span>Enquire</span>
                </SiteLink>
              </div>
            </nav>
          </details>
        </div>
      </div>

      {/* Subtle deckled paper edge along the bottom of the header */}
      <svg
        viewBox="0 0 1200 10"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="print-hide block h-2.5 w-full translate-y-[1px]"
      >
        <path
          d="M0 0 H1200 V4 Q1120 9 1040 4 T880 5 T720 4 T560 6 T400 4 T240 6 T80 4 L0 5 Z"
          fill="var(--paper)"
        />
        <path
          d="M0 5 L80 4 Q160 2 240 6 T400 4 T560 6 T720 4 T880 5 T1040 4 Q1120 9 1200 4"
          fill="none"
          stroke="var(--foil)"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      </svg>
    </header>
  );
}
