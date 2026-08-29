import { Language } from "../config/content";

interface PainPointsProps {
  language?: Language;
}

const painPointsByLanguage: Record<Language, { title: string; description: string }[]> = {
  english: [
    {
      title: "Учим английский 3 года — результата ноль",
      description: "Ребёнок ходит на курсы или к репетитору, но до сих пор не может составить простое предложение. Деньги уходят, а прогресса не видно."
    },
    {
      title: "Боится говорить — молчит на уроках",
      description: "Знает слова, понимает грамматику, но как дело доходит до разговора — замыкается. Страх ошибки парализует."
    },
    {
      title: "Нет времени возить на занятия",
      description: "Хороший репетитор — на другом конце города. Дорога туда-обратно съедает 2 часа. А ещё пробки, усталость, домашка..."
    },
    {
      title: "Скучные уроки — ребёнок не хочет заниматься",
      description: "Зубрёжка, учебники из 90-х, никакого интереса. Каждое занятие — борьба и уговоры."
    }
  ],
  kazakh: [
    {
      title: "Учит казахский с первого класса — а говорить не может",
      description: "В школе язык проходят по учебнику: правила, тексты, пересказ. Ребёнок знает слова, но живой разговор не поддерживает."
    },
    {
      title: "Понимает, но отвечает по-русски",
      description: "К нему обращаются на казахском — он всё понял, а ответить не может. С каждым разом привычка переключаться на русский закрепляется сильнее."
    },
    {
      title: "Дома не с кем практиковать",
      description: "В семье говорят по-русски, языковой среды нет. Выученное на уроке негде применить — через неделю оно забывается."
    },
    {
      title: "Скучные уроки — ребёнок не хочет заниматься",
      description: "Зубрёжка правил и пересказы наизусть, никакого интереса. Каждое занятие — борьба и уговоры."
    }
  ]
};

export function PainPoints({ language = "english" }: PainPointsProps) {
  const painPoints = painPointsByLanguage[language];

  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[34em] mb-10 md:mb-12">
          <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
            Знакомо?
          </div>
          <h2 className="text-[#101A2E] text-[27px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
            Родители приходят к нам примерно с этим
          </h2>
          <p className="text-[#5A6480] text-[17px] md:text-lg">
            Формулировки, которые мы слышим на первом звонке чаще всего.
          </p>
        </div>

        {/* Реплики: нечётные слева, чётные справа — как в переписке */}
        <div className="grid gap-4 max-w-[860px]">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className={
                "bg-white border border-[#DCE1ED] px-6 py-5 md:max-w-[620px] transition-all duration-200 hover:border-[#C3CCE2] " +
                (index % 2 === 0
                  ? "rounded-[18px] rounded-bl-[5px] md:hover:translate-x-[3px]"
                  : "rounded-[18px] rounded-br-[5px] md:ml-auto md:hover:-translate-x-[3px]")
              }
            >
              <p className="text-[#101A2E] text-[18px] md:text-[18.5px] font-semibold tracking-[-0.01em]" style={{ fontFamily: 'Onest, sans-serif' }}>
                «{point.title}»
              </p>
              <p className="text-[#5A6480] text-[15.5px] leading-relaxed mt-1.5">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <p className="max-w-[860px] mt-6 px-5 py-4 bg-[#E8EDFB] rounded-2xl text-[#1E45B8] text-[17px] font-semibold" style={{ fontFamily: 'Onest, sans-serif' }}>
          С каждой из них мы работаем не первый год — ниже показываем, как именно.
        </p>
      </div>
    </section>
  );
}
