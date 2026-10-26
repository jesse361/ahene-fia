"use client";

import { useEffect, useState } from "react";

import { eventConfig, eventStartIso } from "@/config/event";
import { padTwo, remainingTime } from "@/lib/utils/dates";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export function CountdownTimer() {
  const target = new Date(eventStartIso()).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = now === null ? null : remainingTime(now, target);

  return (
    <section id="countdown" aria-labelledby="countdown-heading" className="bg-forest text-ivory">
      <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <h2 id="countdown-heading" className="font-display text-4xl leading-none">
            Until the doors open
          </h2>
          <p className="mt-3 text-sm leading-6 text-mist">
            {eventConfig.name}. {eventConfig.timezoneLabel}. The seconds update visually and are not announced.
          </p>
        </div>
        {remaining?.status === "invalid" ? (
          <p role="status">The event date is not available yet.</p>
        ) : remaining?.status === "started" ? (
          <p role="status" className="font-display text-4xl text-gold">
            The gathering has begun.
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4" aria-hidden={now === null ? undefined : true}>
            {units.map((unit) => {
              const value = remaining ? remaining[unit.key] : null;
              return (
                <div key={unit.key} className="border border-ivory/15 px-2 py-4 text-center sm:px-4">
                  <p className="font-display text-3xl tabular-nums text-gold sm:text-5xl">{value === null ? "–" : unit.key === "days" ? String(value) : padTwo(value)}</p>
                  <p className="mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-mist sm:text-xs">{unit.label}</p>
                </div>
              );
            })}
          </div>
        )}
        <p className="sr-only">
          Countdown to {eventConfig.name}. A live clock is shown visually. This text does not update every second.
        </p>
      </div>
    </section>
  );
}
