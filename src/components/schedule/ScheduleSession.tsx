import Link from "next/link";

import { AddToCalendar } from "@/components/schedule/AddToCalendar";
import { getSpeakersByIds } from "@/data/speakers";
import { formatClock } from "@/lib/utils/dates";
import { cn } from "@/lib/utils/cn";
import type { ScheduleSession } from "@/types/event";

export function roomLabel(session: ScheduleSession): string {
  return session.roomConfirmed ? session.room : `${session.room} · proposed`;
}

export function ScheduleSessionCard({ session }: { session: ScheduleSession }) {
  const speakers = getSpeakersByIds(session.speakerIds);
  const quiet = session.kind === "break" || session.kind === "arrival" || session.kind === "networking";

  return (
    <article
      id={session.id}
      className={cn(
        "grid gap-4 border-b border-charcoal/10 py-6 md:grid-cols-[9rem_1fr_11rem] md:gap-8",
        session.kind === "keynote" && "border-l-2 border-l-gold pl-4",
        quiet && "bg-ivory/80",
      )}
    >
      <p className="font-medium tabular-nums text-midnight">
        <time dateTime={`${session.date}T${session.start}`}>{formatClock(session.start)}</time>
        <span className="text-stone"> – </span>
        <time dateTime={`${session.date}T${session.end}`}>{formatClock(session.end)}</time>
      </p>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">{session.category}</p>
          {session.kind === "keynote" ? <span className="text-[0.68rem] uppercase tracking-[0.14em] text-forest">Featured</span> : null}
        </div>
        <h3 className="mt-2 font-display text-3xl leading-none text-midnight">{session.title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-charcoal/80">{session.description}</p>
        <div className="mt-3">
          <AddToCalendar sessionId={session.id} />
        </div>
        <p className="mt-3 text-sm text-midnight">
          {speakers.length > 0
            ? speakers.map((speaker, index) => (
                <span key={speaker.slug}>
                  {index > 0 ? ", " : null}
                  <Link href={`/speakers/${speaker.slug}`} className="underline decoration-gold/70 underline-offset-4">
                    {speaker.name}
                  </Link>
                </span>
              ))
            : session.host}
        </p>
      </div>
      <p className="text-sm text-charcoal/70 md:text-right">{roomLabel(session)}</p>
    </article>
  );
}
