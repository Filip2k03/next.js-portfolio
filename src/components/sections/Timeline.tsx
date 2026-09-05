import { timeline } from '@/data/timeline';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Timeline({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className="section" id="timeline">
      {!standalone && (
        <SectionHeading
          number="08"
          title="An evolving practice."
          description="2016—2026. An archive designed to grow with dated projects and engineering milestones."
        />
      )}
      <ol className="timeline-track" tabIndex={0} aria-label="Timeline 2016 to 2026">
        {timeline.map((t) => (
          <li key={t.year} className={t.focus ? 'documented' : undefined}>
            <div className="timeline-point" aria-hidden="true" />
            <h3>{t.year}</h3>
            {t.focus ? (
              <>
                <h4>{t.focus}</h4>
                {t.role && <p className="timeline-role">{t.role}</p>}
                {t.project && <p>{t.project}</p>}
                {t.technology && <p className="fine-print">{t.technology}</p>}
                {t.milestone && <p>{t.milestone}</p>}
                {t.source && <p className="fine-print">Source: {t.source}</p>}
              </>
            ) : (
              <p className="fine-print">Archive open</p>
            )}
          </li>
        ))}
      </ol>
      <p className="fine-print">
        Earlier milestones are not assigned to years without dated evidence. The archive begins at 2016 as requested; it is
        not a claim of tenure.
      </p>
    </section>
  );
}
