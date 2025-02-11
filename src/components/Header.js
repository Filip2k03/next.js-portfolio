import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <Link href="/" className={router.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link href="/services" className={router.pathname === '/services' ? 'active' : ''}>Services</Link>
        <Link href="/experience" className={router.pathname === '/experience' ? 'active' : ''}>Experience</Link>
        <Link href="/contact" className={router.pathname === '/contact' ? 'active' : ''}>Contact</Link>
      </nav>
      <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    </header>
  );
};

export default Header;