import Link from 'next/link';
import { FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';
import { useT } from '../context/LanguageContext';
import { identity } from '../data/profile';
import { trackCTA } from '../lib/animations';
import styles from '../styles/TouchCTA.module.css';

/** Persistent floating contact shortcuts — call, email, and contact page. */
const TouchCTA = () => {
  const t = useT();

  return (
    <aside className={styles.bar} aria-label="Quick contact actions">
      <a
        href={`tel:${identity.phone}`}
        className={styles.btn}
        aria-label={t.touch.call}
        title={t.touch.call}
        onClick={() => trackCTA('call', 'floating_bar')}
      >
        <FaPhone aria-hidden="true" />
        <span className={styles.label}>{t.touch.callShort}</span>
      </a>
      <a
        href={`mailto:${identity.email}`}
        className={styles.btn}
        aria-label={t.touch.email}
        title={t.touch.email}
        onClick={() => trackCTA('email', 'floating_bar')}
      >
        <FaEnvelope aria-hidden="true" />
        <span className={styles.label}>{t.touch.emailShort}</span>
      </a>
      <Link
        href="/contact"
        className={`${styles.btn} ${styles.primary}`}
        aria-label={t.touch.contact}
        title={t.touch.contact}
        onClick={() => trackCTA('contact', 'floating_bar')}
      >
        <FaComments aria-hidden="true" />
        <span className={styles.label}>{t.touch.contactShort}</span>
      </Link>
    </aside>
  );
};

export default TouchCTA;
