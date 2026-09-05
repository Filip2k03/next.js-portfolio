import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with Thu Ya Kyaw — products, platforms, systems and ambitious technical work.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <Contact standalone />;
}
