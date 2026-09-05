import Link from 'next/link';
import Layout from '../components/Layout';

const NotFound = () => {
  return (
    <Layout title="Page Not Found" description="This page does not exist.">
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="section-eyebrow">error --code 404</span>
          <h1 className="section-title">
            Page <span>Not Found</span>
          </h1>
          <p className="section-lead" style={{ marginInline: 'auto' }}>
            The page you&apos;re looking for has been moved, deleted, or never existed.
          </p>
          <Link href="/" className="btn">
            Back to Home
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
