import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { GraduationCap, BookOpen, ChevronRight } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#FFF7ED] flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Logo />
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-6xl w-full">
          {/* Title Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <GraduationCap className="w-12 h-12 text-[#2563EB]" />
              <div className="text-4xl">🎓</div>
            </div>
            <h1 className="text-[40px] md:text-[52px] lg:text-[64px] mb-6 text-[#1E293B]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Языковая онлайн школа <span className="text-[#2563EB]">казахского</span> и <span className="text-[#2563EB]">английского</span> языка
            </h1>
            <p className="text-xl md:text-2xl text-[#475569] max-w-3xl mx-auto leading-relaxed">
              Индивидуальные занятия с профессиональными преподавателями для детей 10-17 лет
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* English Card */}
            <Link 
              to="/english"
              className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#2563EB]/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-2xl"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-[#EFF6FF] rounded-2xl flex items-center justify-center group-hover:bg-[#2563EB] transition-colors duration-300">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16C8 13.7909 9.79086 12 12 12H20C22.2091 12 24 13.7909 24 16V22C24 24.2091 22.2091 26 20 26H15L11 30V26H12C9.79086 26 8 24.2091 8 22V16Z" className="fill-[#2563EB] group-hover:fill-white transition-colors duration-300"/>
                      <text x="16" y="21" className="fill-white group-hover:fill-[#2563EB] transition-colors duration-300" fontSize="10" fontWeight="bold" fontFamily="Montserrat, sans-serif" textAnchor="middle">Q</text>
                      <text x="30" y="14" fontSize="12">🇺🇸</text>
                    </svg>
                  </div>
                  <ChevronRight className="w-8 h-8 text-[#CBD5E1] group-hover:text-[#2563EB] transition-colors duration-300 group-hover:translate-x-1 transition-transform" />
                </div>

                <h2 className="text-[32px] mb-4 text-[#1E293B] group-hover:text-[#2563EB] transition-colors duration-300" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Английский язык
                </h2>

                <p className="text-[#64748B] text-lg leading-relaxed mb-6">
                  Профессиональное обучение английскому языку с индивидуальным подходом
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[#475569]">
                    <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
                    <span>Индивидуальный подход</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#475569]">
                    <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
                    <span>Качественный процесс</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#475569]">
                    <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
                    <span>Качественная обратная связь</span>
                  </div>
                  <div className="flex items-start gap-3 text-[#475569] mt-4 pt-3 border-t border-gray-100">
                    <div className="w-2 h-2 bg-[#2563EB] rounded-full mt-1.5"></div>
                    <span className="text-sm">Мы создаём качественный рабочий процесс и предоставляем хорошие условия!</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Kazakh Card */}
            <Link 
              to="/kazakh"
              className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#F97316]/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/5 rounded-full blur-2xl"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-[#FFF7ED] rounded-2xl flex items-center justify-center group-hover:bg-[#F97316] transition-colors duration-300">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16C8 13.7909 9.79086 12 12 12H20C22.2091 12 24 13.7909 24 16V22C24 24.2091 22.2091 26 20 26H15L11 30V26H12C9.79086 26 8 24.2091 8 22V16Z" className="fill-[#F97316] group-hover:fill-white transition-colors duration-300"/>
                      <text x="16" y="21" className="fill-white group-hover:fill-[#F97316] transition-colors duration-300" fontSize="10" fontWeight="bold" fontFamily="Montserrat, sans-serif" textAnchor="middle">Ә</text>
                      <text x="30" y="14" fontSize="12">🎓</text>
                    </svg>
                  </div>
                  <ChevronRight className="w-8 h-8 text-[#CBD5E1] group-hover:text-[#F97316] transition-colors duration-300 group-hover:translate-x-1 transition-transform" />
                </div>

                <h2 className="text-[32px] mb-4 text-[#1E293B] group-hover:text-[#F97316] transition-colors duration-300" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Казахский язык
                </h2>

                <p className="text-[#64748B] text-lg leading-relaxed mb-6">
                  Профессиональное обучение казахскому языку с индивидуальным подходом
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[#475569]">
                    <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
                    <span>Индивидуальный подход</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#475569]">
                    <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
                    <span>Качественный процесс</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#475569]">
                    <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
                    <span>Качественная обратная связь</span>
                  </div>
                  <div className="flex items-start gap-3 text-[#475569] mt-4 pt-3 border-t border-gray-100">
                    <div className="w-2 h-2 bg-[#F97316] rounded-full mt-1.5"></div>
                    <span className="text-sm">Мы создаём качественный рабочий процесс и предоставляем хорошие условия!</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center space-y-4">
            <p className="text-[#64748B] text-lg">
              Первое занятие — <span className="text-[#2563EB] font-semibold">бесплатно</span>. Без обязательств.
            </p>
            <div className="max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-4 md:p-6">
              <p className="text-sm md:text-base text-amber-900 leading-relaxed">
                ⚠️ <strong>Важно:</strong> Мы не гарантируем быстрый результат, так как это зависит от самого ученика и его желания, но гарантируем хорошие условия
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-[#94A3B8]">
          <p>&copy; {new Date().getFullYear()} Репетитор Рядом. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
