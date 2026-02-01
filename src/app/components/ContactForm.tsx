import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CheckCircle, Gift, RefreshCw, Shield, TrendingUp } from "lucide-react";
import { sendToTelegram } from "../utils/telegram";

export function ContactForm() {
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await sendToTelegram({
      ...formData,
      source: 'Финальная форма (ContactForm)'
    });
    
    if (success) {
      alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
      // Очистка формы
      setFormData({
        childName: "",
        age: "",
        phone: ""
      });
    } else {
      alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по WhatsApp.");
    }
  };

  const guarantees = [
    {
      icon: Gift,
      text: "Бесплатный пробный урок"
    },
    {
      icon: CheckCircle,
      text: "Качественное обучение"
    },
    {
      icon: CheckCircle,
      text: "Замена преподавателя бесплатно"
    },
    {
      icon: TrendingUp,
      text: "Индивидуальный подход к каждому"
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#10B981] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -ml-40 -mb-40 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-white text-[32px] md:text-[44px] lg:text-[52px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Запишитесь на бесплатный пробный урок
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Познакомьтесь с преподавателем, оцените методику, посмотрите на реакцию ребёнка. Никаких обязательств.
          </p>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12 md:mb-16">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Icon className="w-7 h-7 text-[#2563EB]" />
                </div>
                <p className="text-white font-medium text-sm md:text-base">
                  {guarantee.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="childName" className="text-[#1E293B] mb-2 block text-base">
                  Имя ребёнка
                </Label>
                <Input
                  id="childName"
                  placeholder="Например, Айгерим"
                  value={formData.childName}
                  onChange={(e) => setFormData({...formData, childName: e.target.value})}
                  required
                  className="h-14 rounded-xl border-gray-200 text-base"
                />
              </div>

              <div>
                <Label htmlFor="age" className="text-[#1E293B] mb-2 block text-base">
                  Возраст
                </Label>
                <Select value={formData.age} onValueChange={(value) => setFormData({...formData, age: value})}>
                  <SelectTrigger className="h-14 rounded-xl border-gray-200 text-base">
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
                <Label htmlFor="phone" className="text-[#1E293B] mb-2 block text-base">
                  Телефон родителя
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="h-14 rounded-xl border-gray-200 text-base"
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full text-base md:text-lg py-7 rounded-xl shadow-lg mt-8"
                style={{ 
                  backgroundColor: '#F97316',
                  color: 'white'
                }}
              >
                Получить бесплатный урок
              </Button>

              <p className="text-xs text-[#94A3B8] text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/90 text-sm md:text-base">
              Или напишите нам в WhatsApp: <a href="https://wa.me/77475252582" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-white transition-colors">+7 (747) 525-25-82</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
