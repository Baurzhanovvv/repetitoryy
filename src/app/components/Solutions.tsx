import { MessageCircle, Shield, Laptop, Sparkles } from "lucide-react";

export function Solutions() {
  const solutions = [
    {
      icon: MessageCircle,
      title: "Индивидуальный подход",
      subtitle: "Цена = Качество",
      description: "Индивидуальные занятия один на один. Преподаватель полностью сосредоточен на вашем ребёнке. Никаких групп — только персональное внимание."
    },
    {
      icon: Shield,
      title: "Интерактивные уроки",
      description: "Игры, квизы, видео, песни — ребёнок не замечает, как пролетает 45 минут. Учёба становится любимым занятием."
    },
    {
      icon: Laptop,
      title: "Каждый час отрабатываем на максимум",
      subtitle: "Каждый час урока — это инвестиция в будущее вашего ребёнка",
      description: "Наши дети реально показывают результаты. 90% смогли добиться результата, 10% — из-за обстоятельств, на которые мы не можем повлиять."
    },
    {
      icon: Sparkles,
      title: "Хорошая методология",
      description: "У нас есть своя школа преподавателей, где мы сами задаём планку. Преподаватели постоянно обучаются и совершенствуют методику."
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-[#EFF6FF] relative overflow-hidden">
      {/* Decorative waves */}
      <div className="absolute top-0 left-0 w-full h-32 opacity-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 C150,60 350,0 600,30 C850,60 1050,0 1200,30 L1200,120 L0,120 Z" fill="#2563EB" opacity="0.05"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-[32px] md:text-[40px]" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
            Почему мы?
          </h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto">
            Проверенные методы, которые работают для сотни детей по всему Казахстану
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group relative overflow-hidden"
              >
                {/* Decorative gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-[#10B981]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#10B981] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-xl md:text-2xl" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
                    {solution.title}
                  </h3>
                  {solution.subtitle && (
                    <p className="mb-3 text-base md:text-lg font-semibold text-[#2563EB]">
                      {solution.subtitle}
                    </p>
                  )}
                  <p className="text-[#475569] leading-relaxed text-base md:text-lg">
                    {solution.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
