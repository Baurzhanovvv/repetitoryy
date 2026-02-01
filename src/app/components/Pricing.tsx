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
      discount: null
    },
    {
      name: "ОПТИМУМ",
      lessons: "24 занятия",
      price: "138 000 ₸",
      oldPrice: "168 000 ₸",
      pricePerLesson: "5 750 ₸ / занятие",
      duration: "Срок: 3 месяца",
      popular: true,
      discount: "-18%"
    },
    {
      name: "МАКСИМУМ",
      lessons: "48 занятий",
      price: "240 000 ₸",
      oldPrice: "336 000 ₸",
      pricePerLesson: "5 000 ₸ / занятие",
      duration: "Срок: 6 месяцев",
      popular: false,
      discount: "-29%"
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
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-[#FFF7ED] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#2563EB]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-[32px] md:text-[40px]" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
            Выберите удобный абонемент
          </h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto mb-6">
            Только абонементы — это дисциплинирует и даёт результат
          </p>
          
          {/* Promo banner */}
          <div className="inline-flex items-center gap-2 bg-[#F97316] text-white px-6 py-3 rounded-full shadow-lg">
            <Gift className="w-5 h-5" />
            <span className="font-semibold">До конца января — 2 урока в подарок к тарифам «Оптимум» и «Максимум»</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-12 md:mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-[#F97316] shadow-2xl md:scale-105 md:-mt-4 md:mb-4'
                  : 'border-gray-200 hover:border-[#2563EB]/30 hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white text-center py-3 font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 fill-white" />
                    Популярный
                  </div>
                </div>
              )}

              <div className={`p-8 md:p-10 ${plan.popular ? 'pt-16' : ''}`}>
                {/* Discount badge */}
                {plan.discount && (
                  <div className="absolute top-6 right-6 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {plan.discount}
                  </div>
                )}

                <h3 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
                  {plan.name}
                </h3>
                <p className="text-[#64748B] mb-6 text-lg">{plan.lessons}</p>

                <div className="mb-6">
                  {plan.oldPrice && (
                    <div className="text-xl text-[#94A3B8] line-through mb-1">
                      {plan.oldPrice}
                    </div>
                  )}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-[#1E293B]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-[#64748B] text-lg">{plan.pricePerLesson}</p>
                  <p className="text-[#64748B] text-sm mt-2">{plan.duration}</p>
                </div>

                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className={`w-full text-base py-6 rounded-xl shadow-lg ${
                    plan.popular
                      ? 'text-white'
                      : 'bg-white border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white'
                  }`}
                  style={plan.popular ? { backgroundColor: '#F97316' } : {}}
                >
                  Начать обучение
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Included features */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto border border-gray-100">
          <h3 className="text-center mb-8 text-2xl md:text-3xl" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
            Что входит во все тарифы
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {includedFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-[#1E293B] text-base md:text-lg leading-relaxed">
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
