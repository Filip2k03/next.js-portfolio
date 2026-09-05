import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="section not-found">
      <p className="eyebrow">
        <span className="status-dot" /> ERROR / 404
      </p>
      <h1>
        This route is <span>not in the system.</span>
      </h1>
      <p className="section-description">The page may have moved during the redesign. The archive and systems pages are the best places to continue.</p>
      <div className="contact-actions">
        <Button asChild>
          <Link href="/">
            Return home <ArrowUpRight size={16} />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/work">
            Explore work <ArrowUpRight size={16} />
          </Link>
        </Button>
      </div>
    </section>
  );
}
