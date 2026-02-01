import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Что если ребёнку не понравится?",
      answer: "Первый урок бесплатный. Если после него ребёнок не захочет продолжать — вы ничего не платите. Мы создаём комфортные условия для обучения."
    },
    {
      question: "Можно ли поменять преподавателя?",
      answer: "Да, в любой момент. Мы подберём другого педагога, который лучше подойдёт вашему ребёнку. Это бесплатно."
    },
    {
      question: "Какое оборудование нужно?",
      answer: "Компьютер, ноутбук или планшет с камерой и микрофоном. Стабильный интернет. Zoom установим вместе на пробном уроке."
    },
    {
      question: "Как происходит оплата?",
      answer: "Оплата абонемента целиком перед началом занятий. Принимаем карты Visa/Mastercard, Kaspi, банковский перевод."
    },
    {
      question: "Можно ли заморозить абонемент?",
      answer: "Да, до 2 недель за период абонемента. На время болезни или отпуска. Просто предупредите за 2 дня."
    },
    {
      question: "А если пропустим занятие?",
      answer: "Предупредите за 24 часа — перенесём без потери. Если не предупредили — занятие считается проведённым."
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-[#F8FAFC] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#10B981]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#2563EB]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-[32px] md:text-[40px]" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
            Ответы на популярные вопросы
          </h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto">
            Всё, что вы хотели знать об обучении в нашей школе
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl border-2 border-gray-100 px-6 md:px-8 py-2 data-[state=open]:border-[#F97316] data-[state=open]:shadow-lg transition-all"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-[#1E293B] pr-4 text-lg md:text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[#475569] leading-relaxed pb-6 text-base md:text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
