import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import defaultContent from "./default-content.json";
import contentKk from "./content.kk.json";
import contentEn from "./content.en.json";
import { useLocale } from "../i18n/LocaleProvider";
import type { Locale } from "../i18n/ui";
import type { SiteContent, Language, LanguageContent } from "./types";

/**
 * Русский контент редактируется через админку и лежит на сервере в /content.json,
 * который отдаёт nginx как обычный статический файл.
 *
 * Встроенная копия (default-content.json) — страховка: если файл не загрузился,
 * сайт всё равно отрисуется, просто без последних правок. Поэтому рендерим
 * сразу с ней, а пришедший с сервера контент подставляем поверх.
 *
 * Казахская и английская версии — переводы в content.kk.json / content.en.json.
 * В админке они не редактируются; чтобы цены и телефон не расходились с русской
 * версией, их мы берём из живого русского контента.
 */

const FALLBACK = defaultContent as unknown as SiteContent;
const TRANSLATIONS: Record<Exclude<Locale, "ru">, SiteContent> = {
  kk: contentKk as unknown as SiteContent,
  en: contentEn as unknown as SiteContent,
};

/** Перевод + то, что обязано совпадать с живым русским контентом: телефон и числа в тарифах. */
function withLiveFacts(tr: SiteContent, live: SiteContent): SiteContent {
  const samePlans = tr.pricing.plans.length === live.pricing.plans.length;
  return {
    ...tr,
    contacts: { ...tr.contacts, phone: live.contacts.phone, phoneRaw: live.contacts.phoneRaw },
    // ponytail: тексты «цена за занятие / срок / экономия» остаются как в переводе;
    // если в админке поменяют их, переводы нужно обновить вручную
    pricing: {
      ...tr.pricing,
      plans: samePlans
        ? tr.pricing.plans.map((p, i) => ({
            ...p,
            price: live.pricing.plans[i].price,
            oldPrice: live.pricing.plans[i].oldPrice,
            discount: live.pricing.plans[i].discount,
            popular: live.pricing.plans[i].popular,
          }))
        : tr.pricing.plans,
    },
  };
}

const ContentContext = createContext<SiteContent>(FALLBACK);

export function ContentProvider({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const [live, setLive] = useState<SiteContent>(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    fetch('/content.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        // минимальная проверка, чтобы битый файл не обрушил страницу
        if (!cancelled && data && data.languages && data.pricing) {
          setLive(data as SiteContent);
        }
      })
      .catch(() => {
        // молча остаёмся на встроенной копии — это штатный сценарий
      });

    return () => { cancelled = true; };
  }, []);

  const content = useMemo(
    () => (locale === "ru" ? live : withLiveFacts(TRANSLATIONS[locale], live)),
    [locale, live],
  );

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

/** Весь контент сайта на текущем языке. */
export function useContent(): SiteContent {
  return useContext(ContentContext);
}

/** Контент конкретной страницы-курса. */
export function useLanguageContent(language: Language): LanguageContent {
  return useContent().languages[language];
}
