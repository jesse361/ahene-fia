import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
};

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <path d="M32 4.5 58 32 32 59.5 6 32Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 42V30.2C20 22.8 25.4 17.5 32 17.5s12 5.3 12 12.7V42" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M24 42h16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function BrandLogo({ tone = "light", compact = false, className }: BrandLogoProps) {
  const ink = tone === "light" ? "text-ivory" : "text-midnight";
  const muted = tone === "light" ? "text-mist" : "text-charcoal/70";

  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", ink, className)} aria-label="Ahene Fia home">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/70 text-gold transition-colors group-hover:bg-gold group-hover:text-midnight">
        <BrandMark className="h-7 w-7" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] tracking-[0.14em]">AHENE FIA</span>
        {compact ? null : <span className={cn("mt-1 text-[0.62rem] uppercase tracking-[0.18em]", muted)}>Events & Conference Hub</span>}
      </span>
    </Link>
  );
}
