import { Hero } from "../components/Hero";
import { PainPoints } from "../components/PainPoints";
import { CTABanner } from "../components/CTABanner";
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
const PainPointsWithLang = withLanguageSupport(PainPoints);
const SolutionsWithLang = withLanguageSupport(Solutions);
const HowItWorksWithLang = withLanguageSupport(HowItWorks);
const ResultsWithLang = withLanguageSupport(Results);
const TeachersWithLang = withLanguageSupport(Teachers);
const TestimonialsWithLang = withLanguageSupport(Testimonials);
const PricingWithLang = withLanguageSupport(Pricing);
const FAQWithLang = withLanguageSupport(FAQ);
const ContactFormWithLang = withLanguageSupport(ContactForm);

export function EnglishPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Navigation */}
      <Navigation language="english" />

      {/* 1. Hero Section + Form */}
      <Hero language="english" />

      {/* 2. Pain Points (Проблемы) */}
      <PainPointsWithLang language="english" />

      {/* CTA Banner */}
      <CTABanner />

      {/* 3. Solutions (Решения) */}
      <div id="solutions">
        <SolutionsWithLang language="english" />
      </div>

      {/* 4. How It Works (Как проходят занятия) */}
      <HowItWorksWithLang language="english" />

      {/* 5. Results (Результаты учеников) */}
      <div id="results">
        <ResultsWithLang language="english" />
      </div>

      {/* 6. Teachers (Преподаватели) */}
      <div id="teachers">
        <TeachersWithLang language="english" />
      </div>

      {/* 7. Testimonials (Отзывы родителей) */}
      <div id="testimonials">
        <TestimonialsWithLang language="english" />
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
      <Footer />

      {/* Mobile Fixed CTA */}
      <MobileFixedCTA />
      
      {/* WhatsApp Float Button */}
      <WhatsAppFloat />
    </div>
  );
}