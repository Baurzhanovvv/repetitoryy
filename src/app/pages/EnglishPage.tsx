import { Hero } from "../components/Hero";
import { PainPoints } from "../components/PainPoints";
import { Solutions } from "../components/Solutions";
import { HowItWorks } from "../components/HowItWorks";
import { Results } from "../components/Results";
import { Teachers } from "../components/Teachers";
import { Testimonials } from "../components/Testimonials";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { MobileFixedCTA } from "../components/MobileFixedCTA";
import { Navigation } from "../components/Navigation";
import { WhatsAppFloat } from "../components/WhatsAppFloat";
import { withLanguageSupport } from "../utils/withLanguageSupport";

// Wrap components that haven't been migrated yet
const SolutionsWithLang = withLanguageSupport(Solutions);
const HowItWorksWithLang = withLanguageSupport(HowItWorks);
const TeachersWithLang = withLanguageSupport(Teachers);
const PricingWithLang = withLanguageSupport(Pricing);
const FAQWithLang = withLanguageSupport(FAQ);
const ContactFormWithLang = withLanguageSupport(ContactForm);

export function EnglishPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* Navigation */}
      <Navigation language="english" />

      {/* 1. Hero Section + Form */}
      <Hero language="english" />

      {/* 2. Pain Points (Проблемы) */}
      <PainPoints language="english" />

      {/* 3. Результаты учеников — главное доказательство, поэтому высоко */}
      <div id="results">
        <Results language="english" />
      </div>

      {/* 4. Почему мы */}
      <div id="solutions">
        <SolutionsWithLang language="english" />
      </div>

      {/* 5. Преподаватели */}
      <div id="teachers">
        <TeachersWithLang language="english" />
      </div>

      {/* 6. Как проходят занятия — тёмная секция-пауза */}
      <HowItWorksWithLang language="english" />

      {/* 7. Testimonials (Отзывы родителей) */}
      <div id="testimonials">
        <Testimonials language="english" />
      </div>

      {/* 8. Pricing (Тарифы) */}
      <div id="pricing">
        <PricingWithLang language="english" />
      </div>

      {/* 9. FAQ */}
      <FAQWithLang language="english" />

      {/* 10. Final CTA + Guarantees (Финальный призыв) */}
      <div id="contact-form">
        <ContactFormWithLang language="english" />
      </div>

      {/* Footer */}
      <Footer language="english" />

      {/* Mobile Fixed CTA */}
      <MobileFixedCTA />
      
      {/* WhatsApp Float Button */}
      <WhatsAppFloat />
    </div>
  );
}