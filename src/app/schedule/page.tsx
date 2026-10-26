import { ScheduleBoard } from "@/components/schedule/ScheduleBoard";
import { Container } from "@/components/shared/Container";
import { DemoNotice } from "@/components/shared/DemoNotice";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { eventConfig } from "@/config/event";
import { formatEventRange } from "@/lib/utils/dates";
import { pageMetadata } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Schedule",
  description: `The demonstration programme for ${eventConfig.name}, shown in ${eventConfig.timezoneLabel}.`,
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <>
      <section className="bg-midnight text-ivory">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            as="h1"
            tone="light"
            overline="Schedule"
            title="Every Moment, Intentionally Designed."
            description="Explore the sessions, conversations, and experiences that make the gathering meaningful."
          />
          <p className="mt-6 text-sm text-mist">
            {formatEventRange(eventConfig.startDate, eventConfig.endDate)} · {eventConfig.timezoneLabel}
          </p>
        </Container>
      </section>
      <section className="bg-ivory py-14 sm:py-20">
        <Container className="space-y-8">
          <DemoNotice>
            Session times are a proposed running order. Rooms are marked proposed until the venue confirms them. You can download a calendar file from the real session data.
          </DemoNotice>
          <ScheduleBoard />
        </Container>
      </section>
    </>
  );
}
