import { Suspense } from "react";

import { ContactForm } from "@/components/contact/ContactForm";
import { VenueSection } from "@/components/home/VenueSection";
import { Container } from "@/components/shared/Container";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { eventConfig, mapsUrl } from "@/config/event";
import { siteConfig } from "@/config/site";
import { contactFaqs } from "@/data/content";
import { pageMetadata } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Write to Ahene Fia about attendance, speaking, sponsorship, press, groups, or event planning.",
  path: "/contact",
});

export default function ContactPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  return (
    <>
      <section className="bg-midnight text-ivory">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            as="h1"
            tone="light"
            overline="Contact"
            title="Let’s Create Something Worth Gathering For."
            description="Whether you are attending, speaking, sponsoring, or collaborating, we would love to hear from you."
          />
        </Container>
      </section>
      <section className="bg-ivory py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<p className="text-sm">Loading the contact form.</p>}>
              <ContactFromQuery searchParams={searchParams} />
            </Suspense>
          </div>
          <aside className="space-y-6 lg:col-span-4 lg:col-start-9">
            <div className="border border-charcoal/10 bg-white p-6">
              <h2 className="font-display text-3xl text-midnight">How to reach the house</h2>
              <p className="mt-3 text-sm leading-6 text-charcoal/80">
                {siteConfig.contact.email
                  ? siteConfig.contact.email
                  : "A public email address and telephone number have not been published. Use the form. If email delivery is configured, the confirmation will say the message was sent. If not, it will say so plainly."}
              </p>
              <p className="mt-4 text-sm leading-6 text-charcoal/80">
                {eventConfig.venue.name}
                <br />
                {eventConfig.venue.streetAddress}, {eventConfig.venue.city}, {eventConfig.venue.country}
              </p>
              <a href={mapsUrl()} className="mt-4 inline-block text-sm font-semibold text-forest underline decoration-gold underline-offset-4" target="_blank" rel="noopener noreferrer">
                Directions
              </a>
            </div>
            {siteConfig.social.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {siteConfig.social.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-charcoal/70">Social profiles will be listed when official channels are confirmed.</p>
            )}
          </aside>
        </Container>
      </section>
      <VenueSection />
      <section className="bg-ivory pb-20">
        <Container className="max-w-3xl">
          <FAQAccordion items={contactFaqs} label="Contact questions" />
        </Container>
      </section>
    </>
  );
}

async function ContactFromQuery({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  return <ContactForm initialCategory={category} />;
}
