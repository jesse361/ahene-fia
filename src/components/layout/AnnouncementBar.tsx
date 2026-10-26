"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/Container";

const storageKey = "ahf-announcement-dismissed";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("ahf-announcement", onStoreChange);
  return () => window.removeEventListener("ahf-announcement", onStoreChange);
}

function dismissedNow() {
  return window.sessionStorage.getItem(storageKey) === "1";
}

export function AnnouncementBar() {
  const dismissed = useSyncExternalStore(subscribe, dismissedNow, () => false);
  if (dismissed) return null;

  return (
    <div className="bg-forest text-ivory" role="region" aria-label="Announcement">
      <Container className="flex items-center gap-3 py-2.5 text-xs sm:text-sm">
        <p className="min-w-0 flex-1 leading-5">
          <span className="text-gold">Ahene Fia. </span>
          <span className="uppercase tracking-[0.12em]">{siteConfig.announcement.message}</span>
        </p>
        <Link href={siteConfig.announcement.href} className="shrink-0 font-semibold text-gold underline-offset-4 hover:underline">
          {siteConfig.announcement.linkLabel}
        </Link>
        <button
          type="button"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ivory/20 text-ivory"
          aria-label="Dismiss announcement"
          onClick={() => {
            window.sessionStorage.setItem(storageKey, "1");
            window.dispatchEvent(new Event("ahf-announcement"));
          }}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </Container>
    </div>
  );
}
