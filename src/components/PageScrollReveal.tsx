"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]")
    );

    if (!elements.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.remove("page-scroll-reveal");
        element.classList.add("is-revealed");
      });
      return;
    }

    // Reset reveal state whenever the route changes, so newly rendered pages
    // are observed after client-side navigation as well as on a hard refresh.
    elements.forEach((element) => {
      element.classList.remove("is-revealed");
      element.classList.add("page-scroll-reveal");
    });

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-revealed");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
