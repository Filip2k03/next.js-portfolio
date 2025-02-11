import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!mounted) return null;

  return (
    <header className="header">
      <a href="./index.html" className="logo">CodeCraft</a>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link href="/" className={router.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link href="/services" className={router.pathname === '/services' ? 'active' : ''}>Services</Link>
        <Link href="/experience" className={router.pathname === '/experience' ? 'active' : ''}>Experience</Link>
        <Link href="/contact" className={router.pathname === '/contact' ? 'active' : ''}>Contact</Link>
      </nav>
      <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      <button className="menu-toggle" onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </button>
    </header>
  );
};

export default Header;