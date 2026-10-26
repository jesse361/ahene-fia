import { ExperiencePillars } from "@/components/home/ExperiencePillars";
import { FinalCta } from "@/components/home/FinalCta";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { pageMetadata } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "About",
  description: "Ahene Fia is a house for conferences and gatherings shaped by African confidence and international care.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-midnight text-ivory">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            as="h1"
            tone="light"
            overline="The house"
            title="Regal in its care. Contemporary in its manner."
            description="Ahene Fia is a name for gatherings that take African ambition seriously and refuse to dress it in cliché."
          />
        </Container>
      </section>
      <section className="bg-ivory py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="max-w-2xl space-y-5 text-base leading-7 text-charcoal/85 lg:col-span-7">
            <p>
              The wordmark is the emblem: a courtyard arch inside a diamond, a room you can enter. The colours are midnight, forest, ivory, and a measured gold. The gold is an accent, never a substitute for readable type.
            </p>
            <p>
              The house is for professional conferences, corporate gatherings, technology summits, business forums, leadership workshops, cultural meetings, and private or institutional events. The demonstration on this site is a two-day leadership and innovation summit in Accra.
            </p>
            <p>
              There is no invented founding year, no borrowed audience figure, and no testimonial waiting to be mistaken for a guest. When those facts exist, they can replace this paragraph without changing the design.
            </p>
          </div>
          <aside className="border border-gold/40 bg-white p-6 lg:col-span-4 lg:col-start-9">
            <h2 className="font-display text-3xl text-midnight">What this site will not do</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-charcoal/80">
              <li>Pretend a sample speaker has agreed to appear.</li>
              <li>Pretend a placeholder is a sponsor.</li>
              <li>Pretend a registration took payment or held a seat.</li>
              <li>Publish a telephone number that does not exist.</li>
            </ul>
          </aside>
        </Container>
      </section>
      <ExperiencePillars />
      <FinalCta />
    </>
  );
}
