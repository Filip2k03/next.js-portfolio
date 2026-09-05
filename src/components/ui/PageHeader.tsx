import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}

/** Editorial header for secondary routes: numbered eyebrow, display title, one-line description. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="page-header">
      <p className="eyebrow">
        <span className="status-dot" /> {eyebrow}
      </p>
      <h1>{title}</h1>
      {description && <p className="section-description">{description}</p>}
    </header>
  );
}
