import Link from 'next/link';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useT } from '../context/LanguageContext';
import { identity, socials } from '../data/profile';
import styles from '../styles/Footer.module.css';

const ICONS = {
  linkedin: FaLinkedin,
  github: FaGithub,
  email: FaEnvelope,
  phone: FaPhone,
};

const Footer = () => {
  const t = useT();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={`mono ${styles.sig}`}>
          {identity.name} <span>@{identity.alias}</span>
        </p>
        <p className={styles.company}>
          {t.footer.powered}{' '}
          <a href={identity.companyUrl} target="_blank" rel="noopener noreferrer">
            {identity.company}
          </a>
        </p>
        <div className={styles.socials}>
          {socials.map(({ label, href, icon }) => {
            const Icon = ICONS[icon];
            return (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                <Icon />
              </a>
            );
          })}
        </div>
        <div className={styles.contactLinks}>
          <a href={`mailto:${identity.email}`}>{identity.email}</a>
          <span aria-hidden="true">·</span>
          <a href={`tel:${identity.phone}`}>{identity.phone}</a>
          <span aria-hidden="true">·</span>
          <Link href="/contact">{t.cta.contact}</Link>
        </div>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} {identity.company}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
