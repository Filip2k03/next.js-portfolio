// Single source of truth for all site content — edit here, never in components.
export const identity = {
  name: 'Thu Ya Kyaw',
  alias: 'TechyyFilip',
  tagline: 'Forging the Future — high-performance software and marketplace platforms built for scale.',
  subtagline:
    'Engineered systems, not templates. I architect, build, and ship production-grade platforms — from AI pipelines to multi-vendor marketplaces.',
  roles: [
    'Chief Technology Officer',
    'System Engineer',
    'Full Stack Developer',
    'AI & ML Engineer',
    'UI/UX Designer',
    'Tech Artist',
  ],
  positions: [
    { role: 'CTO', company: 'Reiwasakura' },
    { role: 'CTO', company: 'New Earth Company Limited' },
    { role: 'Lead Engineer', company: 'PayVia Tech Solutions' },
  ],
  location: 'Global / Remote',
  email: 'stephanfilip7@gmail.com',
  phone: '+959954480806',
  siteUrl: 'https://thuyakyaw.com',
  siteUrlAlt: 'https://thuyakyaw.vercel.app',
  avatar: '/images/codecraft.jpg',
  cvPath: '/download/cv.pdf',
  company: 'PayVia Tech Solutions',
  companyUrl: 'https://paicafes.com',
};

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thu-ya-kyaw-5a606732b', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/Filip2k03', icon: 'github' },
  { label: 'Email', href: 'mailto:stephanfilip7@gmail.com', icon: 'email' },
  { label: 'Phone', href: 'tel:+959954480806', icon: 'phone' },
];

export const profiles = [
  { label: 'GitHub', href: 'https://github.com/Filip2k03', desc: 'Code & open source' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thu-ya-kyaw-5a606732b',
    desc: 'Professional profile',
  },
  { label: 'Reiwasakura', href: 'https://reiwasakura.tech', desc: 'My company — CTO' },
  { label: 'PaiCafes', href: 'https://paicafes.com', desc: 'Smart digital restaurant platform' },
  {
    label: 'Digital Marketplace MM',
    href: 'https://digitalmarketplacemm.com',
    desc: 'Multi-vendor marketplace I engineered',
  },
  { label: 'PayVia Tech', href: 'https://paicafes.com', desc: 'PayVia POS & commerce systems' },
];

export const capabilities = [
  {
    title: 'System Architecture',
    description:
      'Distributed systems, microservices, and event-driven pipelines designed for fault tolerance and scale.',
    icon: 'architecture',
  },
  {
    title: 'AI & Machine Learning',
    description:
      'Intelligent automation — predictive models, NLP integrations, and ML pipelines that optimize real operations.',
    icon: 'ai',
  },
  {
    title: 'Cloud Infrastructure',
    description:
      'Cloud-native deployment on AWS, Vercel, and Docker — CI/CD, monitoring, and zero-downtime releases.',
    icon: 'cloud',
  },
  {
    title: 'Marketplace Engineering',
    description:
      'Multi-vendor commerce platforms with seller dashboards, order flows, payments, and analytics.',
    icon: 'marketplace',
  },
  {
    title: 'Real-Time Systems',
    description:
      'WebSockets, live dashboards, kitchen displays, and POS sync — data that moves at the speed of business.',
    icon: 'realtime',
  },
  {
    title: 'Security & Reliability',
    description:
      'Secure APIs, auth flows, encrypted data paths, and production-grade error handling.',
    icon: 'security',
  },
];

export const featuredProduct = {
  eyebrow: 'FEATURED PRODUCT',
  title: 'Zazy2Door Marketplace',
  description:
    'A full-scale multi-vendor marketplace with seller dashboards, order flows, and analytics built for real commerce.',
  href: 'https://digitalmarketplacemm.com',
  cta: 'Request Demo',
  exploreCta: 'Explore Zazy2Door',
  features: [
    'Vendor onboarding & dashboards',
    'Cart, checkout & order lifecycle',
    'Admin & seller analytics',
    'Mobile-first performance UI',
  ],
  image: '/images/digitalmarketplacemm.svg',
};

export const skills = [
  { name: 'System Engineering', level: 92, icon: 'docker' },
  { name: 'AI & Machine Learning', level: 85, icon: 'python' },
  { name: 'HTML5', level: 95, icon: 'html' },
  { name: 'CSS3', level: 90, icon: 'css' },
  { name: 'JavaScript', level: 88, icon: 'js' },
  { name: 'TypeScript', level: 82, icon: 'typescript' },
  { name: 'React', level: 88, icon: 'react' },
  { name: 'Next.js', level: 85, icon: 'nextjs' },
  { name: 'Node.js', level: 80, icon: 'node' },
  { name: 'Python + Django', level: 78, icon: 'python' },
  { name: 'PHP + Laravel', level: 75, icon: 'php' },
  { name: 'Tailwind CSS', level: 88, icon: 'tailwind' },
  { name: 'MySQL', level: 82, icon: 'mysql' },
  { name: 'Docker', level: 78, icon: 'docker' },
  { name: 'Git & GitHub', level: 92, icon: 'git' },
  { name: 'Figma / UI Design', level: 88, icon: 'figma' },
];

export const services = [
  {
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions to automate and optimize processes.',
    icon: 'ai',
    image: '/images/full.png',
  },
  {
    title: 'API Development',
    description: 'Secure and reliable APIs to connect your services.',
    icon: 'api',
    image: '/images/full.png',
  },
  {
    title: 'Cloud Infrastructure',
    description: 'Scalable and secure cloud deployment and management.',
    icon: 'cloud',
    image: '/images/host.png',
  },
  {
    title: 'Content Management Systems (CMS)',
    description: 'Scalable and user-friendly CMS platforms.',
    icon: 'cms',
    image: '/images/cms.jpeg',
  },
  {
    title: 'E-commerce Platforms',
    description: 'Robust online stores with secure payment gateways.',
    icon: 'ecommerce',
    image: '/images/digitalmarketplacemm.svg',
  },
  {
    title: 'Hospital Management Systems (HMS)',
    description: 'Integrated solutions for healthcare providers.',
    icon: 'hms',
    image: '/images/full.png',
  },
  {
    title: 'Mobile App Development',
    description: 'Native and hybrid apps for iOS and Android.',
    icon: 'mobile',
    image: '/images/front.avif',
  },
  {
    title: 'Point of Sale (POS) Systems',
    description: 'Custom POS solutions for retail and hospitality.',
    icon: 'pos',
    image: '/images/pos.svg',
  },
  {
    title: 'School Management Systems (SMS)',
    description: 'Comprehensive software for educational institutions.',
    icon: 'sms',
    image: '/images/online.jpeg',
  },
  {
    title: 'Test Server & Demo Environments',
    description: 'Staging, demo, and QA environments for rapid validation.',
    icon: 'demo',
    image: '/images/host.png',
  },
  {
    title: 'UI/UX Design',
    description: 'Intuitive and beautiful user interface design.',
    icon: 'uiux',
    image: '/images/uiux.webp',
  },
  {
    title: 'Full Stack Development',
    description: 'End-to-end web applications — robust back-ends, polished front-ends, scalable architecture.',
    icon: 'fullstack',
    image: '/images/full.png',
  },
  {
    title: 'Front-End Development',
    description: 'Visually appealing, user-friendly interfaces built with modern frameworks.',
    icon: 'frontend',
    image: '/images/front.avif',
  },
  {
    title: 'Web Hosting & Domains',
    description: 'Reliable hosting, domain purchase and management to establish your online presence.',
    icon: 'hosting',
    image: '/images/host.png',
  },
  {
    title: 'Online Programming Courses',
    description: 'Hands-on tutorials and courses to level up your coding skills, from basics to production.',
    icon: 'courses',
    image: '/images/online.jpeg',
  },
];

export const projects = [
  {
    title: 'Zazy2Door Marketplace',
    description:
      'A full-scale multi-vendor marketplace with seller dashboards, order flows, and analytics built for real commerce.',
    href: 'https://digitalmarketplacemm.com',
    tags: ['Marketplace', 'Multi-vendor', 'Production'],
    image: '/images/digitalmarketplacemm.svg',
    featured: true,
  },
  {
    title: 'Pai Cafe',
    description:
      'Paicafe.online is a smart digital restaurant solution powered by PayVia POS System. Customers scan a QR code to browse the menu, place orders, and pay online — with real-time kitchen display, table panel updates, and smart inventory management.',
    href: 'https://paicafes.com',
    tags: ['POS', 'Restaurant', 'PayVia'],
    image: '/images/paicafes.svg',
  },
  {
    title: 'Retail POS Pro',
    description: 'A cloud-based POS system for a multi-location retail chain.',
    href: 'https://paicafes.com',
    tags: ['POS', 'Cloud', 'Retail'],
    image: '/images/pos.svg',
  },
  {
    title: 'Edu-Manage Suite',
    description: 'A comprehensive SMS for a network of international schools.',
    href: 'https://reiwasakura.tech',
    tags: ['SMS', 'Education', 'Enterprise'],
    image: '/images/online.jpeg',
  },
  {
    title: 'Health-Plus HMS',
    description: 'A hospital management system improving patient care.',
    href: 'https://reiwasakura.tech',
    tags: ['HMS', 'Healthcare', 'Enterprise'],
    image: '/images/full.png',
  },
  {
    title: 'Dynamic CMS Builder',
    description: 'A headless CMS for a major online publisher.',
    href: 'https://reiwasakura.tech',
    tags: ['CMS', 'Headless', 'Publishing'],
    image: '/images/cms.jpeg',
  },
  {
    title: 'Shopify Alternative',
    description: 'A custom e-commerce platform for a niche market.',
    href: 'https://digitalmarketplacemm.com',
    tags: ['E-commerce', 'Custom', 'Payments'],
    image: '/images/digitalmarketplacemm.svg',
  },
  {
    title: 'AI-Powered Logistics',
    description: 'An ML model that optimizes delivery routes in real-time.',
    href: 'https://github.com/Filip2k03',
    tags: ['AI/ML', 'Logistics', 'Optimization'],
    image: '/images/full.png',
  },
  {
    title: 'Reiwasakura',
    description:
      'Company platform of Reiwasakura, where I lead technology as CTO — engineering strategy, product and delivery at reiwasakura.tech.',
    href: 'https://reiwasakura.tech',
    tags: ['CTO', 'Company', 'Platform'],
    image: '/images/reiwasakura-logo.png',
    fit: 'contain',
  },
  {
    title: 'Digizens Alliance',
    description:
      'Designed and developed the full UI/UX for the Digizens Alliance website, ensuring optimal user experience and seamless functionality.',
    href: 'https://digizensalliance.org/',
    tags: ['UI/UX', 'Web Design', 'React'],
    image: '/images/uiux.webp',
  },
  {
    title: 'Portfolio v2',
    description:
      'This site — a premium dark-mode portfolio built with Next.js, focused on performance, accessibility and SEO.',
    href: 'https://thuyakyaw.com',
    tags: ['Next.js', 'SEO', 'Design System'],
    image: '/images/portfolio.jpg',
  },
];

export const experience = [
  {
    title: 'Leadership & Engineering',
    items: [
      'Chief Technology Officer at Reiwasakura — leading engineering strategy, architecture and delivery.',
      'Chief Technology Officer at New Earth Company Limited — driving product engineering and technical direction.',
      'Lead Engineer at PayVia Tech Solutions — building POS, marketplace, and restaurant platforms at scale.',
      'Shipped real-world production platforms including paicafes.com and digitalmarketplacemm.com.',
    ],
  },
  {
    title: 'AI, ML & Intelligent Systems',
    items: [
      'Designed ML pipelines for logistics optimization and predictive analytics.',
      'Integrated AI-powered automation into POS and marketplace workflows.',
      'Built intelligent inventory and order-routing systems for restaurant platforms.',
    ],
  },
  {
    title: 'System Engineering',
    items: [
      'Architected distributed systems with secure APIs, real-time sync, and cloud-native deployment.',
      'Engineered multi-vendor marketplace infrastructure — vendor onboarding, checkout, and analytics.',
      'Developed secure, scalable back-end systems with PHP, Python, and Node.js.',
    ],
  },
  {
    title: 'Key Achievements',
    items: [
      'Designed and developed UI/UX for Digizens Alliance (digizensalliance.org) and additional client platforms.',
      'Built dynamic, interactive components with React, styled with Tailwind CSS and Bootstrap.',
      'Created reusable component libraries and hooks to streamline development across projects.',
    ],
  },
  {
    title: 'Education',
    items: [
      'Diploma in Business Information Technology — IT principles, web development and business systems.',
      'Diploma in Human Resources and Project Management — project coordination, collaboration and operations.',
    ],
  },
];
