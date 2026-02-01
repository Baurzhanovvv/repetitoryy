import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";

export function MobileFixedCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show button after scrolling 300px
      setIsVisible(scrollY > 300);
      
      // Hide button when near bottom (footer area)
      setIsAtBottom(scrollY + windowHeight >= documentHeight - 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible || isAtBottom) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
      <Button
        onClick={scrollToForm}
        size="lg"
        className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-2xl shadow-2xl pointer-events-auto"
      >
        <Phone className="w-5 h-5 mr-2" />
        Записаться на пробный урок
      </Button>
    </div>
  );
}