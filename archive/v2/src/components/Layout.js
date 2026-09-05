import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import ScrollProgress from './ScrollProgress';
import Terminal from './Terminal';
import FoxMascot from './FoxMascot';
import TouchCTA from './TouchCTA';
import SEO from './SEO';

// Shared page shell: skip link, progress bar, header, main landmark,
// footer, back-to-top and the playable terminal easter egg.
const Layout = ({ children, title, description }) => {
  return (
    <>
      <SEO title={title} description={description} />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <TouchCTA />
      <Terminal />
      <FoxMascot />
      <BackToTop />
    </>
  );
};

export default Layout;
