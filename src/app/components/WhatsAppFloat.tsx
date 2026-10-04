import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useContent } from "../content/ContentProvider";
import { useT } from "../i18n/LocaleProvider";
import { trackContact } from "../utils/analytics";
import type { Language } from "../content/types";

/** Плавающая кнопка для десктопа; на телефоне её заменяет нижняя плашка MobileFixedCTA. */
export function WhatsAppFloat({ course }: { course?: Language }) {
  const { contacts } = useContent();
  const t = useT();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={`https://wa.me/${contacts.phoneRaw}?text=${encodeURIComponent(t.contact.waText[course ?? "general"])}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContact("whatsapp", "float")}
      className="hidden lg:flex fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#1FA855] hover:bg-[#178F47] text-white rounded-full items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group"
      aria-label={t.contact.whatsapp}
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-20 bg-[#101A2E] text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {t.contact.whatsapp}
      </span>
    </a>
  );
}
