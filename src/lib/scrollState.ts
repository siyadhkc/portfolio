/**
 * scrollState.ts
 *
 * Persistent scroll state management for seamless navigation.
 * Implements a hybrid approach: Section ID (priority) + Scroll Y (fallback).
 */

const HOME_SCROLL_KEY = "portfolio:home-scroll-y";
const SECTION_KEY = "portfolio:active-section";

// --- Pixel Scroll Logic ---
export const saveScroll = () => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
  }
};

export const getScroll = () => {
  if (typeof window === "undefined") return 0;
  return Number(sessionStorage.getItem(HOME_SCROLL_KEY) || 0);
};

export const clearScroll = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(HOME_SCROLL_KEY);
  }
};

// --- Section Logic ---
export const saveSection = (id: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SECTION_KEY, id);
  }
};

export const getSection = () => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SECTION_KEY);
};

export const clearSection = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SECTION_KEY);
  }
};

// --- Utility ---
export const clearAllScroll = () => {
  clearScroll();
  clearSection();
};

/**
 * @deprecated Use getScroll/getSection instead.
 */
export const getHomeScrollY = getScroll;
/**
 * @deprecated Use saveScroll instead.
 */
export const saveHomeScrollY = saveScroll;
/**
 * @deprecated Use getSection instead.
 */
export const getScrollTarget = getSection;
