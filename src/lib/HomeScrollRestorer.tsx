import { useEffect } from "react";

import { getScroll, getSection, clearAllScroll } from "./scrollState";

/**
 * HomeScrollRestorer
 * 
 * Handles hybrid scroll restoration on the Home page.
 * Priority: Section ID -> Fallback: scrollY
 */
export default function HomeScrollRestorer() {
  useEffect(() => {
    const scrollY = getScroll();
    const section = getSection();

    // Small delay to ensure DOM and Lenis are ready
    const timer = setTimeout(() => {
      // 1. Priority: Section-based restoration
      if (section) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
          clearAllScroll();
          return;
        }
      }

      // 2. Fallback: Pixel-based restoration
      if (scrollY > 0) {
        window.scrollTo({
          top: scrollY,
          behavior: "auto",
        });
        clearAllScroll();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
