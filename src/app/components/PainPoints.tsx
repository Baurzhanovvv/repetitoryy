import { useLanguageContent } from "../content/ContentProvider";
import type { Language } from "../content/types";

interface PainPointsProps {
  language?: Language;
}

export function PainPoints({ language = "english" }: PainPointsProps) {
  const content = useLanguageContent(language).painPoints;

  return (
    <section className="py-14 md:py-20">
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

        {/* Реплики: нечётные слева, чётные справа — как в переписке */}
        <div className="grid gap-4 max-w-[860px]">
          {content.items.map((point, index) => (
            <div
              key={index}
              className={
                "bg-white border border-[#DCE1ED] px-6 py-5 md:max-w-[620px] transition-all duration-200 hover:border-[#C3CCE2] " +
                (index % 2 === 0
                  ? "rounded-[18px] rounded-bl-[5px] md:hover:translate-x-[3px]"
                  : "rounded-[18px] rounded-br-[5px] md:ml-auto md:hover:-translate-x-[3px]")
              }
            >
              <p className="text-[#101A2E] text-[18px] md:text-[18.5px] font-semibold tracking-[-0.01em]" style={{ fontFamily: 'Onest, sans-serif' }}>
                «{point.title}»
              </p>
              <p className="text-[#5A6480] text-[15.5px] leading-relaxed mt-1.5">{point.description}</p>
            </div>
          ))}
        </div>

        {content.footer && (
          <p className="max-w-[860px] mt-6 px-5 py-4 bg-[#E8EDFB] rounded-2xl text-[#1E45B8] text-[17px] font-semibold" style={{ fontFamily: 'Onest, sans-serif' }}>
            {content.footer}
          </p>
        )}
      </div>
    </section>
  );
}
