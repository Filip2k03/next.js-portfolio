import Skill from './Skill';
import Reveal from './Reveal';
import { useT } from '../context/LanguageContext';
import { skills } from '../data/profile';
import styles from '../styles/SkillsSection.module.css';

const SkillsSection = () => {
  const t = useT();
  return (
    <section className={`section ${styles.skillsSection}`} aria-labelledby="skills-heading">
      <div className="container">
        <Reveal variant="fly">
          <span className="section-eyebrow">skills --list</span>
          <h2 id="skills-heading" className="section-title">
            {t.skills.titlePre} <span>{t.skills.titleAccent}</span>
          </h2>
          <p className="section-lead">{t.skills.lead}</p>
        </Reveal>
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 100}>
              <Skill {...skill} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
