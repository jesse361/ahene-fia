import { SpeakerCard } from "@/components/speakers/SpeakerCard";
import type { Speaker } from "@/types/event";

export function SpeakerGrid({ speakers }: { speakers: Speaker[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {speakers.map((speaker) => (
        <SpeakerCard key={speaker.slug} speaker={speaker} />
      ))}
    </div>
  );
}
