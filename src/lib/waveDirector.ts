/**
 * A tiny, deterministic wave director: the game-loop pattern that decides when enemies spawn,
 * how they approach a player core, and when a wave is exhausted. Pure data, no rendering, so the
 * same logic drives the 3D lab and could drive tests or a server tick.
 */
export type AgentState = 'spawn' | 'advance' | 'hold' | 'retreat';

export interface Agent {
  x: number;
  z: number;
  angle: number;
  state: AgentState;
  /** Seconds remaining in the current state where the state is timed. */
  timer: number;
  speed: number;
}

export interface DirectorSnapshot {
  wave: number;
  alive: number;
  phase: 'spawning' | 'engaged' | 'clear';
}

const SPAWN_RADIUS = 4.2;
const HOLD_RADIUS = 1.1;
const EXIT_RADIUS = 4.8;

// mulberry32: small seeded PRNG so every visitor sees the same choreography.
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class WaveDirector {
  readonly maxAgents: number;
  wave = 0;
  agents: Agent[] = [];
  private pending = 0;
  private spawnTimer = 0;
  private clearTimer = 0;
  private readonly random: () => number;

  constructor(maxAgents = 48, seed = 7) {
    this.maxAgents = maxAgents;
    this.random = rng(seed);
    this.nextWave();
  }

  private nextWave() {
    this.wave += 1;
    this.pending = Math.min(this.maxAgents, 6 + this.wave * 3);
    this.spawnTimer = 0;
  }

  private spawn() {
    const angle = this.random() * Math.PI * 2;
    this.agents.push({
      x: Math.cos(angle) * SPAWN_RADIUS,
      z: Math.sin(angle) * SPAWN_RADIUS,
      angle,
      state: 'spawn',
      timer: 0.4,
      speed: 0.6 + this.random() * 0.5 + this.wave * 0.05,
    });
  }

  /** Advance the simulation by `dt` seconds. */
  tick(dt: number) {
    if (this.pending > 0) {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0 && this.agents.length < this.maxAgents) {
        this.spawn();
        this.pending -= 1;
        this.spawnTimer = 0.22;
      }
    }

    for (const a of this.agents) {
      switch (a.state) {
        case 'spawn':
          a.timer -= dt;
          if (a.timer <= 0) a.state = 'advance';
          break;
        case 'advance': {
          const r = Math.hypot(a.x, a.z) - a.speed * dt;
          a.angle += dt * 0.25;
          a.x = Math.cos(a.angle) * r;
          a.z = Math.sin(a.angle) * r;
          if (r <= HOLD_RADIUS) {
            a.state = 'hold';
            a.timer = 0.9 + this.random() * 1.2;
          }
          break;
        }
        case 'hold':
          a.timer -= dt;
          a.angle += dt * 0.9;
          a.x = Math.cos(a.angle) * HOLD_RADIUS;
          a.z = Math.sin(a.angle) * HOLD_RADIUS;
          if (a.timer <= 0) a.state = 'retreat';
          break;
        case 'retreat': {
          const r = Math.hypot(a.x, a.z) + a.speed * 1.6 * dt;
          a.x = Math.cos(a.angle) * r;
          a.z = Math.sin(a.angle) * r;
          break;
        }
      }
    }

    this.agents = this.agents.filter((a) => !(a.state === 'retreat' && Math.hypot(a.x, a.z) > EXIT_RADIUS));

    if (this.pending === 0 && this.agents.length === 0) {
      this.clearTimer += dt;
      if (this.clearTimer > 1.4) {
        this.clearTimer = 0;
        this.nextWave();
      }
    }
  }

  snapshot(): DirectorSnapshot {
    return {
      wave: this.wave,
      alive: this.agents.length,
      phase: this.pending > 0 ? 'spawning' : this.agents.length > 0 ? 'engaged' : 'clear',
    };
  }
}
