import { formatGhs } from "@/lib/utils/money";
import { cn } from "@/lib/utils/cn";
import type { TicketTier } from "@/types/event";

export function TicketCard({
  tier,
  action,
}: {
  tier: TicketTier;
  action: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col border p-6 sm:p-8",
        tier.suggested ? "border-gold bg-forest text-ivory" : "border-charcoal/10 bg-white text-midnight",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="min-w-0 font-display text-3xl leading-none sm:text-4xl">{tier.name}</h3>
        {tier.suggested ? (
          <span className="border border-gold px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-gold">Suggested</span>
        ) : null}
      </div>
      <p className={cn("mt-6 font-display text-5xl", tier.suggested ? "text-gold" : "text-midnight")}>{formatGhs(tier.price.amount)}</p>
      <p className={cn("mt-2 text-xs uppercase tracking-[0.14em]", tier.suggested ? "text-mist" : "text-stone")}>
        {tier.price.currency} · Provisional demonstration price
      </p>
      <p className={cn("mt-5 text-sm leading-6", tier.suggested ? "text-mist" : "text-charcoal/80")}>{tier.eligibility}</p>
      <ul className="mt-5 flex-1 space-y-2 text-sm leading-6">
        {tier.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-2">
            <span aria-hidden="true" className="text-gold">
              —
            </span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <p className={cn("mt-5 text-xs uppercase tracking-[0.14em]", tier.suggested ? "text-gold" : "text-forest")}>
        Availability: open · inventory not tracked
      </p>
      <div className="mt-6">{action}</div>
    </article>
  );
}
