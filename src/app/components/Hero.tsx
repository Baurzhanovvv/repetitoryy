import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContent, Language } from "../config/content";
import { sendToTelegram } from "../utils/telegram";

interface HeroProps {
  language: Language;
}

export function Hero({ language }: HeroProps) {
  const navigate = useNavigate();
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
      // Редирект на страницу благодарности
      navigate('/thank-you');
    } else {
      alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по WhatsApp.");
    }
  };

  const eyebrow = language === 'english'
    ? 'Английский онлайн · 10–17 лет'
    : 'Казахский онлайн · 10–17 лет';

  const trust = [
    { title: 'Первый урок — 0 ₸', note: 'без предоплаты и обязательств' },
    { title: 'Занятия 45–60 минут', note: 'в Google Meet, из дома' },
    { title: 'Замена преподавателя', note: 'бесплатно, если не сложилось' },
    { title: 'Заморозка до 2 недель', note: 'болезнь, каникулы, отъезд' }
  ];

  return (
    <section className="bg-white border-b border-[#DCE1ED]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-14 items-start pt-12 md:pt-16">

          {/* Левая колонка */}
          <div>
            <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
              {eyebrow}
            </div>

            <h1
              className="text-[#101A2E] text-[34px] md:text-[44px] lg:text-[50px] font-extrabold leading-[1.12] tracking-[-0.02em] mt-3 mb-4 text-balance"
              style={{ fontFamily: 'Onest, sans-serif' }}
            >
              {content.hero.title}{' '}
              <span className="text-[#1E45B8]">{content.hero.titleHighlight}</span>
            </h1>

            <p className="text-[#5A6480] text-lg md:text-xl leading-relaxed max-w-[32em] mb-7">
              {content.hero.subtitle}
            </p>

            <div className="grid gap-3 mb-7">
              {content.hero.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1E45B8] flex-shrink-0 mt-1" />
                  <p className="text-[#101A2E] text-base md:text-[17px] leading-relaxed">
                    <strong className="font-semibold">{benefit.bold}</strong>{benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Кнопка к форме — на мобиле форма ниже текста */}
            <div className="lg:hidden">
              <Button
                size="lg"
                className="w-full text-base py-6 rounded-xl text-white bg-[#D9541C] hover:bg-[#F07135]"
                onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {content.hero.ctaButton}
              </Button>
            </div>
          </div>

          {/* Форма */}
          <div id="hero-form" className="bg-white rounded-2xl p-6 md:p-7 border border-[#DCE1ED] shadow-[0_18px_44px_rgba(16,26,46,0.09)]">
            <h3 className="text-[#101A2E] text-[22px] font-bold tracking-[-0.01em] mb-1.5" style={{ fontFamily: 'Onest, sans-serif' }}>
              {content.hero.formTitle}
            </h3>
            <p className="text-[#5A6480] text-[15px] mb-5">
              {content.hero.formSubtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="childName" className="text-[#101A2E] mb-2 block">Имя ребёнка</Label>
                <Input
                  id="childName"
                  placeholder="Например, Айгерим"
                  value={formData.childName}
                  onChange={(e) => setFormData({...formData, childName: e.target.value})}
                  required
                  className="h-12 rounded-xl border-[#DCE1ED]"
                />
              </div>

              <div>
                <Label htmlFor="age" className="text-[#101A2E] mb-2 block">Возраст</Label>
                <Select value={formData.age} onValueChange={(value) => setFormData({...formData, age: value})}>
                  <SelectTrigger className="h-12 rounded-xl border-[#DCE1ED]">
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
                <Label htmlFor="phone" className="text-[#101A2E] mb-2 block">Телефон родителя</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="h-12 rounded-xl border-[#DCE1ED]"
                />
              </div>

              <div>
                <Label htmlFor="time" className="text-[#101A2E] mb-2 block">Удобное время для звонка (опционально)</Label>
                <Input
                  id="time"
                  placeholder="Например, после 15:00"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="h-12 rounded-xl border-[#DCE1ED]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-base py-6 rounded-xl mt-5 text-white bg-[#D9541C] hover:bg-[#F07135] shadow-[0_6px_18px_rgba(217,84,28,0.28)]"
              >
                {content.hero.ctaButton}
              </Button>

              <div className="flex items-center gap-3 text-[#8B94AB] text-[13px] my-3">
                <span className="h-px bg-[#DCE1ED] flex-1"></span>или<span className="h-px bg-[#DCE1ED] flex-1"></span>
              </div>

              <a
                href="https://wa.me/77475252582"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-base py-4 rounded-xl border-[1.5px] border-[#1FA855] text-[#1FA855] hover:bg-[#1FA855] hover:text-white transition-colors duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Написать в WhatsApp
              </a>

              <p className="text-xs text-[#8B94AB] text-center pt-3">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>

        {/* Полоса доверия */}
        <div className="mt-12 md:mt-14 border-t border-[#DCE1ED] grid grid-cols-2 md:grid-cols-4">
          {trust.map((item, i) => (
            <div
              key={i}
              className="py-5 pr-5 md:px-5 md:first:pl-0 border-[#DCE1ED] md:border-r md:last:border-r-0 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0 [&:nth-child(odd)]:pr-5 [&:nth-child(even)]:pl-5 md:[&:nth-child(even)]:pl-5"
            >
              <b className="block text-[15px] font-bold text-[#101A2E]" style={{ fontFamily: 'Onest, sans-serif' }}>{item.title}</b>
              <span className="text-[#5A6480] text-sm">{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
