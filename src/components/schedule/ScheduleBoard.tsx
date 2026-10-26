"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { AddToCalendar } from "@/components/schedule/AddToCalendar";
import { DaySelector } from "@/components/schedule/DaySelector";
import { ScheduleTimeline } from "@/components/schedule/ScheduleTimeline";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/shared/Status";
import { scheduleDays, scheduleFilters, sessionsForDay, type ScheduleFilter } from "@/data/schedule";
import { cn } from "@/lib/utils/cn";

export function ScheduleBoard() {
  const [dayId, setDayId] = useState<(typeof scheduleDays)[number]["id"]>("day-1");
  const [filter, setFilter] = useState<ScheduleFilter>("All");
  const reduce = useReducedMotion();
  const sessions = useMemo(() => {
    return sessionsForDay(dayId).filter((session) => {
      if (filter === "All") return true;
      if (session.kind === "break" || session.kind === "arrival") return true;
      return session.category === filter;
    });
  }, [dayId, filter]);
  const visibleContent = sessions.some((session) => filter === "All" || session.category === filter || session.kind === "break" || session.kind === "arrival");
  const hasMatch = sessions.some((session) => filter === "All" || session.category === filter);

  return (
    <div className="space-y-8">
      <DaySelector dayId={dayId} onChange={setDayId} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Session types">
          {scheduleFilters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={cn(
                "h-10 rounded-full border px-4 text-sm",
                filter === item ? "border-forest bg-forest text-ivory" : "border-charcoal/15 bg-white text-charcoal",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <AddToCalendar label="Add the full programme" />
      </div>
      <motion.div
        key={`${dayId}-${filter}`}
        role="tabpanel"
        id={`panel-${dayId}`}
        aria-labelledby={`tab-${dayId}`}
        initial={reduce ? false : { y: 10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {hasMatch && visibleContent ? (
          <ScheduleTimeline sessions={sessions} />
        ) : (
          <EmptyState
            title="Nothing in this category."
            body="Breaks stay in the day when you view everything. This filter has no matching sessions."
            action={
              <Button type="button" variant="forest" onClick={() => setFilter("All")}>
                Show the full day
              </Button>
            }
          />
        )}
      </motion.div>
    </div>
  );
}
