import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { FaTerminal, FaTimes } from 'react-icons/fa';
import { ACCENTS, applyAccent } from '../lib/accents';
import { identity, socials, skills, services, projects, profiles } from '../data/profile';
import styles from '../styles/Terminal.module.css';

const PROMPT = `guest@${identity.alias.toLowerCase()}:~$`;

const WELCOME = [
  `TechyyOS v3 — interactive terminal`,
  `Type 'help' to see what you can do. (Tip: press T anywhere to toggle me)`,
];

// A playable retro terminal for visitors — every command reads from
// src/data/profile.js so it can never drift from the visible site content.
const Terminal = () => {
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(WELCOME.map((text) => ({ type: 'out', text })));
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    // keep the latest output in view
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      // press T anywhere (outside a field) to toggle the terminal
      const inField = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '');
      if (e.key.toLowerCase() === 't' && !inField && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const run = (raw) => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const arg = (args[0] || '').toLowerCase();

    switch (cmd.toLowerCase()) {
      case '':
        return [];
      case 'help':
        return [
          'available commands:',
          '  whoami          who runs this site',
          '  skills          tech stack',
          '  projects        shipped work',
          '  services        what I offer',
          '  profiles        find me online',
          '  contact         how to reach me',
          `  accent <name>   ${ACCENTS.join(' | ')}`,
          '  theme <mode>    dark | light',
          '  cv              download my CV',
          '  clear           wipe the screen',
        ];
      case 'whoami':
        return [
          `${identity.name} (@${identity.alias})`,
          ...identity.positions.map((p) => `${p.role} @ ${p.company}`),
          identity.roles.join(' · '),
        ];
      case 'skills':
        return skills.map((s) => `  ${s.name.padEnd(20)} ${'█'.repeat(Math.round(s.level / 10)).padEnd(10, '░')} ${s.level}%`);
      case 'projects':
        return projects.map((p) => `  ${p.title} → ${p.href}`);
      case 'services':
        return services.map((s) => `  · ${s.title}`);
      case 'profiles':
        return profiles.map((p) => `  ${p.label} → ${p.href}`);
      case 'contact':
        return [
          `  email: ${identity.email}`,
          `  phone: ${identity.phone}`,
          ...socials
            .filter((s) => s.href.startsWith('https'))
            .map((s) => `  ${s.label.toLowerCase()}: ${s.href}`),
        ];
      case 'accent':
        if (applyAccent(arg)) return [`accent set to ${arg}`];
        return [`usage: accent <${ACCENTS.join('|')}>`];
      case 'theme':
        if (arg === 'dark' || arg === 'light') {
          setTheme(arg);
          return [`theme set to ${arg}`];
        }
        return ['usage: theme <dark|light>'];
      case 'cv':
        window.open(identity.cvPath, '_blank');
        return ['opening CV…'];
      case 'clear':
        setLines([]);
        return null;
      case 'sudo':
        return ['nice try. permission denied 😄'];
      default:
        return [`command not found: ${cmd} — try 'help'`];
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const output = run(input);
    if (output !== null) {
      setLines((prev) => [
        ...prev,
        { type: 'cmd', text: input },
        ...output.map((text) => ({ type: 'out', text })),
      ]);
    }
    setInput('');
  };

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close interactive terminal' : 'Open interactive terminal'}
        aria-expanded={open}
        title="Interactive terminal"
      >
        <FaTerminal />
      </button>

      {open && (
        <div className={styles.panel} role="dialog" aria-label="Interactive terminal">
          <div className={styles.titleBar}>
            <span className={`mono ${styles.title}`}>techyy-terminal</span>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close terminal"
            >
              <FaTimes />
            </button>
          </div>
          <div ref={bodyRef} className={`mono ${styles.body}`}>
            {lines.map((line, i) =>
              line.type === 'cmd' ? (
                <p key={i} className={styles.cmdLine}>
                  <span className={styles.prompt}>{PROMPT}</span> {line.text}
                </p>
              ) : (
                <pre key={i} className={styles.outLine}>{line.text}</pre>
              )
            )}
            <form onSubmit={onSubmit} className={styles.inputRow}>
              <label htmlFor="terminal-input" className={styles.prompt}>
                {PROMPT}
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                className={`mono ${styles.input}`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-label="Terminal command input"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Terminal;
