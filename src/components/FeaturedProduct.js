import Image from 'next/image';
import Link from 'next/link';
import { FaCheck, FaExternalLinkAlt } from 'react-icons/fa';
import Reveal from './Reveal';
import { useT } from '../context/LanguageContext';
import { featuredProduct } from '../data/profile';
import { trackCTA } from '../lib/animations';
import styles from '../styles/FeaturedProduct.module.css';

const FeaturedProduct = () => {
  const t = useT();

  return (
    <section className={`section ${styles.section}`} aria-labelledby="featured-product-heading">
      <div className="container">
        <Reveal variant="fly">
          <span className="section-eyebrow">{featuredProduct.eyebrow.toLowerCase()}</span>
          <h2 id="featured-product-heading" className="section-title">
            {t.featured.titlePre} <span>{t.featured.titleAccent}</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <article className={`glass-card ${styles.card}`} data-aos="fade-up">
            <div className={styles.visual}>
              <Image
                src={featuredProduct.image}
                alt={featuredProduct.title}
                width={480}
                height={320}
                className={styles.image}
              />
            </div>
            <div className={styles.body}>
              <h3>{featuredProduct.title}</h3>
              <p>{featuredProduct.description}</p>
              <ul className={styles.features} aria-label="Product features">
                {featuredProduct.features.map((feature) => (
                  <li key={feature}>
                    <FaCheck aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className={styles.actions}>
                <a
                  href={featuredProduct.href}
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTA('request_demo', featuredProduct.title)}
                >
                  {featuredProduct.cta}
                </a>
                <a
                  href={featuredProduct.href}
                  className="btn btn--ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTA('explore', featuredProduct.title)}
                >
                  {featuredProduct.exploreCta} <FaExternalLinkAlt aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedProduct;
