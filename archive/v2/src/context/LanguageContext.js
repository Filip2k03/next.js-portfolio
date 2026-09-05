import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { translations, LANGUAGES } from '../data/i18n';
import { storageGet, storageSet, STORAGE_KEYS } from '../lib/storage';

const LanguageContext = createContext({ lang: 'en', setLang: () => {} });

// Language choice persists via the storage contract (tf:v1:lang) and always
// hydrates after mount so SSR markup (English) never mismatches.
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    const saved = storageGet(STORAGE_KEYS.lang, 'en');
    if (LANGUAGES.some((l) => l.code === saved)) {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = useCallback((code) => {
    if (!LANGUAGES.some((l) => l.code === code)) return;
    setLangState(code);
    storageSet(STORAGE_KEYS.lang, code);
    document.documentElement.lang = code;
  }, []);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);

// Convenience hook: returns the active translation table.
export const useT = () => translations[useContext(LanguageContext).lang];
