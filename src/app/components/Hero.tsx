import { CheckCircle } from "lucide-react";
import { ContactActions } from "./ContactActions";
import { useLanguageContent, useContent } from "../content/ContentProvider";
import { useT } from "../i18n/LocaleProvider";
import type { Language } from "../content/types";

interface HeroProps {
  language: Language;
}

export function Hero({ language }: HeroProps) {
  const hero = useLanguageContent(language).hero;
  const { trust } = useContent();
  const t = useT();

  return (
    <section className="bg-white border-b border-[#DCE1ED]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-8 lg:gap-14 items-start pt-8 md:pt-16">

          {/* Левая колонка */}
          <div className="min-w-0">
            <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
              {hero.eyebrow}
            </div>

            <h1
              className="text-[#101A2E] text-[28px] sm:text-[34px] md:text-[44px] lg:text-[50px] font-extrabold leading-[1.15] tracking-[-0.02em] mt-3 mb-4 text-balance break-words"
              style={{ fontFamily: 'Onest, sans-serif' }}
            >
              {hero.title}{' '}
              <span className="text-[#1E45B8]">{hero.titleHighlight}</span>
            </h1>

            <p className="text-[#5A6480] text-[17px] md:text-xl leading-relaxed max-w-[32em] mb-6 md:mb-7">
              {hero.subtitle}
            </p>

            <div className="grid gap-3">
              {hero.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1E45B8] flex-shrink-0 mt-1" />
                  <p className="text-[#101A2E] text-[15.5px] md:text-[17px] leading-relaxed">
                    <strong className="font-semibold">{benefit.bold}</strong>{benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Запись: только WhatsApp или звонок */}
          <div id="hero-form" className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-[#DCE1ED] shadow-[0_18px_44px_rgba(16,26,46,0.09)] scroll-mt-24">
            <h2 className="text-[#101A2E] text-[21px] md:text-[22px] font-bold tracking-[-0.01em] mb-1.5" style={{ fontFamily: 'Onest, sans-serif' }}>
              {t.contact.cardTitle}
            </h2>
            <p className="text-[#5A6480] text-[15px] mb-5">{t.contact.cardSubtitle}</p>
            <ContactActions course={language} source={`hero-${language}`} note />
          </div>
        </div>

        {/* Полоса доверия */}
        <div className="mt-10 md:mt-14 border-t border-[#DCE1ED] grid grid-cols-2 md:grid-cols-4">
          {trust.map((item, i) => (
            <div
              key={i}
              className="py-4 md:py-5 pr-4 md:px-5 md:first:pl-0 border-[#DCE1ED] md:border-r md:last:border-r-0 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0 [&:nth-child(odd)]:pr-4 [&:nth-child(even)]:pl-4 md:[&:nth-child(even)]:pl-5"
            >
              <b className="block text-[14px] md:text-[15px] font-bold text-[#101A2E] leading-snug" style={{ fontFamily: 'Onest, sans-serif' }}>{item.title}</b>
              <span className="text-[#5A6480] text-[13px] md:text-sm leading-snug">{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
