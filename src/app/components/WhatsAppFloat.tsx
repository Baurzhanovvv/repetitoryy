import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/77475252582?text=Здравствуйте! Хочу записаться на пробный урок английского для ребёнка.",
      "_blank"
    );
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleWhatsAppClick}
      className="hidden md:flex fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#10B981] hover:bg-[#059669] text-white rounded-full items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group animate-bounce"
      aria-label="Написать в WhatsApp"
      style={{ animationDuration: '2s' }}
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-20 bg-[#1E293B] text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Написать в WhatsApp
      </span>
    </button>
  );
}