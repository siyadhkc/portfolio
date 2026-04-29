import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { getScrollTarget } from '../lib/scrollTarget';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // If a section scroll is pending, skip reset — Home will handle it
    if (getScrollTarget()) return;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default ScrollToTop;
