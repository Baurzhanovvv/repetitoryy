import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { LOCALES, UI, type Locale, type UiStrings } from "./ui";

const STORAGE_KEY = "lang";

function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as string[]).includes(v);
}

/** Язык: ?lang=kk → сохранённый выбор → русский (аудитория рекламы — русскоязычная по умолчанию). */
function detectLocale(): Locale {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (isLocale(fromUrl)) return fromUrl;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // localStorage может быть закрыт (приватный режим) — это нормально
  }
  return "ru";
}

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: UiStrings;
}

const Ctx = createContext<LocaleCtx>({ locale: "ru", setLocale: () => {}, t: UI.ru });

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* без сохранения тоже работает */
    }
  }, []);

  // <html lang>, <title> и description — для читалок экрана и поисковиков
  useEffect(() => {
    const t = UI[locale];
    document.documentElement.lang = locale;
    document.title = t.metaTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.metaDescription);
  }, [locale]);

  return <Ctx.Provider value={{ locale, setLocale, t: UI[locale] }}>{children}</Ctx.Provider>;
}

export const useLocale = () => useContext(Ctx);
/** Тексты интерфейса на текущем языке. */
export const useT = () => useContext(Ctx).t;
