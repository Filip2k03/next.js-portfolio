import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/data/site';
import { Button } from '@/components/ui/button';

export function Contact({ standalone = false }: { standalone?: boolean }) {
  // On /contact this block is the page itself, so its title is the document h1.
  const Heading = standalone ? 'h1' : 'h2';
  return (
    <section className={`section contact-section ${standalone ? 'standalone' : ''}`} id="contact">
      <p className="eyebrow">
        <span className="status-dot" /> START A CONVERSATION
      </p>
      <Heading>
        LET’S BUILD
        <br />
        SOMETHING
        <br />
        <span>SIGNIFICANT.</span>
      </Heading>
      <p>For products, platforms, systems and ambitious technical projects.</p>
      <div className="contact-actions">
        <Button asChild>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent('New project')}`}>
            Start a project <ArrowUpRight size={16} />
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/cv">
            View CV <ArrowUpRight size={16} />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={16} />
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={16} />
          </a>
        </Button>
      </div>
      <a className="contact-email" href={`mailto:${site.email}`}>
        {site.email}
      </a>
    </section>
  );
}
