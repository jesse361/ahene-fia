import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ticketingPolicy } from "@/data/tickets";
import { pageMetadata } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms for using the Ahene Fia demonstration website. No tickets are sold here.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading as="h1" overline="Terms" title="A demonstration, until it is something else." />
        <div className="mt-8 space-y-5 text-base leading-7 text-charcoal/85">
          <p>
            The programme, speakers, prices, rooms, and partner marks on this website are sample content for the Ahene Fia Events & Conference Hub. They are not an offer to sell a ticket and not a confirmation that any person or organisation will attend.
          </p>
          <p>{ticketingPolicy.payment}</p>
          <p>{ticketingPolicy.refunds}</p>
          <p>
            You may use the forms to try the experience. A reference code is a receipt that the form was checked, not a contract. Prices shown in a receipt are read from the server configuration so the browser cannot set them.
          </p>
          <p>
            Replace these terms with counsel-reviewed conditions before taking money, publishing a real lineup, or promising access, catering, or transport.
          </p>
        </div>
      </Container>
    </section>
  );
}
