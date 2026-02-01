import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { getContent, Language } from "../config/content";
import { sendToTelegram } from "../utils/telegram";

interface HeroProps {
  language: Language;
}

export function Hero({ language }: HeroProps) {
  const content = getContent(language);
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    phone: "",
    time: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const languageName = language === 'english' ? 'Английский' : 'Казахский';
    
    const success = await sendToTelegram({
      ...formData,
      language: languageName,
      source: 'Hero форма'
    });
    
    if (success) {
      alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
      // Очистка формы
      setFormData({
        childName: "",
        age: "",
        phone: "",
        time: ""
      });
    } else {
      alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по WhatsApp.");
    }
  };

  return (
    <section className="relative min-h-[650px] md:min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#FFF7ED]">
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#F97316]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#10B981]/5 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Main content */}
          <div className="space-y-6 md:space-y-8">
            {/* Pre-title for English page */}
            {language === 'english' && (
              <div className="inline-flex items-center gap-2 bg-[#EFF6FF] px-4 py-2 rounded-full">
                <span className="text-[#2563EB] font-semibold text-sm md:text-base">
                  ✨ Обучение английскому онлайн
                </span>
              </div>
            )}
            
            <h1 className="text-[#1E293B] text-[36px] md:text-[44px] lg:text-[52px] leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {content.hero.title} <span className={language === 'english' ? 'text-[#2563EB]' : 'text-[#F97316]'}>{content.hero.titleHighlight}</span>
            </h1>
            
            <p className="text-[#475569] text-lg md:text-xl leading-relaxed">
              {content.hero.subtitle}
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {content.hero.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <p className="text-[#1E293B] text-base md:text-lg">
                    <strong>{benefit.bold}</strong>{benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button for mobile */}
            <div className="lg:hidden">
              <Button 
                size="lg"
                className="w-full text-base md:text-lg py-6 rounded-2xl shadow-lg"
                style={{ 
                  backgroundColor: '#F97316',
                  color: 'white'
                }}
                onClick={() => {
                  const form = document.getElementById('hero-form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {content.hero.ctaButton}
              </Button>
            </div>
          </div>

          {/* Right side - Form */}
          <div id="hero-form" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100">
            <h3 className="text-[#1E293B] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {content.hero.formTitle}
            </h3>
            <p className="text-[#64748B] text-sm mb-6">
              {content.hero.formSubtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="childName" className="text-[#1E293B] mb-2 block">
                  Имя ребёнка
                </Label>
                <Input
                  id="childName"
                  placeholder="Например, Айгерим"
                  value={formData.childName}
                  onChange={(e) => setFormData({...formData, childName: e.target.value})}
                  required
                  className="h-12 rounded-xl border-gray-200"
                />
              </div>

              <div>
                <Label htmlFor="age" className="text-[#1E293B] mb-2 block">
                  Возраст
                </Label>
                <Select value={formData.age} onValueChange={(value) => setFormData({...formData, age: value})}>
                  <SelectTrigger className="h-12 rounded-xl border-gray-200">
                    <SelectValue placeholder="Выберите возраст" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 лет</SelectItem>
                    <SelectItem value="11">11 лет</SelectItem>
                    <SelectItem value="12">12 лет</SelectItem>
                    <SelectItem value="13">13 лет</SelectItem>
                    <SelectItem value="14">14 лет</SelectItem>
                    <SelectItem value="15">15 лет</SelectItem>
                    <SelectItem value="16">16 лет</SelectItem>
                    <SelectItem value="17">17 лет</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phone" className="text-[#1E293B] mb-2 block">
                  Телефон родителя
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="h-12 rounded-xl border-gray-200"
                />
              </div>

              <div>
                <Label htmlFor="time" className="text-[#1E293B] mb-2 block">
                  Удобное время для звонка (опционально)
                </Label>
                <Input
                  id="time"
                  placeholder="Например, после 15:00"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="h-12 rounded-xl border-gray-200"
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full text-base py-6 rounded-xl shadow-lg mt-6"
                style={{ 
                  backgroundColor: '#F97316',
                  color: 'white'
                }}
              >
                {content.hero.ctaButton}
              </Button>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/77475252582"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-base py-6 rounded-xl border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-300 mt-3"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Написать в WhatsApp
              </a>

              <p className="text-xs text-[#94A3B8] text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}