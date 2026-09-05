import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroScene } from '@/components/3d/HeroScene';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> INDEPENDENT MIND. SYSTEMS THINKING.
        </p>
        <p className="mobile-name">{site.name.toUpperCase()}</p>
        <h1>
          BUILDING THE
          <br />
          SYSTEMS BEHIND
          <br />
          <span>AMBITIOUS</span>
          <br />
          PRODUCTS.
        </h1>
        <p className="hero-role">
          {site.primaryIdentity.map((role, i) => (
            <span key={role}>
              {i > 0 && <i>·</i>}
              {role.toUpperCase()}
            </span>
          ))}
        </p>
        <p className="hero-description">
          From technology strategy and architecture to production software, infrastructure and interactive experiences.
        </p>
        <div className="hero-actions">
          <Button asChild>
            <Link href="/work">
              Explore work <ArrowUpRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/systems">
              Explore systems <ArrowUpRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
      <HeroScene />
      <div className="hero-footer">
        <span>STRATEGY → ARCHITECTURE → PRODUCTION</span>
        <a href="#how-i-work">
          SCROLL TO EXPLORE <ArrowDown size={14} />
        </a>
        <span>PORTFOLIO / 2026</span>
      </div>
    </section>
  );
}
