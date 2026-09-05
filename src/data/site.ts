export const site = {
  name: 'Thu Ya Kyaw',
  alias: 'TechyyFilip',
  url: 'https://thuyakyaw.com',
  email: 'stephanfilip7@gmail.com',
  phone: '+959954480806',
  location: 'Global / Remote',
  title: 'Thu Ya Kyaw — CTO · Systems Architect · Product Engineer',
  description:
    'Thu Ya Kyaw is a CTO, systems architect and product engineer building digital products, platforms, infrastructure and interactive software systems.',
  github: 'https://github.com/Filip2k03',
  linkedin: 'https://www.linkedin.com/in/thu-ya-kyaw-5a606732b',
  repository: 'https://github.com/Filip2k03/ThuYaKyawportfolio',
  primaryIdentity: ['CTO', 'Systems Architect', 'Product Engineer'],
  secondaryIdentity: ['Full-Stack Engineer', 'Systems Engineer', 'Independent Technology Craftsman'],
  message: 'I build the systems behind ambitious digital products.',
  supportingMessage:
    'I architect and build scalable systems, interactive experiences and digital products, from idea to production.',
  /** Hero headline: plain lines, then the accent phrase set in the italic serif. */
  headline: { lines: ['Engineering', 'systems.', 'Building'], accent: 'the future.' },
} as const;

export const navigation = [
  ['Work', '/work'],
  ['Systems', '/systems'],
  ['Tech', '/technology'],
  ['Timeline', '/timeline'],
  ['About', '/about'],
] as const;

/** Roles recorded in the existing portfolio. No dates are attached because none are documented. */
export const positions = [
  { role: 'Chief Technology Officer', company: 'Reiwasakura', url: 'https://reiwasakura.tech' },
  { role: 'Chief Technology Officer', company: 'New Earth Company Limited' },
  { role: 'Lead Engineer', company: 'PayVia Tech Solutions', url: 'https://paicafes.com' },
] as const;

export const education = [
  'Diploma in Business Information Technology — IT principles, web development and business systems.',
  'Diploma in Human Resources and Project Management — project coordination, collaboration and operations.',
] as const;

export const approach = [
  ['Technology strategy', 'Define the product direction. Make technical decisions serve the business.'],
  ['System architecture', 'Connect interfaces, services and data into a coherent system.'],
  ['Product engineering', 'Carry a product from first interaction to working software.'],
  ['Infrastructure', 'Treat deployment, reliability and maintainability as part of the product.'],
  ['AI / automation', 'Apply intelligent tooling to useful, well-defined workflows.'],
  ['Technical leadership', 'Bring clarity to decisions, implementation and delivery.'],
] as const;

export const evolution = ['Code', 'Applications', 'Products', 'Platforms', 'Systems', 'Leadership'] as const;
