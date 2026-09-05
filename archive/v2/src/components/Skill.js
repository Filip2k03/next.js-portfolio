import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaPython,
  FaPhp,
  FaWordpress,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaFigma,
} from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiTypescript, SiNextdotjs } from 'react-icons/si';
import styles from '../styles/SkillsSection.module.css';

const ICONS = {
  html: FaHtml5,
  css: FaCss3Alt,
  js: FaJs,
  typescript: SiTypescript,
  react: FaReact,
  nextjs: SiNextdotjs,
  node: FaNodeJs,
  tailwind: SiTailwindcss,
  bootstrap: FaBootstrap,
  python: FaPython,
  php: FaPhp,
  mysql: SiMysql,
  wordpress: FaWordpress,
  docker: FaDocker,
  git: FaGitAlt,
  figma: FaFigma,
};

const Skill = ({ name, level, icon }) => {
  const Icon = ICONS[icon] || FaJs;
  return (
    <div className={`glass-card ${styles.skill}`}>
      <div className={styles.skillHead}>
        <Icon className={styles.skillIcon} aria-hidden="true" />
        <span className={styles.skillName}>{name}</span>
        <span className={`mono ${styles.skillLevel}`}>{level}%</span>
      </div>
      <div
        className={styles.progressBar}
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <div className={styles.progress} style={{ width: `${level}%` }} />
      </div>
    </div>
  );
};

export default Skill;
