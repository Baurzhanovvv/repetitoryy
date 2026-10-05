import { Link } from "react-router-dom";
import { useContent } from "../content/ContentProvider";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { useT } from "../i18n/LocaleProvider";
import { Language } from "../content/types";

interface FooterProps {
  language?: Language;
}

export function Footer({ language }: FooterProps) {
  const { contacts } = useContent();
  const t = useT();
  const hasStudentSections = language !== 'kazakh';
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#101A2E] text-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo className="[&_path]:fill-white [&_circle]:fill-[#D9541C] [&_span]:text-white [&_.text-muted-foreground]:text-white/60" />
            </div>
            <p className="text-white/70 leading-relaxed max-w-md mb-6">
              {contacts.footerAbout}
            </p>
            <div className="flex gap-4">
              <a 
                href={`https://wa.me/${contacts.phoneRaw}`} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 bg-white/10 hover:bg-[#1FA855] rounded-full flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4 font-semibold" style={{ fontFamily: 'Onest, sans-serif' }}>
              {t.footer.navigation}
            </h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection("solutions")} className="text-white/70 hover:text-white transition-colors text-left">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("teachers")} className="text-white/70 hover:text-white transition-colors text-left">
                  {t.nav.teachers}
                </button>
              </li>
              {hasStudentSections && (
              <li>
                  <button onClick={() => scrollToSection("results")} className="text-white/70 hover:text-white transition-colors text-left">
                    {t.nav.results}
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => scrollToSection("pricing")} className="text-white/70 hover:text-white transition-colors text-left">
                  {t.nav.pricing}
                </button>
              </li>
              {hasStudentSections && (
              <li>
                  <button onClick={() => scrollToSection("testimonials")} className="text-white/70 hover:text-white transition-colors text-left">
                    {t.nav.reviews}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg mb-4 font-semibold" style={{ fontFamily: 'Onest, sans-serif' }}>
              {t.footer.contacts}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/70">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href={`tel:+${contacts.phoneRaw}`} className="hover:text-white transition-colors">
                  {contacts.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href={`https://wa.me/${contacts.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{contacts.city}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Репетитор Рядом. {t.footer.rights}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <Link to="/offer" className="text-white/60 hover:text-white transition-colors">
              {t.footer.offer}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
