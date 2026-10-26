"use client";

import { Search } from "lucide-react";

import { speakerCategories, type SpeakerFilter } from "@/data/speakers";
import { cn } from "@/lib/utils/cn";

type SpeakerFiltersProps = {
  query: string;
  category: SpeakerFilter;
  onQuery: (value: string) => void;
  onCategory: (value: SpeakerFilter) => void;
  resultCount: number;
};

export function SpeakerFilters({ query, category, onQuery, onCategory, resultCount }: SpeakerFiltersProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <label htmlFor="speaker-search" className="sr-only">
          Search speakers by name, organisation, or topic
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone" aria-hidden="true" />
        <input
          id="speaker-search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Search by name, organisation, or topic"
          className="h-12 w-full border border-charcoal/15 bg-white pr-4 pl-11 text-sm text-midnight outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Speaker categories">
        {speakerCategories.map((item) => {
          const selected = item === category;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => onCategory(item)}
              className={cn(
                "h-10 rounded-full border px-4 text-sm",
                selected ? "border-midnight bg-midnight text-ivory" : "border-charcoal/15 bg-white text-charcoal hover:border-gold",
              )}
            >
              {item === "All" ? "All Speakers" : item}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-charcoal/70" aria-live="polite">
        {resultCount} {resultCount === 1 ? "speaker" : "speakers"}
      </p>
    </div>
  );
}
