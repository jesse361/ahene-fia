import { AboutExperience } from "@/components/home/AboutExperience";
import { BrandMessage } from "@/components/home/BrandMessage";
import { ExperiencePillars } from "@/components/home/ExperiencePillars";
import { FeaturedSpeakers } from "@/components/home/FeaturedSpeakers";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { SchedulePreview } from "@/components/home/SchedulePreview";
import { SponsorGrid } from "@/components/home/SponsorGrid";
import { TicketHighlights } from "@/components/home/TicketHighlights";
import { VenueSection } from "@/components/home/VenueSection";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { JsonLd } from "@/components/shared/JsonLd";
import { pageMetadata, eventJsonLd, organizationJsonLd } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Where Vision Meets Experience",
  description:
    "Ahene Fia Events & Conference Hub. A demonstration of the Leadership & Innovation Summit in Accra, 16–17 October 2027.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={eventJsonLd()} />
      <Hero />
      <CountdownTimer />
      <AboutExperience />
      <ExperiencePillars />
      <FeaturedSpeakers />
      <SchedulePreview />
      <TicketHighlights />
      <VenueSection />
      <SponsorGrid />
      <BrandMessage />
      <FinalCta />
    </>
  );
}
