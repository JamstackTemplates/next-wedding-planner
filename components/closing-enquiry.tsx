import type { ReactNode } from 'react';
import { OpenEnvelope, WaxSealMini } from './art/motifs';
import { BotanicalWatermark, FoilCornerBrackets } from './art/section-borders';
import { SiteLink } from './site-link';

type Props = { children: ReactNode };

function ClosingEnquirySection({ children }: Props) {
  return (
    <section className="wrap py-16 sm:py-20">
      <div className="paper-sheet relative mx-auto grid max-w-4xl items-center gap-8 overflow-hidden px-6 py-10 sm:px-12 sm:py-12 md:grid-cols-12">
        <FoilCornerBrackets />
        <BotanicalWatermark corner="top-right" className="text-ink" />
        <div className="print-hide relative z-10 flex justify-center md:col-span-5">
          <OpenEnvelope className="h-auto w-56 text-ink sm:w-64" />
        </div>
        <div className="relative z-10 md:col-span-7">{children}</div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: Props) {
  return <p className="small-caps text-sm text-primary">{children}</p>;
}

function Heading({ children }: Props) {
  return <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{children}</h2>;
}

function Body({ children }: Props) {
  return <p className="mt-3 text-base italic text-muted">{children}</p>;
}

function Action({ children }: Props) {
  return (
    <div className="mt-6">
      <SiteLink href="/contact/" className="button">
        <WaxSealMini />
        <span>{children}</span>
      </SiteLink>
    </div>
  );
}

export const ClosingEnquiry = Object.assign(ClosingEnquirySection, {
  Eyebrow,
  Heading,
  Body,
  Action,
});
