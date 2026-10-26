"use client";

import { useId, useState } from "react";

import type { FaqItem } from "@/types/event";

export function FAQAccordion({ items, label = "Questions" }: { items: FaqItem[]; label?: string }) {
  const baseId = useId();
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((item) => {
        const expanded = open === item.id;
        const panelId = `${baseId}-${item.id}`;
        return (
          <div key={item.id} className="py-1">
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 py-4 text-left font-display text-2xl text-midnight"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : item.id)}
              >
                {item.question}
                <span aria-hidden="true" className="text-gold">
                  {expanded ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-label={label} hidden={!expanded} className="pb-4 pr-8 text-sm leading-7 text-charcoal/80">
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
