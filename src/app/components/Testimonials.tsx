import { Quote, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import student1 from "../../assets/student1.jpg";
import student2 from "../../assets/student2.jpg";

export function Testimonials() {
  const testimonials = [
    {
      text: "Хочу выразить благодарность моему учителю английского языка! Объясняет понятно, всегда поддерживает даже тогда, когда что-то не получается. Уроки проходят интересно и живо — много практики, диалогов, игр. Я начала говорить увереннее и лучше понимать английскую речь. Занималась я пару месяцев и смогла поднять свой уровень английского языка!! Учителя очень добрые, всегда объясняют очень терпеливы. Проявляют интерес к английскому языку, моментально появляется мотивация изучать английский язык.",
      parent: "Студент",
      relation: "ученица школы",
      image: student1
    },
    {
      text: "Да, спасибо большое вам🙏🌹🌹🌹! Она одна из класса на 5 сдала, при этом ей достался билет который они не успели разобрать с учителем! Сдала самая первая, понадобилось около часа, когда вышла в коридор там все учителя удивились что она быстро ответила🤭 Это благодаря занятий с вами🙏, я так рада что вы нам попались😍 Даже я вижу какой у нее колоссальный прогресс в знаниях, не говоря про словарный запас и грамматику. Это Ваша заслуга, спасибо большое🙏💓😘",
      parent: "Родитель",
      relation: "мама ученицы",
      image: student2
    },
    {
      text: "Хотела бы оставить отзыв: Занимаюсь английским почти год, очень нравится как преподаёт Асылжан и Дания, я начинала с уровня Beginner, на данный момент уровень Pre-Intermediate. Уроки проходят очень интересно, в комфортной и дружелюбной атмосфере. Спасибо вам большое! 🥰",
      parent: "Алия",
      relation: "ученица школы",
      image: null
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[#F8FAFC] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-0 w-80 h-80 bg-[#F97316]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-[#10B981]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-[32px] md:text-[40px]" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1E293B' }}>
            Что говорят родители наших учеников
          </h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto">
            Реальные отзывы мам и пап, чьи дети занимаются с нами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F97316]/30 group relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center shadow-lg rotate-12 group-hover:rotate-0 transition-transform duration-300">
                <Quote className="w-8 h-8 text-white" />
              </div>

              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F97316] text-[#F97316]" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-[#1E293B] leading-relaxed mb-8 text-base md:text-lg">
                «{testimonial.text}»
              </p>

              {/* Author info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                {testimonial.image ? (
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.parent}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full flex-shrink-0 border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-gray-400">
                      {testimonial.parent.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-[#1E293B] text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {testimonial.parent}
                  </p>
                  <p className="text-sm text-[#64748B]">
                    {testimonial.relation}
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
