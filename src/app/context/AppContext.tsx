"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'en' | 'ku';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  isDark: boolean;
  toggleDark: () => void;
  t: (ar: string, en: string, ku?: string) => string;
}

const AppContext = createContext<AppContextType>({
  lang: 'ar',
  setLang: () => {},
  dir: 'rtl',
  isDark: false,
  toggleDark: () => {},
  t: (ar) => ar,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ar');
  const [isDark, setIsDark] = useState(false);

  const dir = lang === 'ar' || lang === 'ku' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const setLang = (newLang: Language) => setLangState(newLang);
  const toggleDark = () => setIsDark(prev => !prev);
  const t = (ar: string, en: string, ku?: string) => {
    if (lang === 'ar') return ar;
    if (lang === 'en') return en;
    return ku ?? ar;
  };

  return (
    <AppContext.Provider value={{ lang, setLang, dir, isDark, toggleDark, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
