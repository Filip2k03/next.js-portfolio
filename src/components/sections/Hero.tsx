import Link from 'next/link';
import { Fragment } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroScene } from '@/components/3d/HeroScene';
import { metrics, metricsBasis } from '@/data/metrics';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> {site.primaryIdentity.join(' · ').toUpperCase()}
        </p>
        <p className="mobile-name">{site.name.toUpperCase()}</p>
        <h1>
          {site.headline.lines.map((line) => (
            <Fragment key={line}>
              {line}
              <br />
            </Fragment>
          ))}
          <span>{site.headline.accent}</span>
        </h1>
        <p className="hero-description">{site.supportingMessage}</p>
        <div className="hero-actions">
          <Button asChild>
            <Link href="/work">
              Explore work <ArrowUpRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/systems">
              View systems <ArrowUpRight size={16} />
            </Link>
          </Button>
        </div>
        <dl className="hero-stats">
          {metrics.map((metric) => (
            <div key={metric.label} title={metric.basis}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
        <p className="fine-print">{metricsBasis}</p>
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
