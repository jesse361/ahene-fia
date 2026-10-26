"use client";

import { useRef } from "react";

import { scheduleDays } from "@/data/schedule";
import { formatCalendarDate } from "@/lib/utils/dates";
import { cn } from "@/lib/utils/cn";

type DaySelectorProps = {
  dayId: (typeof scheduleDays)[number]["id"];
  onChange: (dayId: (typeof scheduleDays)[number]["id"]) => void;
};

export function DaySelector({ dayId, onChange }: DaySelectorProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function moveTo(index: number) {
    onChange(scheduleDays[index].id);
    refs.current[index]?.focus();
  }

  return (
    <div role="tablist" aria-label="Programme days" className="grid gap-3 sm:grid-cols-2">
      {scheduleDays.map((day, index) => {
        const selected = day.id === dayId;
        return (
          <button
            key={day.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`tab-${day.id}`}
            aria-selected={selected}
            aria-controls={`panel-${day.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(day.id)}
            onKeyDown={(event) => {
              const last = scheduleDays.length - 1;
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                moveTo(index === last ? 0 : index + 1);
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                moveTo(index === 0 ? last : index - 1);
              }
              if (event.key === "Home") {
                event.preventDefault();
                moveTo(0);
              }
              if (event.key === "End") {
                event.preventDefault();
                moveTo(last);
              }
            }}
            className={cn(
              "border px-5 py-4 text-left",
              selected ? "border-midnight bg-midnight text-ivory" : "border-charcoal/15 bg-white text-midnight",
            )}
          >
            <span className="text-[0.68rem] uppercase tracking-[0.16em] text-gold">{day.label}</span>
            <span className="mt-1 block font-display text-3xl">{formatCalendarDate(day.date)}</span>
          </button>
        );
      })}
    </div>
  );
}
