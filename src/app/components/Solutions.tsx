import { MessageCircle, Shield, Laptop, Sparkles } from "lucide-react";
import { useContent } from "../content/ContentProvider";

const ICONS = [MessageCircle, Shield, Laptop, Sparkles];

export function Solutions() {
  const content = useContent().solutions;
  const solutions = content.items;

  return (
    <section className="py-14 md:py-20 bg-[#EFF1F7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[34em] mb-10 md:mb-12">
          <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
            {content.eyebrow}
          </div>
          <h2 className="text-[#101A2E] text-[27px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
            {content.title}
          </h2>
          <p className="text-[#5A6480] text-[17px] md:text-lg">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {solutions.map((solution, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <div
                key={index}
                className="bg-white border border-[#DCE1ED] rounded-[18px] p-7 md:p-8 hover:border-[#C3CCE2] transition-colors duration-200"
              >
                <Icon className="w-6 h-6 text-[#1E45B8]" />
                <h3 className="text-[#101A2E] text-xl md:text-[22px] font-bold tracking-[-0.01em] mt-4 mb-2" style={{ fontFamily: 'Onest, sans-serif' }}>
                  {solution.title}
                </h3>
                {solution.subtitle && (
                  <p className="text-[#1E45B8] text-[15px] font-semibold mb-2" style={{ fontFamily: 'Onest, sans-serif' }}>
                    {solution.subtitle}
                  </p>
                )}
                <p className="text-[#5A6480] text-[15.5px] md:text-base leading-relaxed">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
