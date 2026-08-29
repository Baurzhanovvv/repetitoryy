import { Check, Star, Gift } from "lucide-react";
import { Button } from "./ui/button";

export function Pricing() {
  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const plans = [
    {
      name: "СТАРТ",
      lessons: "8 занятий",
      price: "52 000 ₸",
      pricePerLesson: "6 500 ₸ / занятие",
      duration: "Срок: 1 месяц",
      popular: false,
      discount: null,
      saving: null
    },
    {
      name: "ОПТИМУМ",
      lessons: "24 занятия",
      price: "138 000 ₸",
      oldPrice: "168 000 ₸",
      pricePerLesson: "5 750 ₸ / занятие",
      duration: "Срок: 3 месяца",
      popular: true,
      discount: "-18%",
      saving: "Экономия 30 000 ₸"
    },
    {
      name: "МАКСИМУМ",
      lessons: "48 занятий",
      price: "240 000 ₸",
      oldPrice: "336 000 ₸",
      pricePerLesson: "5 000 ₸ / занятие",
      duration: "Срок: 6 месяцев",
      popular: false,
      discount: "-29%",
      saving: "Экономия 96 000 ₸"
    }
  ];

  const includedFeatures = [
    "Индивидуальные занятия 45-60 минут",
    "Персональная программа обучения",
    "Домашние задания и проверка",
    "Ежемесячный отчёт о прогрессе",
    "Возможность заморозки (до 2 недель)"
  ];

  return (
    <section className="py-14 md:py-20 bg-[#EFF1F7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[34em] mb-9">
          <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
            Абонементы
          </div>
          <h2 className="text-[#101A2E] text-[27px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
            Чем длиннее абонемент, тем дешевле занятие
          </h2>
          <p className="text-[#5A6480] text-[17px] md:text-lg">
            Только абонементы — регулярность и есть то, что даёт результат.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2.5 rounded-xl bg-[#FBEBE2] text-[#D9541C] text-[15px] font-semibold" style={{ fontFamily: 'Onest, sans-serif' }}>
          <Gift className="w-4 h-4" />
          До конца сентября — 2 урока в подарок к тарифам «Оптимум» и «Максимум»
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={
                "bg-white rounded-[18px] p-7 relative " +
                (plan.popular ? "border-2 border-[#1E45B8] pt-8" : "border border-[#DCE1ED]")
              }
            >
              {plan.popular && (
                <div className="absolute -top-3 left-7 bg-[#1E45B8] text-white text-xs font-semibold tracking-[0.06em] px-3 py-1.5 rounded-lg" style={{ fontFamily: 'Onest, sans-serif' }}>
                  ЧАЩЕ ВСЕГО БЕРУТ
                </div>
              )}
              {plan.discount && (
                <div className="absolute top-6 right-6 text-[#D9541C] text-sm font-bold" style={{ fontFamily: 'Onest, sans-serif' }}>
                  {plan.discount}
                </div>
              )}

              <div className="text-[#5A6480] text-[13px] font-bold tracking-[0.1em]" style={{ fontFamily: 'Onest, sans-serif' }}>
                {plan.name}
              </div>
              <div className="text-[#101A2E] text-[21px] font-bold mt-2 mb-4" style={{ fontFamily: 'Onest, sans-serif' }}>
                {plan.lessons}
              </div>

              {plan.oldPrice && (
                <div className="text-[#8B94AB] text-base line-through tabular-nums">{plan.oldPrice}</div>
              )}
              <div className="text-[#101A2E] text-[36px] font-extrabold tracking-[-0.02em] leading-tight tabular-nums" style={{ fontFamily: 'Onest, sans-serif' }}>
                {plan.price}
              </div>
              <p className="text-[#5A6480] text-[15px] mt-1.5 tabular-nums">{plan.pricePerLesson}</p>
              <p className="text-[#5A6480] text-sm">{plan.duration}</p>
              {plan.saving && (
                <p className="text-[#D9541C] text-[13.5px] font-semibold mt-2.5" style={{ fontFamily: 'Onest, sans-serif' }}>
                  {plan.saving}
                </p>
              )}

              <Button
                onClick={scrollToForm}
                size="lg"
                className={
                  "w-full text-base py-6 rounded-xl mt-5 " +
                  (plan.popular
                    ? "bg-[#D9541C] hover:bg-[#F07135] text-white"
                    : "bg-white border-[1.5px] border-[#1E45B8] text-[#1E45B8] hover:bg-[#E8EDFB]")
                }
              >
                Начать обучение
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12">
        <h3 className="text-center mb-8 text-2xl md:text-3xl" style={{ fontFamily: 'Onest, sans-serif', color: '#101A2E' }}>
            Что входит во все тарифы
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {includedFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#1E45B8] to-[#16359A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-[#101A2E] text-base md:text-lg leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
