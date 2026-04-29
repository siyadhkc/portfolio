/**
 * Module-level scroll target singleton.
 * Set BEFORE calling navigate() — readable synchronously by any component.
 * No React context, no state, no race conditions.
 */
let _target: string | null = null;

export const setScrollTarget = (id: string) => {
  _target = id;
};

export const getScrollTarget = (): string | null => _target;

export const clearScrollTarget = () => {
  _target = null;
};
