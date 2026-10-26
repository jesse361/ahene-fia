import { ScheduleSessionCard } from "@/components/schedule/ScheduleSession";
import type { ScheduleSession } from "@/types/event";

export function ScheduleTimeline({ sessions }: { sessions: ScheduleSession[] }) {
  if (sessions.length === 0) return null;
  return (
    <div>
      {sessions.map((session) => (
        <ScheduleSessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
