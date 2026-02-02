import { Award, Users, GraduationCap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import teacher1 from "../../assets/teacher1.jpeg";
import teacher2 from "../../assets/teacher2.jpeg";
import teacher3 from "../../assets/teacher3.jpeg";

export function Teachers() {
  const teachers = [
    {
      image: teacher1,
      name: "Нурсулу",
      experience: "2 года преподавания",
      students: "Носитель казахского и турецкого",
      certificates: "Международный сертификат английского",
      specialization: "Преподаю английский и казахский детям и взрослым, выстраивая обучение с акцентом на развитие разговорных навыков, уверенности в общении и устойчивой мотивации к изучению языков. Имею опыт работы в международной школе английского языка JustToStudy."
    },
    {
      image: teacher3,
      name: "Асылжан",
      experience: "4 года преподавания",
      students: "Основатель онлайн-школы",
      certificates: "Авторская методика IELTS",
      specialization: "Основатель онлайн-школы Репетитор Рядом. Основатель авторской методики «учим Казахский как иностранный». Опыт преподавания английского, казахского, IELTS 4 года."
    },
    {
      image: teacher2,
      name: "Дания",
      experience: "2 года преподавания",
      students: "Носитель казахского языка",
      certificates: "IELTS C1",
      specialization: "Преподаю английский и казахский языки детям и взрослым, помогая развивать уверенность в разговоре и мотивацию к обучению. Ранее работала в международной школе английского языка AntiSchool."
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-[#EFF6FF] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-[#2563EB]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#F97316]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-[32px] md:text-[40px]" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
            Наши преподаватели
          </h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto">
            Каждый преподаватель прошёл строгий отбор и имеет международные сертификаты
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#2563EB]/30 group"
            >
              {/* Teacher Image */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <ImageWithFallback
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                
                {/* Name on image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl md:text-3xl mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {teacher.name}
                  </h3>
                </div>
              </div>
              
              {/* Teacher Info */}
              <div className="p-6 md:p-8 space-y-4">
                {/* Experience */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] uppercase tracking-wide">Опыт</p>
                    <p className="text-[#1E293B] font-semibold">{teacher.experience}</p>
                  </div>
                </div>

                {/* Students */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2563EB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] uppercase tracking-wide">Результат</p>
                    <p className="text-[#1E293B] font-semibold">{teacher.students}</p>
                  </div>
                </div>

                {/* Certificates */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] uppercase tracking-wide">Сертификаты</p>
                    <p className="text-[#1E293B] font-semibold text-sm">{teacher.certificates}</p>
                  </div>
                </div>

                {/* Specialization */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-[#64748B] mb-2 uppercase tracking-wide">Специализация</p>
                  <p className="text-[#1E293B] leading-relaxed">
                    {teacher.specialization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
