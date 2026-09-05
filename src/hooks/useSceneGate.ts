'use client';
import { useEffect, useState, type RefObject } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';

/** Render budget: desktops get full geometry, tablets less, phones the least. */
export type SceneTier = 'full' | 'medium' | 'low';

export interface SceneGate {
  /** Mount the WebGL canvas. False until the element has been on screen once. */
  enabled: boolean;
  /** Run the frame loop. False while off screen so hidden scenes cost nothing. */
  animate: boolean;
  tier: SceneTier;
  /** Coarse-pointer / narrow device; scenes may shrink or opt out. */
  phone: boolean;
}

interface Options {
  /** Phones opt out by default to protect first paint and battery. */
  allowPhone?: boolean;
}

/**
 * One decision point for every progressive 3D scene: WebGL2 present, motion allowed, device
 * budget, and the element actually scrolled into view. Reduced motion mounts nothing so the DOM
 * fallback underneath is the whole experience.
 */
export function useSceneGate(ref: RefObject<HTMLElement | null>, { allowPhone = false }: Options = {}): SceneGate {
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const reduced = useReducedMotion();
  const webgl = useWebGLSupport();
  const phone = useMediaQuery('(max-width: 767px), (pointer: coarse)');
  const tablet = useMediaQuery('(max-width: 1279px)');

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setStarted(true);
      },
      { rootMargin: '120px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  const enabled = webgl === true && !reduced && started && (allowPhone || !phone);
  const tier: SceneTier = phone ? 'low' : tablet ? 'medium' : 'full';

  return { enabled, animate: enabled && visible, tier, phone };
}
