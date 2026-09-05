import Image from 'next/image';
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
import Layout from '../components/Layout';
import Reveal from '../components/Reveal';
import { useT } from '../context/LanguageContext';
import { services } from '../data/profile';
import styles from '../styles/Services.module.css';

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

const Services = () => {
  const t = useT();
  return (
    <Layout
      title="Services"
      description="Services by Thu Ya Kyaw (TechyyFilip): AI & ML, API development, cloud infrastructure, CMS, e-commerce, HMS, mobile apps, POS, SMS, UI/UX and full stack engineering."
    >
      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <Reveal variant="fly">
            <span className="section-eyebrow">services --list</span>
            <h1 id="services-heading" className="section-title">
              {t.services.titlePre} <span>{t.services.titleAccent}</span>
            </h1>
            <p className="section-lead">{t.services.lead}</p>
          </Reveal>
          <div className={styles.serviceGrid}>
            {services.map((service, index) => {
              const Icon = ICONS[service.icon] || FaServer;
              return (
                <Reveal key={service.title} delay={index * 80} variant="zoom">
                  <article
                    className={`glass-card ${styles.serviceCard}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 40}
                  >
                    <div className={styles.serviceImage}>
                      <Image src={service.image} alt="" width={400} height={220} />
                      <span className={styles.serviceIcon} aria-hidden="true">
                        <Icon />
                      </span>
                    </div>
                    <div className={styles.serviceBody}>
                      <h2>{service.title}</h2>
                      <p>{service.description}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
