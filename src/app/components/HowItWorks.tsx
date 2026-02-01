import { Gift, ClipboardList, Calendar, TrendingUp } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Gift,
      number: "01",
      title: "Бесплатный пробный урок",
      description: "Знакомимся с ребёнком, определяем уровень, подбираем преподавателя. Вы видите, как проходит занятие, и принимаете решение."
    },
    {
      icon: ClipboardList,
      number: "02",
      title: "Составляем программу",
      description: "Индивидуальный план под цели: разговорный, школьная программа, подготовка к экзаменам. Учитываем интересы ребёнка."
    },
    {
      icon: Calendar,
      number: "03",
      title: "Регулярные занятия",
      description: "2-3 раза в неделю по 45-60 минут. Онлайн в Zoom. Домашние задания в игровом формате."
    },
    {
      icon: TrendingUp,
      number: "04",
      title: "Отчёты о прогрессе",
      description: "Каждый месяц — отчёт для родителей: что освоили, над чем работаем, какие успехи. Вы всегда в курсе."
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[#F8FAFC] to-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#10B981]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#2563EB]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-[32px] md:text-[40px]" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
            Простой и понятный процесс
          </h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto">
            Всего 4 шага отделяют вас от первых успехов ребёнка
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {step.number}
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#10B981] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="mb-3 text-xl md:text-2xl" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
                      {step.title}
                    </h3>
                    <p className="text-[#475569] leading-relaxed text-base md:text-lg">
                      {step.description}
                    </p>
                  </div>

                  {/* Connecting arrow for desktop */}
                  {index % 2 === 0 && index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-5 text-[#2563EB]/20">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                        <path d="M20 5 L35 20 L20 35 L20 25 L5 25 L5 15 L20 15 Z" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
