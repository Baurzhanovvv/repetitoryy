import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import defaultContent from "./default-content.json";
import type { SiteContent, Language, LanguageContent } from "./types";

/**
 * Контент сайта редактируется через админку и лежит на сервере в /content.json,
 * который отдаёт nginx как обычный статический файл.
 *
 * Встроенная копия (default-content.json) — страховка: если файл не загрузился,
 * сайт всё равно отрисуется, просто без последних правок. Поэтому рендерим
 * сразу с ней, а пришедший с сервера контент подставляем поверх.
 */

const FALLBACK = defaultContent as unknown as SiteContent;

const ContentContext = createContext<SiteContent>(FALLBACK);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    fetch('/content.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        // минимальная проверка, чтобы битый файл не обрушил страницу
        if (!cancelled && data && data.languages && data.pricing) {
          setContent(data as SiteContent);
        }
      })
      .catch(() => {
        // молча остаёмся на встроенной копии — это штатный сценарий
      });

    return () => { cancelled = true; };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

/** Весь контент сайта. */
export function useContent(): SiteContent {
  return useContext(ContentContext);
}

/** Контент конкретной языковой страницы. */
export function useLanguageContent(language: Language): LanguageContent {
  return useContent().languages[language];
}
