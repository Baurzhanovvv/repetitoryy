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
    <section className="py-14 md:py-20 bg-white border-t border-[#DCE1ED]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[34em] mb-10 md:mb-12">
          <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
            Кто занимается
          </div>
          <h2 className="text-[#101A2E] text-[27px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
            Три преподавателя, а не поток случайных людей
          </h2>
          <p className="text-[#5A6480] text-[17px] md:text-lg">
            Школа небольшая — вы будете знать, кто именно ведёт вашего ребёнка.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {teachers.map((teacher, index) => (
            <div key={index} className="bg-white border border-[#DCE1ED] rounded-[18px] overflow-hidden hover:border-[#C3CCE2] transition-colors duration-200">
              <ImageWithFallback
                src={teacher.image}
                alt={teacher.name}
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="px-5 pt-5 pb-6">
                <div className="text-[#101A2E] text-xl font-bold tracking-[-0.01em]" style={{ fontFamily: 'Onest, sans-serif' }}>
                  {teacher.name}
                </div>
                <div className="text-[#D9541C] text-sm font-semibold mt-0.5" style={{ fontFamily: 'Onest, sans-serif' }}>
                  {teacher.experience}
                </div>
                <ul className="mt-3.5 pt-3.5 border-t border-[#DCE1ED] grid gap-2">
                  <li className="flex gap-2 text-[#5A6480] text-[14.5px]"><span className="text-[#B8C1D6]">—</span>{teacher.students}</li>
                  <li className="flex gap-2 text-[#5A6480] text-[14.5px]"><span className="text-[#B8C1D6]">—</span>{teacher.certificates}</li>
                </ul>
                <p className="text-[#5A6480] text-[14.5px] leading-relaxed mt-3">
                  {teacher.specialization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
