import Link from "next/link";

import { eventConfig } from "@/config/event";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { Container } from "@/components/shared/Container";

export function SiteFooter() {
  return (
    <footer className="bg-midnight text-ivory">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <BrandLogo />
          <p className="mt-6 max-w-sm text-sm leading-7 text-mist">
            A house for conferences and gatherings that take leadership, culture, and hospitality with equal seriousness. Based in the imagination of Accra, built to an international standard of care.
          </p>
        </div>
        <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-3 md:col-span-7">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">Visit</p>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-mist hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">The gathering</p>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.footerEventLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-mist hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact?category=sponsorship" className="text-mist hover:text-ivory">
                  Sponsorship enquiry
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">Contact</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-mist">
              <p>
                {eventConfig.venue.name}
                <br />
                {eventConfig.venue.streetAddress}, {eventConfig.venue.city}
              </p>
              {siteConfig.contact.email ? <p>{siteConfig.contact.email}</p> : <p>Public email and telephone numbers have not been published.</p>}
              {siteConfig.social.length > 0 ? (
                <ul className="space-y-2">
                  {siteConfig.social.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="hover:text-ivory">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Social profiles will appear here when official channels are confirmed.</p>
              )}
            </div>
          </div>
        </nav>
      </Container>
      <div className="border-t border-ivory/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {siteConfig.legalName}. Demonstration website.
          </p>
          <ul className="flex gap-4">
            {siteConfig.legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
