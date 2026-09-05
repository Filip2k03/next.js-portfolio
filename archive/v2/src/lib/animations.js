// V2 animation utilities — GSAP, AOS, and analytics helpers (SSR-safe).

/** Returns true when the user prefers reduced motion. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Initialize AOS scroll animations with reduced-motion fallback. */
export function initAOS(options = {}) {
  if (typeof window === 'undefined' || prefersReducedMotion()) return null;
  // eslint-disable-next-line global-require
  const AOS = require('aos');
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    disable: prefersReducedMotion(),
    ...options,
  });
  return AOS;
}

/** Refresh AOS after dynamic content mounts. */
export function refreshAOS() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return;
  // eslint-disable-next-line global-require
  const AOS = require('aos');
  AOS.refresh();
}

/** GSAP hero entrance — staggered fade/slide for hero children. */
export async function animateHeroEntrance(selector) {
  if (typeof window === 'undefined' || prefersReducedMotion()) return;
  const { gsap } = await import('gsap');
  gsap.from(selector, {
    y: 36,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
  });
}

/** Stagger children inside a container with GSAP. */
export async function animateStaggerChildren(container, childSelector = '> *') {
  if (typeof window === 'undefined' || prefersReducedMotion() || !container) return;
  const { gsap } = await import('gsap');
  gsap.from(container.querySelectorAll(childSelector), {
    y: 28,
    opacity: 0,
    duration: 0.65,
    stagger: 0.08,
    ease: 'power2.out',
  });
}

/** Subtle floating loop for decorative elements. */
export async function animateFloat(element, y = 12) {
  if (typeof window === 'undefined' || prefersReducedMotion() || !element) return;
  const { gsap } = await import('gsap');
  gsap.to(element, {
    y,
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

/** Fade a single element into view. */
export async function fadeInElement(element, delay = 0) {
  if (typeof window === 'undefined' || prefersReducedMotion() || !element) return;
  const { gsap } = await import('gsap');
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, delay, ease: 'power2.out' }
  );
}

/** Slide an element in from a direction. */
export async function slideInElement(element, direction = 'left', delay = 0) {
  if (typeof window === 'undefined' || prefersReducedMotion() || !element) return;
  const { gsap } = await import('gsap');
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const offset = direction === 'left' || direction === 'up' ? -40 : 40;
  gsap.fromTo(
    element,
    { opacity: 0, [axis]: offset },
    { opacity: 1, [axis]: 0, duration: 0.75, delay, ease: 'power3.out' }
  );
}

/** Magnetic hover pull toward cursor — for primary CTAs. */
export async function animateMagneticButton(button) {
  if (typeof window === 'undefined' || prefersReducedMotion() || !button) return undefined;

  const { gsap } = await import('gsap');
  const strength = 0.35;

  const onMove = (e) => {
    const rect = button.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(button, { x, y, duration: 0.3, ease: 'power2.out' });
  };

  const onLeave = () => {
    gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  };

  button.addEventListener('mousemove', onMove);
  button.addEventListener('mouseleave', onLeave);

  return () => {
    button.removeEventListener('mousemove', onMove);
    button.removeEventListener('mouseleave', onLeave);
  };
}

/** Parallax offset tied to scroll position. */
export async function animateParallax(element, speed = 0.15) {
  if (typeof window === 'undefined' || prefersReducedMotion() || !element) return undefined;
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const tween = gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  return () => tween.scrollTrigger?.kill();
}

/** Accent pulse for highlight badges. */
export async function pulseAccent(element) {
  if (typeof window === 'undefined' || prefersReducedMotion() || !element) return;
  const { gsap } = await import('gsap');
  gsap.to(element, {
    boxShadow: '0 0 24px var(--accent-soft)',
    repeat: -1,
    yoyo: true,
    duration: 1.6,
    ease: 'sine.inOut',
  });
}

/** Kill all GSAP tweens — useful on route change. */
export async function killAllAnimations() {
  if (typeof window === 'undefined') return;
  const { gsap } = await import('gsap');
  gsap.killTweensOf('*');
}

/** Track a custom analytics event via Vercel Analytics. */
export function trackEvent(name, data = {}) {
  if (typeof window === 'undefined') return;
  import('@vercel/analytics').then(({ track }) => {
    track(name, data);
  });
}

/** Track CTA clicks with a consistent event name. */
export function trackCTA(action, label) {
  trackEvent('cta_click', { action, label });
}
