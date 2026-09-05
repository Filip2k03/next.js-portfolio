'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
}

type State = 'visible' | 'pending';

/**
 * Scroll-triggered entrance. Server HTML has no data attribute, so content is visible without JS;
 * after mount, off-screen blocks are hidden and revealed by an IntersectionObserver.
 * Reduced motion is handled in CSS (the transition collapses to an instant fade).
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>('visible');

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return;
    // Only blocks below the fold animate in; anything already on screen stays put.
    if (node.getBoundingClientRect().top > window.innerHeight) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setState('visible');
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -8% 0px' },
      );
      // Schedule the hide after paint so the first frame never flashes.
      const frame = requestAnimationFrame(() => {
        setState('pending');
        observer.observe(node);
      });
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div ref={ref} className={className} data-reveal={state}>
      {children}
    </div>
  );
}
