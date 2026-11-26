import type { VignetteKey } from '../../content/real-weddings';
import { asset } from '../../lib/paths';

const VIGNETTE_META: Record<VignetteKey, { src: string; alt: string }> = {
  oaks: {
    src: '/images/wedding-oaks.jpg',
    alt: 'Candlelit banquet table with a cornflower-blue silk runner and white garden roses beneath Spanish-moss-draped live oaks on Johns Island',
  },
  dunes: {
    src: '/images/wedding-dunes.jpg',
    alt: 'Wooden boardwalk curving through Folly Beach sea oats toward a cedar beach house porch with bistro lights and a sea-glass blue reception table',
  },
  steeple: {
    src: '/images/wedding-steeple.jpg',
    alt: 'Historic downtown Charleston walled brick courtyard with marigold and jasmine archway, wrought-iron gate, white church steeple and midnight-blue table linens',
  },
  lighthouse: {
    src: '/images/wedding-lighthouse.jpg',
    alt: 'Winter sunrise elopement bench on Charleston dunes with folded navy wool blankets, bouquet and brass thermos overlooking Morris Island Lighthouse',
  },
  rooftop: {
    src: '/images/wedding-rooftop.jpg',
    alt: 'Twilight rooftop wedding reception above King Street under string lights with Charleston church steeples on the skyline and indigo and persimmon table settings',
  },
  shed: {
    src: '/images/wedding-shed.jpg',
    alt: 'Weathered timber riverside packing shed on Wadmalaw Island at dusk with open barn doors revealing candlelit pecan-wood farm tables by the marsh',
  },
};

/**
 * Editorial fine-art photograph of each Lowcountry real wedding, presented in a cotton-paper mat
 * with a fine gold-foil hairline frame and subtle dark-mode warmth.
 */
export function WeddingVignette({
  vignette,
  priority = false,
  className = '',
}: {
  vignette: VignetteKey;
  priority?: boolean;
  className?: string;
}) {
  const { src, alt } = VIGNETTE_META[vignette];

  return (
    <figure
      className={`relative overflow-hidden border border-foil/65 bg-desk/60 p-2 shadow-[0_8px_22px_-12px_rgba(31,42,68,0.28)] ${className}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-ink/15">
        <img
          src={asset(src)}
          alt={alt}
          width={1200}
          height={896}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:brightness-[0.94] dark:contrast-[1.03]"
        />
      </div>
    </figure>
  );
}
