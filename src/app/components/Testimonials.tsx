import { Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguageContent } from "../content/ContentProvider";
import type { Language } from "../content/types";

interface TestimonialsProps {
  language?: Language;
}

export function Testimonials({ language = "english" }: TestimonialsProps) {
  const content = useLanguageContent(language).testimonials;

  // Для казахского реальных отзывов пока нет — секция не рендерится
  if (!content || content.items.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-[#EFF1F7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[34em] mb-10 md:mb-12">
          <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
            Отзывы
          </div>
          <h2 className="text-[#101A2E] text-[27px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
            {content.title}
          </h2>
          <p className="text-[#5A6480] text-[17px] md:text-lg">{content.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {content.items.map((review, index) => (
            <figure
              key={index}
              className="bg-white border border-[#DCE1ED] rounded-[18px] p-6 md:p-7 hover:border-[#C3CCE2] transition-colors duration-200"
            >
              <Quote className="w-6 h-6 text-[#C3CCE2]" />

              <blockquote className="text-[#3E4A66] text-[15.5px] leading-relaxed mt-4">
                {review.text}
              </blockquote>

              <figcaption className="flex items-center gap-3 mt-5 pt-5 border-t border-[#DCE1ED]">
                {review.image ? (
                  <ImageWithFallback
                    src={review.image}
                    alt={review.parent}
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div
                    className="w-11 h-11 rounded-full bg-[#E8EDFB] text-[#1E45B8] flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{ fontFamily: 'Onest, sans-serif' }}
                    aria-hidden="true"
                  >
                    {review.parent.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-[#101A2E] font-semibold" style={{ fontFamily: 'Onest, sans-serif' }}>
                    {review.parent}
                  </div>
                  {review.relation && (
                    <div className="text-[#5A6480] text-sm">{review.relation}</div>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
