import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { ContactActions } from "./ContactActions";
import { useContent } from "../content/ContentProvider";
import { useT } from "../i18n/LocaleProvider";
import type { Language } from "../content/types";

/** Финальный призыв. Имя файла осталось прежним, но формы здесь больше нет — только WhatsApp и звонок. */
export function ContactForm({ language }: { language?: Language }) {
  const site = useContent();
  const content = site.contactForm;
  const t = useT();

  return (
    <section className="py-12 md:py-20 bg-[#EFF1F7] border-t border-[#DCE1ED]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_.9fr] gap-8 lg:gap-14 items-start max-w-6xl">

          <div className="min-w-0">
            <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
              {t.contact.lastStep}
            </div>
            <h2 className="text-[#101A2E] text-[25px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance break-words" style={{ fontFamily: 'Onest, sans-serif' }}>
              {content.title}
            </h2>
            <p className="text-[#5A6480] text-[16px] md:text-lg mb-6 md:mb-7 max-w-[34em]">
              {content.subtitle}
            </p>

            <div className="grid gap-3">
              {content.guarantees.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1E45B8] flex-shrink-0 mt-0.5" />
                  <span className="text-[#101A2E] text-[15.5px] md:text-[17px]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-[#DCE1ED] shadow-[0_18px_44px_rgba(16,26,46,0.09)]">
            <h3 className="text-[#101A2E] text-[20px] font-bold tracking-[-0.01em] mb-1.5" style={{ fontFamily: 'Onest, sans-serif' }}>
              {t.contact.cardTitle}
            </h3>
            <p className="text-[#5A6480] text-[15px] mb-5">{t.contact.cardSubtitle}</p>
            <ContactActions course={language} source={`final-${language ?? "general"}`} note />
            <p className="text-xs text-[#8B94AB] text-center pt-4">
              <Link to="/privacy" className="underline hover:text-[#1E45B8]">{t.footer.privacy}</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
