import { eventConfig } from "@/config/event";
import { formatEventRange } from "@/lib/utils/dates";

export function EventMetadata({ tone = "light" }: { tone?: "light" | "dark" }) {
  const muted = tone === "light" ? "text-mist" : "text-charcoal/70";
  const ink = tone === "light" ? "text-ivory" : "text-midnight";
  const items = [
    { label: "Gathering", value: eventConfig.name },
    { label: "Dates", value: formatEventRange(eventConfig.startDate, eventConfig.endDate) },
    { label: "Venue", value: eventConfig.venue.name },
    { label: "City", value: `${eventConfig.venue.city}, ${eventConfig.venue.country}` },
  ];

  return (
    <dl className="grid gap-px bg-gold/30 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className={tone === "light" ? "bg-midnight/80 px-4 py-4 backdrop-blur-sm" : "bg-ivory px-4 py-4"}>
          <dt className={`text-[0.68rem] uppercase tracking-[0.16em] ${muted}`}>{item.label}</dt>
          <dd className={`mt-2 text-sm leading-5 font-medium ${ink}`}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
