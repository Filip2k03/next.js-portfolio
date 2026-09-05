import { useEffect, useState } from 'react';

// Cycles through words with a type/erase rhythm; respects prefers-reduced-motion
// by rendering the first word statically instead of animating.
export function useTypewriter(words, { typeMs = 90, eraseMs = 45, holdMs = 1600 } = {}) {
  const [text, setText] = useState('');
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return undefined;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      setText(word.slice(0, charIndex));

      let delay = deleting ? eraseMs : typeMs;
      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = holdMs;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, typeMs);
    return () => clearTimeout(timer);
  }, [words, reduced, typeMs, eraseMs, holdMs]);

  return text;
}
