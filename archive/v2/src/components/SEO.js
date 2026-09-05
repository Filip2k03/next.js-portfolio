import Head from 'next/head';
import { useRouter } from 'next/router';
import { identity, socials } from '../data/profile';

// Centralized per-page SEO: meta, Open Graph, Twitter cards and JSON-LD Person schema.
const SEO = ({ title, description, image }) => {
  const router = useRouter();
  const pageTitle = title
    ? `${title} | ${identity.name} (${identity.alias})`
    : `${identity.name} (${identity.alias}) — Full Stack Developer & UI/UX Designer`;
  const pageDescription =
    description ||
    `${identity.name}, also known as ${identity.alias} — ${identity.roles.join(', ')}. ${identity.tagline}`;
  const canonical = `${identity.siteUrl}${router.pathname === '/' ? '' : router.pathname}`;
  const ogImage = `${identity.siteUrl}${image || identity.avatar}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: identity.name,
    alternateName: [identity.alias, 'techyyfilip'],
    url: identity.siteUrl,
    image: ogImage,
    email: `mailto:${identity.email}`,
    jobTitle: identity.roles[0],
    worksFor: identity.positions.map((p) => ({
      '@type': 'Organization',
      name: p.company,
    })),
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'UI/UX Design',
      'PHP',
      'Python',
      'WordPress',
    ],
    sameAs: socials.filter((s) => s.href.startsWith('https')).map((s) => s.href),
  };

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta
        name="keywords"
        content={`${identity.name}, ${identity.alias}, techyyfilip, full stack developer, UI/UX designer, React developer, Next.js, web developer Myanmar, freelance developer`}
      />
      <meta name="author" content={`${identity.name} (${identity.alias})`} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={identity.alias} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script
        type="application/ld+json"
        // JSON-LD requires raw JSON in a script tag; content is static site data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </Head>
  );
};

export default SEO;
