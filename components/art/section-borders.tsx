/**
 * Custom decorative section borders and Lowcountry botanical background ornaments
 * tailored to the cotton-paper invitation suite aesthetic.
 */

/** Organic torn cotton-rag deckled edge transitioning from `fromColor` above into `toColor` below. */
export function DeckledBandDivider({
  from = 'var(--desk)',
  to = 'var(--vellum)',
  foilRule = true,
  flip = false,
  className = '',
}: {
  from?: string;
  to?: string;
  foilRule?: boolean;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`print-hide pointer-events-none relative w-full overflow-hidden leading-none ${className}`}
      style={{ backgroundColor: from }}
    >
      <svg
        viewBox="0 0 1440 32"
        preserveAspectRatio="none"
        className={`block h-6 w-full sm:h-8 ${flip ? '-scale-x-100' : ''}`}
      >
        <path
          d="M0 18 L52 14 Q112 20 174 13 T312 17 T458 12 T604 19 T748 13 T894 18 T1042 12 T1188 19 T1334 14 L1440 17 V32 H0 Z"
          fill={to}
        />
        {foilRule ? (
          <path
            d="M0 18 L52 14 Q112 20 174 13 T312 17 T458 12 T604 19 T748 13 T894 18 T1042 12 T1188 19 T1334 14 L1440 17"
            fill="none"
            stroke="var(--foil)"
            strokeOpacity="0.52"
            strokeWidth="1.2"
          />
        ) : null}
      </svg>
    </div>
  );
}

/** Scalloped stationery-lace border with tiny gold-foil eyelets framing deep-blue liner bands. */
export function ScallopedLinerBorder({
  position = 'top',
  outerBg = 'var(--desk)',
  className = '',
}: {
  position?: 'top' | 'bottom';
  outerBg?: string;
  className?: string;
}) {
  const isBottom = position === 'bottom';
  return (
    <div
      aria-hidden="true"
      className={`print-hide pointer-events-none relative w-full overflow-hidden leading-none ${className}`}
      style={{ backgroundColor: outerBg }}
    >
      <svg
        viewBox="0 0 1440 34"
        preserveAspectRatio="none"
        className={`block h-7 w-full sm:h-8 ${isBottom ? 'rotate-180' : ''}`}
      >
        <defs>
          <pattern id={`scallop-${position}`} width="72" height="34" patternUnits="userSpaceOnUse">
            <path
              d="M0 34 V18 A36 16 0 0 1 72 18 V34 Z"
              fill="var(--deep-band)"
            />
            <path
              d="M0 18 A36 16 0 0 1 72 18"
              fill="none"
              stroke="var(--foil)"
              strokeOpacity="0.72"
              strokeWidth="1.25"
            />
            <circle cx="36" cy="18" r="2.2" fill="var(--foil)" fillOpacity="0.75" />
          </pattern>
        </defs>
        <rect width="1440" height="34" fill={`url(#scallop-${position})`} />
      </svg>
    </div>
  );
}

/** Centered botanical forget-me-not & foil-hairline section ornament divider. */
export function BotanicalSectionRule({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`print-hide wrap flex items-center justify-center gap-4 py-2 ${className}`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-foil/60 to-foil/80" />
      <svg viewBox="0 0 88 28" width="88" height="28" className="shrink-0 text-ink">
        <path
          d="M4 14 H28 M60 14 H84"
          stroke="var(--foil)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M34 14 C30 9, 24 10, 24 14 C24 18, 30 19, 34 14 Z"
          fill="var(--forget-me-not)"
          fillOpacity="0.4"
          stroke="var(--foil)"
          strokeWidth="0.9"
        />
        <path
          d="M54 14 C58 9, 64 10, 64 14 C64 18, 58 19, 54 14 Z"
          fill="var(--forget-me-not)"
          fillOpacity="0.4"
          stroke="var(--foil)"
          strokeWidth="0.9"
        />
        <g transform="translate(44 14)">
          {[0, 72, 144, 216, 288].map(deg => (
            <ellipse
              key={deg}
              cx="0"
              cy="-5.2"
              rx="2.6"
              ry="4"
              transform={`rotate(${deg})`}
              fill="var(--forget-me-not)"
              fillOpacity="0.78"
              stroke="var(--primary)"
              strokeWidth="0.85"
            />
          ))}
          <circle cx="0" cy="0" r="2.2" fill="var(--foil)" />
        </g>
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-foil/60 to-foil/80" />
    </div>
  );
}

/** Delicate copperplate live-oak & forget-me-not corner watermark for editorial background decoration. */
export function BotanicalWatermark({
  corner = 'top-right',
  className = '',
}: {
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}) {
  const posClass =
    corner === 'top-left'
      ? 'top-0 left-0'
      : corner === 'top-right'
        ? 'top-0 right-0 -scale-x-100'
        : corner === 'bottom-left'
          ? 'bottom-0 left-0 -scale-y-100'
          : 'bottom-0 right-0 -scale-x-100 -scale-y-100';

  return (
    <svg
      viewBox="0 0 260 220"
      width="260"
      height="220"
      aria-hidden="true"
      className={`print-hide pointer-events-none absolute opacity-[0.13] ${posClass} ${className}`}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        {/* Flowing Lowcountry oak & botanical branch */}
        <path d="M-8 16 C48 22, 108 52, 166 112 C192 140, 214 172, 232 204" stroke="var(--foil)" />
        <path d="M44 30 C76 16, 114 14, 154 24" />
        <path d="M98 58 C134 52, 168 60, 198 82" />
        <path d="M132 82 C112 114, 96 146, 94 184" />
        {/* Delicate leaves */}
        <path d="M76 22 C84 8, 102 6, 110 14 C100 24, 86 26, 76 22 Z" fill="var(--forget-me-not)" fillOpacity="0.28" />
        <path d="M136 60 C150 48, 168 50, 174 60 C162 68, 146 68, 136 60 Z" fill="var(--forget-me-not)" fillOpacity="0.28" />
        <path d="M112 118 C96 118, 86 130, 88 142 C102 140, 112 130, 112 118 Z" fill="var(--forget-me-not)" fillOpacity="0.28" />
        {/* Forget-me-not blossom cluster */}
        {[
          { cx: 158, cy: 26, r: 6 },
          { cx: 198, cy: 84, r: 5.5 },
          { cx: 168, cy: 116, r: 7 },
        ].map(({ cx, cy, r }) => (
          <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
            {[0, 72, 144, 216, 288].map(deg => (
              <ellipse
                key={deg}
                cx="0"
                cy={-r}
                rx={r * 0.55}
                ry={r * 0.85}
                transform={`rotate(${deg})`}
                fill="var(--forget-me-not)"
                fillOpacity="0.35"
              />
            ))}
            <circle cx="0" cy="0" r={r * 0.35} fill="var(--foil)" stroke="none" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Engraved gold-foil corner registration brackets for featured cotton stationery sheets. */
export function FoilCornerBrackets({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`print-hide pointer-events-none absolute inset-3 ${className}`}>
      <span className="absolute top-0 left-0 h-4 w-4 border-t border-l border-foil/70" />
      <span className="absolute top-0 right-0 h-4 w-4 border-t border-r border-foil/70" />
      <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-foil/70" />
      <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-foil/70" />
    </div>
  );
}
