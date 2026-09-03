import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useContent } from "../content/ContentProvider";

export function FAQ() {
  const content = useContent().faq;

  return (
    <section className="py-14 md:py-20 bg-white border-t border-[#DCE1ED]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[34em] mb-10">
          <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
            Вопросы
          </div>
          <h2 className="text-[#101A2E] text-[27px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
            {content.title}
          </h2>
          <p className="text-[#5A6480] text-[17px] md:text-lg">{content.subtitle}</p>
        </div>

        <Accordion type="single" collapsible className="max-w-[860px] border-t border-[#DCE1ED]">
          {content.items.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#DCE1ED]">
              <AccordionTrigger className="text-left py-5 text-[#101A2E] text-[17px] md:text-[18.5px] font-semibold hover:no-underline" style={{ fontFamily: 'Onest, sans-serif' }}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#5A6480] text-[15.5px] md:text-base leading-relaxed pb-5 max-w-[62ch]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
