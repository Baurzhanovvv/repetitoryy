import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { LangSwitcher } from "./LangSwitcher";
import { useT } from "../i18n/LocaleProvider";
import { Menu, X, Home } from "lucide-react";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import type { Language } from "../content/types";

interface NavigationProps {
  language?: Language;
}

export function Navigation({ language }: NavigationProps) {
  const t = useT();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    { label: t.nav.about, id: "solutions" },
    { label: t.nav.teachers, id: "teachers" },
    ...(language === 'kazakh' ? [] : [{ label: t.nav.results, id: "results" }]),
    { label: t.nav.pricing, id: "pricing" },
    ...(language === 'kazakh' ? [] : [{ label: t.nav.reviews, id: "testimonials" }])
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 h-16 md:h-20">
            <Link to="/" className="flex-shrink-0 min-w-0 hover:opacity-80 transition-opacity">
              <Logo className="scale-90 origin-left md:scale-100" />
            </Link>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-[#101A2E] hover:text-[#1E45B8] transition-colors font-medium text-sm xl:text-base"
                >
                  {link.label}
                </button>
              ))}
              <LangSwitcher />
              <Button
                onClick={() => scrollToSection("contact-form")}
                className="text-white rounded-xl px-6"
                style={{ backgroundColor: '#D9541C' }}
              >
                {t.nav.signUp}
              </Button>
            </div>

            {/* Mobile: язык всегда под рукой + бургер */}
            <div className="lg:hidden flex items-center gap-1.5">
              <LangSwitcher compact />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-11 h-11 flex items-center justify-center text-[#101A2E]"
                aria-label={t.nav.menu}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu: если пунктов много, меню скроллится внутри себя */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <div className="container mx-auto px-4 py-3">
              {language && (
                <Link
                  to="/"
                  className="flex items-center gap-2 min-h-[48px] text-[#5A6480] hover:text-[#101A2E] transition-colors border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-4 h-4" />
                  <span className="font-medium">{t.nav.home}</span>
                </Link>
              )}
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left min-h-[48px] text-[#101A2E] hover:text-[#1E45B8] transition-colors font-medium border-b border-gray-100 last:border-0"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contact-form")}
                className="w-full text-white rounded-xl mt-3 mb-1 min-h-[52px]"
                style={{ backgroundColor: '#D9541C' }}
              >
                {t.nav.signUpFree}
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
