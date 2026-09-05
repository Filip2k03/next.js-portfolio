import Reveal from './Reveal';
import { useCountUp } from '../hooks/useCountUp';
import { useT } from '../context/LanguageContext';
import { identity, skills, services, projects } from '../data/profile';
import styles from '../styles/StatsSection.module.css';

const StatItem = ({ label, value, delay }) => {
  const [ref, count] = useCountUp(value);
  return (
    <Reveal delay={delay}>
      <div ref={ref} className={`glass-card ${styles.stat}`}>
        <span className={`mono ${styles.value}`}>{count}+</span>
        <span className={styles.label}>{label}</span>
      </div>
    </Reveal>
  );
};

const StatsSection = () => {
  const t = useT();
  // Counts are derived from the data layer so they can never go stale.
  const stats = [
    { label: t.stats.companies, value: identity.positions.length },
    { label: t.stats.projects, value: projects.length },
    { label: t.stats.technologies, value: skills.length },
    { label: t.stats.services, value: services.length },
  ];

  return (
    <section className={styles.stats} aria-label="Career statistics">
      <div className={`container ${styles.grid}`}>
        {stats.map((stat, index) => (
          <StatItem key={stat.label} {...stat} delay={index * 140} />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
