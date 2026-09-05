import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import AccentPicker from './AccentPicker';
import { useLanguage, useT } from '../context/LanguageContext';
import { LANGUAGES } from '../data/i18n';
import styles from '../styles/Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Theme icon must render only after mount to avoid SSR/client hydration mismatch
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const t = useT();
  const router = useRouter();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/skills', label: t.nav.skills },
    { href: '/services', label: t.nav.services },
    { href: '/experience', label: t.nav.experience },
    { href: '/contact', label: t.nav.contact },
  ];

  useEffect(() => setMounted(true), []);

  // Close the mobile menu on route change so it never lingers over the new page
  useEffect(() => {
    const close = () => setMenuOpen(false);
    router.events.on('routeChangeComplete', close);
    return () => router.events.off('routeChangeComplete', close);
  }, [router.events]);

  const isDark = resolvedTheme === 'dark';

  const cycleLang = () => {
    const index = LANGUAGES.findIndex((l) => l.code === lang);
    setLang(LANGUAGES[(index + 1) % LANGUAGES.length].code);
  };

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="TechyyFilip — home">
          Techyy<span>Filip</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`} aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={router.pathname === href ? styles.active : ''}
              aria-current={router.pathname === href ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            className={`mono ${styles.iconBtn} ${styles.langBtn}`}
            onClick={cycleLang}
            aria-label={`Change language (current: ${current.label})`}
            title={current.label}
          >
            {mounted ? current.short : 'EN'}
          </button>
          <AccentPicker />
          <button
            className={styles.iconBtn}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={mounted && isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {mounted ? (isDark ? <FaSun /> : <FaMoon />) : <FaMoon />}
          </button>
          <button
            className={`${styles.iconBtn} ${styles.menuToggle}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
