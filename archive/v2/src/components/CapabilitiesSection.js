import {
  FaBrain,
  FaCloud,
  FaServer,
  FaShoppingCart,
  FaBolt,
  FaShieldAlt,
} from 'react-icons/fa';
import Reveal from './Reveal';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { useT } from '../context/LanguageContext';
import { capabilities } from '../data/profile';
import styles from '../styles/CapabilitiesSection.module.css';

const ICONS = {
  architecture: FaServer,
  ai: FaBrain,
  cloud: FaCloud,
  marketplace: FaShoppingCart,
  realtime: FaBolt,
  security: FaShieldAlt,
};

const CapabilitiesSection = () => {
  const t = useT();
  const gridRef = useGsapReveal(`.${styles.card}`);

  return (
    <section className="section" aria-labelledby="capabilities-heading">
      <div className="container">
        <Reveal variant="fly">
          <span className="section-eyebrow">capabilities --engineer</span>
          <h2 id="capabilities-heading" className="section-title">
            {t.capabilities.titlePre} <span>{t.capabilities.titleAccent}</span>
          </h2>
          <p className="section-lead">{t.capabilities.lead}</p>
        </Reveal>

        <div ref={gridRef} className={styles.grid}>
          {capabilities.map((cap, index) => {
            const Icon = ICONS[cap.icon] || FaServer;
            return (
              <Reveal key={cap.title} delay={index * 80} variant="zoom">
                <article
                  className={`glass-card ${styles.card}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 60}
                >
                  <span className={styles.iconWrap} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{cap.title}</h3>
                  <p>{cap.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
