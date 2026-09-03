import { useContent } from "../content/ContentProvider";


export function HowItWorks() {
  const content = useContent().howItWorks;
  const steps = content.steps;

  return (
    <section className="py-14 md:py-20 bg-[#101A2E]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[34em] mb-10 md:mb-12">
          <div className="text-[#F07135] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
            {content.eyebrow}
          </div>
          <h2 className="text-white text-[27px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
            {content.title}
          </h2>
          <p className="text-[#A9B3C9] text-[17px] md:text-lg">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#27344D] rounded-2xl overflow-hidden">
          {steps.map((step, index) => (
            <div key={index} className="bg-[#1B2942] px-6 py-7">
              <i className="not-italic text-[#F07135] text-xs font-bold tracking-[0.1em]" style={{ fontFamily: 'Onest, sans-serif' }}>
                ШАГ {step.number}
              </i>
              <h4 className="text-white text-[17.5px] font-semibold mt-3 mb-2" style={{ fontFamily: 'Onest, sans-serif' }}>
                {step.title}
              </h4>
              <p className="text-[#A9B3C9] text-[15px] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
