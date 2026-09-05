import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { navigation, site } from '@/data/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-symbol" aria-hidden="true">
          T<span>Y</span>K
        </span>
        <p>{site.message}</p>
      </div>
      <nav className="footer-nav" aria-label="Footer">
        {[...navigation, ['CV', '/cv'], ['Contact', '/contact']].map(([name, url]) => (
          <Link key={url} href={url}>
            {name}
          </Link>
        ))}
      </nav>
      <div className="footer-social">
        <a href={site.github} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={12} />
        </a>
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          LinkedIn <ArrowUpRight size={12} />
        </a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
      <p className="footer-fine">
        © {new Date().getFullYear()} {site.name}. Built with Next.js, TypeScript and Three.js.
      </p>
    </footer>
  );
}
