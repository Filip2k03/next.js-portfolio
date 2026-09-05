interface SectionHeadingProps {
  number: string;
  title: string;
  description?: string;
}

export function SectionHeading({ number, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> / THE ENGINEERING PRACTICE
        </p>
        <h2>{title}</h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
