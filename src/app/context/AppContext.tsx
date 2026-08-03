"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_BASE_URL } from '@/lib/constants';

export type Language = 'ar' | 'en' | 'ku';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  isDark: boolean;
  toggleDark: () => void;
  t: (ar: string, en: string, ku?: string) => string;
  whatsapp: string;
}

const AppContext = createContext<AppContextType>({
  lang: 'ar',
  setLang: () => { },
  dir: 'rtl',
  isDark: false,
  toggleDark: () => { },
  t: (ar) => ar,
  whatsapp: '',
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ar');
  const [isDark, setIsDark] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');

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

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/site/store-settings`)
      .then(r => r.json())
      .then(json => {
        const raw: string = json?.data?.settings?.whatsapp ?? json?.settings?.whatsapp ?? '';
        setWhatsapp(raw.replace(/[^0-9]/g, ''));
      })
      .catch(() => { });
  }, []);

  const setLang = (newLang: Language) => setLangState(newLang);
  const toggleDark = () => setIsDark(prev => !prev);
  const t = (ar: string, en: string, ku?: string) => {
    if (lang === 'ar') return ar;
    if (lang === 'en') return en;
    return ku ?? ar;
  };

  return (
    <AppContext.Provider value={{ lang, setLang, dir, isDark, toggleDark, t, whatsapp }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
