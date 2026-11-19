import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "ES" | "EN";
export const defaultLanguage: Language = "ES";
export function translate(language: Language, es: string, en: string) { return language === "ES" ? es : en; }
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: defaultLanguage, setLanguage: () => {} });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  useEffect(() => { document.documentElement.lang = language.toLowerCase(); }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const { language, setLanguage } = useContext(LanguageContext);
  return { language, setLanguage, t: (es: string, en: string) => translate(language, es, en) };
}