import { Hero } from "../components/Hero";
import { PainPoints } from "../components/PainPoints";
import { Solutions } from "../components/Solutions";
import { HowItWorks } from "../components/HowItWorks";
import { Teachers } from "../components/Teachers";
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

export function KazakhPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* Navigation */}
      <Navigation language="kazakh" />

      {/* 1. Hero Section + Form */}
      <Hero language="kazakh" />

      {/* 2. Pain Points (Проблемы) */}
      <PainPoints language="kazakh" />

      {/* 3. Solutions (Решения) */}
      <div id="solutions">
        <SolutionsWithLang language="kazakh" />
      </div>

      {/* 6. Teachers (Преподаватели) */}
      <div id="teachers">
        <TeachersWithLang language="kazakh" />
      </div>

      {/* 4. How It Works (Как проходят занятия) */}
      <HowItWorksWithLang language="kazakh" />

      {/* Секция «Результаты» скрыта: реальных кейсов учеников
          казахского пока нет, а английские сюда не подходят. */}

      {/* Секция «Отзывы» скрыта: имеющиеся отзывы — про английский. */}

      {/* 8. Pricing (Тарифы) */}
      <div id="pricing">
        <PricingWithLang language="kazakh" />
      </div>

      {/* 9. FAQ */}
      <FAQWithLang language="kazakh" />

      {/* 10. Final CTA + Guarantees (Финальный призыв) */}
      <div id="contact-form">
        <ContactFormWithLang language="kazakh" />
      </div>

      {/* Footer */}
      <Footer language="kazakh" />

      {/* Mobile Fixed CTA */}
      <MobileFixedCTA />
      
      {/* WhatsApp Float Button */}
      <WhatsAppFloat />
    </div>
  );
}