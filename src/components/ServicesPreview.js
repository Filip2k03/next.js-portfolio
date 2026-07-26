import Link from 'next/link';
import {
  FaBrain,
  FaCloud,
  FaCode,
  FaMobileAlt,
  FaShoppingCart,
  FaHospital,
  FaGraduationCap,
  FaServer,
  FaPalette,
  FaLayerGroup,
  FaGlobe,
  FaChalkboardTeacher,
  FaCashRegister,
  FaFlask,
} from 'react-icons/fa';
import Reveal from './Reveal';
import { useT } from '../context/LanguageContext';
import { services } from '../data/profile';
import styles from '../styles/ServicesPreview.module.css';

const ICONS = {
  ai: FaBrain,
  api: FaCode,
  cloud: FaCloud,
  cms: FaLayerGroup,
  ecommerce: FaShoppingCart,
  hms: FaHospital,
  mobile: FaMobileAlt,
  pos: FaCashRegister,
  sms: FaGraduationCap,
  demo: FaFlask,
  uiux: FaPalette,
  fullstack: FaServer,
  frontend: FaCode,
  hosting: FaGlobe,
  courses: FaChalkboardTeacher,
};

const PREVIEW_COUNT = 6;

const ServicesPreview = () => {
  const t = useT();
  const preview = services.slice(0, PREVIEW_COUNT);

  return (
    <section className="section" aria-labelledby="services-preview-heading">
      <div className="container">
        <Reveal variant="fly">
          <span className="section-eyebrow">services --engineered</span>
          <h2 id="services-preview-heading" className="section-title">
            {t.servicesPreview.titlePre} <span>{t.servicesPreview.titleAccent}</span>
          </h2>
          <p className="section-lead">{t.servicesPreview.lead}</p>
        </Reveal>

        <div className={styles.grid}>
          {preview.map((service, index) => {
            const Icon = ICONS[service.icon] || FaServer;
            return (
              <Reveal key={service.title} delay={index * 80} variant="zoom">
                <article
                  className={`glass-card ${styles.card}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <span className={styles.iconWrap} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className={styles.more}>
            <Link href="/services" className="btn btn--ghost">
              {t.servicesPreview.viewAll} ({services.length})
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesPreview;
