import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
    </header>
  );
};

export default Header;