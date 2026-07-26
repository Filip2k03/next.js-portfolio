import Link from 'next/link';
import { FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';
import Reveal from './Reveal';
import { useT } from '../context/LanguageContext';
import { identity } from '../data/profile';
import { trackCTA } from '../lib/animations';
import styles from '../styles/CTASection.module.css';

const CTASection = () => {
  const t = useT();

  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <div className="container">
        <Reveal variant="fly">
          <div className={`glass-card ${styles.card}`} data-aos="zoom-in">
            <span className="section-eyebrow">ready --build</span>
            <h2 id="cta-heading" className={styles.title}>
              {t.cta.title}
            </h2>
            <p className={styles.lead}>{t.cta.lead}</p>

            <div className={styles.actions}>
              <Link
                href="/contact"
                className={`btn ${styles.primaryBtn}`}
                onClick={() => trackCTA('contact', 'contact_us')}
              >
                <FaComments aria-hidden="true" /> {t.cta.contact}
              </Link>
              <a
                href={`mailto:${identity.email}`}
                className="btn btn--ghost"
                onClick={() => trackCTA('email', identity.email)}
              >
                <FaEnvelope aria-hidden="true" /> {t.cta.email}
              </a>
              <a
                href={`tel:${identity.phone}`}
                className="btn btn--ghost"
                onClick={() => trackCTA('call', identity.phone)}
              >
                <FaPhone aria-hidden="true" /> {t.cta.call}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTASection;
