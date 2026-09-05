import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/FoxMascot.module.css';

const MESSAGES = [
  "Hi! I'm Kit the fox 🦊",
  'Psst — try the terminal (>_) button!',
  "Type 'accent violet' in there. Trust me.",
  'Scroll fast and watch me lean!',
  'Thanks for visiting Thu Ya Kyaw’s portfolio!',
];

// Floating red fox mascot: spawns centered in the home hero, then "flies"
// to its corner dock on first scroll (with an accent glow trail). Pupils
// track the cursor; the body leans with scroll velocity, eased back.
// Clicking it cycles through helpful/fun speech bubbles.
const FoxMascot = () => {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const foxRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [docked, setDocked] = useState(!isHome);
  const [flying, setFlying] = useState(false);
  const msgIndex = useRef(0);

  // On home the fox docks once the visitor scrolls, and returns to center
  // at the top; the .flying class drives the glow-trail after-effect.
  useEffect(() => {
    if (!isHome) {
      setDocked(true);
      return undefined;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDocked(true);
      return undefined;
    }

    let flyTimer;
    const onScroll = () => {
      const shouldDock = window.scrollY > 80;
      setDocked((prev) => {
        if (prev !== shouldDock) {
          setFlying(true);
          window.clearTimeout(flyTimer);
          // matches the foxFlight keyframe duration so it parks exactly once
          flyTimer = window.setTimeout(() => setFlying(false), 1650);
        }
        return shouldDock;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(flyTimer);
    };
  }, [isHome]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf;
    let tilt = 0;
    let targetTilt = 0;
    let lastY = window.scrollY;
    let mouse = null;

    const onMouse = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      // clamp velocity into a gentle lean, opposite to scroll direction
      targetTilt = Math.max(-10, Math.min(10, dy * 0.4));
    };

    let headX = 0;
    let headY = 0;

    const animate = () => {
      // ease the lean back to upright — buffered, never snappy
      targetTilt *= 0.9;
      tilt += (targetTilt - tilt) * 0.15;

      if (mouse && foxRef.current) {
        const rect = foxRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height * 0.42; // eye line

        // 3D head turn: rotate toward the cursor, eased for a lifelike feel
        const targetY = Math.max(-16, Math.min(16, ((mouse.x - cx) / window.innerWidth) * 55));
        const targetX = Math.max(-12, Math.min(12, (-(mouse.y - cy) / window.innerHeight) * 40));
        headY += (targetY - headY) * 0.08;
        headX += (targetX - headX) * 0.08;

        const angle = Math.atan2(mouse.y - cy, mouse.x - cx);
        const dist = Math.min(2.6, Math.hypot(mouse.x - cx, mouse.y - cy) / 60);
        const dx = (Math.cos(angle) * dist).toFixed(2);
        const dyp = (Math.sin(angle) * dist).toFixed(2);
        const t = `translate(${dx}px, ${dyp}px)`;
        if (leftPupilRef.current) leftPupilRef.current.style.transform = t;
        if (rightPupilRef.current) rightPupilRef.current.style.transform = t;
      }

      if (foxRef.current) {
        foxRef.current.style.transform = `perspective(280px) rotateY(${headY.toFixed(2)}deg) rotateX(${headX.toFixed(2)}deg) rotate(${tilt.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const speak = () => {
    setMessage(MESSAGES[msgIndex.current % MESSAGES.length]);
    msgIndex.current += 1;
    window.clearTimeout(speak.timer);
    speak.timer = window.setTimeout(() => setMessage(null), 4000);
  };

  return (
    <div
      className={`${styles.wrap} ${docked ? styles.docked : styles.centered} ${flying ? styles.flying : ''} ${message ? styles.speaking : ''}`}
    >
      {message && (
        <div className={styles.bubble} role="status">
          {message}
        </div>
      )}
      <button
        className={styles.foxBtn}
        onClick={speak}
        aria-label="Kit the fox mascot — click for a tip"
      >
        <div ref={foxRef} className={styles.fox}>
          <svg viewBox="0 0 120 110" width="86" height="79" aria-hidden="true">
            {/* ears */}
            <path d="M18 38 L8 6 L44 24 Z" fill="#c2571f" />
            <path d="M102 38 L112 6 L76 24 Z" fill="#c2571f" />
            <path d="M20 32 L14 12 L36 24 Z" fill="#3b2b23" />
            <path d="M100 32 L106 12 L84 24 Z" fill="#3b2b23" />
            {/* head */}
            <path
              d="M60 18 C 88 18, 108 38, 106 62 C 104 84, 84 104, 60 104 C 36 104, 16 84, 14 62 C 12 38, 32 18, 60 18 Z"
              fill="#c2571f"
            />
            {/* cheeks */}
            <path d="M14 60 C 22 78, 38 96, 60 104 C 42 104, 20 88, 14 60 Z" fill="#e8dcc8" />
            <path d="M106 60 C 98 78, 82 96, 60 104 C 78 104, 100 88, 106 60 Z" fill="#e8dcc8" />
            {/* muzzle */}
            <path d="M60 66 C 70 66, 78 76, 74 88 C 70 98, 50 98, 46 88 C 42 76, 50 66, 60 66 Z" fill="#f5ecdd" />
            {/* eyes — the group blinks on a natural interval */}
            <g className={styles.eyes}>
              <circle cx="42" cy="52" r="9" fill="#fff8ec" />
              <circle cx="78" cy="52" r="9" fill="#fff8ec" />
              <g ref={leftPupilRef}>
                <circle cx="42" cy="52" r="4" fill="#241a14" />
                <circle cx="43.4" cy="50.6" r="1.3" fill="#ffffff" />
              </g>
              <g ref={rightPupilRef}>
                <circle cx="78" cy="52" r="4" fill="#241a14" />
                <circle cx="79.4" cy="50.6" r="1.3" fill="#ffffff" />
              </g>
            </g>
            {/* nose + mouth */}
            <path d="M54 78 Q 60 74, 66 78 Q 60 86, 54 78 Z" fill="#241a14" />
            <path d="M60 82 L60 88 M60 88 Q 55 92, 51 89 M60 88 Q 65 92, 69 89" stroke="#241a14" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* brow fluff */}
            <path d="M52 34 Q 60 28, 68 34 Q 60 30, 52 34 Z" fill="#a3491a" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default FoxMascot;
