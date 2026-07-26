import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaExternalLinkAlt, FaPhone } from 'react-icons/fa';
import Layout from '../components/Layout';
import SkillsSection from '../components/SkillsSection';
import StatsSection from '../components/StatsSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import ServicesPreview from '../components/ServicesPreview';
import FeaturedProduct from '../components/FeaturedProduct';
import CTASection from '../components/CTASection';
import Reveal from '../components/Reveal';
import { useTypewriter } from '../hooks/useTypewriter';
import { useTilt } from '../hooks/useTilt';
import { useGsapHero } from '../hooks/useGsapHero';
import { useAOS } from '../hooks/useAOS';
import { useT } from '../context/LanguageContext';
import { identity, socials, projects, featuredProduct } from '../data/profile';
import { trackCTA } from '../lib/animations';
import styles from '../styles/Home.module.css';

const ICONS = {
  linkedin: FaLinkedin,
  github: FaGithub,
  email: FaEnvelope,
  phone: FaPhone,
};

const FLOAT_CHIPS = ['AI/ML', 'System Engineer', 'Next.js', 'Marketplace'];

export default function Home() {
  const typedRole = useTypewriter(identity.roles);
  const tiltRef = useTilt(8);
  const heroRef = useGsapHero('.gsap-magnetic');
  const t = useT();
  useAOS([projects.length, identity.roles.length]);

  return (
    <Layout>
      <section className={styles.hero} aria-labelledby="hero-heading" ref={heroRef}>
        <div className={styles.orbs} aria-hidden="true">
          <span className={styles.orbA} />
          <span className={styles.orbB} />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className={`section-eyebrow gsap-hero-item`}>whoami --v2</span>
            <h1 id="hero-heading" className={`${styles.heroTitle} gsap-hero-item`}>
              {t.hero.greeting} <span>{identity.name}</span>
            </h1>
            <p className={`mono ${styles.heroRole} gsap-hero-item`} aria-label={`Roles: ${identity.roles.join(', ')}`}>
              {typedRole}
              <span className="cursor-block" aria-hidden="true" />
            </p>
            <p className={`${styles.heroTagline} gsap-hero-item`}>{t.hero.tagline}</p>
            <p className={`${styles.heroSubtagline} gsap-hero-item`}>{t.hero.subtagline}</p>
            <p className={`mono ${styles.heroPositions} gsap-hero-item`}>
              {identity.positions.map((p) => `${p.role} @ ${p.company}`).join(' · ')}
            </p>

            <div className={`${styles.heroButtons} gsap-hero-item`}>
              <a
                href={featuredProduct.href}
                className="btn gsap-magnetic"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTA('explore', 'hero_zazy2door')}
              >
                {t.hero.exploreProduct} <FaExternalLinkAlt aria-hidden="true" />
              </a>
              <Link href="/contact" className="btn btn--ghost gsap-magnetic">
                {t.hero.hireMe}
              </Link>
              <a href={identity.cvPath} className="btn btn--ghost" download>
                <FaDownload aria-hidden="true" /> {t.hero.downloadCv}
              </a>
            </div>

            <div className={`${styles.heroQuickContact} gsap-hero-item`}>
              <a
                href={`tel:${identity.phone}`}
                className={styles.quickLink}
                onClick={() => trackCTA('call', 'hero')}
              >
                <FaPhone aria-hidden="true" /> {identity.phone}
              </a>
              <a
                href={`mailto:${identity.email}`}
                className={styles.quickLink}
                onClick={() => trackCTA('email', 'hero')}
              >
                <FaEnvelope aria-hidden="true" /> {identity.email}
              </a>
            </div>

            <div className={`${styles.heroSocials} gsap-hero-item`}>
              {socials.map(({ label, href, icon }) => {
                const Icon = ICONS[icon];
                return (
                  <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div className={`${styles.heroImage} gsap-hero-item`}>
            <div ref={tiltRef} className={styles.avatarWrap}>
              <Image
                src={identity.avatar}
                alt={`Portrait of ${identity.name} (${identity.alias})`}
                width={340}
                height={340}
                priority
                className={styles.avatar}
              />
              {FLOAT_CHIPS.map((chip, index) => (
                <span
                  key={chip}
                  className={`mono ${styles.floatChip}`}
                  data-pos={index}
                  aria-hidden="true"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <CapabilitiesSection />
      <ServicesPreview />
      <FeaturedProduct />
      <SkillsSection />

      <section className="section" aria-labelledby="projects-heading">
        <div className="container">
          <Reveal variant="fly">
            <span className="section-eyebrow">portfolio --featured</span>
            <h2 id="projects-heading" className="section-title">
              {t.projects.titlePre} <span>{t.projects.titleAccent}</span>
            </h2>
            <p className="section-lead">{t.projects.lead}</p>
          </Reveal>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <Reveal
                key={project.title}
                delay={index * 100}
                variant={index % 2 === 0 ? 'left' : 'right'}
              >
                <article
                  className={`glass-card ${styles.projectCard} ${project.featured ? styles.projectFeatured : ''}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 40}
                >
                  <div
                    className={`${styles.projectImage} ${project.fit === 'contain' ? styles.projectImageContain : ''}`}
                  >
                    <Image src={project.image} alt="" width={480} height={280} />
                  </div>
                  <div className={styles.projectBody}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul className={styles.projectTags} aria-label="Technologies">
                      {project.tags.map((tag) => (
                        <li key={tag} className="mono">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={project.href}
                      className={styles.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCTA('project', project.title)}
                    >
                      {t.projects.visit} <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
