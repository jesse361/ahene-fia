"use client";

import { useMemo, useState } from "react";

import { SpeakerFilters } from "@/components/speakers/SpeakerFilters";
import { SpeakerGrid } from "@/components/speakers/SpeakerGrid";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/shared/Status";
import { speakers, type SpeakerFilter } from "@/data/speakers";

export function SpeakerDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SpeakerFilter>("All");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return speakers.filter((speaker) => {
      const categoryMatch = category === "All" || speaker.category === category;
      if (!categoryMatch) return false;
      if (!needle) return true;
      const haystack = [speaker.name, speaker.organization, speaker.title, speaker.sessionTitle, speaker.expertise, speaker.category]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, category]);

  return (
    <div className="space-y-8">
      <SpeakerFilters query={query} category={category} onQuery={setQuery} onCategory={setCategory} resultCount={results.length} />
      {results.length === 0 ? (
        <EmptyState
          title="No voices match."
          body="Try another name, organisation, or topic, or return to the full demonstration lineup."
          action={
            <Button
              type="button"
              variant="forest"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <SpeakerGrid speakers={results} />
      )}
    </div>
  );
}
