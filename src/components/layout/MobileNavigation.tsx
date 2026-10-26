"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils/cn";

type MobileNavigationProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

function active(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNavigation({ open, pathname, onClose }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const focusable = () =>
      panel ? [...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")] : [];

    const first = focusable()[0];
    first?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const nodes = focusable();
      const start = nodes[0];
      const end = nodes[nodes.length - 1];
      if (!start || !end) return;
      if (event.shiftKey && document.activeElement === start) {
        event.preventDefault();
        end.focus();
      } else if (!event.shiftKey && document.activeElement === end) {
        event.preventDefault();
        start.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" className="absolute inset-0 bg-midnight/70" aria-label="Close menu" onClick={onClose} />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile"
        initial={reduce ? false : { x: 24 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 right-0 flex h-full w-[min(100%,24rem)] flex-col bg-midnight px-6 py-6 text-ivory shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-2xl tracking-[0.12em] text-gold">Menu</p>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20" onClick={onClose} aria-label="Close menu">
            <X aria-hidden="true" />
          </button>
        </div>
        <nav className="mt-10 flex flex-1 flex-col gap-2" aria-label="Mobile">
          {siteConfig.navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (active(pathname, item.href)) onClose();
              }}
              aria-current={active(pathname, item.href) ? "page" : undefined}
              className={cn(
                "flex items-baseline justify-between border-b border-ivory/10 py-4 font-display text-4xl",
                active(pathname, item.href) ? "text-gold" : "text-ivory",
              )}
            >
              {item.label}
              <span className="font-sans text-xs tracking-[0.16em] text-mist">0{index + 1}</span>
            </Link>
          ))}
        </nav>
        <Button
          href="/tickets"
          variant="primary"
          className="mt-6 h-auto min-h-12 w-full whitespace-normal"
          onClick={() => {
            if (pathname === "/tickets") onClose();
          }}
        >
          Get Tickets
        </Button>
      </motion.div>
    </div>
  );
}
