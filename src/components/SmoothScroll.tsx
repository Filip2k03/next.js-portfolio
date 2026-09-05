'use client';
import { useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Lenis smooth scrolling, loaded lazily and only for fine-pointer devices that allow motion. */
export function SmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: true, anchors: true, duration: 0.8 });
      cleanup = () => lenis.destroy();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced]);
  return null;
}
