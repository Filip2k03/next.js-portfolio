import { useEffect, useRef } from 'react';

// Adds .is-visible when the element scrolls into view; CSS handles the rest
// (and prefers-reduced-motion collapses the effect entirely in globals.css).
// variant: 'up' (default) | 'left' | 'right' | 'zoom' — AOS-style directions.
const Reveal = ({ children, as: Tag = 'div', className = '', delay = 0, variant = 'up' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const variantClass = variant !== 'up' ? `reveal--${variant}` : '';

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
