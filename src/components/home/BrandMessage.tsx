import { Container } from "@/components/shared/Container";

export function BrandMessage() {
  return (
    <section className="bg-ivory py-20 sm:py-28" aria-labelledby="statement-heading">
      <Container className="max-w-4xl">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">A note, not a review</p>
        <h2 id="statement-heading" className="mt-4 font-display text-4xl leading-[1.05] text-midnight sm:text-6xl">
          “The gathering should feel considered before a guest ever reaches the door.”
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-charcoal/80">
          There are no attendee quotations on this site. When guests have something they are willing to put their name to, it will be published with their permission. Until then, the sentence above is the house speaking for itself.
        </p>
        <p className="mt-4 text-sm text-stone">Ahene Fia Events & Conference Hub</p>
      </Container>
    </section>
  );
}
