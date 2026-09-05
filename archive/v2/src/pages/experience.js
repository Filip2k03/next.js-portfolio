import Layout from '../components/Layout';
import Reveal from '../components/Reveal';
import { useT } from '../context/LanguageContext';
import { experience, projects } from '../data/profile';
import styles from '../styles/Experience.module.css';

const Experience = () => {
  const t = useT();
  return (
    <Layout
      title="Experience"
      description="Experience and achievements of Thu Ya Kyaw (TechyyFilip): UI/UX projects, React SPAs, secure PHP/MySQL back-ends and professional education."
    >
      <section className="section" aria-labelledby="experience-heading">
        <div className="container">
          <Reveal variant="fly">
            <span className="section-eyebrow">experience --log</span>
            <h1 id="experience-heading" className="section-title">
              {t.experience.titlePre} <span>{t.experience.titleAccent}</span>
            </h1>
            <p className="section-lead">{t.experience.lead}</p>
          </Reveal>

          <div className={styles.grid}>
            {experience.map((group, index) => (
              <Reveal key={group.title} delay={index * 100}>
                <article className={`glass-card ${styles.card}`}>
                  <h2>{group.title}</h2>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.projectsBlock}>
            <article className={`glass-card ${styles.card}`}>
              <h2>Shipped Projects</h2>
              <ul>
                {projects.map((project) => (
                  <li key={project.title}>
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>{' '}
                    — {project.description}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Experience;
