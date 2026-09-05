import { useEffect, useState } from 'react';
import { FaPalette } from 'react-icons/fa';
import { ACCENTS, applyAccent, getSavedAccent } from '../lib/accents';
import styles from '../styles/Header.module.css';

// Cycles the site accent color; persisted so the choice survives reloads.
const AccentPicker = () => {
  const [accent, setAccent] = useState('emerald');

  useEffect(() => {
    const saved = getSavedAccent();
    setAccent(saved);
    applyAccent(saved);
  }, []);

  const cycle = () => {
    const next = ACCENTS[(ACCENTS.indexOf(accent) + 1) % ACCENTS.length];
    setAccent(next);
    applyAccent(next);
  };

  return (
    <button
      className={styles.iconBtn}
      onClick={cycle}
      aria-label={`Change accent color (current: ${accent})`}
      title={`Accent: ${accent}`}
    >
      <FaPalette />
    </button>
  );
};

export default AccentPicker;
