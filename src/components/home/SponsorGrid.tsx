import { sponsors } from "@/data/sponsors";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function SponsorGrid() {
  return (
    <section className="border-t border-charcoal/10 bg-white py-20 sm:py-28" aria-labelledby="partners-heading">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="partners-heading"
            overline="Partners"
            title="Space reserved for the people who make the room possible."
            description="No sponsor has been confirmed. The marks below are placeholders so the layout is ready, and they are not organisations."
            className="max-w-2xl"
          />
          <Button href="/contact?category=sponsorship" variant="line">
            Become a Partner
          </Button>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {sponsors.map((sponsor) => (
            <li key={sponsor.id} className="flex min-h-36 flex-col justify-between border border-dashed border-charcoal/20 p-5">
              <span className="font-display text-4xl text-gold" aria-hidden="true">
                {sponsor.monogram}
              </span>
              <span>
                <span className="block text-sm text-midnight">{sponsor.name}</span>
                <span className="text-xs uppercase tracking-[0.14em] text-stone">
                  {sponsor.role} · placeholder
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
