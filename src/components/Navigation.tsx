'use client';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { navigation } from '@/data/site';

const mobileLinks = [...navigation, ['CV', '/cv'], ['Contact', '/contact']] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const path = usePathname();

  // Compact the floating bar once the hero has scrolled away.
  useEffect(() => {
    const change = () => setCompact(window.scrollY > 40);
    change();
    window.addEventListener('scroll', change, { passive: true });
    return () => window.removeEventListener('scroll', change);
  }, []);

  const isCurrent = (url: string) => (path === url || path.startsWith(`${url}/`) ? 'page' : undefined);

  return (
    <header className={`navigation ${compact ? 'compact' : ''}`}>
      <Link href="/" className="wordmark" aria-label="Thu Ya Kyaw home">
        <span className="brand-symbol" aria-hidden="true">
          T<span>Y</span>K
        </span>
        <span>THU YA KYAW</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main">
        {navigation.map(([name, url]) => (
          <Link key={url} href={url} aria-current={isCurrent(url)}>
            {name}
          </Link>
        ))}
      </nav>
      <div className="nav-actions">
        <Link className="cv-link" href="/cv" aria-current={isCurrent('/cv')}>
          CV <ArrowUpRight size={12} />
        </Link>
        <Link className="nav-contact" href="/contact">
          Contact <ArrowUpRight size={14} />
        </Link>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="menu-trigger" aria-label="Open navigation">
            <Menu size={22} />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-backdrop" />
            <Dialog.Content className="mobile-menu">
              <Dialog.Title>THU YA KYAW</Dialog.Title>
              <Dialog.Description className="eyebrow">THE DIGITAL STUDIO</Dialog.Description>
              <Dialog.Close className="menu-close" aria-label="Close navigation">
                <X />
              </Dialog.Close>
              <nav aria-label="Mobile">
                {mobileLinks.map(([name, url], i) => (
                  <Link key={url} href={url} onClick={() => setOpen(false)} aria-current={isCurrent(url)}>
                    <span>0{i + 1}</span>
                    {name}
                    <ArrowUpRight />
                  </Link>
                ))}
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
