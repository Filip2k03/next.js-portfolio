import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from '../styles/BackToTop.module.css';

// Floating scroll-to-top button; appears after the first viewport of scroll.
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`${styles.backToTop} ${visible ? styles.visible : ''}`}
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTop;
