import Link from "next/link";

import { previewSessions } from "@/data/schedule";
import { ScheduleSessionCard } from "@/components/schedule/ScheduleSession";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { eventConfig } from "@/config/event";

export function SchedulePreview() {
  const sessions = previewSessions(4);
  return (
    <section className="border-t border-charcoal/10 bg-ivory py-20 sm:py-28" aria-labelledby="schedule-heading">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="schedule-heading"
            overline="Programme"
            title="A day with room to think."
            description={`Opening day, in ${eventConfig.timezoneLabel}. The full two days live on the schedule.`}
            className="max-w-2xl"
          />
          <Button href="/schedule" variant="line">
            Full schedule
          </Button>
        </div>
        <div className="mt-10">
          {sessions.map((session) => (
            <ScheduleSessionCard key={session.id} session={session} />
          ))}
        </div>
        <p className="mt-6 text-sm">
          <Link href="/schedule" className="font-semibold text-forest underline decoration-gold underline-offset-4">
            See both days
          </Link>
        </p>
      </Container>
    </section>
  );
}
