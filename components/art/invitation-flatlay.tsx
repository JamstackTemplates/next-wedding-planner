import { asset } from '../../lib/paths';

/**
 * Editorial overhead flat-lay of the Something Blue Weddings cotton-paper invitation suite.
 * Swaps cleanly between light ("Morning of") and dark ("After the last dance") themes
 * via CSS (.hero-art-light / .hero-art-dark) so both OS media dark and DarkModeToggle work
 * without layout shift or client-side hydration flicker.
 */
export function InvitationFlatLay({ className = '' }: { className?: string }) {
  const alt =
    'Overhead flat-lay of a deckled cotton-paper wedding invitation tied with a Delft-blue silk ribbon and SB wax seal, accompanied by a forget-me-not lined envelope, Charleston palmetto RSVP card, gold ring and fountain pen.';

  return (
    <div className={`hero-flatlay-scene relative select-none ${className}`}>
      <div className="hero-art-blend relative overflow-hidden">
        <img
          src={asset('/images/hero-flatlay-light.jpg')}
          alt={alt}
          width={2000}
          height={1493}
          fetchPriority="high"
          decoding="async"
          className="hero-art-light h-auto w-full object-cover"
        />
        <img
          src={asset('/images/hero-flatlay-dark.jpg')}
          alt={alt}
          width={2000}
          height={1493}
          fetchPriority="high"
          decoding="async"
          className="hero-art-dark h-auto w-full object-cover"
        />
      </div>
    </div>
  );
}
