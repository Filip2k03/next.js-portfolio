import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { Poppins, JetBrains_Mono } from 'next/font/google';
import { LanguageProvider } from '../context/LanguageContext';
import { useAOS } from '../hooks/useAOS';
import 'aos/dist/aos.css';
import '../styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
});

function AppShell({ Component, pageProps }) {
  useAOS();
  return <Component {...pageProps} />;
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark">
      <LanguageProvider>
        <div className={`${poppins.variable} ${jetbrainsMono.variable}`}>
          <AppShell Component={Component} pageProps={pageProps} />
          <Analytics />
          <div className="crt-overlay" aria-hidden="true" />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default MyApp;
