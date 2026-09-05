import { useEffect, useRef } from 'react';
import { animateStaggerChildren, prefersReducedMotion } from '../lib/animations';

/** Stagger-reveal children when a section scrolls into view. */
export function useGsapReveal(childSelector = '> *') {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateStaggerChildren(node, childSelector);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [childSelector]);

  return ref;
}
