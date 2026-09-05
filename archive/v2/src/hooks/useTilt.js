import { useEffect, useRef } from 'react';

// Pointer-tracking 3D tilt for the attached element. Disabled on touch
// devices and under prefers-reduced-motion, where it degrades to static.
export function useTilt(maxDeg = 10) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return undefined;
    }

    const onMove = (e) => {
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      node.style.transform = `perspective(900px) rotateY(${x * maxDeg * 2}deg) rotateX(${-y * maxDeg * 2}deg)`;
    };
    const onLeave = () => {
      node.style.transform = '';
    };

    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
    return () => {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
    };
  }, [maxDeg]);

  return ref;
}
