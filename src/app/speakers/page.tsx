import { SpeakerDirectory } from "@/components/speakers/SpeakerDirectory";
import { Container } from "@/components/shared/Container";
import { DemoNotice } from "@/components/shared/DemoNotice";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { pageMetadata } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Speakers",
  description: "A demonstration directory of thinkers, builders, and creative voices for the Ahene Fia summit. Not a confirmed lineup.",
  path: "/speakers",
});

export default function SpeakersPage() {
  return (
    <>
      <section className="bg-midnight text-ivory">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            as="h1"
            tone="light"
            overline="Speakers"
            title="Meet the Voices Shaping What Comes Next."
            description="Discover the thinkers, builders, leaders, and creative minds bringing fresh perspectives to the table."
          />
        </Container>
      </section>
      <section className="bg-ivory py-14 sm:py-20">
        <Container className="space-y-8">
          <DemoNotice>
            Sample speakers only. Portraits are stock photographs used as illustration. They are not likenesses of the named people, and none of these appearances are confirmed.
          </DemoNotice>
          <SpeakerDirectory />
        </Container>
      </section>
    </>
  );
}
