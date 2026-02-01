import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#1E293B] text-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo className="[&_path]:fill-white [&_circle]:fill-[#F97316] [&_span]:text-white [&_.text-muted-foreground]:text-white/60" />
            </div>
            <p className="text-white/70 leading-relaxed max-w-md mb-6">
              Персональные онлайн-занятия английским и казахским для детей 10-17 лет. 
              Индивидуальный подход и качественное обучение.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/77475252582" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#10B981] rounded-full flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Навигация
            </h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection("solutions")} className="text-white/70 hover:text-white transition-colors text-left">
                  О школе
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("teachers")} className="text-white/70 hover:text-white transition-colors text-left">
                  Преподаватели
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("results")} className="text-white/70 hover:text-white transition-colors text-left">
                  Результаты
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("pricing")} className="text-white/70 hover:text-white transition-colors text-left">
                  Цены
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("testimonials")} className="text-white/70 hover:text-white transition-colors text-left">
                  Отзывы
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg mb-4 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Контакты
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/70">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href="tel:+77475252582" className="hover:text-white transition-colors">
                  +7 (747) 525-25-82
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href="https://wa.me/77475252582" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@repetitor.kz" className="hover:text-white transition-colors">
                  info@repetitor.kz
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Алматы, Казахстан</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm text-center md:text-left">
            © 2025 Репетитор Рядом. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Договор оферты
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
