import { MessageCircle, Shield, Laptop, Sparkles } from "lucide-react";

export function Solutions() {
  const solutions = [
    {
      icon: MessageCircle,
      title: "Индивидуальный подход",
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
      description: "Наши дети реально показывают результаты — 90% доходят до своей цели. У остальных вмешиваются обстоятельства, на которые мы повлиять не можем."
    },
    {
      icon: Sparkles,
      title: "Хорошая методология",
      description: "У нас есть своя школа преподавателей, где мы сами задаём планку. Преподаватели постоянно обучаются и совершенствуют методику."
    }
  ];

  return (
    <section className="py-14 md:py-20 bg-[#EFF1F7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[34em] mb-10 md:mb-12">
          <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
            Что мы делаем иначе
          </div>
          <h2 className="text-[#101A2E] text-[27px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
            Почему у нас получается там, где не получалось раньше
          </h2>
          <p className="text-[#5A6480] text-[17px] md:text-lg">
            Проверенные методы, которые работают для сотен детей по всему Казахстану.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
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
