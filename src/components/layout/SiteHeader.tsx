"use client";

import { useSyncExternalStore, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils/cn";

function active(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const home = pathname === "/";
  const scrolled = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("scroll", onStoreChange, { passive: true });
      return () => window.removeEventListener("scroll", onStoreChange);
    },
    () => window.scrollY > 8,
    () => false,
  );

  return (
    <header className={cn("sticky top-0 z-40 border-b", scrolled || !home ? "border-ivory/10 bg-midnight/95 backdrop-blur-md" : "border-transparent bg-midnight/80 backdrop-blur-sm")}>
      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        <BrandLogo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(pathname, item.href) ? "page" : undefined}
              className={cn(
                "text-sm tracking-wide text-ivory/85 transition-colors hover:text-gold",
                active(pathname, item.href) && "text-gold",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="/tickets" size="sm">
              Get Tickets
            </Button>
          </div>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 text-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setMenuPath(pathname)}
          >
            <Menu aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </Container>
      <div id="mobile-navigation">
        <MobileNavigation open={open} pathname={pathname} onClose={() => setMenuPath(null)} />
      </div>
      <noscript>
        <Container className="pb-4 lg:hidden">
          <nav aria-label="Primary without script" className="flex flex-wrap gap-4 text-sm text-ivory">
            {siteConfig.navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </Container>
      </noscript>
    </header>
  );
}
