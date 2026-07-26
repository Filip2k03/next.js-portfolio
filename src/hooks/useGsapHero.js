import { useEffect, useRef } from 'react';
import { animateHeroEntrance, animateMagneticButton } from '../lib/animations';

/** GSAP hero entrance + optional magnetic CTA binding. */
export function useGsapHero(magneticSelector) {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    animateHeroEntrance('.gsap-hero-item');

    let cleanupMagnetic;
    if (magneticSelector) {
      const btn = hero.querySelector(magneticSelector);
      if (btn) {
        animateMagneticButton(btn).then((cleanup) => {
          cleanupMagnetic = cleanup;
        });
      }
    }

    return () => {
      if (cleanupMagnetic) cleanupMagnetic();
    };
  }, [magneticSelector]);

  return heroRef;
}
