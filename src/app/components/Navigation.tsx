import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X, Home } from "lucide-react";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { Language } from "../config/content";

interface NavigationProps {
  language?: Language;
}

export function Navigation({ language }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  // На казахской странице нет секций «Результаты» и «Отзывы» —
  // пока для казахского нет реальных кейсов и отзывов учеников.
  const navLinks = [
    { label: "О школе", id: "solutions" },
    { label: "Преподаватели", id: "teachers" },
    ...(language === 'kazakh' ? [] : [{ label: "Результаты", id: "results" }]),
    { label: "Цены", id: "pricing" },
    ...(language === 'kazakh' ? [] : [{ label: "Отзывы", id: "testimonials" }])
  ];

  const primaryColor = language === 'kazakh' ? '#D9541C' : '#1E45B8';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo as Home Link */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
                <Logo className="scale-90 md:scale-100" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-[#101A2E] hover:text-[#1E45B8] transition-colors font-medium text-sm xl:text-base"
                  style={{ 
                    ['--hover-color' as string]: primaryColor
                  } as React.CSSProperties}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contact-form")}
                className="text-white rounded-xl px-6"
                style={{ backgroundColor: '#D9541C' }}
              >
                Записаться
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-[#101A2E]"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-3">
              {language && (
                <Link
                  to="/"
                  className="flex items-center gap-2 py-3 text-[#5A6480] hover:text-[#101A2E] transition-colors border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-4 h-4" />
                  <span className="font-medium">На главную</span>
                </Link>
              )}
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left py-3 text-[#101A2E] hover:text-[#1E45B8] transition-colors font-medium border-b border-gray-100 last:border-0"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contact-form")}
                className="w-full text-white rounded-xl mt-4 py-6"
                style={{ backgroundColor: '#D9541C' }}
              >
                Записаться на бесплатный урок
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}