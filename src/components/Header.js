import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

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
      <div className="logo">CodeCraft</div>
      <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <Link href="/" className={router.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link href="/services" className={router.pathname === '/services' ? 'active' : ''}>Services</Link>
        <Link href="/experience" className={router.pathname === '/experience' ? 'active' : ''}>Experience</Link>
        <Link href="/contact" className={router.pathname === '/contact' ? 'active' : ''}>Contact</Link>
      </nav>
    </header>
  );
};

export default Header;