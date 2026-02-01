import { XCircle, MessageSquareX, Clock, Frown } from "lucide-react";

export function PainPoints() {
  const painPoints = [
    {
      icon: XCircle,
      title: "Учим английский 3 года — результата ноль",
      description: "Ребёнок ходит на курсы или к репетитору, но до сих пор не может составить простое предложение. Деньги уходят, а прогресса не видно."
    },
    {
      icon: MessageSquareX,
      title: "Боится говорить — молчит на уроках",
      description: "Знает слова, понимает грамматику, но как дело доходит до разговора — замыкается. Страх ошибки парализует."
    },
    {
      icon: Clock,
      title: "Нет времени возить на занятия",
      description: "Хороший репетитор — на другом конце города. Дорога туда-обратно съедает 2 часа. А ещё пробки, усталость, домашка..."
    },
    {
      icon: Frown,
      title: "Скучные уроки — ребёнок не хочет заниматься",
      description: "Зубрёжка, учебники из 90-х, никакого интереса. Каждое занятие — борьба и уговоры."
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white via-[#FFF7ED]/30 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-[#F97316]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-[32px] md:text-[40px]" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
            Узнаёте себя?
          </h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto">
            Эти проблемы встречаются у 8 из 10 родителей, которые приходят к нам
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 md:p-10 rounded-3xl border-2 border-gray-100 hover:border-[#F97316]/30 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="mb-4 text-xl md:text-2xl" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
                  «{point.title}»
                </h3>
                <p className="text-[#475569] leading-relaxed text-base md:text-lg">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
