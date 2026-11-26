import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

export function WaxSeal({
  size = 64,
  ringText = false,
  className = '',
}: {
  size?: number;
  ringText?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="sb-wax-grad" cx="36%" cy="30%" r="68%">
          <stop offset="0%" stopColor="var(--ribbon)" />
          <stop offset="52%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="#162854" />
        </radialGradient>
      </defs>
      {/* Organic drippy wax body */}
      <path
        d="M44 5c7.8 0 15.2 2.2 21.3 6.5 5.4 3.8 11.4 9 13.8 15.6 2.5 6.8 2.4 14.3 1.4 21.4-1 7.2-3.4 14.9-8.8 20-5.4 5.2-13.2 8.4-20.7 9.9-7.6 1.5-16.1 2-23.1-.9-6.9-2.8-12.7-8.2-16.6-14.9-3.9-6.7-5.7-14.7-4.5-22.4 1.1-7.6 5.1-14.8 10.6-20.3C22.8 14.5 29.7 9 37.3 6.6 39.5 5.9 41.7 5 44 5z"
        fill="url(#sb-wax-grad)"
      />
      <circle
        cx="44"
        cy="44"
        r="29"
        fill="none"
        stroke="var(--foil)"
        strokeOpacity="0.82"
        strokeWidth="1.25"
      />
      <circle
        cx="44"
        cy="44"
        r="24.5"
        fill="none"
        stroke="#FFFDF8"
        strokeOpacity="0.34"
        strokeWidth="0.9"
      />
      <text
        x="44"
        y={ringText ? '48' : '52'}
        textAnchor="middle"
        fill="#FFFDF8"
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: ringText ? '25px' : '29px',
        }}
      >
        SB
      </text>
      {ringText ? (
        <text
          x="44"
          y="63"
          textAnchor="middle"
          fill="#F5EBD6"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '7.5px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          Something blue
        </text>
      ) : null}
    </svg>
  );
}

export function WaxSealMini({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 28 28"
      aria-hidden="true"
      className={`seal-press shrink-0 ${className}`}
    >
      <path
        d="M14 2c3 0 5.9 1 8 2.8 2 1.7 3.7 4 4.1 6.7.4 2.8-.2 5.9-1.8 8.3-1.6 2.4-4.2 4.3-7.1 5-2.8.7-6 .5-8.5-.9-2.5-1.3-4.5-3.7-5.5-6.5-1-2.7-.9-5.9.5-8.5C5.1 6.3 7.6 4.1 10.4 2.9 11.5 2.4 12.7 2 14 2z"
        fill="var(--foil)"
        fillOpacity="0.92"
      />
      <circle cx="14" cy="14" r="8.8" fill="none" stroke="var(--primary)" strokeWidth="0.9" />
      <text
        x="14"
        y="17.5"
        textAnchor="middle"
        fill="#1E2C52"
        style={{ fontFamily: 'var(--font-display)', fontSize: '9px' }}
      >
        SB
      </text>
    </svg>
  );
}

export function SilkBow({
  width = 40,
  height = 28,
  filled = false,
  className = '',
}: {
  width?: number;
  height?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 34"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M24 16 C17 7, 5 6, 4 14 C3 21, 15 21, 24 16 Z"
        fill={filled ? 'var(--ribbon)' : 'var(--forget-me-not)'}
        fillOpacity={filled ? 0.92 : 0.42}
        stroke="var(--ribbon)"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M24 16 C31 7, 43 6, 44 14 C45 21, 33 21, 24 16 Z"
        fill={filled ? 'var(--ribbon)' : 'var(--forget-me-not)'}
        fillOpacity={filled ? 0.92 : 0.42}
        stroke="var(--ribbon)"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M22 17 C18 23, 13 28, 9 32 M26 17 C30 23, 35 28, 39 32"
        fill="none"
        stroke="var(--ribbon)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse
        cx="24"
        cy="16"
        rx="3.4"
        ry="2.8"
        fill="var(--primary)"
        stroke="var(--foil)"
        strokeWidth="0.9"
      />
    </svg>
  );
}

export function ForgetMeNotSprig({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 42"
      width="220"
      height="42"
      aria-hidden="true"
      className={className}
    >
      {/* Delicate curving stem */}
      <path
        d="M12 24 C56 26, 86 16, 110 21 C134 26, 166 17, 208 22"
        fill="none"
        stroke="var(--foil)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M66 21 C60 13, 51 11, 46 15 C52 20, 60 22, 66 21 Z"
        fill="var(--forget-me-not)"
        fillOpacity="0.32"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      <path
        d="M154 21 C160 13, 169 11, 174 15 C168 20, 160 22, 154 21 Z"
        fill="var(--forget-me-not)"
        fillOpacity="0.32"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      {/* Three forget-me-not blossoms */}
      {[
        { cx: 88, cy: 19, r: 4.5 },
        { cx: 110, cy: 21, r: 5.8 },
        { cx: 132, cy: 20, r: 4.5 },
      ].map(({ cx, cy, r }) => (
        <g key={cx} transform={`translate(${cx} ${cy})`}>
          {[0, 72, 144, 216, 288].map(deg => (
            <ellipse
              key={deg}
              cx="0"
              cy={-r * 1.05}
              rx={r * 0.62}
              ry={r * 0.85}
              transform={`rotate(${deg})`}
              fill="var(--forget-me-not)"
              fillOpacity="0.65"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
          <circle cx="0" cy="0" r={r * 0.42} fill="var(--foil)" />
        </g>
      ))}
    </svg>
  );
}

export function OpenEnvelope({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 180"
      aria-hidden="true"
      className={className}
    >
      {/* Back flap with forget-me-not liner */}
      <path
        d="M22 68 L140 12 L258 68 Z"
        fill="var(--deep-band)"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      {/* Subtle botanical marks on liner */}
      <g stroke="var(--forget-me-not)" strokeOpacity="0.55" fill="none" strokeWidth="1">
        <circle cx="140" cy="40" r="6" />
        <circle cx="114" cy="52" r="4.5" />
        <circle cx="166" cy="52" r="4.5" />
        <circle cx="140" cy="40" r="1.8" fill="var(--foil)" stroke="none" />
        <circle cx="114" cy="52" r="1.4" fill="var(--foil)" stroke="none" />
        <circle cx="166" cy="52" r="1.4" fill="var(--foil)" stroke="none" />
      </g>
      {/* Protruding cotton card */}
      <rect
        x="48"
        y="46"
        width="184"
        height="92"
        rx="2"
        fill="var(--paper)"
        stroke="var(--foil)"
        strokeWidth="1.15"
      />
      <line x1="78" y1="68" x2="202" y2="68" stroke="var(--rule)" strokeWidth="1" />
      <line x1="94" y1="82" x2="186" y2="82" stroke="var(--rule)" strokeWidth="1" />
      {/* Envelope body front */}
      <path
        d="M22 68 L22 162 L258 162 L258 68 L140 126 Z"
        fill="var(--vellum)"
        fillOpacity="0.92"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      {/* Inner fold lines */}
      <path
        d="M22 162 L106 108 M258 162 L174 108"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.1"
      />
      {/* Wax seal resting at fold */}
      <circle cx="140" cy="124" r="15" fill="var(--primary)" />
      <circle cx="140" cy="124" r="11.5" fill="none" stroke="var(--foil)" strokeWidth="0.9" />
      <text
        x="140"
        y="128"
        textAnchor="middle"
        fill="#FFFDF8"
        style={{ fontFamily: 'var(--font-display)', fontSize: '10px' }}
      >
        SB
      </text>
    </svg>
  );
}

export function PalmettoStamp({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 68 80" width="68" height="80" aria-hidden="true" className={className}>
      <rect
        x="4"
        y="4"
        width="60"
        height="72"
        fill="var(--paper)"
        stroke="var(--foil)"
        strokeWidth="1.2"
        strokeDasharray="3 2.5"
      />
      <rect x="9" y="9" width="50" height="62" fill="var(--vellum)" fillOpacity="0.65" stroke="var(--primary)" strokeWidth="1" />
      {/* Crescent & Palmetto */}
      <path
        d="M21 20 A6 6 0 1 0 21 28 A4.5 4.5 0 1 1 21 20 Z"
        fill="var(--primary)"
      />
      <path
        d="M36 62 C36 52, 35 44, 36 34"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M36 34 C29 29, 24 31, 20 35 M36 34 C30 25, 25 24, 21 26 M36 34 C35 24, 37 21, 40 20 M36 34 C43 26, 48 27, 51 31 M36 34 C44 31, 49 34, 52 38"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <text
        x="34"
        y="68"
        textAnchor="middle"
        fill="var(--primary)"
        style={{ fontFamily: 'var(--font-body)', fontSize: '6.5px', letterSpacing: '0.12em' }}
      >
        CHARLESTON
      </text>
    </svg>
  );
}

export function FountainPenArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 52" width="140" height="52" aria-hidden="true" className={className}>
      <path
        d="M12 40 L92 14 L104 20 L24 46 Z"
        fill="var(--deep-band)"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M92 14 L126 6 L104 20 Z"
        fill="var(--foil)"
        fillOpacity="0.82"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <line x1="108" y1="12" x2="124" y2="7" stroke="currentColor" strokeWidth="1" />
      <circle cx="107" cy="13" r="1.4" fill="var(--paper)" />
      <line x1="78" y1="18" x2="88" y2="24" stroke="var(--foil)" strokeWidth="1.5" />
    </svg>
  );
}

export function EmptyAisleArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 220" aria-hidden="true" className={className}>
      {/* Aisle runner */}
      <path
        d="M150 206 L192 54 L228 54 L270 206 Z"
        fill="var(--vellum)"
        fillOpacity="0.7"
        stroke="var(--foil)"
        strokeWidth="1.15"
      />
      {/* Left chairs */}
      {[0, 1, 2].map(i => {
        const x = 66 + i * 32;
        const y = 148 - i * 26;
        const scale = 1 - i * 0.14;
        return (
          <g key={`l-${i}`} transform={`translate(${x} ${y}) scale(${scale})`} stroke="currentColor" fill="none" strokeWidth="1.35">
            <rect x="0" y="0" width="38" height="28" rx="2" fill="var(--paper)" />
            <line x1="6" y1="0" x2="6" y2="48" />
            <line x1="32" y1="0" x2="32" y2="48" />
            <line x1="0" y1="28" x2="38" y2="28" />
            {/* Ribbon bow tied to aisle side */}
            <path d="M38 12 C46 7, 50 14, 38 16 C45 20, 44 27, 42 32" stroke="var(--ribbon)" strokeWidth="1.5" />
          </g>
        );
      })}
      {/* Right chairs */}
      {[0, 1, 2].map(i => {
        const x = 316 - i * 32;
        const y = 148 - i * 26;
        const scale = 1 - i * 0.14;
        return (
          <g key={`r-${i}`} transform={`translate(${x} ${y}) scale(${scale})`} stroke="currentColor" fill="none" strokeWidth="1.35">
            <rect x="0" y="0" width="38" height="28" rx="2" fill="var(--paper)" />
            <line x1="6" y1="0" x2="6" y2="48" />
            <line x1="32" y1="0" x2="32" y2="48" />
            <line x1="0" y1="28" x2="38" y2="28" />
            <path d="M0 12 C-8 7, -12 14, 0 16 C-7 20, -6 27, -4 32" stroke="var(--ribbon)" strokeWidth="1.5" />
          </g>
        );
      })}
      {/* Distant oak arch */}
      <path
        d="M168 62 C172 20, 248 20, 252 62"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1.4"
      />
      {/* Dropped velvet ring box in aisle */}
      <g transform="translate(194 156) rotate(-14)">
        <rect x="0" y="6" width="22" height="14" rx="2" fill="var(--primary)" stroke="currentColor" strokeWidth="1.2" />
        <path d="M0 6 L11 -2 L22 6 Z" fill="var(--deep-band)" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="11" cy="8" r="3.6" fill="none" stroke="var(--foil)" strokeWidth="1.4" />
      </g>
      {/* Single fallen petal */}
      <path
        d="M236 178 C242 172, 252 174, 250 181 C246 186, 236 184, 236 178 Z"
        fill="var(--blush)"
        stroke="var(--foil)"
        strokeWidth="1"
      />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex flex-col leading-none select-none">
      <span className="inline-flex items-center gap-1.5">
        <span
          className={`font-display tracking-wide text-ink ${compact ? 'text-lg' : 'text-xl sm:text-2xl'}`}
          style={{ fontVariantCaps: 'small-caps' }}
        >
          Something Blue
        </span>
        <SilkBow width={24} height={17} className="shrink-0 -mt-0.5" />
      </span>
      <span className="mt-1 flex items-center gap-2">
        <span className="h-px flex-1 bg-foil/75" aria-hidden="true" />
        <span className="small-caps text-[0.72rem] text-muted">Weddings</span>
        <span className="h-px flex-1 bg-foil/75" aria-hidden="true" />
      </span>
    </span>
  );
}

export type LineIconName =
  | 'ring'
  | 'champagne'
  | 'envelope'
  | 'clock'
  | 'bow'
  | 'calendar'
  | 'map-pin'
  | 'phone'
  | 'umbrella'
  | 'guests';

export function LineIcon({ name, className = 'h-5 w-5', ...rest }: IconProps & { name: LineIconName }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    className,
    ...rest,
  };

  switch (name) {
    case 'ring':
      return (
        <svg {...common}>
          <circle cx="12" cy="14" r="6.5" />
          <path d="M9.5 6.5 L12 4 L14.5 6.5 L12 8.5 Z" />
        </svg>
      );
    case 'champagne':
      return (
        <svg {...common}>
          <path d="M7 4 L5.5 11 C5.2 13 6.8 14.5 8.5 14.5 C10.2 14.5 11.4 13 11 11 L10 4 Z" />
          <path d="M8.5 14.5 V20 M6 20 H11" />
          <path d="M14 4 L13 11 C12.6 13 13.8 14.5 15.5 14.5 C17.2 14.5 18.8 13 18.5 11 L17 4 Z" />
          <path d="M15.5 14.5 V20 M13 20 H18" />
        </svg>
      );
    case 'envelope':
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="1.5" />
          <path d="M3.5 6.5 L12 13 L20.5 6.5" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5 V12 L15 14" />
        </svg>
      );
    case 'bow':
      return (
        <svg {...common}>
          <path d="M12 11 C8 6, 3 7, 3.5 11 C4 14.5, 9 14, 12 11 Z" />
          <path d="M12 11 C16 6, 21 7, 20.5 11 C20 14.5, 15 14, 12 11 Z" />
          <path d="M11 12.5 L7.5 19 M13 12.5 L16.5 19" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
          <path d="M3.5 9.5 H20.5 M8 3 V6.5 M16 3 V6.5" />
        </svg>
      );
    case 'map-pin':
      return (
        <svg {...common}>
          <path d="M12 20.5 C12 20.5 18 14.8 18 10 A6 6 0 1 0 6 10 C6 14.8 12 20.5 12 20.5 Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <path d="M6.5 4.5 H9.5 L11 8.5 L9 10 C10 12.2 11.8 14 14 15 L15.5 13 L19.5 14.5 V17.5 C19.5 18.8 18.4 19.8 17.1 19.6 C10.4 18.8 5.2 13.6 4.4 6.9 C4.2 5.6 5.2 4.5 6.5 4.5 Z" />
        </svg>
      );
    case 'umbrella':
      return (
        <svg {...common}>
          <path d="M3.5 12.5 A8.5 8.5 0 0 1 20.5 12.5 Z" />
          <path d="M12 4 V18.5 A2 2 0 0 1 8 18.5" />
        </svg>
      );
    case 'guests':
      return (
        <svg {...common}>
          <circle cx="9" cy="8.5" r="3" />
          <path d="M3.5 19 C3.8 15.5 6 14 9 14 C12 14 14.2 15.5 14.5 19" />
          <circle cx="16.5" cy="9.5" r="2.3" />
          <path d="M15.5 14.3 C18 14.6 20 16 20.5 19" />
        </svg>
      );
  }
}
