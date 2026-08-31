import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { ArrowRight } from "lucide-react";

export function HomePage() {
  const font = { fontFamily: 'Onest, sans-serif' };

  // Карточки намеренно разные: у языков разные поводы и разные преподаватели
  const courses = [
    {
      to: "/english",
      title: "Английский язык",
      lead: "Разговорный, школьная программа и подготовка к экзаменам.",
      points: [
        "Занятия один на один, без групп",
        "Подготовка к IELTS по авторской методике",
        "Помощь со школьной программой и ЕНТ"
      ],
      accent: "text-[#1E45B8]",
      dot: "bg-[#1E45B8]",
      hover: "hover:border-[#1E45B8]"
    },
    {
      to: "/kazakh",
      title: "Казахский язык",
      lead: "Для тех, кто понимает, но не говорит.",
      points: [
        "Преподаватели — носители языка",
        "Методика «казахский как иностранный»",
        "Упор на разговор, а не на зубрёжку правил"
      ],
      accent: "text-[#D9541C]",
      dot: "bg-[#D9541C]",
      hover: "hover:border-[#D9541C]"
    }
  ];

  const trust = [
    { title: "Первый урок — 0 ₸", note: "без предоплаты и обязательств" },
    { title: "Занятия 45–60 минут", note: "в Google Meet, из дома" },
    { title: "Замена преподавателя", note: "бесплатно, если не сложилось" },
    { title: "Заморозка до 2 недель", note: "болезнь, каникулы, отъезд" }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      <header className="border-b border-[#DCE1ED]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center">
          <Logo />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="max-w-[38em]">
          <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={font}>
            Онлайн-школа · дети 10–17 лет
          </div>
          <h1
            className="text-[#101A2E] text-[32px] md:text-[44px] font-extrabold tracking-[-0.02em] leading-[1.12] mt-3 mb-4 text-balance"
            style={font}
          >
            Индивидуальные занятия английским и казахским
          </h1>
          <p className="text-[#5A6480] text-lg md:text-xl leading-relaxed">
            Один на один с преподавателем, из дома. Выберите язык — покажем программу,
            цены и истории учеников.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10 md:mt-12 max-w-5xl">
          {courses.map((course) => (
            <Link
              key={course.to}
              to={course.to}
              className={`group bg-white border border-[#DCE1ED] ${course.hover} rounded-[18px] p-7 md:p-8 transition-colors duration-200 block`}
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[#101A2E] text-[24px] md:text-[26px] font-bold tracking-[-0.01em]" style={font}>
                  {course.title}
                </h2>
                <ArrowRight className={`w-6 h-6 flex-shrink-0 mt-1 text-[#C3CCE2] transition-all duration-200 group-hover:translate-x-1 ${course.accent.replace('text-', 'group-hover:text-')}`} />
              </div>

              <p className="text-[#5A6480] text-[16.5px] leading-relaxed mt-2.5 mb-5">
                {course.lead}
              </p>

              <ul className="grid gap-2.5">
                {course.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[#3E4A66] text-[15.5px]">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${course.dot}`}></span>
                    {point}
                  </li>
                ))}
              </ul>

              <span className={`inline-block mt-6 font-semibold ${course.accent}`} style={font}>
                Смотреть программу →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 md:mt-14 border-t border-[#DCE1ED] grid grid-cols-2 md:grid-cols-4 max-w-5xl">
          {trust.map((item) => (
            <div
              key={item.title}
              className="py-5 pr-5 md:px-5 md:first:pl-0 border-[#DCE1ED] md:border-r md:last:border-r-0 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0 [&:nth-child(even)]:pl-5 md:[&:nth-child(even)]:pl-5"
            >
              <b className="block text-[15px] font-bold text-[#101A2E]" style={font}>{item.title}</b>
              <span className="text-[#5A6480] text-sm">{item.note}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-[#DCE1ED]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[15px]">
          <p className="text-[#5A6480]">
            © {new Date().getFullYear()} Репетитор Рядом. Алматы, Казахстан
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="tel:+77475252582" className="text-[#5A6480] hover:text-[#101A2E]">+7 (747) 525-25-82</a>
            <Link to="/privacy" className="text-[#5A6480] hover:text-[#101A2E]">Политика конфиденциальности</Link>
            <Link to="/offer" className="text-[#5A6480] hover:text-[#101A2E]">Договор оферты</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
