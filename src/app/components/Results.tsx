import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "../i18n/LocaleProvider";
import { trackContact } from "../utils/analytics";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { useLanguageContent, useContent } from "../content/ContentProvider";
import type { Language } from "../content/types";

interface ResultsProps {
  language?: Language;
}

export function Results({ language = "english" }: ResultsProps) {
  const content = useLanguageContent(language).results;
  const t = useT();
  const { contacts } = useContent();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Секции может не быть — например, для казахского пока нет реальных кейсов
  if (!content || content.cases.length === 0) return null;

  const cases = content.cases;
  const item = cases[Math.min(currentSlide, cases.length - 1)];

  const next = () => setCurrentSlide((p) => (p + 1) % cases.length);
  const prev = () => setCurrentSlide((p) => (p - 1 + cases.length) % cases.length);

  const waLink = `https://wa.me/${contacts.phoneRaw}?text=${encodeURIComponent(t.contact.waText[language])}`;

  return (
    <section className="py-14 md:py-20 bg-white border-t border-[#DCE1ED]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[34em] mb-10 md:mb-12">
          <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
            {content.eyebrow}
          </div>
          <h2 className="text-[#101A2E] text-[27px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
            {content.title}
          </h2>
          <p className="text-[#5A6480] text-[17px] md:text-lg">{content.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-start max-w-6xl">
          {item.image && (
            <div className="rounded-[18px] overflow-hidden border border-[#DCE1ED] bg-[#EFF1F7] md:sticky md:top-24">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full aspect-[16/10] md:aspect-[3/4] object-cover"
              />
            </div>
          )}

          <div>
            <span className="inline-flex items-center gap-2 bg-[#FBEBE2] text-[#D9541C] text-[13px] font-semibold px-3 py-1.5 rounded-full" style={{ fontFamily: 'Onest, sans-serif' }}>
              <Clock className="w-3.5 h-3.5" />
              {item.duration}
            </span>

            <h3 className="text-[#101A2E] text-[23px] md:text-[28px] font-bold tracking-[-0.02em] mt-4 mb-4 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
              {item.title}
            </h3>

            {item.story.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-[#3E4A66] text-[16.5px] leading-relaxed mb-3.5 max-w-[64ch]">
                {paragraph}
              </p>
            ))}

            {item.testimonial && (
              <blockquote className="border-l-[3px] border-[#D9541C] pl-5 my-6 max-w-[64ch]">
                <p className="text-[#5A6480] text-[16px] leading-relaxed italic">{item.testimonial}</p>
                <footer className="text-[#101A2E] text-[14.5px] mt-2.5 not-italic">{t.sections.parentReview}</footer>
              </blockquote>
            )}

            <p className="text-[#3E4A66] text-[16.5px] leading-relaxed max-w-[64ch]">{item.conclusion}</p>

            {cases.length > 1 && (
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <button
                  onClick={prev}
                  aria-label={t.sections.prevStory}
                  className="w-10 h-10 rounded-full border border-[#DCE1ED] flex items-center justify-center text-[#1E45B8] hover:bg-[#E8EDFB] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-1.5">
                  {cases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`${i + 1} / ${cases.length}`}
                      className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-[#1E45B8]' : 'w-1.5 bg-[#C3CCE2] hover:bg-[#8B94AB]'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  aria-label={t.sections.nextStory}
                  className="w-10 h-10 rounded-full border border-[#DCE1ED] flex items-center justify-center text-[#1E45B8] hover:bg-[#E8EDFB] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp", `results-${language}`)}
                  className="w-full sm:w-auto sm:ml-auto min-h-[48px] inline-flex items-center justify-center rounded-xl text-white font-semibold bg-[#D9541C] hover:bg-[#F07135] px-5 text-center"
                >
                  {content.cta}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
