import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import alisher from "../../assets/alisher.jpg";
import student1 from "../../assets/student1.jpg";
import student2 from "../../assets/student2.jpg";

export function Results() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const results = [
    {
      image: alisher,
      title: "Кейс #1: Как Алишер за год превратился из \"молчуна\" в уверенного участника конкурсов",
      story: "Алишер пришёл к нам в 10 классе с классической проблемой — грамматику знает, а говорить не может. На контрольных пишет хорошо, но как только нужно что-то сказать вслух — тишина. Просто боялся ошибиться и выглядеть глупо перед одноклассниками.\n\nМы не стали грузить его новыми правилами — их у него и так было достаточно. Просто начали разговаривать. Про то, что ему интересно, про игры, фильмы, обычные ситуации. Через несколько месяцев Алишер начал отвечать на уроках сам, без страха. А через год — участвовал в школьных конкурсах на английском. Спокойно, уверенно.",
      testimonial: "\"Хочу сказать вам огромное спасибо, после ваших занятий у сына значительные улучшения в знаниях по английскому, казахскому языку, ему намного легче дается написание контрольных срезов, по итогам которых он получает положительные оценки. Преподаватель предоставляет информацию четко, ясно, объясняет все доступным языком, очень ответственная и пунктуальная, благодаря дополнительно полученным знаниям учеба дается намного легче, на уроках сын занимается с интересом и увлечением. Спасибо вам огромное❤️\"",
      conclusion: "Главное, что изменилось — Алишер перестал бояться языка. Он не стал отличником за месяц, не выучил 10000 слов. Он просто начал говорить. И это дало результат во всём остальном.",
      duration: "1 год занятий"
    },
    {
      image: student1,
      title: "История Медины: когда английский перестал быть пыткой",
      story: "Медина пришла к нам в 10 классе со словами: \"Я уже не верю, что смогу выучить английский. Мне просто не дано\".\n\nДо этого она пыталась учиться в нескольких центрах. Везде одно и то же: группу гонят по программе, не важно, понял ты или нет. Сегодня одно время, завтра другое, послезавтра третье. В голове каша, ничего не откладывается. От этого слёзы и ощущение, что с ней что-то не так.\n\nМы решили действовать иначе. Забили на стандартную программу. Начали с нуля, но сразу начали строить предложения и разговаривать. Без зубрёжки длинных списков правил. Если тема не усвоилась, не идём дальше. Пока не станет понятно.",
      testimonial: null,
      conclusion: "Медина не стала чемпионом английского за полгода. Но она перестала его бояться. А для неё это огромный результат.",
      duration: "6 месяцев занятий"
    },
    {
      image: student2,
      title: "История Алины: с нуля до IELTS за два года",
      story: "Алина пришла к нам в 11 классе. Английский практически с нуля, в голове мешанина из обрывков правил, слова не запоминались, говорить стеснялась. И самое тяжёлое — ощущение, что уже поздно, что время упущено и ничего не успеть.\n\nМы начали с простого. Не пытались за месяц нагнать всю школьную программу. Просто шли шаг за шагом, в её темпе.\n\nПрошло два года. Сейчас Алина пишет эссе для IELTS и описывает графики, даже не задумываясь особо. На ЕНТ по английскому показывает результаты, о которых раньше не мечтала.",
      testimonial: "\"Хочу поблагодарить Вас и оставить отзыв за проделанный труд и путь который вы идете с нами, с Алиной на протяжении уже нескольких лет! Асылжан, Спасибо просто Огромное вам за знания, терпение, за интересные уроки и подачу материалов, индивидуальный подход по Английскому! Отдельное спасибо за поддержку и подготовку к IELTS, вы просто не представляете как ваша поддержка важна и добавляет уверенности Алине! Благодаря Вам, Алина практически от \"0\" знаний сейчас идёт к уверенному владению языками! Алине очень нравятся ваши уроки, методика и комфортная, позитивная обстановка, которая добавляет стимула двигаться дальше!\"",
      conclusion: "Два года назад Алина думала, что опоздала. Сейчас готовится к IELTS. Просто потому что мы шли в её темпе и поддерживали, когда она сама не верила в результат.",
      duration: "2 года занятий"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % results.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + results.length) % results.length);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-[#F8FAFC] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-[#10B981]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-[32px] md:text-[40px]" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
            Реальные истории наших учеников
          </h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto">
            Вот как меняется жизнь детей после занятий с нами
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-6xl mx-auto mb-12">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Content */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {results.map((result, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100">
                    {/* Image */}
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <ImageWithFallback
                        src={result.image}
                        alt={result.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl mb-6 text-[#1E293B]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {result.title}
                      </h3>
                      
                      {/* Story */}
                      <div className="prose prose-lg max-w-none mb-6">
                        {result.story.split('\n\n').map((paragraph, i) => (
                          <p key={i} className="text-[#475569] leading-relaxed mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Testimonial */}
                      {result.testimonial && (
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F0F9FF] p-6 md:p-8 rounded-2xl border-l-4 border-[#2563EB] mb-6">
                          <p className="text-[#1E293B] italic leading-relaxed">
                            {result.testimonial}
                          </p>
                          <p className="text-sm text-[#64748B] mt-4">— Отзыв от родителя</p>
                        </div>
                      )}

                      {/* Conclusion */}
                      <div className="bg-[#10B981]/5 p-6 rounded-2xl border border-[#10B981]/20 mb-6">
                        <p className="text-[#1E293B] font-medium leading-relaxed">
                          {result.conclusion}
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-2 text-[#F97316]">
                        <Clock className="w-5 h-5" />
                        <p className="font-semibold">
                          {result.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {results.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-[#2563EB] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={scrollToForm}
            className="text-base md:text-lg px-8 py-6 rounded-2xl shadow-lg"
            style={{ 
              backgroundColor: '#F97316',
              color: 'white'
            }}
          >
            Хочу такой же результат
          </Button>
        </div>
      </div>
    </section>
  );
}
