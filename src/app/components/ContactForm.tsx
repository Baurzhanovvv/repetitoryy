import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CheckCircle } from "lucide-react";
import { sendToTelegram } from "../utils/telegram";
import { reportLeadConversion } from "../utils/analytics";
import { useContent } from "../content/ContentProvider";

export function ContactForm() {
  const navigate = useNavigate();
  const site = useContent();
  const content = site.contactForm;

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
      // Конверсия засчитывается только когда заявка реально ушла
      reportLeadConversion(() => navigate('/thank-you'));
    } else {
      alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по WhatsApp.");
    }
  };

  return (
    <section className="py-14 md:py-20 bg-[#EFF1F7] border-t border-[#DCE1ED]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_.9fr] gap-10 lg:gap-14 items-start max-w-6xl">

          <div>
            <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
              Последний шаг
            </div>
            <h2 className="text-[#101A2E] text-[27px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
              {content.title}
            </h2>
            <p className="text-[#5A6480] text-[17px] md:text-lg mb-7 max-w-[34em]">
              {content.subtitle}
            </p>

            <div className="grid gap-3">
              {content.guarantees.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1E45B8] flex-shrink-0 mt-0.5" />
                  <span className="text-[#101A2E] text-base md:text-[17px]">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-[#5A6480] text-[15.5px] mt-7">
              Или напишите нам в{' '}
              <a
                href={`https://wa.me/${site.contacts.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1FA855] font-semibold hover:underline"
              >
                WhatsApp: {site.contacts.phone}
              </a>
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-7 border border-[#DCE1ED] shadow-[0_18px_44px_rgba(16,26,46,0.09)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cf-name" className="text-[#101A2E] mb-2 block">Имя ребёнка</Label>
                <Input
                  id="cf-name"
                  placeholder="Например, Айгерим"
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  required
                  className="h-12 rounded-xl border-[#DCE1ED]"
                />
              </div>

              <div>
                <Label htmlFor="cf-age" className="text-[#101A2E] mb-2 block">Возраст</Label>
                <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
                  <SelectTrigger className="h-12 rounded-xl border-[#DCE1ED]">
                    <SelectValue placeholder="Выберите возраст" />
                  </SelectTrigger>
                  <SelectContent>
                    {["10", "11", "12", "13", "14", "15", "16", "17"].map((age) => (
                      <SelectItem key={age} value={age}>{age} лет</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cf-phone" className="text-[#101A2E] mb-2 block">Телефон родителя</Label>
                <Input
                  id="cf-phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="h-12 rounded-xl border-[#DCE1ED]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-base py-6 rounded-xl mt-5 text-white bg-[#D9541C] hover:bg-[#F07135] shadow-[0_6px_18px_rgba(217,84,28,0.28)]"
              >
                {content.cta}
              </Button>

              <p className="text-xs text-[#8B94AB] text-center pt-1">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <Link to="/privacy" className="underline hover:text-[#1E45B8]">политикой конфиденциальности</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
